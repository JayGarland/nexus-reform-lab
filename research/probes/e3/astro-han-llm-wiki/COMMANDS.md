# Probe Commands — Astro-Han E3

All commands ran in PowerShell. Working directory: `F:\nexus-probes\knowledge\astro-han-e3\`.

## 1. Create isolated directory

```
New-Item -ItemType Directory -Path 'F:\nexus-probes\knowledge\astro-han-e3' -Force
# exit 0
```

## 2. Obtain upstream skill (network)

```
git clone --depth 1 https://github.com/Astro-Han/karpathy-llm-wiki 'F:\nexus-probes\knowledge\astro-han-e3\skill'
# exit 0
git -C '...\skill' rev-parse HEAD        # eafcc77001e496cc43499e4923b663aec722c813 (exit 0)
```

## 3. Create fixture (bounded, non-Nexus) and capture before-state

```
# work/fixtures/source-a.md, source-b.md written with the fixed minimal fixture text
Get-Process | Sort-Object ProcessName | ... > PROCESS_LIST_BEFORE.txt
Get-ChildItem ... | Get-FileHash -Algorithm SHA256 ... > FILE_HASHES_BEFORE.sha256
Get-ChildItem ... > BEFORE_STATE.txt
```

## 4. Load skill as local files + initialize wiki

```
Copy-Item skill\SKILL.md -> work\SKILL.md
Copy-Item skill\references -> work\references -Recurse
Copy-Item skill\scripts    -> work\scripts    -Recurse
'# Knowledge Base Index' > work\wiki\index.md
'# Wiki Log'            > work\wiki\log.md
# re-captured BEFORE state (hash/process/state) at this point
```

## 5. Native Ingest (per SKILL.md)

```
# Save sources into raw/ with raw-template metadata header (original text preserved):
#   raw/atlas/2026-08-03-project-atlas-versioned-state.md   (from source-a.md)
#   raw/atlas/2026-08-03-atlas-database-superseded.md       (from source-b.md)
# Compile articles per article-template:
#   wiki/atlas/project-atlas.md      (current claim + Status: Outdated block for superseded DB)
#   wiki/atlas/canonical-state.md    (file-first canonical state; index is derived)
# Update wiki/index.md per index-template; append entries to wiki/log.md
```

## 6. Native mechanical Lint (upstream script)

```
$start = Get-Date
python "F:\nexus-probes\knowledge\astro-han-e3\work\scripts\check_evidence.py" "F:\nexus-probes\knowledge\astro-han-e3\work" > RAW_OUTPUT\lint_stdout.txt 2> RAW_OUTPUT\lint_stderr.txt
$code = $LASTEXITCODE
# LINT_EXIT=0
# START=2026-08-03T23:41:45+02:00  END=2026-08-03T23:41:45+02:00
```

## 7. Capture after-state

```
Get-Process | ... > PROCESS_LIST_AFTER.txt
Get-ChildItem ... | Get-FileHash ... > FILE_HASHES_AFTER.sha256
Get-ChildItem ... > AFTER_STATE.txt
# fixture immutability: source-a.md and source-b.md hashes unchanged (MATCH=True)
```

## 8. Cleanup

See `CLEANUP.md`. Isolated directory removed; post-cleanup verification recorded there.

Exit codes: all commands above exited 0 except none.
