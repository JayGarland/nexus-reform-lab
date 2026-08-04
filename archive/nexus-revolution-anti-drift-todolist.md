# Nexus 改革防漂移 TODO List

## 一、最终目标

建立一个由持久 Artifact 世界承载连续性的多 Agent 系统：

* AI instance 是临时执行器，不承担持续记忆；
* World、Scope、Room、Artifact、Work Item 和 Git 历史承担持久连续性；
* Agent 通过环境中可观察的痕迹发现和推进工作；
* Protocol 作为 Software 3.0 被版本化、审查、测试、替换和回滚；
* 成熟轮子优先，Nexus 主要自研 Adapter、Glue、Bridge 和 Policy Boundary；
* 人类最终只处理裁决、权限升级、不可逆操作和高风险事项。

---

## 二、稳定原则，不得漂移

* Artifact-first persistence；
* Environment-mediated coordination；
* Current state、history、evidence 分离；
* transient AI instance，persistent World；
* executor 不得自我验收；
* 盒内 AI 只负责执行，盒外负责目标、验收和最终裁决；
* Provider 必须可替换、可导出、可比较、可回滚；
* Provider 私有状态不得成为唯一 Canonical Truth；
* 正式 Nexus 在门控通过前保持隔离；
* 不凭空重造已有成熟轮子；
* 不以聊天报告作为完成证据；
* 审核顺序始终为：

```text
Commit
→ Diff
→ Raw Evidence
→ Actual Artifacts
→ State consistency
→ Outside Verdict
```

---

## 三、两条腿异步工作方式

### 盒外腿

负责：

* 讨论；
* 架构判断；
* 形成概念、规则和 Protocol；
* 制定任务与验收标准；
* 审查远端 Commit；
* 给出最终 Verdict；
* 授权下一次写回。

### 盒内腿

负责：

* 从 Room / Seed 恢复上下文；
* 执行有边界任务；
* 写 Artifact；
* 保存原始证据；
* 更新被授权的状态；
* 提交和 push Git；
* 等待盒外审核。

### 汇合方式

```text
盒外讨论形成结论
→ 下一条指令同时携带执行任务与获批写回内容
→ 盒内执行、落盘、Git
→ 盒外审核
→ 再形成下一条指令
```

盒内执行期间，盒外可以继续讨论，但不得无声改变正在运行任务的授权范围。

---

## 四、已完成并可保留的成果

* Work Item Minimum Contract；
* Seeded Instance Continuity；
* Persistent World Object Model；
* Concept / Contract / Engine / Runtime / World / Outside Governance 分层；
* Persistent Room and Workspace Binding；
* Two-Leg Asynchronous Operating Model；
* Persistent Scope Topology；
* Protocol Governance Minimum Contract；
* Bounded Runtime Execution and Recovery Minimum Contract。

这些成果目前属于：

```text
Conceptual models
Semantic contracts
Acceptance hypotheses
Probe criteria
```

它们不是已经实现或验证的 Runtime。

---

## 五、立即执行的纠偏步骤

### TODO 1 — 审核并批准当前 Runtime Contract

确认：

* 内容与 Commit 一致；
* lineage 修复；
  -状态文件一致；
  -没有实现 Runtime；
  -没有越权接入 Nexus。

完成后冻结该 Contract，除非现实 Probe 暴露明确矛盾。

### TODO 2 — 建立 Concept and Contract Freeze Gate

冻结新增：

* 横向 Concept Model；
  -新的 Scope 类型细节；
  -新的 Session / Attempt 状态；
  -新的未来组件；
  -没有现实证据支撑的 Contract 扩写。

只有以下情况才允许解冻：

* 真实 Probe 无法进行；
* 两个已确认 Contract 直接冲突；
* 现成轮子的真实行为揭示模型错误；
  -安全边界存在明确漏洞。

### TODO 3 — 做一次 Global Roadmap Reconciliation

明确记录：

* 原阶段是 Prior-Art Discovery & Composition；
  -为什么中间先做了这些 Contract；
  -这些 Contract 是轮子调查矩阵，不是 V2 实现规格；
  -真实 Probe 被推迟但没有取消；
  -从此回到“先调查和运行轮子”的方法。

### TODO 4 — 刷新 Roadmap 当前状态

修复路线图中陈旧内容：

* 已批准的 Concept / Contract 状态；
  -当前 Phase；
  -唯一 Next Action；
  -被推迟但仍有效的 Probe；
  -冻结条件；
  -进入下一阶段的明确 Gate。

---

## 六、恢复 Prior-Art Discovery & Composition

### TODO 5 — 把现有 Contract 转成调查矩阵

从 Contract 中提取问题，而不是要求轮子完全复制我们的设计。

调查维度至少包括：

* 持久身份与状态；
* Ready / Claim / Lease；
  -依赖关系；
  -崩溃与恢复；
  -执行 Attempt；
  -Review 与外部 Verdict；
  -Protocol version / scope / approval；
  -导出与迁移；
  -是否侵入 World；
  -是否制造中央 Boss；
  -删除与回滚成本；
  -需要多少 Adapter / Glue。

### TODO 6 — 更新候选轮子清单

重新核实当前候选，而不是机械沿用旧名字。

能力分类：

1. Coordination / Work Lifecycle；
2. Durable Runtime / Recovery；
3. Protocol Governance / Policy-as-Code；
4. Evaluation / Experiment；
5. Knowledge Projection；
6. Runtime / Re-entry；
7. Human Decision Surface；
8. Workspace / Execution Bridge。

原则：

```text
先找现成小轮子
→ 优先直接组合
→ 其次轻量 Adapter
→ 最后才考虑自研
```

### TODO 7 — 实际运行最小 Probe

优先恢复原计划中的候选：

* Beads；
* go-workflows；
* Restate；

如调查发现已有更适合的候选，可替换或补充，但必须说明理由。

每个 Probe 必须保存：

* 上游版本；
  -安装和运行命令；
  -输入 fixture；
* stdout / stderr；
  -退出码；
  -运行时间；
  -前后状态；
  -原始输出；
  -崩溃恢复证据；
  -文件或数据库变化；
  -卸载和回滚步骤。

没有原始证据：

```text
CLAIMED_NOT_EVIDENCED
```

---

## 七、Probe 方法

所有候选尽量使用同一个最小 fixture：

```text
创建有依赖的 Work Items
→ 找出 Ready Work
→ Claim
→ 开始 Attempt
→ 模拟中断
→ 新实例恢复
→ 提交 Output
→ 独立 Review
→ 保留完整 lineage
```

每个候选只允许得到：

```text
ADOPT
ADAPT
COMPOSE
REJECT
INCONCLUSIVE
```

不得因为功能很多或 demo 成功就直接 ADOPT。

---

## 八、Probe 后再修正 Contract

### TODO 8 — Reality Check

对比：

```text
我们的 Contract 假设
vs
成熟轮子的真实行为
```

分类：

* Contract 必须保留的稳定语义；
  -可以放宽的实现假设；
  -过度设计；
  -现成轮子已解决的问题；
  -仍然需要 Nexus Adapter 的缺口；
  -应删除或降级的概念。

不要为了保护旧文档而拒绝现实证据。

### TODO 9 — 选择最小组合

只选择满足当前最小目标的组合。

不得：

-一次采用完整平台；
-为了未来可能性引入复杂基础设施；
-把 Provider 私有模型变成 World 本体；
-让 Runtime、Evaluator 或 Coordination Provider 成为新的中央 Boss。

---

## 九、Evaluation 的正确时机

Evaluation Contract 不应继续写成大型纸面体系。

在至少完成一轮真实 Probe 后，再建立最小评价闭环：

```text
一个固定 fixture
→ 一个可信 baseline
→ 一个有界 candidate
→ 同样条件运行
→ 保存 Raw Evidence
→ 独立 evaluator
→ 盒外 Keep / Discard / Revert
```

不得：

* executor 自评；
  -运行后修改指标；
  -只保留最好结果；
  -把 exit code 0 当成 KEEP；
  -把 KEEP 自动升级为生产采用。

---

## 十、后续正式路线

```text
A. 批准并冻结 Runtime Contract
B. Global Roadmap Reconciliation
C. Contract → Probe Matrix
D. Prior-Art Search Refresh
E. Real Wheel Probes
F. Reality Check and Contract Revision
G. Minimal Wheel Composition
H. Minimal Evaluation Baseline / Verdict Loop
I. Knowledge E4 Comparison
J. Seed-Triggered Bounded World Composition
K. Nexus Shadow Integration
L. Discovery Fit Gate
M. 才能讨论正式 Nexus 改造
```

---

## 十一、Knowledge E4 边界

Knowledge E4 是比较已经达到 E3 的候选，不是重新无限搜索。

比较内容：

* 当前知识投影质量；
* provenance；
* supersession；
* contradiction；
* current/history 分离；
  -导出；
  -迁移；
  -删除成本；
  -与 Room / Scope / Seed 的组合成本。

不得先绑定某个 Wiki Provider。

---

## 十二、最小 World Composition

只有轮子 Probe 和 Evaluation 基线成立后，才组合：

```text
Persistent Room
+ Room WAKE / Seed
+ Work Item
+ Active Protocol Set
+ Workspace Binding
+ selected Providers
+ bounded fresh instance
+ write-back
+ independent Review
```

目标是证明：

* 新实例能恢复；
  -能执行一个有界任务；
  -能留下持久痕迹；
  -下一个实例能继续；
  -中断可以恢复；
  -执行者不能自我验收。

不得开启无限自动工作。

---

## 十三、Nexus Shadow Integration

正式 Nexus 接入前必须：

-只读或 shadow；
-不修改正式 Archive；
-不替换现有生产路径；
-保留回滚；
-使用真实但清洗后的 Nexus fixture；
-记录人工干预；
-由盒外批准；
-达到明确 Gate。

旧 Nexus 元素只可先映射为：

```text
Letter → Artifact / transport candidate
Thread → projection candidate
Inbox / Outbox → adapter candidate
Archive → historical evidence source
cc-connect → execution bridge candidate
```

不得自动成为新 World 的核心。

---

## 十四、立即停止信号

出现以下情况时，必须停下来检查是否漂移：

* 又准备新增一个大 Concept Model；
  -又出现三十节以上的“Minimum Contract”；
  -连续两轮没有运行任何现成轮子；
  -讨论具体 Runtime 实现，却还没完成 Probe；
  -开始自研 queue、scheduler、event store 或 evaluator；
  -拿 Contract 去要求所有轮子完全符合；
  -开始设计正式 Nexus V2；
  -把文档完整度误认为系统能力；
  -把 verifier exit 0 当成现实验证；
  -盒内 AI 自己宣布阶段完成；
  -新的讨论不断插入当前执行任务，导致 scope 膨胀。

---

## 十五、每轮开始前检查

每次准备新指令时回答：

1. 这一步属于正式路线的哪一项？
2. 它推进现实证据，还是只增加文档？
3. 有没有现成轮子应该先调查或运行？
4. 是否正在把语义假设写成实现结论？
5. 是否可以用更小、更可逆的动作完成？
6. 是否需要盒外裁决？
7. 是否触碰正式 Nexus？
8. 完成证据将保存在哪里？
9. 失败如何回滚？
10. 完成后下一阶段是否更接近真实组合验证？

无法明确回答时，不发执行指令。

---

## 十六、当前唯一正确方向

当前不再继续扩写 Evaluation Contract。

当前方向是：

```text
审核并批准 Runtime Contract
→ 冻结 Concept / Contract 扩张
→ 对齐全局路线
→ 把 Contract 转成 Probe Matrix
→ 恢复真实 Prior-Art Probe
```

核心提醒：

> 不要把 Nexus 改革变成一场无限的 Markdown 架构设计。
> Contract 是调查和验收工具，不是已经运行的系统。
> 下一阶段必须重新接触现实轮子、真实运行和原始证据。
