'use strict';
/*
 * Captura para o comercial cinematográfico V1.
 *   node capture/commercial-v1.cjs
 *
 * Em vez de gravar vídeo, extrai da TRAUBE REAL (HTML/CSS originais, backend
 * fictício, rede isolada) camadas em resolução retina (430x932 @3x) que o Three.js
 * mapeia na tela do smartphone 3D:
 *   - <pagina>-content.png : conteúdo rolável inteiro (.main) em uma imagem alta
 *   - <pagina>-frame.png   : moldura azul institucional + barra superior (furo transparente)
 *   - dashboard-drawer.png : menu lateral aberto (caminho real Dashboard -> Aprender)
 *   - layout.json          : retângulos dos componentes (para câmera/camadas 3D)
 * Professor Alex só aparece para administradores no produto; como não é público,
 * NÃO é capturado/exibido (scenario sem isAdmin).
 */
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright-core');
const { MARKETING, chromePath, writeJson, logRun } = require('../scripts/lib/common.cjs');
const { ORIGIN, isolate, attachErrorLog, newReport } = require('./lib/site.cjs');

const OUT = path.join(MARKETING, 'public', 'commercial');
const VIEW = { width: 430, height: 932 };
const DPR = 3;
const OWNER = '00000000-0000-4000-8000-00000000a11a';

const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const addDays = (d, n) => { const c = new Date(d); c.setDate(c.getDate() + n); return c; };

function buildScenario() {
  const now = new Date();
  const today = iso(now);
  const weekday = (now.getDay() + 6) % 7; // seg=0
  const monday = addDays(now, -weekday);

  const areas = [
    ['Clínica Médica', 18, 13], ['Cirurgia', 14, 8], ['Pediatria', 12, 9],
    ['Ginecologia e Obstetrícia', 12, 6], ['Medicina Preventiva', 8, 6]
  ];
  const todayLessons = [
    ['Clínica Médica', 'Cardiologia', 'Insuficiência cardíaca', true],
    ['Pediatria', 'Neonatologia', 'Icterícia neonatal', true],
    ['Cirurgia', 'Abdome agudo', 'Apendicite aguda', false],
    ['Ginecologia e Obstetrícia', 'Obstetrícia', 'Pré-natal de risco habitual', false]
  ];
  const topics = [];
  let n = 0;
  for (const [area, total, done] of areas) {
    for (let i = 0; i < total; i++) {
      const completed = i < done;
      topics.push({
        id: 't' + (++n), user_id: OWNER, area, materia: area, theme: 'Tema ' + n,
        scheduled_date: iso(addDays(now, (i % 9) - 6)), status: completed ? 'completed' : 'pending',
        completed_at: completed ? new Date(now.getTime() - i * 3600e3).toISOString() : null, created_at: new Date(now.getTime() - n * 1e6).toISOString()
      });
    }
  }
  const todayTopics = todayLessons.map(([area, materia, theme, completed], i) => ({
    id: 'today' + i, user_id: OWNER, area, materia, theme, scheduled_date: today,
    status: completed ? 'completed' : 'pending', completed_at: completed ? now.toISOString() : null, created_at: new Date(now.getTime() - i * 1e5).toISOString()
  }));
  const agenda = todayLessons.map(([area, materia, theme], i) => ({
    agenda_key: 'topic:today' + i, user_id: OWNER, kind: 'lesson', item_id: 'today' + i, activity_date: today,
    activity_time: ['08:00', '10:00', '14:00', '16:30'][i], title: theme, subtitle: materia, area, materia, item_count: 1, movable: true
  })).filter((_, i) => !todayLessons[i][3]).concat([{
    agenda_key: 'fc:today', user_id: OWNER, kind: 'flashcards_batch', item_id: 'fc', activity_date: today,
    activity_time: '19:00', title: 'Revisão de flashcards', subtitle: '23 cards', area: 'Revisão', item_count: 23, movable: false
  }]);

  const hours = [];
  for (let d = -7 - weekday; d <= 0; d++) {
    hours.push({ study_date: iso(addDays(now, d)), total_seconds: d >= -weekday ? (3 * 3600 + 20 * 60) : (2 * 3600 + 40 * 60) });
  }
  const sessions = [];
  for (let d = 0; d <= weekday; d++) sessions.push({ started_at: addDays(monday, d).toISOString(), ended_at: addDays(monday, d).toISOString(), duration_seconds: 2400 });

  return {
    ownerName: 'Lia', streakDays: 14, longestStreak: 21,
    tables: {
      study_topics: topics.concat(todayTopics),
      agenda_feed: agenda,
      study_hours_daily: hours,
      study_sessions: sessions,
      flashcards: Array.from({ length: 23 }, (_, i) => ({ id: 'f' + i, user_id: OWNER, active: true, due_date: today })),
      flashcard_metrics_daily: [{ review_date: today, total_reviews: 48, correct: 41, incorrect: 7 }],
      flashcard_retention_overall: [{ retention_percent: 87 }],
      error_notebook_metrics: [{ registered_errors: 12, reviewed_errors: 5, overdue_errors: 2, retention_percent: 80 }],
      error_notebook: [{ id: 'e1', active: true, area: 'Clínica Médica', materia: 'Cardiologia', theme: 'SCA', ccq: 'Dor torácica com supra de ST: reperfusão imediata, o tempo é músculo.', due_date: today, review_count: 1, created_at: now.toISOString() }],
      question_set_metrics: [
        { set_id: 's1', answered_count: 60, correct_count: 45, last_answered_at: now.toISOString() },
        { set_id: 's2', answered_count: 40, correct_count: 31, last_answered_at: now.toISOString() }
      ]
    }
  };
}

async function newContext(browser, report, scenario) {
  const context = await browser.newContext({
    viewport: VIEW, deviceScaleFactor: DPR, isMobile: true, hasTouch: true,
    serviceWorkers: 'block', locale: 'pt-BR', timezoneId: 'America/Sao_Paulo', colorScheme: 'light', reducedMotion: 'no-preference'
  });
  await context.addInitScript(({ scenario }) => {
    window.__TRAUBE_MARKETING_SCENARIO = scenario;
    window.__MK_POINTER = 'touch';
    // PWA instalado: o app já possui o modo "standalone" (barra inferior, área segura).
    try { Object.defineProperty(navigator, 'standalone', { value: true }); } catch {}
    try { localStorage.setItem('luria:onboarding:done', '1'); } catch {}
    const css = document.createElement('style');
    css.textContent = 'html{scrollbar-width:none}::-webkit-scrollbar{display:none}*{caret-color:transparent}';
    document.addEventListener('DOMContentLoaded', () => document.head.appendChild(css));
  }, { scenario });
  await isolate(context, report);
  const page = await context.newPage();
  attachErrorLog(page, report);
  return { context, page };
}

const SAFE_TOP = 59, SAFE_BOTTOM = 34; // iPhone Pro Max (430x932)

async function applySafeArea(page) {
  await page.evaluate(({ top, bottom }) => {
    const imp = (el, k, v) => el && el.style.setProperty(k, v, 'important');
    // env(safe-area-inset-*) não existe fora de um iPhone: replica os valores nas mesmas propriedades do CSS real.
    document.body.style.setProperty('--ui-nav-height', `calc(64px + ${top}px)`);
    document.body.style.setProperty('--ui-topbar', `calc(64px + ${top}px)`);
    document.body.style.setProperty('--ui-bottom-navigation', `calc(72px + ${bottom}px)`);
    imp(document.querySelector('.topbar'), 'padding-top', `calc(8px + ${top}px)`);
    imp(document.querySelector('.ui-mobile-navigation'), 'padding-bottom', `calc(8px + ${bottom}px)`);
  }, { top: SAFE_TOP, bottom: SAFE_BOTTOM });
}

async function waitReady(page, rootSel) {
  await page.waitForSelector('body[data-ui-startup="ready"]', { timeout: 30000, state: 'attached' });
  if (rootSel) await page.waitForSelector(rootSel, { timeout: 30000 });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() => [...document.images].every(i => i.complete));
  await page.waitForTimeout(1800);
  // Remove da captura elementos flutuantes/ferramentas internas que não fazem parte da narrativa.
  await page.evaluate(() => {
    const hide = (el) => el && el.style.setProperty('display', 'none', 'important');
    document.querySelectorAll('luria-alex-companion, #beta-testers-nav-link, #admin-nav-link, .sidebar-footer').forEach(hide);
  });
  await applySafeArea(page);
  await page.waitForTimeout(600);
}


/* Retângulos (px CSS) relativos ao topo do conteúdo rolável, mais raio de borda. */
async function measure(page, selectors) {
  return page.evaluate((selectors) => {
    const main = document.querySelector('.main');
    const mb = main.getBoundingClientRect();
    const out = { main: { w: mb.width, h: main.scrollHeight, top: mb.top, left: mb.left }, items: {} };
    for (const [name, sel] of Object.entries(selectors)) {
      const nodes = [...document.querySelectorAll(sel)].filter(n => n.getClientRects().length);
      out.items[name] = nodes.map(n => {
        const r = n.getBoundingClientRect();
        const radius = parseFloat(getComputedStyle(n).borderTopLeftRadius) || 0;
        return { x: r.left - mb.left, y: r.top - mb.top + main.scrollTop, w: r.width, h: r.height, radius, text: (n.innerText || '').trim().slice(0, 60) };
      });
    }
    return out;
  }, selectors);
}

async function capturePage(browser, name, url, rootSel, selectors, extra) {
  const report = newReport();
  const { context, page } = await newContext(browser, report, buildScenario());
  const result = { name, ok: true };
  try {
    await page.goto(ORIGIN + url, { waitUntil: 'domcontentloaded' });
    await waitReady(page, rootSel);
    await page.screenshot({ path: path.join(OUT, `${name}-viewport.png`) });
    if (extra?.beforeTall) result.extra = await extra.beforeTall(page, OUT);

    // Conteúdo rolável inteiro: viewport alto para o .main não precisar rolar.
    const scrollH = await page.evaluate(() => document.querySelector('.main').scrollHeight);
    const tallH = Math.ceil(scrollH + 68 + 16);
    await page.setViewportSize({ width: VIEW.width, height: tallH });
    await page.waitForTimeout(900);
    result.layout = await measure(page, selectors);
    await page.locator('.main').screenshot({ path: path.join(OUT, `${name}-content.png`) });

    // Moldura azul + barra superior com furo transparente.
    await page.setViewportSize(VIEW);
    await page.waitForTimeout(700);
    await page.evaluate(() => {
      const imp = (el, k, v) => el && el.style.setProperty(k, v, 'important');
      imp(document.documentElement, 'background', 'transparent');
      imp(document.body, 'background', 'transparent');
      const shell = document.querySelector('.app-shell');
      imp(shell, 'background', 'transparent');
      imp(shell, 'box-shadow', '0 0 0 3000px #184888');
      imp(document.querySelector('.main'), 'visibility', 'hidden');
      imp(document.querySelector('#sidebar'), 'visibility', 'hidden');
      document.querySelectorAll('.ui-startup,.ui-mobile-navigation').forEach(n => imp(n, 'display', 'none'));
    });
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(OUT, `${name}-frame.png`), omitBackground: true });
  } catch (e) {
    result.ok = false; result.error = String(e.stack || e);
    await page.screenshot({ path: path.join(OUT, `${name}-ERROR.png`) }).catch(() => {});
  }
  result.report = { pageErrors: report.pageErrors, consoleErrors: report.consoleErrors.slice(0, 8), blocked: [...new Set(report.blocked)], missing: [...new Set(report.missing)] };
  await context.close();
  return result;
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const exe = chromePath();
  if (!exe) throw new Error('Chrome/Edge não encontrado. Defina CHROME_PATH.');
  const browser = await chromium.launch({ executablePath: exe, headless: true, args: ['--hide-scrollbars', '--font-render-hinting=none', '--disable-features=Translate', '--force-color-profile=srgb'] });
  const summary = {};
  try {
    summary.dashboard = await capturePage(browser, 'dashboard', '/dashboard/', '#dashboard-alternative[data-rendered="true"]', {
      header: '.ui-page-header', streak: '.ui-header-streak', spotlight: '.dl-dashboard-title-card',
      agenda: '.dl-agenda-large', study: '.dl-study-now-card', summary: '.dl-day-summary', metrics: '.ui-review-summary',
      metric: '.ui-quick-metric', areas: '.dl-areas', cat: '.dl-cat', ring: '.dl-ring', activity: '.dl-activity', timeOptions: '.dl-study-time-options'
    }, {
      // Caminho real: menu (hambúrguer) -> Aprender.
      async beforeTall(page, out) {
        await page.tap('#menu-open');
        await page.waitForTimeout(900);
        await page.screenshot({ path: path.join(out, 'dashboard-drawer.png') });
        const link = await page.evaluate(() => {
          const a = document.querySelector('#sidebar nav a[href="/aprender/"]');
          if (!a) return null;
          const r = a.getBoundingClientRect();
          return { x: r.left, y: r.top, w: r.width, h: r.height, text: a.innerText.trim() };
        });
        const hamburger = await page.evaluate(() => { const r = document.querySelector('.topbar #menu-open, #menu-open').getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; });
        await page.keyboard.press('Escape');
        await page.evaluate(() => document.body.classList.remove('sidebar-open'));
        await page.waitForTimeout(600);
        return { aprenderLink: link, hamburger };
      }
    });
    summary.aprender = await capturePage(browser, 'aprender', '/aprender/', '.learn-tools .tool-card', {
      spotlight: '.luria-page-spotlight', alex: '.alex-hero:not([hidden])', tools: '.learn-tools', tool: '.tool-card'
    });
  } finally { await browser.close(); }

  writeJson(path.join(OUT, 'layout.json'), {
    viewport: VIEW, dpr: DPR, frame: { top: 64, gap: 4, radius: 18 },
    dashboard: { ...summary.dashboard.layout, extra: summary.dashboard.extra },
    aprender: summary.aprender.layout
  });
  writeJson(path.join(OUT, 'capture-report.json'), { dataNotice: 'Todos os dados exibidos são fictícios (fixture local). Nenhum dado real.', summary: { dashboard: { ok: summary.dashboard.ok, error: summary.dashboard.error, report: summary.dashboard.report }, aprender: { ok: summary.aprender.ok, error: summary.aprender.error, report: summary.aprender.report } } });
  logRun('capture_commercial_v1', { dashboard: summary.dashboard.ok, aprender: summary.aprender.ok });
  for (const k of ['dashboard', 'aprender']) {
    const s = summary[k];
    console.log(`${s.ok ? '✔' : '✖'} ${k}`, s.error ? s.error.split('\n')[0] : '', s.report.pageErrors.length ? 'pageErrors: ' + s.report.pageErrors.slice(0, 3).join(' | ') : '');
  }
  if (!summary.dashboard.ok || !summary.aprender.ok) process.exitCode = 1;
})().catch(e => { console.error(e); process.exitCode = 1; });
