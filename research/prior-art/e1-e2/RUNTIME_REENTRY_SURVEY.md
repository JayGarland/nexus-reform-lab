# Runtime / Re-entry Provider Survey — E1/E2

> **Status**: UNDER OUTSIDE REVIEW (Foundation 0.7)
> **Candidates**: Temporal, Inngest, Hatchet
> **Boundary note**: A framework named "agent runtime" or "durable execution" is NOT automatically a fit for Artifact World re-entry. Each candidate is assessed against durable execution, fresh-instance reconstruction, checkpoint/resume, artifact-oriented handoff, crash recovery, human-approval boundary, and model independence.

---

## Candidate: Temporal

**Evidence Level**: E2 (README + docs + source structure inspected)
**Conclusion**: `PROMISING` (Runtime / Re-entry)

**Evidence Card**:

```text
candidate_id              temporal
upstream_project          Temporal
upstream_repository       github.com/temporalio/temporal
license                   MIT (DOCUMENTED)
maintainer_status         Active (22.1k stars, 9.5k commits) (DOCUMENTED)
latest_release            NOT VERIFIED
supported_platforms       Server on Go; multi-language SDKs; Docker/self-host (DOCUMENTED)
deployment_model          Server + workers (workflows/activities) (DOCUMENTED)
primary_capability        Durable execution platform (DOCUMENTED)
secondary_capabilities    Automatic retries, workflow/activity isolation, checkpoint/resume, Web UI (DOCUMENTED)
persistence_model         Server-persisted workflow/activity history (DOCUMENTED)
coordination_model        Workflow state machine, activities, signals (DOCUMENTED)
state_ownership           Temporal server owns execution history (DOCUMENTED)
failure_recovery          Durable event-sourced execution; resumes after worker failure (DOCUMENTED)
exportability             NOT VERIFIED
importability             NOT VERIFIED
observability             Web UI, CLI, metrics/tracing (DOCUMENTED)
security_boundary         Server + worker boundaries; namespaces (DOCUMENTED/INFERRED)
model_dependency          None (DOCUMENTED)
removal_cost              High if workflows embed Nexus logic (INFERRED)
integration_surface       gRPC + SDKs (Go, Java, TS, Python, etc.) (DOCUMENTED)
known_limitations         Central server + workers; workflow code versioning discipline required (DOCUMENTED/INFERRED)
source_citations          github.com/temporalio/temporal README (DOCUMENTED)
```

**Answers to the survey questions**:
- durable execution? Yes. DOCUMENTED.
- fresh-instance reconstruction? Workflows resume from server history, not from model memory. DOCUMENTED.
- checkpoint/resume? Yes (durable execution, retries). DOCUMENTED.
- artifact-oriented handoff? NOT VERIFIED (handoff is workflow-history based, not artifact-file based). INFERRED.
- crash recovery? Yes. DOCUMENTED.
- human approval boundary? Not built-in as a governance gate; DIY. INFERRED.
- model independence? Yes. DOCUMENTED.

---

## Candidate: Inngest

**Evidence Level**: E2 (README + docs + source structure inspected)
**Conclusion**: `PARTIAL FIT` (Runtime / Re-entry)

**Evidence Card**:

```text
candidate_id              inngest
upstream_project          Inngest
upstream_repository       github.com/inngest/inngest
license                   Server: SSPL + delayed open-source (Apache-2.0 DOSP); SDKs: Apache-2.0 (DOCUMENTED)
maintainer_status         Active (5.7k stars, 6.1k commits) (DOCUMENTED)
latest_release            NOT VERIFIED
supported_platforms       Dev server local; deploy to own infra; SDKs (TS, Python, Go, Kotlin/Java) (DOCUMENTED)
deployment_model          Server + SDK functions invoked via HTTPS events (DOCUMENTED)
primary_capability        Durable step functions / workflow orchestration (DOCUMENTED)
secondary_capabilities    Queues, flow control, retries, wait-for-event, scheduling, AI workflows (DOCUMENTED)
persistence_model         State store DB for run state; DB for history (DOCUMENTED)
coordination_model        Event-triggered step functions; step retries (DOCUMENTED)
state_ownership           Inngest server owns run state/history (DOCUMENTED)
failure_recovery          Retries + step re-execution; state store persists progress (DOCUMENTED)
exportability             NOT VERIFIED
importability             NOT VERIFIED
observability             Dashboard UI; GraphQL/REST API; history (DOCUMENTED)
security_boundary         Server boundary; event keys (DOCUMENTED)
model_dependency          None (DOCUMENTED)
removal_cost              Moderate (server) (INFERRED)
integration_surface       SDKs + HTTPS; self-hosting (DOCUMENTED)
known_limitations         Server-Side Public License for server; heavier orchestration model (DOCUMENTED/INFERRED)
source_citations          github.com/inngest/inngest README (DOCUMENTED)
```

**Answers to the survey questions**:
- durable execution? Yes (durable step functions). DOCUMENTED.
- fresh-instance reconstruction? Server resumes run state, not from model memory. DOCUMENTED/INFERRED.
- artifact-oriented handoff? NOT VERIFIED.
- crash recovery? Yes (retries + state store). DOCUMENTED.
- human approval boundary? NOT VERIFIED.
- model independence? Yes. DOCUMENTED.
- licensing consideration: SSPL/DOSP for server is a governance factor for adoption. DOCUMENTED.

---

## Candidate: Hatchet

**Evidence Level**: E2 (README + docs + source structure inspected)
**Conclusion**: `PROMISING` (Runtime / Re-entry)

**Evidence Card**:

```text
candidate_id              hatchet
upstream_project          Hatchet
upstream_repository       github.com/hatchet-dev/hatchet
license                   MIT (DOCUMENTED)
maintainer_status         Active (7.7k stars, 3.3k commits) (DOCUMENTED)
latest_release            NOT VERIFIED
supported_platforms       Python, TypeScript, Go, Ruby; self-host via Docker on macOS/Linux/WSL (DOCUMENTED)
deployment_model          Server (self-host or cloud) + SDK workers (DOCUMENTED)
primary_capability        Orchestration for background tasks, AI agents, durable workflows (DOCUMENTED)
secondary_capabilities    Retries, DAGs, durable tasks, concurrency/rate limits, worker affinity/routing, durable sleep/event waits, OTel (DOCUMENTED)
persistence_model         Postgres as durability layer for runtime + observability (DOCUMENTED)
coordination_model        Durable tasks, DAGs, event-driven triggers, worker slots (DOCUMENTED)
state_ownership           Hatchet server (Postgres) owns run history (DOCUMENTED)
failure_recovery          Durable tasks recover from failure; retry policies; durable execution (DOCUMENTED)
exportability             NOT VERIFIED
importability             NOT VERIFIED
observability             Real-time Web UI, OTel, Prometheus (DOCUMENTED)
security_boundary         Server boundary; multi-tenant by default; users/roles (DOCUMENTED)
model_dependency          None (DOCUMENTED)
removal_cost              Moderate (Postgres + server) (INFERRED)
integration_surface       SDKs + REST/gRPC API (DOCUMENTED)
known_limitations         Requires Postgres + server; WSL/Docker on Windows (DOCUMENTED)
source_citations          github.com/hatchet-dev/hatchet README (DOCUMENTED)
```

**Answers to the survey questions**:
- durable execution? Yes (durable tasks, DAGs). DOCUMENTED.
- fresh-instance reconstruction? Server-held run state; not model memory. DOCUMENTED/INFERRED.
- checkpoint/resume? Durable sleep/event waits + durable tasks. DOCUMENTED.
- artifact-oriented handoff? NOT VERIFIED.
- crash recovery? Yes. DOCUMENTED.
- human approval boundary? NOT VERIFIED (role/approval surfaces not found in README).
- model independence? Yes. DOCUMENTED.

---

*End of Runtime / Re-entry survey.*
