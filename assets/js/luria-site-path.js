/* Cross-host static-site links for custom domains and GitHub project Pages. */
(function () {
  "use strict";
  const base = new URL(document.baseURI);
  const root = base.pathname.endsWith("/") ? base.pathname : base.pathname + "/";
  const withoutSlash = root.replace(/\/$/, "");
  function route(path) {
    if (typeof path !== "string" || !path.startsWith("/") || path.startsWith("//")) return path;
    if (root === "/" || path === withoutSlash || path.startsWith(root)) return path;
    return root + path.slice(1);
  }
  window.luriaSitePath = route;

  // Existing app widgets inject new absolute-root anchors after page load.
  // Correct those only on click, preserving modifier keys and browser behavior.
  if (root !== "/") {
    document.addEventListener("click", function (event) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey ||
          event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target;
      const anchor = target && target.closest ? target.closest('a[href^="/"]') : null;
      if (!anchor || anchor.hasAttribute("download") || (anchor.target && anchor.target !== "_self")) return;
      const original = anchor.getAttribute("href");
      const revised = route(original);
      if (revised !== original) anchor.setAttribute("href", revised);
    }, true);
  }
})();
