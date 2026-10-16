// Reviewed batches only: check each page's loaders before extending this list.
module.exports = [
  // New game pages: same-origin external scripts only.
  'jogos/plantao-relampago/index.html',
  'jogos/sequencia-salvadora/index.html',
  'jogos/escapando-do-plantao/index.html',
  // Batch A
  'index.html',
  'login.html', 'login/index.html',
  'dashboard.html', 'dashboard/index.html',
  'amigos.html', 'amigos/index.html',
  'admin.html', 'admin/index.html',
  'trabalho/index.html',
  'trabalho/prontuario-rapido/index.html',
  'trabalho/calculadora/index.html',
  'trabalho/scores/index.html',
  // Batch B: local scripts, no inline event attributes or special loaders.
  'aprender/index.html',
  'aplicar/index.html', 'aplicar/curriculo/index.html',
  'consolidar/index.html',
  'editais.html', 'editais/index.html',
  'beta-testers/index.html',
  'trabalho/divisor-plantao/index.html',
  'trabalho/financeiro/index.html',
  'trabalho/fluidos-eletrólitos/index.html',
  'trabalho/gestor-plantoes/index.html',
  'trabalho/laboratorio/index.html',
  'trabalho/diagnostico/index.html',
  'trabalho/ecg/index.html',
  'trabalho/exames/index.html',
  'trabalho/receitas/index.html',
  'trabalho/bulario/index.html',
  // Batch C1: calendar + its existing PDF reader.
  'cronograma.html', 'cronograma/index.html',
  // Batch C2: error notebook, questions and related local-only pages.
  'caderno-erros.html', 'caderno-erros/index.html', 'caderno-erros/revisao/index.html',
  'questoes-simulados.html', 'questoes-simulados/index.html',
  'registrar-questoes.html', 'registrar-questoes/index.html',
  'resolver-questoes/index.html',
  // Batch C3: existing Anki/SQLite-WASM/ZIP and PDF export dependencies.
  'flashcards.html', 'flashcards/index.html',
  // Batch C4: native/Notion notebook and its existing export libraries.
  'caderno.html', 'caderno/index.html',
  // Batch D2: handover sheets and their existing PDF bundle.
  'trabalho/passometro/index.html',
  // Batch D3: PCR entry, execution and owner-scoped history.
  'trabalho/pcr/index.html', 'trabalho/pcr/executar/index.html', 'trabalho/pcr/historico/index.html',
  // Batch D4: apostila family, shared renderer/tools and image fallbacks.
  "apostilas/alteracoes-fisiologicas-da-gestacao/index.html",
  "apostilas/amenorreia/index.html",
  "apostilas/amniorrexe-prematura/index.html",
  "apostilas/assistencia-ao-parto/index.html",
  "apostilas/avaliacao-vitalidade-fetal/index.html",
  "apostilas/cancer-colo-utero-hpv/index.html",
  "apostilas/cancer-de-mama/index.html",
  "apostilas/cervicites-doenca-inflamatoria-pelvica/index.html",
  "apostilas/ciclo-menstrual-eixo-hho/index.html",
  "apostilas/climaterio-menopausa/index.html",
  "apostilas/crescimento-intrauterino-reduzido-aumentado/index.html",
  "apostilas/diabetes-mellitus-gestacional/index.html",
  "apostilas/hemorragias-primeiro-terceiro-trimestre/index.html",
  "apostilas/inducao-do-trabalho-de-parto/index.html",
  "apostilas/infeccoes-gestacao-transmissao-vertical/index.html",
  "apostilas/infeccoes-sexualmente-transmissiveis/index.html",
  "apostilas/infertilidade-conjugal/index.html",
  "apostilas/planejamento-reprodutivo-contracepcao/index.html",
  "apostilas/pre-natal-baixo-risco/index.html",
  "apostilas/sangramento-uterino-anormal/index.html",
  "apostilas/sexualidade/index.html",
  "apostilas/sindrome-ovariana-metabolica-poliendocrina-somp/index.html",
  "apostilas/sindromes-hipertensivas-da-gestacao/index.html",
  "apostilas/trabalho-parto-prematuro/index.html",
  "apostilas/vulvovaginites/index.html",
  "apostilas/index.html",
  // Batch E: all remaining HTML, including redirects and external access.
  "404.html",
  "ambientacao.html",
  "configuracoes.html",
  "configuracoes/cronograma/index.html",
  "configuracoes/flashcards/index.html",
  "configuracoes/index.html",
  "desafio-diario.html",
  "desafio-diario/index.html",
  "estatisticas.html",
  "estatisticas/index.html",
  "estudar/index.html",
  "mini-osce/index.html",
  "plantao.html",
  "plantao/index.html",
  "plantao/luriazap/index.html",
  "plantao/sala-emergencia/index.html",
  "professor-alex/index.html",
  "qf-r8K2mV7qL4x9P1cF/index.html",
  "sessao-estudo/index.html",
  "trabalho/antimicrobianos/index.html",
  "trabalho/plantoes/index.html",
  "trabalho/prescricao/index.html",
  "trabalho/prontuario/index.html",
  "trabalho/protocolos/index.html"
];

// Per-page exceptions for reviewed external loaders; never allow an entire CDN.
const pdfScripts = [
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
];
module.exports.resources = Object.fromEntries(
  ['cronograma.html', 'cronograma/index.html'].map(page => [page, {scriptSrc: pdfScripts}])
);
const jsPdf = 'https://cdn.jsdelivr.net/npm/jspdf@2.5.2/dist/jspdf.umd.min.js';
// These are the existing Tesseract 5 loader's 5.1.1 runtime paths, including
// SIMD/non-SIMD and LSTM/legacy variants chosen according to browser support.
const ocrCore = ['tesseract-core', 'tesseract-core-simd', 'tesseract-core-lstm', 'tesseract-core-simd-lstm']
  .map(name => 'https://cdn.jsdelivr.net/npm/tesseract.js-core@v5.1.1/' + name);
const ocrScripts = [
  'https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js',
  'https://cdn.jsdelivr.net/npm/tesseract.js@v5.1.1/dist/worker.min.js',
  ...ocrCore.map(name => name + '.wasm.js')
];
const ocrConnect = [
  ...ocrCore.map(name => name + '.wasm'),
  ...['eng', 'por'].flatMap(language => ['4.0.0', '4.0.0_best_int'].map(model =>
    'https://cdn.jsdelivr.net/npm/@tesseract.js-data/' + language + '/' + model + '/' + language + '.traineddata.gz'))
];
for (const page of ['caderno-erros.html', 'caderno-erros/index.html']) {
  module.exports.resources[page] = {scriptSrc: [...ocrScripts, jsPdf], connectSrc: ocrConnect, wasm: true};
}
for (const page of ['questoes-simulados.html', 'questoes-simulados/index.html']) {
  module.exports.resources[page] = {scriptSrc: [...pdfScripts, ...ocrScripts], connectSrc: ocrConnect, wasm: true};
}
for (const page of ['flashcards.html', 'flashcards/index.html']) {
  module.exports.resources[page] = {
    scriptSrc: [
      'https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js',
      'https://cdn.jsdelivr.net/npm/sql.js@1.11.0/dist/sql-wasm.js',
      'https://cdn.jsdelivr.net/npm/fzstd@0.1.1/umd/index.js', jsPdf
    ],
    connectSrc: ['https://cdn.jsdelivr.net/npm/sql.js@1.11.0/dist/sql-wasm.wasm'],
    wasm: true
  };
}
for (const page of ['caderno.html', 'caderno/index.html']) {
  module.exports.resources[page] = {scriptSrc: [
    'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js', jsPdf,
    'https://cdnjs.cloudflare.com/ajax/libs/diff_match_patch/20121119/diff_match_patch.js'
  ]};
}
module.exports.resources['trabalho/passometro/index.html'] = {scriptSrc: [
  'https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js'
]};
for (const page of ['trabalho/pcr/executar/index.html', 'trabalho/pcr/historico/index.html']) {
  // Preserve the existing loader; pinning its version is a separate dependency change.
  module.exports.resources[page] = {scriptSrc: ['https://cdn.jsdelivr.net/npm/jspdf/dist/jspdf.umd.min.js']};
}

module.exports.resources['configuracoes/cronograma/index.html'] = {scriptSrc: pdfScripts};
module.exports.resources['configuracoes/flashcards/index.html'] = {
  scriptSrc: module.exports.resources['flashcards/index.html'].scriptSrc.filter(src=>src!==jsPdf),
  connectSrc: module.exports.resources['flashcards/index.html'].connectSrc,
  wasm: true
};
for (const page of ['estatisticas.html', 'estatisticas/index.html']) {
  module.exports.resources[page] = {scriptSrc: ['https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js']};
}
for (const page of ['404.html', 'estudar/index.html', 'plantao/index.html']) {
  module.exports.resources[page] = {noBackend: true};
}
// Retain the external portal's original prohibition on forms and WebSocket.
module.exports.resources['trabalho/prontuario/index.html'] = {formAction: "'none'", websocket: false};
