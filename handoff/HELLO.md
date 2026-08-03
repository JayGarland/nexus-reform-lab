# Inter-Instance Handoff — HELLO.md

> **Notice**: Current repository commit must be resolved dynamically from Git using `git rev-parse HEAD`. Do not treat hardcoded SHA strings in handoff files as active HEAD.

---

## 1. Handoff Pointers & Baseline Status

- **Last Externally Accepted Scope**: `Persistent Memory Skeleton` (from Foundation 0.3, commit `10928fd0284721538aec9b7bd4575f24ed8232cf`)
- **Milestone Acceptance Status**: No complete Foundation milestone has yet been externally accepted.
- **Latest Rejected Attempt**: `Foundation 0.3.1a State Closure (REJECTED due to pending self-referential commit SHA)`
- **Current Work Under Review**: `Foundation 0.3.2b External Verdict History & Lineage Verification Repair`
- **Current Operational Phase**: See [`../state/CURRENT_PHASE.md`](../state/CURRENT_PHASE.md)
- **Current Ratified Verdicts**: See [`../state/CURRENT_VERDICT.md`](../state/CURRENT_VERDICT.md)
- **External Verdict History**: See [`../state/EXTERNAL_VERDICT_HISTORY.md`](../state/EXTERNAL_VERDICT_HISTORY.md)
- **Authorized Next Action**: See [`../state/NEXT_ACTION.md`](../state/NEXT_ACTION.md)
- **Current Git HEAD Resolution**: Execute `git rev-parse HEAD` dynamically.

---

## 2. Session Summary
- Conducted external verdict history and lineage verification repair (Foundation 0.3.2b).
- Refactored [`state/EXTERNAL_VERDICT_HISTORY.md`](../state/EXTERNAL_VERDICT_HISTORY.md) to distinguish accepted scopes from incomplete milestones.
- Updated migration wording across state files to specify normalized text equivalence rather than exact payload SHA equality.
- Expanded [`state/verify_state_consistency.js`](../state/verify_state_consistency.js) to dynamically verify `git rev-parse <resulting_commit>^` for line-by-line lineage parent SHA equality.

---

## 3. Mandatory First Step for Next Instance
Read [`WAKE.md`](../WAKE.md) immediately and follow the mandatory reading order.
