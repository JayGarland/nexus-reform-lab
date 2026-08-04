# Stigmergy Carrier & Artifact Taxonomy

> **Document Status**: `CONCEPT CLARIFICATION — CONFIRMED FOR CONCEPTUAL SCOPE`
> **Scope**: Conceptual clarification of Stigmergy, its carriers, artifact types, signals, optional extensions, and the Nexus boundary. Confirmed as a concept boundary by outside review; it is NOT immutable permanent architecture and MAY evolve through a formal proposal.
> **Related**: [`MODULARITY_AND_REPLACEABILITY_DOCTRINE.md`](MODULARITY_AND_REPLACEABILITY_DOCTRINE.md), [`FIVE_POINT_FRAMEWORK.md`](FIVE_POINT_FRAMEWORK.md), [`PERSISTENT_WORLD_OBJECT_MODEL.md`](PERSISTENT_WORLD_OBJECT_MODEL.md) (`CONCEPT MODEL — UNDER OUTSIDE REVIEW`)

---

## 1. Stigmergy

Stigmergy is:

```text
environment-mediated coordination concept
and capability boundary
```

It is NOT:

```text
a file
a mailbox
a queue
Beads
GitHub Issues
a database
a single Provider product
```

A trace in the environment only acts as a pheromone when it can influence a subsequent Agent's discovery, judgment, claim, block, review, or action.

## 2. Carrier

Pheromone carriers may include, but are not limited to:

```text
files
records
state flags
events
queues
issues
labels
Git refs
locks
leases
notifications
future environment-visible signals
```

Files are the most important carrier today, but not the only one.

The Stable Kernel only requires a trace to be:

```text
environment-visible
attributable
persistent or durably recoverable where required
auditable
exportable
replaceable
compatible with rollback
```

`Stigmergy = Files` MUST NOT be written as an architectural identity.

## 3. Artifact Types

Files or other carriers may carry different Artifact types, for example:

```text
Letter
Document
Work Item
Wiki Page
Log
Verdict
Proposal
Evidence
Claim
Lease
Handoff
WAKE
```

These are replaceable Artifact types, not Stigmergy itself, and need not be permanently bound to a file implementation. The same Artifact type may in the future be expressed by different carriers, provided its identity, provenance, state semantics, export, and rollback contract remain explicit.

## 4. Stigmergic Signals

A Coordination Provider may interpret from Artifact or Carrier state:

```text
ready
blocked
claimed
leased
completed
review-needed
rejected
superseded
expired
retryable
```

These semantics MUST NOT be permanently bound to a specific field, directory, Label, or database schema.

## 5. Optional Extensions

The following are pluggable extensions, not part of the Stable Kernel, and MUST NOT be the sole source of canonical truth:

```text
Inbox / Outbox
Letter transport
async workboard
Kanban surface
notification system
poll / wake mechanism
nightly routine
scheduled maintenance
automatic dispatch
```

Boundaries:

- Inbox/Outbox MAY act as a Transport / Notification Adapter.
- A work queue's canonical state belongs to the Coordination capability; it is not the mailbox itself.
- Notification and canonical work state MUST be separable.
- Nightly Routine is only an optional trigger / maintenance extension.
- Automatic dispatch MUST NOT bypass Protocol Governance and the box-outside approval boundary.

## 6. Nexus Boundary

Legacy Nexus concepts MAY be attached via Adapter or Module, for example:

```text
Letter Module
Inbox / Outbox Adapter
cc-connect Execution Bridge
Archive Import Adapter
Thread Projection Module
Product / Domain Adapter
```

But they MUST NOT:

```text
- become a precondition of the Stable Kernel
- require Providers to read legacy Nexus private state
- write legacy fields or directories into permanent Contracts
- be moved wholesale into the Reform Lab
- take over canonical state without shadow comparison, an outside verdict, and rollback
```

`nexus-reform-lab` must remain clean-room, model-neutral, product-neutral, and implementation-neutral.

---

*End of concept clarification.*
