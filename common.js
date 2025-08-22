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
 *   disabledOnPages: {
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
  disabledOnPages: {
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
  const options = await new Promise((resolve) => {
    browser.storage.local.get(defaultOptions, resolve);
  })

  return { ...defaultOptions, ...options }
}
