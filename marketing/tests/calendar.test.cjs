'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { MARKETING, readJson } = require('../scripts/lib/common.cjs');
const { validate } = require('../calendar/validate.cjs');

test('Calendário editorial: validação estrutural e anti-duplicação', () => {
  const cal = readJson(path.join(MARKETING, 'calendar', 'calendar.json'));
  assert.ok(Array.isArray(cal.posts), 'posts deve ser um array');
  assert.ok(cal.posts.length >= 4, 'deve conter ao menos 4 postagens planejadas');

  const result = validate();
  assert.equal(result.ok, true, `validação falhou com erros: ${result.errors.join(', ')}`);
  assert.equal(result.errors.length, 0);
});

test('Calendário editorial: conteúdos clínicos possuem fontes científicas comprovadas', () => {
  const cal = readJson(path.join(MARKETING, 'calendar', 'calendar.json'));
  const clinicalPosts = cal.posts.filter(p => p.contentType === 'reel_clinical' || p.contentType === 'reel_question');

  for (const post of clinicalPosts) {
    assert.ok(Array.isArray(post.scientificSources), `${post.id} deve ter array de fontes`);
    assert.ok(post.scientificSources.length > 0, `${post.id} deve ter ao menos uma fonte científica`);
    for (const src of post.scientificSources) {
      assert.ok(src.length >= 20, `${post.id}: fonte "${src}" deve ser uma citação formal completa`);
    }
  }
});
