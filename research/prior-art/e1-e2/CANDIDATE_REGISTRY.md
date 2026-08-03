# Candidate Registry — E1/E2 Prior-Art Survey

> **Status**: UNDER OUTSIDE REVIEW (Foundation 0.7)
> **Rule**: No candidate carries `ADOPT`, `KEEP`, `SELECTED`, `BOUND`, or `IMPLEMENTED`. No candidate reached E3.

## Registry

| candidate | provider slot | evidence level | status | primary upstream source | reason included | next evidence required |
|---|---|---|---|---|---|---|
| Beads | Coordination (+ Runtime/Re-entry adjacent) | E2 | `PROMISING` | github.com/gastownhall/beads | Agent-oriented dependency graph, ready/claim/close, Dolt-backed durable state, export surface | E3 sandbox execution; E4 fixed fixture claim test |
| go-workflows (luno/workflow) | Coordination | E2 | `PARTIAL FIT` | github.com/luno/workflow | Go type-safe event-driven state-machine orchestration, durable events, retries, adapters | E3; verify outbox exactly-once and schema portability |
| Restate | Coordination (+ Runtime) | E2 | `PROMISING` | github.com/restatedev/restate | Durable execution, exactly-once messaging, durable promises/timers, K/V entity state | E3; assess server dependency and state export |
| KurrentDB (EventStoreDB) | Knowledge Projection | E2 | `PARTIAL FIT` | github.com/kurrent-io/KurrentDB | Event-native store with streaming engine; projection lineage; evidence-grade raw events | E2 projections docs; E3; export/import |
| Marten | Knowledge Projection | E2 | `PARTIAL FIT` — adjacent projection substrate | github.com/JasperFx/marten | Event-store / deterministic read-model projection infrastructure; adjacent to LLM-maintained wiki capability | E3 (if ever re-entered as bottom projection); LLM-wiki capability must come from a Current-Knowledge compiler |
| karpathy llm-wiki | Knowledge Projection | E1 | `PARTIAL FIT` — pattern / idea file | gist.github.com/karpathy/442a6bf555914893e9891c11519de94f (llm-wiki.md, read in this pass) | Andrej Karpathy — LLM Wiki pattern; designed to be copied to a coding agent for implementation; not a packaged software product | Compare implementations (Astro-Han, SamurAIGPT, ussumant, atomicstrata, base-llm-wiki) before any E3 |
| base-llm-wiki (local) | Knowledge Projection | E1 | `PROMISING` (preliminary) | local `F:\subwikis\base-llm-wiki` — LOCAL INSPECTION CLAIMED-NOT-EVIDENCED; remote repo has no captured local source snapshot, file excerpts, manifest, hashes, or raw inspection log | Existing local in-house LLM-wiki pattern instantiation (claimed); E1 records local project identity and claimed structure only | Produce a bounded, non-secret local inspection artifact (path, manifest, SHA-256, excerpts, secret screening, command+timestamp, findings) for outside review before E2 |
| Astro-Han/karpathy-llm-wiki | Knowledge Projection | E2 | `PROMISING` | github.com/Astro-Han/karpathy-llm-wiki | Agent Skills-compatible LLM wiki skill; raw/ + wiki/ + index.md + log.md; ingest/query/lint; no MCP or vector DB | E1/E2 comparison vs other LLM-wiki candidates; outside review before any E3 |
| SamurAIGPT/llm-wiki-agent | Knowledge Projection | E2 | `PROMISING` | github.com/SamurAIGPT/llm-wiki-agent | Coding agent skill; entities/concepts/syntheses pages; graph.json/html; contradiction flags at ingest; multi-format ingest (markitdown) | E1/E2 comparison; assess optional Python conversion deps before E3 |
| ussumant/llm-wiki-compiler | Knowledge Projection | E2 | `PROMISING` | github.com/ussumant/llm-wiki-compiler | Claude Code/Codex plugin; incremental /wiki-compile; schema.md; coverage indicators; opt-in macOS launchd autostart for /fetch-bookmarks schedule | E1/E2 comparison; assess autostart/background-job surface before any E3 |
| atomicstrata/llm-wiki-compiler | Knowledge Projection | E2 | `PROMISING` | github.com/atomicstrata/llm-wiki-compiler | npm compiler (llmwiki); Configurable Lifecycle Profiles, review gates, OKF export/import, MCP server, TS SDK; Node 24 + provider credentials | E1/E2 comparison; assess MCP/server + credential dependency before any E3 |
| OPA | Protocol Governance | E2 | `PROMISING` | github.com/open-policy-agent/opa | General-purpose policy engine (Rego), policy-as-code, `opa test`, bundles, fail-closed | E3; NL-protocol adapter assessment |
| Cedar | Protocol Governance | E2 | `PROMISING` | github.com/cedar-policy/cedar | Authorization policy language with validator/analyzer, CLI, WASM | E3; schema-driven policy validation fit |
| Oso | Protocol Governance | E1 | `ARCHITECTURAL REFERENCE ONLY` | github.com/osohq/oso | Declared deprecated in official README | none (deprecated); reuse Polar concepts only |
| MLflow | Experiment / Evaluation | E2 | `PROMISING` | github.com/mlflow/mlflow | Experiment tracking, evaluation metrics/LLM judges, tracing, prompt registry, model registry | E3; fixed workload + baseline/candidate harness fit |
| DVC | Experiment / Evaluation | E2 | `PROMISING` | github.com/treeverse/dvc | Data versioning + ML experiments, pipelines, `dvc exp run/show`, reproducibility/replay | E3; fixed workload replay and metric comparison |
| promptfoo | Experiment / Evaluation | E2 | `PROMISING` | github.com/promptfoo/promptfoo | Declarative LLM evals, model comparison, metrics, red teaming, CI/CD | E3; Nexus-compatible fixture evaluation |
| Temporal | Runtime / Re-entry | E2 | `PROMISING` | github.com/temporalio/temporal | Durable execution platform, workflows/activities, retries, checkpoint/resume | E3; assess fresh-instance reconstruction and export |
| Inngest | Runtime / Re-entry | E2 | `PARTIAL FIT` | github.com/inngest/inngest | Durable step functions, state store, queues, retries, self-hostable | E3; license (SSPL/DOSP) and export surface |
| Hatchet | Runtime / Re-entry | E2 | `PROMISING` | github.com/hatchet-dev/hatchet | Orchestration for tasks/AI agents/durable workflows, Postgres durability, WSL/Docker | E3; crash-recovery fixture and worker re-entry |

## Summary Counts

- Candidates registered: 20
- Reached at least E1: 20
- Reached E2: 17
- E0: 0
- INSUFFICIENT EVIDENCE: 0
- ARCHITECTURAL REFERENCE ONLY: 1
- Selected or bound: 0

> Arithmetic (registry-internal): registered 20 = E0 0 + E1-only 3 + E2 17; at-least-E1 20 = E1-only 3 + E2 17.
> Note: base-llm-wiki downgraded E2 → E1 (LOCAL INSPECTION CLAIMED-NOT-EVIDENCED); karpathy llm-wiki E1 (pattern gist inspected); Marten PARTIAL FIT (adjacent projection substrate), E2 retained.

---

*End of registry.*
