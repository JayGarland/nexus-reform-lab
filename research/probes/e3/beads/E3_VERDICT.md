# E3 Verdict — Beads (gastownhall/beads) — Coordination / Work Lifecycle

## Verdict

```text
E3 PASSED — CONFIRMED FOR E3 SCOPE
```

## Basis

E3 PASSED means: the official upstream Beads v1.1.2 Windows amd64 binary was obtained (checksum-verified against the upstream release digest), installed in an isolated directory, started, ran the full minimal 10-step Coordination scenario natively, survived a simulated process interruption with fresh-instance recovery, exported state, and was fully cleaned up with no residue.

- Upstream: `github.com/gastownhall/beads` v1.1.2, MIT, tag target commit `20e493e569c922d1253bdeff068c5e56c94957fb`; `bd --version` = `1.1.2 (20e493e56)`.
- Install: single official binary, `bd init --non-interactive` in isolated `work/`; embedded Dolt; no daemon, no ports, no credentials, no network at run time.
- Steps 1-10 executed natively: create A->B->C with deps (`bd create --deps`), ready query (`bd ready --explain`), atomic claim (`bd ready --claim`), attempt state (`bd set-state attempt=1`), intermediate persistence (`bd set-state phase=execute` + `bd note`), hard-kill of live process, fresh-instance recovery with full state intact, attempt continuation (`phase=finish`), output submission (`bd close`), lineage+export (`bd history`, `bd vc status`, `bd export`).
- Durable state verified: 10-commit Dolt history on `work-5cr`; branch `main` HEAD `bmo4icc5`; JSONL export of 6 records.
- Cleanup verified: probe dir removed, no bd process, no port, no global-config mutation; `state/verify_state_consistency.js` untouched.
- No custom Engine or test Adapter was written; no fixture-side capability was papered over; GAPs recorded (see FINDINGS.md).

## Not established

```text
- Nexus fit
- superiority over other Coordination candidates (go-workflows)
- ADOPT / ADAPT / COMPOSE / REJECT verdict
- durable retry lineage, pause/cancel, human-approval gate, external Workspace interaction, concurrent multi-writer (recorded as GAPs)
- E4 fixed fixture / E5 replacement
- Provider selection or binding
```

ADOPT / KEEP / SELECTED / BOUND / NEXUS FIT CONFIRMED are not used.
