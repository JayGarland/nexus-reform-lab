# Contract-to-Probe Matrix

> **Status**: `CONFIRMED FOR PROBE-PLANNING SCOPE — content confirmed at commit 560aba51606084f027af34365f5d2c82b6fb3226; the negation-aware fail-closed verifier implementation in that commit is NOT confirmed`
> **Purpose**: Convert the completed Minimum Contracts into real-world survey and probe questions across capability domains, so that prior-art wheels are investigated instead of the future system being fully pre-built in Markdown.
> **Scope**: Probe planning and survey matrix only. This document does not require any wheel to fully replicate our Contracts, does not run any Probe, and does not select or bind any Provider.
> **Basis**: [`WORK_ITEM_MINIMUM_CONTRACT.md`](../contracts/WORK_ITEM_MINIMUM_CONTRACT.md) (`CONFIRMED FOR SEMANTIC CONTRACT SCOPE`), [`PROTOCOL_GOVERNANCE_MINIMUM_CONTRACT.md`](../contracts/PROTOCOL_GOVERNANCE_MINIMUM_CONTRACT.md) (`SEMANTIC CONTRACT — CONFIRMED FOR SEMANTIC CONTRACT SCOPE`), [`BOUNDED_RUNTIME_EXECUTION_AND_RECOVERY_MINIMUM_CONTRACT.md`](../contracts/BOUNDED_RUNTIME_EXECUTION_AND_RECOVERY_MINIMUM_CONTRACT.md) (`SEMANTIC CONTRACT — CONFIRMED FOR SEMANTIC CONTRACT SCOPE`), [`EVALUATION_BASELINE_AND_VERDICT_LOOP_MINIMUM_CONTRACT.md`](../contracts/EVALUATION_BASELINE_AND_VERDICT_LOOP_MINIMUM_CONTRACT.md) (`SEMANTIC CONTRACT — CONFIRMED FOR SEMANTIC CONTRACT SCOPE`), [`GLOBAL_ROADMAP_RECONCILIATION.md`](../plans/GLOBAL_ROADMAP_RECONCILIATION.md) (`ROADMAP RECONCILIATION — UNDER OUTSIDE REVIEW`), [`CONCEPT_AND_CONTRACT_EXPANSION_FREEZE.md`](../governance/CONCEPT_AND_CONTRACT_EXPANSION_FREEZE.md) (`ACTIVE GOVERNANCE BOUNDARY — OUTSIDE AUTHORIZED`)

---

## 1. Purpose

The Matrix does not require any wheel to fully replicate our Contracts. It converts Contract content into real-world questions that a Probe answers with raw evidence.

## 2. Capability Domains

### A. Coordination / Work Lifecycle

Investigation questions:

- Is there a persistent Work Item identity?
- How are dependencies and ready work expressed?
- Do Claim / Lease exist?
- How is stale work recovered?
- Is an execution attempt independent?
- Is Review separated from the executor?
- Is the carrier exportable?
- Does it create a central Boss?

Initial candidates:

```text
Beads
MCP Agent Mail / AgenticMail relevant components where applicable
issue / task graph systems found in prior research
```

Adoption must not be automatic merely because of Letter similarity.

### B. Durable Runtime / Recovery

Investigation questions:

- crash recovery
- durable execution
- retry lineage
- state persistence
- external workspace interaction
- cancel and pause
- human approval
- Provider-private state export
- deletion and rollback cost

Initial candidates:

```text
go-workflows
Restate
```

Candidates may be adjusted through a new Prior-Art refresh, but the reason must be recorded.

### C. Protocol Governance / Policy-as-Code

Investigation questions:

- Protocol identity / version
- scope
- approval
- precedence
- conflict blocking
- decision trace
- supersede / deprecate / revoke
- rollback
- natural-language rule support
- whether it can act as a replaceable Provider

OPA must not be chosen by default.

### D. Evaluation / Experiment

Investigation questions:

- fixed fixture
- baseline
- candidate
- raw evidence
- repeated run
- evaluator independence
- Keep / Discard / Revert
- human intervention accounting
- rollback
- whether external verdict is allowed

Do not build a self-made evaluator first.

### E. Knowledge Projection

Investigation questions:

- current / history separation
- provenance
- supersession
- contradiction
- export
- migration
- Seed integration
- provider replacement cost

Current E3 candidates are retained, but E4 is not run in this round.

## 3. Unified Evidence Requirements

Every future Probe MUST save:

```text
upstream project and version
source URL / commit / release
installation commands
configuration
fixture
commands executed
stdout
stderr
exit code
timestamps
environment
before state
after state
raw outputs
crash or recovery evidence
human interventions
uninstall / rollback steps
findings
limitations
```

When raw run evidence is missing:

```text
CLAIMED_NOT_EVIDENCED
```

## 4. Probe Verdict Set

A Probe Verdict may only be one of:

```text
ADOPT
ADAPT
COMPOSE
REJECT
INCONCLUSIVE
```

## 5. Next-Round Entry

The next round's sole objective should be:

> Prior-Art Candidate Refresh and Probe Plan for Coordination and Durable Runtime.

Next round is only allowed to:

1. verify the current upstream status of Beads, go-workflows, and Restate
2. check whether more suitable small wheels of the same class exist
3. establish the same fixture and a real run plan for candidates
4. NOT implement a self-made replacement
5. NOT directly declare adoption

## 6. Non-Implementation

This round MUST NOT run these Probes.

---

*End of matrix.*
