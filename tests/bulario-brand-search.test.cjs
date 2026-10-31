const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '../assets/js/bulario.js'), 'utf8');

function makeRow(id, name, data = {}) {
  return {
    id, name, active_ingredient: name,
    therapeutic_class: 'endocrinologia',
    pharmacological_class: 'medicamento',
    data: { status: 'pending_clinical_validation', formulations: [], diseases: [], ...data }
  };
}

async function mount(rows, query = '') {
  const listeners = {};
  const makeElement = key => ({
    value: '', textContent: '', innerHTML: '', scrollTop: 0, dataset: {},
    classList: { contains: () => false, add() {}, remove() {} },
    addEventListener(name, callback) { listeners[key + ':' + name] = callback; },
    querySelector: () => null,
    querySelectorAll: () => []
  });
  const elements = {
    'drug-search': makeElement('search'),
    'drug-list': makeElement('list'),
    'drug-detail': makeElement('detail'),
    'drug-count': makeElement('count')
  };
  const requests = [];
  const supabase = {
    from(table) {
      return {
        select() {
          return {
            order() {
              if (table === 'clinical_protocols') return Promise.resolve({ data: [] });
              assert.equal(table, 'bulario_catalog');
              return {
                range(from, to) {
                  requests.push([from, to]);
                  return Promise.resolve({ data: rows.slice(from, to + 1), error: null });
                }
              };
            }
          };
        }
      };
    }
  };
  const document = {
    getElementById: id => elements[id],
    querySelectorAll: () => [],
    body: { classList: { add() {}, remove() {}, contains: () => false } },
    documentElement: { classList: { contains: () => false } }
  };
  const location = {
    search: query ? '?q=' + encodeURIComponent(query) : '',
    href: 'https://example.test/trabalho/bulario/'
  };
  const window = {
    supabaseClient: supabase, LURIA_BULARIO_SEEDS: [], LURIA_PROTOCOL_SEEDS: [],
    addEventListener() {}, LuriaClinicalBridge: null
  };
  vm.runInNewContext(source, {
    document, window, location,
    history: { state: null, back() {}, pushState() {} },
    navigator: {},
    URLSearchParams,
    Intl,
    setTimeout,
    luriaSafeContentUrl: url => url
  }, { filename: 'assets/js/bulario.js' });
  await new Promise(resolve => setImmediate(resolve));
  return { elements, listeners, requests };
}

test('Busca por marca encontra item após a primeira página de mil e não habilita prescrição pendente', async () => {
  const rows = Array.from({ length: 1201 }, (_, i) => makeRow(i + 1, 'medicamento ' + i));
  rows[1109] = makeRow(1110, 'semaglutida', {
    status: 'source_reviewed',
    brand_catalog: [{ name: 'Wegovy' }, { name: 'Ozempic' }],
    commercial_names: ['Rybelsus'],
    products: [{ name: 'Ozempic 1 mg', type: 'referência', presentation: 'caneta' }]
  });
  const { elements, requests } = await mount(rows, 'Wegovy');
  assert.deepEqual(requests, [[0, 499], [500, 999], [1000, 1499]]);
  assert.match(elements['drug-list'].innerHTML, /semaglutida/);
  assert.match(elements['drug-list'].innerHTML, /Wegovy/);
  assert.match(elements['drug-detail'].innerHTML, /semaglutida/);
  assert.doesNotMatch(elements['drug-detail'].innerHTML, /id="rx-copy-prescription-btn"/);
  assert.equal(elements['drug-count'].textContent, '1 medicamento');
});

test('Busca comercial funciona em produtos, commercial_names, brand_catalog e ignora acentos', async () => {
  const rows = [
    makeRow(1, 'semaglutida', {
      brand_catalog: [{ name: 'Wegovy' }],
      commercial_names: ['Rybelsus'],
      products: [{ name: 'Ozempic 1 mg' }]
    }),
    makeRow(2, 'ácido fusídico', { commercial_names: ['Fusídex'] })
  ];
  const { elements, listeners } = await mount(rows);
  const search = elements['drug-search'];
  for (const term of ['Ozempic', 'Rybelsus', 'Wegovy', 'semaglutida']) {
    search.value = term;
    listeners['search:input']();
    assert.match(elements['drug-list'].innerHTML, /semaglutida/);
    assert.equal(elements['drug-count'].textContent, '1 medicamento');
  }
  search.value = 'fusidex';
  listeners['search:input']();
  assert.match(elements['drug-list'].innerHTML, /ácido fusídico/);
  assert.equal(elements['drug-count'].textContent, '1 medicamento');
});

test('Mostra o total do catálogo e limita o DOM inicial a 120 linhas', async () => {
  const rows = Array.from({ length: 1201 }, (_, i) => makeRow(i + 1, 'medicamento ' + i));
  const { elements } = await mount(rows);
  assert.match(elements['drug-count'].textContent, /1201 medicamentos/);
  assert.match(elements['drug-count'].textContent, /exibindo 120/);
  assert.equal((elements['drug-list'].innerHTML.match(/class="drug-row"/g) || []).length, 120);
});

test('Busca não transforma nomes comerciais em medicamentos duplicados', async () => {
  const rows = [makeRow(1, 'tirzepatida', {
    brand_catalog: [{ name: 'Mounjaro' }, { name: 'Mounjaro' }]
  })];
  const { elements, listeners } = await mount(rows);
  elements['drug-search'].value = 'mounjaro';
  listeners['search:input']();
  assert.equal((elements['drug-list'].innerHTML.match(/class="drug-row"/g) || []).length, 1);
  assert.match(elements['drug-detail'].innerHTML, /tirzepatida/);
});
