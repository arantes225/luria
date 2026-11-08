const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const root = path.join(__dirname, "..");
const logoDir = path.join(root, "assets", "img", "logos");
const names = [
  "logo-principal.png", "logo-icone-original.png",
  "logo-icone-azul-claro.png", "logo-icone-rosa-escuro.png", "favicon.png"
];
test("TRAUBE theme images are valid 256px RGBA PNGs and preserve identity colors", () => {
  const images = Object.fromEntries(names.map(name => {
    const b = fs.readFileSync(path.join(logoDir, name));
    assert.equal(b.subarray(0,8).toString("hex"), "89504e470d0a1a0a", name);
    assert.equal(b.readUInt32BE(16), 256, name);
    assert.equal(b.readUInt32BE(20), 256, name);
    assert.equal(b[25], 6, "PNG must be RGBA");
    return [name,b];
  }));
  assert.deepEqual(images["logo-principal.png"], images["logo-icone-original.png"]);
  assert.deepEqual(images["logo-icone-original.png"], images["logo-icone-azul-claro.png"]);
  assert.notDeepEqual(images["logo-icone-original.png"], images["logo-icone-rosa-escuro.png"]);
  assert.notDeepEqual(images["logo-icone-original.png"], images["favicon.png"]);
});
test("Both appearances retain the blue or pink TRAUBE identity", () => {
  for (const file of ["assets/js/traube-brand-v5.js", "assets/js/app.js", "assets/js/ui-theme-v2.js"]) {
    const src = fs.readFileSync(path.join(root,file),"utf8");
    for (const name of ["logo-icone-original.png","logo-icone-azul-claro.png","logo-icone-rosa-escuro.png"]) {
      assert.match(src, new RegExp(name.replaceAll(".", "\\.")), file+" "+name);
    }
    assert.match(src, /traube20261108brand2/, file);
  }
  const ui = fs.readFileSync(path.join(root,"assets/js/ui-theme-v2.js"),"utf8");
  assert.match(ui, /body\.dataset\.uiIdentity === "pink" \? "logo-icone-rosa-escuro\.png"/);
});
test("PWA icons include 180, 192 and 512 with maskable asset", () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(root,"manifest.webmanifest"),"utf8"));
  assert.ok(manifest.icons.some(x=>x.sizes==="192x192"));
  assert.ok(manifest.icons.some(x=>x.sizes==="512x512"));
  assert.ok(manifest.icons.some(x=>x.purpose==="maskable" && x.src.includes("pwa-icon-maskable-512.png")));
  for (const size of [180,192,512]) {
    const b=fs.readFileSync(path.join(logoDir,`pwa-icon-${size}.png`));
    assert.equal(b.subarray(0,8).toString("hex"),"89504e470d0a1a0a");
    assert.equal(b.readUInt32BE(16),size);
    assert.equal(b.readUInt32BE(20),size);
  }
});
