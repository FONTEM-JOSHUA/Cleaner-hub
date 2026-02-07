## 2025-05-14 - [A11y] Semantic buttons and focus states in search bar
**Learning:** Using `div` with `cursor-pointer` for interactive elements like filters prevents keyboard navigation and lacks screen reader context. Wrapping search bars in a `<label>` without explicit associations can also be confusing.
**Action:** Always use `<button>` for icon-only actions and provide clear `aria-label`. Use `focus-visible:ring` for accessible focus states.
