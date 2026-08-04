# Findings — Beads E3 Probe (Coordination / Work Lifecycle)

## Native capability results (per probe plan step mapping)

| probe step | Beads native surface | result |
|---|---|---|
| 1. create bounded work items A->B->C | `bd create` with `--deps` | DONE — A=`work-5cr`, B=`work-qi9`, C=`work-dzb`; `bd graph --all` shows 2 blocking relationships across 3 layers |
| 2. query ready work | `bd ready` / `bd ready --explain` / `bd ready --json` | DONE — ready={A}, blocked={B,C}; dependency-aware with explainable reasons |
| 3. claim one item (atomic, exclusive) | `bd ready --claim` | DONE — atomic; A → IN_PROGRESS + assignee; A disappears from ready queue; exclusive (no parallel claim of same item) |
| 4. establish execution attempt | `bd set-state <id> attempt=1` | DONE — creates event bead (`work-5cr.1`) |
| 5. persist intermediate state inside attempt | `bd set-state phase=execute` + `bd note` | DONE — event bead `work-5cr.2`, note appended, dimension readable via `bd state list` |
| 6. simulate interruption | hard-kill live `bd show --watch` process (PID 56444) | DONE — process terminated; confirmed absent |
| 7. recover with fresh instance (same store) | new process, same `.beads/`; `bd where` auto-discover | DONE — IN_PROGRESS, attempt=1, phase=execute all intact |
| 8. continue attempt | `bd set-state phase=finish` (previous shown) | DONE — event `work-5cr.3` |
| 9. submit output | `bd close <id> --reason "..."` | DONE — A CLOSED with close_reason; blocker released → B now ready |
| 10. save lineage/evidence | `bd export -o issues.jsonl`, `bd history`, `bd vc status` | DONE — 6-record JSONL, 10-commit Dolt history, branch main HEAD `bmo4icc5` |

## Positive observations

- **Dependency-aware ready semantics** are native and explainable (`bd ready --explain` gives per-item reason and unblock counts).
- **Atomic exclusive claim** is a one-command primitive (`bd ready --claim`) with no human routing.
- **Durable, versioned state** by default: every write is a Dolt commit (embedded mode); `bd history`/`bd vc` expose lineage; state survives process hard-kill and fresh-instance recovery without any data repair.
- **No background daemon, no ports, no central Boss.** Embedded Dolt mode is single-writer local CLI; recovery is a fresh CLI process on the same store.
- **Export surface exists and works** (`bd export -o issues.jsonl` → 6 records) — satisfies the exportability question positively for the coordination carrier.
- **Install/init is reversible and local**: single binary, `bd init` creates only a `.beads/` store plus per-project integration files inside the chosen directory; cleanup is delete-the-directory (see CLEANUP.md).

## GAPs (native capabilities NOT provided by Beads at this probe)

Recorded per probe plan §3 ("what a candidate cannot prove natively must be recorded as a gap"):

1. **Durable retry lineage** — `GAP`: no native retry/attempt-failure lineage beyond Dolt history; no retry-policy or attempt-count surface observed at E3. (Feeds COMPOSE question with durable-execution candidates.)
2. **Pause / cancel semantics** — `GAP`: no native pause/cancel workflow primitive observed. `bd set-state` can set arbitrary dimensions but there is no dedicated pause/cancel lifecycle. (Defer/reopen exist as issue-state ops but not attempt pause/cancel.)
3. **Human-approval gate** — `GAP`: no native human-approval gate between attempt steps.
4. **External Workspace interaction** — `GAP`: Beads manages issue/state, not external Workspace filesystem interaction; out of scope for this carrier.
5. **Concurrent multi-writer** — `GAP` (documented upstream limitation): embedded mode is single-writer; concurrent writers require a Dolt server (not probed; per Candidate Refresh card). Not papered over — recorded as gap.

## Stop-condition check

| stop condition | observed? |
|---|---|
| install/init failure | No — init succeeded |
| native capability failure on steps 1-3 | No — all native |
| uncontrolled background/autostart | No — no daemon, no autostart, no ports |
| out-of-isolation writes | No — all writes inside probe dir |
| inability to clean up | No — see CLEANUP.md |
| forced custom Engine | No — all 10 steps expressed natively; no fixture-side Engine written |

## Evidence-level conclusion

- E3 scope: install ✓ (checksum-verified official binary), start ✓, minimal native scenario ✓, recovery-after-kill ✓, export ✓, cleanup ✓ (see CLEANUP.md).
- No `ADOPT / KEEP / SELECTED / BOUND / NEXUS FIT CONFIRMED` is claimed. This is a probe result only.
