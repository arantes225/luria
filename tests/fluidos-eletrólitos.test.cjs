const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const source = fs.readFileSync('assets/js/fluidos-eletrólitos.js', 'utf8');
const context = { window: {}, document: { querySelector: () => null, querySelectorAll: () => [] } };
vm.runInNewContext(source, context, { filename: 'fluidos-eletrólitos.js' });
const calc = context.window.LURIA_FLUIDS.calc;

test('fluid calculators return deterministic values', () => {
  assert.equal(calc.maintenance(25), 65);
  assert.equal(calc.osmolality(140, 180, 14), 295);
  assert.equal(calc.anionGap(140, 104, 24), 12);
  assert.equal(Number(calc.correctedNa(130, 300).toFixed(1)), 134.8);
  assert.equal(Number(calc.waterDeficit(70, 160, 140, 0.5).toFixed(2)), 5);
  assert.equal(Number(calc.fena(20, 140, 100, 1).toFixed(2)), 0.14);
});

test('fluid calculators do not silently coerce invalid values', () => {
  assert.ok(Number.isNaN(calc.osmolality(undefined, 180, 14)));
  assert.ok(Number.isNaN(calc.fena(20, 0, 100, 1)));
});
