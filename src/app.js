const puppeteer = require('puppeteer-extra').default;
const blockResourcesPlugin =
  require('puppeteer-extra-plugin-block-resources')();
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const crawlIds = require('./strategies/crawl-ids');
const crawlDetails = require('./strategies/crawl-details');
const fs = require('fs/promises');

puppeteer.use(StealthPlugin());

blockResourcesPlugin.blockedTypes.add('image');
blockResourcesPlugin.blockedTypes.add('media');
puppeteer.use(blockResourcesPlugin);

async function main() {
  console.info('Start time:', new Date().toLocaleString());

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const listQuery = JSON.parse(
    await fs.readFile(`./data/list-query.json`, {
      encoding: 'utf-8',
    })
  );

  for (const query of listQuery) {
    console.info(`Query: ${query}`);
    await crawlIds(browser, query);
  }

  await browser.close();

  await crawlDetails();

  console.info('End time:', new Date().toLocaleString());
}

main();
