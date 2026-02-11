## 2026-02-11 - Form Accessibility and Contrast in Dynamic Shells

**Learning:** Tailwind configuration scripts in individual HTML screens are NOT executed when loaded dynamically via a `DOMParser` shell (like `index.html`). This can cause custom color tokens (e.g., `primary`) to fail, leading to invisible text or poor contrast if white text is used on a default (white) background.

**Action:** Use hardcoded hex values or standard Tailwind color classes (e.g., `blue-600`) for critical UI elements in dynamically loaded screens to ensure visual consistency and accessibility. Always verify contrast in the final rendered shell environment.
