# OUTPUT_EVIDENCE.md — Restate E3 probe

## Server startup

```text
RAW_OUTPUT/server-startup.log   server banner "Restate Server 1.7.2 (6f1c080 x86_64-unknown-linux-gnu 2026-07-06)"
                                node roles [http-ingress | admin | worker | log-server | metadata-server]
                                ingress :8080 (host 8090), admin API :9070
RAW_OUTPUT/server-full.log      377 lines, includes crash/recovery window (09:49:10-09:49:11)
```

## 10-step fixture results

```text
S1  create A->B->C        A/B/C init all {"status":"CREATED"}              step1-init-*.txt
S2  query ready work      state readable per-key (step2-state-*.txt) +      step2-*.txt,
                          native SQL over `state` table (deps/status);        query-tools/
                          readiness projection = GAP-2
S3  claim B               agent-1 {"claimed":true}; agent-2 {"claimed":false,
                          "reason":"already-claimed"}                       step3-claim-*.txt
S4  attempt on B          startAttempt {"attemptId":"att-1","status":"IN_PROGRESS",
                          "intermediate":"portion-1"}                        step4-startattempt.txt
S5  intermediate state    B state shows intermediate="portion-1"             step5-state-after.txt
S6  interruption          docker kill (SIGKILL) mid-runDurable(D);           run-log.txt
                          step-0,step-1 executed before kill                  fixture/step-trace.log
S7  recovery              docker start; partition replay + auto-recovery      server-full.log
S8  resume                steps 2-5 executed after restart, invocation        fixture/step-trace.log
                          COMPLETED progress=6; no re-execution               step8-state-after-recovery.txt
S9  output for B          finish {"status":"DONE","output":"..."}             step9-finish-B.txt
S10 lineage saved         sys_invocation / sys_invocation_status /            export-*.json
                          sys_journal dumps
```

## Durable execution / crash proof

```text
fixture/step-trace.log
  09:48:55.432 RUN step-0 executed      <- before SIGKILL
  09:48:57.853 RUN step-1 executed      <- before SIGKILL
  (kill)
  09:49:11.548 RUN step-2 executed      <- after restart (resumed)
  09:49:13.968 RUN step-3 executed
  09:49:16.385 RUN step-4 executed
  09:49:18.806 RUN step-5 executed
  => step-0 and step-1 appear exactly once (no re-execution on journal replay)
```

## Retry proof

```text
fixture/step-trace.log + flaky-counter.txt
  09:49:51.235 RUN flaky-step executed attempt#0  (failed)
  09:49:51.297 RUN flaky-step executed attempt#1  (failed)
  09:49:51.409 RUN flaky-step executed attempt#2  (failed)
  09:49:51.619 RUN flaky-step executed attempt#3  (success)
  handler returned {"ok":true,"attempts":3}
  journal (sys_journal) records ONE Run entry "flaky-step" + final completion   retry-sysjournal.json
```

## Pause / resume / kill proof

```text
PATCH /invocations/inv_1cD8TRkaTLCd4u4HEhqXRygQc7a2EVe5JV/pause  -> 202
PATCH .../resume -> 200
PATCH .../kill   -> 200
sys_invocation_status: status=completed, completion_failure="[409] killed"     pause-final2.json
```

## Idempotency (exactly-once) proof

```text
WorkItem/G/flaky with Idempotency-Key: idem-fixture-001 (called twice)
execution counter unchanged after 2nd call; single sys_invocation row with the key  idem-sysinv.json
```

## Native SQL export proof

```text
RAW_OUTPUT/export-state.json    21 rows (state table)
RAW_OUTPUT/export-sysinv.json   17 invocations (sys_invocation)
RAW_OUTPUT/export-journal.json  249 journal entries (sys_journal)
```

## External workspace proof

```text
step-workspace-touch.txt  {"wrote":"notes/from-agent.txt"}
WORKSPACE/notes/from-agent.txt content "hello external workspace" (removed in cleanup)
```
