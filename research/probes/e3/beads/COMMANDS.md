# Commands — Beads E3 Probe (Coordination / Work Lifecycle)

> Every command below ran in the isolated probe directory `F:\nexus-lab-worktrees\beads-probe\work\` against the official `bd` v1.1.2 binary at `F:\nexus-lab-worktrees\beads-probe\bin\bd.exe`. Raw per-step logs are under `RAW_OUTPUT/`; the step logs captured to files (`step1-*.log`, `watch_before_kill_*.txt`) are the durable raw evidence. The remaining inline outputs below are the actual stdout/stderr of the executed commands with exit codes.

## Step 0 — Environment & binary (2026-08-04T11:35:23+02:00)

```powershell
git --version                    # git version 2.54.0.windows.1  exit 0
node --version                   # v24.12.0                     exit 0
go version                       # go version go1.26.4 windows/amd64  exit 0
pwsh --version                   # PowerShell 7.6.3             exit 0
```

Binary acquisition (recorded in `UPSTREAM_IDENTITY.md`):
```powershell
Invoke-WebRequest -Uri "https://github.com/gastownhall/beads/releases/download/v1.1.2/beads_1.1.2_windows_amd64.zip" -OutFile "...\bin\beads_1.1.2_windows_amd64.zip"
Get-FileHash ... -Algorithm SHA256   # 4591b07bf82b3203a1dc7db17a7e4962d86338e6c3d34a8a857cc11a57f9c159  (matches release digest)
Expand-Archive ... -DestinationPath "...\bin"
...\bin\bd.exe --version             # bd version 1.1.2 (20e493e56)  exit 0
```

## Step 1 — Init isolated store (2026-08-04T11:35:56+02:00)

```powershell
$env:BEADS_ACTOR="probe-agent-e3"
bd init --non-interactive
# stdout: "✓ Initialized git repository ... Backend: dolt Mode: embedded Database: work Issue prefix: work
#          Issues will be named: work-<hash> ... ✓ bd initialized successfully!"  exit 0
# Note: created AGENTS.md / CLAUDE.md / .claude/ / .agents/ / .codex/ inside isolated workdir only.
```

## Step 2 — Create three bounded Work Items A->B->C

```powershell
bd create 'Probe Task A' --description 'Beads E3 probe: first bounded work item in dependency chain A->B->C' --labels probe,e3 --silent
# stdout: work-5cr   exit 0   (RAW_OUTPUT/step1-create-A.log)
bd create 'Probe Task B' --description 'Beads E3 probe: second bounded work item, depends on A' --labels probe,e3 --deps work-5cr --silent
# stdout: work-qi9   exit 0   (RAW_OUTPUT/step1-create-B.log)
bd create 'Probe Task C' --description 'Beads E3 probe: third bounded work item, depends on B' --labels probe,e3 --deps work-qi9 --silent
# stdout: work-dzb   exit 0   (RAW_OUTPUT/step1-create-C.log)

bd graph --all
# stdout: LAYER 0: ○ Probe Task A (work-5cr) -> LAYER 1: ○ Probe Task B (work-qi9) -> LAYER 2: ○ Probe Task C (work-dzb)
#         Dependencies: 2 blocking relationships, 3 issues across 3 layers   exit 0

bd list
# ○ work-5cr ● P2 Probe Task A
# ○ work-dzb ● P2 Probe Task C
# ○ work-qi9 ● P2 Probe Task B
# Total: 3 issues (3 open, 0 in progress)   exit 0
```

## Step 3 — Query Ready Work (dependency/ready semantics)

```powershell
bd ready
# ○ work-5cr ● P2 Probe Task A
# Ready: 1 issues with no active blockers   exit 0

bd ready --json
# [{"id":"work-5cr","title":"Probe Task A",...,"dependency_count":0,"dependent_count":1}]   exit 0

bd ready --explain
# ● Ready (1 issues):  work-5cr [● P2] Probe Task A   Reason: no blocking dependencies, Unblocks: 1 issue(s)
# ● Blocked (2 issues): work-dzb blocked by work-qi9; work-qi9 blocked by work-5cr
# ─ Summary: 1 ready, 2 blocked   exit 0
```

## Step 4 — Claim one Work Item (atomic, exclusive)

```powershell
bd ready --claim
# ✓ Claimed issue: work-5cr — Probe Task A   exit 0

bd show work-5cr
# ◐ work-5cr · Probe Task A  [● P2 · IN_PROGRESS]
# Owner: probe-agent-e3 · Assignee: probe-agent-e3 ... Started: 2026-08-04   exit 0

bd ready
# ✨ No ready work found (all issues have blocking dependencies)   exit 0   (A now claimed/in-progress, excluded from ready)
```

## Step 5 — Establish execution Attempt (state update)

```powershell
bd set-state work-5cr attempt=1 --reason "E3 probe: establishing execution attempt #1 for claimed work item"
# ✓ Set attempt = 1 on work-5cr   Event: work-5cr.1   exit 0
```

## Step 6 — Persist intermediate state inside the attempt

```powershell
bd note work-5cr "attempt=1: intermediate checkpoint reached - phase 'prepare' done, proceeding to 'execute'"
# ✓ Note added to work-5cr — Probe Task A   exit 0

bd set-state work-5cr phase=execute --reason "intermediate state persisted inside attempt #1"
# ✓ Set phase = execute on work-5cr   Event: work-5cr.2   exit 0

bd state list work-5cr
# attempt: 1
# phase: execute   exit 0
```

## Step 7 — Simulate process interruption (hard kill)

```powershell
# before-kill snapshot:
bd show work-5cr        # ◐ IN_PROGRESS ...   exit 0
bd state list work-5cr  # attempt: 1 / phase: execute   exit 0

# start long-running live bd process (watch) and hard-kill it:
$p = Start-Process ...\bd.exe -ArgumentList "show","--watch","work-5cr" -PassThru ...
# watch pid=56444 alive=True
$p | Stop-Process -Force
# killed=True
Get-Process -Id 56444              # not present
taskkill /PID 56444 /F             # ERROR: process "56444" not found.  exit 128  (process already gone — hard stop confirmed)
# RAW_OUTPUT/watch_before_kill_stdout.txt (670 bytes) and watch_before_kill_stderr.txt (48 bytes) capture the pre-kill live view.
```

## Step 8 — Recover with a fresh process / new instance (same store)

```powershell
$env:BEADS_ACTOR="probe-agent-recovery"   # fresh agent identity, new process, same .beads store

bd where
# F:\nexus-lab-worktrees\beads-probe\work\.beads
#   prefix: work
#   database: F:\nexus-lab-worktrees\beads-probe\work\.beads\embeddeddolt   exit 0

bd show work-5cr
# ◐ work-5cr · Probe Task A  [● P2 · IN_PROGRESS] ...   (state recovered after kill)   exit 0

bd state list work-5cr
# attempt: 1
# phase: execute   (intermediate state survived the kill)   exit 0

bd ready --explain
# ○ No ready work
# ● Blocked (2): work-dzb blocked by work-qi9; work-qi9 blocked by work-5cr [in_progress]
# ─ Summary: 0 ready, 2 blocked   exit 0
```

## Step 9 — Continue or re-establish the Attempt

```powershell
bd set-state work-5cr phase=finish --reason "attempt #1 continued after recovery: phase execute -> finish"
# ✓ Set phase = finish on work-5cr   Previous: execute   Event: work-5cr.3   exit 0

bd note work-5cr "attempt=1 resumed post-kill: output artifact ready for submission"
# ✓ Note added to work-5cr — Probe Task A   exit 0

bd state list work-5cr
# attempt: 1
# phase: finish   exit 0
```

## Step 10 — Submit an Output for the item

```powershell
bd close work-5cr --reason "E3 probe: Output submitted - fixture artifact produced by attempt #1 (completed chain node A)"
# ✓ Closed work-5cr — Probe Task A ...   exit 0

bd show work-5cr
# ✓ work-5cr · Probe Task A  [● P2 · CLOSED]  Close reason: E3 probe: Output submitted ...   exit 0

bd ready
# ○ work-qi9 ● P2 Probe Task B   (blocker released: A closed → B now ready)   exit 0
```

## Step 11 — Save lineage, raw evidence, export

```powershell
bd export -o issues.jsonl
# Exported 6 issues to issues.jsonl   exit 0   (FIXTURE/issues_after_run.jsonl)

bd history work-5cr
# 📜 History for work-5cr (10 entries)
# bmo4icc5 2026-08-04 11:38:48  Author: root  ✓ work-5cr [P2 - closed]
# tdnhb03b 2026-08-04 11:38:47  ◐ in_progress
# ... (10 Dolt commits; full output in step evidence)   exit 0

bd vc status
# Branch: main  Commit: bmo4icc5   exit 0

bd status
# Total Issues: 6  Open: 2  In Progress: 0  Blocked: 1  Closed: 4  Ready to Work: 1   exit 0
```

## Step 12 — Cleanup (see CLEANUP.md)

```powershell
bd dolt stop   # Error: 'bd dolt stop' is not supported in embedded mode (no Dolt server)  exit 1  → no server to stop (embedded mode)
# Remove probe dir + worktree cleanup; verification in CLEANUP.md
```
