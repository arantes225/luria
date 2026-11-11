/* TRAUBE · Carrossel de telas da landing (sem dependências).
   Rotação automática só com a seção visível, pausa ao interagir e respeita "reduzir movimento". */
(function () {
  'use strict';
  var root = document.querySelector('[data-carousel]');
  if (!root) return;

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var track = root.querySelector('.cr-track');
  var slides = Array.prototype.slice.call(root.querySelectorAll('.cr-slide'));
  var chips = Array.prototype.slice.call(root.querySelectorAll('.cr-chip'));
  var chipRow = root.querySelector('.cr-chips');
  var count = root.querySelector('[data-cr-count]');
  var bar = root.querySelector('[data-cr-bar]');
  var playBtn = root.querySelector('[data-cr-play]');
  var AUTOPLAY_MS = 5200;
  var current = 0;
  var timer = null;
  var userPaused = reduced; // com movimento reduzido, nada roda sozinho
  var inView = false;
  var hovering = false;
  var scrollRaf = 0;
  var programmatic = false;

  function pad(n) { return (n < 10 ? '0' : '') + n; }

  function setActive(i) {
    current = i;
    slides.forEach(function (s, k) { s.classList.toggle('is-active', k === i); });
    chips.forEach(function (c, k) {
      var on = k === i;
      c.classList.toggle('is-active', on);
      if (on) c.setAttribute('aria-current', 'true'); else c.removeAttribute('aria-current');
    });
    if (count) count.textContent = pad(i + 1) + ' / ' + pad(slides.length);
    if (bar) bar.style.transform = 'scaleX(' + ((i + 1) / slides.length).toFixed(4) + ')';
    // mantém o chip ativo visível sem rolar a página
    var chip = chips[i];
    if (chip && chipRow) {
      var left = chip.offsetLeft - (chipRow.clientWidth - chip.clientWidth) / 2;
      chipRow.scrollTo({ left: left, behavior: reduced ? 'auto' : 'smooth' });
    }
  }

  function goTo(i, smooth) {
    i = (i + slides.length) % slides.length;
    var slide = slides[i];
    var left = slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2;
    programmatic = true;
    track.scrollTo({ left: left, behavior: (smooth === false || reduced) ? 'auto' : 'smooth' });
    setActive(i);
    window.setTimeout(function () { programmatic = false; }, 700);
  }

  // Detecta o slide mais próximo do centro quando a pessoa arrasta/rola o carrossel
  function onScroll() {
    if (programmatic) return;
    if (scrollRaf) return;
    scrollRaf = requestAnimationFrame(function () {
      scrollRaf = 0;
      var center = track.scrollLeft + track.clientWidth / 2;
      var best = 0, bestDist = Infinity;
      slides.forEach(function (s, k) {
        var d = Math.abs(s.offsetLeft + s.clientWidth / 2 - center);
        if (d < bestDist) { bestDist = d; best = k; }
      });
      if (best !== current) setActive(best);
    });
  }
  track.addEventListener('scroll', onScroll, { passive: true });

  function stop() { if (timer) { window.clearInterval(timer); timer = null; } }
  function start() {
    stop();
    if (userPaused || !inView || hovering || document.hidden) return;
    timer = window.setInterval(function () { goTo(current + 1); }, AUTOPLAY_MS);
  }
  function setPaused(p) {
    userPaused = p;
    if (playBtn) {
      playBtn.textContent = p ? 'Retomar' : 'Pausar';
      playBtn.setAttribute('aria-pressed', p ? 'true' : 'false');
    }
    start();
  }
  function userAction() { if (!userPaused) setPaused(true); }

  root.querySelector('[data-cr-prev]').addEventListener('click', function () { userAction(); goTo(current - 1); });
  root.querySelector('[data-cr-next]').addEventListener('click', function () { userAction(); goTo(current + 1); });
  chips.forEach(function (c, k) { c.addEventListener('click', function () { userAction(); goTo(k); }); });
  slides.forEach(function (s, k) { s.addEventListener('click', function () { if (k !== current) { userAction(); goTo(k); } }); });
  if (playBtn) playBtn.addEventListener('click', function () { setPaused(!userPaused); });

  track.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); userAction(); goTo(current + 1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); userAction(); goTo(current - 1); }
    else if (e.key === 'Home') { e.preventDefault(); userAction(); goTo(0); }
    else if (e.key === 'End') { e.preventDefault(); userAction(); goTo(slides.length - 1); }
  });

  root.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') { hovering = true; stop(); } });
  root.addEventListener('pointerleave', function () { hovering = false; start(); });
  root.addEventListener('focusin', stop);
  root.addEventListener('focusout', start);
  document.addEventListener('visibilitychange', start);

  // Cards dos diferenciais levam direto à tela correspondente
  document.addEventListener('click', function (e) {
    var go = e.target.closest && e.target.closest('[data-slide-go]');
    if (!go) return;
    var idx = -1;
    slides.forEach(function (s, k) { if (s.getAttribute('data-slide') === go.getAttribute('data-slide-go')) idx = k; });
    if (idx < 0) return;
    userAction();
    var top = root.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top: top, behavior: reduced ? 'auto' : 'smooth' });
    window.setTimeout(function () { goTo(idx); }, reduced ? 0 : 350);
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      inView = entries[0].isIntersecting;
      start();
    }, { threshold: 0.35 }).observe(root);
  }

  window.addEventListener('resize', function () { goTo(current, false); });
  if (reduced && playBtn) { playBtn.textContent = 'Retomar'; playBtn.setAttribute('aria-pressed', 'true'); }
  // posição inicial centralizada, sem animação
  window.addEventListener('load', function () { goTo(0, false); });
  setActive(0);
})();
