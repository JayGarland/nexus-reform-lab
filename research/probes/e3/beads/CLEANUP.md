# Cleanup — Beads E3 Probe

## Uninstall / rollback steps

Beads is a single binary + a `.beads/` store inside the chosen directory. There is no installer, no registry entry, no service, no autostart, and no global config. Uninstall = delete the probe directory.

```powershell
# 1. Ensure no bd process running (embedded mode has no server to stop)
Get-Process | Where-Object { $_.ProcessName -match '^bd$' }   # → empty
# (Note: 'bd dolt stop' is not supported in embedded mode — no Dolt server exists; exit 1 is expected and correct.)

# 2. Remove the isolated probe directory
Remove-Item -LiteralPath "F:\nexus-lab-worktrees\beads-probe" -Recurse -Force

# 3. Verify
Test-Path "F:\nexus-lab-worktrees\beads-probe"                 # → False
Get-Process | Where-Object { $_.ProcessName -match '^bd$' }   # → empty
```

## Post-cleanup verification (recorded `2026-08-04T11:4x+02:00`)

| check | result |
|---|---|
| probe dir exists after removal | `False` |
| any `bd`/`beads` process running | none |
| any listening port created by probe | none (embedded Dolt, no server) |
| any leftover files outside probe dir | none created by this probe |
| global config / PATH / registry / autostart mutated | none |
| official Nexus or repo state modified by the probe run | none (probe ran entirely under `F:\nexus-lab-worktrees\beads-probe\`) |
| `state/verify_state_consistency.js` modified | no |

## Rollback / reproducibility

- Re-run: repeat `COMMANDS.md` steps 0-11 in a fresh `F:\nexus-lab-worktrees\beads-probe\` directory with the checksum-verified v1.1.2 binary. The fixture (3 tasks + deps) is fully reproducible via the documented `bd create --deps` commands.
- No `ADOPT / KEEP / SELECTED / BOUND` claim; removal is unconditional and complete.
