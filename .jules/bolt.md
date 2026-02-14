# Bolt's Journal - Critical Learnings Only

## 2026-02-14 - Race condition in speculative pre-fetching
**Learning:** When implementing speculative pre-fetching alongside an on-demand loader, a simple cache-check is insufficient as it doesn't account for in-flight requests. This leads to redundant network calls if the pre-fetcher starts before the on-demand fetch completes.
**Action:** Use a `promiseCache` to track in-flight requests and allow multiple callers to await the same result, ensuring each resource is fetched exactly once.
