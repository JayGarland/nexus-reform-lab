# Human Cost — Restate E3 Probe (raw observations)

> Metrics per `research/probes/COORDINATION_AND_DURABLE_RUNTIME_PROBE_PLAN.md` Section 5.
> Measured by the operator running the full 10-step fixture against Restate 1.7.2
> (server via Docker on Windows, Node.js SDK fixture on host). Compared against a
> "no wheel" baseline (files + git only). Raw numbers, no adoption verdict.

Host: Windows 11 (win32), Docker Desktop 28.3.2 (WSL2), Node v24.12.0.

## 1. manual routing count
- Restate: **0 automatic routing primitives**. Work is routed by explicit HTTP
  invocation of a specific service/key/handler. The caller decides the key and
  handler on every call. The 10-step fixture required the operator to issue
  explicit ingress calls for init (3), claim (2), startAttempt (1), runDurable (1),
  finish (1) = **8 explicit routing decisions** to drive 3 work items + tests.
- No wheel baseline: also explicit file/name-based routing (agent picks a file).
  Restate does not add routing overhead, but it does not provide agent-facing
  ready/claim/lease vocabulary either.

## 2. manual state lookup count
- Restate: state is natively queryable in **one SQL SELECT** against the
  `/query` service (table `state`, `sys_invocation`, `sys_invocation_status`,
  `sys_journal`). Answering "what is the current state" = 1 command, ~1 s.
  Per-key state also available via the ingress `state` handler and the admin UI.
  No separate external tool required.
- No wheel baseline: open files / git status (1-2 commands). Comparable or lower.

## 3. manual recovery steps after simulated interruption
- Crash test (server SIGKILL mid-invocation): recovery required **1 command**
  (`docker start`). The invocation auto-resumed from the journal; completed
  durable steps were not re-executed; state survived. No manual re-invocation,
  no manual state repair.
- If the container had been deleted instead of stopped, recovery would require
  re-running `docker run` with the same data dir (2 commands total).

## 4. clarifications required
- Restate: **0** clarifications during the fixture. No ambiguities surfaced.
- Operator choices required up front (retry policy, handler semantics) but not
  runtime clarifications.

## 5. number of surfaces the user must monitor
- Restate: a running **server** (Docker container), a running **service** process
  (Node), and optionally the **admin UI** (9070). That is 2-3 live surfaces to
  keep running and healthy, plus data-dir disk to watch. This is the largest
  operational delta vs a "no wheel" baseline (files only, no daemons).
- Restate has no native notification channel: a paused, backing-off, or failed
  invocation is silent until someone queries the admin UI / SQL.

## 6. time-to-understand-current-state
- Restate: `SELECT ... FROM state` → ~1 s for a full dump; `sys_invocation`
  gives per-invocation lineage (id, target, status, timestamps, idempotency key).
  Very fast and native.

## 7. irreversible decisions exposed to user
- Native destructive ops: `kill`, `purge`, deployment deregistration
  (`DELETE /deployments/{id}`), and deleting the data dir (full rollback).
- There is no in-place user-data export binary; a pre-deletion backup is done via
  the SQL query service (`SELECT` on `state`/`sys_invocation`/`sys_journal`),
  which works but is operator-invented (not an official export feature).

## 8. routine notifications exposed to user
- Restate: **0 native notifications** (no email/SMS/webhook). Retry failures are
  recorded as `last_failure` in `sys_invocation`; paused invocations stay paused
  until an operator resumes them. The human must poll the UI/query to notice
  stuck or failed work. Polling burden is on the human.

## Raw counts (operator commands for the whole fixture + verification)
- ~20 shell commands for 10 steps + crash/recovery + pause/kill + idempotency +
  export + cleanup (excluding this evidence write-up).
- No wheel baseline equivalent: ~10 file operations for the same scenario.
