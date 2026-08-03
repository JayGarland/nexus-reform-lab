# Cleanup — Astro-Han E3 Probe

## Cleanup commands

```
Remove-Item -LiteralPath 'F:\nexus-probes\knowledge\astro-han-e3' -Recurse -Force
```

## Post-cleanup verification

| Check | Result |
|---|---|
| Isolated directory removed | `exists=False` |
| Parent dir `F:\nexus-probes\knowledge` left empty | 0 entries |
| Probe-created background processes | none (see process diff below) |
| Probe files written outside isolated dir | only the committed evidence under `research/probes/e3/astro-han-llm-wiki/` (intentional) |
| Raw fixture modified | no (hashes MATCH=True in FINDINGS) |

## Process diff (BEFORE vs AFTER, from captured PROCESS_LIST files)

- BEFORE count = 533, AFTER count = 536.
- Processes new in AFTER: `chrome` (2), `conhost`, `pwsh`, `RuntimeBroker`, `SearchFilterHost`, `svchost`, `WmiPrvSE` — OS/harness processes (the probe's own commands ran in foreground pwsh sessions that exited; the `conhost`/`pwsh` entries are the command shells used by the probe).
- NO `python` or `git` process is new in AFTER → the lint (`python scripts/check_evidence.py`) exited cleanly and no probe-launched background process remained.
- The `git`/`python` processes present in the environment were already running BEFORE the probe (harness/tooling), not spawned by it.

## Result

Cleanup succeeded. No generated artifacts or processes remain outside the committed evidence.
