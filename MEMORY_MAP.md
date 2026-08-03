# MEMORY_MAP.md — Project Persistent Memory Structure Map

> **Purpose**: Master navigation map organizing project memory categories across identity, working state, knowledge, history, procedures, handoffs, and evolution.

---

## 1. Memory Hierarchy & Authority Precedence

```text
1. Current State Files (state/)               [Highest Operational Authority]
   ↓
2. Canonical Doctrine Documents                [Architectural Authority]
   ↓
3. Ratified Protocols & Invariants             [Safety & Procedural Authority]
   ↓
4. Compiled Knowledge Pages (Future Wiki)       [Domain Truth]
   ↓
5. Raw Evidence & Execution Logs               [Historical Provenance]
   ↓
6. Historical Synthesis Documents              [Derived Background]
   ↓
7. Superseded Files & Failure Archives         [Read-Only Audit Trail]
   ↓
8. Chat Summaries & Transcripts                [Lowest Authority / Navigation Only]
```

### Precedence Constraints
- `state/` files CANNOT modify Canonical Doctrine.
- Canonical Doctrine CANNOT alter or fabricate Raw Evidence.
- Raw Evidence does NOT automatically become Current Knowledge without compilation.
- Handoff notes CANNOT override `state/` files.
- Chat summaries CANNOT override repository files.

---

## 2. Memory Category Map

### A. Identity & Doctrine Memory
*Preserves non-transient definitions, architectural principles, and safety bounds.*

- [`REVOLUTION.md`](REVOLUTION.md): Foundational manifesto terminating letter-centric governance.
- [`research/synthesis/FIVE_POINT_FRAMEWORK.md`](research/synthesis/FIVE_POINT_FRAMEWORK.md): **Sole Canonical Specification** of One World Substrate + 4 Orthogonal Layers.
- [`research/synthesis/LLM_WIKI_CURRENT_KNOWLEDGE_SYSTEM.md`](research/synthesis/LLM_WIKI_CURRENT_KNOWLEDGE_SYSTEM.md): Specification for incremental knowledge compilation.
- [`CHARTER.md`](CHARTER.md): Clean-room lab operating charter.
- [`INVARIANTS.md`](INVARIANTS.md): Immutable safety boundaries and non-negotiable rules.

---

### B. Current Working Memory
*Preserves active operational state, current phase, verdicts, and immediate next action.*

- [`state/CURRENT_PHASE.md`](state/CURRENT_PHASE.md): Active phase status (`Re-entry Foundation 0.3`).
- [`state/CURRENT_VERDICT.md`](state/CURRENT_VERDICT.md): Confirmed vs withheld adjudications.
- [`state/NEXT_ACTION.md`](state/NEXT_ACTION.md): Single authorized next action.
- [`state/OPEN_QUESTIONS.md`](state/OPEN_QUESTIONS.md): Pending design questions.

---

### C. Knowledge Memory
*Compiled current truth, entity pages, topic breakdowns, and indices.*

> ⚠️ **STATUS**: **STRUCTURAL PLACEHOLDER / NOT YET IMPLEMENTED**  
> Compiled LLM Wiki runtime pages do NOT exist yet in this repository.  
> Do NOT assume a compiled knowledge engine is active.

---

### D. Episodic & Historical Memory
*Raw evidence, historical runs, migration proofs, audit logs, and examination records.*

- [`research/legacy-evidence/`](research/legacy-evidence/): Immutable raw evidence from `JayGarland/nexus` commit `c073099481f9faa3...`.
- [`research/migration/`](research/migration/): 31-file migration manifest, payload SHA hashes, and execution logs.
- [`research/examinations/`](research/examinations/): Historical citation examination reports and raw evidence snapshots.
- [`research/audit/PERSISTENT_MEMORY_STRUCTURE_AUDIT.md`](research/audit/PERSISTENT_MEMORY_STRUCTURE_AUDIT.md): Repository file inventory and authority audit.

---

### E. Procedural Memory
*Operating protocols, audit specifications, and agent behavioral rules.*

- [`AGENTS.md`](AGENTS.md): Neutral clean-room agent operating instructions.
- [`research/audit/REMOTE_FIRST_AUDIT_METHOD.md`](research/audit/REMOTE_FIRST_AUDIT_METHOD.md): 7-step mandatory remote-first push and audit protocol.

---

### F. Handoff & Re-entry Memory
*Inter-instance communication, milestone handoffs, and wake-up entry.*

- [`WAKE.md`](WAKE.md): **Mandatory single re-entry entrance**.
- [`handoff/HELLO.md`](handoff/HELLO.md): Later-instance session handoff summary.
- [`handoff/SESSION_LOG.md`](handoff/SESSION_LOG.md): Append-only session milestone log.

---

### G. Evolution Memory
*Git commit history, version tags, and decision audit logs.*

- **Git Commit History**: `git log --oneline` tracks explicit change lineage.
- **Decision Lineage**: Recorded in `handoff/SESSION_LOG.md` and `state/CURRENT_VERDICT.md`.
