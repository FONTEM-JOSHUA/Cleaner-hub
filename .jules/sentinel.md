## 2025-02-06 - Hardcoded Password in HTML
**Vulnerability:** Hardcoded password found in the `value` attribute of a `type="password"` input field in the admin profile edit screen.
**Learning:** Pre-populating password fields with actual passwords in static HTML prototypes is a common but dangerous practice that can lead to credentials being leaked in source control or through browser inspection.
**Prevention:** Never use the `value` attribute for passwords. Use placeholders like `••••••••` to indicate a password is set, and use `autocomplete` attributes to assist password managers securely.

## 2026-02-12 - Content Security Policy (CSP) and Subresource Integrity (SRI) Implementation
**Vulnerability:** Lack of CSP and SRI hashes for external CDN-delivered scripts allowed for potential XSS and supply chain attacks.
**Learning:** Even in browser-based prototypes using @babel/standalone, a CSP can be implemented with 'unsafe-eval' and 'unsafe-inline' to restrict resource loading to trusted domains. Version pinning is required for SRI to work correctly.
**Prevention:** Always pin CDN script versions and add SRI hashes. Implement a baseline CSP to whitelist trusted origins for scripts, styles, and images.
