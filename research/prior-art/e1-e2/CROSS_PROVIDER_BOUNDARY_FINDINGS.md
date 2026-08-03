# Cross-Provider Boundary Findings — E1/E2 Prior-Art Survey

> **Status**: UNDER OUTSIDE REVIEW (Foundation 0.7)
> **Purpose**: Records which candidates span multiple Provider slots, whether the span is genuine orthogonal capability or internal coupling, which candidates risk imposing a full world-model, which are small-wheel material, which are reference-only, and which capabilities currently lack a clear candidate. No final selection is made.

---

## 1. Candidates spanning multiple Providers

| candidate | primary slot | secondary slot | span origin |
|---|---|---|---|
| Beads | Coordination | Runtime/Re-entry (bd prime context injection, persistent memory) | Genuine: task graph coordination + re-entry context are related but separable capabilities (INFERRED) |
| Restate | Coordination | Runtime/Re-entry (durable execution) | Genuine but fused: durable execution is its core; coordination is derived (INFERRED) |
| Temporal | Runtime/Re-entry | Coordination (workflow orchestration) | Genuine but fused: orchestration + durability are one engine (DOCUMENTED/INFERRED) |
| Inngest | Runtime/Re-entry | Coordination (step orchestration) | Fused (DOCUMENTED/INFERRED) |
| Hatchet | Runtime/Re-entry | Coordination (DAGs, task routing) | Fused (DOCUMENTED/INFERRED) |
| KurrentDB | Knowledge Projection (substrate) | Experiment/Evaluation (raw evidence store) | Genuine as a substrate; projection logic is separate (INFERRED) |
| MLflow | Experiment/Evaluation | Knowledge (prompt registry), Observability | Platform-wide; span reflects a full platform, not separable orthogonal slots (INFERRED) |
| DVC | Experiment/Evaluation | Data versioning (Artifact-first lineage) | Genuine: versioning + experiment runner are separable (DOCUMENTED/INFERRED) |

**Finding**: Engine-class candidates (Temporal, Restate, Inngest, Hatchet, MLflow) fuse multiple capabilities behind one internal model. Their span is mostly internal coupling, not orthogonal capability.

---

## 2. Candidates that may force Nexus to accept their full world-model

```text
Temporal      (server + workflow/activity model + history-based state)
Restate       (durable-execution invocation model + server-owned state)
Inngest       (server + event/step-function model + SSPL)
MLflow        (server + tracking/eval/registry platform)
Hatchet       (server + Postgres-backed orchestration model)
```

Adopting any of these as the Coordination or Runtime Provider risks binding Nexus to a central engine and its data model, contrary to the Modularity & Replaceability Doctrine's Provider-private-state separation. Thin-adapter feasibility is NOT VERIFIED and must be established at E3/E4 before fit claims.

## 3. Candidates suitable as small wheels (thin-adapter / replaceable)

```text
Beads     (focused task-graph coordination CLI)
OPA       (focused policy decision engine)
Cedar     (focused policy language + validator)
promptfoo (focused evaluation harness)
DVC       (focused versioning + experiment runner)
```

These expose narrow, file/CLI-oriented surfaces and are the most promising for thin-adapter integration.

## 4. Candidates that are reference-only / cannot be directly composed

```text
Oso                 (deprecated upstream; reference only)
karpathy llm-wiki   (attempted repository URL returned 404; authoritative source unresolved in this pass — reference only)
base-llm-wiki       (local in-house; content not yet inspected)
```

## 5. Capability gaps (no clear candidate this round)

- **Natural-language protocol governance**: structured Policy-as-Code engines (OPA, Cedar) do not natively version/lint/test/rollout/deprecate natural-language protocol assets. No candidate directly provides NL-protocol versioning + deprecation + decision trace. INFERRED.
- **Current-knowledge compilation**: no off-the-shelf multi-page hyperlinked LLM wiki with contradiction registers and provenance matrices was confirmed. Event-store projections (Marten) + local base-llm-wiki are partial substrates. INFERRED.
- **Artifact-oriented re-entry / handoff**: durable-execution engines reconstruct from server history, not from Nexus artifact files. An artifact-oriented handoff surface must be built or adapted. INFERRED.
- **Human-approval boundary in runtime**: no candidate exposes a governance gate for irreversible actions; it must be composed. INFERRED.

## 6. Standing rules applied

- Functional adjacency (benchmark / tracing / runtime naming) does not equal Provider fit.
- Provider-private state must not become canonical truth.
- No candidate below E3 entered selection discussion.
- No selection was made this round.

---

*End of cross-provider boundary findings.*
