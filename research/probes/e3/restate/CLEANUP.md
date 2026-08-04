# CLEANUP.md — Restate E3 probe

## Uninstall / rollback commands executed

```powershell
# fixture service process
Stop-Process -Id 36504 -Force          # node service.js (port 9080)

# deployment deregistration (admin API) -> returned 501 (recorded in FINDINGS.md #12)
Invoke-WebRequest -Uri http://localhost:9070/deployments/dp_11kMNUMcsqYYHNLen9k1cNr -Method DELETE

# container + image (full rollback)
docker rm -f restate-probe-1272
docker rmi ghcr.io/restatedev/restate:1.7.2

# runtime data (canonical state RocksDB + workspace test artifacts)
Remove-Item SERVER_DATA -Recurse -Force
Remove-Item WORKSPACE  -Recurse -Force

# npm node_modules (kept package.json/package-lock.json/service.js as evidence)
Remove-Item FIXTURE/service/node_modules -Recurse -Force
Remove-Item RAW_OUTPUT/query-tools/node_modules -Recurse -Force
```

## Post-cleanup verification (all PASSED)

```text
docker ps -a --filter name=restate-probe     -> empty (no container)
docker images | grep restate                 -> empty (no image)
Get-NetTCPConnection 8090/9070/9080 listen   -> empty (no ports)
Get-Process -Id 36504                        -> empty (no fixture process)
git status (probe dir)                       -> only evidence files remain
```

## Residue check

- No global config was touched (no `~/.config`, no registry, no autostart,
  no environment mutation except per-process env vars inside the probe).
- Docker Desktop itself remains running (pre-existing user service; not created
  by this probe).
- No files were written outside the probe directory
  `research/probes/e3/restate/` except pre-existing user containers/daemons
  which this probe did not start or modify.

## Data retained (evidence only)

```text
FIXTURE/         package.json, package-lock.json, service.js
RAW_OUTPUT/      run logs, step traces, exports, server logs, HUMAN_COST_RAW.md
CAPTURED_WORKTREE/  (empty; evidence lives in FIXTURE/ + RAW_OUTPUT/)
```
