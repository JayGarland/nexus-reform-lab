# Fixture — Beads E3 Probe

## Purpose

Three bounded Work Items forming a dependency chain `A -> B -> C` (B depends on A, C depends on B), created natively with Beads' dependency-aware task graph. This is the minimal coordination scenario from the unified Coordination and Durable Runtime Probe Plan (step 1 of 10).

## Fixture records

| item | id | deps | created | created_by |
|---|---|---|---|---|
| Probe Task A | `work-5cr` | (none) | 2026-08-04T11:35:56+02:00 | probe-agent-e3 |
| Probe Task B | `work-qi9` | work-5cr (blocks) | 2026-08-04T11:36:12+02:00 | probe-agent-e3 |
| Probe Task C | `work-dzb` | work-qi9 (blocks) | 2026-08-04T11:36:13+02:00 | probe-agent-e3 |

All three labeled `probe,e3`, type `task`, priority P2.

## Input fixture file

- `FIXTURE/issues_after_run.jsonl` — full JSONL export of the store at probe end (6 records; includes the 3 fixture tasks plus 3 infrastructure state-change event beads). This is the durable, exportable state carrier evidence (`bd export -o issues.jsonl`).

## Lifecycle outcomes (state deltas)

| event | before | after |
|---|---|---|
| ready query (step 2) | A,B,C open | ready={A}, blocked={B,C} |
| claim (step 3) | ready={A} | A IN_PROGRESS + assignee, ready={} |
| attempt (step 4) | A IN_PROGRESS | A attempt=1 |
| intermediate (step 5) | attempt=1 | attempt=1, phase=execute, note |
| hard kill (step 6) | attempt=1, phase=execute | (no state loss) |
| recovery (step 7) | — | attempt=1, phase=execute intact |
| continue (step 8) | phase=execute | phase=finish, note |
| output/close (step 9) | A IN_PROGRESS | A CLOSED, ready={B} |

## Immutability note

The fixture tasks were created once and never rewritten except through Beads' own native state/close operations (which create Dolt commits — see `bd history work-5cr`, 10 entries). No external tool modified the store.
