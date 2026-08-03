# Coordination Provider Survey — E1/E2

> **Status**: UNDER OUTSIDE REVIEW (Foundation 0.7)
> **Candidates**: Beads, go-workflows (luno/workflow), Restate

---

## Candidate: Beads

**Evidence Level**: E2 (README + docs inspected; source structure inspected)
**Conclusion**: `PROMISING` (Coordination)

**Evidence Card** (per `PROVIDER_COMPARISON_SCHEMA.md`):

```text
candidate_id              beads
upstream_project          Beads
upstream_repository       github.com/gastownhall/beads
license                   MIT (DOCUMENTED, repo page)
maintainer_status         Active (25.9k stars, 10.3k commits) (DOCUMENTED)
latest_release            NOT VERIFIED (release page not inspected)
supported_platforms       macOS, Linux, Windows, FreeBSD (DOCUMENTED)
deployment_model          Local CLI; Dolt-embedded or Dolt-server database (DOCUMENTED)
primary_capability        Coordination: dependency-aware task graph for agents (DOCUMENTED)
secondary_capabilities    Runtime/Re-entry (bd prime injects context); persistent memory (DOCUMENTED)
persistence_model         Dolt (versioned SQL DB) in .beads/; issues.jsonl is export/interchange only, not source of truth (DOCUMENTED)
coordination_model        ready / claim / close; dependency graph; atomic claim; blockers release ready (DOCUMENTED)
state_ownership           Beads database owns operational task state; export to issues.jsonl (DOCUMENTED)
failure_recovery          Dolt versioning; schema version guard; backup via bd export --all (DOCUMENTED)
exportability             bd export --all; issues.jsonl export for viewers/interchange (DOCUMENTED)
importability             Backup/migrate via bd backup (DOCUMENTED); schema migrations (DOCUMENTED)
observability             bd show audit trail; JSON output (DOCUMENTED)
security_boundary         Local DB; no background service; hooks optional; git ops optional (DOCUMENTED)
model_dependency          None (agent-agnostic) (INFERRED)
removal_cost              Low: CLI tool, data in .beads/; can remove or archive (INFERRED)
integration_surface       CLI + AGENTS.md instructions; bd setup for Claude/Codex/factory (DOCUMENTED)
known_limitations         Single-writer embedded mode; server mode for concurrent writers (DOCUMENTED)
source_citations          github.com/gastownhall/beads README (DOCUMENTED)
```

**Answers to the survey questions**:
- Real capability? Yes: claim/lease (atomic claim), ready/blocked (dependency-aware ready), durable state (Dolt). DOCUMENTED.
- State ownership? Beads owns operational task state; export/interchange via issues.jsonl. DOCUMENTED.
- Requires full framework? No — it is a standalone CLI tool with agent-instruction integration, not a workflow engine requiring Nexus to adopt its runtime. DOCUMENTED/INFERRED.
- Obvious private-state coupling? The Dolt DB is the operational store; export path exists; it does not force other modules to read its private DB. INFERRED.
- Export/recovery/replay/replacement surface? Export (issues.jsonl, bd export --all), recovery (Dolt versioning, schema guard), sync (bd dolt push/pull). DOCUMENTED.
- Provider, composite wheel, infrastructure, or adjacent tool? A small-wheel task-coordination tool purpose-built for agents (Coordination); adjacent to Runtime/Re-entry. INFERRED.

**Cross-notes**: Beads is closely aligned with the Nexus Artifact-first / environment-mediated coordination stance; strong candidate for the Coordination slot and a reference for agent re-entry context (bd prime). Windows supported. DOCUMENTED.

---

## Candidate: go-workflows (luno/workflow)

**Evidence Level**: E2 (README + docs inspected; source structure inspected)
**Conclusion**: `PARTIAL FIT` (Coordination)

**Evidence Card**:

```text
candidate_id              go-workflows
upstream_project          luno/workflow
upstream_repository       github.com/luno/workflow
license                   BSD-3-Clause (repo file) / README states MIT — DISCREPANCY (DOCUMENTED); SPDX NOT VERIFIED
maintainer_status         Active (250 stars, 356 commits) (DOCUMENTED)
latest_release            NOT VERIFIED
supported_platforms       Go library; platform-agnostic (INFERRED)
deployment_model          Library embedded in app; pluggable adapters (streamer, record store, role scheduler) (DOCUMENTED)
primary_capability        Coordination: type-safe event-driven workflow/state-machine orchestration (DOCUMENTED)
secondary_capabilities    Retries, timeouts, pause, callbacks, hooks, scheduling (DOCUMENTED)
persistence_model         Record store via adapter (e.g., sqlstore, memrecordstore) (DOCUMENTED)
coordination_model        Durable events, outbox (exactly-once), role-based scheduling, status state machine (DOCUMENTED)
state_ownership           Application-owned record store through adapter interface (DOCUMENTED)
failure_recovery          Retries, exactly-once via outbox, timeout handling (DOCUMENTED)
exportability             NOT VERIFIED (no export surface found in README)
importability             NOT VERIFIED
observability             Prometheus metrics, Web UI, structured logging, tracing (DOCUMENTED)
security_boundary         Library; no separate service; no autonomous daemon (INFERRED)
model_dependency          None (DOCUMENTED)
removal_cost              Moderate: wiring + adapter migration (INFERRED)
integration_surface       Go API (builder, steps, adapters); requires Go runtime (DOCUMENTED)
known_limitations         Go-native; no agent-ready workflow surface; license inconsistency (INFERRED/DOCUMENTED)
source_citations          github.com/luno/workflow README and repo structure (DOCUMENTED)
```

**Answers to the survey questions**:
- Real capability? Yes: durable events, retries, outbox exactly-once, dependency ordering via state machines. DOCUMENTED.
- State ownership? Application-owned store behind an adapter interface — adaptable. DOCUMENTED.
- Requires full framework? It is a library; Nexus would embed it and implement adapters. INFERRED.
- Private-state coupling? Store interface is pluggable; no forced shared DB read. DOCUMENTED/INFERRED.
- Export/recovery/replay/replacement surface? Retry/outbox provide recovery semantics; explicit export surface NOT VERIFIED.
- Provider / composite / infrastructure / adjacent? Workflow-orchestration library (Coordination infrastructure). INFERRED.

---

## Candidate: Restate

**Evidence Level**: E2 (README + docs inspected; source structure inspected)
**Conclusion**: `PROMISING` (Coordination + Runtime)

**Evidence Card**:

```text
candidate_id              restate
upstream_project          Restate
upstream_repository       github.com/restatedev/restate
license                   LICENSE file present; SPDX NOT VERIFIED
maintainer_status         Active (4.2k stars, 4.0k commits) (DOCUMENTED)
latest_release            NOT VERIFIED
supported_platforms       Prebuilt binaries for macOS/Linux; docker; Windows NOT VERIFIED (DOCUMENTED)
deployment_model          Server + SDKs (TypeScript, Java, Python, Go, Rust) (DOCUMENTED)
primary_capability        Durable execution: reliable execution, exactly-once messaging, durable promises/timers (DOCUMENTED)
secondary_capabilities    Consistent K/V entity state, suspending user code, OTel observability (DOCUMENTED)
persistence_model         Server-persisted execution journal + per-entity K/V state (DOCUMENTED)
coordination_model        Request-response / one-way messages / scheduled tasks with exactly-once (DOCUMENTED)
state_ownership           Restate server owns execution + state; attached to request and written back (DOCUMENTED)
failure_recovery          Durable execution recovers partial progress; retries without re-running completed steps (DOCUMENTED)
exportability             NOT VERIFIED
importability             Automatic data migration across x.y releases (DOCUMENTED)
observability             UI/CLI introspection; auto OTel traces (DOCUMENTED)
security_boundary         Server-boundary; no autonomous background daemon in-box (INFERRED)
model_dependency          None (DOCUMENTED)
removal_cost              High if deeply embedded; moderate as orchestration only (INFERRED)
integration_surface       HTTP/gRPC service protocol + SDKs (DOCUMENTED)
known_limitations         Requires running server; central coordination model (DOCUMENTED/INFERRED)
source_citations          github.com/restatedev/restate README and docs (DOCUMENTED)
```

**Answers to the survey questions**:
- Real capability? Yes: durable execution, exactly-once, consistent state. DOCUMENTED.
- State ownership? Restate server owns canonical execution/state. DOCUMENTED.
- Requires full framework? Uses a central workflow/durable-execution model; adopting it means adopting its invocation model. INFERRED.
- Private-state coupling? State is per-entity K/V; export surface NOT VERIFIED — a governance concern.
- Export/recovery/replay/replacement surface? Recovery yes; export NOT VERIFIED.
- Provider / composite / infrastructure / adjacent? Durable-execution infrastructure spanning Coordination + Runtime. INFERRED.

---

*End of Coordination survey.*
