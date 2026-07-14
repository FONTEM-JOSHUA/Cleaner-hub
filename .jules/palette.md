## 2026-02-12 - Tailwind Config in Prototype Shell
**Learning:** Tailwind CSS configuration scripts (`<script>tailwind.config = ...</script>`) placed in individual screen HTML files are not executed or are ignored when those screens are dynamically loaded via `fetch` and injected into the DOM by the main `index.html` shell.
**Action:** Use hardcoded hex values (e.g., `bg-[#88c8ec]`) for custom colors instead of depending on `theme.extend` from a local `tailwind.config` when working within this prototype's dynamic loading architecture.
