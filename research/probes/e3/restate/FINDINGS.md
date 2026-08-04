# FINDINGS.md — Restate 1.7.2 E3 probe

> Raw evidence: `RAW_OUTPUT/`. Each finding is tagged `OBSERVED` (executed with raw
> evidence) or `DOCUMENTED` (upstream docs/source) or `NOT VERIFIED`.
> All observed evidence is committed in this directory.

## 1. Central server is mandatory — CONFIRMED (`OBSERVED`)

- Restate requires a running server (`restate-server`) that owns the journal and
  state. With the server stopped, the ingress refused the connection
  (`No connection could be made because the target machine actively refused it.
  (localhost:8090)`); no invocation, no state access, no service call is possible.
- On restart, the same data dir resumed: the invocation journal was replayed and
  in-flight work recovered automatically. State survived the restart.
- Evidence: `RAW_OUTPUT/10step/serverdown-ingress-error.txt`,
  `RAW_OUTPUT/server-full.log` (09:49:10-09:49:11 recovery window),
  `RAW_OUTPUT/10step/step8-state-after-recovery.txt`.
- This is the central-Boss risk flagged in the Candidate Refresh: the durable
  runtime is a service you must operate.

## 2. Installation path on Windows — Docker only, no Windows binary (`OBSERVED`)

- v1.7.2 release assets have NO Windows server binary. Real path on this host is
  Docker (Linux container) via WSL2. Works (image pulled + run), but the operator
  must run Docker Desktop (WSL2) and manage a container. The SDK side is npm
  (cross-platform).

## 3. Durable execution — CONFIRMED (`OBSERVED`)

- `ctx.run` steps are journaled exactly-once. A hard server kill (SIGKILL) between
  steps left step-0 and step-1 completed; after restart, steps 2-5 resumed and the
  invocation completed (`status=COMPLETED`, `progress=6`).
- The host-side execution trace proves completed steps were NOT re-executed:
  each step appears exactly once in `RAW_OUTPUT/fixture/step-trace.log`.
- Durable timers (`ctx.sleep`) suspend and resume across restarts.

## 4. State persistence — CONFIRMED (`OBSERVED`)

- Per-key K/V state set with `ctx.set` survived the crash and the restart.
- State storage location: `SERVER_DATA/<node-id>/` with three RocksDB instances:
  `db/` (partition processor: journal + state), `log-store/` (replicated loglets),
  `replicated-metadata-server/` (metadata). Binary SST/WAL format.
- State is readable natively via the `/query` SQL service (`state` table) and via
  per-key handlers; it is writable only through service handlers (`ctx.set`).

## 5. Crash recovery — CONFIRMED (`OBSERVED`)

- `docker kill` (SIGKILL) mid-invocation -> `docker start` -> automatic recovery.
- Server logs show partition replay: "Replaying N record(s)" and
  "[Auto Recovery] Attempting to extend the chain to recover log availability".

## 6. Retry — CONFIRMED, but per-attempt lineage is NOT preserved (`OBSERVED`)

- A durable step (`ctx.run`) failing transiently was retried (4 attempts observed
  in the execution trace, then success `{"ok":true,"attempts":3}`).
- The journal records the step as ONE `Run` entry plus the final completion; the
  individual retry attempts are not persisted as separate records.
- Invocation-level lineage IS preserved and queryable: `sys_invocation`,
  `sys_invocation_status` (id, target, status, idempotency_key, timestamps,
  journal_size, created_using_restate_version, completion_result/failure).
- GAP: if the required lineage is "every retry attempt of a step is an auditable
  record", Restate does not provide it natively. `retry_count` exists but was
  observed null for completed invocations.

## 7. Pause / cancel / resume / kill — NATIVE (`OBSERVED`)

- `PATCH /invocations/{id}/pause` (202), `/resume` (200), `/kill` (200) all
  native via the admin API; batch variants exist (`/internal/invocations_batch_operations/*`).
- A killed invocation completes with `completion_failure: "[409] killed"`.
- The web UI (admin :9070) exposes these operations too.

## 8. Human-approval gate — NOT NATIVE (`OBSERVED`/`DOCUMENTED`)  => GAP

- No approval/workflow-step primitive exists. The closest native mechanism is a
  manual operator `pause`/`resume`/`kill`, or an external signal implementation
  (ctx.awakeable) written by the developer. A native "human approval blocks until
  approved" gate is absent.

## 9. Canonical state ownership — server-private, SQL-readable, handler-only-writable (`OBSERVED`)

- The state store is a server-private RocksDB (binary; no direct file read).
- The server exposes a read/query surface (DataFusion SQL at `POST /query`) that
  returns full `state`, `sys_invocation`, `sys_invocation_status`, `sys_journal`,
  `sys_journal_events`, `state`, etc. This is native and comprehensive.
- Writes to canonical state happen only through service handlers (`ctx.set`),
  i.e. only code the operator deploys may change state. No external tool can
  mutate it. So state is "locked" to Restate + your handlers, but readable.

## 10. Export path — NO official export tool; a verifiable native read path exists (`OBSERVED`)

- `restatectl` exposes only low-level ops (`storage compact`, `metadata get/put/
  patch/migrate`); there is no user-data export/dump command.
- However, the `/query` SQL service provides a verifiable export path:
  `SELECT ... FROM state` (21 rows), `sys_invocation` (17 invocations),
  `sys_journal` (249 entries) were dumped to `RAW_OUTPUT/export-*.json`.
- The refresh's "export NOT VERIFIED" is now partially resolved: there is no
  official export tool, but a full read/export is achievable through the native
  SQL service (operator-invented usage, no documented guarantee/versioning).

## 11. External Workspace interaction glue — LOW glue, NO transactional guarantee (`OBSERVED`)

- A handler can perform arbitrary side effects (e.g., write to a host "workspace"
  dir): `touchWorkspace` wrote `notes/from-agent.txt` in the probe WORKSPACE.
- Glue needed: run a service process with access to the workspace (path/env),
  register its deployment, invoke via ingress. No special adapter required.
- BUT: external side effects are NOT journaled or transactionally managed by
  Restate. If the invocation crashes/retries after the write, the write is not
  rolled back nor deduplicated. Only the handler's own `ctx` state is durable.
  Any external-Workspace integration therefore needs its own idempotency/rollback
  design on top of Restate.

## 12. Deployment deregistration — HTTP DELETE returned 501 (`OBSERVED`)

- `DELETE /deployments/{id}` returned `501` (Not Implemented) on the admin API.
  Deployment removal is exposed through the UI; the raw HTTP DELETE path did not
  work in this build. Not a blocker (container+image removal is the rollback), but
  recorded.

## 13. License — Business Source License 1.1 (`DOCUMENTED`)

- LICENSE file in v1.7.2 = BSL-1.1 (Licensor Restate Software, Inc./GmbH;
  Change Date 4 years after release; Change License Apache-2.0).
- Not OSI-approved; GitHub SPDX reports NOASSERTION/"Other".
- For this lab's provider-selection question this is material (a permissive/open
  license is not guaranteed before the Change Date).

## 14. SDK/server version skew (`OBSERVED`)

- npm latest SDK is 1.16.2 while the server release is 1.7.2; the two are
  compatible (verified via discovery, protocol v5-7). Version pinning discipline is
  required for reproducibility.

## 15. Dev-mode security posture — signature validation OFF by default (`OBSERVED`)

- The SDK logged: `WARN: Accepting requests without validating request signatures;
  handler access must be restricted`. In a dev/default setup the ingress accepts
  unsigned requests; production deployments must configure request signing /
  network isolation. Relevant when judging "canonical state locked to Restate".

## 16. Human Cost — measured, see `RAW_OUTPUT/HUMAN_COST_RAW.md`

- 0 routing/notification automation; native state lookup in 1 SQL; recovery after
  crash = 1 command (auto-resume); 2-3 surfaces to monitor (server container,
  service process, admin UI); no native notification of stuck/paused work.

## GAP register (things the 10-step fixture could NOT express natively)

```text
GAP-1  Human-approval gate (no native approval primitive)
GAP-2  Ready-work query semantics (deps-satisfied) — state is queryable by SQL,
       but dependency-satisfaction requires a host-side projection or SQL JSON
       parsing; json_get exists but its output hit an Arrow-encoding bug (500) in
       this build
GAP-3  Per-attempt retry lineage (step retries journaled as one entry + final result)
GAP-4  Transactional external-Workspace effects (not journaled/rolled back)
GAP-5  Official user-data export tool (none; SQL read path only, operator-invented)
GAP-6  Windows-native server path (Docker/WSL only)
```

None of these gaps was papered over with a self-made Work Item Engine.
