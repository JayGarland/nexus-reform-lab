---
type: index
status: active
---

# LLM-wiki Index

This is the content-oriented catalog for the local LLM-wiki project. Read this file first, then drill into relevant pages.

## Core Pages

| Page | Summary |
|---|---|
| [[Overview]] | Project-level synthesis of the LLM-wiki pattern. |
| [[Log]] | Chronological record of ingests, queries, and lint passes. |
| [[用户手册]] | 中文用户手册，说明普通用户如何使用这个 bounded LLM-Wiki 系统。 |

## Concepts

| Page | Summary |
|---|---|
| [[concepts/Raw Sources|Raw Sources]] | Immutable source layer read by the LLM. |
| [[concepts/Persistent Wiki|Persistent Wiki]] | Generated Markdown knowledge layer maintained over time. |
| [[concepts/Sampling Strategy|Sampling Strategy]] | Mechanism deciding how to collect, repeat, or stop samples (M0-M7) after noise detection. |
| [[concepts/Randomness Source Map|Randomness Source Map]] | Diagnostic framework for identifying origins of uncertainty (R1-R11). |
| [[concepts/Randomness-to-Learning Conversion|Randomness-to-Learning Conversion]] | SEC mechanism for distilling raw stochastic events into layer-bounded learning objects (C0-C7). |
| [[concepts/Schema|Schema]] | Local instruction surface that disciplines the LLM maintainer. |
| [[concepts/Ingest|Ingest]] | Workflow for integrating a new source into the wiki. |
| [[concepts/Query|Query]] | Workflow for answering questions against the maintained wiki. |
| [[concepts/Lint|Lint]] | Workflow for health-checking contradictions, stale claims, and missing links. |
| [[concepts/Exposure Budget|Exposure Budget]] | Proactive mechanism deciding allowed levels of stochastic exposure (E0-E5). |
| [[concepts/Feedback Stability Check|Feedback Stability Check]] | Mechanism for judging whether stochastic feedback is stable enough to trust (S0-S5). |
| [[concepts/Index and Log|Index and Log]] | Navigation and chronological bookkeeping files. |
| [[concepts/Obsidian as IDE|Obsidian as IDE]] | Obsidian as the browsing and inspection interface for the wiki. |
| [[concepts/Git-backed Markdown|Git-backed Markdown]] | Git history and diffs as project-level file hygiene. |
| [[concepts/Bounded Generated Wiki Ownership|Bounded Generated Wiki Ownership]] | LLM ownership of maintained generated-wiki pages inside an explicitly bounded scaffold. |
| [[concepts/Conversation Trace|Conversation Trace]] | Structured record of dialogue logic, state movement, and topic evolution. |
| [[concepts/Conversation Trace Protocol|Conversation Trace Protocol]] | Operational procedure for generating traces to ensure system traceability. |
| [[concepts/Multi-Page Ingest|Multi-Page Ingest]] | One-source ingest that updates multiple maintained wiki pages, links, index entries, and log entries inside the scaffold. |
| [[concepts/Noise Filter|Noise Filter]] | Evaluative mechanism for classifying stochastic feedback as signal, noise, or contradiction. |
| [[concepts/Source-Claim Compilation|Source-Claim Compilation]] | Conversion of source claims into maintained wiki pages with provenance, contradictions, and reusable synthesis. |
| [[concepts/Parent-Vault Semantic Boundary|Parent-Vault Semantic Boundary]] | Boundary that prevents local generated-wiki maintenance from becoming broader vault semantic adoption. |
| [[concepts/Branch Return Policy Design|Branch Return Policy Design]] | Governance of multi-layer branch systems, separating decision signals from archives. |
| [[concepts/Branch Return|Branch Return]] | The action-oriented decision signal produced at the end of a child branch's local execution. |
| [[concepts/Recursive-Bounded-Determinism|Recursive-Bounded-Determinism]] | Theoretical basis for achieving local determinism through recursive, bounded boundaries. |
| [[concepts/Layered Training Analogy|Layered Training Analogy]] | Layered transformation model for inputs, feedback, reweighting, interpretation, permission, and integration. |
| [[concepts/High-Coupling Vector Set|High-Coupling Vector Set]] | Multi-vector condition system that couples input design, probability terrain, permission, and integration around a target outcome. |
| [[concepts/High-Coupling-Vector-Set-Protocol|High-Coupling-Vector-Set-Protocol]] | Protocolized execution method for high-coupling condition design, routing, and coupling-cost control. |
| [[concepts/Retrospective-Structuring|Retrospective-Structuring]] | Re-labeling and re-weighting of past events under a new structure. |
| [[concepts/LLM-Reproducibility|LLM-Reproducibility]] | Engineering boundary on whether fixed inputs and environment still produce divergent outputs. |
| [[concepts/Viable-Gradient-Path|Viable-Gradient-Path]] | Concept testing whether a transition path from current to target state is traversable. |
| [[concepts/Intermediate-Valley|Intermediate-Valley]] | The danger zone in a transition where old advantages are lost but new ones are not yet gained. |
| [[concepts/Pre-Adaptation|Pre-Adaptation]] | Existing system capacities that can be repurposed for a new target path. |
| [[concepts/Adaptive-Transition|Adaptive-Transition]] | Controlled movement toward a target through survivable, feedback-corrected intermediate steps. |
| [[concepts/Stochastic Exposure Control|Stochastic Exposure Control]] | Governance of how open systems sample uncertainty and convert randomness into structured learning. |
| [[concepts/Permission Layer|Permission Layer]] | Governance mechanism between evidence intake and system mutation; determines update authority. |
| [[concepts/Update Gate|Update Gate]] | Governance mechanism for deciding allowed update layers (U0–U6) for stochastic signals. |
| [[concepts/Integration Window|Integration Window]] | Governance of timing maturity and cooling periods for information integration. |
| [[concepts/Archive Aggregation Layer|Archive Aggregation Layer]] | Cross-extract evidence aggregation layer that prepares recurrence, contradiction, and weighting signals for review. |
| [[concepts/Stochastic Exposure Archive Extract|Stochastic Exposure Archive Extract]] | Local evidence unit capturing stochastic events, feedback, and signal/noise hypotheses. |
| [[concepts/Stochastic Exposure Archive Extract Protocol|Stochastic Exposure Archive Extract Protocol]] | System procedure for identifying and extracting events from a branch into an archive artifact. |
| [[concepts/Over-Coupling|Over-Coupling]] | The primary anti-pattern of HCVS where excessive vectors lead to cognitive collapse. |
| [[concepts/Path Fork Monitor|Path Fork Monitor]] | Diagnostic mechanism for detecting pressure to change branch path or scope (F0-F7). |
| [[concepts/Stochastic-Entropy|Stochastic Entropy]] | The inherent noise in probabilistic systems that must be governed by SEC. |

## Source Summaries

| Page | Summary |
|---|---|
| [[source-summaries/Emergent Design AI auto-reading Obsidian design-state idea|Emergent Design AI auto-reading Obsidian design-state idea]] | Source summary for the user's migration packet about A1/A2 Obsidian design-state inspection and parent-vault authority boundaries. |
| [[source-summaries/Exposure Budget|Exposure Budget]] | Source summary for the proactive gating of uncertainty and E0-E5 levels. |
| [[source-summaries/Feedback Stability Check|Feedback Stability Check]] | Source summary for the S-index levels and local vs. global stability criteria. |
| [[source-summaries/LLM Wiki - from karpathy|LLM Wiki - from karpathy]] | Source summary for the foundational LLM-Wiki pattern. |
| [[source-summaries/Sampling Strategy|Sampling Strategy]] | Source summary for the SEC evidence collection modes and decision flow. |
| [[source-summaries/Conversation Trace Protocol|Conversation Trace Protocol]] | Source summary for the migration from static summaries to dynamic state-bound traces. |
| [[source-summaries/ChatGPT chat archive-king cobra feature review|ChatGPT chat archive-king cobra feature review]] | Source summary for the king cobra thread that turns into theory work on layered training, retrospective structuring, reproducibility, and stochastic exposure control. |
| [[source-summaries/Layered Training Analogy|Layered Training Analogy]] | Source summary for the branch note that explains [[High-Coupling Vector Set]] through layered input, frequency, feedback, permission, and integration. |
| [[source-summaries/High-Coupling Vector Set|High-Coupling Vector Set]] | Source summary for the branch note that elevates high-coupling conditions into a maintained parent concept and links it to the layered-training branch. |
| [[source-summaries/High-Coupling-Vector-Set-Protocol|High-Coupling-Vector-Set-Protocol]] | Source summary for the protocol branch that operationalizes high-coupling design and branch routing. |
| [[source-summaries/Permission Layer|Permission Layer]] | Source summary for the branch return defining permission levels (P0–P5) and update targets (U1–U6). |
| [[source-summaries/Update Gate|Update Gate]] | Source summary for the mechanism defining update layers (U0–U6), permission mapping, and integration timing. |
| [[source-summaries/Integration Window|Integration Window]] | Source summary for the timing / containment / cooling layer complementing [[Update Gate]]. |
| [[source-summaries/relation SEC HCVS|relation SEC HCVS]] | Source summary for the architectural synthesis connecting SEC (Defense) and HCVS (Offense). |
| [[source-summaries/Noise Filter|Noise Filter]] | Source summary for the evaporative classification of feedback into N0-N8 levels. |
| [[source-summaries/Path Fork Monitor|Path Fork Monitor]] | Source summary for the diagnostic pressure-monitoring of branches and goals. |
| [[source-summaries/Randomness Source Map|Randomness Source Map]] | Source summary for the SEC diagnosis layer and R-index categories. |
| [[source-summaries/Randomness-to-Learning Conversion|Randomness-to-Learning Conversion]] | Source summary for the SEC conversion pipeline from raw events to structured learning. |
| [[source-summaries/Archive Aggregation Layer|Archive Aggregation Layer]] | Source summary for the SEC submodule that aggregates multiple archive extracts into review-ready evidence states. |
| [[source-summaries/Stochastic Exposure Archive Extract|Stochastic Exposure Archive Extract]] | Source summary for the artifact definition and extraction protocol for local stochastic evidence units. |
| [[source-summaries/Branch Return Policy Design|Branch Return Policy Design]] | Source summary for the architectural logic of branch systems and cognitive load governance. |
| [[source-summaries/Workflow-v2.1-branch-return-policy|Workflow-v2.1-branch-return-policy]] | Source summary for the concrete steps of branch startup, return, and integration. |

## Query Results / Syntheses

| Page | Summary |
|---|---|
| [[query-results/SEC-与-HCVS-的关系|SEC 与 HCVS 的关系]] | 阐述 SEC（防御/吸收）与 HCVS（进攻/塑造）的互补协同关系。 |
| [[query-results/Supervised LLM-Wiki Design-State Intake Pattern|Supervised LLM-Wiki Design-State Intake Pattern]] | Accepted Slice 23 synthesis aligning the merge toward LLM-Wiki inside a bounded generated wiki layer. |
| [[query-results/High-Coupling-Protocol-User-Guide|High-Coupling-Protocol-User-Guide]] | 面向普通用户的“高耦合矢量集协议”操作指南。 |
| [[query-results/Protocol-Boundary-and-Target-Definition|Protocol-Boundary-and-Target-Definition]] | 关于复杂目标定义与协议适用边界的决策说明。 |
| [[query-results/Cognitive-Explosion-and-Branch-Governance|Cognitive-Explosion-and-Branch-Governance]] | 防范分支指数级增长导致的认知爆炸与治理策略。 |
| [[query-results/Convergence-vs-Branching-Logic|Convergence-vs-Branching-Logic]] | 深度辨析 HCVS 的“收敛”本质与防范“分叉”陷阱政策。 |
| [[query-results/收敛优先：重新界定分支治理的边界|收敛优先：重新界定分支治理的边界]] | 将“分支回归框架”重定位于“溢出保险阀”而非默认路径，以防止治理工具反而助长状态爆炸。 |
| [[query-results/上下文熔炉：高维矢量对齐的操作指南|上下文熔炉：高维矢量对齐的操作指南]] | 解释如何在单一 Context 中实现多矢量碰撞（熔炉模型），并针对设计、执行、探索类目标提供差异化策略。 |
| [[query-results/深度辩证：Branch-Return-Policy-的存在意义与误区|深度辩证：Branch-Return-Policy 的存在意义与误区]] | 阐述分支回归协议在收敛架构中的“保险/制动”地位，确立其作为高频对齐前提的架构价值。 |
| [[query-results/实操指南：基于上下文熔炉的-HCVS-进化工作流|实操指南：基于上下文熔炉的 HCVS 进化工作流]] | 将 HCVS 协议与“上下文熔炉”结合的实操手册，简化为“一屏、一炉、一信号”的操作闭环。 |
| [[query-results/架构决策：关于上下文熔炉与分支治理的深度评估|架构决策：关于上下文熔炉与分支治理的深度评估]] | 针对收敛优先原则的批判性评估，确立任务适用性矩阵与隐藏成本警示。 |
| [[query-results/实操指南：熔炉红线判定与信号化退出准则|实操指南：熔炉红线判定与信号化退出准则]] | 定义了物理红线（遗忘）与熵增红线（噪音）的具体判定指标，以及信号化重启的操作流程。 |
| [[query-results/协议实践轻量化指南|协议实践轻量化指南]] | 面向新用户的完整实践指南：Pre-Flight → Ignition → 对话监控 → Signal 提取 → 跨对话重启，含自包含 Prompt 模板，无需预加载任何协议文件。 |
| [[query-results/协议实践轻量化指南-个人版|协议实践轻量化指南（个人版）]] | 针对 owner 的个人化版本：治理工作流接口、探索模式 Ignition、视频字幕测试用例、约束涌现路径、Signal 归宿规则。 |

## Workflows

| File | Purpose |
|---|---|
| `workflows/ingest-source.md` | Process one raw source into wiki updates. |
| `workflows/query-wiki.md` | Answer a question using wiki pages and optionally file the result. |
| `workflows/lint-wiki.md` | Inspect wiki health and recommend repairs. |

## Templates

| File | Purpose |
|---|---|
| `templates/source-summary.md` | Standard shape for source summary pages. |
| `templates/concept-page.md` | Standard shape for concept pages. |
| `templates/query-result.md` | Standard shape for durable query outputs. |
| `templates/lint-report.md` | Standard shape for lint reports. |

## Source Inventory

| Source | Status | Notes |
|---|---|---|
| `raw/LLM Wiki - from karpathy.md` | ingested | Foundational pattern source. |
| `raw/Sampling Strategy.md` | ingested | SEC mechanism for deciding how to collect, repeat, or stop samples. |
| `raw/Conversation Trace Protocol.md` | ingested | Protocol defining the migration to state-bound conversation tracking. |
| `raw/Exposure Budget.md` | ingested | Proactive governance mechanism defining allowed levels of uncertainty and risk boundaries. |
| `raw/Feedback Stability Check.md` | ingested | Evaluative mechanism for judging whether feedback is stable enough to trust. |
| `raw/Emergent Design AI auto-reading Obsidian design-state idea.md` | ingested | Raw copy of the migration packet used to merge AI-readable Obsidian design-state constraints with LLM-Wiki. |
| `raw/ChatGPT chat archive-king cobra feature review.md` | ingested | Theory work on layered training, reproducibility, and stochastic control derived from a king cobra ecology thread. |
| `raw/Layered Training Analogy.md` | ingested | Branch note developing the layered training mechanism for high-coupling condition systems. |
| `raw/Permission Layer.md` | ingested | Branch return defining the governance layer between evidence intake and system mutation. |
| `raw/relation SEC HCVS.md` | ingested | Synthesis of the complementary relationship between SEC (immune system) and HCVS (precision strike system). |
| `raw/Update Gate.md` | ingested | Mechanism defining allowed update layers, permission authority, and integration timing. |
| `raw/Branch Return Policy Design.md` | ingested | Architectural logic for branch returns and recursion governance. |
| `raw/Workflow-v2.1-branch-return-policy.md` | ingested | Implementation workflow for branch lifecycle management. |
| `raw/Integration Window.md` | ingested | Timing / containment / cooling layer that complements Update Gate and Permission Layer. |
| `raw/Noise Filter.md` | ingested | Mechanism for classifying feedback and determining its evidentiary trust level. |
| `raw/Path Fork Monitor.md` | ingested | Diagnostic mechanism for detecting pressure to change branch path or scope (F0-F7). |
| `raw/Archive Aggregation Layer.md` | ingested | Cross-extract aggregation layer defining AG/V states, recurrence and contradiction profiles, and evidence-routing boundaries. |
| `raw/Randomness Source Map.md` | ingested | Diagnostic layer identifying 11 categories of uncertainty (R1-R11) and guiding SEC responses. |
| `raw/Randomness-to-Learning Conversion.md` | ingested | Final SEC module governing the conversion of stochastic feedback into structured learning (C0-C7). |
| `raw/Viable-Gradient-Path.md` | ingested | Path-feasibility layer concept adding a missing viability check to HCVS vector alignment. |
| `raw/Stochastic Exposure Archive Extract.md` | ingested | Definition of the local stochastic evidence capture artifact and its extraction protocol. |
| `raw/High-Coupling Vector Set.md` | ingested | Branch note elevating high-coupling vector sets into a stable methodological core. |
| `raw/High-Coupling-Vector-Set-Protocol.md` | ingested | Protocol branch defining coupling-cost rules, determinacy regimes, context-economy controls, and branch-routing relations. |
| `dev/llm-wiki-emergent-design-root-branch/llm-wiki-emergent-design-root-branch.md` | filed as query result | Root-branch artifact recording the accepted LLM-Wiki-aligned candidate pattern; not copied into `raw/`. |

## Source Summaries

| Page | Summary |
|---|---|
| [[source-summaries/Project Atlas - Versioned State]] | File-first canonical state; worker instances have no persistent internal memory. |
| [[source-summaries/Project Atlas - Database Supersession]] | Database design superseded 2026-07-01; database may remain only as a rebuildable index. |
