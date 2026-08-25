---
name: meta-ant-design
description: Design, build, restyle, and review restrained enterprise back-office interfaces with Ant Design or Ant Design Pro while making the primary state, decision, and action immediately visible. Use for React/TypeScript admin systems, operational or SRE consoles, dashboards, CRUD/table/list pages, entity detail pages, incident investigation, settings, forms, and design-system work when users mention Ant Design, Ant Design Pro, ProComponents, antd, a bland or flat page, weak visual hierarchy, too many equal cards, unclear focus, Meta/Astryx-inspired design, or meta-ant-design. Preserve Ant Design as the runtime component system; do not replace it with Astryx.
---

# Meta Ant Design

Build quiet, high-signal enterprise UI: Ant Design supplies the components and Astryx-inspired frame-first reasoning supplies hierarchy, composition, and responsive structure.

## Non-negotiable contract

- Keep `antd` and, when already present, `@ant-design/pro-components` as the runtime UI system.
- Do not install or import Astryx, StyleX, Meta packages, or Astryx CSS. Borrow design reasoning, not its runtime.
- Preserve existing routing, permissions, data fetching, i18n, forms, and business behavior unless the request changes them.
- Prefer semantic Ant tokens and existing project tokens. Hardcode only structural widths or seed values centralized in a theme file.
- Produce restrained enterprise UI. Do not add gradients, glassmorphism, decorative blobs, excessive motion, giant marketing typography, or colorful card grids.
- Make each region answer one question and expose at most one primary action.
- Render dense records as `Table`, `ProTable`, `List`, or `ProList` rows. Do not wrap every row or section in a `Card`.
- Do not invent component props. Inspect the installed package version and its typings or official docs when an API is uncertain.

## Route the task

1. **Review or diagnose only:** inspect code and rendered evidence, apply the rubric, and report findings. Do not edit unless requested.
2. **Restyle an existing page:** preserve its behavior and information architecture where sound; change hierarchy, grouping, tokens, and responsive structure deliberately.
3. **Build a page in an existing app:** reuse the current shell, route, theme, and conventions. Add only the content region and required local patterns.
4. **Build a new admin app:** choose one Ant Design Pro shell, establish theme tokens, then build the first page composition.

## Read only what the task needs

- Always read [foundations.md](references/foundations.md) and [visual-hierarchy.md](references/visual-hierarchy.md).
- Read [page-archetypes.md](references/page-archetypes.md) to select the frame and content order.
- Read [patterns.md](references/patterns.md) for dashboards, health summaries, attention queues, metric groups, and investigation layouts.
- Read [ant-implementation.md](references/ant-implementation.md) before writing Ant/ProComponents code.
- Read [responsive-accessibility.md](references/responsive-accessibility.md) for any implementation or mobile/tablet change.
- Read [review-rubric.md](references/review-rubric.md) before declaring completion.
- Copy from `assets/` only when the project version and conventions are compatible; adapt names and paths rather than wrapping the asset unchanged.

## Workflow

### 1. Inspect before composing

Inspect the relevant `package.json`, existing theme, global CSS, layout shell, route, shared page components, and the actual rendered page when available. Record:

```text
ANT VERSION        antd / ProComponents / React versions
PAGE JOB           the decision or task this page exists to support
FIVE-SECOND ANSWER what the user must understand in five seconds
PRIMARY OBJECT     service, order, user, cluster, incident, policy, etc.
DOMINANT STATE     healthy, degraded, blocked, pending, empty, or neutral
PRIMARY ACTION     the single most important next action
DENSITY            compact | balanced | spacious
CONSTRAINTS        shell, permissions, mobile, i18n, charts, data volume
```

If a screenshot or running page exists, use it as evidence. Never infer visual success from source code alone.

### 2. Produce the composition kit

Before implementation, write a small composition decision in this exact order:

```text
INTENT             one-sentence user outcome
FRAME              page archetype and shell regions
ANCHOR             the one dominant above-fold element
SUPPORTING BLOCKS  two to four secondary groups
DATA SURFACES      table, list, chart, descriptions, form
ACTIONS            page primary, region secondary, row actions
RESPONSIVE         keep | resize | move | collapse | replace per region
ANT MAPPING        exact Ant/Pro components to use
```

Use the closest page archetype as the starting point. Adapt it only when the reason is explicit.

### 3. Establish hierarchy before styling

Assign every content block a level:

```text
L0  immediate state or decision anchor; exactly one per page
L1  page title and primary section leads
L2  supporting metrics, trends, and investigation groups
L3  ordinary records, fields, descriptions, and controls
L4  timestamps, provenance, helper text, and low-priority metadata
```

Rules:

- Put the L0 anchor in the first meaningful viewport, after breadcrumbs/page identity.
- Let critical state outrank a normal KPI. A degraded service must be seen before traffic volume.
- Use size differences mainly across levels; within a region, rank with weight and text color.
- Use spacing before borders, borders before surfaces, and surfaces before elevation.
- Reserve semantic color for status and primary color for action, selection, links, or one intentional emphasis.
- If all cards, metrics, buttons, or headings have equal weight, the composition is unfinished.

### 4. Choose the weakest sufficient container

Use, from weakest to strongest:

```text
gap/alignment -> Divider -> section -> Card/ProCard -> Modal/Drawer
```

- Use sections for normal page structure.
- Use one card for a self-contained widget, chart, critical summary, settings group, or hard interaction boundary.
- Use one shared metric band for related peer metrics instead of four unrelated cards.
- Avoid nested cards. Use a divider, tinted sub-surface, or rows inside the parent.
- Use a table/list without per-row cards for dense operational data.

### 5. Implement with Ant Design

- Reuse existing `ConfigProvider`, `ProConfigProvider`, `ProLayout`, and `PageContainer` rather than creating a parallel shell.
- Map visual meaning to tokens. Keep page-specific CSS structural and minimal.
- Prefer native component composition over custom imitations: `Alert`, `Badge`, `Tag`, `Statistic`, `Descriptions`, `Result`, `Empty`, `Skeleton`, `Table`, `List`, `Drawer`, and `Modal`.
- Keep one filled primary button per region. Demote alternate actions to default, text, link, dropdown, or row actions.
- Use charts only for a comparison, trend, distribution, or composition question. Do not add a chart to decorate empty space.
- When using the bundled patterns, copy the relevant `.tsx` and `meta-ant.css` into the user's project, then integrate them with the existing theme.

### 6. Design every state and width

Cover loading, empty, error, partial, stale, permission-denied, and success states. Define a responsive contract for every region:

```text
keep      preserve position and size
resize    flex within defined min/max bounds
move      relocate below the primary region
collapse  reduce non-critical detail
replace   use Drawer/Modal/BottomSheet-like mobile interaction
```

At minimum verify 1440px desktop, 1024px tablet/compact desktop, and 390px mobile when the product supports mobile. Protect confirmation actions from viewport clipping and preserve horizontal touch scrolling where the content requires it.

### 7. Verify before finishing

- Run the project formatter, type-checker, linter, and relevant tests.
- Render the affected routes and inspect desktop, tablet, and mobile screenshots when browser tooling is available.
- Perform the squint test: blurred or zoomed out, the anchor, primary action, and next block must still read in that order.
- Perform the grayscale test: hierarchy must survive without semantic color.
- Perform the keyboard and touch pass described in `responsive-accessibility.md`.
- Apply every blocking item in `review-rubric.md`; do not claim completion with a known blocker.

## Asset index

```text
assets/meta-ant-theme.ts  conservative Ant ThemeConfig seed
assets/meta-ant.css       focus hero, metric band, attention rows, layout
assets/FocusHero.tsx      one dominant page-state or decision anchor
assets/MetricBand.tsx     related metrics in one grouped surface
assets/AttentionList.tsx  worst-first, actionable exception queue
```

All asset component interfaces are fully typed. Prefer adapting their composition to adding new props casually.

## Completion response

Lead with the outcome. State the chosen anchor, the resulting scan order, the important files changed, and the verification performed. Distinguish verified behavior from design inference. If the request was review-only, give evidence-backed findings and a directly implementable remedy without modifying files.
