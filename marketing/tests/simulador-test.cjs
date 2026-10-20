'use strict';
const { chromium } = require('playwright-core');
const { chromePath } = require('../scripts/lib/common.cjs');
const { ORIGIN, isolate, attachErrorLog, newReport } = require('../capture/lib/site.cjs');

(async () => {
  const browser = await chromium.launch({ executablePath: chromePath(), headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const report = newReport();
  await isolate(context, report);
  const page = await context.newPage();
  attachErrorLog(page, report);

  console.log('1. Acessando sala de emergência...');
  await page.goto(ORIGIN + '/plantao/sala-emergencia/', { waitUntil: 'networkidle' });

  console.log('2. Iniciando caso de Fibrilação Atrial Instável...');
  await page.locator('[data-start-case]').first().click();
  await page.waitForTimeout(600);

  console.log('3. Abrindo aba Procedimentos Iniciais...');
  await page.locator('button[data-case-category="iniciais"]').click();
  await page.waitForTimeout(400);

  console.log('4. Conectando monitor de sinais vitais...');
  await page.locator('#plantao-actions button').filter({ hasText: 'Monitor' }).first().click();
  await page.waitForTimeout(600);

  console.log('5. Acesso venoso...');
  await page.locator('#plantao-actions button').filter({ hasText: 'Obter acesso venoso' }).first().click();
  await page.waitForTimeout(400);

  console.log('6. Fechando drawer e abrindo Intervenções...');
  await page.locator('#plantao-action-close').click();
  await page.waitForTimeout(300);

  await page.locator('button[data-case-category="intervencoes"]').click();
  await page.waitForTimeout(400);

  const intActions = await page.locator('#plantao-actions button').allInnerTexts();
  console.log('Intervenções:', intActions.map(s => s.split('\n')[0]));

  const sedBtn = page.locator('#plantao-actions button').filter({ hasText: 'Sedação' }).first();
  if (await sedBtn.count()) {
    console.log('7. Sedação breve...');
    await sedBtn.click();
    await page.waitForTimeout(400);
  }

  const cardioBtn = page.locator('#plantao-actions button').filter({ hasText: 'Cardioversão' }).first();
  if (await cardioBtn.count()) {
    console.log('8. Cardioversão elétrica sincronizada...');
    await cardioBtn.click();
    await page.waitForTimeout(600);
  }

  const scoreText = await page.locator('#plantao-score-live').innerText();
  console.log('Score:', scoreText);
  const vitalsText = await page.locator('#plantao-vitals').innerText();
  console.log('Sinais vitais pós-cardioversão:\n' + vitalsText);

  await page.screenshot({ path: 'public/captures/test-monitor-cardioversion.png' });
  console.log('Screenshot salva em public/captures/test-monitor-cardioversion.png');

  await browser.close();
})().catch(console.error);
