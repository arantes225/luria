"use strict";
const path = require("node:path");

// Apply only to the published HTML, never to the source or inline scripts:
// their CSP SHA-256 values must remain unchanged.
function rewritePageHtml(html, filename) {
  const directory = path.posix.dirname(filename.replace(/\\/g, "/"));
  const depth = directory === "." ? 0 : directory.split("/").length;
  const rootRelative = depth ? "../".repeat(depth) : "./";
  if (!/<head(?:\s[^>]*)?>/i.test(html)) return html;

  // A relative base works for both https://example.com/ and
  // https://username.github.io/project/, including deeply nested pages.
  const withoutOldBase = html.replace(/<base\s+href\s*=\s*["']\/["']\s*\/?>/gi, "");
  const withBase = withoutOldBase.replace(
    /(<head(?:\s[^>]*)?>)/i,
    '$1\n  <base href="' + rootRelative + '">\n  <script src="assets/js/luria-site-path.js"></script>'
  );

  return withBase.replace(
    /(<script\b[^>]*>[\s\S]*?<\/script>|<style\b[^>]*>[\s\S]*?<\/style>|<[^>]+>)/gi,
    fragment => {
      if (/^<(?:script|style)\b/i.test(fragment) && /<\/(?:script|style)>/i.test(fragment)) return fragment;
      // Don't change protocol-relative external URLs, only absolute site paths.
      return fragment.replace(/(\s(?:href|src|action|poster|data-src)\s*=\s*["'])\/(?!\/)/gi, "$1");
    }
  );
}
module.exports = { rewritePageHtml };
