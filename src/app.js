const puppeteer = require('puppeteer-extra').default;
const blockResourcesPlugin =
  require('puppeteer-extra-plugin-block-resources')();
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const crawlIds = require('./strategies/crawl-ids');

puppeteer.use(StealthPlugin());

blockResourcesPlugin.blockedTypes.add('image');
blockResourcesPlugin.blockedTypes.add('media');
puppeteer.use(blockResourcesPlugin);

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  await crawlIds(browser, 'nhạc tiktok');
}

main();
