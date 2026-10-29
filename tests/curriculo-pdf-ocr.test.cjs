const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const ocr = require('../assets/js/curriculo-pdf-ocr.js');
const pdf = require('../assets/js/curriculo-pdf.js');

function makeId() { let n = 0; return () => String(++n); }
function mockFile() {
  const bytes = Uint8Array.from([37, 80, 68, 70, 45, 49, 46, 55]);
  return {
    name: 'curriculo-exportado.pdf', type: 'application/pdf', size: bytes.byteLength,
    slice: () => ({arrayBuffer: async () => bytes.slice(0, 5).buffer}),
    arrayBuffer: async () => bytes.buffer.slice(0)
  };
}
function pdfPage(textItems = []) {
  return {
    getTextContent: async () => ({items: textItems}),
    getViewport: ({scale}) => ({width: 612 * scale, height: 792 * scale}),
    render: () => ({promise: Promise.resolve()}),
    cleanup: () => {}
  };
}
async function withGlobals(fake, task) {
  const keys = Object.keys(fake);
  const previous = new Map(keys.map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
  for (const [k, v] of Object.entries(fake)) Object.defineProperty(globalThis, k, {configurable: true, writable: true, value: v});
  try { return await task(); }
  finally {
    for (const key of keys) {
      const descriptor = previous.get(key);
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else delete globalThis[key];
    }
  }
}
test('OCR agrupa referências Lattes quebradas em linhas e preserva títulos, categoria e ano', () => {
  const items = ocr.parseOcrText([
    {page: 1, text: 'Produções\nArtigos completos publicados em periódicos\n\n1.\nSILVA, MARIA ; PEREIRA, ANA . Estudo clínico em emergência. Revista Brasileira, v. 2, 2025.\n\n2.\nROCHA, JOÃO . Epidemiologia na atenção primária. Jornal Médico, 2024.\n'},
    {page: 2, text: 'Livros publicados/organizados ou edições\n\n1.\nAUTOR, TESTE . Manual de pesquisa acadêmica. Editora Exemplo, 2023.\n\nCapítulos de livros publicados\n\n1.\nAUTOR, TESTE . Semiologia cardiovascular. Guia Prático, 2022.\n'}
  ], makeId());
  assert.equal(items.length, 4);
  assert.deepEqual(items.map(x => x.category), ['artigo', 'artigo', 'outro', 'outro']);
  assert.deepEqual(items.map(x => x.year), ['2025', '2024', '2023', '2022']);
  assert.match(items[0].title, /^Estudo clínico em emergência/);
  assert.deepEqual(items.map(x=>x.sourcePage), [1, 1, 2, 2]);
  assert.ok(items.every(x=>x.source === 'pdf-ocr' && x.reviewed === false));
});

test('OCR reconhece cursos Lattes com ano em uma linha e título nas próximas', () => {
  const items = ocr.parseOcrText([{
    page: 3, text: 'Formação Complementar\n2023 - 2023\nCurso introdutório em Medicina de Emergência (Carga horária: 20h).\n\n2022 - 2022\nCapacitação básica em ECG (Carga horária: 12h).\n\nAtuação Profissional\n2024 - Atual\nVínculo institucional'
  }], makeId());
  assert.equal(items.length, 2);
  assert.deepEqual(items.map(x=>x.year), ['2023', '2022']);
  assert.ok(items.every(x=>x.category === 'curso'));
});

test('PDF sem camada de texto ativa OCR; PDF normal continua no caminho textual', async () => {
  let called = 0, destroyed = 0;
  const resultOcr = {items:[{category:'curso',title:'Curso de ECG',year:'2023',source:'pdf-ocr'}],hasText:true,pagesOcr:2,ocrUsed:true};
  const document = {numPages:2,getPage:async()=>pdfPage([]),destroy:async()=>{destroyed++;}};
  await withGlobals({
    LuriaLazyVendors:{ensure:async()=>{}},
    pdfjsLib:{GlobalWorkerOptions:{},getDocument:()=>({promise:Promise.resolve(document)})},
    LuriaCurriculoPdfOcr:{recognizePdf:async()=>{called++;return resultOcr;}}
  }, async()=>{
    const extracted = await pdf.extract(mockFile());
    assert.equal(called, 1);
    assert.equal(destroyed, 1);
    assert.equal(extracted.ocrUsed, true);
    assert.equal(extracted.pages, 2);
    assert.equal(extracted.items.length, 1);
  });
  await withGlobals({
    LuriaLazyVendors:{ensure:async()=>{}},
    pdfjsLib:{GlobalWorkerOptions:{},getDocument:()=>({promise:Promise.resolve({
      numPages:1,getPage:async()=>pdfPage([{str:'Formação complementar',transform:[1,0,0,1,0,100]},{str:'Curso de ECG com certificação, 2023.',transform:[1,0,0,1,0,90]}]),
      destroy:async()=>{}
    })})},
    LuriaCurriculoPdfOcr:{recognizePdf:async()=>{called++;}}
  }, async()=>{
    const extracted = await pdf.extract(mockFile());
    assert.equal(called, 1, 'PDF textual não deve acionar OCR');
    assert.equal(extracted.ocrUsed, false);
    assert.equal(extracted.items.length, 1);
  });
});

test('Reconhecimento visual renderiza uma página por vez, atualiza progresso e encerra worker', async()=>{
  let called = 0, terminated = 0, models = [];
  const progress = [];
  const fakePdf={numPages:2,getPage:async()=>pdfPage([])};
  const fakeCanvas={width:0,height:0,getContext:()=>({})};
  await withGlobals({
    LuriaLazyVendors:{ensure:async(name)=>{assert.equal(name,'tesseract');}},
    Tesseract:{createWorker:async(language,model)=>{
      models.push([language,model]);
      return {
        recognize:async()=>({data:{text:called++===0
          ? 'Formação complementar\n\n2023 - 2023\nCurso de interpretação de ECG em plantão.\n'
          : 'Artigos completos publicados em periódicos\n\n1.\nSILVA, P. . Perfil epidemiológico na atenção básica. Revista Exemplo, 2025.'}}),
        terminate:async()=>{terminated++;}
      };
    }},
    document:{createElement:tag=>{assert.equal(tag,'canvas');return {...fakeCanvas};}}
  },async()=>{
    const result=await ocr.recognizePdf(fakePdf, message=>progress.push(message));
    assert.equal(result.ocrUsed, true);
    assert.equal(result.partial, false);
    assert.equal(result.pagesOcr,2);
    assert.equal(result.items.length,2);
    assert.equal(result.items[0].source, 'pdf-ocr');
    assert.ok(progress.some(text=>/página 2 de 2/.test(text)));
    assert.deepEqual(models,[['por',1]]);
  });
  assert.equal(terminated,1);
});

test('Segurança de OCR: limite para PDFs longos e sem adicionar pontuação automática', () => {
  assert.equal(ocr.MAX_OCR_PAGES, 40);
  const code=read('assets/js/curriculo.js');
  assert.match(code, /check\.checked = item\.source !== 'pdf-ocr'/);
  assert.match(code, /Nenhuma atividade importada é marcada como conferida/);
  assert.match(code, /revise/i);
  const pdfCode=read('assets/js/curriculo-pdf.js');
  assert.match(pdfCode, /characters < 40 && root\.LuriaCurriculoPdfOcr/);
});

test('Importação permite scripts/worker/modelo OCR sem liberar origens genéricas', () => {
  const html=read('aplicar/curriculo/index.html');
  const policy=html.match(/http-equiv="Content-Security-Policy" content="([^"]+)"/)?.[1]||'';
  const csp=read('scripts/csp-pages.cjs');
  assert.match(html,/curriculo-pdf-ocr\.js\?v=20261028-cvocr1/);
  assert.match(policy,/tesseract\.js@5\.1\.1\/dist\/tesseract\.min\.js/);
  assert.match(policy,/tesseract\.js-core@v5\.1\.1\/tesseract-core-simd\.wasm/);
  assert.match(policy,/por\.traineddata\.gz/);
  assert.match(policy,/'wasm-unsafe-eval'/);
  assert.match(csp,/module\.exports\.resources\['aplicar\/curriculo\/index\.html'\] = \{scriptSrc: \[\.\.\.pdfScripts, \.\.\.ocrScripts, jsPdf\], connectSrc: ocrConnect, wasm: true\}/);
  assert.doesNotMatch(policy,/https:\s*\/\//);
});
