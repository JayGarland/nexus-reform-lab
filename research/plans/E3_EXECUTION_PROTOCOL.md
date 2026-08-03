# E3 Execution Protocol — Foundation 0.8

> **Status**: PROTOCOL — UNDER OUTSIDE REVIEW (Foundation 0.8)
> **Purpose**: Defines the mandatory record for every future E3 Probe and the only permitted E3 conclusions. NO Probe runs in this round.

---

## 1. Mandatory Probe Record

Every future E3 Probe MUST record:

```text
upstream version / commit
installation command
working directory
environment variables
network access
credentials
start time
end time
exit code
stdout
stderr
created processes
created files
created ports
cleanup commands
post-cleanup verification
```

Raw stdout/stderr and exit codes are the evidence. Chat reports are navigation only.

---

## 2. E3 Conclusion Labels

An E3 Probe concludes with exactly one of:

```text
E3 PASSED
E3 PARTIAL
E3 FAILED
E3 BLOCKED
```

Forbidden conclusion labels for E3:

```text
ADOPT
KEEP
SELECTED
BOUND
NEXUS FIT CONFIRMED
```

These are not usable at E3; they require higher evidence levels and an outside verdict.

---

## 3. Evidence Discipline

- Every field in Section 1 must be filled or marked explicitly (e.g., `none`, `not applicable`).
- `E3 PASSED` requires successful install, start, minimal-native-capability execution, and verified cleanup.
- `E3 PARTIAL` / `E3 FAILED` / `E3 BLOCKED` require the specific failing step and its raw output.
- A Probe that cannot be cleaned up MUST be reported immediately and subsequent Probes halted.

---

*End of E3 Execution Protocol.*
