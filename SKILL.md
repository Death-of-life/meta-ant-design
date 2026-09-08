---
name: meta-ant-design
description: Redesign, implement, and review React enterprise interfaces using the existing Ant Design/Ant Design Pro stack. Use when antd pages feel bland, repetitive, noisy, over-carded, hard to scan, or confusing across approval, delivery, history, resource-editor, table, and detail states; also for Design Token work. 中文触发：后台改版、审批工作台、交付结果、资源申请、页面没有重点、设计令牌。 Preserve business behavior, not a broken page composition. Never replace antd just to restyle a product.
---

# Meta Ant Design — task-first edition

A design skill, not a dashboard generator. Keep AntD for dependable controls; design the information model, page composition, and product language around the user's job. The repository name is historical, not a claim of Meta affiliation.

## Hard contract

1. Inspect the installed versions, route, permissions, data contracts, form lifecycle, shared layout, current theme, and rendered evidence before editing.
2. Preserve business facts, backend checks, frozen approval evidence, API behavior, routing, and useful existing conventions. **Do not preserve a broken information architecture merely because it exists.**
3. Do not upgrade or replace AntD, ProComponents, React, routing, forms, or CSS infrastructure as part of a visual refresh without separate justification.
4. Use only real fields. No invented risk scores, freshness states, owners, counts, topology, timestamps, versions, health claims, or decorative navigation. “Unknown”, “not applicable”, and “not checked” are not success.
5. Separate **business lifecycle**, **view mode**, **execution/verification/acceptance**, and **viewer capabilities**. Viewing a successful historical stage does not complete the current request or authorize a mutation.
6. One dominant task/data surface, **not one mandatory hero**. A table, editor, review diff, or result list can be the focus. Zero primary mutation buttons is correct for history and completed views.
7. Color supports meaning. The primary hue is for actions/selection; success is normally inline. Do not make every completed stage a green card or every explanation a blue Alert.
8. Use neutral sections, rows, and readable facts before cards. Cards remain appropriate for independent interaction boundaries; do not replace every card with another bordered wrapper.
9. The JSON token source owns the provided preset. Generated TS and CSS must agree. The host product's explicit brand/accessibility constraints outrank this preset; adapt the source and revalidate, not scattered CSS.
10. A screenshot or generated concept is evidence, not proof of functionality. Never claim browser, type, accessibility, or production verification that was not performed.

## Route and read selectively

| Request | Read | Deliver |
|---|---|---|
| Audit only | visual-hierarchy, review-rubric | Evidence → impact → specific repair; no edits |
| Existing page redesign | page-archetypes, visual-hierarchy, relevant ops-pilot-redesign recipe | Recomposition + actual implementation when authorized |
| Token-only | design-tokens, ant-implementation | Token artifacts + compatibility notes, not an unrelated app rewrite |
| Implementation | ant-implementation, responsive-accessibility, review-rubric | Working changes, state/width validation |
| Migration from v1 | migration-v2, patterns | Replace hero-first defaults without deleting business evidence |

Reference paths are under `references/`. Read `foundations.md` when choosing visual direction. Do not load every file or copy every asset into every task.

## Work sequence

### 1. Establish a compact design contract

```text
PAGE JOB          What must this role understand or finish?
ROLE / CAPABILITY Current viewer and authorized operations, as supplied by app
VIEW MODE         current | history | completed | editing
BUSINESS STATE    Exact state from the existing workflow; do not infer
EVIDENCE BASIS    live object | frozen snapshot | final effective state
FIRST VIEWPORT    Object + conclusion/pending task + relevant evidence + next step
ARCHETYPE         queue | review | delivery | result | editor | entity | settings | overview
PRIMARY ACTION    Specific verb, or none; display predicate from existing permissions
```

For vague redesign requests, infer a first proposal from screenshots/code and label assumptions. Ask only when ambiguity changes business behavior or would cause destructive work.

### 2. Edit the information model before touching tokens

For each visible block record `KEEP / MERGE / MOVE / REMOVE / REPLACE` and the destination of any hidden detail. At least identify the current bottleneck in comprehension; never invent a minimum change count to justify churn.

Collapse **duplicate claims**, not distinct audit events. Move routine process detail behind a clearly labeled history entry; keep the actual next task, exceptions, required review evidence, and approved scope visible.

Choose one template from `page-archetypes.md`. Review and delivery pages must not silently fall back to the operational dashboard template.

### 3. Define composition, then visual treatment

```text
SCAN ORDER        Identity → task/result → evidence → supporting history
FRAME             Main content and only justified rails; one padding owner
STATE EMPHASIS    Inline status | compact notice | consequential exception
READING MODEL     Facts/diff for reading; forms for editing; rows for comparison
DISCLOSURE        What collapses; trigger; how full evidence remains reachable
RESPONSIVE        What moves or changes below content-pressure breakpoints
```

Default to the Graphite & Iris preset when no established brand wins. Use `TaskSummary` only when a real task conclusion needs one. Do not automatically prepend `FocusHero`, `MetricBand`, large Result artwork, or statistics.

### 4. Implement against the host application

Use `ConfigProvider` token/component-token mapping, then scoped semantic page CSS. Reuse the shell instead of mounting another ProLayout. Use native semantic HTML for business composition and Ant controls for interaction; a read-only `dl` is not a forbidden custom component.

Tokens alone cannot merge duplicate summaries, change audit semantics, fix a triple-column editor, or decide who may approve. Make those changes in the appropriate business/view components. Do not bypass permission or snapshot checks through a visual adapter.

### 5. Verify the changed surface

Run formatter/type/lint/tests available in the host; render and inspect the changed routes at supported widths and states. The repository's token checks validate declared pairs and generated-file consistency, **not** a whole application's accessibility or visual quality.

Use `review-rubric.md`. History with a mutation button, misleading success, missing evidence, lost drafts, clipped actions, or an unverified production claim blocks handoff. When browser access is unavailable, deliver source changes with that limit stated; never substitute a self-awarded score.

## Repository assets

```text
assets/ops-pilot.tokens.json    editable source: light/dark, typography, density, layout
assets/design-tokens.ts        generated typed values
assets/ops-pilot.tokens.css     generated semantic CSS variables
assets/meta-ant-theme.ts       createOpsTheme() + compatible metaAntTheme export
assets/meta-ant.css            scoped layout and business-pattern styles
assets/TaskSummary.tsx         current/history/completed contract
assets/ReadOnlyFacts.tsx       readable fields, long IDs, null-safe values
assets/FocusHero.tsx           deprecated v1 adapter; never a new-page default
assets/MetricBand.tsx          optional real metrics only; not a page template
assets/AttentionList.tsx       optional real exception queue only
```

## Handoff

State the actual changed files/commit, resulting scan order, token integration, tests run, and explicit unverified areas. Give complete changed code through repository commits or a complete source bundle, not disconnected snippets. Keep findings concrete: “removed three duplicate success summaries” is useful; “now beautiful/10 out of 10” is not evidence.
