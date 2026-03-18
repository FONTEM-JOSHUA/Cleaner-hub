from playwright.sync_api import sync_playwright
import time
import os

def verify():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.set_viewport_size({"width": 450, "height": 900})

        print('Taking Welcome Screen screenshot...')
        page.goto('http://localhost:8000/index.html')
        time.sleep(3)
        page.screenshot(path='screenshot_welcome.png')

        print('Taking Client Home screenshot...')
        page.click('text=Continue as Guest')
        time.sleep(2)
        page.screenshot(path='screenshot_client_home.png')

        print('Taking Provider Dashboard screenshot...')
        page.evaluate("window.dispatchEvent(new CustomEvent('navigate', { detail: 'PROVIDER_DASHBOARD' }))")
        time.sleep(2)
        page.screenshot(path='screenshot_provider_dashboard.png')

        print('Taking Admin Dashboard screenshot...')
        page.evaluate("window.dispatchEvent(new CustomEvent('navigate', { detail: 'ADMIN_DASHBOARD' }))")
        time.sleep(2)
        page.screenshot(path='screenshot_admin_dashboard.png')

        print('Screenshots taken.')
        browser.close()

if __name__ == "__main__":
    verify()
