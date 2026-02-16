## 2025-02-06 - Hardcoded Password in HTML
**Vulnerability:** Hardcoded password found in the `value` attribute of a `type="password"` input field in the admin profile edit screen.
**Learning:** Pre-populating password fields with actual passwords in static HTML prototypes is a common but dangerous practice that can lead to credentials being leaked in source control or through browser inspection.
**Prevention:** Never use the `value` attribute for passwords. Use placeholders like `••••••••` to indicate a password is set, and use `autocomplete` attributes to assist password managers securely.

## 2025-02-14 - SRI and Version Pinning for CDNs
**Vulnerability:** Using unpinned versions (e.g., `@18`) for CDN-loaded scripts makes the application vulnerable to breaking if the CDN update introduces a version that doesn't match a hardcoded SRI hash, or if the CDN itself is compromised and serves a malicious 'latest' version.
**Learning:** Always pin CDN assets to specific versions when implementing Subresource Integrity (SRI). This ensures that the hash remains valid and protects against both malicious tampering and accidental breaking changes from the CDN.
**Prevention:** Use a specific version in the URL (e.g., `react@18.3.1`) and calculate the SRI hash for that specific version.
