# Knowledge Projection Provider Survey — E1/E2

> **Status**: UNDER OUTSIDE REVIEW (Foundation 0.7)
> **Candidates**: karpathy llm-wiki, local base-llm-wiki, KurrentDB (EventStoreDB), Marten

---

## Candidate: karpathy llm-wiki

**Evidence Level**: E0 (named candidate; the attempted repository URL github.com/karpathy/llm-wiki returned 404 and the authoritative source was not located in this pass)
**Conclusion**: `INSUFFICIENT EVIDENCE`

```text
candidate_id              karpathy-llm-wiki
upstream_project          karpathy llm-wiki
upstream_repository       The attempted repository URL github.com/karpathy/llm-wiki returned 404 (DOCUMENTED). The original or authoritative source was not located in this pass. This does not establish that no authoritative article, repository, gist, post, or other source exists.
license                   NOT VERIFIED
maintainer_status         NOT VERIFIED
latest_release            NOT VERIFIED
supported_platforms       NOT VERIFIED
deployment_model          NOT VERIFIED
primary_capability        Knowledge Projection (LLM-generated wiki pages) — concept-level only
secondary_capabilities    NOT VERIFIED
persistence_model         NOT VERIFIED
coordination_model        NOT VERIFIED
state_ownership           NOT VERIFIED
failure_recovery          NOT VERIFIED
exportability             NOT VERIFIED
importability             NOT VERIFIED
observability             NOT VERIFIED
security_boundary         NOT VERIFIED
model_dependency          NOT VERIFIED
removal_cost              NOT VERIFIED
integration_surface       NOT VERIFIED
known_limitations         The attempted URL returned 404; the authoritative source remains unresolved in this pass (DOCUMENTED)
source_citations          none verified (third-party mentions not used as core evidence)
```

**Stop-condition hit**: the original or authoritative source was not located in this pass → `INSUFFICIENT EVIDENCE`; Evidence Level `E0 — Mention only`. Next evidence required: identify the exact original source referred to as "Karpathy LLM Wiki" before conducting E1 inspection. This does NOT establish that no authoritative article, repository, gist, post, or other source exists.

---

## Candidate: base-llm-wiki (local in-house)

**Evidence Level**: E1 (local directory structure inspected)
**Conclusion**: `INSUFFICIENT EVIDENCE` (for capability fit in this pass)

```text
candidate_id              base-llm-wiki
upstream_project          Local in-house wiki sub-system (F:\wiki-system family)
upstream_repository       local: F:\subwikis\base-llm-wiki (Obsidian-based wiki system) (DOCUMENTED)
license                   NOT VERIFIED (no LICENSE found at top level)
maintainer_status         Local/in-house (DOCUMENTED)
latest_release            NOT VERIFIED
supported_platforms       Local filesystem / Obsidian (INFERRED)
deployment_model          File-tree wiki: raw/, raw1/, templates/, wiki/, workflows/, AGENTS.md (DOCUMENTED)
primary_capability        Knowledge Projection candidate: source (raw) → wiki projection (INFERRED)
secondary_capabilities    Template-based generation; workflow definitions (INFERRED)
persistence_model         File-tree artifacts (DOCUMENTED structure)
coordination_model        NOT VERIFIED
state_ownership           Local file ownership (INFERRED)
failure_recovery          NOT VERIFIED
exportability             File-tree artifacts are inherently portable (INFERRED)
importability             NOT VERIFIED
observability             NOT VERIFIED
security_boundary         Local-only (INFERRED)
model_dependency          NOT VERIFIED
removal_cost              Local; removable (INFERRED)
integration_surface       Local file-tree; no public API found in structure pass (INFERRED)
known_limitations         No README at top level; page content and build pipeline not inspected in this pass (DOCUMENTED)
source_citations          local directory listing (DOCUMENTED)
```

**Note**: This is the "existing local base-llm-wiki" named in the plan. It is an internal candidate; its `wiki/`, `raw/`, `templates/`, and `workflows/` contents require a dedicated local-inspection pass (authorized separately) before any fit claim. `INSUFFICIENT EVIDENCE` this round.

---

## Candidate: KurrentDB (formerly EventStoreDB)

**Evidence Level**: E2 (README + docs + source structure inspected)
**Conclusion**: `PARTIAL FIT` (Knowledge Projection)

**Evidence Card**:

```text
candidate_id              kurrentdb
upstream_project          KurrentDB (Event Store rebrand)
upstream_repository       github.com/kurrent-io/KurrentDB
license                   LICENSE.md present; SPDX NOT VERIFIED (DOCUMENTED)
maintainer_status         Active (5.8k stars, 9.1k commits) (DOCUMENTED)
latest_release            NOT VERIFIED
supported_platforms       Windows, Linux, macOS (via Docker) on .NET Core (DOCUMENTED)
deployment_model          Server (self-managed or Kurrent Cloud); gRPC clients (DOCUMENTED)
primary_capability        Event-native store + integrated streaming engine (DOCUMENTED)
secondary_capabilities    Event sourcing / CQRS substrate; projection lineage (EventStoreDB heritage) (DOCUMENTED/INFERRED)
persistence_model         Append-only event store (DOCUMENTED)
coordination_model        NOT VERIFIED
state_ownership           Server-owned event log (DOCUMENTED)
failure_recovery          Distributed/cluster deployment model (DOCUMENTED)
exportability             NOT VERIFIED (client/streaming APIs; export tooling NOT VERIFIED)
importability             NOT VERIFIED
observability             Admin/UI + gRPC protocol (DOCUMENTED)
security_boundary         Server-boundary; cluster config (DOCUMENTED)
model_dependency          None (DOCUMENTED)
removal_cost              High if used as canonical store (INFERRED)
integration_surface       gRPC clients (Python, Node, Java, .NET, Go, Rust) (DOCUMENTED)
known_limitations         Heavy infrastructure; projections engine not verified in this pass (INFERRED)
source_citations          github.com/kurrent-io/KurrentDB README; docs.kurrent.io (DOCUMENTED)
```

**Note**: The EventStoreDB lineage includes a JavaScript projections engine. This specific capability was NOT verified against the docs in this pass; it is flagged `INFERRED`/`NOT VERIFIED` and requires an E2 projections-docs pass before a fit claim.

---

## Candidate: Marten

**Evidence Level**: E2 (README + docs + source structure inspected)
**Conclusion**: `PROMISING` (Knowledge Projection)

**Evidence Card**:

```text
candidate_id              marten
upstream_project          Marten
upstream_repository       github.com/JasperFx/marten
license                   MIT (DOCUMENTED)
maintainer_status         Active (3.4k stars, 7.0k commits) (DOCUMENTED)
latest_release            NOT VERIFIED
supported_platforms       .NET 8+; PostgreSQL 13+ (DOCUMENTED)
deployment_model          Library embedded in .NET application; PostgreSQL backend (DOCUMENTED)
primary_capability        Event store with user-defined projections against event streams (DOCUMENTED)
secondary_capabilities    Transactional document DB; patching (DOCUMENTED)
persistence_model         PostgreSQL event tables + projection documents (DOCUMENTED)
coordination_model        NOT VERIFIED
state_ownership           Application-owned store in PostgreSQL (DOCUMENTED)
failure_recovery          PostgreSQL ACID; retries (DOCUMENTED/INFERRED)
exportability             NOT VERIFIED (SQL/Postgres export possible) (INFERRED)
importability             NOT VERIFIED
observability             NOT VERIFIED
security_boundary         Library + PostgreSQL; no daemon (INFERRED)
model_dependency          None (DOCUMENTED)
removal_cost              Moderate: Postgres migration (INFERRED)
integration_surface       .NET API (DOCUMENTED)
known_limitations         .NET-bound; projections are code-defined (INFERRED/DOCUMENTED)
source_citations          github.com/JasperFx/marten README (DOCUMENTED)
```

**Answers to the survey questions (Knowledge Projection)**:
- source artifact → projection? Yes, event-stream projections (Marten). DOCUMENTED.
- incremental rebuild? Projection rebuild supported (projection lifecycle) — NOT VERIFIED in this pass for rebuild details.
- provenance? Event store preserves raw events (provenance substrate). DOCUMENTED/INFERRED.
- correction / supersession? Projection supersession via versioned projection code — INFERRED, NOT VERIFIED.
- projection deletable/rebuildable? Rebuildable projection model — INFERRED, requires E3.
- private index/database becomes source of truth? Projections live in PostgreSQL; canonical events remain in the event store — INFERRED (fits separation, not verified).

---

*End of Knowledge Projection survey.*
