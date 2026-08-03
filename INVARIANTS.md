# Nexus Reform Lab Invariants

> **Status**: RATIFIED (Clean-Room Bootstrap)  
> **Scope**: Nexus Reform Laboratory Architecture & Governance Invariants  

---

## 1. Substrate & Execution Invariants

1. **Persistent Artifact Substrate**:
   - Files and Markdown artifacts are the sole persistent substrate for state, memory, and coordination.
   - Transient agent context windows or LLM memory do not constitute system state.

2. **Four-Layer One-World Architecture ("四层一世界")**:
   - **Stigmergy**: Environment-mediated stigmergic coordination via persistent state changes.
   - **Current-State Compilation**: Lossless projection and deterministic compilation of world state.
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
   - GitHub commit history and repository raw files are the sole authoritative audit trail.
   - Every completed iteration MUST be verified locally, committed, and pushed to the remote repository.

7. **Dual-Storage Manifest Rule (GitHub + Google Drive)**:
   - Git tracks all code, artifacts, specifications, logs, and evaluation reports.
   - Heavy media assets (videos, large archives, raw traces) placed in Google Drive MUST be registered in `external-artifacts/drive-manifest.json` with file ID, SHA-256 hash, purpose, and associated commit SHA.
