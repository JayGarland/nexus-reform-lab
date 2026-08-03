# External Verdict History Register

> **Notice**: This file is a historical log of outside reviewer adjudications for past milestones. It is NOT the current working state source. Current active verdicts are governed exclusively by [`CURRENT_VERDICT.md`](CURRENT_VERDICT.md).

---

| Milestone | Reviewed Commit | Outside Verdict | Milestone Fully Accepted | Accepted Scope | Rejected / Unconfirmed Scope | Accepted as Current Authority | Review Date | Notes |
|---|---|---|---|---|---|---|---|---|
| **Clean-Room Bootstrap** | `a78709e9bf07c14d46276d60da978bfedaf2f5c4` | `CONFIRMED` | `yes` | Clean-Room Lab Setup, Charter, Invariants, Drive Manifest | None | `yes` | 2026-08-03 | Patch 0.1 verified |
| **Doctrine Repair 0.2.1** | `57b5aa59ef0b0285f051de3ce18980bac02cc91e` | `CONFIRMED` | `yes` | 1 World Substrate + 4 Orthogonal Layers Doctrine | None | `yes` | 2026-08-03 | Ratified doctrine |
| **Migration Verification Fix 0.2.2** | `4e7fe457bb25eb5e9d13a8f01f16edb55714e6d5` | `CONFIRMED` | `yes` | 31/31 normalized text equivalence after frontmatter/newline normalization | Exact payload byte equality | `yes` | 2026-08-03 | 31/31 normalized text equivalence confirmed after deterministic frontmatter handling and newline/whitespace normalization. Exact destination payload SHA equality is not claimed. |
| **Foundation 0.3** | `10928fd0284721538aec9b7bd4575f24ed8232cf` | `PARTIAL PASS` | `no` | Persistent Memory Skeleton | Handoff commit closure, State consistency, Cold-start recoverability | `no` | 2026-08-03 | Skeleton confirmed, handoff SHA closing required |
| **Foundation 0.3.1** | `61ba6736d3e02f1b2e7b6a5e9f4d83ed3ce1cf34` | `PARTIAL PASS` | `no` | Consistency Fix Content | 0.3.1 commit self-embedding pending | `no` | 2026-08-03 | Self-referential commit SHA pending in session log & hello |
| **Foundation 0.3.1a** | `f0027bcd5d0600b753a9b91b730fa9a46870b261` | `REJECTED` | `no` | None | Entire milestone rejected | `no` | 2026-08-03 | Self-referential commit SHA pending |
| **Foundation 0.3.2** | `fc209ffd4d7a6046ab75532f2a9c61fd41255ee6` | `PARTIAL PASS` | `no` | State Model Repair | Parent commit SHA & milestone classification fix | `no` | 2026-08-03 | State model repaired, parent SHA fix required |
| **Foundation 0.3.2a** | `03a98d7bf6787f44fa823a18cbf165ceb5aee307` | `PARTIAL PASS` | `no` | Lineage Parent SHA Fix | 0.3.1a milestone classification & verifier logic | `no` | 2026-08-03 | Lineage fix completed, verdict schema repair required |
| **Foundation 0.3.2b** | `RESOLVE_FROM_GIT` | `UNDER OUTSIDE REVIEW` | `no` | None | Whole milestone under review | `no` | 2026-08-03 | Submitted for outside review |
