const CACHE_VERSION = "luria-pwa-20261030-ecg-v3";
const STATIC_CACHE = CACHE_VERSION + "-static";
const RUNTIME_CACHE = CACHE_VERSION + "-runtime";
const WEEKLY_CONTENT_CACHE = CACHE_VERSION + "-weekly";
const PLANTAO_IMAGE_CACHE = CACHE_VERSION + "-images";

const PLANTAO_IMAGE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
const RUNTIME_MAX_ITEMS = 90;
const PLANTAO_MAX_ITEMS = 60;
const WEEKLY_MAX_ITEMS = 24;

const APP_SHELL = [
  "/assets/js/plantao-overlays.js?v=20261016-overlays1",
  "/assets/css/plantao-overlays.css?v=20261016-overlays1",
  "/assets/js/luria-personagens-original.js?v=20261016-original1",
  "/assets/js/plantao-frontal-v1.js?v=20261021-aph1",
  "/assets/js/plantao-aph-characters.js?v=20261021-aph1",
  "/assets/css/plantao-aph-characters.css?v=20261021-aph1",
  "/assets/js/plantao-monitor.js?v=20261016-overlays1",
  "/assets/css/plantao-patient-original.css?v=20261016-original1",
  "/",
  "/index.html",
  "/login/",
  "/dashboard/",
  "/vocacao/",
  "/flashcards/",
  "/questoes-simulados/",
  "/aprender/",
  "/feynman/",
  "/consolidar/",
  "/cronograma/",
  "/caderno/",
  "/caderno-erros/",
  "/estatisticas/",
  "/amigos/",
  "/apostilas/",
  "/assets/css/apostila-paged-reader.css?v=20261028-reader1",
  "/assets/js/apostila-paged-reader.js?v=20261028-reader1",
  "/assets/css/apostilas-hall.css?v=20261028-area-flow1",
  "/assets/js/apostilas-app.js?v=20261028-area-flow1",
  "/trabalho/",
  "/trabalho/paciente/",
  "/trabalho/calculadora/",
  "/trabalho/scores/",
  "/assets/js/clinical-calculators-expansion.js?v=20261024",
  "/assets/js/clinical-calculators-audit-batch1.js?v=20261024-batch1",
  "/assets/js/clinical-calculators-audit-batch2.js?v=20261024-batch2",
  "/assets/js/clinical-calculators-audit-batch3.js?v=20261024-batch3",
  "/manifest.webmanifest?v=5",
  "/mini-osce/",
  "/jogos/",
  "/jogos/study-rats/",
  "/jogos/study-rats/hall.css?v=20261021-hall1",
  "/jogos/study-rats/hall.js?v=20261021-hall1",
  "/jogos/study-rats/game.js?v=20261021-hall1",
  "/jogos/plantao-relampago/",
  "/jogos/sequencia-salvadora/",
  "/jogos/escapando-do-plantao/",
  "/assets/img/logos/pwa-icon-180.png?v=pwa5",
  "/assets/img/logos/logo-principal.png?v=luria7",
  "/assets/vendor/supabase-2.110.6.js",
  "/assets/js/pwa.js?v=20261030-leco-v1",
  "/assets/css/style.css?v=16.14-font-unified",
  "/assets/css/luria-brand-v5.css?v=20261005-global-v90",
  "/assets/css/review-fixes-20261020.css?v=20261021-darktext-grad-v4",
  "/assets/css/review-continuation-20261022.css?v=20261023-visible2",
  "/assets/js/review-continuation-20261022.js?v=1",
  "/assets/js/luria-command-center.js?v=20261026-topic-study",
  "/assets/js/professor-alex-companion.mjs?v=20261026-visible5",
  "/assets/js/professor-alex-mascot.mjs?v=20261014-ready2",
  "/assets/js/professor-alex-integration.mjs?v=20261014-ready2",
  "/assets/css/professor-alex-companion.css?v=20261026-visible5",
  "/assets/css/dashboard-layouts.css?v=20261020-card-grid-all",
  "/assets/js/ui-routes.js?v=1",
  "/assets/css/ui-app.css?v=7",
  "/assets/css/dashboard-ui-v2.css?v=1",
  "/assets/css/education-ui-v2.css?v=2",
  "/assets/css/feynman.css?v=20261026-1",
  "/assets/js/feynman.mjs?v=20261026-1",
  "/assets/css/social-v3.css?v=2",
  "/assets/css/social-v4.css?v=9",
  "/assets/css/social-friends.css?v=12",
  "/assets/css/social-groups.css?v=5",
  "/assets/css/social-group-community.css?v=3",
  "/assets/js/social-group-community.js?v=3",
  "/assets/js/social-native-activities.js?v=1",
  "/assets/css/social-native-activities.css?v=1",
  "/assets/js/room-native-embed.js?v=1",
  "/assets/css/room-native-embed.css?v=1",
  "/assets/css/social-rats.css?v=8",
  "/assets/css/social-rooms-design.css?v=13",
  "/assets/css/social-responsive.css?v=4",
  "/assets/js/social-view.js?v=composition2",
  "/assets/js/amigos.js?v=50-feedback",
  "/assets/js/studyrats.js?v=48-composition",
  "/assets/js/social-rooms.js?v=20",
  "/assets/js/social-voice.js?v=8",
  "/assets/js/social-presence.js?v=1",
  "/assets/js/community-navigation.js?v=stage1",
  "/assets/js/ui-theme-v2.js?v=20261013-frame2",
  "/assets/js/ui-navigation-v2.js?v=20261028-aprender-cleanup-v8",
  "/assets/js/dashboard-ui-v2.js?v=20261013-boot1",
  "/assets/js/supabase.js?v=auth4",
  "/assets/js/auth.js?v=auth4",
  "/assets/js/app.js?v=20261020-sidebar-nav",
  "/assets/css/patient-workspace.css?v=1",
  "/assets/css/patient-workspace-v2.css?v=2",
  "/assets/js/patient-context.js?v=1",
  "/assets/js/patient-workspace.js?v=2",
  "/assets/css/vocacao.css?v=20261029-residencias-v1",
  "/assets/js/vocacao-data.js?v=20261029-residencias-v1",
  "/assets/js/vocacao-engine.js?v=20261029-residencias-v1",
  "/assets/js/vocacao.js?v=20261029-residencias-v1",
  "/assets/js/dashboard-layouts.js?v=20261005-dashboard3-v101",
  "/assets/css/pwa-mobile.css?v=20260930-layout-pcr",
  "/assets/css/flashcards-ui-v2.css?v=1",
  "/assets/css/calculadora-pwa-fix.css?v=20261012-pwa-calcs-2",
  "/assets/js/calculadora-pwa-dates.js?v=20261012-pwa-calcs-2",
  "/assets/js/weekly-content.js?v=1",
  "/assets/img/logos/pwa-icon-180.png?v=3",
  "/assets/js/supabase.js",
  "/assets/css/education-pages-v2.css?v=1",
  "/assets/css/style.css?v=16.12-no-legacy-dashboard",
  "/assets/fonts/inter/InterVariable.woff2",
  "/assets/js/dashboard.js?v=20261006-css-owned-height",
  "/assets/js/study-mode.js?v=12.1",
  "/assets/js/luria-brand-v5.js?v=20261023-visible2",
  "/assets/img/logos/pwa-icon-192.png?v=pwa5",
  "/assets/img/logos/pwa-icon-512.png?v=pwa5"
];

// APP_SHELL permanece como lista de rotas públicas reconhecidas pelo service worker.
// No primeiro acesso, somente os recursos fundamentais abaixo são pré-carregados:
// o restante é solicitado e guardado em cache conforme a página for visitada.
// Isso evita baixar a biblioteca inteira, variações antigas de JS e PNGs de ~1 MB.
const INSTALL_PRECACHE = new Set([
  "/",
  "/login/",
  "/dashboard/",
  "/vocacao/",
  "/apostilas/",
  "/manifest.webmanifest?v=5",
  "/assets/vendor/supabase-2.110.6.js",
  "/assets/js/pwa.js?v=20261030-leco-v1",
  "/assets/css/style.css?v=16.14-font-unified",
  "/assets/css/luria-brand-v5.css?v=20261005-global-v90",
  "/assets/css/review-fixes-20261020.css?v=20261021-darktext-grad-v4",
  "/assets/css/review-continuation-20261022.css?v=20261023-visible2",
  "/assets/js/review-continuation-20261022.js?v=1",
  "/assets/js/luria-command-center.js?v=20261026-topic-study",
  "/assets/js/professor-alex-companion.mjs?v=20261026-visible5",
  "/assets/js/professor-alex-mascot.mjs?v=20261014-ready2",
  "/assets/js/professor-alex-integration.mjs?v=20261014-ready2",
  "/assets/css/professor-alex-companion.css?v=20261026-visible5",
  "/assets/js/ui-routes.js?v=1",
  "/assets/css/ui-app.css?v=7",
  "/assets/css/education-ui-v2.css?v=2",
  "/assets/js/ui-theme-v2.js?v=20261013-frame2",
  "/assets/js/ui-navigation-v2.js?v=20261028-aprender-cleanup-v8",
  "/assets/js/supabase.js?v=auth4",
  "/assets/js/app.js?v=20261020-sidebar-nav",
  "/assets/css/vocacao.css?v=20261029-residencias-v1",
  "/assets/js/vocacao-data.js?v=20261029-residencias-v1",
  "/assets/js/vocacao-engine.js?v=20261029-residencias-v1",
  "/assets/js/vocacao.js?v=20261029-residencias-v1",
  "/assets/fonts/inter/InterVariable.woff2",
  "/assets/js/luria-brand-v5.js?v=20261023-visible2"
]);


const ACTIVE_CACHES = [STATIC_CACHE, RUNTIME_CACHE, WEEKLY_CONTENT_CACHE, PLANTAO_IMAGE_CACHE];
const PUBLIC_PAGES = new Set(APP_SHELL.filter(path => path.endsWith("/") || path === "/index.html"));

function publicResource(request) {
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || request.method !== "GET"
      || (request.credentials === "include" && request.mode !== "navigate") || request.cache === "no-store"
      || /(?:^|,)\s*no-store(?:\s*(?:,|$)|\s*=)/i.test(request.headers.get("Cache-Control") || "")
      || ["authorization", "proxy-authorization", "apikey", "x-api-key", "cookie", "range"]
        .some(header => request.headers.has(header))) return false;
  // Only explicit version parameters are cacheable. Unknown parameters may carry
  // tokens, signatures or personal identifiers, even on a static-looking URL.
  if ([...url.searchParams.keys()].some(key => key !== "v") || url.searchParams.getAll("v").length > 1) return false;
  if (url.username || url.password) return false;
  const path = url.pathname;
  // Encoded separators can be decoded differently by the server/router.
  if (/%(?:2f|5c)/i.test(path)) return false;
  return PUBLIC_PAGES.has(path)
    || /^\/apostilas\/[a-z0-9-]+\/(?:index\.html|content\.json)?$/.test(path)
    || path === "/manifest.webmanifest"
    || path === "/content/weekly/manifest.json"
    || /^\/jogos\/study-rats\/(?:hall|game)\.(?:css|js)$/.test(path)
  || /^\/assets\/(?:js|css|vendor|fonts|img)\/[a-zA-Z0-9/_%. -]+\.(?:m?js|css|wasm|woff2?|ttf|otf|png|jpe?g|svg|webp|gif|ico)$/.test(path);
}

function cacheableResponse(request, response) {
  if (!publicResource(request) || !response || response.status !== 200
      || response.redirected || ["opaque", "opaqueredirect", "error"].includes(response.type)) return false;
  if (response.url && new URL(response.url).origin !== self.location.origin) return false;
  const headers = response.headers;
  if (["authorization", "proxy-authorization", "set-cookie"].some(header => headers.has(header))) return false;
  const directives = (headers.get("Cache-Control") || "").split(",").map(value => value.trim().split("=")[0].toLowerCase());
  if (["private", "no-store", "no-cache", "must-revalidate", "proxy-revalidate"].some(value => directives.includes(value))) return false;
  const vary = (headers.get("Vary") || "").toLowerCase().split(",").map(value => value.trim()).filter(Boolean);
  if (vary.some(value => !["accept", "accept-encoding", "origin"].includes(value))) return false;
  const path = new URL(request.url).pathname;
  const type = (headers.get("Content-Type") || "").split(";")[0].toLowerCase().trim();
  if (/\.m?js$/.test(path)) return ["text/javascript", "application/javascript"].includes(type);
  if (path.endsWith(".css")) return type === "text/css";
  if (path.endsWith(".json")) return type === "application/json";
  if (path.endsWith(".webmanifest")) return ["application/manifest+json", "application/json"].includes(type);
  if (/\.(?:png|jpe?g|svg|webp|gif|ico)$/.test(path)) return type.startsWith("image/");
  if (/\.(?:woff2?|ttf|otf)$/.test(path)) return type.startsWith("font/") || type === "application/octet-stream";
  if (path.endsWith(".wasm")) return type === "application/wasm";
  return type === "text/html";
}

function cacheNames(request) {
  const path = new URL(request.url).pathname;
  if (path.startsWith("/content/weekly/")) return [WEEKLY_CONTENT_CACHE];
  if (/^\/assets\/img\/plantao(?:\/|%20pwa\/| pwa\/)/.test(path)) return [PLANTAO_IMAGE_CACHE];
  return [RUNTIME_CACHE, STATIC_CACHE];
}

async function exactCached(request) {
  for (const name of cacheNames(request)) {
    try {
      const cache = await caches.open(name);
      const response = await cache.match(request);
      if (response && cacheableResponse(request, response)) return response;
      if (response) await cache.delete(request);
    } catch {}
  }
  return null;
}

async function trimCache(cacheName, maxItems) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  await Promise.all(keys.slice(0, Math.max(0, keys.length - maxItems)).map(key => cache.delete(key)));
}

async function storePublic(request, response, name = cacheNames(request)[0]) {
  try {
    if (!cacheableResponse(request, response)) {
      // Revoke newly private content and access denials, but don't destroy a
      // valid offline copy just because the server is temporarily unavailable.
      if (response?.status === 200 || [401, 403].includes(response?.status) || response?.redirected) {
        for (const cacheName of cacheNames(request)) await (await caches.open(cacheName)).delete(request);
      }
      return;
    }
    let copy = response.clone();
    if (name === PLANTAO_IMAGE_CACHE) {
      const headers = new Headers(copy.headers);
      headers.set("sw-cached-at", String(Date.now()));
      copy = new Response(copy.body, { status: copy.status, statusText: copy.statusText, headers });
    }
    await (await caches.open(name)).put(request, copy);
    if (name !== STATIC_CACHE) await trimCache(name,
      name === WEEKLY_CONTENT_CACHE ? WEEKLY_MAX_ITEMS : name === PLANTAO_IMAGE_CACHE ? PLANTAO_MAX_ITEMS : RUNTIME_MAX_ITEMS);
  } catch {} // A quota/storage failure must not discard a successful online response.
}

async function fetchPublic(request, cacheName) {
  // Static shells/resources are fetched anonymously. same-origin is the browser
  // default, not evidence of privacy. Navigation defaults to include, but known
  // public shells are fetched anonymously; other include/Authorization bypass SW.
  const response = await fetch(new Request(request, { credentials: "omit" }), { cache: "no-cache" });
  await storePublic(request, response, cacheName);
  return response;
}

async function cacheShellSafely() {
  await Promise.allSettled(APP_SHELL.filter(path => INSTALL_PRECACHE.has(path)).map(path => {
    const request = new Request(new URL(path, self.location.origin), { credentials: "omit" });
    return fetchPublic(request, STATIC_CACHE);
  }));
}

self.addEventListener("install", event => {
  // Preserve the existing immediate update policy; no automatic page reload.
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key =>
      /^(?:luria-pwa-|luria-weekly-content-|luria-plantao-images-)/.test(key)
      && !ACTIVE_CACHES.includes(key)
    ).map(key => caches.delete(key)));
    await self.clients.claim();
    await Promise.race([cacheShellSafely(), new Promise(resolve => setTimeout(resolve, 4000))]);
  })());
});

self.addEventListener("message", event => {
  const data = event.data || {};
  if (data.type !== "LURIA_PREFETCH_WEEKLY_CONTENT") return;
  // Only a same-origin client can ask for the existing public weekly packages.
  if (!event.source?.url || new URL(event.source.url).origin !== self.location.origin) return;
  const requests = (Array.isArray(data.urls) ? data.urls : []).slice(0, 12).flatMap(value => {
    try {
      if (typeof value !== "string") return [];
      const request = new Request(new URL(value, self.location.origin), { credentials: "omit" });
      return publicResource(request) && new URL(request.url).pathname.startsWith("/content/weekly/") ? [request] : [];
    } catch { return []; }
  });
  if (!requests.length) return;
  event.waitUntil((async () => {
    for (const request of requests) {
      if (await exactCached(request)) continue;
      try { await fetchPublic(request); } catch {}
    }
  })());
});

function offlineResponse(request) {
  const path = new URL(request.url).pathname;
  return new Response(path.endsWith(".json") ? "{}" : request.mode === "navigate"
    ? "Sem conexão. Abra uma página já visitada ou tente novamente quando a conexão voltar."
    : "Recurso indisponível offline.", {
    status: 503,
    headers: { "Content-Type": path.endsWith(".json") ? "application/json" : "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}

self.addEventListener("fetch", event => {
  const request = event.request;
  if (!publicResource(request)) return; // APIs/private requests keep the native network path, with no public fallback.
  const url = new URL(request.url);
  const path = url.pathname;
  const navigate = request.mode === "navigate" || path.endsWith(".html") || PUBLIC_PAGES.has(path);
  const manifest = path === "/content/weekly/manifest.json";
  const image = cacheNames(request)[0] === PLANTAO_IMAGE_CACHE;
  const weekly = path.startsWith("/content/weekly/") && !manifest;
  const apostila = request.mode === "navigate" && /^\/apostilas\/[a-z0-9-]+\/$/.test(path);
  // Preserve the existing apostila index fetch, with the full query identity.
  const networkRequest = apostila ? new Request(new URL(path + "index.html" + url.search, self.location.origin), {
    headers: request.headers, credentials: "omit",
  }) : request;
  let network;
  function startNetwork() {
    network ||= fetchPublic(networkRequest).then(async response => {
      if (apostila) await storePublic(request, response);
      return response;
    });
    return network;
  }
  // Keep background refreshes alive on cached code and bounded navigation waits.
  if (!weekly && !image) event.waitUntil(startNetwork().then(() => {}, () => {}));
  event.respondWith((async () => {
    const exact = await exactCached(request);
    if (exact && !navigate && !manifest) {
      if (!image || Date.now() - Number(exact.headers.get("sw-cached-at") || 0) < PLANTAO_IMAGE_MAX_AGE_MS) return exact;
    }
    let timer;
    try {
      const usableNetwork = response => response.ok || [401, 403].includes(response.status) ? response : exact;
      if (exact && manifest) return await startNetwork().then(usableNetwork);
      if (exact && navigate) return await Promise.race([
        startNetwork().then(usableNetwork),
        new Promise(resolve => { timer = setTimeout(() => resolve(exact), 2500); }),
      ]);
      return await startNetwork();
    } catch {
      return exact || offlineResponse(request);
    } finally { clearTimeout(timer); }
  })());
});
