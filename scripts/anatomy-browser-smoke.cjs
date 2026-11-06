"use strict";
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const assert = require("node:assert/strict");
const { chromium } = require("playwright");

const root = path.resolve(__dirname, "../build/pages");
const mime = { ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript",
  ".css": "text/css", ".glb": "model/gltf-binary", ".webp": "image/webp",
  ".png": "image/png", ".svg": "image/svg+xml", ".json": "application/json",
  ".webmanifest": "application/manifest+json" };
const server = http.createServer((request, response) => {
  let pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  if (pathname.endsWith("/")) pathname += "index.html";
  const file = path.resolve(root, "." + pathname);
  if (!file.startsWith(root + path.sep)) { response.writeHead(403).end(); return; }
  fs.readFile(file, (error, data) => {
    if (error) { response.writeHead(404).end(); return; }
    response.writeHead(200, { "Content-Type": mime[path.extname(file)] || "application/octet-stream" }).end(data);
  });
});
(async () => {
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  const browser = await chromium.launch({ ...(process.platform === "win32" ? { executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" } : {}), headless: true,
    args: ["--enable-webgl", "--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
  try {
    const page = await browser.newPage({ viewport: { width: 1365, height: 900 }, deviceScaleFactor: 1 });
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.goto("http://127.0.0.1:" + server.address().port + "/aprender/anatomia/", { waitUntil: "domcontentloaded" });
    await page.waitForURL("**/aprender/anatomia/atlas/", { timeout: 15000 });
    await page.goto("http://127.0.0.1:" + server.address().port + "/aprender/anatomia/coracao/", { waitUntil: "domcontentloaded" });
    await page.locator("[data-anatomy-viewer].is-ready").waitFor({ timeout: 45000 });
    assert.equal(await page.locator("[data-anatomy-viewer].is-static").count(), 0);
    await page.locator(".anatomy-stage-card").screenshot({ path: path.resolve(__dirname, "../build/anatomy-exterior.png") });
    await page.locator("[data-anatomy-interior]").click();
    assert.equal(await page.locator("[data-anatomy-viewer]").getAttribute("data-anatomy-mode"), "interior");
    await page.locator("[data-anatomy-flow]").click();
    assert.equal(await page.locator("[data-anatomy-flow]").getAttribute("aria-pressed"), "true");
    await page.locator("[data-structure-id='VH_F_pulmonary_trunk']").click();
    assert.equal(await page.locator(".anatomy-picked-card h3").textContent(), "Tronco pulmonar");
    await page.locator(".anatomy-stage-card").screenshot({ path: path.resolve(__dirname, "../build/anatomy-desktop.png") });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.locator("[data-anatomy-exterior]").click();
    assert.equal(await page.locator("[data-anatomy-viewer]").getAttribute("data-anatomy-mode"), "exterior");
    await page.screenshot({ path: path.resolve(__dirname, "../build/anatomy-mobile.png"), fullPage: true });
    const atlas = await browser.newPage({ viewport: { width: 1365, height: 900 }, deviceScaleFactor: 1 });
    const atlasErrors = [];
    atlas.on("pageerror", error => atlasErrors.push(error.message));
    await atlas.goto("http://127.0.0.1:" + server.address().port + "/aprender/anatomia/atlas/", { waitUntil: "domcontentloaded" });
    await atlas.locator(".system-row").first().waitFor({ timeout: 45000 });
    assert.equal(await atlas.locator(".system-row").count(), 15);
    await atlas.locator("canvas").first().waitFor({ timeout: 45000 });
    await atlas.locator(".loading").waitFor({ state: "hidden", timeout: 120000 });
    await atlas.screenshot({ path: path.resolve(__dirname, "../build/anatomy-atlas-desktop.png") });
    await atlas.setViewportSize({ width: 390, height: 844 });
    await atlas.getByRole("button", { name: "Abrir camadas de sistemas" }).click();
    await atlas.locator(".system-row").first().waitFor({ state: "visible" });
    await atlas.screenshot({ path: path.resolve(__dirname, "../build/anatomy-atlas-mobile.png") });
    assert.equal(atlasErrors.length, 0, atlasErrors.join("\n"));
    assert.equal(errors.filter(message => message.includes("anatomy")).length, 0, errors.join("\n"));
    console.log("Anatomy browser smoke passed: model, interior, flow, card, mobile");
  } finally {
    await browser.close();
    server.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; server.close(); });
