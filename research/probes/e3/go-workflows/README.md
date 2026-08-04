# go-workflows E3 Probe — README

Isolated upstream-native E3 probe of **go-workflows** (`github.com/luno/workflow`
v0.5.0, commit `2f70c64c326e301c838a39f64cb6f61ff501da74`, BSD-3-Clause).

## Purpose

Per the unified Coordination + Durable Runtime Probe Plan, test go-workflows in
the two capability domains (Work Lifecycle, Durable Runtime) by executing the
unified 10-step scenario in an isolated environment with raw evidence.

## Files

| file | contents |
|---|---|
| E3_VERDICT.md | E3 PASSED verdict + basis |
| UPSTREAM_IDENTITY.md | upstream version / commit / license |
| ENVIRONMENT.md | host + isolation facts |
| COMMANDS.md | full command log with exit codes |
| FINDINGS.md | capability matrix: native / mapped / missing + 10-step results |
| HUMAN_COST.md | Human Cost metrics vs no-wheel baseline |
| CLEANUP.md | uninstall / cleanup + verification |
| RAW_OUTPUT/ | phase1.log, phase2.log, capab.log, store-after-crash.json, state-after-persist.json, state-final.json, store.json, capab-store.json, adaptertest-conformance.log |
| PROBE_SOURCE/ | probe module (main.go, capab.go, go.mod, go.sum, filestore/) |

## Key evidence summary

- Phase 1 (steps 1-6): created A->B->C, ready query -> A only, claimed A, attempt
  established with intermediate persisted (version 4), then os.Exit(137). Exit 137.
- Crash-point durable state: A status=Attempting, run_state=Running, version=4,
  1 pending outbox event (store-after-crash.json).
- Phase 2 (steps 7-10): NEW process + same store recovered A to Completed, B and C
  completed via dependency callbacks, lineage recorded (versions 1..5). Exit 0.
- Capabilities: retry w/ backoff, auto-pause after error threshold + auto-resume,
  native cancel. Exit 0.
- The thin `filestore` RecordStore adapter passes upstream
  `adaptertest.RunRecordStoreTest` (see RAW_OUTPUT/adaptertest-conformance.log).

## Declaration

This probe did NOT modify: the verifier, the official Nexus, canonical `state/`
files, any Contract, Concept, Runtime, or Engine. No Provider was selected, no
CR-S0 was started. Evidence committed under this directory only. Gaps (export,
human-approval gate, Workspace interaction, SQL adapter requirement) are recorded
in FINDINGS.md and feed the future `COMPOSE` question; no `ADOPT / ADAPT /
COMPOSE / REJECT` verdict is issued.
