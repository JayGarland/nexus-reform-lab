# base-llm-wiki E3 Plan Audit — Knowledge Projection Provider

> **Status**: PLAN AUDIT SUPPORT — UNDER OUTSIDE REVIEW
> **Related Plan**: `research/plans/BASE_LLM_WIKI_E3_COMPARISON_PLAN.md`
> **Purpose**: Box-outside checklist verifying the base-llm-wiki E3 comparison plan is fair, isolated, and fail-closed. Filling this checklist does not authorize execution.

---

## Checklist

| # | Check | Requirement | Result |
|---|---|---|---|
| 1 | Fair fixture | Same semantic fixture content, source count, fact count, conflict/supersession situation as the Astro-Han E3 probe. | `PENDING` — See Plan §3 (fixed fixture identical in content to the Astro-Han probe). |
| 2 | Original project read-only | Plan requires read-only inspection of `F:\subwikis\base-llm-wiki`, copy to an independent probe directory, execution in the copy, and before/after hashes proving the original was not modified. | `PENDING` — See Plan §4 and evidence §6 (`SOURCE_HASHES_BEFORE/AFTER`). |
| 3 | Model invocation boundary | In-box model as a replaceable executor only; instruction files, API-key need, external network, and model non-determinism recorded; secrets never exposed (else `E3 BLOCKED`). | `PENDING` — See Plan §5. |
| 4 | Actual output capture required | Actual raw files, wiki pages, index, log, provenance, contradiction/supersession records, and lint output captured before cleanup; file lists alone insufficient. | `PENDING` — See Plan §6 and `CAPTURED_WORKTREE/`, `OUTPUT_EVIDENCE.md`. |
| 5 | Tool capability vs model performance separated | Model output must not be mixed into tool-capability scoring; model metrics recorded separately, not as pass gates. | `PENDING` — See Plan §5 and §7 (additional metrics are not E3 gates). |
| 6 | E4/E5 prohibited | Plan forbids E4 Nexus-compatible fixtures and E5 replacement/rollback tests. | `PENDING` — See Plan §1 (E3 does not answer E4/E5). |
| 7 | Provider selection prohibited | Plan forbids ADOPT / KEEP / SELECTED / BOUND / SUPERIOR / NEXUS FIT CONFIRMED; verdicts limited to E3 PASSED/PARTIAL/FAILED/BLOCKED. | `PENDING` — See Plan §8. |
| 8 | Cleanup fail-closed | Stop conditions include inability to capture outputs or verify cleanup; no project modification just to make it run; no running in the original directory. | `PENDING` — See Plan §4 and §9. |

---

## Reviewer Instructions

- Each row starts as `PENDING`. The outside reviewer marks each `PASS` / `FAIL` / `PARTIAL` with evidence.
- A `FAIL` on any row blocks execution authorization for that scope.
- Filling this checklist does not authorize the E3 execution.

---

*End of base-llm-wiki E3 plan audit.*
