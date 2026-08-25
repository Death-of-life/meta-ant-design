# Responsive and accessibility contract

## Contents

1. Width contract
2. Viewport and scrolling
3. Tables and horizontal gestures
4. Modal and Drawer safety
5. Touch and pointer behavior
6. Keyboard and focus
7. Semantics and status
8. Motion and live data
9. Verification matrix

## 1. Width contract

Ant breakpoints are useful implementation hooks, but choose behavior by content pressure rather than device names.

```text
xs   <576px
sm   >=576px
md   >=768px
lg   >=992px
xl   >=1200px
xxl  >=1600px
```

For every frame region declare one action at each pressure point:

```ts
type ResponsiveBehavior =
  | 'keep'
  | 'resize'
  | 'move'
  | 'collapse'
  | 'replace';
```

Example:

```text
Region          >=1200       992–1199        768–991       <768
navigation      keep side    collapse side   replace       replace
main evidence   keep         resize          keep          keep
triage rail     keep 380     move below      move below    collapse details
inspector       keep panel   replace Drawer  replace       replace full width
metric band     4 columns    2 columns       2 columns     1 column
```

Do not keep several regions and shrink all of them until none is usable. Drop, move, or replace secondary regions first.

## 2. Viewport and scrolling

Use modern viewport units with a fallback when a full-height region is required:

```css
.app-viewport {
  min-height: 100vh;
  min-height: 100dvh;
}
```

Rules:

- Avoid `height: 100vh` on mobile when browser chrome or an on-screen keyboard can reduce the usable viewport.
- Give each scrolling region exactly one owner. Avoid nested vertical scroll containers unless the frame deliberately pins a header/footer.
- Add `min-width: 0` to flex/grid children that must shrink.
- Add `min-height: 0` to flex children that own vertical scrolling.
- Do not place the entire application under `overflow: hidden` to suppress one layout bug.
- Account for safe-area insets on full-screen mobile overlays when the host supports notches/home indicators.

```css
.safe-footer {
  padding-bottom: max(16px, env(safe-area-inset-bottom));
}
```

## 3. Tables and horizontal gestures

Wide tables may scroll horizontally. Preserve that gesture intentionally:

```css
.table-scroll-region {
  min-width: 0;
  overflow-x: auto;
  overscroll-behavior-inline: contain;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-x pan-y;
}
```

Rules:

- Do not attach a parent `pointermove`/`touchmove` handler that calls `preventDefault()` for ordinary table or card scrolling.
- Do not use `touch-action: none` on page, table, carousel, or hand/rail containers unless implementing a fully managed gesture surface.
- Set `scroll.x` from column needs, not an arbitrary huge number.
- Keep the action column accessible; fix it only when horizontal scrolling is actually enabled.
- On phones, consider a purpose-built list/detail layout when a table would require continual two-axis scrolling.
- A scrollable horizontal card/hand rail needs visible overflow affordance, reachable first/last items, and no overlay intercepting pointer events.

## 4. Modal and Drawer safety

Confirmation and commit actions must remain reachable at every supported viewport.

```css
.responsive-modal-body {
  max-height: min(70dvh, 720px);
  overflow-y: auto;
  overscroll-behavior: contain;
}

.responsive-modal-footer {
  position: relative;
  flex: 0 0 auto;
  padding-bottom: max(12px, env(safe-area-inset-bottom));
}
```

Rules:

- Center ordinary business modals unless product context requires another placement.
- Constrain width to the viewport: `width: min(<design-width>, calc(100vw - 32px))` or the equivalent component API.
- Make the body the only scrollable section; keep header/footer visible.
- Avoid fixed body heights derived from desktop dimensions.
- Let long titles and validation text wrap without covering close or submit controls.
- Use a full-width Drawer or dedicated route for complex mobile edits.
- Test Android WebView and iOS Safari when those are supported clients; viewport behavior differs from desktop emulation.

## 5. Touch and pointer behavior

Use Pointer Events when implementing custom gestures. Do not maintain separate mouse and touch logic without a specific compatibility reason.

```ts
type PointerMode =
  | 'native-scroll'
  | 'tap'
  | 'drag'
  | 'resize';
```

```text
native-scroll  browser owns movement; no preventDefault
tap            normal click semantics; tolerate minor movement
drag           capture pointer after threshold; release on end/cancel
resize         explicit handle only; never the whole panel surface
```

Custom drag requirements:

- Start only from a visible handle or draggable object.
- Use a movement threshold so a tap does not become a drag.
- Call `setPointerCapture()` only after drag starts.
- Handle `pointercancel`, lost capture, route change, and component unmount.
- Restore text selection and scrolling after the gesture.
- Offer a keyboard/non-drag alternative for ordering or resizing when the operation matters.

Touch targets:

```text
coarse pointer minimum target 44x44 CSS px
icon-only action              aria-label required
adjacent destructive actions  adequate separation required
```

The visible icon may remain 16–20px; enlarge its hit area.

## 6. Keyboard and focus

- All actions must be reachable in a logical tab order.
- Use real `Button`, links, inputs, and table selection controls instead of clickable `div` elements.
- Icon-only buttons need an accessible name through `aria-label` or `Tooltip` plus label.
- Modals and Drawers must trap focus, focus a meaningful initial control, close with Escape when safe, and restore focus to the trigger.
- Do not remove the focus ring without a visible replacement using Ant focus tokens.
- Use `aria-current` for current navigation and `aria-expanded` for disclosure controls when the component does not supply them.
- Keep bulk-action controls immediately after the selection context in focus order.

## 7. Semantics and status

- Use headings in a logical outline; visual size does not change semantic depth.
- Pair status color with text and, when useful, an icon.
- Announce asynchronous operation outcomes with Ant `message`/`notification` or an appropriate live region.
- Do not announce every live metric update; announce only user-relevant state changes.
- Tables need clear column headers and row keys.
- Charts need an accessible title/summary and an exact-data alternative when decisions depend on precise values.
- Error copy identifies the failed operation, retained data, and recovery action.

## 8. Motion and live data

```css
@media (prefers-reduced-motion: reduce) {
  .meta-ant-scope *,
  .meta-ant-scope *::before,
  .meta-ant-scope *::after {
    scroll-behavior: auto;
    transition-duration: 0.01ms;
    animation-duration: 0.01ms;
    animation-iteration-count: 1;
  }
}
```

Do not apply this globally without checking existing product behavior. Scope it to newly introduced patterns or use the project's motion system.

Live dashboards:

- show last refresh time and auto-refresh state;
- pause or defer updates while the user is selecting/copying when reordering would disrupt them;
- avoid layout shift when values change length;
- preserve chart/table height during refresh;
- distinguish stale data from an empty result.

## 9. Verification matrix

At minimum:

| Surface | Width | Input | Verify |
|---|---:|---|---|
| desktop | 1440×900 | mouse + keyboard | hierarchy, shell, hover/focus, no overflow |
| compact/tablet | 1024×768 | touch + keyboard where applicable | moved rail, modal fit, table scroll |
| phone | 390×844 | touch | one-column order, Drawer, safe footer, horizontal gesture |
| short viewport | 1366×600 | mouse | modal/footer reachability, vertical scroll owner |
| zoom | 200% | keyboard | reflow, no clipped actions/text |

Also verify:

- `pointercancel` and interrupted gestures;
- long translated labels and 200% text zoom;
- loading, empty, error, partial, stale, and permission states;
- reduced motion;
- screen-reader names for icon actions and statuses;
- no console errors or layout warnings.

