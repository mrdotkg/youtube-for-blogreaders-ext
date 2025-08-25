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
#video-title.yt-simple-endpoint.ytd-grid-video-renderer,
#video-title.ytd-compact-video-renderer,
ytd-compact-video-renderer.use-ellipsis #video-title.ytd-compact-video-renderer,
#video-title.ytd-video-renderer,
#metadata-line.ytd-grid-video-renderer,
.ytp-videowall-still-info-title,
#video-title.ytd-playlist-panel-video-renderer,
#video-title.ytd-rich-grid-video-renderer,
#video-title.ytd-rich-grid-media,
h4.ytd-macro-markers-list-item-renderer {
  max-height: unset !important;
  -webkit-line-clamp: unset !important;
  word-wrap: break-word !important;
  line-height: 2rem !important;
  overflow: unset !important;
}

.ytp-videowall-still-info-content {
  background-image: linear-gradient(to bottom,rgba(12,12,12,0.8) 0,transparent 200px) !important;
}

ytd-playlist-video-renderer #progress.ytd-thumbnail-overlay-resume-playback-renderer::before {
  top: -66px;
  font-size: 9px;
}`
};

const EXTENSION_STYLE_ID = 'youtube-blog-readers-styles';

const updateElem = async () => {
  const options = await loadOptions();
  
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
  const existingStyle = document.querySelector(`#${EXTENSION_STYLE_ID}`);
  if (existingStyle) existingStyle.remove();
  
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
    const elem = document.createElement("style");
    elem.id = EXTENSION_STYLE_ID;
    elem.innerHTML = `/* YouTube for Blog Readers */\n${cssToApply}`;
    document.documentElement.appendChild(elem);
  }

  // Duration extraction
  if ((options.hideThumbnails || !options.hideDurationWhenThumbnailsAllowed) && !isDisabled) {
    setTimeout(() => extractDurations(), 2000);
  }
};

const extractDurations = () => {
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

// Update when settings change
browser.storage.onChanged.addListener(() => updateElem());

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
