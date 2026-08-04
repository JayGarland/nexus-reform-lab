# Prior-Art Candidate Refresh — Coordination / Work Lifecycle and Durable Runtime / Recovery

> **Status**: `PRIOR-ART REFRESH — UNDER OUTSIDE REVIEW`
> **Purpose**: Refresh the current upstream status of Coordination / Work Lifecycle and Durable Runtime / Recovery wheels, select at most three primary Probe candidates per capability domain, and prepare the candidates for the unified Probe plan. This is Prior-Art Discovery, not a Concept, Contract, or implementation phase.
> **Scope**: Two capability domains only (A. Coordination / Work Lifecycle; B. Durable Runtime / Recovery). No other capability slot is refreshed this round. No candidate is installed, started, or executed. No `ADOPT / ADAPT / COMPOSE / REJECT` Verdict is issued.
> **Basis**: [`CONTRACT_TO_PROBE_MATRIX.md`](../probes/CONTRACT_TO_PROBE_MATRIX.md) (`CONFIRMED FOR PROBE-PLANNING SCOPE`), [`E3_PROBE_QUEUE.md`](../plans/E3_PROBE_QUEUE.md), [`CANDIDATE_REGISTRY.md`](e1-e2/CANDIDATE_REGISTRY.md) and the E1/E2 surveys (`research/prior-art/e1-e2/`), [`GLOBAL_ROADMAP_RECONCILIATION.md`](../plans/GLOBAL_ROADMAP_RECONCILIATION.md) (`CONFIRMED FOR ROADMAP SCOPE`).
> **checked_at**: `2026-08-04T11:05+02:00` (upstream facts below were inspected via the official GitHub API / upstream repos at this time)

---

## 1. Evidence-Level Discipline

This round is a Candidate Refresh and Probe Plan. It raises nothing beyond E1 for this round.

```text
E0 — name or claim only (e.g. README description, feature list, demo, box-in AI summary)
E1 — upstream documentation or source inspected
E2 — install / run / recovery evidence
```

Rules applied:

- README claims, feature lists, demos, and box-in AI summaries are **not** recorded as E2.
- Every fact below is tagged `DOCUMENTED` (inspected upstream), `INFERRED`, or `NOT VERIFIED`.
- Deeper capability assessments for candidates already surveyed in Foundation 0.7 carry the prior committed E2 survey evidence; the **refresh-level evidence level** for the current upstream facts is E1 (official repo / release metadata inspected).
- No `OBSERVED` tag is used (no local execution this round).

## 2. Upstream-Fact Record Fields

Every candidate card records:

```text
project
official source
current version / release / commit
license
maintenance status
last meaningful activity
installation surface
state carrier
export surface
known limitations
evidence level
source refs
checked_at
```

---

## 3. Domain A — Coordination / Work Lifecycle

### 3.1 Investigation questions (from the Contract-to-Probe Matrix)

```text
- persistent Work Item identity
- dependency / ready work
- Claim / Lease or equivalent
- stale recovery
- execution attempt
- Review / executor separation
- exportability
- whether it creates a central Boss
- human attention and operation burden
```

### 3.2 Candidate cards

#### 3.2.1 Beads (gastownhall/beads) — Coordination

```text
project                    Beads
official source            github.com/gastownhall/beads (homepage beads.gascity.com)
current version/release    v1.1.2 (published 2026-07-26) (DOCUMENTED)
current commit             default branch main; release tag v1.1.2 pinned by release assets (DOCUMENTED)
license                    MIT (DOCUMENTED, GitHub API)
maintenance status         Active; 25,933 stars, 1,742 forks, 465 open issues (DOCUMENTED)
last meaningful activity   pushed_at 2026-08-04T07:11Z; release v1.1.2 2026-07-26 (DOCUMENTED)
installation surface       Prebuilt binaries for Windows (amd64/arm64), macOS (amd64/arm64), Linux, FreeBSD, Android/Termux;
                           Homebrew (macOS/Linux); install scripts (bash / install.ps1) (DOCUMENTED)
state carrier              Dolt-backed SQL database in .beads/ (versioned, schema-guarded) (prior E2 survey, DOCUMENTED)
export surface             bd export --all; issues.jsonl interchange; bd dolt push/pull sync (prior E2 survey, DOCUMENTED)
known limitations          Single-writer embedded mode; Dolt server required for concurrent writers (prior E2 survey, DOCUMENTED)
evidence level             E1 (refresh: official repo + release metadata inspected); prior E2 survey committed at CANDIDATE_REGISTRY.md
source refs                https://github.com/gastownhall/beads; /releases/tag/v1.1.2
checked_at                 2026-08-04T11:05+02:00
```

**Coordination answers** (from prior E2 survey, re-affirmed by current metadata): dependency-aware task graph; ready / claim / close; atomic claim; blockers release ready; persistent durable task state; export surface exists; agent-instruction (AGENTS.md) integration; no background daemon; local CLI. Does **not** force a central Boss.

**Human-burden note**: Beads is CLI/local; state lives in `.beads/`; the human need only run a CLI and read `bd show` — but each agent must be pointed at the right scope, and stale-work visibility depends on reading the task graph.

#### 3.2.2 go-workflows (luno/workflow) — Coordination + Durable Runtime

```text
project                    go-workflows
official source            github.com/luno/workflow
current version/release    v0.5.0 (published 2026-07-19) (DOCUMENTED)
current commit             default branch main; release tag v0.5.0 (DOCUMENTED)
license                    BSD-3-Clause (GitHub API); prior survey noted README previously stated MIT — discrepancy recorded, SPDX NOT VERIFIED (DOCUMENTED)
maintenance status         Active; 250 stars, 21 forks, 17 open issues (DOCUMENTED)
last meaningful activity   pushed_at 2026-08-04T01:11Z; release v0.5.0 2026-07-19 (DOCUMENTED)
installation surface       Go library embedded in an application; pluggable adapters (streamer, record store, role scheduler) (DOCUMENTED)
state carrier              Application-owned record store through an adapter interface (e.g. sqlstore, memrecordstore) (prior E2 survey, DOCUMENTED)
export surface             NOT VERIFIED in prior survey; no export surface found in README (prior E2 survey, NOT VERIFIED)
known limitations          Go-native; no agent-ready workflow surface; requires a Go runtime and adapter wiring; export surface unverified (prior E2 survey, DOCUMENTED/INFERRED)
evidence level             E1 (refresh: official repo + release metadata inspected); prior E2 survey committed at CANDIDATE_REGISTRY.md
source refs                https://github.com/luno/workflow; /releases/tag/v0.5.0
checked_at                 2026-08-04T11:05+02:00
```

**Coordination answers**: durable type-safe event-driven workflow/state-machine orchestration; durable events with outbox exactly-once; retries, timeouts, pause; role-based scheduling; status state machine. Provides durable work-item/attempt semantics but not an agent-facing ready/claim/lease vocabulary out of the box. State ownership is application-side behind an adapter — replaceable.

#### 3.2.3 Restate (restatedev/restate) — Coordination + Durable Runtime (primary assessment in Domain B)

```text
project                    Restate
official source            github.com/restatedev/restate (docs.restate.dev)
current version/release    v1.7.2 (published 2026-07-06) (DOCUMENTED)
current commit             main HEAD 37d2ac73dceac70798bdde83866ccdf1a1bc69db (2026-08-04T08:47Z) (DOCUMENTED)
license                    License file present; SPDX NOASSERTION / "Other" on GitHub (DOCUMENTED)
maintenance status         Active; 4,245 stars, 191 forks, 409 open issues (DOCUMENTED)
last meaningful activity   pushed_at 2026-08-04T08:47Z; main HEAD commit 2026-08-04 (DOCUMENTED)
installation surface       Server + SDKs (TypeScript, Java, Python, Go, Rust); CLI (restatectl); Homebrew formulae for macOS/Linux;
                           prebuilt binaries for macOS (aarch64/x86_64) and Linux (aarch64/x86_64 musl); NO Windows binaries in v1.7.2 assets (DOCUMENTED)
state carrier              Server-persisted execution journal + per-entity K/V state (prior E2 survey, DOCUMENTED)
export surface             NOT VERIFIED (prior E2 survey); automatic data migration across x.y releases (DOCUMENTED)
known limitations          Requires a running server (central coordination model); Windows local path absent (Docker/WSL only); export unverified; license SPDX unverified (prior E2 survey, DOCUMENTED/INFERRED)
evidence level             E1 (refresh: official repo + release + HEAD commit inspected); prior E2 survey committed at CANDIDATE_REGISTRY.md
source refs                https://github.com/restatedev/restate; /releases/tag/v1.7.2; /commit/37d2ac73dceac70798bdde83866ccdf1a1bc69db
checked_at                 2026-08-04T11:05+02:00
```

**Coordination answers**: request/response, one-way messages, scheduled tasks with exactly-once; durable execution; consistent K/V entity state. Fused Coordination + Runtime; central server owns canonical execution/state — the central-Boss question is the key probe risk.

#### 3.2.4 AgenticMail (agenticmail/agenticmail) — reusable partial capability, NOT a Coordination core

```text
project                    AgenticMail
official source            github.com/agenticmail/agenticmail (npm: agenticmail)
current version/release    NOT VERIFIED this round (repo metadata only; npm package page not inspected in depth)
current commit             default branch main; pushed_at 2026-07-28T07:15Z (DOCUMENTED)
license                    MIT (DOCUMENTED, GitHub API)
maintenance status         Active but small; 186 stars, 33 forks, 7 open issues (DOCUMENTED)
last meaningful activity   pushed_at 2026-07-28T07:15Z (DOCUMENTED)
installation surface       npm package; MCP server; TypeScript; topics include mcp/mcp-server/claude-code (DOCUMENTED)
state carrier              Email/SMS/phone messaging service (external); not a task state carrier (DOCUMENTED/INFERRED)
export surface             n/a as messaging transport; messages are not work-item state (INFERRED)
known limitations          Messaging infrastructure for agents (email/SMS/phone); provides NO Work Item identity, dependency, Claim/Lease, ready work, or stale recovery (DOCUMENTED/INFERRED)
evidence level             E0 this round (official repo metadata + description inspected only; README/code NOT inspected)
source refs                https://github.com/agenticmail/agenticmail
checked_at                 2026-08-04T11:05+02:00
```

**Coordination answers**: It is a transport, not a coordinator. Its only relevant reuse is as a component for the human-notification surface (routine notifications / human intervention), i.e. it can inform the Human Cost probe, not the Work Item core.

#### 3.2.5 Registry issue/task-graph / durable work-item candidates (already surveyed)

- **go-workflows** and **Restate** are the registry's Coordination candidates (cards above).
- No other registry row is a Coordination / Work Lifecycle candidate. SaaS issue/task trackers (GitHub Issues, Linear, Jira-style) are **not** probe candidates: central SaaS, no agent Claim/Lease/ready semantics, no local reversible Probe path, API-licensed access. → `DROP_BEFORE_PROBE`.

### 3.3 New small-wheel entrants reviewed (search performed this round)

| project | created | stars (approx) | note | status |
|---|---|---|---|---|
| iiwish/agent-cli-runtime | 2026-06-16 | 100 | TypeScript CLI runtime harness for Codex/Claude/OpenCode with task graphs; Apache-2.0 | `INSUFFICIENT_EVIDENCE` (too new, not established) |
| KristjanPikhof/Trekoon | 2026-02-16 | 8 | Bun-powered CLI task graph shared by agents+humans; MIT | `INSUFFICIENT_EVIDENCE` (too new/small) |
| StarChen-Cycler/octie-cli | 2026-06-17 | 3 | "State-oriented task graph kernel"; no license file | `INSUFFICIENT_EVIDENCE` |
| kinqsradiollc/BrainRouter | 2026-05-15 | 3 | memory/orchestration platform | `INSUFFICIENT_EVIDENCE` (too new/small) |

**Conclusion**: No newer, established small wheel has displaced **Beads** for agent-oriented task-graph coordination. New entrants are all under six months old with tiny adoption; they do not warrant a Probe this round.

### 3.4 Domain A candidate status

| candidate | status | role |
|---|---|---|
| Beads | `KEEP_FOR_PROBE` (primary #1) | Task-graph coordination core |
| go-workflows (luno/workflow) | `KEEP_FOR_PROBE` (primary #2) | Durable work-item / workflow orchestration |
| Restate | `SECONDARY` (assessed primarily under Domain B) | Fused coordination+runtime; central server risk |
| AgenticMail | `SECONDARY` | Reusable messaging/notification component only; E0 this round |
| SaaS issue/task trackers (GitHub Issues, Linear, etc.) | `DROP_BEFORE_PROBE` | Central SaaS; no agent Claim/Lease/ready semantics; no local reversible probe path |
| New entrants (agent-cli-runtime, Trekoon, octie-cli, BrainRouter) | `INSUFFICIENT_EVIDENCE` | Too new / too small; re-check in a future refresh |

**Domain A primary probe candidates (2 ≤ 3): Beads, go-workflows.**

---

## 4. Domain B — Durable Runtime / Recovery

### 4.1 Investigation questions (from the Contract-to-Probe Matrix)

```text
- durable execution
- crash recovery
- retry lineage
- state persistence
- pause / cancel
- human approval
- external Workspace interaction
- state export
- uninstall / rollback cost
- whether it monopolizes canonical state
- human attention and operation burden
```

### 4.2 Candidate cards

#### 4.2.1 go-workflows (luno/workflow) — Durable Runtime (same upstream card as 3.2.2)

**Durable answers**: durable event-driven execution; exactly-once via outbox; retries and timeouts; pause/cancel surface exists in the workflow API; pluggable record store (application-owned state, not monopolized); observability (Prometheus/Web UI). Export surface `NOT VERIFIED`; crash recovery is retry/outbox-based. Embeddable Go library — small, replaceable, external-Workspace friendly.

#### 4.2.2 Restate (restatedev/restate) — Durable Runtime (same upstream card as 3.2.3)

**Durable answers**: durable execution recovers partial progress without re-running completed steps; exactly-once messaging; durable promises/timers; consistent per-entity K/V state; automatic data migration across releases. **Risks**: server-owned canonical execution/state (monopoly question); export surface `NOT VERIFIED`; no Windows binaries (probe path is Docker/WSL only); license SPDX unverified; central-server model raises uninstall/rollback cost and human ops burden (a server to run and monitor).

#### 4.2.3 river (riverqueue/river) — Durable Runtime / background jobs

```text
project                    River
official source            github.com/riverqueue/river (riverqueue.com)
current version/release    NOT VERIFIED this round (repo metadata only; release endpoint not inspected)
current commit             default branch master; pushed_at 2026-08-03T20:40Z (DOCUMENTED)
license                    MPL-2.0 (DOCUMENTED, GitHub API)
maintenance status         Active; 5,520 stars, 170 forks, 54 open issues (DOCUMENTED)
last meaningful activity   pushed_at 2026-08-03T20:40Z (DOCUMENTED)
installation surface       Go library + PostgreSQL; workers; Go toolchain (DOCUMENTED)
state carrier              PostgreSQL (river schema) — durable job state (DOCUMENTED)
export surface             NOT VERIFIED (job data is in Postgres; no dedicated export surface found in repo metadata)
known limitations          Durable background job queue with retries and periodic jobs; NOT a general durable-execution engine (no arbitrary computation-state machine, no pause/cancel semantics documented at this evidence level) (DOCUMENTED/INFERRED)
evidence level             E1 (refresh: official repo metadata inspected); no prior survey committed
source refs                https://github.com/riverqueue/river
checked_at                 2026-08-04T11:05+02:00
```

**Durable answers**: durable job execution + retries + crash-safe queue via Postgres. Partial fit only: does not cover the full durable-execution/state-persistence/pause-cancel surface, and requires Postgres. → `SECONDARY`.

#### 4.2.4 Registry durable-execution candidates (already surveyed at E2 in Foundation 0.7)

| candidate | prior registry status | refresh decision | reason |
|---|---|---|---|
| Temporal | E2 `PROMISING` | `SECONDARY` | Canonical durable-execution platform (server + workers, MIT); heavy; server-owned history; export `NOT VERIFIED`; central model |
| Hatchet | E2 `PROMISING` | `SECONDARY` | Postgres-backed orchestration (MIT); heavy (server + Postgres + Docker on Windows); export `NOT VERIFIED` |
| Inngest | E2 `PARTIAL FIT` | `DROP_BEFORE_PROBE` | Server SSPL/DOSP license + heavy central event/step-function model; export `NOT VERIFIED` |
| temporalite (temporalio/temporalite-archived) | n/a (not in registry) | `DROP_BEFORE_PROBE` | Upstream **archived**; last push 2024-04-03; no longer a maintained single-binary distribution |

### 4.3 New small-wheel entrants for Durable Runtime

Search this round found no established new small durable-execution engine beyond the candidates above. `river` (card 4.2.3) is the notable recent durable-background-jobs wheel but is `SECONDARY` (Postgres + partial surface). No new entrant is promoted.

### 4.4 Domain B candidate status

| candidate | status | role |
|---|---|---|
| go-workflows (luno/workflow) | `KEEP_FOR_PROBE` (primary #1) | Embeddable durable-execution library; replaceable store |
| Restate | `KEEP_FOR_PROBE` (primary #2) | Reference durable-execution server; probe resolves export + canonical-state + local-path questions (Docker/WSL only) |
| river | `SECONDARY` | Durable background jobs; partial fit |
| Temporal | `SECONDARY` | Canonical platform; heavy |
| Hatchet | `SECONDARY` | Postgres orchestration; heavy |
| Inngest | `DROP_BEFORE_PROBE` | SSPL server license + heavy central model |
| temporalite | `DROP_BEFORE_PROBE` | Upstream archived |

**Domain B primary probe candidates (2 ≤ 3): go-workflows, Restate.**

---

## 5. Primary Probe Candidate Selection Summary

| domain | primary probe candidates (≤3) |
|---|---|
| A. Coordination / Work Lifecycle | Beads, go-workflows |
| B. Durable Runtime / Recovery | go-workflows, Restate |

- **go-workflows** is primary in both domains because it genuinely spans Coordination (workflow/state-machine orchestration) and Durable Runtime (durable events, outbox exactly-once, retries). The unified Probe will test it against both capability sets — this is exactly the `COMPOSE` question the Matrix wants answered.
- Primary status is preliminary only. It is **not** `ADOPT / ADAPT / COMPOSE / REJECT`.

## 6. Selection Principles Applied

```text
small wheel                    Beads, go-workflows ✓   Restate ✗ (server) — kept for its reference value
clear capability boundary      Beads (task graph) ✓   go-workflows (workflow) ✓
exportable state               Beads ✓ (export exists); go-workflows/Restate ✗ (NOT VERIFIED — probe question)
light Adapter requirement      Beads (CLI) ✓   go-workflows (Go embed) ~   Restate (HTTP/gRPC SDK) ~
reversible installation        Beads ✓   go-workflows ✓   Restate ~ (server + Docker)
no central-Boss lock-in        Beads ✓   go-workflows ✓   Restate ✗ (central server — probe question)
active upstream                all three ✓
usable local Probe path        Beads (Windows binary) ✓   go-workflows (Go) ✓   Restate (Docker/WSL only) ~
```

## 7. Non-Goals and Freeze Compliance

- No new Concept Model or Minimum Contract was created (Concept and Contract Expansion Freeze stays active).
- No candidate was installed, started, or executed; no test Adapter or Engine was written; no fixture created.
- No `ADOPT / ADAPT / COMPOSE / REJECT` Verdict was issued.
- No Provider was selected or bound.
- Capability domains outside Coordination and Durable Runtime were not refreshed.
- If a new capability class is encountered in a future refresh, it is recorded here for a future round; it does not expand this round.

---

*End of candidate refresh.*
