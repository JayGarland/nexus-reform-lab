# Inter-Instance Handoff — HELLO.md

> **Notice**: Current repository commit must be resolved dynamically from Git using `git rev-parse HEAD`. Do not treat hardcoded SHA strings in handoff files as active HEAD.

---

## 1. Handoff Pointers & Baseline Status

- **Last Externally Accepted Milestone**: `Foundation 0.3 Persistent Memory Skeleton` (Reviewed Commit: `10928fd0284721538aec9b7bd4575f24ed8232cf`)
- **Latest Rejected / Repaired Attempt**: `Foundation 0.3.1a State Closure (REJECTED due to pending self-referential commit SHA)`
- **Current Work Under Review**: `Foundation 0.3.2a Historical Lineage Integrity Fix`
- **Current Operational Phase**: See [`../state/CURRENT_PHASE.md`](../state/CURRENT_PHASE.md)
- **Current Ratified Verdicts**: See [`../state/CURRENT_VERDICT.md`](../state/CURRENT_VERDICT.md)
- **External Verdict History**: See [`../state/EXTERNAL_VERDICT_HISTORY.md`](../state/EXTERNAL_VERDICT_HISTORY.md)
- **Authorized Next Action**: See [`../state/NEXT_ACTION.md`](../state/NEXT_ACTION.md)
- **Current Git HEAD Resolution**: Execute `git rev-parse HEAD` dynamically.

---

## 2. Session Summary
- Conducted historical lineage integrity fix (Foundation 0.3.2a).
- Corrected 0.3.2 based-on commit SHA in [`SESSION_LOG.md`](SESSION_LOG.md) to `f0027bcd5d0600b753a9b91b730fa9a46870b261`.
- Reclassified 0.3.1a as `Latest Rejected / Repaired Attempt` in `HELLO.md`.
- Created [`state/EXTERNAL_VERDICT_HISTORY.md`](../state/EXTERNAL_VERDICT_HISTORY.md) recording historical outside review adjudications.
- Expanded [`state/verify_state_consistency.js`](../state/verify_state_consistency.js) to dynamically verify Git parent commit SHA matching.

---

## 3. Mandatory First Step for Next Instance
Read [`WAKE.md`](../WAKE.md) immediately and follow the mandatory reading order.
