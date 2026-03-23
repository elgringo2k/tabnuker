# 💣 Tab Nuker

> Close every tab from your most distracting sites in one click — or one keystroke.

---

## What it does

Tab Nuker lets you build a hit list of domains. Whenever you want to claw back your focus, hit the button (or the keyboard shortcut) and every open tab matching those domains is gone instantly. No confirmation dialogs. No second-guessing. Just gone.

---

## Installation

Tab Nuker is not yet on the Chrome Web Store, so you'll load it manually:

1. Download or clone this repo
2. Open Chrome and go to `chrome://extensions`
3. Enable **Developer mode** (toggle in the top-right corner)
4. Click **Load unpacked** and select the `tabnuker` folder
5. The 💣 icon will appear in your toolbar

---

## Usage

### Managing your hit list

Click the 💣 toolbar icon to open the popup.

- **Add a domain** — type it into the input field and press `Enter` or click **Add**. You can paste full URLs too; Tab Nuker will extract the domain automatically.
- **Remove a domain** — click the **×** next to any entry.
- Your list is saved automatically and syncs across Chrome profiles via your Google account.

### Nuking tabs

- **Popup button** — the **Nuke Tabs (N)** button shows a live count of matching open tabs. Click it to close them all.
- **Keyboard shortcut** — works even when the popup is closed:

| Platform | Shortcut |
|----------|----------|
| macOS | `⌘ Shift X` |
| Windows / Linux | `Ctrl Shift X` |

> If the shortcut isn't working, visit `chrome://extensions/shortcuts` to confirm it's assigned.

### Domain matching

Entries match the full domain and all subdomains. For example, adding `reddit.com` will close tabs on `reddit.com`, `www.reddit.com`, `old.reddit.com`, and so on.

---

## Tips

- Press `/` inside the popup to jump focus to the add-domain input
- Press `Escape` to close the popup
- Add domains without the `www.` — Tab Nuker handles subdomains automatically

---

## License

MIT
