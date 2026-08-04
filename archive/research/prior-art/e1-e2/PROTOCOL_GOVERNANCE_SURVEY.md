# Protocol Governance Provider Survey — E1/E2

> **Status**: UNDER OUTSIDE REVIEW (Foundation 0.7)
> **Candidates**: OPA, Cedar, Oso (deprecated → architectural reference only)
> **Note**: These are structured Policy-as-Code / authorization engines. None natively governs natural-language protocol assets; the natural-language layer would require an Adapter. This is a key boundary finding (see `CROSS_PROVIDER_BOUNDARY_FINDINGS.md`).

---

## Candidate: Open Policy Agent (OPA)

**Evidence Level**: E2 (README + docs + source structure inspected)
**Conclusion**: `PROMISING` (Protocol Governance)

**Evidence Card**:

```text
candidate_id              opa
upstream_project          Open Policy Agent
upstream_repository       github.com/open-policy-agent/opa
license                   Apache-2.0 (DOCUMENTED)
maintainer_status         Active; CNCF graduated (12.1k stars, 6.6k commits) (DOCUMENTED)
latest_release            NOT VERIFIED
supported_platforms       Go; Docker images; binaries; WASM compilation (DOCUMENTED)
deployment_model          Policy engine (server / embedded Go SDK / WASM / CLI) (DOCUMENTED)
primary_capability        General-purpose policy engine; declarative policy-as-code (Rego) (DOCUMENTED)
secondary_capabilities    Policy bundles, decision logging, `opa test`, formatting, tracing, profiler (DOCUMENTED)
persistence_model         Policies as files/bundles; decisions computed on request (DOCUMENTED)
coordination_model        NOT VERIFIED
state_ownership           Policy definitions owned as files; no app state (DOCUMENTED)
failure_recovery          NOT VERIFIED
exportability             Policies are plain files/bundles — portable (DOCUMENTED)
importability             File/bundle loading (DOCUMENTED)
observability             Decision logs, metrics, tracing (DOCUMENTED)
security_boundary         Returns decisions; enforcement is performed by the calling service (DOCUMENTED)
model_dependency          None (DOCUMENTED)
removal_cost              Low as a pure decision engine (INFERRED)
integration_surface       REST API, Go SDK, WASM, Kubernetes integrations (DOCUMENTED)
known_limitations         Structured Rego policy, not natural-language protocol assets (INFERRED)
source_citations          github.com/open-policy-agent/opa README + docs (DOCUMENTED)
```

**Answers to the survey questions**:
- Governs structured policy or NL protocols? Structured policy (Rego). NL protocols would need a translation Adapter. DOCUMENTED/INFERRED.
- NL-layer Adapter size? Non-trivial: needs NL→Rego translation, protocol versioning, and decision-trace mapping. INFERRED.
- Fail-closed? Yes — deny-by-default semantics; services enforce decisions. DOCUMENTED/INFERRED.
- Retains external approval? OPA only evaluates; it does not execute irreversible actions. DOCUMENTED.
- Directly executes irreversible actions? No. DOCUMENTED.

---

## Candidate: Cedar

**Evidence Level**: E2 (README + docs + source structure inspected)
**Conclusion**: `PROMISING` (Protocol Governance)

**Evidence Card**:

```text
candidate_id              cedar
upstream_project          Cedar
upstream_repository       github.com/cedar-policy/cedar
license                   Apache-2.0 (DOCUMENTED)
maintainer_status         Active (AWS-backed; 1.6k stars, 1.5k commits) (DOCUMENTED)
latest_release            NOT VERIFIED
supported_platforms       Rust crates; CLI; WASM (JS/TS) (DOCUMENTED)
deployment_model          Library/CLI/WASM; embedded authorization engine (DOCUMENTED)
primary_capability        Authorization policy language + authorization engine (DOCUMENTED)
secondary_capabilities    Policy validator/schema, symbolic compiler (analysis), formatter, language server (DOCUMENTED)
persistence_model         Policies as .cedar files + entities.json (DOCUMENTED)
coordination_model        NOT VERIFIED
state_ownership           Policy files owned as artifacts; entities as input data (DOCUMENTED)
failure_recovery          NOT VERIFIED
exportability             Policy files are plain text — portable (DOCUMENTED)
importability             Policy + entity loading (DOCUMENTED)
observability             NOT VERIFIED
security_boundary         Authorization decisions; enforcement by caller (DOCUMENTED)
model_dependency          None (DOCUMENTED)
removal_cost              Low as a decision engine (INFERRED)
integration_surface       Rust API, CLI, WASM, language server (DOCUMENTED)
known_limitations         Fine-grained authorization focus; structured policies only (INFERRED)
source_citations          github.com/cedar-policy/cedar README (DOCUMENTED)
```

---

## Candidate: Oso (legacy Oso open-source library)

**Evidence Level**: E1 (README inspected)
**Conclusion**: `ARCHITECTURAL REFERENCE ONLY` (deprecated)

```text
candidate_id              oso
upstream_project          Oso
upstream_repository       github.com/osohq/oso
license                   Apache-2.0 (DOCUMENTED)
maintainer_status         DEPRECATED — official README: "We have deprecated the legacy Oso open source library" (DOCUMENTED)
latest_release            NOT VERIFIED
supported_platforms       Rust core + language libraries (Node, Python, Go, Rust, Ruby, Java) (DOCUMENTED)
deployment_model          Embedded library (Polar) (DOCUMENTED)
primary_capability        Authorization framework (RBAC/relationships, Polar) (DOCUMENTED)
secondary_capabilities    Filtering, tests/debugger (DOCUMENTED)
persistence_model         Policies as Polar files (DOCUMENTED)
coordination_model        NOT VERIFIED
state_ownership           Policy files; app data in app (DOCUMENTED/INFERRED)
failure_recovery          NOT VERIFIED
exportability             Policy files portable (INFERRED)
importability             NOT VERIFIED
observability             NOT VERIFIED
security_boundary         Decision engine (DOCUMENTED/INFERRED)
model_dependency          None (DOCUMENTED)
removal_cost              NOT VERIFIED
integration_surface       Language SDKs (DOCUMENTED)
known_limitations         Deprecated upstream; no new feature development; successor (Oso Cloud) is closed-source SaaS (DOCUMENTED)
source_citations          github.com/osohq/oso README (DOCUMENTED)
```

**Note**: Oso is excluded from active selection this round (deprecated) but retained as `ARCHITECTURAL REFERENCE ONLY` for its Polar language and RBAC/relationship modeling ideas.

---

*End of Protocol Governance survey.*
