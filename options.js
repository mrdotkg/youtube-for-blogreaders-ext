/** @typedef {import("./common")} */

document.addEventListener('DOMContentLoaded', async () => {
  console.log('Options popup - DOM loaded');
  
  // Load existing settings
  const options = await loadOptions();
  console.log('Options popup - Loaded options:', options);
  
  document.forms[0].hideThumbnails.checked = options.hideThumbnails !== false; // More explicit boolean check
  document.forms[0].hideChannelAvatars.checked = options.hideChannelAvatars || false;
  document.forms[0].showFullVideoTitles.checked = options.showFullVideoTitles || false;
  document.forms[0].showWatchProgress.checked = options.showWatchProgress || false;
  document.forms[0].blockedChannels.value = (options.blockedChannels || []).join('\n');
  document.forms[0].disableHomePage.checked = options.disabledOnPages.home;
  document.forms[0].disableSearchResultPage.checked = options.disabledOnPages.results;
  document.forms[0].disableChannelPage.checked = options.disabledOnPages.channel;
  document.forms[0].disablePlaylistPage.checked = options.disabledOnPages.playlist;
  document.forms[0].disableWatchPage.checked = options.disabledOnPages.watch;
  document.forms[0].disableSubscriptionsPage.checked = options.disabledOnPages.subscriptions;
  document.forms[0].disableShortsPage.checked = options.disabledOnPages.shorts;
  document.forms[0].disableEverywhere.checked = options.disabledOnPages.everywhere;

  console.log('Options popup - Form populated successfully');

  // Add current channel button functionality
  const addCurrentChannelBtn = document.getElementById('addCurrentChannel');
  const removeCurrentChannelBtn = document.getElementById('removeCurrentChannel');
  const clearAllChannelsBtn = document.getElementById('clearAllChannels');
  const currentChannelStatus = document.getElementById('currentChannelStatus');

  // Get current channel helper function
  const getCurrentChannel = async () => {
    try {
      const tabs = await browser.tabs.query({ active: true, currentWindow: true });
      const activeTab = tabs[0];
      
      if (!activeTab || !activeTab.url || !activeTab.url.includes('youtube.com')) {
        return { error: 'Not on a YouTube page' };
      }

      const url = new URL(activeTab.url);
      const pathname = url.pathname;
      
      let channelId = '';
      if (pathname.startsWith('/@')) {
        channelId = pathname.split('/')[1]; // Gets @username
      } else if (pathname.startsWith('/channel/')) {
        channelId = '@' + pathname.split('/')[2]; // Convert to @format
      } else if (pathname.startsWith('/c/')) {
        channelId = '@' + pathname.split('/')[2]; // Convert to @format
      } else if (pathname.startsWith('/user/')) {
        channelId = '@' + pathname.split('/')[2]; // Convert to @format
      } else if (pathname === '/watch') {
        return { error: 'Go to channel page to add/remove' };
      } else {
        return { error: 'Not on a channel page' };
      }
      
      return { channelId };
    } catch (error) {
      return { error: 'Error getting channel info' };
    }
  };

  // Show status message helper
  const showStatus = (message, isError = false) => {
    currentChannelStatus.textContent = message;
    currentChannelStatus.style.color = isError ? '#dc2626' : '#059669';
    setTimeout(() => {
      currentChannelStatus.textContent = '';
      currentChannelStatus.style.color = '#666';
    }, 3000);
  };
  
  addCurrentChannelBtn.addEventListener('click', async () => {
    const result = await getCurrentChannel();
    if (result.error) {
      showStatus(result.error, true);
      return;
    }

    const textarea = document.forms[0].blockedChannels;
    const currentChannels = textarea.value.split('\n').filter(c => c.trim());
    
    if (!currentChannels.includes(result.channelId)) {
      if (textarea.value) {
        textarea.value += '\n' + result.channelId;
      } else {
        textarea.value = result.channelId;
      }
      showStatus(`Added ${result.channelId}`);
      document.forms[0].dispatchEvent(new Event('change'));
    } else {
      showStatus(`${result.channelId} already excluded`, true);
    }
  });

  removeCurrentChannelBtn.addEventListener('click', async () => {
    const result = await getCurrentChannel();
    if (result.error) {
      showStatus(result.error, true);
      return;
    }

    const textarea = document.forms[0].blockedChannels;
    const currentChannels = textarea.value.split('\n').filter(c => c.trim());
    
    if (currentChannels.includes(result.channelId)) {
      const newChannels = currentChannels.filter(c => c !== result.channelId);
      textarea.value = newChannels.join('\n');
      showStatus(`Removed ${result.channelId}`);
      document.forms[0].dispatchEvent(new Event('change'));
    } else {
      showStatus(`${result.channelId} not in list`, true);
    }
  });

  clearAllChannelsBtn.addEventListener('click', () => {
    if (confirm('Clear all excluded channels?')) {
      document.forms[0].blockedChannels.value = '';
      showStatus('Cleared all channels');
      document.forms[0].dispatchEvent(new Event('change'));
    }
  });

  // Save on change - with multiple event types for better responsiveness
  const saveOptions = async (event) => {
    console.log('Options page - Save triggered by:', event.type, 'on element:', event.target.name || event.target.id);
    
    const status = document.getElementById('status');
    status.textContent = `⏳ Saving...`;

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
      showWatchProgress: document.forms[0].showWatchProgress.checked,
      blockedChannels: blockedChannels,
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

    try {
      // Save immediately for responsiveness
      await browser.storage.local.set(optionsToSave);
      status.textContent = `Saved preferences`;
      console.log('Options page - Successfully saved');
    } catch (error) {
      console.error('Options page - Save error:', error);
      status.textContent = `❌ Error saving`;
    }
  };
  
  // Add event listeners to form for immediate response
  document.forms[0].addEventListener('change', saveOptions);
  document.forms[0].addEventListener('input', saveOptions);
  
  // Add individual listeners to checkboxes for extra reliability
  const checkboxes = document.forms[0].querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('click', (e) => {
      console.log('Checkbox clicked:', e.target.name, 'checked:', e.target.checked);
      saveOptions(e);
    });
    checkbox.addEventListener('change', (e) => {
      console.log('Checkbox changed:', e.target.name, 'checked:', e.target.checked);
      saveOptions(e);
    });
  });
  
  // Disable all form fields except 'disableEverywhere' when it is checked
  const form = document.forms[0];
  const disableEverywhereCheckbox = form.disableEverywhere;

  function setFormDisabled(disabled) {
    Array.from(form.elements).forEach(el => {
      if (el !== disableEverywhereCheckbox) {
        el.disabled = disabled;
      }
    });
  }

  // Initial state
  setFormDisabled(disableEverywhereCheckbox.checked);

  disableEverywhereCheckbox.addEventListener('change', function() {
    setFormDisabled(this.checked);
  });
});