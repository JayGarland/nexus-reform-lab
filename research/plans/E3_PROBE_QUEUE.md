# E3 Probe Queue — Foundation 0.8

> **Status**: QUEUE PLAN — UNDER OUTSIDE REVIEW (Foundation 0.8)
> **Purpose**: First E3 execution queue and Probe boundaries. This round defines the queue only. NO candidate is installed, started, or executed. Each Probe requires a separate outside authorization before execution.

---

## 1. Queue Principles

- E3 goal is ONLY: confirm the upstream software can be installed, started, and run its minimal native capability in an isolated environment.
- E3 is NOT: Nexus adaptation, final selection, E4 fixed fixture, E5 crash/recovery/replacement, Adapter implementation, or Provider binding.
- Maximum: 0–1 candidate per Provider slot; total maximum 5.
- Not required to fill all five. Empty slots are allowed.
- Do NOT lower E3 admission criteria to cover every Provider.

---

## 2. E3 Admission Criteria

A candidate MAY enter the E3 queue only if ALL of the following hold (from E2 evidence):

```text
Evidence Level: E2
Upstream identity confirmed
License confirmed
Installation path documented
Minimal native example documented
No requirement to modify official Nexus
No uncontrolled background/autostart behavior
Cleanup path documented
```

Excluded this batch (do NOT lower the bar):

```text
karpathy llm-wiki — E0
base-llm-wiki     — E1-only
Oso               — E1 / ARCHITECTURAL REFERENCE ONLY
```

---

## 3. Proposed Queue (minimal and diverse)

| # | candidate | provider slot | why this candidate | why now |
|---|---|---|---|---|
| Probe 1 | Beads | Coordination | Narrow scope: dependency graph, ready/claim/close; small-wheel; low risk of pulling a full workflow runtime into Nexus (E2 `PROMISING`). | Narrowest Coordination candidate; earliest to prove install + native claim/ready cycle. |
| Probe 2 | Marten | Knowledge Projection | Library with user-defined event-stream projections; maps directly to the Knowledge Projection slot (E2 `PROMISING`). | Only Marten or KurrentDB is selected for this slot; Marten's library-in-app + single Postgres dependency is more controllable than a full event-store server. |
| Probe 3 | OPA | Protocol Governance | Single Go binary, no server needed for E3; `opa eval` / `opa test`; fail-closed and decision-trace semantics (E2 `PROMISING`). | Cleanest policy-loading + decision + trace proof; no credentials required. |
| Probe 4 | DVC | Experiment / Evaluation | Local Git-native experiment runner with `dvc exp run` / metrics; no cloud account or paid credentials (E2 `PROMISING`). | Proves fixed-workload replay + metric comparison with the smallest footprint; promptfoo/MLflow deferred. |
| Probe 5 | (EMPTY) | Runtime / Re-entry | Left empty. Temporal / Inngest / Hatchet / Restate carry service and internal-state models that would turn E3 into a large deployment task. | No E3 yet; revisit only if a minimal, cleanable local boundary can be defined and separately authorized. |

Each candidate fills its slot's per-candidate card (Section 5).

---

## 4. Deferred Candidates and Empty Slots

### Deferred (not in this batch)

```text
Coordination:          Restate, go-workflows (luno/workflow)
Knowledge Projection:  KurrentDB
Protocol Governance:   Cedar
Experiment/Evaluation: promptfoo, MLflow
Runtime/Re-entry:      Temporal, Inngest, Hatchet, Restate
```

### Empty Provider slots

```text
Runtime / Re-entry Provider   — EMPTY this batch
```

No candidate was promoted to fill an empty slot by lowering E3 admission criteria.

---

## 5. Per-Candidate Queue Cards

### Probe 1 — Beads (Coordination)

```text
candidate                Beads
provider slot            Coordination
why this candidate       Narrow scope; agent-oriented dependency graph; ready/claim/close; small wheel (E2)
why now                  Earliest to prove native install + minimal claim/ready cycle in isolation
what E3 can prove        Install; init; create task; dependency; ready; claim; close; export surface exists
what E3 cannot prove     Nexus fit; durability under crash; multi-agent sync; Dolt cluster behavior
installation method      Official binary/install script or local build in an isolated directory
runtime process model    CLI (foreground); Dolt embedded or Dolt server for multi-writer only (deferred)
network requirements     None required for embedded mode
credentials requirements None
filesystem mutation scope Isolated probe directory; .beads/ database inside probe dir
cleanup method           Remove probe directory; stop any started dolt process; verify no leftover files/ports
stop conditions          Fails to install; fails bd init; fails ready/claim/close; leaves background processes; cannot clean up
```

### Probe 2 — Marten (Knowledge Projection)

```text
candidate                Marten
provider slot            Knowledge Projection
why this candidate       Event-store projection engine mapping directly to Knowledge Projection (E2)
why now                  Needed to test projection install/start native capability with minimal fixture
what E3 can prove        .NET app + PostgreSQL start; append events; run a projection; read projection output
what E3 cannot prove     Projection rebuild/delete correctness at Nexus scale; provenance fidelity
installation method      Local .NET app in isolated dir; single disposable PostgreSQL container or local instance
runtime process model    Foreground app + disposable PostgreSQL instance (must be stopped/removed)
network requirements     Local only
credentials requirements None
filesystem mutation scope Isolated probe dir + disposable database data dir
cleanup method           Stop and remove PostgreSQL container/instance; remove probe dir; verify ports/files gone
stop conditions          Cannot run disposable Postgres; projection fails to build; cannot clean up
```

### Probe 3 — OPA (Protocol Governance)

```text
candidate                OPA
provider slot            Protocol Governance
why this candidate       Policy engine with policy loading, validation, decision result, fail-closed, decision trace (E2)
why now                  Cleanest single-binary proof; no credentials
what E3 can prove        Install binary; load policy; run opa test; evaluate decision; obtain decision trace
what E3 cannot prove     Natural-language protocol adaptation; rollout/deprecation workflow
installation method      Official binary into isolated probe dir
runtime process model    CLI (foreground); no server required for E3
network requirements     None
credentials requirements None
filesystem mutation scope Isolated probe dir only
cleanup method           Remove probe dir; verify no processes or global config changes
stop conditions          Binary fails to run; policy load/test fails; decision result wrong vs docs; cannot clean up
```

### Probe 4 — DVC (Experiment / Evaluation)

```text
candidate                DVC
provider slot            Experiment / Evaluation
why this candidate       Local Git-native experiment runner; pipelines + exp run + metrics; no credentials (E2)
why now                  Proves fixed-workload replay + baseline/candidate metric comparison with smallest footprint
what E3 can prove        Install; init; dvc add; dvc stage; dvc exp run; dvc exp show comparison
what E3 cannot prove     Closed-loop AutoResearch evaluator; raw-evidence fidelity at Nexus scale
installation method      Python package (pip) into isolated env, or official package; inside isolated probe dir
runtime process model    CLI (foreground); git-local
network requirements     None (no remote)
credentials requirements None
filesystem mutation scope Isolated probe dir (git repo, .dvc cache)
cleanup method           Remove probe dir; deactivate/remove isolated env; verify cleanup
stop conditions          Fails to install/run in isolated env; pipeline/exp run fails; cannot clean up
```

---

## 6. Selection Rationale

- Chosen candidates are the smallest, most controllable E2 candidates per slot (installation/cleanup, minimal native example, no cloud credentials, no long-lived background service).
- Diversity of architecture samples: CLI small-wheel (Beads), .NET library + Postgres (Marten), single-binary policy engine (OPA), Git-native Python experiment runner (DVC).
- Candidates that expose Provider-boundary or coupling risk were favored over popularity/stars.
- Star count, marketing, or model benchmarks were NOT used as selection criteria.

## 7. Coupling-Risk Rationale

- Beads, OPA, DVC, Marten each expose a narrow surface; adopting them does not force Nexus to accept a central world-model at E3.
- The engine-class candidates (Temporal, Restate, Inngest, Hatchet, MLflow, KurrentDB) were deferred because their service + internal-state models risk turning E3 into a large deployment and binding Nexus to a central engine.

## 8. Required Execution Order

```text
Probe 1
→ save evidence
→ cleanup
→ verify cleanup
→ outside review
→ ONLY THEN Probe 2
```

- Strictly serial. No batch installation.
- A box-in AI MUST NOT proceed from Probe 1 to Probe 2 on its own.
- Every candidate requires a separate authorization.

## 9. Per-Candidate Stop Conditions

See per-candidate cards (Section 5). Common stop conditions: install/init failure; minimal native capability failure; uncontrolled background/autostart behavior; inability to clean up (halt subsequent Probes).

---

*End of E3 Probe Queue.*
