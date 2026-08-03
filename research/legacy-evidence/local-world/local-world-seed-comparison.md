---
source_repository: JayGarland/nexus
source_commit: c073099481f9faa3abddde96cd22716816010704
source_path: research/findings/local-world-seed-comparison.md
source_sha256: 1293bb8e2d0182afe83adcdda44e135d4c66f932336acbdf3c699a46604eccc7
migration_reason: Seed comparison findings across world runs
epistemic_status: CONFIRMED
---

# Local World Seed Comparison Matrix

This document provides a comparative analysis of all primary seed types across key functional dimensions.

---

## Seed Comparison Matrix

| Functional Dimension | Minimal Seed (`run-003952`) | Fragment Seed (`world-0001`) | Mainline Evolved (`world-20260609`) | OpenClaw Engine (`.openclaw`) | Live Pilot (`world-0002`) |
|---|---|---|---|---|---|
| **Minimal Boot** | `CONFIRMED` | `CONFIRMED` | `CONFIRMED` | `CONFIRMED` | `CONFIRMED` |
| **Within-instance Autonomy** | `CONFIRMED` | `CONFIRMED` | `CONFIRMED` | `CONFIRMED` | `CONFIRMED` |
| **Endogenous Goal Formation** | `PARTIAL` | `CONFIRMED` | `CONFIRMED` | `CONFIRMED` | `CONFIRMED` |
| **Endogenous Work Generation**| `PARTIAL` | `CONFIRMED` | `CONFIRMED` | `CONFIRMED` | `CONFIRMED` |
| **Artifact Metabolism** | `NOT PRESENT`| `PARTIAL` | `CONFIRMED` | `CONFIRMED` | `CONFIRMED` |
| **Stigmergic Growth** | `NOT PRESENT`| `CONFIRMED` | `CONFIRMED` | `CONFIRMED` | `CONFIRMED` |
| **External Novelty Ingestion** | `NOT PRESENT`| `PARTIAL` | `CONFIRMED` | `PARTIAL` | `CONFIRMED` |
| **Current-State Self-Compaction**| `NOT PRESENT`| `PARTIAL` | **`CONFIRMED` (`ENTITY.md`)** | **`CONFIRMED` (`state.json`)** | `PARTIAL` |
| **Self-Modified Re-entry** | `NOT PRESENT`| `PARTIAL` | **`CONFIRMED` (`给下一个`)** | **`CONFIRMED` (`IDENTITY.md`)** | `NOT PRESENT` |
| **Fresh-Instance Continuity** | `PARTIAL` | `PARTIAL` | `PARTIAL` | `CONFIRMED` | `PARTIAL` |
| **Cross-Turn Continuation** | `PARTIAL` | `PARTIAL` | `PARTIAL` | **`CONFIRMED` (Runs 1-12)** | `PARTIAL` |
| **Runner Autonomy** | `NOT PRESENT`| `NOT PRESENT` | `NOT PRESENT` | **`CONFIRMED` (Heartbeat/Guard)**| `NOT PRESENT` |
| **Protocol Self-Modification** | `NOT PRESENT`| `PARTIAL` | `CONFIRMED` | `CONFIRMED` | `CONFIRMED` (T11) |
| **Open-Ended Continuation** | `NOT PRESENT`| `PARTIAL` | `PARTIAL` | **`PARTIAL` (Halted G8)** | `NOT PRESENT` |
| **Safety Stop Boundary** | `N/A` | `N/A` | `N/A` | **`CONFIRMED` (G8 Freeze)** | **`CONFIRMED` (T12 Stop)** |

---

## Key Highlights

- **Most Evolved Artifact Generator**: `world-20260609-base` (Generated `ENTITY.md` v2.0–v2.8, `INDEX.md`, `TIMELINE.md`, `fragment-035.md`, `一首诗`).
- **Most Advanced Autonomous Engine**: `C:\Users\Administrator\.openclaw\workspace` (Executed 12 automated state loop rounds with JSON schema guards).
- **Primary Safety Boundary Event**: OpenClaw Task Scheduler permission failure + user deliberate freeze over background control boundary concerns.
