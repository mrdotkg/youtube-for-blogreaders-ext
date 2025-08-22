/** @typedef {import("./common")} */

document.addEventListener('DOMContentLoaded', async () => {
  // Load existing settings
  const options = await loadOptions();
  document.forms[0].hideChannelAvatars.checked = options.hideChannelAvatars || false;
  document.forms[0].showFullVideoTitles.checked = options.showFullVideoTitles || false;
  document.forms[0].disableSearchResultPage.checked = options.disabledOnPages.results;
  document.forms[0].disableChannelPage.checked = options.disabledOnPages.channel;
  document.forms[0].disablePlaylistPage.checked = options.disabledOnPages.playlist;
  document.forms[0].disableWatchPage.checked = options.disabledOnPages.watch;
  document.forms[0].disableSubscriptionsPage.checked = options.disabledOnPages.subscriptions;
  document.forms[0].disableEverywhere.checked = options.disabledOnPages.everywhere;
});

// Save on change
document.forms[0].addEventListener('change', async () => {
  const status = document.getElementById('status');
  status.textContent = `⏳ Saving...`

  await saveOptions({
    hideChannelAvatars: document.forms[0].hideChannelAvatars.checked,
    showFullVideoTitles: document.forms[0].showFullVideoTitles.checked,
    thumbnailMode: 'hidden', // Always hidden now, no options
    syncSettings: false, // Removed complexity
    disabledOnPages: {
      results: document.forms[0].disableSearchResultPage.checked,
      channel: document.forms[0].disableChannelPage.checked,
      playlist: document.forms[0].disablePlaylistPage.checked,
      watch: document.forms[0].disableWatchPage.checked,
      subscriptions: document.forms[0].disableSubscriptionsPage.checked,
      everywhere: document.forms[0].disableEverywhere.checked,
    },
  })

  // Artificial delay, so the 'saving' message actually appears
  await new Promise(resolve => setTimeout(resolve, 200))

  status.textContent = `✅ Saved preferences`;
});

/**
 * @param {Options} options
 * @returns {Promise<void>}
 */
const saveOptions = async (options) => new Promise((resolve) => {
  browser.storage.local.set(options, resolve);
})