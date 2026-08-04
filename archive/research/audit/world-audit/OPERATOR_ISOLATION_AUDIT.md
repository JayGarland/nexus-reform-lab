# OPERATOR_ISOLATION_AUDIT.md — Dimension 9: Operator Apparatus Isolation / 操作者装置隔离

> **Audit**: Foundation 0.4 — Read-Only Persistent Artifact World Audit
> **Baseline**: `a2d2434d38b33c67dd3535375621ae9523b6fbd7`
> **Verdict**: **CONFIRMED-WITH-NOTES** (isolation doctrine enforced; two nuances flagged)

---

## 1. Required Separation

| Boundary | Requirement | Present? | Evidence |
|---|---|---|---|
| Agent-visible World vs Operator apparatus | `worlds/` empty of tooling; `operator/` houses tooling | PARTIAL | Both `operator/` and `worlds/` exist but are EMPTY (0 tracked files each). Isolation is declared (INVARIANTS.md:32-34) and the empty dirs provide the boundary structure, but NO apparatus content exists yet to validate against. Legacy evidence shows the isolation pattern was proven in `beads-clean-001` |
| External adjudication | Outside reviewer verdicts recorded separately from agent self-verdicts | YES | `state/EXTERNAL_VERDICT_HISTORY.md` (outside reviewer rulings) vs `state/CURRENT_VERDICT.md` (current authority). STATE_MODEL.md:23 "No Self-Issued Verdicts" |
| Runtime control | No daemons/auto-start/escalation | YES | INVARIANTS.md:37-38, NEXT_ACTION.md:18, REVOLUTION.md:68. No daemon/runner/compiler code exists in repo |
| Secrets | No secrets committed | YES | No `.env`, no tokens, no passwords. Drive manifest has only folder ID (not a secret), charter has path. `state/verify_state_consistency.js` and tests contain no credentials |
| Host-machine paths in canonical knowledge | Should not be unnecessarily embedded | PARTIAL | `drive-manifest.json:6` contains `G:\My Drive\ChatGPT-Bridge` (box-side sync path, needed for the bridge). Historical evidence files contain `C:\Users\...`, `F:\foundry\...`, `F:\nexus-p0-controlled-bootstrap\...` — these are in EVIDENCE (historical), not current knowledge. No host path appears in `state/` current files except `state/logs/*` (operational logs, timestamped) |
| Official Nexus isolation | Reform lab ≠ legacy Nexus | YES | CHARTER.md:3-10 (clean-room), fixtures isolated under `fixtures/legacy-nexus/`, legacy evidence under `research/legacy-evidence/`; no auto-read of F:\nexus (AGENTS.md) |
| Verifier not mistaken for external reviewer | Verifier is a check, not an adjudicator | YES | STATE_MODEL.md:23 (no self-issued verdicts); verifier output is `EVIDENCE` class, outside reviewer writes EXTERNAL_VERDICT_HISTORY |
| World cannot modify its own immutable boundary | Security boundaries in INVARIANTS (ratified, immutable) | YES | INVARIANTS.md frontmatter RATIFIED; WAKE prohibits modifying doctrine |
| Audit log not mistaken for runtime fact | Logs are `EVIDENCE`/`HISTORICAL` class | YES | Classified in FILE_ROLE_INVENTORY.md; STATE_MODEL.md:7 distinguishes them |

## 2. Findings

- **O-1**: `operator/` and `worlds/` are empty scaffolds. The separation is structurally correct (INVARIANTS §4, REVOLUTION.md:32) but has never been populated/validated in the clean-room repo. This is a Level 3 requirement; not a cold-start blocker.
- **O-2 (note, not violation)**: `state/` currently contains the verifier + tests (`verify_state_consistency.js`, `tests/verify_state_consistency_negative_tests.js`). Per INVARIANTS §4, operator tooling "MUST remain isolated inside `operator/`". These verifier scripts live under `state/`, not `operator/`. However, they are *agent-visible state-integrity tooling* integral to the state model (referenced from HELLO.md), and no `operator/` population exists yet. Flagged for box-outside decision: relocate verifier tooling to `operator/` when the operator apparatus is first populated, or formally declare state-verifiers as World-internal projections.
- **O-3 (note)**: `research/examinations/evidence/synthesis/` and `research/legacy-evidence/local-world/` duplicate each other's payloads. Both are evidence; no authority leak. Duplication is a housekeeping issue, not an isolation breach.
- **O-4**: Drive manifest references host path `G:\My Drive\...` and drive-manifest JSON references `G:\` — box-side operational config, correctly confined to `external-artifacts/`, not canonical knowledge pages.

## 3. Verdict

```text
CONFIRMED for the boundaries that exist (external adjudication chain, no-secrets,
no-runtime-control, legacy isolation, verifier-not-reviewer).
PARTIAL for apparatus validation: operator/ and worlds/ are empty scaffolds.
One flagged decision: state/ verifier tooling placement vs INVARIANTS §4 operator/ rule.
```
