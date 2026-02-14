## 2025-02-06 - Hardcoded Password in HTML
**Vulnerability:** Hardcoded password found in the `value` attribute of a `type="password"` input field in the admin profile edit screen.
**Learning:** Pre-populating password fields with actual passwords in static HTML prototypes is a common but dangerous practice that can lead to credentials being leaked in source control or through browser inspection.
**Prevention:** Never use the `value` attribute for passwords. Use placeholders like `••••••••` to indicate a password is set, and use `autocomplete` attributes to assist password managers securely.

## 2025-02-14 - Source of Truth Desync for Security Fixes
**Vulnerability:** A previous security fix for a hardcoded password was applied to a root-level copy of a screen but missed the version in `extracted_code/stitch_cleaners_hub/`, which is the actual directory loaded by the dynamic prototype shell.
**Learning:** In projects with duplicated or extracted code structures, it is critical to identify which directory is the "active" source of truth for the running application (in this case, `extracted_code/`).
**Prevention:** Always verify where the application shell (`index.html`) fetches its content from before applying fixes. Search for all instances of a vulnerability across the entire repository.
