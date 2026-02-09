import asyncio
from playwright.async_api import async_playwright
import os
import subprocess
import time

async def verify_app():
    # Start the server
    server = subprocess.Popen(["python3", "-m", "http.server", "8000"])
    time.sleep(2) # Give it a second to start

    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch()
            page = await browser.new_page()
            await page.set_viewport_size({"width": 450, "height": 900})

            # 1. Welcome Screen
            print("Verifying Welcome Screen...")
            await page.goto("http://localhost:8000")
            await page.wait_for_load_state("networkidle")
            await page.wait_for_timeout(3000)
            await page.screenshot(path="screenshot_welcome.png")

            # 2. Login Screen Toggle
            print("Verifying Login Toggle...")
            await page.get_by_role("button", name="Log In").click()
            await page.wait_for_timeout(2000)
            await page.screenshot(path="screenshot_login.png")

            await page.get_by_role("link", name="Sign Up").click()
            await page.wait_for_timeout(2000)
            await page.screenshot(path="screenshot_signup.png")

            # 3. Client Flow
            print("Verifying Client Flow...")
            await page.evaluate("window.dispatchEvent(new CustomEvent('navigate', { detail: 'CLIENT_HOME' }))")
            await page.wait_for_timeout(3000)
            await page.screenshot(path="screenshot_client_home.png")

            # Use a more flexible selector for "Find Services"
            await page.click("button:has-text('Find')")
            await page.wait_for_timeout(3000)
            await page.screenshot(path="screenshot_find_services.png")

            # 4. Provider Flow
            print("Verifying Provider Flow...")
            await page.evaluate("window.dispatchEvent(new CustomEvent('navigate', { detail: 'PROVIDER_DASHBOARD' }))")
            await page.wait_for_timeout(3000)
            await page.screenshot(path="screenshot_provider_dashboard.png")

            # 5. Admin Flow
            print("Verifying Admin Flow...")
            await page.evaluate("window.dispatchEvent(new CustomEvent('navigate', { detail: 'ADMIN_DASHBOARD' }))")
            await page.wait_for_timeout(3000)
            await page.screenshot(path="screenshot_admin_dashboard.png")

            print("Verification screenshots saved.")
            await browser.close()
    except Exception as e:
        print(f"Error during verification: {e}")
    finally:
        server.terminate()

if __name__ == "__main__":
    asyncio.run(verify_app())
