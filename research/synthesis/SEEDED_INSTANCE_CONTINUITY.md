# Seeded Instance Continuity

> **Document Status**: `CONCEPT CLARIFICATION — UNDER OUTSIDE REVIEW`
> **Scope**: Conceptual clarification of Persistent World as the persistent entity, fresh box AI instances as continuity-less executors, the Seed as an environment-trace entry view, regrowth, work duration, exit boundaries and obligations, stigmergic handoff, the Seed vs Work Item relation, the minimum validation form vs the final architecture, and the two Clean-Room meanings. Conceptual only; no Runtime, carrier, or schema is bound.
> **Related**: [`WORK_ITEM_MINIMUM_CONTRACT.md`](../contracts/WORK_ITEM_MINIMUM_CONTRACT.md) (`CONFIRMED FOR SEMANTIC CONTRACT SCOPE`), [`FOUR_LAYER_ONE_WORLD_MINIMUM_LANDING_ROADMAP.md`](../plans/FOUR_LAYER_ONE_WORLD_MINIMUM_LANDING_ROADMAP.md) (`CONFIRMED FOR ROADMAP SCOPE`)

---

## 1. Persistent Entity

The truly persistent thing is:

```text
Persistent World
```

NOT a particular Agent instance.

A Persistent World may contain:

```text
Artifacts
Work Items
Protocols
Current Knowledge
code and tests
claims / leases
reviews and verdicts
Git history
environment-visible stigmergic traces
```

An Agent instance is a temporary executor entering the World.

## 2. Fresh Box AI Instance

Every box AI entering the World should be treated as:

```text
fresh instance
without reliable internal continuity
```

It must NOT rely on:

- the previous instance's internal memory
- model identity continuity
- conversation context persisting forever
- self-claims such as "I remember what happened before"

Continuity must be recovered from the environment.

## 3. Seed Definition

A Seed is not simply equal to:

```text
one prompt
one task
one file
one Work Item
```

A Seed is:

> the set of environment traces and Artifacts that are selected, organized, and offered to a fresh instance when it enters the World, so that it can regrow the current World context.

A Seed may include:

```text
WAKE
HELLO / Handoff
Current Phase
Current Verdict
Next Action
Work Item state
Claim / Lease
Protocol references
Current Knowledge
code and tests
review feedback
blocked state
Git commit / diff / lineage
relevant evidence and outputs
```

A Seed is an entry view formed from the World's existing pheromones. It is NOT a parallel system independent of the pheromones.

## 4. Regrowth

A fresh instance's entry process is described as:

```text
read Seed
→ reconstruct current world
→ recover authorized role and boundaries
→ identify legal next actions
→ continue existing work or claim ready work
→ operate inside the world
```

"Regrowth" means recovering a workable context from external Artifacts. It does NOT mean a permanent identity forms inside the model.

## 5. Work Duration

An instance is NOT required to follow:

```text
one instruction
→ one Work Item
→ immediate exit
```

A fresh instance MAY, within the same context lifecycle:

- continue multiple steps of the same Work Item
- complete a bounded stage
- complete several explicitly authorized, related Work Items in sequence
- handle post-execution verification
- update documentation, tests, and Handoff

It MUST NOT expand its authorization scope just because tokens or time remain, and MUST NOT automatically dispatch unbounded follow-on work.

## 6. Valid Exit Boundaries

An instance may exit for reasons such as:

```text
context nearing capacity
bounded stage completed
Work Item completed
independent review required
blocking condition reached
resource or time boundary reached
model degradation detected
different model/profile needed
human or protocol stop requested
```

Exiting is not failure.

An instance need NOT wait until the whole product or whole goal is complete before exiting.

## 7. Exit Obligation

Before exiting, an instance MUST externalize its transient internal state into environment traces as far as possible, including:

```text
what was attempted
what changed
current Work Item state
claim / lease status
outputs and traces
tests and verification
remaining work
known blockers
decisions made
open questions
recommended next action
relevant Git lineage
```

These outputs become part of the next instance's Seed.

It MUST NOT leave only:

```text
I am done
continue later
context is full
```

## 8. Stigmergic Handoff

There is no reliable direct "memory transfer" between instances.

The actual continuity process is:

```text
instance N acts
→ modifies Persistent World
→ leaves stigmergic traces
→ instance N exits
→ instance N+1 reads selected traces as Seed
→ reconstructs world
→ continues
```

Therefore:

```text
information left by one instance
becomes environment-mediated guidance
for the next instance
```

This is the connection point between Seed and Stigmergy.

## 9. Work Item Relation

Seed and Work Item are not the same concept.

```text
Seed
→ restores world context and legal action space

Work Item
→ identifies a bounded unit of authorized work
```

After reading a Seed, a fresh instance may:

- continue a previous Work Item
- recover a stale claim
- claim a READY Work Item
- process REVIEW_REQUIRED
- process BLOCKED
- discover no authorized work and stop

It MUST NOT be fixed that:

```text
Seed always creates a new Work Item
```

## 10. Minimal Validation Form vs Final Architecture

The roadmap's form:

```text
Seed
→ bounded Work Item
→ one fresh executor
→ artifact output
→ review
→ stop
```

is only:

```text
minimum safe validation form
```

It is used to validate:

- clean entry
- bounded execution
- Artifact output
- review separation
- safe stop

It is NOT a final architecture constraint.

The final permitted form is:

```text
Seed
→ fresh instance regrows world context
→ performs one or more authorized bounded work stages
→ exits at a valid boundary
→ externalizes transient state as stigmergic traces
→ next fresh instance receives updated Seed
```

## 11. No Infinite Identity

Multiple fresh instances MUST NOT be described as:

```text
the same agent waking up again
```

The more accurate description is:

```text
different transient instances
participating in one persistent world lineage
```

Persona, name, or role labels may repeat, but that does not prove internal model identity continuity.

## 12. Clean Room Relation

**Runtime Clean-Room** means:

- an instance enters in a bounded workspace
- reads authorized World Artifacts
- does NOT default to accessing the whole host
- carries no unauditable hidden state
- outputs MUST return to the Persistent World
- after exit the environment remains recoverable by the next instance

**Architecture Clean-Room** means the Reform Lab is not held hostage by the legacy Nexus private implementation.

The two meanings must not be conflated, but they can be combined.

---

*End of clarification.*
