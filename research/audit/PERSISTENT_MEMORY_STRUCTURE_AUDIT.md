# Persistent Memory Structure Audit

> **Laboratory Root**: `F:\nexus-reform-lab`  
> **Phase**: `Re-entry Foundation 0.3`  
> **Audit Purpose**: Evaluate repository structure, authority relationships, superseded risks, and cold-start recoverability.  

---

## 1. Executive Summary & Audit Answers

### 1. Is there currently a single entry point?
- **Status**: `NO (Prior to Foundation 0.3)`.
- **Finding**: Fresh AI instances previously relied on prompt instructions or chat summary transcripts.
- **Action**: Creating `WAKE.md` at the repository root as the mandatory single entry point for all transient instances.

### 2. Are there competing doctrines?
- **Status**: `RESOLVED`.
- **Finding**: Draft file `research/synthesis/four-layer-one-world-framework.md` contained outdated "5 parallel components" wording.
- **Action**: Marked `SUPERSEDED`. `research/synthesis/FIVE_POINT_FRAMEWORK.md` and `REVOLUTION.md` are ratified as sole canonical doctrines.

### 3. Could a new instance misread superseded files?
- **Status**: `RISK IDENTIFIED & MITIGATED`.
- **Finding**: Without frontmatter status headers, an LLM reading all `.md` files might ingest superseded drafts as current rules.
- **Action**: Added explicit YAML frontmatter and warning banners to all superseded and historical failure documents.

### 4. Are current phase, verdict, and next action independently logged on disk?
- **Status**: `NO (Prior to Foundation 0.3)`.
- **Finding**: Operational state lived in chat responses rather than dedicated disk files.
- **Action**: Created dedicated state files in `state/` (`CURRENT_PHASE.md`, `CURRENT_VERDICT.md`, `NEXT_ACTION.md`, `OPEN_QUESTIONS.md`).

### 5. Are chat reports acting as authoritative state?
- **Status**: `ELIMINATED`.
- **Finding**: Relying on chat memory violates the core principle that AI instances are transient while the file world is persistent.
- **Action**: Established that GitHub remote commits and on-disk `state/` files are the sole authoritative memory.

### 6. Are historical evidence and current knowledge mixed together?
- **Status**: `ISOLATED`.
- **Finding**: Legacy research files from `JayGarland/nexus` (`c073099481f9faa3abddde96cd22716816010704`) are strictly isolated inside `research/legacy-evidence/`.

### 7. Are there isolated files unreachable from root?
- **Status**: `RESOLVED`.
- **Finding**: Some synthesis and evidence files lacked structural navigation links from the root directory.
- **Action**: Created `MEMORY_MAP.md` as the master associative navigation map linking every file in the repository.

### 8. Does the current structure express "files are memory, structure is gene"?
- **Status**: `ESTABLISHED`.
- **Finding**: Root entry (`WAKE.md`), memory navigation (`MEMORY_MAP.md`), working state (`state/`), procedures (`AGENTS.md`), and historical lineage (`research/legacy-evidence/`) form an explicit, structured persistent memory runtime.

---

## 2. Comprehensive File Inventory & Authority Census

| File Path | Current Role | Authority Status | Classification | Cold-Start Read | Supersedes / Superseded By | Recommended Action |
|---|---|---|---|---|---|---|
| `WAKE.md` | Single Re-entry Entrance | `CANONICAL` | `ENTRY` | **MANDATORY (1st)** | N/A | Maintain as minimal wake-up instructions |
| `MEMORY_MAP.md` | Structural Memory Navigation | `CANONICAL` | `ENTRY` | **MANDATORY (5th)** | N/A | Maintain as master directory map |
| `AGENTS.md` | Neutral Operating Rules | `CANONICAL` | `PROTOCOL` | **CONDITIONAL** | N/A | Preserved |
| `CHARTER.md` | Clean-Room Lab Charter | `CANONICAL` | `DOCTRINE` | **CONDITIONAL** | N/A | Preserved |
| `INVARIANTS.md` | Immutable Safety Rules | `CANONICAL` | `DOCTRINE` | **CONDITIONAL** | N/A | Preserved |
| `REVOLUTION.md` | Core Architectural Manifesto | `CANONICAL` | `DOCTRINE` | **MANDATORY (6th)** | Supersedes legacy letters | Maintain as foundational manifesto |
| `state/CURRENT_PHASE.md` | Operational Phase Status | `CANONICAL` | `CURRENT_STATE` | **MANDATORY (2nd)** | N/A | Update on phase transitions |
| `state/CURRENT_VERDICT.md` | Confirmed/Withheld Verdicts | `CANONICAL` | `CURRENT_STATE` | **MANDATORY (3rd)** | N/A | Update on reviewer adjudications |
| `state/NEXT_ACTION.md` | Single Authorized Action | `CANONICAL` | `CURRENT_STATE` | **MANDATORY (4th)** | N/A | Update to enforce single authorized step |
| `state/OPEN_QUESTIONS.md` | Unresolved Issues Register | `CANONICAL` | `CURRENT_STATE` | **CONDITIONAL** | N/A | Track open design questions |
| `handoff/HELLO.md` | Later-Instance Handoff | `DERIVED` | `HANDOFF` | **CONDITIONAL** | N/A | Update per session handoff |
| `handoff/SESSION_LOG.md` | Append-Only Milestone Log | `HISTORICAL` | `HANDOFF` | **NO** | N/A | Append milestones chronologically |
| `research/synthesis/FIVE_POINT_FRAMEWORK.md` | Canonical 4-Layer 1-World Spec | `CANONICAL` | `DOCTRINE` | **MANDATORY (7th)** | Supersedes `four-layer-one-world-framework.md` | Sole canonical framework spec |
| `research/synthesis/LLM_WIKI_CURRENT_KNOWLEDGE_SYSTEM.md` | LLM Wiki Architecture Spec | `CANONICAL` | `DOCTRINE` | **CONDITIONAL** | N/A | Canonical LLM Wiki spec |
| `research/synthesis/four-layer-one-world-framework.md` | Draft 5-Component Framework | `SUPERSEDED` | `SUPERSEDED` | **PROHIBITED** | Superseded by `FIVE_POINT_FRAMEWORK.md` | Header tag added; preserve for audit |
| `research/audit/framework-verification-status.md` | Draft Verification Status | `SUPERSEDED` | `SUPERSEDED` | **PROHIBITED** | Superseded by `MIGRATION_GAP_AUDIT.md` | Header tag added; preserve for audit |
| `research/audit/MIGRATION_GAP_AUDIT.md` | Migration Gap Audit | `CANONICAL` | `EVIDENCE` | **CONDITIONAL** | Supersedes draft audit | Maintain as migration audit record |
| `research/audit/REMOTE_FIRST_AUDIT_METHOD.md` | 7-Step Remote Push Audit Spec | `CANONICAL` | `PROTOCOL` | **CONDITIONAL** | N/A | Enforce on git push |
| `research/migration/MIGRATION_MANIFEST.json` | 31-File Migration Manifest | `CANONICAL` | `EVIDENCE` | **CONDITIONAL** | N/A | Verified 31-file payload hashes |
| `research/migration/verify_migration.js` | Verification Fix 0.2.2 Script | `CANONICAL` | `OPERATOR_ONLY` | **NO** | Supersedes draft verifier | Executable node script |
| `research/migration/logs/migration_verification_raw.log` | Raw Execution Log (Fix 0.2.2) | `CANONICAL` | `EVIDENCE` | **CONDITIONAL** | N/A | Log exit code 0 |
| `research/migration/logs/hash_comparison.txt` | Hash Comparison Table | `CANONICAL` | `EVIDENCE` | **CONDITIONAL** | N/A | Audit table of 31 payload hashes |
| `research/examinations/FOUR_LAYER_ONE_WORLD_COMPREHENSION_EXAM.md` | Citation Remediation Exam v2.0 | `HISTORICAL` | `EVIDENCE` | **NO** | Supersedes v1.0 exam | Evidence artifact for citation audit |
| `research/examinations/FOUR_LAYER_ONE_WORLD_SOURCE_REGISTER.json` | Source Register Schema 2.0 | `HISTORICAL` | `EVIDENCE` | **NO** | Supersedes v1.0 register | Evidence artifact for citation audit |
| `research/examinations/verify_source_register.js` | Source Register Verifier Script | `HISTORICAL` | `OPERATOR_ONLY` | **NO** | N/A | Executable node script |
| `research/examinations/logs/source_register_verification.log` | Raw Verification Log (v2.0) | `HISTORICAL` | `EVIDENCE` | **NO** | N/A | Log exit code 0 |
| `research/examinations/evidence/` | Saved Evidence Files | `HISTORICAL` | `EVIDENCE` | **NO** | N/A | Primary public & local raw files |
| `research/legacy-evidence/` | Migrated Legacy Evidence (31 Files) | `HISTORICAL` | `EVIDENCE` | **NO** | Source commit `c073099481f9faa3...` | Preserved immutable legacy evidence |
