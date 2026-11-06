"use strict";
const fs = require("node:fs");
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
    for (const key of ["lungs","reproductive","kidneys"]) {
      await page.goto(`http://127.0.0.1:${server.address().port}/aprender/anatomia/orgaos/?orgao=${key}`,{waitUntil:"domcontentloaded"});
      await page.locator("[data-organs-loading]").waitFor({state:"hidden",timeout:45000});
      await page.screenshot({path:path.join(root,`../anatomy-${key}-desktop.png`)});
      await page.locator("[data-organ-structures] button").first().click();
      console.log(key,await page.locator("[data-organ-title]").textContent(),await page.locator("[data-organ-structures] button").count(),await page.locator("[data-organ-detail-title]").textContent());
    }
    await page.setViewportSize({width:390,height:844});
    await page.screenshot({path:path.join(root,"../anatomy-reproductive-mobile.png"),fullPage:true});
    const atlas = await browser.newPage({viewport:{width:1365,height:900}});
    atlas.on("pageerror", error => errors.push(error.message));
    await atlas.goto(`http://127.0.0.1:${server.address().port}/aprender/anatomia/atlas/?sexo=feminino`,{waitUntil:"domcontentloaded"});
    await atlas.locator(".loading").waitFor({state:"hidden",timeout:120000});
    await atlas.screenshot({path:path.join(root,"../anatomy-female-body-desktop.png")});
    console.log("female atlas",await atlas.locator(".identity-meta").textContent());
    if(errors.length) throw Error(errors.join("\n"));
  } finally { await browser.close(); server.close(); }
})().catch(error => { console.error(error); server.close(); process.exitCode=1; });

