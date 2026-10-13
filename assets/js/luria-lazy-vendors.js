/* Bibliotecas opcionais da LURIA: carregamento único e sob demanda.
 * As URLs precisam constar na CSP da página consumidora.
 * Não altera dependências do núcleo (autenticação, navegação, Supabase).
 */
(() => {
  "use strict";

  const resources = Object.freeze({
    xlsx: {
      src: "/assets/vendor/xlsx-0.20.3.js",
      loaded: () => !!window.XLSX?.read
    },
    pdfjs: {
      src: "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js",
      loaded: () => !!window.pdfjsLib?.getDocument
    },
    tesseract: {
      src: "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js",
      loaded: () => !!window.Tesseract?.recognize
    },
    jszip: {
      src: "https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js",
      loaded: () => !!window.JSZip?.loadAsync
    },
    sqljs: {
      src: "https://cdn.jsdelivr.net/npm/sql.js@1.11.0/dist/sql-wasm.js",
      loaded: () => typeof window.initSqlJs === "function"
    },
    fzstd: {
      src: "https://cdn.jsdelivr.net/npm/fzstd@0.1.1/umd/index.js",
      loaded: () => typeof window.fzstd?.decompress === "function"
    },
    jspdf: {
      src: "https://cdn.jsdelivr.net/npm/jspdf@2.5.2/dist/jspdf.umd.min.js",
      loaded: () => typeof window.jspdf?.jsPDF === "function"
    }
  });
  const pending = new Map();

  function load(name) {
    const resource = resources[name];
    if (!resource) return Promise.reject(new Error("Biblioteca desconhecida: " + name));
    if (resource.loaded()) return Promise.resolve();
    if (pending.has(name)) return pending.get(name);

    const promise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = resource.src;
      script.async = true;
      script.dataset.luriaOptionalLibrary = name;
      script.onload = () => {
        if (resource.loaded()) {
          resolve();
        } else {
          script.remove();
          reject(new Error("Biblioteca carregada sem API esperada: " + name));
        }
      };
      script.onerror = () => {
        script.remove();
        reject(new Error("Não foi possível carregar " + name + ". Confira a conexão e tente novamente."));
      };
      document.head.appendChild(script);
    });
    pending.set(name, promise);
    promise.catch(() => {
      if (pending.get(name) === promise) pending.delete(name);
    });
    return promise;
  }

  window.LuriaLazyVendors = Object.freeze({
    ensure(names) {
      const list = Array.isArray(names) ? names : [names];
      return Promise.all(list.map(load)).then(() => undefined);
    }
  });
})();
