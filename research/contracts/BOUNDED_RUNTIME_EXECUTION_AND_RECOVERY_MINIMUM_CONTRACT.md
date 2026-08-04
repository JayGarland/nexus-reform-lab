# Bounded Runtime Execution and Recovery Minimum Contract

> **Status**: `DRAFT SEMANTIC CONTRACT — UNDER OUTSIDE REVIEW`
> **Purpose**: Define the minimum semantic contract by which a transient fresh instance wakes in an explicitly authorized Persistent Scope, restores context, claims or continues a Work Item, accesses a Workspace, performs bounded work, exits, writes back persistent traces, and recovers safely after failure or a stale attempt, without binding any concrete Runtime.
> **Scope**: Semantic contract only. This draft binds no Runtime, no Session launcher, no scheduler, no worker, no Scope / Room Engine, no Workspace resolver, no Claim / Lease Engine, no Protocol Engine, and no automatic recovery mechanism.
> **Basis**: [`WORK_ITEM_MINIMUM_CONTRACT.md`](WORK_ITEM_MINIMUM_CONTRACT.md) (`CONFIRMED FOR SEMANTIC CONTRACT SCOPE`), [`PROTOCOL_GOVERNANCE_MINIMUM_CONTRACT.md`](PROTOCOL_GOVERNANCE_MINIMUM_CONTRACT.md) (`SEMANTIC CONTRACT — CONFIRMED FOR SEMANTIC CONTRACT SCOPE`), [`SEEDED_INSTANCE_CONTINUITY.md`](../synthesis/SEEDED_INSTANCE_CONTINUITY.md) (`CONFIRMED FOR CONCEPTUAL SCOPE`), [`PERSISTENT_ROOM_AND_WORKSPACE_BINDING.md`](../synthesis/PERSISTENT_ROOM_AND_WORKSPACE_BINDING.md) (`CONFIRMED FOR CONCEPTUAL SCOPE`), [`PERSISTENT_SCOPE_TOPOLOGY.md`](../synthesis/PERSISTENT_SCOPE_TOPOLOGY.md) (`CONFIRMED FOR CONCEPTUAL SCOPE`), [`LAYERED_WORLD_RUNTIME_MODEL.md`](../synthesis/LAYERED_WORLD_RUNTIME_MODEL.md) (`CONFIRMED FOR CONCEPTUAL SCOPE`), [`TWO_LEG_ASYNCHRONOUS_OPERATING_MODEL.md`](../synthesis/TWO_LEG_ASYNCHRONOUS_OPERATING_MODEL.md) (`CONFIRMED FOR OPERATING MODEL SCOPE`), [`FOUR_LAYER_ONE_WORLD_MINIMUM_LANDING_ROADMAP.md`](../plans/FOUR_LAYER_ONE_WORLD_MINIMUM_LANDING_ROADMAP.md) (`CONFIRMED FOR ROADMAP SCOPE`)

---

## 1. Goal

> 定义 transient fresh instance 如何在明确授权的 Persistent Scope 中醒来、恢复上下文、领取或继续 Work Item、访问 Workspace、执行有界工作、退出、写回持久痕迹，并在失败或 stale attempt 后安全恢复。

This Contract defines the minimum semantic contract that any future bounded execution Runtime must be able to express. It does not mandate field names, file layouts, schemas, products, locks, databases, or queues. A compliant Runtime must be able to map its representation onto these semantics and export a stable Artifact expression.

## 2. Runtime Execution Unit

One run MUST distinguish:

```text
Fresh Instance
Runtime Session
Execution Attempt
Work Item
Persistent Scope
Workspace Binding
```

Definitions:

```text
Fresh Instance
= transient model process or model context

Runtime Session
= one bounded runtime container or execution period

Execution Attempt
= persistent record of one attempt to advance a Work Item

Work Item
= persistent bounded authorized work semantics

Persistent Scope
= persistent governance and context boundary

Workspace Binding
= authorized reference to an external working environment
```

A Session, an Attempt, a Work Item and an Agent identity MUST NOT be conflated into a single object.

## 3. Wake Boundary

A fresh instance MUST wake inside an explicitly authorized local Persistent Scope.

Current profile:

```text
authorized local Persistent Scope = Room
```

Before the Runtime begins, the following MUST already be determined:

```text
wake_scope_ref
seed_entry_ref
authorized_role
protocol_set_ref
work_item_ref or ready-work authority
workspace_binding_refs
permission_boundary
exit_conditions
write_back_target
```

A fresh instance MUST NOT, on its own:

- scan the entire World looking for an arbitrary Scope
- traverse other Rooms
- search host-machine projects
- pick an arbitrary Workspace
- expand its own role or permissions

## 4. Room Wake Sequence

Current minimum sequence:

```text
Runtime selects authorized Room
→ instance starts inside Room
→ reads Room WAKE / Seed
→ restores current Room state
→ reads Current Active Protocol Set
→ reads Work Item and Claim / Lease state
→ resolves authorized Workspace Binding
→ identifies legal next action
→ begins or continues one bounded Execution Attempt
```

World WAKE may serve as a routing entry, but it MUST NOT replace the Room's local recovery entry.

## 5. Seed Requirements

A Seed supplied by the Runtime SHOULD preferentially include:

```text
wake Scope identity
Room identity and purpose
current phase
current verdict
single authorized next action
current active Protocol refs
Work Item state
Claim / Lease state
previous attempt state
relevant current knowledge
Workspace Binding
review findings
known blockers
handoff
Git lineage
exit obligations
```

A Seed is an entry view; it is not required to duplicate the whole history.

A fresh instance MUST NOT read the entire World history and then guess the current state on its own.

## 6. Pre-Execution Gate

Before beginning to modify a Workspace, the Runtime semantics require that all of the following hold:

```text
Scope is authorized
Work Item is READY, CLAIMED, IN_PROGRESS, RETRYABLE, or otherwise legally continuable
Claim / Lease is valid or legally recoverable
Protocol Set is current
no unresolved blocking Protocol conflict exists
Workspace Binding is active
requested operation is permitted
required approval has been granted
base revision is known
write-back target exists
```

If any required condition does not hold:

```text
PRE_EXECUTION_BLOCKED
```

and evidence MUST be recorded; execution MUST NOT continue.

## 7. Claim and Lease Interaction

The Runtime does not own a Work Item; it only executes a legal Claim.

Minimum rules:

- a Claim MUST be established before executing a new Work Item
- a Claim MUST be associated with an executor identity or runtime principal
- a Lease MUST have a checkable expiry or stale condition
- an Attempt MUST reference its Claim / Lease
- Session termination does NOT automatically release the Work Item
- Lease expiry does NOT automatically mean the Work Item failed
- stale recovery MUST first judge the old Attempt state
- two executors MUST NOT write the same canonical Work Item / Workspace simultaneously without an explicit concurrency Protocol

This round does not select a lock, database, or queue implementation.

## 8. Execution Attempt Identity

Every attempt MUST have:

```text
execution_attempt_id
```

A new attempt MUST NOT overwrite an old attempt.

A retry or recovery:

```text
same work_item_id
+ new execution_attempt_id
```

An Attempt SHOULD reference, at minimum:

```text
work_item_id
wake_scope_ref
runtime_session_id
executor identity
claim_ref
lease_ref
protocol_set_ref
workspace_binding_refs
base revision
started_at
ended_at
attempt status
output refs
evidence refs
handoff ref
previous_attempt_ref
```

These are semantic requirements, not a final schema.

## 9. Runtime Session States

Minimum Session states:

```text
CREATED
WAKING
CONTEXT_RESTORED
PRE_EXECUTION_CHECK
RUNNING
EXITING
WRITE_BACK_REQUIRED
SUBMITTED
TERMINATED
ABORTED
```

Meanings:

- `CREATED`: Session identity established
- `WAKING`: reading the Room Seed
- `CONTEXT_RESTORED`: current Scope, Protocol, Work Item and permissions restored
- `PRE_EXECUTION_CHECK`: pre-execution gating
- `RUNNING`: advancing a bounded Attempt
- `EXITING`: exit boundary triggered
- `WRITE_BACK_REQUIRED`: retainable state must be persisted
- `SUBMITTED`: outputs submitted and awaiting review
- `TERMINATED`: Session closed normally
- `ABORTED`: abnormal termination; still requires a recovery judgement

Session state MUST NOT substitute for Work Item state.

## 10. Execution Attempt States

Minimum Attempt states:

```text
STARTED
RUNNING
OUTPUT_SUBMITTED
BLOCKED
FAILED
ABORTED
STALE
RECOVERY_REQUIRED
RECOVERED
CLOSED
```

An Attempt MUST NOT produce:

```text
ACCEPTED
VERIFIED
PRODUCTION_READY
```

Those belong to external Review / Verdict.

## 11. Bounded Execution

A Session may complete:

- one complete Attempt of one Work Item
- one or more authorized bounded stages of one Work Item
- multiple Work Items, only if the Protocol and Seed explicitly authorize it and each Work Item's Claim, Attempt, Evidence, and Write-back are independently traceable

An unbounded default of claiming the next Work Item indefinitely is prohibited.

The execution boundary MUST come from:

```text
Work Item goal
authorized stages
Protocol
context boundary
time or resource boundary
review boundary
human stop
blocking condition
model quality boundary
```

The Runtime MUST NOT interpret "more Ready work exists" as authorization to continue forever.

## 12. Workspace Entry

A Workspace may only be entered through an authorized Binding.

Before entry, the following SHOULD be recorded:

```text
workspace_binding_id
workspace_uri or opaque locator
repository_id
base revision
branch or worktree identity
access mode
allowed operations
forbidden operations
credential boundary
expected write-back form
```

Accessing a Workspace does NOT mean leaving the Room's governance boundary.

Product code, tests, and product Git commits may live in the Workspace; governance state, Work Item, Protocol, Handoff, and Verdict MUST be written back to their canonical Scope.

## 13. Workspace Drift

After entering a Workspace, if any of the following is found:

```text
base revision mismatch
unexpected uncommitted changes
branch mismatch
missing repository
missing permission
conflicting external modification
credential failure
```

The Runtime MUST:

```text
WORKSPACE_DRIFT_DETECTED
→ stop mutation
→ record actual state
→ mark Attempt BLOCKED or RECOVERY_REQUIRED
→ request outside or authorized adjudication
```

It MUST NOT reset, force-overwrite, delete others' work, or switch to an unknown branch on its own.

## 14. Allowed Execution Declarations

An executor MAY declare:

```text
OUTPUT_SUBMITTED
BLOCKED
FAILED
ABORTED
CONTEXT_LIMIT_REACHED
REVIEW_REQUIRED
```

An executor MUST NOT declare:

```text
ACCEPTED
VERIFIED
PRODUCTION_READY
PROTOCOL_VALIDATED
WORK_ITEM_COMPLETE_IN_CANONICAL_STATE
```

`OUTPUT_SUBMITTED` only means the result has been delivered for review.

## 15. Exit Boundaries

Valid exit reasons include:

```text
bounded stage completed
Work Item output submitted
independent review required
context nearing capacity
blocking condition
resource or time boundary
model degradation
different model/profile required
human stop
Protocol stop
permission boundary
workspace drift
```

Exiting is not failure.

A Session need not wait until the whole product goal is complete.

## 16. Write-Back Obligation

Before a controlled exit, the following MUST be externalized:

```text
attempted work
changed files or objects
workspace revision / Git commit
tests and verification
Work Item state
Attempt state
Claim / Lease state
outputs
evidence
decisions made
remaining work
blockers
open questions
review request
recommended next action
Git lineage
handoff
```

Leaving only:

```text
I am done
continue later
context is full
work completed
```

is prohibited.

## 17. Write-Back Target

Every class of output MUST have an explicit canonical target, for example:

```text
Work Item state → canonical Work Item Artifact
Attempt record → Execution Attempt history
product changes → product Workspace Git history
test evidence → Room evidence refs
knowledge learned → Knowledge proposal or projection input
handoff → Room handoff Artifact
review request → Review queue or Review Artifact
Protocol conflict → conflict evidence and governance queue
```

Outputs MUST NOT be stuffed only into a single chat completion report.

## 18. Session End

A Session may reach a normal `TERMINATED` only after:

```text
persistent write-back completed
Attempt final declaration recorded
Claim / Lease disposition recorded
Workspace state recorded
Handoff or final submission recorded
required evidence linked
```

If there is a sudden power loss, process crash, or model interruption, the Session may stop in a non-normal state, but the Persistent World MUST be able to judge whether recovery is required.

## 19. Crash and Power Loss

Recovery MUST NOT depend on chat continuity after a power loss or process interruption.

Recovery order:

```text
inspect persistent Scope
→ inspect Work Item
→ inspect Claim / Lease
→ inspect latest Execution Attempt
→ inspect Workspace state
→ inspect Git state
→ inspect evidence and Handoff
→ classify recovery condition
```

Recovery classification:

```text
NO_PERSISTENT_WORK_FOUND
UNCOMMITTED_WORK_PRESENT
LOCAL_COMMIT_NOT_PUSHED
REMOTE_COMMIT_PRESENT
PARTIAL_WRITE_BACK
STALE_ATTEMPT
CONFLICTED_WORKSPACE
SAFE_TO_RETRY
REQUIRES_OUTSIDE_REVIEW
```

The task MUST NOT be re-executed before the persistent state is inspected.

## 20. Stale Attempt Recovery

An Attempt may become stale due to:

```text
Lease expired
Session disappeared
heartbeat absent
Runtime crash
model context lost
manual abandonment
```

But stale does not automatically equal failed.

Recovery MUST judge:

- whether the Workspace already has modifications
- whether a commit exists
- whether it has been pushed
- whether outputs were submitted
- whether write-back is partially complete
- whether the Claim is still valid
- whether there is a concurrent executor
- whether the Protocol version changed
- whether the Work Item was externally adjudicated

After recovery, it is permitted to:

```text
resume the same Attempt
close the old Attempt and create a new Attempt
submit existing output
push existing commit
mark BLOCKED
request Review
cancel the Work Item
```

An old Attempt MUST NOT be silently overwritten.

## 21. Retry

A Retry MUST:

```text
preserve the same work_item_id
create a new execution_attempt_id
reference the previous attempt
record the retry reason
use an explicit base revision
re-evaluate the current Active Protocol Set
re-evaluate the Claim / Lease
```

A Retry MUST NOT delete a failed or aborted Attempt.

## 22. Model Replacement

Replacing a model is NOT creating a new Work Item.

It is permitted to:

```text
same Work Item
→ close or pause old Attempt
→ new fresh instance
→ new Execution Attempt
→ read same persistent Scope
→ continue from durable traces
```

The following MUST be recorded:

```text
replacement reason
previous model/profile if known
new model/profile
previous attempt ref
handoff quality
remaining risk
```

A model persona MUST NOT be treated as a persistent identity.

## 23. Review Boundary

After outputs are submitted:

```text
Attempt OUTPUT_SUBMITTED
→ Work Item REVIEW_REQUIRED
→ independent Review
→ external or authorized Verdict
```

Review may:

```text
ACCEPT
REJECT
REQUEST_CHANGES
MARK_RETRYABLE
CANCEL
ESCALATE
```

The Runtime or executor MUST NOT substitute for the Reviewer.

## 24. Protocol Change During Execution

Outside discussion may continue during a Session, but it MUST NOT silently change the current authorization.

If the Protocol or the Work Item scope changes, it MUST be written back explicitly through:

```text
UPDATE
CANCEL
SUSPEND
SUPERSEDE
```

The current Session MUST judge:

- whether the old Protocol is still Active
- whether the new Protocol affects the current Attempt
- whether completing the current bounded stage is allowed
- whether it must stop immediately
- whether a new Attempt must be started

New discussion in chat MUST NOT implicitly change a running Session.

## 25. Cross-Scope Execution

By default, one Session wakes inside one authorized local Scope.

Cross-Scope work MUST be explicit about:

```text
source scope
target scope
edge Protocol
allowed reads
allowed writes
canonical ownership
Workspace Bindings
write-back target
termination condition
```

Default access to the entire World is NOT implied.

## 26. Runtime and Provider Boundary

A Runtime may compose:

```text
Scope Registry Provider
Coordination Provider
Protocol Governance Provider
Knowledge Provider
Workspace Adapter
Execution Bridge
Evaluation / Review Provider
```

But the Runtime itself MUST NOT:

- become the canonical knowledge owner
- become the Protocol authority
- become the Work Item final judge
- monopolize non-exportable state
- auto-expand Scope
- auto-adopt a Provider
- auto-approve a migration
- auto-connect the official Nexus

## 27. Current State Projections

The following MUST be distinguished:

```text
Session History
Execution Attempt History
Current Active Sessions
Current Active Attempts
Current Work Item State
Current Claim / Lease State
Current Workspace Binding State
```

A fresh instance SHOULD read current projections rather than guess the current state from all of history.

## 28. Minimum Recovery Proof Conditions

A future Runtime Probe MUST at minimum prove:

```text
fresh instance wakes from Room Seed
current Protocol Set restored
Work Item and Claim restored
authorized Workspace resolved
bounded change performed
evidence persisted
Session exits
another fresh instance reconstructs state
stale or interrupted Attempt classified correctly
no self-acceptance occurs
```

This round MUST NOT run such a Probe.

## 29. Legacy Nexus Boundary

Legacy Nexus:

```text
Boss dispatch
Letter state
Thread
Inbox / Outbox
cc-connect
Archive rehydration
```

may serve only as:

```text
Runtime Adapter clue
historical behavior evidence
migration fixture
failure evidence
```

They MUST NOT automatically become the new Runtime Contract.

## 30. Non-Implementation

This round MUST NOT:

- write a Session launcher
- write a scheduler or worker
- create a real Room
- create a Workspace Binding
- implement Claim / Lease
- implement heartbeat
- implement a stale detector
- implement crash recovery
- install a workflow engine
- run a real product task
- connect the official Nexus
- run CR-S0

## 31. Cross-References

Minimum references:

```text
research/contracts/WORK_ITEM_MINIMUM_CONTRACT.md
research/contracts/PROTOCOL_GOVERNANCE_MINIMUM_CONTRACT.md
research/synthesis/SEEDED_INSTANCE_CONTINUITY.md
research/synthesis/PERSISTENT_ROOM_AND_WORKSPACE_BINDING.md
research/synthesis/PERSISTENT_SCOPE_TOPOLOGY.md
research/synthesis/LAYERED_WORLD_RUNTIME_MODEL.md
research/synthesis/TWO_LEG_ASYNCHRONOUS_OPERATING_MODEL.md
research/plans/FOUR_LAYER_ONE_WORLD_MINIMUM_LANDING_ROADMAP.md
```

Confirmed content is not rewritten.

---

*End of contract draft.*
