/* Offline Token specimen. No production requests or persistent user data. */
const root = document.documentElement;
const palette = document.getElementById('palette');
const swatches = [
  ['primary', '主操作'], ['shell', '导航'], ['canvas', '画布'],
  ['surface', '工作表面'], ['text', '主要文字'], ['control-border', '控件边界'],
];
function renderPalette() {
  const styles = getComputedStyle(root);
  palette.replaceChildren(...swatches.map(([key, label]) => {
    const item = document.createElement('div');
    item.className = 'specimen-swatch';
    const color = document.createElement('div');
    color.className = 'specimen-swatch__color';
    color.style.background = `var(--ops-${key})`;
    const name = document.createElement('strong');
    name.textContent = label;
    const value = document.createElement('code');
    value.textContent = styles.getPropertyValue(`--ops-${key}`).trim();
    item.append(color, name, value);
    return item;
  }));
}
document.getElementById('theme').addEventListener('change', (event) => {
  root.dataset.opsTheme = event.target.value;
  renderPalette();
});
document.getElementById('density').addEventListener('change', (event) => {
  root.dataset.opsDensity = event.target.value;
});

let accepted = false;
const modes = {
  current: ['Staging 资源已交付', '待申请人确认', 'pending', '系统交付与自动校验已完成；申请人确认后才能结束本次流程。'],
  history: ['SRE 审核记录', '当时已通过', 'succeeded', '这里只展示示例快照中的审核结论，不允许重新执行或修改审批材料。'],
  completed: ['本次申请已完成', '已验收', 'succeeded', '先展示最终交付结果与生效内容，过程记录按需查阅。'],
};
function setMode(mode) {
  const [title, label, state, detail] = modes[mode];
  document.getElementById('task-title').textContent = title;
  document.getElementById('task-state').textContent = label;
  document.getElementById('task-state').dataset.state = state;
  document.getElementById('task-detail').textContent = detail;
  document.getElementById('history-notice').hidden = mode !== 'history';
  document.getElementById('confirm').hidden = mode !== 'current';
  document.getElementById('acceptance').textContent = mode === 'completed' ? '已确认（演示）' : mode === 'history' ? '不属于该历史审核阶段' : accepted ? '已确认（演示）' : '尚未确认';
  document.querySelectorAll('[data-mode]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.mode === mode));
  });
  const evidence = document.querySelector('.specimen-evidence');
  evidence.hidden = mode === 'history';
  document.getElementById('feedback').textContent = '';
}
document.querySelectorAll('[data-mode]').forEach((button) => {
  button.addEventListener('click', () => {
    if (button.dataset.mode === 'current') accepted = false;
    setMode(button.dataset.mode);
  });
});
document.getElementById('return-current').addEventListener('click', () => { accepted = false; setMode('current'); });
document.getElementById('confirm').addEventListener('click', () => {
  accepted = true;
  setMode('completed');
  document.getElementById('feedback').textContent = '演示确认已完成，未调用任何生产接口。';
  document.querySelector('[data-mode="completed"]').focus();
});
renderPalette();
