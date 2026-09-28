(() => {
  "use strict";

  const MANIFEST_URL = "/content/weekly/manifest.json";
  const MANIFEST_CACHE_KEY = "luria:weekly-content:manifest";
  const MANIFEST_TTL_MS = 6 * 60 * 60 * 1000;
  const GROUP_COUNT_FALLBACK = 3;

  function stableHash(value) {
    let hash = 2166136261;
    const text = String(value || "");
    for (let i = 0; i < text.length; i += 1) {
      hash ^= text.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function groupForUser(userId, count = GROUP_COUNT_FALLBACK) {
    const safeCount = Math.max(1, Number(count) || GROUP_COUNT_FALLBACK);
    return stableHash(userId) % safeCount;
  }

  function readCachedManifest() {
    try {
      const cached = JSON.parse(localStorage.getItem(MANIFEST_CACHE_KEY) || "null");
      if (!cached?.savedAt || !cached?.value) return null;
      if ((Date.now() - Number(cached.savedAt)) > MANIFEST_TTL_MS) return null;
      return cached.value;
    } catch {
      return null;
    }
  }

  function writeCachedManifest(value) {
    try {
      localStorage.setItem(
        MANIFEST_CACHE_KEY,
        JSON.stringify({ savedAt: Date.now(), value })
      );
    } catch {}
  }

  async function loadManifest() {
    const cached = readCachedManifest();
    if (cached) return cached;

    try {
      const response = await fetch(MANIFEST_URL, { cache: "no-cache" });
      if (!response.ok) throw new Error("manifest unavailable");
      const manifest = await response.json();
      writeCachedManifest(manifest);
      return manifest;
    } catch {
      return cached || null;
    }
  }

  function urlsForUser(manifest, userId) {
    if (!manifest?.enabled || !Array.isArray(manifest.groups)) return [];

    const count = Number(manifest.group_count) || manifest.groups.length || GROUP_COUNT_FALLBACK;
    const groupIndex = groupForUser(userId, count);
    const group = manifest.groups.find(item => Number(item.id) === groupIndex)
      || manifest.groups[groupIndex]
      || null;

    if (!group) return [];

    return [
      ...(Array.isArray(group.flashcards) ? group.flashcards : []),
      ...(Array.isArray(group.questions) ? group.questions : [])
    ]
      .map(item => typeof item === "string" ? item : item?.url)
      .filter(Boolean);
  }

  async function prefetchForUser(userId) {
    if (!userId || !("serviceWorker" in navigator)) return;

    const manifest = await loadManifest();
    const urls = urlsForUser(manifest, userId);

    if (!urls.length) return;

    const send = registration => {
      const worker =
        registration?.active
        || navigator.serviceWorker.controller
        || registration?.waiting
        || registration?.installing;

      worker?.postMessage({
        type: "LURIA_PREFETCH_WEEKLY_CONTENT",
        urls,
        week: manifest.week || null
      });
    };

    try {
      const registration = await navigator.serviceWorker.ready;
      const schedule = () => send(registration);

      if ("requestIdleCallback" in window) {
        requestIdleCallback(schedule, { timeout: 3500 });
      } else {
        setTimeout(schedule, 1200);
      }
    } catch {}
  }

  async function getAssignedPackages(userId) {
    const manifest = await loadManifest();
    if (!manifest?.enabled) return { manifest, group: null };

    const count = Number(manifest.group_count) || manifest.groups?.length || GROUP_COUNT_FALLBACK;
    const groupIndex = groupForUser(userId, count);
    const group = manifest.groups?.find(item => Number(item.id) === groupIndex)
      || manifest.groups?.[groupIndex]
      || null;

    return { manifest, group, groupIndex };
  }

  window.LuriaWeeklyContent = {
    loadManifest,
    prefetchForUser,
    getAssignedPackages,
    groupForUser
  };

  const start = () => {
    const userId = window.docmapUser?.id;
    if (userId) prefetchForUser(userId);
  };

  if (window.docmapUser) {
    start();
  } else {
    window.addEventListener("docmap:ready", start, { once: true });
  }
})();
