// Polyfill for Chrome
// https://bugs.chromium.org/p/chromium/issues/detail?id=798169
if (typeof globalThis.browser === "undefined") {
  globalThis.browser = globalThis.chrome;
}

/**
 * @typedef {{
 *   hideChannelAvatars: boolean,
 *   showFullVideoTitles: boolean,
 *   hideThumbnails: boolean,
 *   showWatchProgress: boolean,
 *   blockedChannels: string[],
 *   enableWhitelistChannels: boolean,
 *   showDurationWhenHidden: boolean,
 *   disabledOnPages: {
 *     home: boolean,
 *     results: boolean,
 *     channel: boolean,
 *     playlist: boolean,
 *     watch: boolean,
 *     subscriptions: boolean,
 *     shorts: boolean,
 *     everywhere: boolean,
 *   },
 * }} Options
 */

/** @type {Options} */
const defaultOptions = {
  hideChannelAvatars: true, // Default to enabled
  showFullVideoTitles: true, // Default to enabled
  hideThumbnails: true, // Default to enabled
  showWatchProgress: true, // Default to enabled - show watch progress
  showDurationWhenHidden: true, // Default to enabled - show duration
  blockedChannels: [], // Array of channel handles/IDs where extension is disabled
  enableWhitelistChannels: true, // Only apply whitelisting if enabled
  disabledOnPages: {
    home: false,
    results: false,
    channel: false,
    playlist: false,
    watch: false,
    subscriptions: false,
    shorts: true, // Disable on shorts by default
    everywhere: false,
  },
}

/**
 * @returns {Promise<Options>}
 */
const loadOptions = async () => {
  // First get all stored values
  const storedOptions = await new Promise((resolve) => {
    browser.storage.local.get(null, resolve);
  });

  
  // Merge with defaults, but prioritize stored values
  const options = {
    hideChannelAvatars: storedOptions.hideChannelAvatars !== undefined ? storedOptions.hideChannelAvatars : defaultOptions.hideChannelAvatars,
    showFullVideoTitles: storedOptions.showFullVideoTitles !== undefined ? storedOptions.showFullVideoTitles : defaultOptions.showFullVideoTitles,
    hideThumbnails: storedOptions.hideThumbnails !== undefined ? storedOptions.hideThumbnails : defaultOptions.hideThumbnails,
    showWatchProgress: storedOptions.showWatchProgress !== undefined ? storedOptions.showWatchProgress : defaultOptions.showWatchProgress,
    showDurationWhenHidden: storedOptions.showDurationWhenHidden !== undefined ? storedOptions.showDurationWhenHidden : defaultOptions.showDurationWhenHidden,
  blockedChannels: storedOptions.blockedChannels || defaultOptions.blockedChannels,
  enableWhitelistChannels: storedOptions.enableWhitelistChannels !== undefined ? storedOptions.enableWhitelistChannels : defaultOptions.enableWhitelistChannels,
    disabledOnPages: {
      home: storedOptions.disabledOnPages?.home !== undefined ? storedOptions.disabledOnPages.home : defaultOptions.disabledOnPages.home,
      results: storedOptions.disabledOnPages?.results !== undefined ? storedOptions.disabledOnPages.results : defaultOptions.disabledOnPages.results,
      channel: storedOptions.disabledOnPages?.channel !== undefined ? storedOptions.disabledOnPages.channel : defaultOptions.disabledOnPages.channel,
      playlist: storedOptions.disabledOnPages?.playlist !== undefined ? storedOptions.disabledOnPages.playlist : defaultOptions.disabledOnPages.playlist,
      watch: storedOptions.disabledOnPages?.watch !== undefined ? storedOptions.disabledOnPages.watch : defaultOptions.disabledOnPages.watch,
      subscriptions: storedOptions.disabledOnPages?.subscriptions !== undefined ? storedOptions.disabledOnPages.subscriptions : defaultOptions.disabledOnPages.subscriptions,
      shorts: storedOptions.disabledOnPages?.shorts !== undefined ? storedOptions.disabledOnPages.shorts : defaultOptions.disabledOnPages.shorts,
      everywhere: storedOptions.disabledOnPages?.everywhere !== undefined ? storedOptions.disabledOnPages.everywhere : defaultOptions.disabledOnPages.everywhere,
    }
  };

  
  return options;
}

/**
 * Check if current page/content is from a blocked channel
 * @param {string[]} blockedChannels - Array of blocked channel handles/IDs
 * @returns {boolean}
 */
const isCurrentChannelBlocked = (blockedChannels) => {
  if (!blockedChannels || blockedChannels.length === 0) {
    return false;
  }

  // Get current URL path
  const currentPath = window.location.pathname;
  const currentUrl = window.location.href;

  // Check if we're on a channel page
  if (currentPath.startsWith('/@') || currentPath.startsWith('/channel/') || currentPath.startsWith('/c/') || currentPath.startsWith('/user/')) {
    // Extract channel identifier from URL
    const channelMatch = currentPath.match(/^\/(@[^\/]+|channel\/[^\/]+|c\/[^\/]+|user\/[^\/]+)/);
    if (channelMatch) {
      const channelId = channelMatch[1];
      return blockedChannels.some(blocked => 
        channelId.includes(blocked) || blocked.includes(channelId)
      );
    }
  }

  // Check if we're on a watch page and extract channel info from page
  if (currentPath === '/watch') {
    // Look for channel links in the page
    const channelLinks = document.querySelectorAll('a[href*="/@"], a[href*="/channel/"], a[href*="/c/"], a[href*="/user/"]');
    for (const link of channelLinks) {
      const href = link.getAttribute('href') || '';
      const channelMatch = href.match(/\/(@[^\/\?]+|channel\/[^\/\?]+|c\/[^\/\?]+|user\/[^\/\?]+)/);
      if (channelMatch) {
        const channelId = channelMatch[1];
        if (blockedChannels.some(blocked => 
          channelId.includes(blocked) || blocked.includes(channelId)
        )) {
          return true;
        }
      }
    }
  }

  return false;
}

/**
 * Extract channel identifier from a video element
 * @param {Element} videoElement - Video thumbnail/container element
 * @param {string[]} blockedChannels - Array of blocked channel handles/IDs
 * @returns {boolean}
 */
const isVideoFromBlockedChannel = (videoElement, blockedChannels) => {
  if (!blockedChannels || blockedChannels.length === 0) {
    return false;
  }

  // Look for channel links within the video element
  const channelLinks = videoElement.querySelectorAll('a[href*="/@"], a[href*="/channel/"], a[href*="/c/"], a[href*="/user/"]');
  for (const link of channelLinks) {
    const href = link.getAttribute('href') || '';
    const channelMatch = href.match(/\/(@[^\/\?]+|channel\/[^\/\?]+|c\/[^\/\?]+|user\/[^\/\?]+)/);
    if (channelMatch) {
      const channelId = channelMatch[1];
      if (blockedChannels.some(blocked => 
        channelId.includes(blocked) || blocked.includes(channelId)
      )) {
        return true;
      }
    }
  }

  return false;
}
