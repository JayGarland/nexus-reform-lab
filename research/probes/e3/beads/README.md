# E3 Probe — Beads (gastownhall/beads) — Coordination / Work Lifecycle

> Probe: Coordination / Work Lifecycle — Beads (primary probe candidate #1, Domain A) against the unified Coordination and Durable Runtime Probe Plan.
> Status: UNDER OUTSIDE REVIEW
> Isolated directory: `F:\nexus-lab-worktrees\beads-probe\` (probe dir, removed at cleanup; evidence below preserved)

## E3 Goal (only)

Confirm the upstream Beads CLI can be obtained (checksum-verified), installed/initialized in an isolated directory, and run the minimum common 10-step coordination scenario natively, including dependency-aware ready/claim semantics, durable versioned state, simulated interruption + fresh-instance recovery, output submission, export, and verified cleanup.

E3 does NOT prove: Nexus fit; superiority over other Coordination candidates; ADOPT/ADAPT/COMPOSE/REJECT; E4/E5; Provider selection or binding.

## What was executed (summary)

1. Upstream metadata pinned live via GitHub API: v1.1.2, MIT, tag target commit `20e493e569c922d1253bdeff068c5e56c94957fb`, main HEAD `095a5bfc3cd7a45609de180cd42d618e16201323` (at probe time).
2. Downloaded official `beads_1.1.2_windows_amd64.zip`; SHA-256 matched the upstream release digest `4591b07bf82b3203a1dc7db17a7e4962d86338e6c3d34a8a857cc11a57f9c159`. `bd --version` = `1.1.2 (20e493e56)`.
3. `bd init --non-interactive` in isolated `work/` (embedded Dolt, prefix `work`).
4. Ran the 10-step scenario natively (see `COMMANDS.md` and `FINDINGS.md`): A->B->C deps, ready query, atomic claim, attempt, intermediate state, hard-kill of live process, fresh-instance recovery, continue, close/output, export + lineage.
5. Recorded Human Cost raw metrics (`HUMAN_COST.md`).
6. Captured evidence and cleaned up the probe directory; verified no residue (`CLEANUP.md`).

## Evidence files

```
UPSTREAM_IDENTITY.md    ENVIRONMENT.md        COMMANDS.md
FIXTURE/                RAW_OUTPUT/
BEFORE_STATE.txt        AFTER_STATE.txt
PROCESS_LIST_BEFORE.txt PROCESS_LIST_AFTER.txt
FILE_HASHES_AFTER.sha256
HUMAN_COST.md           FINDINGS.md           OUTPUT_EVIDENCE.md
CLEANUP.md              E3_VERDICT.md
CAPTURED_STORE/         (config.yaml, metadata.json, gitignore, interactions.jsonl)
```

Chat summaries are not evidence; the artifacts above are the evidence.
