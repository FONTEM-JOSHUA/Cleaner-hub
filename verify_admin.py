from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("http://localhost:8000")

    # Open Dev Menu
    page.click("button:has-text('settings')")

    # Navigate to Admin Dashboard
    page.click("button:has-text('Dashboard')") # In Admin section
    # Actually, the Dev Menu has multiple 'Dashboard' buttons. Let's be specific.
    # Provider Dashboard, Admin Dashboard.

    # Use the one in the purple-50 background (Admin flow)
    page.click("div:has-text('Admin Flow') >> button:has-text('Dashboard')")

    page.wait_for_timeout(2000)
    page.screenshot(path="verification/admin_fixed.png")

    browser.close()
