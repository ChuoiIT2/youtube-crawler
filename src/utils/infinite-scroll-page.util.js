/**
 * Asynchronously scrolls a given scrollable container to the bottom of its content.
 *
 * @param {Object} options - An object containing:
 *   @param {string} scrollContainerIndex - Index of the scrollable container to be scrolled
 *   @param {Object} page - An instance of a Puppeteer page
 *   @param {number} delay - Delay in milliseconds
 * @return {Promise<boolean>} A boolean indicating whether the scrolling was successful
 */
async function scrollPage({ scrollContainerIndex, page, delay }) {
  let lastHeight = await page.evaluate(
    `document.querySelector('${scrollContainerIndex}')?.scrollHeight`
  );
  if (!lastHeight) {
    return false;
  }

  while (true) {
    await page.evaluate(
      `window.scrollTo(0, document.querySelector('${scrollContainerIndex}').scrollHeight)`
    );

    // delay
    delay = delay || 2000;
    await new Promise((resolve) => setTimeout(resolve, delay));

    let newHeight = await page.evaluate(
      `document.querySelector('${scrollContainerIndex}').scrollHeight`
    );
    if (newHeight === lastHeight) {
      break;
    }
    lastHeight = newHeight;
  }

  return true;
}

module.exports = scrollPage;