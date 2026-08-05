## 2026-02-16 - [Accessibility: Contrast on Sky Blue]
**Learning:** The application's primary Sky Blue color (#87CEEB) has a low contrast ratio (approx 1.96:1) with white text, failing WCAG AA standards.
**Action:** Use dark text (e.g., `text-text-main`) instead of white text on primary-colored backgrounds to ensure readability and accessibility.
## 2026-02-16 - [Interactivity in Shell-based Prototypes]
**Learning:** Screen-specific interactive elements (like custom toggles) within a dynamic shell must use `event.stopPropagation()` if they are buttons/anchors to prevent the shell's global click handler from misinterpreting the click as a navigation event.
**Action:** Apply `e.stopPropagation()` to small interactive controls within individual screen scripts.
