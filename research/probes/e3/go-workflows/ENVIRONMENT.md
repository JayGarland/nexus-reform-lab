# Probe Environment — go-workflows E3

| Field | Value |
|---|---|
| probe_date | 2026-08-04 |
| host OS | Windows (win32), pwsh 7 |
| go | go1.26.4 windows/amd64 |
| git | 2.54.0.windows.1 |
| upstream_src | `F:\nexus-probes\coordination\go-workflows-e3\upstream-src` (clone of v0.5.0, commit 2f70c64) |
| probe_module | `F:\nexus-probes\coordination\go-workflows-e3\probe` |
| run_state_dir | `F:\nexus-probes\coordination\go-workflows-e3\run-state` |
| isolated | all writes confined to `F:\nexus-probes\coordination\go-workflows-e3\` and the committed evidence under `research/probes/e3/go-workflows/` |
| network_access | OUTBOUND ONLY for `go get github.com/luno/workflow@v0.5.0` (module download) and upstream git clone; probe run itself is local-only |
| credentials | NONE used or required |
| mysql / mariadb / postgres | not available (no server, no Docker engine) — hence the thin file-backed RecordStore adapter |
| background_processes | none started by the probe (each probe.exe run exits) |
