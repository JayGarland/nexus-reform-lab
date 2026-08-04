# Archive Index — Read-Only History

> **Purpose**: Read-only archive of drift-period and pre-probe content. Files here
> are historical records. They are NOT part of the current-state reading chain and
> MUST NOT be used as current rules or directives (see WAKE.md superseded-file ban).
> Git history remains the authoritative audit trail for all content below.

## Current state lives in
- [`state/CURRENT.md`](../state/CURRENT.md) — the single authoritative current state file.
- [`research/probes/e3/`](../research/probes/e3/) — raw probe evidence (active, preserved).

## Archived groups

| Archive location | Former location | Content |
|---|---|---|
| `state/` | `state/` | Old split state registers (CURRENT_PHASE, CURRENT_VERDICT, NEXT_ACTION, OPEN_QUESTIONS, STATE_MODEL, EXTERNAL_VERDICT_HISTORY) — merged into `state/CURRENT.md` |
| `state/verify_state_consistency.js`, `state/tests/`, `state/logs/` | `state/` | Drift-period negation-aware verifier, its test fixtures, and logs — no longer developed or executed |
| `handoff/SESSION_LOG.md` | `handoff/` | Append-only milestone log — historical |
| `research/examinations/` | `research/examinations/` | Citation examination reports and evidence — HISTORICAL FAILURE / EVIDENCE ONLY |
| `research/contracts/` | `research/contracts/` | Old Minimum Contracts — downgraded to pre-probe hypotheses / archived |
| `research/plans/` | `research/plans/` | Old roadmaps, old E3 plans, old E3 queue, prior-art discovery plans |
| `research/probes/CONTRACT_TO_PROBE_MATRIX.md` | `research/probes/` | Old Contract-to-Probe matrix |
| `research/prior-art/e1-e2/` | `research/prior-art/e1-e2/` | Old E1/E2 prior-art survey artifacts |
| `research/audit/` | `research/audit/` | Old audits (world-audit, prior-art-discovery, migration gap, cold-start test protocol, remote-first audit method) |
| `research/findings/` | `research/findings/` | Old findings notes |
| `research/migration/` | `research/migration/` | Migration manifest, migration verifier and logs |
| `research/synthesis/` | `research/synthesis/` | Concept models / concept clarifications / superseded framework draft / modularity proposal — archived as pre-probe hypotheses |
| `nexus-revolution-anti-drift-todolist.md` | repo root | Anti-drift TODOLIST (superseded by executed follow-ups) |

## Preserved as active (NOT archived)
- `research/probes/e3/` — all five E3 probe evidence sets (astro-han-llm-wiki, base-llm-wiki, beads, go-workflows, restate), fixtures, raw outputs, hash evidence.
- `research/legacy-evidence/` — immutable raw evidence.
- `fixtures/` — read-only legacy fixtures.
- `research/synthesis/FIVE_POINT_FRAMEWORK.md`, `LLM_WIKI_CURRENT_KNOWLEDGE_SYSTEM.md`, `MODULARITY_AND_REPLACEABILITY_DOCTRINE.md` — canonical doctrine.
- `research/governance/CONCEPT_AND_CONTRACT_EXPANSION_FREEZE.md` — active governance boundary.
- `research/prior-art/CANDIDATE_REFRESH_COORDINATION_AND_DURABLE_RUNTIME.md` — active prior-art refresh (under outside review).
- `research/probes/COORDINATION_AND_DURABLE_RUNTIME_PROBE_PLAN.md` — active probe plan (under outside review).

*End of archive index.*
