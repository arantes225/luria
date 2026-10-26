(function () {
  "use strict";
  // Enriches window.supabaseClient for bulario_catalog on /trabalho/antimicrobianos/
  // so that window.LURIA_BULARIO_SEEDS are merged with any Supabase rows.
  function installBridge() {
    if (!window.supabaseClient || typeof window.supabaseClient.from !== "function") return;
    const origFrom = window.supabaseClient.from.bind(window.supabaseClient);
    window.supabaseClient.from = function (table) {
      const builder = origFrom(table);
      if (table !== "bulario_catalog" || !builder || typeof builder.select !== "function") return builder;
      const origSelect = builder.select.bind(builder);
      builder.select = function () {
        const q = origSelect.apply(this, arguments);
        if (q && typeof q.order === "function") {
          const origOrder = q.order.bind(q);
          q.order = function () {
            const o = origOrder.apply(this, arguments);
            if (o && typeof o.limit === "function") {
              const origLimit = o.limit.bind(o);
              o.limit = async function () {
                const seeds = Array.isArray(window.LURIA_BULARIO_SEEDS) ? window.LURIA_BULARIO_SEEDS : [];
                try {
                  const res = await origLimit.apply(this, arguments);
                  const rows = Array.isArray(res && res.data) ? res.data.slice() : [];
                  const norm = s => String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
                  const existing = new Set(rows.map(r => norm(r.name)));
                  for (const s of seeds) {
                    if (!existing.has(norm(s.name))) rows.push(s);
                  }
                  return { data: rows, error: null };
                } catch (_) {
                  return { data: seeds.slice(), error: null };
                }
              };
            }
            return o;
          };
        }
        return q;
      };
      return builder;
    };
  }
  installBridge();
})();
