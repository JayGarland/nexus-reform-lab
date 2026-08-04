# E3 Verdict — go-workflows (luno/workflow v0.5.0)

## Verdict

```text
E3 PASSED
```

E3 PASSED means: go-workflows v0.5.0 was installed and run in an isolated probe
module, the unified 10-step Coordination + Durable Runtime scenario completed
natively (including crash recovery by a NEW process from the same record store),
raw evidence was preserved, and the environment was cleaned up.

## Verified at probe time

- Upstream v0.5.0, commit `2f70c64c326e301c838a39f64cb6f61ff501da74`, BSD-3-Clause.
- Installed via `go get github.com/luno/workflow@v0.5.0`; built; ran.
- Thin file-backed RecordStore adapter passes upstream `adaptertest.RunRecordStoreTest` (all PASS).
- 10-step scenario: A->B->C creation, ready-work query (1 item: A), claim via callback,
  attempt established, intermediate persisted, crash (exit 137), new-process recovery
  to Completed, output submitted, lineage recorded (versions 1..5).
- Native pause/cancel/retry surfaces exercised (capab run, exit 0).
- No verifier, Contract, Concept, Runtime, Engine, official Nexus, or canonical
  state modified (see declaration in README).

## Not established (NOT E3 scope)

```text
- Nexus fit
- ADOPT / ADAPT / COMPOSE / REJECT verdict
- Provider selection or binding
- production durability of the record store (upstream SQL adapter not exercised; no SQL server available)
- export surface (none exists upstream)
- human-approval gate
- external Workspace interaction
```

ADOPT / KEEP / SELECTED / BOUND / SUPERIOR / NEXUS FIT CONFIRMED are not used.
