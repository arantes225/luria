const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');

const toolsSource = fs.readFileSync(path.join(__dirname, '../assets/js/apostila-tools.js'), 'utf8');
const start = toolsSource.indexOf('  const originalLinks=');
const end = toolsSource.indexOf('  const outline=document.querySelector(', start);
assert.ok(start !== -1 && end > start, 'A inicialização do sumário deve existir no script compartilhado.');
const initToc = toolsSource.slice(start, end);

function render(html) {
  const dom = new JSDOM(html, {
    url: 'https://example.org/apostilas/amenorreia/',
    runScripts: 'outside-only'
  });
  dom.window.eval(`(() => {
    const main = document.querySelector('.book-main');
    ${initToc}
  })();`);
  return dom;
}

test('Sumário é filho do primeiro bloco, sem card irmão extra', () => {
  const dom = render(`
    <nav class="book-outline-nav">
      <a class="book-outline-link" href="#intro">Introdução</a>
      <a class="book-outline-link" href="#diagnostico">Diagnóstico</a>
    </nav>
    <article class="book-main">
      <section class="book-hero">
        <h1>Amenorreia</h1><p>Texto introdutório</p><div class="book-meta-row"><span>GO</span></div>
      </section>
      <section id="intro" class="book-section"><h2>Introdução</h2></section>
      <section id="diagnostico" class="book-section"><h2>Diagnóstico</h2></section>
    </article>
  `);
  try {
    const { document } = dom.window;
    const main = document.querySelector('.book-main');
    const hero = main.firstElementChild;
    const toc = hero.querySelector(':scope > #sumario-apostila');
    assert.ok(toc);
    assert.equal(main.children.length, 3);
    assert.equal(toc.previousElementSibling.className, 'book-meta-row');
    assert.deepEqual([...toc.querySelectorAll('a')].map(a => a.getAttribute('href')), ['#intro', '#diagnostico']);
  } finally { dom.window.close(); }
});

test('Sumário reconhece âncoras absolutas legadas sem duplicações ou links externos', () => {
  const dom = render(`
    <nav class="book-outline-nav">
      <a class="book-outline-link" href="/apostilas/amenorreia/#intro">Introdução</a>
      <a class="book-outline-link" href="#intro">Introdução repetida</a>
      <a class="book-outline-link" href="https://example.org/apostilas/amenorreia/index.html#diagnostico">Diagnóstico</a>
      <a class="book-outline-link" href="https://other.org/apostilas/amenorreia/#outro">Externo</a>
      <a class="book-outline-link" href="#ausente">Inexistente</a>
    </nav>
    <article class="book-main">
      <section class="book-hero"><h1>Tema</h1></section>
      <section class="book-section" id="intro"></section>
      <section class="book-section" id="diagnostico"></section>
    </article>
  `);
  try {
    const links = [...dom.window.document.querySelectorAll('.book-hero .book-toc-link')];
    assert.deepEqual(links.map(a => [a.textContent, a.getAttribute('href')]),
      [['Introdução', '#intro'], ['Diagnóstico', '#diagnostico']]);
  } finally { dom.window.close(); }
});

test('Sem capa azul, o sumário permanece dentro do primeiro bloco de conteúdo', () => {
  const dom = render(`
    <nav class="book-outline-nav"><a class="book-outline-link" href="#capitulo">Capítulo</a></nav>
    <article class="book-main">
      <section class="book-section" id="capitulo"><h2>Capítulo</h2></section>
    </article>
  `);
  try {
    const first = dom.window.document.querySelector('.book-main > .book-section');
    assert.equal(first.firstElementChild.id, 'sumario-apostila');
    assert.equal(dom.window.document.querySelector('.book-main').children.length, 1);
  } finally { dom.window.close(); }
});

test('Sumário integrado mantém regras de contraste na capa e layout mobile', () => {
  assert.match(toolsSource, /\.book-hero>\.book-toc-block\{/);
  assert.match(toolsSource, /\.book-hero \.book-toc-link/);
  assert.match(toolsSource, /@media\(max-width:900px\)/);
  assert.match(toolsSource, /\.book-toc-nav\{grid-template-columns:1fr!important\}/);
});
