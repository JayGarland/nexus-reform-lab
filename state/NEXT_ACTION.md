# Authorized Next Action

> **Notice**: This file is the single canonical source for the single authorized next step and explicit operational prohibitions.

---

## Single Authorized Action

> Run exactly one fresh-instance, read-only Cold-Start Recovery Test against commit produced by this write-back. The fresh instance must receive only the repository location and the test prompt. Do not provide prior chat reports or explanatory context.

---

## Prohibited Next Actions

1. **DO NOT** request or attempt execution of `CR-S0`.
2. **DO NOT** modify any existing repository files during the cold-start test.
3. **DO NOT** launch background daemons, runners, compilers, OpenClaw, or subagents.
4. **DO NOT** implement Current Knowledge, Stigmergy, Protocol Runtime, or AutoResearch.
5. **DO NOT** run the cold-start test within this same execution instance.
6. **DO NOT** use this write-back instance as the cold-start test instance; the test MUST be run by a separate new model instance that receives only the repository path and the test prompt.
