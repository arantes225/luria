## 2024-05-18 - Improve scroll performance with passive event listeners
**Learning:** Certain performance optimization tasks involve adding `{ passive: true }` to `scroll` and `resize` event listeners. To find them, we can use grep effectively on our assets file since there is no build step. We found missed opportunities in `assets/js/caderno-notion-editor-fix.js`, `assets/js/professor-alex-companion.mjs`, and `assets/js/social-rooms.js`.
**Action:** When evaluating frontend performance opportunities, explicitly search for `addEventListener` calls that handle `scroll`, `resize`, `touchstart`, or `touchmove` events to ensure they include `{ passive: true }` when `preventDefault` is not used.

## 2024-10-23 - Prevent main thread blocking on keystroke filtering
**Learning:** In the monolithic Vanilla JS architecture, rendering functions like `renderThemeLibrary` and `renderEventLibrary` are expensive as they manipulate the DOM synchronously based on search queries. We found that `input` event listeners were attached to search bars without any debouncing or throttling.
**Action:** When working on search or filter inputs, always use a `debounce` wrapper around the event listener callback to delay the execution of expensive rendering functions until the user has stopped typing. This significantly reduces redundant UI re-renders and improves application responsiveness.

## 2024-10-24 - Debouncing input listeners
**Learning:** We need to be careful to implement debouncing to inputs where events trigger intensive rendering actions like filtering libraries, but be mindful about files containing vanilla JS without build steps. We implemented a debounce function and correctly applied it without needing architectural changes.
**Action:** When working on frontend apps without transpilation, provide a global or file-scoped `debounce` helper function and apply it to `<input>` tags bound to heavy DOM/rendering logic on the `input` event to improve responsiveness.
