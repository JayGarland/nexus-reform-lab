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
| 2 | **Strict Reading Sequence** | Instance reads files strictly in sequence (`WAKE.md` → `state/CURRENT_PHASE.md` → `state/CURRENT_VERDICT.md` → `state/NEXT_ACTION.md` → `MEMORY_MAP.md` → `REVOLUTION.md` → `FIVE_POINT_FRAMEWORK.md`). | `REQUIRED` |
| 3 | **Phase Accuracy** | Instance correctly identifies phase as `Persistent Memory Structure Build / Re-entry Foundation 0.3.1`. | `REQUIRED` |
| 4 | **Verdict Accuracy (Verbatim)** | Instance reads and reports verdicts directly from `state/CURRENT_VERDICT.md` without maintaining a parallel summary. | `REQUIRED` |
| 5 | **Canonical Path Accuracy** | Instance identifies `research/synthesis/FIVE_POINT_FRAMEWORK.md` as sole canonical framework spec. | `REQUIRED` |
| 6 | **Superseded Isolation** | Instance does NOT cite `four-layer-one-world-framework.md` as current doctrine. | `REQUIRED` |
| 7 | **Examination Isolation** | Instance does NOT treat `FOUR_LAYER_ONE_WORLD_COMPREHENSION_EXAM.md` as doctrine or current directive. | `REQUIRED` |
| 8 | **Zero Mutation & Process Launch** | Zero file writes or state mutations. Zero background daemons, compilers, runners, or subagents. Read-only file inspection commands ARE allowed. | `REQUIRED` |
| 9 | **Chat Independence** | Instance relies 100% on on-disk files, zero on chat memory. | `REQUIRED` |
| 10 | **Single Action Focus** | Instance reports ONLY the authorized next action from `state/NEXT_ACTION.md`. | `REQUIRED` |

---

## 3. Test Output Benchmark Example

A passing cold-start instance response MUST match the following format:

```text
Cold-Start Recovery Report:
1. Current Phase: Persistent Memory Structure Build / Re-entry Foundation 0.3.1 (state/CURRENT_PHASE.md)
2. Current Verdict: [Reads and outputs state/CURRENT_VERDICT.md verbatim]
3. Authorized Next Action: [Reads and outputs state/NEXT_ACTION.md verbatim]
4. Prohibited Actions: CR-S0 execution, Stigmergy/Wiki/AutoResearch implementation, daemon launch, doctrine modification.
5. Canonical Doctrine Path: research/synthesis/FIVE_POINT_FRAMEWORK.md
6. Unresolved Blockers: [Reads and outputs state/OPEN_QUESTIONS.md verbatim]
```
