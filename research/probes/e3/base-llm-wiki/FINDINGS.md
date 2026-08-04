# Findings — base-llm-wiki E3

| # | Finding | Evidence reference |
|---|---|---|
| 1 | Original project is 84 files; byte-identical copy made to isolated probe dir (all 84 hashes match). | SOURCE_HASHES_BEFORE.sha256; PROBE_HASHES_BEFORE.sha256 (mismatches=0) |
| 2 | Fixed Project Atlas fixture placed in the copy's `raw/`; fixture hashes identical to the Astro-Han E3 fixture (`source-a` `37E09488...71F3A`, `source-b` `B4E5530B...E8B05`). | FIXTURE/; CAPTURED_WORKTREE/raw/ |
| 3 | Native ingest executed per the copy's `AGENTS.md` + `workflows/ingest-source.md` + `templates/source-summary.md`; two source-summary pages created; index and log updated. | CAPTURED_WORKTREE/wiki/; STDOUT.txt |
| 4 | Raw fixture files unmodified during the operation (`MATCH=True` for `raw/source-a.md` and `raw/source-b.md`). | PROBE_HASHES_BEFORE.sha256 vs PROBE_HASHES_AFTER.sha256 |
| 5 | Original project ZERO MODIFICATION (SOURCE_HASHES_BEFORE vs AFTER: 0 changed files). | SOURCE_HASHES_BEFORE.sha256; SOURCE_HASHES_AFTER.sha256 |
| 6 | Run outputs are exactly 2 new source summaries + index + log (raw untouched). | PROBE_HASHES_AFTER.sha256 diff |
| 7 | No background processes; no global config writes; no credentials; no network. | PROCESS_LIST_BEFORE/AFTER; MODEL_EXECUTION_CONTEXT.md; ENVIRONMENT.md |
| 8 | Cleanup verified: probe dir removed, parent empty, captured outputs intact, original intact. | CLEANUP.md |

## Stop-condition assessment

| Stop condition | Status |
|---|---|
| Requires modifying original base-llm-wiki | Not hit — original zero-modification |
| Requires reading Nexus secrets | Not hit |
| Writes user-global Agent configuration | Not hit |
| Starts undeclared background service | Not hit |
| Modifies files outside isolated directory | Not hit |
| Cannot capture actual outputs | Not hit — CAPTURED_WORKTREE captured before cleanup |
| Cannot verify cleanup | Not hit |
| Workflow contradicts local artifacts | Not hit |
| Requires temporary project modification | Not hit — native protocol only |

## Scope caveat

This is a native-protocol E3 of the local project. No Nexus fit, no superiority comparison, no production provenance claim, no selection.
