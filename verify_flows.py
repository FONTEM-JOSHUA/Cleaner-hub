import asyncio
from playwright.async_api import async_playwright
import os

async def verify_flows():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.set_viewport_size({"width": 450, "height": 900})

        # Ensure directory for screenshots exists
        os.makedirs("verification_screenshots", exist_ok=True)

        print("Starting Verification...")

        # 1. Client Flow
        await page.goto("http://localhost:8000/index.html")
        await page.wait_for_timeout(2000)
        await page.screenshot(path="verification_screenshots/1_welcome.png")

        print("Verifying Client Login/Home...")
        # Clicking the 'Log In' button on Welcome screen
        await page.click("text=Log In")
        await page.wait_for_timeout(1000)
        await page.screenshot(path="verification_screenshots/2_client_login.png")

        # Force navigation to Client Home for testing
        await page.evaluate("window.dispatchEvent(new CustomEvent('navigate', { detail: 'CLIENT_HOME' }))")
        await page.wait_for_timeout(2000)
        await page.screenshot(path="verification_screenshots/3_client_home.png")

        print("Verifying Client Find Services...")
        # Use more flexible locator for Find Services
        await page.click("button:has-text('Find')")
        await page.wait_for_timeout(1000)
        await page.screenshot(path="verification_screenshots/4_find_services.png")

        print("Verifying Back Navigation...")
        # Material Icons 'home'
        await page.click("span:has-text('home')")
        await page.wait_for_timeout(1000)
        # Should be back at home

        # 2. Provider Flow
        print("Switching to Provider Flow...")
        await page.evaluate("window.dispatchEvent(new CustomEvent('navigate', { detail: 'PROVIDER_WELCOME' }))")
        await page.wait_for_timeout(1000)
        await page.screenshot(path="verification_screenshots/5_provider_welcome.png")

        # Try to find 'Sign Up as Provider'
        await page.click("button:has-text('Sign Up')")
        await page.wait_for_timeout(1000)
        await page.screenshot(path="verification_screenshots/6_provider_setup.png")

        # In setup, click 'Save & Continue'
        # The button text might be normalized or have line breaks in source
        await page.click("button:has-text('Save')")
        await page.wait_for_timeout(1000)
        await page.screenshot(path="verification_screenshots/7_provider_dashboard.png")

        # 3. Admin Flow
        print("Switching to Admin Flow...")
        await page.evaluate("window.dispatchEvent(new CustomEvent('navigate', { detail: 'ADMIN_LOGIN' }))")
        await page.wait_for_timeout(1000)
        await page.screenshot(path="verification_screenshots/8_admin_login.png")

        # Force navigation to Admin Dashboard
        await page.evaluate("window.dispatchEvent(new CustomEvent('navigate', { detail: 'ADMIN_DASHBOARD' }))")
        await page.wait_for_timeout(2000)
        await page.screenshot(path="verification_screenshots/9_admin_dashboard.png")

        # 4. Emergency Mode (Special Feature)
        print("Verifying Emergency Mode...")
        await page.evaluate("window.dispatchEvent(new CustomEvent('navigate', { detail: 'CLIENT_HOME' }))")
        await page.wait_for_timeout(1000)
        await page.click("text=Emergency Clean")
        await page.wait_for_timeout(1000)
        await page.screenshot(path="verification_screenshots/10_emergency_mode.png")

        print("Verification complete. Screenshots saved in verification_screenshots/")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(verify_flows())
