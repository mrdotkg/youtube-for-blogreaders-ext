/** @typedef {import("./common")} */

document.addEventListener('DOMContentLoaded', async () => {
  // Load existing settings
  const options = await loadOptions();
  console.log('Options page - Loaded options:', options);
  console.log('Options page - hideThumbnails value:', options.hideThumbnails, typeof options.hideThumbnails);
  
  document.forms[0].hideThumbnails.checked = options.hideThumbnails !== false; // More explicit boolean check
  document.forms[0].hideChannelAvatars.checked = options.hideChannelAvatars || false;
  document.forms[0].showFullVideoTitles.checked = options.showFullVideoTitles || false;
  document.forms[0].blockedChannels.value = (options.blockedChannels || []).join('\n');
  document.forms[0].hideDurationWhenThumbnailsAllowed.checked = options.hideDurationWhenThumbnailsAllowed || false;
  document.forms[0].disableHomePage.checked = options.disabledOnPages.home;
  document.forms[0].disableSearchResultPage.checked = options.disabledOnPages.results;
  document.forms[0].disableChannelPage.checked = options.disabledOnPages.channel;
  document.forms[0].disablePlaylistPage.checked = options.disabledOnPages.playlist;
  document.forms[0].disableWatchPage.checked = options.disabledOnPages.watch;
  document.forms[0].disableSubscriptionsPage.checked = options.disabledOnPages.subscriptions;
  document.forms[0].disableShortsPage.checked = options.disabledOnPages.shorts;
  document.forms[0].disableEverywhere.checked = options.disabledOnPages.everywhere;

  // Add current channel button functionality
  const addCurrentChannelBtn = document.getElementById('addCurrentChannel');
  const currentChannelStatus = document.getElementById('currentChannelStatus');
  
  addCurrentChannelBtn.addEventListener('click', async () => {
    try {
      const tabs = await browser.tabs.query({ active: true, currentWindow: true });
      const activeTab = tabs[0];
      
      if (activeTab && activeTab.url && activeTab.url.includes('youtube.com')) {
        const url = new URL(activeTab.url);
        const pathname = url.pathname;
        
        let channelId = '';
        if (pathname.startsWith('/@')) {
          channelId = pathname.split('/')[1]; // Gets @username
        } else if (pathname.startsWith('/channel/')) {
          channelId = '@' + pathname.split('/')[2]; // Convert to @format for consistency
        } else if (pathname.startsWith('/c/')) {
          channelId = '@' + pathname.split('/')[2]; // Convert to @format for consistency
        } else if (pathname.startsWith('/user/')) {
          channelId = '@' + pathname.split('/')[2]; // Convert to @format for consistency
        } else if (pathname === '/watch') {
          currentChannelStatus.textContent = 'Please navigate to the channel page to add it to the block list';
          setTimeout(() => currentChannelStatus.textContent = '', 3000);
          return;
        } else {
          currentChannelStatus.textContent = 'Not on a YouTube channel page';
          setTimeout(() => currentChannelStatus.textContent = '', 3000);
          return;
        }
        
        if (channelId) {
          const textarea = document.forms[0].blockedChannels;
          const currentChannels = textarea.value.split('\n').filter(c => c.trim());
          
          if (!currentChannels.includes(channelId)) {
            if (textarea.value) {
              textarea.value += '\n' + channelId;
            } else {
              textarea.value = channelId;
            }
            currentChannelStatus.textContent = `Added ${channelId} to blocked channels`;
            
            // Trigger save
            document.forms[0].dispatchEvent(new Event('change'));
          } else {
            currentChannelStatus.textContent = `${channelId} is already blocked`;
          }
          
          setTimeout(() => currentChannelStatus.textContent = '', 3000);
        }
      } else {
        currentChannelStatus.textContent = 'Not on a YouTube page';
        setTimeout(() => currentChannelStatus.textContent = '', 3000);
      }
    } catch (error) {
      console.error('Error adding current channel:', error);
      currentChannelStatus.textContent = 'Error adding channel';
      setTimeout(() => currentChannelStatus.textContent = '', 3000);
    }
  });
});

// Save on change
document.forms[0].addEventListener('change', async () => {
  const status = document.getElementById('status');
  status.textContent = `⏳ Saving...`

  // Parse blocked channels from textarea
  const blockedChannelsText = document.forms[0].blockedChannels.value;
  const blockedChannels = blockedChannelsText
    .split('\n')
    .map(line => {
      // Clean up the input - extract channel handle/ID from various formats
      let channel = line.trim();
      if (!channel) return '';
      
      // If it's a full URL, extract the channel part
      if (channel.includes('youtube.com/')) {
        const match = channel.match(/youtube\.com\/(@[^\/\?]+|channel\/[^\/\?]+|c\/[^\/\?]+|user\/[^\/\?]+)/);
        if (match) {
          channel = match[1];
        }
      }
      
      // Ensure @ format for consistency (except for channel/ URLs which we keep as-is)
      if (!channel.startsWith('@') && !channel.startsWith('channel/') && !channel.startsWith('c/') && !channel.startsWith('user/')) {
        channel = '@' + channel;
      }
      
      return channel;
    })
    .filter(channel => channel.length > 1); // Remove empty entries

  const optionsToSave = {
    hideThumbnails: document.forms[0].hideThumbnails.checked,
    hideChannelAvatars: document.forms[0].hideChannelAvatars.checked,
    showFullVideoTitles: document.forms[0].showFullVideoTitles.checked,
    blockedChannels: blockedChannels,
    hideDurationWhenThumbnailsAllowed: document.forms[0].hideDurationWhenThumbnailsAllowed.checked,
    disabledOnPages: {
      home: document.forms[0].disableHomePage.checked,
      results: document.forms[0].disableSearchResultPage.checked,
      channel: document.forms[0].disableChannelPage.checked,
      playlist: document.forms[0].disablePlaylistPage.checked,
      watch: document.forms[0].disableWatchPage.checked,
      subscriptions: document.forms[0].disableSubscriptionsPage.checked,
      shorts: document.forms[0].disableShortsPage.checked,
      everywhere: document.forms[0].disableEverywhere.checked,
    },
  };

  console.log('Options page - Saving options:', optionsToSave);
  console.log('Options page - hideThumbnails to save:', optionsToSave.hideThumbnails, typeof optionsToSave.hideThumbnails);

  await saveOptions(optionsToSave);

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