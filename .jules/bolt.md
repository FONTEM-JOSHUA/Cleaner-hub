## 2026-02-16 - Optimized navigation with caching and speculative pre-fetching
**Learning:** Speculative pre-fetching via `requestIdleCallback` can conflict with active component mounting if both target the same URL. This race condition is resolved by tracking in-flight requests in a `promiseCache` keyed by the asset URL.
**Action:** Always use a `promiseCache` alongside a `contentCache` when implementing pre-fetching to ensure exactly one request is made per resource.
