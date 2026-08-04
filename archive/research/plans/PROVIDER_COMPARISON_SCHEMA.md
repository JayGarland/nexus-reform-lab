# Provider Comparison Schema — Prior-Art Discovery

> **Status**: PLAN SCHEMA — UNDER OUTSIDE REVIEW (Foundation 0.6)
> **Purpose**: Defines the unified Evidence Card and comparison matrix for all Provider candidates. This file defines structure only; it contains NO final candidate conclusions.

---

## 1. Evidence Card

Every candidate MUST be recorded using exactly this card. Fields are completed per the evidence classification rules; empty or unknown fields MUST be marked `NOT VERIFIED`, never silently omitted.

```text
candidate_id
upstream_project
upstream_repository
license
maintainer_status
latest_release
supported_platforms
deployment_model
primary_capability
secondary_capabilities
persistence_model
coordination_model
state_ownership
failure_recovery
exportability
importability
observability
security_boundary
model_dependency
removal_cost
integration_surface
known_limitations
source_citations
```

One Evidence Card exists per candidate per capability slot (a multi-capability wheel has multiple cards).

---

## 2. Evidence Classification

Every fact on a card MUST be tagged with exactly one classification:

```text
DOCUMENTED    — stated in upstream documentation / repository
OBSERVED      — directly observed in an executed Probe
INFERRED      — derived by reasoning from documented or observed facts
NOT VERIFIED  — not yet checked
```

Facts tagged only `DOCUMENTED` from README/marketing text MUST NOT support a fit claim.

---

## 3. Comparison Matrix

The matrix records each candidate against the eight comparison dimensions from the plan:

```text
Capability Fit
Persistence and Ownership
Modularity
Failure and Recovery
Evidence and Auditability
Migration and Replacement
Operational Cost
Governance Fit
```

For each dimension, the matrix records a structured rating and the supporting Evidence Level (E0–E5) and classification.

---

## 4. Conclusion Labels

While research is in progress, a candidate MAY only carry one of these labels:

```text
PROMISING
PARTIAL FIT
WEAK FIT
NOT A FIT
INSUFFICIENT EVIDENCE
```

The following labels are FORBIDDEN in the research phase:

```text
ADOPT
KEEP
SELECTED
BOUND
IMPLEMENTED
```

They may only be used after a real Probe at the required evidence level and an outside verdict.

---

## 5. Schema Invariants

- Provider-private operational state MUST NEVER be recorded as Canonical Truth.
- The matrix MUST NOT require any module to read another candidate's private database.
- Ratings MUST reference the Evidence Level that supports them.
- No candidate row may contain a final selection or binding claim.

---

*End of schema.*
