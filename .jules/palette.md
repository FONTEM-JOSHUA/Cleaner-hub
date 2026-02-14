# Palette's Journal - UX & Accessibility Learnings

## 2025-05-14 - Initial Setup
**Learning:** The application uses a dynamic shell (`index.html`) that fetches and renders standalone HTML files. Custom scripts within these screens must be manually executed by the shell.
**Action:** When adding interactive micro-UX features, ensure they are contained within `<script>` tags in the screen's HTML file, as the shell is designed to find and execute them.

## 2025-05-14 - Keyboard Accessibility for Segmented Controls
**Learning:** Using `invisible` or `hidden` on radio inputs removes them from the tab order. Using `sr-only` keeps them accessible while visually hidden. Applying `focus-within` to the parent container allows for visible focus indicators on custom-styled controls.
**Action:** Always prefer `sr-only` for hidden inputs and use `focus-within` on the parent label or container to show focus states.
