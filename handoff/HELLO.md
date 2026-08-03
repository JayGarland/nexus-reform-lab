# Inter-Instance Handoff — HELLO.md

> **Notice**: Current repository commit must be resolved dynamically from Git using `git rev-parse HEAD`. Do not treat hardcoded SHA strings in handoff files as active HEAD.

---

## 1. Handoff Pointers & Baseline Status

- **Last Externally Accepted Scope**: `Persistent Memory Skeleton` (from Foundation 0.3, commit `10928fd0284721538aec9b7bd4575f24ed8232cf`)
- **Subsystem Authority Note**: Accepted subsystem doctrines are listed only in [`../state/CURRENT_VERDICT.md`](../state/CURRENT_VERDICT.md). No partial milestone is treated as fully accepted.
- **Latest Rejected Attempt**: `Foundation 0.3.2a Lineage Parent SHA Fix (REJECTED due to false pass in verifier logic & untrustworthy history)`
- **Current Work Under Review**: `Foundation 0.3.2c Strict SHA & External Verdict Accuracy Repair`
- **Current Operational Phase**: See [`../state/CURRENT_PHASE.md`](../state/CURRENT_PHASE.md)
- **Current Ratified Verdicts**: See [`../state/CURRENT_VERDICT.md`](../state/CURRENT_VERDICT.md)
- **External Verdict History**: See [`../state/EXTERNAL_VERDICT_HISTORY.md`](../state/EXTERNAL_VERDICT_HISTORY.md)
- **Authorized Next Action**: See [`../state/NEXT_ACTION.md`](../state/NEXT_ACTION.md)
- **Current Git HEAD Resolution**: Execute `git rev-parse HEAD` dynamically.

---

## 2. Session Summary
- Conducted strict SHA and external verdict accuracy repair (Foundation 0.3.2c).
- Completely eliminated `startsWith` and short SHA regex from verifier logic in [`state/verify_state_consistency.js`](../state/verify_state_consistency.js). Enforced strict 40-character SHA string equality.
- Corrected Foundation 0.3.2a verdict in [`state/EXTERNAL_VERDICT_HISTORY.md`](../state/EXTERNAL_VERDICT_HISTORY.md) to `REJECTED`.
- Reclassified Doctrine Repair 0.2.1 milestone in [`state/EXTERNAL_VERDICT_HISTORY.md`](../state/EXTERNAL_VERDICT_HISTORY.md) to `PARTIAL PASS` with 4 accepted doctrine scopes.
- Renamed column header to `Milestone Accepted as Current Authority` and added schema rules banner in `EXTERNAL_VERDICT_HISTORY.md`.

---

## 3. Mandatory First Step for Next Instance
Read [`WAKE.md`](../WAKE.md) immediately and follow the mandatory reading order.
