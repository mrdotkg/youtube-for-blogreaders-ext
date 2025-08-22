/** @typedef {import("./common")} */

const css = {
  "normal": "/* Nothing to do */",
  "hidden": `
ytd-thumbnail, ytd-playlist-thumbnail, .rich-thumbnail, .ytd-playlist-header-renderer.thumbnail-wrapper, #thumbnail, #video-preview, ytm-media-item .media-item-thumbnail-container, ytm-reel-item-renderer .video-thumbnail-container-vertical, ytm-playlist-video-renderer .compact-media-item-image, .ytp-videowall-still-image, .shortsLockupViewModelHostThumbnailContainer, .yt-lockup-view-model-wiz__content-image, #thumbnail-container, #text-image-container, .page-header-view-model-wiz__page-header-headline-image-hero-container, .yt-mini-game-card-view-model__thumbnail-wrapper, .ytd-display-ad-renderer #media-container, .ytwCompactLandscapeNoButtonLayoutViewModelHostImageHoverOverlayContainer, #card-thumbnail {
  display: none !important;
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
/* Hide channel profile pictures/avatars */
ytd-channel-avatar, .ytd-channel-avatar, #avatar, .avatar, .channel-avatar, ytm-channel-avatar, .ytd-video-owner-renderer #avatar, .ytd-c4-tabbed-header-renderer #avatar, yt-img-shadow.ytd-channel-avatar-editor, .ytd-compact-video-renderer #channel-thumbnail {
  display: none !important;
}
/* Adjust spacing when avatars are hidden */
.ytd-video-meta-block[hidden-avatar] {
  margin-left: 0 !important;
}
.ytd-channel-video-player-renderer #meta {
  margin-left: 0 !important;
}`
};

const elem = document.createElement("style");
document.documentElement.appendChild(elem);

const updateElem = async () => {
  const options = await loadOptions()

  const isDisabled = options.disabledOnPages.everywhere
    || (options.disabledOnPages.results && window.location.pathname === '/results')
    || (options.disabledOnPages.channel && window.location.pathname.startsWith('/@'))
    || (options.disabledOnPages.playlist && window.location.pathname === '/playlist')
    || (options.disabledOnPages.watch && window.location.pathname === '/watch')
    || (options.disabledOnPages.subscriptions && window.location.pathname === '/feed/subscriptions');

  // Universal duration extraction that works across all YouTube pages
  const findThumbnails = (retryCount = 0) => {
    console.log(`Starting universal duration extraction... (attempt ${retryCount + 1}) on ${window.location.pathname}`);

    const allDivs = document.querySelectorAll('div');
    console.log(`Total divs on page: ${allDivs.length}`);

    // Wait for more content to load
    if (allDivs.length < 50) {
      console.log('Page not fully loaded yet, retrying in 2 seconds...');
      setTimeout(() => findThumbnails(retryCount + 1), 2000);
      return;
    }

    // Check for actual video content, not just skeletons
    const nonSkeletonElements = document.querySelectorAll('div:not([class*="skeleton"])');
    const hasRealContent = nonSkeletonElements.length > 20;

    if (!hasRealContent && retryCount < 5) {
      console.log('Only skeleton content found, retrying in 2 seconds...');
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

    // Extract duration and add to metadata
    thumbnails.forEach((thumbnail, index) => {
      try {
        // Universal duration selectors based on YouTube's current structure
        const durationSelectors = [
          // Most common duration overlay (works on most pages)
          '.ytd-thumbnail-overlay-time-status-renderer .badge-shape-wiz__text',
          '.ytd-thumbnail-overlay-time-status-renderer span[aria-label]',
          '.ytd-thumbnail-overlay-time-status-renderer',
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
            // Home page and search results
            '.yt-content-metadata-view-model-wiz__metadata-row',
            // Channel pages
            '#metadata-line',
            // Playlist pages
            '.ytd-playlist-video-renderer #meta',
            // Watch page sidebar
            '.ytd-compact-video-renderer #metadata-line',
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
  };

  // Apply CSS immediately for hiding thumbnails and optionally channel avatars
  let cssToApply = '';
  
  if (!isDisabled) {
    cssToApply += css['hidden']; // Always hide thumbnails when enabled
  }
  
  // TODO: Channel avatar hiding feature - coming soon
  // if (options.hideChannelAvatars && !isDisabled) {
  //   cssToApply += '\n' + css['hideChannelAvatars'];
  // }
  
  elem.innerHTML = `/* Injected by the YouTube Without Thumbnails extension */
  ${cssToApply}`;

  // Start looking for thumbnails after waiting for content to load (for duration extraction only)
  setTimeout(() => findThumbnails(0), 2000);
}

// Update when settings are changed
browser.storage.onChanged.addListener(updateElem)

// Update when moving page
// Also see https://github.com/domdomegg/hideytthumbnails-extension/issues/17
// In future we should use the Navigation API when it's supported in Firefox
// https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API
let lastPathname = window.location.pathname;
setInterval(() => {
  if (lastPathname !== window.location.pathname) {
    lastPathname = window.location.pathname
    updateElem();
  }
}, 200);

// Initialize on load
updateElem()