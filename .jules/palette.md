## 2025-01-24 - Segmented Control Keyboard Accessibility
**Learning:** Using 'invisible' or 'hidden' on radio inputs within segmented controls breaks keyboard tab order. 'sr-only' is the correct pattern to hide inputs while keeping them focusable.
**Action:** Use 'sr-only' for visually hidden inputs and 'focus-within:ring' on parent labels to provide visible focus indicators.

## 2025-01-24 - Screen Reader Labels for Clean UI
**Learning:** Minimalist UI designs often omit visible labels for inputs, which makes them inaccessible.
**Action:** Always provide '<label class="sr-only">' associated with unique 'id's for every input to ensure screen reader compatibility without altering the visual design.

## 2025-01-24 - Functional Prototype Interactivity
**Learning:** Static prototypes for login/signup flows are more engaging and easier to test when core micro-interactions (password toggle, mode switching) are functional.
**Action:** Implement self-executing inline scripts within individual screen HTML files to handle component-specific logic that doesn't belong in the global shell.
