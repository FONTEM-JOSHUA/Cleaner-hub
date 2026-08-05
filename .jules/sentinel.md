## 2025-02-06 - Hardcoded Password in HTML
**Vulnerability:** Hardcoded password found in the `value` attribute of a `type="password"` input field in the admin profile edit screen.
**Learning:** Pre-populating password fields with actual passwords in static HTML prototypes is a common but dangerous practice that can lead to credentials being leaked in source control or through browser inspection.
**Prevention:** Never use the `value` attribute for passwords. Use placeholders like `••••••••` to indicate a password is set, and use `autocomplete` attributes to assist password managers securely.

## 2025-02-10 - Missing Content Security Policy
**Vulnerability:** The application shell lacked a Content Security Policy (CSP), making it vulnerable to XSS and injection attacks if dynamic content was ever introduced.
**Learning:** Even static prototypes using dynamic shells should implement defense-in-depth measures like CSP to restrict the execution of untrusted scripts and styles.
**Prevention:** Always implement a restrictive CSP meta tag in the main shell, whitelisting only necessary CDNs and origins.
