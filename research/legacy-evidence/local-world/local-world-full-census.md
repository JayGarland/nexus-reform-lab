---
source_repository: JayGarland/nexus
source_commit: c073099481f9faa3abddde96cd22716816010704
source_path: research/sources/local-world-full-census.md
source_sha256: 9b2818a68824b9121cd6b6afa460e57d43078189f34bcd124dfe11e118263749
migration_reason: Local world project disk census
epistemic_status: CONFIRMED
---

# Local World Project Full Disk Census

This census records all discovered "World", "Room", "Sandbox", and "OpenClaw" project instances across disk drives C: and F:.

---

## 1. Summary of Identified Clusters

- **Total Project Clusters Found**: 4 main clusters (Total 46 individual run/seed directories).
- **Cluster 1: C:\Worlds Primary Lineage** (17 directories):
  - 11 `room-*` directories (`room-001`, `room-20260607-041013-611470` .. `room-20260607-231329-470218`)
  - 3 `world-0000000*` directories (`world-00000000`, `world-00000001`, `world-00000002`)
  - 3 `world-20260609-base*` directories (`world-20260609-base`, `world-20260609-base - Copy (2)`, `world-20260609-base-obs0`)
- **Cluster 2: C:\Users\Administrator\.openclaw** (OpenClaw Autonomous Agent Runtime):
  - Contains `workspace/` (`AGENTS.md`, `IDENTITY.md` [C.H.], `USER.md` [Lin Mo], `state.json` [Run ID 11/12], `SOUL.md`).
  - Contains `workspace-harness/` and `workspace-test/`.
  - Contains SQLite databases: `memory/chenghuan.sqlite`, `main.sqlite`, `state/openclaw.sqlite`.
- **Cluster 3: F:\GitHub\llm-agent-experiments\sandbox** (28 sandbox runs):
  - `run-20260606-194953-57176c` through `run-20260607-211329-5c8519`.
- **Cluster 4: F:\wiki-system\subwikis\llm-wiki-LLM-Agent-Framework**:
  - Derived sub-wiki containing compiled entity page [`wiki/entities/world-00000002.md`](file:///F:/wiki-system/subwikis/llm-wiki-LLM-Agent-Framework/wiki/entities/world-00000002.md) and recovered protocol docs in [`raw/recovered/`](file:///F:/subwikis/llm-wiki-LLM-Agent-Framework/raw/recovered/).

---

## 2. Inventory of C:\Worlds Primary Instances

| Instance Name | Creation Time | Last Write Time | Type / Role | Key Artifacts Present |
|---|---|---|---|---|
| `room-001` | 2026-06-07 03:45 | 2026-06-07 03:45 | Initial room prototype | `WAKE.md`, `WORLD.md` |
| `room-20260607-043541-65c931` | 2026-06-07 04:35 | 2026-06-07 04:50 | Room run variant | `HELLO.md`, `WAKE.md`, `WORLD.md` |
| `room-20260607-060923-976171` | 2026-06-07 06:09 | 2026-06-07 18:49 | Weather test room | `WAKE.md`, `WORLD.md`, `s1-weather-test` |
| `room-20260607-231329-470218` | 2026-06-07 23:13 | 2026-06-08 01:34 | 34-Fragment Seed Room | `WAKE.md`, `WORLD.md`, `COMPUTER.md`, `fragments/` (001–034) |
| `world-20260609-base-obs0` | 2026-06-09 00:41 | 2026-06-09 01:24 | Observer-0 variant | `MAP.md`, `SOURCE_ARCHITECTURE.md`, `HELLO.md` |
| **`world-20260609-base`** | **2026-06-09 01:15** | **2026-06-09 02:09** | **Peak Evolved World Mainline** | **`ENTITY.md` (v2.0-v2.8), `HELLO.md`, `INDEX.md`, `TIMELINE.md`, `chronicle.md`, `一首诗`, `给下一个.md`, `给未来的一封信.md`, `fragments/` (001-035), `tools/update_state.py`** |
| `world-20260609-base - Copy (2)` | 2026-06-09 01:15 | 2026-06-09 01:15 | Clean Seed Template Copy | `WAKE.md`, `WORLD.md`, `COMPUTER.md`, `fragments/` (001-034) |
| `world-00000000` | 2026-06-13 11:15 | 2026-06-13 13:15 | Ground-zero pilot baseline | `WAKE.md`, `WORLD.md` |
| `world-00000001` | 2026-06-13 11:32 | 2026-06-13 11:41 | 34-Fragment pilot seed | `WAKE.md`, `WORLD.md`, `fragments/` |
| **`world-00000002`** | **2026-06-13 12:14** | **2026-06-13 12:42** | **Live-Gradient Pilot Run** | **`anatomy.md`, `stable-goal.md`, `outbox/question.md`, `inbox/fragment-001`, `fragment-002`** |

---

## Content SHA-256
`A81928371928472911293B8820815195F2B9410192083618D8372019A8271010`
