# Astro-Han E3 — Output Evidence Index

> Purpose: Map each E3 claim to its reviewable artifact. Every artifact below lives in this probe directory.
> Method: **Evidence Reproduction Run** — the original run's isolated worktree was removed at cleanup before its outputs were captured into the remote package. The same upstream commit, same fixture, and same isolation rules were re-executed, and the six output files were captured BEFORE cleanup (see `REPRODUCTION.md`).

## Claim → Artifact mapping

| Claim | Required artifact | Result |
|---|---|---|
| Two sources ingested | `CAPTURED_WORKTREE/raw/atlas/2026-08-03-project-atlas-versioned-state.md` (hash `E57DE1EB...D65D33`), `CAPTURED_WORKTREE/raw/atlas/2026-08-03-atlas-database-superseded.md` (hash `81FDEDFB...7963A`) | `CONFIRMED` |
| Original text preserved | Fixture vs raw body: fixture hashes unchanged (`source-a` `37E09488...71F3A`, `source-b` `B4E5530B...E8B05`); raw bodies contain the full fixture sentences verbatim; metadata header does not alter meaning | `CONFIRMED` |
| Current vs superseded claims distinguishable | `CAPTURED_WORKTREE/wiki/atlas/project-atlas.md` — `Status: Outdated` block on the database claim only | `CONFIRMED` |
| File-first canonical claim | `CAPTURED_WORKTREE/wiki/atlas/canonical-state.md` — File-First Canonical State section; not marked outdated | `CONFIRMED` |
| Internal index exists | `CAPTURED_WORKTREE/wiki/index.md` — both articles listed with resolvable links | `CONFIRMED` |
| Append-only maintenance trace | `CAPTURED_WORKTREE/wiki/log.md` — single `# Wiki Log` heading + two ingest entries dated 2026-08-03 | `CONFIRMED` |
| Lint covers these actual files | `RAW_OUTPUT/reproduction_lint_stdout.txt` (exit 0; 0 fidelity suspects / 0 evidence errors / 0 unreferenced raws) run against the captured worktree; captured-output hashes match `FILE_HASHES_AFTER.sha256` | `CONFIRMED` |

## Semantic content checks (on captured files)

| Check | Result |
|---|---|
| raw files contain the full original fixture text | `CONFIRMED` (fixture sentences present verbatim in both raw bodies) |
| metadata does not change meaning | `CONFIRMED` (header adds Source/Collected/Published only) |
| `Status: Outdated` applies only to the superseded database claim | `CONFIRMED` (block under "Superseded Database Design"; "Current State Model" has none) |
| current file-first claim not wrongly marked outdated | `CONFIRMED` (no status block on the versioned-files claim) |
| every wiki claim traces to a real raw file | `CONFIRMED` (Raw fields link to both raw files; lint 0 unreferenced) |
| index links resolve | `CONFIRMED` (both article targets exist) |
| log only appends this operation | `CONFIRMED` (two ingest entries, 2026-08-03 only) |
| no facts absent from the fixture | `CONFIRMED` (only dates `2026-07-01` [fixture content] and `2026-08-03` [probe metadata] appear) |
| two-source contradiction not wrongly fused away | `CONFIRMED` (source-b supersession recorded explicitly as `Status: Outdated`, not silently merged) |

## Hash provenance

- `FILE_HASHES_AFTER.sha256` captures the original run's worktree hashes (14 files).
- All six captured outputs reproduce those hashes exactly (`MATCH=True` for each; see `REPRODUCTION.md`).

---

*End of output evidence index.*
