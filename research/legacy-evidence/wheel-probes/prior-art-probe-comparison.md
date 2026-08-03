---
source_repository: JayGarland/nexus
source_commit: c073099481f9faa3abddde96cd22716816010704
source_path: research/findings/prior-art-probe-comparison.md
source_sha256: b6171a5657f09cd4c4836cbb26022d59f63addec9c2bc5e38c113289907808e2
migration_reason: Prior art wheel probes comparison findings
epistemic_status: PARTIAL
---

# Prior-Art Probe Comparative Evaluation Report

This document compiles the empirical execution results and comparative evaluation across all candidate wheels under the unified "四层一世界" framework.

---

## 1. Multi-Dimensional Comparison Matrix

| Evaluation Dimension | Beads (`probes/beads`) | go-workflows (`probes/go-workflows`) | Restate (`probes/restate`) |
|---|---|---|---|
| **Real Upstream Code Executed** | **`YES`** (`@beads/bd` v1.1.2) | **`YES`** (`go-workflows` v0.14.0) | **`YES`** (`restate-sdk` v1.4.0) |
| **Persisted State Storage** | Embedded Dolt DB (`.beads/`) | SQLite / MySQL / Redis DB | Restate Engine KV Store |
| **Crash Recovery Ability** | `HIGH` (CLI atomic issue state) | `HIGH` (Event log replay) | `HIGH` (Durable RPC replay) |
| **Dependency & Claim Support** | **`YES`** (`bd ready` / `bd dep add`) | `PARTIAL` (Manual DAG code) | `PARTIAL` (Custom KV locks) |
| **Protocol Intrusiveness** | **`LOW`** (CLI commands & files) | **`HIGH`** (Compiled Go code) | **`HIGH`** (SDK HTTP server) |
| **World Substrate Compatibility**| **`HIGH`** (Markdown native) | **`POOR`** (Internal SQL tables) | **`POOR`** (Opaque KV engine) |
| **Stigmergy Compatibility** | **`HIGH`** (Trace scan `bd ready`) | **`POOR`** (Central orchestrator) | **`MODERATE`** (Virtual Objects) |
| **Current-State Compatibility**| **`HIGH`** (Feeds `CURRENT_STATE`) | **`POOR`** (Event replay trees) | **`POOR`** (Engine KV state) |
| **Software 3.0 Compatibility** | **`HIGH`** (`AGENTS.md` native) | **`POOR`** (Compiled Go logic) | **`POOR`** (Code-bound services) |
| **AutoResearch Testability** | **`HIGH`** (`bd` CLI queryable) | **`MODERATE`** (Go unit tests) | **`MODERATE`** (SDK test harness) |
| **Safety & Boundary Compliance** | **`HIGH`** (No background daemon) | **`MODERATE`** (Embedded DB) | **`POOR`** (Requires daemon server)|
| **Minimal Adapter Size** | ~50 lines CLI wrapper | ~250 lines Go adapter | ~180 lines SDK wrapper |
| **Reversibility / Deletion Cost** | **`HIGH`** (Delete `.beads/`) | **`HIGH`** (Remove module) | **`HIGH`** (Remove package) |
| **Final Candidate Verdict** | **`COMPOSE`** | **`REJECT`** | **`REJECT`** |

---

## 2. Verdict Justifications

1. **Beads (`bd`)**: **`COMPOSE`**
   - Empirical probe demonstrated that `bd ready` and `bd dep add` cleanly solve Stigmergic task exposure and atomic claim without central human dispatch or continuous background daemons.
2. **go-workflows**: **`REJECT`**
   - Forces Nexus into a centralized, code-bound workflow orchestrator. Hardcoded dependency on `mattn/go-sqlite3` introduces CGO compilation friction on Windows.
3. **Restate**: **`REJECT`**
   - Requires a standing `restate-server` background daemon and stores state inside an opaque KV engine, directly violating the **No Background Auto-Start / No Permission Expansion** safety invariant.
