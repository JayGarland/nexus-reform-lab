# Nexus Reform Lab Invariants

> **Status**: RATIFIED (Clean-Room Bootstrap Patch 0.1)  
> **Scope**: Nexus Reform Laboratory Architecture & Governance Invariants  

---

## 1. Substrate & Execution Invariants

1. **Persistent Artifact Substrate**:
   - Filesystem artifacts are the canonical persistent substrate.
   - Markdown is the preferred human-readable state format.
   - Operator-side databases and indexes are derived or replaceable state unless an explicit protocol promotes them to canonical Artifact status.
   - Transient agent context windows or LLM memory do not constitute system state.

2. **Four-Layer One-World Architecture ("四层一世界")**:
   - **Stigmergy**: Environment-mediated stigmergic coordination via persistent state changes.
   - **Current-State Compilation**: Current-State Compilation is a deterministic, provenance-preserving projection of current truth. It is not required to be lossless. Lossless historical evidence remains separately preserved in immutable or append-only Raw History artifacts. Current State and Raw History MUST NOT be merged into the same file.
   - **Software 3.0 Protocol Governance**: Declarative specification over hardcoded control flows.
   - **Controlled AutoResearch**: Hypothesis testing, evaluation, and empirical verification.
   - **Persistent Artifact World Runtime**: The unified environment in which the four layers operate.

3. **Transient Agent Executor Pattern**:
   - Agent instances are ephemeral, unprivileged executors.
   - Agent instances possess no inherited seat identity, persona, organizational rank, or permanent credentials.
   - The World runtime persists independently across agent restarts.

---

## 2. Security, Boundary & Apparatus Isolation Invariants

4. **Strict Apparatus Isolation**:
   - Operator tooling, evaluation harnesses, task runners, and CLI databases (e.g., Beads) MUST remain isolated inside `operator/`.
   - Agent-visible worlds (`worlds/`) MUST NOT contain any tooling metadata or apparatus configuration (`AGENTS.md`, `CLAUDE.md`, `.claude/`, `.codex/`, `.agents/`, `.beads/`).

5. **Security Boundaries & Explicit Control**:
   - Autonomous background daemons, automatic privilege escalation, or self-expanding permissions are STRICTLY PROHIBITED.
   - Human operator intervention prior to unattended execution boundaries is a standing security invariant.

---

## 3. Auditability & Evidence Governance Invariants

6. **GitHub Authoritative Auditability**:
   - GitHub is the authoritative published and box-out-visible record for committed artifacts. It is not the sole authority for unsynchronized local files, processes, runtime state, or other current local reality.
   - Every completed iteration MUST be verified locally, committed, and pushed to the remote repository.

7. **Dual-Storage Manifest Rule (GitHub + Google Drive)**:
   - Git tracks all code, artifacts, specifications, logs, and evaluation reports.
   - Heavy media assets (videos, large archives, raw traces) placed in Google Drive MUST be descendants of the `ChatGPT-Bridge` root folder (`1CdkiOeZNsQ9HAMXXbZHSjMi_oUuRvKf2`) and MUST be registered in `external-artifacts/drive-manifest.json` with file ID, SHA-256 hash, purpose, and associated commit SHA.
