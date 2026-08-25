# Visual hierarchy

## Contents

1. The attention contract
2. Priority levels
3. Selecting the anchor
4. Scan order
5. Emphasis budget
6. Action hierarchy
7. Common failure modes
8. Verification tests

## 1. The attention contract

Before choosing components, state:

```text
The user is here to __________.
Within five seconds they must know __________.
If they do only one thing, it is __________.
The evidence required before acting is __________.
Everything else can wait until __________.
```

If these blanks cannot be filled, do not style the page yet. Clarify or derive them from the workflow and data.

## 2. Priority levels

| Level | Meaning | Typical content | Treatment |
|---|---|---|---|
| L0 | Immediate decision or dominant state | degraded health, blocked approval, primary KPI, entity identity | one focus hero or compact anchor |
| L1 | Main page sections | trend, investigation, work queue | section lead and strong placement |
| L2 | Supporting evidence | peer KPIs, breakdown, secondary chart | grouped metric band or ordinary section |
| L3 | Full detail | table rows, descriptions, form fields | balanced/compact data surface |
| L4 | Context | timestamp, source, owner, last refresh | secondary/metadata text |

There is exactly one L0 anchor. L1 and L2 may repeat, but each region still has one lead.

## 3. Selecting the anchor

Choose one option:

```ts
type AnchorKind =
  | 'critical-state'
  | 'decision-summary'
  | 'primary-metric'
  | 'task-progress'
  | 'entity-identity'
  | 'none';
```

Use `none` only when a compact task page is genuinely better, such as a high-volume table whose filter and records are already the visual focus. `none` does not mean equal-weight cards; it means the table/work queue is the anchor.

Selection order:

1. If a current state threatens availability, money, compliance, or completion, use `critical-state`.
2. If the page exists to approve, choose, or resolve, use `decision-summary`.
3. If one measure determines success, use `primary-metric`.
4. If the user is completing a bounded flow, use `task-progress`.
5. If the page is about one object, use `entity-identity`.
6. Otherwise let the principal data surface act as the anchor.

Do not manufacture a hero for ordinary CRUD pages. A compact page header plus an attention strip or table can be stronger than a large empty banner.

## 4. Scan order

Default operational scan order:

```text
state/decision -> consequence -> recommended action -> evidence -> full detail
```

Default neutral dashboard scan order:

```text
primary outcome -> change vs baseline -> drivers -> trend -> records
```

Default entity-detail scan order:

```text
identity/status -> primary actions -> critical facts -> timeline/relationships -> raw fields
```

Default table/work-queue scan order:

```text
page identity -> active filters/count -> records -> selection/bulk actions -> row detail
```

Place blocks in that order unless the user workflow proves another sequence. Do not place a decorative KPI grid before the page's actual decision.

## 5. Emphasis budget

Use the following page budget as a guardrail:

```text
1  dominant anchor or principal data surface
1  filled page-level primary action
1  strong semantic status family in the first viewport
2–4 supporting groups above the detailed data
0  decorative gradients or colored card collections
0  nested cards by default
```

Related peer metrics should usually share a single metric band. If one metric matters more, give it the first cell, a larger value, or the anchor position; do not merely recolor all cards.

Status emphasis is proportional to consequence:

```text
P0  immediate outage/data loss/safety: semantic tint + icon + explicit consequence + action
P1  degraded or deadline risk: subtle semantic surface + priority placement
P2  needs attention: status mark within attention list or row
P3  informational: neutral text, optional info icon
```

Never rely on color alone. Pair state color with a label, icon, and meaningful copy.

## 6. Action hierarchy

```ts
type ActionLevel =
  | 'page-primary'
  | 'region-secondary'
  | 'tertiary'
  | 'row'
  | 'overflow'
  | 'destructive';
```

Map to Ant:

| Level | Default Ant expression |
|---|---|
| page-primary | one `Button type="primary"` |
| region-secondary | default button or contextual link |
| tertiary | text/link button |
| row | up to two link actions |
| overflow | `Dropdown` menu |
| destructive | default/danger in context; confirm before execution |

Rules:

- One filled primary button per region and normally one page-level primary action.
- Do not make Cancel and Save equally strong.
- Do not color every row action blue if the table is already visually busy; use links consistently.
- Put destructive actions in a stable location and use explicit language.
- Keep the action near the state or object it changes.

## 7. Common failure modes

### Card soup

Symptom: every section and row is a white rounded card with identical padding and shadow.

Fix: convert records to rows, ordinary groups to sections, related metrics to one band, and keep cards only for self-contained widgets or hard boundaries.

### Equal KPI grid

Symptom: four to eight identical Statistic cards appear before any conclusion.

Fix: promote the outcome or critical state to the anchor; group true peers; move low-value counters after the main trend or into the table header.

### Rainbow status

Symptom: ordinary values use blue/green/orange/red decoration with no consequence.

Fix: return normal metrics to neutral. Use semantic color only for real state.

### Border-led grouping

Symptom: the page depends on boxes and dividers because spacing is uniform.

Fix: establish tight internal gaps and generous group gaps; remove redundant borders.

### Multiple primary actions

Symptom: several filled blue buttons compete in the header, cards, and toolbar.

Fix: pick the page action, demote region actions, and move row actions into links/overflow.

### Header without an answer

Symptom: a large title/subtitle consumes the first viewport but says nothing about state.

Fix: compact the header and spend space on the anchor, or let the main work queue begin immediately.

## 8. Verification tests

### Squint test

Blur or zoom out. The first three visible weights must be:

```text
anchor -> primary action/consequence -> first supporting group
```

### Grayscale test

Remove color mentally or with browser emulation. State and hierarchy must remain understandable through wording, iconography, position, size, and weight.

### Five-second test

Show the first viewport briefly. A reviewer should answer:

1. What object/page is this?
2. Is anything wrong or pending?
3. What changed or matters most?
4. What can I do next?

### Deletion test

For every card, border, chip, icon, or chart ask: if removed, does comprehension or action degrade? If not, remove it.

