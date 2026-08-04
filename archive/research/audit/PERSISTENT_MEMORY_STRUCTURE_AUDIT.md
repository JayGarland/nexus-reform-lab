# Persistent Memory Structure Audit

> **Laboratory Root**: `F:\nexus-reform-lab`  
> **Phase**: `Persistent Memory State Model Repair / Foundation 0.3.2`  
> **Audit Purpose**: Evaluate repository structure, authority relationships, superseded risks, state model single sources of truth, and cold-start recoverability.  

---

## 1. Executive Summary & Audit Answers

### 1. Is there currently a single entry point?
- **Status**: `RESOLVED`.
- **Action**: `WAKE.md` established at repository root as mandatory single entry point for all transient instances.

### 2. Are there competing doctrines?
- **Status**: `RESOLVED`.
- **Action**: Draft file `four-layer-one-world-framework.md` marked `SUPERSEDED`. `FIVE_POINT_FRAMEWORK.md` and `REVOLUTION.md` are sole canonical doctrines.

### 3. Could a new instance misread superseded files?
- **Status**: `RISK MITIGATED`.
- **Action**: Added YAML frontmatter status headers (`status: SUPERSEDED` / `HISTORICAL_FAILURE`) to prevent misreading.

### 4. Are current phase, verdict, and next action independently logged on disk?
- **Status**: `RESOLVED (Foundation 0.3.2 State Model Repair)`.
- **Action**: `state/CURRENT_PHASE.md` is sole source for phase, `state/CURRENT_VERDICT.md` is sole source for verdicts, `state/NEXT_ACTION.md` is sole source for authorized next action.

### 5. Are chat reports acting as authoritative state?
- **Status**: `ELIMINATED`.
- **Action**: GitHub remote commits and on-disk `state/` files are sole authoritative memory.

### 6. Are historical evidence and current knowledge mixed together?
- **Status**: `ISOLATED`.
- **Action**: Legacy evidence isolated in `research/legacy-evidence/`.

### 7. Are there isolated files unreachable from root?
- **Status**: `RESOLVED`.
- **Action**: `MEMORY_MAP.md` links every authoritative memory category and principal entry point.

### 8. Does the current structure express "files are memory, structure is gene"?
- **Status**: `STRUCTURE ESTABLISHED (STATE MODEL REPAIRED, RECOVERABILITY NOT YET TESTED)`.
- **Action**: Single sources of truth and anti-duplication rules established in `state/STATE_MODEL.md`.

---

## 2. State Model Repair Audit Note (Foundation 0.3.2)

The candidate acknowledges and repairs seven structural state issues identified during audit review:

1. **Static Self-Referential Commit Tracking Removed**: Excised static `Current Commit` fields from `HELLO.md` and `Pending Commit` from `SESSION_LOG.md`. Git HEAD must be resolved dynamically via `git rev-parse HEAD`.
2. **Duplicate Verdict Tables Excised**: Removed parallel verdict tables from `CURRENT_PHASE.md`. `CURRENT_VERDICT.md` is now the sole canonical source for all adjudications.
3. **Hardcoded Phase Numbers Removed**: Removed hardcoded version strings (`0.3`, `0.3.1`) from `MEMORY_MAP.md` and `COLD_START_RECOVERY_TEST.md`.
4. **Precision Adjudication Clarifications**:
   - `Migration Normalized Payload Fidelity`: Rated `CONFIRMED — 31/31 normalized text-equivalent`. Exact byte equality is NOT claimed.
   - `Citation Examination`: Reclassified as `HALTED — HISTORICAL FAILURE / EVIDENCE ONLY`.
   - `State Consistency`: Rated `REJECTED / UNDER REPAIR`.
   - `Cold-Start Recoverability`: Rated `NOT YET TESTED`.
5. **Overclaim Scope Reductions**: `MEMORY_MAP.md` narrowed to link "authoritative memory categories and principal entry points" (not "every file in the repo").
6. **Relaxed Cold-Start Command Policy**: Permitted read-only inspection commands (`git rev-parse HEAD`, file reads) while banning mutations and process launches.
7. **Single Source Benchmark Verification**: Cold-start benchmark specs read dynamically from `state/` files rather than maintaining parallel hardcoded answers.

---

## 3. Comprehensive File Inventory & Authority Census

| File Path | Current Role | Authority Status | Classification | Cold-Start Read | Supersedes / Superseded By | Recommended Action |
|---|---|---|---|---|---|---|
| `WAKE.md` | Single Re-entry Entrance | `CANONICAL` | `ENTRY` | **MANDATORY (1st)** | N/A | Maintain as minimal wake-up instructions |
| `MEMORY_MAP.md` | Structural Memory Navigation | `CANONICAL` | `ENTRY` | **MANDATORY (5th)** | N/A | Maintain as master directory map |
| `AGENTS.md` | Neutral Operating Rules | `CANONICAL` | `PROTOCOL` | **CONDITIONAL** | N/A | Preserved |
| `CHARTER.md` | Clean-Room Lab Charter | `CANONICAL` | `DOCTRINE` | **CONDITIONAL** | N/A | Preserved |
| `INVARIANTS.md` | Immutable Safety Rules | `CANONICAL` | `DOCTRINE` | **CONDITIONAL** | N/A | Preserved |
| `REVOLUTION.md` | Core Architectural Manifesto | `CANONICAL` | `DOCTRINE` | **MANDATORY (6th)** | Supersedes legacy letters | Maintain as foundational manifesto |
| `state/CURRENT_PHASE.md` | Operational Phase Status | `CANONICAL` | `CURRENT_STATE` | **MANDATORY (2nd)** | Sole source for phase | Update on phase transitions |
| `state/CURRENT_VERDICT.md` | Confirmed/Withheld Verdicts | `CANONICAL` | `CURRENT_STATE` | **MANDATORY (3rd)** | Sole source for verdicts | Update on reviewer adjudications |
| `state/NEXT_ACTION.md` | Single Authorized Action | `CANONICAL` | `CURRENT_STATE` | **MANDATORY (4th)** | Sole source for next action | Update to enforce single authorized step |
| `state/OPEN_QUESTIONS.md` | Unresolved Issues Register | `CANONICAL` | `CURRENT_STATE` | **CONDITIONAL** | N/A | Track open design questions |
| `state/STATE_MODEL.md` | Single Sources & Rules | `CANONICAL` | `CURRENT_STATE` | **CONDITIONAL** | N/A | Defines anti-duplication rules |
| `handoff/HELLO.md` | Later-Instance Handoff | `DERIVED` | `HANDOFF` | **CONDITIONAL** | N/A | Links to state files & last reviewed commit |
| `handoff/SESSION_LOG.md` | Append-Only Milestone Log | `HISTORICAL` | `HANDOFF` | **NO** | N/A | Append milestones chronologically |
| `research/synthesis/FIVE_POINT_FRAMEWORK.md` | Canonical 4-Layer 1-World Spec | `CANONICAL` | `DOCTRINE` | **MANDATORY (7th)** | Supersedes `four-layer-one-world-framework.md` | Sole canonical framework spec |
| `research/synthesis/LLM_WIKI_CURRENT_KNOWLEDGE_SYSTEM.md` | LLM Wiki Architecture Spec | `CANONICAL` | `DOCTRINE` | **CONDITIONAL** | N/A | Canonical LLM Wiki spec |
| `research/synthesis/four-layer-one-world-framework.md` | Draft 5-Component Framework | `SUPERSEDED` | `SUPERSEDED` | **PROHIBITED** | Superseded by `FIVE_POINT_FRAMEWORK.md` | Header tag added; preserve for audit |
| `research/audit/framework-verification-status.md` | Draft Verification Status | `SUPERSEDED` | `SUPERSEDED` | **PROHIBITED** | Superseded by `MIGRATION_GAP_AUDIT.md` | Header tag added; preserve for audit |
| `research/audit/MIGRATION_GAP_AUDIT.md` | Migration Gap Audit | `CANONICAL` | `EVIDENCE` | **CONDITIONAL** | Supersedes draft audit | Maintain as migration audit record |
| `research/audit/REMOTE_FIRST_AUDIT_METHOD.md` | 7-Step Remote Push Audit Spec | `CANONICAL` | `PROTOCOL` | **CONDITIONAL** | N/A | Enforce on git push |
| `research/migration/MIGRATION_MANIFEST.json` | 31-File Migration Manifest | `CANONICAL` | `EVIDENCE` | **CONDITIONAL** | N/A | Verified 31-file payload hashes |
| `research/migration/verify_migration.js` | Verification Fix 0.2.2 Script | `CANONICAL` | `OPERATOR_ONLY` | **NO** | Supersedes draft verifier | Executable node script |
| `research/examinations/FOUR_LAYER_ONE_WORLD_COMPREHENSION_EXAM.md` | Citation Remediation Exam v2.0 | `HISTORICAL` | `EVIDENCE` | **NO** | Reclassified as HISTORICAL_FAILURE | Evidence artifact for citation audit |
| `research/examinations/FOUR_LAYER_ONE_WORLD_SOURCE_REGISTER.json` | Source Register Schema 2.0 | `HISTORICAL` | `EVIDENCE` | **NO** | Reclassified as HISTORICAL_FAILURE | Evidence artifact for citation audit |
| `research/legacy-evidence/` | Migrated Legacy Evidence (31 Files) | `HISTORICAL` | `EVIDENCE` | **NO** | Source commit `c073099481f9faa3...` | Preserved immutable legacy evidence |
