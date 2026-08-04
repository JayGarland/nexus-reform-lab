---
type: log
status: append-only
---

# LLM-wiki Log

Append-only record of wiki events. Use parseable headings.

## [2026-06-04] ingest | LLM Wiki - from karpathy

- Source: `raw/LLM Wiki - from karpathy.md`
- Result: Created initial overview, concept pages, index, local schema, workflows, and templates.
- Key concepts added: [[Raw Sources]], [[Persistent Wiki]], [[Schema]], [[Ingest]], [[Query]], [[Lint]], [[Index and Log]], [[Obsidian as IDE]], [[Git-backed Markdown]].
- Boundary: This is a local project scaffold only; broader vault semantic state was not adopted or mutated.

## [2026-06-04] ingest+query | LLM-Wiki x Emergent Design root merge

- Sources: `raw/Emergent Design AI auto-reading Obsidian design-state idea.md`; `dev/llm-wiki-emergent-design-root-branch/llm-wiki-emergent-design-root-branch.md`; existing `raw/LLM Wiki - from karpathy.md`.
- Result: Added source summary, filed [[Supervised LLM-Wiki Design-State Intake Pattern]], and added concept pages for [[Bounded Generated Wiki Ownership]], [[Multi-Page Ingest]], [[Source-Claim Compilation]], and [[Parent-Vault Semantic Boundary]].
- Key decision: Prefer LLM-Wiki behavior inside a bounded generated wiki layer: LLM-owned wiki maintenance, multi-page ingest, maintained source-claim pages, and optional tool support as later candidate support.
- Boundary: Local generated-wiki maintenance remains candidate/source-derived support and does not mutate broader vault notes, registries, protocols, `AGENTS.md`, `.obsidian/`, or accepted semantic state.

## [2026-06-05] docs | 中文用户手册

- Result: Added [[用户手册]] as a user-facing Chinese guide for using the bounded LLM-Wiki system.
- Audience: ordinary user, not developer.
- Boundary: Documentation only; no broader vault semantic state, registry, protocol, `AGENTS.md`, or `.obsidian/` update.

## [2026-06-05] ingest | ChatGPT chat archive-king cobra feature review

- Source: `raw/ChatGPT chat archive-king cobra feature review.md`
- Result: Added a source summary and concept pages for [[Layered Training Analogy]], [[Retrospective-Structuring]], [[LLM-Reproducibility]], and [[Stochastic Exposure Control]].
- Key concepts added: layered transformation, post-hoc restructuring, reproducibility under fixed conditions, and controlled exposure to randomness.
- Boundary: The source's `machine-learning-registry` wording was not found in the raw text and was not promoted into a maintained page.

## [2026-06-05] ingest | Layered Training Analogy branch note

- Source: `raw/Layered Training Analogy.md`
- Result: Expanded [[Layered Training Analogy]] to absorb the branch's full layered mechanism, and added a dedicated source summary.
- Key concepts added: input encoding, frequency, feedback, retrospective structuring, permission filtering, integration, and the natural-selection boundary used to avoid overclaiming universality.
- Boundary: The branch's proposed child nodes such as [[High-Coupling Vector Set]], [[Permission Layer]], [[Integration Window]], and [[Input Encoding Layer]] (Candidate Node) were treated as referenced scaffolding, not forced into separate maintained pages.

## [2026-06-05] ingest | High-Coupling Vector Set branch note

- Source: `raw/High-Coupling Vector Set.md`
- Result: Added [[High-Coupling Vector Set]] as a maintained concept page and created a source summary for the branch note.
- Key concepts added: probability terrain, meaning recalibration, input architecture, promotion assessment, layered world reception, interpretive power allocation, and the coupling of conditions into a target-shaping system.
- Boundary: The source's many candidate nodes were recorded as related or open questions, but only the parent concept was promoted into a maintained page.

## [2026-06-05] ingest | Permission Layer branch return

- Source: `raw/Permission Layer.md`
- Result: Added [[Permission Layer]] as a maintained concept page and created a source summary.
- Key concepts added: P0–P5 permission levels, U1–U6 update targets, and governance guardrails for evidence processing.
- Boundary: The full identity/canon authorization model remains conceptual (P4/P5 targets) and does not grant direct mutation authority over the parent vault.

## [2026-06-05] ingest | Update Gate branch return

- Source: `raw/Update Gate.md`
- Result: Added [[Update Gate]] and [[Integration Window]] as maintained concept pages and created a source summary.
- Key concepts added: Update Layers (U0–U6), Timing Windows (W0–W6), Mandatory Update Permission Declarations, and the distinction between permission and timing maturity.
- Boundary: The model reinforces the manual Obsidian boundary by blocking U4/U5/U6 updates at the child-local level.

## [2026-06-05] ingest | Integration Window branch note

- Source: `raw/Integration Window.md`
- Result: Expanded [[Integration Window]] into a dedicated timing / containment / cooling concept and created a source summary.
- Key concepts added: W0–W6 and WP windows, parking logic, re-sampling logic, quarantine logic, and the separation of timing maturity from update permission.
- Boundary: The branch remains a wiki-layer timing governance model; exact durations and future archive aggregation are still parked.

## [2026-06-05] lint | health check repair

- Result: Applied fixes from the lint pass.
- Key fixes: Updated `wiki/index.md` Source Inventory (added 3 files) and fixed ambiguous Source Summary links; populated `source` YAML metadata for several concept pages; updated `overview.md` with Theoretical Extensions.
- Deferred: Creation of `Permission Layer.md` is deferred at user request.
- Boundary: Only `wiki/` files were modified.

## [2026-06-05] lint | health check repair (pass 2)

- Result: Applied fixes from the second lint pass.
- Key fixes: Optimized `wiki/index.md` summary links with explicit pathing; updated `wiki/overview.md` architecture section with Permission Layer role; added "Candidate Node" annotations to undefined links in `High-Coupling Vector Set.md`.
- Deferred: Creation of `Update Gate.md` and `Integration Window.md` stubs deferred as the user will supplement them.
- Boundary: Only `wiki/` files were modified.

## [2026-06-05] ingest | Archive Aggregation Layer branch note

- Source: `raw/Archive Aggregation Layer.md`
- Result: Added [[Archive Aggregation Layer]] as a maintained concept page and created its source summary.
- Key concepts added: AG0-AG5 aggregation states, V0-V5 validation flags, R0-R5 recurrence profile, C0-C6 contradiction profile, and the boundary between aggregation readiness, stability judgment, and update authority.
- Boundary: The source remains a v0.1 conceptual module with runtime/protocol/parent-state mutation out of scope; only `wiki/` files were modified.

## [2026-06-05] ingest | High-Coupling-Vector-Set-Protocol branch note

- Source: `raw/High-Coupling-Vector-Set-Protocol.md`
- Result: Added [[High-Coupling-Vector-Set-Protocol]] as a maintained concept page and created its source summary.
- Key concepts added: coupling-cost principle, open-vs-closed determinacy regimes, context economy / gradient preservation, and the relation between vector topology and branch routing.
- Boundary: The protocol remains a wiki-layer methodological candidate; no runtime automation, registry update, or parent-vault mutation was applied.

## [2026-06-05] ingest | Branch Return Policy Design & Workflow v2.1

- Sources: `raw/Branch Return Policy Design.md`; `raw/Workflow-v2.1-branch-return-policy.md`.
- Result: Added source summaries and concept pages for [[Branch Return Policy Design]], [[Branch Return]], and [[Recursive-Bounded-Determinism]].
- Key focus: Resolved the "Branching Trap" by defining Branch Return as the tool for **Convergence**.
- Key concepts added: separation of signal from archive, return boundaries (Explanation gain < Integration cost), and Parent Handling as the mandatory integration gate.
- Boundary: Only `wiki/` files were modified.

## [2026-06-05] query | High-Coupling Protocol User Guide

- Question: Write a user manual for HCVS protocol in Chinese, for users not developers.
- Result: Filed [[High-Coupling-Protocol-User-Guide]] as a query result.
- Key content: Simplified explanation of vectors, coupling, and context economy for non-technical application.
- Boundary: Only `wiki/` files were modified.

## [2026-06-05] query | Protocol Boundary and Target Definition

- Question: How to define complex targets and can the protocol apply to anything?
- Result: Filed [[Protocol-Boundary-and-Target-Definition]] as a query result.
- Key content: Defined complex targets as multi-factor, high-probability sensitivity, and phase-transitional; cautioned against "Over-Coupling" for simple tasks due to management costs.
- Boundary: Only `wiki/` files were modified.

## [2026-06-05] query | Cognitive Explosion and Branch Governance

- Question: How to judge cost/benefit without prior practice, and how to stop recursive branch/cognition explosion?
- Result: Filed [[Cognitive-Explosion-and-Branch-Governance]] as a query result.
- Key content: Identified "Branch Explosion" as a misuse of HCVS; established "Cognitive Redlines" (e.g., max 3 active conversations); mandated "Greedy Compression" and "Pruning" to protect single-threaded human cognition.
- Boundary: Only `wiki/` files were modified.

## [2026-06-05] query | Convergence vs Branching Logic

- Question: How to understand "HCVS is a convergence tool, not a branching algorithm"?
- Result: Filed [[Convergence-vs-Branching-Logic]] as a query result.
- Key content: Clarified that HCVS requires vectors to be "coupled" in the same context to amplify each other; opening separate conversations is actually "de-coupling" and leads to management collapse.
- Boundary: Only `wiki/` files were modified.

## [2026-06-05] lint | health check repair (pass 3)

- Result: Applied bounded fixes for Lint Pass 03.
- Key fixes:
  - Removed duplicate question in [[High-Coupling Vector Set]].
  - Annotated missing links as `(Candidate Node)` in [[Stochastic Exposure Control]], [[Archive Aggregation Layer]], and [[High-Coupling-Vector-Set-Protocol]].
  - Updated [[Overview]] to include [[High-Coupling-Vector-Set-Protocol]] and unified list formatting.
  - Added provenance note to [[Index and Log|Index]] for the Karpathy base pattern in [[Source Inventory]].
- Boundary: Only `wiki/` files were modified.

## [2026-06-05] lint | health check repair (pass 4)

- Result: Applied bounded fixes for Lint Pass 04.
- Key fixes:
  - Created [[source-summaries/LLM Wiki - from karpathy|LLM Wiki - from karpathy]] and linked it in [[Index and Log|Index]].
  - Standardized all Source Summary headers to `# [Title]` format.
  - Fixed broken candidate link in [[Log#2026-06-05 ingest | Layered Training Analogy branch note]].
  - Corrected YAML indentation in [[Integration Window]] and [[Update Gate]].
- Boundary: Only `wiki/` files were modified.

## [2026-06-05] query | Branch Return Policy Revision

- Question: Does the "Branch Return Policy" need revision to prevent state explosion?
- Result: Filed [[收敛优先：重新界定分支治理的边界]] as a query result.
- Key content: Re-contextualized Branch/Workflow as an "emergency overflow valve" rather than a default action path. Enforced "Greedy Convergence" as the primary rule: if it can be done in one context, it must be, to protect the coupling efficacy.
- Boundary: Only wiki/ files were modified.

## [2026-06-05] query | Context Furnace & Goal Types

- Question: How to operate in a single context furnace and differentiate by goal types?
- Result: Filed [[上下文熔炉：高维矢量对齐的操作指南]] as a query result.
- Key content: Defined the "Context Furnace" as a single-chat multi-vector collision technique. Differentiated strategies for "Design" (High-Coupling/No Branch), "Execution" (Greedy Convergence), and "Exploration" (Sandbox & Discard).
- Boundary: Only wiki/ files were modified.

## [2026-06-05] query | Value of Branch Return Policy

- Question: Is Branch Return Policy Design a failure or useless under the convergence rule?
- Result: Filed [[深度辩证：Branch-Return-Policy-的存在意义与误区]] as a query result.
- Key content: Re-contextualized Branch Return Policy as the "Brakes/Safety System" that enables HCVS to exist. It is not a failure; its lower invocation frequency is a sign of a healthier convergence-first system.

## [2026-06-05] query | HCVS Workflow Evolution

- Question: How to use the HCVS protocol under the context furnace model?
- Result: Filed [[实操指南：基于上下文熔炉的-HCVS-进化工作流]] as a query result.
- Key content: Streamlined HCVS into a "one-screen, one-furnace, one-signal" loop. Defined "Furnace Ignition" via explicit vector declarations and used "Signal Extraction" as the bridge between furnace resets (re-contextualizing return policy).

## [2026-06-05] ingest | Stochastic Exposure Control Suite

- Sources processed:
  - `raw/Feedback Stability Check.md` -> [[concepts/Feedback Stability Check|Feedback Stability Check]]
  - `raw/Sampling Strategy.md` -> [[concepts/Sampling Strategy|Sampling Strategy]]
  - `raw/Noise Filter.md` -> [[concepts/Noise Filter|Noise Filter]]
  - `raw/Exposure Budget.md` -> [[concepts/Exposure Budget|Exposure Budget]]
  - `raw/Randomness Source Map.md` -> [[concepts/Randomness Source Map|Randomness Source Map]]
  - `raw/Path Fork Monitor.md` -> [[concepts/Path Fork Monitor|Path Fork Monitor]]
  - `raw/Randomness-to-Learning Conversion.md` -> [[concepts/Randomness-to-Learning Conversion|Randomness-to-Learning Conversion]]
  - `raw/relation SEC HCVS.md`
- Key Results:
  - Completed the 7-stage SEC pipeline (C0-C7) for converting events into integrated learning.
  - Established functional complementarity between SEC (Sampling/Defense) and HCVS (Direction/Offense).
  - Defined explicit classification indices for Stability (S), Sampling (M), Noise (N), Budget (B), and Randomness (R).
- Boundary: Only `wiki/` files were modified.

## [2026-06-05] lint | Bounded Path Standardization & Final Cleanup

- Objective: Resolve broken subfolder links and standardize wiki hygiene after the SEC suite rollout.
- Actions:
  - Standardized all `wiki/` wikilinks to folder-prefixed syntax (e.g., `[[concepts/Name|Label]]`, `[[source-summaries/Name|Label]]`).
  - Removed all `(Candidate Node)` tags by promoting referenced concepts to official `[[concepts/...]]` links.
  - Standardized all `source-summaries` YAML metadata (source/status) and headers.
  - Standardized `index.md` and `overview.md` for absolute internal navigation.
  - Handled the "State Explosion" anxiety by formalizing SEC as the signal filter for HCVS.
- Result: The wiki is now in a stable, fully-linked state suitable for both Obsidian browsing and continued LLM maintenance.
- Boundary: Only files within the `wiki/` directory were modified.

## [2026-06-05] query | SEC 与 HCVS 的关系

- Question: "stochastic exposure control 和 High coupling vector set 有什么关系"
- Result: Filed [[query-results/SEC-与-HCVS-的关系|SEC-与-HCVS-的关系]] as a durable query result.
- Key content: Defined the relationship as Functional Complementarity: SEC is "Defense/Absorption" (immune system), while HCVS is "Offense/Direction" (precision strike). HCVS generates signals, SEC validates them via Update Gates.
- Boundary: Only `wiki/` files were modified.

## [2026-06-05] ingest | Viable-Gradient-Path

- Source: `raw/Viable-Gradient-Path.md`
- Result: Added source summary and concept pages for [[concepts/Viable-Gradient-Path|Viable-Gradient-Path]], [[concepts/Intermediate-Valley|Intermediate-Valley]], [[concepts/Pre-Adaptation|Pre-Adaptation]], and [[concepts/Adaptive-Transition|Adaptive-Transition]].
- Key focus: Established the "Path Feasibility" check to complement HCVS "Vector Alignment."
- Boundary: Only `wiki/` files were modified.

## [2026-06-05] query | 协议实践轻量化指南

- Question: "在实际 AI 对话中如何实践 HCVS/SEC/VGP，如何为新用户设计完整的操作路径？"
- Result: Filed [[query-results/协议实践轻量化指南|协议实践轻量化指南]] as a durable query result.
- Key content: 完整的新用户操作流程（Pre-Flight → Ignition → Supervision → Signal 提取 → 跨对话重启），自包含 Prompt 模板，无需预加载任何协议文件；包含 Artifact 分类表、目标模糊特殊处理、FAQ。
- Alignment notes: 经多轮与用户治理工作流对齐确认；State Header 定位为 bounded execution 阶段的语义状态子协议，不替代 Workflow Execution State 块。
- Boundary: Only `wiki/` files were modified.

## [2026-06-05] query | 协议实践轻量化指南-个人版

- Question: "如何为 owner 个人化通用指南，处理探索模式（目标模糊，如分析视频字幕）的 Ignition 难题？"
- Result: Filed [[query-results/协议实践轻量化指南-个人版|协议实践轻量化指南（个人版）]]，同步更新通用指南 Step 1（增加执行/探索模式分支，移除冗余的"目标模糊时的特殊处理"节）。
- Key content: 探索模式 Ignition（反向约束替代硬约束）、视频字幕测试用例、约束涌现路径、治理工作流接口图。
- Boundary: Only `wiki/` files were modified.

## [2026-06-05] lint | Bounded Fixes

- Purpose: Cross-link VGP into HCVS and update User Manual.
- Actions:
    - Updated [[concepts/High-Coupling Vector Set|High-Coupling Vector Set]] with "Feasibility: Viable Gradient Path" section.
    - Updated [[用户手册|用户手册]] "Current System Status" list.
- Result: Structural coherence between transition risk management (VGP) and vector alignment (HCVS).
- Boundary: Only `wiki/` files were modified.

## [2026-08-04] ingest | Project Atlas - Versioned State

- Source: `raw/source-a.md`
- Disposition: New
- Result: Created source summary page; index and log updated.

## [2026-08-04] ingest | Project Atlas - Database Supersession

- Source: `raw/source-b.md`
- Disposition: New
- Result: Created source summary page; recorded explicit supersession (database design superseded on 2026-07-01); index and log updated.
