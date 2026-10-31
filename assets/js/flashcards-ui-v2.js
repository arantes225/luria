/* Presentation only: keep the controller's deck nodes and review handlers. */
(() => {
  const body = document.body;
  if (body?.dataset.ui !== 'v2' || body.dataset.uiContext !== 'study' || body.dataset.page !== 'flashcards') return;
  const back = document.createElement('button');
  back.type = 'button'; back.className = 'button secondary ui-flash-back';
  back.textContent = '← Voltar aos flashcards'; back.hidden = true;
  document.querySelector('[data-flash-section]')?.before(back);
  back.addEventListener('click', () => window.traubeFlashShow?.('review'));
  function syncBack() {
    back.hidden = body.classList.contains('flash-review-session-active')
      || !document.querySelector('[data-flash-section]:is([data-flash-section="create"],[data-flash-section="import"],[data-flash-section="library"]).active');
  }
  document.querySelectorAll('[data-flash-section]').forEach(section =>
    new MutationObserver(syncBack).observe(section, {attributes:true,attributeFilter:['class']}));
  new MutationObserver(syncBack).observe(body, {attributes:true,attributeFilter:['class']});
  syncBack();
  const host = document.getElementById('flash-home-decks-list');
  const heading = document.querySelector('.flash-home-decks-head');
  if (!host || !heading) return;
  const controls = document.createElement('div');
  controls.className = 'ui-deck-navigation'; controls.hidden = true;
  controls.innerHTML = '<button type="button" aria-label="Decks anteriores" aria-controls="flash-home-decks-list">←</button><span role="status" aria-live="polite" aria-atomic="true"></span><button type="button" aria-label="Próximos decks" aria-controls="flash-home-decks-list">→</button>';
  heading.append(controls);
  const [previous, next] = controls.querySelectorAll('button');
  const status = controls.querySelector('span');
  let track, cards = [], start = 0, size = 1;
  function render() {
    if (!track) { controls.hidden = true; return; }
    const width = track.getBoundingClientRect().width;
    if (!width) return; // A review session can temporarily hide the home.
    size = Math.max(1, Math.floor((width + 16) / 256));
    start = Math.min(start, Math.max(0, cards.length - size));
    track.style.setProperty('--ui-deck-columns', Math.min(size, cards.length) || 1);
    cards.forEach((card, index) => { card.hidden = index < start || index >= start + size; });
    controls.hidden = cards.length <= size;
    previous.disabled = start === 0;
    next.disabled = start + size >= cards.length;
    const text = `${start + 1}–${Math.min(start + size, cards.length)} de ${cards.length}`;
    if (status.textContent !== text) status.textContent = text;
  }
  function move(direction) { start = Math.max(0, Math.min(start + direction * size, cards.length - size)); render(); }
  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  const resize = new ResizeObserver(render);
  function connect() {
    const current = host.querySelector('.flash-deck-cards');
    if (current === track) return;
    resize.disconnect(); track = current; start = 0;
    cards = track ? [...track.querySelectorAll('.flash-ref-deck')] : [];
    if (track) {
      track.classList.add('ui-deck-carousel');
      track.setAttribute('role', 'group');
      track.setAttribute('aria-roledescription', 'carrossel');
      track.setAttribute('aria-label', 'Decks de continuidade');
      track.removeAttribute('tabindex');
      resize.observe(track);
    }
    render();
  }
  new MutationObserver(connect).observe(host, {childList:true, subtree:true});
  connect();
})();
