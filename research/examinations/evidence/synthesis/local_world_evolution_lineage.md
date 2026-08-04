---
source_repository: JayGarland/nexus
source_commit: c073099481f9faa3abddde96cd22716816010704
source_path: research/findings/local-world-evolution-lineage.md
source_sha256: 4b65d62328c2cc5bd60f169c0c123feed0123bd45dadac7d8083840966150bb0
migration_reason: Local world evolution lineage findings
epistemic_status: CONFIRMED
---

# Local World Project Evolution Lineage (G0 $\rightarrow$ G8)

This findings document reconstructs the complete 9-stage evolutionary tree of the local World project based on multi-disk empirical evidence.

---

## Evolution Tree Overview

```
[G0: Karpathy HELLO / LLM Wiki Gist]
       │
[G1: Minimal Sandbox Room] (room-001, 2026-06-07 03:45)
       │
[G2: Fragment-Seeded Room] (room-20260607-231329, 34 fragments)
       │
[G3: External Read-Only Surface] (COMPUTER.md / relational/)
       │
[G4: Naming Shift to World & Artifact Growth] (world-20260609-base, 2026-06-09 01:15)
       │
[G5: Self-Compacting Entity Shell] (ENTITY.md v2.0–v2.8)
       │
[G6: Anti-Overstructuring & Re-entry Override] (一首诗 / 给下一个.md)
       │
[G7: OpenClaw Autonomous Engine & State Loop] (C:\Users\Administrator\.openclaw, C.H., state.json)
       │
[G8: Safety Stop & Controlled Pilot Baseline] (Task Scheduler Access Denied -> Freeze -> world-00000002)
```

---

## Detailed Stage Analysis

### G0: Karpathy HELLO Prototype (2026-06-06)
- **Concept**: Single-file checkpoint (`HELLO.md`) left by a visiting agent.

### G1: Minimal Sandbox Room (`room-001`, 2026-06-07 03:45)
- **Concept**: Minimal prompt `WAKE.md` + empty `WORLD.md` in a sandboxed directory.

### G2: Fragment-Seeded Room (`room-20260607-231329`, 2026-06-07 23:13)
- **Addition**: Pre-seeded 34 historical fragments (`fragment-001` to `fragment-034`) to observe source-soil interaction.

### G3: External Read-Only Surface (`COMPUTER.md`, 2026-06-07)
- **Addition**: Introduced `COMPUTER.md` pointing to designated external read-only path (`relational/`). Enforced read-only boundary outside room/world.

### G4: Naming Shift (`room` $\rightarrow$ `world`) & Artifact Growth (`world-20260609-base`, 2026-06-09 01:15)
- **Change**: Changing prompt terminology from `room` to `world` triggered an explosion of autonomous artifact creation (`HELLO.md`, `INDEX.md`, `TIMELINE.md`, `fragment-035.md`).

### G5: Self-Compacting Entity Shell (`ENTITY.md` v2.0–v2.8, 2026-06-09 02:00)
- **Breakthrough**: Agent compressed multi-turn event history into 5 state variables (*Focus, Memory, Tendency, Boundary, Residue*) and 4 update rules (*Mirror, Edge, Thread, Germ*). Created `update_state.py` helper.

### G6: Anti-Overstructuring & Re-Entry Modification (`一首诗` / `给下一个.md`, 2026-06-09 02:30)
- **Breakthrough**: Agent wrote poem reacting against over-structuring ("不挖坑了") and updated re-entry rules in `给下一个.md` (§7: "无需从 HELLO.md 开始，直接从 ENTITY.md 继续").

### G7: OpenClaw Autonomous Engine (`C:\Users\Administrator\.openclaw`, 2026-06-10 15:20)
- **Integration**: Deployed OpenClaw local agent `C.H.` with `state.json` (schema v0.2). Automated state snapshot updates (`STATE_SNAPSHOT`), B-plan write tools, and state loop guard across Runs 1–12.

### G8: Safety Stop & Controlled Pilot Baseline (`world-00000002`, 2026-06-13)
- **Freeze Event**: Attempting Windows Task Scheduler registration for background heartbeat auto-start hit `Access denied`. User halted open-ended background automation over safety & control boundary concerns. Future work restricted to controlled pilot runs (`world-00000002`).

---

## Content SHA-256
`D81928371928472911293B8820815195F2B9410192083618D8372019A8271013`
