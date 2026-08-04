# E3 Probe — local base-llm-wiki

> Probe: Knowledge Projection Provider — isolated native E3 control comparison (per `research/plans/BASE_LLM_WIKI_E3_COMPARISON_PLAN.md`)
> Status: SUBMITTED FOR OUTSIDE REVIEW
> Isolated directory: `F:\nexus-probes\knowledge\base-llm-wiki-e3\` (removed after evidence capture)

## E3 Goal (only)

Confirm the local `base-llm-wiki` project can run in an isolated copy per its own native protocol, complete a raw-source → Markdown Wiki operation of the same scale as the Astro-Han E3, leave auditable artifacts, and be fully cleaned up.

## What was executed (summary)

1. Read-only hashing of the original `F:\subwikis\base-llm-wiki` (84 files).
2. Byte-identical copy to `F:\nexus-probes\knowledge\base-llm-wiki-e3\probe` (all 84 hashes match).
3. Added the fixed Project Atlas fixture (source-a, source-b) into the copy's `raw/`.
4. Executed the native ingest per the copy's `AGENTS.md` + `workflows/ingest-source.md` + `templates/source-summary.md`:
   - created `wiki/source-summaries/Project Atlas - Versioned State.md`;
   - created `wiki/source-summaries/Project Atlas - Database Supersession.md` (explicit supersession/contradiction);
   - updated `wiki/index.md` (Source Summaries section);
   - appended two ingest entries to `wiki/log.md`.
5. Captured actual outputs into `CAPTURED_WORKTREE/` before cleanup.
6. Re-hashed the original (zero modification) and cleaned up the probe directory (verified no residue).

## Evidence files

```
SOURCE_IDENTITY.md      ENVIRONMENT.md        COMMANDS.md
MODEL_EXECUTION_CONTEXT.md
FIXTURE/                RAW_OUTPUT/
BEFORE_STATE.txt        AFTER_STATE.txt
SOURCE_HASHES_BEFORE.sha256  SOURCE_HASHES_AFTER.sha256
PROBE_HASHES_BEFORE.sha256   PROBE_HASHES_AFTER.sha256
PROCESS_LIST_BEFORE.txt  PROCESS_LIST_AFTER.txt
STDOUT.txt              STDERR.txt
CAPTURED_WORKTREE/      CLEANUP.md            FINDINGS.md
OUTPUT_EVIDENCE.md      E3_VERDICT.md
```
