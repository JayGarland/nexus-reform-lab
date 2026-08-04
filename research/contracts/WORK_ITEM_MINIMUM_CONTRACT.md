# Work Item Minimum Contract

> **Status**: `CONTRACT — CONFIRMED FOR SEMANTIC CONTRACT SCOPE`
> **Reviewed Commit**: `0882f57ccc2d153e3d36519e3a70509d53add30a`
> **Purpose**: Define the minimum semantic contract by which Nexus World can identify, claim, execute, review, and recover a Work Item identically, regardless of whether the underlying carrier is Markdown, Beads, GitHub Issues, a database record, a Kanban board, or any other replaceable carrier.
> **Scope**: Semantic contract only. This contract binds no concrete product, directory structure, database schema, or legacy Nexus field.
> **Basis**: Four-Layer One-World Minimum Landing Roadmap (`CONFIRMED FOR ROADMAP SCOPE`, reviewed commit `64642bf3e601030c5c4a19c376a34d1e420890ec`).
> **Confirmed Scope**: stable Work Item identity; open Work Item type; carrier-neutral semantic state; Claim / Lease; execution attempt identity; executor declaration separated from external verdict; explicit blocked semantics; independent review; retry / recovery lineage; canonical work state separated from notification / mailbox / label; legacy Nexus as Adapter mapping clue only.
> **Not Yet Confirmed**: concrete YAML / JSON schema; Markdown, Beads, GitHub Issues or database implementation; Runtime; scheduler; worker; concurrency model; official Nexus migration; production readiness.
> **Related**: [`PERSISTENT_WORLD_OBJECT_MODEL.md`](../synthesis/PERSISTENT_WORLD_OBJECT_MODEL.md) (`CONFIRMED FOR CONCEPTUAL SCOPE`), [`SEEDED_INSTANCE_CONTINUITY.md`](../synthesis/SEEDED_INSTANCE_CONTINUITY.md) (`CONFIRMED FOR CONCEPTUAL SCOPE`), [`LAYERED_WORLD_RUNTIME_MODEL.md`](../synthesis/LAYERED_WORLD_RUNTIME_MODEL.md) (`CONFIRMED FOR CONCEPTUAL SCOPE`), [`PROTOCOL_GOVERNANCE_MINIMUM_CONTRACT.md`](PROTOCOL_GOVERNANCE_MINIMUM_CONTRACT.md) (`SEMANTIC CONTRACT — CONFIRMED FOR SEMANTIC CONTRACT SCOPE`), [`BOUNDED_RUNTIME_EXECUTION_AND_RECOVERY_MINIMUM_CONTRACT.md`](BOUNDED_RUNTIME_EXECUTION_AND_RECOVERY_MINIMUM_CONTRACT.md) (`SEMANTIC CONTRACT — CONFIRMED FOR SEMANTIC CONTRACT SCOPE`), [`EVALUATION_BASELINE_AND_VERDICT_LOOP_MINIMUM_CONTRACT.md`](EVALUATION_BASELINE_AND_VERDICT_LOOP_MINIMUM_CONTRACT.md) (`DRAFT SEMANTIC CONTRACT — UNDER OUTSIDE REVIEW`)

---

## 1. Goal

> 无论未来底层使用 Markdown、Beads、GitHub Issues、数据库记录、Kanban 或其他载体，Nexus World 都能以相同的最小语义识别、认领、执行、审查和恢复一项工作。

This Contract defines the minimum semantic contract that any carrier must be able to express. It does not mandate field names, file layouts, schemas, or products. A compliant carrier must be able to map its representation onto these semantics and export a stable Artifact expression.

## 2. Work Item Identity Boundary

A Work Item must express, at minimum:

```text
work_item_id
type
title
goal
created_at
created_by
current_state
artifact_refs
protocol_ref
```

Requirements:

- `work_item_id` MUST be stable and MUST NOT change across carrier migration.
- `type` is an open enum; it is NOT permanently bound to task / letter / issue.
- `goal` describes the objective defined by box-outside or by an authorized protocol.
- `artifact_refs` point to evidence, input and output Artifacts.
- `protocol_ref` identifies the protocol version governing this Work Item.

Implementations are NOT required to use identical field names. This Contract defines semantics, not representation.

## 3. Minimum State Machine

Minimum semantic states:

```text
PROPOSED
READY
CLAIMED
IN_PROGRESS
BLOCKED
REVIEW_REQUIRED
ACCEPTED
REJECTED
RETRYABLE
CANCELLED
```

Definitions:

- `PROPOSED`: not yet approved for execution.
- `READY`: execution preconditions are satisfied.
- `CLAIMED`: an executor holds a time-bounded right to execute.
- `IN_PROGRESS`: observable execution traces exist.
- `BLOCKED`: an explicit blocking reason exists.
- `REVIEW_REQUIRED`: execution finished but is not yet accepted by an independent adjudicator.
- `ACCEPTED`: accepted by box-outside or an authorized adjudicator.
- `REJECTED`: result not accepted; it MUST NOT be disguised as completed.
- `RETRYABLE`: re-execution is permitted against the same goal.
- `CANCELLED`: externally terminated; no further execution.

`executor says done` MUST NOT be treated as `ACCEPTED`. Executors submit results; they cannot self-accept.

## 4. Claim / Lease

Minimum semantics:

```text
claim_id
claimed_by
claimed_at
lease_expires_at
heartbeat_or_progress_ref
```

Rules:

- A Claim MUST carry a Lease.
- Lease expiry does NOT automatically mean task failure.
- A stale claim MUST enter a reviewable recovery process.
- A claim MUST NOT be locked forever.
- Two executors MUST NOT simultaneously hold the same exclusive execution right, unless the Work Item explicitly declares parallel support.
- Claim state MUST be an environment-observable trace.

## 5. Execution Result

An executor MUST return:

```text
execution_attempt_id
executor_profile
started_at
ended_at
input_artifact_refs
output_artifact_refs
trace_refs
declared_status
```

`declared_status` expresses only the executor's declaration, for example:

```text
OUTPUT_SUBMITTED
BLOCKED
FAILED
```

An executor MUST NOT directly declare:

```text
ACCEPTED
VERIFIED
PRODUCTION_READY
```

Final judgment belongs to external adjudication or an independent Review Provider.

## 6. Blocked Semantics

`BLOCKED` MUST record at least:

```text
blocked_reason
blocked_since
required_resolution
responsible_boundary
```

`responsible_boundary` may be:

```text
human
protocol
dependency
credential
external system
artifact missing
```

Vague textual blockers are prohibited:

```text
too hard
not confident
cannot continue
```

In-box AI subjective difficulty judgments cannot become canonical state unless supported by observable evidence.

## 7. Review and Verdict

Review MUST be separated from execution.

Minimum definition:

```text
review_id
reviewer
reviewed_attempt_id
evidence_refs
verdict
verdict_reason
reviewed_at
```

Allowed verdicts:

```text
ACCEPT
REJECT
REQUEST_RETRY
REQUEST_MORE_EVIDENCE
CANCEL
```

The execution model MUST NOT default to being the reviewer.

## 8. Retry and Recovery

MUST distinguish:

```text
same work item
new execution attempt
```

A Retry creates a new `execution_attempt_id`, not a new work-item identity.

MUST preserve:

- failed attempts
- rejected attempts
- stale claims
- recovery decisions
- lineage between new and old attempts

Old results MUST NOT be overwritten, and failure history MUST NOT be deleted.

## 9. Canonical State vs. Carrier

```text
Work Item semantic state
≠
specific mailbox folder
≠
specific Markdown path
≠
specific Issue label
≠
notification delivery state
```

Notification loss MUST NOT change canonical Work Item state.

Allowed carriers:

```text
Markdown Artifact
Beads item
GitHub Issue
database record
event-sourced aggregate
Kanban card
other replaceable carrier
```

Any carrier MUST be exportable to a stable Artifact expression.

## 10. Protocol Governance Boundary

A Work Item MUST reference the governing protocol:

```text
protocol_ref
protocol_version
approval_requirements
forbidden_actions
```

The following operations MUST be capable of being forbidden or human-approved by a protocol:

- modifying official Nexus
- reading secrets
- external network access
- starting background services
- automatically dispatching follow-on tasks
- irreversible deletion
- Provider selection
- canonical state migration

This Contract does not itself define specific policies; it provides the fields and reference boundary that carry such policies.

## 11. Legacy Nexus Mapping Boundary

Candidate mappings (future Adapter design clues only):

```text
Letter → input/output Artifact or transport envelope
Thread → Work Item projection or conversation projection
Inbox/Outbox → delivery adapter
Archive → evidence/import source
cc-connect → execution bridge
```

This Contract MUST NOT:

- inherit the legacy Nexus Letter schema
- fix Thread as the Work Item body
- treat Inbox as a canonical queue
- treat cc-connect as a dispatcher or judge
- require immediate official Nexus migration

These mappings are future Adapter design clues only.

## 12. Non-Goals

This round does NOT include:

```text
concrete YAML / JSON schema
database design
directory design
API implementation
Beads / GitHub Issues selection
automatic scheduler
multi-agent concurrency implementation
background worker
Nexus migration
```

Semantic contract first; representation later.

## 13. Relation to Seed and Fresh Instance Continuity

See [`SEEDED_INSTANCE_CONTINUITY.md`](../synthesis/SEEDED_INSTANCE_CONTINUITY.md) (`CONCEPT CLARIFICATION — UNDER OUTSIDE REVIEW`).

- A Work Item is NOT a Seed. A Seed restores world context and the legal action space; a Work Item identifies a bounded unit of authorized work.
- A Work Item can span multiple execution attempts and multiple fresh instances.
- A fresh instance exit does NOT change the Work Item identity (`work_item_id` remains stable).
- Handoff / Seed updates MUST NOT overwrite historical attempts; they become part of the next instance's Seed.
- Stale claim recovery MUST rely on environment-visible evidence (claim / lease state, traces), not on an instance's internal memory.

This section adds no concrete Runtime schema.

---

*End of contract.*
