// TODO: Consider adding accessibility improvements
// TODO: Add more granular control for different video types
// TODO: Performance optimizations for large pages
/** @typedef {import("./common")} */
const css = {
  "hideThumbnails": `
ytd-thumbnail, ytd-playlist-thumbnail, .rich-thumbnail, .ytd-playlist-header-renderer.thumbnail-wrapper, #thumbnail, #video-preview, ytm-media-item .media-item-thumbnail-container, ytm-reel-item-renderer .video-thumbnail-container-vertical, ytm-playlist-video-renderer .compact-media-item-image, .ytp-videowall-still-image, .shortsLockupViewModelHostThumbnailContainer, .yt-lockup-view-model-wiz__content-image, #thumbnail-container, #text-image-container, .page-header-view-model-wiz__page-header-headline-image-hero-container, .yt-mini-game-card-view-model__thumbnail-wrapper, .ytd-display-ad-renderer #media-container, .ytwCompactLandscapeNoButtonLayoutViewModelHostImageHoverOverlayContainer, #card-thumbnail {
  display: none !important;
}

/* Lower thumbnail containers to compensate for glass div when thumbnails are hidden */
ytd-rich-item-renderer, ytd-grid-video-renderer, ytd-video-renderer, ytd-compact-video-renderer {
  margin-top: -8px !important;
}

/* Adjust spacing for video cards when thumbnails are hidden */
.yt-lockup-view-model-wiz, yt-lockup-view-model {
  padding-top: 4px !important;
}

/* Additional spacing adjustments for different layouts */
ytd-rich-grid-media {
  margin-top: -6px !important;
}

ytm-reel-shelf-renderer .reel-shelf-items>* {
  height: auto !important;
  align-items: flex-start !important;
}
ytm-reel-item-renderer .reel-item-metadata {
  position: static !important;
}
.ytp-videowall-still-info-content {
  opacity: 1 !important;
}`,
  "hideChannelAvatars": `
/* Hide channel profile pictures/avatars in video listings */

/* NEW YOUTUBE LAYOUT 2025 - Primary selectors */
.yt-lockup-metadata-view-model-wiz__avatar,
.yt-lockup-metadata-view-model-wiz__avatar yt-decorated-avatar-view-model,
.yt-lockup-metadata-view-model-wiz__avatar yt-avatar-shape,
.yt-lockup-metadata-view-model-wiz__avatar .yt-spec-avatar-shape,

/* SUBSCRIPTIONS PAGE 2025 - Rich Grid Media avatars */
ytd-rich-grid-media #avatar,
ytd-rich-grid-media #avatar-container,
ytd-rich-grid-media #avatar yt-decorated-avatar-view-model,
ytd-rich-grid-media #avatar yt-avatar-shape,
ytd-rich-grid-media #avatar .yt-spec-avatar-shape,
ytd-rich-grid-media .ytDecoratedAvatarViewModelHost,

/* Alternative subscription page selectors */
#avatar-container.ytd-rich-grid-media,
#avatar.ytd-rich-grid-media,

/* SIDEBAR SUBSCRIPTIONS - Guide entry avatars */
ytd-guide-entry-renderer yt-img-shadow,
ytd-guide-entry-renderer .guide-icon,
ytd-guide-section-renderer ytd-guide-entry-renderer yt-img-shadow,

/* Universal channel avatar selectors - Legacy support */
ytd-channel-avatar,
ytd-channel-avatar-editor,
yt-img-shadow.ytd-channel-avatar,
a.ytd-channel-avatar,
#avatar.ytd-channel-avatar,

/* Specific contexts for channel avatars */
/* Home page video listings */
ytd-rich-item-renderer ytd-channel-avatar,
ytd-rich-grid-media ytd-channel-avatar,
ytd-grid-video-renderer ytd-channel-avatar,
ytd-rich-grid-video-renderer ytd-channel-avatar,

/* Search results and video listings */
ytd-video-renderer ytd-channel-avatar,
ytd-video-renderer.ytd-item-section-renderer ytd-channel-avatar,
ytd-grid-video-renderer.ytd-expanded-shelf-contents-renderer ytd-channel-avatar,

/* Watch page sidebar recommendations */
ytd-compact-video-renderer ytd-channel-avatar,
ytd-watch-next-secondary-results-renderer ytd-channel-avatar,

/* Playlist pages */
ytd-playlist-video-renderer ytd-channel-avatar,
ytd-playlist-panel-video-renderer ytd-channel-avatar,

/* Subscriptions and history pages */
ytd-video-renderer.ytd-browse-primary-contents-renderer ytd-channel-avatar,
ytd-browse-feed-actions-renderer ytd-channel-avatar,

/* Channel page video grids */
ytd-grid-video-renderer.ytd-grid-renderer ytd-channel-avatar,

/* Shorts and reels */
ytd-reel-item-renderer ytd-channel-avatar,
ytm-reel-item-renderer .channel-avatar,
ytd-shorts-video-renderer ytd-channel-avatar,

/* Mobile versions */
ytm-video-with-context-renderer .channel-avatar,
ytm-compact-video-renderer .channel-avatar,
ytm-video-thumbnail-view-model .channel-avatar,

/* Alternative ID-based selectors */
#avatar.ytd-video-owner-renderer,
#avatar-link.ytd-video-owner-renderer,
#channel-thumbnail.ytd-video-owner-renderer,
.ytd-video-meta-block #avatar,
.ytd-video-owner-renderer #avatar,

/* Additional new layout selectors */
.yt-content-metadata-view-model-wiz__avatar,
[class*="channel-avatar"],
[class*="channelAvatar"],

/* Comprehensive fallback selectors */
a[href*="/@"] img[src*="channel"],
a[href*="/channel/"] img[src*="channel"],
img.yt-img-shadow[src*="channel"]:not([src*="banner"]),

/* End screen and overlay avatars */
.ytp-ce-channel-metadata .ytp-ce-channel-image,
.ytp-channel-avatar {
  display: none !important;
}

/* Adjust spacing when avatars are hidden - NEW LAYOUT */
.yt-lockup-metadata-view-model-wiz__text-container {
  margin-left: 0 !important;
  padding-left: 0 !important;
}

/* Adjust spacing for subscription page (rich-grid-media) */
ytd-rich-grid-media #details {
  margin-left: 0 !important;
  padding-left: 0 !important;
}

ytd-rich-grid-media #meta {
  margin-left: 0 !important;
  padding-left: 0 !important;
}

/* Legacy spacing adjustments */
.ytd-video-meta-block,
.yt-content-metadata-view-model-wiz__metadata-row {
  margin-left: 0 !important;
  padding-left: 0 !important;
}

.ytd-channel-video-player-renderer #meta {
  margin-left: 0 !important;
}

/* Adjust video owner renderer spacing */
ytd-video-owner-renderer,
.ytd-video-owner-renderer {
  padding-left: 0 !important;
}

/* Adjust compact video renderer spacing */
ytd-compact-video-renderer #metadata,
.ytd-compact-video-renderer #metadata {
  margin-left: 0 !important;
}

/* Adjust grid layout when avatars are hidden */
ytd-grid-video-renderer #metadata {
  margin-left: 0 !important;
}

/* Preserve avatars in comments, channel headers, main video player, and user interface elements */
/* Exceptions - DO NOT hide these avatars */
ytd-comment-thread-renderer ytd-channel-avatar,
ytd-comment-renderer ytd-channel-avatar,
ytd-c4-tabbed-header-renderer ytd-channel-avatar,
ytd-channel-header-renderer ytd-channel-avatar,
ytd-video-owner-renderer.ytd-watch-metadata ytd-channel-avatar,
.ytp-chrome-bottom .ytd-channel-avatar {
  display: block !important;
}`,
  "showFullVideoTitles": `
/* Main video title selectors */
#video-title.yt-simple-endpoint.ytd-grid-video-renderer,
#video-title.ytd-compact-video-renderer,
ytd-compact-video-renderer.use-ellipsis #video-title.ytd-compact-video-renderer {
	max-height: unset !important;
	-webkit-line-clamp: unset !important;
	word-wrap: break-word !important;
}

/* For the history page */
#video-title.ytd-video-renderer {
    max-height: unset !important;
    line-height: 2rem !important;
}

/* For metadata lines to show full text */
#metadata-line.ytd-grid-video-renderer {
	max-height: unset !important;
}

/* For end screen video tiles on hover */
.ytp-videowall-still-info-title {
    max-height: unset !important;
}
    
/* Dark background for end screen video tiles text */
.ytp-videowall-still-info-content {
    background-image: -moz-linear-gradient(top,rgba(12,12,12,0.8) 0,transparent 200px) !important;
    background-image: -ms-linear-gradient(top,rgba(12,12,12,0.8) 0,transparent 200px) !important;
    background-image: -o-linear-gradient(top,rgba(12,12,12,0.8) 0,transparent 200px) !important;
    background-image: -webkit-linear-gradient(top,rgba(12,12,12,0.8) 0,transparent 200px) !important;
    background-image: linear-gradient(to bottom,rgba(12,12,12,0.8) 0,transparent 200px) !important;
}

/* For playlists */
#video-title.ytd-playlist-panel-video-renderer {
    max-height: unset !important;
    -webkit-line-clamp: unset !important;
}

/* For new homepage design */
#video-title.ytd-rich-grid-video-renderer {
    max-height: unset !important;
    overflow: unset !important;
    -webkit-line-clamp: unset !important;
}

/* For homepage recommendations */
#video-title.ytd-rich-grid-media {
    -webkit-line-clamp: unset !important;
    max-height: unset !important;
}

/* For video chapter titles */
h4.ytd-macro-markers-list-item-renderer {
    max-height: unset !important;
    -webkit-line-clamp: unset !important;
}

/* For playlists progress indicator adjustment */
ytd-playlist-video-renderer #progress.ytd-thumbnail-overlay-resume-playback-renderer::before {
    top: -66px;
    font-size: 9px;
}`
};

// Create a unique identifier for our style element
const EXTENSION_STYLE_ID = 'youtube-blog-readers-styles';

// Function to get or create our style element
const getStyleElement = () => {
  // Remove any existing style elements first
  const existingStyles = document.querySelectorAll(`#${EXTENSION_STYLE_ID}`);
  existingStyles.forEach(el => el.remove());
  
  // Create fresh style element
  const elem = document.createElement("style");
  elem.id = EXTENSION_STYLE_ID;
  document.documentElement.appendChild(elem);
  return elem;
};

const updateElem = async () => {
  const options = await loadOptions()
  
  console.log('YouTube for Blog Readers - Options loaded:', {
    hideThumbnails: options.hideThumbnails,
    hideChannelAvatars: options.hideChannelAvatars,
    showFullVideoTitles: options.showFullVideoTitles
  });

  // Check if current channel is blocked
  const isChannelBlocked = isCurrentChannelBlocked(options.blockedChannels);

  // Enhanced page detection with home page support
  const currentPath = window.location.pathname;
  const isHomePage = currentPath === '/' || currentPath === '';
  
  const isDisabled = options.disabledOnPages.everywhere
    || isChannelBlocked // Disable on blocked channels
    || (options.disabledOnPages.home && isHomePage)
    || (options.disabledOnPages.results && currentPath === '/results')
    || (options.disabledOnPages.channel && currentPath.startsWith('/@'))
    || (options.disabledOnPages.playlist && currentPath === '/playlist')
    || (options.disabledOnPages.watch && currentPath === '/watch')
    || (options.disabledOnPages.subscriptions && currentPath === '/feed/subscriptions')
    || (options.disabledOnPages.shorts && (currentPath === '/feed/subscriptions/shorts' || currentPath.startsWith('/shorts')));

  console.log('YouTube for Blog Readers - isDisabled:', isDisabled);

  // SIMPLE APPROACH: Just remove and recreate the style element
  const existingStyle = document.querySelector(`#${EXTENSION_STYLE_ID}`);
  if (existingStyle) {
    existingStyle.remove();
  }
  
  // Only add CSS if features are enabled and not disabled
  let cssToApply = '';
  
  if (options.hideThumbnails && !isDisabled) {
    console.log('YouTube for Blog Readers - Adding thumbnail hiding CSS');
    cssToApply += css['hideThumbnails'];
  }
  
  if (options.showFullVideoTitles && !isDisabled) {
    console.log('YouTube for Blog Readers - Adding full video titles CSS');
    cssToApply += '\n' + css['showFullVideoTitles'];
  }
  
  if (options.hideChannelAvatars && !isDisabled) {
    console.log('YouTube for Blog Readers - Adding channel avatar hiding CSS');
    cssToApply += '\n' + css['hideChannelAvatars'];
  }
  
  // Add per-video blocking for blocked channels on listing pages
  if (options.blockedChannels && options.blockedChannels.length > 0 && !isDisabled) {
    const blockedChannelSelectors = options.blockedChannels.map(channel => {
      const escapedChannel = channel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return [
        'a[href*="/' + escapedChannel + '"]',
        'a[href*="' + escapedChannel + '"]'
      ].join(', ');
    }).join(', ');
    
    cssToApply += '\n/* Hide videos from blocked channels on listing pages */\n' +
      'ytd-rich-item-renderer:has(' + blockedChannelSelectors + '),\n' +
      'ytd-grid-video-renderer:has(' + blockedChannelSelectors + '),\n' +
      'ytd-video-renderer:has(' + blockedChannelSelectors + '),\n' +
      'ytd-compact-video-renderer:has(' + blockedChannelSelectors + '),\n' +
      'yt-lockup-view-model:has(' + blockedChannelSelectors + ') {\n' +
      '  display: none !important;\n' +
      '}';
  }
  
  // Apply CSS only if there's something to apply
  if (cssToApply.trim()) {
    const elem = document.createElement("style");
    elem.id = EXTENSION_STYLE_ID;
    elem.innerHTML = `/* Injected by the YouTube for Blog Readers extension */\n${cssToApply}`;
    document.documentElement.appendChild(elem);
    console.log('YouTube for Blog Readers - CSS applied');
  } else {
    console.log('YouTube for Blog Readers - No CSS applied (all features disabled)');
  }

// Manual functions for debugging (can be called from browser console)
window.ytBlogReadersDebug = {
  clearAllStyles: () => {
    const styles = document.querySelectorAll(`#${EXTENSION_STYLE_ID}, style`);
    styles.forEach(style => {
      if (style.innerHTML && style.innerHTML.includes('YouTube for Blog Readers')) {
        console.log('Removing extension style element:', style);
        style.remove();
      }
    });
    console.log('All YouTube for Blog Readers styles cleared');
  },
  
  getCurrentOptions: async () => {
    const options = await loadOptions();
    console.log('Current options:', options);
    return options;
  },
  
  forceUpdate: () => {
    console.log('Forcing extension update...');
    updateElem();
  },
  
  forceUpdateWithClear: async () => {
    console.log('Forcing complete reset...');
    ytBlogReadersDebug.clearAllStyles();
    setTimeout(() => updateElem(), 100);
  },
  
  testStorageDirectly: async () => {
    const rawStorage = await new Promise(resolve => {
      browser.storage.local.get(null, resolve);
    });
    console.log('Raw storage contents:', rawStorage);
    return rawStorage;
  },
  
  testOptionToggle: async () => {
    console.log('=== TESTING OPTION TOGGLE ===');
    
    // Check current storage
    const currentStorage = await new Promise(resolve => {
      browser.storage.local.get(null, resolve);
    });
    console.log('1. Current storage before toggle:', currentStorage);
    console.log('   hideThumbnails in storage:', currentStorage.hideThumbnails, typeof currentStorage.hideThumbnails);
    
    // Check loaded options
    const currentOptions = await loadOptions();
    console.log('2. Current loaded options:', currentOptions);
    console.log('   hideThumbnails loaded:', currentOptions.hideThumbnails, typeof currentOptions.hideThumbnails);
    
    // Force set to false and test
    console.log('3. Setting hideThumbnails to false...');
    await new Promise(resolve => {
      browser.storage.local.set({ hideThumbnails: false }, resolve);
    });
    
    // Verify it was saved
    const afterSave = await new Promise(resolve => {
      browser.storage.local.get(null, resolve);
    });
    console.log('4. Storage after setting to false:', afterSave);
    console.log('   hideThumbnails after save:', afterSave.hideThumbnails, typeof afterSave.hideThumbnails);
    
    console.log('5. Forcing extension update...');
    setTimeout(() => {
      ytBlogReadersDebug.forceUpdate();
    }, 100);
  },
  
  testThumbnailOption: async () => {
    console.log('=== THUMBNAIL OPTION TEST ===');
    const options = await loadOptions();
    console.log('hideThumbnails value:', options.hideThumbnails);
    console.log('hideThumbnails type:', typeof options.hideThumbnails);
    console.log('hideThumbnails === true:', options.hideThumbnails === true);
    console.log('hideThumbnails === false:', options.hideThumbnails === false);
    
    return options.hideThumbnails;
  },
  
  forceShowThumbnails: () => {
    console.log('Force showing all thumbnails...');
    
    // Remove all extension styles
    ytBlogReadersDebug.clearAllStyles();
    
    // Add aggressive CSS to force show thumbnails
    const forceShowStyle = document.createElement('style');
    forceShowStyle.id = 'force-show-thumbnails';
    forceShowStyle.innerHTML = `
      /* NUCLEAR OPTION - FORCE SHOW ALL THUMBNAILS */
      ytd-thumbnail, 
      ytd-playlist-thumbnail, 
      .rich-thumbnail, 
      .ytd-playlist-header-renderer.thumbnail-wrapper, 
      #thumbnail, 
      #video-preview, 
      ytm-media-item .media-item-thumbnail-container, 
      ytm-reel-item-renderer .video-thumbnail-container-vertical, 
      ytm-playlist-video-renderer .compact-media-item-image, 
      .ytp-videowall-still-image, 
      .shortsLockupViewModelHostThumbnailContainer, 
      .yt-lockup-view-model-wiz__content-image, 
      #thumbnail-container, 
      #text-image-container, 
      .page-header-view-model-wiz__page-header-headline-image-hero-container, 
      .yt-mini-game-card-view-model__thumbnail-wrapper, 
      .ytd-display-ad-renderer #media-container, 
      .ytwCompactLandscapeNoButtonLayoutViewModelHostImageHoverOverlayContainer, 
      #card-thumbnail,
      ytd-thumbnail img,
      ytd-playlist-thumbnail img,
      .rich-thumbnail img,
      #thumbnail img,
      #video-preview img,
      .yt-lockup-view-model-wiz__content-image img,
      #thumbnail-container img,
      #card-thumbnail img {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        height: auto !important;
        width: auto !important;
        max-height: none !important;
        max-width: none !important;
        min-height: auto !important;
        min-width: auto !important;
        overflow: visible !important;
        clip: auto !important;
        clip-path: none !important;
        transform: none !important;
        position: relative !important;
        left: auto !important;
        top: auto !important;
        right: auto !important;
        bottom: auto !important;
        margin: initial !important;
        padding: initial !important;
        border: none !important;
        outline: none !important;
        filter: none !important;
        backdrop-filter: none !important;
        mask: none !important;
        -webkit-mask: none !important;
      }
      
      /* Reset any spacing adjustments */
      ytd-rich-item-renderer, ytd-grid-video-renderer, ytd-video-renderer, ytd-compact-video-renderer {
        margin-top: 0 !important;
        margin-bottom: 0 !important;
        padding-top: 0 !important;
        padding-bottom: 0 !important;
      }
      
      .yt-lockup-view-model-wiz, yt-lockup-view-model {
        padding-top: 0 !important;
        padding-bottom: 0 !important;
        margin-top: 0 !important;
        margin-bottom: 0 !important;
      }
      
      ytd-rich-grid-media {
        margin-top: 0 !important;
        margin-bottom: 0 !important;
        padding-top: 0 !important;
        padding-bottom: 0 !important;
      }
      
      /* Override inline styles */
      [style*="display: none"],
      [style*="visibility: hidden"],
      [style*="opacity: 0"] {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
      }
    `;
    document.head.appendChild(forceShowStyle);
    console.log('Nuclear force show thumbnails CSS applied');
  },
  
  removeForcedStyles: () => {
    const forceStyle = document.querySelector('#force-show-thumbnails');
    if (forceStyle) {
      forceStyle.remove();
      console.log('Removed forced thumbnail styles');
    }
  },
  
  showCurrentCSS: () => {
    const styleEl = document.querySelector(`#${EXTENSION_STYLE_ID}`);
    if (styleEl) {
      console.log('Current CSS:', styleEl.innerHTML);
    } else {
      console.log('No extension style element found');
    }
  },
  
  fullDiagnostic: async () => {
    console.log('=== FULL DIAGNOSTIC ===');
    
    // 1. Check raw storage
    const rawStorage = await new Promise(resolve => {
      browser.storage.local.get(null, resolve);
    });
    console.log('1. Raw storage:', rawStorage);
    
    // 2. Check loaded options
    const options = await loadOptions();
    console.log('2. Loaded options:', options);
    
    // 3. Check CSS element
    const styleEl = document.querySelector(`#${EXTENSION_STYLE_ID}`);
    console.log('3. Style element exists:', !!styleEl);
    if (styleEl) {
      console.log('   Style element content length:', styleEl.innerHTML.length);
      console.log('   Contains thumbnail hiding CSS:', styleEl.innerHTML.includes('display: none !important'));
      console.log('   Contains force show CSS:', styleEl.innerHTML.includes('display: block !important'));
    }
    
    // 4. Check actual thumbnail visibility
    const thumbnails = document.querySelectorAll('ytd-thumbnail, #thumbnail');
    console.log('4. Found', thumbnails.length, 'thumbnail elements');
    if (thumbnails.length > 0) {
      const firstThumb = thumbnails[0];
      const computedStyle = window.getComputedStyle(firstThumb);
      console.log('   First thumbnail display:', computedStyle.display);
      console.log('   First thumbnail visibility:', computedStyle.visibility);
      console.log('   First thumbnail opacity:', computedStyle.opacity);
    }
    
    // 5. Test storage listener
    console.log('5. Testing storage change...');
    const currentHideValue = options.hideThumbnails;
    const newValue = !currentHideValue;
    console.log('   Changing hideThumbnails from', currentHideValue, 'to', newValue);
    
    await new Promise(resolve => {
      browser.storage.local.set({ hideThumbnails: newValue }, resolve);
    });
    
    // Wait a bit and check again
    setTimeout(async () => {
      const updatedOptions = await loadOptions();
      console.log('6. After storage change - hideThumbnails is now:', updatedOptions.hideThumbnails);
      
      const styleElAfter = document.querySelector(`#${EXTENSION_STYLE_ID}`);
      if (styleElAfter) {
        console.log('   CSS updated? Length changed from', styleEl?.innerHTML.length || 0, 'to', styleElAfter.innerHTML.length);
        console.log('   Now contains hiding CSS:', styleElAfter.innerHTML.includes('display: none !important'));
        console.log('   Now contains show CSS:', styleElAfter.innerHTML.includes('display: block !important'));
      }
      
      // Change back to original value
      setTimeout(() => {
        browser.storage.local.set({ hideThumbnails: currentHideValue });
      }, 1000);
    }, 500);
  }
};

  // Universal duration extraction that works across all YouTube pages
  // Only extract and show duration when thumbnails are hidden OR when the option allows it
  const shouldShowDuration = options.hideThumbnails || !options.hideDurationWhenThumbnailsAllowed;
  
  if (shouldShowDuration && !isDisabled) {
    let isProcessing = false;
    let processedElements = new Set();
  
    const findThumbnails = (retryCount = 0) => {
      if (isProcessing) {
        console.log('Duration extraction already in progress, skipping...');
        return;
      }
      
      isProcessing = true;
      console.log(`Starting universal duration extraction... (attempt ${retryCount + 1}) on ${window.location.pathname}`);

      const allDivs = document.querySelectorAll('div');
      console.log(`Total divs on page: ${allDivs.length}`);

      // Wait for more content to load
      if (allDivs.length < 50) {
        console.log('Page not fully loaded yet, retrying in 2 seconds...');
        isProcessing = false;
        if (retryCount < 3) {
          setTimeout(() => findThumbnails(retryCount + 1), 2000);
        }
        return;
      }

      // Check for actual video content, not just skeletons
      const nonSkeletonElements = document.querySelectorAll('div:not([class*="skeleton"])');
      const hasRealContent = nonSkeletonElements.length > 20;

      if (!hasRealContent && retryCount < 3) {
        console.log('Only skeleton content found, retrying in 2 seconds...');
        isProcessing = false;
        setTimeout(() => findThumbnails(retryCount + 1), 2000);
        return;
      }

      // Universal thumbnail selectors for all YouTube pages
      const universalThumbnailSelectors = [
        // Home page and search results
        'ytd-rich-item-renderer',
        'ytd-grid-video-renderer',
        'ytd-video-renderer',
        // Channel pages
        'ytd-grid-video-renderer',
        // Playlist pages
        'ytd-playlist-video-renderer',
        // Watch page (sidebar and end screen)
        'ytd-compact-video-renderer',
        'ytd-endscreen-video-renderer',
        // Video recommendations beside player (new layout)
        'yt-lockup-view-model',
        // Mobile and other formats
        'ytm-video-with-context-renderer',
        'ytm-compact-video-renderer',
        // Shorts
        'ytd-reel-item-renderer',
        'ytm-reel-item-renderer'
      ];

      const thumbnailQuery = universalThumbnailSelectors.join(', ');
      const thumbnails = document.querySelectorAll(thumbnailQuery);
      console.log(`Found ${thumbnails.length} thumbnails with universal selectors.`);

      // Special debug logging for yt-lockup-view-model elements
      const lockupElements = document.querySelectorAll('yt-lockup-view-model');
      console.log(`Found ${lockupElements.length} yt-lockup-view-model elements specifically.`);
      if (lockupElements.length > 0) {
        console.log('First lockup element:', lockupElements[0]);
        const durationInLockup = lockupElements[0].querySelector('.badge-shape-wiz__text');
        console.log('Duration found in first lockup:', durationInLockup?.textContent);
        const metadataInLockup = lockupElements[0].querySelector('.yt-content-metadata-view-model-wiz__metadata-row');
        console.log('Metadata row found in first lockup:', metadataInLockup);
      }

      // Extract duration and add to metadata
      thumbnails.forEach((thumbnail, index) => {
        try {
          // Skip if already processed
          if (processedElements.has(thumbnail)) {
            return;
          }
          
          // Mark as processed
          processedElements.add(thumbnail);
          
          // Check if this specific video is from a blocked channel
          if (isVideoFromBlockedChannel(thumbnail, options.blockedChannels)) {
            console.log(`Skipping thumbnail ${index + 1} - from blocked channel`);
            return;
          }
          
          // Special handling for yt-lockup-view-model elements
          if (thumbnail.tagName === 'YT-LOCKUP-VIEW-MODEL') {
            console.log(`Processing yt-lockup-view-model element ${index + 1}`);
            
            // Skip if duration already added
            if (thumbnail.querySelector('.duration-added')) {
              console.log(`Duration already added to lockup element ${index + 1}`);
              return;
            }
            
            // Find duration in the specific structure
            const durationElement = thumbnail.querySelector('.badge-shape-wiz__text');
            if (durationElement) {
              const duration = durationElement.textContent?.trim() || '';
              console.log(`Found duration in lockup ${index + 1}: "${duration}"`);
              
              if (duration.includes(':') && duration.length < 15 && /^\d+:\d+/.test(duration)) {
                // Find the metadata row with views and date (second row)
                const metadataRows = thumbnail.querySelectorAll('.yt-content-metadata-view-model-wiz__metadata-row');
                console.log(`Found ${metadataRows.length} metadata rows in lockup ${index + 1}`);
                
                // Target the row that has views (contains "views" text) and already has a delimiter
                let targetRow = null;
                for (const row of metadataRows) {
                  const hasViews = row.textContent.includes('views') || row.textContent.includes('view');
                  const hasDelimiter = row.querySelector('.yt-content-metadata-view-model-wiz__delimiter');
                  if (hasViews && hasDelimiter) {
                    targetRow = row;
                    break;
                  }
                }
                
                // If no views+delimiter row found, look for any row with delimiter (skip channel name row)
                if (!targetRow) {
                  for (const row of metadataRows) {
                    const hasDelimiter = row.querySelector('.yt-content-metadata-view-model-wiz__delimiter');
                    if (hasDelimiter) {
                      targetRow = row;
                      break;
                    }
                  }
                }
                
                // If still no target, use the second row (avoid first row which is usually channel name)
                if (!targetRow && metadataRows.length > 1) {
                  targetRow = metadataRows[1];
                }
                
                if (targetRow) {
                  console.log(`Adding duration to metadata row in lockup ${index + 1}`);
                  
                  // Create delimiter
                  const delimiter = document.createElement('span');
                  delimiter.setAttribute('aria-hidden', 'true');
                  delimiter.className = 'yt-content-metadata-view-model-wiz__delimiter';
                  delimiter.textContent = ' • ';

                  // Create duration span
                  const durationSpan = document.createElement('span');
                  durationSpan.className = 'yt-core-attributed-string yt-content-metadata-view-model-wiz__metadata-text duration-added';
                  durationSpan.setAttribute('dir', 'auto');
                  durationSpan.setAttribute('role', 'text');
                  durationSpan.textContent = duration;
                  durationSpan.style.color = 'var(--yt-spec-text-secondary)';

                  // Add both elements to metadata
                  targetRow.appendChild(delimiter);
                  targetRow.appendChild(durationSpan);
                  
                  console.log(`Successfully added duration "${duration}" to lockup element ${index + 1}`);
                  return; // Exit early for lockup elements
                } else {
                  console.log(`No suitable metadata row found in lockup element ${index + 1}`);
                }
              }
            } else {
              console.log(`No duration element found in lockup ${index + 1}`);
            }
            return; // Exit for lockup elements whether successful or not
          }

          // Original logic for other element types
          // Universal duration selectors based on YouTube's current structure
          const durationSelectors = [
            // Most common duration overlay (works on most pages)
            '.ytd-thumbnail-overlay-time-status-renderer .badge-shape-wiz__text',
            '.ytd-thumbnail-overlay-time-status-renderer span[aria-label]',
            '.ytd-thumbnail-overlay-time-status-renderer',
            // Video recommendations beside player (new layout)
            '.ytThumbnailBadgeViewModelHost .badge-shape-wiz__text',
            '.yt-thumbnail-badge-view-model .badge-shape-wiz__text',
            // Alternative overlay formats
            '.overlay-time-text',
            '.ytd-time-status-renderer',
            // Generic badge and span approaches
            '.badge-shape-wiz__text',
            'span[aria-label*=":"]',
            // Fallback: any span with time format
            'span'
          ];

          let durationFound = false;
          let duration = '';

          // Try each selector until we find a duration
          for (const selector of durationSelectors) {
            const durationElements = thumbnail.querySelectorAll(selector);

            for (const element of durationElements) {
              const text = element.innerText?.trim() || element.textContent?.trim() || '';

              // Check if this looks like a duration (contains colon and is short)
              if (text.includes(':') && text.length < 15 && /^\d+:\d+/.test(text)) {
                duration = text;
                durationFound = true;
                console.log(`Thumbnail ${index + 1}: Found duration "${duration}" using selector "${selector}"`);
                break;
              }
            }

            if (durationFound) break;
          }

          if (durationFound && duration) {
            // Universal metadata placement - try multiple approaches for different page types
            const metadataTargets = [
              // Home page and search results - target only the row with views/date, not channel name
              '.yt-content-metadata-view-model-wiz__metadata-row:has(.yt-content-metadata-view-model-wiz__delimiter)',
              '.yt-content-metadata-view-model-wiz__metadata-row:not(:first-child)',
              // Channel pages
              '#metadata-line',
              // Playlist pages
              '.ytd-playlist-video-renderer #meta',
              // Watch page sidebar
              '.ytd-compact-video-renderer #metadata-line',
              // Video recommendations beside player (new layout) - target the row with views/date
              '.yt-lockup-metadata-view-model-wiz .yt-content-metadata-view-model-wiz__metadata-row:nth-child(2)',
              '.yt-lockup-metadata-view-model-wiz .yt-content-metadata-view-model-wiz__metadata-row:has(.yt-content-metadata-view-model-wiz__delimiter)',
              // Fallback: any metadata container
              '[id*="metadata"]',
              '#details',
              '.details'
            ];

            let metadataPlaced = false;
            for (const targetSelector of metadataTargets) {
              const metadataContainer = thumbnail.querySelector(targetSelector);

              if (metadataContainer && !metadataContainer.querySelector('.duration-added')) {
                // Create delimiter
                const delimiter = document.createElement('span');
                delimiter.setAttribute('aria-hidden', 'true');
                delimiter.className = 'yt-content-metadata-view-model-wiz__delimiter';
                delimiter.textContent = ' • ';

                // Create duration span
                const durationSpan = document.createElement('span');
                durationSpan.className = 'yt-core-attributed-string yt-content-metadata-view-model-wiz__metadata-text duration-added';
                durationSpan.setAttribute('dir', 'auto');
                durationSpan.setAttribute('role', 'text');
                durationSpan.textContent = duration;
                durationSpan.style.color = 'var(--yt-spec-text-secondary)';

                // Add both elements to metadata
                metadataContainer.appendChild(delimiter);
                metadataContainer.appendChild(durationSpan);

                console.log(`Added duration "${duration}" to thumbnail ${index + 1} using target "${targetSelector}"`);
                metadataPlaced = true;
                break;
              }
            }

            if (!metadataPlaced) {
              console.log(`Could not find suitable metadata container for thumbnail ${index + 1} with duration "${duration}"`);
            }
          }
        } catch (error) {
          console.log(`Error processing thumbnail ${index + 1}:`, error);
        }
      });
      
      isProcessing = false;
      console.log('Duration extraction completed.');
    };

    // Start looking for thumbnails after waiting for content to load (for duration extraction only)
    setTimeout(() => findThumbnails(0), 2000);
    
    // Manual test function for debugging (can be called from console)
    window.testLockupElements = function() {
      console.log('=== MANUAL TEST ===');
      const lockupElements = document.querySelectorAll('yt-lockup-view-model');
      console.log(`Found ${lockupElements.length} yt-lockup-view-model elements`);
      
      const allElements = document.querySelectorAll('*[class*="lockup"], *[class*="yt-lockup"]');
      console.log(`Found ${allElements.length} elements with "lockup" in class name`);
      
      if (allElements.length > 0) {
        console.log('First lockup-like element:', allElements[0]);
        console.log('Its classes:', allElements[0].className);
      }
      
      // Check for other possible selectors
      const sidebarElements = document.querySelectorAll('ytd-compact-video-renderer, ytd-video-renderer');
      console.log(`Found ${sidebarElements.length} other video elements`);
      
      return { lockupElements, allElements, sidebarElements };
    };
    
    // Single additional check after 5 seconds for any late-loading content
    setTimeout(() => {
      if (!isProcessing) {
        findThumbnails(0);
      }
    }, 5000);
    
    // Scroll-based detection for newly loaded videos (infinite scroll)
    let scrollTimeout;
    let lastScrollCheck = 0;
    
    const handleScroll = () => {
      // Throttle scroll events
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const now = Date.now();
        // Only check once every 2 seconds during scrolling
        if (now - lastScrollCheck > 2000 && !isProcessing) {
          lastScrollCheck = now;
          console.log('Scroll detected - checking for new videos');
          findThumbnails(0);
        }
      }, 300); // 300ms delay after scroll stops
    };
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
  }
}

// Update when settings are changed
browser.storage.onChanged.addListener((changes, areaName) => {
  console.log('YouTube for Blog Readers - Settings changed, updating...');
  updateElem();
})

// Update when moving page
let lastPathname = window.location.pathname;
setInterval(() => {
  if (lastPathname !== window.location.pathname) {
    lastPathname = window.location.pathname
    console.log('Inject.js - Page navigation detected:', lastPathname);
    updateElem();
  }
}, 200);

// Initialize on load
(async () => {
  console.log('YouTube for Blog Readers - Extension initializing...');
  await updateElem();
  console.log('YouTube for Blog Readers - Extension ready');
})();
