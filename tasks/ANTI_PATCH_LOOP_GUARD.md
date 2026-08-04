# Anti-Patch-Loop Guard — Bounded Repair Task

> **Status**: OUTPUT SUBMITTED — AWAITING BOX-OUT REVIEW
> **Authorized By**: box-out operator, recorded in `state/CURRENT.md`
> **Scope**: Add a lightweight execution fuse to the Reform Lab. This task does not restore archived Minimum Contracts and does not create an Engine, Runtime, scheduler, or governance platform.
>
> The previous execution authorization is exhausted.
> This file does not independently authorize additional mutation.

---

## Goal

Stop an execution agent from continuously patching the same problem indefinitely and gradually drifting away from the original goal while repeated "minimal fixes" are attempted.

## Acceptance Criteria

The repair is ready for box-out review only when all of the following hold:

1. Every Workspace mutation must be able to point to the specific Acceptance Criterion it advances.
2. When the same failure remains unresolved after 2 consecutive corrective attempts, execution must stop.
3. When the same file requires a 3rd corrective patch, execution must stop.
4. When a repair introduces a new adjacent failure, execution must stop and the diagnosis must restart.
5. When the original root-cause hypothesis no longer holds, execution must stop.
6. When a mutation cannot be shown to advance the overall goal, execution must stop.
7. After stopping, the executor outputs `REPLAN_REQUIRED` and must not continue mutating.
8. An executor may submit only `OUTPUT_SUBMITTED`, `BLOCKED`, `FAILED`, or `REPLAN_REQUIRED`; it must not self-declare `ACCEPTED`.
9. All attempt and failure evidence must be preserved; old attempts must not be overwritten.

## Allowed Changes

Only the following files may be modified or created by this task:

```text
AGENTS.md
MEMORY_MAP.md
state/CURRENT.md
state/check_structure.js
tasks/ANTI_PATCH_LOOP_GUARD.md
necessary minimal test files
```

## Forbidden Changes

The following are explicitly forbidden:

```text
restoring the whole archive/research/contracts/
creating an Engine
creating a Runtime
creating a scheduler / worker
creating an automatic dispatch loop
creating a new permission level
modifying the formal Nexus
modifying E3 Probe Evidence
starting a new Probe
selecting or binding a Provider
```

## Stop Conditions

Hard fuses. If any of the following triggers, the executor must stop mutating immediately, persist evidence, and submit `REPLAN_REQUIRED`:

```text
PATCH_LOOP_DETECTED:
- same failure remains after 2 corrective attempts
- same file requires a 3rd corrective patch
- a repair produces a new adjacent failure
- current mutation cannot map to an Acceptance Criterion
- original diagnosis or base assumption is invalid
- required scope must expand beyond Allowed Changes
```

When a Stop Condition triggers, only the following may be submitted, and no mutation tools may be called afterwards:

```text
REPLAN_REQUIRED

work_item:
trigger:
attempts:
changed_files:
current_git_state:
evidence:
invalidated_assumption:
outside_decision_required:
```

## Evidence Required

- Every attempt, including failed and superseded attempts, must be recorded.
- Old attempt records must not be overwritten or deleted; a new attempt appends lineage to the previous one.
- Evidence must be persisted before any conclusion is reported.

## Box-Out Review Boundary

- The executor is not a reviewer and has no authority to accept its own work.
- An executor submits `OUTPUT_SUBMITTED`, `BLOCKED`, `FAILED`, or `REPLAN_REQUIRED`.
- An executor MUST NOT self-declare `ACCEPTED`.
- After one implementation and validation pass, the executor stops and awaits box-out review.
- Box-out independently decides `ACCEPT`, `REJECT`, or `REQUEST_CHANGES`.

---

*End of bounded repair task.*
