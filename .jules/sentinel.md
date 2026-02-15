## 2025-02-06 - Hardcoded Password in HTML
**Vulnerability:** Hardcoded password found in the `value` attribute of a `type="password"` input field in the admin profile edit screen.
**Learning:** Pre-populating password fields with actual passwords in static HTML prototypes is a common but dangerous practice that can lead to credentials being leaked in source control or through browser inspection.
**Prevention:** Never use the `value` attribute for passwords. Use placeholders like `••••••••` to indicate a password is set, and use `autocomplete` attributes to assist password managers securely.

## 2026-02-15 - Global CSP Implementation in Prototype Shell
**Vulnerability:** Lack of Content Security Policy (CSP) headers or meta tags in the main shell, leaving the application vulnerable to XSS and injection attacks.
**Learning:** In a dynamic prototype shell where screens are loaded via `fetch` and inserted using `dangerouslySetInnerHTML`, CSP meta tags in individual screen files are often ignored by browsers. The CSP must be implemented in the main `index.html` to be effective.
**Prevention:** Always implement a central CSP in the application shell and ensure it whitelists all necessary CDNs while being as restrictive as possible (e.g., using `default-src 'self'`).
