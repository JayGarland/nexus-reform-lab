# Protocol Governance Minimum Contract

> **Status**: `DRAFT SEMANTIC CONTRACT — UNDER OUTSIDE REVIEW`
> **Purpose**: Define the minimum identity, scope, authority, version, conflict handling, amendment, approval, deprecation, rollback, and evidence semantics that a natural-language Protocol must have as Software 3.0, without binding any concrete Protocol Engine or carrier.
> **Scope**: Semantic contract only. This draft binds no Protocol Engine, no OPA or rule engine, no Registry implementation, no precedence resolver, and no Runtime enforcement.
> **Basis**: [`PERSISTENT_SCOPE_TOPOLOGY.md`](../synthesis/PERSISTENT_SCOPE_TOPOLOGY.md) (`CONFIRMED FOR CONCEPTUAL SCOPE`), [`PERSISTENT_ROOM_AND_WORKSPACE_BINDING.md`](../synthesis/PERSISTENT_ROOM_AND_WORKSPACE_BINDING.md) (`CONFIRMED FOR CONCEPTUAL SCOPE`), [`LAYERED_WORLD_RUNTIME_MODEL.md`](../synthesis/LAYERED_WORLD_RUNTIME_MODEL.md) (`CONFIRMED FOR CONCEPTUAL SCOPE`)

---

## 1. Goal

> 定义自然语言 Protocol 作为 Software 3.0 时必须具备的最小身份、作用域、权威、版本、冲突处理、变更、审批、废弃、回滚和证据语义，而不绑定具体 Protocol Engine 或 carrier。

## 2. Protocol Definition

A Protocol is:

> a persisted, versioned Software 3.0 Artifact with a scope and governance boundary that constrains the behavior of Agents, Runtime, Providers, or Work Items.

A Protocol is NOT:

```text
casual advice
chat suggestion
unreviewed proposal
prompt fragment
provider-private configuration
executor self-declared rule
immutable eternal doctrine
```

Relation:

```text
Concept
→ formalized as Protocol
→ reviewed and ratified
→ activated within an explicit Scope
→ interpreted during execution
→ later amended, superseded, deprecated, or rolled back
```

## 3. Protocol Identity

Every Protocol MUST have a stable identity:

```text
protocol_id
```

`protocol_id` MUST NOT change due to:

- file moves
- carrier migration
- format changes
- directory reorganization
- the creation of a new Protocol version

The distinction MUST hold:

```text
protocol_id
= Protocol lineage identity

protocol_version_id
= one immutable version in that lineage
```

The file path or title alone MUST NOT be used as identity.

## 4. Minimum Protocol Semantics

Every Protocol version should express, at minimum:

```text
protocol_id
protocol_version_id
title
purpose
status
scope_refs
authority_source
applies_to
rules
required_actions
forbidden_actions
approval_requirements
precedence
effective_from
supersedes
superseded_by
evidence_refs
decision_trace_ref
rollback_ref
```

These are semantic requirements, not a final schema.

## 5. Protocol Status

Minimum state set:

```text
PROPOSED
UNDER_REVIEW
RATIFIED
ACTIVE
SUSPENDED
SUPERSEDED
DEPRECATED
REVOKED
```

Meanings:

- `PROPOSED`: candidate content with no execution binding force.
- `UNDER_REVIEW`: under review, not yet effective.
- `RATIFIED`: authorized approval obtained, but not necessarily activated in a concrete Scope.
- `ACTIVE`: effective within an explicit Scope and time range.
- `SUSPENDED`: execution temporarily stopped, lineage retained.
- `SUPERSEDED`: replaced by an explicit newer version.
- `DEPRECATED`: still referable by legacy systems, but should not be used for new work.
- `REVOKED`: authorization withdrawn; MUST NOT continue execution.

A single `CONFIRMED` MUST NOT be used to simultaneously express "content correct", "approved", and "effective in the Runtime".

## 6. Separation of Proposal, Ratification, and Activation

The following MUST be distinguished:

```text
Proposal
Ratification
Activation
Execution
Evaluation
```

Rules:

- A box AI MAY draft a Protocol Proposal.
- A box AI MUST NOT ratify it by itself.
- Ratification is done by outside governance or an explicitly authorized governance role.
- A Ratified Protocol does NOT automatically take effect in all Scopes.
- Activation MUST declare the Scope, version, effective boundary, and necessary preconditions.
- The Runtime MAY only execute a Protocol that is lawfully ACTIVE.
- An execution result cannot retroactively prove a Protocol is correct.

## 7. Scope

A Protocol MUST have an explicit Scope.

It may apply to:

```text
World
Persistent Scope
Room
Work Item type
specific Work Item
Provider type
Runtime operation
Workspace Binding
cross-Scope edge
```

It MUST declare:

```text
scope_refs
```

A Protocol without a Scope MUST NOT automatically be treated as a global rule.

A World-level Protocol does not automatically hold the highest authority just because it sits in the World root; its authority MUST come from an explicit governance source.

## 8. Inheritance and Local Rules

Current minimum semantics:

```text
World Protocol
→ may provide defaults or invariants

Local Scope Protocol
→ may add local constraints
→ may override only when explicitly permitted
```

The following MUST be distinguished:

```text
inherited rule
local extension
authorized override
forbidden override
```

A Room or other local Scope MUST NOT silently weaken the World's safety boundary, external adjudication requirement, or irreversible-operation restrictions.

If a higher-level Protocol explicitly permits an override, the local Protocol MUST record:

```text
overrides_protocol_version_id
override_basis
authorized_by
effective_scope
```

## 9. Precedence and Conflict

A Protocol MUST NOT rely on "file read order" or "last modifier wins" to resolve conflicts.

Minimum conflict decision bases:

```text
authority level
scope specificity
explicit override permission
protocol status
version
effective time
safety boundary
```

But it MUST be explicit:

> A more specific Scope does not automatically defeat a higher-authority rule.

When a conflict cannot be resolved automatically:

```text
CONFLICT_DETECTED
→ execution blocked
→ conflict evidence recorded
→ outside adjudication required
```

An executor MUST NOT pick the more convenient rule by itself.

## 10. Rule Types

A Protocol should distinguish at least:

```text
MUST
MUST_NOT
MAY
REQUIRES_APPROVAL
REQUIRES_REVIEW
CONDITIONALLY_ALLOWED
```

Natural language may be preserved, but the normative meaning of a rule must be recognizable.

Examples:

```text
Executor MUST externalize execution evidence before exit.

Executor MUST NOT emit ACCEPTED verdict.

Cross-Scope access REQUIRES_APPROVAL unless an active edge Protocol explicitly authorizes it.
```

This round does not design a full DSL.

## 11. Authority and Approval

Every Protocol MUST record its authority source.

For example:

```text
outside governance verdict
ratified doctrine
delegated governance role
approved Scope owner
```

The following MUST NOT be treated as authority:

```text
executor confidence
model explanation
completion report
provider default
file author name alone
last Git committer alone
```

Ratification, Activation, Suspension, Revocation, and high-risk Override of a Protocol MUST all leave an explicit approval record.

## 12. Decision Trace

Every significant governance action MUST leave a Decision Trace:

```text
proposal created
review requested
review findings
ratification verdict
activation decision
scope binding
override decision
suspension
supersession
deprecation
revocation
rollback
```

A Decision Trace should reference, at minimum:

```text
actor or authority
timestamp
subject protocol version
decision
reason
evidence refs
affected scopes
resulting status
```

It MUST NOT only write "approved" or "updated" without basis and subject.

## 13. Versioning and Immutable History

Published `protocol_version_id` content MUST be treated as immutable history.

To amend a Protocol:

```text
same protocol_id
+ new protocol_version_id
```

Old versions MUST NOT be silently overwritten.

Pure lineage placeholder or format-error corrections are allowed, but the following MUST be distinguished:

```text
historical metadata repair
semantic protocol amendment
```

Semantic amendments MUST produce a new version.

## 14. Supersede, Deprecate, and Revoke

The following MUST be distinguished:

```text
SUPERSEDED
= a newer version replaces this version

DEPRECATED
= retained for history/compatibility but discouraged for new use

REVOKED
= authority withdrawn; must not execute
```

A new version MUST declare:

```text
supersedes: protocol_version_id
```

An old version SHOULD declare:

```text
superseded_by: protocol_version_id
```

History MUST NOT be deleted.

## 15. Rollback

Every activated Protocol version MUST have an interpretable rollback path.

Rollback MAY be:

```text
reactivate previous valid version
suspend current version
restore previous Scope binding
revert related configuration
block further execution pending review
```

Rollback is NOT deletion of history.

After a rollback the following MUST be recorded:

- trigger reason
- affected Scopes
- which version was reverted to
- which executions already occurred
- whether remediation is needed
- the new Current Protocol State

## 16. Executor Boundary

An executor, Provider, Runtime, or box AI MAY:

- read an Active Protocol
- execute according to authorization
- detect conflicts
- submit a Proposal
- submit Evidence
- request Review
- declare inability to comply or need for clarification

It MUST NOT:

- ratify its own drafted Protocol by itself
- activate a Protocol above its permission by itself
- lower a safety boundary by itself
- decide conflict rules by itself
- declare a Protocol validated by itself
- promote passing tests to production readiness by itself
- modify outside governance power by itself

## 17. Protocol and Other Objects

```text
Concept
→ may be formalized by Protocol

Protocol
→ constrains Runtime, Provider, Work Item, Scope, Workspace access

Protocol Artifact
→ persistent representation

Decision Trace
→ governance history

Evaluation
→ provides evidence, not automatic authority

Verdict
→ may authorize Protocol state transition
```

A Protocol itself is also an Artifact and MAY become a pheromone:

```text
Active Protocol
+ observable meaning
+ effect on later action
→ stigmergic effect
```

## 18. Cross-Scope Protocol

Cross-scope operations MUST be governed by an explicit Protocol, for example:

- review edge
- knowledge supply edge
- dependency edge
- governance edge
- restricted bridge
- shared infrastructure

A cross-Scope Protocol should declare, at minimum:

```text
source_scope_ref
target_scope_ref
edge_type
allowed actions
forbidden actions
data or artifact boundary
write-back location
canonical ownership
approval requirement
termination condition
```

This round defines semantics only; it does not implement cross-Scope transport.

## 19. Protocol Current State

The following MUST be distinguished:

```text
Protocol History
Protocol Registry
Current Active Protocol Set
```

- History records all versions and decisions.
- Registry records known Protocol lineages.
- Current Active Protocol Set projects only the Protocol versions actually effective for the current Scope.

A fresh instance MUST NOT be required to read all Protocol history and guess the current rules.

A Seed / WAKE should preferentially provide:

```text
current active Protocol refs
relevant precedence
known conflicts
required approvals
```

## 20. Legacy Nexus Boundary

Legacy Nexus natural-language rules, Prompts, Letter templates, and cc-connect constraints may only serve as:

```text
legacy protocol evidence
migration candidate
Adapter requirement clue
historical failure evidence
```

They MUST NOT automatically count as Active Protocol.

They must pass through:

```text
extract
→ identify
→ normalize
→ review
→ ratify
→ scope
→ activate
```

"Was once written in the Archive" does not equal "currently in effect".

## 21. No Engine Selection

This round MUST NOT:

- install or adopt OPA
- write a full Policy DSL
- implement a Protocol Registry
- implement a precedence resolver
- implement Runtime enforcement
- implement automatic Protocol amendment
- implement AutoResearch Keep / Discard
- treat the mere existence of a Markdown file as executed Protocol

A Protocol Engine, when it appears later, MUST be a replaceable Provider and MUST obey this Contract.

---

*End of contract draft.*
