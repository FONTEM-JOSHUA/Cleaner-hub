## 2025-02-06 - Hardcoded Password in HTML
**Vulnerability:** Hardcoded password found in the `value` attribute of a `type="password"` input field in the admin profile edit screen.
**Learning:** Pre-populating password fields with actual passwords in static HTML prototypes is a common but dangerous practice that can lead to credentials being leaked in source control or through browser inspection.
**Prevention:** Never use the `value` attribute for passwords. Use placeholders like `••••••••` to indicate a password is set, and use `autocomplete` attributes to assist password managers securely.

## 2026-02-07 - Incomplete Security Patch
**Vulnerability:** Hardcoded password remained in `extracted_code/stitch_cleaners_hub/` even after a "fix" was recorded, because the fix was only applied to a duplicate file at the root.
**Learning:** In projects with multiple copies of the same screen (e.g., extracted code vs. reorganized code), it is critical to identify the active source of truth. The `index.html` shell was fetching from `extracted_code/`, rendering the previous root-level fix ineffective.
**Prevention:** Always verify which directory the application shell or server uses as its source before applying security patches.
