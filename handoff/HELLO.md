# Inter-Instance Handoff — HELLO.md

> **Notice**: Current repository commit must be resolved dynamically from Git using `git rev-parse HEAD`. Do not treat hardcoded SHA strings in handoff files as active HEAD.

---

## 1. Handoff Pointers & Baseline Status

- **Last Externally Accepted Repair**: `Foundation 0.3.2c strict SHA and verdict accuracy repair` (Reviewed Commit: `8ddabe908e62d748081b587f6fa55a6c87e6db91`)
- **Latest Partial Pass Attempt**: `Foundation 0.3.2e verdict-verifier regression repair` (Reviewed Commit: `31fda2f54a2346e791e63352a236824db9f17ae5`)
- **Next Pending Evaluation**: `Foundation 0.3.2f fail-closed verifier & negative-fixture proof`
- **Current Operational Phase**: See [`../state/CURRENT_PHASE.md`](../state/CURRENT_PHASE.md)
- **Current Ratified Verdicts**: See [`../state/CURRENT_VERDICT.md`](../state/CURRENT_VERDICT.md)
- **External Verdict History**: See [`../state/EXTERNAL_VERDICT_HISTORY.md`](../state/EXTERNAL_VERDICT_HISTORY.md)
- **Authorized Next Action**: See [`../state/NEXT_ACTION.md`](../state/NEXT_ACTION.md)
- **Current Git HEAD Resolution**: Execute `git rev-parse HEAD` dynamically.

---

## 2. Session Summary
- Conducted fail-closed verifier & negative-fixture proof (Foundation 0.3.2f).
- Recorded Foundation 0.3.2e as `PARTIAL PASS` in [`state/EXTERNAL_VERDICT_HISTORY.md`](../state/EXTERNAL_VERDICT_HISTORY.md).
- Updated [`state/CURRENT_VERDICT.md`](../state/CURRENT_VERDICT.md) to set State Consistency to `PARTIAL`.
- Refactored [`state/verify_state_consistency.js`](../state/verify_state_consistency.js) into an exportable core verification engine `verifyRepository(targetRoot, options)` with strict verdict whitelist (`allowedVerdicts`), exact table row parser `getVerdictRows` enforcing subject uniqueness, and strict case-insensitive milestone duplicate detection.
- Created automated negative test suite [`state/tests/verify_state_consistency_negative_tests.js`](../state/tests/verify_state_consistency_negative_tests.js) executing 12 negative fixtures and 1 positive fixture, writing structured test logs to [`state/logs/state_consistency_negative_tests.log`](../state/logs/state_consistency_negative_tests.log).

---

## 3. Mandatory First Step for Next Instance
Read [`WAKE.md`](../WAKE.md) immediately and follow the mandatory reading order.
