'use strict';
/*
 * Ações "cinematográficas" para as cenas: toques visíveis, cursor animado,
 * rolagem suave com easing e digitação com ritmo humano. O overlay de toque é
 * injetado apenas no navegador de captura — não altera o site.
 */

const OVERLAY = String.raw`
(() => {
  if (window.__mkOverlay) return; window.__mkOverlay = true;
  const css = document.createElement('style');
  css.textContent = '.mk-touch{position:fixed;z-index:2147483647;pointer-events:none;width:46px;height:46px;margin:-23px 0 0 -23px;border-radius:50%;background:rgba(24,72,136,.22);border:2px solid rgba(24,72,136,.55);box-shadow:0 6px 18px rgba(24,72,136,.25);transform:scale(.6);opacity:0;transition:transform .18s ease,opacity .18s ease,left .45s cubic-bezier(.22,.8,.24,1),top .45s cubic-bezier(.22,.8,.24,1)}'+
    '.mk-touch.on{opacity:1;transform:scale(1)}.mk-touch.press{transform:scale(.78);background:rgba(24,72,136,.34)}'+
    '.mk-cursor{position:fixed;z-index:2147483647;pointer-events:none;width:26px;height:26px;margin:-3px 0 0 -4px;transition:left .55s cubic-bezier(.22,.8,.24,1),top .55s cubic-bezier(.22,.8,.24,1),transform .12s ease;filter:drop-shadow(0 3px 6px rgba(0,0,0,.25))}.mk-cursor.press{transform:scale(.86)}'+
    'html{scrollbar-width:none}::-webkit-scrollbar{display:none}';
  const mount = () => {
    document.head.appendChild(css);
    const mode = window.__MK_POINTER || 'touch';
    const el = document.createElement('div');
    if (mode === 'cursor') { el.className = 'mk-cursor'; el.innerHTML = '<svg viewBox="0 0 24 24" width="26" height="26"><path d="M4 2l15 10.5-6.6 1.3 3.9 7.4-2.9 1.5-3.9-7.5L4 20z" fill="#fff" stroke="#0b2347" stroke-width="1.4" stroke-linejoin="round"/></svg>'; el.style.left = '60%'; el.style.top = '70%'; }
    else el.className = 'mk-touch';
    document.body.appendChild(el);
    window.__mkPointer = el;
  };
  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);
})();`;

function director(page, { pointer = 'touch', recorder, report } = {}) {
  const wait = ms => page.waitForTimeout(ms);
  const step = label => { recorder?.mark(label); report?.steps.push({ label, at: new Date().toISOString() }); };

  async function movePointer(x, y, show = true) {
    await page.evaluate(({ x, y, show }) => {
      const el = window.__mkPointer; if (!el) return;
      el.style.left = x + 'px'; el.style.top = y + 'px';
      if (show) el.classList.add('on');
    }, { x, y, show });
  }

  async function tap(locator, { hold = 140, after = 450 } = {}) {
    await locator.scrollIntoViewIfNeeded();
    const box = await locator.boundingBox();
    if (!box) throw new Error('Elemento sem área visível para tocar');
    const x = box.x + box.width / 2, y = box.y + box.height / 2;
    await movePointer(x, y);
    await wait(pointer === 'cursor' ? 600 : 380);
    await page.evaluate(() => window.__mkPointer?.classList.add('press'));
    await wait(hold);
    await locator.click({ delay: 40 });
    await page.evaluate(() => window.__mkPointer?.classList.remove('press'));
    if (pointer === 'touch') { await wait(220); await page.evaluate(() => window.__mkPointer?.classList.remove('on')); }
    await wait(after);
  }

  async function type(locator, text, { perChar = 70 } = {}) {
    await tap(locator, { after: 200 });
    for (const ch of text) { await page.keyboard.type(ch); await wait(perChar + Math.round(Math.random() * 35)); }
  }

  /* Rola o contêiner rolável mais próximo até o alvo, com easing suave. */
  async function scrollTo(target, { duration = 1100, offset = 80 } = {}) {
    const handle = typeof target === 'string' ? page.locator(target).first() : target;
    await handle.evaluate(async (el, { duration, offset }) => {
      const scroller = (() => { let p = el.parentElement; while (p && p !== document.body) { const s = getComputedStyle(p); if (/(auto|scroll)/.test(s.overflowY) && p.scrollHeight > p.clientHeight) return p; p = p.parentElement; } return document.scrollingElement; })();
      const rect = el.getBoundingClientRect();
      const base = scroller === document.scrollingElement ? 0 : scroller.getBoundingClientRect().top;
      const from = scroller.scrollTop, to = Math.max(0, from + rect.top - base - offset);
      const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      await new Promise(done => { const t0 = performance.now(); const frame = now => { const k = Math.min(1, (now - t0) / duration); scroller.scrollTop = from + (to - from) * ease(k); k < 1 ? requestAnimationFrame(frame) : done(); }; requestAnimationFrame(frame); });
    }, { duration, offset });
    await wait(150);
  }

  async function scrollBy(dy, { duration = 900 } = {}) {
    await page.evaluate(async ({ dy, duration }) => {
      const el = document.querySelector('.main') && document.querySelector('.main').scrollHeight > document.querySelector('.main').clientHeight ? document.querySelector('.main') : document.scrollingElement;
      const from = el.scrollTop, ease = t => 1 - Math.pow(1 - t, 3);
      await new Promise(done => { const t0 = performance.now(); const f = n => { const k = Math.min(1, (n - t0) / duration); el.scrollTop = from + dy * ease(k); k < 1 ? requestAnimationFrame(f) : done(); }; requestAnimationFrame(f); });
    }, { dy, duration });
  }

  return { wait, step, tap, type, scrollTo, scrollBy, movePointer };
}

module.exports = { OVERLAY, director };
