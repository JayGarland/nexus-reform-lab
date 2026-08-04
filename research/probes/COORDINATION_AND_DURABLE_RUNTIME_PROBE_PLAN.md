# Coordination and Durable Runtime Probe Plan

> **Status**: `PROBE PLAN — UNDER OUTSIDE REVIEW`
> **Purpose**: Define the unified, minimum common Probe scenario and the Human Cost metrics that will be run against the primary candidates from the Candidate Refresh. This is Probe planning only. No candidate is installed, started, or executed, no Engine is written, and no Adapter is implemented by this round.
> **Candidates** (primary, from [`CANDIDATE_REFRESH_COORDINATION_AND_DURABLE_RUNTIME.md`](../prior-art/CANDIDATE_REFRESH_COORDINATION_AND_DURABLE_RUNTIME.md)):
> - Coordination / Work Lifecycle: **Beads**, **go-workflows**
> - Durable Runtime / Recovery: **go-workflows**, **Restate**
> **Basis**: [`CONTRACT_TO_PROBE_MATRIX.md`](CONTRACT_TO_PROBE_MATRIX.md) (`CONFIRMED FOR PROBE-PLANNING SCOPE`), [`E3_PROBE_QUEUE.md`](../plans/E3_PROBE_QUEUE.md), [`E3_EXECUTION_PROTOCOL.md`](../plans/E3_EXECUTION_PROTOCOL.md), [`E3_ENVIRONMENT_ISOLATION.md`](../plans/E3_ENVIRONMENT_ISOLATION.md), [`BOUNDED_RUNTIME_EXECUTION_AND_RECOVERY_MINIMUM_CONTRACT.md`](../contracts/BOUNDED_RUNTIME_EXECUTION_AND_RECOVERY_MINIMUM_CONTRACT.md) (`CONFIRMED FOR SEMANTIC CONTRACT SCOPE`), [`WORK_ITEM_MINIMUM_CONTRACT.md`](../contracts/WORK_ITEM_MINIMUM_CONTRACT.md) (`CONFIRMED FOR SEMANTIC CONTRACT SCOPE`).
> **checked_at**: `2026-08-04T11:05+02:00`

---

## 1. Probe Principles

- E3 goal for each candidate: confirm the upstream software can be installed, started, and run the **minimum common scenario** in an isolated environment, with raw evidence and cleanup verified.
- E3 is **not**: Nexus adaptation, final selection, `ADOPT / ADAPT / COMPOSE / REJECT`, E4 fixed fixture, E5 replacement, or Provider binding.
- **Composition rule**: a Coordination wheel is not required to provide the full durable-runtime capability on its own, and a Runtime wheel is not required to provide complete Work Item semantics. One purpose of the Matrix is to determine which wheels should `COMPOSE`.
- **No self-made Engine**: the unified fixture must not require writing a custom Engine to paper over candidate gaps. If a candidate cannot express a step natively, that step is recorded as a gap with raw evidence (it feeds the `COMPOSE` question), not papered over.
- **Light test Adapter**: a thin, disposable adapter is allowed at Probe time to drive a candidate's native interface; it is **not implemented in this round** and it must never modify the candidate's canonical state semantics.

## 2. Probe Environment (host facts, this round)

```text
host OS        Windows (win32)
git            2.54.0.windows.1
node           v24.12.0
go             go1.26.4 windows/amd64   (feasible local path for go-workflows)
docker         Docker 28.3.2            (feasible local path for Restate server)
```

- Beads: official Windows amd64 binary (v1.1.2) in an isolated probe directory.
- go-workflows: local Go module embedding the library against a disposable record store.
- Restate: `restatectl`/server container via Docker (no Windows binaries); disposable container only.

Every probe runs in an isolated directory/container, never in the repository, and never touching the official Nexus.

## 3. Minimum Common Scenario (10 steps)

The same scenario is run per candidate. Each step records `commands`, `stdout`, `stderr`, `exit code`, `before/after state`, `timestamps`, and `human interventions`.

```text
1. Create three bounded Work Items that depend on each other (A -> B -> C).
2. Query Ready Work (items whose dependencies are satisfied).
3. Claim one Work Item (atomic, exclusive).
4. Establish one execution Attempt for the claimed item.
5. Persist one intermediate state inside the attempt.
6. Simulate process interruption (kill / crash / hard stop).
7. Recover with a new process or a new instance (fresh agent, same state store).
8. Continue or re-establish the Attempt.
9. Submit an Output for the item.
10. Save lineage, raw evidence, and human interventions.
```

Per-candidate adaptation:

| step | Beads (native) | go-workflows (Go embed) | Restate (server + SDK) |
|---|---|---|---|
| 1 | `bd task create` with `after` deps | workflow records with dependencies | service handlers / journal events |
| 2 | `bd tasks --ready` / query | workflow status queries | invocation state query |
| 3 | `bd task claim` (atomic) | record/lease via store | durable service invocation |
| 4 | task state update | workflow start/attempt record | service call |
| 5 | task state set (Dolt) | workflow event/persist | K/V entity state |
| 6 | kill process / `bd` stop | kill worker process | stop container / kill server |
| 7 | restart CLI, re-init from `.beads/` | new worker resumes from record store | restart server, journal replay |
| 8 | continue task | workflow continues | invocation resumes |
| 9 | `bd task close` | workflow completion event | journal completion |
| 10 | export + log capture | outbox/log capture | OTel/journal + raw log capture |

What each candidate **cannot** prove natively must be recorded as a gap (feeds the `COMPOSE` decision):

- Beads: durable retry lineage, pause/cancel, human-approval gate, external Workspace interaction.
- go-workflows: export surface, human-approval gate, external Workspace interaction.
- Restate: export surface, human-approval gate, Windows-native path, external Workspace interaction.

## 4. Unified Evidence Requirements

Every probe run saves (per `E3_ENVIRONMENT_ISOLATION.md`):

```text
upstream project and version
source URL / commit / release
installation commands
configuration
fixture
commands executed
stdout / stderr
exit code
timestamps
environment
before state / after state
raw outputs
crash or recovery evidence
human interventions
uninstall / rollback steps
findings
limitations
```

Where raw run evidence is missing: `CLAIMED_NOT_EVIDENCED`.

## 5. Human Cost Metrics

These metrics judge whether a wheel reduces the human's memory, attention, time, and effort burden — not whether it turns the human into a router, state looker-upper, or continuous supervisor. These are Probe metrics only; no Human Layer Contract is created.

```text
manual routing count                 how many times a human must decide which agent/worker/slot gets which item
manual state lookup count            how many times a human must open a separate tool to learn current state
manual recovery steps                how many human actions are required after the simulated interruption
clarifications required              how many times the system needs the human to disambiguate
number of surfaces the user must monitor   dashboards/CLIs/UIs the human must watch
time-to-understand-current-state     effort (time/commands) to answer "what is the current state"
irreversible decisions exposed to user     destructive/non-rollback choices the system pushes to the human
routine notifications exposed to user     low-signal pings/emails the human must triage
```

Each metric is measured per candidate at probe time and compared against a "no wheel" baseline (files + git only). Lower is better. Metrics are reported raw, not interpreted as an adoption verdict.

## 6. Probe Verdict Set

A Probe produces a verdict from:

```text
ADOPT
ADAPT
COMPOSE
REJECT
INCONCLUSIVE
```

Per-candidate Verdicts are preliminary probe results only and require separate box-outside review before any selection.

## 7. Stop Conditions (per candidate)

```text
- install / init failure
- native capability failure on steps 1-3
- uncontrolled background/autostart behavior
- out-of-isolation writes (outside the probe dir/container)
- inability to clean up (halt subsequent probes)
- a candidate that forces the fixture to write a custom Engine (recorded as a gap, not papered over)
```

## 8. Required Execution Order

```text
Probe 1 (Coordination, serial: Beads -> go-workflows)
-> save evidence -> cleanup -> verify cleanup -> outside review
-> ONLY THEN Probe 2 (Durable Runtime, serial: go-workflows -> Restate)
```

- Strictly serial. No batch installation. A box-in AI MUST NOT proceed from one probe to the next on its own; every candidate requires a separate authorization.
- No candidate is probed in this round; this plan is submitted for outside review first.

---

*End of probe plan.*
