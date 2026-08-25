# Review rubric

Use this after implementation and for design audits. A blocking failure prevents completion.

## Scoring

```text
2  clearly satisfied
1  partially satisfied or fragile
0  absent, wrong, or unverified
```

Do not average away a blocking failure. Report blockers first.

## A. Intent and hierarchy — 20 points

- [ ] The page job is expressible in one sentence. (blocking)
- [ ] The five-second answer is visible in the first meaningful viewport. (blocking)
- [ ] There is one L0 anchor or one clearly dominant principal data surface. (blocking)
- [ ] Critical state outranks ordinary KPIs.
- [ ] Scan order follows decision -> evidence -> detail.
- [ ] Each region has one lead.
- [ ] Hierarchy survives grayscale.
- [ ] Hierarchy survives the squint test.
- [ ] Low-priority metadata is visibly but accessibly demoted.
- [ ] Repeated cards/metrics are not falsely equal.

## B. Composition and containers — 16 points

- [ ] The frame and region widths were chosen before local styling.
- [ ] Ordinary structure uses sections/gaps before cards.
- [ ] Dense records render as rows. (blocking)
- [ ] There are no unjustified nested cards.
- [ ] Related metrics share a coherent group.
- [ ] Header/body/footer content lines align.
- [ ] Padding has one owner; no double insets.
- [ ] Tight and generous gaps create visible grouping.

## C. Actions and semantics — 14 points

- [ ] There is at most one filled primary action per region. (blocking)
- [ ] The page-level primary action is unambiguous.
- [ ] Destructive actions are explicit and safely confirmed.
- [ ] Row actions are limited; overflow contains lower-priority actions.
- [ ] Status color is paired with text/icon. (blocking)
- [ ] Primary color is not decorative.
- [ ] Actions are located near the object/state they change.

## D. Ant Design correctness — 16 points

- [ ] Installed Ant/Pro versions and APIs were inspected. (blocking)
- [ ] Existing shell/theme/router/form/data patterns are reused.
- [ ] Semantic tokens replace scattered magic colors/spacing.
- [ ] Native Ant components are used instead of custom imitations.
- [ ] Table columns, overflow, actions, and pagination are deliberate.
- [ ] Filter presentation matches complexity.
- [ ] Overlay lifecycle/style slots match the installed version.
- [ ] TypeScript has no introduced `any` or type errors. (blocking)

## E. Responsive and interaction — 18 points

- [ ] Every region has a responsive keep/resize/move/collapse/replace rule.
- [ ] Desktop, 1024px, mobile, and short viewport are verified. (blocking when supported)
- [ ] Modal/Drawer commit actions remain visible and reachable. (blocking)
- [ ] Horizontal data/rails remain touch-scrollable. (blocking)
- [ ] No broad `overflow: hidden` or `touch-action: none` masks layout issues.
- [ ] Custom pointer gestures handle threshold, cancel, capture, and cleanup.
- [ ] Keyboard operation and focus order work. (blocking)
- [ ] Touch targets are adequate on coarse pointers.
- [ ] 200% zoom does not clip essential text/actions.

## F. States, data, and accessibility — 16 points

- [ ] Loading preserves layout and communicates progress.
- [ ] Empty distinguishes no data from no query results.
- [ ] Error identifies scope and recovery; valid data is retained when safe.
- [ ] Partial and stale data are explicit.
- [ ] Permission denied has a useful next path.
- [ ] Live updates do not cause disruptive reordering/layout shift.
- [ ] Icon-only actions have accessible names. (blocking)
- [ ] Charts have labels/summary and exact-data access when required.

## Result bands

```text
90–100  ready, provided there are no blockers
75–89   usable but refine before design-system adoption
60–74   significant hierarchy or robustness debt
<60     redesign the composition before polishing components
```

## Finding format

For each problem report:

```text
SEVERITY   blocker | high | medium | low
EVIDENCE   screenshot region, component, selector, or file path
IMPACT     what the user misses, misreads, or cannot operate
CAUSE      hierarchy, container, token, API, viewport, pointer, etc.
REMEDY     concrete Ant component/layout/token change
VERIFY     exact width, state, interaction, or test
```

Never write “looks bland” as a finding. Identify the equal weights, absent anchor, misleading color, repeated container, or broken scan order that creates the effect.
