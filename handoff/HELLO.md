# Inter-Instance Handoff — HELLO.md

> **Notice**: Current repository commit must be resolved dynamically from Git using `git rev-parse HEAD`. Do not treat hardcoded SHA strings in handoff files as active HEAD.

---

## 1. Handoff Pointers & Baseline Status

- **Last Externally Accepted Repair**: `Foundation 0.3.2f Fail-Closed Verifier` (Reviewed Commit: `a2d2434d38b33c67dd3535375621ae9523b6fbd7`)
- **Latest Outside Audit**: `Foundation 0.4 Repository-wide World Audit — PARTIAL PASS` (Reviewed Commit: `4ceea271d7ce5ea5aa22a5015af0c3a54f2ffb26`)
- **Next Authorized Evaluation**: `Fresh-Instance Cold-Start Recovery Test`
- **Current Operational Phase**: See [`../state/CURRENT_PHASE.md`](../state/CURRENT_PHASE.md)
- **Current Ratified Verdicts**: See [`../state/CURRENT_VERDICT.md`](../state/CURRENT_VERDICT.md)
- **External Verdict History**: See [`../state/EXTERNAL_VERDICT_HISTORY.md`](../state/EXTERNAL_VERDICT_HISTORY.md)
- **Authorized Next Action**: See [`../state/NEXT_ACTION.md`](../state/NEXT_ACTION.md)
- **Current Git HEAD Resolution**: Execute `git rev-parse HEAD` dynamically.

---

## 2. Session Summary
- Recorded outside acceptance of Foundation 0.3.2f fail-closed verifier as `CONFIRMED FOR REVIEWED SCOPE` in [`state/EXTERNAL_VERDICT_HISTORY.md`](../state/EXTERNAL_VERDICT_HISTORY.md).
- Recorded Foundation 0.4 read-only Repository-wide World Audit as `PARTIAL PASS` in [`state/EXTERNAL_VERDICT_HISTORY.md`](../state/EXTERNAL_VERDICT_HISTORY.md).
- Updated [`state/CURRENT_VERDICT.md`](../state/CURRENT_VERDICT.md): State Consistency → `CONFIRMED`; Repository-wide Persistent Artifact World → `PARTIAL`; added four `NOT YET IMPLEMENTED` rows; Cold-Start Recoverability → `AUTHORIZED — NOT YET EXECUTED`; CR-S0 stays `WITHHELD`.
- Updated [`state/CURRENT_PHASE.md`](../state/CURRENT_PHASE.md) to `Fresh-Instance Cold-Start Recovery Test`.
- Updated [`state/NEXT_ACTION.md`](../state/NEXT_ACTION.md) to authorize exactly one fresh-instance read-only cold-start test.

---

## 3. Mandatory First Step for Next Instance
Read [`WAKE.md`](../WAKE.md) immediately and follow the mandatory reading order.
