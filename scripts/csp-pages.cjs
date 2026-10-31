// Same tracked publication inventory as the Pages build; exceptions remain reviewed below.
module.exports = require('./public-files.cjs').publicFiles().filter(file => file.endsWith('.html'));

// Per-page exceptions for reviewed external loaders; never allow an entire CDN.
const pdfScripts = [
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
];
module.exports.resources = Object.fromEntries(
  ['cronograma.html', 'cronograma/index.html'].map(page => [page, {scriptSrc: pdfScripts}])
);
const jsPdf = 'https://cdn.jsdelivr.net/npm/jspdf@4.2.1/dist/jspdf.umd.min.js';
// Currículo PDF também usa OCR quando o Lattes foi impresso sem camada de texto.
// These are the existing Tesseract 5 loader's 5.1.1 runtime paths, including
// SIMD/non-SIMD and LSTM/legacy variants chosen according to browser support.
const ocrCore = ['tesseract-core', 'tesseract-core-simd', 'tesseract-core-lstm', 'tesseract-core-simd-lstm']
  .map(name => 'https://cdn.jsdelivr.net/npm/tesseract.js-core@v5.1.1/' + name);
const ocrScripts = [
  'https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js',
  'https://cdn.jsdelivr.net/npm/tesseract.js@v5.1.1/dist/worker.min.js',
  ...ocrCore.map(name => name + '.wasm.js')
];
const ocrConnect = [
  ...ocrCore.map(name => name + '.wasm'),
  ...['eng', 'por'].flatMap(language => ['4.0.0', '4.0.0_best_int'].map(model =>
    'https://cdn.jsdelivr.net/npm/@tesseract.js-data/' + language + '/' + model + '/' + language + '.traineddata.gz'))
];
module.exports.resources['aplicar/curriculo/index.html'] = {scriptSrc: [...pdfScripts, ...ocrScripts, jsPdf], connectSrc: ocrConnect, wasm: true};
for (const page of ['caderno-erros.html', 'caderno-erros/index.html']) {
  module.exports.resources[page] = {scriptSrc: [...ocrScripts, jsPdf], connectSrc: ocrConnect, wasm: true};
}
// OCR local na Cola Rápida (câmera e galeria); sem upload da imagem.
module.exports.resources['trabalho/prontuario-rapido/index.html'] = {scriptSrc: ocrScripts, connectSrc: ocrConnect, wasm: true};
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
// PDF gerado localmente na página Diabetes: somente o jsPDF versionado e auditado.
module.exports.resources['trabalho/diabetes/index.html'] = {scriptSrc: [jsPdf]};
for (const page of ['trabalho/pcr/executar/index.html', 'trabalho/pcr/historico/index.html']) {
  // Same reviewed jsPDF version as the lazy loader and other PDF consumers.
  module.exports.resources[page] = {scriptSrc: ['https://cdn.jsdelivr.net/npm/jspdf@4.2.1/dist/jspdf.umd.min.js']};
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
for (const page of ['404.html', 'estudar/index.html', 'plantao/index.html', 'aplicar/editais/index.html', 'aplicar/vocacao/index.html', 'demo-avc.html', 'gestante-animada-v1.html', 'plantao/personagens-traube.html']) {
  module.exports.resources[page] = {noBackend: true};
}
// Retain the external portal's original prohibition on forms and WebSocket.
module.exports.resources['trabalho/prontuario/index.html'] = {formAction: "'none'", websocket: false};
for (const page of ['apostilas/curadoria-imagens/index.html', 'apostilas/curadoria-imagens-v2/index.html']) {
  // Static editorial viewers fetch their own JSON; they do not use Supabase.
  module.exports.resources[page] = {localConnect: true};
}
