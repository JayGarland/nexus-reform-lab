# base-llm-wiki E3 Fair Comparison Plan

> **Status**: PLAN — UNDER OUTSIDE REVIEW; execution NOT authorized.
> **Purpose**: Define the smallest fair E3 control comparison between the already-confirmed Astro-Han E3 behavior and the local `base-llm-wiki` native behavior. This plan does NOT execute anything.

---

## 1. Comparison Purpose

Goal: build a minimal fair control, not a "which is better" contest.

```text
Astro-Han E3 confirmed behavior
vs.
base-llm-wiki native behavior (to be verified)
```

E3 only answers:

- Can the local project run in an isolated copy per its own native protocol?
- Can it complete a raw-source → Markdown Wiki operation of the same scale?
- Does it modify raw?
- Does it generate index, log, provenance, contradiction / supersession?
- Does it depend on models, scripts, global config, or background services?
- Can it be fully cleaned up?

E3 does NOT answer:

- final Nexus fit;
- who should be adopted;
- who is more suitable as a production Provider;
- information completeness rate;
- incremental-update reliability;
- E4/E5;
- Adapter design.

## 2. Fairness Principles

Astro-Han and base-llm-wiki must use the same, as far as possible:

```text
fixture content
source count
fact count
conflict / supersession situation
output review dimensions
isolation requirements
evidence-save format
cleanup requirements
```

The two implementations are NOT required to produce identical directory or page structures. The comparison is of capability, not of filename equality.

## 3. Fixed Fixture

Same semantic content as the Astro-Han E3 probe:

```text
source-a.md:
Project Atlas stores canonical state in versioned files.
Its worker instances have no persistent internal memory.

source-b.md:
Atlas previously used a database as canonical state.
That design was superseded on 2026-07-01.
The database may remain only as a rebuildable index.
```

No Nexus, Resonova, cc-connect, or real user-project material may be added.

## 4. Isolation Method

Do NOT run directly in `F:\subwikis\base-llm-wiki`.

Required sequence:

```text
read-only inspection of the original project
→ copy to an independent Probe directory
→ execute inside the copy
→ capture full inputs and outputs
→ clean up the Probe directory
```

Suggested isolation path:

```text
F:\nexus-probes\knowledge\base-llm-wiki-e3\
```

Must record:

```text
original project file hashes
copy command
probe-copy hashes
directory snapshots before/after run
original project hashes before/after run
proof that the original project was not modified
```

## 5. Model Invocation Boundary

`base-llm-wiki` is an agent-driven workflow (per its captured AGENTS.md): the LLM maintains the wiki. The plan must record:

- which in-box model is used (as a replaceable executor only);
- which in-repo instruction files are used (AGENTS.md, workflows/, templates/);
- whether an API key is required;
- whether external network is called;
- whether model non-determinism exists;
- model output MUST NOT be mixed into tool-capability scoring.

Per the captured local evidence (`BOUNDED_EXCERPTS.md`), v1 requires no external tooling (no qmd/MCP/Dataview/plugin/automation) and no API key. If the project cannot run without exposing secrets, the verdict is:

```text
E3 BLOCKED
```

Do not bypass the security boundary.

## 6. Evidence That MUST Be Saved

Future execution MUST save:

```text
research/probes/e3/base-llm-wiki/
  README.md
  ENVIRONMENT.md
  COMMANDS.md
  SOURCE_IDENTITY.md
  MODEL_EXECUTION_CONTEXT.md
  FIXTURE/
  CAPTURED_WORKTREE/
  RAW_OUTPUT/
  BEFORE_STATE.txt
  AFTER_STATE.txt
  SOURCE_HASHES_BEFORE.sha256
  SOURCE_HASHES_AFTER.sha256
  PROBE_HASHES_BEFORE.sha256
  PROBE_HASHES_AFTER.sha256
  STDOUT.txt
  STDERR.txt
  PROCESS_LIST_BEFORE.txt
  PROCESS_LIST_AFTER.txt
  CLEANUP.md
  FINDINGS.md
  OUTPUT_EVIDENCE.md
  E3_VERDICT.md
```

Actual outputs MUST be captured BEFORE cleanup:

```text
raw files
Wiki pages
index
log
provenance
contradiction / supersession records
lint output
```

File lists and execution summaries alone are NOT sufficient evidence.

## 7. Unified Review Dimensions

The plan requires checking:

```text
Raw preservation
Current vs superseded distinction
Source traceability
Index/link validity
Append-only log behavior
Unsupported fact introduction
Fact omission
Contradiction preservation
File-first compatibility
Model neutrality
Global mutation
Background processes
Cleanup completeness
```

Recorded additionally but NOT E3 pass gates:

```text
page structure quality
provenance granularity
instruction complexity
number of model turns
token usage if available
manual intervention
```

## 8. Allowed Verdicts

After execution, the verdict may only be:

```text
E3 PASSED
E3 PARTIAL
E3 FAILED
E3 BLOCKED
```

Forbidden:

```text
ADOPT
KEEP
SELECTED
BOUND
SUPERIOR
NEXUS FIT CONFIRMED
```

## 9. Stop Conditions

Stop immediately on any of:

```text
requires modifying the original base-llm-wiki
requires reading Nexus secrets
writes to user-global Agent configuration
starts an undeclared background service
modifies files outside the isolated directory
cannot capture actual outputs
cannot verify cleanup
workflow instructions clearly contradict local artifacts
requires temporary project modification to run
```

Do not fix `base-llm-wiki` first just to make it run.

---

*End of plan.*
