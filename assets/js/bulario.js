(()=>{
  const search=document.getElementById('drug-search');
  const list=document.getElementById('drug-list');
  const detail=document.getElementById('drug-detail');
  const count=document.getElementById('drug-count');
  let rows=[], selected=null;
  const esc=value=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const number=value=>new Intl.NumberFormat('pt-BR',{maximumFractionDigits:2}).format(value);
  const status=row=>row.data?.status==='posology_verified'?2:row.data?.status==='verified'?1:0;
  const field=(label,value)=>`<div class="rx-field"><span>${esc(label)}</span><b>${esc(value||'A confirmar')}</b></div>`;
  function renderList(){
    const term=search.value.trim().toLocaleLowerCase('pt-BR');
    const matches=rows.filter(row=>[row.name,row.active_ingredient,row.therapeutic_class,row.pharmacological_class,...(row.data?.diseases||[])].some(value=>String(value||'').toLocaleLowerCase('pt-BR').includes(term)));
    matches.sort((a,b)=>status(b)-status(a)||a.name.localeCompare(b.name,'pt-BR'));
    count.textContent=`${matches.length} medicamento${matches.length===1?'':'s'}`;
    list.innerHTML=matches.slice(0,80).map(row=>`<button type="button" class="drug-row" data-id="${row.id}" aria-current="${row.id===selected}"><strong>${esc(row.name)}</strong><small>${esc(row.active_ingredient||'Princípio ativo a confirmar')}${status(row)===2?' · Posologia conferida':status(row)===1?' · Resumo da bula':''}</small></button>`).join('')||'<div class="empty">Nenhum medicamento encontrado.</div>';
    if(matches.length>80)list.insertAdjacentHTML('beforeend','<p class="rx-note">Mostrando os primeiros 80. Refine a busca para ver os demais.</p>');
  }
  function calculator(formulation){
    const c=formulation.calculator;
    if(!c)return '';
    return `<section class="rx-card rx-calculator" data-calculator="${esc(c.type)}"><h3>Cálculo por peso</h3><div class="rx-controls"><label>Peso (kg)<input class="rx-weight" type="number" min="0.1" max="300" step="0.1" inputmode="decimal" placeholder="Ex.: 18"></label><label>Idade (anos)<input class="rx-age" type="number" min="0" max="120" step="0.1" inputmode="decimal" placeholder="Ex.: 5"></label>${c.renal_gate?'<label>Função renal<select class="rx-renal"><option value="">Selecione</option><option value="normal">ClCr ≥ 30 mL/min</option><option value="reduced">ClCr &lt; 30 mL/min</option></select></label><label>Escolha mg/kg/dia<input class="rx-rate" type="number" min="20" max="50" step="1" value="40"></label>':''}</div><div class="rx-result" aria-live="polite">Informe os dados para calcular.</div><p class="rx-note">Cálculo restrito à apresentação acima. Confirme idade, alergias, função renal, outros medicamentos e indicação clínica.</p></section>`;
  }
  function renderDetail(row){
    if(!row){detail.innerHTML='<div class="empty">Selecione um medicamento.</div>';return}
    const d=row.data||{},ready=d.status==='posology_verified',summary=d.status==='verified';
    const formulations=Array.isArray(d.formulations)?d.formulations:[];
    const products=Array.isArray(d.products)?d.products:[];
    const diseases=Array.isArray(d.diseases)?d.diseases:[];
    detail.innerHTML=`<div class="drug-kicker">${ready?'Ficha de posologia por apresentação':summary?'Resumo da bula':'Ficha em revisão'}</div><h2>${esc(row.name)}</h2><p class="drug-sub">Princípio ativo: ${esc(row.active_ingredient||'a confirmar')} · ${esc(d.therapeutic_class||row.pharmacological_class||'Classe a confirmar')}</p>
      ${products.length?`<h3>Nomes e produtos</h3><div class="rx-products">${products.map(p=>`<span><b>${esc(p.name)}</b> · ${esc(p.type)} · ${esc(p.presentation)}</span>`).join('')}</div>`:`<h3>Nomes e produtos</h3><p class="rx-note">${esc(row.name)}${row.active_ingredient&&row.name.toLocaleLowerCase('pt-BR')!==row.active_ingredient.toLocaleLowerCase('pt-BR')?` · princípio ativo: ${esc(row.active_ingredient)}`:''}. Outras marcas e genéricos ainda não vinculados.</p>`}
      ${diseases.length?`<h3>Principais indicações</h3><div class="rx-tags">${diseases.map(item=>`<span>${esc(item)}</span>`).join('')}</div>`:''}
      ${ready?formulations.map((f,i)=>`<section class="rx-card"><div class="drug-kicker">Apresentação ${i+1}</div><h3>${esc(f.label)}</h3><div class="rx-grid">${field('Dose / posologia',f.dose_text)}${field('Via',f.route)}${field('Intervalo',f.interval_text)}${field('Máximo em 24 h',f.max_daily_text)}${field('Público',f.population)}${field('Duração',f.duration_text)}${field('Como administrar',f.administration)}${field('Tipo de receita',f.prescription_type)}</div><p class="rx-alert"><strong>Conferir antes de prescrever:</strong> ${esc(f.cautions)}</p>${calculator(f)}<a href="${esc(f.source_url)}" target="_blank" rel="noopener noreferrer">Bula desta apresentação ↗</a></section>`).join(''):`<section class="rx-card"><h3>Prescrição</h3><p class="rx-note">Dose, intervalo, via, limite diário e ajustes desta apresentação ainda não foram conferidos. Consulte a bula antes de prescrever.</p>${d.indication?`<p><strong>Indicação resumida:</strong> ${esc(d.indication)}</p>`:''}${d.presentation?`<p><strong>Apresentação:</strong> ${esc(d.presentation)}</p>`:''}</section>`}
      <p class="rx-note">${d.reviewed_at?`Fonte consultada em ${esc(d.reviewed_at)}. `:''}A ficha não substitui avaliação de contraindicações, interações e função renal.</p><a href="${esc(d.leaflet_url||'https://consultas.anvisa.gov.br/#/bulario/')}" target="_blank" rel="noopener noreferrer">${d.leaflet_url?'Abrir bula completa':'Pesquisar no Bulário da Anvisa'} ↗</a>`;
    detail.querySelectorAll('.rx-calculator').forEach((el,i)=>{
      const f=formulations[i],handler=()=>calculate(el,f);
      el.addEventListener('input',handler);el.addEventListener('change',handler);
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
  list.addEventListener('click',event=>{const button=event.target.closest('[data-id]');if(!button)return;selected=Number(button.dataset.id);renderList();renderDetail(rows.find(row=>row.id===selected));});
  search.addEventListener('input',renderList);
  (async()=>{const {data,error}=await window.supabaseClient.from('bulario_catalog').select('id,name,active_ingredient,therapeutic_class,pharmacological_class,data').order('name').limit(1000);if(error){list.innerHTML='<div class="empty">Não foi possível carregar o Bulário.</div>';return}rows=data||[];selected=rows.find(row=>row.id===363)?.id||rows[0]?.id;renderList();renderDetail(rows.find(row=>row.id===selected));})();
})();
