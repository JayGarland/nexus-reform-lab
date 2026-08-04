# PROTOCOL_GOVERNANCE_AUDIT.md — Dimension 6: Protocol as Software / 协议作为软件

> **Audit**: Foundation 0.4 — Read-Only Persistent Artifact World Audit
> **Baseline**: `a2d2434d38b33c67dd3535375621ae9523b6fbd7`
> **Verdict**: **DOCTRINE DEFINED + PARTIAL SCAFFOLD — OPERATIONAL MECHANISM NOT IMPLEMENTED**

---

## 1. Protocol Inventory (all natural-language protocol-like files in repo)

| Protocol File | ID | Version | Scope | Inputs/Outputs | Precedence | Allowed/Forbidden | Tests/Lint | Rollout/Deprecation/Rollback |
|---|---|---|---|---|---|---|---|---|
| `AGENTS.md` | implicit ("Clean-Room Agent Rules") | unversioned | agent behavior | none | none | implicit rules | none | none |
| `WAKE.md` | implicit | unversioned (iterations bump content) | re-entry | none | fixed reading order | explicit prohibitions §3 | cold-start checklist (separate) | none |
| `REMOTE_FIRST_AUDIT_METHOD.md` | implicit | RATIFIED (no number) | external audit | none (no wire format) | 7-step pipeline | none explicit | none | none |
| `COLD_START_RECOVERY_TEST.md` | implicit | unversioned | cold-start benchmark | input prompt defined (§1) | 10 pass points | zero-mutation rule (§2-8) | **YES — 10-point checklist** | none |
| `INVARIANTS.md` | implicit | RATIFIED (Patch 0.1) | safety boundaries | none | immutable | explicit prohibitions | none | none (immutable by design) |
| `REMOTE_FIRST` vs `COLD_START` overlap | — | — | both audit-domain | — | no conflict-resolution rule | — | — | — |

## 2. Analysis

- **Doctrine exists and is strong**: FIVE_POINT_FRAMEWORK.md §3 Layer 3 mandates Protocol ID, Version, Scope, Inputs/Outputs, Precedence, Allowed/Forbidden, Linting & Tests, Rollout/Deprecation/Rollback (lines 45-55). INVARIANTS.md declares the Immutable Boundary rule.
- **No operational mechanism implements this.** There is no `protocols/` directory (confirmed absent: `protocols : exists=False`). No protocol registry, no version table, no linting script, no rollout/deprecation/rollback tooling. `AGENTS.md`, `WAKE.md`, `REMOTE_FIRST_AUDIT_METHOD.md` are scattered prompt-style documents, not versioned software assets.
- **Deterministic boundary exists and is enforced**: `INVARIANTS.md:10-21,37-38` + `REVOLUTION.md:41-42` + FIVE_POINT Immutable Boundary Rule. The security/state invariants ARE deterministic (e.g., `state/verify_state_consistency.js` is real code, not natural-language policy). This is the one place "protocol" approaches "software": the verifier.
- **Supersession handling exists at file level**: `SUPERSEDED`/`HISTORICAL_FAILURE` frontmatter + WAKE ban. But there is no mechanism to *retire* a superseded protocol systematically (rule-genealogy: "rules increase, none die" risk).
- **Conflict handling**: No explicit protocol-precedence resolver beyond the fixed WAKE reading order and the single-source-of-truth rules in STATE_MODEL.md. Multiple audit-domain protocols (`REMOTE_FIRST_AUDIT_METHOD`, `COLD_START_RECOVERY_TEST`, `WAKE`) overlap in the audit domain without a stated precedence rule among themselves.
- **Doctrine vs scaffold vs mechanism**:
  - Doctrine defined: YES (FIVE_POINT §3, INVARIANTS).
  - Structure scaffolded: PARTIAL (file-level frontmatter conventions, single-source rules, verifier tooling).
  - Operational mechanism implemented: **NO** — no protocol registry, no lint, no rollout/deprecate/rollback runtime.

## 3. Ruling

```text
DOCTRINE DEFINED
STRUCTURE SCAFFOLDED (partial)
OPERATIONAL MECHANISM NOT IMPLEMENTED
```

## 4. Findings

- **P-1**: No `protocols/` directory; protocol assets are scattered as root/audit documents. A future protocol-governance layer (Layer 3) must first exist as versioned files before it can be governed.
- **P-2**: The only executable "software-ified" governance in the repo is `state/verify_state_consistency.js` — real code with negative-fixture tests. This is the seed of protocol-as-software, but it governs *state*, not *protocols*.
- **P-3**: No protocol conflict-resolution or rule-death mechanism. Not a blocker for cold-start; a Level 3/4 requirement.
