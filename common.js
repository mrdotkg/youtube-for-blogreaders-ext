// Polyfill for Chrome
// https://bugs.chromium.org/p/chromium/issues/detail?id=798169
if (typeof globalThis.browser === "undefined") {
  globalThis.browser = globalThis.chrome;
}

/**
 * @typedef {{
 *   hideChannelAvatars: boolean,
 *   thumbnailMode: 'hidden',
 *   disabledOnPages: {
 *     results: boolean,
 *     channel: boolean,
 *     playlist: boolean,
 *     watch: boolean,
 *     subscriptions: boolean,
 *     everywhere: boolean,
 *   },
 * }} Options
 */

/** @type {Options} */
const defaultOptions = {
  hideChannelAvatars: false,
  disabledOnPages: {
    results: false,
    channel: false,
    playlist: false,
    watch: false,
    subscriptions: false,
    everywhere: false,
  },
  thumbnailMode: 'hidden', // Always hidden, no other modes
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
