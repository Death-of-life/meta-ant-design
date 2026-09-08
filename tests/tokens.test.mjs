import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { resolve, dirname, extname } from 'node:path';
import test from 'node:test';
import { artifacts, loadTokens, validateTokens, root, kebab } from '../scripts/tokens.mjs';

const tokens = await loadTokens();

/** WCAG sRGB relative luminance, without rounding the pass/fail boundary. */
function luminance(hex) {
  const rgb = hex.slice(1).match(/../g).map((part) => parseInt(part, 16) / 255);
  const linear = rgb.map((v) => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
}
function contrast(a, b) {
  const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (high + 0.05) / (low + 0.05);
}

for (const [mode, c] of Object.entries(tokens.color)) {
  const pairs = [];
  for (const fg of ['text', 'textSecondary', 'textMuted']) {
    for (const bg of ['canvas', 'surface', 'subtle', 'elevated']) pairs.push([fg, bg, 4.5]);
  }
  for (const suffix of ['', 'Hover', 'Active']) {
    pairs.push(['onPrimary', `primary${suffix}`, 4.5]);
    pairs.push(['onError', `error${suffix}`, 4.5]);
  }
  pairs.push(['selectedText', 'selected', 4.5], ['selectedText', 'selectedHover', 4.5]);
  for (const state of ['success', 'warning', 'error', 'info']) {
    pairs.push([state, `${state}Bg`, 4.5], [state, 'surface', 4.5]);
  }
  for (const bg of ['surface', 'canvas', 'subtle', 'elevated']) {
    pairs.push(['controlBorder', bg, 3], ['focus', bg, 3]);
  }
  pairs.push(['shellText', 'shell', 4.5], ['shellMuted', 'shell', 4.5]);
  pairs.push(['shellSelectedText', 'shellSelected', 4.5], ['shellFocus', 'shell', 3], ['shellFocus', 'shellSelected', 3]);
  for (const [foreground, background, minimum] of pairs) {
    test(`${mode}: ${foreground}/${background} >= ${minimum}:1`, () => {
      const ratio = contrast(c[foreground], c[background]);
      assert.ok(ratio >= minimum, `${ratio.toFixed(3)}:1 is below ${minimum}:1`);
    });
  }
}

test('generated TS and CSS are byte-for-byte current', async () => {
  for (const [path, expected] of artifacts(tokens)) {
    assert.equal(await readFile(resolve(root, path), 'utf8'), expected, path);
  }
});
test('generator rejects invalid theme colors and missing mode keys', () => {
  const invalid = structuredClone(tokens);
  invalid.color.light.text = 'red';
  assert.throws(() => validateTokens(invalid));
  const missing = structuredClone(tokens);
  delete missing.color.dark.primary;
  assert.throws(() => validateTokens(missing));
});
test('generator rejects CSS injection and negative dimensions', () => {
  const injected = structuredClone(tokens);
  injected.shadow.overlay = 'none; color: red';
  assert.throws(() => validateTokens(injected));
  const negative = structuredClone(tokens);
  negative.layout.nav = -20;
  assert.throws(() => validateTokens(negative));
});
test('SM/LG token names are stable and densities preserve text size', () => {
  assert.equal(kebab('controlHeightSM'), 'control-height-sm');
  assert.equal(kebab('controlHeightLG'), 'control-height-lg');
  assert.equal(tokens.typography.fontSize.body, 14);
  assert.equal(tokens.density.comfortable.controlHeight, 36);
  assert.equal(tokens.density.compact.controlHeight, 32);
});
test('history/completed contract denies mutation props and runtime uses current mode', async () => {
  const source = await readFile(resolve(root, 'assets/TaskSummary.tsx'), 'utf8');
  assert.equal((source.match(/primaryAction\?: never/g) ?? []).length, 2);
  assert.ok(source.includes("props.mode === 'current' ? props.primaryAction : undefined"));
  assert.ok(source.includes('历史记录 · 只读'));
});
test('read-only facts preserve zero; v1 adapter no longer imports Card', async () => {
  const facts = await readFile(resolve(root, 'assets/ReadOnlyFacts.tsx'), 'utf8');
  assert.ok(facts.includes("item.value ?? '未提供'"));
  assert.ok(!facts.includes('Input'));
  const hero = await readFile(resolve(root, 'assets/FocusHero.tsx'), 'utf8');
  assert.ok(!/import.*Card/.test(hero));
  assert.ok(hero.includes('@deprecated'));
});

/** Walk committed text sources, excluding dependency/VCS directories. */
async function files(directory) {
  const paths = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (['.git', 'node_modules'].includes(entry.name)) continue;
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) paths.push(...await files(path));
    else paths.push(path);
  }
  return paths;
}

test('all local Markdown file links resolve', async () => {
  for (const path of (await files(root)).filter((item) => extname(item) === '.md')) {
    const text = await readFile(path, 'utf8');
    for (const match of text.matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)) {
      const url = match[1];
      if (/^(?:https?:|mailto:|#)/.test(url)) continue;
      const target = decodeURIComponent(url.split('#')[0]);
      await assert.doesNotReject(readFile(resolve(dirname(path), target)), `${path}: ${url}`);
    }
  }
});
test('skill entry and task-specific recipes exist', async () => {
  const skill = await readFile(resolve(root, 'SKILL.md'), 'utf8');
  assert.match(skill, /name: meta-ant-design/);
  const recipes = await readFile(resolve(root, 'references/page-archetypes.md'), 'utf8');
  for (const recipe of ['review', 'delivery', 'result', 'editor']) assert.ok(recipes.includes(recipe));
});
test('sample has no external runtime assets and explicitly marks example data', async () => {
  const html = await readFile(resolve(root, 'examples/specimen.html'), 'utf8');
  assert.ok(html.includes('示例数据'));
  assert.ok(!/(?:src|href)=["']https?:/i.test(html));
});
