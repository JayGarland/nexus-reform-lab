# AUTHORITY_MAP_AUDIT.md — Dimension 2: Authority Map / 权威关系

> **Audit**: Foundation 0.4 — Read-Only Persistent Artifact World Audit
> **Baseline**: `a2d2434d38b33c67dd3535375621ae9523b6fbd7`
> **Verdict**: **CONFIRMED-WITH-2-FINDINGS** (authority separation is structurally correct; two stale/contradictory statements must be adjudicated by a box-outside reviewer)

---

## 1. Authority Source Map

| Fact Class | Unique Authority Source | Notes |
|---|---|---|
| Doctrine | `research/synthesis/FIVE_POINT_FRAMEWORK.md` (sole canonical, self-declared line 1-4) + `REVOLUTION.md`, `CHARTER.md`, `INVARIANTS.md` | WAKE.md:19-23, MEMORY_MAP.md:34-38 |
| Current Phase | `state/CURRENT_PHASE.md` (single source, line 3, 9) | WAKE reading order item 2 |
| Current Verdict | `state/CURRENT_VERDICT.md` (sole source, line 3) | Enforced by `state/verify_state_consistency.js` Check 1 (subject uniqueness) |
| Next Action | `state/NEXT_ACTION.md` (sole source, line 3) | Enforced by verifier Check 5 |
| Knowledge | **NOT PRESENT** (see CURRENT_KNOWLEDGE_AUDIT.md) — no compiled knowledge pages exist | MEMORY_MAP.md:56 declares placeholder |
| Evidence | `research/legacy-evidence/`, `research/examinations/evidence/`, `state/logs/`, `research/migration/logs/` | Immutable, append-only classification |
| Historical Verdict | `state/EXTERNAL_VERDICT_HISTORY.md` (historical log, not current state) | Schema-enforced 9 columns |
| Git Lineage | Git history itself (`git log` / `git rev-parse`) | Dynamic resolution; static SHA self-embedding prohibited (STATE_MODEL.md:24) |
| Protocols | `AGENTS.md`, `REMOTE_FIRST_AUDIT_METHOD.md`, `COLD_START_RECOVERY_TEST.md` | See PROTOCOL_GOVERNANCE_AUDIT.md |
| Experiments | `research/legacy-evidence/failed-slice-0/` (historical failures) | Not current authority |
| Handoff | `handoff/HELLO.md` (derived pointer), `handoff/SESSION_LOG.md` (historical index) | Both correctly non-authoritative |

## 2. Anti-pattern Checks

- **Duplicate Current Truth**: NONE. `CURRENT_VERDICT.md` is the sole verdict table; `CURRENT_PHASE.md` no longer carries a parallel verdict table (removed in 0.3.2 per `PERSISTENT_MEMORY_STRUCTURE_AUDIT.md:50`). Verifier enforces subject uniqueness (negative fixture 2 tests this).
- **History overriding current**: No mechanism promotes historical files above `state/`. WAKE.md:20 bans superseded/historical-failure usage as current rules.
- **Later timestamp ≠ higher authority**: STATE_MODEL.md:27 rule 5 explicitly forbids timestamp-based precedence.
- **Chat summary as evidence**: Repeatedly disclaimed (WAKE.md:18, STATE_MODEL.md:26, REMOTE_FIRST_AUDIT_METHOD.md:42). No evidence file is derived from chat.
- **Audit file as verdict**: `MIGRATION_GAP_AUDIT.md` and `PERSISTENT_MEMORY_STRUCTURE_AUDIT.md` are classified `EVIDENCE`/historical; they do not write to `CURRENT_VERDICT.md`. The authority chain is: evidence → outside reviewer → `EXTERNAL_VERDICT_HISTORY.md` → current active verdicts in `CURRENT_VERDICT.md`.
- **Partial milestone read as full acceptance**: Schema rules in `verify_state_consistency.js` Check 3 distinguish `PARTIAL PASS` (not fully accepted) from `CONFIRMED` and `CONFIRMED FOR REVIEWED SCOPE`. Negative fixtures 4/5 test this.
- **Canonical/current/historical/superseded separation**: Explicitly distinguished via frontmatter (`SUPERSEDED`, `HISTORICAL-FAILURE`, `EVIDENCE_ONLY`) and file placement.

## 3. Findings

### A-1 (authority-staleness, box-outside action required)
`state/EXTERNAL_VERDICT_HISTORY.md:26` records Foundation 0.3.2f as `UNDER OUTSIDE REVIEW` with `RESOLVE_FROM_GIT`. The operator's opening chat message states 0.3.2f was "box-accepted" (`盒外接受`). The on-disk record does NOT reflect acceptance. Per STATE_MODEL.md:26 (chat is non-authoritative), the acceptance claim is **CLAIMED-NOT-EVIDENCED** in-repo. A box-outside reviewer must write the acceptance into `EXTERNAL_VERDICT_HISTORY.md` before the record matches the claim.

### A-2 (verdict-text staleness, internal inconsistency)
`state/CURRENT_VERDICT.md:16` — "State Consistency" is rated `PARTIAL — … fail-closed behavior is awaiting negative-fixture proof.` However, the negative-fixture proof EXISTS and PASSED: `state/logs/state_consistency_negative_tests.log` (committed) shows `negative fixtures passed: 12/12, positive fixtures passed: 1/1, test process exit code: 0`. So the verdict TEXT is stale: the proof is not "awaiting" in the repo; it is awaiting BOX-OUTSIDE adjudication of 0.3.2f. The text should distinguish "proof generated and committed" from "proof externally accepted". Not a current-state blocker, but a wording/authority conflict.

### A-3 (phase focus staleness)
`state/CURRENT_PHASE.md:10` — Current Focus: "Prove that invalid repository states are mechanically rejected **before the read-only World audit**." The World audit is now in progress. This is expected (0.3.2f was the gate), but the phase file will need a transition after this audit's outside review.

### A-4 (harmless historical duplicates)
`research/examinations/evidence/synthesis/*.md` duplicates `research/legacy-evidence/local-world/*.md` payloads (same content, different location). Both are `HISTORICAL`/`EVIDENCE`; no authority conflict, but noted for memory-type separation (see CURRENT_KNOWLEDGE_AUDIT.md).

### A-5 (orphan canonical-adjacent file)
`research/audit/clean-room-bootstrap-verification.md` has zero incoming links (raw/orphan_files.log). It is a historical audit note; not canonical. Minor navigation gap — no current file references it, so a fresh instance would not discover it. Not a World continuity blocker.

## 4. Authority Conflict Count

- Total distinct authority-conflict findings: **3** (A-1, A-2, A-3). All are staleness/claim-vs-record mismatches requiring box-outside adjudication, not structural duplication.
- No two files independently maintain a parallel **current** verdict table.
