# Persistent Room and Workspace Binding

> **Document Status**: `CONCEPT MODEL — CONFIRMED FOR CONCEPTUAL SCOPE`
> **Reviewed Commit**: `2cc39043519a307769e440de60f766df23031236`
> **Purpose**: Define Persistent World, Persistent Room, Workspace Binding, and Runtime Session, their persistence boundaries, and the wake-in-Room entry chain. Conceptual only; no Room engine, Session launcher, Workspace resolver, or directory schema is implemented, and no real Workspace path is resolved or scanned.
> **Confirmed Scope**: World persistent; Room persistent; Runtime Session and fresh instance transient; Room as the current local Persistent Scope type; the fresh instance currently wakes inside a Room; Room WAKE as the local recovery entry; World WAKE as an optional global routing entry; in the current file-first implementation a Room is normally carried by a persistent directory; Room identity is `room_id`, not the absolute path; a Room may reference external resources; Workspace Binding as an explicit authorized reference; product repository need not be nested inside the World or Room directory; Workspace access remains within the Room governance boundary; retainable pheromones, outputs, and state must be written back to the Scope before a Session exits; Room is the current profile, not the permanently unique local scope type.
> **Not Yet Confirmed**: concrete directory schema; Workspace resolver; Runtime; permission implementation; real paths.
> **Related**: [`PERSISTENT_WORLD_OBJECT_MODEL.md`](PERSISTENT_WORLD_OBJECT_MODEL.md) (`CONFIRMED FOR CONCEPTUAL SCOPE`), [`LAYERED_WORLD_RUNTIME_MODEL.md`](LAYERED_WORLD_RUNTIME_MODEL.md) (`CONFIRMED FOR CONCEPTUAL SCOPE`), [`SEEDED_INSTANCE_CONTINUITY.md`](SEEDED_INSTANCE_CONTINUITY.md) (`CONFIRMED FOR CONCEPTUAL SCOPE`), [`PERSISTENT_SCOPE_TOPOLOGY.md`](PERSISTENT_SCOPE_TOPOLOGY.md) (`CONFIRMED FOR CONCEPTUAL SCOPE`), [`PROTOCOL_GOVERNANCE_MINIMUM_CONTRACT.md`](../contracts/PROTOCOL_GOVERNANCE_MINIMUM_CONTRACT.md) (`SEMANTIC CONTRACT — CONFIRMED FOR SEMANTIC CONTRACT SCOPE`), [`BOUNDED_RUNTIME_EXECUTION_AND_RECOVERY_MINIMUM_CONTRACT.md`](../contracts/BOUNDED_RUNTIME_EXECUTION_AND_RECOVERY_MINIMUM_CONTRACT.md) (`SEMANTIC CONTRACT — CONFIRMED FOR SEMANTIC CONTRACT SCOPE`), [`EVALUATION_BASELINE_AND_VERDICT_LOOP_MINIMUM_CONTRACT.md`](../contracts/EVALUATION_BASELINE_AND_VERDICT_LOOP_MINIMUM_CONTRACT.md) (`DRAFT SEMANTIC CONTRACT — UNDER OUTSIDE REVIEW`)

---

## 1. World

The World is the persistent total environment. It may contain:

```text
global concepts
shared protocols
Provider bindings
Room registry
cross-Room governance
global history
shared knowledge
```

The World is persistent.

## 2. Room

A Room is:

> a persistent local world scope formed around a governance, knowledge, and work boundary that needs to co-evolve over the long term.

A Room is also persistent.

A Room is not necessarily partitioned by product. It may be partitioned by:

```text
product
project
domain
research line
migration program
security or review responsibility
long-lived experiment
```

The main criterion:

> Does this set of Artifacts, Work Items, Knowledge, Protocols, Workspace Bindings, and History need to be entered repeatedly over the long term and co-evolved by multiple fresh instances?

## 3. Room Identity

A Room has at least the following semantics:

```text
room_id
room_type
title
scope
authority_boundary
artifact_refs or artifact index
work_item_refs or work index
protocol_refs
workspace_bindings
knowledge_refs
history_refs
seed_entry_ref
```

These are semantic requirements, not a final schema.

`room_id` MUST be stable and MUST NOT change because a directory moves or a Workspace migrates.

## 4. Room and Physical Directory

In the current file-first implementation, a Room may and normally SHOULD be materialized as a persistent directory.

However:

- its stable identity is `room_id`, NOT its absolute path;
- it may reference resources outside that directory;
- moving the directory does NOT create a new Room;
- the directory is the current CARRIER of Room state, not the full definition of Room semantics.

So the earlier shorthand `Room ≠ one directory` is corrected to:

> A Room may and normally should be materialized as a persistent directory in the current file-first implementation. However:
> - its stable identity is `room_id`, not its absolute path;
> - it may reference resources outside that directory;
> - moving the directory does not create a new Room;
> - the directory is the current carrier of Room state, not the full definition of Room semantics.

A Room is still NOT:

```text
one Git repository
one Work Item
one Runtime Session
```

A Room is a logical persistent scope. It may reference Artifacts and Workspaces located in different places.

## 5. Product Room

A real product typically has a primary Room, for example:

```text
Resonova Product Room
Official Nexus Product Room
```

A Product Room may contain:

```text
product knowledge
product Work Items
product protocols
reviews and verdicts
workspace bindings
session history
handoffs
```

But the product repository does NOT have to be physically nested inside the World repository or the Room directory.

## 6. Domain / Research Room

For example:

```text
Knowledge Provider Research Room
Coordination Research Room
Security Review Room
Nexus Migration Room
```

Such Rooms may reference multiple products or repositories, but they MUST have a clear `authority_boundary` and MUST NOT implicitly take over another Room's canonical state.

## 7. Workspace Binding

A Workspace Binding is an authorized reference from a Room or Work Item to an external working space.

It may point to:

```text
local filesystem path
Git worktree
WSL path
remote repository checkout
container workspace
cloud development environment
remote server
```

Minimum semantics may include:

```text
workspace_binding_id
repository_id
workspace_uri
workspace_type
base_commit or revision
branch or worktree identity
access_mode
allowed_operations
forbidden_operations
credential boundary
binding_status
```

These are not a final schema.

### Workspace boundaries

```text
World governance scope
≠ filesystem parent directory

Room
≠ nested repository

Workspace
≠ canonical World state
```

A product repository may live at any local path or in a remote environment. The World governs it through a Workspace Binding, not through directory nesting.

### Authorized discovery

A fresh instance MUST NOT scan the host machine to find projects.

The safe flow is:

```text
read Room Seed
→ identify authorized Work Item
→ read declared Workspace Binding
→ validate access boundary
→ enter only the authorized Workspace
```

A Workspace Binding itself may function as a pheromone, because it affects where a later instance enters and what it may do.

## 8. Runtime Session

A Runtime Session is:

> the transient execution process formed when a fresh instance enters one or more authorized Rooms / Workspaces at a point in time.

A Runtime Session is transient.

The distinction MUST hold:

```text
World — persistent
Room — persistent
Work Item — persistent across attempts and instances
Workspace Binding — persistent or versioned reference
Runtime Session — transient
Fresh Instance — transient
Execution Attempt — persistent record of a transient execution
```

After a Session ends, retainable content MUST be written back to the Room / World:

```text
execution trace
code commit or revision
test evidence
Work Item state
Claim / Lease state
Review request
new knowledge
blockers
Handoff
recommended next action
Git lineage
```

## 9. Waking Inside a Room

A fresh instance wakes INSIDE a Room, not in the World root.

The entry chain is:

```text
enter World
→ locate target Room
→ read that Room's Seed / WAKE / Handoff
→ restore Room-local context
→ read the Room's Work Item, Protocol, Knowledge
→ find Workspace Binding
→ go to the external Workspace and work
→ write results back into the Room
```

The World root holds global things:

```text
common Doctrine
global Protocol
Provider capability
Room Registry
cross-Room governance
```

The instance's actual work-recovery entry point is INSIDE a Room, for example:

```text
rooms/resonova/
├─ WAKE.md
├─ ROOM.md
├─ state/
├─ knowledge/
├─ work-items/
├─ handoff/
└─ workspace-bindings/
```

A fresh instance first reads:

```text
rooms/resonova/WAKE.md
```

then restores:

```text
what this Room is
what the current goal is
which Work Items are actionable
what the previous instance left behind
which Workspaces are authorized
under what conditions it must stop
```

A World-level WAKE.md may still exist, but it acts as the global entry / routing entry:

```text
World WAKE
→ identify target Room
→ Room WAKE
→ restore local context
```

If the Runtime has already specified the Room, the instance may start directly from the Room WAKE.

Final model:

```text
World
└─ Room
   └─ fresh instance wakes here
      ├─ reads Room Seed
      ├─ restores Room context
      ├─ resolves Workspace Binding
      ├─ works externally
      └─ writes traces back into Room
```

In short: the AI belongs to the World, but it wakes in a Room; the Room is the direct environment in which it is reborn, restores context, and continues working.

## 10. Typical Room / Workspace Relations

Non-implementation example:

```text
Persistent World
│
├─ Persistent Room: Nexus Reform
│  ├─ Concepts / Contracts / Research Artifacts
│  └─ Workspace Bindings
│
├─ Persistent Room: Resonova Product
│  ├─ Product Knowledge
│  ├─ Work Items
│  ├─ Protocols
│  └─ Workspace Bindings
│      ├─ backend repository
│      ├─ Android repository
│      └─ web repository
│
└─ Persistent Room: Official Nexus
   ├─ Migration Artifacts
   ├─ Legacy references
   └─ Workspace Bindings
```

These repositories are NOT required to be physically nested.

Illustrative file-first materialization (non-binding, no directory is created or resolved in this iteration):

```text
F:\nexus-world\
├─ WAKE.md
├─ doctrine\
├─ protocols\
├─ providers\
├─ state\
└─ rooms\
   ├─ nexus-reform\
   │  ├─ ROOM.md
   │  ├─ knowledge\
   │  ├─ work-items\
   │  ├─ handoff\
   │  ├─ history\
   │  └─ workspace-bindings\
   │
   ├─ resonova\
   │  ├─ ROOM.md
   │  ├─ knowledge\
   │  ├─ work-items\
   │  ├─ handoff\
   │  └─ workspace-bindings\
   │
   └─ official-nexus\
      └─ ...
```

A Workspace Binding could, for illustration only, be recorded as:

```text
F:\nexus-world\rooms\resonova\
└─ workspace-bindings\
   └─ product-repositories.md
```

```yaml
backend:
  path: D:\products\resonova-backend
  access: read-write

android:
  path: \\wsl$\Ubuntu\home\jay\resonova-android
  access: read-write
```

This YAML is an illustration of the concept, NOT a bound schema and NOT a resolved or authorized real path in this iteration.

## 11. Relation to Persistent Scope Topology

See [`PERSISTENT_SCOPE_TOPOLOGY.md`](PERSISTENT_SCOPE_TOPOLOGY.md) (`CONCEPT MODEL — UNDER OUTSIDE REVIEW`).

- Room is the current local Persistent Scope type.
- `World → Room` is the current minimum topology profile, NOT a permanent fixed hierarchy.
- The underlying model allows other Persistent Scope types.
- The current fresh instance wakes inside a Room.
- In the future, a fresh instance may wake inside any Scope that satisfies the local executable scope contract (Seed / WAKE entry, authority boundary, Protocol refs, Work Item context, Workspace Bindings, exit obligations, write-back target).

The confirmed Room, Workspace Binding, and directory-carrier content above remains correct and is not rewritten here.

---

*End of concept model.*
