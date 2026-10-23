"use strict";
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const ROOT = path.resolve(__dirname, "..");
const OWNER = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
const OTHER = "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb";
const SUPABASE = "https://homologacao.supabase.co";
const ORIGIN = "https://homologacao.example";
const BASE = "https://r2-staging.example";

test("Worker R2 exige JWT do Supabase, ownership, assinatura e limite de tamanho", async (t) => {
  const worker = (await import(pathToFileURL(path.join(ROOT, "cloudflare/media-storage/worker.mjs")).href)).default;
  const items = new Map();
  const bucket = {
    async head(key) { return items.has(key) ? { key } : null; },
    async put(key, bytes, options) {
      items.set(key, { bytes, type: options.httpMetadata.contentType });
    },
    async get(key) {
      const item = items.get(key);
      return item ? { body: new Blob([item.bytes]).stream(), httpMetadata: { contentType: item.type } } : null;
    },
    async delete(key) { items.delete(key); }
  };
  const env = {
    R2_MEDIA: bucket, SUPABASE_URL: SUPABASE, SUPABASE_PUBLISHABLE_KEY: "publishable",
    ALLOWED_ORIGINS: ORIGIN, SIGNING_SECRET: "long-test-signing-secret-with-at-least-32-chars",
    MEDIA_WRITE_ENABLED: "true", MAX_FILE_BYTES: "10485760"
  };
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url, init) => {
    assert.equal(String(url), SUPABASE + "/auth/v1/user");
    assert.equal(new Headers(init.headers).get("apikey"), "publishable");
    const token = new Headers(init.headers).get("authorization");
    return token === "Bearer valid"
      ? new Response(JSON.stringify({ id: OWNER }), { status: 200 })
      : new Response("{}", { status: 401 });
  };
  const KEY = OWNER + "/flashcards/test.webp";
  const address = BASE + "/v1/files/" + KEY;
  const request = (url, method = "GET", token = "valid", body, extra = {}) =>
    new Request(url, {
      method, headers: {
        origin: ORIGIN, ...(token ? { authorization: "Bearer " + token } : {}),
        ...(body ? { "content-type": "image/webp" } : {}), ...extra
      }, ...(body ? { body } : {})
    });
  try {
    await t.test("preflight restringe origens e permite upsert explicitamente", async () => {
      const ok = await worker.fetch(request(address, "OPTIONS"), env);
      assert.equal(ok.status, 204);
      assert.match(ok.headers.get("access-control-allow-headers"), /x-luria-upsert/);
      const denied = await worker.fetch(new Request(address, { headers: { origin: "https://evil.example" } }), env);
      assert.equal(denied.status, 403);
    });
    await t.test("usuário de outro UUID não pode gravar ou assinar arquivos", async () => {
      assert.equal((await worker.fetch(request(BASE + "/v1/files/" + OTHER + "/flashcards/x.webp", "PUT", "valid", "abc"), env)).status, 403);
      const sign = new Request(BASE + "/v1/sign", {
        method: "POST", headers: { origin: ORIGIN, authorization: "Bearer valid", "content-type": "application/json" },
        body: JSON.stringify({ key: OTHER + "/flashcards/x.webp" })
      });
      assert.equal((await worker.fetch(sign, env)).status, 403);
    });
    await t.test("grava, assina, lê e remove objeto do próprio usuário", async () => {
      assert.equal((await worker.fetch(request(address, "PUT", "valid", "imagem"), env)).status, 200);
      assert.equal((await worker.fetch(request(address, "PUT", "valid", "repetido"), env)).status, 409);
      assert.equal((await worker.fetch(request(address, "GET", null), env)).status, 401);
      const signing = new Request(BASE + "/v1/sign", {
        method: "POST", headers: { origin: ORIGIN, authorization: "Bearer valid", "content-type": "application/json" },
        body: JSON.stringify({ key: KEY, expiresIn: 90 })
      });
      const signed = await worker.fetch(signing, env);
      assert.equal(signed.status, 200);
      const { signedUrl } = await signed.json();
      const valid = await worker.fetch(request(signedUrl, "GET", null), env);
      assert.equal(valid.status, 200);
      assert.equal(await valid.text(), "imagem");
      assert.equal(valid.headers.get("cache-control"), "private, no-store");
      const tampered = new URL(signedUrl);
      tampered.searchParams.set("sig", "0".repeat(64));
      assert.equal((await worker.fetch(request(tampered.toString(), "GET", null), env)).status, 401);
      assert.equal((await worker.fetch(request(address, "DELETE"), env)).status, 200);
      assert.equal((await worker.fetch(request(address), env)).status, 404);
    });
    await t.test("recusa tipo inválido, autenticação inválida e escrita desligada", async () => {
      assert.equal((await worker.fetch(request(address, "PUT", "invalid", "imagem"), env)).status, 401);
      assert.equal((await worker.fetch(request(address, "PUT", "valid", "texto", { "content-type": "text/html" }), env)).status, 415);
      assert.equal((await worker.fetch(request(address, "PUT", "valid", "muito-grande"), { ...env, MAX_FILE_BYTES: "4" })).status, 413);
      assert.equal((await worker.fetch(request(address, "PUT", "valid", "imagem"), { ...env, MEDIA_WRITE_ENABLED: "false" })).status, 503);
    });
  } finally { globalThis.fetch = originalFetch; }
});

test("router preserva a rota Supabase antiga e só usa R2 após opção explícita", async () => {
  const source = fs.readFileSync(path.join(ROOT, "assets/js/storage-router.js"), "utf8");
  let mainUploads = 0; const requests = [];
  const client = { storage: { from: () => ({
    upload: async (p) => { mainUploads++; return { data: { path: p }, error: null }; }
  }) }};
  const sandbox = {
    window: { supabaseClient: client }, URL, encodeURIComponent,
    fetch: async (url, opts) => {
      requests.push({ url, method: opts.method || "GET", auth: opts.headers?.Authorization });
      if (opts.method === "PUT") return new Response(JSON.stringify({ path: OWNER + "/flashcards/r2.webp" }), { status: 200 });
      if (opts.method === "POST") return new Response(JSON.stringify({ signedUrl: "https://r2-staging.example/link" }), { status: 200 });
      if (opts.method === "DELETE") return new Response("{}", { status: 200 });
      return new Response("file-content", { status: 200 });
    }
  };
  vm.runInNewContext(source, sandbox, { filename: "storage-router.js" });
  const storage = sandbox.window.LuriaStorage;
  assert.equal(storage.routes.flashcard_images.provider, "main");
  await storage.upload("flashcard_images", OWNER + "/flashcards/original.webp", {});
  assert.equal(mainUploads, 1);
  storage.registerR2Provider("r2", { endpoint: BASE + "/", bucket: "luria-media-staging", getAccessToken: async () => "valid" });
  storage.configureRoute("flashcard_images", { provider: "r2", bucket: "luria-media-staging" });
  const key = OWNER + "/flashcards/r2.webp";
  const uploaded = await storage.upload("flashcard_images", key, { type: "image/webp" });
  assert.equal(uploaded.error, null);
  assert.equal(uploaded.reference, "luria-storage://r2/luria-media-staging/" + key);
  const signed = await storage.createSignedUrl("flashcard_images", uploaded.reference, 60);
  assert.equal(signed.data.signedUrl, BASE + "/link");
  const downloaded = await storage.download("flashcard_images", uploaded.reference);
  assert.equal(await downloaded.data.text(), "file-content");
  assert.equal((await storage.remove("flashcard_images", uploaded.reference)).error, null);
  assert.equal(mainUploads, 1);
  assert.deepEqual(requests.map(r => r.method), ["PUT", "POST", "GET", "DELETE"]);
  assert.ok(requests.every(r => r.auth === "Bearer valid"));
});
