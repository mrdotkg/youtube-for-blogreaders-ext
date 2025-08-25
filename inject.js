// Ensure browser polyfill is available
if (typeof browser === 'undefined') {
  window.browser = window.chrome;
}

const css = {
hideThumbnails: `ytd-thumbnail,ytd-playlist-thumbnail,.rich-thumbnail,#thumbnail,#video-preview,.shortsLockupViewModelHostThumbnailContainer,.yt-lockup-view-model-wiz__content-image,#thumbnail-container,.ytd-display-ad-renderer #media-container{display:none!important}
ytd-rich-item-renderer,ytd-grid-video-renderer,ytd-video-renderer,ytd-compact-video-renderer{margin-top:-8px!important}
.yt-lockup-view-model-wiz,yt-lockup-view-model{padding-top:4px!important}
ytd-rich-grid-media{margin-top:-6px!important}`,

hideChannelAvatars: `ytd-channel-avatar,[class*="avatar"],img.yt-img-shadow[src*="channel"]:not([src*="banner"]){display:none!important}
.yt-lockup-metadata-view-model-wiz__text-container,#details,#meta,#metadata{margin-left:0!important;padding-left:0!important}
ytd-comment-thread-renderer ytd-channel-avatar,ytd-comment-renderer ytd-channel-avatar,ytd-c4-tabbed-header-renderer ytd-channel-avatar,ytd-channel-header-renderer ytd-channel-avatar,ytd-video-owner-renderer.ytd-watch-metadata ytd-channel-avatar{display:block!important}`,

showFullVideoTitles: `#video-title,h3,.yt-core-attributed-string,[id*="video-title"],[class*="video-title"],a[href*="/watch"] h3{max-height:none!important;-webkit-line-clamp:none!important;overflow:visible!important;white-space:normal!important;text-overflow:clip!important;display:block!important;height:auto!important}`,

watchProgressBar: `.ybr-progress-bar{width:100%;height:3px;background-color:rgba(255,255,255,0.2);border-radius:2px;margin:6px 0 2px 0}
.ybr-progress-fill{height:100%;background-color:#ff0000;border-radius:2px;transition:width 0.3s ease}
.ybr-progress-container{margin:4px 0}`
};

const EXTENSION_STYLE_ID = 'youtube-blog-readers-styles';

const updateElem = async () => {
  try {
    // Check if required functions are available
    if (typeof loadOptions !== 'function') {
      console.error('YouTube for Blog Readers - loadOptions function not available');
      return;
    }
    if (typeof isCurrentChannelBlocked !== 'function') {
      console.error('YouTube for Blog Readers - isCurrentChannelBlocked function not available');
      return;
    }

    const options = await loadOptions();
    const isChannelBlocked = isCurrentChannelBlocked(options.blockedChannels);
    const currentPath = window.location.pathname;
    const isHomePage = currentPath === '/' || currentPath === '';
    
    const isDisabled = options.disabledOnPages.everywhere || isChannelBlocked || 
      (options.disabledOnPages.home && isHomePage) ||
      (options.disabledOnPages.results && currentPath === '/results') ||
      (options.disabledOnPages.channel && currentPath.startsWith('/@')) ||
      (options.disabledOnPages.playlist && currentPath === '/playlist') ||
      (options.disabledOnPages.watch && currentPath === '/watch') ||
      (options.disabledOnPages.subscriptions && currentPath === '/feed/subscriptions') ||
      (options.disabledOnPages.shorts && (currentPath === '/feed/subscriptions/shorts' || currentPath.startsWith('/shorts')));

    document.querySelectorAll(`[id^="${EXTENSION_STYLE_ID}"]`).forEach(el => el.remove());
    
    let cssToApply = '';
    
    if (options.hideThumbnails && !isDisabled) cssToApply += css.hideThumbnails;
    if (options.showFullVideoTitles && !isDisabled) cssToApply += css.showFullVideoTitles;
    if (options.hideChannelAvatars && !isDisabled) cssToApply += css.hideChannelAvatars;
    if (options.showWatchProgress && !isDisabled) cssToApply += css.watchProgressBar;
    
    if (!options.hideThumbnails && !isDisabled) {
      cssToApply += '.duration-added,.ybr-progress-container{display:none!important}';
    }
    
    if (options.blockedChannels?.length && !isDisabled) {
      const selectors = options.blockedChannels.map(ch => 
        `a[href*="/${ch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"]`).join(',');
      cssToApply += `ytd-rich-item-renderer:has(${selectors}),ytd-grid-video-renderer:has(${selectors}),ytd-video-renderer:has(${selectors}),ytd-compact-video-renderer:has(${selectors}),yt-lockup-view-model:has(${selectors}){display:none!important}`;
    }
    
    if (cssToApply) {
      const elem = document.createElement("style");
      elem.id = EXTENSION_STYLE_ID;
      elem.innerHTML = cssToApply;
      document.documentElement.appendChild(elem);
    }

    if (options.hideThumbnails && !isDisabled) {
      setTimeout(() => extractDurations(), 1000);
      setTimeout(() => extractDurations(), 3000);
    }
    
    if (options.showWatchProgress && !isDisabled) {
      setTimeout(extractWatchProgress, 1000);
      setTimeout(extractWatchProgress, 3000);
      setTimeout(extractWatchProgress, 5000);
    }
  } catch (error) {
    console.error('YouTube for Blog Readers - Error in updateElem:', error);
  }
};

const extractDurations = () => {
  document.querySelectorAll('ytd-rich-item-renderer, ytd-grid-video-renderer, ytd-video-renderer, ytd-compact-video-renderer, yt-lockup-view-model').forEach((thumbnail) => {
    if (thumbnail.querySelector('.duration-added')) return;
    
    const durationElement = thumbnail.querySelector('.badge-shape-wiz__text, .ytd-thumbnail-overlay-time-status-renderer span');
    if (!durationElement) return;
    
    const duration = durationElement.textContent?.trim();
    if (!duration?.includes(':') || duration.length > 15) return;
    
    const metadataTargets = [
      '.yt-content-metadata-view-model-wiz__metadata-row:has(.yt-content-metadata-view-model-wiz__delimiter)',
      '.yt-content-metadata-view-model-wiz__metadata-row:not(:first-child)',
      '#metadata-line'
    ];
    
    for (const selector of metadataTargets) {
      const metadataContainer = thumbnail.querySelector(selector);
      if (metadataContainer && !metadataContainer.querySelector('.duration-added')) {
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
  document.querySelectorAll('ytd-rich-item-renderer, ytd-grid-video-renderer, ytd-video-renderer, ytd-compact-video-renderer, yt-lockup-view-model').forEach((thumbnail) => {
    if (thumbnail.querySelector('.ybr-progress-container')) return;
    
    const progressSelectors = [
      'ytd-thumbnail-overlay-resume-playback-renderer #progress',
      '[id="progress"]',
      '.style-scope.ytd-thumbnail-overlay-resume-playback-renderer[style*="width"]'
    ];
    
    let progressPercent = 0;
    
    for (const selector of progressSelectors) {
      const progressElement = thumbnail.querySelector(selector);
      if (progressElement) {
        const style = progressElement.getAttribute('style') || '';
        const widthMatch = style.match(/width:\s*(\d+(?:\.\d+)?)%/);
        if (widthMatch) {
          progressPercent = parseFloat(widthMatch[1]);
          break;
        }
      }
    }
    
    if (progressPercent < 2) return;
    
    const titleContainer = thumbnail.querySelector('#video-title, h3, .yt-lockup-view-model-wiz__content-text');
    if (!titleContainer) return;
    
    const progressContainer = document.createElement('div');
    progressContainer.className = 'ybr-progress-container';
    
    const progressBar = document.createElement('div');
    progressBar.className = 'ybr-progress-bar';
    
    const progressFill = document.createElement('div');
    progressFill.className = 'ybr-progress-fill';
    progressFill.style.width = `${progressPercent}%`;
    
    progressBar.appendChild(progressFill);
    progressContainer.appendChild(progressBar);
    
    titleContainer.parentNode.insertBefore(progressContainer, titleContainer.nextSibling);
  });
};

browser.storage.onChanged.addListener(updateElem);
browser.storage.local.onChanged.addListener(updateElem);

let lastPathname = window.location.pathname;
setInterval(() => {
  if (lastPathname !== window.location.pathname) {
    lastPathname = window.location.pathname;
    updateElem();
  }
}, 200);

// Also run periodic updates to catch dynamically loaded content
setInterval(async () => {
  if (typeof loadOptions === 'function' && typeof isCurrentChannelBlocked === 'function') {
    try {
      const options = await loadOptions();
      const isChannelBlocked = isCurrentChannelBlocked(options.blockedChannels);
      const currentPath = window.location.pathname;
      const isHomePage = currentPath === '/' || currentPath === '';
      
      const isDisabled = options.disabledOnPages.everywhere || isChannelBlocked || 
        (options.disabledOnPages.home && isHomePage) ||
        (options.disabledOnPages.results && currentPath === '/results') ||
        (options.disabledOnPages.channel && currentPath.startsWith('/@')) ||
        (options.disabledOnPages.playlist && currentPath === '/playlist') ||
        (options.disabledOnPages.watch && currentPath === '/watch') ||
        (options.disabledOnPages.subscriptions && currentPath === '/feed/subscriptions') ||
        (options.disabledOnPages.shorts && (currentPath === '/feed/subscriptions/shorts' || currentPath.startsWith('/shorts')));

      if (options.hideThumbnails && !isDisabled) extractDurations();
      if (options.showWatchProgress && !isDisabled) extractWatchProgress();
    } catch (error) {
      // Silently ignore errors in periodic updates
    }
  }
}, 2000);

// Wait a bit to ensure common.js is loaded, then initialize
const initializeExtension = () => {
  if (typeof loadOptions === 'function' && typeof isCurrentChannelBlocked === 'function') {
    updateElem();
  } else {
    console.log('YouTube for Blog Readers - Waiting for common.js to load...');
    setTimeout(initializeExtension, 50);
  }
};

initializeExtension();
