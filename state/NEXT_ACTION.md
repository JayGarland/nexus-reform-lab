# Authorized Next Action

> **Notice**: This file is the single canonical source for the single authorized next step and explicit operational prohibitions.

---

## Single Authorized Action

> Submit Foundation 0.4.1a Cold-Start gate consistency repair for outside review. Do not run the Cold-Start Test until the production verifier returns exit code 0.

---

## Prohibited Next Actions

1. **DO NOT** request or attempt execution of `CR-S0`.
2. **DO NOT** modify any existing repository files during the cold-start test.
3. **DO NOT** launch background daemons, runners, compilers, OpenClaw, or subagents.
4. **DO NOT** implement Current Knowledge, Stigmergy, Protocol Runtime, or AutoResearch.
5. **DO NOT** run the cold-start test within this same execution instance.
6. **DO NOT** run the Cold-Start Test until the production verifier (`state/verify_state_consistency.js`) returns exit code 0.
