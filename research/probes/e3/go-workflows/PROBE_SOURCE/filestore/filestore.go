// Package filestore implements a minimal, file-backed persistence adapter for the
// go-workflows RecordStore interface. It is a THIN, DISPOSABLE PROBE ADAPTER only:
// it implements the library's own RecordStore interface (Store/Lookup/Latest/List/
// outbox) so that the go-workflows engine has a durable state carrier in this probe
// environment, where no MySQL/PostgreSQL server is available. It does NOT invent any
// Claim / Lease / Review semantics; those are whatever the library itself provides.
// It was validated against the upstream adaptertest contract (RunRecordStoreTest).
package filestore

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"sync"
	"time"

	"github.com/luno/workflow"
)

const defaultListLimit = 25

// FileStore persists workflow.Record and outbox entries as a single JSON file.
// It serializes all access with a mutex (single-writer probe use).
type FileStore struct {
	mu   sync.Mutex
	path string

	records map[string]*workflow.Record // key: RunID
	byKey   map[string]*workflow.Record // key: workflowName+foreignID -> latest
	order   []string                    // insertion order of RunIDs

	outbox     []workflow.OutboxEvent
	outboxByID map[string]bool
}

// New opens (or creates) a JSON file-backed store at the given path.
func New(path string) (*FileStore, error) {
	s := &FileStore{
		path:       path,
		records:    make(map[string]*workflow.Record),
		byKey:      make(map[string]*workflow.Record),
		outboxByID: make(map[string]bool),
	}
	if err := s.load(); err != nil {
		return nil, err
	}
	return s, nil
}

type fileFormat struct {
	Records map[string]*workflow.Record     `json:"records"`
	Order   []string                        `json:"order"`
	Outbox  []workflow.OutboxEvent          `json:"outbox"`
	ByKey   map[string]*workflow.Record     `json:"by_key,omitempty"`
}

func (s *FileStore) load() error {
	b, err := os.ReadFile(s.path)
	if errors.Is(err, os.ErrNotExist) {
		return nil
	} else if err != nil {
		return err
	}
	if len(b) == 0 {
		return nil
	}
	var f fileFormat
	if err := json.Unmarshal(b, &f); err != nil {
		return fmt.Errorf("filestore load: %w", err)
	}
	s.records = f.Records
	s.order = f.Order
	s.outbox = f.Outbox
	s.byKey = make(map[string]*workflow.Record)
	for k, v := range f.ByKey {
		s.byKey[k] = v
	}
	for _, e := range f.Outbox {
		s.outboxByID[e.ID] = true
	}
	return nil
}

func (s *FileStore) persist() error {
	dir := filepath.Dir(s.path)
	if err := os.MkdirAll(dir, 0o755); err != nil {
		return err
	}
	f := fileFormat{
		Records: s.records,
		Order:   s.order,
		Outbox:  s.outbox,
		ByKey:   s.byKey,
	}
	b, err := json.MarshalIndent(f, "", "  ")
	if err != nil {
		return err
	}
	tmp := s.path + ".tmp"
	if err := os.WriteFile(tmp, b, 0o644); err != nil {
		return err
	}
	return os.Rename(tmp, s.path)
}

func uniqueKey(workflowName, foreignID string) string {
	return workflowName + "|" + foreignID
}

// Store upserts the record and appends an outbox event (mirroring the transactional
// outbox requirement of the RecordStore interface), then persists the file.
func (s *FileStore) Store(ctx context.Context, record *workflow.Record) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	eventData, err := workflow.MakeOutboxEventData(*record)
	if err != nil {
		return err
	}

	_, previouslyExisted := s.records[record.RunID]
	if !previouslyExisted {
		s.order = append(s.order, record.RunID)
	}
	s.records[record.RunID] = cloneRecord(record)
	s.byKey[uniqueKey(record.WorkflowName, record.ForeignID)] = cloneRecord(record)

	ev := workflow.OutboxEvent{
		ID:           eventData.ID,
		WorkflowName: eventData.WorkflowName,
		Data:         eventData.Data,
		CreatedAt:    time.Now(),
	}
	s.outbox = append(s.outbox, ev)
	s.outboxByID[ev.ID] = true

	return s.persist()
}

// Lookup returns the record with the given run ID.
func (s *FileStore) Lookup(ctx context.Context, runID string) (*workflow.Record, error) {
	s.mu.Lock()
	defer s.mu.Unlock()
	r, ok := s.records[runID]
	if !ok {
		return nil, workflow.ErrRecordNotFound
	}
	return cloneRecord(r), nil
}

// Latest returns the most recent record for a workflow + foreign ID.
func (s *FileStore) Latest(ctx context.Context, workflowName, foreignID string) (*workflow.Record, error) {
	s.mu.Lock()
	defer s.mu.Unlock()
	r, ok := s.byKey[uniqueKey(workflowName, foreignID)]
	if !ok {
		return nil, workflow.ErrRecordNotFound
	}
	return cloneRecord(r), nil
}

// List returns records matching the filters, ordered by insertion.
func (s *FileStore) List(
	ctx context.Context,
	workflowName string,
	offset int64,
	limit int,
	order workflow.OrderType,
	filters ...workflow.RecordFilter,
) ([]workflow.Record, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	if limit == 0 {
		limit = defaultListLimit
	}

	filter := workflow.MakeFilter(filters...)
	var entries []workflow.Record
	for _, runID := range s.order {
		record, ok := s.records[runID]
		if !ok {
			continue
		}
		if workflowName != "" && workflowName != record.WorkflowName {
			continue
		}
		if filter.ByForeignID().Enabled && !filter.ByForeignID().Matches(record.ForeignID) {
			continue
		}
		status := fmt.Sprintf("%d", record.Status)
		if filter.ByStatus().Enabled && !filter.ByStatus().Matches(status) {
			continue
		}
		runState := fmt.Sprintf("%d", int(record.RunState))
		if filter.ByRunState().Enabled && !filter.ByRunState().Matches(runState) {
			continue
		}
		if filter.ByCreatedAtAfter().Enabled && !filter.ByCreatedAtAfter().Matches(record.CreatedAt) {
			continue
		}
		if filter.ByCreatedAtBefore().Enabled && !filter.ByCreatedAtBefore().Matches(record.CreatedAt) {
			continue
		}
		entries = append(entries, *cloneRecord(record))
	}

	// Apply offset/limit.
	if int64(len(entries)) < offset {
		entries = nil
	} else {
		entries = entries[offset:]
	}
	if len(entries) > limit {
		entries = entries[:limit]
	}
	if order == workflow.OrderTypeDescending {
		for i, j := 0, len(entries)-1; i < j; i, j = i+1, j-1 {
			entries[i], entries[j] = entries[j], entries[i]
		}
	}
	return entries, nil
}

// ListOutboxEvents returns up to limit unconsumed outbox events.
func (s *FileStore) ListOutboxEvents(ctx context.Context, workflowName string, limit int64) ([]workflow.OutboxEvent, error) {
	s.mu.Lock()
	defer s.mu.Unlock()
	var res []workflow.OutboxEvent
	for _, e := range s.outbox {
		if workflowName != "" && e.WorkflowName != workflowName {
			continue
		}
		res = append(res, e)
		if int64(len(res)) >= limit {
			break
		}
	}
	return res, nil
}

// DeleteOutboxEvent removes a consumed outbox event and persists.
func (s *FileStore) DeleteOutboxEvent(ctx context.Context, id string) error {
	s.mu.Lock()
	defer s.mu.Unlock()
	var filtered []workflow.OutboxEvent
	for _, e := range s.outbox {
		if e.ID == id {
			continue
		}
		filtered = append(filtered, e)
	}
	s.outbox = filtered
	delete(s.outboxByID, id)
	return s.persist()
}

// Snapshot returns a deep copy of all current records (probe helper for evidence).
func (s *FileStore) Snapshot() []workflow.Record {
	s.mu.Lock()
	defer s.mu.Unlock()
	var res []workflow.Record
	for _, runID := range s.order {
		if r, ok := s.records[runID]; ok {
			res = append(res, *cloneRecord(r))
		}
	}
	return res
}

func cloneRecord(r *workflow.Record) *workflow.Record {
	if r == nil {
		return nil
	}
	c := *r
	if r.Object != nil {
		obj := make([]byte, len(r.Object))
		copy(obj, r.Object)
		c.Object = obj
	}
	c.Meta = r.Meta
	return &c
}
