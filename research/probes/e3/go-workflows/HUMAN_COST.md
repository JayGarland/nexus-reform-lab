# Human Cost — go-workflows (luno/workflow v0.5.0) E3

Measured during the unified 10-step scenario and the capab probe. Lower is better.
These are raw Probe metrics (per Probe Plan §5); no Human Layer Contract is created.

## Baseline ("no wheel": files + git only)

- manual routing count: 1 per item (human assigns which agent does which item)
- manual state lookup: open the state file / git log each time
- manual recovery: re-run or re-derive from scratch
- surfaces to monitor: 1 (filesystem/git)

## go-workflows probe measurements

| metric | count | note / evidence |
|---|---|---|
| manual routing count | 1 | one "claim" callback (`wf.Callback`) per item; the library auto-drives step transitions — evidence phase1/phase2 logs |
| manual state lookup count | 0 during a normal run | state is a status field in the record store; a query returns it; during the probe the run itself was observed via store reads (no separate tool) |
| manual recovery steps | 0 (recovery is automatic) | after exit 137, a new process resumed A from Attempting with no human action — evidence phase2.log |
| clarifications required | 0 | native API is typed; no disambiguation needed |
| surfaces the user must monitor | 1 | one embedded Go program (the app); no separate dashboards/CLIs needed by the library |
| time-to-understand-current-state | low | one status query (`RecordStore.List`/`Latest` with filters) returns the run state; or `Await` for blocking |
| irreversible decisions exposed to user | none during run | Cancel is explicit and app-driven; no hidden destructive path |
| routine notifications exposed to user | none | no notification surface exists (no daemon, no pings) |

## Human Cost notes

- go-workflows has no CLI/dashboard surface at all; the human operates only the
  embedding Go application. This keeps "surfaces to monitor" at 1.
- The claim step is not a human action in the library's model; it is a callback the
  application calls, so the human is not forced to act as a router between runs.
- Recovery required zero manual steps (outbox + record store replay), which is the
  strongest Human-Cost result for the Durable Runtime domain.
- Counter-balance: there is no built-in export or human-approval surface, so a
  human needing an audit view must query the store or build a projection.
