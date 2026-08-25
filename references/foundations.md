# Foundations

## Contents

1. Design stance
2. Semantic tokens
3. Typography
4. Spacing and alignment
5. Surfaces and elevation
6. Density
7. Motion

## 1. Design stance

Use a quiet neutral canvas and spend emphasis intentionally. Enterprise UI should feel decisive, not decorative.

```text
Stable base     neutral canvas, white surfaces, readable type
Meaning         status color only where state matters
Action          primary color for the main action, selection, and links
Hierarchy       type, spacing, and placement before color or shadow
Restraint       one memorable emphasis, not many competing accents
```

Use Ant Design tokens as the source of truth. If the project already defines a theme, extend it rather than replacing it.

## 2. Semantic tokens

Use purpose names in page CSS. Map them to Ant tokens in theme-aware code.

```text
Surface
  canvas          colorBgLayout
  primary         colorBgContainer
  elevated        colorBgElevated
  subtle          colorFillQuaternary / colorFillTertiary

Text
  primary         colorText
  secondary       colorTextSecondary
  metadata        colorTextTertiary, sparingly
  disabled        colorTextDisabled, disabled controls only

Boundary
  subtle          colorBorderSecondary
  control         colorBorder

Meaning
  info            colorInfo / colorInfoBg / colorInfoBorder
  success         colorSuccess / colorSuccessBg / colorSuccessBorder
  warning         colorWarning / colorWarningBg / colorWarningBorder
  danger          colorError / colorErrorBg / colorErrorBorder
```

Do not use success/warning/error as decorative themes for ordinary KPI cards. A status surface should contain an actual state, consequence, or action.

Primary blue is not a general-purpose highlight. Reserve it for:

- the one filled primary action in a region;
- selection or current navigation state;
- links and actionable text;
- one neutral informational focus when no semantic status applies.

Avoid full-saturation status backgrounds. Prefer a neutral surface with a narrow semantic accent, subtle tint, icon, label, and readable consequence.

## 3. Typography

Use this cross-level scale as a default, then inherit the project's established scale when it already works:

| Role | Size / line height | Weight | Use |
|---|---:|---:|---|
| Focus metric | 32–40 / 40–48 | 600 | One L0 metric or state |
| Page title | 24–28 / 32–36 | 600 | Page identity |
| Section lead | 18–20 / 26–28 | 600 | L1 section heading |
| Metric | 24–32 / 32–40 | 600 | L2 supporting KPI |
| Body | 14 / 22 | 400 | Main content |
| Label | 14 / 22 | 500 | Field/table/metric label |
| Metadata | 12–13 / 20 | 400 | Timestamps and provenance |

Within one region, avoid creating many sizes. Rank content in this order:

```text
position -> weight -> primary/secondary text color -> size
```

Rules:

- Give each region one lead.
- Keep body copy at body size; do not shrink important explanations into metadata.
- Use secondary text for support, not disabled text.
- Use tabular numerals for comparable metrics when the font/theme supports them.
- Give units, denominators, and timestamps less weight than the main value.
- Truncate only when the full value is recoverable through `Tooltip`, expansion, or detail view.

## 4. Spacing and alignment

Use a 4px base with clearly different binding and separating gaps:

```text
4px   icon internals, tightly bound metadata
8px   icon-to-label, title-to-status, compact actions
12px  label-to-value, compact row groups
16px  ordinary component groups, card internal vertical rhythm
24px  page inset, section separation, card horizontal inset
32px  major section break on spacious pages
48px  rare narrative break; not a default dashboard gap
```

The container owns padding. Children should not add competing outer margins.

Hold one vertical content line per region:

- page title, focus hero, sections, and table/card edges share the page inset;
- a card header, body, and footer share one internal line;
- tables may let cell padding own the content line rather than double-padding the wrapper;
- hover/selected backgrounds may bleed past the text line to the row edge.

Grouping must remain readable after borders are removed. If every gap is 16px, proximity does no work; use tight gaps inside an item and generous gaps between groups.

## 5. Surfaces and elevation

Escalate container strength only as needed:

```text
alignment/gap -> Divider -> section -> subtle surface -> Card -> overlay
```

Use `Card` or `ProCard` for:

- a self-contained metric or chart widget;
- a critical summary with an explicit consequence;
- a settings group with its own save boundary;
- a hard interaction boundary;
- a selectable gallery/grid item.

Do not use cards for:

- every record in a dense list;
- every normal page section;
- nested subdivisions inside a card;
- a full-width stack where spacing and section headings are sufficient.

Use one light elevation for page widgets. Reserve stronger elevation for floating overlays. Avoid hover lift on non-clickable cards.

## 6. Density

Choose density per region, not per product slogan:

```text
compact   logs, monitoring streams, large operational tables
balanced  most tables, lists, dashboards, and detail pages
spacious  short high-stakes forms, approvals, destructive confirmations
```

All controls in one row must share height. On coarse pointers, keep interactive targets at least 44×44 CSS px even when the visible control is compact; add hit area without inflating data rows unnecessarily.

## 7. Motion

Use motion to explain state change, not to decorate:

- 120–200ms for hover, selection, and simple reveal;
- 180–240ms for drawers and region transitions;
- no looping decorative animation in operational pages;
- do not animate frequently updating metrics by default;
- respect `prefers-reduced-motion` and keep all operations usable with animation disabled.

