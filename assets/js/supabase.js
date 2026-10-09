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
