// Command probe runs the unified 10-step Coordination + Durable Runtime scenario
// against go-workflows (github.com/luno/workflow v0.5.0), using ONLY the library's
// native API. The only non-upstream component is the file-backed RecordStore adapter
// (filestore) which implements the library's own RecordStore interface so the engine
// has a durable state carrier in an environment with no SQL server. It does NOT
// invent Claim/Lease/Review semantics.
//
// Usage:
//
//	probe phase1 <storePath> <manifestPath>   # create 3 items, ready query, claim, attempt, persist, crash
//	probe phase2 <storePath> <manifestPath>   # recover with new process, continue, output, lineage
package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"strings"
	"sync/atomic"
	"time"

	"github.com/luno/workflow"
	"github.com/luno/workflow/adapters/memrolescheduler"
	"github.com/luno/workflow/adapters/memstreamer"

	"nexusprobe/go-workflows-e3/filestore"
)

const workflowName = "probe-work-item"

// Status is the workflow status enum. Values 1-5 (0 and negatives are reserved by
// the library for internal skip types).
type Status int

const (
	StatusPending    Status = 1
	StatusReady      Status = 2
	StatusClaimed    Status = 3
	StatusAttempting Status = 4
	StatusDone       Status = 5
)

func (s Status) String() string {
	switch s {
	case StatusPending:
		return "Pending"
	case StatusReady:
		return "Ready"
	case StatusClaimed:
		return "Claimed"
	case StatusAttempting:
		return "Attempting"
	case StatusDone:
		return "Done"
	default:
		return "Status(" + fmt.Sprintf("%d", int(s)) + ")"
	}
}

// WorkItem is the bounded work item object carried by a workflow Run.
type WorkItem struct {
	ID                string   `json:"id"`
	DependsOn         []string `json:"depends_on,omitempty"`
	ClaimedBy         string   `json:"claimed_by,omitempty"`
	AttemptID         string   `json:"attempt_id,omitempty"`
	IntermediateState string   `json:"intermediate_state,omitempty"`
	Output            string   `json:"output,omitempty"`
}

func depsFor(id string) []string {
	switch id {
	case "B":
		return []string{"A"}
	case "C":
		return []string{"B"}
	default:
		return nil
	}
}

var errTransient = errors.New("simulated transient failure (retry expected)")

// buildWorkflow defines the workflow using the library's native builder API.
func buildWorkflow(store *filestore.FileStore, outboxFreq time.Duration, flakyAttempt bool) *workflow.Workflow[WorkItem, Status] {
	var firstAttempt atomic.Bool

	b := workflow.NewBuilder[WorkItem, Status](workflowName)

	// Dependency readiness: a step consumes Pending; if all dependencies are Done
	// (queried from the durable store) the item becomes Ready, otherwise it stays
	// Pending until an external callback re-evaluates it. This is app logic on top
	// of the native store interface (the library has no cross-run dependency graph).
	readyFn := func(ctx context.Context, r *workflow.Run[WorkItem, Status]) (Status, error) {
		for _, dep := range r.Object.DependsOn {
			rec, err := store.Latest(ctx, workflowName, dep)
			if errors.Is(err, workflow.ErrRecordNotFound) {
				return r.Skip()
			} else if err != nil {
				return 0, err
			}
			if rec.Status != int(StatusDone) {
				return r.Skip()
			}
		}
		return StatusReady, nil
	}

	b.AddStep(StatusPending, readyFn, StatusReady)
	b.AddCallback(StatusPending, func(ctx context.Context, r *workflow.Run[WorkItem, Status], _ io.Reader) (Status, error) {
		return readyFn(ctx, r)
	}, StatusReady)

	// Claim: expressed as a status transition driven by an external callback
	// (wf.Callback). Exclusivity is via the record version guard in the updater
	// (optimistic), not a native lease.
	b.AddCallback(StatusReady, func(_ context.Context, r *workflow.Run[WorkItem, Status], _ io.Reader) (Status, error) {
		r.Object.ClaimedBy = "probe-worker"
		return StatusClaimed, nil
	}, StatusClaimed)

	// Attempt: the workflow Run itself IS the execution attempt. Intermediate
	// state is persisted into the object; the record store makes it durable.
	b.AddStep(StatusClaimed, func(ctx context.Context, r *workflow.Run[WorkItem, Status]) (Status, error) {
		if flakyAttempt && firstAttempt.CompareAndSwap(false, true) {
			return 0, errTransient
		}
		r.Object.AttemptID = r.RunID
		r.Object.IntermediateState = "attempt-started " + time.Now().Format(time.RFC3339)
		return StatusAttempting, nil
	}, StatusAttempting)

	// Output: terminal status (RunState Completed).
	b.AddStep(StatusAttempting, func(ctx context.Context, r *workflow.Run[WorkItem, Status]) (Status, error) {
		r.Object.Output = "output for " + r.Object.ID + " @ " + time.Now().Format(time.RFC3339)
		return StatusDone, nil
	}, StatusDone)

	return b.Build(
		memstreamer.New(),
		store,
		memrolescheduler.New(),
		workflow.WithOutboxOptions(workflow.OutboxPollingFrequency(outboxFreq)),
	)
}

func main() {
	if len(os.Args) < 2 {
		fmt.Fprintln(os.Stderr, "usage: probe <phase1|phase2> <storePath> <manifestPath>")
		os.Exit(2)
	}
	storePath := os.Args[2]
	manifestPath := os.Args[3]

	store, err := filestore.New(storePath)
	if err != nil {
		fmt.Fprintf(os.Stderr, "open store: %v\n", err)
		os.Exit(1)
	}

	switch os.Args[1] {
	case "phase1":
		if err := runPhase1(store, storePath, manifestPath); err != nil {
			fmt.Fprintf(os.Stderr, "phase1 error: %v\n", err)
			os.Exit(1)
		}
	case "phase2":
		if err := runPhase2(store, storePath, manifestPath); err != nil {
			fmt.Fprintf(os.Stderr, "phase2 error: %v\n", err)
			os.Exit(1)
		}
	case "capab":
		if err := runCapabilities(store, storePath); err != nil {
			fmt.Fprintf(os.Stderr, "capab error: %v\n", err)
			os.Exit(1)
		}
	default:
		fmt.Fprintf(os.Stderr, "unknown phase %q\n", os.Args[1])
		os.Exit(2)
	}
}

type manifest struct {
	RunIDs map[string]string `json:"run_ids"`
	Start  time.Time         `json:"start"`
	Crash  time.Time         `json:"crash,omitempty"`
}

func runPhase1(store *filestore.FileStore, storePath, manifestPath string) error {
	fmt.Println("== PHASE 1 ==")
	// outbox polling slowed to widen the crash window between the durable
	// outbox write and its publish.
	wf := buildWorkflow(store, 5*time.Second, true)
	ctx := context.Background()
	wf.Run(ctx)
	defer wf.Stop()

	runIDs := make(map[string]string)
	for _, id := range []string{"A", "B", "C"} {
		item := WorkItem{ID: id, DependsOn: depsFor(id)}
		runID, err := wf.Trigger(ctx, id, workflow.WithInitialValue[WorkItem, Status](&item))
		if err != nil {
			return fmt.Errorf("trigger %s: %w", id, err)
		}
		runIDs[id] = runID
		fmt.Printf("STEP1 created work item %s run_id=%s deps=%v\n", id, runID, item.DependsOn)
	}
	m := manifest{RunIDs: runIDs, Start: time.Now()}
	writeManifest(manifestPath, &m)

	// STEP 2: query ready work.
	if err := waitStatus(ctx, store, "A", StatusReady, 30*time.Second); err != nil {
		return err
	}
	ready, err := store.List(ctx, workflowName, 0, 100, workflow.OrderTypeAscending, workflow.FilterByStatus(StatusReady))
	if err != nil {
		return fmt.Errorf("ready query: %w", err)
	}
	fmt.Printf("STEP2 ready work query: %d item(s) -> %s\n", len(ready), idsOf(ready))

	// STEP 3: claim item A via native callback.
	if err := wf.Callback(ctx, "A", StatusReady, nil); err != nil {
		return fmt.Errorf("claim A: %w", err)
	}
	rec, err := store.Latest(ctx, workflowName, "A")
	if err != nil {
		return err
	}
	var a WorkItem
	_ = workflow.Unmarshal(rec.Object, &a)
	fmt.Printf("STEP3 claimed A: status=%s claimed_by=%s\n", Status(rec.Status), a.ClaimedBy)

	// STEP 4+5: wait for the attempt to be established and intermediate state persisted.
	if err := waitStatus(ctx, store, "A", StatusAttempting, 30*time.Second); err != nil {
		return err
	}
	rec, err = store.Latest(ctx, workflowName, "A")
	if err != nil {
		return err
	}
	_ = workflow.Unmarshal(rec.Object, &a)
	fmt.Printf("STEP4+5 attempt established: run_state=%s attempt_id=%s intermediate=%q\n",
		rec.RunState, a.AttemptID, a.IntermediateState)

	dumpRecords(store, "state-after-persist.json")

	// STEP 6: simulate process interruption (crash). The pending outbox event for
	// the Attempting status is still in the durable store; phase2 will resume it.
	fmt.Println("STEP6 simulated process interruption (os.Exit 137) ...")
	m.Crash = time.Now()
	writeManifest(manifestPath, &m)
	os.Exit(137)
	return nil
}

func runPhase2(store *filestore.FileStore, storePath, manifestPath string) error {
	fmt.Println("== PHASE 2 (new process, same store) ==")
	wf := buildWorkflow(store, 250*time.Millisecond, false)
	ctx := context.Background()
	wf.Run(ctx)
	defer wf.Stop()

	m := readManifest(manifestPath)
	fmt.Printf("recovered from crash at %s; run_ids=%v\n", m.Crash.Format(time.RFC3339), m.RunIDs)

	// STEP 7+8: the new process resumes the durable run from the pending outbox
	// event; item A continues from Attempting.
	if err := waitStatus(ctx, store, "A", StatusDone, 30*time.Second); err != nil {
		return fmt.Errorf("A did not recover to Done: %w", err)
	}
	rec, err := store.Latest(ctx, workflowName, "A")
	if err != nil {
		return err
	}
	var a WorkItem
	_ = workflow.Unmarshal(rec.Object, &a)
	fmt.Printf("STEP7+8 A recovered and continued: run_state=%s status=%s\n", rec.RunState, Status(rec.Status))
	fmt.Printf("STEP9 A output submitted: output=%q attempt_id=%s intermediate=%q\n",
		a.Output, a.AttemptID, a.IntermediateState)

	// Dependencies: A is done, so release B (native callback), then C.
	for _, id := range []string{"B", "C"} {
		if err := wf.Callback(ctx, id, StatusPending, nil); err != nil {
			return fmt.Errorf("release %s: %w", id, err)
		}
		if err := waitStatus(ctx, store, id, StatusReady, 30*time.Second); err != nil {
			return err
		}
		if err := wf.Callback(ctx, id, StatusReady, nil); err != nil {
			return fmt.Errorf("claim %s: %w", id, err)
		}
		if err := waitStatus(ctx, store, id, StatusDone, 30*time.Second); err != nil {
			return err
		}
		rec, err := store.Latest(ctx, workflowName, id)
		if err != nil {
			return err
		}
		fmt.Printf("STEP7-9 %s completed: run_state=%s status=%s\n", id, rec.RunState, Status(rec.Status))
	}

	// STEP 10: lineage dump.
	dumpRecords(store, "state-final.json")
	lineage(store)
	return nil
}

func waitStatus(ctx context.Context, store *filestore.FileStore, foreignID string, want Status, timeout time.Duration) error {
	deadline := time.Now().Add(timeout)
	for time.Now().Before(deadline) {
		rec, err := store.Latest(ctx, workflowName, foreignID)
		if err == nil && Status(rec.Status) == want {
			return nil
		}
		if err != nil && !errors.Is(err, workflow.ErrRecordNotFound) {
			return err
		}
		time.Sleep(100 * time.Millisecond)
	}
	rec, _ := store.Latest(ctx, workflowName, foreignID)
	return fmt.Errorf("timeout waiting for %s to reach %s (last=%v)", foreignID, want, rec)
}

func idsOf(records []workflow.Record) string {
	var b strings.Builder
	for i, r := range records {
		if i > 0 {
			b.WriteString(", ")
		}
		b.WriteString(r.ForeignID)
	}
	return b.String()
}

func dumpRecords(store *filestore.FileStore, name string) {
	records := store.Snapshot()
	b, err := json.MarshalIndent(records, "", "  ")
	if err != nil {
		fmt.Printf("dump %s error: %v\n", name, err)
		return
	}
	if err := os.WriteFile(name, b, 0o644); err != nil {
		fmt.Printf("dump %s write error: %v\n", name, err)
	}
	fmt.Printf("dumped %d record(s) to %s\n", len(records), name)
}

func lineage(store *filestore.FileStore) {
	fmt.Println("== LINEAGE ==")
	for _, r := range store.Snapshot() {
		fmt.Printf("foreign_id=%s run_id=%s version=%d status=%d(%s) run_state=%s updated_at=%s\n",
			r.ForeignID, r.RunID, r.Meta.Version, r.Status, Status(r.Status), r.RunState, r.UpdatedAt.Format(time.RFC3339))
	}
}

func writeManifest(path string, m *manifest) {
	b, _ := json.MarshalIndent(m, "", "  ")
	_ = os.MkdirAll(filepath.Dir(path), 0o755)
	_ = os.WriteFile(path, b, 0o644)
}

func readManifest(path string) manifest {
	var m manifest
	if b, err := os.ReadFile(path); err == nil {
		_ = json.Unmarshal(b, &m)
	}
	return m
}
