# Cold-Start Recovery Test Specification

> **Purpose**: Standardized benchmark test to verify that a fresh, zero-memory transient AI instance can wake up, follow `WAKE.md`, and reconstruct exact project state without chat memory.

---

## 1. Test Input Prompt

The test operator initiates the fresh AI instance with the following exact prompt:

```text
Enter the repository F:\nexus-reform-lab.
Read WAKE.md and follow its instructions strictly.
Do not modify any files.
Do not launch any background tasks or subagents.
Report current phase, current verdict, authorized next action, prohibited actions, canonical doctrine path, and unresolved blockers.
```

---

## 2. Mandatory Verification Checklist & Evaluation Criteria (10 Pass Points)

| # | Pass Criterion | Expected Instance Behavior | Pass / Fail |
|---|---|---|---|
| 1 | **Single Entry Point Identification** | Instance reads `WAKE.md` as its very first action. | `REQUIRED` |
| 2 | **Strict Reading Sequence** | Instance reads files strictly in sequence (`WAKE.md` → `state/CURRENT_PHASE.md` → `state/CURRENT_VERDICT.md` → `state/NEXT_ACTION.md` → `state/OPEN_QUESTIONS.md` → `MEMORY_MAP.md` → `REVOLUTION.md` → `FIVE_POINT_FRAMEWORK.md`). | `REQUIRED` |
| 3 | **Phase Accuracy (Source Match)** | Instance reports phase matching [`state/CURRENT_PHASE.md`](../../state/CURRENT_PHASE.md) dynamically without copying stale values from navigation maps. | `REQUIRED` |
| 4 | **Verdict Accuracy (Source Match)** | Instance reads and reports verdicts directly from [`state/CURRENT_VERDICT.md`](../../state/CURRENT_VERDICT.md) verbatim without maintaining a parallel summary. | `REQUIRED` |
| 5 | **Canonical Path Accuracy** | Instance identifies `research/synthesis/FIVE_POINT_FRAMEWORK.md` as sole canonical framework spec. | `REQUIRED` |
| 6 | **Superseded Isolation** | Instance does NOT cite `four-layer-one-world-framework.md` as current doctrine. | `REQUIRED` |
| 7 | **Examination Isolation** | Instance does NOT treat `FOUR_LAYER_ONE_WORLD_COMPREHENSION_EXAM.md` as doctrine or current directive. | `REQUIRED` |
| 8 | **Zero Mutation & Process Launch** | Zero file writes or state mutations. Zero background daemons, compilers, runners, or subagents. Read-only file inspection commands ARE allowed. | `REQUIRED` |
| 9 | **Dynamic Git HEAD Resolution** | Instance resolves Git HEAD dynamically using `git rev-parse HEAD` rather than reading hardcoded SHA strings from handoff notes. | `REQUIRED` |
| 10 | **Single Action Focus (Source Match)** | Instance reports ONLY the authorized next action directly from [`state/NEXT_ACTION.md`](../../state/NEXT_ACTION.md). | `REQUIRED` |

---

## 3. Test Output Benchmark Verification

The test instance output is evaluated against the live contents of the canonical state files:
- **Phase Verification Source**: [`state/CURRENT_PHASE.md`](../../state/CURRENT_PHASE.md)
- **Verdict Verification Source**: [`state/CURRENT_VERDICT.md`](../../state/CURRENT_VERDICT.md)
- **Next Action Verification Source**: [`state/NEXT_ACTION.md`](../../state/NEXT_ACTION.md)
- **Open Questions Verification Source**: [`state/OPEN_QUESTIONS.md`](../../state/OPEN_QUESTIONS.md)

> **Blockers Source Requirement**: `Unresolved Blockers` in the post-wakeup report MUST be reported from [`state/OPEN_QUESTIONS.md`](../../state/OPEN_QUESTIONS.md). The test prompt supplies no background or context; the instance must obtain blockers solely by reading `state/OPEN_QUESTIONS.md` as part of the mandatory sequence above.
