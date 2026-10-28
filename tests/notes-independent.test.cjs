"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const vm = require("node:vm");
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const read = file => fs.readFileSync(path.join(root, file), "utf8");

test("Aprender opens Minhas anotações as a standalone route", () => {
  const html = read("aprender/index.html");
  assert.match(html, /href="\/caderno\/"[^>]*data-resource="notes"/);
});

test("standalone notes pages do not load the split reader eagerly", () => {
  for (const path of ["caderno.html", "caderno/index.html"]) {
    const html = read(path);
    assert.match(html, /id="notebook-view-editor" class="notebook-view" hidden/);
    assert.match(html, /src="(?:\/)?assets\/js\/caderno\.js/);
    assert.match(html, /src="\/assets\/js\/caderno-study-lazy\.js/);
    assert.doesNotMatch(html, /<script src="\/assets\/js\/study-side-by-side\.js/);
  }
});

test("split-reader script loads on opening editor only, not on library or failure", () => {
  const source = read("assets/js/caderno-study-lazy.js");
  const editor = { hidden: true };
  let observer = null;
  const appended = [];
  const rootDocument = {
    getElementById(id) { return id === "notebook-view-editor" ? editor : null; },
    createElement(tag) {
      assert.equal(tag, "script");
      return {
        addEventListener(event, callback) { if (event === "error") this.onError = callback; }
      };
    },
    body: {
      appendChild(element) { appended.push(element); }
    }
  };
  class FakeObserver {
    constructor(callback) { observer = callback; }
    observe(target, options) {
      assert.equal(target, editor);
      assert.deepEqual(Array.from(options.attributeFilter), ["hidden"]);
    }
  }
  vm.runInNewContext(source, {
    document: rootDocument,
    MutationObserver: FakeObserver,
    URLSearchParams,
    location: { search: "" },
    console
  }, { timeout: 1500 });
  assert.equal(appended.length, 0, "standalone library should not load extra scripts");
  editor.hidden = false; observer();
  assert.equal(appended.length, 1);
  assert.match(appended[0].src, /\/assets\/js\/study-side-by-side\.js\?v=/);
  assert.doesNotThrow(() => appended[0].onError());
  editor.hidden = true; observer();
  editor.hidden = false; observer();
  assert.equal(appended.length, 1, "do not duplicate bootstrapping on tab switches");
});

test("the PWA cache version is rotated after notes recovery", () => {
  assert.match(read("service-worker.js"), /luria-pwa-20261028-notes-recovery1/);
});
