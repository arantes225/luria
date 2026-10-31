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
    '$1\n  <base href="' + rootRelative + '">\n  <script src="assets/js/traube-site-path.js"></script>'
  );

  return withBase.replace(
    /(<script\b[^>]*>[\s\S]*?<\/script>|<style\b[^>]*>[\s\S]*?<\/style>|<[^>]+>)/gi,
    fragment => {
      // Rewrite external script/style tag attributes but NEVER their inline
      // body: existing CSP hashes must continue to match byte for byte.
      const opening = fragment.match(/^<(?:script|style)\b[^>]*>/i);
      const attribute = /(\s(?:href|src|action|poster|data-src)\s*=\s*["'])\/(?!\/)/gi;
      if (opening && /<\/(?:script|style)>/i.test(fragment)) {
        const corrected = opening[0].replace(attribute, "$1");
        return corrected + fragment.slice(opening[0].length);
      }
      return fragment.replace(attribute, "$1");
    }
  );
}


function relativeRoot(filename) {
  const directory = path.posix.dirname(filename.replace(/\\/g, "/"));
  return directory === "." ? "./" : "../".repeat(directory.split("/").length);
}

// CSS url(/assets/...) bypasses HTML <base>; make only local absolute URLs
// relative to the stylesheet file so both root and /traube/ work.
function rewritePageCss(css, filename) {
  const root = relativeRoot(filename);
  return css.replace(/url\(\s*(["']?)\/(?!\/)([^)"']+)\1\s*\)/gi,
    (matched, quote, name) => "url(" + quote + root + name + quote + ")");
}

function rewriteWebManifest(source) {
  const data = JSON.parse(source);
  const relative = value => typeof value === "string" && value.startsWith("/") && !value.startsWith("//")
    ? "." + value : value;
  for (const field of ["id", "scope", "start_url"]) data[field] = relative(data[field]);
  for (const item of data.shortcuts || []) item.url = relative(item.url);
  for (const item of data.icons || []) item.src = relative(item.src);
  return JSON.stringify(data, null, 2) + "\n";
}

module.exports = { rewritePageHtml, rewritePageCss, rewriteWebManifest };

