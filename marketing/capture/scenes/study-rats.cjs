'use strict';
/*
 * Cena: Study Rats (corrida de estudos entre amigos, aba Amigos).
 * Funcionalidade publicada (commit 44d5fa66 "Publish approved social community").
 * Observação: a página /jogos/study-rats/ é uma PRÉVIA do jogo de tabuleiro e
 * NÃO é usada aqui para não anunciar algo ainda não disponível ao público.
 */
const FRIENDS = [
  { name: 'Ana', variant: 'pink', accessory: 'round-nerd-glasses' },
  { name: 'Bruno', variant: 'brown', accessory: 'gamer-headset' },
  { name: 'Caio', variant: 'gray', accessory: 'wizard-hat' },
  { name: 'Duda', variant: 'lavender', accessory: 'colorful-cap' }
];

const RACE = {
  id: 'race-cardio', title: 'Semana de Cardiologia', type: 'flashcards', startedDaysAgo: 0.01, deadlineInDays: 4,
  participants: [
    { name: 'owner', progress: 0 }, { name: 'Ana', progress: 0 }, { name: 'Bruno', progress: 0 }, { name: 'Caio', progress: 0 }
  ]
};

module.exports = {
  id: 'study-rats',
  title: 'Study Rats — corrida de estudos com amigos',
  feature: 'studyrats',
  publicStatus: 'public',
  priority: 1,
  path: '/amigos/',
  formats: ['mobile', 'desktop'],
  scenario: { ownerName: 'Você', ownerVariant: 'blue', ownerAccessory: 'none', friends: FRIENDS, studyrats: [RACE] },

  async ready(page) {
    await page.locator('#studyrats-title').waitFor({ timeout: 15000 });
    await page.locator('.sr-lane').first().waitFor({ timeout: 15000 });
    await page.waitForFunction(() => [...document.images].filter(i => i.closest('#studyrats-list')).every(i => i.complete));
    await page.waitForTimeout(600);
  },

  async play(page, d) {
    // 1) Abertura: apresenta o StudyRats.
    await d.scrollTo('#studyrats-title', { duration: 1200, offset: 16 });
    await d.wait(900);
    await d.poster('intro');

    // 2) A corrida ganha vida: progresso fictício faz os ratinhos avançarem.
    d.step('race');
    await d.scrollTo('#studyrats-list', { duration: 1000, offset: 12 });
    await d.wait(500);
    await page.evaluate(() => {
      window.__marketing.setStarted('race-cardio', 2.4);
      window.__marketing.setProgress('race-cardio', { owner: 86, Ana: 112, Bruno: 64, Caio: 41 });
      return sharedStudyratsLoad();
    });
    await d.wait(2600);
    await d.poster('race');

    // 3) Personalização do ratinho (recurso condicionado ao plano).
    d.step('customize');
    await d.scrollTo('#studyrats-toggle-customize', { duration: 900, offset: 220 });
    await d.tap(page.locator('#studyrats-toggle-customize'), { after: 700 });
    await d.scrollTo('#studyrats-customizer', { duration: 800, offset: 30 });
    await d.tap(page.locator('[data-studyrat-variant="tiger"]'), { after: 700 });
    await d.tap(page.locator('[data-studyrat-accessory="crown"]'), { after: 1100 });
    await d.poster('customize');

    // 4) Criar um novo desafio com amigos.
    d.step('create');
    await d.tap(page.locator('#studyrats-toggle-customize'), { after: 400 });
    await d.scrollTo('#studyrats-toggle-create', { duration: 800, offset: 220 });
    await d.tap(page.locator('#studyrats-toggle-create'), { after: 500 });
    await d.type(page.locator('#studyrats-challenge-title'), 'Maratona de Pediatria', { perChar: 55 });
    await d.wait(300);
    await d.tap(page.locator('#studyrats-friends label').filter({ hasText: 'Ana' }), { after: 250 });
    await d.tap(page.locator('#studyrats-friends label').filter({ hasText: 'Duda' }), { after: 400 });
    await d.tap(page.locator('#studyrats-start'), { after: 900 });
    await d.scrollTo('#studyrats-list', { duration: 900, offset: 12 });
    await d.wait(600);
    await page.evaluate(() => {
      const id = window.__marketing.state.challenges[0].id;
      window.__marketing.setStarted(id, 1.2);
      window.__marketing.setProgress(id, { owner: 38, Ana: 31, Duda: 22 });
      return sharedStudyratsLoad();
    });
    d.step('new-race');
    await d.wait(2600);
    await d.poster('new-race');
    d.step('outro');
    await d.wait(600);
  }
};
