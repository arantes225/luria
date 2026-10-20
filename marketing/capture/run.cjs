'use strict';
/*
 * Executor de capturas.
 *   node capture/run.cjs --list
 *   node capture/run.cjs --scene study-rats --format mobile
 *   node capture/run.cjs --scene study-rats --format all
 *   node capture/run.cjs --scene study-rats --format mobile --headed   (depuração)
 * Saída: public/captures/<cena>/<formato>.mp4 + .json (marcas, erros) + poster .png
 */
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright-core');
const { MARKETING, chromePath, logRun, writeJson, args } = require('../scripts/lib/common.cjs');
const { ORIGIN, isolate, attachErrorLog, newReport } = require('./lib/site.cjs');
const { ScreencastRecorder } = require('./lib/recorder.cjs');
const { OVERLAY, director } = require('./lib/director.cjs');

const FORMATS = {
  mobile: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, pointer: 'touch', max: { w: 780, h: 1688 } },
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5, isMobile: false, hasTouch: false, pointer: 'cursor', max: { w: 2160, h: 1350 } }
};

function loadScenes() {
  const dir = path.join(__dirname, 'scenes');
  return fs.readdirSync(dir).filter(f => f.endsWith('.cjs')).map(f => require(path.join(dir, f)));
}

async function captureOne(browser, scene, formatName, opts) {
  const fmt = FORMATS[formatName];
  const outDir = path.join(MARKETING, 'public', 'captures', scene.id);
  const report = newReport();
  const context = await browser.newContext({
    viewport: fmt.viewport, deviceScaleFactor: fmt.deviceScaleFactor, isMobile: fmt.isMobile, hasTouch: fmt.hasTouch,
    serviceWorkers: 'block', locale: 'pt-BR', timezoneId: 'America/Sao_Paulo', colorScheme: 'light', reducedMotion: 'no-preference'
  });
  await context.addInitScript(({ scenario, pointer }) => {
    window.__LURIA_MARKETING_SCENARIO = scenario;
    window.__MK_POINTER = pointer;
    try { localStorage.setItem('luria:onboarding:done', '1'); } catch {}
  }, { scenario: scene.scenario || {}, pointer: fmt.pointer });
  await context.addInitScript(OVERLAY);
  await isolate(context, report);
  const page = await context.newPage();
  attachErrorLog(page, report);
  const started = Date.now();
  let result = null, error = null;
  try {
    await page.goto(ORIGIN + scene.path, { waitUntil: 'domcontentloaded' });
    if (scene.ready) await scene.ready(page, { format: formatName });
    await page.waitForTimeout(400);
    const recorder = new ScreencastRecorder(page, { framesDir: path.join(MARKETING, '.cache', 'frames', scene.id + '-' + formatName), maxWidth: fmt.max.w, maxHeight: fmt.max.h });
    const d = director(page, { pointer: fmt.pointer, recorder, report });
    d.poster = async name => page.screenshot({ path: path.join(outDir, `${formatName}-${name}.png`) });
    fs.mkdirSync(outDir, { recursive: true });
    await recorder.start();
    d.step('start');
    await scene.play(page, d, { format: formatName });
    await recorder.stop();
    const outFile = path.join(outDir, `${formatName}.mp4`);
    result = await recorder.encode(outFile);
    result.file = path.relative(MARKETING, outFile).replace(/\\/g, '/');
  } catch (e) {
    error = e;
    await page.screenshot({ path: path.join(outDir, `${formatName}-ERROR.png`) }).catch(() => {});
  }
  report.fixtureUnhandled = await page.evaluate(() => window.__marketingLog || []).catch(() => []);
  report.blocked = [...new Set(report.blocked)];
  await context.close();
  const meta = {
    scene: scene.id, title: scene.title, feature: scene.feature, publicStatus: scene.publicStatus,
    format: formatName, viewport: fmt.viewport, deviceScaleFactor: fmt.deviceScaleFactor,
    capturedAt: new Date().toISOString(), elapsedSeconds: Math.round((Date.now() - started) / 1000),
    ok: !error && report.pageErrors.length === 0, error: error ? String(error.stack || error) : null,
    video: result, report, dataNotice: 'Todos os dados exibidos são fictícios (fixture local). Nenhum dado real de aluno.'
  };
  writeJson(path.join(outDir, `${formatName}.json`), meta);
  logRun('capture', { scene: scene.id, format: formatName, ok: meta.ok, seconds: result?.seconds, pageErrors: report.pageErrors.length, error: meta.error ? meta.error.split('\n')[0] : null });
  if (!opts.quiet) {
    console.log(`${meta.ok ? '✔' : '✖'} ${scene.id}/${formatName} — ${result ? result.seconds + 's, ' + result.frames + ' quadros' : 'falhou'}`);
    if (report.pageErrors.length) console.log('  erros de página:', report.pageErrors.slice(0, 5));
    if (report.missing.length) console.log('  arquivos ausentes:', [...new Set(report.missing)].slice(0, 5));
    if (report.fixtureUnhandled.length) console.log('  RPC/tabelas sem dado fictício:', [...new Set(report.fixtureUnhandled.map(x => x.kind + ':' + x.name))].join(', '));
    if (error) console.log('  ' + String(error.message).split('\n')[0]);
  }
  return meta;
}

(async () => {
  const a = args();
  const scenes = loadScenes();
  if (a.list) {
    for (const s of scenes) console.log(`${s.id.padEnd(20)} ${String(s.publicStatus).padEnd(10)} ${s.title}`);
    return;
  }
  const exe = chromePath();
  if (!exe) throw new Error('Chrome/Edge não encontrado. Defina CHROME_PATH.');
  const selected = a.scene ? scenes.filter(s => s.id === a.scene) : scenes.filter(s => s.priority);
  if (!selected.length) throw new Error('Cena não encontrada: ' + a.scene);
  const formats = !a.format || a.format === 'all' ? null : String(a.format).split(',');
  const browser = await chromium.launch({ executablePath: exe, headless: !a.headed, args: ['--hide-scrollbars', '--font-render-hinting=none', '--disable-features=Translate'] });
  const results = [];
  try {
    for (const scene of selected) for (const f of formats || scene.formats || ['mobile']) results.push(await captureOne(browser, scene, f, a));
  } finally { await browser.close(); }
  if (results.some(r => !r.ok)) process.exitCode = 1;
})().catch(e => { console.error(e); process.exitCode = 1; });
