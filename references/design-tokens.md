# Design Token：Ops Pilot · Graphite & Iris

## 数据流

```text
ops-pilot.tokens.json（唯一可编辑值源）
  ├─ scripts/tokens.mjs → design-tokens.ts → createOpsTheme → AntD
  └─ scripts/tokens.mjs → ops-pilot.tokens.css → 业务组件/Token specimen
```

这是仓库自定义格式，不声称是 DTCG 兼容 JSON。业务状态映射在应用层：Token 定义呈现，不裁决请求是否完成。

## 核心颜色

| 语义 | Light | Dark | 用法 |
|---|---|---|---|
| canvas | #F5F7FB | #101828 | 页面画布 |
| surface | #FFFFFF | #182230 | 主要工作表面 |
| subtle | #F8FAFC | #202D40 | 弱分组、表头 |
| text | #182230 | #F2F4F7 | 正文与标题 |
| textSecondary | #475467 | #D0D5DD | 次级内容 |
| textMuted | #667085 | #A8B3C7 | 元信息，不是禁用态 |
| border | #E4E7EC | #344054 | 装饰分隔 |
| controlBorder | #858FA3 | #8291AA | 必要控件边界 |
| primary | #4F46E5 | #A5B4FC | 主要操作 |
| primaryHover | #4338CA | #C7D2FE | 主操作 hover |
| primaryActive | #3730A3 | #818CF8 | 主操作 active |
| onPrimary | #FFFFFF | #101828 | 主按钮文字，不永远是白色 |
| selected | #EEF2FF | #30345B | 选中背景 |
| selectedText | #3730A3 | #E0E7FF | 选中文字 |
| success | #067647 | #75E0A7 | 真实成功 |
| warning | #92400E | #FEC84B | 真实阻断/警示 |
| error | #B42318 | #FDA29B | 失败 |
| info | #175CD3 | #84CAFF | 信息，不替代品牌色 |
| shell | #172033 | #0C1322 | 深色导航 |

全部颜色与配对浅底在 JSON 中；生成 CSS 名称规则为 `--ops-` + kebab-case，例如 `textSecondary` → `--ops-text-secondary`。不要在页面复制色值。

## 非颜色 Token

```text
space        4 / 8 / 12 / 16 / 24 / 32 / 40 px
radius       small 4 / control 6 / surface 10 / overlay 12 px
type         caption 13 / body 14 / section 16 / result 20 / page 24 / metric 28 px
lineHeight   20 / 22 / 24 / 28 / 32 / 36 px
layout       nav 216 / header 56 / readingMax 1200 / formMax 920 / rail 320 /
             editorNav 240 / pageInset 32 / mobileInset 16 / touchTarget 44 px
motion       fast 120 / normal 180 / slow 240 ms
shadow       surface none / overlay 0 12px 32px rgb(16 24 40 / 16%)
```

`comfortable` 控件 36/32/44px，单元格 padding 12/16px；`compact` 控件 32/28/40px，padding 8/12px。不要把整张表固定行高，也不要全局 compactAlgorithm 再叠一层手工缩小。

## CSS 使用

```css
.resource-summary {
  color: var(--ops-text);
  background: var(--ops-surface);
  padding: var(--ops-space-xl);
  border-radius: var(--ops-radius-surface);
}
```

这只是样式使用方式，不要求为每组内容添加 surface。深色/密度由应用根入口统一同步：

```html
<html data-ops-theme="dark" data-ops-density="compact">
```

## 状态映射原则

```text
pending/cancelled/unknown → 中性文字 + 真实状态标签
running                  → primary，仅当前活动表达
succeeded                → success 行内；只表示这个具体范围成功
blocked                  → warning + 原因与下一步
failed                   → error + 影响对象与恢复路径
history                  → 不是业务状态；使用独立只读模式
NPT/Staging/Live/DR       → 环境标签中性，不挪用红绿状态色
```

## 更新与验证

```bash
node scripts/tokens.mjs          # 从 JSON 重新生成 TS/CSS
node scripts/tokens.mjs --check  # 不写文件；漂移时失败
npm test                        # Node 内置测试，不需要安装依赖
npm run typecheck               # 需要安装 package.json 的开发依赖
```

颜色对比检查只覆盖声明的组合，不覆盖所有 AntD 自动派生色和第三方图表。修改品牌色时同时调整 normal/hover/active/selected/onPrimary，两种主题都要验证。
