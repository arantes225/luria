/* TRAUBE · Landing (home) — interações e motion (sem dependências). */
(() => {
  'use strict';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(pointer: fine)').matches;
  const wide = window.matchMedia('(min-width: 981px)');
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

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

  /* ---------- títulos por palavra ---------- */
  $$('[data-split]').forEach((el) => {
    const words = el.textContent.trim().split(/\s+/);
    el.setAttribute('aria-label', el.textContent.trim());
    el.textContent = '';
    words.forEach((w, i) => {
      const s = document.createElement('span');
      s.className = 'w';
      s.setAttribute('aria-hidden', 'true');
      s.style.setProperty('--i', i);
      s.textContent = w;
      el.appendChild(s);
      el.appendChild(document.createTextNode(' '));
    });
  });

  /* ---------- manifesto: palavras acendem com a rolagem ---------- */
  const st = $('[data-scrolltext]');
  let stWords = [];
  if (st) {
    const words = st.textContent.trim().split(/\s+/);
    st.textContent = '';
    words.forEach((w) => {
      const s = document.createElement('span');
      s.className = 'sw';
      s.textContent = w + ' ';
      st.appendChild(s);
    });
    stWords = $$('.sw', st);
    if (reduce) stWords.forEach((w) => w.classList.add('is-lit'));
  }

  /* ---------- scroll: barra, nav, parallax, manifesto, história ---------- */
  const nav = $('.nav');
  const bar = $('.scrollbar');
  const story = $('[data-story]');
  const stepEls = $$('[data-step]');
  const screens = $$('.screens img');
  const label = $('[data-story-label]');
  const labels = ['traube · aprender', 'traube · cronograma', 'traube · flashcards', 'traube · caderno de erros', 'traube · questões e simulados'];
  const parallax = $$('[data-parallax]');
  let ticking = false;
  let lastStep = -1;

  function setStep(n) {
    if (n === lastStep) return;
    lastStep = n;
    stepEls.forEach((s) => s.classList.toggle('is-active', s.dataset.step === String(n)));
    screens.forEach((s, i) => s.classList.toggle('is-on', i === n));
    if (label) label.textContent = labels[n] || '';
  }

  function frame() {
    ticking = false;
    const y = window.scrollY;
    const vh = window.innerHeight;
    const max = document.documentElement.scrollHeight - vh;
    if (bar) bar.style.setProperty('--sp', max > 0 ? (y / max).toFixed(4) : 0);
    if (nav) nav.classList.toggle('is-scrolled', y > 24);

    if (st && !reduce) {
      const r = st.getBoundingClientRect();
      const p = clamp((vh * 0.85 - r.top) / (vh * 0.55 + r.height * 0.6));
      const lit = Math.round(p * stWords.length);
      stWords.forEach((w, i) => w.classList.toggle('is-lit', i < lit));
    }

    if (story && wide.matches && !reduce) {
      const r = story.getBoundingClientRect();
      const total = r.height - vh;
      const p = clamp(-r.top / total);
      story.style.setProperty('--sp', p.toFixed(4));
      setStep(Math.min(stepEls.length - 1, Math.floor(p * stepEls.length * 0.999)));
    }

    if (!reduce) {
      parallax.forEach((el) => {
        const r = el.getBoundingClientRect();
        const k = parseFloat(el.dataset.parallax) || 0;
        el.style.setProperty('--py', ((r.top + r.height / 2 - vh / 2) * k).toFixed(1) + 'px');
      });
    }
  }
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  frame();

  /* ---------- palavra que troca no título ---------- */
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

  /* ---------- ponteiro: inclinação do hero, brilho, spotlight, magnético ---------- */
  if (fine && !reduce) {
    const stage = $('[data-tilt]');
    const hero = stage && stage.closest('.hero');
    if (hero) {
      const main = $('.frame--main', stage);
      let raf = 0;
      hero.addEventListener('pointermove', (e) => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const r = hero.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          stage.style.setProperty('--px', px.toFixed(3));
          stage.style.setProperty('--py', py.toFixed(3));
          stage.style.setProperty('--ry', (-13 + px * 10).toFixed(2) + 'deg');
          stage.style.setProperty('--rx', (6 - py * 8).toFixed(2) + 'deg');
          if (main) main.style.transform = '';
        });
      });
      hero.addEventListener('pointerleave', () => {
        ['--px', '--py', '--ry', '--rx'].forEach((v) => stage.style.removeProperty(v));
      });
    }

    const glow = $('.cursor-glow');
    window.addEventListener('pointermove', (e) => {
      if (!glow) return;
      glow.style.setProperty('--cx', e.clientX + 'px');
      glow.style.setProperty('--cy', e.clientY + 'px');
      glow.classList.add('is-on');
    }, { passive: true });
    document.addEventListener('pointerleave', () => glow && glow.classList.remove('is-on'));

    $$('[data-spot]').forEach((c) => {
      c.addEventListener('pointermove', (e) => {
        const r = c.getBoundingClientRect();
        c.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        c.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });

    $$('.magnetic').forEach((b) => {
      b.addEventListener('pointermove', (e) => {
        const r = b.getBoundingClientRect();
        b.style.setProperty('--mx', ((e.clientX - r.left - r.width / 2) * 0.18).toFixed(1) + 'px');
        b.style.setProperty('--my', ((e.clientY - r.top - r.height / 2) * 0.3).toFixed(1) + 'px');
      });
      b.addEventListener('pointerleave', () => { b.style.removeProperty('--mx'); b.style.removeProperty('--my'); });
    });
  }

  /* ---------- revelar ao rolar, assinatura, contadores ---------- */
  function countUp(el) {
    const target = Number(el.getAttribute('data-count'));
    if (reduce || !target) { el.textContent = String(target); return; }
    const dur = 1600;
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
  const io = new IntersectionObserver((entries) => {
    for (const en of entries) {
      if (!en.isIntersecting) continue;
      const el = en.target;
      if (el.hasAttribute('data-sig-host')) $$('.sig-write', el).forEach((s) => s.classList.add('is-written'));
      if (el.classList.contains('reveal') || el.classList.contains('words') || el.classList.contains('card')) el.classList.add('is-in');
      if (el.hasAttribute('data-count')) countUp(el);
      io.unobserve(el);
    }
  }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
  $$('.sig-write').forEach((s) => { const host = s.parentElement; host.setAttribute('data-sig-host', ''); io.observe(host); });
  $$('.reveal, .words, .card, [data-count]').forEach((el) => io.observe(el));
  // cards do bento entram em cascata
  $$('.bento .card').forEach((c, i) => { c.style.transitionDelay = (i % 4) * 80 + 'ms'; });

  /* ---------- caos -> ordem ---------- */
  const chaos = $('[data-chaos]');
  if (chaos) {
    const items = $('.chaos__items', chaos);
    const chips = $$('.cchip', chaos);
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
        chip.style.setProperty('--fx', (s.left - base.left - chip.offsetLeft).toFixed(1) + 'px');
        chip.style.setProperty('--fy', (s.top - base.top - chip.offsetTop + (s.height - chip.offsetHeight) / 2).toFixed(1) + 'px');
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

    const auto = new IntersectionObserver((en) => {
      if (en[0].isIntersecting) {
        setTimeout(() => { if (!touched && !ordered) set(true); }, 2400);
        auto.disconnect();
      }
    }, { threshold: 0.6 });
    auto.observe(chaos);
  }
})();
