const results = [{"model": "GPT-6 Astra (high)", "easyF": 0.321, "gain": 0.118, "identity": 0.174, "faceF": 0.411, "faceGain": 0.2, "defaultF": 0.084, "defaultIdentity": -0.113, "defaultFaceF": 0.132}, {"model": "Claude Opus 5.5 (high)", "easyF": 0.297, "gain": 0.087, "identity": 0.145, "faceF": 0.351, "faceGain": 0.115, "defaultF": 0.078, "defaultIdentity": -0.12, "defaultFaceF": 0.089}, {"model": "GPT-6 Astra (low)", "easyF": 0.281, "gain": 0.065, "identity": 0.126, "faceF": 0.358, "faceGain": 0.126, "defaultF": 0.103, "defaultIdentity": -0.09, "defaultFaceF": 0.139}, {"model": "Claude Opus 5.5 (none)", "easyF": 0.277, "gain": 0.061, "identity": 0.12, "faceF": 0.316, "faceGain": 0.07, "defaultF": 0.094, "defaultIdentity": -0.101, "defaultFaceF": 0.116}, {"model": "Claude Sonnet 5.5", "easyF": 0.277, "gain": 0.061, "identity": 0.121, "faceF": 0.317, "faceGain": 0.07, "defaultF": 0.097, "defaultIdentity": -0.097, "defaultFaceF": 0.103}, {"model": "GPT-6 Luna", "easyF": 0.268, "gain": 0.049, "identity": 0.109, "faceF": 0.309, "faceGain": 0.06, "defaultF": 0.082, "defaultIdentity": -0.115, "defaultFaceF": 0.113}, {"model": "DeepSeek-V4.1-Flash-1017", "easyF": 0.258, "gain": 0.034, "identity": 0.097, "faceF": 0.277, "faceGain": 0.011, "defaultF": 0.055, "defaultIdentity": -0.147, "defaultFaceF": 0.073}, {"model": "GLM-5.3-Flash", "easyF": 0.251, "gain": 0.026, "identity": 0.088, "faceF": 0.276, "faceGain": 0.013, "defaultF": 0.067, "defaultIdentity": -0.134, "defaultFaceF": 0.086}, {"model": "Qwen3.8-27B", "easyF": 0.245, "gain": 0.019, "identity": 0.082, "faceF": 0.259, "faceGain": -0.011, "defaultF": 0.065, "defaultIdentity": -0.136, "defaultFaceF": 0.095}, {"model": "Gemini 3.5 Flash-Lite", "easyF": 0.182, "gain": -0.064, "identity": 0.005, "faceF": 0.208, "faceGain": -0.08, "defaultF": 0.054, "defaultIdentity": -0.149, "defaultFaceF": 0.027}];
const body = document.querySelector('#results-body');
const head = document.querySelector('thead tr');
const input = document.querySelector('#model-search');
let setting = 'easy', sortKey = 'easyF', descending = true;
const fields = { easy: [['easyF', 'F@0.5%'], ['gain', 'Gain'], ['identity', 'Identity'], ['faceF', 'Facial F'], ['faceGain', 'Facial Gain']], default: [['defaultF', 'F@0.5%'], ['defaultIdentity', 'Identity'], ['defaultFaceF', 'Facial F']] };
function render() {
 const columns = fields[setting];
 head.replaceChildren();
 const first = document.createElement('th'); first.scope = 'col'; first.textContent = 'Model configuration'; head.append(first);
 for (const [key, label] of columns) {
  const th = document.createElement('th'); th.scope = 'col';
  if (sortKey === key) th.setAttribute('aria-sort', descending ? 'descending' : 'ascending');
  const button = document.createElement('button'); button.type = 'button'; button.className = 'sort-button'; button.dataset.sort = key;
  button.textContent = label + (sortKey === key ? (descending ? ' ↓' : ' ↑') : ''); th.append(button); head.append(th);
 }
 const visible = results.filter(r => r.model.toLowerCase().includes(input.value.trim().toLowerCase())).sort((a,b) => (descending ? -1 : 1) * (a[sortKey] - b[sortKey]));
 const best = Math.max(...results.map(r => r[setting === 'easy' ? 'easyF' : 'defaultF']));
 body.replaceChildren();
 for (const row of visible) {
  const tr = document.createElement('tr');
  if (row[setting === 'easy' ? 'easyF' : 'defaultF'] === best) tr.className = 'best';
  const th = document.createElement('th'); th.scope = 'row'; th.textContent = row.model; tr.append(th);
  for (const [key] of columns) { const td = document.createElement('td'); const v = row[key]; td.textContent = (/gain|identity/i.test(key) && v >= 0 ? '+' : '') + v.toFixed(3); if (v < 0) td.className = 'negative'; tr.append(td); }
  body.append(tr);
 }
 document.querySelector('#empty-results').hidden = visible.length > 0;
 document.querySelector('#results-caption').textContent = setting === 'easy' ? 'Easy · 100 ICT targets · Editable mean-head start' : 'Default · 20 ICT targets · Empty-scene start';
 document.querySelector('#setting-note').textContent = setting === 'easy' ? 'Easy uses ICT100. Mean-head reference: F@0.5% = 0.229, Identity = +0.062, facial F = 0.262. Gain and Identity are computed per target before averaging.' : 'Default uses the fixed ICT20 subset. Same-domain random-identity matching defines Identity = 0. Mean-head reference on these 20 targets: F@0.5% = 0.226, Identity = +0.061, facial F = 0.279. The reference is not an empty-scene agent run.';
}
head.addEventListener('click', e => { const b = e.target.closest('[data-sort]'); if (!b) return; descending = sortKey === b.dataset.sort ? !descending : true; sortKey = b.dataset.sort; render(); });
input.addEventListener('input', render);
for (const button of document.querySelectorAll('[data-setting]')) button.addEventListener('click', () => { setting = button.dataset.setting; sortKey = setting === 'easy' ? 'easyF' : 'defaultF'; descending = true; for (const b of document.querySelectorAll('[data-setting]')) { const active = b === button; b.classList.toggle('selected', active); b.setAttribute('aria-pressed', String(active)); } render(); });
const menu = document.querySelector('.menu-toggle'); const links = document.querySelector('.nav-links');
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; menu.setAttribute('aria-expanded', String(open)); links.classList.toggle('open', open); });
links.addEventListener('click', e => { if (e.target.closest('a')) { links.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); } });
document.addEventListener('keydown', e => { if (e.key === 'Escape') { links.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); } });
if ('IntersectionObserver' in window) { const observer = new IntersectionObserver(entries => { for (const entry of entries) if (entry.isIntersecting) { for (const a of links.querySelectorAll('a')) { const active = a.hash === '#' + entry.target.id; a.classList.toggle('active', active); if (active) a.setAttribute('aria-current','location'); else a.removeAttribute('aria-current'); } } }, { rootMargin: '-15% 0px -60% 0px' }); for (const section of document.querySelectorAll('main section[id]')) observer.observe(section); }
render();

// Appendix gallery: keep all pages available without JavaScript.
const previewButtons = document.querySelectorAll('[data-preview]');
function showPreview(id) {
 for (const page of document.querySelectorAll('.preview-page')) page.hidden = page.id !== id;
 for (const button of previewButtons) { const selected = button.dataset.preview === id; button.classList.toggle('selected', selected); button.setAttribute('aria-pressed', String(selected)); }
}
for (const button of previewButtons) button.addEventListener('click', () => showPreview(button.dataset.preview));
showPreview('ict-first');

// Gentle one-time scroll-reveal for section blocks and card grids.
(() => {
 const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 if (reducedMotion || !('IntersectionObserver' in window)) return;

 const groups = [
  ['.stats > div', 55],
  ['.section-heading', 0],
  ['.abstract, .paper-overview', 70],
  ['.domains > article', 65],
  ['.settings > article', 80],
  ['.sample-gallery', 0],
  ['.pipeline > li', 70],
  ['.budget', 0],
  ['.metric-grid > article', 70],
  ['.trajectory-card', 65],
  ['#results .result-toolbar, #results > .wrap > .table-container, #results .baselines', 70],
  ['.findings > article', 70],
  ['.resources-layout > div', 85]
 ];

 const targets = [];
 for (const [selector, step] of groups) {
  const nodes = document.querySelectorAll(selector);
  nodes.forEach((node, index) => {
   node.setAttribute('data-reveal', '');
   if (step > 0 && index > 0) {
    node.style.setProperty('--reveal-delay', `${Math.min(index, 4) * step}ms`);
   }
   targets.push(node);
  });
 }

 const viewportH = window.innerHeight || document.documentElement.clientHeight;
 const toObserve = [];
 for (const node of targets) {
  const rect = node.getBoundingClientRect();
  if (rect.top < viewportH * 0.94) {
   node.classList.add('is-visible');
  } else {
   toObserve.push(node);
  }
 }

 document.documentElement.classList.add('reveal-ready');

 const revealObserver = new IntersectionObserver(entries => {
  for (const entry of entries) {
   if (!entry.isIntersecting) continue;
   entry.target.classList.add('is-visible');
   revealObserver.unobserve(entry.target);
  }
 }, { threshold: 0.01, rootMargin: '0px 0px -7% 0px' });

 for (const node of toObserve) revealObserver.observe(node);
})();
