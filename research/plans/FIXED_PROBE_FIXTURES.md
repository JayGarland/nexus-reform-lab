# Fixed Probe Fixtures — Prior-Art Discovery

> **Status**: PLAN — UNDER OUTSIDE REVIEW (Foundation 0.6)
> **Purpose**: Defines the fixed fixtures that future Probes MUST use so that candidates are compared on the same input scale, failure point, comparison metric, and adjudication mode. This file defines future fixtures only; NOTHING is executed in this phase.

---

## 1. Shared Minimal Fixture

All capability Probes SHOULD use the same minimal fixture sequence where applicable:

```text
Task A depends on Task B
Task B becomes ready
One worker claims Task B
Worker crashes before completion
A fresh worker recovers state
Task B completes
Task A becomes ready
Provider exports state
Provider is removed or reset
State is imported or reconstructed
```

Knowledge, Protocol, Evaluation, and Re-entry Provider probes may use equivalent fixtures, but the following MUST stay identical across candidates:

```text
Input scale
Failure point
Comparison metrics
External adjudication mode
```

---

## 2. Probe Record Structure

Every Probe MUST save, at minimum, the following directories:

```text
sources/
environment/
commands/
fixtures/
raw-output/
before-state/
after-state/
logs/
findings/
comparison/
outside-verdict/
```

---

## 3. Probe Metadata

Every Probe MUST record:

```text
tool version
commit / release
command
working directory
environment
start time
end time
exit code
stdout
stderr
input fixture
output artifact
before / after hash
unexpected mutation
cleanup procedure
```

---

## 4. Evidence Rules

- Raw Probe artifacts are evidence; chat reports are navigation only.
- A Probe MAY only run after explicit authorization and ratification of this plan.
- Any unexpected mutation of Canonical Artifacts MUST be logged and reported.
- Cleanup MUST be recorded and verified.

---

*End of fixed-fixture specification.*
