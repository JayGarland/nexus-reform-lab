# Authorized Next Action

> **Notice**: This file is the single canonical source for the single authorized next step and explicit operational prohibitions.

---

## Single Authorized Action

> Run exactly one fresh-instance, read-only Cold-Start Recovery Test. The test instance must receive only the repository path and the canonical test prompt. Do not provide previous chat reports, summaries, model evaluations, or explanatory context.

---

## Prohibited Next Actions

1. **DO NOT** run the cold-start test within this same execution instance.
2. **DO NOT** modify any existing repository files during the cold-start test.
3. **DO NOT** request or attempt execution of `CR-S0`.
4. **DO NOT** launch background daemons, runners, compilers, OpenClaw, or subagents.
5. **DO NOT** implement Current Knowledge, Stigmergy, Protocol Runtime, or AutoResearch.
6. **DO NOT** create any additional preparation or repair phase before the cold-start test; the next step after this write-back is the fresh-instance test execution.
