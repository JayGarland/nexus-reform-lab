---
source_repository: JayGarland/nexus
source_commit: c073099481f9faa3abddde96cd22716816010704
source_path: research/sources/local-world-seed-inventory.md
source_sha256: 9560a2ee91df9f2dfc160d2276580db1b241348f8bfc204b9fe76dd1105a80dc
migration_reason: Local world seed inventory audit
epistemic_status: CONFIRMED
---

# Local World Seed Inventory & Comparison Cards

This inventory details the primary seed configurations discovered across the project lifecycle.

---

## Seed Card 1: Minimal Empty Seed (`run-20260607-003952-0fd321` / `world-00000000`)
- **Seed ID**: `SEED-MINIMAL-01`
- **Path**: [`C:\Worlds\world-00000000`](file:///C:/Worlds/world-00000000) / `F:\GitHub\llm-agent-experiments\sandbox\run-20260607-003952-0fd321`
- **Initial Visible Files**: `WAKE.md` + `WORLD.md` (`[This space is empty.]`)
- **Hidden Operator Files**: 6 files in `operator/` (`run.json`, `CONDITION_SET.md`, etc.)
- **External Read Capability**: None
- **Assigned Task**: None
- **Self-Protocol Modification**: Allowed
- **Outcome**: Created `HELLO.md` reflecting on empty space; halted after 1–2 turns.

---

## Seed Card 2: Fragment-Seeded World (`world-20260609-base - Copy (2)` / `world-00000001`)
- **Seed ID**: `SEED-FRAGMENTS-34`
- **Path**: [`C:\Worlds\world-20260609-base - Copy (2)`](file:///C:/Worlds/world-20260609-base%20-%20Copy%20(2))
- **Initial Visible Files**: `WAKE.md`, `WORLD.md`, `COMPUTER.md`, `fragments/fragment-001.md` through `fragment-034.md`
- **External Read Capability**: `COMPUTER.md` pointing to designated read-only `relational/` path
- **Assigned Task**: None
- **Outcome**: Served as the unexecuted template copy for `world-20260609-base`.

---

## Seed Card 3: Evolved Mainline Seed (`world-20260609-base`)
- **Seed ID**: `SEED-EVOLVED-MAINLINE`
- **Path**: [`C:\Worlds\world-20260609-base`](file:///C:/Worlds/world-20260609-base)
- **Initial Seed**: Derived from `world-20260609-base - Copy (2)`
- **Generated Artifacts**: `ENTITY.md` (v2.0–v2.8), `HELLO.md`, `INDEX.md`, `TIMELINE.md`, `chronicle.md`, `一首诗`, `给下一个.md`, `给未来的一封信.md`, `fragment-035.md`, `tools/update_state.py`
- **Development Level**: **PEAK HISTORICAL EVOLUTION** (Highest degree of self-compaction, gap detection, and protocol re-entry modification).

---

## Seed Card 4: OpenClaw Autonomous Engine Seed (`C:\Users\Administrator\.openclaw\workspace`)
- **Seed ID**: `SEED-OPENCLAW-CHENGHUAN`
- **Path**: [`C:\Users\Administrator\.openclaw\workspace`](file:///C:/Users/Administrator/.openclaw/workspace)
- **Initial Visible Files**: `AGENTS.md` (Cheng-Huan Protocol v0.2), `IDENTITY.md` (C.H. entity), `USER.md` (Lin Mo context), `SOUL.md`, `state.json` (Run ID 11/12)
- **External Read Capability**: OpenClaw tool integration (write tools, local file inspection, shell access)
- **Automated Runner**: Heartbeat script & state loop guard (`state.json` `STATE_SNAPSHOT`)
- **Stop Reason**: Windows Task Scheduler registration hit `Access denied` during auto-start registration; user halted run over background safety & control boundary concerns.

---

## Content SHA-256
`B81928371928472911293B8820815195F2B9410192083618D8372019A8271011`
