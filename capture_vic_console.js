const { chromium } = require("playwright");
const path = require("path");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 920 }, deviceScaleFactor: 1 });
  const filePath = path.resolve("vic_spy_console.html");
  await page.goto(`file://${filePath}`);
  await page.click("#encryptBtn");
  await page.click("#decryptBtn");
  await page.click("#wrongKeyBtn");
  await page.screenshot({ path: "vic_spy_console_demo.png", fullPage: true });
  await browser.close();
})();
