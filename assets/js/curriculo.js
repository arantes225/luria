(() => {
  'use strict';
  const core = window.LuriaCurriculo;
  const pdfSupport = window.LuriaCurriculoPdf;
  const rubrics = window.LuriaCurriculoRubricas || [];
  const $ = id => document.getElementById(id);
  const form = $('cv-form');
  const curriculumPanel = $('cv-curriculum-panel');
  const curriculumToggle = $('cv-toggle');
  let userId = null;
  let state = { items: [], answers: {} };
  let pending = [];
  let busy = false;
  let originalPdf = null;
  function refreshPdfControls() {
    const uploaded = Boolean(originalPdf?.blob);
    $('cv-pdf-attached').hidden = !uploaded;
    $('cv-pdf-filename').textContent = uploaded ? `PDF anexado: ${originalPdf.name || 'curriculo.pdf'}` : '';
  }
  async function readSavedPdf(owner) {
    originalPdf = null;
    refreshPdfControls();
    // Em navegadores sem IndexedDB (ou prévias/testes sem persistência),
    // não dispare uma Promise cujo erro chegaria depois do encerramento da página.
    if (!window.indexedDB) return;
    try {
      const record = await pdfSupport.getPdf(owner);
      if (owner !== userId) return;
      originalPdf = record?.blob ? record : null;
      refreshPdfControls();
    } catch {
      if (owner === userId) status('PDF salvo anteriormente indisponível neste navegador. Você ainda pode enviar outro arquivo.');
    }
  }
  function openOriginalPdf(download) {
    if (!originalPdf?.blob) return status('Envie um PDF para abri-lo.');
    const url = URL.createObjectURL(originalPdf.blob);
    const link = node('a');
    link.href = url;
    if (download) {
      link.download = String(originalPdf.name || 'meu-curriculo.pdf').replace(/[/\\]/g, '_');
    } else {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
    document.body.append(link);
    link.click();
    link.remove();
    // A visualização de PDF em uma nova aba pode demorar a carregar.
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  }
  function showImportReview(items, sourceLabel) {
    const known = new Set(state.items.map(core.identity));
    pending = items.filter(item => !known.has(core.identity(item)));
    if (!pending.length) {
      $('cv-import-review').hidden = true;
      status('Nenhuma atividade nova identificada. O arquivo original permanece disponível.');
      return;
    }
    const box = $('cv-import-items');
    box.replaceChildren();
    pending.forEach((item, index) => {
      const label = node('label', undefined, 'cv-item');
      const text = node('span', `${item.title} · ${item.year || 'Ano não informado'} · ${core.categories[item.category] || 'Atividade'}`);
      const check = node('input');
      check.type = 'checkbox';
      check.checked = true;
      check.dataset.importIndex = String(index);
      label.append(check, text);
      box.append(label);
    });
    $('cv-import-description').textContent = `${pending.length} atividade(s) sugerida(s) a partir do ${sourceLabel}. Revise a categoria, o ano e o título antes de adicionar. Nenhuma atividade importada é marcada como conferida.`;
    $('cv-import-review').hidden = false;
    status(`${sourceLabel} lido. Revise as sugestões antes de adicioná-las.`);
  }
  curriculumToggle?.addEventListener('click', () => {
    const willOpen = curriculumPanel.hidden;
    curriculumPanel.hidden = !willOpen;
    curriculumToggle.setAttribute('aria-expanded', String(willOpen));
    curriculumToggle.classList.toggle('is-open', willOpen);
    if (willOpen) curriculumPanel.querySelector('button, input, select')?.focus();
  });
  const key = () => `luria:curriculo:v1:${userId}`;
  const status = message => { $('cv-status').textContent = message; };
  function node(tag, text, className) {
    const el = document.createElement(tag);
    if (text !== undefined) el.textContent = text;
    if (className) el.className = className;
    return el;
  }
  function save() {
    if (!userId) { status('Entre na sua conta para salvar seu currículo.'); return false; }
    try { localStorage.setItem(key(), JSON.stringify(state)); return true; }
    catch { status('Não foi possível salvar neste navegador. Exporte seu currículo antes de sair.'); return false; }
  }
  function renderItems() {
    $('cv-count').textContent = `${state.items.length} atividade${state.items.length === 1 ? '' : 's'}`;
    const list = $('cv-items'); list.replaceChildren();
    if (!state.items.length) {
      const empty = node('div', undefined, 'cv-empty');
      empty.append(node('h3', 'Sua trajetória começa aqui'), node('p', 'Adicione uma atividade ou importe o XML do seu Lattes para montar seu currículo.'));
      list.append(empty); return;
    }
    state.items.forEach(item => {
      const article = node('article', undefined, 'cv-item');
      article.append(node('small', `${core.categories[item.category] || 'Outra atividade'} · ${item.year || 'Ano a revisar'}${item.hours ? ` · ${item.hours} h` : ''}`), node('h3', item.title));
      if (item.evidence) article.append(node('p', `Comprovante: ${item.evidence}`));
      const actions = node('div', undefined, 'cv-actions');
      actions.append(node('span', item.reviewed ? 'Informações conferidas por você' : 'Revisão pendente', 'cv-badge'));
      const edit = node('button', 'Editar'); edit.type = 'button';
      edit.addEventListener('click', () => editItem(item));
      const remove = node('button', 'Excluir'); remove.type = 'button';
      remove.setAttribute('aria-label', `Excluir ${item.title}`);
      remove.addEventListener('click', () => {
        state.items = state.items.filter(row => row.id !== item.id); const saved = save(); renderItems(); if (saved) status('Atividade excluída.');
      });
      actions.append(edit, remove); article.append(actions); list.append(article);
    });
  }
  function editItem(item) {
    if (!userId) return status('Aguarde a identificação da sua conta.');
    form.reset();
    for (const field of ['id', 'title', 'year', 'hours', 'category', 'evidence']) form.elements.namedItem(field).value = item?.[field] || (field === 'category' ? 'outro' : '');
    form.elements.reviewed.checked = item?.reviewed === true;
    for (const field of metaFields) {
      const input = form.elements.namedItem('meta_'+field.id);
      if (field.type === 'checkbox') input.checked = item?.meta?.[field.id] === true;
      else input.value = String(item?.meta?.[field.id] || '');
    }
    showMetaFields();
    form.hidden = false; form.elements.title.focus();
  }
  const activeRubric = () => rubrics.find(row => row.id === $('cv-exam').value);
  function selectRubric(id) {
    $('cv-exam').value = id;
    state.selectedExam = id;
    save(); renderRubric();
  }
  function renderInstitutions() {
    const box = $('cv-institutions'); box.replaceChildren();
    const reviewed = rubrics.filter(row => row.status === 'reviewed').length;
    const notRequired = rubrics.filter(row => row.status === 'not-required').length;
    $('cv-coverage').textContent = `${reviewed} matrizes calculáveis · ${notRequired} sem currículo · ${rubrics.length - reviewed - notRequired} aguardando complemento`;
    rubrics.forEach(rubric => {
      const card = node('button', undefined, 'cv-institution'); card.type = 'button';
      card.setAttribute('aria-pressed', String(rubric.id === $('cv-exam').value));
      const icon = node('span',rubric.institution.replace(/[^A-Z]/g,'').slice(0,3),'cv-institution-icon'); icon.setAttribute('aria-hidden','true');
      const copy = node('span',undefined,'cv-institution-copy');
      const subtitles = {
        reviewed: `${rubric.region} · ${rubric.edition} · Matriz conferida`,
        'not-required': `${rubric.region} · ${rubric.edition} · Sem análise curricular`,
        'program-specific': `${rubric.region} · ${rubric.edition} · Por especialidade`,
        'weights-pending': `${rubric.region} · ${rubric.edition} · Pesos aguardados`,
        pending: `${rubric.region} · ${rubric.edition || 'edição vigente'} · Edital aguardado`
      };
      copy.append(node('strong',rubric.institution),node('small',subtitles[rubric.status] || subtitles.pending));
      const score = core.score(rubric,state.answers[rubric.id] || {});
      const displayValue = score ? (score.total/score.max*10).toLocaleString('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:1}) : rubric.status === 'not-required' ? 'Sem' : '—';
      card.append(icon,copy,node('span',displayValue,'cv-institution-value'));
      if (score) card.setAttribute('aria-label',`${rubric.institution}: ${score.total.toLocaleString('pt-BR')} de ${score.max} pontos. Cartão convertido para escala de 0 a 10.`);
      card.addEventListener('click',()=>selectRubric(rubric.id)); box.append(card);
    });
  }
  function renderScore() {
    const rubric = activeRubric();
    const score = core.score(rubric, state.answers[rubric?.id] || {});
    const box = $('cv-score'); box.replaceChildren();
    if (!score) {
      box.append(node('p', rubric?.status === 'not-required' ? 'Este processo não possui análise curricular.' : 'Pontuação indisponível até completar a matriz oficial.'));
      return;
    }
    box.append(node('small', 'Estimativa autodeclarada'), node('div', `${score.total.toLocaleString('pt-BR')} / ${score.max}`, 'cv-stat'), node('small', `Subtotal: ${score.subtotal.toLocaleString('pt-BR')} · Fator: ${score.multiplier.toLocaleString('pt-BR')} · Teto final: ${score.max}`));
    score.rows.forEach(row => {
      const badge = $(`cv-points-${row.id}`);
      const definition = rubric.criteria.find(criterion => criterion.id === row.id);
      if (badge) badge.textContent = definition?.deduction
        ? `${row.value.toLocaleString('pt-BR')} pontos`
        : `${row.value.toLocaleString('pt-BR')} / ${row.max.toLocaleString('pt-BR')} pontos`;
    });
    (rubric.groups || []).forEach(group => {
      const rows = score.rows.filter(row => group.criteria.includes(row.id) && !rubric.criteria.find(criterion => criterion.id === row.id)?.deduction);
      const value = Math.round(rows.reduce((sum,row)=>sum+row.value,0)*1000000)/1000000;
      const max = Math.round(rows.reduce((sum,row)=>sum+row.max,0)*1000000)/1000000;
      const badge = $(`cv-group-points-${group.id}`);
      if (badge) badge.textContent = `${value.toLocaleString('pt-BR')} / ${max.toLocaleString('pt-BR')}`;
      const progress = $(`cv-group-progress-${group.id}`);
      if (progress) { progress.max = max; progress.value = value; }
      const remaining = $(`cv-group-remaining-${group.id}`);
      if (remaining) remaining.textContent = value === max ? '✓ Pontuação máxima atingida' : `+${(max-value).toLocaleString('pt-BR')} pontos possíveis`;
    });
    renderInstitutions();
  }
  function renderRubric() {
    const rubric = activeRubric();
    const source = $('cv-source'); source.replaceChildren();
    const rules = $('cv-rules'); rules.replaceChildren();
    if (!rubric) { renderScore(); return; }
    renderInstitutions();
    const links = node('div', undefined, 'cv-actions');
    for (const [text, url] of [['Edital oficial',rubric.source],['Retificação',rubric.updates],['Publicações oficiais',rubric.listing]]) {
      if (!url) continue;
      const link = node('a',text); link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer'; links.append(link);
    }
    if (rubric.status !== 'reviewed') {
      source.append(node('p',rubric.scope));
      if (rubric.checkedAt) source.append(node('small', `Situação conferida em ${rubric.checkedAt.split('-').reverse().join('/')}.`));
      if (links.childElementCount) source.append(links);
      const pending = node('div',undefined,'cv-pending');
      const messages = {
        'not-required':['Sem análise curricular','O edital vigente usa somente a prova objetiva, portanto não há nota de currículo para calcular.'],
        'program-specific':['Escolha por especialidade em preparação','O edital usa matrizes diferentes por programa. A calculadora única fica bloqueada para evitar uma nota incorreta.'],
        'weights-pending':['Pesos oficiais ainda não publicados','A análise curricular está prevista, mas a banca ainda precisa publicar o aditivo com as atividades e seus pesos.'],
        pending:['Matriz oficial ainda não publicada','A calculadora será liberada quando o edital com os critérios de pontuação estiver disponível.']
      };
      const message = messages[rubric.status] || messages.pending;
      pending.append(node('h3',message[0]),node('p',message[1]));
      source.append(pending); renderScore(); return;
    }
    source.append(node('p', rubric.scope), node('small', `Regras conferidas em ${rubric.checkedAt.split('-').reverse().join('/')}. Consulte novas retificações antes da candidatura.`));
    source.append(links);
    if (rubric.id === 'fmusp-2027-direto-v20261007') {
      const suggest=node('button','Preencher com meu currículo');suggest.type='button';
      suggest.addEventListener('click',()=>{
        const suggestions=core.suggestFmusp(state.items);
        const next={...(state.answers[rubric.id] || {})};
        rubric.criteria.forEach(criterion=>criterion.parts.forEach(part=>{
          if (Object.hasOwn(suggestions,part.id)) next[part.id]=Math.min(part.limit,suggestions[part.id]);
        }));
        state.answers[rubric.id]=next;const saved=save();renderRubric();
        const notice=node('p',saved?'Sugestão aplicada às atividades conferidas. Revise os critérios e complete os demais itens.':'Sugestão calculada, mas não foi possível salvar. Exporte seu currículo.','cv-note');notice.setAttribute('role','status');$('cv-source').append(notice);
      });
      source.append(suggest,node('small','Usa os detalhes conferidos de monitoria, iniciação científica, artigos e cursos de suporte à vida. Os demais critérios são preenchidos abaixo. Itens importados do Lattes precisam ser revisados antes.'));
    }
    const answers = state.answers[rubric.id] || {};
    const info = node('p', 'Informe quantas atividades atendem a cada requisito. Não repita o mesmo comprovante em faixas incompatíveis. A soma respeita os tetos por item.', 'cv-note'); rules.append(info);
    const groupBodies = new Map();
    (rubric.groups || []).forEach(group=>{
      const section=node('section',undefined,'cv-group'); section.dataset.tone=group.tone;
      const header=node('header',undefined,'cv-group-header');
      const heading=node('div',undefined,'cv-card-header');
      const badge=node('span','','cv-badge');badge.id=`cv-group-points-${group.id}`;
      heading.append(node('h3',group.title),badge);
      const progress=node('progress');progress.id=`cv-group-progress-${group.id}`;progress.setAttribute('aria-label',`Pontuação em ${group.title}`);
      const remaining=node('small');remaining.id=`cv-group-remaining-${group.id}`;
      header.append(heading,progress,remaining);section.append(header);rules.append(section);
      group.criteria.forEach(id=>groupBodies.set(id,section));
    });
    rubric.criteria.forEach((criterion, index) => {
      const details = node('details', undefined, 'cv-rule');
      const summary = node('summary', `${criterion.number || index + 1}. ${criterion.title} `);
      const badge = node('span', '', 'cv-badge'); badge.id = `cv-points-${criterion.id}`; summary.append(badge);
      details.append(summary, node('p', criterion.note));
      const pageLink = node('a', `Ver item no edital · página ${criterion.page}`); pageLink.href = `${rubric.source}#page=${criterion.page}`; pageLink.target = '_blank'; pageLink.rel = 'noopener noreferrer'; details.append(pageLink);
      criterion.parts.forEach(part => {
        const label = node('label', undefined, 'cv-field');
        const pointsText = criterion.deduction
          ? `Dedução de ${Math.abs(part.points).toLocaleString('pt-BR')} ponto(s) por registro · máximo ${part.limit}`
          : `${part.points.toLocaleString('pt-BR')} ponto(s) por atividade · máximo ${part.limit}`;
        label.append(node('span', part.label), node('small', pointsText));
        const input = node('input'); input.type = 'number'; input.min = '0'; input.max = String(part.limit); input.step = '1'; input.value = String(answers[part.id] || 0); input.dataset.part = part.id;
        input.addEventListener('input', () => {
          state.answers[rubric.id] ||= {};
          if (criterion.exclusive && Number(input.value) > 0) {
            criterion.parts.forEach(other => {
              if (other.id === part.id) return;
              state.answers[rubric.id][other.id] = 0;
              const otherInput = details.querySelector(`[data-part="${other.id}"]`);
              if (otherInput) otherInput.value = '0';
            });
          }
          const value = Math.max(0, Math.min(part.limit, Math.floor(Number(input.value) || 0)));
          state.answers[rubric.id][part.id] = value; save(); renderScore();
        });
        input.addEventListener('change', () => { input.value = String(state.answers[rubric.id]?.[part.id] || 0); });
        label.append(input); details.append(label);
      });
      (groupBodies.get(criterion.id) || rules).append(details);
    });
    if (rubric.multipliers?.length) {
    const label = node('label', undefined, 'cv-field'); label.append(node('span','Fator de valorização da instituição · ENAMED 2025'));
    const select = node('select'); select.setAttribute('aria-label','Fator ENAMED 2025');
    rubric.multipliers.forEach(m => { const option = node('option', m.label); option.value = m.id; select.append(option); });
    select.value = answers.multiplier || '1';
    select.addEventListener('change', () => { state.answers[rubric.id] ||= {}; state.answers[rubric.id].multiplier = select.value; save(); renderScore(); });
    label.append(select, node('small','Confira o conceito da sua instituição e o item 14 do edital. O fator incide no subtotal e a nota final é limitada a 100.')); rules.append(label);
    }
    renderScore();
  }
  function ready(user) {
    if (!user?.id || user.id === userId) return;
    userId = user.id; state = { items: [], answers: {} }; pending = [];
    $('cv-exam').value = rubrics[0]?.id || '';
    $('cv-import-review').hidden = true; form.hidden = true;
    try {
      const saved = JSON.parse(localStorage.getItem(key()) || 'null');
      if (saved && Array.isArray(saved.items) && saved.items.length <= 5000 && saved.answers && typeof saved.answers === 'object') {
        state.items = saved.items.filter(item => item && typeof item.title === 'string' && typeof item.id === 'string' && Object.hasOwn(core.categories,item.category));
        rubrics.forEach(rubric => {
          if (rubric.status !== 'reviewed') return;
          const answers = saved.answers[rubric.id];
          if (!answers || typeof answers !== 'object' || Array.isArray(answers)) return;
          state.answers[rubric.id] = {};
          rubric.criteria.forEach(criterion => criterion.parts.forEach(part => {
            const value = Number(answers[part.id]);
            state.answers[rubric.id][part.id] = Number.isFinite(value) ? Math.max(0, Math.min(part.limit, Math.floor(value))) : 0;
          }));
          state.answers[rubric.id].multiplier = rubric.multipliers?.some(m => m.id === answers.multiplier) ? answers.multiplier : '1';
        });
        if (rubrics.some(rubric=>rubric.id===saved.selectedExam)) { $('cv-exam').value = saved.selectedExam;state.selectedExam=saved.selectedExam; }
      }
    } catch { status('Não foi possível ler o currículo salvo. Você pode começar um novo cadastro.'); }
    ['cv-add','cv-import','cv-lattes','cv-import-pdf','cv-pdf','cv-export-pdf','cv-export','cv-exam'].forEach(id => { $(id).disabled = false; });
    void readSavedPdf(userId);
    renderItems(); renderRubric();
  }
  Object.entries(core.categories).forEach(([value,text]) => { const option = node('option',text); option.value = value; $('cv-category').append(option); });
  const metaFields = [
    {id:'semesters',label:'Semestres completos na mesma atividade',type:'number',categories:['monitoria','pesquisa']},
    {id:'official',label:'Monitoria oficial da graduação em Medicina com certificação institucional',type:'checkbox',categories:['monitoria']},
    {id:'funding',label:'Bolsa de iniciação científica',options:[['','Não informado'],['yes','Com bolsa'],['no','Sem bolsa']],categories:['pesquisa']},
    {id:'published',label:'Artigo relacionado ao projeto, com autoria e publicação/aceite conferidos',options:[['','Não informado'],['yes','Sim, com documentação elegível'],['no','Sem publicação']],categories:['pesquisa']},
    {id:'index',label:'Indexação conferida do periódico',options:[['','Não informado'],['pubmed','PubMed'],['scielo','SciELO'],['other','Outra indexação / não indexado']],categories:['artigo']},
    {id:'separateFromIC',label:'Este artigo não será usado para pontuar iniciação científica',type:'checkbox',categories:['artigo']},
    {id:'course',label:'Tipo de curso',options:[['','Outro / não informado'],['ACLS','ACLS'],['ATLS','ATLS'],['PALS','PALS'],['BLS','BLS']],categories:['curso']},
    {id:'certifier',label:'Certificação do curso',options:[['','Outra / não informada'],['AHA','American Heart Association'],['ACS','American College of Surgeons']],categories:['curso']},
    {id:'inPerson',label:'Curso realizado presencialmente',type:'checkbox',categories:['curso']},
    {id:'validForRegistration',label:'Certificação válida para a inscrição de 2026 (ingresso 2027)',type:'checkbox',categories:['curso']}
  ];
  const metaBox=node('fieldset',undefined,'cv-wide cv-meta');metaBox.append(node('legend','Detalhes para avaliação curricular'));
  metaFields.forEach(field=>{
    const label=node('label',undefined,'cv-field');label.dataset.meta=field.id;
    const input=node(field.options?'select':'input');input.name='meta_'+field.id;input.setAttribute('aria-label',field.label);
    if (field.options) field.options.forEach(([value,text])=>{const option=node('option',text);option.value=value;input.append(option);});
    else {input.type=field.type;if(field.type==='number'){input.min='0';input.max='100';input.step='1';}}
    if(field.type==='checkbox'){const span=node('span');span.append(input,document.createTextNode(' '+field.label));label.append(span);}
    else label.append(node('span',field.label),input);
    metaBox.append(label);
  });
  form.insertBefore(metaBox,form.elements.reviewed.closest('label'));
  function showMetaFields(){
    const category=form.elements.category.value;
    metaBox.hidden=!metaFields.some(field=>field.categories.includes(category));
    metaFields.forEach(field=>{metaBox.querySelector(`[data-meta="${field.id}"]`).hidden=!field.categories.includes(category);});
  }
  $('cv-category').addEventListener('change',showMetaFields);
  rubrics.forEach(rubric => { const option = node('option',rubric.title); option.value = rubric.id; $('cv-exam').append(option); });
  $('cv-add').addEventListener('click', () => editItem());
  $('cv-import').addEventListener('click', () => $('cv-lattes').click());
  $('cv-import-pdf').addEventListener('click', () => $('cv-pdf').click());
  $('cv-open-pdf').addEventListener('click', () => openOriginalPdf(false));
  $('cv-download-pdf').addEventListener('click', () => openOriginalPdf(true));
  $('cv-remove-pdf').addEventListener('click', async () => {
    if (!userId || !originalPdf || busy) return;
    const owner = userId;
    try {
      await pdfSupport.removePdf(owner);
      if (owner !== userId) return;
      originalPdf = null;
      refreshPdfControls();
      status('Arquivo PDF removido deste navegador. As atividades cadastradas foram preservadas.');
    } catch (error) { status('Não foi possível remover o PDF: ' + error.message); }
  });
  $('cv-cancel').addEventListener('click', () => { form.hidden = true; $('cv-add').focus(); });
  $('cv-exam').addEventListener('change', () => selectRubric($('cv-exam').value));
  form.addEventListener('submit', event => {
    event.preventDefault(); if (!userId || !form.reportValidity()) return;
    const fields = new FormData(form); const id = fields.get('id');
    const old = state.items.find(item => item.id === id);
    const title = String(fields.get('title')).trim(); if (!title) return;
    const meta={};metaFields.filter(field=>field.categories.includes(fields.get('category'))).forEach(field=>{meta[field.id]=field.type==='checkbox'?fields.has('meta_'+field.id):fields.get('meta_'+field.id);});
    const item = { id: id || crypto.randomUUID(), title, category: fields.get('category'), year: fields.get('year'), hours: fields.get('hours'), evidence: String(fields.get('evidence')).trim(), reviewed: fields.has('reviewed'), meta, source: old?.source || 'manual' };
    if (old) state.items = state.items.map(row => row.id === id ? item : row);
    else state.items.push(item);
    const saved = save(); renderItems(); form.hidden = true; if (saved) status('Atividade salva neste navegador.'); $('cv-add').focus();
  });
  $('cv-lattes').addEventListener('change', async event => {
    const file = event.target.files[0]; if (!file || !userId || busy) return;
    const owner = userId; busy = true;
    try {
      if (file.size > 10 * 1024 * 1024) throw Error('Escolha um XML de até 10 MB.');
      const buffer = await file.arrayBuffer();
      let xml = new TextDecoder('utf-8').decode(buffer);
      const encoding = xml.slice(0,200).match(/encoding\s*=\s*["']([^"']+)/i)?.[1];
      if (encoding && !/^utf-?8$/i.test(encoding)) xml = new TextDecoder(encoding).decode(buffer);
      const items = core.parseLattes(xml, DOMParser);
      if (owner !== userId) return;
      showImportReview(items, 'XML do Lattes');
    } catch (error) { status(`Não foi possível importar: ${error.message}`); }
    finally { busy = false; event.target.value = ''; }
  });
  $('cv-pdf').addEventListener('change', async event => {
    const file = event.target.files?.[0];
    if (!file || !userId || busy) return;
    const owner = userId;
    busy = true;
    pending = [];
    $('cv-import-review').hidden = true;
    try {
      await pdfSupport.checkPdf(file);
      let persisted = true;
      try {
        await pdfSupport.storePdf(owner, file);
      } catch {
        persisted = false;
      }
      if (owner !== userId) return;
      originalPdf = { blob: file, name: file.name };
      refreshPdfControls();
      status(persisted
        ? 'PDF anexado neste navegador. Lendo as atividades…'
        : 'PDF disponível nesta sessão. O navegador não permitiu salvá-lo para uso posterior.');
      try {
        const result = await pdfSupport.extract(file, status);
        if (owner !== userId) return;
        if (result.items.length) showImportReview(result.items, 'PDF');
        else if (!result.hasText) status('PDF anexado. Ele parece ser digitalizado, sem texto selecionável. Você pode abri-lo, mas deve cadastrar as atividades manualmente.');
        else status('PDF anexado e disponível para abrir. Não foi possível identificar atividades estruturadas com segurança; adicione-as manualmente ou use o XML do Lattes.');
      } catch (error) {
        if (owner === userId) status('PDF anexado para visualização, mas a extração de atividades falhou: ' + error.message);
      }
    } catch (error) {
      if (owner === userId) status('Não foi possível anexar o PDF: ' + error.message);
    } finally {
      busy = false;
      event.target.value = '';
    }
  });
  $('cv-import-confirm').addEventListener('click', () => {
    const selected = [...$('cv-import-items').querySelectorAll('input:checked')].map(input => pending[Number(input.dataset.importIndex)]).filter(Boolean);
    state.items = core.merge(state.items, selected); const saved = save(); pending = []; $('cv-import-review').hidden = true; renderItems(); if (saved) status(`${selected.length} atividade(s) adicionada(s). Revise os dados importados.`);
  });
  $('cv-import-cancel').addEventListener('click', () => { pending = []; $('cv-import-review').hidden = true; status('Importação cancelada.'); });
  $('cv-export-pdf').addEventListener('click', async () => {
    if (!userId || busy) return;
    busy = true;
    try {
      await window.LuriaLazyVendors.ensure('jspdf');
      if (!window.jspdf?.jsPDF) throw Error('Gerador de PDF indisponível.');
      const doc = new window.jspdf.jsPDF({ unit: 'pt', format: 'a4', compress: true });
      const margin = 42, maxWidth = 511, bottom = 790;
      let y = 58;
      const line = (text, size = 10, bold = false) => {
        doc.setFont('helvetica', bold ? 'bold' : 'normal');
        doc.setFontSize(size);
        const rows = doc.splitTextToSize(String(text), maxWidth);
        for (const row of rows) {
          if (y > bottom) { doc.addPage(); y = 52; }
          doc.text(row, margin, y);
          y += size * 1.45;
        }
      };
      line('LURIA | Meu currículo', 19, true);
      y += 9;
      line(`Emitido em ${new Date().toLocaleDateString('pt-BR')} | ${state.items.length} atividade(s)`, 10);
      y += 20;
      for (const item of state.items) {
        line(`${core.categories[item.category] || 'Outra atividade'} · ${item.year || 'Ano não informado'}`, 10, true);
        line(item.title, 11);
        if (item.hours) line(`Carga horária: ${item.hours} h`);
        if (item.evidence) line(`Comprovante informado: ${item.evidence}`);
        line(item.reviewed ? 'Informações marcadas como conferidas pelo aluno' : 'Revisão pendente', 9);
        y += 14;
      }
      if (y > bottom - 35) { doc.addPage(); y = 52; }
      line('Documento gerado a partir das atividades cadastradas pelo aluno. Não substitui comprovantes nem validação oficial da banca.', 9);
      doc.save('meu-curriculo-luria.pdf');
      status('Currículo em PDF gerado. Confira os dados antes de usá-lo em processos seletivos.');
    } catch (error) {
      status('Não foi possível gerar o PDF: ' + error.message);
    } finally { busy = false; }
  });
  $('cv-export').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify({ version:1, exportedAt:new Date().toISOString(), ...state },null,2)], { type:'application/json' });
    const url = URL.createObjectURL(blob); const link = node('a'); link.href = url; link.download = 'meu-curriculo-luria.json'; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
  ['cv-add','cv-import','cv-lattes','cv-import-pdf','cv-pdf','cv-export-pdf','cv-export','cv-exam'].forEach(id => { $(id).disabled = true; });
  renderItems(); renderRubric();
  window.addEventListener('docmap:ready', event => ready(event.detail?.user));
  ready(window.docmapUser);
})();
