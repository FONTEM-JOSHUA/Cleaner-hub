## 2025-05-14 - Multi-layered Performance Overhaul
**Learning:** For a "no-build" prototype using Babel standalone and dynamic HTML fetching, the most significant performance gains come from: 1) Switching to production minified CDN builds, 2) Implementing in-memory caching for fetched assets to eliminate redundant network roundtrips, and 3) Using resource hints (preconnect) for heavy CDNs like Google Fonts and Tailwind.
**Action:** Always check CDN versions and implement a simple caching layer for dynamic content to make navigation instant.
