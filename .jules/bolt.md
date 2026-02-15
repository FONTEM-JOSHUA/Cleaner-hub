## 2026-02-15 - Implement screen caching and speculative pre-fetching
**Learning:** In a single-page prototype that dynamically loads HTML screens, redundant network requests and DOM parsing on every navigation significantly degrade perceived performance. Using a global `contentCache` for processed HTML/Styles and a `promiseCache` to deduplicate in-flight requests makes navigation instant.
**Action:** Always implement a caching layer for dynamic content and use `requestIdleCallback` for speculative pre-fetching of critical assets in similar architectures.
