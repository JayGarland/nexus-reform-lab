# ENVIRONMENT.md — Restate E3 probe

## Host

```text
OS                 Windows (win32)  Windows 11, PowerShell 7.6.4
git                2.54.0.windows.1
node               v24.12.0
npm                10.3.0
go                 go1.26.4 windows/amd64   (present, not used by this probe)
docker             Docker 28.3.2 (Docker Desktop, Linux containers via WSL2)
kernel (container) 6.6.87.2-microsoft-standard-WSL2
```

## Time source

- Windows Time service (`w32tm`) is NOT running on this host
  (error `0x80070426 The service has not been started.`).
- Time source used: the host clock (`Get-Date`), cross-checked against
  GitHub API timestamps (release published_at 2026-07-06, pushed_at 2026-08-04T08:47:55Z)
  and the container's internal clock (server log timestamps in UTC `Z`).
  Host clock matched GitHub UTC timestamps within the same day; treated as consistent.
- All local evidence timestamps are `+02:00` (local) or UTC `Z` (server logs).

## Network / credentials

- Network access: required to pull the container image and the npm SDK
  (documented; no offline requirement). No cloud account, no paid credentials,
  no live API keys.

## Ports used by this probe

```text
8090  host -> container 8080   Restate HTTP ingress
9070  host -> container 9070   Restate admin API + web UI
9080  host                      fixture service (Node SDK) for the server to call
5122  container-internal        node-to-node message fabric (not exposed)
```

Port 8080 was already occupied by the user's agenticmail-stalwart container, so
the ingress was remapped to 8090 (isolation rule: do not disturb existing services).

## Services / processes created

```text
restate-probe-1272   docker container ghcr.io/restatedev/restate:1.7.2
node service.js      fixture service process (PID 36504), port 9080
```

Both fully removed during cleanup (see CLEANUP.md).
