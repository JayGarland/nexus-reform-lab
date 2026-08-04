# E1/E2 Survey Audit — Prior-Art Discovery (Foundation 0.7)

> **Status**: SURVEY AUDIT SUPPORT — UNDER OUTSIDE REVIEW
> **Related Artifacts**: `research/prior-art/e1-e2/` (INDEX, CANDIDATE_REGISTRY, five category surveys, CROSS_PROVIDER_BOUNDARY_FINDINGS)
> **Purpose**: Box-outside checklist for the first E1/E2 survey. Filling this checklist does not ratify any candidate or selection.

---

## Survey Compliance Checklist

| # | Check | Requirement | Result |
|---|---|---|---|
| 1 | Five-Provider coverage | All five Provider slots have concrete candidates and survey files. | `PASS` — Coordination (3), Knowledge Projection (8: karpathy gist pattern + base-llm-wiki + 4 LLM-wiki implementations + KurrentDB + Marten), Protocol Governance (3), Experiment/Evaluation (3), Runtime/Re-entry (3) registered. |
| 2 | E1/E2 ceiling | Survey stops at documentation/source inspection; no E3 claimed. | `PASS` — No `OBSERVED` runtime fact used; no local execution performed. |
| 3 | Evidence classification | Every fact tagged DOCUMENTED / INFERRED / NOT VERIFIED. | `PASS` — Tags applied throughout Evidence Cards. |
| 4 | Official-source discipline | Official repos/docs are primary; no third-party-only core evidence. | `PASS` — The Karpathy gist (gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) was located and read (E1); other candidates use official repositories. |
| 5 | No selection labels | No ADOPT / KEEP / SELECTED / BOUND / IMPLEMENTED used. | `PASS` — Conclusion labels restricted to the allowed five plus ARCHITECTURAL REFERENCE ONLY for deprecated candidates. |
| 6 | Concrete candidates per category | Knowledge Projection has concrete LLM-wiki implementations; Protocol/Experiment/Runtime have 3+ concrete projects. | `PASS` — LLM-wiki implementations: Astro-Han, SamurAIGPT, ussumant, atomicstrata (all E2); base-llm-wiki (E1 / CLAIMED-NOT-EVIDENCED); Marten/KurrentDB as deterministic projection substrates; OPA + Cedar (+ Oso reference); MLflow + DVC + promptfoo; Temporal + Inngest + Hatchet. |
| 7 | Stop conditions honored | Candidates without usable implementation or with deprecated status handled. | `PASS` — karpathy llm-wiki → E1 pattern/idea file (implementations are the real candidates); Oso → ARCHITECTURAL REFERENCE ONLY; Marten → adjacent projection substrate (Deferred). |
| 8 | Model neutrality | No model profile altered any rating or evidence gate. | `PASS` — Ratings are tool-capability based; no model profile used. |

---

## Candidate-Level Checks

| candidate | evidence level honest | card per schema | export/import/rollback assessed | stop condition respected |
|---|---|---|---|---|
| Beads | E2 | yes | export documented; import partial | yes |
| go-workflows | E2 | yes | NOT VERIFIED where unverified | yes |
| Restate | E2 | yes | export NOT VERIFIED | yes |
| KurrentDB | E2 | yes | export NOT VERIFIED | yes |
| Marten | E2 | yes | partial | yes |
| karpathy llm-wiki | E1 (gist read) | yes | n/a | yes (pattern file; implementations are the candidates) |
| base-llm-wiki | E2 (bounded local source/artifact architecture inspected; committed evidence) | yes | n/a | yes (runtime/semantic/incremental NOT VERIFIED; no E3) |
| Astro-Han/karpathy-llm-wiki | E2 | yes | partial | yes |
| SamurAIGPT/llm-wiki-agent | E2 | yes | partial | yes |
| ussumant/llm-wiki-compiler | E2 | yes | partial | yes (autostart surface flagged for assessment) |
| atomicstrata/llm-wiki-compiler | E2 | yes | partial | yes (credential/MCP surface flagged for assessment) |
| OPA | E2 | yes | yes (file/bundle portability) | yes |
| Cedar | E2 | yes | yes (file portability) | yes |
| Oso | E1 | yes | n/a | yes (deprecated) |
| MLflow | E2 | yes | export NOT VERIFIED | yes |
| DVC | E2 | yes | yes (push/pull) | yes |
| promptfoo | E2 | yes | partial | yes |
| Temporal | E2 | yes | export NOT VERIFIED | yes |
| Inngest | E2 | yes | export NOT VERIFIED | yes |
| Hatchet | E2 | yes | export NOT VERIFIED | yes |

---

## Evidence-Level Summary (consistent with Registry)

```text
E2:            18
E1 only:       2   (karpathy llm-wiki gist, Oso)
E0:            0
Reached at least E1: 20
Registered:    20
```

> Updated under Foundation 1.0: base-llm-wiki upgraded E1 → E2 (bounded local source/artifact architecture inspected; evidence committed at `research/prior-art/e1-e2/local-base-llm-wiki/` and outside-reviewed for architecture). Registry arithmetic 20 = 0 + 2 + 18; at-least-E1 20 = 2 + 18.

---

## Known Limitations of This Pass

- No local execution; export/import/rollback claims are often `NOT VERIFIED`.
- KurrentDB projections engine and Marten projection-rebuild specifics need an E2 docs follow-up.
- Local `base-llm-wiki` is E1 / LOCAL INSPECTION CLAIMED-NOT-EVIDENCED: the remote repository does not contain sufficient source artifacts to independently verify the claimed AGENTS.md, wiki/, templates/, raw/, or workflows/ structure. An outside-reviewed local inspection artifact is required before E2.
- `karpathy llm-wiki` is the located pattern gist (E1); it is an idea file, not packaged software — the implementation candidates carry the E3 potential.

---

*End of survey audit.*
