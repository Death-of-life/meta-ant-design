# 业务模式与组件边界

## TaskSummary：紧凑任务结论

仅在确有任务结论时使用，不是每页必填。保持白/中性底色，状态颜色只用于行内标记。

```ts
type TaskState = 'pending' | 'running' | 'succeeded' | 'blocked' | 'failed' | 'cancelled';
type ViewMode = 'current' | 'history' | 'completed';
```

`assets/TaskSummary.tsx` 的所有公开选项：

```text
共有：title, state, stateLabel, detail?, metadata?
current：primaryAction? { label, onClick, loading?, disabled?, disabledReason? }
history：snapshotLabel, returnToCurrent；禁止 primaryAction
completed：禁止 primaryAction；下一步导航放在结果区域
```

状态由应用传入，不负责推断审批和验收。只读模式不能接收操作不等于安全授权：服务端权限、对象版本与一次性凭证校验仍由原系统负责。失败的历史记录显示当时失败，不自动生成“重试”。

## ReadOnlyFacts：阅读不是不可编辑的表单

```text
label：整个属性组的可访问名称
items[]：key, label, value, fullWidth?, code?
```

长名称单独占行并可选中复制；数字和单位可以用 `ops-number` 连在一起。`null/undefined` 显示未提供，0 不被当成空值；布尔值由业务层先格式化为“是/否”。对审核差异使用原值→新值并明确新增/删除，不仅改变字色。

## 历史模式

顶部紧凑显示历史阶段、材料依据和返回当前阶段入口。中性背景；不得显示“当前执行/SRE 操作区”冒充当前状态。展示原审批人、当时证据、当时结论；旧记录不可恢复时明确缺失，不能取当前值补齐。

## 流程概览

主界面使用业务阶段和当前责任人。完整编排、节点编号、跳过分支位于完整流程/诊断入口。当前业务节点与当前查看节点分别存储和渲染。点击历史节点只切查看模式，不修改工作流。

## 进度、指标与异常

已知总量且进度变化对行动有用时才用进度条。不能用“经过节点数/全部节点数”估算含条件分支的完成率。单条完成记录直接显示数量与结论。

`MetricBand` 和 `AttentionList` 仍可用于真实指标/异常，不能作为所有页面的默认装饰。数据未接入时不生成“无风险/全部正常”。排序应由有依据的业务优先级决定，并避免用户复制或选择时突然重排。

## v1 兼容

`FocusHero` 仅是过渡适配器，保留原 props；取消默认大底色、阴影和巨型标题。新页面不从它开始。变更视觉不代表将已有 FocusHero 中的重要信息删除，按语义迁移到任务、结果、证据区域。
