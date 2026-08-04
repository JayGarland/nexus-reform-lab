# E3 Verdict — Restate 1.7.2 (Durable Runtime / Recovery probe)

## Verdict

```text
E3 PASSED — CONFIRMED FOR E3 SCOPE (isolated native-protocol execution)
```

## Basis

E3 PASSED means: Restate installed and ran in an isolated environment per its own
native protocol, completed the unified 10-step minimal scenario, demonstrated the
requested durable-runtime properties with raw evidence, and was fully cleaned up.

Observed with raw evidence (RAW_OUTPUT/):

- Server install + start (Docker, ghcr.io/restatedev/restate:1.7.2, WSL2).
- 10-step fixture: work items A->B->C created; claim exclusivity; attempt +
  intermediate state; SIGKILL crash; restart; auto-resume; no re-execution of
  completed steps; output submission.
- Durable execution journaling; per-key K/V state persistence; crash recovery
  with partition replay + auto-recovery.
- Native retry (step-level, 4 attempts -> success); native pause/resume/kill;
  native idempotency (exactly-once); native SQL query/export surface
  (state, sys_invocation, sys_invocation_status, sys_journal).
- Human Cost metrics recorded (RAW_OUTPUT/HUMAN_COST_RAW.md).
- Cleanup verified: no container, no image, no ports 8090/9070/9080, no fixture
  process, no files outside the probe directory.

## Native capability gaps (marked GAP, not papered over)

```text
GAP-1  Human-approval gate (no native approval primitive)
GAP-2  Ready-work dependency-satisfaction query (state queryable by SQL, but
       dependency semantics need a host-side projection / JSON parsing; json_get
       hit an Arrow-encoding 500 in this build)
GAP-3  Per-attempt retry lineage (step retries journaled as one entry + final result)
GAP-4  Transactional external-Workspace effects (not journaled/rolled back)
GAP-5  Official user-data export tool (SQL read path only, operator-invented)
GAP-6  Windows-native server path (Docker/WSL only)
```

## Not established

```text
- Nexus fit
- superiority over go-workflows / Beads / Temporal
- COMPOSE decision
- Provider selection or binding
- production provenance sufficiency
- E4 / E5
- CR-S0
```

`ADOPT / KEEP / SELECTED / BOUND / SUPERIOR / NEXUS FIT CONFIRMED` are not used
at E3.

## License note (material for later selection)

`Business Source License 1.1` — Change Date 4 years after release, then
Apache-2.0. Not OSI-approved as-is. GitHub SPDX: NOASSERTION / "Other".
