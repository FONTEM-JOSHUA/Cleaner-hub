## 2025-05-14 - Optimizing Image attributes in dynamic shells
**Learning:** Applying performance attributes like `loading="lazy"` to images via JavaScript *after* DOM injection is less effective than applying them to the parsed document object before rendering. This ensures the browser's speculative preloader respects the attributes as soon as the HTML is injected.
**Action:** Always prefer modifying the `doc` object or the HTML string during the parsing/fetching phase for dynamic content.

## 2025-05-14 - Reducing Object Allocation in Navigation
**Learning:** Creating a new `DOMParser` instance on every navigation event is unnecessary overhead.
**Action:** Use a single static `DOMParser` instance at the module or script level to handle all HTML parsing needs.
