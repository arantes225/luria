'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { resolveMode } = require('../scripts/build-cloudflare-pages.cjs');

test('main stays on a placeholder unless release is explicitly approved', () => {
  assert.equal(resolveMode({ CF_PAGES_BRANCH: 'main' }), 'hold');
  assert.equal(resolveMode({ CF_PAGES_BRANCH: 'main', LURIA_RELEASE_APPROVED: 'no' }), 'hold');
  assert.equal(resolveMode({ CF_PAGES_BRANCH: 'main', LURIA_RELEASE_APPROVED: 'yes' }), 'production');
});

test('pull requests and non-main branches produce preview assets only', () => {
  assert.equal(resolveMode({ CF_PAGES_BRANCH: 'preview/revisao' }), 'preview');
  assert.equal(resolveMode({ CF_PAGES_BRANCH: 'feat/ajustes' }), 'preview');
  assert.equal(resolveMode({ CF_PAGES_BRANCH: 'develop', LURIA_RELEASE_APPROVED: 'yes' }), 'preview');
});

test('missing branch fails closed; local opt-in previews are possible', () => {
  assert.equal(resolveMode({}), 'hold');
  assert.equal(resolveMode({ LURIA_LOCAL_PREVIEW: 'yes' }), 'preview');
  assert.equal(resolveMode({ LURIA_LOCAL_PREVIEW: 'yes', CF_PAGES_BRANCH: 'main' }), 'hold');
});
