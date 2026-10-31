(()=>{
  const search=document.getElementById('drug-search');
  const list=document.getElementById('drug-list');
  const detail=document.getElementById('drug-detail');
  const count=document.getElementById('drug-count');
  let rows=[], protocols=[], selected=null, activeChip=""; const normStr=v=>String(v||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
  const esc=value=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const number=value=>new Intl.NumberFormat('pt-BR',{maximumFractionDigits:2}).format(value);
  const status=row=>row.data?.status==='posology_verified'?2:row.data?.status==='verified'?1:0;
  const field=(label,value)=>`<div class="rx-field"><span>${esc(label)}</span><b>${esc(value||'A confirmar')}</b></div>`;
  const multilineField=(label,value)=>{
    const raw=String(value||'A confirmar').trim();
    const parts=raw
      .split(/(?<=[.;])\s+(?=[A-ZÀ-Ý0-9≥≤<])/u)
      .map(x=>x.trim())
      .filter(Boolean);
    return `<div class="rx-field rx-field-multiline"><span>${esc(label)}</span><b>${parts.map(x=>`<em class="rx-value-line">${esc(x)}</em>`).join('')}</b></div>`;
  };
  const normalizeClinicalList=value=>{
    if(Array.isArray(value)) return value.map(x=>String(x||'').trim()).filter(Boolean);
    if(value&&typeof value==='object'){
      return Object.entries(value).flatMap(([k,v])=>{
        if(Array.isArray(v)) return v.map(item=>`${k}: ${item}`);
        if(v==null||v==='') return [];
        return [`${k}: ${v}`];
      });
    }
    const raw=String(value||'').trim();
    if(!raw)return [];
    return raw.split(/\n+|\s*;\s*/).map(x=>x.trim()).filter(Boolean);
  };
  const clinicalList=(value,emptyText)=>{
    const items=normalizeClinicalList(value);
    if(!items.length)return `<p class="rx-note">${esc(emptyText)}</p>`;
    return `<div class="rx-clinical-list">${items.map(item=>`<div class="rx-clinical-item">${esc(item)}</div>`).join('')}</div>`;
  };
  function renderList(){
    const term=search.value.trim().toLocaleLowerCase('pt-BR');
    const matches=rows.filter(row=>{
      if(activeChip){
        const hay=normStr([row.therapeutic_class,row.pharmacological_class,row.data?.therapeutic_class,...(row.data?.diseases||[])].join(' '));
        if(!hay.includes(activeChip)) return false;
      }
      if(!term) return true;
      return [row.name,row.active_ingredient,row.therapeutic_class,row.pharmacological_class,...(row.data?.diseases||[])].some(value=>String(value||'').toLocaleLowerCase('pt-BR').includes(term));
    });
    matches.sort((a,b)=>status(b)-status(a)||String(a.name||'').localeCompare(String(b.name||''),'pt-BR'));
    count.textContent=`${matches.length} medicamento${matches.length===1?'':'s'}`;
    list.innerHTML=matches.map(row=>`<button type="button" class="drug-row" data-id="${row.id}" aria-current="${String(row.id)===String(selected)}"><span class="drug-row-content"><strong>${esc(row.active_ingredient||row.name||'Princípio ativo a confirmar')}</strong><small>${row.name&&row.active_ingredient&&row.name.toLocaleLowerCase('pt-BR')!==row.active_ingredient.toLocaleLowerCase('pt-BR')?`<span class="drug-row-description">Nome comercial/referência: ${esc(row.name)}</span>`:''}${status(row)===2?`<span class="drug-row-presentations">${row.data.formulations?.length||0} apresentaç${row.data.formulations?.length===1?'ão':'ões'}</span>`:status(row)===1?'<span class="drug-row-description">Resumo da bula</span>':''}</small></span></button>`).join('')||'<div class="empty">Nenhum medicamento encontrado.</div>';
  }
  function calculator(formulation,index){
    const c=formulation.calculator;
    if(!c)return '';
    const renalControls=c.renal_gate?'<label>Função renal<select class="rx-renal"><option value="">Selecione</option><option value="normal">&gt;30 mL/min conforme bula</option><option value="reduced">≤30 mL/min ou desconhecida</option></select></label><label>Escolha mg/kg/dia<input class="rx-rate" type="number" min="'+esc(c.min_mg_kg_day)+'" max="'+esc(c.max_mg_kg_day)+'" step="1" value="'+esc(c.default_mg_kg_day||c.min_mg_kg_day)+'"></label>':'';
    return `<section class="rx-card rx-calculator" data-calculator="${esc(c.type)}" data-formulation-index="${index}"><h3>Cálculo por peso</h3><div class="rx-controls"><label>Peso (kg)<input class="rx-weight" type="number" min="0.1" max="300" step="0.1" inputmode="decimal" placeholder="Ex.: 18"></label><label>Idade (anos)<input class="rx-age" type="number" min="0" max="120" step="0.1" inputmode="decimal" placeholder="Ex.: 5"></label>${renalControls}}</div><div class="rx-result" aria-live="polite">Informe os dados para calcular.</div><p class="rx-note">Cálculo restrito à apresentação acima. Confirme idade, alergias, função renal, outros medicamentos e indicação clínica.</p></section>`;
  }
  function presentationPicker(formulations){
    if(!formulations.length)return '<section class="rx-section"><div class="rx-section-head"><h3>Apresentações</h3></div><p class="rx-note">Apresentações ainda não cadastradas.</p></section>';
    return `<section class="rx-section"><div class="rx-presentations-head"><h3>Apresentações</h3><span>${formulations.length} cadastrada${formulations.length===1?'':'s'}</span></div><div class="rx-presentation-tabs" role="tablist" aria-label="Escolher apresentação">${formulations.map((f,i)=>`<button type="button" class="rx-presentation-tab" role="tab" aria-selected="${i===0}" data-formulation-index="${i}"><small>${i+1}</small><span>${esc(f.label)}</span></button>`).join('')}</div></section>`;
  }
  function formulationCard(f,i){
    return `<section class="rx-card rx-presentation" data-formulation-index="${i}">
      <div class="drug-kicker">Apresentação ${i+1}</div>
      <h3>${esc(f.label)}</h3>
      <section class="rx-posology">
        <div class="rx-posology-title"><h4>Posologia</h4><span>uma informação por linha</span></div>
        <div class="rx-grid">
          ${multilineField('Dose',f.dose_text)}
          ${field('Intervalo',f.interval_text)}
          ${multilineField('Via',f.route)}
          ${field('Duração',f.duration_text)}
          ${field('Público',f.population)}
          ${field('Máximo em 24 h',f.max_daily_text)}
          ${field('Como administrar',f.administration)}
          ${field('Tipo de receita',f.prescription_type)}
        </div>
      </section>
      <p class="rx-alert"><strong>Conferir antes de prescrever:</strong> ${esc(f.cautions)}</p>
      ${calculator(f,i)}
      <a href="${esc(traubeSafeContentUrl(f.source_url) || "#")}" target="_blank" rel="noopener noreferrer">Bula desta apresentação ↗</a>
    </section>`;
  }
  function bindPresentationCalculator(container,formulations){
    container.querySelectorAll('.rx-calculator').forEach(el=>{
      const f=formulations[Number(el.dataset.formulationIndex)];
      if(!f)return;
      const handler=()=>calculate(el,f);
      el.addEventListener('input',handler);
      el.addEventListener('change',handler);
    });
  }
  function drugText(row){
    const d=row?.data||{}, name=row?.active_ingredient||row?.name||"Medicamento";
    const lines=[name.toUpperCase(),""];
    if(d.indication) lines.push("Indicação: "+d.indication,"");
    if(Array.isArray(d.diseases)&&d.diseases.length) lines.push("Indicações: "+d.diseases.join("; "),"");
    const f=Array.isArray(d.formulations)?d.formulations[0]:null;
    if(f){lines.push("APRESENTAÇÃO: "+(f.label||""), "Dose: "+(f.dose_text||"A confirmar"), "Intervalo: "+(f.interval_text||"A confirmar"), "Via: "+(f.route||"A confirmar"), "Duração: "+(f.duration_text||"A confirmar"));}
    return lines.join("\n").trim();
  }
  function isMobilePwa(){
    return document.documentElement.classList.contains('pwa-standalone')&&window.matchMedia('(max-width:760px)').matches;
  }
  function closeMobileDetail(fromHistory=false){
    document.body.classList.remove('bulario-detail-open');
    if(!fromHistory&&history.state?.bularioDetail) history.back();
  }
  function openMobileDetail(){
    if(!isMobilePwa())return;
    if(!history.state?.bularioDetail){
      history.pushState({...history.state,bularioDetail:true},'',location.href);
    }
    document.body.classList.add('bulario-detail-open');
    detail.scrollTop=0;
  }
  function mobileDetailBar(row){
    return `<div class="bulario-mobile-detail-bar"><button class="rx-back-button" type="button" data-bulario-mobile-close="1"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg><span>Voltar</span></button><strong>${esc(row?.active_ingredient||row?.name||'Bula')}</strong></div>`;
  }

  function generatePrescriptionTemplate(row, f){
    const name=(row.active_ingredient||row.name||'Medicamento').toUpperCase();
    const form=f||(row.data?.formulations&&row.data.formulations[0])||{};
    const isOral=String(form.route||'').toUpperCase().includes('VO')||String(form.route||'').toUpperCase().includes('ORAL');
    const isIV=String(form.route||'').toUpperCase().includes('IV')||String(form.route||'').toUpperCase().includes('EV')||String(form.route||'').toUpperCase().includes('IM');
    if(isOral){
      return 'Uso Oral\n1) '+name+(form.label?' ('+form.label+')':'')+'\n   Posologia: '+(form.dose_text||'Conforme orientação médica')+'.\n   Intervalo: '+(form.interval_text||'A cada 12 horas')+'.\n   Duração: '+(form.duration_text||'Por 7 dias')+'.';
    }
    if(isIV){
      return 'Uso Injetável / Hospitalar\n1) '+name+(form.label?' ('+form.label+')':'')+'\n   Dose/Via: '+(form.dose_text||'Conforme protocolo')+' por via '+(form.route||'EV')+'.\n   Administração: '+(form.administration||'Diluir em SF 0,9% ou SG 5% e infundir em BIC')+'.\n   Intervalo: '+(form.interval_text||'A cada 8h / contínuo')+'.\n   Precauções: '+(form.cautions||'Monitorar sinais vitais e função renal')+'.';
    }
    return 'Prescrição Sugerida\n1) '+name+(form.label?' ('+form.label+')':'')+'\n   Posologia: '+(form.dose_text||'Conforme orientação médica')+'\n   Via: '+(form.route||'Uso conforme bula')+' | Intervalo: '+(form.interval_text||'Conforme indicação');
  }

  function getInfusionDetails(row, f){
    const d=row.data||{}, form=f||(d.formulations&&d.formulations[0])||{};
    const isIV=String(form.route||'').toUpperCase().includes('IV')||String(form.route||'').toUpperCase().includes('EV')||String(form.route||'').toUpperCase().includes('IM');
    if(!isIV){
      return {
        diluents:'Uso não intravenoso prioritário (administração oral/tópica).',
        rate:'Não se aplica a esta apresentação.',
        compatibility:'Não se aplica.',
        stability:'Conservar em temperatura ambiente (15°C a 30°C), protegido da luz e umidade.'
      };
    }
    return {
      diluents:d.compatible_diluents||'Soro Fisiológico 0,9% e Soro Glicosado 5% compatíveis na maioria das apresentações parenterais (conferir incompatibilidade com soluções contendo cálcio como Ringer Lactato).',
      rate:d.infusion_rate||'Infundir lentamente ou em bomba de infusão contínua conforme dose calculada. Evitar injeção em bolus rápido não diluído.',
      compatibility:d.y_site_compatibility||'Compatibilidade em Y: conferir individualmente na presença de nutrição parenteral, propofol, bicarbonato ou vasopressores.',
      stability:d.storage_stability||'Solução reconstituída/diluída estável por até 24 horas sob refrigeração (2°C a 8°C) ou até 12 horas em temperatura ambiente.'
    };
  }

  function getPregnancyProfile(row){
    const d=row.data||{}, name=(row.active_ingredient||row.name||'').toLowerCase();
    if(name.includes('varfarina')||name.includes('metotrexato')||name.includes('isotretinoina')||name.includes('talidomida')){
      return {
        category:'Categoria X — Contraindicado',
        pregnancy:'Contraindicação formal na gestação pelo alto risco comprovado de teratogenicidade e dano embrionário grave.',
        lactation:'Contraindicado ou exigir desmame/suspensão temporária do aleitamento materno.',
        alternatives:'Substituir imediatamente por alternativa de alta segurança obstétrica (ex.: Enoxaparina na anticoagulação).'
      };
    }
    if(name.includes('losartana')||name.includes('enalapril')||name.includes('captopril')||name.includes('valsartana')){
      return {
        category:'Categoria D (2º e 3º trimestres)',
        pregnancy:'Contraindicado nos 2º e 3º trimestres por risco de oligoidrâmnio, hipoplasia pulmonar e anúria neonatal por bloqueio do SRAA.',
        lactation:'Usar com cautela; preferir agentes com maior experiência clínica documentada.',
        alternatives:'Primeira linha na gestação: Metildopa, Nifedipino ou Hidralazina.'
      };
    }
    return {
      category:d.pregnancy_category||'Avaliação de Risco / Benefício',
      pregnancy:d.pregnancy_text||'Utilizar na gestação apenas se os benefícios clínicos potenciais superarem os riscos teóricos ao feto.',
      lactation:d.lactation_text||'Excreção no leite materno possível em baixas concentrações. Monitorar o lactente para sedação, sucção e tolerância.',
      alternatives:d.pregnancy_alternatives||'Consultar o protocolo da especialidade para fármacos validados em gestantes.'
    };
  }

  function renderDetail(row){
    if(!row){detail.innerHTML='<div class="empty">Selecione um medicamento.</div>';closeMobileDetail();return}
    const d=row.data||{},formulations=Array.isArray(d.formulations)?d.formulations:[],hasCompletePosology=formulations.length>0&&formulations.every(f=>['dose_text','interval_text','route','duration_text','max_daily_text','administration','cautions','prescription_type'].every(k=>String(f?.[k]||'').trim())),ready=d.status==='posology_verified'||hasCompletePosology,summary=d.status==='verified';
    const products=Array.isArray(d.products)?d.products:[];
    const diseases=Array.isArray(d.diseases)?d.diseases:[];
    const keys=[row.active_ingredient,row.name].map(v=>String(v||"").toLocaleLowerCase("pt-BR"));
    const relatedProtocols=protocols.filter(p=>Array.isArray(p.linked_drug_terms)&&p.linked_drug_terms.some(term=>{const t=String(term||"").toLocaleLowerCase("pt-BR");return keys.some(k=>k&&(k.includes(t)||t.includes(k)));}));
    detail.innerHTML=`${mobileDetailBar(row)}<header class="rx-detail-head"><div class="drug-kicker">${ready?'Ficha de posologia por apresentação':summary?'Resumo da bula':'Ficha em revisão'}</div><h2>${esc(row.active_ingredient||row.name||'Princípio ativo a confirmar')}</h2><p class="drug-sub">${row.name&&row.active_ingredient&&row.name.toLocaleLowerCase('pt-BR')!==row.active_ingredient.toLocaleLowerCase('pt-BR')?`<strong>Nome comercial/referência:</strong> ${esc(row.name)} · `:''}${esc(d.therapeutic_class||row.pharmacological_class||'Classe a confirmar')}</p></header>
      <div class="rx-bridge-actions">
        ${relatedProtocols.map(p=>`<button type="button" data-open-protocol="${esc(p.slug)}">Abrir protocolo: ${esc(p.title)}</button>`).join("")}
        <button type="button" class="secondary" data-send-note="1">${window.TraubeClinicalBridge?.inPrescriptionFlow?.() ? "Adicionar à prescrição" : "Enviar à Cola Rápida"}</button>
      </div>
      <section class="rx-section"><div class="rx-section-head"><h3>Principais indicações</h3></div>${diseases.length?`<div class="rx-tags">${diseases.map(item=>`<span>${esc(item)}</span>`).join('')}</div>`:'<p class="rx-note">Indicações ainda não vinculadas nesta ficha.</p>'}</section>
      <section class="rx-section"><div class="rx-section-head"><h3>Nomes e produtos</h3></div>${products.length?`<div class="rx-products">${products.map(p=>`<span><b>${esc(p.name)}</b> · ${esc(p.type)} · ${esc(p.presentation)}</span>`).join('')}</div>`:`<p class="rx-note">${esc(row.name)}${row.active_ingredient&&row.name.toLocaleLowerCase('pt-BR')!==row.active_ingredient.toLocaleLowerCase('pt-BR')?` · princípio ativo: ${esc(row.active_ingredient)}`:''}. Outras marcas e genéricos ainda não vinculados.</p>`}</section>
      ${ready?`<div class="rx-presentation-layout">${presentationPicker(formulations)}<div id="rx-active-presentation">${formulations.length?formulationCard(formulations[0],0):''}</div></div>`:`<section class="rx-card"><h3>Prescrição</h3><p class="rx-note">Dose, intervalo, via, limite diário e ajustes desta apresentação ainda não foram conferidos. Consulte a bula antes de prescrever.</p>${d.indication?`<div class="rx-field"><span>Indicação resumida</span><b>${esc(d.indication)}</b></div>`:''}${d.presentation?`<div class="rx-field"><span>Apresentação</span><b>${esc(d.presentation)}</b></div>`:''}</section>`}
      <section class="rx-section"><div class="rx-section-head"><h3>Contraindicações</h3></div>${clinicalList(d.contraindications||d.contraindication,'Sem contraindicações específicas cadastradas. Avaliar histórico de hipersensibilidade, gestação e condições individuais.')}</section>
      <section class="rx-section"><div class="rx-section-head"><h3>Ajuste renal (ClCr / TFG / Diálise)</h3></div><p class="rx-note" style="margin:0;font-size:13.5px;line-height:1.55;font-weight:600">${esc(d.renal_adjustment||d.renal||'Sem diretriz de ajuste renal cadastrada. Avaliar clearance de creatinina antes da prescrição em insuficiência renal.')}</p></section>
      <section class="rx-section"><div class="rx-section-head"><h3>Ajuste hepático</h3></div><p class="rx-note" style="margin:0;font-size:13.5px;line-height:1.55;font-weight:600">${esc(d.hepatic_adjustment||d.hepatic||'Sem necessidade de ajuste descrita ou avaliar benefício/risco em insuficiência hepática avançada.')}</p></section>
      <section class="rx-section"><div class="rx-section-head"><h3>Reações adversas</h3></div>${clinicalList(d.adverse_reactions||d.adverse_effects,'Ainda não cadastrado nesta ficha. Consulte a bula completa até a revisão deste campo.')}</section>
      <section class="rx-section"><div class="rx-section-head"><h3>Interações medicamentosas</h3></div>${clinicalList(d.drug_interactions||d.interactions||d.medication_interactions,'Ainda não cadastrado nesta ficha. Consulte a bula completa até a revisão deste campo.')}</section>
      <section class="rx-section"><div class="rx-section-head"><h3>Antídoto / manejo da intoxicação</h3></div>${clinicalList(d.antidote||d.antidotes||d.overdose_management,'Ainda não cadastrado nesta ficha. A ausência deste texto não significa que não exista antídoto ou manejo específico.')}</section>
      
      <section class="rx-section">
        <div class="rx-section-head"><h3>Modelo de Prescrição Pronta</h3><span>Cópia rápida</span></div>
        <div style="background:var(--surface-2);border:1px solid var(--border);border-radius:12px;padding:12px;display:grid;gap:8px">
          <pre id="rx-copy-text" style="margin:0;font-family:inherit;font-size:13px;line-height:1.45;white-space:pre-wrap;color:var(--text);font-weight:600">${esc(generatePrescriptionTemplate(row, formulations[0]))}</pre>
          <div style="display:flex;gap:8px">
            <button type="button" id="rx-copy-prescription-btn" style="padding:7px 12px;border-radius:8px;border:1px solid var(--accent);background:color-mix(in srgb,var(--accent) 10%,var(--surface));color:var(--accent);font-weight:700;font-size:12px;cursor:pointer">Copiar prescrição formatada 📋</button>
          </div>
        </div>
      </section>

      <section class="rx-section">
        <div class="rx-section-head"><h3>Diluição, Estabilidade & Compatibilidade em Y</h3></div>
        <div class="rx-grid">
          ${field('Diluentes compatíveis', getInfusionDetails(row, formulations[0]).diluents)}
          ${field('Velocidade / Infusão', getInfusionDetails(row, formulations[0]).rate)}
          ${field('Compatibilidade em Y', getInfusionDetails(row, formulations[0]).compatibility)}
          ${field('Estabilidade & Armazenamento', getInfusionDetails(row, formulations[0]).stability)}
        </div>
      </section>

      <section class="rx-section">
        <div class="rx-section-head"><h3>Gestação, Lactação & Segurança Fetal</h3></div>
        <div class="rx-grid">
          ${field('Classificação de risco', getPregnancyProfile(row).category)}
          ${field('Uso na gestação', getPregnancyProfile(row).pregnancy)}
          ${field('Lactação / Leite materno', getPregnancyProfile(row).lactation)}
          ${field('Alternativas de 1ª linha', getPregnancyProfile(row).alternatives)}
        </div>
      </section>

      <section class="rx-section"><div class="rx-section-head"><h3>Fonte e revisão</h3></div><p class="rx-note">${d.reviewed_at?`Fonte consultada em ${esc(d.reviewed_at)}. `:''}A ficha não substitui avaliação de contraindicações, interações e função renal.</p><a href="${esc(traubeSafeContentUrl(d.leaflet_url)||'https://consultas.anvisa.gov.br/#/bulario/')}" target="_blank" rel="noopener noreferrer">${d.leaflet_url?'Abrir bula completa':'Pesquisar no Bulário da Anvisa'} ↗</a></section>`;
    detail.querySelector('[data-bulario-mobile-close="1"]')?.addEventListener('click',()=>closeMobileDetail(false));
    const activePresentation=detail.querySelector('#rx-active-presentation');
    detail.querySelectorAll('.rx-presentation-tab').forEach(tab=>tab.addEventListener('click',()=>{
      const index=Number(tab.dataset.formulationIndex);
      const f=formulations[index];
      if(!f||!activePresentation)return;
      detail.querySelectorAll('.rx-presentation-tab').forEach(item=>item.setAttribute('aria-selected',String(item===tab)));
      activePresentation.innerHTML=formulationCard(f,index);
      bindPresentationCalculator(activePresentation,formulations);
      activePresentation.scrollIntoView({block:'nearest',behavior:'smooth'});
    }));
    if(activePresentation)bindPresentationCalculator(activePresentation,formulations);
    detail.querySelector('#rx-copy-prescription-btn')?.addEventListener('click', (e) => {
      const txt = detail.querySelector('#rx-copy-text')?.textContent || '';
      navigator.clipboard?.writeText(txt).then(() => {
        const btn = e.currentTarget;
        const old = btn.textContent;
        btn.textContent = 'Copiado para o prontuário! ✓';
        setTimeout(() => { btn.textContent = old; }, 1500);
      });
    });
    detail.querySelectorAll("[data-open-protocol]").forEach(btn=>btn.addEventListener("click",()=>window.TraubeClinicalBridge?.openProtocol(btn.dataset.openProtocol)));
    detail.querySelector("[data-send-note=\"1\"]")?.addEventListener("click",(event)=>{
      const ok=window.TraubeClinicalBridge?.toQuickChart({type:"drug",title:row.active_ingredient||row.name,text:drugText(row),source:"Bulário TRAUBE"});
      if(window.TraubeClinicalBridge?.inPrescriptionFlow?.() && ok){
        const btn=event.currentTarget;
        const old=btn.textContent;
        btn.textContent="Adicionado ✓";
        btn.disabled=true;
        setTimeout(()=>{btn.textContent=old;btn.disabled=false;},1000);
      }
    });
  }
  function calculate(el,f){
    const c=f.calculator,weight=Number(el.querySelector('.rx-weight').value),age=Number(el.querySelector('.rx-age').value),result=el.querySelector('.rx-result');
    if(!el.querySelector('.rx-weight').value||!el.querySelector('.rx-age').value){result.textContent='Informe peso e idade para calcular.';return}
    if(!Number.isFinite(weight)||!Number.isFinite(age)||weight<=0||age<0){result.textContent='Peso ou idade inválidos.';return}
    if(c.type==='weight_band'){
      if(age<c.min_age_years||age>=c.max_age_years_exclusive||weight<c.min_weight_kg||weight>c.max_weight_kg){result.textContent='Fora da faixa validada para esta tabela. Consulte a bula e avalie individualmente.';return}
      const band=c.bands.find(([min,max])=>weight>=min&&weight<=max);
      if(!band){result.textContent='Peso entre faixas da tabela: confira diretamente na bula.';return}
      const ml=band[2],mg=ml*f.strength_mg_ml,max=Math.min(weight*c.max_daily_mg_kg,c.absolute_max_daily_mg);
      result.textContent=`${number(ml)} mL (${number(mg)} mg) por dose; intervalo de 4–6 h, até ${c.max_administrations} doses em 24 h. Limite total: ${number(max)} mg/24 h.`;
    }else if(c.type==='mg_kg_fixed_day'){
      if((c.min_age_years!==undefined&&age<c.min_age_years)||(c.max_age_years_exclusive!==undefined&&age>=c.max_age_years_exclusive)){result.textContent='Idade fora da faixa validada para o cálculo desta apresentação. Confira a bula.';return}
      if(weight<c.min_weight_kg||weight>c.max_weight_kg){result.textContent='Peso fora da faixa configurada; avalie individualmente.';return}
      const calculated=weight*c.mg_kg_day,daily=Math.min(calculated,c.max_daily_mg);
      result.textContent=`${number(c.mg_kg_day)} mg/kg/dia × ${number(weight)} kg = ${number(calculated)} mg/24 h; dose após teto: ${number(daily)} mg/24 h (máximo ${number(c.max_daily_mg)} mg/24 h). Confirme uma apresentação que permita medir a dose exata.`;
    }else if(c.type==='mg_kg_combo_day'){
      if(age<c.min_age_years||weight<c.min_weight_kg||weight>=c.max_weight_kg_exclusive){result.textContent='Fora da faixa validada para o cálculo pediátrico desta apresentação.';return}
      const renal=el.querySelector('.rx-renal').value;
      if(renal!=='normal'){result.textContent=renal==='reduced'?'Função renal reduzida: cálculo bloqueado. Consulte a bula.':'Informe a função renal para calcular.';return}
      const rate=Number(el.querySelector('.rx-rate').value);
      if(!Number.isFinite(rate)||rate<c.min_mg_kg_day||rate>c.max_mg_kg_day){result.textContent=`Escolha ${c.min_mg_kg_day}–${c.max_mg_kg_day} mg/kg/dia de amoxicilina.`;return}
      if(age<2&&rate>c.max_under_two_years_mg_kg_day){result.textContent='Abaixo de 2 anos, não há dados para dose acima de 45 mg/kg/dia de amoxicilina nesta bula.';return}
      const amoxDaily=weight*rate,amoxDose=amoxDaily/c.doses_per_day,ml=amoxDose/f.strength_mg_ml,clavDose=ml*f.clav_mg_ml;
      result.textContent=`${number(ml)} mL por dose a cada 12 h: ${number(amoxDose)} mg de amoxicilina + ${number(clavDose)} mg de clavulanato. Total diário: ${number(amoxDaily)} mg + ${number(clavDose*c.doses_per_day)} mg. Confirme indicação e volume mensurável na seringa.`;
    }else if(c.type==='mg_kg_day'){
      if(weight>=c.max_weight_kg_exclusive||weight<c.min_weight_kg){result.textContent='Fora da faixa de peso pediátrica desta regra. Consulte posologia individual.';return}
      const renal=el.querySelector('.rx-renal').value;
      if(renal!=='normal'){result.textContent=renal==='reduced'?'Função renal reduzida: cálculo padrão bloqueado. Use ajuste específico da bula.':'Informe a função renal para liberar o cálculo.';return}
      const rate=Number(el.querySelector('.rx-rate').value);
      if(!Number.isFinite(rate)||rate<c.min_mg_kg_day||rate>c.max_mg_kg_day){result.textContent=`Escolha uma taxa entre ${c.min_mg_kg_day} e ${c.max_mg_kg_day} mg/kg/dia.`;return}
      const daily=weight*rate,perDose=daily/c.doses_per_day,ml=perDose/f.strength_mg_ml;
      result.textContent=`${number(rate)} mg/kg/dia × ${number(weight)} kg = ${number(daily)} mg/dia. Dividido em ${c.doses_per_day} tomadas: ${number(perDose)} mg (${number(ml)} mL) a cada 8 h. Defina a duração conforme o foco e o protocolo.`;
    }
  }
  list.addEventListener('click',event=>{
    const button=event.target.closest('[data-id]');
    if(!button)return;
    const rawId=button.dataset.id;
    const found=rows.find(row=>String(row.id)===String(rawId));
    selected=found?found.id:rawId;
    renderList();
    renderDetail(found);
    openMobileDetail();
  });
  document.querySelectorAll('[data-class-chip]').forEach(chip=>{
    chip.addEventListener('click',()=>{
      activeChip=normStr(chip.dataset.classChip||'');
      document.querySelectorAll('[data-class-chip]').forEach(c=>c.classList.toggle('is-active',c===chip));
      renderList();
    });
  });
  window.addEventListener('popstate',()=>{ if(document.body.classList.contains('bulario-detail-open')) closeMobileDetail(true); });
  search.addEventListener('input',renderList);
  (async()=>{
    const localSeeds=Array.isArray(window.TRAUBE_BULARIO_SEEDS)?window.TRAUBE_BULARIO_SEEDS:[];
    const localProtoSeeds=Array.isArray(window.TRAUBE_PROTOCOL_SEEDS)?window.TRAUBE_PROTOCOL_SEEDS:[];
    let data=[],error=null,protocolRows=[];
    if(window.supabaseClient){
      try{
        const [bRes,pRes]=await Promise.all([
          window.supabaseClient.from('bulario_catalog').select('id,name,active_ingredient,therapeutic_class,pharmacological_class,data').order('name').limit(1000),
          window.supabaseClient.from('clinical_protocols').select('slug,title,linked_drug_terms').order('title')
        ]);
        data=bRes?.data||[];error=bRes?.error||null;protocolRows=pRes?.data||[];
      }catch(e){error=e;}
    }
    if(error&&!localSeeds.length){list.innerHTML='<div class="empty">Não foi possível carregar o Bulário.</div>';return}
    const dbRows=data||[];
    const existingKeys=new Set(dbRows.map(r=>normStr(r.active_ingredient||r.name)).filter(Boolean));
    rows=[...dbRows,...localSeeds.filter(s=>!existingKeys.has(normStr(s.active_ingredient||s.name)))];
    const existingProtoSlugs=new Set((protocolRows||[]).map(p=>p.slug).filter(Boolean));
    protocols=[...(protocolRows||[]),...localProtoSeeds.filter(p=>!existingProtoSlugs.has(p.slug))];
    const q=new URLSearchParams(location.search).get('q')?.trim();
    if(q){
      search.value=q;
      const term=q.toLocaleLowerCase('pt-BR');
      const hit=rows.find(row=>[row.name,row.active_ingredient].some(v=>String(v||'').toLocaleLowerCase('pt-BR')===term))
        || rows.find(row=>[row.name,row.active_ingredient].some(v=>String(v||'').toLocaleLowerCase('pt-BR').includes(term)));
      selected=hit?.id||rows[0]?.id;
    }else selected=rows.find(row=>row.id===363)?.id||rows[0]?.id;
    renderList();renderDetail(rows.find(row=>String(row.id)===String(selected)));})();
})();
