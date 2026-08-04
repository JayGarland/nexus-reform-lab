# Next Bounded Reform Card — Product Pilot

```text
Title
Real-Product Pilot through the Smallest Currently Available Nexus Path

Status
BLOCKED_PENDING_OUTSIDE_DECISION
```

---

```text
Goal
Run one real product-development task through the smallest currently available
Nexus path, record baseline human effort, apply one minimal intervention, and
compare before/after so the reform loop can begin with real evidence.

Real Product
NOT EVIDENCED (outside decision required). Formal Nexus products exist
(e.g. Presage healthtech, Resonova) but live under the read-only legacy system;
the reform apparatus has no authorized product yet.

Real Product Task or Pain
NOT EVIDENCED (outside decision required). Candidate pain classes from existing
evidence: repeated context explanation (B01), manual routing / state lookup (B02),
manual recovery after interruption (B03), manual summarization / indexing (B04),
unmeasurable reform (B05). Which concrete task is authorized is an outside decision.

Why Now
Reform execution is planning-heavy and has not yet touched a real product.
The E3 evidence base (Beads, go-workflows, Restate, LLM Wiki) is strong enough to
support one bounded real-product loop, but it requires a product + Workspace
decision that only the human operator can authorize.

Deliverables
1. Baseline record: one real product task executed via files+git (smallest path),
   human-effort metrics recorded (B05 template).
2. One minimal intervention: apply the smallest proven capability whose pain the
   baseline exposes (candidate: product-local context recovery B01, or Work Item
   lifecycle via Beads B02) — only after baseline.
3. Before/after comparison persisted as evidence with raw records, awaiting an
   outside KEEP/DISCARD/REVISE verdict.

Exit Criteria
- One real product task completed through the chosen path.
- Baseline and after-intervention human-effort metrics recorded and committed.
- No Engine/Runtime/scheduler/governance platform created; formal Nexus untouched.
- Evidence submitted for outside verdict.

Expected Productivity Gain
- First measured, not assumed, evidence of reduced human coordination cost for a
  real product task (target: fewer manual routing / state-lookup / re-explanation
  steps than the files+git baseline).

Before Measurement
- Human-effort metrics from B05 template (manual routing count, manual state
  lookup count, manual recovery steps, clarifications required, surfaces
  monitored, time-to-understand-current-state, irreversible decisions exposed,
  routine notifications exposed) recorded at baseline.

After Measurement
- Same metric set recorded after the single minimal intervention; raw records
  committed; comparison reported without self-verdict.

Evidence Required
- Real product task records (commands, stdout/stderr, exit codes, timestamps).
- Human-effort metric sheets (before/after) — raw, not interpreted.
- Repo paths + commit SHAs for every claim.

Allowed Scope
- One real product task; one product Workspace authorized by the operator.
- Smallest currently available Nexus path (files+git; plus Beads as a disposable
  local CLI only if the operator authorizes it).
- B05 measurement template; B01 product-local context recovery files.

Forbidden Scope
- Formal Nexus modification (F:\nexus is read-only).
- state/CURRENT.md modification.
- Provider selection, adoption, adaptation, or binding.
- New Probe, Contract, Concept Model, Engine, Runtime, scheduler, or governance
  platform.
- AutoResearch platform, Legacy migration, World/Room expansion.
- llm-wiki-nexus repository modification.

Dependencies
- Outside decision: product selection.
- Outside decision: authorized product Workspace path.
- Outside decision: smallest Nexus path definition (files+git only, or + Beads).
- Outside decision: the specific bounded product task.

Missing Evidence or Outside Decisions
- No authorized product is identified (required: which product).
- No accessible product Workspace is evidenced (worlds/ is empty; formal Nexus is
  read-only and has local/remote divergence — Evidence Gap recorded, not touched).
- No concrete product-development task is authorized.
- Local/remote divergence on F:\nexus (ahead 9, uncommitted + untracked) must be
  resolved by the operator before any Pilot could reference that repo.

Stop Conditions
- No product or Workspace decision is provided -> stay BLOCKED; do not fabricate one.
- The intervention requires more than one Goal / three Deliverables / one Gate.
- A mutation cannot be mapped to the Pilot's Exit Criteria.
- Required scope expands beyond Allowed Scope.
- A repair produces a new adjacent failure.
- Formal Nexus or llm-wiki-nexus would need modification to proceed.

Rollback / Cleanup
- All Pilot artifacts live inside the authorized product Workspace; remove the
  Workspace or the pilot records to revert (no daemons, no servers, no system
  residue). Beads (if authorized) is a disposable CLI: delete the probe dir and
  its .beads/ state.

Outside Decision Required
- 1) Select the real product. 2) Authorize the product Workspace. 3) Define the
  smallest Nexus path (files+git only, or + Beads). 4) Assign the first bounded
  product task. Until then this card remains BLOCKED_PENDING_OUTSIDE_DECISION.
```

---

*End of next bounded reform card.*
