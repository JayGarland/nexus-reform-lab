# E3 Environment Isolation — Foundation 0.8

> **Status**: ISOLATION PROTOCOL — UNDER OUTSIDE REVIEW (Foundation 0.8)
> **Purpose**: Defines the isolation boundary every E3 Probe MUST respect. NO Probe runs in this round.

---

## 1. Isolation Rules

```text
Independent directory     — each Probe runs in its own disposable directory
Do not modify official Nexus
Do not read Nexus secrets
No writes to user-global configuration unless explicitly recorded and reversible
No autostart (no login/boot items, no installers that register autostart)
No persistent background service
```

## 2. Resource Inventory

Each Probe MUST record:

```text
Ports used
Processes created
Files created
```

before/after a Probe:

```text
Before-file Hash or directory snapshot
After-file Hash or directory snapshot
```

## 3. Cleanup Verification

- Cleanup commands MUST be recorded.
- Post-cleanup verification MUST confirm: no created process running, no created port listening, no leftover files outside the disposable directory, no global-config mutation.
- If a Probe cannot be cleaned up, subsequent Probes are halted immediately and the condition reported.

---

## 4. Credentials and Network

- No cloud account, no paid credentials, and no live API keys may be required for E3.
- Network access MUST be recorded; where possible, offline or local-only operation is preferred.

---

*End of E3 Environment Isolation.*
