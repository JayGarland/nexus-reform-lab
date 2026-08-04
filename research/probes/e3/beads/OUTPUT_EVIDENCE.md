# Output Evidence — Beads E3 Probe

> Maps each probe claim to its concrete artifact. Chat summaries are not evidence; the artifacts below are the evidence.

## Claim → artifact map

| claim | artifact | status |
|---|---|---|
| Upstream = Beads v1.1.2, MIT, tag commit `20e493e569c922d1253bdeff068c5e56c94957fb` | `UPSTREAM_IDENTITY.md` (GitHub API inspected 2026-08-04) | CONFIRMED |
| Official Windows binary checksum-verified against release digest | `UPSTREAM_IDENTITY.md` (downloaded sha256 == release digest `4591b07bf...`) | CONFIRMED |
| `bd --version` = 1.1.2 (20e493e56) | `UPSTREAM_IDENTITY.md`; `COMMANDS.md` step 0 | CONFIRMED |
| Init created isolated store with prefix `work`, embedded Dolt | `COMMANDS.md` step 1; `CAPTURED_STORE/config.yaml` | CONFIRMED |
| 3 fixture tasks A->B->C created with dependency chain | `FIXTURE/README.md`; `FIXTURE/issues_after_run.jsonl` (deps fields `depends_on_id`); raw create logs `RAW_OUTPUT/step1-create-A/B/C.log` | CONFIRMED |
| Ready semantics: ready={A}, blocked={B,C}, dependency-aware reasons | `COMMANDS.md` step 3 (`bd ready --explain` output) | CONFIRMED |
| Atomic claim: A → IN_PROGRESS + assignee, ready queue emptied | `COMMANDS.md` step 4; `AFTER_STATE.txt` | CONFIRMED |
| Attempt + intermediate state persisted (attempt=1, phase=execute, note) | `COMMANDS.md` steps 5-6; `CAPTURED_STORE/interactions.jsonl`; event beads in export | CONFIRMED |
| Hard-kill of live bd process (PID 56444); process absent after | `COMMANDS.md` step 7; `PROCESS_LIST_AFTER.txt`; `RAW_OUTPUT/watch_before_kill_stdout.txt` / `_stderr.txt` | CONFIRMED |
| Fresh-instance recovery: same store, IN_PROGRESS + attempt=1 + phase=execute intact | `COMMANDS.md` step 8; `AFTER_STATE.txt` | CONFIRMED |
| Attempt continued (phase=finish) post-recovery | `COMMANDS.md` step 9 | CONFIRMED |
| Output submitted: A CLOSED with close_reason; blocker released → B ready | `COMMANDS.md` step 10; `FIXTURE/issues_after_run.jsonl` (A closed, B status open); `AFTER_STATE.txt` | CONFIRMED |
| Export surface works (6-record JSONL) | `FIXTURE/issues_after_run.jsonl` (6 lines) | CONFIRMED |
| Durable versioned lineage (10 Dolt commits, branch main HEAD `bmo4icc5`) | `COMMANDS.md` step 11; `AFTER_STATE.txt`; `bd history`/`bd vc status` outputs | CONFIRMED |
| No leftover processes / ports / daemon after probe | `PROCESS_LIST_BEFORE.txt`, `PROCESS_LIST_AFTER.txt`, `AFTER_STATE.txt` (no bd process, no listening port) | CONFIRMED |
| Cleanup reversible (delete directory, no global residue) | `CLEANUP.md` | CONFIRMED |
| Human Cost raw metrics | `HUMAN_COST.md` | CONFIRMED (as measured) |

## GAP claims (native capability absence)

| gap | evidence | status |
|---|---|---|
| No durable retry lineage, pause/cancel, human-approval gate, external Workspace interaction, concurrent multi-writer | `FINDINGS.md` GAPs 1-5; no native command for these observed across the full `bd --help` surface and the executed steps | CONFIRMED (absence observed at E3 surface) |

## Not established

```text
- Nexus fit
- superiority over other Coordination candidates (go-workflows)
- ADOPT / ADAPT / COMPOSE / REJECT verdict
- E4 fixed fixture / E5 replacement
- Provider selection or binding
- concurrency/scale behavior beyond single-writer embedded mode
```
