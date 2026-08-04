# Upstream Identity — Beads (gastownhall/beads)

> Facts below were inspected live via the official GitHub API on `2026-08-04T11:35+02:00`.

| Field | Value |
|---|---|
| project | Beads |
| official source | https://github.com/gastownhall/beads |
| homepage | https://beads.gascity.com |
| language | Go |
| license | MIT (GitHub API `license.spdx_id` = MIT; LICENSE file inspected in release bundle, "Copyright (c) 2025 Beads Contributors") |
| current release | v1.1.2 (published `2026-07-26T18:09:03Z`) |
| release tag object SHA | `7b01b084d5cc4efd7128c82fed322dd500b04b8e` (annotated tag) |
| tag target commit | `20e493e569c922d1253bdeff068c5e56c94957fb` (chore(release): bump version to 1.1.2) |
| default branch | main |
| main HEAD (at probe time) | `095a5bfc3cd7a45609de180cd42d618e16201323` (2026-08-04T05:40:54Z) |
| stars / forks / open issues | 25,935 / 1,742 / 465 (at probe time) |
| last push | 2026-08-04T07:11:22Z |
| maintenance | Active |

## Binary provenance

| Field | Value |
|---|---|
| asset | `beads_1.1.2_windows_amd64.zip` |
| asset size | 49,895,462 bytes |
| asset sha256 (release digest) | `4591b07bf82b3203a1dc7db17a7e4962d86338e6c3d34a8a857cc11a57f9c159` |
| downloaded sha256 | `4591b07bf82b3203a1dc7db17a7e4962d86338e6c3d34a8a857cc11a57f9c159` (MATCH) |
| extracted binary | `bd.exe` (145,739,264 bytes) |
| `bd --version` | `bd version 1.1.2 (20e493e56)` — matches tag target commit |
| bundle contents | `bd.exe`, `CHANGELOG.md`, `LICENSE` (MIT), `README.md` |

## Isolated probe environment

- Probe root: `F:\nexus-lab-worktrees\beads-probe\`
- Store workdir: `F:\nexus-lab-worktrees\beads-probe\work\` (embedded Dolt, no server)
- Issue prefix: `work`; backend `dolt`; mode `embedded`
- Binary SHA-256 (extracted `bd.exe`): see `FILE_HASHES_AFTER.sha256` bundle hash record

## Evidence-level note

Per the Candidate Refresh (Foundation 0.8 refresh round), the refresh was E1 (official metadata inspected). This Probe is E3 (install/run/recovery evidence) executed in an isolated directory against the official v1.1.2 Windows amd64 release binary, checksum-verified against the upstream release digest.
