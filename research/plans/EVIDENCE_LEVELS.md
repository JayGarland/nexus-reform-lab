# Evidence Levels — Prior-Art Discovery

> **Status**: PLAN — UNDER OUTSIDE REVIEW (Foundation 0.6)
> **Purpose**: Defines evidence levels E0–E5 and the upgrade requirements between them. This file defines methodology only; nothing is executed in this phase.

---

## 1. Level Definitions

```text
E0 — Mention only
     A candidate was mentioned/surfaced. No documentation inspected, no execution.

E1 — Upstream documentation inspected
     Upstream README / docs reviewed. Facts are DOCUMENTED at most.

E2 — Source / architecture inspected
     Source code and architecture reviewed. Structural claims may be DOCUMENTED/INFERRED.

E3 — Upstream software locally executed
     The candidate's own software was run locally (sandboxed). Facts may be OBSERVED.

E4 — Fixed Nexus-compatible fixture executed
     The candidate ran against the fixed fixtures defined in FIXED_PROBE_FIXTURES.md
     (or an authorized equivalent). Nexus-relevant behavior is OBSERVED.

E5 — Crash / recovery / export / rollback empirically tested
     Failure, recovery, export/import, and rollback were exercised empirically under
     the fixed fixtures.
```

---

## 2. Upgrade Requirements

Progress to a higher level requires the following preconditions:

```text
E0 → E1   Record source + capability category + intake rationale.
E1 → E2   Capture the inspected source refs; record DOCUMENTED vs INFERRED separation.
E2 → E3   Obtain explicit Probe authorization; sandboxed disposable environment; full Probe record structure provisioned.
E3 → E4   Execute the fixed fixture (or authorized equivalent) with recorded raw output, before/after hashes, and cleanup.
E4 → E5   Execute crash / recovery / export / import / rollback cases with before/after state and unexpected-mutation logging.
```

---

## 3. Gates

- **No candidate below E3 MAY enter selection discussion.**
- **No candidate below E4 MAY be claimed as a fit for Nexus.**
- **No candidate below E5 MAY be claimed as a safe replacement for an existing Provider.**

A candidate that cannot reach the required level MUST be recorded as `INSUFFICIENT EVIDENCE` and stopped.

---

## 4. Evidence Discipline

- Chat reports are navigation only, never evidence.
- Raw artifacts (stdout, stderr, exit codes, hashes, logs) are the evidence.
- Model performance is recorded separately and MUST NOT be mixed into tool-capability ratings.
- A model's speed or error-proneness MUST NOT lower or raise any evidence gate.

---

*End of evidence-level specification.*
