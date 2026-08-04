# Persistent World Object Model

> **Document Status**: `CONCEPT MODEL — CONFIRMED FOR CONCEPTUAL SCOPE`
> **Reviewed Commit**: `5f2f7aede05093101be7bd536849b5085e047ee9`
> **Purpose**: Clarify the categories, relations, and replaceable boundaries of the different objects inside the Persistent World, so that Provider, Artifact, Work Item, file, and pheromone are not all conflated into a generic `item`.
> **Scope**: Conceptual model only. This is a semantic classification, not an implementation schema; it does not require a corresponding physical directory layout or database table design. Confirmed for conceptual scope; no directory schema, database schema, Runtime, Room engine, Session launcher, Workspace resolver, Provider or carrier selection, official Nexus integration, or production readiness is confirmed.
> **Related**: [`STIGMERGY_CARRIER_AND_ARTIFACT_TAXONOMY.md`](STIGMERGY_CARRIER_AND_ARTIFACT_TAXONOMY.md) (`CONFIRMED FOR CONCEPTUAL SCOPE`), [`SEEDED_INSTANCE_CONTINUITY.md`](SEEDED_INSTANCE_CONTINUITY.md) (`CONFIRMED FOR CONCEPTUAL SCOPE`), [`WORK_ITEM_MINIMUM_CONTRACT.md`](../contracts/WORK_ITEM_MINIMUM_CONTRACT.md) (`CONFIRMED FOR SEMANTIC CONTRACT SCOPE`), [`FOUR_LAYER_ONE_WORLD_MINIMUM_LANDING_ROADMAP.md`](../plans/FOUR_LAYER_ONE_WORLD_MINIMUM_LANDING_ROADMAP.md) (`CONFIRMED FOR ROADMAP SCOPE`), [`LAYERED_WORLD_RUNTIME_MODEL.md`](LAYERED_WORLD_RUNTIME_MODEL.md) (`CONFIRMED FOR CONCEPTUAL SCOPE`), [`PERSISTENT_ROOM_AND_WORKSPACE_BINDING.md`](PERSISTENT_ROOM_AND_WORKSPACE_BINDING.md) (`CONFIRMED FOR CONCEPTUAL SCOPE`), [`PROTOCOL_GOVERNANCE_MINIMUM_CONTRACT.md`](../contracts/PROTOCOL_GOVERNANCE_MINIMUM_CONTRACT.md) (`SEMANTIC CONTRACT — CONFIRMED FOR SEMANTIC CONTRACT SCOPE`), [`BOUNDED_RUNTIME_EXECUTION_AND_RECOVERY_MINIMUM_CONTRACT.md`](../contracts/BOUNDED_RUNTIME_EXECUTION_AND_RECOVERY_MINIMUM_CONTRACT.md) (`SEMANTIC CONTRACT — CONFIRMED FOR SEMANTIC CONTRACT SCOPE`), [`EVALUATION_BASELINE_AND_VERDICT_LOOP_MINIMUM_CONTRACT.md`](../contracts/EVALUATION_BASELINE_AND_VERDICT_LOOP_MINIMUM_CONTRACT.md) (`SEMANTIC CONTRACT — CONFIRMED FOR SEMANTIC CONTRACT SCOPE`)

---

## 1. Top-Level Model

```text
Persistent World
├─ Concepts / Semantics
├─ Protocol Artifacts / Software 3.0
├─ Providers / Replaceable Modules
├─ Artifacts
├─ Work Items
├─ Carriers
├─ Runtime Traces
├─ History / Evidence
└─ Stigmergic Effects
```

Clarifications:

- These categories MAY have cross-cutting relations.
- They do NOT have to map to fixed directories.
- They do NOT have to map to separate database tables.
- This is a semantic classification, not an implementation schema.
- The generic `item` is NOT used to refer to all categories.
- `Work Item` retains its defined formal work semantics.

## 2. Concepts / Semantics

A Concept is a stable understanding, principle, or semantic in the World, for example:

```text
Artifact-first persistence
Environment-mediated coordination
External adjudication
Replaceability
Rollback
Seeded continuity
Executor cannot self-accept
```

A Concept itself is not necessarily an executable Protocol.

Relations:

```text
Concept
→ formalized into Protocol
→ Protocol persisted as Artifact
→ Runtime / Agent interprets and follows Protocol
```

A non-formalized Concept may still exist as a Doctrine or Synthesis Artifact, but it MUST NOT automatically claim executable binding force.

## 3. Protocol Artifacts / Software 3.0

A Protocol is a versioned, scoped, governable expression of a Concept.

It may contain:

```text
rules
permissions
forbidden actions
state transitions
approval requirements
precedence
version
scope
validation
rollback
review boundaries
```

A Protocol MUST exist as an inspectable Artifact and MAY be versioned, tested, deprecated, replaced, and rolled back.

A Protocol can also function as a pheromone, because a later instance that reads it will change its behavior.

However:

```text
Concept ≠ automatically executable Protocol
Protocol ≠ immutable eternal truth
```

## 4. Providers / Replaceable Modules

A Provider is a replaceable capability module that processes, projects, coordinates, governs, or executes World objects.

Current capability categories include:

```text
Knowledge Projection Provider
Coordination Provider
Protocol Governance Provider
Experiment / Evaluation Provider
Runtime / Re-entry Provider
```

For example:

```text
LLM Wiki
```

should be described as:

```text
a replaceable Knowledge Projection Provider implementation
```

NOT as:

```text
the Persistent World
a Work Item
a permanent kernel component
```

An LLM Wiki may generate and maintain:

```text
Wiki Pages
Indexes
Logs
Provenance
Current / Superseded Knowledge
```

If a better Provider appears, replacement follows:

```text
export
→ shadow comparison
→ migration
→ outside verdict
→ replacement
→ rollback if required
```

Provider-private state MUST NOT become a non-exportable unique canonical truth.

## 5. Artifacts

An Artifact is a persistent, inspectable, referable, traceable expression in the environment.

Artifact types may include:

```text
Protocol
Work Item Artifact
Letter
Document
Wiki Page
Evidence
Verdict
Proposal
Handoff
WAKE
Log
Claim
Lease
Review
Execution Trace
```

An Artifact is a semantic category; it is NOT a file.

Many current Artifacts are carried by files, but future Artifacts may be expressed by other carriers.

The following distinction MUST hold:

```text
Work Item
= bounded authorized work semantics

Work Item Artifact
= that Work Item's persistent representation
```

Similarly:

```text
Protocol
= governed behavioral semantics

Protocol Artifact
= persistent representation of that Protocol
```

## 6. Work Items

A Work Item is a special work semantics within the Artifact types, but it additionally owns an independent state machine, Claim / Lease, execution attempts, and a Review lifecycle.

A Work Item is NOT:

```text
generic name for every world object
Provider
Seed
file
Wiki system
```

A Work Item MAY:

- span multiple fresh instances
- span multiple execution attempts
- be carried by files, Issues, a database, or other carriers
- keep a stable `work_item_id` across carrier migration

## 7. Carriers

A Carrier is the implementation medium that carries an Artifact, a state, or an environment signal.

Carriers may include:

```text
Files
Git
Events
Queues
Issues
Labels
Database records
Kanban cards
Locks
Leases
Notifications
Future environment-visible signals
```

Files are currently the most important carrier, but not the only one.

A Wiki is currently carried by files:

```text
Files
└─ Wiki Artifacts
   ├─ Wiki Page
   ├─ Index
   ├─ Log
   └─ Provenance
```

But this MUST NOT be written as a permanent relation:

```text
Wiki semantics = files forever
```

The correct relation is:

> Current Wiki Artifacts are carried by files; Wiki semantics and the Knowledge Projection capability MUST NOT be permanently bound to a file implementation.

## 8. Git History

Git History is classified as:

```text
history / lineage / evidence carrier
```

It can preserve:

- changes
- parent relationships
- supersession
- failed attempts
- external adjudications
- rollback entry points
- the evolution path of current state

Git History also functions as a pheromone when a later instance reads it and it affects that instance's judgment or action.

But it MUST NOT be simplistically defined as:

```text
Git History = Stigmergy
```

More precisely:

```text
Git History
+ observable meaning
+ effect on later action
→ stigmergic effect
```

## 9. Stigmergy

Stigmergy is NOT a plain object category placed alongside File, Artifact, or Provider.

It is a principle that runs through the Persistent World:

```text
environment-mediated coordination principle
and observable causal effect
```

Form:

```text
Artifact / state / event / history
→ becomes observable to a later instance
→ changes discovery, judgment, claim, blocking, review, or action
→ functions as a stigmergic trace
```

Therefore, not every Artifact automatically functions as a pheromone.

Only when it:

- is observable
- has interpretable meaning
- affects later action

does it have an actual stigmergic effect.

Expression:

```text
Artifact or Environment Trace
+
Observable Meaning
+
Effect on Later Action
=
Stigmergic Trace
```

## 10. Restriction on the Term `item`

This document clarifies:

> `item` is NOT used as the unified formal name for all World Objects.

Reasons:

- `Work Item` already has formal semantics.
- Calling Provider, Artifact, file, and Work Item all `item` destroys type boundaries.
- Later Contract, Runtime, and Adapter implementations could not determine what an `item` refers to.

Natural language such as "a module" or "an object" is allowed, but the formal model uses:

```text
World Object
Provider
Artifact
Work Item
Protocol
Carrier
Trace
```

## 11. Suggested Unified Structure

The following is a non-implementation model:

```text
Persistent World
│
├─ Stable Concepts / Semantics
│  ├─ Artifact-first persistence
│  ├─ Environment-mediated coordination
│  ├─ External adjudication
│  ├─ Replaceability
│  └─ Seeded continuity
│
├─ Protocol Artifacts / Software 3.0
│  ├─ rules
│  ├─ permissions
│  ├─ state transitions
│  ├─ approval boundaries
│  └─ rollback
│
├─ Providers / Replaceable Modules
│  ├─ Knowledge Projection / LLM Wiki
│  ├─ Coordination
│  ├─ Protocol Governance
│  ├─ Evaluation
│  └─ Runtime / Re-entry
│
├─ Artifact Types
│  ├─ Work Item
│  ├─ Protocol
│  ├─ Letter
│  ├─ Document
│  ├─ Wiki Page
│  ├─ Evidence
│  ├─ Verdict
│  ├─ Handoff
│  └─ Execution Trace
│
├─ Carriers
│  ├─ Files
│  ├─ Git
│  ├─ Events
│  ├─ Queues
│  ├─ Issues / Labels
│  └─ Databases
│
├─ Runtime Traces and History
│
└─ Stigmergic Effects
   └─ the observable parts above that affect later action
```

This is a concept model; a physical directory layout is NOT required to correspond exactly.

## 12. Seed in the Object Model

A Seed is NOT a new permanent object category placed alongside Artifact or Provider.

A Seed is:

```text
a selected and organized entry view
over existing World Objects and stigmergic traces
```

It may contain Artifacts, Work Item state, Protocols, Git history, Current Knowledge, and Runtime Traces.

A Seed itself may be persisted as a Handoff / WAKE Artifact, but "Seed semantics" primarily means the entry view, not a fixed file format.

## 13. Legacy Nexus Boundary

Legacy Nexus concepts may be mapped as:

```text
Letter → Artifact type or transport envelope
Thread → conversation or Work Item projection
Inbox / Outbox → carrier / transport / notification adapter
Archive → historical evidence and import source
cc-connect → execution bridge
```

The top-level Object Model MUST NOT be changed by these mappings:

- Letter is NOT the foundational atom of the World.
- Thread is NOT the fixed body of every Work Item.
- Inbox is NOT canonical Coordination state.
- cc-connect is NOT a Provider Judge.
- Archive is NOT uncompiled Current Truth.

---

*End of concept model proposal.*
