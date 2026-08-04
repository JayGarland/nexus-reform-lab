# Local base-llm-wiki — Bounded Excerpts

> Exact local path: `F:\subwikis\base-llm-wiki`
> Timestamp: 2026-08-03T23:30:32+02:00
> These excerpts are bounded to architecture-understanding only. Hashes are in `HASHES.sha256`.

---

## 1. AGENTS.md (full; 1,739 bytes; hash `AA4173A5...2251`)

```text
# LLM-wiki Local Runtime Instructions

## Project Boundary
This folder is a bounded project artifact for instantiating the LLM-wiki pattern locally.
It is not accepted semantic state for the broader vault. Do not mutate root vault notes,
workflow registries, protocol files, `.obsidian/`, or parent project governance from this
folder unless the user explicitly authorizes that separate operation.

## Layer Model
- `raw/` is the immutable source layer. Read source files, but do not edit them during wiki maintenance.
- `wiki/` is the LLM-maintained wiki layer. Create and update Markdown pages here when ingesting sources,
  answering durable queries, or linting the wiki.
- `workflows/` documents repeatable operating procedures for ingest, query, and lint.
- `templates/` contains reusable page shapes for consistent wiki maintenance.

## Maintenance Rules
- Start navigation from `wiki/index.md`.
- Append every ingest, durable query filing, and lint pass to `wiki/log.md`.
- Use Obsidian wikilinks for internal concepts, for example `[[Persistent Wiki]]`.
- Record contradictions explicitly instead of smoothing them away.
- Preserve source provenance. Claims derived from raw sources should name the source.
- File query outputs back into the wiki only when they add reusable synthesis.
- Keep pages concise and revisable. Prefer focused pages over broad monoliths.

## Initial Source
The initial source is `raw/LLM Wiki - from karpathy.md`, copied from the parent project source branch.

## Current Local Status
- Initial ingest completed for the Karpathy LLM-wiki source.
- No external tooling is required for v1.
- No qmd, MCP, Dataview, Obsidian plugin, or automation dependency is active.
```

## 2. templates/concept-page.md (full; hash `0CF6DF17...5077D`)

```text
# Concept Page Template
---
type: concept
status: draft
source:
---
# Concept Name
## Definition
## Role
## Source Basis
## Related
## Open Questions
```

## 3. templates/source-summary.md (full; hash `3AD27CE7...8327B`)

```text
# Source Summary Template
---
type: source-summary
status: draft
source:
---
# Source Title
## Source Metadata  (Source path / Author-origin / Date / Ingest date)
## Core Claims
## Important Concepts
## Contradictions / Tensions
## Wiki Updates Made
## Open Questions
```

## 4. templates/query-result.md (full; hash `ADF03A77...A1A8EA`)

```text
# Query Result Template
---
type: query-result
status: draft
date:
---
# Query Result Title
## Question
## Answer
## Evidence
## Assumptions
## Reusable Takeaways
## Filed Updates
```

## 5. templates/lint-report.md (full; hash `CDF1DFFA...DB8DAC`)

```text
# Lint Report Template
---
type: lint-report
status: draft
date:
---
# Lint Report
## Scope
## Findings
## Recommended Fixes
## Fixes Applied
## Deferred Issues
```

## 6. workflows/ingest-source.md (full; hash `D89D0B09...D62115`)

```text
# Ingest Source Workflow
1. Read the source file.
2. Extract key claims, concepts, entities, tensions, and useful quotes or references.
3. Decide whether the source needs a source summary page, concept updates, or both.
4. Update relevant pages in `wiki/`.
5. Add missing internal wikilinks.
6. Record contradictions explicitly.
7. Update `wiki/index.md`.
8. Append a parseable entry to `wiki/log.md`.
Output: updated wiki pages, updated index, log entry, short report.
Guardrails: Do not edit `raw/`. Do not mutate parent-vault governance. Do not batch unrelated sources unless requested.
```

## 7. workflows/query-wiki.md (full; hash `6F0A339E...92F321B`)

```text
# Query Wiki Workflow
1. Read `wiki/index.md`.
2. Select likely relevant wiki pages.
3. Read those pages and any required raw source references.
4. Answer with citations to wiki pages or source files.
5. Decide whether the result is reusable; if so, file it, update the index, append to the log.
Guardrails: Do not invent source support. Separate facts, assumptions, inferences, recommendations.
Do not treat query output as parent-vault accepted state.
```

## 8. workflows/lint-wiki.md (full; hash `1C47FC35...6A00A0`)

```text
# Lint Wiki Workflow
Checks: broken/missing wikilinks; orphan pages; repeated concepts lacking pages;
contradictions between pages; stale claims superseded by newer sources; claims without provenance;
index entries not matching page contents.
Output: lint report via templates/lint-report.md; optional bounded fixes if authorized; log entry.
Guardrails: prefer compact repair list; do not create a second state authority; do not update raw sources.
```

## 9. wiki/index.md (head excerpt; hash `FD6186EB...82256`)

```text
---
type: index
status: active
---
# LLM-wiki Index
Content-oriented catalog. Read this file first, then drill into relevant pages.
Core Pages: [[Overview]], [[Log]], [[用户手册]].
Concepts: [[Raw Sources]], [[Persistent Wiki]], [[Schema]], [[Ingest]], [[Query]], [[Lint]],
[[Index and Log]], [[Obsidian as IDE]], [[Git-backed Markdown]], and domain concepts
(Sampling Strategy, Randomness Source Map, Randomness-to-Learning Conversion, etc.).
```

## 10. wiki/log.md (head excerpt; hash `58E2A449...A2F1F`)

```text
---
type: log
status: append-only
---
# LLM-wiki Log
Append-only record of wiki events. Use parseable headings.
## [2026-06-04] ingest | LLM Wiki - from karpathy
- Source: `raw/LLM Wiki - from karpathy.md`
- Result: Created initial overview, concept pages, index, local schema, workflows, templates.
## [2026-06-04] ingest+query | LLM-Wiki x Emergent Design root merge
- Added source summary, filed [[Supervised LLM-Wiki Design-State Intake Pattern]], concept pages.
## [2026-06-05] docs | 中文用户手册
```

## 11. wiki/overview.md (full; hash `AB8C9024...B889E6`)

```text
---
type: overview
status: active
source: raw/LLM Wiki - from karpathy.md
---
LLM-wiki is a pattern for a personal knowledge base where the LLM incrementally maintains a
persistent Markdown wiki instead of re-deriving answers from raw documents every time.
Architecture: three layers — Raw Sources (immutable), Persistent Wiki (generated Markdown),
Schema (local operating instructions). A Permission Layer acts as a governance gate between
evidence intake and system mutation.
Operations: Ingest, Query, Lint. Navigation: wiki/index.md (catalog) + wiki/log.md (timeline).
Local Boundary: self-contained scaffold demonstrating the LLM-wiki pattern without changing the
parent vault's canonical governance, registry, protocol, or accepted semantic state.
```

---

*End of bounded excerpts.*
