function tabMatchesDomain(url, domain) {
  try {
    const hostname = new URL(url).hostname.toLowerCase();
    const d = domain.toLowerCase().trim();
    return hostname === d || hostname.endsWith('.' + d);
  } catch {
    return false;
  }
}

chrome.commands.onCommand.addListener(async (command) => {
  if (command === 'nuke-tabs') {
    const { domains = [] } = await chrome.storage.sync.get('domains');
    if (domains.length === 0) return;
    const tabs = await chrome.tabs.query({});
    const ids = tabs
      .filter(t => t.url && domains.some(d => tabMatchesDomain(t.url, d)))
      .map(t => t.id);
    if (ids.length) chrome.tabs.remove(ids);
  }
});
