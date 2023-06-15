const { Browser } = require('puppeteer');
const infiniteScrollPage = require('../utils/infinite-scroll-page.util');

/**
 * Asynchronously crawls IDs from a given page.
 *
 * @param {Browser} browser - The page object to crawl IDs from.
 * @param {string} query
 * @return {Promise<Array>} A promise that resolves with an array of crawled IDs.
 */
async function crawlIds(browser, query = '') {
  if (!query) {
    return [];
  }

  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(120000);

  const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    query
  )}`;
  await page.goto(url, { waitUntil: 'networkidle2' });

  const result = [];

  const scrollContainerIndex =
    'ytd-two-column-search-results-renderer.ytd-search';
  await infiniteScrollPage({
    scrollContainerIndex,
    page,
    delay: 2000,
  });

  const dataFromPage = await page.evaluate(async () => {
    const newIds = Array.from(
      document.querySelectorAll('#video-title.ytd-video-renderer')
    ).map((item) => item.getAttribute('href')?.split('watch?v=')[1]?.split('&')[0]);

    return newIds;
  });

  result.push(...dataFromPage);

  console.log(result, result.length);
}

module.exports = crawlIds;
