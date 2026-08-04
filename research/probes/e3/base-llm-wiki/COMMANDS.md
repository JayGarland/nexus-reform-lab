# Probe Commands — base-llm-wiki E3

All commands ran in PowerShell. Working directory: `F:\nexus-probes\knowledge\base-llm-wiki-e3\`.

## 1. Record original source hashes + create probe dir

```
Get-ChildItem -LiteralPath 'F:\subwikis\base-llm-wiki' -Recurse -File -Force |
  Get-FileHash -Algorithm SHA256 | ... > SOURCE_HASHES_BEFORE.sha256   # 84 files
New-Item -ItemType Directory -Path 'F:\nexus-probes\knowledge\base-llm-wiki-e3' -Force
```

## 2. Copy original to probe + verify byte-identical

```
Copy-Item -LiteralPath 'F:\subwikis\base-llm-wiki' -Destination '...\probe' -Recurse -Force
Get-ChildItem -LiteralPath '...\probe' -Recurse -File -Force | Get-FileHash ... > PROBE_HASHES_BEFORE.sha256
# all 84 hashes match SOURCE_HASHES_BEFORE (mismatches=0)
```

## 3. Add fixed fixture into copy raw/ + re-capture probe baseline

```
# wrote raw/source-a.md, raw/source-b.md (Project Atlas fixture, identical to Astro-Han E3)
# re-captured PROBE_HASHES_BEFORE.sha256 (86 files incl. fixture), BEFORE_STATE.txt, PROCESS_LIST_BEFORE.txt
```

## 4. Execute native ingest (agent-driven, per copy's workflow)

```
# read copy's workflows/ingest-source.md + templates/source-summary.md
# created wiki/source-summaries/Project Atlas - Versioned State.md
# created wiki/source-summaries/Project Atlas - Database Supersession.md
# appended Source Summaries section to wiki/index.md
# appended two ingest entries to wiki/log.md
```

## 5. Capture after-state + verify immutability

```
Get-Process ... > PROCESS_LIST_AFTER.txt
Get-ChildItem ... > PROBE_HASHES_AFTER.sha256   # 88 files (added 2 summaries; index/log modified)
Get-ChildItem ... > AFTER_STATE.txt
Get-ChildItem -LiteralPath 'F:\subwikis\base-llm-wiki' ... > SOURCE_HASHES_AFTER.sha256
# raw/source-a.md, raw/source-b.md MATCH=True (unmodified)
# original base-llm-wiki changed files = 0 (zero modification)
```

## 6. Capture actual outputs + cleanup

```
Copy-Item (raw/source-a.md, raw/source-b.md, wiki/source-summaries/*Project Atlas*, wiki/index.md, wiki/log.md) -> CAPTURED_WORKTREE/
Remove-Item -LiteralPath 'F:\nexus-probes\knowledge\base-llm-wiki-e3' -Recurse -Force
# exists=False; knowledge dir leftovers=0; CAPTURED_WORKTREE intact (6 files); original intact (84 files)
```

Exit codes: all commands exited 0.
