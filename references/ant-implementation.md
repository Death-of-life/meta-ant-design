# Ant Design implementation

## Contents

1. Version and dependency contract
2. Component mapping
3. Theme integration
4. Page shell
5. Data surfaces
6. Forms
7. Detail surfaces
8. Modal and Drawer
9. Charts and metrics
10. Status and feedback
11. Implementation checklist

## 1. Version and dependency contract

Inspect the project first:

```bash
node -p "require('./package.json').dependencies"
pnpm why antd @ant-design/pro-components @ant-design/charts
```

The upstream Ant Design Skill snapshot used to design this Skill declared:

```text
react / react-dom              ^19.0.0
typescript                     ^5.0.0
antd                           ^6.0.0
@ant-design/icons              ^6.0.0
@ant-design/pro-components     ^2.7.0
@ant-design/charts             ^2.0.0, optional
```

Do not force those versions into an existing project. Use its installed APIs and typings. Conditional template dependencies include:

```text
dayjs                          date logic
rc-resize-observer             measured responsive layouts
@dnd-kit/core                  drag-and-drop tables
@dnd-kit/sortable
@dnd-kit/modifiers
@dnd-kit/utilities
```

Add a dependency only when the selected pattern requires it and the user authorized implementation.

## 2. Component mapping

| Need | Preferred | Fallback/notes |
|---|---|---|
| App shell | `ProLayout` | existing app shell wins |
| Page frame | `PageContainer` | semantic page wrapper |
| Section/widget | `ProCard` or `Card` | use only when a surface is justified |
| Compact layout | `Flex`, `Space`, `Row`, `Col` | CSS Grid for structural composition |
| Core metric | `Statistic` / `StatisticCard` | custom wrapper only for hierarchy |
| Dense records | `ProTable` / `Table` | rows, not cards |
| Narrative records | `ProList` / `List` | rows with clear actions |
| Read-only facts | `Descriptions` | `ProDescriptions` for editable/dynamic data |
| Forms | `ProForm` / `Form` | existing form framework wins |
| Complex filters | `QueryFilter` | use toolbar for <=4 fields that fit one row |
| Status | `Badge`, `Tag`, `Alert`, `Result` | choose by semantic strength |
| Inspector | `Drawer` | fixed panel on wide screens when justified |
| Trend/chart | `@ant-design/charts` | table/list if exact values matter more |

Prefer Ant layout primitives, but ordinary semantic wrappers are acceptable when Ant has no suitable primitive. Do not copy Astryx's literal “no div” rule.

## 3. Theme integration

Start from the current `ConfigProvider`. For a new neutral enterprise theme, copy and adapt `assets/meta-ant-theme.ts`.

```tsx
import { ConfigProvider } from 'antd';
import { ProConfigProvider } from '@ant-design/pro-components';
import { metaAntTheme } from './theme/meta-ant-theme';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider theme={metaAntTheme}>
      <ProConfigProvider
        token={{
          pageContainer: {
            paddingInlinePageContainerContent: 0,
            paddingBlockPageContainerContent: 0,
          },
        }}
      >
        {children}
      </ProConfigProvider>
    </ConfigProvider>
  );
}
```

All ConfigProvider seed values must be actual values, not CSS `var()` strings. Page CSS should use semantic CSS variables or `theme.useToken()`.

```tsx
import { theme } from 'antd';

const { token } = theme.useToken();

// Valid uses include token.colorText, token.colorBgContainer,
// token.colorWarningBg, token.marginLG, and token.borderRadiusLG.
```

Do not create a second global token system if the product already has one. Map the bundled pattern variables to the product tokens at one scope boundary.

## 4. Page shell

### Existing app

Reuse the current layout and route. Do not render another `ProLayout`, header, sidebar, or breadcrumb provider inside a page.

### New app options

```ts
type NavigationKind =
  | 'side'
  | 'top'
  | 'mixed';
```

Use:

```text
side   default for deep/growing admin navigation
top    shallow stable navigation, usually <=9 primary items
mixed  true multi-product suite: ecosystem concerns on top, product nav left
```

Page frame:

```tsx
import { PageContainer } from '@ant-design/pro-components';
import { Button } from 'antd';

export function UserPage() {
  return (
    <PageContainer
      title="用户"
      subTitle="管理账号、权限与生命周期"
      breadcrumbRender={false}
      extra={[
        <Button key="create" type="primary">
          新建用户
        </Button>,
      ]}
    >
      <main className="meta-ant-scope meta-page">{/* composition */}</main>
    </PageContainer>
  );
}
```

Breadcrumb options:

```text
top-level destination      omit/disable breadcrumb
detail/edit/create/flow    declare the real parent path explicitly
automatic route crumbs     disable when they expose implementation hierarchy
separator                  "/" unless the product standard differs
```

Do not repeat the `PageContainer` title inside the first card.

When using `assets/meta-ant.css`, place `meta-ant-scope` on the page composition
root. Each bundled component also carries the scope itself so it remains safe
when copied independently.

## 5. Data surfaces

### Filter selection

```ts
type FilterPresentation =
  | 'toolbar'
  | 'query-filter'
  | 'light-filter';
```

```text
toolbar       <=4 short filters fitting one line with query/reset
query-filter  >=5 filters, expandable fields, or complex query semantics
light-filter  compact saved-view/list toolbar when supported by existing UX
```

Complex filters:

```tsx
<Card variant="borderless" className="meta-filter-surface">
  <QueryFilter
    defaultCollapsed
    split
    onFinish={handleQuery}
    onReset={handleReset}
  >
    {/* ProForm fields */}
  </QueryFilter>
</Card>
```

### ProTable

```tsx
<ProTable<RowData, QueryParams>
  rowKey="id"
  columns={columns}
  request={loadRows}
  search={false}
  options={{ density: true, fullScreen: true, reload: true, setting: true }}
  pagination={{ pageSize: 20, showSizeChanger: true }}
  rowSelection={enableSelection ? {} : false}
  tableAlertRender={selectionSummary}
  tableAlertOptionRender={selectionActions}
/>
```

Column rules:

- Define a width/minimum strategy for the first, identifier, date/time, owner, status, and action columns.
- Use `ellipsis` plus `Tooltip` when exact long text must remain recoverable.
- Keep names, owners, and actions on one line by default.
- Use `valueEnum.status` for ordinary enumerated states; use custom rendering only for richer semantics.
- Do not tint entire rows for routine state. Promote urgent exceptions through an attention queue or a focused cell.
- Keep numeric alignment consistent within the table; use right alignment only when comparison benefits.

Action column:

```tsx
{
  title: '操作',
  key: 'actions',
  width: 180,
  fixed: hasHorizontalScroll ? 'right' : undefined,
  render: (_, record) => (
    <Space size={8} className="meta-table-actions">
      <Button type="link" onClick={() => onView(record)}>查看</Button>
      <Button type="link" onClick={() => onEdit(record)}>编辑</Button>
      {/* Put remaining actions in Dropdown. */}
    </Space>
  ),
}
```

Width guardrails:

```text
two short actions        >=160px
one 3–4 character action 180–200px
two long actions         >=200px
```

Enable `scroll.x` only when the measured/estimated column sum exceeds the container or content is clipping/wrapping. Once horizontal scrolling is required, a fixed action column is usually helpful. Do not fix columns on a non-scrolling table by habit.

Pagination is exclusive:

```tsx
// Built in
<Table pagination={{ current, pageSize, total }} />

// External
<Table pagination={false} />
<Pagination current={current} pageSize={pageSize} total={total} />
```

Never render both.

### List

Use `List`/`ProList` for records whose primary shape is title + description + metadata + actions. Keep items as rows, not cards. Use `grid` only for genuinely visual/selectable objects.

## 6. Forms

Presentation options:

```ts
type FormPresentation =
  | 'single-column'
  | 'grouped-settings'
  | 'horizontal-steps'
  | 'vertical-steps'
  | 'modal'
  | 'drawer';
```

Selection:

```text
few dependent fields           single-column, vertical labels
multiple semantic sections     grouped-settings
<=4 short ordered steps        horizontal-steps
>=4 or descriptive steps       vertical-steps
small focused edit             modal
context-preserving complex edit drawer
```

ProForm example:

```tsx
<ProForm<FormValues>
  layout="vertical"
  initialValues={initialValues}
  onFinish={handleSubmit}
  submitter={{
    searchConfig: {
      resetText: '取消',
      submitText: '保存',
    },
  }}
>
  <ProFormText
    name="name"
    label="名称"
    width="lg"
    rules={[{ required: true, message: '请输入名称' }]}
  />
  <ProFormSelect
    name="status"
    label="状态"
    width="md"
    options={statusOptions}
  />
</ProForm>
```

Use `options` instead of legacy `Select.Option` in new code. Keep coupled validation close to the fields and add a form-level summary only when the user needs it to locate several errors.

## 7. Detail surfaces

Selection:

```text
single read-only group       Descriptions
editable/dynamic group       ProDescriptions
>=2 semantic groups          sections; Card only where a boundary is useful
history/relationships        Timeline, List, or Table
```

```tsx
<Descriptions
  column={{ xs: 1, sm: 1, md: 2, xl: 3 }}
  items={items}
/>
```

Use the current `items` API in new code when supported. Keep labels readable on one line; reduce columns before squeezing labels. Do not combine the automatic ProDescriptions edit entry with a second custom edit icon.

## 8. Modal and Drawer

### Modal kinds and widths

```ts
type ModalKind =
  | 'confirmation'
  | 'standard-form'
  | 'complex-form'
  | 'visualization'
  | 'display-only';
```

```text
confirmation   416–480px
standard-form  640px
complex-form   720–800px
visualization  about 960px when justified
display-only   content-driven within viewport cap
```

```tsx
<Modal
  open={open}
  centered
  width={640}
  title="编辑配置"
  onCancel={onCancel}
  footer={footer}
  styles={{
    body: {
      maxHeight: 'min(70dvh, 720px)',
      overflowY: 'auto',
    },
  }}
>
  {content}
</Modal>
```

Use a header/body/footer structure for operations. The body owns scrolling; footer actions remain visible. Verify the exact `styles` slot names against the installed antd version.

### Drawer

```tsx
<Drawer
  open={open}
  width="min(560px, 100vw)"
  title="资源详情"
  onClose={onClose}
  destroyOnHidden
>
  {content}
</Drawer>
```

Use a full-width Drawer on small phones. Keep close and commit actions in a stable header/footer rather than at the end of a long scrolling body. Verify `destroyOnHidden` vs the installed version's lifecycle prop.

## 9. Charts and metrics

Implementation layers:

```text
exact values/actions         Table or List
single number                Statistic
small peer group             MetricBand / Statistic cells
mini trend, no axes          accessible SVG sparkline
full trend/axes/tooltip      @ant-design/charts
```

Do not use an image or gray placeholder as a chart. A mini chart stays about 56–96px high and uses one semantic color family. A full chart must declare units, time zone, legend meaning, loading, empty, and error behavior.

For Canvas-based chart fills, use the chart library's supported color/gradient syntax. Do not pass CSS `linear-gradient()` or `color-mix()` into a Canvas fill property.

## 10. Status and feedback

```text
Badge count       numeric count only
Badge status      compact runtime state
Tag               enum, category, filter token
Alert              scoped condition requiring notice/action
Result             page/flow terminal state
notification       asynchronous cross-page outcome
message            lightweight immediate confirmation
```

Every status needs a text label. For critical states include affected scope, timestamp, and next action.

## 11. Implementation checklist

- [ ] Installed API/types inspected; no invented props.
- [ ] Existing shell and theme reused.
- [ ] One page primary action.
- [ ] Filters use toolbar/QueryFilter based on complexity.
- [ ] Dense data uses rows, not card items.
- [ ] Table widths, overflow, action column, and pagination are deliberate.
- [ ] Form grouping follows user intent.
- [ ] Overlay body scrolls while commit actions remain visible.
- [ ] Loading, empty, error, partial, stale, and permission states exist.
- [ ] Theme/token values are centralized.
- [ ] Responsive and accessibility reference has been applied.
