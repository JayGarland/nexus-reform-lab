# MEMORY_MAP.md — Project Persistent Memory Structure Map

> **Purpose**: Master navigation map organizing project memory categories. Current state lives in exactly one file; history lives read-only under `archive/`.

---

## 1. Memory Hierarchy & Authority Precedence

```text
1. state/CURRENT.md                                       [Single Current-State Authority]
   ↓
2. Canonical Doctrine Documents                           [Architectural Authority]
   ↓
3. Ratified Protocols & Invariants                        [Safety & Procedural Authority]
   ↓
4. Raw Evidence & Execution Logs                          [Historical Provenance]
   ↓
5. Archive (archive/)                                     [Read-Only History]
   ↓
6. Chat Summaries & Transcripts                           [Lowest Authority / Navigation Only]
```

---

## 2. Memory Category Map

### A. Identity & Doctrine Memory

- [`REVOLUTION.md`](REVOLUTION.md): Foundational manifesto terminating letter-centric governance.
- [`research/synthesis/FIVE_POINT_FRAMEWORK.md`](research/synthesis/FIVE_POINT_FRAMEWORK.md): **Sole Canonical Specification** of One World Substrate + 4 Orthogonal Layers.
- [`research/synthesis/LLM_WIKI_CURRENT_KNOWLEDGE_SYSTEM.md`](research/synthesis/LLM_WIKI_CURRENT_KNOWLEDGE_SYSTEM.md): Specification for incremental knowledge compilation.
- [`research/synthesis/MODULARITY_AND_REPLACEABILITY_DOCTRINE.md`](research/synthesis/MODULARITY_AND_REPLACEABILITY_DOCTRINE.md): Canonical Doctrine governing Stable Kernel, Provider replaceability, Replacement lifecycle, Model neutrality, and outside-controlled architecture change.
- [`CHARTER.md`](CHARTER.md): Clean-room lab operating charter.
- [`INVARIANTS.md`](INVARIANTS.md): Immutable safety boundaries and non-negotiable rules.

---

### B. Current Working Memory

- [`state/CURRENT.md`](state/CURRENT.md): **The single authoritative current-state file** — phase, focus, audit status, authorized next action, active prohibitions, open questions, integrated probe evidence register, canonical links. A phase update edits ONLY this file.

---

### C. Prior-Art & Probe Work — Preserved / Under Outside Review (Not Currently Authorized)

- [`research/prior-art/CANDIDATE_REFRESH_COORDINATION_AND_DURABLE_RUNTIME.md`](research/prior-art/CANDIDATE_REFRESH_COORDINATION_AND_DURABLE_RUNTIME.md): Candidate refresh submitted for outside review; not currently authorized.
- [`research/probes/COORDINATION_AND_DURABLE_RUNTIME_PROBE_PLAN.md`](research/probes/COORDINATION_AND_DURABLE_RUNTIME_PROBE_PLAN.md): Unified probe plan submitted for outside review; E3 probes are not authorized; not currently authorized.
- [`research/governance/CONCEPT_AND_CONTRACT_EXPANSION_FREEZE.md`](research/governance/CONCEPT_AND_CONTRACT_EXPANSION_FREEZE.md): Active governance boundary (Concept and Contract expansion remains frozen).
- [`research/probes/e3/`](research/probes/e3/): Raw E3 probe evidence (astro-han-llm-wiki, base-llm-wiki, beads, go-workflows, restate). Preserved, immutable evidence — preserved reference only; not currently authorized.

---

### D. Episodic & Historical Memory (Archived)

All historical content is preserved read-only under [`archive/`](archive/ARCHIVE_INDEX.md):

- Old split state registers (phase / verdict / next action / open questions / state model / external verdict history).
- Drift-period verifier + tests + logs.
- `handoff/SESSION_LOG.md` milestone log.
- Citation examinations, old contracts, old roadmaps / E3 plans / E3 queue, Contract-to-Probe matrix, old E1/E2 surveys, old audits, findings, migration records, concept models, superseded drafts.

---

### E. Procedural Memory

- [`AGENTS.md`](AGENTS.md): Neutral clean-room agent operating instructions.

---

### F. Handoff & Re-entry Memory

- [`WAKE.md`](WAKE.md): **Mandatory single re-entry entrance**.
- [`handoff/HELLO.md`](handoff/HELLO.md): Short inter-instance session handoff summary.

---

### G. Evolution Memory

- **Git Commit History**: Resolved dynamically via `git log --oneline` or `git rev-parse HEAD`.
- **Archive Index**: [`archive/ARCHIVE_INDEX.md`](archive/ARCHIVE_INDEX.md).

---

*End of memory map.*
