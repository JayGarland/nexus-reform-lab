# Inter-Instance Handoff — HELLO.md

> **Notice**: Current repository commit must be resolved dynamically from Git using `git rev-parse HEAD`. Do not treat hardcoded SHA strings in handoff files as active HEAD.

---

## 1. Handoff Pointers & Baseline Status

- **Latest Externally Confirmed Evaluation**: `Fresh-Instance Cold-Start Recovery Test — CONFIRMED FOR RECOVERY SCOPE` (Reviewed Commit: `3fe265d4141b66f362459a65dec1912888d1b74c`)
- **Latest Externally Confirmed Doctrine**: `Modularity & Replaceability Doctrine — CONFIRMED FOR REVIEWED SCOPE` (Reviewed Commit: `715a6d5f96eaae44ec4822630e8a053e4344a14c`)
- **Latest Externally Confirmed Probe**: `base-llm-wiki Knowledge E3 — CONFIRMED FOR E3 SCOPE` (Reviewed Commit: `915836bb1fff4535cc5f3a21927098721580aa64`)
- **Latest Externally Confirmed Concept**: `Stigmergy Carrier & Artifact Taxonomy — CONFIRMED FOR CONCEPTUAL SCOPE` (Reviewed Commit: `f08d7636714be6285405894cca0adac14764069a`)
- **Latest Externally Confirmed Roadmap**: `Four-Layer One-World Minimum Landing Roadmap — CONFIRMED FOR ROADMAP SCOPE` (Reviewed Commit: `64642bf3e601030c5c4a19c376a34d1e420890ec`)
- **Current World Level**: `Level 2 — Recoverable Persistent Artifact World`
- **Current Phase**: `Coordination Work Item Minimum Contract Drafting`
- **Next Authorized Work**: `Submit Work Item Minimum Contract; no implementation, no carrier selection, no Probe, no Nexus connection`
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
- Recorded Foundation 0.8 as `CONFIRMED FOR QUEUE-STRUCTURE AND EVIDENCE-BOUNDARY SCOPE` (commit `3e81f0a75e53e2a12217ec8cb1b928e8910c876d`) and produced the dedicated Knowledge Projection comparison: [`research/prior-art/e1-e2/LLM_WIKI_DEDICATED_COMPARISON.md`](../research/prior-art/e1-e2/LLM_WIKI_DEDICATED_COMPARISON.md) and [`research/audit/prior-art-discovery/LLM_WIKI_COMPARISON_AUDIT.md`](../research/audit/prior-art-discovery/LLM_WIKI_COMPARISON_AUDIT.md). Captured the bounded local evidence artifact for base-llm-wiki under [`research/prior-art/e1-e2/local-base-llm-wiki/`](../research/prior-art/e1-e2/local-base-llm-wiki/). No E3 executed; no candidate selected.
- Recorded Foundation 0.9 as `CONFIRMED FOR E1/E2 COMPARISON SCOPE` (commit `3119173ca049356c57796a14721d94fbef244bbe`), upgraded base-llm-wiki to E2, and executed the single authorized isolated upstream-native E3 probe of Astro-Han/karpathy-llm-wiki (upstream commit `eafcc77001e496cc43499e4923b663aec722c813`, MIT; verdict `E3 PASSED` at E3 scope only). Evidence committed under [`research/probes/e3/astro-han-llm-wiki/`](../research/probes/e3/astro-han-llm-wiki/README.md). No other Probe executed; no Adapter; official Nexus unmodified.
- Recorded Foundation 1.0 as `CONFIRMED FOR E3 SCOPE` (commit `9f2eb0ede6929054f3cbfe7153799e384c1711fa`): the Evidence Reproduction Run outputs are byte-identical to the original after-state hashes and are accepted for E3 scope; E3 verdict closed as `E3 PASSED`. Transitioned to `Knowledge Provider E3 Comparison Preparation`; next authorized work is a bounded base-llm-wiki E3 comparison plan only.
- Executed the isolated base-llm-wiki E3 probe (plan `CONFIRMED FOR E3 EXECUTION-PLAN SCOPE`): byte-identical copy of the original (84/84), native ingest per the copy's `AGENTS.md` + workflows + templates, fixture immutable, original zero-modification, cleanup verified. Verdict `E3 PASSED`; status `SUBMITTED FOR OUTSIDE REVIEW`. Evidence under [`research/probes/e3/base-llm-wiki/`](../research/probes/e3/base-llm-wiki/README.md). No other Probe run; no Knowledge Provider selected.
- Closed the Knowledge E3 segment: both Astro-Han and base-llm-wiki `CONFIRMED FOR E3 SCOPE` (no E4 comparison, no Provider selection). Recorded the Stigmergy Carrier & Artifact Taxonomy as a concept clarification ([`research/synthesis/STIGMERGY_CARRIER_AND_ARTIFACT_TAXONOMY.md`](../research/synthesis/STIGMERGY_CARRIER_AND_ARTIFACT_TAXONOMY.md), `CONCEPT CLARIFICATION — UNDER OUTSIDE REVIEW`). Phase transitioned to `Knowledge E3 Segment Closure and Cross-Cutting Doctrine Write-Back`.
- Ratified the Stigmergy Carrier & Artifact Taxonomy as `CONFIRMED FOR CONCEPTUAL SCOPE` (commit `f08d7636714be6285405894cca0adac14764069a`) and closed the Knowledge E3 segment. Established the global Four-Layer One-World Minimum Landing Roadmap ([`research/plans/FOUR_LAYER_ONE_WORLD_MINIMUM_LANDING_ROADMAP.md`](../research/plans/FOUR_LAYER_ONE_WORLD_MINIMUM_LANDING_ROADMAP.md), `ROADMAP — UNDER OUTSIDE REVIEW`). Phase transitioned to `Global Minimum Landing Roadmap Preparation`. No Probe run; no Provider selected; official Nexus unmodified and not connected.
- Ratified the Four-Layer One-World Minimum Landing Roadmap as `CONFIRMED FOR ROADMAP SCOPE` (commit `64642bf3e601030c5c4a19c376a34d1e420890ec`) and drafted the minimum Work Item semantic Contract ([`research/contracts/WORK_ITEM_MINIMUM_CONTRACT.md`](../research/contracts/WORK_ITEM_MINIMUM_CONTRACT.md), `CONTRACT DRAFT — UNDER OUTSIDE REVIEW`). Phase transitioned to `Coordination Work Item Minimum Contract Drafting`. No Probe run; no carrier selected; no Runtime implemented; official Nexus unmodified and not connected.

---

## 3. Mandatory First Step for Next Instance
Read [`WAKE.md`](../WAKE.md) immediately and follow the mandatory reading order.
