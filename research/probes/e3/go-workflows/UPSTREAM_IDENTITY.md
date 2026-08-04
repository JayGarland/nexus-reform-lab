# Upstream Identity — go-workflows (luno/workflow) E3 Probe

| Field | Value |
|---|---|
| project | go-workflows (github.com/luno/workflow) |
| official source | https://github.com/luno/workflow |
| version / release | v0.5.0 |
| upstream commit (v0.5.0) | `2f70c64c326e301c838a39f64cb6f61ff501da74` |
| commit date | 2026-07-19 13:44:02 +0100 |
| license | BSD-3-Clause (verified: `LICENSE` "BSD 3-Clause License (c) 2023, Luno"; GitHub API SPDX `BSD-3-Clause`) |
| maintenance | Active, not archived; pushed_at 2026-08-04T01:11Z (GitHub API) |
| go module path | `github.com/luno/workflow` |
| go.mod go version | `go 1.26.0` |
| installation surface | Go library, embedded in an application; pluggable adapters (event streamer, record store, role scheduler, timeout store) |
| verified by | `git ls-remote` refs/tags; shallow clone of tag v0.5.0; GitHub API repo metadata |
| evidence | PROBE_SOURCE/go.mod; RAW_OUTPUT/adaptertest-conformance.log; upstream LICENSE inspected in cloned tree |

## Adapter note

go-workflows persists state through the `workflow.RecordStore` interface. The only
upstream-persistent SQL adapter (`adapters/sqlstore`) is MySQL-flavored (`INSERT ...
SET`, `now()`, backticks, `longblob`), and no MySQL/MariaDB server or Docker engine
was available on this probe host. Per the Probe Plan's "light test Adapter" rule, a
thin, disposable file-backed `RecordStore` (`PROBE_SOURCE/filestore`) was written
that implements the library's native interface; it passes the upstream's own
conformance suite `adaptertest.RunRecordStoreTest` (see
RAW_OUTPUT/adaptertest-conformance.log). It adds no Claim/Lease/Review semantics —
those are exactly what the library itself provides.
