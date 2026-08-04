# Evaluation Baseline and Verdict Loop Minimum Contract

> **Status**: `DRAFT SEMANTIC CONTRACT — UNDER OUTSIDE REVIEW`
> **Purpose**: Define the minimum semantic contract by which a candidate Protocol, Provider, Runtime composition, or other controlled change is compared under a fixed workload, a trusted Baseline, checkable evidence, and an independent evaluator, and produces box-outside verdicts such as Keep / Discard / Revert, without binding any concrete evaluator or experiment platform.
> **Scope**: Semantic contract only. This draft binds no evaluator, no benchmark harness, no AutoResearch loop, no experiment platform, no fixture, no Baseline run, and no Candidate run.
> **Basis**: [`WORK_ITEM_MINIMUM_CONTRACT.md`](WORK_ITEM_MINIMUM_CONTRACT.md) (`CONFIRMED FOR SEMANTIC CONTRACT SCOPE`), [`PROTOCOL_GOVERNANCE_MINIMUM_CONTRACT.md`](PROTOCOL_GOVERNANCE_MINIMUM_CONTRACT.md) (`SEMANTIC CONTRACT — CONFIRMED FOR SEMANTIC CONTRACT SCOPE`), [`BOUNDED_RUNTIME_EXECUTION_AND_RECOVERY_MINIMUM_CONTRACT.md`](BOUNDED_RUNTIME_EXECUTION_AND_RECOVERY_MINIMUM_CONTRACT.md) (`SEMANTIC CONTRACT — CONFIRMED FOR SEMANTIC CONTRACT SCOPE`), [`TWO_LEG_ASYNCHRONOUS_OPERATING_MODEL.md`](../synthesis/TWO_LEG_ASYNCHRONOUS_OPERATING_MODEL.md) (`CONFIRMED FOR OPERATING MODEL SCOPE`), [`PERSISTENT_WORLD_OBJECT_MODEL.md`](../synthesis/PERSISTENT_WORLD_OBJECT_MODEL.md) (`CONFIRMED FOR CONCEPTUAL SCOPE`), [`FOUR_LAYER_ONE_WORLD_MINIMUM_LANDING_ROADMAP.md`](../plans/FOUR_LAYER_ONE_WORLD_MINIMUM_LANDING_ROADMAP.md) (`CONFIRMED FOR ROADMAP SCOPE`)

---

## 1. Goal

> 定义候选 Protocol、Provider、Runtime composition 或其他受控变更如何在固定 workload、可信 baseline、可检查 evidence 和独立 evaluator 下被比较，并产生 Keep / Discard / Revert 等盒外裁决。

This Contract defines the minimum semantic contract that any future evaluation / experiment system must be able to express. It does not mandate field names, file layouts, schemas, products, or evaluation platforms. A compliant system must be able to map its representation onto these semantics and export a stable Artifact expression.

## 2. Core Objects

The following MUST be distinguished:

```text
Evaluation Campaign
Workload
Fixture
Baseline
Candidate
Run
Measurement
Evidence
Evaluator
Evaluation Result
Verdict
Adoption Decision
Rollback Target
```

A single run result, a model self-assessment, or a passing test MUST NOT be treated directly as the final Verdict.

## 3. Evaluation Campaign

An Evaluation Campaign is:

> a persistent evaluation unit in which a Baseline and one or more Candidates are comparably and reviewably evaluated under an explicit goal, a fixed boundary, a fixed workload, and predefined metrics.

Minimum semantics:

```text
evaluation_campaign_id
purpose
scope_ref
subject_type
baseline_ref
candidate_refs
workload_ref
metric_refs
evaluator_ref
acceptance_policy_ref
evidence_refs
status
verdict_ref
```

These are semantic requirements, not a final schema.

## 4. Campaign States

Minimum states:

```text
PROPOSED
READY
RUNNING
EVIDENCE_SUBMITTED
UNDER_REVIEW
VERDICT_ISSUED
CLOSED
ABORTED
INVALIDATED
```

An executor MUST NOT move a Campaign to `VERDICT_ISSUED` by itself.

## 5. Workload and Fixture

A Workload MUST describe the real capability or behavior being evaluated.

A Fixture MUST be:

- identifiable
- versionable
- reusable
- explicit in input boundaries
- traceable in origin
- not silently changed across Candidates

The following MUST be recorded:

```text
workload_id
fixture_id
fixture_version
source
normalization steps
expected constraints
known limitations
```

Real Nexus history may be used as a fixture in the future, but only after cleaning, normalization, and replay-boundary definition.

An un-cleaned Archive MUST NOT be used directly as Ground Truth.

## 6. Baseline

A Baseline is:

> a recorded result used as a comparison reference under the same workload, fixture, environment, and evaluator conditions.

The following MUST be recorded:

```text
baseline_id
subject version
configuration
protocol set
provider set
runtime profile
fixture version
environment
raw outputs
measurements
known defects
evidence refs
```

A Baseline cannot be only a description or a subjective impression.

Without a trusted Baseline, a Candidate MUST NOT be claimed to "improve" anything.

## 7. Candidate

A Candidate MUST be a bounded change.

The following MUST be explicit:

```text
candidate_id
based_on_baseline
changed_variable
unchanged_variables
subject version
expected effect
risk
rollback target
```

Preferred rule:

> A Campaign changes one explainable variable at a time where possible.

If multiple variables are changed together, it MUST be marked as a combination experiment, and the result MUST NOT be attributed to any single change.

## 8. Run Identity

Every Baseline or Candidate execution MUST have:

```text
evaluation_run_id
```

Every re-run uses a new Run identity and does not overwrite an old Run.

A Run SHOULD reference, at minimum:

```text
campaign_id
baseline_or_candidate_ref
workload_ref
fixture_version
environment_ref
protocol_set_ref
provider_set_ref
runtime_profile_ref
model_ref
started_at
ended_at
raw_output_refs
measurement_refs
evidence_refs
run_status
```

## 9. Environment and Comparability

Baseline and Candidate SHOULD fix as much as possible:

```text
workload
fixture
evaluation instructions
model/profile where relevant
tool versions
resource limits
timeout
environment
evaluator version
metric definitions
```

If conditions cannot be fixed, the differences MUST be recorded and the conclusion strength MUST be lowered.

Result differences caused by environment drift MUST NOT be claimed as Candidate improvement.

## 10. Metric

Metrics MUST be defined before a run.

They may include:

```text
correctness
task completion
recovery success
protocol compliance
self-acceptance violations
human intervention count
latency
cost
context usage
artifact completeness
traceability
rollback success
failure containment
```

Every Metric MUST record:

```text
metric_id
definition
measurement method
direction
threshold
weight if any
known blind spots
```

Metrics MUST NOT be temporarily modified after seeing results to manufacture a pass.

## 11. Raw Evidence

Raw Evidence SHOULD preferentially preserve:

```text
input fixture
commands
tool/model versions
environment
stdout / stderr
exit codes
timestamps
raw outputs
before/after state
Git commits
file hashes
test logs
review notes
```

A summary report may reference Evidence, but MUST NOT replace it.

When raw evidence is missing, it MUST be marked:

```text
CLAIMED_NOT_EVIDENCED
```

## 12. Evaluator Independence

The following MUST be distinguished:

```text
Executor
Evaluator
Reviewer
Final Verdict Authority
```

The same software tool may participate in multiple steps, but governance roles MUST remain separated.

An Executor MUST NOT:

- define ad-hoc metrics by itself
- declare a Candidate better than the Baseline by itself
- publish a Keep by itself
- ignore a failed fixture by itself
- delete negative results by itself

An Evaluator produces an Evaluation Result; it does not automatically produce the final Adoption Decision.

## 13. Evaluation Result

An Evaluation Result MAY include:

```text
metric measurements
pass/fail by metric
confidence
uncertainty
invalid runs
evidence gaps
regressions
unexpected effects
comparison summary
```

Results MUST distinguish:

```text
MEASURED
INFERRED
CLAIMED
NOT_EVIDENCED
INVALID
```

## 14. Verdict

Minimum Verdict set:

```text
KEEP
DISCARD
REVERT
RETRY
INCONCLUSIVE
INVALID_EVALUATION
REQUIRES_MORE_EVIDENCE
```

Meanings:

- `KEEP`: evidence supports retaining the Candidate
- `DISCARD`: the Candidate is not adopted; the Baseline remains
- `REVERT`: an already adopted or trial-run Candidate must be rolled back
- `RETRY`: the method is valid but this round's Run must be redone
- `INCONCLUSIVE`: evidence is insufficient to judge
- `INVALID_EVALUATION`: the evaluation design or execution is invalid
- `REQUIRES_MORE_EVIDENCE`: specific evidence is required before adjudicating

`KEEP` does NOT automatically equal production rollout.

## 15. Adoption and Verdict Separation

The following MUST be distinguished:

```text
Evaluation Verdict
Adoption Decision
Activation / Migration Decision
Production Readiness
```

Even when the Verdict is `KEEP`, the following may still be required:

```text
shadow period
migration plan
permission approval
rollback verification
official Nexus access approval
```

## 16. Keep Conditions

A future Keep policy SHOULD require at minimum:

- workload and fixture are valid
- the Baseline is trusted
- the Candidate change is bounded
- key metrics reach predefined thresholds
- no unacceptable regression
- raw Evidence is complete
- results are traceable
- a rollback path exists
- independent Review is complete
- box-outside Verdict authorization is granted

A single passing test with exit code 0 MUST NOT automatically Keep.

## 17. Discard and Revert

`DISCARD` MUST preserve the history of the Candidate, the Run, and the failed Evidence.

`REVERT` MUST record:

```text
revert reason
affected Scope
candidate version
rollback target
executed rollback actions
remaining effects
verification evidence
```

History MUST NOT be deleted to pretend something never happened.

## 18. Invalidation

A Campaign or Run MAY be `INVALIDATED` when:

```text
fixture changed silently
baseline missing
environment incomparable
evidence missing
metric changed after run
candidate contains undeclared changes
evaluator conflict of interest
run output corrupted
wrong protocol/provider version
```

An invalidated Run MUST NOT be used for a Keep / Discard conclusion.

## 19. Repeated Runs

Repeated runs MUST:

- create a new `evaluation_run_id`
- preserve the old result
- record the re-run reason
- state randomness or environment differences
- not keep only the best result

If statistical aggregation is used, the aggregation method MUST be recorded.

## 20. Human Intervention

Human intervention during evaluation MUST be recorded, for example:

```text
manual routing
manual repair
clarification
permission approval
workspace cleanup
result correction
```

Human intervention is not necessarily a failure, but it MUST enter the Measurement so that a solution with high human cost is not misjudged as autonomous improvement.

## 21. Protocol / Provider / Runtime Evaluation

The same Contract SHOULD be able to evaluate:

```text
Protocol candidate
Coordination Provider
Knowledge Provider
Runtime implementation
Workspace Adapter
Evaluation Provider itself
combined composition
```

But the subject type and the changed variable MUST be explicit.

## 22. Self-Evaluation Boundary

An evaluated Protocol, Provider, Runtime, or Agent MAY submit:

```text
outputs
logs
measurements
self-observations
failure reports
```

But its self-assessment MAY only serve as Evidence, not as the final Verdict.

## 23. Current-State Projections

The following MUST be distinguished:

```text
Campaign History
Run History
Current Active Campaigns
Current Candidate Set
Current Baseline
Current Evidence Status
Current Evaluation Result
Current External Verdict
Current Adoption State
```

A fresh instance MUST NOT guess the currently adopted approach from all old experiments by itself.

## 24. AutoResearch Boundary

AutoResearch, in the future, is:

> a replaceable Experiment Provider that repeatedly generates, runs, compares, and filters Candidates under a fixed workload, an explicit candidate space, an independent evaluator, and an external governance boundary.

It MUST NOT:

- change the stable kernel by itself
- lower metrics by itself
- expand the candidate space by itself
- KEEP by itself
- deploy by itself
- hide failures
- run indefinitely

This round does not implement AutoResearch.

## 25. Minimum Future Probe

A future minimum Evaluation Probe MUST at minimum prove:

```text
one fixed fixture
one recorded baseline
one bounded candidate
same evaluation conditions
raw evidence persisted
metrics computed
independent result produced
outside verdict recorded
discard/revert path preserved
no executor self-approval
```

This round MUST NOT run such a Probe.

## 26. Legacy Nexus Boundary

Old Nexus Letter, Archive, dispatch, Thread, and cc-connect history MAY serve as:

```text
fixture source
baseline evidence
failure corpus
migration comparison material
```

but MUST pass through:

```text
extract
→ normalize
→ deduplicate
→ classify
→ version
→ approve fixture
```

Untreated history MUST NOT be used directly as evaluator truth.

## 27. Non-Implementation

This round MUST NOT:

- write an evaluator runner
- implement a benchmark harness
- implement AutoResearch
- create a real fixture
- run a Baseline
- run a Candidate
- select an evaluation platform
- connect the official Nexus
- run CR-S0

## 28. Cross-References

Minimum references:

```text
research/contracts/WORK_ITEM_MINIMUM_CONTRACT.md
research/contracts/PROTOCOL_GOVERNANCE_MINIMUM_CONTRACT.md
research/contracts/BOUNDED_RUNTIME_EXECUTION_AND_RECOVERY_MINIMUM_CONTRACT.md
research/synthesis/TWO_LEG_ASYNCHRONOUS_OPERATING_MODEL.md
research/synthesis/PERSISTENT_WORLD_OBJECT_MODEL.md
research/plans/FOUR_LAYER_ONE_WORLD_MINIMUM_LANDING_ROADMAP.md
```

Confirmed content is not rewritten.

---

*End of contract draft.*
