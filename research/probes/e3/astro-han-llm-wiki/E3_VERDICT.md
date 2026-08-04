# E3 Verdict — Astro-Han/karpathy-llm-wiki

## Verdict

```text
E3 PASSED
```

## Basis

- Upstream commit identified and locally loaded in an isolated directory.
- No global Skills-directory write occurred.
- Minimal upstream-native raw-source → Markdown wiki workflow completed.
- Original run installation, lint, isolation and cleanup were evidenced.
- Evidence Reproduction Run used the same upstream commit, fixture and isolation rules.
- Six captured raw/wiki outputs are byte-identical to the original run's recorded after-state hashes.
- Both fixture sources are preserved in raw artifacts.
- Current and superseded claims are semantically distinguishable.
- Wiki claims link back to real raw artifacts.
- Index links resolve.
- Log contains only the expected ingest entries.
- No material fixture-external facts were introduced.

## Evidence references

- `UPSTREAM_IDENTITY.md`, `COMMANDS.md`, `ENVIRONMENT.md` — acquisition/loading/isolation.
- `STDOUT.txt`, `RAW_OUTPUT/lint_stdout.txt`, `RAW_OUTPUT/reproduction_lint_stdout.txt` — mechanical lint (exit 0; 0/0/0).
- `FILE_HASHES_BEFORE.sha256`, `FILE_HASHES_AFTER.sha256`, `CAPTURED_WORKTREE/`, `REPRODUCTION.md` — reproduction outputs byte-identical to original after-state hashes.
- `OUTPUT_EVIDENCE.md` — claim → artifact mapping (all CONFIRMED).

## Not established

```text
- Nexus fit
- superiority over base-llm-wiki
- semantic compilation completeness
- information-loss rate
- incremental update reliability
- provenance sufficiency for production
- E4 Nexus-compatible behavior
- E5 replacement / rollback safety
- Provider selection or binding
```

ADOPT / KEEP / SELECTED / BOUND / NEXUS FIT CONFIRMED are not used.
