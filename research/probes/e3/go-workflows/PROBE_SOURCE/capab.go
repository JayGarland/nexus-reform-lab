package main

import (
	"context"
	"fmt"
	"sync/atomic"
	"time"

	"github.com/luno/workflow"
	"github.com/luno/workflow/adapters/memrolescheduler"
	"github.com/luno/workflow/adapters/memstreamer"

	"nexusprobe/go-workflows-e3/filestore"
)

type capStatus int

const (
	capStatusCreated   capStatus = 1
	capStatusDone      capStatus = 2
	capStatusCancelled capStatus = 3
)

func (s capStatus) String() string {
	switch s {
	case capStatusCreated:
		return "Created"
	case capStatusDone:
		return "Done"
	case capStatusCancelled:
		return "Cancelled"
	default:
		return "Unknown"
	}
}

type capItem struct {
	ID   string `json:"id"`
	Done bool   `json:"done,omitempty"`
}

func runCapabilities(store *filestore.FileStore, storePath string) error {
	fmt.Println("== CAPABILITIES: pause / cancel / retry ==")

	// 1) Retry + auto-pause after error threshold, then auto-resume via WithPauseRetry.
	{
		var attempt atomic.Int32
		b := workflow.NewBuilder[capItem, capStatus]("cap-pause")

		b.AddStep(capStatusCreated, func(ctx context.Context, r *workflow.Run[capItem, capStatus]) (capStatus, error) {
			n := attempt.Add(1)
			if n < 3 {
				return 0, fmt.Errorf("transient error %d (pause after threshold)", n)
			}
			r.Object.Done = true
			return capStatusDone, nil
		}, capStatusDone).WithOptions(
			workflow.PauseAfterErrCount(2),
			workflow.ErrBackOff(300*time.Millisecond),
		)

		wf := b.Build(
			memstreamer.New(),
			store,
			memrolescheduler.New(),
			workflow.WithPauseRetry(500*time.Millisecond),
			workflow.WithOutboxOptions(workflow.OutboxPollingFrequency(150*time.Millisecond)),
		)
		ctx := context.Background()
		wf.Run(ctx)
		if _, err := wf.Trigger(ctx, "pause-item", workflow.WithInitialValue[capItem, capStatus](&capItem{ID: "pause-item"})); err != nil {
			return fmt.Errorf("trigger pause-item: %w", err)
		}
		if err := waitCapStatus(ctx, store, "cap-pause", "pause-item", capStatusDone, 15*time.Second); err != nil {
			return fmt.Errorf("pause/auto-resume: %w", err)
		}
		rec, err := store.Latest(ctx, "cap-pause", "pause-item")
		if err != nil {
			return err
		}
		fmt.Printf("PAUSE/RETRY: attempts=%d final run_state=%s status=%s\n",
			attempt.Load(), rec.RunState, capStatus(rec.Status))
		wf.Stop()
	}

	// 2) Explicit Pause + Cancel via native RunStateController inside a step.
	{
		b := workflow.NewBuilder[capItem, capStatus]("cap-cancel")

		b.AddStep(capStatusCreated, func(ctx context.Context, r *workflow.Run[capItem, capStatus]) (capStatus, error) {
			if _, err := r.Pause(ctx, "pause-for-review"); err != nil {
				return 0, err
			}
			return r.Cancel(ctx, "cancelled-by-probe")
		}, capStatusCancelled)

		wf := b.Build(
			memstreamer.New(),
			store,
			memrolescheduler.New(),
			workflow.WithOutboxOptions(workflow.OutboxPollingFrequency(150*time.Millisecond)),
		)
		ctx := context.Background()
		wf.Run(ctx)
		if _, err := wf.Trigger(ctx, "cancel-item", workflow.WithInitialValue[capItem, capStatus](&capItem{ID: "cancel-item"})); err != nil {
			return fmt.Errorf("trigger cancel-item: %w", err)
		}
		if err := waitCapRunState(ctx, store, "cap-cancel", "cancel-item", workflow.RunStateCancelled, 15*time.Second); err != nil {
			return fmt.Errorf("cancel: %w", err)
		}
		rec, err := store.Latest(ctx, "cap-cancel", "cancel-item")
		if err != nil {
			return err
		}
		fmt.Printf("CANCEL: run_state=%s status=%s reason=%q\n", rec.RunState, capStatus(rec.Status), rec.Meta.RunStateReason)
		wf.Stop()
	}
	return nil
}

func waitCapStatus(ctx context.Context, store *filestore.FileStore, wfName, foreignID string, want capStatus, timeout time.Duration) error {
	deadline := time.Now().Add(timeout)
	for time.Now().Before(deadline) {
		rec, err := store.Latest(ctx, wfName, foreignID)
		if err == nil && capStatus(rec.Status) == want {
			return nil
		}
		time.Sleep(100 * time.Millisecond)
	}
	return fmt.Errorf("timeout waiting %s/%s for %s", wfName, foreignID, want)
}

func waitCapRunState(ctx context.Context, store *filestore.FileStore, wfName, foreignID string, want workflow.RunState, timeout time.Duration) error {
	deadline := time.Now().Add(timeout)
	for time.Now().Before(deadline) {
		rec, err := store.Latest(ctx, wfName, foreignID)
		if err == nil && rec.RunState == want {
			return nil
		}
		time.Sleep(100 * time.Millisecond)
	}
	return fmt.Errorf("timeout waiting %s/%s for runstate %s", wfName, foreignID, want)
}
