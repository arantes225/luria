## 2024-05-24 - Landing Page Keyboard Accessibility
**Learning:** Standalone landing pages (like `index.html` using `landing.css`) may not inherit the global focus styles defined in the main application's UI stylesheets (`ui-app.css`). This can lead to a complete lack of keyboard accessibility (focus indicators) on primary entry points.
**Action:** When working on standalone marketing or landing pages in this codebase, explicitly verify and include `:focus-visible` styles, as they do not automatically inherit from the core design system's focus utilities.
