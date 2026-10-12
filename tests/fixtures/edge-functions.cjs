// Execute the real TypeScript bodies using Node's built-in type stripping.
// Only module imports/exports are adapted; JSR, Deno.serve/env and I/O are mocked.
// This is not a Deno type check or a deployed Edge Runtime integration test.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { stripTypeScriptTypes } = require('node:module');
const root = path.resolve(__dirname, '../..');

function fixture({ env = {}, fetch, createClient } = {}) {
  let handler;
  const context = vm.createContext({
    URL, Request, Response, Headers, AbortController, setTimeout, clearTimeout,
    console, fetch: fetch || (() => { throw new Error('Unexpected network access'); }),
    createClient: createClient || (() => { throw new Error('Unexpected Supabase access'); }),
    Deno: { env: { get: (key) => env[key] }, serve: (fn) => { handler = fn; } },
  });
  function load(file, exports = []) {
    const code = stripTypeScriptTypes(fs.readFileSync(path.join(root, file), 'utf8'))
      .replace(/^import .*;\s*$/gm, '').replace(/^export /gm, '');
    return vm.runInContext(`(() => { ${code}\nreturn {${exports.join(',')}}; })()`, context, { filename: file });
  }
  const cors = load('supabase/functions/_shared/cors.ts', ['withCors']);
  const verifier = load('supabase/functions/_shared/source-verifier.ts', ['parseSourceUrl', 'urlReachable']);
  Object.assign(context, cors, verifier);
  return {
    ...cors, ...verifier,
    function(name, inspect = []) {
      const internals = load(`supabase/functions/${name}/index.ts`, inspect);
      return { handler, ...internals };
    },
  };
}
module.exports = { fixture, root };
