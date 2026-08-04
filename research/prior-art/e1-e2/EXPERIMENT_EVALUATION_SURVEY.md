# Experiment / Evaluation Provider Survey — E1/E2

> **Status**: UNDER OUTSIDE REVIEW (Foundation 0.7)
> **Candidates**: MLflow, DVC, promptfoo

---

## Candidate: MLflow

**Evidence Level**: E2 (README + docs + source structure inspected)
**Conclusion**: `PROMISING` (Experiment / Evaluation)

**Evidence Card**:

```text
candidate_id              mlflow
upstream_project          MLflow
upstream_repository       github.com/mlflow/mlflow
license                   Apache-2.0 (DOCUMENTED)
maintainer_status         Active (Databricks-led; 27.3k stars, 12.8k commits) (DOCUMENTED)
latest_release            NOT VERIFIED
supported_platforms       Python, Java, TypeScript/JS; server + UI (DOCUMENTED)
deployment_model          Server (local/self-hosted/managed) + tracking/eval APIs (DOCUMENTED)
primary_capability        Experiment tracking + evaluation (50+ metrics, LLM judges) (DOCUMENTED)
secondary_capabilities    Tracing/observability (OTel), prompt registry + optimization, AI gateway, model registry (DOCUMENTED)
persistence_model         Server-backed tracking store (artifacts, params, metrics, traces) (DOCUMENTED)
coordination_model        NOT VERIFIED
state_ownership           MLflow server owns tracking/registry state (DOCUMENTED)
failure_recovery          NOT VERIFIED
exportability             NOT VERIFIED
importability             NOT VERIFIED
observability             Tracing UI, metrics dashboards (DOCUMENTED)
security_boundary         Server-boundary; auth managed by deployment (INFERRED)
model_dependency          Uses LLM/ML models as subjects; provider-agnostic (DOCUMENTED)
removal_cost              Moderate-to-high (server dependency) (INFERRED)
integration_surface       SDKs + REST/UI; OpenTelemetry; MCP (DOCUMENTED)
known_limitations         Broad platform; full-framework adoption risk; heavier than a thin evaluator (INFERRED)
source_citations          github.com/mlflow/mlflow README (DOCUMENTED)
```

**Answers to the survey questions**:
- fixed workload / baseline / candidate? Experiment tracking + evaluation support baseline-vs-candidate comparison. DOCUMENTED.
- raw evidence? Traces and metrics persisted (DOCUMENTED); raw-output fidelity NOT VERIFIED.
- replay? NOT VERIFIED.
- metric comparison? Yes (metrics, plots). DOCUMENTED.
- KEEP/REFINE/DISCARD/REVERT? Not built-in decision protocol; decision is external. INFERRED.
- classification: platform combining benchmark/tracing/evaluator; functional adjacency does not equal Provider fit. INFERRED.

---

## Candidate: DVC

**Evidence Level**: E2 (README + docs + source structure inspected)
**Conclusion**: `PROMISING` (Experiment / Evaluation)

**Evidence Card**:

```text
candidate_id              dvc
upstream_project          DVC (Data Version Control)
upstream_repository       github.com/treeverse/dvc
license                   Apache-2.0 (DOCUMENTED)
maintainer_status         Active (15.8k stars, 9.5k commits) (DOCUMENTED)
latest_release            NOT VERIFIED
supported_platforms       Python; Linux, macOS, Windows (choco); VS Code ext (DOCUMENTED)
deployment_model          CLI + Git; no server required (DOCUMENTED)
primary_capability        Data/model versioning + ML experiments (DOCUMENTED)
secondary_capabilities    Pipelines (dvc stage), experiment run/show/apply, metrics.json, reproducibility (DOCUMENTED)
persistence_model         Git-tracked meta-files + data cache outside Git; remote storage (DOCUMENTED)
coordination_model        NOT VERIFIED
state_ownership           Git + DVC cache/remote (DOCUMENTED)
failure_recovery          Reproducible pipelines; replay via dvc repro/exp run (DOCUMENTED)
exportability             Data/models via dvc push; metrics as files (DOCUMENTED)
importability             dvc pull / remote (DOCUMENTED)
observability             Metrics/plots; exp show (DOCUMENTED)
security_boundary         CLI + Git; no daemon (DOCUMENTED)
model_dependency          None (DOCUMENTED)
removal_cost              Low-to-moderate (Git-native) (INFERRED)
integration_surface       CLI, Python, VS Code extension (DOCUMENTED)
known_limitations         Experiment harness rather than closed-loop evaluator; fixed-workload replay is DIY (INFERRED)
source_citations          github.com/treeverse/dvc README (DOCUMENTED)
```

**Answers to the survey questions**:
- fixed workload? Pipelines + exp runs support reproducible fixed workloads. DOCUMENTED/INFERRED.
- baseline/candidate? `dvc exp run` with different params/code; compare via exp show/plots. DOCUMENTED.
- raw evidence? Metrics/plots persisted in Git; full raw outputs NOT VERIFIED.
- replay? Yes (reproducible pipelines). DOCUMENTED.
- metric comparison? Yes. DOCUMENTED.
- classification: experiment runner + data versioning; not a closed-loop AutoResearch evaluator by itself. INFERRED.

---

## Candidate: promptfoo

**Evidence Level**: E2 (README + docs + source structure inspected)
**Conclusion**: `PROMISING` (Experiment / Evaluation)

**Evidence Card**:

```text
candidate_id              promptfoo
upstream_project          promptfoo
upstream_repository       github.com/promptfoo/promptfoo
license                   MIT (DOCUMENTED); now part of OpenAI (DOCUMENTED)
maintainer_status         Active (23.9k stars, 9.3k commits) (DOCUMENTED)
latest_release            NOT VERIFIED
supported_platforms       Node.js >= 22; npm/brew/pip; web viewer (DOCUMENTED)
deployment_model          CLI + library; evals run locally (DOCUMENTED)
primary_capability        LLM evals: fixed prompts/tests, model comparison, metrics (DOCUMENTED)
secondary_capabilities    Red teaming / vulnerability scanning; CI/CD; code scanning (DOCUMENTED)
persistence_model         Declarative YAML configs; local results (DOCUMENTED)
coordination_model        NOT VERIFIED
state_ownership           User-defined configs; results local (DOCUMENTED)
failure_recovery          NOT VERIFIED
exportability             Results shareable; NOT VERIFIED details
importability             Configs are files (DOCUMENTED)
observability             Web viewer eval matrix (DOCUMENTED)
security_boundary         Local eval; no server required (DOCUMENTED)
model_dependency          Evaluates LLMs across providers (subject, not dependency) (DOCUMENTED)
removal_cost              Low (local CLI) (INFERRED)
integration_surface       CLI, Node library, CI/CD (DOCUMENTED)
known_limitations         Evaluator harness; not a durable experiment store or closed-loop runner (INFERRED)
source_citations          github.com/promptfoo/promptfoo README (DOCUMENTED)
```

**Answers to the survey questions**:
- fixed workload / replay? Declarative test sets + caching support repeatable evals. DOCUMENTED/INFERRED.
- baseline/candidate? Side-by-side model/prompt comparison. DOCUMENTED.
- raw evidence? Local eval outputs; fidelity NOT VERIFIED.
- metric comparison? Yes (graders/metrics). DOCUMENTED.
- classification: evaluation harness + red-teaming; closest to an Evaluation Provider "evaluator" role. INFERRED.

---

*End of Experiment / Evaluation survey.*
