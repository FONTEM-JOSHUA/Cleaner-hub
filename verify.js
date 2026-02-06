const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 450, height: 900 });

  console.log('Taking Welcome Screen screenshot...');
  await page.goto('http://localhost:8000/index.html');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'screenshot_welcome.png' });

  console.log('Taking Client Home screenshot...');
  await page.click('text=Continue as Guest');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'screenshot_client_home.png' });

  console.log('Taking Provider Dashboard screenshot...');
  await page.evaluate(() => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: 'PROVIDER_DASHBOARD' }));
  });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'screenshot_provider_dashboard.png' });

  console.log('Taking Admin Dashboard screenshot...');
  await page.evaluate(() => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: 'ADMIN_DASHBOARD' }));
  });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'screenshot_admin_dashboard.png' });

  console.log('Screenshots taken.');
  await browser.close();
})();
