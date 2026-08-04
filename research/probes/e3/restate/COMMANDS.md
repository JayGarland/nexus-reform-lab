# COMMANDS.md — Restate E3 probe (all commands)

> Representative command sequence. Raw stdout/stderr/exit evidence is in
> `RAW_OUTPUT/10step/run-log.txt`, `RAW_OUTPUT/server-*.log`,
> `RAW_OUTPUT/fixture/*`, `RAW_OUTPUT/export-*.json`.

## 1. Upstream identity (GitHub API)

```powershell
Invoke-RestMethod ... https://api.github.com/repos/restatedev/restate/releases/latest
Invoke-RestMethod ... https://api.github.com/repos/restatedev/restate/branches/main
Invoke-RestMethod ... https://api.github.com/repos/restatedev/restate/git/ref/tags/v1.7.2
```

## 2. Install / start server

```powershell
docker pull ghcr.io/restatedev/restate:1.7.2
docker run -d --name restate-probe-1272 -p 8090:8080 -p 9070:9070 `
  -v "F:\...\research\probes\e3\restate\SERVER_DATA:/data" `
  ghcr.io/restatedev/restate:1.7.2 --base-dir /data --log-format json
docker logs restate-probe-1272          # startup evidence
docker exec restate-probe-1272 restatectl status --time-format iso8601
```

## 3. Fixture service (host, disposable test adapter)

```powershell
cd research/probes/e3/restate/FIXTURE/service
npm install                              # installs @restatedev/restate-sdk@1.16.2
$env:RS_TRACE_FILE=...; $env:RS_COUNTER_FILE=...; $env:RS_WORKSPACE_DIR=...
node service.js                          # listens on 9080
```

Register the deployment (admin API):

```powershell
POST http://localhost:9070/deployments  {"uri":"http://host.docker.internal:9080"}
```

## 4. 10-step fixture (ingress: `POST http://localhost:8090/{Service}/{Key}/{Handler}`)

```text
S1  POST /WorkItem/A/init  {"id":"A","deps":[],"title":"Work A"}   (same B, C)
S2  POST /WorkItem/A/state {}  + native SQL over state table (see below)
S3  POST /WorkItem/B/claim {"claimant":"agent-1"}  then  {"claimant":"agent-2"}
S4  POST /WorkItem/B/startAttempt {"attemptId":"att-1"}
S5  (intermediate state persisted by startAttempt; read via /state)
S6  docker kill restate-probe-1272        # hard interruption mid-invocation
S7  docker start restate-probe-1272       # new server process, same data dir
S8  (invocation auto-resumed; verified via trace + /state + SQL)
S9  POST /WorkItem/B/finish {"output":"..."}
S10 raw evidence saved (see RAW_OUTPUT)
```

## 5. Native SQL query / export surface (admin `/query`)

```powershell
POST http://localhost:9070/query  {"query":"SELECT ..."}
# e.g.
SELECT service_name, service_key, key, value_utf8 FROM state
SELECT id, target_service_name, target_service_key, target_handler_name,
       status, idempotency_key, created_at, completed_at FROM sys_invocation
SELECT ... FROM sys_journal          # journal lineage
SELECT ... FROM sys_invocation_status
```

## 6. Pause / resume / kill (admin API, PATCH)

```powershell
PATCH http://localhost:9070/invocations/{invocation_id}/pause
PATCH http://localhost:9070/invocations/{invocation_id}/resume
PATCH http://localhost:9070/invocations/{invocation_id}/kill
```

## 7. Idempotency (exactly-once)

```powershell
POST /WorkItem/G/flaky  Header: Idempotency-Key: idem-fixture-001  (twice)
```

## 8. Cleanup / uninstall

```powershell
Stop-Process -Id <node-pid>                  # fixture service
docker rm -f restate-probe-1272
docker rmi ghcr.io/restatedev/restate:1.7.2
Remove-Item SERVER_DATA, WORKSPACE -Recurse -Force
# verify: docker ps -a, docker images, Get-NetTCPConnection 8090/9070/9080, Get-Process
```
