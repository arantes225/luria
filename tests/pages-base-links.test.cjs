"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const vm = require("node:vm");
const fs = require("node:fs");
const path = require("node:path");
const { rewritePageHtml } = require("../scripts/pages-base-links.cjs");

test("root landing has a relative base and project-aware login and assets", () => {
  const source = '<!doctype html><head><script>const code = "href=\\"/login/\\"";</script><link href="/assets/css/app.css"><script src="/assets/js/app.js"></script></head><body><a href="/login/">Entrar</a></body>';
  const result = rewritePageHtml(source, "index.html");
  assert.match(result, /<base href="\.\/">/);
  assert.match(result, /href="login\/"/);
  assert.match(result, /href="assets\/css\/app\.css"/);
  assert.match(result, /src="assets\/js\/app\.js"/);
  assert.match(result, /const code = "href=\\"\/login\/\\""/);
});

test("nested login base resolves assets and routes under either origin", () => {
  const source = fs.readFileSync(path.join(__dirname, "../login/index.html"), "utf8");
  const result = rewritePageHtml(source, "login/index.html");
  assert.match(result, /<base href="\.\.\/">/);
  assert.doesNotMatch(result, /<base href="\/">/);
  assert.match(result, /src="assets\/vendor\/supabase-2\.110\.6\.js"/);
  const asset = new URL("assets/js/auth.js", new URL("../", "https://arantes225.github.io/luria/login/"));
  assert.equal(asset.pathname, "/luria/assets/js/auth.js");
  const custom = new URL("assets/js/auth.js", new URL("../", "https://www.resibulando.online/login/"));
  assert.equal(custom.pathname, "/assets/js/auth.js");
  assert.equal(result.match(/<base /g)?.length, 1);
});

test("multilevel HTML gets correct base without touching inline CSP-sensitive script", () => {
  const inline = '<script>(function(){location.replace("/dashboard/")})();</script>';
  const source = '<head><base href="/"><link rel="stylesheet" href="/assets/css/a.css">' + inline + '</head><a href="//google.com">Google</a>';
  const html = rewritePageHtml(source, "trabalho/ecg/index.html");
  assert.match(html, /<base href="\.\.\/\.\.\/">/);
  assert.ok(html.includes(inline));
  assert.match(html, /href="assets\/css\/a\.css"/);
  assert.match(html, /href="\/\/google.com"/);
});

test("route helper keeps custom domains and prefixes GitHub project site exactly once", () => {
  const source = fs.readFileSync(path.join(__dirname, "../assets/js/luria-site-path.js"), "utf8");
  const capture = projectBase => {
    const sandbox = {
      URL, window: {}, document: { baseURI: projectBase, addEventListener() {} }
    };
    vm.runInNewContext(source, sandbox);
    return sandbox.window.luriaSitePath;
  };
  const subpath = capture("https://arantes225.github.io/luria/");
  assert.equal(subpath("/login/"), "/luria/login/");
  assert.equal(subpath("/luria/login/"), "/luria/login/");
  assert.equal(subpath("/dashboard/?next=1"), "/luria/dashboard/?next=1");
  assert.equal(subpath("//external.example/path"), "//external.example/path");
  assert.equal(subpath("assets/js/app.js"), "assets/js/app.js");
  const canonical = capture("https://www.resibulando.online/");
  assert.equal(canonical("/login/"), "/login/");
});
