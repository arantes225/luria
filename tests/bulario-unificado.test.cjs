'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const load = p => fs.readFileSync(path.join(root, p), 'utf8');

test('bulário percorre todas as páginas acima do limite de 1000', async () => {
  const source = load('assets/js/bulario.js');
  const start = source.indexOf('  async function loadAll(');
  const end = source.indexOf('\n  (async()=>', start);
  assert.ok(start >= 0 && end > start, 'função de paginação deve existir');
  const code = source.slice(start, end).trim();
  const records = Array.from({length: 4546}, (_,i) => ({id:i+1, name:'Medicamento '+i}));
  const calls = [];
  const client = {
    from(table) {
      assert.equal(table, 'bulario_catalog');
      return {
        select() {return this;},
        order() {return this;},
        async range(start,end) {
          calls.push([start,end]);
          return {data: records.slice(start,end+1), error:null};
        }
      };
    }
  };
  const fn = vm.runInNewContext('('+code+')', {window:{supabaseClient:client}});
  const rendered=[];
  const found = await fn('bulario_catalog','id,name','id',page=>rendered.push(page.length));
  assert.equal(found.length,4546);
  assert.equal(rendered.length,19);
  assert.equal(rendered[0],250);
  assert.equal(rendered.at(-1),46);
  assert.equal(found[4545].id,4546);
  assert.equal(calls.length,19);
  assert.deepEqual(calls[0],[0,249]);
  assert.deepEqual(calls[18],[4500,4749]);
});

test('nenhuma página do Bulário usa a fonte local como catálogo paralelo', () => {
  const pages = ['trabalho/bulario/index.html','trabalho/antimicrobianos/index.html'];
  for(const page of pages) {
    const html = load(page);
    assert.ok(!html.includes('/assets/js/bulario-seeds.js'), page);
    assert.ok(!html.includes('/assets/js/antimicrobianos-seeds-bridge.js'), page);
  }
  const bul = load('assets/js/bulario.js');
  const antimicrob = load('assets/js/work-antimicrobianos.js');
  const protocolos = load('assets/js/trabalho-protocolos.js');
  assert.ok(!bul.includes('TRAUBE_BULARIO_SEEDS'));
  assert.ok(!bul.includes('.limit(1000)'));
  assert.ok(!antimicrob.includes('.limit(1000)'));
  assert.ok(!protocolos.includes('TRAUBE_BULARIO_SEEDS'));
  assert.match(protocolos,/from\('bulario_catalog'\)/);
});
