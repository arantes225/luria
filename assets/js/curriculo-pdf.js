/* Importação local de currículos em PDF para Aplicar / Currículo.
 * O original fica no IndexedDB deste dispositivo, por conta, sem upload para terceiros.
 * A extração de texto usa o PDF.js opcional já empregado pela LURIA.
 */
((root) => {
  'use strict';
  const MAX_BYTES = 10 * 1024 * 1024;
  const MAX_PAGES = 150;
  const DB_NAME = 'luria-curriculo-pdfs-v1';
  const STORE = 'curriculos';
  const categories = [
    { category: 'artigo', match: /artigos? completos? publicados?|producao bibliografica.*periodic|publicacoes? em periodicos?/ },
    { category: 'trabalho', match: /trabalhos? (completos?|resumos?) (publicados? )?em anais|apresentacao de trabalhos?|participacao em (?:congressos?|eventos?)|resumos? publicados?/ },
    { category: 'pesquisa', match: /iniciacao cientifica|projetos? de pesquisa/ },
    { category: 'extensao', match: /projetos? de extensao|atividades? de extensao/ },
    { category: 'monitoria', match: /monitorias? academicas?|atividade de monitoria/ },
    { category: 'curso', match: /formacao complementar|cursos? de curta duracao|cursos? complementares?|certificacoes?/ },
    { category: 'formacao', match: /formacao academica|titulacao|graduacao|mestrado|doutorado|especializacao/ },
    { category: 'outro', match: /premios? e titulos|representacao estudantil/ }
  ];
  const normalize = text => String(text || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();
  const yearRe = /(?:^|[^\d])((?:19|20)\d{2})(?=$|[^\d])/g;

  function parseLines(lines, makeId = () => root.crypto.randomUUID()) {
    if (!Array.isArray(lines)) return [];
    let category = null;
    const items = [];
    const seen = new Set();
    const thisYear = new Date().getFullYear();
    for (const line of lines.slice(0, 24000)) {
      const original = String(line || '').replace(/\s+/g, ' ').trim();
      if (!original) continue;
      const normalized = normalize(original);
      if (normalized.length < 5) continue;
      const heading = categories.find(group =>
        group.match.test(normalized)
        && (normalized.length < 95 || /^\d+\.?\s*formacao academica/.test(normalized)));
      if (heading) {
        category = heading.category;
        continue;
      }
      // Não apresentar parágrafos sem contexto como atividades ou gerar pontuações.
      if (!category || original.length < 16 || original.length > 850 ||
          /https?:\/\/|curriculo lattes|atualizacao do curriculo|pagina \d+ de \d+|endereco para acessar|telefone|e-mail/i.test(original)) continue;
      const years = [...original.matchAll(yearRe)].map(match => Number(match[1])).filter(year => year >= 1950 && year <= thisYear + 1);
      if (!years.length) continue;
      const year = years[years.length - 1];
      const title = original.replace(/^\s*\d{1,3}[.)]\s*/, '').replace(/\s+/g, ' ').trim().slice(0, 300);
      const key = [category, normalize(title), year].join('|');
      if (seen.has(key) || title.length < 16) continue;
      seen.add(key);
      items.push({
        id: makeId(), category, title, year: String(year),
        hours: '', evidence: '', reviewed: false, source: 'pdf'
      });
      if (items.length >= 500) break;
    }
    return items;
  }

  async function checkPdf(file) {
    if (!file || !/\.pdf$/i.test(file.name || '') && file.type !== 'application/pdf') {
      throw Error('Selecione um arquivo PDF de currículo.');
    }
    if (!file.size || file.size > MAX_BYTES) throw Error('Selecione um PDF de até 10 MB.');
    const header = new Uint8Array(await file.slice(0, 5).arrayBuffer());
    if (String.fromCharCode(...header) !== '%PDF-') throw Error('O arquivo enviado não é um PDF válido.');
  }

  function pageLines(textItems) {
    const rows = [];
    for (const item of textItems || []) {
      const text = String(item.str || '').trim();
      if (!text) continue;
      const x = Number(item.transform?.[4] || 0);
      const y = Number(item.transform?.[5] || 0);
      let row = rows.find(candidate => Math.abs(candidate.y - y) < 2.5);
      if (!row) { row = { y, items: [] }; rows.push(row); }
      row.items.push({ x, text });
    }
    return rows.sort((a, b) => b.y - a.y)
      .map(row => row.items.sort((a, b) => a.x - b.x).map(item => item.text).join(' ').trim())
      .filter(Boolean);
  }

  async function extract(file, progress = () => {}) {
    await checkPdf(file);
    if (!root.LuriaLazyVendors?.ensure) throw Error('Leitor de PDF indisponível. Recarregue a página.');
    await root.LuriaLazyVendors.ensure('pdfjs');
    if (!root.pdfjsLib?.getDocument) throw Error('A biblioteca de leitura de PDF não carregou.');
    root.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    const pdf = await root.pdfjsLib.getDocument({
      data: await file.arrayBuffer(), isEvalSupported: false,
    }).promise;
    try {
      if (pdf.numPages > MAX_PAGES) throw Error('O PDF possui mais de 150 páginas. Use uma versão reduzida.');
      const lines = [];
      let characters = 0;
      for (let number = 1; number <= pdf.numPages; number += 1) {
        progress(`Lendo currículo: página ${number} de ${pdf.numPages}…`);
        const page = await pdf.getPage(number);
        const content = await page.getTextContent();
        const pageRows = pageLines(content.items);
        characters += pageRows.join('').length;
        lines.push(...pageRows);
      }
      return { items: parseLines(lines), hasText: characters >= 40, pages: pdf.numPages };
    } finally { await pdf.destroy(); }
  }

  function database() {
    return new Promise((resolve, reject) => {
      if (!root.indexedDB) return reject(Error('Armazenamento local de PDFs indisponível.'));
      const request = root.indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = () => request.result.createObjectStore(STORE);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || Error('Não foi possível abrir o armazenamento.'));
    });
  }
  async function storePdf(owner, file) {
    await checkPdf(file);
    const db = await database();
    try {
      await new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, 'readwrite');
        tx.objectStore(STORE).put({ blob: file, name: file.name, updatedAt: new Date().toISOString() }, owner);
        tx.oncomplete = resolve;
        tx.onerror = () => reject(tx.error || Error('Falha ao salvar o PDF.'));
        tx.onabort = () => reject(tx.error || Error('Armazenamento cancelado.'));
      });
    } finally { db.close(); }
  }
  async function getPdf(owner) {
    const db = await database();
    try {
      return await new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, 'readonly');
        const request = tx.objectStore(STORE).get(owner);
        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject(request.error || Error('Não foi possível ler o PDF.'));
      });
    } finally { db.close(); }
  }
  async function removePdf(owner) {
    const db = await database();
    try {
      await new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, 'readwrite');
        tx.objectStore(STORE).delete(owner);
        tx.oncomplete = resolve;
        tx.onerror = () => reject(tx.error || Error('Não foi possível remover o PDF.'));
      });
    } finally { db.close(); }
  }
  const api = { MAX_BYTES, parseLines, checkPdf, extract, storePdf, getPdf, removePdf };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.LuriaCurriculoPdf = api;
})(globalThis);
