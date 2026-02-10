# Palette's Journal - Cleaner-hub UX & Accessibility

## 2025-05-14 - Initial Exploration
**Learning:** The application uses a React shell to load static HTML screens. Navigation is based on innerText matching, which means changes to visible text must be handled carefully. Many components use 'invisible' for inputs which breaks keyboard accessibility.
**Action:** Use 'sr-only' for inputs and ensure parent containers have 'focus-within' styles. Add ARIA labels to icon-only buttons.

## 2025-05-14 - Tailwind Config Injection Issue
**Learning:** Tailwind CSS configuration scripts placed in the `<head>` of individual screen HTML files are not executed when those screens are dynamically loaded by the index.html shell. This causes custom theme colors (like `primary`) to fail.
**Action:** Use hardcoded hex values or CSS variables in the screen's body, or unify theme tokens in the root shell's config to ensure consistent rendering in the prototype.
