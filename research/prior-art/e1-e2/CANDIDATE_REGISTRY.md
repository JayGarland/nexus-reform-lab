# Candidate Registry — E1/E2 Prior-Art Survey

> **Status**: UNDER OUTSIDE REVIEW (Foundation 0.7)
> **Rule**: No candidate carries `ADOPT`, `KEEP`, `SELECTED`, `BOUND`, or `IMPLEMENTED`. No candidate reached E3.

## Registry

| candidate | provider slot | evidence level | status | primary upstream source | reason included | next evidence required |
|---|---|---|---|---|---|---|
| Beads | Coordination (+ Runtime/Re-entry adjacent) | E2 | `PROMISING` | github.com/gastownhall/beads | Agent-oriented dependency graph, ready/claim/close, Dolt-backed durable state, export surface | E3 sandbox execution; E4 fixed fixture claim test |
| go-workflows (luno/workflow) | Coordination | E2 | `PARTIAL FIT` | github.com/luno/workflow | Go type-safe event-driven state-machine orchestration, durable events, retries, adapters | E3; verify outbox exactly-once and schema portability |
| Restate | Coordination (+ Runtime) | E2 | `PROMISING` | github.com/restatedev/restate | Durable execution, exactly-once messaging, durable promises/timers, K/V entity state | E3; assess server dependency and state export |
| KurrentDB (EventStoreDB) | Knowledge Projection | E2 | `PARTIAL FIT` | github.com/kurrent-io/KurrentDB | Event-native store with streaming engine; projection lineage; evidence-grade raw events | E2 projections docs; E3; export/import |
| Marten | Knowledge Projection | E2 | `PROMISING` | github.com/JasperFx/marten | Event store on PostgreSQL with user-defined projections; rebuildable projections | E3; projection rebuild and deletion test |
| karpathy llm-wiki | Knowledge Projection | E0 | `INSUFFICIENT EVIDENCE` | not found (404) | Named candidate from plan | locate official source; if none, ARCHITECTURAL REFERENCE ONLY |
| base-llm-wiki (local) | Knowledge Projection | E1 (local structure) | `INSUFFICIENT EVIDENCE` | local `F:\subwikis\base-llm-wiki` | Existing local in-house wiki system | local content/source inspection of `wiki/`, `raw/`, `templates/`, `workflows/` |
| OPA | Protocol Governance | E2 | `PROMISING` | github.com/open-policy-agent/opa | General-purpose policy engine (Rego), policy-as-code, `opa test`, bundles, fail-closed | E3; NL-protocol adapter assessment |
| Cedar | Protocol Governance | E2 | `PROMISING` | github.com/cedar-policy/cedar | Authorization policy language with validator/analyzer, CLI, WASM | E3; schema-driven policy validation fit |
| Oso | Protocol Governance | E1 | `ARCHITECTURAL REFERENCE ONLY` | github.com/osohq/oso | Declared deprecated in official README | none (deprecated); reuse Polar concepts only |
| MLflow | Experiment / Evaluation | E2 | `PROMISING` | github.com/mlflow/mlflow | Experiment tracking, evaluation metrics/LLM judges, tracing, prompt registry, model registry | E3; fixed workload + baseline/candidate harness fit |
| DVC | Experiment / Evaluation | E2 | `PROMISING` | github.com/treeverse/dvc | Data versioning + ML experiments, pipelines, `dvc exp run/show`, reproducibility/replay | E3; fixed workload replay and metric comparison |
| promptfoo | Experiment / Evaluation | E2 | `PROMISING` | github.com/promptfoo/promptfoo | Declarative LLM evals, model comparison, metrics, red teaming, CI/CD | E3; Nexus-compatible fixture evaluation |
| Temporal | Runtime / Re-entry | E2 | `PROMISING` | github.com/temporalio/temporal | Durable execution platform, workflows/activities, retries, checkpoint/resume | E3; assess fresh-instance reconstruction and export |
| Inngest | Runtime / Re-entry | E2 | `PARTIAL FIT` | github.com/inngest/inngest | Durable step functions, state store, queues, retries, self-hostable | E3; license (SSPL/DOSP) and export surface |
| Hatchet | Runtime / Re-entry | E2 | `PROMISING` | github.com/hatchet-dev/hatchet | Orchestration for tasks/AI agents/durable workflows, Postgres durability, WSL/Docker | E3; crash-recovery fixture and worker re-entry |

## Summary Counts

- Candidates registered: 16
- Reached E1 (docs inspected): 16
- Reached E2 (source/architecture inspected): 14
- `INSUFFICIENT EVIDENCE`: 2 (karpathy llm-wiki; local base-llm-wiki)
- `ARCHITECTURAL REFERENCE ONLY`: 1 (Oso)
- Selected or bound: 0

---

*End of registry.*
