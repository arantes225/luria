const CACHE_VERSION = "luria-pwa-v254-dashboard-progress-fit";
const STATIC_CACHE = CACHE_VERSION + "-static";
const RUNTIME_CACHE = CACHE_VERSION + "-runtime";
const WEEKLY_CONTENT_CACHE = "luria-weekly-content-v1";
const PLANTAO_IMAGE_CACHE = "luria-plantao-images-v3";

const PLANTAO_IMAGE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
const RUNTIME_MAX_ITEMS = 90;
const PLANTAO_MAX_ITEMS = 60;
const WEEKLY_MAX_ITEMS = 24;

const APP_SHELL = [
  "/",
  "/index.html",
  "/login/",
  "/dashboard/",
  "/flashcards/",
  "/questoes-simulados/",
  "/manifest.webmanifest?v=5",
  "/assets/vendor/supabase-2.110.6.js",
  "/assets/css/style.css?v=20261004-scrollbar-thumb-only",
  "/assets/css/luria-brand-v5.css?v=20261004-shell-color-v10",
  "/assets/css/dashboard-layouts.css?v=20261004-dashboard-master-v27",
  "/assets/js/supabase.js?v=auth4",
  "/assets/js/auth.js?v=auth4",
  "/assets/js/app.js?v=20261004-dashboard-master-v11",
  "/assets/js/dashboard-layouts.js?v=20261004-dashboard-master-v15",
  "/assets/js/luria-command-center.js?v=20261002-1",
  "/assets/css/luria-command-center.css?v=20261002-1",
  "/mini-osce/",
  "/assets/js/pwa.js?v=4-force-refresh",
  "/assets/js/weekly-content.js?v=1",
  "/assets/img/logos/pwa-icon-180.png?v=pwa5",
  "/assets/img/logos/pwa-icon-512.png?v=pwa5",
  "/assets/img/logos/logo-principal.png"
];

async function trimCache(cacheName, maxItems) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();

  if (keys.length <= maxItems) return;

  const overflow = keys.slice(0, keys.length - maxItems);
  await Promise.all(overflow.map(key => cache.delete(key)));
}

async function cacheShellSafely() {
  const cache = await caches.open(STATIC_CACHE);

  await Promise.allSettled(
    APP_SHELL.map(async url => {
      const response = await fetch(url, { cache: "no-cache" });
      if (response?.ok) {
        await cache.put(url, response.clone());
      }
    })
  );
}

self.addEventListener("install", event => {
  event.waitUntil(
    cacheShellSafely()
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key =>
            key.startsWith("luria-pwa-")
            && ![STATIC_CACHE, RUNTIME_CACHE].includes(key)
          )
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", event => {
  const data = event.data || {};

  if (data.type !== "LURIA_PREFETCH_WEEKLY_CONTENT") return;

  const urls = (Array.isArray(data.urls) ? data.urls : [])
    .slice(0, 12)
    .filter(value => {
      try {
        const url = new URL(value, self.location.origin);
        return (
          url.origin === self.location.origin
          && url.pathname.startsWith("/content/weekly/")
        );
      } catch {
        return false;
      }
    });

  if (!urls.length) return;

  event.waitUntil((async () => {
    const cache = await caches.open(WEEKLY_CONTENT_CACHE);

    for (const value of urls) {
      const request = new Request(value, { credentials: "same-origin" });
      const existing = await cache.match(request);
      if (existing) continue;

      try {
        const response = await fetch(request);
        if (response?.ok) {
          await cache.put(request, response.clone());
        }
      } catch {}
    }

    await trimCache(WEEKLY_CONTENT_CACHE, WEEKLY_MAX_ITEMS);
  })());
});

self.addEventListener("fetch", event => {
  const request = event.request;

  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (url.pathname === "/content/weekly/manifest.json") {
    event.respondWith((async () => {
      const cache = await caches.open(WEEKLY_CONTENT_CACHE);

      try {
        const response = await fetch(request, { cache: "no-cache" });
        if (response?.ok) {
          await cache.put(request, response.clone());
          return response;
        }
      } catch {}

      return (await cache.match(request))
        || new Response("{}", {
          status: 503,
          headers: { "Content-Type": "application/json" }
        });
    })());
    return;
  }

  if (url.pathname.startsWith("/content/weekly/")) {
    event.respondWith((async () => {
      const cache = await caches.open(WEEKLY_CONTENT_CACHE);
      const cached = await cache.match(request);

      if (cached) return cached;

      const response = await fetch(request);

      if (response?.ok) {
        await cache.put(request, response.clone());
        trimCache(WEEKLY_CONTENT_CACHE, WEEKLY_MAX_ITEMS).catch(() => {});
      }

      return response;
    })());
    return;
  }

  if (
    url.pathname.startsWith("/assets/img/plantao/")
    || url.pathname.startsWith("/assets/img/plantao%20pwa/")
    || url.pathname.startsWith("/assets/img/plantao pwa/")
  ) {
    event.respondWith((async () => {
      const cache = await caches.open(PLANTAO_IMAGE_CACHE);
      const cached = await cache.match(request);

      if (cached) {
        const cachedAt = Number(cached.headers.get("sw-cached-at") || 0);
        if (
          cachedAt
          && (Date.now() - cachedAt) < PLANTAO_IMAGE_MAX_AGE_MS
        ) {
          return cached;
        }
      }

      try {
        const response = await fetch(request);

        if (response?.ok) {
          const body = await response.clone().blob();
          const headers = new Headers(response.headers);
          headers.set("sw-cached-at", String(Date.now()));

          await cache.put(
            request,
            new Response(body, {
              status: response.status,
              statusText: response.statusText,
              headers
            })
          );

          trimCache(PLANTAO_IMAGE_CACHE, PLANTAO_MAX_ITEMS).catch(() => {});
        }

        return response;
      } catch (error) {
        if (cached) return cached;
        throw error;
      }
    })());
    return;
  }

  const isAppCode =
    url.pathname.endsWith(".js")
    || url.pathname.endsWith(".css")
    || url.pathname.endsWith(".html")
    || url.pathname.endsWith(".webmanifest");

  if (request.mode === "navigate" || isAppCode) {
    event.respondWith(
      fetch(request, { cache: "no-store" })
        .then(response => {
          if (response?.status === 200) {
            const copy = response.clone();

            caches.open(RUNTIME_CACHE)
              .then(cache => cache.put(request, copy))
              .then(() => trimCache(RUNTIME_CACHE, RUNTIME_MAX_ITEMS))
              .catch(() => {});
          }

          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) return cached;

          if (request.mode === "navigate") {
            return (
              await caches.match("/dashboard/")
            ) || (
              await caches.match("/login/")
            );
          }

          return new Response("Recurso indisponível offline.", { status: 503 });
        })
    );

    return;
  }

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;

      return fetch(request).then(response => {
        if (
          !response
          || response.status !== 200
          || response.type !== "basic"
        ) {
          return response;
        }

        const copy = response.clone();

        caches.open(RUNTIME_CACHE)
          .then(cache => cache.put(request, copy))
          .then(() => trimCache(RUNTIME_CACHE, RUNTIME_MAX_ITEMS))
          .catch(() => {});

        return response;
      });
    })
  );
});
