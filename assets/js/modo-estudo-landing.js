(function () {
  'use strict';

  function path(p) {
    return typeof window.traubeSitePath === 'function' ? window.traubeSitePath(p) : p;
  }

  // Redireciona visitantes já autenticados diretamente para o Dashboard
  if (window.supabaseClient && window.supabaseClient.auth) {
    window.supabaseClient.auth.getSession()
      .then(function (r) {
        if (r && r.data && r.data.session) window.location.replace(path('/dashboard/'));
      })
      .catch(function () {});
  }

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Barra de progresso de leitura no topo + elevação da navbar
  var bar = document.getElementById('scroll-progress');
  var nav = document.querySelector('.nav');
  function updateProgress() {
    var y = window.scrollY || document.documentElement.scrollTop || 0;
    if (bar) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = 'scaleX(' + (h > 0 ? Math.min(1, Math.max(0, y / h)) : 0) + ')';
    }
    if (nav) {
      nav.style.boxShadow = y > 16 ? '0 12px 32px -12px rgba(10, 25, 47, 0.12)' : 'none';
    }
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  // 2. Contadores animados ([data-count])
  function countUp(el) {
    var raw = el.getAttribute('data-count');
    var target = parseFloat(raw);
    if (isNaN(target)) return;
    var suffix = el.getAttribute('data-suffix') || '';
    var prefix = el.getAttribute('data-prefix') || '';
    var decimals = (raw.split('.')[1] || '').length;
    var fmt = function (v) {
      return prefix + (decimals ? v.toFixed(decimals).replace('.', ',') : Math.round(v).toLocaleString('pt-BR')) + suffix;
    };
    if (reduced || typeof window.requestAnimationFrame !== 'function') {
      el.textContent = fmt(target);
      return;
    }
    var start = performance.now();
    var dur = 1400;
    function tick(now) {
      var p = Math.min(1, (now - start) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * eased);
      if (p < 1) window.requestAnimationFrame(tick);
    }
    window.requestAnimationFrame(tick);
  }

  // 3. Manifesto com iluminação palavra por palavra no scroll ([data-scrolltext])
  var scrollTexts = [];
  document.querySelectorAll('[data-scrolltext]').forEach(function (el) {
    var raw = (el.textContent || '').trim().replace(/\s+/g, ' ');
    if (!raw) return;
    var accents = (el.getAttribute('data-accent') || '').toLowerCase().split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    el.textContent = '';
    var words = raw.split(' ').map(function (w, idx, arr) {
      var span = document.createElement('span');
      var clean = w.toLowerCase().replace(/[.,;:!?—–"“”()]/g, '');
      span.className = 'w' + (accents.indexOf(clean) !== -1 ? ' accent' : '');
      span.textContent = w + (idx < arr.length - 1 ? ' ' : '');
      if (reduced) span.classList.add('lit');
      el.appendChild(span);
      return span;
    });
    scrollTexts.push({ el: el, words: words });
  });

  function updateScrollTexts() {
    if (reduced || !scrollTexts.length) return;
    var vh = window.innerHeight || 800;
    scrollTexts.forEach(function (item) {
      var r = item.el.getBoundingClientRect();
      var start = vh * 0.85;
      var end = vh * 0.25;
      var progress = (start - r.top) / (start - end + r.height * 0.45);
      var litCount = Math.floor(Math.max(0, Math.min(1, progress)) * item.words.length);
      for (var i = 0; i < item.words.length; i++) {
        item.words[i].classList.toggle('lit', i <= litCount);
      }
    });
  }
  window.addEventListener('scroll', updateScrollTexts, { passive: true });
  updateScrollTexts();

  // 4. Word-swap animado no título principal do Hero
  document.querySelectorAll('[data-word-swap]').forEach(function (wrap) {
    var words = Array.prototype.slice.call(wrap.querySelectorAll('.swap__word'));
    if (words.length < 2 || reduced) return;
    var idx = 0;
    window.setInterval(function () {
      var prev = words[idx];
      idx = (idx + 1) % words.length;
      var next = words[idx];
      prev.classList.remove('is-on');
      prev.classList.add('is-out');
      next.classList.remove('is-out');
      next.classList.add('is-on');
      window.setTimeout(function () { prev.classList.remove('is-out'); }, 560);
    }, 2700);
  });

  // 6. Widget Interativo Caos Fragmentado -> Fluxo Unificado TRAUBE ([data-chaos])
  document.querySelectorAll('[data-chaos-box]').forEach(function (box) {
    var stage = box.querySelector('[data-chaos]');
    var btns = Array.prototype.slice.call(box.querySelectorAll('[data-chaos-mode]'));
    var statusMess = box.querySelector('.chaos-status--mess');
    var statusOrder = box.querySelector('.chaos-status--order');
    if (!stage) return;
    function setMode(mode) {
      var ordered = mode === 'order';
      stage.classList.toggle('ordered', ordered);
      btns.forEach(function (b) {
        var active = b.getAttribute('data-chaos-mode') === mode;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
      if (statusMess) statusMess.classList.toggle('is-active', !ordered);
      if (statusOrder) statusOrder.classList.toggle('is-active', ordered);
    }
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        setMode(b.getAttribute('data-chaos-mode'));
      });
    });
  });

  // 7. Seletor Interativo da Moldura Colorida e Temas ([data-theme-showcase])
  document.querySelectorAll('[data-theme-showcase]').forEach(function (sec) {
    var btns = Array.prototype.slice.call(sec.querySelectorAll('[data-theme-target]'));
    var frames = Array.prototype.slice.call(sec.querySelectorAll('[data-theme-frame]'));
    var label = sec.querySelector('[data-theme-label]');
    function activateTheme(key) {
      btns.forEach(function (b) {
        var on = b.getAttribute('data-theme-target') === key;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-selected', on ? 'true' : 'false');
        if (on && label) {
          label.textContent = b.getAttribute('data-theme-desc') || '';
        }
      });
      frames.forEach(function (f) {
        f.classList.toggle('is-active', f.getAttribute('data-theme-frame') === key);
      });
    }
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        activateTheme(b.getAttribute('data-theme-target'));
      });
    });
  });

  // 8. Scrollytelling + Stepper Clicável do Ciclo Clínico de 5 Etapas ([data-story])
  document.querySelectorAll('[data-story]').forEach(function (story) {
    var steps = Array.prototype.slice.call(story.querySelectorAll('[data-step]'));
    var screens = Array.prototype.slice.call(story.querySelectorAll('[data-screen]'));
    var pills = Array.prototype.slice.call(story.querySelectorAll('[data-story-pill]'));
    var urlEl = story.querySelector('[data-story-url]');
    var fillEl = story.querySelector('[data-story-fill]');
    if (!steps.length) return;

    function activateStep(n) {
      var idx = 0;
      steps.forEach(function (s, i) {
        var on = s.getAttribute('data-step') === String(n);
        s.classList.toggle('is-active', on);
        if (on) {
          idx = i;
          if (urlEl && s.getAttribute('data-url')) urlEl.textContent = s.getAttribute('data-url');
        }
      });
      screens.forEach(function (sc) {
        sc.classList.toggle('is-active', sc.getAttribute('data-screen') === String(n));
      });
      pills.forEach(function (p) {
        var on = p.getAttribute('data-story-pill') === String(n);
        p.classList.toggle('is-active', on);
        p.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      if (fillEl) {
        fillEl.style.width = (((idx + 1) / steps.length) * 100).toFixed(1) + '%';
      }
    }

    steps.forEach(function (s) {
      s.addEventListener('click', function () {
        activateStep(s.getAttribute('data-step'));
      });
    });

    pills.forEach(function (p) {
      p.addEventListener('click', function () {
        var target = p.getAttribute('data-story-pill');
        activateStep(target);
        var stepEl = story.querySelector('[data-step="' + target + '"]');
        if (stepEl && stepEl.scrollIntoView && window.innerWidth > 1080) {
          stepEl.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
        }
      });
    });

    if (typeof IntersectionObserver === 'function') {
      var storyIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) activateStep(en.target.getAttribute('data-step'));
        });
      }, { rootMargin: '-32% 0px -42% 0px', threshold: 0.05 });
      steps.forEach(function (s) { storyIO.observe(s); });
    }
  });

  // 9. Observador geral de entrada ([data-reveal], .sig--draw, [data-count], [data-chaos])
  var targets = document.querySelectorAll('[data-reveal], .sig--draw, [data-count], [data-chaos]');
  if (reduced || typeof IntersectionObserver !== 'function') {
    targets.forEach(function (el) {
      el.classList.add('in');
      if (el.hasAttribute('data-chaos')) el.classList.add('ordered');
      if (el.hasAttribute('data-count')) countUp(el);
    });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      if (e.target.hasAttribute('data-chaos')) {
        window.setTimeout(function () {
          e.target.classList.add('ordered');
          var box = e.target.closest('[data-chaos-box]');
          if (box) {
            box.querySelectorAll('[data-chaos-mode]').forEach(function (b) {
              var on = b.getAttribute('data-chaos-mode') === 'order';
              b.classList.toggle('is-active', on);
              b.setAttribute('aria-pressed', on ? 'true' : 'false');
            });
            var sm = box.querySelector('.chaos-status--mess');
            var so = box.querySelector('.chaos-status--order');
            if (sm) sm.classList.remove('is-active');
            if (so) so.classList.add('is-active');
          }
        }, 380);
      }
      if (e.target.hasAttribute('data-count')) countUp(e.target);
      io.unobserve(e.target);
    });
  }, { threshold: 0.14 });

  targets.forEach(function (el) { io.observe(el); });
})();
