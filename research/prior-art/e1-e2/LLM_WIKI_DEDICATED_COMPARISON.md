# LLM Wiki / Current Knowledge Provider — Dedicated Comparison (Foundation 0.9)

> **Status**: UNDER OUTSIDE REVIEW (Foundation 0.9)
> **Scope**: E1/E2 evidence comparison of the Karpathy LLM Wiki pattern and five candidates. No candidate installed, run, selected, or executed.
> **Comparison objects**: Karpathy original LLM Wiki pattern (canonical reference, NOT an executable candidate), Astro-Han/karpathy-llm-wiki, SamurAIGPT/llm-wiki-agent, ussumant/llm-wiki-compiler, atomicstrata/llm-wiki-compiler, local base-llm-wiki (E1 / LOCAL INSPECTION CLAIMED-NOT-EVIDENCED; bounded evidence artifact captured this round).

---

## 1. Unified Dimension Matrix

Legend: Y = present/documented; N = absent/deliberately excluded; PART = partial; NV = not verified in this pass; n/a = not applicable.

| Dimension | Karpathy pattern | Astro-Han | SamurAIGPT | ussumant | atomicstrata | base-llm-wiki (local) |
|---|---|---|---|---|---|---|
| Raw-source immutability | Y | Y (raw/) | Y (raw/) | Y (sources read-only) | Y (sources/ never modified) | Y (raw/ immutable) |
| Wiki output format | Markdown | Markdown | Markdown | Markdown | Markdown + typed pages | Markdown |
| Markdown / file-first compatibility | Y | Y | Y | Y | Y | Y |
| Incremental ingestion | Y | Y | Y | Y (incremental compile) | Y (incremental; unchanged skip LLM) | Y (workflow) |
| Affected-page detection | Y (updates pages) | Y | Y | Y (only changed topics) | Y (ownership/state) | Y (workflow) |
| Correction / supersession | Y (superseded claims) | PART (contradictions recorded) | Y (contradiction flags) | Y (time-decay, newer-source preference) | Y (fresh/stale/orphaned; refresh --stale) | Y (lint stale/superseded) |
| Contradiction handling | Y | Y (lint) | Y (ingest-time flags) | Y (lint) | Y (review gates, contradiction detection) | Y (explicit contradictions) |
| Claim-level provenance | PART (citations) | PART (page citations) | Y (source traces) | Y (coverage + source backlinks) | Y (line-range citations, hash-pinned) | Y (claims name sources) |
| Source citation | Y | Y | Y | Y (backlinks) | Y (citation coverage eval) | Y |
| Lint / diagnostics | Y | Y | Y | Y | Y (lint + eval) | Y |
| Rebuildability | Y (regenerate) | Y (plain md) | Y (markdown+git) | Y (delete+regenerate) | Y (compile/refresh) | Y (regenerable) |
| Model neutrality | Y | Y | Y | Y | Y (provider-portable) | Y (model-agnostic) |
| Agent portability | Y | Y (Agent Skills) | Y (Claude/Codex/Gemini/OpenCode) | Y (Claude/Codex/Cursor/Gemini) | Y (CLI/SDK/MCP) | Y (AGENTS.md) |
| Database dependency | N | N | N (graph.json derived) | N | N (optional embeddings) | N |
| MCP / server dependency | N (optional qmd) | N | N (graph.html self-contained) | N (optional qmd) | PART (optional `llmwiki serve` MCP; optional viewer) | N |
| Autostart / scheduled routine surface | N | N (deliberately excluded) | N (agent-driven) | PART (optional macOS launchd via /fetch-bookmarks schedule) | N (optional review policy; no autostart found) | N |
| Export / removal path | Y (markdown/git) | Y | Y | Y (EXPORTING.md, rollback) | Y (OKF/JSON/JSON-LD/GraphML/Marp/llms.txt) | Y (markdown) |
| Provider-boundary coupling | Low | Low | Low-Med (multi-format Python tools) | Med (plugin + optional launchd) | High (MCP server, SDK, profiles, template ecosystem, credentials) | Low |

## 2. Core vs Optional Extensions vs Cross-Provider Coupling

```text
Core Current-Knowledge capability:
  raw-source intake → semantic, interlinked, maintainable Markdown wiki
  + incremental ingestion + contradiction handling + provenance + lint + rebuild

Optional UI / MCP / scheduler / graph / search extensions (NOT stable-kernel):
  knowledge-graph visualizations (SamurAIGPT graph.html; ussumant /wiki-visualize)
  MCP servers (atomicstrata llmwiki serve; optional qmd)
  scheduled/nightly routines (ussumant /fetch-bookmarks schedule → launchd; atomicstrata review policy)
  search tooling (qmd; embeddings)
  Inbox/Outbox, Kanban, notification surfaces (none in these candidates as kernel requirements)

Cross-Provider coupling:
  Any scheduler, MCP server, database, or UI of a wiki product MUST NOT become Nexus Canonical Truth.
```

> **Boundary rule (recorded for this comparison):**
> Async intake, scheduled maintenance, nightly routines, Kanban surfaces and Inbox/Outbox integration are modular extensions across Provider boundaries, not part of the immutable Knowledge Provider core. They may only attach through stable interfaces and must never make a Wiki product's scheduler, MCP, database, or UI the Nexus Canonical Truth.

## 3. Answers to the Mandatory Questions

1. **Most Artifact-first**: `base-llm-wiki` (local) and `Astro-Han/karpathy-llm-wiki` — pure raw/ → wiki/ Markdown with index + log, no server/DB/autostart. Astro-Han is the leanest public implementation. (base-llm-wiki is E1 / CLAIMED-NOT-EVIDENCED pending artifact review.)
2. **Most model-neutral**: `base-llm-wiki` (model-agnostic AGENTS.md) and `Astro-Han` (agent-agnostic skill). atomicstrata is provider-portable but still LLM-dependent by design.
3. **Strongest provenance**: `atomicstrata/llm-wiki-compiler` — claim-level citations with source line ranges, hash-pinned artifacts, review gates, OKF provenance, citation-coverage eval.
4. **Heaviest coupling**: `atomicstrata/llm-wiki-compiler` — MCP server + SDK + Configurable Lifecycle Profiles + template/tap ecosystem + provider credentials + eval/lint gates. `ussumant` second (plugin + optional launchd autostart + Node dependency).
5. **Easiest to remove/replace**: `Astro-Han/karpathy-llm-wiki` — an installable skill of Markdown + SKILL.md; removal is deleting a directory; no service, DB, or registry dependency.
6. **Features worth borrowing, not whole adoption**: graph visualization (SamurAIGPT graph.html, ussumant /wiki-visualize); coverage indicators + time-decay + freshness (ussumant); CLP-style review gates + OKF exchange + hash-pinned artifacts (atomicstrata); schema/AGENTS.md discipline + explicit-contradiction rule (base-llm-wiki). Borrow as optional extensions via stable interfaces only.
7. **High-capability reference only (for now)**: `atomicstrata/llm-wiki-compiler` — richest feature set but heaviest; best used as a reference for provenance/gates design rather than a thin first E3 probe.
8. **Best fit for the first Knowledge E3 Probe**: `PROPOSED FOR E3 — Astro-Han/karpathy-llm-wiki` (smallest, file-first, no server/DB/autostart/credentials for install), with `local base-llm-wiki` as a local control candidate (subject to outside review of the captured evidence artifact). This is a PROPOSAL ONLY; no E3 is authorized or executed.

## 4. E3 Recommendation Boundary

- Maximum one public implementation is PROPOSED FOR E3: `Astro-Han/karpathy-llm-wiki`.
- Local control candidate: `base-llm-wiki` — enters E3 consideration only after outside review of `research/prior-art/e1-e2/local-base-llm-wiki/`.
- If evidence is insufficient, the Knowledge slot remains empty.
- Forbidden labels not used: `ADOPT`, `KEEP`, `SELECTED`, `BOUND`, `IMPLEMENTED`.

## 5. Conclusion Labels

| Candidate | Label |
|---|---|
| Karpathy pattern | `PROMISING` (canonical reference) |
| Astro-Han/karpathy-llm-wiki | `PROMISING` |
| SamurAIGPT/llm-wiki-agent | `PROMISING` |
| ussumant/llm-wiki-compiler | `PROMISING` |
| atomicstrata/llm-wiki-compiler | `PROMISING` (heavy; high-capability reference) |
| base-llm-wiki (local) | `PROMISING` (preliminary; E1 / CLAIMED-NOT-EVIDENCED) |

---

*End of dedicated comparison.*
