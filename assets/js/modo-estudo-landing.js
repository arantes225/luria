/* TRAUBE · Landing (home) — interações leves (sem dependências, sem listeners de scroll). */
(() => {
  'use strict';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  // Quem já está logado vai direto para o app
  (async () => {
    const sb = window.supabaseClient;
    if (!sb) return;
    try {
      const { data, error } = await sb.auth.getSession();
      if (!error && data && data.session) window.location.replace(window.traubeSitePath?.('/dashboard/') || '/dashboard/');
    } catch (e) { console.warn('Não foi possível verificar a sessão:', e); }
  })();

  requestAnimationFrame(() => document.body.classList.add('is-ready'));

  // Barra de navegação ganha fundo depois do topo (IntersectionObserver, sem scroll listener)
  const sentinel = $('.sentinel');
  if (sentinel && 'IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => document.body.classList.toggle('is-stuck', !e.isIntersecting)).observe(sentinel);
  }

  // Botão fixo de criar conta no celular: aparece depois do hero
  const dock = $('.dock');
  const hero = $('.hero');
  if (dock && hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => dock.classList.toggle('is-on', !e.isIntersecting)).observe(hero);
  }

  // Escalonamento dos itens que entram juntos
  $$('.chap__text, .pains, .cycle__list, .stats, .timeline, .plans__grid, .faq__list').forEach((group) => {
    $$('.reveal', group).forEach((el, i) => el.style.setProperty('--i', Math.min(i, 6)));
  });

  // Revelar ao entrar na tela + assinatura desenhada + contadores
  function countUp(el) {
    const target = Number(el.getAttribute('data-count'));
    if (reduce || !target) { el.textContent = String(target); return; }
    const t0 = performance.now();
    const dur = 1400;
    const tick = (now) => {
      const t = Math.min(1, (now - t0) / dur);
      el.textContent = String(Math.round(target * (1 - Math.pow(1 - t, 4))));
      if (t < 1) requestAnimationFrame(tick);
    };
    el.textContent = '0';
    requestAnimationFrame(tick);
  }
  const targets = $$('.reveal, .sig--draw, [data-count]');
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver((entries) => {
      for (const en of entries) {
        if (!en.isIntersecting) continue;
        const el = en.target;
        if (el.hasAttribute('data-count')) countUp(el);
        else el.classList.add('is-in');
        io.unobserve(el);
      }
    }, { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });
    targets.forEach((el) => io.observe(el));
  } else {
    targets.forEach((el) => { el.classList.add('is-in'); });
  }
})();
