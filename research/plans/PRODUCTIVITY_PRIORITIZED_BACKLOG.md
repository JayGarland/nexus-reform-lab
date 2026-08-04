# Productivity-Prioritized Capability Backlog

> **Status**: PROPOSAL — ONE-TIME BACKLOG RECONSTRUCTION (under box-out review)
> **Purpose**: Reprioritize reform capabilities around real product development and reduced human coordination cost. This is the final large-scale backlog reprioritization before entering real product work.
> **Maturity values**: `CONCEPT_ONLY` `SEMANTIC_CONTRACT` `PROBED` `EARLY_PROTOTYPE` `PILOT_READY` `PILOTED` `ADOPTION_CANDIDATE` `MIGRATION_READY`
> **Status values**: `ACTIVATE_NOW` `NEXT` `LATER` `BACKGROUND_RESEARCH` `BLOCKED` `PRESERVE_ONLY` `REJECT`
> **Item count**: 14 merged capability items (≤15). Duplicates aggressively merged.
> **Scoring rule**: only `ACTIVATE_NOW`/`NEXT` finalists are scored (≤5). All other items are classified directly with a one-line reason.

---

## Repository Reality (recorded once; divergence is an Evidence Gap, not overwritten)

| repo | branch | local HEAD | remote HEAD (origin/HEAD) | git status | divergence |
|---|---|---|---|---|---|
| `F:\nexus-reform-lab` | `repair/anti-patch-loop-guard` | `f4d96c3` | `7ab1f77` (main) | clean | branch in sync with its remote; 2 commits ahead of `main` (pending unmerged guard work, not an evidence gap) |
| `F:\wiki-system\subwikis\llm-wiki-nexus` | `main` | `9089fe7` | `9089fe7` | clean | in sync |
| `F:\nexus` (formal Nexus, READ-ONLY) | `main` | `52be60f` | `d114469` | modified `config.toml`, `docs/cc-connect/README.md`; untracked `.beads/`, `.kilo/`, `.tmp.driveupload/`, `data/skills/secretary/deep-research-secretary/`, `data/verification_expectations.json`, `diff_l0767.txt`, `docs/cc-connect/outbox-status.md` | **Evidence Gap**: local ahead of remote by 9; uncommitted local state present; untracked artifacts present. Recorded, not touched. |

---

## Backlog (14 merged capability items)

### Finalists (eligible for ACTIVATE_NOW / NEXT)

| ID | Capability | Real product pain addressed | Maturity | Status | One-line rationale | Evidence refs |
|---|---|---|---|---|---|---|
| B01 | Product-local context recovery (product WAKE/CURRENT) | Repeated context explanation; re-entry cost after interruption; product agents must not read full reform history | `EARLY_PROTOTYPE` (reform-lab chain proven; product-local variant not piloted) | `NEXT` | Smallest, fully reversible entry into the product loop; directly converts the legacy WAKE/seat chain into per-product re-entry. | `WAKE.md`, `state/CURRENT.md`, `REVOLUTION.md` §8 |
| B02 | Work Item lifecycle / Stigmergic Coordination | Manual routing, state lookup, dependency bookkeeping; legacy letter routing burden | `PROBED` (Beads E3 PASSED + human cost measured) | `NEXT` | Strongest probed wheel (Beads: 0 routing, 0 manual lookups in fixture); ready for a disposable local Pilot path. | `research/probes/e3/beads/E3_VERDICT.md`, `research/probes/e3/beads/HUMAN_COST.md`, `research/prior-art/CANDIDATE_REFRESH_COORDINATION_AND_DURABLE_RUNTIME.md` §3 |
| B03 | Durable Runtime & Recovery | Recovery after interruption; manual recovery steps; retry lineage | `PROBED` (go-workflows E3 PASSED; Restate E3 PASSED, BSL-1.1) | `NEXT` | Both candidates passed E3 with crash-recovery evidence; enter the loop when a Pilot exposes interruption-recovery cost (pain-driven). | `research/probes/e3/go-workflows/E3_VERDICT.md`, `research/probes/e3/restate/E3_VERDICT.md` |
| B04 | Current Knowledge / LLM Wiki | Repeated state lookup, context re-explanation, manual summarization/indexing | `PILOTED` (llm-wiki-nexus v0.1.1 operating; validation passing; real ingests) | `NEXT` | Most mature capability; already running autonomously; apply it to the product Pilot domain. | `F:\wiki-system\subwikis\llm-wiki-nexus\README.md`, `VERSION`, `AGENTS.md`, `state/CURRENT.md` §5 |
| B05 | Human coordination measurement & Evaluation loop | Unmeasurable reform; repetitive verification; no before/after evidence | `EARLY_PROTOTYPE` (metrics defined in probe plan; one Beads measurement) | `NEXT` | The measurement apparatus the operating loop depends on; small, no infrastructure, enables KEEP/DISCARD verdicts. | `research/probes/COORDINATION_AND_DURABLE_RUNTIME_PROBE_PLAN.md` §5, `research/probes/e3/beads/HUMAN_COST.md` |

### Directly classified items (not scored)

| ID | Capability | Real product pain addressed | Maturity | Status | One-line rationale | Evidence refs |
|---|---|---|---|---|---|---|
| B06 | Protocol governance / Software 3.0 | Protocol confusion; unversioned natural-language rules | `CONCEPT_ONLY` | `BACKGROUND_RESEARCH` | No observed product bottleneck yet; AGENTS.md already provides a lightweight working substitute. | `research/synthesis/FIVE_POINT_FRAMEWORK.md` §3 |
| B07 | Controlled AutoResearch | — | `CONCEPT_ONLY` | `BACKGROUND_RESEARCH` | Requires a prior minimal evaluation loop (constraint 5); E3 is evidence, not a reusable platform. | `research/synthesis/FIVE_POINT_FRAMEWORK.md` §3 |
| B08 | Workspace binding | Workspace discovery; product-local scope isolation | `CONCEPT_ONLY` | `BLOCKED` | Missing authorized product Workspace evidence blocks product execution (constraint 8); `worlds/` empty, formal Nexus read-only. | `state/CURRENT.md`, `REVOLUTION.md` §3 |
| B09 | Product Pilot | — (capability of running real product work through the reform path) | `CONCEPT_ONLY` | `BLOCKED` | Correct next target but no product, task, or Workspace decision exists; blocked pending outside decision. | `state/CURRENT.md` §2 |
| B10 | Persistent World / Room / Scope | — | `SEMANTIC_CONTRACT` | `PRESERVE_ONLY` | Frozen theory; cannot expand without an active product need (constraint 7). | `research/governance/CONCEPT_AND_CONTRACT_EXPANSION_FREEZE.md` |
| B11 | Legacy coexistence | Running old and new systems side by side | `CONCEPT_ONLY` | `BACKGROUND_RESEARCH` | No reversible coexistence evidence yet; formal Nexus remains a read-only subject. | `REVOLUTION.md` §3, `CHARTER.md` |
| B12 | Legacy migration | Moving legacy product work to reform apparatus | `CONCEPT_ONLY` | `BLOCKED` | Requires reversible coexistence evidence first (constraint 6). | `REVOLUTION.md` §3 |
| B13 | Provider composition & binding | Choosing/assembling the durable runtime stack | `PROBED` | `BLOCKED` | COMPOSE decision (Beads+go-workflows) pending; binding requires Pilot/comparison evidence (constraint 4). | `research/prior-art/CANDIDATE_REFRESH_COORDINATION_AND_DURABLE_RUNTIME.md` §5 |
| B14 | cc-connect retention / replacement | Human notification / external connection burden | `CONCEPT_ONLY` | `PRESERVE_ONLY` | Retention is an outside decision; replacement deferred until a product bottleneck demands it. | `F:\nexus\docs\cc-connect\README.md`, `state/CURRENT.md` |

---

## Finalist Scoring (only B01–B05; 0–5 per axis)

> Total score is **not** an automatic decision rule. Hard constraints and the blocked Pilot govern the recommendation.

### B01 Product-local context recovery
| axis | score | rationale |
|---|---|---|
| A. Direct real-product impact | 4 | Product agents re-enter faster without studying reform history |
| B. Human coordination reduction | 5 | Repeated context explanation is the documented core re-entry pain |
| C. Existing evidence strength | 3 | Reform-lab WAKE/CURRENT chain proven; product-local variant unproven |
| D. Time to first useful result | 5 | Markdown + git; single small file set |
| E. Reversibility | 5 | Fully reversible, no daemon/infrastructure |
| F. Dependency unlock value | 4 | Unlocks Pilot re-entry |
| G. Low expansion risk | 4 | Could creep into a governance framework if unbounded; keep to one file |

### B02 Work Item lifecycle / Coordination (Beads)
| axis | score | rationale |
|---|---|---|
| A. Direct real-product impact | 5 | Task graph directly carries product development work |
| B. Human coordination reduction | 4 | Beads human-cost probe: 0 routing, 0 manual state lookups |
| C. Existing evidence strength | 4 | E3 PASSED + raw evidence + measured human cost |
| D. Time to first useful result | 4 | Beads CLI is install-ready; needs an authorized Workspace |
| E. Reversibility | 4 | Isolated `.beads/`, no daemon, delete-to-cleanup |
| F. Dependency unlock value | 4 | Unlocks stigmergic coordination in the Pilot |
| G. Low expansion risk | 3 | Risk of being framed as "adopting a coordination platform" — keep as a disposable CLI |

### B03 Durable Runtime & Recovery
| axis | score | rationale |
|---|---|---|
| A. Direct real-product impact | 4 | Interruption recovery is a real agent-workflow pain |
| B. Human coordination reduction | 4 | Reduces manual recovery steps after crash |
| C. Existing evidence strength | 4 | go-workflows + Restate E3 PASSED with crash-recovery evidence |
| D. Time to first useful result | 3 | go-workflows needs a Go embed adapter; Restate needs Docker/WSL |
| E. Reversibility | 3 | go-workflows reversible; Restate central server is heavier to roll back |
| F. Dependency unlock value | 3 | Depends on coordination + Workspace; second-layer |
| G. Low expansion risk | 3 | Server-based candidates could expand into platform work |

### B04 Current Knowledge / LLM Wiki
| axis | score | rationale |
|---|---|---|
| A. Direct real-product impact | 4 | Reduces re-explanation and state lookup during product work |
| B. Human coordination reduction | 4 | Autonomous ingest removes manual summary/dedup/index/git |
| C. Existing evidence strength | 5 | PILOTED: v0.1.1 operating, validation passing, real ingests |
| D. Time to first useful result | 4 | Already running; apply to product domain |
| E. Reversibility | 5 | Bounded wiki repo; no daemon |
| F. Dependency unlock value | 4 | Supports product-local context (B01) |
| G. Low expansion risk | 4 | Bounded subwiki; risk is domain-scope creep |

### B05 Human coordination measurement & Evaluation loop
| axis | score | rationale |
|---|---|---|
| A. Direct real-product impact | 4 | Produces the before/after evidence the reform loop requires |
| B. Human coordination reduction | 5 | Directly targets repeated human work; stops unproductive reform |
| C. Existing evidence strength | 3 | Metrics defined in probe plan §5; one Beads measurement only |
| D. Time to first useful result | 4 | A metric list + a recording template |
| E. Reversibility | 5 | No infrastructure |
| F. Dependency unlock value | 5 | Enables KEEP/DISCARD verdicts for every intervention |
| G. Low expansion risk | 4 | Risk of becoming an evaluation bureaucracy; keep to a template |

---

## Hard-rule compliance (see EXECUTION_RESET_VALIDATION.md)

- `ACTIVATE_NOW` count: **0** (no product + Workspace + task decision is evidenced).
- `NEXT` count: **5** (B01–B05).
- No full new platform is required by any `NEXT` item.
- Concept-only work (B06, B07, B10) does not outrank the blocked Product Pilot.
- Provider selection/composition/binding remain `BLOCKED`.
- Full AutoResearch (B07) stays `BACKGROUND_RESEARCH` until an evaluation loop (B05) is operational.
- Full Legacy migration (B12) stays `BLOCKED` until coexistence evidence (B11) exists.

---

*End of backlog.*
