# Research & Evidence Migration Gap Audit

> **Scope**: Audit of historical research, wheel probes, local world findings, and failed Slice 0 evidence migrated into the Clean-Room Reform Lab.  
> **Source Commit**: `c073099481f9faa3abddde96cd22716816010704` (`JayGarland/nexus`)  
> **Manifest File**: [`research/migration/MIGRATION_MANIFEST.json`](../migration/MIGRATION_MANIFEST.json)  
> **Verification Script**: [`research/migration/verify_migration.js`](../migration/verify_migration.js)  
> **Raw Execution Log**: [`research/migration/logs/migration_verification_raw.log`](../migration/logs/migration_verification_raw.log)  
> **Hash Comparison Table**: [`research/migration/logs/hash_comparison.txt`](../migration/logs/hash_comparison.txt)  

---

## 1. Disambiguation: Migration Integrity vs Epistemic Validity

A critical distinction enforced in Repair 0.2.1:
- **Migration Byte-Level Integrity (`semantic_verification`)**: Verifies that the migrated file's content accurately reflects the legacy source file recorded at commit `c073099481f9faa3abddde96cd22716816010704` via cryptographic SHA-256 hash match (`CONFIRMED`).
- **Source Document Epistemic Validity (`epistemic_status`)**: Represents the scientific or empirical truth of the findings inside the document. Migrating a document with 100% byte fidelity does NOT mean its historical claims are true today. Epistemic ratings (`CONFIRMED`, `PARTIAL`, `INCONCLUSIVE`, `HISTORICAL-FAILURE`) are evaluated independently of migration integrity.

---

## 2. Migration Category Summary Matrix

| Category | Target Directory | File Count | Migration Mode | Migration Byte Integrity | Epistemic Status |
|---|---|---|---|---|---|
| **Local World Evidence** | `research/legacy-evidence/local-world/` | 13 | `VERBATIM` | `CONFIRMED` | `CONFIRMED` |
| **Wheel Probes Evidence** | `research/legacy-evidence/wheel-probes/` | 6 | `VERBATIM` | `CONFIRMED` | `PARTIAL` |
| **Failed Slice 0 Evidence** | `research/legacy-evidence/failed-slice-0/` | 12 | `VERBATIM` | `CONFIRMED` | `HISTORICAL-FAILURE` |

---

## 3. Evidence Gaps & Discrepancy Register

1. **Beads Probe Execution Isolation**:
   - Initial Slice 0 placed `.beads` database files directly in `world/`, polluting the domain workspace.
   - **Resolution in Repair**: Isolated Beads execution verified in `beads-clean-001/` (logs in `operator/`, only `WORK_STATE.md` in `world/`).

2. **Wheel Probes Epistemic Rating**:
   - `probes/go-workflows`, `probes/restate`, and `probes/beads` contain partial exploratory code probes.
   - **Epistemic Rating**: Maintained as `PARTIAL` / `CLAIMED-NOT-EVIDENCED`. They have NOT been promoted to `CONFIRMED`.

3. **Blind AI Session Benchmark Gap**:
   - No clean-room automated AI session benchmark was conducted for Slice 0 context recovery.
   - **Rating**: Explicitly logged as `BLIND TEST NOT RUN`.

---

## 4. Cryptographic Hash Verification Results

Execution of `node research/migration/verify_migration.js` produced the following raw results:
- **Total Files Tested**: 31
- **Hash Comparison Passed**: 31
- **Hash Comparison Failed**: 0
- **Script Exit Code**: `0`
- **Raw Evidence Logs**: Saved to `research/migration/logs/migration_verification_raw.log` and `research/migration/logs/hash_comparison.txt`.
