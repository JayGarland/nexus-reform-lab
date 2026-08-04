# E3 Probe — Restate 1.7.2 (Durable Runtime / Recovery, Domain B primary candidate #2)

> Probe: Restate real install + run, durable execution, state persistence, crash
> recovery, and external workspace adaptation cost, per
> `research/probes/COORDINATION_AND_DURABLE_RUNTIME_PROBE_PLAN.md` and
> `research/prior-art/CANDIDATE_REFRESH_COORDINATION_AND_DURABLE_RUNTIME.md`.
> Status: `SUBMITTED FOR OUTSIDE REVIEW`
> Isolated environment: worktree `F:\nexus-lab-worktrees\nexus-lab-2`
> (branch `cleanroom/worktree-nexus-lab-2`); server data + fixture fully removed
> after evidence capture (see CLEANUP.md).

## Scope (only)

Confirm Restate can be installed, started, and run the unified 10-step minimal
scenario in an isolated environment using ONLY native primitives, with raw
evidence and verified cleanup. No Nexus adaptation, no Provider selection, no
`ADOPT / ADAPT / COMPOSE / REJECT`, no CR-S0.

## Result (summary)

- Install: E3 PASSED (Docker image ghcr.io/restatedev/restate:1.7.2 on WSL2;
  no Windows-native server binary exists).
- 10-step fixture: PASSED. Durable execution, K/V state persistence, crash
  recovery (SIGKILL + restart), native retry, native pause/resume/kill/cancel,
  native idempotency, native SQL query/export surface — all observed with raw
  evidence.
- Cleanup: PASSED (container + image + data removed; no residue).
- Native gaps (marked GAP, not papered over): human-approval gate (GAP-1),
  ready-work dependency-satisfaction query semantics (GAP-2), per-attempt retry
  lineage (GAP-3), transactional external-Workspace effects (GAP-4), official
  user-data export tool (GAP-5), Windows-native server path (GAP-6).
- License: Business Source License 1.1 (Change Date 4 years after release, then
  Apache-2.0). Not OSI-approved as-is.

## What was executed

1. Confirmed upstream identity (v1.7.2, tag commit 6f1c080..., main HEAD
   37d2ac7...; BSL-1.1).
2. Ran the server via Docker with a data dir bind-mounted inside the probe dir.
3. Ran a disposable Node SDK (1.16.2) fixture exposing one `WorkItem` virtual
   object using only native primitives.
4. Executed the 10-step fixture (create A->B->C, query state, claim exclusivity,
   attempt, intermediate state, SIGKILL crash, restart recovery, resume, output).
5. Verified retry (4 attempts), pause/resume/kill, idempotency, external
   workspace write, and the native SQL export surface.
6. Recorded Human Cost metrics.
7. Full uninstall + residue check.

## Evidence files

```text
README.md  UPSTREAM_IDENTITY.md  SOURCE_IDENTITY.md  ENVIRONMENT.md
COMMANDS.md  FINDINGS.md  OUTPUT_EVIDENCE.md  CLEANUP.md  E3_VERDICT.md
BEFORE_STATE.txt  AFTER_STATE.txt
FIXTURE/          (package.json, package-lock.json, service.js)
RAW_OUTPUT/       (run-log, step traces, server logs, exports, HUMAN_COST_RAW.md)
CAPTURED_WORKTREE/  (empty; evidence lives in FIXTURE/ + RAW_OUTPUT/)
```

## Not established (outside this probe)

- Nexus fit, superiority over go-workflows/Beads/Temporal, `COMPOSE` decision,
  provider selection/binding, E4/E5, CR-S0, production provenance sufficiency.
