# state/CURRENT.md — Single Authoritative Current State

> **Notice**: This file is the ONLY canonical source for current operational state.
> A phase / state update edits THIS file and no other file. All historical and
> drift-period registers are preserved read-only under [`archive/`](../archive/ARCHIVE_INDEX.md)
> and are NOT part of the current-state reading chain.

---

## 1. Current Phase

- **Current Phase**: `Three E3 Probes Integrated — Minimal Composition Comparison`
- **Current Focus**: Compare the minimal viable composition of the three integrated Coordination / Durable Runtime wheels (Beads, go-workflows, Restate) against the confirmed capability needs, using the committed E3 evidence, without selecting or binding a final Provider and without implementing any Engine or Runtime.
- **External Audit Status**: `EXTERNAL VERDICTS RECORDED — Beads CONFIRMED FOR E3 COORDINATION SCOPE; go-workflows PARTIAL (prototype durable runtime confirmed; production durability and native coordination fit not confirmed); Restate CONFIRMED FOR E3 DURABLE RUNTIME SCOPE (operational fit costly; artifact-world fit unresolved)`
- **Started At**: `2026-08-04T11:05:49+02:00`

---

## 2. Authorized Next Action

> Compare the minimal composition of the three integrated wheels (Beads, go-workflows, Restate) against the confirmed capability needs. Do not select or bind a final Provider.

---

## 3. Active Prohibitions

1. **DO NOT** select, adopt, adapt, or bind a final Provider or carrier.
2. **DO NOT** implement any Engine or Runtime, evaluator, benchmark harness, scheduler, worker, or execution / orchestration mechanism.
3. **DO NOT** add any new Concept Model, Minimum Contract, state machine, or topology layer (Concept and Contract Expansion Freeze is ACTIVE).
4. **DO NOT** connect or modify the official Nexus, or run, modify, or authorize `CR-S0`.
5. **DO NOT** enable autonomous loops, unbounded self-modification, automatic approval, or unattended dispatch.

---

## 4. Open Questions

1. **CR-S0 Authorization Criteria**: What specific verification gates must pass before outside reviewers grant authorization to execute Slice 0 in clean-room environment?
2. **External Evaluator Interface Specification**: What specific wire format and isolation boundary will be mandated for Controlled AutoResearch external evaluators when CR-S0 is eventually authorized?
3. **Incremental Wiki Compilation Trigger**: Should incremental Wiki compilation be triggered by task completion trace events, or scheduled as an offline batch compiler?

---

## 5. Integrated Probe Evidence Register

Raw evidence for every probe is preserved under [`research/probes/e3/`](../research/probes/e3/). No final Provider is selected or bound.

| Probe | External verdict | Evidence status | Provider decision |
|---|---|---|---|
| Astro-Han / karpathy-llm-wiki (Knowledge) | `E3 PASSED` | `CONFIRMED FOR E3 SCOPE` (external) | none |
| base-llm-wiki (Knowledge) | `E3 PASSED` | `CONFIRMED FOR E3 SCOPE` (external) | none |
| Beads (Coordination / Work Lifecycle) | `CONFIRMED FOR E3 COORDINATION SCOPE` | integrated + externally adjudicated | none |
| go-workflows (Coordination + Durable Runtime) | `PARTIAL` | prototype durable runtime confirmed; production durability and native coordination fit not confirmed | none |
| Restate (Durable Runtime / Recovery) | `CONFIRMED FOR E3 DURABLE RUNTIME SCOPE` | operational fit costly; artifact-world fit unresolved | none |

### go-workflows boundaries (recorded external verdict)

- prototype durable-runtime evidence confirmed (isolated probe module, crash recovery by a NEW process from the same record store);
- production durability NOT confirmed (upstream SQL adapter not exercised);
- native coordination fit NOT confirmed (no Nexus fit, no superiority comparison, no `COMPOSE` verdict).

### Restate boundary notes

- operational fit costly (server + service + export tooling footprint);
- artifact-world fit unresolved.

---

## 6. Canonical State Links

- **Current doctrine (canonical)**: [`research/synthesis/FIVE_POINT_FRAMEWORK.md`](../research/synthesis/FIVE_POINT_FRAMEWORK.md)
- **Memory navigation map**: [`MEMORY_MAP.md`](../MEMORY_MAP.md)
- **Re-entry entrance**: [`WAKE.md`](../WAKE.md)
- **Active governance boundary**: [`research/governance/CONCEPT_AND_CONTRACT_EXPANSION_FREEZE.md`](../research/governance/CONCEPT_AND_CONTRACT_EXPANSION_FREEZE.md)
- **Active probe plan**: [`research/probes/COORDINATION_AND_DURABLE_RUNTIME_PROBE_PLAN.md`](../research/probes/COORDINATION_AND_DURABLE_RUNTIME_PROBE_PLAN.md)
- **Active prior-art refresh**: [`research/prior-art/CANDIDATE_REFRESH_COORDINATION_AND_DURABLE_RUNTIME.md`](../research/prior-art/CANDIDATE_REFRESH_COORDINATION_AND_DURABLE_RUNTIME.md)
- **Archive index (history)**: [`archive/ARCHIVE_INDEX.md`](../archive/ARCHIVE_INDEX.md)

---

*End of current state.*
