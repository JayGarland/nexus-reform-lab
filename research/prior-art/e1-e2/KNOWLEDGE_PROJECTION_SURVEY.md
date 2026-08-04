# Knowledge Projection Provider Survey — E1/E2

> **Status**: UNDER OUTSIDE REVIEW (Foundation 0.7 / corrected under Foundation 0.8 queue review)
> **Candidates**: karpathy llm-wiki (pattern), base-llm-wiki (local), Astro-Han/karpathy-llm-wiki, SamurAIGPT/llm-wiki-agent, ussumant/llm-wiki-compiler, atomicstrata/llm-wiki-compiler, KurrentDB (EventStoreDB), Marten

---

## 0. Two Distinct Projection Capabilities

The Nexus Knowledge Projection Provider must clearly distinguish two capabilities that MUST NOT impersonate each other (they may combine, but neither substitutes for the other):

```text
Deterministic State Projection:
  events → read model
  Examples: Marten, KurrentDB

LLM Current-Knowledge Compilation:
  raw sources → semantic, interlinked, maintainable Current Knowledge Wiki
  Examples: Karpathy LLM Wiki pattern and its implementations
```

- Marten/KurrentDB test event-stream projection infrastructure, NOT the LLM-maintained Current Knowledge Wiki capability currently required by Nexus.
- Marten may serve as a future bottom-layer event projection, but it cannot alone satisfy the Nexus LLM Wiki capability.

---

## Candidate: karpathy llm-wiki (Andrej Karpathy — original pattern)

**Evidence Level**: E1 — Upstream documentation inspected (gist read in this pass)
**Conclusion**: `PARTIAL FIT` — pattern / idea file; not a packaged software product

**Source located**: `https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f` — file `llm-wiki.md` (Andrej Karpathy, LLM Wiki).

```text
candidate_id              karpathy-llm-wiki
upstream_project          Andrej Karpathy — LLM Wiki
upstream_repository       gist.github.com/karpathy/442a6bf555914893e9891c11519de94f (llm-wiki.md) (DOCUMENTED)
identity                  Pattern / idea file. "A pattern for building personal knowledge bases using LLMs." "This is an idea file, it is designed to be copy pasted to your own LLM Agent." Not a packaged software product (DOCUMENTED)
license                   NOT VERIFIED (gist has no explicit license line inspected)
maintainer_status         Andrej Karpathy (DOCUMENTED)
latest_release            n/a (pattern file)
supported_platforms       Agent-agnostic (Claude Code, Codex, OpenCode, etc.) (DOCUMENTED)
deployment_model          Copy-paste pattern; the agent builds the specifics (DOCUMENTED)
primary_capability        LLM Current-Knowledge Compilation pattern: raw → wiki → schema (DOCUMENTED)
secondary_capabilities    Ingest / Query / Lint operations; index.md + log.md; optional CLI search (qmd) (DOCUMENTED)
persistence_model         Markdown file tree: raw/ (immutable sources), wiki/ (LLM-maintained pages), schema file (CLAUDE.md/AGENTS.md) (DOCUMENTED)
coordination_model        None (agent-driven) (DOCUMENTED)
state_ownership           Wiki is a git repo of markdown; LLM owns the wiki layer (DOCUMENTED)
failure_recovery          Git version history; regenerate wiki (INFERRED)
exportability             Wiki is plain markdown / git (DOCUMENTED)
importability             Ingest new sources into raw/ (DOCUMENTED)
observability             index.md catalog; log.md append-only timeline (DOCUMENTED)
security_boundary         None specified; local files (INFERRED)
model_dependency          LLM-maintained by design; the LLM is the compiler (DOCUMENTED)
removal_cost              Low — markdown files (INFERRED)
integration_surface       Agent instructions / schema file; optional qmd search (DOCUMENTED)
known_limitations         Intentionally abstract; not an implementation; specifics built by agent (DOCUMENTED)
source_citations          gist.github.com/karpathy/442a6bf555914893e9891c11519de94f (DOCUMENTED, read in this pass)
```

**Role**: canonical pattern reference. The four public implementation candidates (and, at E1 / CLAIMED-NOT-EVIDENCED, local base-llm-wiki) are where E3 eligibility would be assessed. Evidence Level `E1`; NOT raised to E2 because no inspectable concrete implementation source exists in the gist.

---

## Candidate: base-llm-wiki (local in-house)

**Evidence Level**: E2 — bounded local source / artifact architecture inspected
**Outside Review Boundary**: Architecture evidence confirmed from the committed manifest, hashes, bounded excerpts, commands, secret screening, and mapped findings at `research/prior-art/e1-e2/local-base-llm-wiki/`.
**Not Confirmed**: runtime behavior; semantic compilation quality; completeness of raw-source coverage; incremental update correctness; E3 execution.
**Conclusion**: `PROMISING`

```text
candidate_id              base-llm-wiki
upstream_project          Local in-house LLM-wiki pattern instantiation (F:\wiki-system family) (DOCUMENTED)
upstream_repository       local: F:\subwikis\base-llm-wiki; architecture evidence committed in-repo (DOCUMENTED)
license                   NOT VERIFIED (no LICENSE at top level)
maintainer_status         Local/in-house (DOCUMENTED)
latest_release            NOT VERIFIED
supported_platforms       Local filesystem / Obsidian (DOCUMENTED)
deployment_model          File-tree wiki: raw/ (immutable source), wiki/ (LLM-maintained), workflows/, templates/, AGENTS.md (DOCUMENTED)
primary_capability        LLM Current-Knowledge Compilation instantiation (Karpathy pattern) (DOCUMENTED)
secondary_capabilities    Template-based page shapes; workflow procedures; Obsidian wikilinks (DOCUMENTED)
persistence_model         Markdown: wiki/index.md, wiki/log.md, wiki/overview.md, concepts/, source-summaries/, query-results/ (DOCUMENTED)
coordination_model        None (agent-driven) (DOCUMENTED)
state_ownership           Local files; wiki layer is LLM-maintained per AGENTS.md (DOCUMENTED)
failure_recovery          Git / local files (INFERRED — NOT VERIFIED)
exportability             Markdown file-tree is portable (INFERRED — NOT VERIFIED)
importability             Ingest into raw/ (DOCUMENTED)
observability             index.md navigation; log.md append-only (DOCUMENTED)
security_boundary         Local-only; bounded project artifact (DOCUMENTED)
model_dependency          LLM-maintained wiki (DOCUMENTED)
removal_cost              Local; removable (INFERRED — NOT VERIFIED)
integration_surface       Local file-tree; AGENTS.md operating rules; templates/ (DOCUMENTED)
known_limitations         Runtime behavior, semantic compilation quality, raw-source coverage, incremental update correctness NOT YET VERIFIED; E3 not executed (DOCUMENTED)
source_citations          research/prior-art/e1-e2/local-base-llm-wiki/ (MANIFEST.txt, HASHES.sha256, BOUNDED_EXCERPTS.md, INSPECTION_COMMANDS.md, SECRET_SCREENING.md, FINDINGS.md)
```

**Outside Review Boundary**: E2 reflects confirmed architecture evidence from the committed artifact bundle. Not confirmed: runtime behavior, semantic compilation quality, completeness of raw-source coverage, incremental update correctness, E3 execution. base-llm-wiki is NOT promoted to E3.

---

## Candidate: Astro-Han/karpathy-llm-wiki

**Evidence Level**: E2 (README + SKILL.md + source structure inspected)
**Conclusion**: `PROMISING`

```text
candidate_id              astrohan-karpathy-llm-wiki
upstream_project          Astro-Han / karpathy-llm-wiki
upstream_repository       github.com/Astro-Han/karpathy-llm-wiki
license                   MIT (DOCUMENTED)
maintainer_status         Active (1.7k stars, 28 commits) (DOCUMENTED)
latest_release            NOT VERIFIED
supported_platforms       Agent Skills-compatible (Claude Code, Cursor, Codex, OpenCode) (DOCUMENTED)
deployment_model          Installable Agent Skills skill (npx add-skill) (DOCUMENTED)
primary_capability        LLM Current-Knowledge Compilation skill: raw/ → wiki/ + index.md + log.md (DOCUMENTED)
secondary_capabilities    Ingest / Query / Lint operations (DOCUMENTED)
persistence_model         Markdown: raw/, wiki/topic/*.md, index.md, log.md (DOCUMENTED)
provenance                Citations to wiki pages in answers (DOCUMENTED)
incremental_ingestion     Ingest updates wiki pages; index on each ingest (DOCUMENTED)
correction_supersession   Contradictions recorded (DOCUMENTED); explicit supersession NOT VERIFIED
contradiction_handling    Lint checks contradictions, broken links, stale cross-refs (DOCUMENTED)
lint_diagnostics          Built-in lint operation (DOCUMENTED)
model_neutrality          Agent-agnostic skill (DOCUMENTED)
database_dependency       None (deliberately no vector DB, no MCP, no search infra) (DOCUMENTED)
mcp_server_dependency     None (DOCUMENTED)
provider_boundary         Skill scope; no hooks/autostart (deliberately excluded) (DOCUMENTED)
export_removal_rebuild    Wiki is plain markdown; regenerable from raw (DOCUMENTED)
```

---

## Candidate: SamurAIGPT/llm-wiki-agent

**Evidence Level**: E2 (README + source structure inspected)
**Conclusion**: `PROMISING`

```text
candidate_id              samur-llm-wiki-agent
upstream_project          SamurAIGPT / llm-wiki-agent
upstream_repository       github.com/SamurAIGPT/llm-wiki-agent
license                   MIT (DOCUMENTED)
maintainer_status         Active (3.3k stars, 102 commits) (DOCUMENTED)
latest_release            NOT VERIFIED
supported_platforms       Claude Code, Codex, OpenCode, Gemini CLI (DOCUMENTED)
deployment_model          Coding agent skill; reads CLAUDE.md/AGENTS.md/GEMINI.md (DOCUMENTED)
primary_capability        LLM Current-Knowledge Compilation: raw/ → interlinked wiki (DOCUMENTED)
secondary_capabilities    Entity/concept/synthesis pages; knowledge graph (graph.json/graph.html); contradiction flags at ingest; lint (DOCUMENTED)
persistence_model         Markdown wiki/ (index.md, log.md, overview.md, sources/, entities/, concepts/, syntheses/) + graph/ (DOCUMENTED)
provenance                Claims traced to sources (DOCUMENTED)
incremental_ingestion     Ingest updates pages; overview revised each ingest (DOCUMENTED)
correction_supersession   Contradiction flags at ingest time (DOCUMENTED); explicit supersession NOT VERIFIED
contradiction_handling    Flagged at ingest; lint reports (DOCUMENTED)
lint_diagnostics          Lint (orphans, broken links, gaps) (DOCUMENTED)
model_neutrality          Multi-agent (Claude/Codex/Gemini/OpenCode) (DOCUMENTED)
database_dependency       None; no server, no DB (DOCUMENTED)
mcp_server_dependency     None for core; graph.html self-contained (DOCUMENTED)
provider_boundary         Agent skill; optional Python conversion tools (markitdown, pdf2md) (DOCUMENTED)
export_removal_rebuild    Markdown + git; regenerable (DOCUMENTED)
```

---

## Candidate: ussumant/llm-wiki-compiler

**Evidence Level**: E2 (README + plugin/source structure inspected)
**Conclusion**: `PROMISING`

```text
candidate_id              ussumant-llm-wiki-compiler
upstream_project          ussumant / llm-wiki-compiler
upstream_repository       github.com/ussumant/llm-wiki-compiler
license                   MIT (DOCUMENTED)
maintainer_status         Active (307 stars, 31 commits) (DOCUMENTED)
latest_release            NOT VERIFIED
supported_platforms       Claude Code, Codex; Node.js 20+ for some features (DOCUMENTED)
deployment_model          Plugin (Claude Code marketplace / Codex plugin) + protocol file (deploy-protocol) (DOCUMENTED)
primary_capability        LLM Current-Knowledge Compilation: source markdown/code → topic wiki (DOCUMENTED)
secondary_capabilities    Incremental /wiki-compile, schema.md, coverage indicators, codebase mode, knowledge graph, lint, query filing (DOCUMENTED)
persistence_model         Markdown wiki/ (INDEX.md, topics/, concepts/, schema.md) + .wiki-compiler.json (DOCUMENTED)
provenance                Coverage indicators + source backlinks (DOCUMENTED)
incremental_ingestion     Incremental compile; only changed topics recompiled (DOCUMENTED)
correction_supersession   Time-decay + newer-source preference; stale entries kept marked (DOCUMENTED)
contradiction_handling    /wiki-lint reports contradictions (DOCUMENTED)
lint_diagnostics          /wiki-lint (stale, orphans, missing cross-refs, low coverage, contradictions, schema drift) (DOCUMENTED)
model_neutrality          Works with Claude/Codex/Cursor/Gemini (DOCUMENTED)
database_dependency       None (zero infra) (DOCUMENTED)
mcp_server_dependency     None (optional qmd MCP for large wikis) (DOCUMENTED)
provider_boundary         Plugin; OPTIONAL /fetch-bookmarks schedule writes a macOS launchd plist (autostart) — must be assessed before any E3 (DOCUMENTED)
export_removal_rebuild    Wiki can be deleted and regenerated; rollback via config (DOCUMENTED)
```

---

## Candidate: atomicstrata/llm-wiki-compiler (llmwiki)

**Evidence Level**: E2 (README + src/ structure + docs inspected)
**Conclusion**: `PROMISING`

```text
candidate_id              atomicstrata-llm-wiki-compiler
upstream_project          atomicstrata / llm-wiki-compiler (llmwiki)
upstream_repository       github.com/atomicstrata/llm-wiki-compiler
license                   MIT (DOCUMENTED)
maintainer_status         Active (1.9k stars, 138 commits; release 1.1.0) (DOCUMENTED)
latest_release            1.1.0 (DOCUMENTED)
supported_platforms       Node.js 24+; npm package (DOCUMENTED)
deployment_model          CLI + SDK (TypeScript) + optional MCP server; local project dir (DOCUMENTED)
primary_capability        LLM Current-Knowledge Compilation compiler (DOCUMENTED)
secondary_capabilities    Configurable Lifecycle Profiles, review gates, OKF export/import, freshness/repair, lint/eval, typed relations, workflows (DOCUMENTED)
persistence_model         sources/ + wiki/ + .llmwiki/ (profile.json, state.json, candidates/, workflows/) + artifacts/ + log.md (DOCUMENTED)
provenance                Citation-traceable output; hash-pinned artifacts (DOCUMENTED)
incremental_ingestion     Incremental compile; unchanged sources skip LLM (DOCUMENTED)
correction_supersession   Fresh/stale/orphaned states; refresh --stale repair (DOCUMENTED)
contradiction_handling    Review policy, contradiction detection, review-first import (DOCUMENTED)
lint_diagnostics          llmwiki lint + eval (quality gates) (DOCUMENTED)
model_neutrality          Provider-portable (Anthropic, OpenAI-compatible, Ollama, Copilot) (DOCUMENTED)
database_dependency       None required (embeddings optional) (DOCUMENTED)
mcp_server_dependency     Optional `llmwiki serve` MCP server; optional `llmwiki view` local viewer (DOCUMENTED)
provider_boundary         Requires provider credentials for LLM steps; fails closed on invalid config (DOCUMENTED)
export_removal_rebuild    OKF/JSON/JSON-LD/GraphML/Marp/llms.txt export; import staged for review (DOCUMENTED)
```

---

## Candidate: KurrentDB (formerly EventStoreDB)

**Evidence Level**: E2 (README + docs + source structure inspected)
**Conclusion**: `PARTIAL FIT` — Deterministic State Projection substrate; NOT LLM Current-Knowledge Compilation

```text
candidate_id              kurrentdb
upstream_project          KurrentDB (Event Store rebrand)
upstream_repository       github.com/kurrent-io/KurrentDB
license                   LICENSE.md present; SPDX NOT VERIFIED (DOCUMENTED)
maintainer_status         Active (5.8k stars, 9.1k commits) (DOCUMENTED)
latest_release            NOT VERIFIED
supported_platforms       Windows, Linux, macOS (via Docker) on .NET Core (DOCUMENTED)
deployment_model          Server (self-managed or Kurrent Cloud); gRPC clients (DOCUMENTED)
primary_capability        Event-native store + integrated streaming engine (Deterministic State Projection substrate) (DOCUMENTED)
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
known_limitations         Deterministic read-model projection; does NOT provide LLM Current-Knowledge Compilation (INFERRED)
source_citations          github.com/kurrent-io/KurrentDB README; docs.kurrent.io (DOCUMENTED)
```

---

## Candidate: Marten

**Role**: Event-store / deterministic read-model projection infrastructure
**Knowledge Provider Fit**: `PARTIAL FIT` — adjacent projection substrate
**Evidence Level**: E2 (README + docs + source structure inspected — evidence retained)

```text
candidate_id              marten
upstream_project          Marten
upstream_repository       github.com/JasperFx/marten
license                   MIT (DOCUMENTED)
maintainer_status         Active (3.4k stars, 7.0k commits) (DOCUMENTED)
latest_release            NOT VERIFIED
supported_platforms       .NET 8+; PostgreSQL 13+ (DOCUMENTED)
deployment_model          Library embedded in .NET application; PostgreSQL backend (DOCUMENTED)
primary_capability        Deterministic State Projection: event store with user-defined projections (DOCUMENTED)
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
known_limitations         Does NOT demonstrate: LLM-maintained Markdown Wiki, source-document ingestion, semantic synthesis, contradiction handling, correction/supersession, affected-page recompilation, agent-maintained Current Knowledge (INFERRED)
source_citations          github.com/JasperFx/marten README (DOCUMENTED)
```

**Decision**: Marten remains an adjacent architectural reference and MAY later serve as a bottom-layer deterministic event projection, but it MUST NOT stand as the first E3 validation of the Knowledge Projection Provider. Moved to Deferred / Architectural Comparison.

---

*End of Knowledge Projection survey.*
