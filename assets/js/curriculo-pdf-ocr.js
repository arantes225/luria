/* OCR local de currículos Lattes sem camada de texto.
 * Usa PDF.js para renderização + Tesseract.js para leitura no dispositivo.
 * Não envia o PDF/imagens a servidores; apenas os recursos do motor OCR são baixados.
 */
((root) => {
  'use strict';
  const MAX_OCR_PAGES = 40;
  const MAX_IMAGE_PIXELS = 3200000;
  const fold = value => String(value || '').normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();
  const yearPattern = /(?:^|[^\d])((?:19|20)\d{2})(?=$|[^\d])/g;
  const headings = [
    ['artigo', /^artigos? completos? publicados? em periodicos/],
    ['trabalho', /^apresentac(?:ao|oes) de trabalhos?/],
    ['trabalho', /^trabalhos? (?:completos? |resumos? )?(?:publicados? )?em anais/],
    ['pesquisa', /^projetos? de pesquisa/],
    ['extensao', /^projetos? de extensao/],
    ['curso', /^formacao complementar/],
    ['curso', /^cursos? de curta duracao/],
    ['formacao', /^formacao academica(?:\/titulacao)?/],
    ['formacao', /^titulacao academica/],
    ['outro', /^livros? publicados?(?:\/organizados?)?/],
    ['outro', /^capitulos? de livros? publicados?/],
    ['outro', /^organizacao de eventos?/],
    ['outro', /^participacao em eventos?/],
    ['outro', /^premios? e titulos/]
  ];
  const resetHeading = /^(?:identificacao|endereco|atuacao profissional|areas de atuacao|idiomas|producoes|producao bibliografica|eventos|inovacao|dados pessoais|orientacoes|bancas|outras informacoes|outras producoes)\b/;
  const junkLine = /(?:^pagina gerada pelo sistema|^somente os dados identificados|^configuracao de privacidade|^endereco para acessar|^id lattes|^curriculo lattes)/;

  function parseOcrText(pages, makeId = () => root.crypto.randomUUID()) {
    if (!Array.isArray(pages)) return [];
    const items = [];
    const seen = new Set();
    const currentYear = new Date().getFullYear();
    let section = null, buffer = [], firstPage = 1;
    function finish() {
      if (!section || !buffer.length) {buffer = []; return;}
      const joined = buffer.join(' ')
        .replace(/(\p{L})-\s+(\p{L})/gu, '$1$2')
        .replace(/\s+/g, ' ').trim();
      buffer = [];
      if (joined.length < 25 || joined.length > 1400) return;
      if (junkLine.test(fold(joined)) || /https?:\/\/|telefone:|endereco profissional/i.test(joined)) return;
      yearPattern.lastIndex = 0;
      const years = [...joined.matchAll(yearPattern)].map(hit => Number(hit[1]))
        .filter(year => year >= 1950 && year <= currentYear + 1);
      if (!years.length) return;
      const year = years[years.length - 1];
      let title = joined.replace(/^\s*\d{1,3}[.)]\s*/, '').trim();
      if (['artigo', 'trabalho'].includes(section)) {
        const citationTitle = title.match(/\s\.\s+([^]{25,650})$/);
        if (citationTitle && /(?:19|20)\d{2}/.test(citationTitle[1])) title = citationTitle[1];
      }
      title = title.slice(0, 300).trim();
      if (title.length < 20) return;
      const key = [section, fold(title), year].join('|');
      if (seen.has(key)) return;
      seen.add(key);
      items.push({
        id: makeId(), category: section, title, year: String(year),
        hours: '', evidence: '', reviewed: false, source: 'pdf-ocr', sourcePage: firstPage
      });
    }

    for (const page of pages) {
      const pageNumber = Number(page?.page) || 1;
      const lines = String(page?.text || '').replace(/\r/g, '').split('\n');
      for (const raw of lines) {
        const line = String(raw || '').replace(/[\u00a0\t]+/g, ' ').trim();
        if (!line) {
          // OCR tende a separar registros Lattes por linhas em branco.
          if (buffer.join(' ').length >= 25 && /(?:19|20)\d{2}/.test(buffer.join(' '))) finish();
          continue;
        }
        const normal = fold(line.replace(/^\s*\d{1,3}[.)]\s*/, ''));
        if (junkLine.test(normal)) { finish(); continue; }
        const categoryHeading = normal.length < 100 && headings.find(([_, regex]) => regex.test(normal));
        if (categoryHeading) { finish(); section = categoryHeading[0]; continue; }
        if (normal.length < 90 && resetHeading.test(normal)) { finish(); section = null; continue; }
        if (!section || line.length < 2) continue;
        if (/^\d{1,3}[.)]\s*$/.test(line)) { finish(); continue; }
        if (/^\d{1,3}[.)]\s+[A-ZÁÉÍÓÚÂÊÔÃÕÇ]/.test(line)) finish();
        const isNewDatedItem = /^(?:19|20)\d{2}(?:\s*[-–—]\s*(?:(?:19|20)\d{2}|atual))?\b/i.test(line);
        if (isNewDatedItem && buffer.join(' ').length >= 25 && /(?:19|20)\d{2}/.test(buffer.join(' '))) finish();
        if (!buffer.length) firstPage = pageNumber;
        buffer.push(line);
        if (buffer.join(' ').length > 1300) finish();
      }
      // Páginas podem começar no meio de uma referência; não perder o contexto.
      if (buffer.join(' ').length >= 25 && /(?:19|20)\d{2}/.test(buffer.join(' '))) finish();
      if (items.length >= 500) break;
    }
    finish();
    return items.slice(0, 500);
  }

  async function recognizePdf(pdf, progress = () => {}) {
    if (!root.LuriaLazyVendors?.ensure) throw Error('Leitor OCR indisponível. Atualize a página.');
    progress('O PDF não possui texto selecionável. Preparando leitura visual (OCR) no dispositivo…');
    await root.LuriaLazyVendors.ensure('tesseract');
    if (typeof root.Tesseract?.createWorker !== 'function') {
      throw Error('Não foi possível iniciar o reconhecimento visual. Confira a conexão e tente novamente.');
    }
    const count = Math.min(pdf.numPages, MAX_OCR_PAGES);
    let worker = null;
    const pages = [];
    let activePage = 0;
    try {
      worker = await root.Tesseract.createWorker('por', 1, {
        logger: event => {
          if (event?.status !== 'recognizing text' || !activePage) return;
          const pct = Math.round(100 * Math.max(0, Math.min(1, Number(event.progress) || 0)));
          if (pct % 20 === 0) progress('Reconhecendo Lattes: página ' + activePage + ' de ' + count + ' (' + pct + '%)…');
        }
      });
      for (let n = 1; n <= count; n++) {
        activePage = n;
        progress('Reconhecendo currículo por imagem: página ' + n + ' de ' + count + '…');
        const page = await pdf.getPage(n);
        const initial = page.getViewport({scale: 1});
        const scale = Math.min(2.35, Math.sqrt(MAX_IMAGE_PIXELS / (initial.width * initial.height)));
        const viewport = page.getViewport({scale});
        const canvas = root.document.createElement('canvas');
        canvas.width = Math.ceil(viewport.width);
        canvas.height = Math.ceil(viewport.height);
        try {
          const ctx = canvas.getContext('2d', {willReadFrequently: true});
          if (!ctx) throw Error('Seu navegador não conseguiu criar a imagem para leitura do PDF.');
          await page.render({canvasContext: ctx, viewport, background: '#ffffff'}).promise;
          const result = await worker.recognize(canvas);
          pages.push({page: n, text: String(result?.data?.text || '')});
        } finally {
          canvas.width = 0;
          canvas.height = 0;
          page.cleanup?.();
        }
      }
    } finally {
      if (worker) {
        try { await worker.terminate(); } catch { /* preservar o erro original, se houver */ }
      }
    }
    const items = parseOcrText(pages);
    return {
      items,
      hasText: pages.some(page => page.text.trim().length >= 40),
      pagesOcr: pages.length,
      ocrUsed: true,
      partial: pdf.numPages > MAX_OCR_PAGES
    };
  }
  const api = {MAX_OCR_PAGES, parseOcrText, recognizePdf};
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.LuriaCurriculoPdfOcr = api;
})(globalThis);
