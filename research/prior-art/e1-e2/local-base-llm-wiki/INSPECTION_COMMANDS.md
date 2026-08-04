# Local base-llm-wiki — Inspection Commands

> Exact local path: `F:\subwikis\base-llm-wiki`
> Timestamp: 2026-08-03T23:30:32+02:00
> All commands were READ-ONLY. No local files were modified.

## 1. Top-level entries and directory presence

```
$root='F:\subwikis\base-llm-wiki'
Get-ChildItem -LiteralPath $root -Force | ForEach-Object { "{0} | {1}" -f $_.Name, $(if($_.PSIsContainer){'DIR'}else{'FILE'}) }
Get-ChildItem -LiteralPath $root -Directory -Force -Recurse | ForEach-Object { $_.FullName.Replace($root,'.') }
Get-ChildItem -LiteralPath $root -File -Force | ForEach-Object { "{0} | {1} bytes" -f $_.Name, $_.Length }
```

## 2. Recursive file manifest

```
Get-ChildItem -LiteralPath $root -File -Force -Recurse | ForEach-Object { "{0} | {1}" -f $_.FullName.Replace($root,'.'), $_.Length } | Sort-Object
Get-ChildItem -LiteralPath $root -Directory -Force -Recurse | ForEach-Object {
  $dir=$_; $c=(Get-ChildItem -LiteralPath $dir.FullName -File -Force | Measure-Object).Count
  "{0} | {1} files" -f $dir.FullName.Replace($root,'.'), $c
}
```

## 3. SHA-256 hashes of inspected files

```
$files = @('.\AGENTS.md','.\templates\concept-page.md','.\templates\lint-report.md',
           '.\templates\query-result.md','.\templates\source-summary.md',
           '.\workflows\ingest-source.md','.\workflows\lint-wiki.md','.\workflows\query-wiki.md',
           '.\wiki\index.md','.\wiki\log.md','.\wiki\overview.md')
foreach($f in $files){ $full = Join-Path $root $f; $h = (Get-FileHash -LiteralPath $full -Algorithm SHA256).Hash; "{0}`t{1}" -f $h, $f }
```

## 4. Bounded excerpts

```
Get-Content -LiteralPath (Join-Path $root 'AGENTS.md') -Raw
Get-Content -LiteralPath (Join-Path $root 'templates\concept-page.md') -Raw   # and the other 3 templates
Get-Content -LiteralPath (Join-Path $root 'workflows\ingest-source.md') -Raw  # and lint-wiki, query-wiki
Get-Content -LiteralPath (Join-Path $root 'wiki\index.md') -TotalCount 30
Get-Content -LiteralPath (Join-Path $root 'wiki\log.md') -TotalCount 25
Get-Content -LiteralPath (Join-Path $root 'wiki\overview.md') -Raw
```

## Boundary

- `raw/` and `raw1/` file CONTENTS were NOT read into the artifact (only listed).
- No writes were made under `F:\subwikis\base-llm-wiki`.
- No global config, environment, registry, or autostart surface was touched.

---

*End of inspection commands.*
