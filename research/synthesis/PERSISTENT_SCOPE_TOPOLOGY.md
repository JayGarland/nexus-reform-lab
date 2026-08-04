# Persistent Scope Topology

> **Document Status**: `CONCEPT MODEL — UNDER OUTSIDE REVIEW`
> **Purpose**: Generalize World / Room into an extensible Persistent Scope topology so that `World → Room` is treated as the current minimum topology profile rather than a permanently fixed hierarchy.
> **Scope**: Conceptual topology only. No Persistent Scope Runtime, schema, Scope or Room Engine, or real directory is created; no real Workspace path is resolved or scanned.
> **Related**: [`PERSISTENT_ROOM_AND_WORKSPACE_BINDING.md`](PERSISTENT_ROOM_AND_WORKSPACE_BINDING.md) (`CONCEPT MODEL — UNDER OUTSIDE REVIEW`), [`LAYERED_WORLD_RUNTIME_MODEL.md`](LAYERED_WORLD_RUNTIME_MODEL.md) (`CONFIRMED FOR CONCEPTUAL SCOPE`), [`PERSISTENT_WORLD_OBJECT_MODEL.md`](PERSISTENT_WORLD_OBJECT_MODEL.md) (`CONFIRMED FOR CONCEPTUAL SCOPE`), [`SEEDED_INSTANCE_CONTINUITY.md`](SEEDED_INSTANCE_CONTINUITY.md) (`CONFIRMED FOR CONCEPTUAL SCOPE`)

---

## 1. Core Conclusion

> `World → Room` is the current minimum, easiest-to-validate topology. It is NOT a permanently hard-coded unique hierarchy.

The underlying general concept is:

```text
Persistent Scope
```

World and Room are the two currently named Persistent Scope types.

Future scope types MAY include:

```text
Apartment
Community
City
Country
Continent
Organization
Product Area
Domain
Review Zone
Research Network
```

These names only denote possible future scope types. They do NOT imply that real-world geographic semantics must be adopted now.

## 2. Persistent Scope Definition

A Persistent Scope is:

> a persistent scope node with a stable identity, a governance boundary, local state, inheritable traces, and an enterable context.

A Persistent Scope may own or reference:

```text
scope_id
scope_type
title
scope_definition
authority_boundary
parent_scope_refs
child_scope_refs
peer_scope_refs
protocol_refs
artifact_refs
work_item_refs
knowledge_refs
workspace_bindings
provider_bindings
seed_entry_ref
history_refs
cross_scope_policy_refs
```

These are semantic requirements, not a final schema.

## 3. Current Types

The current minimum types:

```text
World
= the current top-level Persistent Scope

Room
= the current smallest enterable local Persistent Scope
```

Normally:

```text
World
└─ Room
   └─ fresh instance wakes here
```

But this relation is only the current topology profile, NOT a permanent restriction of the underlying Contract.

## 4. Extensible Hierarchy

Future hierarchies may be:

```text
World
└─ Community
   └─ Apartment
      └─ Room
```

or:

```text
World
└─ Country
   └─ City
      └─ Product Room
```

or even without the name Room:

```text
World
└─ Product Area
   └─ Execution Scope
```

Runtime and Contract MUST NOT depend on fixed names or fixed depth.

## 5. A Graph, Not Only a Tree

Persistent Scope Topology MUST NOT be limited to a single-parent tree.

Allowed relation kinds include:

```text
containment
reference
review
knowledge supply
dependency
governance
shared infrastructure
restricted bridge
```

For example:

```text
Security Review Scope
→ reviews Resonova Product Scope
→ reviews Official Nexus Scope

Shared Research Scope
→ supplies knowledge to multiple Product Scopes
```

The following edges MUST be distinguished:

```text
containment edge
reference edge
review edge
knowledge edge
dependency edge
governance edge
```

Not every relation is a parent / child relation.

## 6. Canonical Ownership

Cross-scope references MUST NOT blur canonical ownership.

Every Artifact, Work Item, Protocol, Knowledge projection, or Workspace Binding should have a clear:

```text
canonical_scope_ref
```

Other Scopes may reference, review, or consume it, but MUST NOT implicitly seize canonical state.

## 7. Wake Boundary

The current default:

> a fresh instance wakes inside one clearly authorized executable local scope.

Today that scope is usually a Room.

In the future, if other scope types appear, the Runtime may wake inside that type, as long as it has:

```text
Seed / WAKE entry
authority boundary
Protocol refs
Work Item context
Workspace Bindings
exit obligations
write-back target
```

Therefore the final principle is NOT:

```text
AI must always wake in an object literally named Room
```

but:

```text
AI must wake inside one explicitly authorized persistent local scope.
```

Current implementation profile:

```text
authorized persistent local scope = Room
```

## 8. Sandbox Boundary

A fresh instance normally acts within the governance scope of the local scope in which it wakes.

Default rules:

- read that Scope's Seed, Knowledge, Protocol, and Work Items;
- access only explicitly authorized Workspace Bindings;
- write default pheromones and execution traces back into that Scope;
- MUST NOT arbitrarily traverse other Scopes;
- cross-scope access MUST be authorized by explicit edges, Protocol, and permissions;
- accessing an external Workspace does NOT mean leaving the Scope governance boundary.

## 9. Directory Carrier

The current file-first physical implementation MAY be:

```text
world/
└─ scopes/
   ├─ room-resonova/
   ├─ room-nexus-reform/
   └─ room-official-nexus/
```

or may continue to use:

```text
world/
└─ rooms/
```

But the underlying model MUST NOT depend on the directory name `rooms`.

Future directories MAY expand to:

```text
world/
└─ scopes/
   ├─ communities/
   ├─ apartments/
   ├─ rooms/
   └─ domains/
```

The directory is the current carrier; `scope_id` is the stable identity.

## 10. World Responsibilities

As the current top-level Scope, the World MAY be responsible for:

```text
Scope Registry
global Doctrine
global Protocol
cross-Scope governance
shared Provider capability
Scope creation / activation / freeze / archive
cross-Scope permission
topology relations
global history
```

But it MUST NOT degrade into:

```text
a central Boss that dispatches every Work Item
```

Local Scopes should be able to advance routine work under their own Protocols, Work Items, and pheromones within the global boundary.

---

*End of concept model.*
