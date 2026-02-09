## 2025-02-06 - Hardcoded Password in HTML
**Vulnerability:** Hardcoded password found in the `value` attribute of a `type="password"` input field in the admin profile edit screen.
**Learning:** Pre-populating password fields with actual passwords in static HTML prototypes is a common but dangerous practice that can lead to credentials being leaked in source control or through browser inspection.
**Prevention:** Never use the `value` attribute for passwords. Use placeholders like `••••••••` to indicate a password is set, and use `autocomplete` attributes to assist password managers securely.

## 2026-02-09 - Missing Content Security Policy in Prototype Shell
**Vulnerability:** The application shell used `dangerouslySetInnerHTML` and manually executed scripts from fetched HTML files without any Content Security Policy, making it vulnerable to XSS if any fetched content was compromised.
**Learning:** Even in static prototypes, implementing a CSP via meta tags is a crucial defense-in-depth measure, especially when dynamically rendering and executing content from multiple files.
**Prevention:** Always include a CSP meta tag in the main entry point of the application, whitelisting only necessary CDNs and local sources.
