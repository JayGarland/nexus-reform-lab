# Inter-Instance Handoff — HELLO.md

> **Notice**: Current repository commit must be resolved dynamically from Git using `git rev-parse HEAD`. Do not treat hardcoded SHA strings in handoff files as active HEAD.

---

## 1. Handoff Pointers & Baseline Status

- **Latest Externally Confirmed Evaluation**: `Fresh-Instance Cold-Start Recovery Test — CONFIRMED FOR RECOVERY SCOPE` (Reviewed Commit: `3fe265d4141b66f362459a65dec1912888d1b74c`)
- **Latest Externally Confirmed Doctrine**: `Modularity & Replaceability Doctrine — CONFIRMED FOR REVIEWED SCOPE` (Reviewed Commit: `715a6d5f96eaae44ec4822630e8a053e4344a14c`)
- **Current World Level**: `Level 2 — Recoverable Persistent Artifact World`
- **Active E3 Queue**: `E3 Probe Queue Definition / Foundation 0.8 — UNDER OUTSIDE REVIEW`
- **Current Phase**: `E3 Probe Queue Definition / Foundation 0.8`
- **Next Authorized Work**: `Submit E3 Probe Queue and isolation protocol; do not install or execute any candidate`
- **Current Operational Phase**: See [`../state/CURRENT_PHASE.md`](../state/CURRENT_PHASE.md)
- **Current Ratified Verdicts**: See [`../state/CURRENT_VERDICT.md`](../state/CURRENT_VERDICT.md)
- **External Verdict History**: See [`../state/EXTERNAL_VERDICT_HISTORY.md`](../state/EXTERNAL_VERDICT_HISTORY.md)
- **Authorized Next Action**: See [`../state/NEXT_ACTION.md`](../state/NEXT_ACTION.md)
- **Current Git HEAD Resolution**: Execute `git rev-parse HEAD` dynamically.

---

## 2. Session Summary
- Recorded the box-outside verdict for the Foundation 0.4.2 Fresh-Instance Cold-Start Recovery Test as `CONFIRMED FOR RECOVERY SCOPE` (commit `3fe265d4141b66f362459a65dec1912888d1b74c`).
- Recorded Foundation 0.5 Modularity & Replaceability Doctrine Proposal as `CONFIRMED FOR DOCTRINE SCOPE` (commit `0f32f5f6aa721ac74711fe917a135504cf994995`).
- Recorded Foundation 0.5.1 final acceptance as `CONFIRMED FOR REVIEWED SCOPE` (commit `715a6d5f96eaae44ec4822630e8a053e4344a14c`); `MODULARITY_AND_REPLACEABILITY_DOCTRINE.md` is canonical and ratified. No new `UNDER OUTSIDE REVIEW` stage. Transitioned [`state/CURRENT_PHASE.md`](../state/CURRENT_PHASE.md) to `Prior-Art Discovery & Provider Boundary Investigation` and set [`state/NEXT_ACTION.md`](../state/NEXT_ACTION.md) to prepare a bounded Prior-Art Discovery plan only. No Provider implemented or selected; CR-S0 stays `WITHHELD`.
- Submitted the Foundation 0.6 Prior-Art Discovery Plan: created [`research/plans/PRIOR_ART_DISCOVERY_PLAN.md`](../research/plans/PRIOR_ART_DISCOVERY_PLAN.md), [`research/plans/PROVIDER_COMPARISON_SCHEMA.md`](../research/plans/PROVIDER_COMPARISON_SCHEMA.md), [`research/plans/EVIDENCE_LEVELS.md`](../research/plans/EVIDENCE_LEVELS.md), [`research/plans/FIXED_PROBE_FIXTURES.md`](../research/plans/FIXED_PROBE_FIXTURES.md), and [`research/audit/prior-art-discovery/PLAN_AUDIT_CHECKLIST.md`](../research/audit/prior-art-discovery/PLAN_AUDIT_CHECKLIST.md). No candidate research begun, no Probe executed, no Provider selected or bound.
- Recorded Foundation 0.6 as `CONFIRMED FOR PLANNING SCOPE` (commit `21ddccbb214a0cbc38728f0b9af8e1c755aff9f4`) and ran the first E1/E2 Prior-Art Survey (documentation and source inspection only). Created [`research/prior-art/e1-e2/`](../research/prior-art/e1-e2/) artifacts and [`research/audit/prior-art-discovery/E1_E2_SURVEY_AUDIT.md`](../research/audit/prior-art-discovery/E1_E2_SURVEY_AUDIT.md). No candidate installed or executed; no Provider selected.
- Recorded Foundation 0.7 as `CONFIRMED FOR E1/E2 SURVEY SCOPE` (commit `91d0b19de3235c0e924cb684a538acac9cca5e3a`) and defined the first E3 Probe Queue: [`research/plans/E3_PROBE_QUEUE.md`](../research/plans/E3_PROBE_QUEUE.md), [`E3_EXECUTION_PROTOCOL.md`](../research/plans/E3_EXECUTION_PROTOCOL.md), [`E3_ENVIRONMENT_ISOLATION.md`](../research/plans/E3_ENVIRONMENT_ISOLATION.md), and [`research/audit/prior-art-discovery/E3_QUEUE_AUDIT.md`](../research/audit/prior-art-discovery/E3_QUEUE_AUDIT.md). No candidate installed, started, or executed.

---

## 3. Mandatory First Step for Next Instance
Read [`WAKE.md`](../WAKE.md) immediately and follow the mandatory reading order.
