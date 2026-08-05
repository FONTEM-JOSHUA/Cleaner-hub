## 2025-05-14 - [Initial Performance Audit]
**Learning:** The application consists of multiple standalone HTML files using Tailwind CDN and Google Fonts. Many files have redundant font imports and multiple identical CSS blocks for the body style. They also lack modern resource hints like preconnect and lazy loading for images.
**Action:** Implement resource hints (preconnect/dns-prefetch) and image lazy loading across the core screens to improve LCP and initial load performance.
