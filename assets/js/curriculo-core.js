/* Pure helpers shared by the curriculum UI and regression tests. */
((root) => {
  'use strict';
  const categories = { artigo: 'Artigo científico', trabalho: 'Trabalho em evento', curso: 'Curso e certificação', monitoria: 'Monitoria', pesquisa: 'Iniciação científica', extensao: 'Extensão', formacao: 'Formação', outro: 'Outra atividade' };
  const identity = item => [item.category, item.title, item.year].map(v => String(v || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase().replace(/\s+/g, ' ')).join('|');
  function merge(existing, incoming) {
    const seen = new Set(existing.map(identity));
    return [...existing, ...incoming.filter(item => { const key = identity(item); if (seen.has(key)) return false; seen.add(key); return true; })];
  }
  function parseLattes(xml, Parser) {
    if (xml.length > 10 * 1024 * 1024 || /<!DOCTYPE|<!ENTITY/i.test(xml)) throw Error('XML inválido ou grande demais. Use um arquivo de até 10 MB, sem entidades externas.');
    const doc = new Parser().parseFromString(xml, 'application/xml');
    if (doc.querySelector('parsererror') || doc.documentElement.nodeName !== 'CURRICULO-VITAE') throw Error('Selecione um XML de currículo exportado da Plataforma Lattes.');
    const specs = [
      ['DADOS-BASICOS-DO-ARTIGO', 'artigo', 'TITULO-DO-ARTIGO', 'ANO-DO-ARTIGO'],
      ['DADOS-BASICOS-DO-TRABALHO', 'trabalho', 'TITULO-DO-TRABALHO', 'ANO-DO-TRABALHO'],
      ['CURSO-DE-CURTA-DURACAO', 'curso', 'NOME-CURSO', 'ANO-DE-CONCLUSAO'],
      ['ESPECIALIZACAO', 'formacao', 'NOME-CURSO', 'ANO-DE-CONCLUSAO'],
      ['APERFEICOAMENTO', 'formacao', 'NOME-CURSO', 'ANO-DE-CONCLUSAO'],
      ['GRADUACAO', 'formacao', 'NOME-CURSO', 'ANO-DE-CONCLUSAO'],
      ['MESTRADO', 'formacao', 'NOME-CURSO', 'ANO-DE-CONCLUSAO'],
      ['DOUTORADO', 'formacao', 'NOME-CURSO', 'ANO-DE-CONCLUSAO']
    ];
    const items = [];
    for (const [tag, category, titleKey, yearKey] of specs) {
      for (const node of doc.getElementsByTagName(tag)) {
        const title = node.getAttribute(titleKey);
        if (title) items.push({ id: root.crypto.randomUUID(), category, title: title.slice(0, 300), year: node.getAttribute(yearKey) || '', hours: '', evidence: '', reviewed: false, source: 'lattes' });
      }
    }
    if (items.length > 5000) throw Error('Este XML contém mais de 5.000 atividades. Reduza o arquivo para importá-lo.');
    return merge([], items);
  }
  function score(rubric, answers) {
    if (!rubric || rubric.status !== 'reviewed') return null;
    const rows = rubric.criteria.map(criterion => {
      const values = criterion.parts.map(part => {
        const count = Number(answers[part.id] ?? 0);
        return Number.isFinite(count) ? Math.max(0, Math.min(part.limit, Math.floor(count))) * part.points : 0;
      });
      const raw = criterion.exclusive ? Math.max(0, ...values) : values.reduce((sum, value) => sum + value, 0);
      const value = criterion.deduction
        ? Math.max(Number.isFinite(criterion.min) ? criterion.min : -rubric.max, raw)
        : Math.min(criterion.max, raw);
      return { id: criterion.id, value, max: criterion.max };
    });
    const subtotal = Math.round(rows.reduce((sum, row) => sum + row.value, 0) * 1000000) / 1000000;
    const multiplier = rubric.multipliers?.find(m => m.id === answers.multiplier)?.value || 1;
    return { rows, subtotal, multiplier, total: Math.max(0, Math.min(rubric.max, Math.round(subtotal * multiplier * 100) / 100)), max: rubric.max };
  }
  function suggestFmusp(items) {
    const answers = {m1:0,m2:0,m3:0,p1:0,p2:0,p3:0,a1:0,a2:0,s1:0};
    const eligible = items.filter(item=>item.reviewed === true);
    for (const item of eligible) {
      const meta = item.meta || {};
      const semesters = Number(meta.semesters) || 0;
      const hours = Number(item.hours) || 0;
      if (item.category === 'monitoria' && meta.official === true) {
        if (semesters > 2 && hours >=192) answers.m1++;
        else if (semesters >=2 && hours >=128) answers.m2++;
        else if (semesters >=1 && hours >=64) answers.m3++;
      }
      if (item.category === 'pesquisa' && semesters >=2) {
        if (meta.funding === 'yes' && meta.published === 'yes') answers.p1++;
        else if (meta.funding === 'yes' && meta.published === 'no') answers.p2++;
        else if (meta.funding === 'no' && meta.published === 'yes') answers.p3++;
      }
      if (item.category === 'artigo' && meta.separateFromIC === true) {
        if (meta.index === 'pubmed') answers.a1++;
        else if (meta.index === 'scielo') answers.a2++;
      }
      if (item.category === 'curso' && ['ACLS','ATLS','PALS','BLS'].includes(meta.course) && meta.inPerson === true && ['AHA','ACS'].includes(meta.certifier) && meta.validForRegistration === true && Number(item.year) <=2026) answers.s1++;
    }
    // Suggestions never infer institutional characteristics, authorship or eligibility.
    return answers;
  }
  const api = { categories, identity, merge, parseLattes, score, suggestFmusp };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.LuriaCurriculo = api;
})(globalThis);
