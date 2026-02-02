from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("http://localhost:8000")

    # Click settings icon
    page.click("span:has-text('settings')")
    page.wait_for_timeout(500)

    # Click the Dashboard button in the Admin section
    # The Admin Flow section has a specific background color
    page.click("button:has-text('Dashboard')") # This might click the provider one if it comes first

    page.wait_for_timeout(2000)
    page.screenshot(path="verification/admin_fixed.png")

    browser.close()
