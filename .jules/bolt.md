## 2025-05-14 - Redundant network requests in prototype shell
**Learning:** The static prototype shell was fetching the same screen HTML and CSS every time the user navigated back to it, causing noticeable delays and loading flickers.
**Action:** Implement an in-memory `screenCache` object to store and reuse fetched content, making subsequent navigations near-instantaneous.
