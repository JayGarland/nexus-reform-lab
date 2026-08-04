# Reform Execution Reset Proposal — One-Time Backlog Reprioritization

> **Status**: PROPOSAL ONLY — NOT CURRENT AUTHORIZATION
> **Type**: One-time execution reset proposal
> **Submitted By**: box-in execution Agent (this artifact is a proposal; final acceptance is a box-out verdict)
> **Scope**: Planning artifacts only. No Engine, Runtime, scheduler, governance platform, Probe, or Contract was created by this round.
> **Authority notice**: This document does **not** amend `state/CURRENT.md`. It does not authorize any mutation. The single authoritative current state remains [`state/CURRENT.md`](CURRENT.md).

---

## 1. Global Diagnosis

```text
Prior-Art Discovery & Composition remains the current reform phase.
The Reform Lab boundary-reconciliation subproject is closed.
state/CURRENT.md: Authorized Next Action = None (awaiting box-out review of the anti-patch-loop guard).
```

Evidence-based observations:

- Reform execution has produced strong **capability evidence** (E3 probes for Beads, go-workflows, Restate, base-llm-wiki, astro-han-llm-wiki) but the formal Nexus has not yet benefited and no real product has yet run through a reform-era minimal path.
- The current loop is **planning-heavy**: Candidate Refresh -> Probe Plan -> Review -> next planning object. Execution is fragmented across many small subprojects (`repair/*`, `experiment/*`, `cleanroom/*` branches) and easily expands sideways.
- The most mature operational artifact is the **LLM Wiki / Current Knowledge** subwiki (`F:\wiki-system\subwikis\llm-wiki-nexus`, v0.1.1, autonomous ingest pipeline, validation passing, active real ingests).
- The strongest probed wheel for human-effort reduction is **Beads** (Coordination / Work Item lifecycle): E3 PASSED with raw evidence and measured human cost (0 routing, 0 manual state lookups in the probe fixture).
- **No reform-era product Workspace is authorized or evidenced.** `worlds/` is empty; the formal Nexus (`F:\nexus`) is a read-only research subject and carries uncommitted + ahead-of-remote state. Any product Pilot is therefore blocked on an outside decision about which product and which Workspace the reform apparatus may use.

---

## 2. Approved North Star (adopted as sole optimization target)

> Nexus exists to continuously develop real products. Its architecture evolves only in response to real bottlenecks, using the smallest proven changes that measurably reduce human coordination cost.

Operational form used throughout this proposal:

> Every reform must measurably improve Nexus's ability to develop real products with less human effort.

---

## 3. One-Time Nature of This Reset

This is a **one-time** execution reset, not a recurring governance process.

- It reconstructs a bounded capability backlog and reprioritizes it around real product development.
- It must **not** become a permanent backlog framework, a new planning taxonomy, or another large reform subproject.
- It is the **final large-scale backlog reprioritization** before entering real product work.
- No further backlog reset should follow before a real product Pilot has run and produced before/after evidence.
- After this task, the next authorized phase should normally be a bounded real-product Pilot.

---

## 4. Capability-Driven Reform Loop (target operating loop)

```text
select real product work
-> use the smallest currently available Nexus path
-> observe where human effort is actually consumed
-> choose one minimal intervention
-> compare before and after
-> KEEP / DISCARD / REVISE
-> continue product development
```

This replaces technology-driven sequencing (Wiki -> Room -> Runtime -> Software 3.0) with a product-and-evidence loop. Capabilities enter the loop only when a real development bottleneck is observed.

---

## 5. What Remains Valid (preserved evidence and doctrine)

- **E3 probe verdicts remain valid preserved evidence** (per `state/CURRENT.md` §7):
  - Astro-Han / karpathy-llm-wiki: `E3 PASSED` — preserved only.
  - base-llm-wiki: `E3 PASSED` — preserved only.
  - Beads: `CONFIRMED FOR E3 COORDINATION SCOPE` — integrated + externally adjudicated — preserved only.
  - go-workflows: `PARTIAL` (prototype durability confirmed; production durability and native coordination fit unresolved) — preserved only.
  - Restate: `CONFIRMED FOR E3 DURABLE RUNTIME SCOPE` (operational fit costly; artifact-world fit unresolved; BSL-1.1 license note) — preserved only.
- **Doctrine remains valid**: `MAINLINE.md`, `REVOLUTION.md`, `FIVE_POINT_FRAMEWORK.md`, `LLM_WIKI_CURRENT_KNOWLEDGE_SYSTEM.md`, `CHARTER.md`, `INVARIANTS.md`.
- **Active governance boundary**: Concept and Contract expansion freeze stays in force (`research/governance/CONCEPT_AND_CONTRACT_EXPANSION_FREEZE.md`).
- **Formal Nexus is a read-only research subject.** Not modified.
- **llm-wiki-nexus manages its own runtime state.** Not modified.

---

## 6. What Is Frozen or Deferred

```text
FROZEN (must not expand without active product need or outside approval):
- World / Room / Scope theory (CONCEPT_AND_CONTRACT_EXPANSION_FREEZE)
- New Concept Models / Minimum Contracts
- Full AutoResearch platform (requires a prior minimal evaluation loop)
- Custom Engine / Runtime / scheduler / evaluation platform / Wiki platform
- Formal Nexus modification
- Provider selection, adoption, adaptation, or binding

DEFERRED (explicitly out of the near-term loop until evidenced):
- Full Legacy migration (requires reversible coexistence evidence)
- Provider composition decision (Beads + go-workflows COMPOSE)
- Durable Runtime adoption (only when a Pilot exposes interruption-recovery as a bottleneck)
- cc-connect retention/replacement (retention is an outside decision; replacement is deferred)
```

---

## 7. Zero-or-One Immediate Recommendation

```text
RECOMMENDED IMMEDIATE TARGET: Product Pilot (real product task through the smallest
currently available Nexus path with before/after human-effort measurement).

RECOMMENDED STATUS: BLOCKED_PENDING_OUTSIDE_DECISION
```

A Product Pilot is the correct next target, but it cannot be `ACTIVATE_NOW` today because the required outside decision is missing:

1. **Which real product** will the reform apparatus develop? (Formal Nexus products — e.g. Presage healthtech, Resonova — exist but live under the read-only legacy system.)
2. **Which Workspace** is authorized and accessible for the Pilot? (`worlds/` is empty; the formal Nexus repo is forbidden to modify; local/remote divergence exists there.)
3. **What is the smallest currently available Nexus path** for that product — files + git only, or files + git + Beads as a disposable local CLI?
4. **Which concrete product-development task** is authorized as the Pilot's first bounded task?

No ACTIVATE_NOW item is claimed. See `NEXT_BOUNDED_REFORM_CARD.md` (BLOCKED_PENDING_OUTSIDE_DECISION).

---

## 8. This Is Not Current Authorization

- This document is a **proposal**.
- It does **not** change `state/CURRENT.md` (unchanged).
- It does **not** authorize any implementation, mutation, Probe, Contract, Provider action, or formal-Nexus change.
- Box-out review is required before any of the recommended next steps can be authorized.

---

## 9. Final Note — No Further Backlog Reset Before a Real Product Pilot

The next backlog-level reset shall **not** be attempted before a real product Pilot has:

- selected a product and Workspace (outside decision);
- run one real product task through the smallest available Nexus path;
- recorded baseline human effort;
- applied one minimal intervention;
- compared before and after;
- and produced evidence for an outside verdict.

After that Pilot, the reform loop (section 4) governs — not another planning phase.

---

*End of reset proposal.*
