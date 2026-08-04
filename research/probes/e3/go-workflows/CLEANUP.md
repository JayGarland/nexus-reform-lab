# Cleanup — go-workflows E3 probe

## Cleanup commands

```
# 1. Remove the isolated probe module + upstream clone + run state (all outside the repo).
Remove-Item -LiteralPath 'F:\nexus-probes\coordination\go-workflows-e3' -Recurse -Force

# 2. Remove the built binary (already inside the probe dir, removed above).
# 3. Go module cache may keep the downloaded deps; record but do not force-remove global cache.
go clean -modcache  # optional; left to operator discretion, recorded for transparency
```

## Post-cleanup verification

| Check | Result |
|---|---|
| Probe working directory removed | `exists=False` |
| No probe-created process running | confirmed — probe.exe exited (exit 137/0); no background process |
| No probe-created port listening | none used (Go library embeds in-process; no server) |
| Probe files outside isolated dir | only the committed evidence under `research/probes/e3/go-workflows/` (intentional) |
| Raw outputs remain in repo | `RAW_OUTPUT/` intact (phase1.log, phase2.log, capab.log, store files, adaptertest-conformance.log) |
| Repository / verifier / canonical state | unmodified (evidence committed only to `research/probes/e3/go-workflows/`) |
