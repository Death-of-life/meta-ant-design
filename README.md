# Meta Ant Design · Task-first

保留 AntD，重构让用户难以理解的页面。不是“换主色 + 大 Hero + 指标卡片”的生成器。

## v2 解决什么

旧版有层级原则，但默认资产偏向状态 Hero、指标带和异常队列，容易把审批、交付、填写页也做成同一个仪表盘。v2 以任务模板为入口，区分当前操作、历史回看、最终结果和多环境编辑；Token 仅负责一致的视觉，不替代业务重构。

默认设计方向 **Ops Pilot · Graphite & Iris**：深石墨导航、冷灰画布、白色工作表面、靛蓝主操作、小范围状态色。支持真正 light/dark 两套颜色及 comfortable/compact 密度。

## 使用 skill

将整个仓库作为 `meta-ant-design` skill 目录安装到你的工具使用的 skills 路径，保留 SKILL.md 与 references/assets 的相对关系。安装位置由具体工具决定；本库不假设某个全局目录适用于所有客户端。

```text
使用 $meta-ant-design 重构这个审批/交付页面。
先检查实际组件、权限、状态和材料快照，列出 KEEP/MERGE/MOVE/REMOVE/REPLACE。
保留 antd 和业务行为，不保留不合理的页面结构。
不要自动添加 Hero、指标卡、开发诊断标签或伪造的健康状态。
按当前、历史只读、完成、失败和窄屏验证；说明未运行的检查。
```

## 目录入口

- [SKILL.md](SKILL.md)：短入口、任务路由与交付边界。
- [页面模板](references/page-archetypes.md)、[Ops Pilot 配方](references/ops-pilot-redesign.md)：审批、交付、结果、编辑器等。
- [Design Token](references/design-tokens.md)：全部语义与使用方法。
- [AntD 集成](references/ant-implementation.md)、[v1 迁移](references/migration-v2.md)、[验收门禁](references/review-rubric.md)。

## Token 文件

```text
assets/ops-pilot.tokens.json   唯一可编辑值源
assets/design-tokens.ts       自动生成，供 TS 使用
assets/ops-pilot.tokens.css    自动生成，供 CSS 使用
assets/meta-ant-theme.ts      AntD 主题映射与组件 Token
assets/meta-ant.css           业务布局/状态/只读属性与旧组件兼容样式
```

```bash
node scripts/tokens.mjs
node scripts/tokens.mjs --check
npm test
```

上述检查仅需要 Node 20+，无需 npm install。修改 JSON 后必须重新生成；不能单改 CSS 或 TS 输出。

## 接入现有 React 项目

复制所需资产到项目，保持相对路径。完整根 Provider 示例在 [OpsThemeProvider.tsx](examples/OpsThemeProvider.tsx)，不要在已有根布局里面再套一套应用 Shell。

```tsx
import { createOpsTheme } from './assets/meta-ant-theme';

const theme = createOpsTheme({
  mode: 'light',              // 'light' | 'dark'
  density: 'comfortable',     // 'comfortable' | 'compact'
  reducedMotion: false,       // 使用应用已有的系统/用户偏好
});
```

把返回值合并进现有 ConfigProvider；同时让文档根节点 `data-ops-theme` 与 `data-ops-density` 对应。保留已有 locale、CSP、prefixCls、路由、权限、请求、Form 与 ProLayout。`App.useApp` 等上下文实例用于主题感知的反馈弹层。

`TaskSummary` 区分 current/history/completed，历史与完成变体的类型禁止 primaryAction。它不实现后端授权或工作流推导。`ReadOnlyFacts` 用于只读材料；真正可编辑内容继续使用原有 Form。

## 查看 Token specimen

直接用浏览器打开 [specimen.html](examples/specimen.html)，或从仓库根目录启动本地静态服务。它展示颜色、文字、密度与脱敏的任务/结果结构，支持 light/dark 和密度切换。所有数据明确为示例，无外部资源和生产 API。

**这是原生 HTML/CSS Token 样张，不是 AntD 渲染测试，也不是已完成的 Ops Pilot 页面改版。**

## 类型与 CI

```bash
npm install --ignore-scripts --no-audit --no-fund
npm run typecheck
```

package.json 固定 React 18.3.1、AntD 5.27.0、TypeScript 5.8.3 作为独立示例基线，不要求宿主升级。CI 另外在 AntD 6.0.0 上检查类型。工作流无写权限，不部署页面；无 lockfile 时传递依赖不保证逐字节可复现，不应把这个测试配置当生产依赖锁定方案。

`npm test` 验证声明的颜色对比、生成漂移、文档路径与基础源代码约束。它不证明应用整体 WCAG 合规、视觉效果或状态逻辑正确；实际页面仍需浏览器、业务回归与权限验证。

## 许可与边界

保留原 [LICENSE](LICENSE) 和 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。这是独立社区 skill，不代表 Meta/Ant 官方产品。仓库只保留脱敏示例，不上传内部截图、账户、域名或真实工单。
