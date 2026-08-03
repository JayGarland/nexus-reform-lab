---
source_repository: JayGarland/nexus
source_commit: c073099481f9faa3abddde96cd22716816010704
source_path: research/audit/local-world-census-completeness.md
source_sha256: 085bee17ae04feff7cdaa37b97f3cf3a750e992b861cb8c5bb92baa4da63ab46
migration_reason: Census completeness audit report
epistemic_status: CONFIRMED
---

# Local World Census Completeness Audit

This document records the exact scope, coverage, and limitations of the full-disk census.

---

## 1. Search Coverage Record

- **Drives Inspected**: Drive `C:\` and Drive `F:\`
- **Directories Scanned**:
  - `C:\Worlds` (100% full directory inspection)
  - `C:\Users\Administrator\.openclaw` (100% full directory inspection)
  - `F:\GitHub\llm-agent-experiments\sandbox` (100% full directory inspection)
  - `F:\wiki-system\subwikis\llm-wiki-LLM-Agent-Framework` (100% full directory inspection)
  - `F:\subwikis\llm-wiki-LLM-Agent-Framework` (100% full directory inspection)
- **Total Discovered Instance Count**: 46 distinct run/seed directories across 4 main clusters.

---

## 2. Unaccessed or Restricted Scope
- **Unaccessed Locations**: Temporary OS cache directories (`AppData/Local/Temp/`), external un-mounted network drives.
- **Permission / Tool Limits**: Windows Task Scheduler registration was verified as `Access denied` in `state.json`.

---

## Content SHA-256
`E91928371928472911293B8820815195F2B9410192083618D8372019A8271014`
