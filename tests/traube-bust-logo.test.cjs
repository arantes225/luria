const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const logoDir = path.join(root, "assets", "img", "logos");
const names = [
  "logo-principal.png",
  "logo-icone-original.png",
  "logo-icone-azul-claro.png",
  "logo-icone-rosa-escuro.png",
  "favicon.png"
];

test("Traube bust theme assets are transparent 256px PNGs", () => {
  const buffers = names.map(name => {
    const bytes = fs.readFileSync(path.join(logoDir, name));
    assert.equal(bytes.subarray(0, 8).toString("hex"), "89504e470d0a1a0a", name);
    assert.equal(bytes.readUInt32BE(16), 256, name);
    assert.equal(bytes.readUInt32BE(20), 256, name);
    assert.equal(bytes[25], 6, "PNG must use RGBA");
    return bytes;
  });
  assert.deepEqual(buffers[0], buffers[1], "landing and light logo should match");
  assert.deepEqual(buffers[1], buffers[4], "favicon and light logo should match");
  assert.notDeepEqual(buffers[1], buffers[2], "dark logo must differ from light");
  assert.notDeepEqual(buffers[1], buffers[3], "rose logo must differ from light");
});

test("Traube frontend selects each bust logo by theme", () => {
  for (const file of ["assets/js/traube-brand-v5.js", "assets/js/app.js"]) {
    const source = fs.readFileSync(path.join(root, file), "utf8");
    for (const name of ["logo-icone-original.png", "logo-icone-azul-claro.png", "logo-icone-rosa-escuro.png"]) {
      assert.match(source, new RegExp(name.replaceAll(".", "\\.")), file + " " + name);
    }
    assert.match(source, /busto20261102/, file);
  }
});

test("PWA icon PNGs and manifest declare 180, 192 and 512 icons", () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(root, "manifest.webmanifest"), "utf8"));
  const icons = manifest.icons || [];
  assert.ok(icons.some(icon => icon.sizes === "192x192"));
  assert.ok(icons.some(icon => icon.sizes === "512x512"));
  for (const size of [180, 192, 512]) {
    const bytes = fs.readFileSync(path.join(logoDir, `pwa-icon-${size}.png`));
    assert.equal(bytes.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
    assert.equal(bytes.readUInt32BE(16), size);
    assert.equal(bytes.readUInt32BE(20), size);
  }
});
