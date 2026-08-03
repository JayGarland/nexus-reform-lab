# Read-Only Repository-wide Persistent Artifact World Audit
> **Iteration**: Foundation 0.4 — Worldhood Audit
> **Date**: 2026-08-03
> **Mode**: STRICTLY READ-ONLY. No existing file was modified. New files exist ONLY under `research/audit/world-audit/`.
> **Baseline Commit**: `a2d2434d38b33c67dd3535375621ae9523b6fbd7` (`experiment/fail-closed-verifier-0.3.2f`)
> **Remote**: `origin` = `https://github.com/JayGarland/nexus-reform-lab.git`

This directory is the single, isolated output area for the repository-wide World audit. All conclusions must be re-examined by a box-outside reviewer before any write-back to `state/` or `handoff/`.

## Contents

| File | Purpose |
|---|---|
| `README.md` | This index and audit methodology summary |
| `FILE_ROLE_INVENTORY.md` | Per-directory role classification of all 108 tracked files |
| `AUTHORITY_MAP_AUDIT.md` | Dimension 2 — authority map conflicts & redundancy |
| `STATE_RECOVERY_AUDIT.md` | Dimension 3 — state recoverability from files only |
| `CURRENT_KNOWLEDGE_AUDIT.md` | Dimension 5 — is there a real Current Knowledge layer? |
| `PROTOCOL_GOVERNANCE_AUDIT.md` | Dimension 6 — protocol-as-software assessment |
| `STIGMERGY_RUNTIME_AUDIT.md` | Dimension 7 — stigmergic dynamics assessment |
| `REENTRY_CONTINUITY_AUDIT.md` | Dimension 8 — execution trace & re-entry |
| `OPERATOR_ISOLATION_AUDIT.md` | Dimension 9 — operator apparatus isolation |
| `WORLDHOOD_VERDICT.md` | Dimension 10 — final level & verdict |
| `raw/git_ls_files.log` | Full `git ls-files` inventory (108 entries) |
| `raw/tree.log` | `git ls-tree -r HEAD` inventory |
| `raw/link_check.log` | Mechanical link/anchor check over all 70 tracked markdown files |
| `raw/authority_claims.log` | Keyword scan for authority declarations (586 hits) |
| `raw/orphan_files.log` | Incoming-link analysis (orphan detection) |
| `raw/commands.log` | Command evidence log |

## Methodology

1. Full tracked-file inventory built from `git ls-files` (not hand-picked).
2. Mechanical link check over every tracked markdown file (relative-path existence, case, anchor, tracked-target).
3. Authority keyword scan over all tracked `.md/.json/.txt` files.
4. Orphan detection via incoming-markdown-link analysis.
5. Ten-dimension audit with repository-relative path + line/heading + commit SHA citations.
6. No existing file was written. No cold-start test, no CR-S0, no agent/runner/compiler launched.

## Dimension 1 — Unique Entry (summary; detailed evidence in STATE_RECOVERY_AUDIT.md)

Verdict: **CONFIRMED**.
1. `WAKE.md` exists at repository root as the unique mandatory entrance. ✓
2. `WAKE.md:7-10` explicitly declares "You have no inherited conversational memory. Continuity must be reconstructed entirely from this repository." ✓
3. Reading order defined: `WAKE.md:28-46` (7-step sequence). ✓
4. Prohibition before recovery complete: `WAKE.md:50-60` (STRICTLY FORBIDDEN until sequence complete). ✓
5. No competing entry authority: `MEMORY_MAP.md:82` and `HELLO.md:29` both defer to WAKE as the single entrance; `AGENTS.md` is operator-side instructions, not a competing entry. ✓
6. All files referenced by WAKE exist (verified: CURRENT_PHASE, CURRENT_VERDICT, NEXT_ACTION, MEMORY_MAP, REVOLUTION, FIVE_POINT_FRAMEWORK). ✓
7. Paths valid (link checker confirms). ✓
8. No circular/infinite expansion: WAKE's sequence is finite; MEMORY_MAP links back to WAKE (a cycle exists WAKE→MEMORY_MAP→WAKE but it is a navigation cycle, not an expansion loop; MEMORY_MAP.md:3 states it does not store dynamic values). ✓

## Dimension 4 — Memory-Type Separation (summary; full classification in FILE_ROLE_INVENTORY.md)

Verdict: **CONFIRMED-WITH-NOTES**.
- Doctrine: root docs + `research/synthesis/` canonical files. Separate. ✓
- Current knowledge: absent layer (placeholder only) — no mixing possible yet. ✓
- Current state: `state/` 5 files, single-source enforced. ✓
- Raw evidence: `research/legacy-evidence/` (immutable), `research/examinations/evidence/` (SHA-verified). ✓
- Historical failures: `research/legacy-evidence/failed-slice-0/` + rejected verdict rows. ✓
- Protocols: AGENTS.md, REMOTE_FIRST, COLD_START (scattered but distinct from state). ✓
- Handoff: `handoff/` (HELLO derived-pointer, SESSION_LOG historical-index). ✓
- Experiments: legacy `failed-slice-0` (HISTORICAL-FAILURE). ✓
- Logs: `state/logs/`, `research/*/logs/` (EVIDENCE class). ✓
- Tests: `state/tests/`, `research/examinations/verify_source_register.js` (OPERATOR_ONLY). ✓
- Notes: (a) `research/examinations/evidence/synthesis/` duplicates `research/legacy-evidence/local-world/` payloads — housekeeping only, no authority leak; (b) `state/CURRENT_VERDICT.md` row text is stale (A-2); (c) no single oversized file carries multiple authority roles.

## Evidence Limitation

The operator's opening message states Foundation 0.3.2f scope was "box-accepted". This is a chat-declared claim. The on-disk record (`state/EXTERNAL_VERDICT_HISTORY.md:26`, `state/CURRENT_PHASE.md:11`) still shows `UNDER OUTSIDE REVIEW` / `FOUNDATION 0.3.2e PARTIAL PASS`. Per the World's own rule (chat summaries are navigation aids only), that acceptance is **CLAIMED-NOT-EVIDENCED** until written into `state/EXTERNAL_VERDICT_HISTORY.md` by a box-outside reviewer. This audit therefore treats 0.3.2f as still-under-review on the authority layer.
