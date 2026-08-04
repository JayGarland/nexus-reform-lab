# Two-Leg Asynchronous Operating Model

> **Document Status**: `OPERATING MODEL — CONFIRMED FOR OPERATING MODEL SCOPE`
> **Reviewed Commit**: `8e05d6a8395edf3fb85a51be0c0fa5ea085383a5`
> **Purpose**: Record the asynchronous operating model between the box-outside discussion / governance leg and the box-in execution / artifact leg, including their responsibilities, convergence artifacts, discussion write-back flow, and the outside review order.
> **Scope**: Operating model only. It defines how work is coordinated; it does not implement Runtime, a Room engine, a scheduler, or a worker.
> **Confirmed Scope**: Outside Discussion and Governance Leg; Inside Execution and Artifact Leg; the two legs advance asynchronously; outside may keep discussing while the inside leg executes; outside discussion must not silently change the authorization of an executing Work Item; changing current authorization requires an explicit update / cancel / supersede instruction; discussion results are written back after classification, authorization, instruction, Artifact, Git, and outside review; a completion report is only an index; Commit, Diff, Raw Evidence, and Artifacts are the review basis.
> **Related**: [`PERSISTENT_WORLD_OBJECT_MODEL.md`](PERSISTENT_WORLD_OBJECT_MODEL.md) (`CONFIRMED FOR CONCEPTUAL SCOPE`), [`LAYERED_WORLD_RUNTIME_MODEL.md`](LAYERED_WORLD_RUNTIME_MODEL.md) (`CONFIRMED FOR CONCEPTUAL SCOPE`), [`PERSISTENT_ROOM_AND_WORKSPACE_BINDING.md`](PERSISTENT_ROOM_AND_WORKSPACE_BINDING.md) (`CONFIRMED FOR CONCEPTUAL SCOPE`), [`SEEDED_INSTANCE_CONTINUITY.md`](SEEDED_INSTANCE_CONTINUITY.md) (`CONFIRMED FOR CONCEPTUAL SCOPE`), [`PROTOCOL_GOVERNANCE_MINIMUM_CONTRACT.md`](../contracts/PROTOCOL_GOVERNANCE_MINIMUM_CONTRACT.md) (`SEMANTIC CONTRACT — CONFIRMED FOR SEMANTIC CONTRACT SCOPE`), [`BOUNDED_RUNTIME_EXECUTION_AND_RECOVERY_MINIMUM_CONTRACT.md`](../contracts/BOUNDED_RUNTIME_EXECUTION_AND_RECOVERY_MINIMUM_CONTRACT.md) (`SEMANTIC CONTRACT — CONFIRMED FOR SEMANTIC CONTRACT SCOPE`), [`EVALUATION_BASELINE_AND_VERDICT_LOOP_MINIMUM_CONTRACT.md`](../contracts/EVALUATION_BASELINE_AND_VERDICT_LOOP_MINIMUM_CONTRACT.md) (`SEMANTIC CONTRACT — CONFIRMED FOR SEMANTIC CONTRACT SCOPE`)

---

## 1. The Two Legs

```text
Outside Discussion and Governance Leg
Inside Execution and Artifact Leg
```

### Outside leg

Responsible for:

```text
discussion
architecture reasoning
concept formation
rule and protocol formation
acceptance criteria
outside review
final verdict
write-back authorization
safety and irreversible boundaries
```

### Inside leg

Responsible for:

```text
reading the World
following bounded instructions
executing authorized work
writing Artifacts
capturing evidence
updating allowed state
committing Git
submitting results for outside review
```

## 2. Asynchronous Relation

This is not strict stop-and-wait:

```text
outside sends instruction
→ inside begins execution
```

While the inside leg is still executing, the outside leg MAY continue:

```text
discussing
clarifying concepts
identifying new boundaries
forming future proposals
preparing Software 3.0 material
```

But follow-up outside discussion MUST NOT silently change the authorization scope of a Work Item currently being executed.

If the current execution scope MUST be changed, an explicit `update` / `cancel` / `supersede` instruction should be issued.

## 3. Convergence Points

The two legs converge through these Artifacts:

```text
bounded instruction
Git commit
raw evidence
execution trace
outside verdict
Current Phase
Current Verdict
Next Action
Concept / Doctrine
Protocol
Handoff / Seed
```

## 4. Write-Back of Discussion Results

Not all chat content automatically enters the World.

Flow:

```text
discussion
→ shared understanding or decision
→ classification
→ outside authorization
→ included in a later bounded instruction
→ box-in AI persists it as an Artifact
→ Git commit
→ outside review
```

Classification may be:

```text
stable concept → Doctrine / Concept Model
executable rule → Protocol / Software 3.0
current decision → Verdict / State
unverified idea → Proposal
historical basis → Evidence
next-instance continuity → Handoff / Seed
product execution context → Room / Workspace Binding
```

## 5. Instructions Can Contain Two Kinds of Work

The next box-in instruction may simultaneously contain:

```text
A. operational execution task
B. approved conceptual / protocol write-back task
```

But both MUST separately declare scope and acceptance criteria, so that "writing a concept file" is not mistaken for implementing a Runtime or capability.

## 6. Outside Review

A box-in completion report is only an index.

The outside review order stays:

```text
Commit
→ Diff
→ Raw Evidence
→ Actual Artifacts
→ State consistency
→ Findings
→ Verdict
```

A box AI MUST NOT self-confirm that its Concept, Protocol, Engine, or Runtime has passed.

---

*End of operating model.*
