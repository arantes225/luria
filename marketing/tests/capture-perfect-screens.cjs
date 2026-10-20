'use strict';
const { chromium } = require('playwright-core');
const { chromePath } = require('../scripts/lib/common.cjs');
const { ORIGIN, isolate, attachErrorLog, newReport } = require('../capture/lib/site.cjs');

(async () => {
  const browser = await chromium.launch({ executablePath: chromePath(), headless: true });

  // 1) Captura Landing Page (sem redirecionar para dashboard)
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
    const report = newReport();
    await isolate(context, report);
    await context.addInitScript(() => {
      // Impede redirect automático na landing page
      Object.defineProperty(window, 'supabaseClient', {
        get: () => null,
        set: () => {},
        configurable: true
      });
    });
    const page = await context.newPage();
    await page.goto(ORIGIN + '/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);
    await page.screenshot({ path: 'public/captures/simulador-emergencia/desktop-landing.png' });
    console.log('✔ desktop-landing.png capturada');
    await context.close();
  }

  // 2) Captura Paciente Estabilizado com Monitor em Ritmo Sinusal
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
    const report = newReport();
    await isolate(context, report);
    const page = await context.newPage();
    await page.goto(ORIGIN + '/plantao/sala-emergencia/', { waitUntil: 'networkidle' });
    await page.locator('[data-start-case]').first().click();
    await page.waitForTimeout(400);

    // Liga o monitor
    await page.locator('button[data-case-category="iniciais"]').click();
    await page.waitForTimeout(300);
    await page.locator('#plantao-actions button').filter({ hasText: 'Monitor cardíaco' }).first().click();
    await page.waitForTimeout(300);
    await page.locator('#plantao-action-close').click();
    await page.waitForTimeout(300);

    // Faz cardioversão elétrica sincronizada imediata
    await page.locator('button[data-case-category="intervir"]').click();
    await page.waitForTimeout(300);
    await page.locator('#plantao-actions button').filter({ hasText: 'Cardioversão' }).first().click();
    await page.waitForTimeout(400);
    await page.locator('#plantao-action-close').click();
    await page.waitForTimeout(800);

    await page.screenshot({ path: 'public/captures/simulador-emergencia/desktop-stabilized.png' });
    console.log('✔ desktop-stabilized.png capturada (Ritmo Sinusal Estabilizado)');
    await context.close();
  }

  await browser.close();
})().catch(e => { console.error(e); process.exitCode = 1; });
