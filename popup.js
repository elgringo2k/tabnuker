let domains = [];

// --- Helpers ---

function tabMatchesDomain(url, domain) {
  try {
    const hostname = new URL(url).hostname.toLowerCase();
    const d = domain.toLowerCase().trim();
    return hostname === d || hostname.endsWith('.' + d);
  } catch {
    return false;
  }
}

function normalizeDomain(raw) {
  return raw.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
}

// --- Storage ---

async function saveDomains() {
  await chrome.storage.sync.set({ domains });
}

// --- Rendering ---

function renderList() {
  const ul = document.getElementById('domain-list');
  ul.innerHTML = '';
  domains.forEach(domain => {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.className = 'domain-text';
    span.textContent = domain;

    const btn = document.createElement('button');
    btn.className = 'remove-btn';
    btn.textContent = '×';
    btn.title = `Remove ${domain}`;
    btn.addEventListener('click', () => removeDomain(domain));

    li.appendChild(span);
    li.appendChild(btn);
    ul.appendChild(li);
  });
}

async function updateCount() {
  const btn = document.getElementById('nuke-btn');
  if (domains.length === 0) {
    btn.textContent = 'Nuke Tabs (0)';
    btn.disabled = true;
    return;
  }
  const tabs = await chrome.tabs.query({});
  const count = tabs.filter(t => t.url && domains.some(d => tabMatchesDomain(t.url, d))).length;
  btn.textContent = `Nuke Tabs (${count})`;
  btn.disabled = count === 0;
}

// --- Domain management ---

async function addDomain(raw) {
  const domain = normalizeDomain(raw);
  if (!domain || domains.includes(domain)) return;
  domains.push(domain);
  await saveDomains();
  renderList();
  await updateCount();
}

async function removeDomain(domain) {
  domains = domains.filter(d => d !== domain);
  await saveDomains();
  renderList();
  await updateCount();
}

// --- Tab operations ---

async function nukeTabs() {
  const btn = document.getElementById('nuke-btn');
  const tabs = await chrome.tabs.query({});
  const ids = tabs
    .filter(t => t.url && domains.some(d => tabMatchesDomain(t.url, d)))
    .map(t => t.id);

  if (ids.length === 0) return;

  await chrome.tabs.remove(ids);

  btn.classList.add('confirmed');
  btn.textContent = `Nuked ${ids.length} tab${ids.length === 1 ? '' : 's'}`;
  btn.disabled = true;

  setTimeout(async () => {
    btn.classList.remove('confirmed');
    await updateCount();
  }, 1500);
}

// --- Init ---

async function init() {
  const { domains: saved = [] } = await chrome.storage.sync.get('domains');
  domains = saved;
  renderList();
  await updateCount();

  document.getElementById('nuke-btn').addEventListener('click', nukeTabs);
  document.getElementById('add-btn').addEventListener('click', handleAdd);

  const input = document.getElementById('domain-input');
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleAdd();
    if (e.key === 'Escape') window.close();
  });

  // Press '/' to focus input when not already focused
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== input) {
      e.preventDefault();
      input.focus();
    }
  });

  const isMac = navigator.platform.toUpperCase().includes('MAC');
  document.getElementById('shortcut-key').textContent = isMac ? '⌥⇧X' : 'Alt+Shift+X';

  input.focus();
}

function handleAdd() {
  const input = document.getElementById('domain-input');
  const value = input.value;
  if (!value.trim()) return;
  input.value = '';
  addDomain(value);
}

document.addEventListener('DOMContentLoaded', init);
