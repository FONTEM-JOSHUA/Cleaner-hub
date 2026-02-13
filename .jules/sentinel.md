## 2025-02-06 - Hardcoded Password in HTML
**Vulnerability:** Hardcoded password found in the `value` attribute of a `type="password"` input field in the admin profile edit screen.
**Learning:** Pre-populating password fields with actual passwords in static HTML prototypes is a common but dangerous practice that can lead to credentials being leaked in source control or through browser inspection.
**Prevention:** Never use the `value` attribute for passwords. Use placeholders like `••••••••` to indicate a password is set, and use `autocomplete` attributes to assist password managers securely.

## 2026-02-13 - SRI and CSP for CDN-based Prototypes
**Vulnerability:** External scripts (React, Tailwind, Babel) loaded from CDNs without integrity checks or a Content Security Policy (CSP).
**Learning:** Even for static prototypes, using SRI and CSP is crucial as it protects against CDN compromise and injection attacks, which are common when loading third-party scripts.
**Prevention:** Always pin CDN versions and use SRI hashes. Implement a CSP via meta tags to restrict resource loading to trusted domains.
