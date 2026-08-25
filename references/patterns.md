# Composition patterns

## Contents

1. Focus hero
2. Metric band
3. Attention queue
4. Trend with explanation
5. Master-detail investigation
6. Compact state strip
7. Section header
8. State handling

## 1. Focus hero

Use when the page has a real L0 state, decision, outcome, or task. Do not use as a decorative banner.

Required content:

```ts
type FocusHeroContent = {
  eyebrow?: string;
  title: string;
  summary: string;
  value?: string | number;
  status?: 'neutral' | 'info' | 'success' | 'warning' | 'danger';
  consequence?: string;
  primaryAction?: string;
  metadata?: string[];
};
```

Composition:

```text
eyebrow/status
lead title or value
one-sentence conclusion
consequence or recommended next step
one primary action + optional low-emphasis secondary action
owner/scope/baseline/last-updated metadata
```

Use `assets/FocusHero.tsx` as a starting point. Keep the background neutral or subtly semantic. Do not use a photo, gradient, illustration, or oversized 64px metric in a normal admin console.

## 2. Metric band

Use for two to six related peer metrics. Prefer one shared surface with cells and dividers.

```ts
type MetricTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger';

type MetricItem = {
  key: string;
  label: string;
  value: string | number;
  delta?: string;
  note?: string;
  tone?: MetricTone;
  emphasized?: boolean;
};
```

Rules:

- Order by decision value, not database order.
- Mark at most one item `emphasized` unless all peers are truly equal.
- Define the delta basis in the note or tooltip.
- Treat `up` and `down` as direction, not success/error; tone depends on business meaning.
- Use one to four columns; wrap five or six items. Do not squeeze six into one desktop row by default.
- Move low-value counters into the detailed data surface.

Use `assets/MetricBand.tsx` as a starting point.

## 3. Attention queue

Use for exceptions that require review, triage, or action.

```ts
type AttentionSeverity = 'critical' | 'high' | 'medium' | 'low';

type AttentionItem = {
  id: string;
  severity: AttentionSeverity;
  title: string;
  description: string;
  scope?: string;
  observedAt?: string;
  actionLabel?: string;
};
```

Rules:

- Sort worst-first, then by recency or impact.
- Use dense rows with a severity mark, label, consequence, scope, and time.
- Make the row or explicit link open detail; avoid several buttons in every row.
- Use a stable empty state that says what is being checked and when it last ran.
- Show a count in the section heading, not as a decorative badge on every item.

Use `assets/AttentionList.tsx` as a starting point.

## 4. Trend with explanation

Use when the user must understand change over time and why it happened.

```text
section lead + time range
headline value and delta
primary chart
two or three annotated drivers/events
link to underlying records
```

Rules:

- One chart answers one question.
- Annotate releases, incidents, policy changes, or thresholds only when they explain the movement.
- Keep chart title, legend, units, and time zone explicit.
- Avoid dual axes unless the relationship cannot be shown otherwise.
- Provide a table or accessible summary for exact values.
- Keep loading, empty, partial, and error states at a stable chart height.

## 5. Master-detail investigation

Use for incidents, logs, requests, users, resources, or orders where selection should preserve list context.

```text
wide screen
  queue/table: flexible
  inspector: fixed 340–420px

compact screen
  queue/table: full width
  inspector: Drawer or route
```

Inspector order:

```text
identity + state
primary response action
critical facts
timeline/evidence
secondary actions
```

Do not render an empty white panel with no instruction. Use `Empty` with a specific selection prompt. If width is user-resizable, enforce a minimum for both regions and persist the preference only if the project already has a settings mechanism.

## 6. Compact state strip

Use instead of a full focus hero when a table, form, or detail surface should remain dominant but an important state must be visible.

```text
[semantic icon] concise state + consequence        [one action]
```

Use `Alert` when its semantics and layout fit. Otherwise use a shallow section with a subtle semantic background. Keep it to one or two lines on desktop, allow wrapping on mobile, and never truncate the action or consequence into ambiguity.

## 7. Section header

Every major region has one lead and optional supporting control.

```text
title
short explanatory sentence                      secondary control/action
```

Rules:

- Do not repeat the page title inside the first card.
- Put the time-range or view control in the section it changes.
- Use a count only when it helps scope the result.
- Avoid a toolbar containing only icons; label unfamiliar actions.
- Keep region-level actions secondary to the page action.

## 8. State handling

Use Ant components rather than custom gray placeholders:

| State | Pattern |
|---|---|
| loading | `Skeleton`, table loading, chart skeleton at stable height |
| no data yet | `Empty` with setup/import action when appropriate |
| no query results | `Empty` with reset-filter action |
| partial | keep available data, show a scoped `Alert` for missing sources |
| stale | timestamp + warning/info label + refresh action |
| error | `Alert`/`Result` with retry and diagnostic reference |
| permission denied | `Result status="403"` and a request-access path |
| success terminal | `Result` with the next logical action, not confetti |

An empty state must say what is empty, why that may be expected, and the next useful action. An error state must not erase still-valid data unless continuing would be unsafe.

