## 2026-02-10 - [Screen Caching and Image Optimization]
**Learning:** In a static SPA prototype using @babel/standalone, redundant network requests for screens and repeated DOM parsing on navigation are significant bottlenecks. Programmatic injection of lazy loading and async decoding attributes during the parsing phase is an effective way to optimize many individual screens at once.
**Action:** Always implement a simple in-memory cache for fetched assets in prototype shells and reuse utility objects like DOMParser.
