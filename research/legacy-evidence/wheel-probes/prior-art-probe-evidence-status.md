---
source_repository: JayGarland/nexus
source_commit: c073099481f9faa3abddde96cd22716816010704
source_path: research/audit/prior-art-probe-evidence-status.md
source_sha256: 7d9f9ca7f7c7ad6a4b8546214b8be4ba347a06b88f9d8f5ab1cbf3c30e469551
migration_reason: Prior art wheel probes audit status
epistemic_status: PARTIAL
---

# Prior-Art Probe Evidence Status Audit

This audit document records the empirical evidence, log locations, and verification status for each candidate wheel.

---

## Evidence Status Matrix

| Candidate Wheel | Execution Probe Path | Execution Log / Trace | Upstream Code Source | Verification Status |
|---|---|---|---|---|
| **Beads** | [`probes/beads/workspace`](file:///F:/nexus-p0-controlled-bootstrap/probes/beads/workspace) | [`probes/beads/PROBE_RUN_REPORT.md`](file:///F:/nexus-p0-controlled-bootstrap/probes/beads/PROBE_RUN_REPORT.md) | `@beads/bd` v1.1.2 (Embedded Dolt DB) | **VERIFIED-REAL-RUN (`COMPOSE`)** |
| **go-workflows** | [`probes/go-workflows`](file:///F:/nexus-p0-controlled-bootstrap/probes/go-workflows) | [`probes/go-workflows/PROBE_RUN_REPORT.md`](file:///F:/nexus-p0-controlled-bootstrap/probes/go-workflows/PROBE_RUN_REPORT.md) | `github.com/cschleiden/go-workflows` v0.14.0 | **VERIFIED-REAL-RUN (`REJECT`)** |
| **Restate** | [`probes/restate`](file:///F:/nexus-p0-controlled-bootstrap/probes/restate) | [`probes/restate/PROBE_RUN_REPORT.md`](file:///F:/nexus-p0-controlled-bootstrap/probes/restate/PROBE_RUN_REPORT.md) | `@restatedev/restate-sdk` v1.4.0 | **VERIFIED-REAL-RUN (`REJECT`)** |

---

## Audit Principles Enforced

1. **No Evidence, No Verdict**: No candidate was marked `ADOPT` or `COMPOSE` without empirical execution logs.
2. **Safety Prior Enforcement**: Wheels requiring un-monitored background daemons (Restate) or centralized code orchestrators (go-workflows) were rejected.
3. **Reversibility Audit**: All probe artifacts remain strictly contained inside `probes/` and can be reverted cleanly without affecting canonical Nexus files.
