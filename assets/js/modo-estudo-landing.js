/* TRAUBE · Landing do Modo Estudo — interações e motion (sem dependências). */
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

  // Entrada do hero
  requestAnimationFrame(() => document.body.classList.add('is-ready'));

  // Nav com fundo após rolar
  const nav = $('.nav');
  const onScroll = () => nav && nav.classList.toggle('is-scrolled', window.scrollY > 24);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Palavra que troca no título
  const words = $$('.swap__word');
  if (words.length > 1 && !reduce) {
    let i = 0;
    setInterval(() => {
      if (document.hidden) return;
      const cur = words[i];
      i = (i + 1) % words.length;
      cur.classList.remove('is-on');
      cur.classList.add('is-off');
      setTimeout(() => cur.classList.remove('is-off'), 320);
      words[i].classList.add('is-on');
    }, 2600);
  }

  // Inclinação sutil do palco do hero (só com ponteiro fino)
  const stage = $('[data-tilt]');
  if (stage && !reduce && window.matchMedia('(pointer: fine)').matches) {
    const hero = stage.closest('.hero');
    let raf = 0;
    hero.addEventListener('pointermove', (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = hero.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        stage.style.setProperty('--px', px.toFixed(3));
        stage.style.setProperty('--py', py.toFixed(3));
        const browser = $('.device--browser', stage);
        if (browser) browser.style.transform = `rotateY(${(-14 + px * 10).toFixed(2)}deg) rotateX(${(6 - py * 8).toFixed(2)}deg)`;
      });
    });
    hero.addEventListener('pointerleave', () => {
      stage.style.setProperty('--px', 0);
      stage.style.setProperty('--py', 0);
      const browser = $('.device--browser', stage);
      if (browser) browser.style.transform = '';
    });
  }

  // Revelação ao rolar + assinatura sendo "escrita"
  const io = new IntersectionObserver((entries) => {
    for (const en of entries) {
      if (!en.isIntersecting) continue;
      const el = en.target;
      if (el.hasAttribute('data-sig-host')) $$('.sig-write', el).forEach((s) => s.classList.add('is-written'));
      if (el.classList.contains('reveal')) el.classList.add('is-in');
      if (el.hasAttribute('data-count')) countUp(el);
      io.unobserve(el);
    }
  }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
  // A assinatura começa recortada (clip-path), então observamos o elemento pai.
  $$('.sig-write').forEach((s) => { const host = s.parentElement; host.setAttribute('data-sig-host', ''); io.observe(host); });
  $$('.reveal, [data-count]').forEach((el) => io.observe(el));

  // Contadores
  function countUp(el) {
    const target = Number(el.getAttribute('data-count'));
    if (reduce || !target) { el.textContent = String(target); return; }
    const dur = 1400;
    const t0 = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 4);
    const tick = (now) => {
      const t = Math.min(1, (now - t0) / dur);
      el.textContent = String(Math.round(target * ease(t)));
      if (t < 1) requestAnimationFrame(tick);
    };
    el.textContent = '0';
    requestAnimationFrame(tick);
  }

  // Caos → ordem
  const chaos = $('[data-chaos]');
  if (chaos) {
    const items = $('.chaos__items', chaos);
    const chips = $$('.chip', chaos);
    const btn = $('[data-organize]', chaos);
    chips.forEach((c, i) => c.style.setProperty('--i', i));
    let ordered = false;
    let touched = false;

    const place = () => {
      const base = items.getBoundingClientRect();
      chips.forEach((chip) => {
        if (!ordered) { chip.style.setProperty('--fx', '0px'); chip.style.setProperty('--fy', '0px'); return; }
        const slot = $(`[data-slot="${chip.dataset.to}"]`, chaos);
        if (!slot) return;
        const s = slot.getBoundingClientRect();
        const fx = s.left - base.left - chip.offsetLeft;
        const fy = s.top - base.top - chip.offsetTop + (s.height - chip.offsetHeight) / 2;
        chip.style.setProperty('--fx', `${fx.toFixed(1)}px`);
        chip.style.setProperty('--fy', `${fy.toFixed(1)}px`);
      });
    };
    const set = (v) => {
      ordered = v;
      chaos.classList.toggle('is-ordered', v);
      btn.setAttribute('aria-pressed', String(v));
      place();
    };
    btn.addEventListener('click', () => { touched = true; set(!ordered); });
    window.addEventListener('resize', () => { if (ordered) place(); });

    // Se a pessoa não clicar, organiza sozinho depois de um tempinho na tela
    const auto = new IntersectionObserver((en) => {
      if (en[0].isIntersecting) {
        setTimeout(() => { if (!touched && !ordered) set(true); }, 2200);
        auto.disconnect();
      }
    }, { threshold: 0.6 });
    auto.observe(chaos);
  }

  // Método: tela fixa que acompanha o passo
  const steps = $$('[data-step]');
  const screens = $$('[data-screen]');
  const dots = $$('[data-dot]');
  const label = $('[data-step-label]');
  const labels = ['traube · aprender', 'traube · flashcards', 'traube · questões e simulados'];
  const activate = (n) => {
    steps.forEach((s) => s.classList.toggle('is-active', s.dataset.step === String(n)));
    screens.forEach((s) => s.classList.toggle('is-on', s.dataset.screen === String(n)));
    dots.forEach((d) => d.classList.toggle('is-on', d.dataset.dot === String(n)));
    if (label) label.textContent = labels[n] || '';
  };
  if (steps.length) {
    const sio = new IntersectionObserver((entries) => {
      for (const en of entries) if (en.isIntersecting) activate(Number(en.target.dataset.step));
    }, { rootMargin: '-45% 0px -45% 0px' });
    steps.forEach((s) => sio.observe(s));
  }
})();
