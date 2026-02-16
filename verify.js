const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 450, height: 900 });

  const navigate = async (detail) => {
    console.log(`Navigating to ${detail}...`);
    await page.evaluate((d) => {
      window.dispatchEvent(new CustomEvent('navigate', { detail: d }));
    }, detail);
    await page.waitForTimeout(2000);
  };

  try {
    console.log('Starting verification...');
    await page.goto('http://localhost:8000/index.html');
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'screenshot_welcome.png' });

    console.log('Testing Click Navigation...');
    await page.click('text=Continue as Guest');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'screenshot_client_home.png' });

    console.log('Testing Special Features...');
    await navigate('EVENT_HELP');
    await page.screenshot({ path: 'screenshot_event_help.png' });

    await navigate('SUBSCRIBE');
    await page.screenshot({ path: 'screenshot_subscribe.png' });

    await navigate('CHAT');
    await page.screenshot({ path: 'screenshot_chat.png' });

    await navigate('BOOKING_CONFIRMATION');
    await page.screenshot({ path: 'screenshot_booking_confirmation.png' });

    await navigate('PROVIDER_DASHBOARD');
    await page.screenshot({ path: 'screenshot_provider_dashboard.png' });

    await navigate('PROVIDER_PROFILE_EDIT');
    await page.screenshot({ path: 'screenshot_provider_profile_edit.png' });

    console.log('Verification completed successfully.');
  } catch (error) {
    console.error('Error during verification:', error);
  } finally {
    await browser.close();
  }
})();
