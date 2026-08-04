# Layered World Runtime Model

> **Document Status**: `CONCEPT MODEL — CONFIRMED FOR CONCEPTUAL SCOPE`
> **Reviewed Commit**: `8e05d6a8395edf3fb85a51be0c0fa5ea085383a5`
> **Purpose**: Define the layered separation between Concept, Contract / Protocol, Provider / Engine, Runtime / Orchestration, Persistent World Instance, and Outside Governance, so that no single Engine, Runtime, or box AI can claim a Concept is landed just because it was installed or invoked.
> **Scope**: Conceptual layering only. This model defines responsibilities, not an implementation. No Runtime, Room engine, Session launcher, or Workspace resolver is implemented or selected. No concrete implementation, Engine, Runtime, Session launcher, Workspace resolver, or production readiness is confirmed.
> **Confirmed Scope**: Concept Layer; Contract / Protocol Layer; Provider / Engine Layer; Runtime / Orchestration Layer; Persistent World Instance Layer; Outside Governance Layer; installing an Engine does not mean its Concept is landed; Runtime only composes and advances work and gains no outside governance power; box AI, Engine, and Runtime must not self-approve.
> **Related**: [`PERSISTENT_WORLD_OBJECT_MODEL.md`](PERSISTENT_WORLD_OBJECT_MODEL.md) (`CONFIRMED FOR CONCEPTUAL SCOPE`), [`PERSISTENT_ROOM_AND_WORKSPACE_BINDING.md`](PERSISTENT_ROOM_AND_WORKSPACE_BINDING.md) (`CONFIRMED FOR CONCEPTUAL SCOPE`), [`SEEDED_INSTANCE_CONTINUITY.md`](SEEDED_INSTANCE_CONTINUITY.md) (`CONFIRMED FOR CONCEPTUAL SCOPE`), [`WORK_ITEM_MINIMUM_CONTRACT.md`](../contracts/WORK_ITEM_MINIMUM_CONTRACT.md) (`CONFIRMED FOR SEMANTIC CONTRACT SCOPE`), [`PERSISTENT_SCOPE_TOPOLOGY.md`](PERSISTENT_SCOPE_TOPOLOGY.md) (`CONFIRMED FOR CONCEPTUAL SCOPE`), [`PROTOCOL_GOVERNANCE_MINIMUM_CONTRACT.md`](../contracts/PROTOCOL_GOVERNANCE_MINIMUM_CONTRACT.md) (`SEMANTIC CONTRACT — CONFIRMED FOR SEMANTIC CONTRACT SCOPE`), [`BOUNDED_RUNTIME_EXECUTION_AND_RECOVERY_MINIMUM_CONTRACT.md`](../contracts/BOUNDED_RUNTIME_EXECUTION_AND_RECOVERY_MINIMUM_CONTRACT.md) (`SEMANTIC CONTRACT — CONFIRMED FOR SEMANTIC CONTRACT SCOPE`), [`EVALUATION_BASELINE_AND_VERDICT_LOOP_MINIMUM_CONTRACT.md`](../contracts/EVALUATION_BASELINE_AND_VERDICT_LOOP_MINIMUM_CONTRACT.md) (`DRAFT SEMANTIC CONTRACT — UNDER OUTSIDE REVIEW`)

---

## Six Layers

### 1. Concept Layer

Answers:

```text
What capability or principle exists?
```

Includes but is not limited to:

```text
Artifact-first persistence
Environment-mediated coordination / Stigmergy
Current Knowledge
Software 3.0
AutoResearch
Persistent World
Seeded continuity
External adjudication
Replaceability
```

A Concept only defines meaning, capability, and boundaries. It does not run by itself.

### 2. Contract / Protocol Layer

Answers:

```text
What semantics and rules must implementations obey?
```

Includes:

```text
Artifact Contract
Work Item Contract
Provider Contract
Claim / Lease rules
Review / Verdict rules
Seed / Handoff obligations
Protocol identity, version, scope and precedence
permissions and forbidden actions
export / migration / rollback requirements
```

Relation:

```text
Concept
→ formalized as Contract or Protocol
→ persisted as inspectable Artifact
→ interpreted by Engine and Runtime
```

Software 3.0 primarily acts on this layer, but is not limited to it.

### 3. Provider / Engine Layer

Answers:

```text
Which replaceable implementation provides a capability?
```

Examples:

```text
Knowledge Projection Engine
Coordination Engine
Protocol Governance Engine
Evaluation Engine
Runtime / Re-entry Engine
```

Concrete implementations may be:

```text
base-llm-wiki
Astro-Han
Beads
GitHub Issues
OPA-like engine
promptfoo-like evaluator
future engines
```

Installing an Engine does NOT mean its corresponding Concept is fully landed.

An Engine MUST obey the Contract and support the necessary:

```text
export
inspection
replacement
shadow comparison
migration
rollback
```

### 4. Runtime / Orchestration Layer

Answers:

```text
How are Engines composed and how does work actually advance?
```

A future Runtime may be responsible for:

```text
selecting a Room
placing a fresh instance into that Room (waking in Room)
assembling a Seed
resolving authorized Workspace Bindings
finding or continuing Work Items
Claim / Lease interaction
launching a fresh instance
providing protocols and permissions
capturing outputs and traces
handling exit and Handoff
submitting Review
recovering stale attempts
stopping safely
```

This model only defines responsibilities; it is not implemented.

A Runtime MUST NOT:

- expand its own authorization
- approve its own outputs
- select a new Provider by itself
- scan the entire host machine to find projects
- bypass Protocol Governance
- start unbounded autonomy

### 5. Persistent World Instance Layer

Answers:

```text
Which concrete persistent world is being inhabited?
```

Examples:

```text
Nexus Reform World
Resonova Product World
Official Nexus World
Research World
```

A World Instance holds concrete:

```text
Concepts / Protocols
Rooms
Artifacts
Work Items
Current Knowledge
History
Provider bindings
Workspace references
Review and Verdict
stigmergic traces
```

World identity does NOT equal some fixed parent directory, although it may currently be carried by a Git repository and its Artifact set.

The Persistent World Instance Layer MAY contain an extensible Persistent Scope Topology (see [`PERSISTENT_SCOPE_TOPOLOGY.md`](PERSISTENT_SCOPE_TOPOLOGY.md), `CONCEPT MODEL — UNDER OUTSIDE REVIEW`):

- Runtime MUST NOT assume a fixed `World → Room` depth.
- Runtime MUST locate the wake scope through the Scope Registry and authorized relations.
- The current minimum implementation still uses Room as the wake scope.

### 6. Outside Governance Layer

This layer spans all layers and is responsible for:

```text
concept approval
contract ratification
Provider selection and replacement
Runtime permission boundaries
acceptance criteria
safety boundaries
irreversible action approval
final verdict
write-back authorization
Nexus connection authorization
```

A box AI, Engine, or Runtime MUST NOT take over outside governance power by itself.

---

*End of concept model.*
