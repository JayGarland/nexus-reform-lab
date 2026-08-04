# base-llm-wiki E3 — Output Evidence Index

> Purpose: Map each E3 claim to its reviewable artifact. All artifacts live in this probe directory; actual outputs are in `CAPTURED_WORKTREE/`.

## Claim → Artifact mapping

| Claim | Required artifact | Result |
|---|---|---|
| Two fixture sources ingested | `CAPTURED_WORKTREE/raw/source-a.md` (hash `37E09488...71F3A`), `CAPTURED_WORKTREE/raw/source-b.md` (hash `B4E5530B...E8B05`) | `CONFIRMED` |
| Raw preserved | `PROBE_HASHES_BEFORE/AFTER.sha256`: raw/source-a.md and raw/source-b.md `MATCH=True` (unmodified) | `CONFIRMED` |
| Current vs superseded distinction | `CAPTURED_WORKTREE/wiki/source-summaries/Project Atlas - Versioned State.md` (file-first, no status block) + `Project Atlas - Database Supersession.md` (explicit supersession) | `CONFIRMED` |
| File-first canonical claim | `CAPTURED_WORKTREE/wiki/source-summaries/Project Atlas - Versioned State.md` | `CONFIRMED` |
| Internal index exists | `CAPTURED_WORKTREE/wiki/index.md` — Source Summaries section listing both pages | `CONFIRMED` |
| Append-only maintenance trace | `CAPTURED_WORKTREE/wiki/log.md` — two ingest entries appended after existing history | `CONFIRMED` |
| Provenance | source-summary `source:` frontmatter points to `raw/source-a.md` / `raw/source-b.md` | `CONFIRMED` |
| Contradiction / supersession record | `Project Atlas - Database Supersession.md` Contradictions / Tensions section | `CONFIRMED` |

## Semantic checks (12 items)

| # | Check | Result |
|---|---|---|
| 1 | Two fixture sources fully preserved in raw | `CONFIRMED` (full sentences present verbatim) |
| 2 | Raw modified | `CONFIRMED` NOT modified (hashes MATCH) |
| 3 | File-first current claim correct | `CONFIRMED` (stated as current; no `Status: Outdated` block on it; the word "superseded" appears only in a cross-source note) |
| 4 | Database-as-canonical clearly superseded | `CONFIRMED` ("superseded on 2026-07-01", "no longer canonical") |
| 5 | `2026-07-01` preserved | `CONFIRMED` |
| 6 | Fixture-external facts introduced | `CONFIRMED` none (only dates `2026-07-01` [fixture] and `2026-08-04` [probe ingest metadata]) |
| 7 | Fixture facts omitted | `CONFIRMED` none (all key claims present in summaries) |
| 8 | Contradiction / supersession fused away | `CONFIRMED` not fused (explicit Contradictions / Tensions) |
| 9 | Wiki claims trace to source | `CONFIRMED` (`source:` frontmatter) |
| 10 | Index / links resolvable | `CONFIRMED` (both pages exist; index lists both) |
| 11 | Log append-only | `CONFIRMED` (new entries appended after existing history) |
| 12 | Original project zero modification | `CONFIRMED` (0 changed files) |

## Hash provenance

- `SOURCE_HASHES_BEFORE/AFTER.sha256` — original project unchanged (0 diffs).
- `PROBE_HASHES_BEFORE/AFTER.sha256` — probe copy run boundary; fixture immutable.
- `CAPTURED_WORKTREE/` — actual outputs captured before cleanup.

---

*End of output evidence index.*
