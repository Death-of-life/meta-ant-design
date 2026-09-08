# 响应式与可访问性

## 内容压力优先

1440×900、1366×768/600、1024×768 是桌面验证基线；支持移动端时加入 390×844、320px 窄屏与实际客户端。宽度不够先移动辅助栏，不把三个工作区一起挤瘦。复杂编辑器在窄屏变成资源列表→详情，切换后保留草稿和返回位置。

网格子项 `min-width: 0`，技术名称可以合理换行且完整内容可取；数字单位不拆散。真正需要二维比较的表格允许局部横向滚动，不用 body overflow:hidden 掩盖问题。

长页面使用单一明确的主滚动容器。提交栏可以 sticky，但必须预留内容和焦点空间，在短视口、软键盘及 200% 缩放时不能挡住最后一个字段。浮层正文滚动，关闭/确认可达。

## 颜色与交互

普通文字目标至少 4.5:1；大字可适用 3:1，但不能把普通辅助信息缩小后声称豁免。用于辨识控件的必要边界和状态图形目标至少 3:1；纯装饰分割线无需强行加深。禁用文字不是只读正文的配色。

本库把装饰边框与控件边框分开，并验证 light/dark 中声明的文字/背景、状态/浅底、按钮 normal/hover/active、选中、焦点和导航颜色组合。测试不等于整站 WCAG 认证：AntD 派生色、浮层、图表和宿主覆盖样式仍须实测。

可交互元素必须键盘可达；不用可点击 div 代替 button/link；图标按钮必须有可访问名称。保留明确 focus-visible；深色导航使用其单独的浅色焦点环。

44px 为本设计建议的粗指针目标，不应误称 WCAG AA 的统一最小尺寸。状态始终带可读文字，不能只用红绿点。避免每次进度/日志刷新都触发整个页面 aria-live 播报。

## 状态验证

覆盖实际存在的 loading、empty、error、partial、permission、current、history、completed、editing。新鲜度只在数据具有有效时间语义时设计；不为静态/手工维护的台账强加“stale”。未知或未检查不能显示“正常”。

官方依据：
- https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
- https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html
- https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html
- https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
