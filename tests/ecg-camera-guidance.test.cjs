const test = require('node:test');
const assert = require('node:assert/strict');
const layout = require('../assets/js/ecg-layout.js');
const guide = require('../assets/js/ecg-frame-guide.js');

function frame(rows, left = 60, right = 420) {
  const width = 480, height = 320;
  const data = new Uint8ClampedArray(width * height * 4).fill(255);
  for (const y of rows) for (let x = left; x < right; x++) {
    const index = (y * width + x) * 4;
    data[index] = data[index + 1] = data[index + 2] = 35;
  }
  return { data, width, height };
}

test('recognizes long and multicolumn arrangements without a fixed lead grid', () => {
  assert.equal(layout.detect(frame(Array.from({ length: 12 }, (_, i) => 45 + i * 20))).kind, 'stacked');
  assert.equal(layout.detect(frame([65, 150, 235])).kind, 'columns');
});

test('gives camera movement commands from the observed trace location', () => {
  assert.match(guide.locate(frame(Array.from({ length: 12 }, (_, i) => 45 + i * 10))).instruction, /^Suba/);
  assert.match(guide.locate(frame(Array.from({ length: 12 }, (_, i) => 155 + i * 10))).instruction, /^Desça/);
  assert.match(guide.locate(frame([160], 25, 170), 'detail').instruction, /^Mova para a esquerda/);
  assert.equal(guide.locate(frame([160]), 'detail').ready, true);
});

test('does not authorize automatic mapping with clipped stacked rows', () => {
  const result = guide.locate(frame(Array.from({ length: 10 }, (_, i) => 35 + i * 23)));
  assert.equal(result.ready, undefined);
  assert.match(result.instruction, /faixas.*fora do quadro/i);
});
