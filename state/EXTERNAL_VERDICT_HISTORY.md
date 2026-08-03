# External Verdict History Register

> **Notice**: This file is a historical log of outside reviewer adjudications for past milestones. It is NOT the current working state source. Current active verdicts are governed exclusively by [`CURRENT_VERDICT.md`](CURRENT_VERDICT.md).

> **Schema Rules**:
> 1. A milestone may receive PARTIAL PASS while individual scopes are accepted.
> 2. Accepted scope does not imply the entire milestone was accepted.
> 3. Historical milestone acceptance and current subsystem authority are separate facts.

---

| Milestone | Reviewed Commit | Outside Verdict | Milestone Fully Accepted | Accepted Scope | Rejected / Unconfirmed Scope | Milestone Accepted as Current Authority | Review Date | Notes |
|---|---|---|---|---|---|---|---|---|
| **Clean-Room Bootstrap** | `a78709e9bf07c14d46276d60da978bfedaf2f5c4` | `CONFIRMED` | `yes` | Clean-Room Lab Setup, Charter, Invariants, Drive Manifest | None | `yes` | 2026-08-03 | Patch 0.1 verified |
| **Doctrine Repair 0.2.1** | `57b5aa59ef0b0285f051de3ce18980bac02cc91e` | `PARTIAL PASS` | `no` | Four-Layer One-World Doctrine, LLM Wiki Doctrine, Software 3.0 Doctrine, Controlled AutoResearch Doctrine | Migration byte-integrity verifier, Exact destination/source verification | `no` | 2026-08-03 | Four subsystem doctrines confirmed; migration hash verifier unconfirmed |
| **Migration Verification Fix 0.2.2** | `4e7fe457bb25eb5e9d13a8f01f16edb55714e6d5` | `CONFIRMED` | `yes` | 31/31 normalized text equivalence after frontmatter/newline normalization | Exact payload byte equality | `yes` | 2026-08-03 | 31/31 normalized text equivalence confirmed after deterministic frontmatter handling and newline/whitespace normalization. Exact destination payload SHA equality is not claimed. |
| **Foundation 0.3** | `10928fd0284721538aec9b7bd4575f24ed8232cf` | `PARTIAL PASS` | `no` | Persistent Memory Skeleton | Handoff commit closure, State consistency, Cold-start recoverability | `no` | 2026-08-03 | Skeleton confirmed, handoff SHA closing required |
| **Foundation 0.3.1** | `61ba6736d3e02f1b2e7b6a5e9f4d83ed3ce1cf34` | `PARTIAL PASS` | `no` | Consistency Fix Content | 0.3.1 commit self-embedding pending | `no` | 2026-08-03 | Self-referential commit SHA pending in session log & hello |
| **Foundation 0.3.1a** | `f0027bcd5d0600b753a9b91b730fa9a46870b261` | `REJECTED` | `no` | None | Entire milestone rejected | `no` | 2026-08-03 | Self-referential commit SHA pending |
| **Foundation 0.3.2** | `fc209ffd4d7a6046ab75532f2a9c61fd41255ee6` | `PARTIAL PASS` | `no` | State Model Repair | Parent commit SHA & milestone classification fix | `no` | 2026-08-03 | State model repaired, parent SHA fix required |
| **Foundation 0.3.2a** | `03a98d7bf6787f44fa823a18cbf165ceb5aee307` | `REJECTED` | `no` | None | Verifier logic produced a false pass, External verdict history remained untrustworthy, Repository-wide World Audit authorization remained withheld | `no` | 2026-08-03 | Rejected due to false pass in verifier logic & untrustworthy history |
| **Foundation 0.3.2b** | `5ac021c9ae3a362243a2f442316310ff0b065e27` | `PARTIAL PASS` | `no` | Dynamic Parent Lineage Verification | Verdict schema accuracy & strict 40-char SHA enforcement | `no` | 2026-08-03 | Parent lineage verified; verdict schema & strict SHA fix required |
| **Foundation 0.3.2c** | `8ddabe908e62d748081b587f6fa55a6c87e6db91` | `CONFIRMED FOR REVIEWED SCOPE` | `yes` | Strict 40-character SHA parsing, Exact Git parent equality, External verdict schema accuracy, Partial milestone / accepted-scope separation | Repository-wide Persistent Artifact World implementation, Cold-start recoverability, Runtime process-isolation claims | `yes` | 2026-08-03 | Confirmed for reviewed scope |
| **Foundation 0.3.2d** | `295d743d79f391034e98b6565a33b63e1353fb24` | `PARTIAL PASS` | `no` | Current phase transition, State Consistency current verdict closure, Foundation 0.3.2c historical closure, Historical unresolved-entry restriction | Verdict verifier completeness, due to regression of schema checks, Repository-wide Persistent Artifact World, Cold-start recoverability | `no` | 2026-08-03 | State closure recorded; verifier regression repair required |
| **Foundation 0.3.2e** | `31fda2f54a2346e791e63352a236824db9f17ae5` | `PARTIAL PASS` | `no` | Dynamic repository-root resolution, Exact CURRENT_VERDICT row parsing, Historical verdict schema restoration, Active review isolation, Strict NEXT_ACTION parsing | Unknown verdict fail-closed behavior, Duplicate CURRENT_VERDICT subject detection, Negative-fixture proof | `no` | 2026-08-03 | Main verifier regressions fixed; fail-closed & negative fixture proof required |
| **Foundation 0.3.2f** | `RESOLVE_FROM_GIT` | `UNDER OUTSIDE REVIEW` | `no` | None | Whole milestone under review | `no` | 2026-08-03 | Submitted for outside review |
