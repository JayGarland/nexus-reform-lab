# Modularity & Replaceability Doctrine Proposal — Foundation 0.5

> **Document Status**: `PROPOSAL — UNDER OUTSIDE REVIEW (Foundation 0.5)`
> **Scope**: Bounded proposal defining the stable architectural kernel and replaceable capability providers for the Nexus Reform Lab.
> **Non-Canonical Notice**: This document is a PROPOSAL. It is NOT canonical Doctrine and MUST NOT be treated as ratified architecture until an outside verdict authorizes it. It does not amend, override, or supersede `FIVE_POINT_FRAMEWORK.md`.

---

## 1. Problem Statement

The current architecture is described as "Four-Layer One-World" (`FIVE_POINT_FRAMEWORK.md`): One Persistent Artifact World Runtime serving as a continuous substrate within which four orthogonal layer mechanisms operate (Stigmergy, LLM Wiki / Current Knowledge, Software 3.0 Protocol Governance, Controlled AutoResearch).

Risk: a single coherent doctrine can re-evolve into a rigid, non-detachable, tightly coupled system in which:

- The four layer mechanisms are treated as inseparable fixtures rather than replaceable capabilities;
- Names, data models, and implementations are permanently baked into the architecture;
- Model-specific behaviors become architectural invariants;
- No defined path exists to replace one capability, or to supersede the entire doctrine, while preserving state, provenance, and rollback guarantees.

**Core Stance**: Four-Layer One-World is the current canonical architectural hypothesis, not an eternal, non-replaceable architecture. The genuinely stable principles are:

```text
Artifact-first persistence
+
Environment-mediated coordination
```

### Artifact-first persistence

- Persistent continuity exists OUTSIDE any model instance.
- Canonical state MUST be inspectable, versioned, traceable, correctable, and exportable.
- Any Provider's internal database or model memory MUST NOT be the sole source of truth.
- Artifacts MAY be Markdown, JSON, Git-tracked artifacts, or any other open representation.
- The architecture does NOT require permanent binding to one specific file format.

### Environment-mediated coordination

- Work advances through observable, persistent traces in the environment.
- Later instances discover `ready`, `blocked`, `claimed`, `completed`, and related conditions from environment state.
- The system does NOT depend on one central AI staying online, remembering full context, or verbally dispatching all routine work.
- The architecture does NOT permanently bind to one specific tool named Stigmergy.

---

## 2. Stable Kernel

The Stable Kernel is a two-tier model: a small set of stable architectural constraints (the Kernel) and a set of replaceable capability modules (the Providers).

The Stable Architectural Kernel SHALL at minimum contain:

```text
Externalized persistent state
Artifact identity
Provenance and Git lineage
Current / historical / evidence separation
Environment-visible action traces
External adjudication boundary
Operator / Agent isolation
Exportability
Replaceability
Rollback
```

These are stable constraints, not concrete products. They constrain HOW any provider or artifact must behave; they do not dictate WHICH provider or file format must be used.

---

## 3. Replaceable Providers

Five replaceable capability slots are defined. The current "Four-Layer One-World" mechanisms map onto these slots for now, but existing names, data models, and implementations MUST NOT be permanently hardcoded as architectural requirements.

```text
Coordination Provider
Knowledge Projection Provider
Protocol Governance Provider
Experiment / Evaluation Provider
Runtime / Re-entry Provider
```

| Provider Slot | Current Mapping (non-normative) |
|---|---|
| Coordination Provider | Stigmergy (Layer 1) |
| Knowledge Projection Provider | LLM Wiki / Current Knowledge (Layer 2) |
| Protocol Governance Provider | Software 3.0 Protocol Governance (Layer 3) |
| Experiment / Evaluation Provider | Controlled AutoResearch (Layer 4) |
| Runtime / Re-entry Provider | Persistent Artifact World Runtime (the One World substrate) |

Providers are replaceable units. No provider MAY require another provider to understand its private internal structures.

---

## 4. Provider Contract

Every Provider MUST declare the following contract fields:

```text
provider_id
provider_version
capability
inputs
outputs
canonical_artifacts_read
canonical_artifacts_written
private_state
external_dependencies
failure_modes
export_format
import_format
shadow_mode
rollback_method
removal_effect
security_boundary
```

Three state classes MUST be distinguished for every provider:

```text
Canonical World State
Provider-derived projection
Provider-private operational state
```

- **Canonical World State**: the inspectable, versioned, traceable source of truth (Artifact-first).
- **Provider-derived projection**: a derived view of canonical state; lossy but traceable back to canonical artifacts.
- **Provider-private operational state**: internal state of a provider.

Provider-private state MUST NOT become a shared internal structure that other modules are required to read directly. No module MAY depend on another provider's private database or memory as a required input.

---

## 5. Replacement Lifecycle

Any Provider replacement MUST follow the sequence:

```text
Inventory
→ Export
→ Import
→ Shadow Run
→ Compare
→ Outside Verdict
→ Switch
→ Observe
→ Rollback if required
```

The Replacement Gate MUST answer all of the following:

1. What did the old Provider store?
2. Which of that is Canonical State?
3. Which of that is discardable cache or projection?
4. How will the new Provider import it?
5. How will shadow comparison be performed?
6. Which fixed metrics are compared?
7. Who approves the switch?
8. How is rollback performed?
9. Is provenance lost after replacement?
10. Can other modules keep running after the old Provider is removed?

---

## 6. Box-In / Box-Outside Boundary

### Box-In Canonical Architecture
Visible to box-in agents; mutation and ratification remain outside-controlled.

Box-In Canonical Architecture is visible to agents, but it is NOT authority that agents may modify or ratify on their own. The following must be kept distinct:

```text
Agent-readable
≠
Agent-modifiable
≠
Agent-ratifiable
```

Inside the box, the architecture MAY hold:

```text
Artifact-first persistence
Environment-mediated coordination
Replaceable Provider model
Export / import / shadow / rollback obligations
External adjudication required
```

### Box-Outside Governance (reserved for outside reviewers)

Outside the box remain:

```text
Provider replacement approval
Acceptance criteria
Model selection
Safety boundaries
Irreversible-action approval
Final verdict
Write-back authorization
```

**In-box AI MUST NOT**:

- modify the Stable Kernel on its own;
- approve a Kernel amendment on its own;
- approve a Provider replacement on its own;
- lower migration, rollback, evidence, or safety gates on its own;
- declare that a new architecture has already superseded the old one.

---

## 7. Model-Neutrality Rule

> Model profiles are provisional operational observations, not architectural invariants.

The architecture MUST NOT be permanently designed as a patch collection for any specific model simply because that model:

- likes self-confirmation;
- tends to ignore evidence;
- is particularly fast or slow;
- is bad at global auditing.

Model-specific measures belong in:

```text
Model Adapter
Execution Profile
Temporary Guardrail
Role Assignment
```

These are execution-level or assignment-level artifacts, NOT Stable Kernel constraints.

Examples:

- "For Gemini, do not self-announce completion" MAY be an execution profile.
- "For DeepSeek, long-horizon audit configuration" MAY be a task profile.
- Neither MAY become a model-binding rule of permanent Nexus Doctrine.

---

## 8. Migration and Rollback

- Every step of a replacement MUST be committed with evidence before progress is claimed.
- History is preserved in append-only raw form; failed experiments are logged as historical evidence and rolled back cleanly.
- Any replacement that loses provenance, canonical state fidelity, or rollback capability FAILS the Replacement Gate.
- Rollback must restore the prior provider and its canonical state without requiring reconstruction from memory.
- Removal of an old Provider must not strand other providers: each provider's `removal_effect` and `external_dependencies` must be declared and reviewed before removal.

---

## 9. Open Questions

1. What is the formal minimum set of Stable Kernel invariants that outside review will mandate before any Provider may be swapped?
2. What is the exact wire format and isolation boundary for shadow-run comparison between Providers?
3. How are canonical-artifact schemas versioned across provider replacements without breaking environment-visible traces?
4. What fixed metrics are mandatory for the Compare step of every Replacement Gate?
5. Which existing names (`Stigmergy`, `LLM Wiki`, `Software 3.0`, `AutoResearch`, `World`) may be retained as implementation names, and which are replaced by generic slot identifiers in doctrine?

---

## 10. Non-Goals

This proposal does NOT:

- implement any capability provider (Current Knowledge, Stigmergy, Protocol-as-Software Runtime, AutoResearch, or a new World Runtime);
- authorize, start, or modify `CR-S0`;
- amend, override, or supersede `FIVE_POINT_FRAMEWORK.md` or any ratified doctrine;
- define a specific provider implementation or data model;
- change the Box-Outside adjudication authority;
- weaken any migration, rollback, safety, or fail-closed gate;
- claim that execution-process behavior is externally confirmed; such claims remain `CLAIMED-NOT-EVIDENCED` until an outside verdict.

---

*End of Proposal — submitted for outside review.*
