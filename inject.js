// YouTube for Blog Readers Extension - Clean Version
/** @typedef {import("./common")} */

const css = {
  "hideThumbnails": `
ytd-thumbnail, ytd-playlist-thumbnail, .rich-thumbnail, .ytd-playlist-header-renderer.thumbnail-wrapper, #thumbnail, #video-preview, ytm-media-item .media-item-thumbnail-container, ytm-reel-item-renderer .video-thumbnail-container-vertical, ytm-playlist-video-renderer .compact-media-item-image, .ytp-videowall-still-image, .shortsLockupViewModelHostThumbnailContainer, .yt-lockup-view-model-wiz__content-image, #thumbnail-container, #text-image-container, .page-header-view-model-wiz__page-header-headline-image-hero-container, .yt-mini-game-card-view-model__thumbnail-wrapper, .ytd-display-ad-renderer #media-container, .ytwCompactLandscapeNoButtonLayoutViewModelHostImageHoverOverlayContainer, #card-thumbnail {
  display: none !important;
}

/* Layout adjustments when thumbnails are hidden */
ytd-rich-item-renderer, ytd-grid-video-renderer, ytd-video-renderer, ytd-compact-video-renderer {
  margin-top: -8px !important;
}

.yt-lockup-view-model-wiz, yt-lockup-view-model {
  padding-top: 4px !important;
}

ytd-rich-grid-media {
  margin-top: -6px !important;
}`,

  "hideChannelAvatars": `
/* Hide channel profile pictures/avatars */
.yt-lockup-metadata-view-model-wiz__avatar,
.yt-lockup-metadata-view-model-wiz__avatar yt-decorated-avatar-view-model,
.yt-lockup-metadata-view-model-wiz__avatar yt-avatar-shape,
.yt-lockup-metadata-view-model-wiz__avatar .yt-spec-avatar-shape,
ytd-rich-grid-media #avatar,
ytd-rich-grid-media #avatar-container,
ytd-rich-grid-media #avatar yt-decorated-avatar-view-model,
ytd-rich-grid-media #avatar yt-avatar-shape,
ytd-rich-grid-media #avatar .yt-spec-avatar-shape,
ytd-rich-grid-media .ytDecoratedAvatarViewModelHost,
#avatar-container.ytd-rich-grid-media,
#avatar.ytd-rich-grid-media,
ytd-guide-entry-renderer yt-img-shadow,
ytd-guide-entry-renderer .guide-icon,
ytd-guide-section-renderer ytd-guide-entry-renderer yt-img-shadow,
ytd-channel-avatar,
ytd-channel-avatar-editor,
yt-img-shadow.ytd-channel-avatar,
a.ytd-channel-avatar,
#avatar.ytd-channel-avatar,
ytd-rich-item-renderer ytd-channel-avatar,
ytd-rich-grid-media ytd-channel-avatar,
ytd-grid-video-renderer ytd-channel-avatar,
ytd-rich-grid-video-renderer ytd-channel-avatar,
ytd-video-renderer ytd-channel-avatar,
ytd-video-renderer.ytd-item-section-renderer ytd-channel-avatar,
ytd-grid-video-renderer.ytd-expanded-shelf-contents-renderer ytd-channel-avatar,
ytd-compact-video-renderer ytd-channel-avatar,
ytd-watch-next-secondary-results-renderer ytd-channel-avatar,
ytd-playlist-video-renderer ytd-channel-avatar,
ytd-playlist-panel-video-renderer ytd-channel-avatar,
ytd-video-renderer.ytd-browse-primary-contents-renderer ytd-channel-avatar,
ytd-browse-feed-actions-renderer ytd-channel-avatar,
ytd-grid-video-renderer.ytd-grid-renderer ytd-channel-avatar,
ytd-reel-item-renderer ytd-channel-avatar,
ytm-reel-item-renderer .channel-avatar,
ytd-shorts-video-renderer ytd-channel-avatar,
ytm-video-with-context-renderer .channel-avatar,
ytm-compact-video-renderer .channel-avatar,
ytm-video-thumbnail-view-model .channel-avatar,
#avatar.ytd-video-owner-renderer,
#avatar-link.ytd-video-owner-renderer,
#channel-thumbnail.ytd-video-owner-renderer,
.ytd-video-meta-block #avatar,
.ytd-video-owner-renderer #avatar,
.yt-content-metadata-view-model-wiz__avatar,
[class*="channel-avatar"],
[class*="channelAvatar"],
a[href*="/@"] img[src*="channel"],
a[href*="/channel/"] img[src*="channel"],
img.yt-img-shadow[src*="channel"]:not([src*="banner"]),
.ytp-ce-channel-metadata .ytp-ce-channel-image,
.ytp-channel-avatar {
  display: none !important;
}

/* Adjust spacing when avatars are hidden */
.yt-lockup-metadata-view-model-wiz__text-container,
ytd-rich-grid-media #details,
ytd-rich-grid-media #meta,
.ytd-video-meta-block,
.yt-content-metadata-view-model-wiz__metadata-row,
.ytd-channel-video-player-renderer #meta,
ytd-video-owner-renderer,
.ytd-video-owner-renderer,
ytd-compact-video-renderer #metadata,
.ytd-compact-video-renderer #metadata,
ytd-grid-video-renderer #metadata {
  margin-left: 0 !important;
  padding-left: 0 !important;
}

/* Preserve avatars in comments, channel headers, main video player */
ytd-comment-thread-renderer ytd-channel-avatar,
ytd-comment-renderer ytd-channel-avatar,
ytd-c4-tabbed-header-renderer ytd-channel-avatar,
ytd-channel-header-renderer ytd-channel-avatar,
ytd-video-owner-renderer.ytd-watch-metadata ytd-channel-avatar,
.ytp-chrome-bottom .ytd-channel-avatar {
  display: block !important;
}`,

  "showFullVideoTitles": `
/* Show full video titles with maximum specificity */
html body #video-title,
html body ytd-rich-item-renderer #video-title,
html body ytd-rich-grid-renderer #video-title,
html body ytd-rich-grid-media #video-title,
html body ytd-grid-video-renderer #video-title,
html body ytd-video-renderer #video-title,
html body ytd-compact-video-renderer #video-title,
html body yt-lockup-view-model h3,
html body yt-lockup-view-model .yt-core-attributed-string,
html body .yt-lockup-view-model-wiz h3,
html body .yt-lockup-view-model-wiz .yt-core-attributed-string,
html body [id*="video-title"],
html body [class*="video-title"],
html body a[href*="/watch"] h3,
html body a[href*="/watch"] span[role="text"] {
  max-height: none !important;
  -webkit-line-clamp: none !important;
  word-wrap: break-word !important;
  line-height: 1.4 !important;
  overflow: visible !important;
  white-space: normal !important;
  text-overflow: clip !important;
  display: block !important;
  height: auto !important;
  min-height: auto !important;
  max-width: none !important;
  width: auto !important;
}`,

  "watchProgressBar": `
/* Watch progress bar styles */
.ybr-progress-bar {
  width: 100%;
  height: 3px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  margin: 6px 0 2px 0;
  overflow: hidden;
}

.ybr-progress-fill {
  height: 100%;
  background-color: #ff0000;
  border-radius: 2px;
  transition: width 0.3s ease;
}

.ybr-progress-text {
  font-size: 11px;
  color: var(--yt-spec-text-secondary);
  margin: 2px 0;
  font-weight: 500;
}

/* Position progress info appropriately */
.ybr-progress-container {
  margin: 4px 0;
}
`
};

const EXTENSION_STYLE_ID = 'youtube-blog-readers-styles';

const updateElem = async () => {
  console.log('YouTube for Blog Readers - updateElem called');
  const options = await loadOptions();
  console.log('YouTube for Blog Readers - Current options:', options);
  
  // Check if current channel is blocked
  const isChannelBlocked = isCurrentChannelBlocked(options.blockedChannels);
  
  // Enhanced page detection
  const currentPath = window.location.pathname;
  const isHomePage = currentPath === '/' || currentPath === '';
  
  const isDisabled = options.disabledOnPages.everywhere
    || isChannelBlocked
    || (options.disabledOnPages.home && isHomePage)
    || (options.disabledOnPages.results && currentPath === '/results')
    || (options.disabledOnPages.channel && currentPath.startsWith('/@'))
    || (options.disabledOnPages.playlist && currentPath === '/playlist')
    || (options.disabledOnPages.watch && currentPath === '/watch')
    || (options.disabledOnPages.subscriptions && currentPath === '/feed/subscriptions')
    || (options.disabledOnPages.shorts && (currentPath === '/feed/subscriptions/shorts' || currentPath.startsWith('/shorts')));

  // Remove existing styles
  document.querySelectorAll(`[id^="${EXTENSION_STYLE_ID}"]`).forEach(el => el.remove());
  
  // Build CSS
  let cssToApply = '';
  
  if (options.hideThumbnails && !isDisabled) {
    cssToApply += css['hideThumbnails'];
  }
  
  if (options.showFullVideoTitles && !isDisabled) {
    cssToApply += '\n' + css['showFullVideoTitles'];
  }
  
  if (options.hideChannelAvatars && !isDisabled) {
    cssToApply += '\n' + css['hideChannelAvatars'];
  }
  
  // Add watch progress styles when needed
  if (options.showWatchProgress && !isDisabled) {
    cssToApply += '\n' + css['watchProgressBar'];
  }
  
  // Hide duration and progress when thumbnails are NOT hidden (i.e., when thumbnails are visible)
  if (!options.hideThumbnails && !isDisabled) {
    cssToApply += '\n/* Hide duration and progress when thumbnails are visible */\n.duration-added,\n.ybr-progress-container {\n  display: none !important;\n}';
  }
  
  // Add channel blocking CSS
  if (options.blockedChannels && options.blockedChannels.length > 0 && !isDisabled) {
    const blockedChannelSelectors = options.blockedChannels.map(channel => {
      const escapedChannel = channel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return `a[href*="/${escapedChannel}"], a[href*="${escapedChannel}"]`;
    }).join(', ');
    
    cssToApply += `\n/* Hide videos from blocked channels */\n` +
      `ytd-rich-item-renderer:has(${blockedChannelSelectors}),\n` +
      `ytd-grid-video-renderer:has(${blockedChannelSelectors}),\n` +
      `ytd-video-renderer:has(${blockedChannelSelectors}),\n` +
      `ytd-compact-video-renderer:has(${blockedChannelSelectors}),\n` +
      `yt-lockup-view-model:has(${blockedChannelSelectors}) {\n` +
      `  display: none !important;\n}`;
  }
  
  // Apply CSS if needed
  if (cssToApply.trim()) {
    console.log('YouTube for Blog Readers - Applying CSS:', cssToApply.substring(0, 200) + '...');
    const elem = document.createElement("style");
    elem.id = EXTENSION_STYLE_ID;
    elem.innerHTML = `/* YouTube for Blog Readers */\n${cssToApply}`;
    document.documentElement.appendChild(elem);
    console.log('YouTube for Blog Readers - CSS applied successfully');
  } else {
    console.log('YouTube for Blog Readers - No CSS to apply');
  }

  // Duration extraction - always show durations when thumbnails are hidden
  if (options.hideThumbnails && !isDisabled) {
    setTimeout(() => extractDurations(options), 1000);
    setTimeout(() => extractDurations(options), 3000);
  }
  
  // Watch progress extraction - show progress when option is enabled
  if (options.showWatchProgress && !isDisabled) {
    setTimeout(() => extractWatchProgress(), 1000);
    setTimeout(() => extractWatchProgress(), 3000);
    setTimeout(() => extractWatchProgress(), 5000);
  }
};

const extractDurations = (options) => {
  const thumbnails = document.querySelectorAll('ytd-rich-item-renderer, ytd-grid-video-renderer, ytd-video-renderer, ytd-compact-video-renderer, yt-lockup-view-model');
  
  thumbnails.forEach((thumbnail) => {
    if (thumbnail.querySelector('.duration-added')) return;
    
    // Find duration
    const durationElement = thumbnail.querySelector('.badge-shape-wiz__text, .ytd-thumbnail-overlay-time-status-renderer span');
    if (!durationElement) return;
    
    const duration = durationElement.textContent?.trim();
    if (!duration || !duration.includes(':') || duration.length > 15) return;
    
    // Find metadata container
    const metadataTargets = [
      '.yt-content-metadata-view-model-wiz__metadata-row:has(.yt-content-metadata-view-model-wiz__delimiter)',
      '.yt-content-metadata-view-model-wiz__metadata-row:not(:first-child)',
      '#metadata-line',
      '.ytd-compact-video-renderer #metadata-line'
    ];
    
    for (const selector of metadataTargets) {
      const metadataContainer = thumbnail.querySelector(selector);
      if (metadataContainer && !metadataContainer.querySelector('.duration-added')) {
        // Add duration
        const delimiter = document.createElement('span');
        delimiter.setAttribute('aria-hidden', 'true');
        delimiter.className = 'yt-content-metadata-view-model-wiz__delimiter';
        delimiter.textContent = ' • ';

        const durationSpan = document.createElement('span');
        durationSpan.className = 'yt-core-attributed-string yt-content-metadata-view-model-wiz__metadata-text duration-added';
        durationSpan.textContent = duration;
        durationSpan.style.color = 'var(--yt-spec-text-secondary)';

        metadataContainer.appendChild(delimiter);
        metadataContainer.appendChild(durationSpan);
        break;
      }
    }
  });
};

const extractWatchProgress = () => {
  const thumbnails = document.querySelectorAll('ytd-rich-item-renderer, ytd-grid-video-renderer, ytd-video-renderer, ytd-compact-video-renderer, yt-lockup-view-model');
  
  thumbnails.forEach((thumbnail) => {
    if (thumbnail.querySelector('.ybr-progress-container')) return;
    
    // Look for YouTube's built-in progress indicator with multiple possible selectors
    const progressSelectors = [
      'ytd-thumbnail-overlay-resume-playback-renderer #progress',
      '.ytd-thumbnail-overlay-resume-playback-renderer #progress',
      '[id="progress"]',
      '.style-scope.ytd-thumbnail-overlay-resume-playback-renderer[style*="width"]'
    ];
    
    let progressElement = null;
    let progressPercent = 0;
    
    // Try each selector until we find one
    for (const selector of progressSelectors) {
      progressElement = thumbnail.querySelector(selector);
      if (progressElement) {
        // Extract the width percentage from the style attribute
        const style = progressElement.getAttribute('style') || '';
        const widthMatch = style.match(/width:\s*(\d+(?:\.\d+)?)%/);
        if (widthMatch) {
          progressPercent = parseFloat(widthMatch[1]);
          break;
        }
      }
    }
    
    // If no progress element found, skip
    if (!progressElement || progressPercent === 0) return;
    
    // Only show progress if it's meaningful (more than 2%)
    // Include fully watched videos (100%) as they're important to show
    if (progressPercent < 2) return;
    
    // Find where to insert the progress indicator
    const titleContainer = thumbnail.querySelector('#video-title, h3, .yt-lockup-view-model-wiz__content-text');
    if (!titleContainer) return;
    
    // Create progress container
    const progressContainer = document.createElement('div');
    progressContainer.className = 'ybr-progress-container';
    
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'ybr-progress-bar';
    
    const progressFill = document.createElement('div');
    progressFill.className = 'ybr-progress-fill';
    progressFill.style.width = `${progressPercent}%`;
    
    progressBar.appendChild(progressFill);
    
    progressContainer.appendChild(progressBar);
    
    // Insert after title
    titleContainer.parentNode.insertBefore(progressContainer, titleContainer.nextSibling);
  });
};

// Update when settings change
browser.storage.onChanged.addListener((changes, area) => {
  console.log('YouTube for Blog Readers - Storage changed:', changes, 'in area:', area);
  updateElem();
});

// Also listen to local storage specifically
browser.storage.local.onChanged.addListener((changes) => {
  console.log('YouTube for Blog Readers - Local storage changed:', changes);
  updateElem();
});

// Update on page navigation
let lastPathname = window.location.pathname;
setInterval(() => {
  if (lastPathname !== window.location.pathname) {
    lastPathname = window.location.pathname;
    updateElem();
  }
}, 200);

// Initialize
updateElem();

// Set up a MutationObserver to handle dynamic content loading
const observer = new MutationObserver((mutations) => {
  let shouldUpdate = false;
  
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          // Check if new video items were added
          if (node.matches && (
            node.matches('ytd-rich-item-renderer, ytd-grid-video-renderer, ytd-video-renderer, ytd-compact-video-renderer, yt-lockup-view-model') ||
            node.querySelector('ytd-rich-item-renderer, ytd-grid-video-renderer, ytd-video-renderer, ytd-compact-video-renderer, yt-lockup-view-model')
          )) {
            shouldUpdate = true;
            break;
          }
        }
      }
    }
  });
  
  if (shouldUpdate) {
    setTimeout(async () => {
      const options = await loadOptions();
      const isChannelBlocked = isCurrentChannelBlocked(options.blockedChannels);
      const currentPath = window.location.pathname;
      const isHomePage = currentPath === '/' || currentPath === '';
      
      const isDisabled = options.disabledOnPages.everywhere
        || isChannelBlocked
        || (options.disabledOnPages.home && isHomePage)
        || (options.disabledOnPages.results && currentPath === '/results')
        || (options.disabledOnPages.channel && currentPath.startsWith('/@'))
        || (options.disabledOnPages.playlist && currentPath === '/playlist')
        || (options.disabledOnPages.watch && currentPath === '/watch')
        || (options.disabledOnPages.subscriptions && currentPath === '/feed/subscriptions')
        || (options.disabledOnPages.shorts && (currentPath === '/feed/subscriptions/shorts' || currentPath.startsWith('/shorts')));

      if (options.hideThumbnails && !isDisabled) {
        extractDurations(options);
      }
      
      if (options.showWatchProgress && !isDisabled) {
        extractWatchProgress();
      }
    }, 500);
  }
});

// Start observing
observer.observe(document.body, {
  childList: true,
  subtree: true
});
