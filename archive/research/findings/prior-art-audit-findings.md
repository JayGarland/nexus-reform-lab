---
source_repository: JayGarland/nexus
source_branch: experiment/p0-controlled-bootstrap
source_commit: c073099481f9faa3abddde96cd22716816010704
source_path: research/findings/prior-art-survey.md
source_sha256: 7128591a27e5124c891f173d129a67129f1251920e8b1b2416c127419128591a
migration_reason: Document prior art audit findings (C:\Worlds, OpenClaw, llm-agent-experiments).
epistemic_status: CONFIRMED
---

# Local Prior-Art Audit Findings

---

## 1. Summary of Prior Art Projects

1. **`llm-agent-experiments`**:
   - Contains prototype runs including `world-00000002`.
   - Proved autonomous artifact growth capability from minimal seed files.

2. **`C:\Worlds` Prototype Lineage**:
   - Multiple historical world iterations and seeds (`world`, `pilot run`, `detached room`, `Continuity`).
   - Verified user-controlled freeze point prior to unmonitored execution boundaries (OpenClaw autonomous runner interface).

---

## 2. Safety Invariants Derived from Prior Art

- **Autonomous Execution Boundary**: Unattended execution without human approval or policy boundary controls is unsafe.
- **Safety Precedent**: User's intentional freeze before OpenClaw autonomous daemon integration serves as a formal safety invariant.
