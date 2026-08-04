# Environment — Beads E3 Probe

## Host facts (recorded at probe start `2026-08-04T11:35:23+02:00`)

```text
host OS        Windows (win32)
shell          PowerShell 7.6.3
git            2.54.0.windows.1
node           v24.12.0
go             go1.26.4 windows/amd64
docker         Docker 28.3.2, build 578ccf6
```

## Isolation

```text
Probe root           F:\nexus-lab-worktrees\beads-probe\
Binary               F:\nexus-lab-worktrees\beads-probe\bin\bd.exe  (official v1.1.2, checksum-verified)
Store workdir        F:\nexus-lab-worktrees\beads-probe\work\  (isolated, never inside the repository)
Issue prefix         work
Backend / mode       dolt / embedded (no external server, no ports, no background daemon)
```

## Environment variables used

```text
BEADS_ACTOR          probe-agent-e3       (create/claim/close/export steps)
BEADS_ACTOR          probe-agent-recovery (fresh-instance recovery steps)
```

- No credentials required. No network required after binary download. No cloud account. No global config mutation.
- `bd init` installed per-project agent integration files only inside the isolated `work/` directory (`AGENTS.md`, `CLAUDE.md`, `.claude/settings.json`, `.agents/skills/beads/SKILL.md`, `.codex/`). No writes outside the probe directory.

## Network access

- Internet used only to fetch upstream metadata (GitHub API) and the official release binary (one time).
- Probe run itself was local-only (embedded Dolt).

## Git / time evidence

- Probe run timestamps are recorded inside `COMMANDS.md` and the captured raw logs (ISO 8601 with timezone +02:00).
- Beads state history is itself time-stamped (see `bd history` in step 10 evidence); Dolt commit lineage verifiable via `bd vc status`.
