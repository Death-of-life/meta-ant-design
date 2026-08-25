# Page archetypes

## Contents

1. Selection matrix
2. Operational overview
3. Executive outcome dashboard
4. Work queue or table page
5. Entity detail
6. Incident investigation
7. Settings and configuration
8. Create or edit flow

## 1. Selection matrix

| User job | Archetype | Default anchor |
|---|---|---|
| Know whether a system is healthy and what needs action | Operational overview | Critical state or health summary |
| Understand outcome, change, and drivers | Executive outcome dashboard | Primary outcome metric |
| Find, compare, select, or act on many records | Work queue/table | Principal data surface |
| Understand and act on one object | Entity detail | Identity + state |
| Triage and investigate active problems | Incident investigation | Worst unresolved incident or selected row |
| Configure a product safely | Settings/configuration | Section identity; no oversized hero |
| Complete a bounded change | Create/edit flow | Task progress or form title |

Choose one archetype. Compose two only when the page genuinely serves two connected jobs; otherwise split routes or use a drawer.

## 2. Operational overview

Use for SRE, infrastructure, service health, capacity, release impact, risk, or compliance posture.

```text
FRAME
  content fill + optional 340–420px triage rail

ANCHOR
  health/state summary with consequence and recommended next action

ORDER
  page identity and global filters
  state summary
  related metric band
  primary trend or diagnostic evidence
  worst-first attention queue
  detailed service/resource table
```

Ant mapping:

```text
PageContainer / page header
FocusHero or Alert + custom summary composition
Statistic in one grouped ProCard/Card surface
@ant-design/charts for one primary trend
List for attention queue
ProTable for full detail
Drawer for investigation on compact widths
```

Rules:

- Show the most consequential active issue before normal traffic or utilization.
- Pair every status with affected scope, change/baseline, and timestamp.
- Put environment, region, and time range together in one control row.
- Avoid one full-width chart per service. Use one comparative chart, small multiples, or a table.
- Move the triage rail below the primary evidence at or before 1024px; do not squeeze both.

## 3. Executive outcome dashboard

Use for weekly/monthly reviews, goals, product outcomes, or management summaries.

```text
FRAME
  capped/fill main content + optional narrative rail

ANCHOR
  the outcome metric, target, delta, and interpretation

ORDER
  period/context controls
  outcome scorecard
  goals and leading drivers
  two to four comparative trends
  what changed and why
  supporting detail
```

Ant mapping:

```text
Statistic / Progress in a focused summary
Row/Col or CSS Grid for peer metrics
@ant-design/charts for trends
Descriptions/List for narrative evidence
Table for underlying records
```

Rules:

- Use one comparison basis consistently: WoW, MoM, QoQ, target, or forecast.
- Explain whether a positive numeric delta is good or bad; do not assume green means up.
- Keep the narrative close to the metric it explains.
- Do not present eight equal KPI cards and make the user infer the outcome.

## 4. Work queue or table page

Use for CRUD, inventory, users, policies, requests, jobs, deployments, incidents, or approvals.

```text
FRAME
  full-width principal table/list; optional inspector panel

ANCHOR
  the work queue itself

ORDER
  compact page title + primary create/action
  active filter summary or search controls
  result count / saved view / bulk actions
  Table or List
  inspector Drawer/panel when needed
```

Ant mapping:

```text
PageContainer
QueryFilter when fields >=5 or expandable
compact toolbar when fields <=4
ProTable/Table or ProList/List
tableAlertRender for bulk selection
Drawer for row detail on narrow widths
```

Rules:

- Do not add a generic KPI row above every table.
- Surface a summary only when it changes filtering, prioritization, or action.
- Use a simple current-result title or true category tabs; do not invent tabs for decoration.
- Show at most two row actions; place the rest in `Dropdown`.
- Make filters restorable and visible after query execution.
- Prefer row selection + a stable bulk-action bar to repeated per-row controls.

## 5. Entity detail

Use for service, order, user, host, application, policy, incident, or project detail.

```text
FRAME
  capped mixed content or main content + contextual rail

ANCHOR
  object identity, lifecycle/status, ownership, and primary action

ORDER
  breadcrumb when there is a real parent path
  identity/state header
  critical facts and exceptions
  activity/timeline/relationships
  grouped descriptions
  raw or low-frequency metadata
```

Ant mapping:

```text
PageHeader composition / PageContainer title area
Tag or Badge status with text
Descriptions / ProDescriptions
Tabs only for distinct subdomains
Timeline/List/Table for history and relations
Drawer/Modal for focused edits
```

Rules:

- Keep identity and state visible while the user interprets downstream facts.
- Promote exceptions above ordinary descriptions.
- Group fields semantically, not by database schema order.
- Use inline edit only for low-risk independent fields; use a form/overlay for coupled changes.
- Do not put every description group in a card when dividers and section headings suffice.

## 6. Incident investigation

Use for on-call triage, audit investigation, security events, support cases, or failed jobs.

```text
FRAME
  dense queue + 340–420px inspector on wide screens

ANCHOR
  selected incident or worst unresolved state

ORDER
  search/status/severity filters
  grouped worst-first rows
  inspector identity and response actions
  evidence, affected scope, and timeline
  related changes/log links
```

Ant mapping:

```text
Table/List with compact density
Badge/Tag for explicit severity and status
Resizable panel if the project already has a safe implementation
Drawer as default portable inspector
Timeline and Descriptions in the inspector
```

Rules:

- Rows, not cards.
- Sort by consequence and recency, not visual color.
- Keep acknowledge/assign/resolve actions near the selected incident state.
- Do not render full logs in the summary page; link or expand on demand.
- On narrow screens, replace the inspector with a Drawer or route, never compress it beside the queue.

## 7. Settings and configuration

Use for preferences, policies, integrations, resource configuration, or access settings.

```text
FRAME
  optional section navigation + capped 640–960px content

ANCHOR
  section title and change scope; no large hero by default

ORDER
  section title and consequence/help
  grouped form sections
  validation or dependency notices
  sticky or stable save boundary when the form is long
```

Ant mapping:

```text
Anchor/Tabs/side navigation for sections
ProForm/Form with vertical labels
Divider/section grouping
Alert for consequential dependencies
Affix or layout footer for long-form save actions
```

Rules:

- Prefer sections and dividers to a stack of nested cards.
- State when changes apply, who/what is affected, and whether restart/approval is required.
- Show defaults and inherited values distinctly.
- Keep destructive configuration in a separate danger section with explicit confirmation.

## 8. Create or edit flow

Use for onboarding, provisioning, policy creation, multi-step configuration, or high-stakes editing.

```text
FRAME
  capped 640–960px form; optional step rail

ANCHOR
  task identity or current step

ORDER
  title and scope
  optional explanation of irreversible/consequential behavior
  fields grouped by user intent
  validation near the field plus summary when necessary
  stable Cancel/Save or step controls
  final review for high-stakes flows
```

Ant mapping:

```text
ProForm/Form
StepsForm for truly sequential flows
BetaSchemaForm/ProForm groups for structured settings
Descriptions for final review
Result for terminal success/failure
```

Rules:

- Use a stepper only when order, validation, or ownership changes between steps.
- Four or fewer short steps may be horizontal; longer or descriptive steps use a vertical rail.
- Keep the form itself as the focus. Do not add a second progress dashboard above it.
- Save draft must not pretend that full validation or activation occurred.
- Keep confirmation controls visible inside the viewport on every supported screen.

