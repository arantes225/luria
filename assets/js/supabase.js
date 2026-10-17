const SUPABASE_URL = "https://sxdsfklllilhdyuamvvg.supabase.co";
const SUPABASE_KEY = "sb_publishable_AQ5-Pn1knmBhSFyt5aMtjQ_XQynLJ_L";

const LURIA_AUTH_SESSION_ONLY_KEY = "luria-auth-session-only";

const luriaAuthStorage = {
  getItem(key) {
    try {
      const sessionValue = sessionStorage.getItem(key);
      if (sessionValue !== null) return sessionValue;
    } catch (_) {}

    try {
      return localStorage.getItem(key);
    } catch (_) {
      return null;
    }
  },

  setItem(key, value) {
    let sessionOnly = false;

    try {
      sessionOnly = sessionStorage.getItem(LURIA_AUTH_SESSION_ONLY_KEY) === "1";
    } catch (_) {}

    if (sessionOnly) {
      try {
        sessionStorage.setItem(key, value);
      } catch (_) {}
      try {
        localStorage.removeItem(key);
      } catch (_) {}
      return;
    }

    try {
      localStorage.setItem(key, value);
    } catch (_) {}
    try {
      sessionStorage.removeItem(key);
    } catch (_) {}
  },

  removeItem(key) {
    try {
      localStorage.removeItem(key);
    } catch (_) {}
    try {
      sessionStorage.removeItem(key);
    } catch (_) {}
  }
};

window.LuriaAuthStorage = {
  setRememberMe(remember) {
    try {
      if (remember) {
        sessionStorage.removeItem(LURIA_AUTH_SESSION_ONLY_KEY);
      } else {
        sessionStorage.setItem(LURIA_AUTH_SESSION_ONLY_KEY, "1");
      }
    } catch (_) {}
  },

  isSessionOnly() {
    try {
      return sessionStorage.getItem(LURIA_AUTH_SESSION_ONLY_KEY) === "1";
    } catch (_) {
      return false;
    }
  }
};

window.supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY,
  {
    auth: {
      storage: luriaAuthStorage,
      persistSession: true,
      autoRefreshToken: true,
      experimental: {
        passkey: true
      }
    }
  }
);


/* Sitewide image upload cap and low-resolution review signal. */
(() => {
  const client = window.supabaseClient;
  if (!client?.storage || client.storage.__luriaImageGuard) return;
  const CAP = 80 * 1024;
  const originalFrom = client.storage.from.bind(client.storage);
  const imageExtensions = [".avif", ".gif", ".jpg", ".jpeg", ".png", ".svg", ".webp", ".bmp", ".tif", ".tiff"];

  async function prepareImage(file) {
    const lowerName = String(file?.name || "").toLowerCase();
    const isImage = Boolean(file && (file.type?.startsWith("image/") || imageExtensions.some(ext => lowerName.endsWith(ext))));
    if (!isImage) return { file, width: null, height: null };
    let bitmap;
    try { bitmap = await createImageBitmap(file); }
    catch { if (file.size > CAP) throw new Error("Não foi possível preparar esta imagem para até 80 KB."); return { file, width: null, height: null }; }
    const originalWidth = bitmap.width, originalHeight = bitmap.height;
    if (file.size <= CAP) {
      bitmap.close?.();
      return { file, width: originalWidth, height: originalHeight };
    }
    if (file.type === "image/gif" || file.type === "image/svg+xml") {
      bitmap.close?.();
      throw new Error("GIFs e SVGs acima de 80 KB precisam ser reduzidos antes do envio para preservar o formato.");
    }
    let best = null;
    const maxDimension = Math.min(1600, Math.max(originalWidth, originalHeight));
    const scales = [1, .85, .7, .55, .42, .3, .22, .16, .12];
    for (const scaleFactor of scales) {
      const scale = Math.min(scaleFactor, maxDimension / Math.max(originalWidth, originalHeight));
      const width = Math.max(1, Math.round(originalWidth * scale));
      const height = Math.max(1, Math.round(originalHeight * scale));
      const canvas = document.createElement("canvas");
      canvas.width = width; canvas.height = height;
      const context = canvas.getContext("2d", { alpha: true });
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
      context.drawImage(bitmap, 0, 0, width, height);
      for (const quality of [.86, .76, .66, .56, .46, .36, .28]) {
        const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/webp", quality));
        if (blob && blob.size <= CAP) {
          best = { blob, width, height };
          break;
        }
      }
      if (best) break;
    }
    bitmap.close?.();
    if (!best) throw new Error("Não foi possível reduzir a imagem para até 80 KB. Tente uma imagem mais simples.");
    const originalName = String(file.name || "imagem");
    const dot = originalName.lastIndexOf(".");
    const base = dot > 0 ? originalName.slice(0, dot) : originalName;
    const optimized = new File([best.blob], base + ".webp", { type: "image/webp", lastModified: Date.now() });
    return { file: optimized, width: best.width, height: best.height };
  }

  const baseFrom = originalFrom;
  client.storage.from = bucket => {
    const storageBucket = baseFrom(bucket);
    const originalUpload = storageBucket.upload.bind(storageBucket);
    storageBucket.upload = async (path, body, options = {}) => {
      const prepared = await prepareImage(body);
      const finalOptions = prepared.file !== body
        ? { ...options, contentType: "image/webp" }
        : options;
      const result = await originalUpload(path, prepared.file, finalOptions);
      if (result.error) return result;
      if (prepared.width !== null && Math.min(prepared.width, prepared.height) < 600) {
        const page = (location.pathname || "/").slice(0, 160);
        const { error } = await client.rpc("queue_low_resolution_image", {
          p_bucket_id: bucket,
          p_object_name: result.data?.path || path,
          p_width: prepared.width,
          p_height: prepared.height,
          p_size_bytes: prepared.file.size,
          p_source_page: page
        });
        if (error) {
          await baseFrom(bucket).remove([result.data?.path || path]).catch(() => {});
          throw new Error("A imagem foi enviada, mas não entrou na fila de revisão do Admin.");
        }
      }
      return result;
    };
    return storageBucket;
  };
  client.storage.__luriaImageGuard = true;
})();

// Ownership is established by Auth, never by an unscoped legacy draft.
(() => {
  let ownerId = null, epoch = 0, authRevision = 0;
  const setOwner = id => {
    if (ownerId === id) return;
    const previousId = ownerId;
    ownerId = id;
    epoch += 1;
    window.dispatchEvent(new CustomEvent("luria:owner-changed", {detail:{ownerId,previousId,epoch}}));
  };
  const key = (base, id = ownerId) => id ? base + ":" + encodeURIComponent(id) : null;
  const api = {
    get ownerId() { return ownerId; },
    get epoch() { return epoch; },
    key,
    read(base, storage = localStorage) {
      try { const k = key(base); return k ? storage.getItem(k) : null; } catch (_) { return null; }
    },
    write(base, value, storage = localStorage) {
      const k = key(base);
      if (!k) return false;
      storage.setItem(k, value);
      return true;
    },
    remove(base, storage = localStorage) { const k = key(base); if (k) storage.removeItem(k); }
  };
  window.LuriaLocalOwnerStore = api;
  window.supabaseClient.auth.onAuthStateChange((_event, session) => { authRevision += 1; setOwner(session?.user?.id || null); });
  const initialRevision = authRevision;
  api.ready = window.supabaseClient.auth.getSession().then(({data,error}) => {
    if (!error && authRevision === initialRevision) setOwner(data?.session?.user?.id || null);
    return ownerId;
  }).catch(() => ownerId);
})();
