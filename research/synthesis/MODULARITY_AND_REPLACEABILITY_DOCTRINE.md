# Modularity & Replaceability Doctrine — Canonical Doctrine

> **Status**: `CANONICAL DOCTRINE`
> **Authority**: Architectural Modularity and Replaceability
> **Ratified by**: Box-Outside Review (Foundation 0.5, `CONFIRMED FOR DOCTRINE SCOPE`)
> **Supersedes**: None
> **Does not supersede**: `FIVE_POINT_FRAMEWORK.md`

---

## 1. Relationship to the Five-Point Framework

The Nexus architecture is governed by two complementary canonical documents. They MUST NOT be merged into a single file:

```text
FIVE_POINT_FRAMEWORK.md
→ Current capability/responsibility model (One World Substrate + Four Orthogonal Layers)

MODULARITY_AND_REPLACEABILITY_DOCTRINE.md
→ Rules that these capabilities MUST NOT be tightly coupled, MUST be replaceable,
  and that the current capability model MAY be wholly superseded in the future
```

This Doctrine constrains HOW the capabilities defined by `FIVE_POINT_FRAMEWORK.md` may be coupled, replaced, or superseded. It does not redefine those capabilities.

---

## 2. Stable Kernel

The following are stable architectural constraints (not concrete products):

```text
Artifact-first persistence
Environment-mediated coordination
Artifact identity
Provenance and lineage
Current / historical / evidence separation
Environment-visible action traces
External adjudication boundary
Operator / Agent isolation
Exportability
Replaceability
Rollback
```

**Stable does not mean eternally immutable.**

The Stable Kernel MAY be replaced by a better architecture, but ONLY through:

```text
Proposal
→ Evidence
→ Shadow Comparison
→ Outside Verdict
→ Controlled Migration
→ Rollback Availability
→ Canonical Write-Back
```

The Stable Kernel MUST NOT be changed by a box-in instance on its own.

---

## 3. Replaceable Capability Providers

Five capability slots are canonical as *slots*; their current bindings are not:

```text
Coordination Provider
Knowledge Projection Provider
Protocol Governance Provider
Experiment / Evaluation Provider
Runtime / Re-entry Provider
```

Each Provider:

- MAY be replaced individually;
- MUST NOT require another Provider to read its private operational state;
- MUST declare inputs, outputs, dependencies, failure modes, import, export, and rollback;
- when removed, MUST NOT leave other Providers unable to run due to hidden coupling;
- MUST NOT have a specific model, product, database, or field permanently written into the architecture as a requirement.

The following changes are permitted in the future, provided the Stable Kernel guarantees still hold or are replaced through the formal procedure:

- a new Provider replaces an old Provider;
- one Provider covers multiple existing capabilities;
- the current five-Provider model is wholly replaced;
- a new capability slot appears;
- two slots merge based on evidence.

---

## 4. Provider Contract

Every Provider MUST declare:

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

Three state classes MUST be kept distinct:

```text
Canonical World State
Provider-derived projection
Provider-private operational state
```

Provider-private operational state MUST NOT become canonical truth, and MUST NOT become a shared internal structure that other modules are required to read.

---

## 5. Replacement Lifecycle

Provider replacement MUST follow:

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

A replacement FAILS the gate if it loses provenance, canonical-state fidelity, or rollback capability.

---

## 6. Box-In / Box-Outside Boundary

Box-In Canonical Architecture is visible to box-in agents; mutation and ratification remain outside-controlled:

```text
Agent-readable
≠
Agent-modifiable
≠
Agent-ratifiable
```

Box-in instances MAY read and comply with the Stable Kernel. They MUST NOT, on their own:

- modify the Stable Kernel;
- approve a Kernel amendment;
- approve a Provider replacement;
- lower migration, rollback, evidence, or safety gates;
- declare that a new architecture has already superseded the old one.

The following remain outside the box:

```text
Provider replacement approval
Acceptance criteria
Model selection
Safety boundaries
Irreversible-action approval
Final verdict
Write-back authorization
```

---

## 7. Model-Neutrality Rule

```text
Model profiles are provisional operational observations.
They are not architectural invariants.
```

Model-specific content belongs only in:

```text
Model Adapter
Execution Profile
Temporary Guardrail
Role Assignment
```

The strengths or weaknesses of any current or future model MUST NOT permanently change the Stable Kernel or the Provider Contract.

---

## 8. Migration and Rollback

- Every replacement step MUST be committed with evidence before progress is claimed.
- History is preserved in append-only raw form; failed experiments are logged as historical evidence and rolled back cleanly.
- Rollback MUST restore the prior Provider and its canonical state without reconstruction from memory.
- `removal_effect` and `external_dependencies` of the old Provider MUST be declared and reviewed before removal.

---

## 9. Scope

This Doctrine does NOT:

- implement, bind, or select any Provider;
- alter the capability model defined by `FIVE_POINT_FRAMEWORK.md`;
- authorize `CR-S0`;
- change the box-outside adjudication authority;
- weaken any migration, rollback, evidence, or safety gate.

---

## Related Concept Clarification

- [`STIGMERGY_CARRIER_AND_ARTIFACT_TAXONOMY.md`](STIGMERGY_CARRIER_AND_ARTIFACT_TAXONOMY.md) — `CONCEPT CLARIFICATION — CONFIRMED FOR CONCEPTUAL SCOPE`. Not immutable permanent architecture; may evolve through a formal proposal. Clarifies that Stigmergy is an environment-mediated coordination concept/capability boundary, that carriers and artifact types are replaceable (not `Stigmergy = Files`), and that optional extensions and legacy Nexus adapters attach only through stable interfaces. Does not amend this Doctrine.

---

*Canonical Doctrine — ratified by box-outside review (Foundation 0.5).*
