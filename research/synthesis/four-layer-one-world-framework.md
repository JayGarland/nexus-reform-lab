---
source_repository: JayGarland/nexus
source_branch: experiment/p0-controlled-bootstrap
source_commit: c073099481f9faa3abddde96cd22716816010704
source_path: research/synthesis/nexus-five-point-framework.md
source_sha256: e8b9f10a82b451296c09778216ef3381a1796d19451458e0a7f29056d687284b
migration_reason: Consolidate core architectural invariants of the Four-Layer One-World framework into clean-room lab.
epistemic_status: CONFIRMED
---

# Four-Layer One-World Framework ("四层一世界")

> **Official Abbreviation**: 四层一世界 (Four Layers, One World)  
> **Clean-Room Status**: RATIFIED  

---

## 1. Executive Summary

The Four-Layer One-World framework decouples system persistence, agent coordination, protocol compilation, and empirical evaluation. Agent instances are transient executors; the Artifact World runtime is the continuous persistent substrate.

---

## 2. The Four Orthogonal Layers

```mermaid
graph TD
    World["Persistent Artifact World Substrate"] --> Layer1["Layer 1: Stigmergy (Environment-Mediated State)"]
    World --> Layer2["Layer 2: Current-State Compilation (Lossless Projection)"]
    World --> Layer3["Layer 3: Software 3.0 (Declarative Protocol & Policies)"]
    World --> Layer4["Layer 4: Controlled AutoResearch (Hypothesis & Verification)"]
```

1. **Stigmergy**: Coordination achieved strictly through environmental modification (file creation/editing) rather than inter-agent messaging channels.
2. **Current-State Compilation**: Deterministic compilation of system history and state into a single, loss-free current-state representation (`CURRENT_STATE.md`).
3. **Software 3.0 Protocol Governance**: Declarative markdown rules and contracts governing system transitions rather than imperative control flows.
4. **Controlled AutoResearch**: Systematic hypothesis generation, empirical execution, and quantitative/qualitative evaluation loops.

---

## 3. Persistent Artifact World Runtime

- **Runtime Substrate**: The filesystem and markdown artifacts constitute the "World".
- **Transient Agents**: Agent instances spawn, execute, mutate artifacts, and terminate. No identity or internal state is preserved across agent boundaries.
- **Apparatus Isolation**: Tooling (Beads, CLI runners, evaluation scripts) must remain in `operator/` and never leak into `worlds/`.
