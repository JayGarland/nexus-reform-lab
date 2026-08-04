# FILE_ROLE_INVENTORY.md — Repository-wide Role & Authority Classification

> **Audit**: Foundation 0.4 — Read-Only Persistent Artifact World Audit
> **Baseline Commit**: `a2d2434d38b33c67dd3535375621ae9523b6fbd7`
> **Method**: Every tracked file (from `raw/git_ls_files.log`, 108 entries) is classified. Grouped by directory. No sampling.
> **Authority classes**: `CANONICAL` / `CURRENT_STATE` / `DERIVED` / `HISTORICAL` / `EVIDENCE` / `PROTOCOL` / `OPERATOR_ONLY` / `FIXTURE` / `SUPERSEDED` / `TOOLING`
> **Time class**: `current` / `historical`

---

## 1. Root Documents (7 files)

| Path | Declared Role | Inferred Role | Authority Class | Current/Hist | Entry Path | Outgoing Links | Incoming Links | Conflicts | Audit Note |
|---|---|---|---|---|---|---|---|---|---|
| `AGENTS.md` | Neutral clean-room agent operating instructions | Operator + agent protocol preamble (loaded by harness) | `PROTOCOL` | current | via harness/operator | none (no markdown links) | none | none | Root-level agent instructions are shared with operator; not listed in MEMORY_MAP. Per INVARIANTS §4, agent-visible worlds must not contain AGENTS.md — root-level copy is the operator's, `worlds/` is empty so no violation detected |
| `CHARTER.md` | Clean-room lab charter | Doctrine (constitutional) | `CANONICAL` | current | MEMORY_MAP | `external-artifacts/drive-manifest.json` (dir) | MEMORY_MAP, CURRENT_VERDICT | none | Referenced as CONFIRMED in CURRENT_VERDICT.md:9 |
| `INVARIANTS.md` | Immutable safety boundaries | Doctrine (constitutional) | `CANONICAL` | current | MEMORY_MAP | `external-artifacts/drive-manifest.json` (dir) | MEMORY_MAP | none | RATIFIED status; immutable boundary doc. References `worlds/` and `operator/` dirs that are empty scaffolds |
| `MEMORY_MAP.md` | Master navigation map | Navigation index | `CANONICAL` (index) | current | WAKE (5th) | 13 links (root/state/handoff/research) | WAKE, CURRENT_PHASE, CURRENT_VERDICT, STATE_MODEL | none | Declares Knowledge Memory as NOT YET IMPLEMENTED (line 56). Directory links to `research/legacy-evidence/`, `research/migration/`, `research/examinations/` resolve to tracked dirs |
| `REVOLUTION.md` | Foundational manifesto | Doctrine (architectural) | `CANONICAL` | current | WAKE (6th) | `research/synthesis/FIVE_POINT_FRAMEWORK.md` (in mermaid, not md-link) | WAKE, MEMORY_MAP | none | RATIFIED DOCTRINE (Repair 0.2.1). Defines One World + Four Layers |
| `WAKE.md` | Mandatory re-entry entrance | Entry protocol | `CANONICAL` (entry) | current | SELF (1st) | `state/CURRENT_PHASE.md`, `state/CURRENT_VERDICT.md`, `state/NEXT_ACTION.md`, `MEMORY_MAP.md`, `REVOLUTION.md`, `research/synthesis/FIVE_POINT_FRAMEWORK.md` | MEMORY_MAP, HELLO | none | Sole entry. Reading order defined. All referenced files exist. See AUTHORITY_MAP_AUDIT.md |
| `.gitignore` | Git ignore rules | Tooling config | `TOOLING` | current | n/a | n/a | n/a | n/a | Ignores `scratch/`, `.tmp.driveupload/`, `node_modules/`, `*.exe`. `scratch/` contains untracked `migrate.js` (gitignored) |

---

## 2. `external-artifacts/` (1 file)

| Path | Declared Role | Inferred Role | Authority Class | Current/Hist | Entry Path | Outgoing Links | Incoming Links | Conflicts | Audit Note |
|---|---|---|---|---|---|---|---|---|---|
| `external-artifacts/drive-manifest.json` | Google Drive artifact registration manifest | Evidence register | `CANONICAL` | current | MEMORY_MAP | n/a (JSON) | CHARTER, INVARIANTS, REVOLUTION | none | `entries: []` empty. No Drive assets currently registered. Contains host path `G:\My Drive\ChatGPT-Bridge` (box-side path, not canonical knowledge) |

---

## 3. `fixtures/legacy-nexus/slice-0-fixture/` (23 files)

| Path | Declared Role | Inferred Role | Authority Class | Current/Hist | Entry Path | Outgoing Links | Incoming Links | Conflicts | Audit Note |
|---|---|---|---|---|---|---|---|---|---|
| `FIXTURE_METADATA.md` | Read-only legacy fixture metadata | Fixture manifest | `FIXTURE` | historical | none (by reference) | none | none | none | Declares READ-ONLY LEGACY FIXTURE; not active session state |
| `L-0658.query.md` … `L-0768.result.md` (22 files) | Sanitized legacy Nexus letters | Read-only fixture data | `FIXTURE` | historical | none | none (raw letter text) | none | none | Legacy `experiments/slice-0/fixture/raw_letters/` paths preserved verbatim in migrated CURRENT_STATE.md links — source of the 44 broken links (see raw/link_check.log). These fixtures ARE present under `fixtures/legacy-nexus/slice-0-fixture/` |

---

## 4. `handoff/` (2 files)

| Path | Declared Role | Inferred Role | Authority Class | Current/Hist | Entry Path | Outgoing Links | Incoming Links | Conflicts | Audit Note |
|---|---|---|---|---|---|---|---|---|---|
| `handoff/HELLO.md` | Inter-instance handoff | Re-entry pointer file | `DERIVED` | current | WAKE/MEMORY_MAP | `state/CURRENT_PHASE.md`, `state/CURRENT_VERDICT.md`, `state/EXTERNAL_VERDICT_HISTORY.md`, `state/NEXT_ACTION.md`, `state/verify_state_consistency.js`, `state/tests/verify_state_consistency_negative_tests.js`, `state/logs/state_consistency_negative_tests.log`, `WAKE.md` | MEMORY_MAP, STATE_MODEL | none | Lines 20-25 contain a session narrative — chat-like summary, not evidence. Categorized as navigation aid per its own notice. Does not self-declare authority |
| `handoff/SESSION_LOG.md` | Append-only milestone index | Historical milestone ledger | `HISTORICAL` | historical | MEMORY_MAP | none | MEMORY_MAP, STATE_MODEL | `RESOLVE_FROM_GIT_HISTORY` placeholder at line 76 for 0.3.2f (matches `RESOLVE_FROM_GIT` convention in EXTERNAL_VERDICT_HISTORY) | Append-only index. All prior milestones carry 40-char SHAs verified by `state/verify_state_consistency.js` |

---

## 5. `research/audit/` (6 files)

| Path | Declared Role | Inferred Role | Authority Class | Current/Hist | Entry Path | Outgoing Links | Incoming Links | Conflicts | Audit Note |
|---|---|---|---|---|---|---|---|---|---|
| `research/audit/COLD_START_RECOVERY_TEST.md` | Cold-start test spec | Protocol (test benchmark) | `PROTOCOL` | current | MEMORY_MAP (procedural) | `state/CURRENT_PHASE.md`, `state/CURRENT_VERDICT.md`, `state/NEXT_ACTION.md`, `state/OPEN_QUESTIONS.md` | none | none | 10-point benchmark spec. Not yet run (`NOT YET TESTED` per CURRENT_VERDICT.md:18) |
| `research/audit/MIGRATION_GAP_AUDIT.md` | Migration gap audit | Audit report | `EVIDENCE` | historical | MEMORY_MAP | `research/migration/MIGRATION_MANIFEST.json`, `research/migration/verify_migration.js`, `research/migration/logs/migration_verification_raw.log`, `research/migration/logs/hash_comparison.txt` | CURRENT_VERDICT, MEMORY_MAP, STATE_MODEL | none | Supersedes `framework-verification-status.md` (per frontmatter). Canonical migration audit record |
| `research/audit/PERSISTENT_MEMORY_STRUCTURE_AUDIT.md` | Repository structure audit | Audit report (superseded by this audit) | `EVIDENCE` | historical | MEMORY_MAP | links to canonical files in tables | MEMORY_MAP | none | Foundation 0.3.2-era audit; predates this audit. Its own table classification is historical, not current authority |
| `research/audit/REMOTE_FIRST_AUDIT_METHOD.md` | 7-step remote-first audit protocol | Protocol | `PROTOCOL` | current | MEMORY_MAP | none | MEMORY_MAP | none | RATIFIED AUDIT PROTOCOL. Defines epistemic ratings and evidence rules |
| `research/audit/clean-room-bootstrap-verification.md` | Bootstrap verification audit | Audit note | `EVIDENCE` | historical | none | none | none | none | Orphan (no incoming md links). Historical verification record |
| `research/audit/framework-verification-status.md` | Superseded framework status matrix | Superseded draft | `SUPERSEDED` | historical | none | `research/audit/MIGRATION_GAP_AUDIT.md` | PERSISTENT_MEMORY_STRUCTURE_AUDIT (table text, not md-link) | none | Frontmatter `SUPERSEDED — SEMANTIC DRIFT`; correctly not referenced as current authority |

---

## 6. `research/examinations/` (19 files)

| Path | Declared Role | Inferred Role | Authority Class | Current/Hist | Entry Path | Outgoing Links | Incoming Links | Conflicts | Audit Note |
|---|---|---|---|---|---|---|---|---|---|
| `FOUR_LAYER_ONE_WORLD_COMPREHENSION_EXAM.md` | Citation remediation exam | Evidence artifact | `HISTORICAL` / `EVIDENCE_ONLY` | historical | none | references evidence files in text | WAKE (ban), COLD_START (ban) | none | Frontmatter `HISTORICAL_FAILURE / EVIDENCE_ONLY`; WAKE prohibits treating as doctrine. Properly isolated |
| `FOUR_LAYER_ONE_WORLD_SOURCE_REGISTER.json` | Source register schema 2.0 | Evidence register | `EVIDENCE` | historical | none | n/a (JSON) | none | none | 16 sources, 8 claims; verification log shows 28 checks passed (exit 0) |
| `verify_source_register.js` | Source register verifier | Tooling/verifier | `OPERATOR_ONLY` | current | none | n/a | none | none | Verified 28/28 checks exit 0 |
| `evidence/local/beads_clean_001_command_log.jsonl` | Raw beads command log | Raw evidence | `EVIDENCE` | historical | none | n/a | none | none | Primary evidence (36 commands) |
| `evidence/local/beads_clean_001_issue_graph.json` | Raw beads issue graph | Raw evidence | `EVIDENCE` | historical | none | n/a | none | none | Primary evidence |
| `evidence/local/disk_census_manifest.txt` | Raw disk census | Raw evidence | `EVIDENCE` | historical | none | n/a | none | none | Primary evidence |
| `evidence/local/pilot_run_trace_summary.txt` | Raw pilot trace | Raw evidence | `EVIDENCE` | historical | none | n/a | none | none | Primary evidence |
| `evidence/local/sandbox_runs_manifest.txt` | Raw sandbox runs | Raw evidence | `EVIDENCE` | historical | none | n/a | none | none | Primary evidence |
| `evidence/public/grasse_1959_stigmergy.txt` | Public source snapshot | Raw evidence | `EVIDENCE` | historical | none | n/a | none | none | SHA-256 verified |
| `evidence/public/karpathy_autoresearch_readme.md` | Public source snapshot | Raw evidence | `EVIDENCE` | historical | none | n/a | none | none | SHA-256 verified |
| `evidence/public/karpathy_llm_wiki_gist.txt` | Public source snapshot | Raw evidence | `EVIDENCE` | historical | none | n/a | none | none | SHA-256 verified |
| `evidence/public/karpathy_software_2_0.txt` | Public source snapshot | Raw evidence | `EVIDENCE` | historical | none | n/a | none | none | SHA-256 verified |
| `evidence/public/karpathy_software_3_0.txt` | Public source snapshot | Raw evidence | `EVIDENCE` | historical | none | n/a | none | none | SHA-256 verified |
| `evidence/public/theraulaz_1999_stigmergy.txt` | Public source snapshot | Raw evidence | `EVIDENCE` | historical | none | n/a | none | none | SHA-256 verified |
| `evidence/synthesis/local_world_autonomy_boundary.md` | Synthesis doc | Historical synthesis | `HISTORICAL` | historical | none | n/a | none | none | Duplicate of `research/legacy-evidence/local-world/local-world-autonomy-boundary.md` (same payload, different path). Evidence-only |
| `evidence/synthesis/local_world_evolution_lineage.md` | Synthesis doc | Historical synthesis | `HISTORICAL` | historical | none | n/a | none | none | Duplicate of legacy-evidence counterpart. Evidence-only |
| `evidence/synthesis/slice_0_evaluation.md` | Slice 0 eval report | Historical synthesis | `HISTORICAL` | historical | none | n/a | none | none | HISTORICAL-FAILURE content |
| `logs/source_hashes.txt` | Hash comparison log | Evidence log | `EVIDENCE` | historical | none | n/a | none | none | 15 rows record/computed SHA match |
| `logs/source_register_verification.log` | Verifier run log | Evidence log | `EVIDENCE` | historical | none | n/a | none | none | 28 checks, 0 failures, exit 0 |

---

## 7. `research/findings/` (2 files)

| Path | Declared Role | Inferred Role | Authority Class | Current/Hist | Entry Path | Outgoing Links | Incoming Links | Conflicts | Audit Note |
|---|---|---|---|---|---|---|---|---|---|
| `research/findings/prior-art-audit-findings.md` | Prior-art audit findings | Historical findings | `HISTORICAL` | historical | none | none | none | none | Orphan. `epistemic_status: CONFIRMED` as migration; historical not current |
| `research/findings/slice-0-correction-note.md` | Slice 0 correction note | Historical failure record | `HISTORICAL` | historical | none | none | none | none | `epistemic_status: HISTORICAL-FAILURE` |

---

## 8. `research/legacy-evidence/` (31 files) — IMMUTABLE RAW EVIDENCE

All files carry frontmatter with `source_repository: JayGarland/nexus`, `source_commit: c073099481f9faa3abddde96cd22716816010704`, and `epistemic_status`. They are VERBATIM migrations verified by `verify_migration.js` (31/31). Authority class `EVIDENCE`, time class `historical`. They MUST NOT be treated as current rules (WAKE.md:21, STATE_MODEL.md:28).

### 8a. `research/legacy-evidence/failed-slice-0/` (12 files) — `epistemic_status: HISTORICAL-FAILURE`

`beads_execution.log`, `CORRECTION_NOTE.md`, `CURRENT_STATE.md`, `EVALUATION.md`, `S0_REPORT.md`, `compiler.js`, `generic_section_parser.js`, `issue_graph.json`, `real_parser.js`, `beads-clean-001/command-log.jsonl`, `beads-clean-001/issue-graph-final.json`, `beads-clean-001/WORK_STATE.md`

- **Audit note**: `CURRENT_STATE.md` (lines 23-33, 65-243) contains 44 relative links to `experiments/slice-0/fixture/raw_letters/*.query.md|result.md` — the ORIGINAL legacy source paths. Those paths do not exist in this repo; the fixtures live at `fixtures/legacy-nexus/slice-0-fixture/`. This is the sole source of all 44 broken links (raw/link_check.log). Because the file is `HISTORICAL-FAILURE` evidence, this does not break current-state continuity, but it is a path-fidelity defect worth recording.
- `compiler.js`/`generic_section_parser.js`/`real_parser.js`: historical hardcoded/repaired parsers, evidence of the Slice 0 failure mode.

### 8b. `research/legacy-evidence/local-world/` (13 files) — `epistemic_status: CONFIRMED`/mixed

`local-world-autonomous-growth.md`, `local-world-autonomy-boundary.md`, `local-world-census-completeness.md`, `local-world-evolution-lineage.md`, `local-world-full-census.md`, `local-world-openclaw-evidence.md`, `local-world-project-current-understanding.md`, `local-world-safety-stop-status.md`, `local-world-seed-comparison.md`, `local-world-seed-inventory.md`, `raw/autonomy-reconciliation/sandbox_runs_manifest.txt`, `raw/full-census/disk_census_manifest.txt`, `raw/pilot_run_trace_summary.txt`

- **Audit note**: `local-world-openclaw-evidence.md:12` and other files contain `file:///C:/Users/...` and `F:\...` host paths as EVIDENCE (historical). Acceptable as evidence but must not leak into current knowledge (see OPERATOR_ISOLATION_AUDIT.md).

### 8c. `research/legacy-evidence/wheel-probes/` (6 files) — `epistemic_status: PARTIAL`

`prior-art-probe-comparison.md`, `prior-art-probe-evidence-status.md`, `beads/package.json`, `go-workflows/go.mod`, `restate/package.json`, `shared_fixture.json`

- **Audit note**: `prior-art-probe-evidence-status.md:20-22` contains `file:///F:/nexus-p0-controlled-bootstrap/...` host paths — historical evidence referencing an external repo.

---

## 9. `research/migration/` (4 files)

| Path | Declared Role | Inferred Role | Authority Class | Current/Hist | Entry Path | Outgoing Links | Incoming Links | Conflicts | Audit Note |
|---|---|---|---|---|---|---|---|---|---|
| `MIGRATION_MANIFEST.json` | 31-file migration manifest | Evidence register | `EVIDENCE` | historical | MEMORY_MAP | n/a | MIGRATION_GAP_AUDIT, PERSISTENT_MEMORY_STRUCTURE_AUDIT | none | 31 entries, all `semantic_verification: CONFIRMED` |
| `verify_migration.js` | Migration verifier | Tooling/verifier | `OPERATOR_ONLY` | current | none | n/a | MIGRATION_GAP_AUDIT | none | Verifies via git blob extraction |
| `logs/hash_comparison.txt` | Hash comparison log | Evidence log | `EVIDENCE` | historical | none | n/a | MIGRATION_GAP_AUDIT | none | 31/31 match |
| `logs/migration_verification_raw.log` | Migration verification raw log | Evidence log | `EVIDENCE` | historical | none | n/a | MIGRATION_GAP_AUDIT | none | Raw verifier output |

---

## 10. `research/synthesis/` (3 files)

| Path | Declared Role | Inferred Role | Authority Class | Current/Hist | Entry Path | Outgoing Links | Incoming Links | Conflicts | Audit Note |
|---|---|---|---|---|---|---|---|---|---|
| `research/synthesis/FIVE_POINT_FRAMEWORK.md` | **Sole canonical** framework spec | Canonical doctrine | `CANONICAL` | current | WAKE (7th), MEMORY_MAP | mermaid only | MEMORY_MAP, CURRENT_VERDICT, four-layer superseded file, COLD_START, REVOLUTION (mermaid) | none | Header: CANONICAL DOCTRINE. Single canonical authority for the 4-layer-1-world architecture |
| `research/synthesis/LLM_WIKI_CURRENT_KNOWLEDGE_SYSTEM.md` | LLM Wiki architecture spec | Canonical spec (layer 2) | `CANONICAL` | current | MEMORY_MAP | mermaid only | MEMORY_MAP, CURRENT_VERDICT | none | Defines the Wiki system; the Wiki itself is NOT YET IMPLEMENTED (MEMORY_MAP.md:56) |
| `research/synthesis/four-layer-one-world-framework.md` | Draft (superseded) | Superseded draft | `SUPERSEDED` | historical | none | `research/synthesis/FIVE_POINT_FRAMEWORK.md` | WAKE (ban), COLD_START (ban), PERSISTENT_MEMORY_STRUCTURE_AUDIT (table) | none | Frontmatter `SUPERSEDED`; superseded_by FIVE_POINT. Correctly banned from current doctrine |

---

## 11. `state/` (10 files)

| Path | Declared Role | Inferred Role | Authority Class | Current/Hist | Entry Path | Outgoing Links | Incoming Links | Conflicts | Audit Note |
|---|---|---|---|---|---|---|---|---|---|
| `state/CURRENT_PHASE.md` | Current phase | Current state | `CURRENT_STATE` | current | WAKE (2nd) | `CURRENT_VERDICT.md`, `NEXT_ACTION.md`, `../MEMORY_MAP.md`, `STATE_MODEL.md` | WAKE, MEMORY_MAP, HELLO, COLD_START, STATE_MODEL | none | Single source for phase. Note: current phase focus still references "before the read-only World audit" — the audit is now being executed |
| `state/CURRENT_VERDICT.md` | Ratified verdicts register | Current state | `CURRENT_STATE` | current | WAKE (3rd) | `../CHARTER.md`, `../research/synthesis/FIVE_POINT_FRAMEWORK.md`, `../research/synthesis/LLM_WIKI_CURRENT_KNOWLEDGE_SYSTEM.md`, `../research/audit/MIGRATION_GAP_AUDIT.md`, `MEMORY_MAP.md`, `STATE_MODEL.md`, `../research/audit/COLD_START_RECOVERY_TEST.md`, `../research/examinations/`, `../state/EXTERNAL_VERDICT_HISTORY.md` | WAKE, MEMORY_MAP, HELLO, COLD_START, CURRENT_PHASE, STATE_MODEL | **Line 16**: State Consistency `PARTIAL` — but negative-fixture proof exists and passed 12/12 (committed 0.3.2f). See AUTHORITY_MAP_AUDIT.md finding A-2 | Sole source for verdicts. Verifier enforces subject uniqueness |
| `state/EXTERNAL_VERDICT_HISTORY.md` | Outside verdict history | Historical verdict ledger | `HISTORICAL` | historical | HELLO, MEMORY_MAP | `CURRENT_VERDICT.md` | HELLO, CURRENT_VERDICT | **Line 26**: 0.3.2f `RESOLVE_FROM_GIT` + `UNDER OUTSIDE REVIEW` vs operator chat claim of box-acceptance. See AUTHORITY_MAP_AUDIT.md finding A-1 | 9-column schema verified by verifier. Historical log, not current state |
| `state/NEXT_ACTION.md` | Single authorized action | Current state | `CURRENT_STATE` | current | WAKE (4th) | `STATE_MODEL.md` | WAKE, MEMORY_MAP, HELLO, COLD_START, CURRENT_PHASE | none | Single blockquote action strictly verified. Prohibits World audit (line 9) — the operator's round-specific instruction supersedes this for THIS audit only; must be resolved by outside reviewer |
| `state/OPEN_QUESTIONS.md` | Open design questions | Current state | `CURRENT_STATE` | current | COLD_START, MEMORY_MAP | none | MEMORY_MAP, COLD_START, WAKE (report field) | none | 3 open questions |
| `state/STATE_MODEL.md` | Single sources of truth rules | Current state (governance) | `CURRENT_STATE` | current | MEMORY_MAP | `CURRENT_PHASE.md`, `CURRENT_VERDICT.md`, `NEXT_ACTION.md`, `../handoff/SESSION_LOG.md`, `../handoff/HELLO.md`, `../MEMORY_MAP.md` | MEMORY_MAP, CURRENT_PHASE | none | Canonical anti-duplication rules |
| `state/verify_state_consistency.js` | State consistency verifier | Tooling/verifier | `OPERATOR_ONLY` | current | HELLO | n/a | HELLO | none | Fail-closed verifier; 0.3.2f. Writes to `state/logs/state_consistency_verification.log` on run |
| `state/tests/verify_state_consistency_negative_tests.js` | Negative fixture suite | Tooling/test | `OPERATOR_ONLY` | current | HELLO | n/a | HELLO | none | 12 negative + 1 positive fixture; writes `state/logs/state_consistency_negative_tests.log` |
| `state/logs/state_consistency_verification.log` | Verifier run log | Evidence log | `EVIDENCE` | historical | none | n/a | HELLO | none | Shows 0 failures, exit 0 (committed) |
| `state/logs/state_consistency_negative_tests.log` | Negative test run log | Evidence log | `EVIDENCE` | historical | none | n/a | HELLO | **working tree is dirty** — committed version timestamp 19:30:32Z, working tree 19:30:57Z (pre-existing re-run artifact) | Shows 12/12 negative + 1/1 positive pass, exit 0 (committed) |

---

## 12. Summary Counts

- Total tracked files: **108**
- Markdown files: **70**
- Non-markdown (json/txt/jsonl/log/js/go/mod): **38**
- `CANONICAL` files: **10** (WAKE, MEMORY_MAP, REVOLUTION, CHARTER, INVARIANTS, FIVE_POINT_FRAMEWORK, LLM_WIKI spec, drive-manifest, FIXTURE_METADATA-as-fixture, STATE_MODEL-adjacent)
- `SUPERSEDED` files: **2** (`four-layer-one-world-framework.md`, `framework-verification-status.md`)
- `HISTORICAL`/`EVIDENCE` files: **~55**
- `CURRENT_STATE` files: **5** (CURRENT_PHASE, CURRENT_VERDICT, NEXT_ACTION, OPEN_QUESTIONS, STATE_MODEL)
- `PROTOCOL` files: **3** (AGENTS.md, REMOTE_FIRST_AUDIT_METHOD, COLD_START_RECOVERY_TEST)
- `OPERATOR_ONLY` tooling: **4** (verify_state_consistency.js, negative_tests.js, verify_migration.js, verify_source_register.js)
- Orphan files (zero incoming markdown links): **50** — predominantly legacy evidence + fixtures (expected); plus `research/audit/clean-room-bootstrap-verification.md` (orphan audit note). See raw/orphan_files.log.
