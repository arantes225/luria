/* Diabetes hub (educational). No patient persistence; no automated prescriptions. */
(() => {
  'use strict';
  const root = document.getElementById('diabetes-app');
  const data = window.LuriaDiabetesData;
  if (!root || !data) {
    if (root) root.textContent = 'O catálogo de Diabetes não pôde ser carregado.';
    return;
  }
  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const fmt = value => Number(value).toFixed(1).replace('.', ',');
  const link = (url, label, external) => '<a href="' + esc(url) + '" ' + (external ? 'target="_blank" rel="noopener noreferrer"' : '') + '>' + esc(label) + '</a>';
  const proto = q => '/trabalho/protocolos/?q=' + encodeURIComponent(q);
  const tabs = [
    ['inicio','Início'],['simulador','Simulador HbA1c'],['farmacos','Medicamentos'],
    ['protocolos','Protocolos'],['insulina','Insulinoterapia'],['monitor','Monitorização'],
    ['complicacoes','Complicações'],['emergencias','Emergências'],['gestacao','Gestação'],['fontes','Fontes']
  ];
  const quick = [
    ['simulador','◉','Simulador terapêutico','Monte um esquema, ajuste doses e avalie faixas de eficácia sem somar efeitos artificialmente.'],
    ['protocolos','▤','Protocolos e diretrizes','DM1, DM2, prevenção, complicações e protocolos brasileiros.'],
    ['farmacos','◈','Medicamentos','Classes, apresentações, eficácia, efeitos adversos e alertas.'],
    ['insulina','♧','Insulinoterapia','Insulinas basais, prandiais, tecnologia, técnica e segurança.'],
    ['monitor','▥','Monitorização','HbA1c, CGM, TIR, hipoglicemia, exames e acompanhamento.'],
    ['complicacoes','♡','Complicações','Rim, retina, neuropatia, pés, coração e prevenção.'],
    ['emergencias','⚠','Emergências','CAD, CAD euglicêmica, hipoglicemia e estado hiperosmolar.'],
    ['gestacao','✧','Gestação','Diabetes gestacional, pré-gestacional e puerpério.']
  ];
  const source = data.source;
  const card = (title, desc, icon, destination) => '<button class="dm-card dm-card-click" type="button" data-go="' + esc(destination) + '"><span class="dm-card-icon" aria-hidden="true">' + icon + '</span><h4>' + esc(title) + '</h4><p>' + esc(desc) + '</p><span class="dm-tag">Abrir seção</span></button>';
  const notice = (body, attention=false) => '<div class="dm-notice' + (attention ? ' attention' : '') + '"><span aria-hidden="true">' + (attention?'⚠':'ⓘ') + '</span><div>' + body + '</div></div>';
  const head = (title, description) => '<div class="dm-section-head"><div><h3>' + title + '</h3><p>' + description + '</p></div></div>';
  const linkbar = (items) => '<div class="dm-quick-links">' + items.map(item => '<a href="' + item[1] + '">' + esc(item[0]) + '</a>').join('') + '</div>';
  const section = (id, html) => '<section id="dm-view-' + id + '" class="dm-view" role="tabpanel" aria-labelledby="dm-tab-' + id + '" hidden>' + html + '</section>';
  const start = head('Central de Diabetes','Informação organizada por tema, com acesso às bases já existentes na LURIA.') +
    '<div class="dm-grid four">' + quick.map(q => card(q[2],q[3],q[1],q[0])).join('') + '</div>' +
    notice('<strong>Escopo educacional.</strong> Esta central apresenta dados de estudos e links às ferramentas existentes. Não gera prescrição, não armazena prontuário e não substitui avaliação ou julgamento clínico.') +
    '<div class="dm-panel"><h4>Atalhos para as bases da LURIA</h4>' +
    linkbar([['Bulário','/trabalho/bulario/'],['Exames','/trabalho/exames/'],['Protocolos','/trabalho/protocolos/?q=diabetes'],['Scores','/trabalho/scores/'],['Calculadoras','/trabalho/calculadora/'],['Apostila de diabetes','/apostilas/diabetes-mellitus/']]) + '</div>';
  const simulator = head('Simulador terapêutico de HbA1c','Estimativas populacionais por classe em monoterapia e comparação qualitativa de combinações. Não prevê a resposta individual.') +
    notice('<strong>Importante:</strong> os efeitos de medicamentos associados não são aditivos. A dose selecionada não gera uma curva dose–resposta sem estudo específico. Os valores numéricos ficam indisponíveis em situações não cobertas pela referência.',true) +
    '<div class="dm-panel"><h4>Parâmetros da simulação fictícia</h4><div class="dm-form-grid">' +
      '<div class="dm-field"><label for="dm-hba">HbA1c inicial (%)</label><input id="dm-hba" type="number" min="4" max="20" step="0.1" inputmode="decimal" value="9.0"><small>Referência inicial do exercício.</small></div>' +
      '<div class="dm-field"><label for="dm-goal">Meta HbA1c (%)</label><input id="dm-goal" type="number" min="4" max="12" step="0.1" inputmode="decimal" value="7.0"><small>Meta apenas ilustrativa; na prática é individualizada.</small></div>' +
      '<div class="dm-field"><label for="dm-egfr">TFGe (mL/min/1,73 m²)</label><input id="dm-egfr" type="number" min="0" max="180" step="1" inputmode="numeric" value="90"><small>Valor fictício; se abaixo de 60, a previsão será bloqueada.</small></div>' +
    '</div><hr class="dm-separator"><h4>Adicionar medicamento ao esquema</h4><div class="dm-med-picker">' +
      '<div class="dm-field"><label for="dm-drug">Medicamento</label><select id="dm-drug"></select></div>' +
      '<div class="dm-field"><label for="dm-dose">Dose / apresentação educacional</label><select id="dm-dose"></select></div>' +
      '<button class="dm-btn primary" id="dm-add" type="button">Adicionar</button>' +
    '</div><p class="dm-muted">A seleção de dose é para comparação de esquemas. Não constitui recomendação de iniciar, ajustar ou associar fármacos.</p>' +
    '<div id="dm-selected" class="dm-selected" aria-live="polite"></div></div>' +
    '<div class="dm-panel dm-result" aria-live="polite"><h4>Estimativa e alertas</h4><div id="dm-result"></div></div>' +
    '<div class="dm-panel"><h4>Regras do modelo atual</h4><ul class="dm-warning-list"><li>Faixas da diretriz SBD 2026 descrevem respostas médias por classe, não eficácia individual ou por dose.</li><li>Com dois ou mais medicamentos, apresenta apenas o perfil individual de cada classe; não calcula HbA1c conjunta.</li><li>Para insulinas, tirzepatida e doses de introdução sem faixa específica, o resultado numérico fica indisponível.</li><li>Dados clínicos especiais, TFGe reduzida ou HbA1c inicial fora da faixa ilustrativa impedem a previsão.</li></ul><p class="dm-muted">Referência: ' + link(source,'SBD 2026 — manejo do DM2',true) + '.</p></div>';
  const pharm = head('Biblioteca de medicamentos','Índice educacional vinculado ao Bulário. Os dados abaixo não substituem a ficha farmacológica completa.') +
    '<div class="dm-panel dm-search-panel"><label class="dm-field" for="dm-pharm-search">Buscar medicamento ou classe</label><input id="dm-pharm-search" type="search" placeholder="Ex.: empagliflozina, insulina, GLP-1" autocomplete="off"><div class="dm-row wrap"><span class="dm-muted" id="dm-pharm-count"></span><a class="dm-link-btn" href="/trabalho/bulario/">Abrir Bulário completo</a></div></div>' +
    '<div class="dm-pharm-grid" id="dm-pharm-list"></div>' +
    notice('<strong>Como interpretar:</strong> a faixa de eficácia é um resumo populacional da classe, sem representar aumento linear de efeito ao aumentar a dose. Verifique indicação, forma farmacêutica, bula atual, TFGe e associação.');
  const protocols = head('Protocolos clínicos','Pesquisa direta no banco de protocolos da LURIA. Se um assunto ainda não estiver preenchido, a central de protocolos informará sua disponibilidade.') +
    '<div class="dm-panel dm-search-panel"><label class="dm-field" for="dm-topic-search">Buscar assunto</label><input id="dm-topic-search" type="search" placeholder="Diabetes gestacional, pé diabético, CAD..." autocomplete="off">' +
    '<div class="dm-field"><label for="dm-topic-area">Área</label><select id="dm-topic-area"><option value="">Todas as áreas</option></select></div><span id="dm-topic-count" class="dm-muted"></span></div>' +
    '<div id="dm-topics" class="dm-topics"></div>' +
    '<div class="dm-panel"><h4>Material complementar</h4>' +
    linkbar([['Apostila DM','/apostilas/diabetes-mellitus/'],['DM1 e cetoacidose','/apostilas/diabetes-mellitus-tipo-1-e-cetoacidose/'],['Diabetes gestacional','/apostilas/diabetes-mellitus-gestacional/'],['Diretrizes SBD',source]]) + '</div>';
  const ins = head('Insulinoterapia','Princípios de segurança, tecnologias e consulta às fichas de insulinas existentes no Bulário.') +
    '<div class="dm-grid two">' + [
      ['Basal','NPH, glargina, degludeca e outras formulações; duração, horários e diferenças de perfil.'],
      ['Prandial e correções','Regular, lispro, asparte e outras; relação com refeições, hipoglicemia e monitorização.'],
      ['Esquemas','Basal, basal-bolus, pré-misturas, transição hospitalar e situações de jejum.'],
      ['Tecnologias','Bombas, sistemas integrados, CGM, tempo na faixa, alarmes e educação.'],
      ['Técnica de aplicação','Locais, rodízio, armazenamento, agulhas, dispositivos e lipodistrofia.'],
      ['Situações especiais','Doença aguda, corticoide, atividade física, pediatria, gestação e idosos.']
    ].map(x=>'<article class="dm-card"><div class="dm-card-icon" aria-hidden="true">◈</div><h4>'+esc(x[0])+'</h4><p>'+esc(x[1])+'</p></article>').join('') + '</div>' +
    notice('<strong>Calculadoras de insulinoterapia:</strong> dose diária total, fator de sensibilidade e relação insulina-carboidrato precisam de motor clínico específico, conferência de unidades e validação. Esta versão não gera doses individuais.',true) +
    '<div class="dm-panel"><h4>Consultar conteúdo validado</h4>' + linkbar([['Insulinas no Bulário','/trabalho/bulario/'],['Protocolo DM1',proto('diabetes mellitus tipo 1')],['Insulinoterapia',proto('insulinoterapia')],['Monitorização','/trabalho/exames/']]) + '</div>';
  const monitoring = head('Monitorização e acompanhamento','HbA1c, métricas de CGM, exames e evolução. Os lançamentos nesta tela ficam só na memória da aba e não são salvos.') +
    '<div class="dm-grid two"><div class="dm-panel"><h4>Distribuição de tempo no sensor</h4><div class="dm-form-grid">' +
    '<div class="dm-field"><label for="dm-tir">TIR (%)</label><input type="number" id="dm-tir" min="0" max="100" step="1" value="70"></div>' +
    '<div class="dm-field"><label for="dm-tar">TAR (%)</label><input type="number" id="dm-tar" min="0" max="100" step="1" value="26"></div>' +
    '<div class="dm-field"><label for="dm-tbr">TBR (%)</label><input type="number" id="dm-tbr" min="0" max="100" step="1" value="4"></div></div>' +
    '<div id="dm-cgm-result" aria-live="polite"></div><p class="dm-muted">Valores iniciais demonstrativos. TIR: tempo na faixa; TAR: acima; TBR: abaixo. As metas diferem por grupo clínico.</p></div>' +
    '<div class="dm-panel"><h4>Exames e indicadores</h4><ul class="dm-warning-list"><li>HbA1c laboratorial e possíveis interferências.</li><li>Glicemia capilar, glicemia em jejum e pós-prandial.</li><li>CGM: TIR, TAR, TBR, AGP, variabilidade e GMI.</li><li>TFGe, RAC, perfil lipídico e pressão arterial.</li><li>Exame dos pés, avaliação oftalmológica e risco cardiovascular.</li></ul><p>' + link('/trabalho/exames/','Abrir página de exames') + '</p></div></div>' +
    '<div class="dm-panel dm-paper-panel"><div class="dm-section-head"><div><h4>Diário glicêmico em papel</h4><p>O médico imprime, o paciente preenche à caneta em casa e o médico transcreve na consulta.</p></div><button type="button" id="dm-download-paper" class="dm-btn primary">Baixar PDF · 7 dias</button></div>' +
    '<p class="dm-muted">O modelo cabe em uma página A4 horizontal, com sete dias e somente os campos nome completo, data inicial e carimbo do médico. Preencher apenas nos horários orientados. O paciente não precisa acessar a LURIA.</p>' +
    '<hr class="dm-separator"><h4>Transcrição rápida pelo médico</h4><p class="dm-muted">Use a mesma sequência de colunas da folha impressa. Tab avança entre os campos. Registros temporários: a LURIA ainda não salva estes dados em prontuário.</p>' +
    '<div class="dm-paper-controls"><div class="dm-field"><label for="dm-paper-start">Primeiro dia anotado</label><input type="date" id="dm-paper-start"></div><button class="dm-btn" type="button" id="dm-create-paper-grid">Criar grade de 7 dias</button><button class="dm-btn" type="button" id="dm-export-paper-csv" disabled>Exportar CSV</button></div>' +
    '<p id="dm-paper-status" class="dm-muted" role="status" aria-live="polite"></p><div class="dm-paper-scroll" id="dm-paper-grid" role="region" tabindex="0" aria-label="Grade para transcrever glicemias capilares"></div></div>' +
    '<div class="dm-panel"><h4>Registro temporário da HbA1c</h4><div class="dm-med-picker"><div class="dm-field"><label for="dm-date">Data</label><input id="dm-date" type="date"></div><div class="dm-field"><label for="dm-observed">HbA1c (%)</label><input id="dm-observed" type="number" min="3" max="20" step="0.1" placeholder="Ex.: 8.1"></div><button class="dm-btn primary" type="button" id="dm-record">Adicionar</button></div><p class="dm-muted">Não salvar ou identificar pacientes nesta página. Os registros desaparecem ao recarregar.</p><div id="dm-history" aria-live="polite"></div></div>';
  const comp = head('Complicações e prevenção','Pontos de verificação para rastreamento e seguimento com consulta às diretrizes completas.') +
    '<div class="dm-grid two">' + [
    ['Rim','TFGe, relação albumina/creatinina, risco de progressão e prevenção cardiorrenal.','nefropatia diabética'],
    ['Retina','Avaliação oftalmológica, retinopatia, edema macular e encaminhamento.','retinopatia diabética'],
    ['Neuropatia','Sintomas, exame sensitivo, monofilamento e neuropatia autonômica.','neuropatia diabética'],
    ['Pés','Inspeção, pulsos, sensibilidade, deformidades, calçados e risco de lesão.','pé diabético'],
    ['Coração','Pressão arterial, lipídios, doença aterosclerótica, IC e risco cardiovascular.','diabetes cardiovascular'],
    ['Fígado','Doença hepática esteatótica metabólica e estratificação de fibrose.','esteatose hepática'],
    ['Prevenção','Vacinas, saúde bucal, tabagismo, atividade física, nutrição e sono.','diabetes prevenção'],
    ['Saúde mental','Sofrimento relacionado ao diabetes, adesão e apoio multiprofissional.','diabetes saúde mental']
    ].map(x=>'<article class="dm-card"><h4>'+esc(x[0])+'</h4><p>'+esc(x[1])+'</p><a class="dm-link-btn" href="'+proto(x[2])+'">Ver protocolos</a></article>').join('')+'</div>';
  const emergencies = head('Emergências hiperglicêmicas e hipoglicêmicas','Atalhos para protocolos de emergência existentes. Confirmar protocolos institucionais e exames atuais.') +
    notice('<strong>Urgência:</strong> avaliação, monitorização e tratamento são dependentes da gravidade e recursos disponíveis. Esta página não calcula insulina venosa nem reposição de potássio.',true) +
    '<div class="dm-grid two">' + [
      ['Cetoacidose diabética','Acidose, cetonemia, eletrólitos, hidratação e critérios de resolução.','cetoacidose diabética'],
      ['CAD euglicêmica','Considerar cetonemia e acidose mesmo sem hiperglicemia expressiva, especialmente em uso de iSGLT2.','cetoacidose euglicêmica'],
      ['Estado hiperosmolar','Osmolaridade, desidratação, alteração neurológica e monitorização intensiva.','estado hiperglicêmico hiperosmolar'],
      ['Hipoglicemia','Reconhecimento, classificação de gravidade, atendimento e prevenção de recorrência.','hipoglicemia']
    ].map(x=>'<article class="dm-card"><div class="dm-tag warning">Protocolo de emergência</div><h4>'+esc(x[0])+'</h4><p>'+esc(x[1])+'</p><a class="dm-link-btn" href="'+proto(x[2])+'">Abrir protocolo</a></article>').join('')+'</div>' +
    '<div class="dm-panel"><h4>Acesso rápido a outras ferramentas</h4>' + linkbar([['Fluidos e eletrólitos','/trabalho/fluidos-eletrólitos/'],['Exames','/trabalho/exames/'],['Calculadoras','/trabalho/calculadora/']]) + '</div>';
  const pregnancy = head('Diabetes e gestação','Rastreamento, tratamento e acompanhamento de diabetes gestacional e diabetes prévio à gestação.') +
    '<div class="dm-grid two">' + [
      ['Diabetes gestacional','Critérios diagnósticos, TOTG, seguimento nutricional, monitorização e cuidado obstétrico.','diabetes gestacional'],
      ['DM1/DM2 pré-gestacional','Planejamento, revisão de fármacos, controle glicêmico e vigilância materno-fetal.','diabetes pré gestacional'],
      ['Tecnologia e insulina','CGM, metas e terapia baseada em insulina conforme diretrizes da gestação.','insulina gestação'],
      ['Puerpério','Reavaliação glicêmica, seguimento e riscos metabólicos futuros.','diabetes gestacional puerpério']
    ].map(x=>'<article class="dm-card"><h4>'+esc(x[0])+'</h4><p>'+esc(x[1])+'</p><a class="dm-link-btn" href="'+proto(x[2])+'">Ver protocolos</a></article>').join('')+'</div>' +
    notice('<strong>Restrição:</strong> o simulador de HbA1c desta central não é aplicável à gestação. Metas, exames e tratamentos exigem critérios próprios.',true) +
    '<div class="dm-panel">' + linkbar([['Apostila de diabetes gestacional','/apostilas/diabetes-mellitus-gestacional/'],['Exames','/trabalho/exames/'],['Protocolos','/trabalho/protocolos/?q=diabetes%20gestacional']]) + '</div>';
  const sources = head('Referências e rastreabilidade','Prioridade às fontes brasileiras. Conteúdos de biblioteca demandam revisão periódica, sem inferir revisão automática.') +
    '<div class="dm-grid two">' + data.sources.map(s=>'<article class="dm-card dm-source"><div class="dm-tag">Fonte</div><h4>'+esc(s.title)+'</h4><p>'+esc(s.detail)+'</p><p>'+link(s.url,'Abrir fonte oficial',true)+'</p></article>').join('')+'</div>' +
    '<div class="dm-panel"><h4>Limites de evidência</h4><p class="dm-muted">Versão editorial: '+esc(data.version)+'. Faixas extraídas do apêndice de classes farmacológicas da SBD 2026. Não foram construídos modelos farmacodinâmicos de dose–resposta, combinações ou previsão individual. Fontes nacionais e bulas devem ser confrontadas antes de adoção clínica. Não há armazenamento de informações inseridas nesta página.</p></div>';
  const views = {inicio:start,simulador,farmacos:pharm,protocolos,insulina:ins,monitor:monitoring,complicacoes:comp,emergencias,gestacao:pregnancy,fontes:sources};
  root.innerHTML = '<div class="dm-hero"><div><span class="dm-eyebrow">Modo Trabalho • Central clínica</span><h2>Diabetes</h2><p>Diretrizes brasileiras, farmacologia, protocolos, insulinoterapia, monitorização e complicações — reunidos em uma página independente.</p></div><div class="dm-hero-actions"><button class="dm-btn primary" type="button" data-go="simulador">Simular HbA1c</button><button class="dm-btn" type="button" data-go="monitor">Diário glicêmico (PDF)</button><a class="dm-link-btn" href="/trabalho/">Central do Trabalho</a></div></div>' +
    '<nav class="dm-nav" role="tablist" aria-label="Seções da central Diabetes">' + tabs.map(t=>'<button type="button" role="tab" id="dm-tab-'+t[0]+'" aria-controls="dm-view-'+t[0]+'" aria-selected="false" tabindex="-1" data-tab="'+t[0]+'">'+esc(t[1])+'</button>').join('')+'</nav>' +
    tabs.map(t=>section(t[0],views[t[0]])).join('');
  const one = id => root.querySelector('#'+id);
  const setTab = id => {
    if (!views[id]) return;
    tabs.forEach(t=>{
      const yes=t[0]===id, tab=one('dm-tab-'+t[0]), view=one('dm-view-'+t[0]);
      tab.setAttribute('aria-selected',String(yes)); tab.tabIndex=yes?0:-1; view.hidden=!yes;
    });
    if (location.hash !== '#diabetes-'+id && history.replaceState) history.replaceState(null,'','#diabetes-'+id);
  };
  root.querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',()=>setTab(b.dataset.tab)));
  root.addEventListener('click',event=>{
    const btn=event.target.closest('[data-go]');
    if (!btn) return;
    setTab(btn.dataset.go);
    one('dm-tab-'+btn.dataset.go).focus();
  });
  const nav=root.querySelector('.dm-nav');
  nav.addEventListener('keydown',e=>{
    if (!['ArrowRight','ArrowLeft','Home','End'].includes(e.key)) return;
    e.preventDefault();
    const current=tabs.findIndex(t=>one('dm-tab-'+t[0]).getAttribute('aria-selected')==='true');
    let next=e.key==='Home'?0:e.key==='End'?tabs.length-1:(current+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;
    setTab(tabs[next][0]);one('dm-tab-'+tabs[next][0]).focus();
  });
  const idFromHash=location.hash.replace(/^#diabetes-/, '');
  setTab(views[idFromHash]?idFromHash:'inicio');
  const medOptions=data.drugs.map(d=>'<option value="'+esc(d.id)+'">'+esc(d.name)+' · '+esc(d.cls)+'</option>').join('');
  const drugSelect=one('dm-drug'), doseSelect=one('dm-dose');
  drugSelect.innerHTML=medOptions;
  const getDrug=id=>data.drugs.find(d=>d.id===id);
  const updateDoses=()=>{
    const d=getDrug(drugSelect.value);
    doseSelect.innerHTML=(d?.doses||[]).map(v=>'<option value="'+esc(v)+'">'+esc(v)+'</option>').join('');
  };
  drugSelect.addEventListener('change',updateDoses);updateDoses();
  const selected=[];
  const hba=one('dm-hba'),goal=one('dm-goal'),egfr=one('dm-egfr');
  const effect=d=>d.eff?fmt(d.eff[0])+' a '+fmt(d.eff[1])+' p.p.':'Não estimada';
  const warningList=()=>{
    const warnings=[];
    const classes=selected.map(m=>m.drug.cls);
    if (classes.length!==new Set(classes).size) warnings.push('Há mais de um medicamento da mesma classe: conferir duplicação terapêutica.');
    if(classes.includes('iDPP-4')&&(classes.includes('AR GLP-1')||classes.includes('GIP/GLP-1'))) warnings.push('Associação de iDPP-4 com agonistas GLP-1 ou tirzepatida: geralmente não recomendada.');
    if(classes.includes('AR GLP-1')&&classes.includes('GIP/GLP-1'))warnings.push('Não associar agonista GLP-1 e tirzepatida.');
    if(classes.includes('Sulfonilureia')&&(classes.includes('Insulina basal')||classes.includes('Insulina prandial'))) warnings.push('Sulfonilureia com insulina pode aumentar o risco de hipoglicemia.');
    if(selected.some(m=>m.drug.cls==='iSGLT2'))warnings.push('iSGLT2: revisar função renal, risco de infecção geniturinária e cetoacidose euglicêmica.');
    const renal=Number(egfr.value);
    if(egfr.value!=='' && Number.isFinite(renal)){
      if(renal<30 && selected.some(m=>m.drug.cls==='Biguanida'))warnings.push('Metformina com TFGe inferior a 30: uso contraindicado nas diretrizes citadas.');
      if(renal<60 && selected.some(m=>m.drug.cls==='iSGLT2'))warnings.push('TFGe reduzida: eficácia glicêmica dos iSGLT2 pode ser menor; a indicação cardiorrenal segue critérios próprios.');
    }
    return warnings;
  };
  const redraw=()=>{
    const current=Number(hba.value),target=Number(goal.value),renal=Number(egfr.value);
    one('dm-selected').innerHTML = selected.length?
      selected.map((m,i)=>'<div class="dm-selected-item"><div><strong>'+esc(m.drug.name)+'</strong><small>'+esc(m.drug.cls)+' · '+esc(m.dose)+'</small></div><button class="dm-remove" type="button" data-remove="'+i+'" aria-label="Remover '+esc(m.drug.name)+'">Remover</button></div>').join('') :
      '<div class="dm-empty">Nenhum medicamento selecionado. Adicione um fármaco para ver suas características.</div>';
    const good = hba.value!=='' && goal.value!=='' && egfr.value!=='' && Number.isFinite(current)&&Number.isFinite(target)&&Number.isFinite(renal)&&current>=4&&current<=20&&target>=4&&target<=12&&renal>=0&&renal<=180;
    const metrics = good?'<div class="dm-metric-grid"><div class="dm-metric"><span>HbA1c inicial</span><strong>'+fmt(current)+'%</strong></div><div class="dm-metric"><span>Meta didática</span><strong>'+fmt(target)+'%</strong></div><div class="dm-metric"><span>Redução necessária</span><strong>'+fmt(Math.max(0,current-target))+' p.p.</strong></div></div>':'<div class="dm-empty">Preencha HbA1c, meta e TFGe com números válidos.</div>';
    const alerts=warningList();
    const profile=selected.length?'<div class="dm-panel"><h4>Perfis de eficácia e segurança (sem soma)</h4><table class="dm-table"><thead><tr><th>Medicamento</th><th>Referência HbA1c</th><th>Peso</th><th>Hipoglicemia</th></tr></thead><tbody>'+selected.map(m=>'<tr><td>'+esc(m.drug.name)+'<br><small>'+esc(m.dose)+'</small></td><td>'+effect(m.drug)+'</td><td>'+esc(m.drug.weight)+'</td><td>'+esc(m.drug.hypo)+'</td></tr>').join('')+'</tbody></table></div>':'';
    let prediction='';
    const single=selected.length===1?selected[0]:null;
    if (!good)prediction='<div class="dm-empty">Não é possível avaliar dados inválidos ou ausentes.</div>';
    else if (!single)prediction='<div class="dm-empty">'+(selected.length?'Combinação selecionada: sem modelo de eficácia conjunta validado; nenhuma subtração de HbA1c será exibida.':'Selecione um medicamento para visualizar uma faixa educacional.')+'</div>';
    else if(current<6.5||current>12||renal<60)prediction='<div class="dm-empty">Sem previsão numérica: HbA1c inicial fora do intervalo ilustrativo de 6,5–12% ou TFGe inferior a 60. Consulte a diretriz.</div>';
    else if(!single.drug.eff || (single.drug.starter||[]).includes(single.dose))prediction='<div class="dm-empty">Sem faixa numérica fundamentada para esta seleção. As doses iniciais de titulação não têm eficácia equivalente à dose de manutenção.</div>';
    else {
      const min=Math.max(3.5,current-single.drug.eff[1]);
      const max=Math.max(3.5,current-single.drug.eff[0]);
      prediction='<div class="dm-callout"><p class="dm-result-key">HbA1c ilustrativa: '+fmt(min)+'–'+fmt(max)+'%</p><p class="dm-muted">Redução populacional da classe: '+effect(single.drug)+'. Subtração meramente demonstrativa da HbA1c inicial, <strong>não</strong> previsão individual, nem estimativa específica para '+esc(single.dose)+'.</p></div>';
    }
    const warns=alerts.length?'<div class="dm-callout"><strong>Alertas para revisão</strong><ul class="dm-warning-list">'+alerts.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul></div>':'';
    one('dm-result').innerHTML=metrics+prediction+warns+profile+'<p class="dm-muted">Fontes: '+link(source,'SBD 2026 — apêndice farmacológico',true)+'. Não utilizar como calculadora de prescrição.</p>';
  };
  one('dm-add').addEventListener('click',()=>{
    const d=getDrug(drugSelect.value);
    if(!d||selected.length>=8)return;
    const existing=selected.findIndex(m=>m.drug.id===d.id);
    if(existing>=0)selected[existing].dose=doseSelect.value;
    else selected.push({drug:d,dose:doseSelect.value});
    redraw();
  });
  one('dm-selected').addEventListener('click',event=>{
    const b=event.target.closest('[data-remove]');
    if(!b)return;
    const i=Number(b.dataset.remove);
    if(Number.isInteger(i)&&i>=0&&i<selected.length)selected.splice(i,1);
    redraw();
  });
  [hba,goal,egfr].forEach(el=>el.addEventListener('input',redraw));
  redraw();
  const pharmList=one('dm-pharm-list');
  const renderPharm=()=>{
    const term=one('dm-pharm-search').value.toLocaleLowerCase('pt-BR').trim();
    const meds=data.drugs.filter(d=>(d.name+' '+d.cls+' '+d.notes).toLocaleLowerCase('pt-BR').includes(term));
    one('dm-pharm-count').textContent=meds.length+' medicamentos ou apresentações de referência';
    pharmList.innerHTML=meds.map(d=>'<article class="dm-pharm-card"><div class="dm-row wrap"><h4>'+esc(d.name)+'</h4><span class="dm-tag">'+esc(d.cls)+'</span></div><p>'+esc(d.notes)+'</p><dl><dt>Doses</dt><dd>'+esc(d.doses.join(' • '))+'</dd><dt>HbA1c (classe)</dt><dd>'+effect(d)+'</dd><dt>Peso</dt><dd>'+esc(d.weight)+'</dd><dt>Hipoglicemia</dt><dd>'+esc(d.hypo)+'</dd>'+(d.renal?'<dt>Função renal</dt><dd>'+esc(d.renal)+'</dd>':'')+'</dl><div class="dm-row wrap"><a href="/trabalho/bulario/" class="dm-link-btn">Conferir no Bulário</a><a href="'+esc(d.source)+'" target="_blank" rel="noopener noreferrer" class="dm-link-btn">Evidência</a></div></article>').join('')||'<div class="dm-empty">Nenhum medicamento localizado.</div>';
  };
  one('dm-pharm-search').addEventListener('input',renderPharm);renderPharm();
  const areaSelect=one('dm-topic-area');
  [...new Set(data.topics.map(t=>t.group))].sort((a,b)=>a.localeCompare(b,'pt-BR')).forEach(x=>{
    const option=document.createElement('option');option.value=x;option.textContent=x;areaSelect.append(option);
  });
  const renderTopics=()=>{
    const term=one('dm-topic-search').value.toLocaleLowerCase('pt-BR').trim(),area=areaSelect.value;
    const items=data.topics.filter(t=>(!area||t.group===area)&&(t.title+' '+t.group+' '+t.desc).toLocaleLowerCase('pt-BR').includes(term));
    one('dm-topic-count').textContent=items.length+' assuntos disponíveis para consulta';
    one('dm-topics').innerHTML=items.map(t=>'<article class="dm-topic"><span class="dm-tag">'+esc(t.group)+'</span><h4>'+esc(t.title)+'</h4><p>'+esc(t.desc)+'</p><a href="'+proto(t.q)+'">Buscar no banco de protocolos</a></article>').join('')||'<div class="dm-empty">Nenhum assunto encontrado.</div>';
  };
  areaSelect.addEventListener('change',renderTopics);
  one('dm-topic-search').addEventListener('input',renderTopics);renderTopics();
  const cgm=()=>{
    const x=['dm-tir','dm-tar','dm-tbr'].map(id=>one(id).value.trim());
    const nums=x.map(Number);
    const valid=x.every(v=>v!=='')&&nums.every(v=>Number.isFinite(v)&&v>=0&&v<=100);
    const target=one('dm-cgm-result');
    if (!valid||Math.abs(nums.reduce((a,b)=>a+b,0)-100)>0.01){target.innerHTML='<p class="dm-empty">Informe três percentuais entre 0 e 100 cuja soma seja exatamente 100%.</p>';return;}
    target.innerHTML='<div class="dm-cgm-bar" role="img" aria-label="Tempo na faixa '+nums[0]+'%, tempo acima '+nums[1]+'%, tempo abaixo '+nums[2]+'%"><span style="width:'+nums[0]+'%;background:#19976d"></span><span style="width:'+nums[1]+'%;background:#db9b32"></span><span style="width:'+nums[2]+'%;background:#c65058"></span></div><p class="dm-muted">TIR: '+nums[0]+'% • TAR: '+nums[1]+'% • TBR: '+nums[2]+'%</p><p class="dm-muted">O sistema apenas representa os números informados; não infere controle nem orienta ajuste de medicação.</p>';
  };
  ['dm-tir','dm-tar','dm-tbr'].forEach(id=>one(id).addEventListener('input',cgm));cgm();
  const historyEntries=[];
  const renderHistory=()=>{
    const target=one('dm-history');
    target.innerHTML=historyEntries.length?
      '<table class="dm-table"><thead><tr><th>Data</th><th>HbA1c</th></tr></thead><tbody>'+historyEntries.sort((a,b)=>a.date.localeCompare(b.date)).map(r=>'<tr><td>'+esc(r.date.split('-').reverse().join('/'))+'</td><td>'+fmt(r.value)+'%</td></tr>').join('')+'</tbody></table>':
      '<div class="dm-empty">Nenhum resultado registrado nesta sessão.</div>';
  };
  one('dm-record').addEventListener('click',()=>{
    const date=one('dm-date').value, raw=one('dm-observed').value, value=Number(raw);
    if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||raw===''||!Number.isFinite(value)||value<3||value>20){one('dm-history').innerHTML='<div class="dm-empty">Informe data e HbA1c válida entre 3% e 20%.</div>';return;}
    historyEntries.push({date,value});
    one('dm-observed').value='';
    renderHistory();
  });
  renderHistory();
})();