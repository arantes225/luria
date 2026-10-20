'use strict';
/*
 * Cena: Simulador de Emergência (Fibrilação Atrial Instável com Monitor Ligado).
 * Mostra acesso ao Simulador de Emergência -> escolha do caso ->
 * conexão do monitor multiparamétrico ao vivo -> condutas clínicas -> cardioversão e estabilização.
 */

module.exports = {
  id: 'simulador-emergencia',
  title: 'Simulador de Emergência — Caso Clínico com Monitor Ao Vivo',
  feature: 'plantao',
  publicStatus: 'public',
  priority: 1,
  path: '/plantao/sala-emergencia/',
  formats: ['desktop', 'mobile'],
  scenario: { ownerName: 'Dr. Lucas' },

  async ready(page) {
    await page.locator('[data-start-case]').first().waitFor({ timeout: 15000 });
    await page.waitForTimeout(500);
  },

  async play(page, d) {
    // 1) Biblioteca do Simulador de Emergência
    d.step('simulator-library');
    await d.wait(1200);
    await d.poster('library');

    // 2) Seleciona o caso: Fibrilação Atrial Instável
    d.step('start-case');
    const startBtn = page.locator('[data-start-case]').first();
    await d.tap(startBtn, { after: 1000 });
    await d.poster('case-opened');

    // 3) Abre Procedimentos Iniciais e LIGA O MONITOR
    d.step('turn-monitor-on');
    const iniciaisTab = page.locator('button[data-case-category="iniciais"]');
    await d.tap(iniciaisTab, { after: 600 });
    await d.poster('drawer-iniciais');

    const monitorBtn = page.locator('#plantao-actions button').filter({ hasText: 'Monitor cardíaco' }).first();
    await d.tap(monitorBtn, { after: 1600 });
    await d.poster('monitor-on');

    // 4) Avaliar ritmo no monitor
    d.step('evaluate-rhythm');
    const rhythmBtn = page.locator('#plantao-actions button').filter({ hasText: 'Avaliar ritmo' }).first();
    if (await rhythmBtn.isVisible().catch(() => false)) {
      await d.tap(rhythmBtn, { after: 900 });
    }

    // Fecha gaveta para exibir o leito completo + monitor ao vivo pulsando
    const closeBtn = page.locator('#plantao-action-close');
    if (await closeBtn.isVisible().catch(() => false)) {
      await d.tap(closeBtn, { after: 500 });
    }
    await d.wait(1800);
    await d.poster('bedside-monitor-live');

    // 5) Abre Intervenções -> Sedação + Cardioversão Elétrica Sincronizada
    d.step('cardioversion');
    const intervirTab = page.locator('button[data-case-category="intervir"]');
    if (await intervirTab.isVisible().catch(() => false)) {
      await d.tap(intervirTab, { after: 600 });
      await d.poster('drawer-intervir');

      const sedBtn = page.locator('#plantao-actions button').filter({ hasText: 'Sedação' }).first();
      if (await sedBtn.isVisible().catch(() => false)) {
        await d.tap(sedBtn, { after: 700 });
      }

      const cardioBtn = page.locator('#plantao-actions button').filter({ hasText: 'Cardioversão' }).first();
      if (await cardioBtn.isVisible().catch(() => false)) {
        await d.tap(cardioBtn, { after: 1200 });
      }

      if (await closeBtn.isVisible().catch(() => false)) {
        await d.tap(closeBtn, { after: 500 });
      }
    }

    // 6) Monitor estabilizado em Ritmo Sinusal com prontuário atualizado
    d.step('stabilized');
    await d.wait(3000);
    await d.poster('stabilized');
  }
};
