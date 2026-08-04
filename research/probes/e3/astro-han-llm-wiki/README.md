# E3 Probe — Astro-Han/karpathy-llm-wiki

> Probe: Knowledge Projection Provider — first isolated upstream-native E3 Probe (Foundation 1.0)
> Status: UNDER OUTSIDE REVIEW
> Isolated directory: `F:\nexus-probes\knowledge\astro-han-e3\`

## E3 Goal (only)

Confirm the upstream Agent Skill can be obtained, installed/loaded in an isolated directory, and complete one minimal raw-source → Markdown wiki operation per its native instructions.

E3 does NOT prove: Nexus fit; superiority over base-llm-wiki; provenance sufficiency; replaceability of the existing Knowledge Provider; incremental-update reliability; semantic-compilation completeness; ADOPT/KEEP/SELECT/BIND.

## What was executed (summary)

1. Cloned `github.com/Astro-Han/karpathy-llm-wiki` at upstream commit `eafcc77001e496cc43499e4923b663aec722c813` (MIT license) into the isolated directory.
2. Loaded the skill as local files (SKILL.md + references/ + scripts/) into the probe work tree. No global Skills directory write.
3. Per SKILL.md: initialized the wiki (raw/, wiki/, wiki/index.md, wiki/log.md); ingested two fixture sources into `raw/atlas/`; compiled two wiki articles (`project-atlas.md`, `canonical-state.md`) with a current claim and a `Status: Outdated` supersession block; updated `wiki/index.md`; appended to `wiki/log.md`.
4. Ran the upstream mechanical lint: `python scripts/check_evidence.py <work>` → exit 0; 0 fidelity suspects, 0 evidence errors, 0 unreferenced raw files.

## Expected observation items

- Markdown wiki page: yes (2 articles).
- Both sources recorded: yes (Sources/Raw fields + raw/ files).
- Current vs superseded claims distinguishable: yes (Status: Outdated block on the database claim).
- Internal links / index: yes (See Also cross-links; wiki/index.md catalog).
- Raw source unmodified: yes (fixture hashes unchanged before/after).

## Evidence files

```
UPSTREAM_IDENTITY.md    ENVIRONMENT.md        COMMANDS.md
FIXTURE/                RAW_OUTPUT/
BEFORE_STATE.txt        AFTER_STATE.txt
PROCESS_LIST_BEFORE.txt PROCESS_LIST_AFTER.txt
FILE_HASHES_BEFORE.sha256  FILE_HASHES_AFTER.sha256
STDOUT.txt              STDERR.txt
CLEANUP.md              FINDINGS.md           E3_VERDICT.md
CAPTURED_WORKTREE/      OUTPUT_EVIDENCE.md    REPRODUCTION.md
```

## Output-evidence completion

- The original run's isolated worktree was removed at cleanup before its outputs were captured into the remote package; the remote package therefore lacked the generated `raw/` and `wiki/` file contents.
- An **Evidence Reproduction Run** (`REPRODUCTION.md`) re-executed the same Astro-Han E3 (same commit, same fixture, same isolation) and captured the six output files into `CAPTURED_WORKTREE/` before cleanup. All captured hashes match the original `FILE_HASHES_AFTER.sha256` (byte-identical).
- `OUTPUT_EVIDENCE.md` maps each claim to its artifact. Verdict is currently `E3 PARTIAL` (see `E3_VERDICT.md`) until the outside reviewer confirms the captured outputs.

Chat summaries are not evidence; the captured artifacts above are the evidence.
