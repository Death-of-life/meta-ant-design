# AntD 集成：不换底座，改变业务组合

## 版本检查

```bash
node -p "require('antd/package.json').version"
node -p "require('react/package.json').version"
npm ls antd @ant-design/pro-components react --depth=0
```

使用宿主原有包管理器。本文不要求升级。提供的主题面向 v5/v6 的共同能力，需在实际安装版本上 typecheck；不适用于直接复制到 v4 Less 主题。旧版 ProComponents 的版本与 AntD 主版本不是一回事。

## 完整主题工厂接口

```ts
createOpsTheme({
  mode: 'light',              // 'light' | 'dark'; 默认 light
  density: 'comfortable',     // 'comfortable' | 'compact'; 默认 comfortable
  reducedMotion: false,       // boolean；由用户/系统偏好提供
});
```

返回 `ThemeConfig`，没有 DOM 副作用。保留 `metaAntTheme` 和 default export 的旧导入名。数字是数值，不把 `var(--ops-primary)` 作为 seed 交给颜色算法。组件 Token 只传给 `theme.components`，业务布局 Token 不伪装成 AntD 属性。

集成代码见 `examples/OpsThemeProvider.tsx`。它使用 `ConfigProvider` 和 `App` 提供上下文，并同步文档根节点的 theme/density，使默认 portal 弹层与页面一致。只在应用根部使用一次；SSR 应在 HTML 上预置相同 data 属性，避免主题闪烁。不要从页面内改整个文档主题。

已有 ConfigProvider 时合并到现有入口，保留其 locale、prefixCls、nonce/CSP、popup、form 等配置。嵌套主题要同时设计 CSS 变量作用域和 portal 容器；不能只改 wrapper 的 data 属性而忽略挂在 body 上的浮层。禁止为本次改版无理由启用 zeroRuntime、修改 hashed、强制 prefix 或迁移 CSS 框架。

静态 `message.xxx/Modal.xxx/notification.xxx` 不保证使用当前 provider 的主题；优先使用宿主已建立的 App.useApp 或 hook 实例。该行为参见 AntD 官方主题文档。

## 模板映射

| 需求 | 选型 |
|---|---|
| 真实数据列表 | 现有 Table/ProTable，保留筛选和分页状态 |
| 单对象只读属性 | Descriptions 或语义 dl / ReadOnlyFacts |
| 多字段编辑 | 原 Form/ProForm，保留校验和草稿生命周期 |
| 当前任务 | TaskSummary + 原授权处理函数 |
| 历史阶段 | TaskSummary history + 冻结证据，不挂 mutation |
| 交付记录 | 表格/列表，行展开验证与证据 |
| 多环境资源编辑 | 环境选择 + 分组资源导航 + Form |
| 完整流程 | 原 Timeline/Steps 或流程图，独立详情入口 |

## 工程边界

不嵌套第二个 ProLayout；不为了留白重写 API 请求；不清除环境切换草稿；不使用 CSS 隐藏未授权按钮替代服务端授权。UI 可以依据已有 capability 隐藏或禁用入口，但提交仍必须走原后端检查。

CSS 只作用于 `ops-*` 与兼容的 `meta-*` 业务类。不要无差别覆盖 `.ant-card`、`.ant-alert`、`.ant-btn`。图表保留当前库，不为配色迁移。

## 来源（访问日期 2026-09-08）

- https://ant.design/docs/react/customize-theme/
- https://5x.ant.design/docs/react/customize-theme/
- https://ant.design/components/button/
- https://ant.design/components/table/
- https://ant.design/components/input/

官方文档说明 API，不证明宿主依赖或实际渲染已通过验证。
