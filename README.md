# YouTube As Journal Extension

A browser extension that transforms YouTube into a journal-like, distraction-free reading experience with full video titles, watch time, and hidden thumbnails.

![Screenshot of the extension in action](./img/window-screenshot.png)

## ✨ What it does

YouTube As Journal transforms your YouTube browsing into a thoughtful, journal-like experience:
- **Hides distracting thumbnails** across all YouTube pages (home, channel, playlist, search, watch page sidebar)
- **Shows video durations prominently** by extracting duration from thumbnails and displaying it beside titles
- **Preserves essential info** like creator names, view counts, upload dates
- **Configurable page-specific settings** - disable on specific YouTube pages as needed
- **Coming soon**: Full video titles without truncation and channel avatar hiding options

Transform YouTube from a visual-temptation platform into a text-focused, journal-like content discovery tool - perfect for mindful browsing and focusing on content quality over clickbait.

## 📦 Installation

### Manual Install (Development)

1. Clone this repository
2. Go to `chrome://extensions` (Chrome) or `about:debugging` (Firefox)
3. Enable `Developer mode` in the top right (Chrome) or click `This Firefox` → `Load Temporary Add-on` (Firefox)
4. Click `Load unpacked` (Chrome) or select the `manifest.json` file (Firefox)

## 🚀 Building and Packaging

To create a distributable package:

```bash
./package.sh
```

This creates `package.zip` with all necessary files, excluding development artifacts.

## 🔧 Development

The extension automatically builds via GitHub Actions on every push, creating a ready-to-install package artifact.

### Key Files:
- `manifest.json` - Extension configuration
- `inject.js` - Main content script that hides thumbnails and extracts durations
- `options.html` & `options.js` - Settings page
- `common.js` - Shared utilities and storage handling
