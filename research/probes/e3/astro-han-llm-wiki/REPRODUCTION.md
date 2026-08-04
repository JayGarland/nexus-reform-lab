# Evidence Reproduction Run — Astro-Han E3

> The original Foundation 1.0 run's isolated worktree was deleted at cleanup before its generated files were captured into the remote evidence package. The remote package therefore contained only state/hash/process/command/lint evidence and an `E3 PASSED` claim, which is not independently reviewable for output content.
> This is an **Evidence Reproduction Run**: the same Astro-Han E3 was re-executed under the same upstream commit, same fixture, and same isolation rules, and the six output files were captured BEFORE cleanup. It is clearly NOT the original run's execution artifacts.

## Reproduction record

| Field | Value |
|---|---|
| reproduction_type | `Evidence Reproduction Run` |
| reproduction_timestamp | 2026-08-04T07:02:30+02:00 (setup) … 07:03:05+02:00 (lint) |
| upstream_commit | `eafcc77001e496cc43499e4923b663aec722c813` (2026-07-24) — identical to original |
| upstream_license | MIT |
| isolated_directory | `F:\nexus-probes\knowledge\astro-han-e3\` (recreated; removed after capture) |
| exact_commands | identical to `COMMANDS.md` (clone pinned commit → fixture → load skill as local files → init wiki → ingest → compile → index → log → lint) |
| fixture_hashes | `source-a` `37E0948812DE81DBD9EC037E06C4520E6EAED9973E6F067F12097EE3A1A71F3A`; `source-b` `B4E5530BB614ABAC3A8E13ACE7E4BE43736C27D3466F5BCDAC16F93DE3BE8B05` — identical to original |
| captured_output_hashes | all 6 output files `MATCH=True` against `FILE_HASHES_AFTER.sha256` (byte-identical) |
| lint_output | `RAW_OUTPUT/reproduction_lint_stdout.txt`; exit 0; 0 fidelity suspects / 0 evidence errors / 0 unreferenced raws; stderr empty |
| difference_from_original | Output bytes identical (hashes match). Difference is provenance only: this run is a re-execution with captured outputs, not the original run's artifacts. |
| global_skills_write | none |
| official_nexus_modification | none |
| other_candidates | none executed |

## Captured outputs (before cleanup)

```
CAPTURED_WORKTREE/raw/atlas/2026-08-03-project-atlas-versioned-state.md
CAPTURED_WORKTREE/raw/atlas/2026-08-03-atlas-database-superseded.md
CAPTURED_WORKTREE/wiki/atlas/project-atlas.md
CAPTURED_WORKTREE/wiki/atlas/canonical-state.md
CAPTURED_WORKTREE/wiki/index.md
CAPTURED_WORKTREE/wiki/log.md
```

## Post-cleanup verification

- Isolated directory removed: `exists=False`; parent left empty.
- Captured outputs remain in the repository evidence package (6 files intact).

---

*End of reproduction record.*
