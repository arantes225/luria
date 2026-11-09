## 2026-11-09 - Added aria-label for disabled button states and loading indication
**Learning:** Found that auth buttons without loading feedback are a common accessibility gap in auth forms.
**Action:** When implementing async auth processes, ensure buttons enter a disabled state visually while loading to prevent multiple submissions, and use aria-live regions where appropriate.
