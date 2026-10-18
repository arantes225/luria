const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const page = fs.readFileSync(path.join(root, "professor-alex/index.html"), "utf8");
const client = fs.readFileSync(path.join(root, "assets/js/professor-alex-gemini.mjs"), "utf8");
const edge = fs.readFileSync(path.join(root, "supabase/functions/professor-alex-gemini/index.ts"), "utf8");
const migration = fs.readFileSync(path.join(root, "db/professor_alex_daily_quota.sql"), "utf8");

test("Professor Alex page loads the real integration and supports safe files", () => {
  assert.match(page, /professor-alex-gemini\.mjs/);
  assert.match(page, /accept="\.pdf,\.txt,\.md"/);
  assert.match(client, /functions\.invoke\("professor-alex-gemini"/);
  assert.match(client, /client\.auth\.getSession/);
});

test("Gemini secret stays in backend and requests require authentication", () => {
  assert.doesNotMatch(client, /Deno\.env|CLIENT_GEMINI|x-goog-api-key/);
  assert.match(edge, /Deno\.env\.get\("CLIENT_GEMINI"\)/);
  assert.match(edge, /auth\.getUser\(token\)/);
  assert.match(edge, /origin_not_allowed/);
  assert.match(edge, /MAX_PDF_BASE64/);
});

test("Daily request quota uses atomic update, RLS and is not exposed to clients", () => {
  assert.match(migration, /enable row level security/i);
  assert.match(migration, /on conflict \(user_id, usage_date\) do update/i);
  assert.match(migration, /grant execute on function .* to service_role/i);
  assert.match(migration, /revoke all on function .* from public, anon, authenticated/i);
});
