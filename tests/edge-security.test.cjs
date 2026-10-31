const { test } = require('node:test');
const assert = require('node:assert/strict');
const { fixture } = require('./fixtures/edge-functions.cjs');

const official = 'https://www.luriamedicina.com.br';
const cname = 'https://www.resibulando.online';
const endpoint = 'https://edge.invalid/function';
const env = {
  SUPABASE_URL: 'https://project.supabase.co', SUPABASE_ANON_KEY: 'publishable-test',
  SUPABASE_SERVICE_ROLE_KEY: 'service-test', PERPLEXITY_API_KEY: 'provider-test',
};
const sdkHeaders = 'authorization, x-client-info, apikey, content-type, x-retry-count, traceparent, tracestate, baggage';
const names = ['question-factory-perplexity-audit', 'question-factory-perplexity-initial-batch'];
const bodies = [
  { batch_number: 1, block_number: 1, start: 1, end: 50 },
  { batch_code: 'L001', block_code: 'L001-B01', start: 1, end: 50 },
];
function req(method = 'POST', origin = official, headers = {}, body) {
  if (origin !== null) headers = { ...headers, Origin: origin };
  return new Request(endpoint, { method, headers, ...(body ? { body: JSON.stringify(body) } : {}) });
}
function preflight(origin = official, method = 'POST', headers = sdkHeaders) {
  return req('OPTIONS', origin, {
    'Access-Control-Request-Method': method, 'Access-Control-Request-Headers': headers,
  });
}

for (const [i, name] of names.entries()) {
  test(`${name}: exact production/CNAME origins and complete SDK preflight`, async () => {
    const { handler } = fixture().function(name);
    for (const origin of [official, cname, 'https://WWW.TRAUBEMEDICINA.COM.BR:443']) {
      const response = await handler(preflight(origin));
      assert.equal(response.status, 200);
      assert.equal(await response.text(), 'ok');
      assert.equal(response.headers.get('Access-Control-Allow-Origin'), new URL(origin).origin);
      assert.equal(response.headers.get('Access-Control-Allow-Methods'), 'POST, OPTIONS');
      assert.equal(response.headers.get('Access-Control-Allow-Headers'), sdkHeaders);
      assert.equal(response.headers.get('Access-Control-Allow-Credentials'), null);
      assert.match(response.headers.get('Vary'), /Origin/);
    }
  });

  for (const origin of [
    'https://attacker.org', official + '.attacker.org', 'https://evil.luriamedicina.com.br',
    'https://luriamedicina.com.br', 'https://www.luriamedicina.com.br@attacker.org',
    'https://www.luriamedicina.com.br:444', 'http://www.luriamedicina.com.br',
    'https://www.luriamedicina.com.br/path', official + '?a=1', official + '#x',
    official + ', https://attacker.org', 'https://@www.luriamedicina.com.br',
    'https://www.luriamedicina.com.br\\', 'null', '',
  ]) {
    test(`${name}: reject Origin ${JSON.stringify(origin)} before handler/SDK`, async () => {
      const { handler } = fixture().function(name);
      for (const request of [req('POST', origin), preflight(origin)]) {
        const response = await handler(request);
        assert.equal(response.status, 403);
        assert.deepEqual(await response.json(), { ok: false, error: 'ORIGIN_NOT_ALLOWED' });
        assert.equal(response.headers.get('Access-Control-Allow-Origin'), null);
        assert.match(response.headers.get('Vary'), /Origin/);
      }
    });
  }

  test(`${name}: invalid/missing preflight method or headers is denied`, async () => {
    const { handler } = fixture().function(name);
    for (const request of [preflight(official, 'GET'), preflight(official, 'DELETE'),
      preflight(official, 'post'), preflight(official, 'POST', 'authorization, x-admin-secret'),
      preflight(null), req('OPTIONS')]) {
      const response = await handler(request);
      assert.equal(response.status, 403);
      assert.equal(response.headers.get('Access-Control-Allow-Origin'), null);
      assert.deepEqual(await response.json(), { ok: false, error: 'INVALID_PREFLIGHT' });
    }
    assert.equal((await handler(preflight(official, 'POST', 'Authorization, APIKEY'))).status, 200);
    assert.equal((await handler(preflight(official, 'POST', ''))).status, 200);
  });

  test(`${name}: no Origin and allowed Origin preserve authentication/status/JSON`, async () => {
    const { handler } = fixture({ env }).function(name);
    for (const origin of [null, official]) {
      for (const method of ['GET', 'PUT', 'DELETE']) {
        const response = await handler(req(method, origin));
        assert.equal(response.status, 405);
        assert.deepEqual(await response.json(), { ok: false, error: 'METHOD_NOT_ALLOWED' });
      }
      const response = await handler(req('POST', origin));
      assert.equal(response.status, 401);
      assert.deepEqual(await response.json(), { ok: false, error: 'AUTH_REQUIRED' });
      assert.equal(response.headers.get('Access-Control-Allow-Origin'), origin);
      assert.equal(response.headers.get('Content-Type'), 'application/json');
    }
    const invalid = await handler(req('POST', official, { Authorization: 'Bearer test' }, {}));
    assert.equal(invalid.status, 400);
    assert.equal((await invalid.json()).error, i ? 'INVALID_OPERATIONAL_ADDRESS' : 'INVALID_BATCH_OR_BLOCK');
  });

  test(`${name}: RPC rejection retains the caller token and cannot reach Perplexity`, async () => {
    const clients = [], rpcs = [];
    const { handler } = fixture({ env, createClient(url, key, options) {
      clients.push({ url, key, options });
      return { rpc: async (name, args) => {
        rpcs.push({ name, args }); return { data: null, error: { message: 'admin access required' } };
      } };
    } }).function(name);
    const response = await handler(req('POST', null, { Authorization: 'Bearer rejected' }, bodies[i]));
    assert.equal(response.status, i ? 422 : 403);
    assert.equal((await response.json()).error, i ? 'JOB_START_FAILED' : 'NEXT_ITEM_FAILED');
    assert.equal(clients.length, 1);
    assert.equal(clients[0].key, env.SUPABASE_ANON_KEY);
    assert.equal(clients[0].options.global.headers.Authorization, 'Bearer rejected');
    assert.equal(rpcs.length, 1);
    assert.equal(rpcs[0].name, i ? 'admin_start_perplexity_initial_job' : 'admin_question_factory_next_perplexity_item');
  });

  test(`${name}: configuration and unexpected-error contracts retain CORS`, async () => {
    for (const [values, expectedStatus, expectedError] of [
      [{}, 500, 'SUPABASE_RUNTIME_CONFIG_MISSING'],
      [{ ...env, PERPLEXITY_API_KEY: '' }, 503, 'PERPLEXITY_API_KEY_MISSING'],
      [env, 500, 'UNHANDLED'],
    ]) {
      const { handler } = fixture({ env: values, createClient() { throw new Error('simulated SDK failure'); } }).function(name);
      const response = await handler(req('POST', official, { Authorization: 'Bearer admin-test' }, bodies[i]));
      assert.equal(response.status, expectedStatus);
      assert.equal((await response.json()).error, expectedError);
      assert.equal(response.headers.get('Access-Control-Allow-Origin'), official);
      assert.match(response.headers.get('Vary'), /Origin/);
    }
  });

  test(`${name}: successful administrative terminal response keeps existing contract`, async () => {
    const rpcs = [];
    const { handler } = fixture({ env, createClient() {
      return { rpc: async (name) => {
        rpcs.push(name);
        if (name === 'admin_start_perplexity_initial_job') return { data: { job_id: 'test-job', complete: true }, error: null };
        if (name === 'admin_question_factory_review_coverage') return { data: { persisted: 50, complete: true, pending_ids: [] }, error: null };
        return { data: null, error: null };
      } };
    } }).function(name);
    const response = await handler(req('POST', official, { Authorization: 'Bearer admin-test' }, bodies[i]));
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.ok, true);
    assert.equal(body.phase, i ? 'completed' : 'range_complete');
    assert.equal(body.coverage.persisted, 50);
    assert.equal(response.headers.get('Access-Control-Allow-Origin'), official);
    assert.ok(rpcs.includes('admin_question_factory_review_coverage'));
    if (i) assert.equal(body.job_id, 'test-job');
  });

  test(`${name}: fixed AI API transport/authentication is unchanged`, async () => {
    const calls = [];
    const loaded = fixture({ env, fetch: async (url, init) => {
      calls.push({ url, init });
      return Response.json({ id: 'provider-response', output_text: JSON.stringify({ answer: 'A' }) });
    } }).function(name, ['callPerplexity']);
    await loaded.callPerplexity({ apiKey: 'provider-test', prompt: 'test prompt', instructions: 'test instructions',
      schemaName: 'TestSchema', schema: { type: 'object' }, useWeb: false });
    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, 'https://api.perplexity.ai/v1/agent');
    assert.equal(calls[0].init.method, 'POST');
    assert.equal(calls[0].init.headers.Authorization, 'Bearer provider-test');
    const body = JSON.parse(calls[0].init.body);
    assert.equal(body.input, 'test prompt');
    assert.equal(body.instructions, 'test instructions');
    assert.equal(body.response_format.json_schema.name, 'TestSchema');
    await loaded.callPerplexity({ apiKey: 'provider-test', prompt: 'web prompt', instructions: 'web instructions',
      schemaName: 'WebSchema', schema: { type: 'object' }, useWeb: true });
    const webBody = JSON.parse(calls[1].init.body);
    assert.deepEqual(webBody.tools, [{ type: 'web_search' }, { type: 'fetch_url' }]);
    assert.equal(webBody.max_steps, 8);
    assert.equal(calls[1].init.headers.Authorization, 'Bearer provider-test');
  });

  test(`${name}: real source normalization uses the hardened verifier without changing source-check contracts`, async () => {
    const calls = [];
    const loaded = fixture({ fetch: async (url) => { calls.push(url); return new Response(null); } })
      .function(name, ['normalizeAudit']);
    for (const [url, expected] of [['https://journal.university.edu/article', true],
      ['https://127.0.0.1/private', false], ['http://journal.university.edu/article', false]]) {
      calls.length = 0;
      const source = { url, verification_status: 'VERIFIED', title_match: true, year_match: true,
        section_found: true, supports_answer: true, section: 'Section 1' };
      const review = await loaded.normalizeAudit({ source_checks: [source] },
        { question_id: 'test', version: 1, gabarito: 'A' }, { independent_answer: 'A' }, {}, [{ url }]);
      assert.equal(review.source_checks[0].url, url);
      assert.equal(review.source_checks[0].url_reachable, expected);
      assert.equal(review.source_checks[0].provider_evidence_match, true);
      assert.equal(review.source_checks[0].verification_status, expected ? 'VERIFIED' : 'PENDING');
      assert.equal(calls.length, expected ? 1 : 0);
    }
  });
}

test('CORS responses are request-local and preserve handler headers/body', async () => {
  const { withCors } = fixture();
  const handler = withCors(async () => new Response('payload', { status: 202, headers: {
    'Cache-Control': 'no-store', Vary: 'Accept-Encoding', 'X-Contract': 'preserved',
  } }));
  const responses = await Promise.all([official, cname, null].map((origin) => handler(req('POST', origin))));
  for (const [i, response] of responses.entries()) {
    assert.equal(response.status, 202);
    assert.equal(await response.text(), 'payload');
    assert.equal(response.headers.get('Cache-Control'), 'no-store');
    assert.equal(response.headers.get('X-Contract'), 'preserved');
    assert.equal(response.headers.get('Vary'), 'Accept-Encoding, Origin');
    assert.equal(response.headers.get('Access-Control-Allow-Origin'), [official, cname, null][i]);
  }
});

test('Bridge remains without CORS, requires Bearer/admin, creates service client only after admin gate', async () => {
  for (const origin of [null, official, 'https://attacker.org']) {
    const clients = [];
    const { handler } = fixture({ env, createClient(url, key) {
      clients.push(key); return { rpc: async () => ({ data: false, error: null }) };
    } }).function('qf-chatgpt-bridge');
    let response = await handler(req('OPTIONS', origin));
    assert.equal(response.status, 405);
    assert.equal((await response.json()).error, 'METHOD_NOT_ALLOWED');
    response = await handler(req('GET', origin));
    assert.equal(response.status, 401);
    assert.equal((await response.json()).error, 'AUTH_REQUIRED');
    response = await handler(req('GET', origin, { Authorization: 'Bearer not-admin' }));
    assert.equal(response.status, 403);
    assert.equal((await response.json()).error, 'ADMIN_SESSION_REQUIRED');
    assert.equal(response.headers.get('Access-Control-Allow-Origin'), null);
    assert.equal(response.headers.get('Cache-Control'), 'no-store');
    assert.deepEqual(clients, [env.SUPABASE_ANON_KEY]);
  }
  const clients = [];
  const { handler } = fixture({ env, createClient(url, key) {
    clients.push(key); return { rpc: async () => ({ data: true, error: null }) };
  } }).function('qf-chatgpt-bridge');
  const response = await handler(req('POST', null, { Authorization: 'Bearer admin' }, {}));
  assert.equal(response.status, 400);
  assert.equal((await response.json()).error, 'INVALID_BATCH_CODE');
  assert.deepEqual(clients, [env.SUPABASE_ANON_KEY, env.SUPABASE_SERVICE_ROLE_KEY]);
});

test('Bridge authenticated server GET retains snapshot JSON and headers', async () => {
  const batch = { id: 'batch', batch_number: 1, batch_code: 'L001' };
  const block = { id: 'block', block_number: 1, block_code: 'L001-B01' };
  const items = [{ question_id: 'test', version: 1 }];
  const { handler } = fixture({ env, createClient(url, key) {
    if (key === env.SUPABASE_ANON_KEY) return { rpc: async () => ({ data: true, error: null }) };
    return { from(table) {
      const data = table === 'question_factory_batches' ? batch : block;
      const query = { select() { return query; }, eq() { return query; },
        maybeSingle: async () => ({ data, error: null }), order: async () => ({ data: items, error: null }) };
      return query;
    } };
  } }).function('qf-chatgpt-bridge');
  const response = await handler(new Request(endpoint + '?batch_code=L001&block_code=L001-B01', {
    headers: { Authorization: 'Bearer admin-test' },
  }));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true, batch, block, items });
  assert.equal(response.headers.get('Access-Control-Allow-Origin'), null);
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
});

const forbidden = [
  'http://www.who.int/document', 'ftp://www.who.int/document', 'file:///etc/passwd', 'data:text/plain,test',
  'https://user:pass@www.who.int/', 'https://@www.who.int/', 'https://www.who.int:8443/',
  'https://localhost/', 'https://localhost./', 'https://sub.localhost/', 'https://hospital/',
  'https://hospital.local/', 'https://hospital.internal/', 'https://hospital.lan/', 'https://hospital.home.arpa/',
  'https://metadata.google.internal/', 'https://example.invalid/', 'https://hospital.test/',
  'https://0.0.0.0/', 'https://10.3.2.1/', 'https://100.64.0.1/', 'https://127.0.0.1/',
  'https://127.1/', 'https://2130706433/', 'https://0x7f000001/', 'https://0177.0.0.1/',
  'https://%31%32%37.0.0.1/', 'https://169.254.169.254/', 'https://168.63.129.16/',
  'https://172.16.0.1/', 'https://172.31.255.255/', 'https://192.168.1.1/',
  'https://192.0.0.1/', 'https://192.0.2.5/', 'https://192.88.99.1/', 'https://198.18.1.1/',
  'https://198.51.100.1/', 'https://203.0.113.5/', 'https://224.0.0.1/', 'https://255.255.255.255/',
  'https://[::]/', 'https://[::1]/', 'https://[fc00::1]/', 'https://[fd12::1]/', 'https://[fe80::1]/',
  'https://[ff02::1]/', 'https://[::ffff:127.0.0.1]/', 'https://[::ffff:192.168.0.1]/',
  'https://[64:ff9b::a00:1]/', 'https://[2002:7f00:1::]/', 'https://[2001:db8::1]/',
  'https://[2001::1]/', 'https://[3fff::1]/', 'https://[4000::1]/',
  'https://www.who.int\\@127.0.0.1/', 'https://www.who.int/\n', 'not a URL',
];
for (const value of forbidden) {
  test(`source verifier rejects before network: ${JSON.stringify(value)}`, async () => {
    let calls = 0;
    const f = fixture({ fetch: async () => { calls++; return new Response(null); } });
    assert.equal(f.parseSourceUrl(value), null);
    assert.equal(await f.urlReachable(value), false);
    assert.equal(calls, 0);
  });
}

test('dynamic HTTPS sources, international hosts and public IPs are not allowlisted arbitrarily', async () => {
  const calls = [];
  const f = fixture({ fetch: async (url, init) => { calls.push({ url, init }); return new Response(null); } });
  for (const url of ['https://www.who.int/document?a=1#part', 'https://pubmed.ncbi.nlm.nih.gov/1/',
    'https://journal.university.edu:443/article', 'https://médecine.fr/article',
    'https://8.8.8.8/', 'https://[2606:4700:4700::1111]/']) {
    assert.ok(f.parseSourceUrl(url));
    assert.equal(await f.urlReachable(url), true);
  }
  for (const { url, init } of calls) {
    assert.equal(new URL(url).hash, '');
    assert.equal(init.method, 'HEAD');
    assert.equal(init.redirect, 'manual');
    assert.equal(init.credentials, 'omit');
    assert.equal(init.referrerPolicy, 'no-referrer');
    assert.deepEqual(Object.keys(init.headers), ['User-Agent']);
  }
});

test('IPv4 range boundaries do not reject neighbouring public addresses', () => {
  const { parseSourceUrl } = fixture();
  for (const host of ['9.255.255.255', '11.0.0.0', '100.63.255.255', '100.128.0.0',
    '172.15.255.255', '172.32.0.0', '198.17.255.255', '198.20.0.0', '223.255.255.255']) {
    assert.ok(parseSourceUrl('https://' + host + '/'), host);
  }
});

test('every forbidden redirect is rejected without requesting its destination', async () => {
  for (const value of forbidden.filter((v) => !v.includes('\n') && v !== 'not a URL')) {
    const calls = [];
    const f = fixture({ fetch: async (url) => {
      calls.push(url); return new Response(null, { status: 302, headers: { Location: value } });
    } });
    assert.equal(await f.urlReachable('https://journal.edu/'), false, value);
    assert.equal(calls.length, 1, value);
  }
});

test('manual redirects allow relative and cross-domain public HTTPS hops', async () => {
  const calls = [];
  const responses = [new Response(null, { status: 301, headers: { Location: '/article' } }),
    new Response(null, { status: 307, headers: { Location: 'https://journal.edu/article' } }),
    new Response(null, { status: 200 })];
  const f = fixture({ fetch: async (url, init) => {
    calls.push({ url, init }); return responses.shift();
  } });
  assert.equal(await f.urlReachable('https://www.who.int/'), true);
  assert.deepEqual(calls.map((c) => c.url), ['https://www.who.int/', 'https://www.who.int/article', 'https://journal.edu/article']);
  assert.ok(calls.every((c) => c.init.redirect === 'manual'));
});

test('redirect count is bounded, loops and missing/invalid Location fail closed', async () => {
  for (const hops of [3, 4]) {
    let calls = 0;
    const f = fixture({ fetch: async () => {
      const count = calls++;
      return count < hops
        ? new Response(null, { status: 308, headers: { Location: '/hop-' + calls } })
        : new Response(null);
    } });
    assert.equal(await f.urlReachable('https://journal.edu/'), hops === 3);
    assert.equal(calls, 4);
  }
  for (const location of [null, '/same', 'https://[invalid]/']) {
    let calls = 0;
    const f = fixture({ fetch: async () => {
      calls++; return new Response(null, { status: 303, headers: location ? { Location: location } : {} });
    } });
    assert.equal(await f.urlReachable('https://journal.edu/same'), false);
    assert.equal(calls, 1);
  }
});

test('HEAD 405/501 fallback sends only Range/User-Agent, cancels body and never reads content', async () => {
  for (const fallbackStatus of [405, 501]) {
    const calls = [];
    let canceled = 0, reads = 0;
    const f = fixture({ fetch: async (url, init) => {
      calls.push({ url, init });
      return {
        status: calls.length === 1 ? fallbackStatus : 206,
        headers: new Headers({ 'Content-Length': '999999999' }),
        body: { cancel: async () => { canceled++; } },
        text: async () => { reads++; throw new Error('Must not read'); },
      };
    } });
    assert.equal(await f.urlReachable('https://journal.edu/article'), true);
    assert.deepEqual(calls.map((c) => c.init.method), ['HEAD', 'GET']);
    assert.equal(calls[1].init.headers.Range, 'bytes=0-4095');
    assert.deepEqual(Object.keys(calls[1].init.headers).sort(), ['Range', 'User-Agent']);
    assert.equal(canceled, 2);
    assert.equal(reads, 0);
  }
});

test('fallback resumes at validated HEAD target with a shared redirect limit', async () => {
  const calls = [];
  const statuses = [302, 405, 302, 302, 302];
  const f = fixture({ fetch: async (url, init) => {
    const n = calls.length;
    calls.push({ url, method: init.method });
    return new Response(null, { status: statuses[n], headers: { Location: '/hop-' + n } });
  } });
  assert.equal(await f.urlReachable('https://journal.edu/'), false);
  assert.deepEqual(calls.map((c) => c.method), ['HEAD', 'HEAD', 'GET', 'GET', 'GET']);
  assert.equal(calls[1].url, calls[2].url);
});

test('timeouts abort HEAD and GET; network/body cancellation failures return false', async () => {
  for (const method of ['HEAD', 'GET']) {
    let aborted = false;
    const f = fixture({ fetch: async (url, init) => {
      if (method === 'GET' && init.method === 'HEAD') return new Response(null, { status: 405 });
      return new Promise((resolve, reject) => {
        init.signal.addEventListener('abort', () => { aborted = true; reject(new Error('timeout')); }, { once: true });
      });
    } });
    assert.equal(await f.urlReachable('https://journal.edu/', { headTimeoutMs: 10, getTimeoutMs: 10 }), false);
    assert.equal(aborted, true);
  }
  const failure = fixture({ fetch: async () => { throw new Error('TLS failure'); } });
  assert.equal(await failure.urlReachable('https://journal.edu/'), false);
  const cancellation = fixture({ fetch: async () => ({ status: 200, headers: new Headers(), body: {
    cancel: async () => { throw new Error('cancellation failure'); },
  } }) });
  assert.equal(await cancellation.urlReachable('https://journal.edu/'), false);
});

test('reachable status meaning is preserved for missing/denied/unavailable documents', async () => {
  for (const [status, expected] of [[200, true], [204, true], [403, true], [404, false], [410, false], [500, false]]) {
    const f = fixture({ fetch: async () => new Response(null, { status }) });
    assert.equal(await f.urlReachable('https://journal.edu/article'), expected, String(status));
  }
});

test('timeout also bounds a stalled body cancellation', async () => {
  const f = fixture({ fetch: async () => ({
    status: 200, headers: new Headers(), body: { cancel: () => new Promise(() => {}) },
  }) });
  assert.equal(await f.urlReachable('https://journal.edu/', { headTimeoutMs: 10 }), false);
});

test('protocol-relative redirect validates authority including empty credentials', async () => {
  for (const [location, expected, count] of [['//journal.edu/article', true, 2],
    ['//169.254.169.254/', false, 1], ['//user:pass@journal.edu/', false, 1], ['//@journal.edu/', false, 1]]) {
    let calls = 0;
    const f = fixture({ fetch: async () => {
      calls++;
      return calls === 1 ? new Response(null, { status: 302, headers: { Location: location } }) : new Response(null);
    } });
    assert.equal(await f.urlReachable('https://www.who.int/'), expected, location);
    assert.equal(calls, count);
  }
});

test('DNS-address binding is intentionally NOT asserted by URL filtering', async () => {
  // This mock demonstrates the residual: the helper cannot inspect the actual
  // IP used by fetch for a syntactically public domain. It is not a live request.
  let calls = 0;
  const f = fixture({ fetch: async () => { calls++; return new Response(null); } });
  assert.equal(await f.urlReachable('https://arbitrary-public-domain.org/'), true);
  assert.equal(calls, 1);
});
