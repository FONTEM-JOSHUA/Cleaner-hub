import asyncio
from playwright.async_api import async_playwright
import os
import subprocess
import time

async def verify_flows():
    # Start the server
    server_process = subprocess.Popen(["python3", "-m", "http.server", "8000"])
    time.sleep(2) # Wait for server to start

    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch()
            page = await browser.new_page()
            await page.set_viewport_size({"width": 450, "height": 900})

            print("Testing Welcome Screen...")
            await page.goto("http://localhost:8000/index.html")
            await page.wait_for_timeout(3000)
            await page.screenshot(path="screenshot_welcome.png")

            print("Testing Client Flow (Continue as Guest)...")
            await page.click("text=Continue as Guest")
            await page.wait_for_timeout(2000)
            await page.screenshot(path="screenshot_client_home.png")

            print("Testing Provider Flow...")
            await page.click(".dev-menu-btn")
            await page.click("text=Provider App")
            await page.wait_for_timeout(2000)
            await page.screenshot(path="screenshot_provider_welcome.png")

            print("Testing Admin Flow...")
            await page.click(".dev-menu-btn")
            await page.click("text=Admin Panel")
            await page.wait_for_timeout(2000)
            await page.screenshot(path="screenshot_admin_login.png")

            print("Verification complete. Screenshots saved.")
            await browser.close()
    finally:
        server_process.terminate()

if __name__ == "__main__":
    asyncio.run(verify_flows())
