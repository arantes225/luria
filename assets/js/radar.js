(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const areas = ['Clínica Médica', 'Cirurgia Geral', 'Pediatria', 'Ginecologia e Obstetrícia', 'Saúde Coletiva'];
  const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const el = (tag, text, cls) => { const n = document.createElement(tag); if (text !== undefined) n.textContent = text; if (cls) n.className = cls; return n; };
  let data, bank, area = areas[0];
  function link(text, url) {
    const a = el('a', text); a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer'; return a;
  }
  function profiles() { return bank.medcof?.perfis || []; }
  function selectBank() {
    bank = data.provas.find(p => p.prova === $('radar-bank').value);
    $('radar-profile').replaceChildren(...profiles().map(p => { const o = el('option', p.perfil); o.value = p.perfil; return o; }));
    $('radar-profile-field').hidden = profiles().length < 2;
    $('radar-source').value = profiles().length ? 'medcof' : 'aristo';
    $('radar-source').options[0].disabled = !profiles().length;
    $('radar-source').options[1].disabled = !bank.aristo;
    render();
  }
  function render() {
    const fromMedcof = $('radar-source').value === 'medcof';
    const profile = profiles().find(p => p.perfil === $('radar-profile').value) || profiles()[0];
    const all = fromMedcof ? profile?.areas[area] || [] : bank.aristo?.temas.filter(t => t.area === area) || [];
    const query = normalize($('radar-search').value.trim());
    const rows = all.filter(t => normalize(t.tema).includes(query));
    $('radar-area-title').textContent = area;
    $('radar-count').textContent = `${rows.length} tema${rows.length === 1 ? '' : 's'}`;
    $('radar-summary').textContent = fromMedcof ? 'Ordem pela contagem publicada entre os temas selecionados no artigo. Empates compartilham a posição.' : 'Destaques gerais com área explicitamente identificada no mapa. Ordem editorial preservada; sem contagens de questões.';
    $('radar-period').textContent = fromMedcof ? `Recorte: ${bank.medcof.fonte.periodo_descrito || 'anos das questões não explicitados no artigo'}.` : 'Recorte: últimos três anos, conforme o material Aristo 2026.';
    $('radar-origin').replaceChildren();
    if (fromMedcof) $('radar-origin').append(link('Consultar análise da MedCof ↗', bank.medcof.fonte.url));
    else $('radar-origin').append(link('Biblioteca Aristo ↗', 'https://app.aristoclass.com.br/#/mais-aristo/documentos'));
    const list = $('radar-list'); list.replaceChildren();
    if (!rows.length) {
      const empty = el('div', undefined, 'cv-empty');
      empty.append(el('h3', query ? 'Nenhum tema encontrado' : 'Sem temas específicos nesta seleção'), el('p', query ? 'Tente outra palavra ou remova a busca.' : 'A fonte não traz dados suficientes para ordenar temas nesta área. Consulte outra fonte ou prova.'));
      list.append(empty);
    }
    rows.forEach(t => {
      const item = el('li', undefined, 'radar-topic');
      const rank = el('span', fromMedcof ? String(t.posicao).padStart(2, '0') : '•', 'radar-rank'); rank.setAttribute('aria-label', fromMedcof ? `Posição ${t.posicao}` : 'Destaque editorial');
      const copy = el('div', undefined, 'radar-topic-copy'); copy.append(el('h3', t.tema));
      if (fromMedcof) copy.append(el('small', t.subarea_fonte || t.area_fonte));
      else copy.append(el('small', 'Aristo · destaque geral · página 3'));
      item.append(rank, copy);
      if (fromMedcof) item.append(el('span', `${t.questoes_publicadas} questões`, 'radar-value'));
      list.append(item);
    });
    const notes = $('radar-notes'); notes.replaceChildren();
    if (fromMedcof) {
      (bank.medcof.observacoes || []).forEach(text => notes.append(el('p', text)));
      const blocked = bank.medcof.revisao || 0;
      if (blocked) notes.append(el('p', `${blocked} entrada(s) desta análise ficaram fora da ordenação por precisarem de revisão ou não serem temas específicos.`));
    } else notes.append(el('p', 'Os destaques sem classificação explícita de área permanecem na referência geral abaixo. Ausência nesta lista não significa ausência na prova.'));
    notes.hidden = !notes.childElementCount;
    $('radar-aristo').hidden = !bank.aristo;
    $('radar-aristo-list').replaceChildren(...(bank.aristo?.geral || []).map(t => el('li', t)));
    document.querySelectorAll('[data-radar-area]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.radarArea === area)));
    $('radar-status').textContent = `${bank.prova} · ${area} · ${rows.length} temas exibidos`;
  }
  async function init() {
    try {
      const response = await fetch('/assets/data/radar-provas.json?v=20261016-radar1');
      if (!response.ok) throw Error('Dados indisponíveis');
      data = await response.json();
      $('radar-bank').replaceChildren(...data.provas.map(p => { const o = el('option', p.prova); o.value = p.prova; return o; }));
      $('radar-bank').value = 'USP-SP';
      areas.forEach(name => {
        const button = el('button', name); button.type = 'button'; button.dataset.radarArea = name;
        button.addEventListener('click', () => { area = name; render(); }); $('radar-areas').append(button);
      });
      $('radar-bank').addEventListener('change', selectBank);
      ['radar-profile', 'radar-source'].forEach(id => $(id).addEventListener('change', render));
      $('radar-search').addEventListener('input', render);
      $('radar-total').textContent = `${data.provas.length} provas · Aristo + MedCof`;
      $('radar-controls').disabled = false; selectBank();
    } catch {
      $('radar-list').replaceChildren(el('p', 'Não foi possível carregar o Radar. Atualize a página para tentar novamente.', 'cv-empty'));
      $('radar-status').textContent = 'Falha ao carregar os dados.';
    }
  }
  init();
})();
