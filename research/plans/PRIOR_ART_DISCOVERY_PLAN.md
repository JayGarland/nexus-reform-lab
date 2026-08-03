# Prior-Art Discovery Plan — Foundation 0.6

> **Document Status**: `PLAN — UNDER OUTSIDE REVIEW (Foundation 0.6)`
> **Scope**: Bounded methodology for investigating existing wheels against the five replaceable Provider capability slots. This is a PLAN ONLY. No candidate is installed, run, selected, adopted, adapted, or bound in this phase.
> **Non-Goals Notice**: This plan does not authorize research execution, tool installation, or Probes. It defines HOW future research must be conducted and gated.

---

## 1. Scope

This plan establishes a repeatable evidence-collection and comparison method for investigating whether existing wheels can occupy any of the five replaceable Provider capability slots without coupling Nexus to any specific tool, model, or data structure.

Scope boundaries:

- Investigation objects are existing open-source or internal wheels, evaluated against a Provider capability slot.
- A single wheel MAY cover multiple capabilities, but MUST be evaluated separately per capability.
- Nexus MUST NOT be rebuilt around a wheel's internal model merely because the wheel is feature-rich.
- This phase produces methodology only. It produces NO candidate conclusions and NO selection.

---

## 2. Provider Categories

All research objects are classified into exactly five Provider capability categories:

```text
1. Coordination Provider
2. Knowledge Projection Provider
3. Protocol Governance Provider
4. Experiment / Evaluation Provider
5. Runtime / Re-entry Provider
```

A candidate wheel MUST be registered per category it claims to cover. Each registration is an independent evaluation unit.

---

## 3. Candidate Intake

### Initial candidate pool (already surfaced)

**Coordination**

```text
Beads
go-workflows
Restate
```

**Knowledge Projection**

```text
Karpathy LLM Wiki
Existing local base-llm-wiki
Event Store + projection-class wheels
```

**Protocol Governance**

Investigation categories (no presumption that a custom solution is required):

```text
Policy-as-Code
Prompt / natural-language protocol versioning
Rule evaluation
Protocol lint / test / rollout / deprecation
```

**Experiment / Evaluation**

Investigation categories:

```text
AutoResearch-style experiment loop
Evaluation harness
Fixed workload replay
Candidate comparison
Keep / Refine / Discard / Revert
```

**Runtime / Re-entry**

Investigation categories:

```text
Durable agent runtime
Artifact-oriented re-entry
Crash recovery
Fresh-instance context reconstruction
Persistent execution handoff
```

### Intake rule for additions

Any new candidate added to the pool MUST record, at intake time:

- source (where it was surfaced from);
- capability category (which slot it maps to);
- reason it is worth investigating;
- whether it is a genuine candidate or merely an adjacent tool.

---

## 4. Research Sequence

Research proceeds in bounded stages. No stage MAY begin until the previous stage's exit criteria are met and the outside review boundary (Section 9) permits it.

```text
Stage 0 — Plan ratification (current)
Stage 1 — Evidence Card intake and documentation review (E0–E1)
Stage 2 — Source / architecture inspection (E2)
Stage 3 — Local execution probes (E3–E4) under fixed fixtures
Stage 4 — Crash / recovery / export / rollback tests (E5)
Stage 5 — Comparison matrix completion and proposal to outside review
```

Each stage records raw artifacts. Chat reports are navigation only, never evidence.

---

## 5. Evidence Requirements

Evidence levels are defined in `EVIDENCE_LEVELS.md` (E0–E5).

Gates:

- No candidate below E3 MAY enter selection discussion.
- No candidate below E4 MAY be claimed as a fit for Nexus.
- No candidate below E5 MAY be claimed as a safe replacement for an existing Provider.

Evidence classification per fact:

```text
DOCUMENTED
OBSERVED
INFERRED
NOT VERIFIED
```

Conclusions MUST NOT be based on README marketing claims alone.

---

## 6. Comparison Criteria

Every Provider candidate is scored or recorded across all eight dimensions:

1. **Capability Fit** — does the wheel genuinely provide the capability; is it a demo/scaffold/concept; how much Nexus-custom code is required.
2. **Persistence and Ownership** — where state lives; who owns Canonical State; exportability of Provider-private state; recoverability after removal.
3. **Modularity** — standalone integration; whether other modules must read its private database; whether it forces Nexus to adopt its full framework; thin-adapter feasibility.
4. **Failure and Recovery** — recovery after crash; lease / retry / idempotency / replay; whether failure pollutes Canonical Artifacts.
5. **Evidence and Auditability** — raw input/output retention; auditable traces; reproducibility; separation of fact / projection / cache.
6. **Migration and Replacement** — export, import, shadow mode, comparison, switch, rollback, removal cost.
7. **Operational Cost** — install complexity, runtime dependencies, resource requirements, model/API cost, maintenance burden, Windows / WSL adaptation cost.
8. **Governance Fit** — outside final adjudication retained; no self-executed irreversible actions; fail-closed support; ability to disable automatic dispatch or execution.

The comparison matrix schema is defined in `PROVIDER_COMPARISON_SCHEMA.md`.

---

## 7. Probe Preconditions

A Probe (any local execution of a candidate) MAY only run when ALL of the following hold:

- The plan has been ratified by outside review;
- An explicit Probe authorization exists for the specific candidate and fixture;
- The fixed fixtures from `FIXED_PROBE_FIXTURES.md` are used (or an authorized equivalent preserving input scale, failure point, comparison metric, and adjudication mode);
- The full Probe record structure (sources, environment, commands, fixtures, raw-output, before/after state, logs, findings, comparison, outside-verdict) is provisioned;
- The candidate is below E3 only in a sandboxed, disposable environment;
- No background daemon, agent, OpenClaw, runner, compiler, or service is left running.

---

## 8. Stop Conditions

Research for a candidate MUST stop and the candidate MUST NOT proceed when any of the following holds:

- The outside review boundary is not respected;
- The candidate requires irreversible actions or self-granted escalation to be tested;
- The candidate forces Nexus to adopt its full framework or exposes a private-state dependency that other modules would have to read;
- The candidate fails the E-level gate for the claim being made;
- Canonical Artifact pollution, provenance loss, or rollback failure is observed;
- The required evidence cannot be produced without violating the fixed-fixture or model-neutrality rules.

---

## 9. Outside Review Boundary

The following remain exclusively outside the box:

```text
Provider replacement approval
Acceptance criteria
Model selection
Safety boundaries
Irreversible-action approval
Final verdict
Write-back authorization
```

Box-in work in this phase produces methodology only. Box-in AI MUST NOT:

- modify the Stable Kernel;
- approve Provider replacement;
- declare any architecture better or superseded;
- lower migration, rollback, evidence, or safety gates;
- select, install, adapt, or bind any Provider.

---

## 10. Non-Goals

This plan does NOT:

- install, run, select, adopt, adapt, or bind any Provider or wheel;
- write any Adapter;
- modify the official Nexus;
- run any Probe;
- begin candidate research;
- start or modify `CR-S0`;
- treat model profiles (Gemini, DeepSeek, or any other) as architecture invariants;
- weaken the E3 / E4 / E5 gates;
- use the labels `ADOPT`, `KEEP`, `SELECTED`, `BOUND`, or `IMPLEMENTED` for any candidate.

---

*End of plan — submitted for outside review.*
