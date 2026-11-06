"use strict";
const fs = require("node:fs");
const assert = require("node:assert/strict");
const http = require("node:http");
const path = require("node:path");
const { chromium } = require("playwright");
const root = path.resolve(__dirname, "../build/pages");
const mime = { ".html":"text/html", ".mjs":"text/javascript", ".js":"text/javascript", ".css":"text/css", ".glb":"model/gltf-binary", ".png":"image/png", ".svg":"image/svg+xml" };
const server = http.createServer((request, response) => {
  let pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  if (pathname.endsWith("/")) pathname += "index.html";
  const file = path.resolve(root, "." + pathname);
  if (!file.startsWith(root + path.sep)) return response.writeHead(403).end();
  fs.readFile(file, (error, data) => error ? response.writeHead(404).end() : response.writeHead(200, { "Content-Type": mime[path.extname(file)] || "application/octet-stream" }).end(data));
});
(async () => {
  await new Promise(resolve => server.listen(0, "127.0.0.1", resolve));
  const browser = await chromium.launch({...(process.platform === "win32" ? {executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe"} : {}),headless:true,args:["--enable-webgl","--use-gl=angle","--use-angle=swiftshader","--enable-unsafe-swiftshader"]});
  try {
    const page = await browser.newPage({viewport:{width:1365,height:900}});
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("console", message => { if (message.type() === "error" && /THREE.*(?:Shader|VALIDATE_STATUS)/i.test(message.text())) errors.push(message.text()); });
    for (const key of ["lungs","breasts","reproductive","kidneys"]) {
      await page.goto(`http://127.0.0.1:${server.address().port}/aprender/anatomia/orgaos/?orgao=${key}`,{waitUntil:"domcontentloaded"});
      await page.locator("[data-organs-loading]").waitFor({state:"hidden",timeout:45000});
      await page.locator(".organs-stage-card").screenshot({path:path.join(root,`../anatomy-${key}-desktop.png`)});
      if (key === "breasts") {
        await page.locator("[data-organ-cut]").click();
        await page.locator(".organs-stage-card").screenshot({path:path.join(root,"../anatomy-breasts-interior.png")});
      }
      if (key === "kidneys") {
        await page.locator("[data-organ-cut]").click();
        await page.locator("[data-structure-id='VH_F_renal_pelvis_R']").click();
        assert.equal(await page.locator("[data-organ-detail-title]").textContent(), "Pelve renal direita");
        assert.equal(await page.locator("[data-organ-structures] button").count(), 24);
        await page.locator(".organs-stage-card").screenshot({path:path.join(root,"../anatomy-kidneys-interior.png")});
      }
      await page.locator("[data-organ-structures] button").first().click();
      console.log(key,await page.locator("[data-organ-title]").textContent(),await page.locator("[data-organ-structures] button").count(),await page.locator("[data-organ-detail-title]").textContent());
      if (key === "reproductive") {
        await page.setViewportSize({width:390,height:844});
        await page.screenshot({path:path.join(root,"../anatomy-reproductive-mobile.png"),fullPage:true});
        await page.setViewportSize({width:1365,height:900});
      }
    }
    await page.close();
    const atlas = await browser.newPage({viewport:{width:1365,height:900}});
    atlas.on("pageerror", error => errors.push(error.message));
    const atlasFiles = JSON.parse(fs.readFileSync(path.join(root, "aprender/anatomia/atlas/models/atlas-female.json"), "utf8")).chunks;
    const byName = new Map(atlasFiles.map(file => [file.gzip, file]));
    const fetched = new Set();
    atlas.on("request", request => { const pathname = new URL(request.url()).pathname; if (byName.has(pathname)) fetched.add(pathname); });
    await atlas.goto(`http://127.0.0.1:${server.address().port}/aprender/anatomia/atlas/?sexo=feminino`,{waitUntil:"domcontentloaded"});
    await atlas.locator("canvas").first().waitFor({timeout:45000}).catch(async error => {
      const status = await atlas.locator(".loading").allTextContents();
      throw new Error([error.message, ...status, ...errors].join("\n"));
    });
    await atlas.locator(".loading").waitFor({state:"hidden",timeout:120000});
    assert.equal(fetched.size, atlasFiles.filter(file => file.system === "integumentary").length);
    assert.ok([...fetched].every(url => byName.get(url).system === "integumentary"));
    console.log("Female atlas initial mesh transfer:", [...fetched].reduce((bytes, url) => bytes + byName.get(url).gzipBytes, 0), "bytes");
    await atlas.screenshot({path:path.join(root,"../anatomy-female-body-desktop.png")});
    const mammaryLayer = atlas.getByRole("switch", {name:"Mostrar mamas", exact:true});
    const mammaryResponse = atlas.waitForResponse(response => byName.get(new URL(response.url()).pathname)?.system === "mammary" && response.ok());
    await mammaryLayer.click();
    await mammaryResponse;
    await atlas.locator(".loading").waitFor({state:"hidden",timeout:120000});
    assert.equal(await mammaryLayer.getAttribute("aria-checked"), "true");
    assert.ok([...fetched].some(url => byName.get(url).system === "mammary"));
    console.log("female atlas",await atlas.locator(".identity-meta").textContent());
    if(errors.length) throw Error(errors.join("\n"));
  } finally { await browser.close(); server.close(); }
})().catch(error => { console.error(error); server.close(); process.exitCode=1; });
