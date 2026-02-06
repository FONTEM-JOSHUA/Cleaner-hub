## 2025-05-14 - Accessible Brand Colors
**Learning:** The brand's specified "Sky Blue" (#87CEEB) has a contrast ratio of ~1.6:1 against white, failing accessibility standards. Using a darker blue like #1d4ed8 (6.7:1) maintains the "blue" brand identity while ensuring readability for all users.
**Action:** Always verify contrast ratios for primary action buttons, even when following brand guidelines.

## 2025-05-14 - Tactile Feedback for Interactive Elements
**Learning:** Using Tailwind's `active:scale-95` provides immediate, tactile feedback for button presses on mobile-first interfaces without the performance overhead or complexity of custom CSS ripples.
**Action:** Use transform-based scaling for press states to enhance perceived responsiveness.

## 2025-05-14 - Secondary Text Contrast
**Learning:** Secondary text (footer, subtitles) often fails accessibility when using default light gray shades (like `slate-400`) on tinted backgrounds. Using `slate-600` ensures a >7:1 contrast ratio on light blue (#f0f9ff), meeting WCAG AA requirements easily.
**Action:** Check contrast for *all* text elements, not just primary buttons, especially on non-white backgrounds.
