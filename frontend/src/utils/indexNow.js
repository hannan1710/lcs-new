// IndexNow API Integration for Instant Search Engine Indexing
// Bing Webmaster Tools - IndexNow Protocol

const INDEXNOW_API_KEY = 'ce033b847c454528bc7f542b9e8c4a9e';
const SITE_URL = 'https://lacoiffuresalons.com';
const KEY_LOCATION = `${SITE_URL}/${INDEXNOW_API_KEY}.txt`;

/**
 * Submit a single URL to IndexNow for instant indexing
 * @param {string} url - The URL to submit for indexing
 * @returns {Promise<boolean>} - Success status
 */
export const submitUrlToIndexNow = async (url) => {
  try {
    const response = await fetch(`https://api.indexnow.org/indexnow?url=${encodeURIComponent(url)}&key=${INDEXNOW_API_KEY}&keyLocation=${encodeURIComponent(KEY_LOCATION)}`, {
      method: 'GET',
      headers: {
        'User-Agent': 'LaCoiffureSalon-IndexNow/1.0'
      }
    });

    if (response.status === 200) {
      console.log(`✅ URL successfully submitted to IndexNow: ${url}`);
      return true;
    } else {
      console.warn(`⚠️ IndexNow submission failed for ${url}: HTTP ${response.status}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ IndexNow submission error for ${url}:`, error);
    return false;
  }
};

/**
 * Submit multiple URLs to IndexNow for bulk indexing
 * @param {string[]} urls - Array of URLs to submit for indexing
 * @returns {Promise<boolean>} - Success status
 */
export const submitUrlsToIndexNow = async (urls) => {
  try {
    const payload = {
      host: 'lacoiffuresalons.com',
      key: INDEXNOW_API_KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls
    };

    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': 'LaCoiffureSalon-IndexNow/1.0'
      },
      body: JSON.stringify(payload)
    });

    if (response.status === 200) {
      console.log(`✅ ${urls.length} URLs successfully submitted to IndexNow`);
      return true;
    } else {
      console.warn(`⚠️ IndexNow bulk submission failed: HTTP ${response.status}`);
      return false;
    }
  } catch (error) {
    console.error('❌ IndexNow bulk submission error:', error);
    return false;
  }
};

/**
 * Submit all important site URLs for indexing
 * @returns {Promise<boolean>} - Success status
 */
export const submitAllSiteUrls = async () => {
  const importantUrls = [
    `${SITE_URL}/`,
    `${SITE_URL}/services-catalog`,
    `${SITE_URL}/gallery-portfolio`,
    `${SITE_URL}/appointment-booking`,
    `${SITE_URL}/contact-location`,
    `${SITE_URL}/about-us`
  ];

  return await submitUrlsToIndexNow(importantUrls);
};

/**
 * Auto-submit URL when page loads (for dynamic content)
 * Call this function on important page loads
 */
export const autoSubmitCurrentPage = () => {
  if (typeof window !== 'undefined') {
    const currentUrl = window.location.href;
    // Only submit production URLs
    if (currentUrl.includes('lacoiffuresalons.com')) {
      submitUrlToIndexNow(currentUrl);
    }
  }
};
