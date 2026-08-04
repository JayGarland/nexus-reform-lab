# Findings — go-workflows (luno/workflow v0.5.0) E3 Probe

## 1. Execution verdict

```text
E3 PASSED
```

E3 PASSED basis: go-workflows v0.5.0 installed (go get), ran the unified 10-step
scenario natively via a thin file-backed RecordStore adapter, completed the Work
Lifecycle and Durable Runtime steps, demonstrated crash recovery with a new
process, and was cleaned up (see CLEANUP.md). Conclusion labels are limited to
the E3 set; no ADOPT/KEEP/SELECTED/BOUND/NEXUS FIT CONFIRMED is used.

## 2. 10-step scenario completion

| Step | Result | Evidence |
|---|---|---|
| 1. Create 3 dependent Work Items (A->B->C) | DONE — 3 workflow Runs triggered with dep metadata | phase1.log "STEP1 ..." |
| 2. Query Ready Work | DONE — 1 ready item (A); B/C not ready | phase1.log "STEP2 ready work query: 1 item(s) -> A" |
| 3. Claim one Work Item | DONE — A claimed via native Callback | phase1.log "STEP3 claimed A" |
| 4. Establish an Attempt | DONE — run itself is the attempt (run_id) | phase1.log "STEP4+5 attempt established" |
| 5. Persist intermediate state | DONE — object persisted at Attempting | state-after-persist.json; store-after-crash.json |
| 6. Simulate interruption | DONE — os.Exit(137), exit code 137 | RAW_OUTPUT/phase1.log; PHASE1_EXIT=137 |
| 7. Recover with new process | DONE — fresh process, same store, outbox resumed | phase2.log "STEP7+8 A recovered ... Completed" |
| 8. Continue the Attempt | DONE — same run continued Attempting->Done | phase2.log |
| 9. Submit Output | DONE — Output field persisted, RunState Completed | phase2.log "STEP9 A output submitted" |
| 10. Lineage + raw evidence | DONE — record versions, outbox, before/after state | state-final.json; store-after-crash.json; lineage dump |

## 3. Capability classification

### Natively provided (observed)

- Durable typed workflow/state-machine orchestration with a versioned status graph.
- Durable event record + outbox exactly-once (record + outbox committed together; outbox consumer publishes then deletes).
- Crash recovery via the record store: pending outbox event survives process death and a new process resumes it (observed: A at status=Attempting, version=4, 1 pending outbox event; phase2 completed it).
- Retry with backoff on step errors (observed: transient failure -> retry -> success; capab attempts=3).
- Auto-pause after error threshold (`PauseAfterErrCount`) + `WithPauseRetry` auto-resume (observed: capab pause-item reached Done).
- Pause / Cancel via native `RunStateController` (observed: cancel-item RunState=Cancelled with reason).
- Terminal statuses produce RunState=Completed.
- Status query via RecordStore List filters (ready-work query).
- Per-run lineage via `Meta.Version` increments (1..5 observed).
- Light weight: embeddable Go library; app owns the state carrier (replaceable store).

### Only expressible via light mapping (app logic on native primitives)

- **Work Item identity**: a Work Item is a workflow Run keyed by ForeignID (mapped naming; native run identity exists).
- **Dependency / ready work**: no cross-run dependency graph; readiness is app logic that queries the store (native store query) and an external Callback nudges dependents when a dependency completes (native Callback surface).
- **Claim**: expressed as a status transition driven by `wf.Callback`; exclusivity is the library's optimistic record-version guard, not an atomic lease.
- **Attempt**: the workflow Run itself is the execution attempt (run_id); "attempt" is a naming mapping.
- **Output**: a terminal status + object field; no dedicated "output/attachment" concept.

### Missing (gap) — need other wheels / adapter composition

- No atomic Claim / Lease with TTL or stale-work timeout (no lease vocabulary; optimistic version guard only).
- No Review / executor separation primitive.
- No human-approval gate primitive (pause is available but resume/approval flow must be built).
- No export surface for Work Items / state (nothing like Beads `bd export --all`); export must be composed.
- No external Workspace interaction (no agent-facing surface at all; it is a Go library for application code).
- Durable record store requires a SQL adapter for production (upstream sqlstore is MySQL-flavored; needs a real DB). The probe used a thin file adapter because no SQL server/Docker was available.
- In-memory adapters (memstreamer/memrolescheduler/memtimeoutstore) are single-process; cross-process durable scheduling needs Kafka-style streamer / durable role scheduler.
- No central-Boss avoidance issue: it does not force a Boss; the app drives Callbacks.

## 4. Domain answers (from Contract-to-Probe Matrix)

### Domain A — Coordination / Work Lifecycle
| question | answer |
|---|---|
| persistent Work Item identity | YES, native (run id + foreign id) |
| dependencies / ready work | NO native graph; MAPPED via store query + callback |
| Claim / Lease | NO native lease; MAPPED status transition w/ optimistic guard |
| stale recovery | NO stale-work/lease expiry primitive |
| execution attempt independent | YES — each run is an independent attempt |
| Review / executor separation | NO |
| exportability | NO export surface |
| creates central Boss | NO |

### Domain B — Durable Runtime / Recovery
| question | answer |
|---|---|
| crash recovery | YES — observed via outbox + record store (new process resumed) |
| durable execution | YES — events + outbox exactly-once; record store is the carrier |
| retry lineage | YES — backoff retries; versioned records 1..5 |
| state persistence | YES — record object persisted through crash |
| pause / cancel | YES — native RunStateController (observed) |
| human approval | NO primitive (pause only) |
| external Workspace interaction | NO |
| Provider-private state export | NO |
| deletion / rollback cost | RunState has Cancelled/DataDeleted; export absent so rollback is app-level |

## 5. Stop-condition assessment

| Stop condition | Status |
|---|---|
| install / init failure | Not hit (go get + build + run exit 0/137 as designed) |
| native capability failure on steps 1-3 | Not hit |
| uncontrolled background/autostart | Not hit (no background daemon; probe.exe exits) |
| out-of-isolation writes | Not hit (all under F:\nexus-probes\coordination\go-workflows-e3 and committed evidence) |
| inability to clean up | Not hit (see CLEANUP.md) |
| forced custom Engine to fake claim/lease | Not hit — no Claim/Lease/Review semantics fabricated; gaps recorded as gaps |

## 6. Scope caveat

Native-protocol E3 of the go-workflows library only. No Nexus fit, no superiority
comparison, no Provider selection, no production durability claim (SQL adapter not
exercised), no `COMPOSE` verdict — the matrix above feeds the future COMPOSE
question only.
