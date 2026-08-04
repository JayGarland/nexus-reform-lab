# Local base-llm-wiki — Findings

> Timestamp: 2026-08-03T23:30:32+02:00
> Each finding maps to `MANIFEST.txt`, `HASHES.sha256`, or `BOUNDED_EXCERPTS.md`.

## Findings

| # | Finding | Evidence reference |
|---|---|---|
| 1 | Local project exists at the exact path with a bounded LLM-wiki pattern instantiation: layers `raw/` (immutable), `wiki/` (LLM-maintained), `workflows/`, `templates/`, plus `AGENTS.md`. | MANIFEST.txt (directories present); BOUNDED_EXCERPTS.md §1 |
| 2 | `AGENTS.md` defines the boundary and layer model: raw immutable, wiki LLM-maintained, workflows/templates for ingest/query/lint. Explicit "bounded project artifact ... not accepted semantic state for the broader vault." | HASHES.sha256 `AA4173A5...`; BOUNDED_EXCERPTS.md §1 |
| 3 | Four page templates exist (concept, source-summary, query-result, lint-report), each with YAML frontmatter and provenance-oriented sections (Source, Core Claims, Contradictions, Evidence). | MANIFEST.txt `.\templates\*`; BOUNDED_EXCERPTS.md §2–§5 |
| 4 | Three workflows exist: ingest-source, query-wiki, lint-wiki — each with steps, output, guardrails. Lint explicitly checks contradictions, stale/superseded claims, provenance-less claims, orphan pages. | MANIFEST.txt `.\workflows\*`; BOUNDED_EXCERPTS.md §6–§8 |
| 5 | Wiki structure: `index.md` (catalog), `log.md` (append-only), `overview.md`, `concepts/` (13), `query-results/` (14), `source-summaries/` (23), plus a Chinese user manual. | MANIFEST.txt file counts; BOUNDED_EXCERPTS.md §9–§11 |
| 6 | `log.md` uses parseable headings and records ingest/query/lint events (append-only timeline). | BOUNDED_EXCERPTS.md §10 |
| 7 | No external tooling for v1: no qmd, MCP, Dataview, Obsidian plugin, or automation dependency (per AGENTS.md). No autostart/scheduler surface found in the captured files. | BOUNDED_EXCERPTS.md §1 |
| 8 | Model neutrality: `AGENTS.md` and workflows are agent-agnostic instructions (no model-specific binding observed in captured excerpts). | BOUNDED_EXCERPTS.md §1, §6–§8 |
| 9 | Markdown/file-first: all captured artifacts are Markdown with Obsidian wikilinks; no database or index binary observed. | MANIFEST.txt; BOUNDED_EXCERPTS.md |
| 10 | Rebuildability/removal: wiki is plain Markdown derivable from `raw/` + workflows/templates; removal is local directory deletion (no service or registry dependency observed). | MANIFEST.txt; BOUNDED_EXCERPTS.md §1 |
| 11 | Raw source contents were NOT captured (bounded scope); `raw/` includes archived chat/conversation materials (e.g., `ChatGPT chat archive-king cobra feature review.md`, 150,654 bytes) requiring content-level screening before any E2 promotion. | MANIFEST.txt `.\raw\*`; SECRET_SCREENING.md |
| 12 | No secrets/tokens/privacy data observed in captured excerpts. | SECRET_SCREENING.md |

## Assessment

- `base-llm-wiki` is a **file-first, agent-agnostic LLM-wiki pattern instantiation** with provenance, contradiction, lint, and index/log mechanics (evidence captured above).
- Evidence Level remains **E1** (local project identity + claimed structure). E2 promotion requires outside review of this artifact bundle.
- It is a strong **local control candidate** for the Knowledge-slot E3 comparison; not yet an E3 candidate on its own.

---

*End of findings.*
