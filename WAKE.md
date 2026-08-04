# WAKE.md — Mandatory Re-entry & Cold-Start Entrance

```text
================================================================================
                               INSTANCE DECLARATION
================================================================================
You are a new transient AI instance.
You have no inherited conversational memory.
Continuity must be reconstructed entirely from this repository.
================================================================================
```

---

## 1. Core Authority Principles

1. **Remote Commit Authority**: GitHub remote branch commits are the sole audit authority.
2. **Chat Memory Disclaimer**: Chat responses and summaries are navigation aids only. Factual state lives strictly on disk.
3. **State vs. Doctrine Separation**: [`state/CURRENT.md`](state/CURRENT.md) defines *what is happening now*; `REVOLUTION.md` and `research/synthesis/FIVE_POINT_FRAMEWORK.md` define *how the system is designed*.
4. **Superseded File Ban**: Files marked `SUPERSEDED`, `HISTORICAL_FAILURE`, or archived under [`archive/`](archive/ARCHIVE_INDEX.md) MUST NOT be used as current rules or directives.
5. **Raw Evidence vs. Current Knowledge**: Raw log files (`research/legacy-evidence/`, `research/probes/e3/`) prove historical events; they are not current synthesized rules.
6. **Persistence Rule**: Content that is not written to disk and committed to Git does NOT constitute persistent memory.

---

## 2. Mandatory Cold-Start Reading Sequence

Upon spawning, you MUST read the following files strictly in order before taking any operational action:

```text
1. WAKE.md (This File)
   ↓
2. state/CURRENT.md
   ↓
3. Specific domain / task files (ONLY as authorized by state/CURRENT.md)
```

> `MEMORY_MAP.md` is an optional navigation aid, not a mandatory read.

---

## 3. Cold-Start Strict Prohibitions

Before completing the mandatory reading sequence above, you are **STRICTLY FORBIDDEN** from:

- Executing task implementations or code modifications.
- Modifying files in `state/`, `archive/`, or root doctrine documents.
- Launching background daemons, runners, compilers, OpenClaw, or subagents.
- Relying on chat memory to reconstruct project history.
- Treating superseded drafts (`four-layer-one-world-framework.md`) or examination files (`FOUR_LAYER_ONE_WORLD_COMPREHENSION_EXAM.md`) as current doctrine.
- Announcing that `CR-S0` or `Persistent Artifact World` is authorized or completed.

---

## 4. Post-Wakeup Minimal Report Format

After completing the mandatory reading sequence, your response to the operator MUST contain ONLY the following six status items:

```text
1. Current Phase: [Value from state/CURRENT.md]
2. Current Verdict: [Value from state/CURRENT.md]
3. Authorized Next Action: [Value from state/CURRENT.md]
4. Prohibited Actions: [Summary of active bans in state/CURRENT.md]
5. Canonical Doctrine Path: [research/synthesis/FIVE_POINT_FRAMEWORK.md]
6. Unresolved Blockers: [Value from state/CURRENT.md]
```
