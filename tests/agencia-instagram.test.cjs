const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const dir = path.join(__dirname, '..', 'supabase', 'functions', '_shared');
const carregar = (n) => import(pathToFileURL(path.join(dir, n)).href);

const TOKEN = 'TOKEN-SECRETO-123';
const jpg = (n) => `https://x.supabase.co/storage/v1/object/public/marketing_videos_temp/agencia/p1/${n}.jpg`;
const resp = (corpo, status = 200) => ({ ok: status < 400, status, json: async () => corpo });

// fetch falso: roteia por método+caminho e registra as chamadas
function criarFetch(rotas) {
  const chamadas = [];
  const fn = async (url, init = {}) => {
    const u = new URL(url); const metodo = (init.method || 'GET').toUpperCase();
    chamadas.push({ metodo, host: u.host, caminho: u.pathname, query: u.search, corpo: init.body, auth: init.headers && init.headers.Authorization });
    for (const [chave, h] of Object.entries(rotas)) {
      const [m, ...resto] = chave.split(' '); const frag = resto.join(' ');
      if (m === metodo && (u.pathname + u.search).includes(frag)) return typeof h === 'function' ? h(url, init) : h;
    }
    throw new Error('rota não prevista: ' + metodo + ' ' + u.pathname);
  };
  fn.chamadas = chamadas; return fn;
}
const semEspera = async () => {};

test('validarMidia aceita só mídia correta e recusa o resto', async () => {
  const { validarMidia } = await carregar('agencia-instagram.mjs');
  assert.match(validarMidia({ rede: 'tiktok', formato: 'video', midia: [] }), /TikTok/);
  assert.match(validarMidia({ rede: 'instagram', formato: 'carrossel', midia: [] }), /sem mídia|não tem mídia/);
  assert.match(validarMidia({ rede: 'instagram', formato: 'carrossel', midia: ['http://a/1.jpg', 'http://a/2.jpg'] }), /https/);
  assert.match(validarMidia({ rede: 'instagram', formato: 'carrossel', midia: ['https://a/1.png', 'https://a/2.png'] }), /JPEG/);
  assert.match(validarMidia({ rede: 'instagram', formato: 'carrossel', midia: [jpg(1)] }), /2 a 10/);
  assert.equal(validarMidia({ rede: 'instagram', formato: 'carrossel', midia: [jpg(1), jpg(2)] }), '');
  assert.equal(validarMidia({ rede: 'ambas', formato: 'feed', midia: [jpg(1)] }), '');
  assert.match(validarMidia({ rede: 'instagram', formato: 'feed', midia: [jpg(1), jpg(2)] }), /exatamente 1/);
  assert.equal(validarMidia({ rede: 'ambas', formato: 'video', midia: ['https://a/v.mp4'] }), '');
  assert.match(validarMidia({ rede: 'instagram', formato: 'reel', midia: [jpg(1)] }), /MP4/);
  assert.match(validarMidia({ rede: 'instagram', formato: 'carrossel', midia: Array.from({ length: 11 }, (_, i) => jpg(i)) }), /2 a 10/);
});

test('publicarPost de carrossel cria filhos na ordem, espera o processamento e publica', async () => {
  const { publicarPost } = await carregar('agencia-instagram.mjs');
  let n = 0, estados = 0;
  const f = criarFetch({
    'POST /v26.0/IG1/media_publish': resp({ id: 'MID9' }),
    'POST /v26.0/IG1/media': () => resp({ id: 'C' + (++n) }),
    'GET /v26.0/C1': () => resp({ status_code: estados++ === 0 ? 'IN_PROGRESS' : 'FINISHED' }),
    'GET /v26.0/C2': resp({ status_code: 'FINISHED' }),
    'GET /v26.0/C3': resp({ status_code: 'FINISHED' }),
    'GET /v26.0/MID9': resp({ permalink: 'https://www.instagram.com/p/abc/' }),
  });
  const r = await publicarPost({ fetchFn: f, token: TOKEN, igUserId: 'IG1', post: { rede: 'instagram', formato: 'carrossel', legenda: 'Oi', midia: [jpg(1), jpg(2)] }, dormir: semEspera });
  assert.deepEqual(r, { id: 'MID9', permalink: 'https://www.instagram.com/p/abc/' });
  const posts = f.chamadas.filter((c) => c.metodo === 'POST');
  assert.equal(posts.length, 4);
  assert.deepEqual(JSON.parse(posts[0].corpo), { image_url: jpg(1), is_carousel_item: true });
  assert.deepEqual(JSON.parse(posts[1].corpo), { image_url: jpg(2), is_carousel_item: true });
  assert.deepEqual(JSON.parse(posts[2].corpo), { media_type: 'CAROUSEL', children: 'C1,C2', caption: 'Oi' });
  assert.deepEqual(JSON.parse(posts[3].corpo), { creation_id: 'C3' });
  assert.ok(f.chamadas.every((c) => c.auth === 'Bearer ' + TOKEN), 'o token vai no cabeçalho');
  assert.ok(f.chamadas.every((c) => !c.query.includes(TOKEN)), 'o token não vai na URL');
});

test('publicarPost falha sem publicar quando o Instagram recusa a mídia', async () => {
  const { publicarPost, ErroInstagram } = await carregar('agencia-instagram.mjs');
  const f = criarFetch({ 'POST /v26.0/IG1/media': resp({ id: 'C1' }), 'GET /v26.0/C1': resp({ status_code: 'ERROR' }) });
  await assert.rejects(publicarPost({ fetchFn: f, token: TOKEN, igUserId: 'IG1', post: { rede: 'instagram', formato: 'feed', midia: [jpg(1)] }, dormir: semEspera }), (e) => e instanceof ErroInstagram && /recusou/.test(e.message) && !e.message.includes(TOKEN));
  assert.equal(f.chamadas.filter((c) => c.caminho.endsWith('media_publish')).length, 0);
});

test('publicarPost desiste por tempo sem publicar e não repete', async () => {
  const { publicarPost } = await carregar('agencia-instagram.mjs');
  const f = criarFetch({ 'POST /v26.0/IG1/media': resp({ id: 'C1' }), 'GET /v26.0/C1': resp({ status_code: 'IN_PROGRESS' }) });
  await assert.rejects(publicarPost({ fetchFn: f, token: TOKEN, igUserId: 'IG1', post: { rede: 'instagram', formato: 'feed', midia: [jpg(1)] }, tentativas: 3, dormir: semEspera }), /demorou demais/);
  assert.equal(f.chamadas.filter((c) => c.caminho.endsWith('media_publish')).length, 0);
});

test('mensagem de erro da Meta é repassada sem vazar token', async () => {
  const { publicarPost } = await carregar('agencia-instagram.mjs');
  const f = criarFetch({ 'POST /v26.0/IG1/media': resp({ error: { message: 'Invalid OAuth access token.' } }, 400) });
  await assert.rejects(publicarPost({ fetchFn: f, token: TOKEN, igUserId: 'IG1', post: { rede: 'instagram', formato: 'feed', midia: [jpg(1)] }, dormir: semEspera }), (e) => /Invalid OAuth/.test(e.message) && !e.message.includes(TOKEN));
});

test('troca de código aceita as duas formas de resposta e gera token de longa duração', async () => {
  const m = await carregar('agencia-instagram.mjs');
  const plano = criarFetch({ 'POST /oauth/access_token': resp({ access_token: 'curto', user_id: 123 }) });
  assert.deepEqual(await m.trocarCodigo({ fetchFn: plano, appId: 'A', appSecret: 'S', redirectUri: 'https://r', code: 'c' }), { tokenCurto: 'curto', userId: '123' });
  assert.match(String(plano.chamadas[0].corpo), /grant_type=authorization_code/);
  const lista = criarFetch({ 'POST /oauth/access_token': resp({ data: [{ access_token: 'curto2', user_id: '9', permissions: 'x' }] }) });
  assert.equal((await m.trocarCodigo({ fetchFn: lista, appId: 'A', appSecret: 'S', redirectUri: 'https://r', code: 'c' })).tokenCurto, 'curto2');
  const longo = criarFetch({ 'GET /access_token': resp({ access_token: 'longo', token_type: 'bearer', expires_in: 5184000 }) });
  assert.deepEqual(await m.tokenLongo({ fetchFn: longo, appSecret: 'S', tokenCurto: 'curto' }), { token: 'longo', expiraEmSeg: 5184000 });
  const ren = criarFetch({ 'GET /refresh_access_token': resp({ access_token: 'novo', expires_in: 5184000 }) });
  assert.equal((await m.renovarToken({ fetchFn: ren, token: 'longo' })).token, 'novo');
});

// ---- manipuladores ----
function criarDbFalso({ posts = [], conexao = null, estadoOk = true } = {}) {
  const db = { posts, con: conexao, atualizacoes: [], logs: [], atividades: [], salvas: [], reservas: 0,
    async reservar() { db.reservas++; const r = db.posts; db.posts = []; return r; },
    async atualizarPost(id, patch) { db.atualizacoes.push({ id, ...patch }); },
    async logar(postId, nivel, msg) { db.logs.push({ postId, nivel, msg }); },
    async atividade(acao, titulo) { db.atividades.push({ acao, titulo }); },
    async conexao() { return db.con; },
    async salvarConexao(c) { db.salvas.push(c); db.con = c; },
    async consumirEstado() { const ok = estadoOk; estadoOk = false; return ok; } };
  return db;
}
const reqPublicar = (segredo = 'seg') => new Request('https://x/f', { method: 'POST', headers: segredo ? { 'x-agencia-secret': segredo } : {} });
const agoraFixo = () => new Date('2026-11-10T12:00:00Z');
const postOk = { id: 'p1', titulo: 'T', rede: 'instagram', formato: 'feed', legenda: 'L', midia: [jpg(1)] };
const conOk = { ig_user_id: 'IG1', access_token: TOKEN, escopos: 'instagram_business_basic,instagram_business_content_publish', expira_em: '2027-01-01T00:00:00Z', atualizado_em: '2026-11-09T00:00:00Z', conectado_em: '2026-11-01T00:00:00Z' };
const conUnif = { ig_user_id: 'IG1', access_token: TOKEN, escopos: 'instagram_basic,instagram_content_publish', expira_em: '9999-12-31T00:00:00.000Z', atualizado_em: '2026-09-01T00:00:00Z', conectado_em: '2026-09-01T00:00:00Z' };
const fetchPublica = () => criarFetch({
  'POST /v26.0/IG1/media_publish': resp({ id: 'M1' }), 'POST /v26.0/IG1/media': resp({ id: 'C1' }),
  'GET /v26.0/C1': resp({ status_code: 'FINISHED' }), 'GET /v26.0/M1': resp({ permalink: 'https://www.instagram.com/p/z/' }),
});

test('publicar exige segredo e método POST', async () => {
  const { tratarPublicar } = await carregar('agencia-handlers.mjs');
  const base = { db: criarDbFalso(), fetchFn: criarFetch({}), agora: agoraFixo };
  assert.equal((await tratarPublicar(new Request('https://x/f'), { ...base, env: (k) => ({ AGENCIA_CRON_SECRET: 'seg' })[k] })).status, 405);
  assert.equal((await tratarPublicar(reqPublicar(), { ...base, env: () => undefined })).status, 503);
  assert.equal((await tratarPublicar(reqPublicar('errado'), { ...base, env: (k) => ({ AGENCIA_CRON_SECRET: 'seg' })[k] })).status, 401);
  assert.equal((await tratarPublicar(reqPublicar(''), { ...base, env: (k) => ({ AGENCIA_CRON_SECRET: 'seg' })[k] })).status, 401);
  assert.equal(base.db.reservas, 0, 'nada é reservado sem autenticação');
});

test('modo simulação nunca chama o Instagram', async () => {
  const { tratarPublicar } = await carregar('agencia-handlers.mjs');
  const f = criarFetch({}); const db = criarDbFalso({ posts: [postOk] });
  const r = await tratarPublicar(reqPublicar(), { env: (k) => ({ AGENCIA_CRON_SECRET: 'seg' })[k], db, fetchFn: f, agora: agoraFixo });
  assert.equal((await r.json()).resultado[0].status, 'simulado');
  assert.equal(f.chamadas.length, 0);
  assert.equal(db.atualizacoes[0].status_publicacao, 'simulado');
});

test('modo real publica, registra o link e não repete', async () => {
  const { tratarPublicar } = await carregar('agencia-handlers.mjs');
  const f = fetchPublica(); const db = criarDbFalso({ posts: [postOk], conexao: conOk });
  const dep = { env: (k) => ({ AGENCIA_CRON_SECRET: 'seg', AGENCIA_MODO: 'real' })[k], db, fetchFn: f, agora: agoraFixo, dormir: semEspera };
  const j = await (await tratarPublicar(reqPublicar(), dep)).json();
  assert.equal(j.resultado[0].status, 'publicado');
  const up = db.atualizacoes[0];
  assert.equal(up.status_publicacao, 'publicado'); assert.equal(up.publicacao_id, 'M1'); assert.equal(up.publicacao_url, 'https://www.instagram.com/p/z/');
  const antes = f.chamadas.length;
  const j2 = await (await tratarPublicar(reqPublicar(), dep)).json();
  assert.equal(j2.processados, 0); assert.equal(f.chamadas.length, antes, 'segunda rodada não toca na Meta');
});

test('modo real sem conexão ou com token vencido registra erro sem chamar a Meta', async () => {
  const { tratarPublicar } = await carregar('agencia-handlers.mjs');
  const env = (k) => ({ AGENCIA_CRON_SECRET: 'seg', AGENCIA_MODO: 'real' })[k];
  let f = criarFetch({}); let db = criarDbFalso({ posts: [postOk] });
  await tratarPublicar(reqPublicar(), { env, db, fetchFn: f, agora: agoraFixo });
  assert.match(db.atualizacoes[0].publicacao_erro, /não está conectado/); assert.equal(f.chamadas.length, 0);
  f = criarFetch({}); db = criarDbFalso({ posts: [postOk], conexao: { ...conOk, expira_em: '2026-11-01T00:00:00Z' } });
  await tratarPublicar(reqPublicar(), { env, db, fetchFn: f, agora: agoraFixo });
  assert.match(db.atualizacoes[0].publicacao_erro, /expirou/); assert.equal(f.chamadas.length, 0);
});

test('modo real valida a mídia antes de falar com a Meta', async () => {
  const { tratarPublicar } = await carregar('agencia-handlers.mjs');
  const f = criarFetch({}); const db = criarDbFalso({ posts: [{ ...postOk, midia: [] }], conexao: conOk });
  await tratarPublicar(reqPublicar(), { env: (k) => ({ AGENCIA_CRON_SECRET: 'seg', AGENCIA_MODO: 'real' })[k], db, fetchFn: f, agora: agoraFixo });
  assert.match(db.atualizacoes[0].publicacao_erro, /mídia/); assert.equal(f.chamadas.length, 0);
});

test('token perto de vencer é renovado sozinho; renovação com falha não derruba a rodada', async () => {
  const { tratarPublicar } = await carregar('agencia-handlers.mjs');
  const env = (k) => ({ AGENCIA_CRON_SECRET: 'seg', AGENCIA_MODO: 'real' })[k];
  const perto = { ...conOk, expira_em: '2026-11-20T00:00:00Z', atualizado_em: '2026-10-01T00:00:00Z' };
  const f = criarFetch({ 'GET /refresh_access_token': resp({ access_token: 'NOVO', expires_in: 5184000 }) });
  const db = criarDbFalso({ conexao: perto });
  await tratarPublicar(reqPublicar(), { env, db, fetchFn: f, agora: agoraFixo });
  assert.equal(db.salvas[0].access_token, 'NOVO');
  assert.equal(new Date(db.salvas[0].expira_em).getTime(), agoraFixo().getTime() + 5184000 * 1000);
  const f2 = criarFetch({ 'GET /refresh_access_token': resp({ error: { message: 'x' } }, 400) }); const db2 = criarDbFalso({ conexao: perto });
  const r2 = await tratarPublicar(reqPublicar(), { env, db: db2, fetchFn: f2, agora: agoraFixo });
  assert.equal(r2.status, 200); assert.equal(db2.logs[0].nivel, 'erro');
  // token recente (menos de 24 h) não é renovado
  const f3 = criarFetch({}); const db3 = criarDbFalso({ conexao: { ...perto, atualizado_em: '2026-11-10T08:00:00Z' } });
  await tratarPublicar(reqPublicar(), { env, db: db3, fetchFn: f3, agora: agoraFixo }); assert.equal(f3.chamadas.length, 0);
});

const reqCb = (qs) => new Request('https://x.supabase.co/functions/v1/agencia-instagram-callback' + qs);
const envCb = (k) => ({ META_APP_ID: 'APP', META_APP_SECRET: 'SEGREDO', SUPABASE_URL: 'https://x.supabase.co', SITE_URL: 'https://site.exemplo' })[k];
const envCbLegado = (k) => (k === 'IG_LOGIN' ? 'instagram' : envCb(k));

test('callback recusa state inexistente, repetido ou pedido negado', async () => {
  const { tratarCallback } = await carregar('agencia-handlers.mjs');
  const f = criarFetch({});
  const r1 = await tratarCallback(reqCb('?code=c&state=ruim'), { env: envCb, db: criarDbFalso({ estadoOk: false }), fetchFn: f, agora: agoraFixo });
  assert.equal(r1.headers.get('Location'), 'https://site.exemplo/agencia/?instagram=estado-invalido');
  const r2 = await tratarCallback(reqCb('?error=access_denied&state=s'), { env: envCb, db: criarDbFalso(), fetchFn: f, agora: agoraFixo });
  assert.equal(r2.headers.get('Location'), 'https://site.exemplo/agencia/?instagram=negado');
  const r3 = await tratarCallback(reqCb(''), { env: envCb, db: criarDbFalso(), fetchFn: f, agora: agoraFixo });
  assert.equal(r3.headers.get('Location'), 'https://site.exemplo/agencia/?instagram=invalido');
  assert.equal(f.chamadas.length, 0);
});

test('callback guarda a conexão sem expor o token e o state só vale uma vez', async () => {
  const { tratarCallback } = await carregar('agencia-handlers.mjs');
  const f = criarFetch({
    'POST /oauth/access_token': resp({ access_token: 'curto', user_id: '77' }),
    'GET /access_token': resp({ access_token: 'LONGO-SECRETO', expires_in: 5184000 }),
    'GET /v26.0/me': resp({ user_id: '77', username: 'traube.med' }),
  });
  const db = criarDbFalso();
  const dep = { env: envCbLegado, db, fetchFn: f, agora: agoraFixo };
  const r = await tratarCallback(reqCb('?code=abc%23_&state=ok'), dep);
  const loc = r.headers.get('Location');
  assert.equal(loc, 'https://site.exemplo/agencia/?instagram=conectado');
  assert.ok(!loc.includes('LONGO') && !loc.includes('SEGREDO'));
  assert.equal(db.salvas[0].access_token, 'LONGO-SECRETO'); assert.equal(db.salvas[0].username, 'traube.med'); assert.equal(db.salvas[0].ig_user_id, '77');
  assert.match(String(f.chamadas[0].corpo), /code=abc(&|$)/, 'o sufixo #_ é removido do código');
  assert.match(String(f.chamadas[0].corpo), /redirect_uri=https%3A%2F%2Fx\.supabase\.co%2Ffunctions%2Fv1%2Fagencia-instagram-callback/);
  const de = await tratarCallback(reqCb('?code=abc&state=ok'), dep);
  assert.equal(de.headers.get('Location'), 'https://site.exemplo/agencia/?instagram=estado-invalido');
  assert.ok(db.atividades.every((a) => !JSON.stringify(a).includes('LONGO')));
});

test('callback com falha da Meta redireciona com erro e não grava nada', async () => {
  const { tratarCallback } = await carregar('agencia-handlers.mjs');
  const f = criarFetch({ 'POST /oauth/access_token': resp({ error: { message: 'Invalid verification code' } }, 400) });
  const db = criarDbFalso();
  const r = await tratarCallback(reqCb('?code=abc&state=ok'), { env: envCbLegado, db, fetchFn: f, agora: agoraFixo });
  assert.equal(r.headers.get('Location'), 'https://site.exemplo/agencia/?instagram=erro');
  assert.equal(db.salvas.length, 0); assert.equal(db.logs[0].nivel, 'erro');
  assert.ok(!JSON.stringify(db.logs).includes('SEGREDO'));
});

// ---- login unificado (apps novos da Meta) ----
test('login unificado: troca o código, descobre a conta, guarda token sem expiração e não vaza segredo', async () => {
  const { tratarCallback } = await carregar('agencia-handlers.mjs');
  const f = criarFetch({
    'GET /v26.0/oauth/access_token': resp({ access_token: 'SUAT-SECRETO' }),
    'GET /v26.0/debug_token': resp({ data: { is_valid: true, granular_scopes: [{ scope: 'instagram_basic', target_ids: ['178414'] }, { scope: 'instagram_content_publish', target_ids: ['178414'] }] } }),
    'GET /v26.0/178414': resp({ username: 'traube.med' }),
  });
  const db = criarDbFalso();
  const r = await tratarCallback(reqCb('?code=abc%23_&state=ok'), { env: envCb, db, fetchFn: f, agora: agoraFixo });
  assert.equal(r.headers.get('Location'), 'https://site.exemplo/agencia/?instagram=conectado');
  assert.ok(f.chamadas.every((c) => c.host === 'graph.facebook.com'));
  assert.match(f.chamadas[0].query, /client_id=APP/); assert.match(f.chamadas[0].query, /code=abc(&|$)/);
  assert.match(f.chamadas[1].query, /input_token=SUAT-SECRETO/); assert.match(f.chamadas[1].query, /access_token=APP%7CSEGREDO/);
  const c = db.salvas[0];
  assert.equal(c.ig_user_id, '178414'); assert.equal(c.username, 'traube.med'); assert.equal(c.access_token, 'SUAT-SECRETO');
  assert.equal(c.escopos, 'instagram_basic,instagram_content_publish'); assert.equal(c.expira_em, '9999-12-31T00:00:00.000Z');
  assert.ok(!r.headers.get('Location').includes('SUAT') && !JSON.stringify(db.atividades).includes('SUAT'));
});

test('login unificado: sem conta liberada ou com token inválido não grava nada', async () => {
  const { tratarCallback } = await carregar('agencia-handlers.mjs');
  const semConta = criarFetch({ 'GET /v26.0/oauth/access_token': resp({ access_token: 'T' }), 'GET /v26.0/debug_token': resp({ data: { is_valid: true, granular_scopes: [] } }) });
  const db1 = criarDbFalso();
  const r1 = await tratarCallback(reqCb('?code=a&state=ok'), { env: envCb, db: db1, fetchFn: semConta, agora: agoraFixo });
  assert.equal(r1.headers.get('Location'), 'https://site.exemplo/agencia/?instagram=sem-conta'); assert.equal(db1.salvas.length, 0);
  const invalido = criarFetch({ 'GET /v26.0/oauth/access_token': resp({ error: { message: 'Invalid code' } }, 400) });
  const db2 = criarDbFalso();
  const r2 = await tratarCallback(reqCb('?code=a&state=ok'), { env: envCb, db: db2, fetchFn: invalido, agora: agoraFixo });
  assert.equal(r2.headers.get('Location'), 'https://site.exemplo/agencia/?instagram=erro'); assert.equal(db2.salvas.length, 0);
});

test('login unificado: sem granular_scopes usa o ID configurado e confirma com o Meta', async () => {
  const { tratarCallback } = await carregar('agencia-handlers.mjs');
  const mk = (perfilResp) => criarFetch({
    'GET /v26.0/oauth/access_token': resp({ access_token: 'T' }),
    'GET /v26.0/debug_token': resp({ data: { is_valid: true, granular_scopes: [{ scope: 'instagram_basic', target_ids: [] }] } }),
    'GET /v26.0/178999': perfilResp,
  });
  const db1 = criarDbFalso(); db1.configValor = async () => '178999';
  const r1 = await tratarCallback(reqCb('?code=a&state=ok'), { env: envCb, db: db1, fetchFn: mk(resp({ username: 'traube.med' })), agora: agoraFixo });
  assert.equal(r1.headers.get('Location'), 'https://site.exemplo/agencia/?instagram=conectado');
  assert.equal(db1.salvas[0].ig_user_id, '178999'); assert.equal(db1.salvas[0].username, 'traube.med');
  const db2 = criarDbFalso(); db2.configValor = async () => '178999';
  const r2 = await tratarCallback(reqCb('?code=a&state=ok'), { env: envCb, db: db2, fetchFn: mk(resp({ error: { message: 'sem acesso' } }, 400)), agora: agoraFixo });
  assert.equal(r2.headers.get('Location'), 'https://site.exemplo/agencia/?instagram=sem-conta'); assert.equal(db2.salvas.length, 0);
});

test('publicação com conexão unificada usa graph.facebook.com e nunca tenta renovar', async () => {
  const { tratarPublicar } = await carregar('agencia-handlers.mjs');
  const f = fetchPublica(); const db = criarDbFalso({ posts: [postOk], conexao: conUnif });
  const dep = { env: (k) => ({ AGENCIA_CRON_SECRET: 'seg', AGENCIA_MODO: 'real' })[k], db, fetchFn: f, agora: agoraFixo, dormir: semEspera };
  const j = await (await tratarPublicar(reqPublicar(), dep)).json();
  assert.equal(j.resultado[0].status, 'publicado');
  assert.ok(f.chamadas.length > 0 && f.chamadas.every((c) => c.host === 'graph.facebook.com'));
  assert.ok(f.chamadas.every((c) => !c.caminho.includes('refresh_access_token')));
  assert.equal(db.salvas.length, 0);
});
