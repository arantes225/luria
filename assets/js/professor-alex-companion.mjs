import './professor-alex-mascot.mjs?v=20261014-ready2';
import {bindAlex} from './professor-alex-integration.mjs?v=20261014-ready2';

const contexts = {
  dashboard: ['Professor Alex', 'Converse comigo por aqui ou abra a tutoria completa para estudar com mais profundidade.', '/professor-alex/', 'Abrir tutoria completa'],
  aprender: ['Como você quer aprender?', 'Explore as apostilas, suas anotações ou o estudo guiado.', '/apostilas/', 'Abrir apostilas'],
  flashcards: ['Revisão com flashcards', 'Tente lembrar antes de revelar a resposta e avalie como foi sua recordação.', '/consolidar/', 'Ver atividades de revisão'],
  questoes: ['Treino com questões', 'Leia o enunciado com atenção e revise o raciocínio depois da resposta.', '/consolidar/', 'Ver atividades de revisão'],
  caderno: ['Suas anotações', 'Organize conceitos com suas próprias palavras para facilitar a revisão.', '/aprender/', 'Voltar a Aprender'],
  cronograma: ['Seu planejamento', 'Distribua estudo e revisão em blocos que caibam na sua rotina.', '/aprender/', 'Escolher uma atividade'],
  professor_alex: ['Professor Alex', 'Tire dúvidas, converse com IA e aprenda qualquer assunto do zero.', '/aprender/', 'Voltar a Aprender']
};

export function mountAlexCompanion({userId, isAdmin=false}={}) {
  if (!userId || document.querySelector('luria-alex-companion')) return null;
  const page = document.body?.dataset.page || '';
  if (page === 'aprender' || page === 'professor_alex') {
    return null;
  }
  if (sessionStorage.getItem('luria:alex:recharging') === 'true') {
    return null;
  }

  const host = document.createElement('luria-alex-companion');
  const shadow = host.attachShadow({mode:'open'});
  const abort = new AbortController();
  const opts = {signal: abort.signal};
  const passiveOpts = {signal: abort.signal, passive: true};
  const key = 'luria:alex:companion:' + userId;
  const isStudyActionPage = ['questoes', 'erros'].includes(page);

  // Keep the robot present after this rollout. Older preferences used to
  // minimize it automatically on question/review screens; a user can still
  // minimize Alex explicitly and that newer choice will be remembered.
  let prefs = {x: 1, y: 1, minimized: false, visibilityVersion: 2};
  try {
    const saved = JSON.parse(localStorage.getItem(key + ':' + page) || localStorage.getItem(key));
    if (saved && Number.isFinite(saved.x) && Number.isFinite(saved.y)) {
      prefs = {
        x: Math.max(0, Math.min(1, saved.x)),
        y: Math.max(0, Math.min(1, saved.y)),
        minimized: saved.visibilityVersion === 2 ? (saved.minimized === true) : false,
        visibilityVersion: 2
      };
    }
  } catch {}

  const cssHref = new URL('../css/professor-alex-companion.css?v=20261025-visible3', import.meta.url).href;
  shadow.innerHTML = `
    <link rel="stylesheet" href="${cssHref}">
    <style>
      :host { opacity: 1 !important; }
      .help {
        background: var(--color-surface-solid, #ffffff) !important;
        background-color: var(--color-surface-solid, #ffffff) !important;
        opacity: 1 !important;
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
      }
      :host([data-theme="dark"]) .help,
      :host([data-ui-appearance="dark"]) .help,
      .help.dark-theme {
        background: var(--color-surface-solid, #0f1c2e) !important;
        background-color: var(--color-surface-solid, #0f1c2e) !important;
        opacity: 1 !important;
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
      }
    </style>
    <div class="alex-tickle-bubble" hidden></div>
    <div class="help" hidden role="region" aria-label="Ajuda do Alex">
      <button class="close" aria-label="Fechar ajuda">×</button>
      <h2></h2>
      <p></p>
      <div class="alex-quick-messages" aria-live="polite">
        <div class="alex-quick-message alex">Olá! Sou o Professor Alex. Qual dúvida médica você quer estudar?</div>
      </div>
      <form class="alex-quick-chat">
        <input type="text" class="alex-quick-input" placeholder="Tire uma dúvida com o Alex..." maxlength="200" aria-label="Dúvida para o Alex" />
        <button type="submit" class="alex-quick-send">Perguntar</button>
      </form>
      <div class="alex-quick-actions">
        <button class="alex-live-quick" type="button">🎙️ Falar ao vivo</button>
        <a class="tutoring" href="/professor-alex/" hidden>Abrir tutoria completa</a>
      </div>
      <div class="help-actions">
        <button class="recharge-btn" type="button">🔋 Mandar Alex recarregar</button>
        <button class="minimize" type="button">Minimizar Alex</button>
      </div>
    </div>
    <div class="robot"></div>
    <button class="restore" hidden aria-label="Restaurar Alex">⚡ Alex</button>
  `;

  const robot = shadow.querySelector('.robot');
  const help = shadow.querySelector('.help');
  help.style.opacity = '1';
  help.style.backdropFilter = 'none';
  help.style.webkitBackdropFilter = 'none';
  const restore = shadow.querySelector('.restore');
  const tickleBubble = shadow.querySelector('.alex-tickle-bubble');
  const rechargeBtn = shadow.querySelector('.recharge-btn');
  const grip = robot;

  const syncTheme = () => {
    const appearance = document.body?.dataset.uiAppearance || document.documentElement.dataset.uiAppearance;
    const isDark = ['light','dark'].includes(appearance) ? appearance === 'dark' : document.documentElement.dataset.theme === 'dark';
    host.dataset.uiIdentity = document.body?.dataset.uiIdentity || 'blue';
    if (isDark) {
      host.setAttribute('data-theme', 'dark');
      host.setAttribute('data-ui-appearance', 'dark');
      help.classList.add('dark-theme');
      help.style.backgroundColor = 'var(--color-surface-solid, #0f1c2e)';
      help.style.background = 'var(--color-surface-solid, #0f1c2e)';
    } else {
      host.removeAttribute('data-theme');
      host.removeAttribute('data-ui-appearance');
      help.classList.remove('dark-theme');
      help.style.backgroundColor = 'var(--color-surface-solid, #ffffff)';
      help.style.background = 'var(--color-surface-solid, #ffffff)';
    }
    help.style.opacity = '1';
    help.style.backdropFilter = 'none';
    help.style.webkitBackdropFilter = 'none';
  };
  syncTheme();
  const themeObserver = new MutationObserver(syncTheme);
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'data-ui-appearance', 'data-ui-identity'] });
  if (document.body) {
    themeObserver.observe(document.body, { attributes: true, attributeFilter: ['data-theme', 'data-ui-appearance', 'data-ui-identity'] });
  }

  const isAprenderPage = document.body.dataset.page === 'aprender';
  const source = isAprenderPage ? null : document.querySelector('professor-alex-mascot:not(#alex-mascot)');
  const parent = source?.parentElement;
  const next = source?.nextSibling;
  const hero = parent?.closest('.alex-hero');
  const old = source ? {
    size: source.size,
    interactive: source.interactive,
    hidden: parent?.hidden,
    display: parent?.style.display,
    columns: hero?.style.gridTemplateColumns
  } : null;

  const alex = source || document.createElement('professor-alex-mascot');
  if (!alex.id) alex.id = 'alex-companion';
  alex.setAttribute('draggable-companion', '');
  alex.size = 128;
  alex.interactive = true;

  if (parent && !isAprenderPage) {
    parent.hidden = true;
    parent.style.display = 'none';
  }

  const integration = bindAlex(alex);
  let drag = null;
  let destroyed = false;

  const save = () => {
    try {
      prefs.visibilityVersion = 2;
      if (isStudyActionPage) prefs[page + '_minimized'] = prefs.minimized;
      localStorage.setItem(key + ':' + page, JSON.stringify(prefs));
      localStorage.setItem(key, JSON.stringify(prefs));
    } catch {}
  };

  const bounds = () => {
    const viewport = window.visualViewport;
    const left = (viewport?.offsetLeft || 0) + 16;
    // Always clear the topbar (64px) with safe margin (86px)
    const top = Math.max(86, (viewport?.offsetTop || 0) + 86);
    const width = viewport?.width || innerWidth;
    const height = viewport?.height || innerHeight;
    const navigationHeight = document.getElementById("ui-mobile-navigation")?.getBoundingClientRect().height || 0;
    return {
      left,
      top,
      right: Math.max(left, (viewport?.offsetLeft || 0) + width - host.offsetWidth - 16),
      bottom: Math.max(top, (viewport?.offsetTop || 0) + height - host.offsetHeight - navigationHeight - 24)
    };
  };

  function position() {
    const b = bounds();
    let px = prefs.x, py = prefs.y;
    // Keep away from the top-left menu area (menu button)
    if (px < 0.22 && py < 0.22) {
      if (px < py) px = 0.24;
      else py = 0.24;
    }

    const posX = b.left + (b.right - b.left) * px;
    const posY = b.top + (b.bottom - b.top) * py;
    host.style.left = Math.round(posX) + 'px';
    host.style.top = Math.round(posY) + 'px';

    const isTopHalf = py < 0.45;
    const isLeftHalf = px < 0.5;
    help.classList.toggle('down', isTopHalf);
    help.classList.toggle('left', isLeftHalf);

    if (!help.hidden) {
      if (isLeftHalf) {
        help.style.left = '0px';
        help.style.right = 'auto';
      } else {
        help.style.left = 'auto';
        help.style.right = '0px';
      }

      // If Alex is in the upper half of screen, open help bubble DOWNWARDS so it NEVER covers the topbar/menu
      if (isTopHalf) {
        help.style.top = (host.offsetHeight + 10) + 'px';
        help.style.bottom = 'auto';
      } else {
        help.style.top = 'auto';
        help.style.bottom = (host.offsetHeight + 10) + 'px';
      }
      help.style.margin = '0';
    }
  }

  function minimize(value) {
    prefs.minimized = value;
    help.hidden = true;
    robot.hidden = value;
    restore.hidden = !value;
    host.style.width = value ? '68px' : '';
    if (value) alex.remove();
    else robot.append(alex);
    position();
    save();
  }

  function setAccess() {
    shadow.querySelector('.tutoring').hidden = false;
  }

  // --- Click and Multi-Click (Tickle) Handling ---
  let tapCount = 0;
  let tapTimer = null;
  let tickleTimeout = null;
  const ticklePhrases = [
    "Hihihi! Que cócegas! 😄",
    "Para, tá fazendo cócegas! 😂",
    "Hehehe! Meu sensor de cócegas apitou! 🤖✨",
    "Kkkkk! Quase descalibrei minhas engrenagens! ⚡😆",
    "Cócegas no processador não vale! 🤭"
  ];

  function triggerTickle() {
    help.hidden = true;
    robot.classList.remove('tickled');
    void robot.offsetWidth; // force reflow
    robot.classList.add('tickled');
    setTimeout(() => robot.classList.remove('tickled'), 1200);

    if (tickleBubble) {
      tickleBubble.textContent = ticklePhrases[Math.floor(Math.random() * ticklePhrases.length)];
      tickleBubble.hidden = false;
      tickleBubble.classList.add('visible');
      clearTimeout(tickleTimeout);
      tickleTimeout = setTimeout(() => {
        tickleBubble.classList.remove('visible');
        setTimeout(() => { tickleBubble.hidden = true; }, 200);
      }, 1800);
    }
    integration.react('affection');
  }

  function handleAlexTap() {
    tapCount++;
    if (tapCount === 1) {
      tapTimer = setTimeout(() => {
        if (tapCount === 1) {
          help.hidden = !help.hidden;
          position();
          if (!help.hidden) {
            help.style.opacity = '1';
            help.style.backgroundColor = 'var(--color-surface-solid, #ffffff)';
            help.style.background = help.style.backgroundColor;
            help.style.backdropFilter = 'none';
            help.style.webkitBackdropFilter = 'none';
            integration.react('hint');
          }
        }
        tapCount = 0;
      }, 260);
    } else if (tapCount >= 2) {
      clearTimeout(tapTimer);
      triggerTickle();
      setTimeout(() => { tapCount = 0; }, 400);
    }
  }

  alex.addEventListener('alex-react', handleAlexTap, opts);

  // Context copy
  const context = contexts[document.body.dataset.page] || [
    'Estou por aqui',
    'Use esta página para seguir sua atividade. Você pode mover ou falar com o Alex a qualquer momento.',
    '/dashboard/',
    'Abrir meu painel'
  ];
  help.querySelector('h2').textContent = context[0];
  help.querySelector('p').textContent = context[1];
  const link = help.querySelector('.tutoring');
  link.href = '/professor-alex/';
  link.textContent = 'Abrir tutoria completa';

  shadow.querySelector('.close').addEventListener('click', () => {
    help.hidden = true;
    alex.button?.focus();
  }, opts);

  shadow.querySelector('.minimize').addEventListener('click', () => {
    minimize(true);
    restore.focus();
  }, opts);

  restore.addEventListener('click', () => {
    sessionStorage.removeItem('luria:alex:recharging');
    minimize(false);
    alex.button?.focus();
  }, opts);

  // Chat compacto: responde no próprio painel usando o mesmo backend seguro do Alex.
  const quickChat = shadow.querySelector('.alex-quick-chat');
  const quickInput = shadow.querySelector('.alex-quick-input');
  const quickSend = shadow.querySelector('.alex-quick-send');
  const quickMessages = shadow.querySelector('.alex-quick-messages');
  const appendQuickMessage = (text, type) => {
    const message = document.createElement('div');
    message.className = `alex-quick-message ${type || 'alex'}`;
    message.textContent = text;
    quickMessages?.append(message);
    if (quickMessages) quickMessages.scrollTop = quickMessages.scrollHeight;
  };
  quickChat?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = quickInput?.value?.trim();
    if (!query) return;
    appendQuickMessage(query, 'user');
    quickInput.value = '';
    if (quickSend) quickSend.disabled = true;
    appendQuickMessage('Pensando…', 'pending');
    integration.react('thinking');
    try {
      const client = window.supabaseClient;
      if (!client?.functions) throw new Error('Conexão indisponível');
      const {data, error} = await client.functions.invoke('professor-alex-gemini', {
        body: {request_id: crypto.randomUUID(), prompt: query, area: '', topic: '', intent: 'learn', mode: 'normal', channel: 'chat'}
      });
      if (error) throw error;
      quickMessages?.querySelector('.pending')?.remove();
      appendQuickMessage(data?.answer || 'Não consegui responder agora. Tente novamente.', 'alex');
      integration.react('explain');
    } catch (error) {
      quickMessages?.querySelector('.pending')?.remove();
      appendQuickMessage('Não consegui responder agora. Tente novamente.', 'error');
      integration.react('error');
    } finally {
      if (quickSend) quickSend.disabled = false;
      quickInput?.focus();
    }
  }, opts);

  shadow.querySelector('.alex-live-quick')?.addEventListener('click', () => {
    window.location.href = '/professor-alex/?voice=1';
  }, opts);

  // Recharge action
  rechargeBtn?.addEventListener('click', () => {
    help.hidden = true;
    if (tickleBubble) {
      tickleBubble.textContent = 'Indo recarregar minhas energias! Até logo! ⚡🔋';
      tickleBubble.hidden = false;
      tickleBubble.classList.add('visible');
    }
    integration.react('sleep');
    try {
      sessionStorage.setItem('luria:alex:recharging', 'true');
    } catch (_) {}
    setTimeout(() => {
      host.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      host.style.opacity = '0';
      host.style.transform = 'scale(0.2)';
      setTimeout(() => {
        host.remove();
      }, 400);
    }, 1200);
  }, opts);

  // Dragging support
  grip.style.touchAction = 'none';
  grip.addEventListener('dragstart', event => event.preventDefault(), opts);
  let suppressClickUntil = 0;

  grip.addEventListener('pointerdown', event => {
    if (event.button !== 0 || event.isPrimary === false) return;
    event.preventDefault();
    alex.button.focus({preventScroll: true});
    drag = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      lastX: event.clientX,
      lastY: event.clientY,
      left: parseFloat(host.style.left),
      top: parseFloat(host.style.top),
      moved: false,
      angle: null,
      turn: 0
    };
    alex.button.setPointerCapture(event.pointerId);
  }, opts);

  grip.addEventListener('pointermove', event => {
    if (!drag || event.pointerId !== drag.id) return;
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    if (!drag.moved && Math.hypot(dx, dy) < 6) return;
    drag.moved = true;
    tapCount = 0;
    help.hidden = true;

    const velocityX = (event.clientX - drag.lastX) / 18;
    const velocityY = (event.clientY - drag.lastY) / 18;
    const samples = event.getCoalescedEvents?.() || [];
    for (const point of samples.length ? samples : [event]) {
      const stepX = point.clientX - drag.lastX;
      const stepY = point.clientY - drag.lastY;
      if (Math.hypot(stepX, stepY) > 3) {
        const angle = Math.atan2(stepY, stepX);
        if (drag.angle !== null) {
          let delta = angle - drag.angle;
          delta = Math.atan2(Math.sin(delta), Math.cos(delta));
          drag.turn += delta;
        }
        drag.angle = angle;
        drag.lastX = point.clientX;
        drag.lastY = point.clientY;
      }
    }
    event.preventDefault();
    alex.setDragMotion(true, velocityX, velocityY);
    drag.lastX = event.clientX;
    drag.lastY = event.clientY;

    const b = bounds();
    prefs.x = (Math.max(b.left, Math.min(b.right, drag.left + dx)) - b.left) / (b.right - b.left || 1);
    prefs.y = (Math.max(b.top, Math.min(b.bottom, drag.top + dy)) - b.top) / (b.bottom - b.top || 1);
    position();
  }, opts);

  const stop = event => {
    if (!drag || event.pointerId !== drag.id) return;
    const dizzy = drag.moved && Math.abs(drag.turn) > Math.PI * 2.5;
    if (drag.moved) {
      suppressClickUntil = performance.now() + 500;
      save();
      host.dispatchEvent(new CustomEvent('alex-drag-end', {detail:{turn:drag.turn, dizzy}, bubbles:true}));
    }
    drag = null;
    alex.setDragMotion(false);
    if (dizzy) integration.react('dizzy');
  };

  grip.addEventListener('pointerup', stop, opts);
  grip.addEventListener('pointercancel', stop, opts);
  grip.addEventListener('lostpointercapture', stop, opts);

  grip.addEventListener('click', event => {
    if (performance.now() < suppressClickUntil) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, {...opts, capture: true});

  grip.addEventListener('keydown', event => {
    if (!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)) return;
    event.preventDefault();
    const b = bounds();
    prefs.x = Math.max(0, Math.min(1, prefs.x + ({ArrowLeft: -20, ArrowRight: 20}[event.key] || 0) / (b.right - b.left || 1)));
    prefs.y = Math.max(0, Math.min(1, prefs.y + ({ArrowUp: -20, ArrowDown: 20}[event.key] || 0) / (b.bottom - b.top || 1)));
    position();
    save();
  }, opts);

  shadow.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      help.hidden = true;
      alex.button?.focus();
    }
  }, opts);

  window.addEventListener('resize', position, passiveOpts);
  window.addEventListener('luria:mobile-navigation-change', position, opts);
  window.visualViewport?.addEventListener('resize', position, passiveOpts);
  window.visualViewport?.addEventListener('scroll', position, passiveOpts);

  shadow.querySelector('link').addEventListener('load', () => {
    position();
    alex._resize();
    alex._schedule();
  }, opts);

  document.body.append(host);
  setAccess(isAdmin);
  minimize(prefs.minimized);
  if (!prefs.minimized) integration.react('welcome');
  if (new URLSearchParams(window.location.search).get("openAlex") === "true") {
    minimize(false);
    host.style.top = '160px';
    host.style.left = '380px';
    host.style.position = 'fixed';
    host.style.zIndex = '99999';
    setTimeout(() => {
      help.hidden = false;
      help.style.display = 'block';
      help.style.opacity = '1';
      help.style.backgroundColor = 'var(--color-surface-solid, #ffffff)';
      help.style.background = help.style.backgroundColor;
      help.style.backdropFilter = 'none';
      help.style.webkitBackdropFilter = 'none';
    }, 400);
  }

  return {
    host,
    alex,
    setAccess,
    destroy() {
      if (destroyed) return;
      destroyed = true;
      abort.abort();
      themeObserver.disconnect();
      integration.destroy();
      alex.setDragMotion(false);
      alex.removeAttribute('draggable-companion');
      alex.remove();
      host.remove();
      if (parent && !isAprenderPage) {
        alex.size = old.size;
        alex.interactive = old.interactive;
        parent.insertBefore(alex, next);
        parent.hidden = old.hidden;
        parent.style.display = old.display;
        if (hero) hero.style.gridTemplateColumns = old.columns;
      }
    }
  };
}
