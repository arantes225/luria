/**
 * TRAUBE Security Shield v1.0 (Defense-in-Depth)
 * Implementação de defesas ativas contra técnicas avançadas de hacking
 * Mapeadas segundo OWASP ASVS v4 e Top 10 Web Application Attack Vectors.
 */

(function initTraubeSecurityShield() {
  "use strict";

  // =========================================================================
  // 1. TÉCNICA: Client-Side Prototype Pollution (CSPP / Object.prototype taint)
  // DEFESA: Congelamento profundo de protótipos fundamentais e Object.seal
  // =========================================================================
  try {
    if (typeof Object.freeze === "function") {
      Object.freeze(Object.prototype);
      Object.freeze(Array.prototype);
      Object.freeze(Function.prototype);
    }
  } catch (_) {}

  // =========================================================================
  // 2. TÉCNICA: Open Redirect / URL Parameter Redirection Hijack
  // DEFESA: Validador estrito de caminhos internos e descarte de targets maliciosos
  // =========================================================================
  function isSafeRedirectUrl(target) {
    if (typeof target !== "string") return false;
    const clean = target.trim();
    // Bloqueia esquemas como javascript:, data:, vbscript: e protocol-relative //
    if (/^[a-zA-Z][a-zA-Z\d+.-]*:/.test(clean) || clean.startsWith("//")) {
      try {
        const parsed = new URL(clean, window.location.origin);
        return parsed.origin === window.location.origin;
      } catch (_) {
        return false;
      }
    }
    // Deve iniciar com / e não com // ou caracteres de controle
    return clean.startsWith("/") && !clean.startsWith("//") && !/[\x00-\x1f\x7f\\]/.test(clean);
  }

  // =========================================================================
  // 3. TÉCNICA: Cross-Site Scripting (XSS via DOM/innerHTML injection)
  // DEFESA: Sanitizador de string e codificador de entidades HTML nativo
  // =========================================================================
  function escapeHtml(str) {
    if (str === null || str === undefined) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      .replace(/`/g, "&#96;");
  }

  function sanitizeUserInput(input, maxLen = 4000) {
    if (typeof input !== "string") return "";
    // Trunca tamanho para prevenir DoS no client e limpa caracteres de controle
    const truncated = input.slice(0, maxLen);
    return truncated.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
  }

  // =========================================================================
  // 4. TÉCNICA: Clickjacking / UI Redressing via Malicious iFrames
  // DEFESA: Frame-busting defensivo em runtime caso o CSP/X-Frame-Options falhe
  // =========================================================================
  try {
    if (window.top !== window.self) {
      // Se não for a mesma origem e não estiver autorizado internamente
      try {
        if (window.top.location.origin !== window.location.origin) {
          window.top.location = window.self.location;
        }
      } catch (_) {
        // Bloqueio de cross-origin: sobrepõe página ou recarrega em top
        window.top.location = window.self.location;
      }
    }
  } catch (_) {}

  // =========================================================================
  // 5. TÉCNICA: postMessage Origin Confusion & Event Tampering
  // DEFESA: Wrapper validador de evento postMessage com verificação de origem
  // =========================================================================
  function registerSafeMessageListener(trustedOrigin, callback) {
    window.addEventListener("message", function (event) {
      const allowed = trustedOrigin || window.location.origin;
      if (event.origin !== allowed) {
        return; // Rejeita mensagem de origem não autorizada silenciosamente
      }
      try {
        callback(event.data, event);
      } catch (err) {
        console.error("Falha ao processar mensagem segura:", err);
      }
    });
  }

  // =========================================================================
  // 6. TÉCNICA: Tabnabbing / Reverse Tabnabbing via window.opener
  // DEFESA: Interceptor global que sanitiza todos os links com target="_blank"
  // =========================================================================
  document.addEventListener("click", function (event) {
    const targetLink = event.target.closest("a");
    if (targetLink && targetLink.getAttribute("target") === "_blank") {
      const currentRel = targetLink.getAttribute("rel") || "";
      const tokens = currentRel.toLowerCase().split(/\s+/);
      if (!tokens.includes("noopener") || !tokens.includes("noreferrer")) {
        const safeRel = [...new Set([...tokens, "noopener", "noreferrer"])].join(" ").trim();
        targetLink.setAttribute("rel", safeRel);
      }
    }
  }, true);

  // =========================================================================
  // 7. TÉCNICA: Client-Side Session Hijacking em Navegadores Compartilhados
  // DEFESA: Sanitizador de tokens ao fechar/trocar aba em modo não-lembrar
  // =========================================================================
  window.addEventListener("pagehide", function () {
    try {
      const sessionOnly = sessionStorage.getItem("traube-auth-session-only") === "1";
      if (sessionOnly && !window.TraubeRememberMeActive) {
        // Garante que nenhum token residual permaneça no localStorage
        localStorage.removeItem("sb-sxdsfklllilhdyuamvvg-auth-token");
      }
    } catch (_) {}
  });

  // =========================================================================
  // 8. TÉCNICA: Mass Assignment & Parameter Tampering
  // DEFESA: Filtrador de propriedades permitidas (Allow-list sanitizer)
  // =========================================================================
  function pickAllowedFields(obj, allowedKeys) {
    if (!obj || typeof obj !== "object") return {};
    const sanitized = Object.create(null);
    for (const key of allowedKeys) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        sanitized[key] = obj[key];
      }
    }
    return sanitized;
  }

  // =========================================================================
  // 9. TÉCNICA: Prompt Injection em LLMs / Tutors de IA
  // DEFESA: Delimitadores estruturais estritos e isolamento de entrada médica
  // =========================================================================
  function formatSafeAIPrompt(systemContext, userMedicalQuery) {
    let safeUserText = sanitizeUserInput(userMedicalQuery, 8000);
    const tagPattern = /<\/?(?:system|instruction|prompt|context|script)[^>]*>/gi;
    let prev;
    do {
      prev = safeUserText;
      safeUserText = safeUserText.replace(tagPattern, '');
    } while (safeUserText !== prev);
    
    return [
      "<context_boundary>",
      systemContext.trim(),
      "</context_boundary>",
      "<user_query_untrusted>",
      safeUserText.trim(),
      "</user_query_untrusted>"
    ].join("\n");
  }

  // Exporta a API do escudo de segurança globalmente
  window.TraubeSecurityShield = {
    isSafeRedirectUrl,
    escapeHtml,
    sanitizeUserInput,
    registerSafeMessageListener,
    pickAllowedFields,
    formatSafeAIPrompt,
    version: "1.0.0"
  };

  // Trava a própria API de segurança contra adulteração em runtime
  try {
    Object.freeze(window.TraubeSecurityShield);
  } catch (_) {}
})();
