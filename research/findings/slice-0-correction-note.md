---
source_repository: JayGarland/nexus
source_branch: experiment/p0-controlled-bootstrap
source_commit: c073099481f9faa3abddde96cd22716816010704
source_path: experiments/slice-0/CORRECTION_NOTE.md
source_sha256: 45ab129f123c561b8162e879051419efcd28198751912a51295b28b712cfa872
migration_reason: Record historical failure and correction note from Slice 0 evaluation.
epistemic_status: HISTORICAL-FAILURE
---

# Slice 0 Evidence Correction & Downgrade Notice

> **Initial Claim**: `VERDICT-KEEP` (Slice 0 Baseline)  
> **Adjudication Result**: `REJECTED & WITHDRAWN` (Outside Reviewer Verdict)  
> **Current Status**: `HISTORICAL-FAILURE / INCONCLUSIVE`  

---

## 1. Findings & Rejection Rationale

1. **Hardcoded Compiler**: `compiler.js` was a static generator relying on hardcoded letter-IDs (`fileName.includes("L-0658")`), not a generic section parser.
2. **Missing Apparatus Isolation**: Early test runs placed `.beads` database files directly alongside compiled world state.
3. **Un-evidenced Metrics**: Initial performance claims were not backed by empirical measurement logs.

---

## 2. Corrective Actions Applied in Clean-Room Lab

1. Replaced hardcoded parser with `generic_section_parser.js` utilizing generic regex section matching.
2. Enforced strict apparatus isolation: `operator/` houses `.beads` and runner logs, `worlds/` contains ONLY `WORK_STATE.md`.
3. Explicitly recorded `BLIND TEST NOT RUN` rather than simulating benchmark scores.
