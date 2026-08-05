## 2025-02-06 - Hardcoded Password in HTML
**Vulnerability:** Hardcoded password found in the `value` attribute of a `type="password"` input field in the admin profile edit screen.
**Learning:** Pre-populating password fields with actual passwords in static HTML prototypes is a common but dangerous practice that can lead to credentials being leaked in source control or through browser inspection.
**Prevention:** Never use the `value` attribute for passwords. Use placeholders like `••••••••` to indicate a password is set, and use `autocomplete` attributes to assist password managers securely.

## 2025-02-11 - CSP for Browser-Transpiled Prototypes
**Vulnerability:** Lack of Content Security Policy (CSP) in the main shell, leaving the prototype vulnerable to XSS from potentially untrusted fetched HTML content.
**Learning:** For prototypes using `@babel/standalone` and Tailwind CDN in-browser, the CSP must allow `'unsafe-inline'` and `'unsafe-eval'` while whitelisting specific trusted CDNs.
**Prevention:** Always implement a basic CSP in the entry `index.html` that whitelists required CDNs (unpkg.com, cdn.tailwindcss.com, fonts.googleapis.com) to provide a baseline of security.
