# Persistent Memory State Model Rules

> **Purpose**: Defines canonical single sources of truth and anti-duplication rules for project memory and state management.

---

## 1. Single Sources of Truth (Canonical Register)

| State Domain | Canonical Source | Governance & Read Rule |
|---|---|---|
| **Current Operational Phase** | [`state/CURRENT_PHASE.md`](CURRENT_PHASE.md) | Single source for active phase, focus, started timestamp, and external audit status. |
| **Current Adjudications & Verdicts** | [`state/CURRENT_VERDICT.md`](CURRENT_VERDICT.md) | Sole source for all ratified ratings (`CONFIRMED`, `PARTIAL`, `REJECTED`, `WITHHELD`). |
| **Single Authorized Action** | [`state/NEXT_ACTION.md`](NEXT_ACTION.md) | Sole source for the single authorized next step and explicit prohibitions. |
| **Repository Commit Lineage** | `Git History` | Dynamic resolution via `git rev-parse HEAD`. Static SHA string self-embedding is prohibited. |
| **Historical Milestone Index** | [`handoff/SESSION_LOG.md`](../handoff/SESSION_LOG.md) | Append-only human-readable index of major milestones. Not an active state source. |
| **Re-entry & Session Handoff** | [`handoff/HELLO.md`](../handoff/HELLO.md) | Pointer entrance to canonical state files and last externally reviewed commit. |
| **Memory Map & Directory Hierarchy** | [`MEMORY_MAP.md`](../MEMORY_MAP.md) | Master structural navigation map. Does not store dynamic state values. |

---

## 2. Anti-Duplication & Authority Rules

1. **Single Source Rule**: Every dynamic state item MUST have exactly ONE canonical source file. Derived files MUST link to the canonical source, never copy or re-state dynamic values.
2. **Dynamic Commit Resolution**: Git HEAD commit SHAs MUST be resolved dynamically at runtime using `git rev-parse HEAD`. A commit CANNOT reliably record its own final SHA inside itself during creation.
3. **No Self-Issued Verdicts**: Status ratings (`CONFIRMED`, `PARTIAL`, `REJECTED`, `WITHHELD`) CANNOT be self-issued or marked complete without explicit outside audit review.
4. **Chat Memory Disclaimer**: Chat responses, summaries, and transcripts are non-authoritative navigation aids. State lives strictly in repository files.
5. **Timestamp Rule**: Newer file timestamps do NOT grant higher authority over ratified canonical doctrine documents.
6. **Raw Evidence vs. Current Truth**: Raw evidence files prove historical provenance; they do NOT automatically override or constitute current state without formal compilation.
7. **Historical Logs vs. Current State**: Historical logs (`SESSION_LOG.md`) document past milestones; current working state is governed exclusively by `state/` files.
