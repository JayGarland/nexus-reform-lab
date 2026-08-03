# Findings — Astro-Han E3 Probe

Each finding maps to the captured evidence files.

| # | Finding | Evidence reference |
|---|---|---|
| 1 | Upstream skill obtained at a clearly identified commit. | UPSTREAM_IDENTITY.md; COMMANDS.md §2 |
| 2 | Skill loaded as local files (SKILL.md + references/ + scripts/) in the isolated work tree; NO global Skills directory write occurred. | COMMANDS.md §4; ENVIRONMENT.md |
| 3 | Wiki initialized per SKILL.md (raw/, wiki/, wiki/index.md, wiki/log.md). | COMMANDS.md §4; BEFORE_STATE.txt |
| 4 | Two fixture sources ingested into `raw/atlas/` with raw-template metadata headers; original fixture text preserved. | COMMANDS.md §5; FILE_HASHES_BEFORE.sha256 vs FILE_HASHES_AFTER.sha256 |
| 5 | Two Markdown wiki articles compiled; the database-as-canonical-state claim carries a `Status: Outdated` block distinguishing current vs superseded claims. | wiki/atlas/project-atlas.md, wiki/atlas/canonical-state.md (in AFTER_STATE.txt tree) |
| 6 | Index and log updated per skill templates; internal wikilinks present. | wiki/index.md, wiki/log.md |
| 7 | Upstream mechanical lint (`scripts/check_evidence.py`) exit 0: 0 fidelity suspects, 0 evidence errors, 0 unreferenced raw files — grounding invariant holds for the compiled articles. | STDOUT.txt; RAW_OUTPUT/lint_stdout.txt |
| 8 | Raw/fixture immutability verified: source-a.md and source-b.md hashes unchanged before/after (MATCH=True). | FILE_HASHES_BEFORE.sha256; FILE_HASHES_AFTER.sha256 |
| 9 | No background processes started; lint is a foreground process that exited. | PROCESS_LIST_BEFORE.txt; PROCESS_LIST_AFTER.txt |
| 10 | No credentials were required or used. | ENVIRONMENT.md |

## Stop-condition assessment

| Stop condition | Status |
|---|---|
| Requires global config / global Skills write | Not hit — loaded as local files |
| Requires model credentials unavailable in isolation | Not hit — none required |
| Starts undeclared background process | Not hit |
| Modifies files outside isolated directory | Not hit |
| Modifies raw fixture | Not hit — hashes match |
| Cannot identify upstream commit | Not hit — `eafcc77...` |
| Install/run path inconsistent with official docs | Not hit — followed SKILL.md |
| Cannot clean up | Not hit — see CLEANUP.md |

## Scope caveat

The compile/ingest steps are agent-driven by the skill's design (SKILL.md is the schema); the mechanical verification step is the upstream Python script. This is the skill's native operation model. E3 confirms load + minimal native operation only; no Nexus fit, provenance sufficiency, or replaceability claim is made.
