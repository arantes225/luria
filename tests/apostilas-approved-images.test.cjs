"use strict";

const { test } = require("node:test");
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { join } = require("node:path");

const source = readFileSync(join(__dirname, "../assets/js/apostila-tools.js"), "utf8");

function extract(start, end) {
  const a = source.indexOf(start);
  const b = source.indexOf(end, a + start.length);
  assert.ok(a >= 0 && b > a, "Trecho de código de imagens não encontrado");
  return source.slice(a, b);
}

test("renderiza todas as imagens distintas aprovadas na mesma seção sem limite artificial", () => {
  const code = extract("  function renderApproved() {", "  function ensureLightbox() {");
  const placed = [];
  const section = { querySelectorAll: () => [] };
  const doc = {
    querySelectorAll: () => [],
    getElementById: id => id === "clinica" ? section : null
  };
  const row = (id, src, status = "approved") => ({
    id, review_status: status, target_section: "clinica", proposed_asset: { src }
  });
  const rows = [
    row(1, "https://example.org/a.webp"),
    row(2, "https://example.org/b.webp"),
    row(3, "https://example.org/c.webp"),
    row(4, "https://example.org/b.webp"),
    row(5, "https://example.org/d.webp", "pending"),
    row(6, "https://example.org/e.webp")
  ];
  const render = new Function(
    "document", "rows", "removedUnlicensed", "getAsset", "normalizedImageIdentity",
    "figureKind", "imageNoveltyScore", "placeApprovedImage",
    code + "\nreturn renderApproved;"
  )(
    doc, rows, new Set([6]), r => r.proposed_asset,
    src => String(src || ""), () => "clinical", () => 10,
    r => placed.push(r.id)
  );
  render();
  assert.deepEqual(placed, [1, 2, 3], "preserva as imagens aprovadas, exclui repetidas, pendentes e bloqueadas");
});

test("o leitor busca imagens aprovadas pela RPC pública mesmo para usuário admin", async () => {
  const code = extract("  async function loadRows() {", "  async function boot() {");
  const calls = [];
  const rendered = [];
  const sb = { rpc: async (name, args) => {
    calls.push({ name, args });
    return { data: [
      { id: 11, review_status: "approved" },
      { id: 12, review_status: "pending" }
    ], error: null };
  } };
  const make = new Function(
    "sb", "path", "render", "logger",
    "let rows = []; const console = logger; function renderApproved() { render(rows); } " +
    code + "\nreturn { loadRows, getRows: () => rows };"
  );
  const reader = make(sb, "/apostilas/exemplo/", rows => rendered.push(rows), {warn() {}});
  await reader.loadRows();
  assert.deepEqual(calls, [{
    name: "list_approved_apostila_images",
    args: { p_apostila_path: "/apostilas/exemplo/" }
  }]);
  assert.deepEqual(reader.getRows(), [{ id: 11, review_status: "approved" }]);
  assert.equal(rendered.length, 1);
});

test("erro de rede não elimina as fotos que já foram carregadas", async () => {
  const code = extract("  async function loadRows() {", "  async function boot() {");
  const make = new Function(
    "sb", "path", "render", "logger",
    "let rows = [{ id: 1, review_status: 'approved' }]; const console = logger;" +
    "function renderApproved(){ render(rows) }; " +
    code + "\nreturn { loadRows, getRows: () => rows };"
  );
  let rerendered = false;
  const r = make(
    { rpc: async () => ({ data: null, error: new Error("network") }) },
    "/apostilas/exemplo/", () => { rerendered = true; }, { warn() {} }
  );
  await r.loadRows();
  assert.equal(rerendered, false);
  assert.equal(r.getRows()[0].id, 1);
});
