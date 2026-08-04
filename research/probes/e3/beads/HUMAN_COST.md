# Human Cost — Beads E3 Probe (raw measurements)

> Probe metric definitions from `COORDINATION_AND_DURABLE_RUNTIME_PROBE_PLAN.md` §5. Each metric is measured as executed during this E3 probe. Lower is better. Reported raw, not interpreted as an adoption verdict. "No wheel" baseline = files + git only.

## Raw data

| metric | value | measurement notes |
|---|---|---|
| manual routing count | 0 | No human decided which worker/slot gets which item. `bd ready --claim` atomically claimed the single ready item; the operator issued a CLI command but did not route work. |
| manual state lookup count | 0 | State was queried with the same tool that holds state (`bd show`, `bd state list`, `bd ready`, `bd status`). No second tool opened to learn current state. |
| manual recovery steps | 1 | After hard kill, one command (`bd where` + `bd show`) from a fresh process answered "what is current state". Recovery itself was automatic — no data repair, no re-import, no re-creation. |
| clarifications required | 0 | No ambiguity surfaced; `bd ready --explain` resolved dependency reasoning mechanically. |
| surfaces monitored | 1 | Single CLI surface (`bd`). No dashboard, no web UI, no background server to watch. (`bd show --watch` exists for live view; not required for monitoring.) |
| time-to-understand-current-state | 1 command (`bd ready --explain`) / ~1 s | One command with dependency reasoning fully answers "what is ready/blocked and why". `bd status` answers overall DB state in 1 command. |
| irreversible decisions exposed to user | 0 (probe-visible) | No destructive/non-rollback choice was pushed to the human during the probe. `bd close` is the terminal op but is a normal workflow action; Dolt history provides versioned lineage. Uninstall/rollback cost measured in CLEANUP.md (delete directory, no system residue). |
| routine notifications exposed to user | 0 | No pings/emails/dashboard alerts. Beads is a local CLI; no notification surface invoked. |

## Summary

- Human burden is concentrated in issuing CLI commands and reading one CLI output. No routing, no separate state-lookup tool, no supervision of a background service.
- The only "surfaces" the human monitors: the `bd` CLI itself (1 surface).
- The probe required zero clarifications and zero irreversible decisions.
- Contrast with "no wheel" baseline (files + git): a human must manually maintain dependency references in files and manually recompute "what is ready" — here that is 1 command.

## Caveat (recorded as measured)

- Metrics reflect this minimal 10-step fixture with a single operator/agent; they are raw probe measurements, not an adoption verdict, and do not extrapolate to multi-agent concurrent load (Beads single-writer embedded mode limits concurrent writers; Dolt server required for concurrent writers — per Candidate Refresh card).
