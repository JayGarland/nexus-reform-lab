# Model Execution Context — base-llm-wiki E3

| Field | Value |
|---|---|
| model_name | deepseek-v4-flash (model id: opencode-go/deepseek-v4-flash) |
| role | Replaceable in-box executor of the agent-driven wiki workflow |
| execution_surface | opencode file/terminal tools (read/write files in the isolated probe copy) |
| instruction_files_read | copy's `AGENTS.md`, `workflows/ingest-source.md`, `templates/source-summary.md` (plus read of `wiki/index.md`, `wiki/log.md` for update context) |
| agent_steps_used | 3 (read instructions + template; create two source summaries; update index + append log) |
| manual_interventions | none |
| network_access | none |
| credential_usage | none (no API key required; v1 project uses no external tooling) |
| model_nondeterminism | possible; only the agent-maintained file writes are evaluated. Model output is NOT mixed into tool-capability scoring. |
| secret_exposure | none |

## Boundary

- The model is a replaceable executor only. Capability scoring is based on the produced artifacts and the project's native protocol, not on model behavior.
- If the run had required a key, global Agent configuration, or an external service that could not be safely provided, the verdict would have been `E3 BLOCKED`. None were required.
