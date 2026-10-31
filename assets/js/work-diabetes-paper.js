/* Diabetes: printable 7-day capillary glucose sheet and offline-only transcription.
 * No PHI upload, storage, AI extraction, prescription or glycemic classification.
 */
(() => {
  'use strict';
  const btn = document.getElementById('dm-download-paper');
  const createBtn = document.getElementById('dm-create-paper-grid');
  const tableRoot = document.getElementById('dm-paper-grid');
  const exportBtn = document.getElementById('dm-export-paper-csv');
  const startInput = document.getElementById('dm-paper-start');
  const status = document.getElementById('dm-paper-status');
  if (!btn || !createBtn || !tableRoot || !exportBtn || !startInput || !status) return;
  const timeSlots = [
    ['jejum','Jejum'],
    ['antes_almoco','Antes almoço'],
    ['apos_almoco','2h após almoço'],
    ['antes_jantar','Antes jantar'],
    ['apos_jantar','2h após jantar'],
    ['deitar','Ao deitar']
  ];
  const es = v => String(v ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const dayPlus = (iso, amount) => {
    const dt = new Date(iso+'T12:00:00Z');
    if (!Number.isFinite(dt.getTime())) return '';
    dt.setUTCDate(dt.getUTCDate()+amount);
    return dt.toISOString().slice(0,10);
  };
  const toBR = iso => iso.split('-').reverse().join('/');
  let currentStart = '', rows = [];
  function note(msg) { status.textContent = msg; }
  function valOkay(value) {
    if (!value.trim()) return true;
    if (/^(HI|LO)$/i.test(value.trim())) return true;
    if (!/^\d{2,3}$/.test(value.trim())) return false;
    const n = Number(value.trim());
    return n >= 20 && n <= 600;
  }
  function captureRows() {
    if (!rows.length) return;
    tableRoot.querySelectorAll('input[data-day][data-field]').forEach(input => {
      const i = Number(input.dataset.day), key = input.dataset.field;
      if (!rows[i] || !(key in rows[i])) return;
      rows[i][key] = input.value;
    });
  }
  function renderTable() {
    tableRoot.innerHTML =
      '<table class="dm-table dm-paper-table"><thead><tr><th>Data</th>'+
      timeSlots.map(slot=>'<th>'+es(slot[1])+'</th>').join('')+
      '<th>Observações</th></tr></thead><tbody>'+
      rows.map((row,i)=>'<tr><th scope="row">'+es(toBR(row.date))+'</th>'+
        timeSlots.map(slot=>'<td><input data-day="'+i+'" data-field="'+slot[0]+'" type="text" inputmode="numeric" maxlength="4" autocomplete="off" aria-label="'+es(slot[1]+' '+toBR(row.date))+'" placeholder="—" value="'+es(row[slot[0]]||'')+'"></td>').join('')+
        '<td><input data-day="'+i+'" data-field="notes" type="text" maxlength="140" autocomplete="off" aria-label="Observações '+es(toBR(row.date))+'" value="'+es(row.notes||'')+'"></td></tr>').join('')+'</tbody></table>';
    exportBtn.disabled = rows.length===0;
  }
  createBtn.addEventListener('click',() => {
    const value=startInput.value;
    if(!/^\d{4}-\d{2}-\d{2}$/.test(value)||!dayPlus(value,6)) {
      note('Escolha uma data de início válida para os 7 dias.');
      return;
    }
    captureRows();
    if(rows.some(r=>timeSlots.some(t=>r[t[0]]?.trim())||r.notes?.trim()) &&
        !window.confirm('Criar uma nova grade apaga a transcrição temporária atual. Continuar?'))return;
    currentStart=value;
    rows=Array.from({length:7},(_,i)=>{
      const out={date:dayPlus(value,i),notes:''};
      timeSlots.forEach(t=>out[t[0]]='');
      return out;
    });
    renderTable();
    note('Grade pronta. Transcreva os valores da folha com Tab entre os campos; use HI ou LO se o glicosímetro exibiu essas indicações.');
  });
  function validate() {
    captureRows();
    for(const row of rows) for(const [key,label] of timeSlots){
      if(!valOkay(row[key])){
        note('Valor não reconhecido em '+toBR(row.date)+', '+label+'. Use mg/dL entre 20 e 600, HI, LO ou deixe vazio.');
        tableRoot.querySelector('input[data-day="'+rows.indexOf(row)+'"][data-field="'+key+'"]')?.focus();
        return false;
      }
    }
    return true;
  }
  function csvSafe(value) {
    const clean=String(value||'').trim().replace(/[\r\n]+/g,' ');
    // Prevent spreadsheet formula injection from the free-text notes column.
    const neutralized=/^[=+\-@]/.test(clean)?"'"+clean:clean;
    return '"'+neutralized.replace(/"/g,'""')+'"';
  }
  exportBtn.addEventListener('click',() => {
    if(!rows.length||!validate())return;
    const header=['Data',...timeSlots.map(s=>s[1]),'Observações'];
    const lines=[header.map(csvSafe).join(';')].concat(rows.map(r=>[r.date,...timeSlots.map(t=>r[t[0]].trim().toUpperCase()),r.notes].map(csvSafe).join(';')));
    const blob=new Blob(['\uFEFF'+lines.join('\r\n')],{type:'text/csv;charset=utf-8'});
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');a.href=url;a.download='Traube_Diario_Glicemico_'+currentStart+'.csv';
    document.body.appendChild(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),2000);
    note('CSV exportado para o dispositivo. Nenhuma medição foi salva na Traube.');
  });
  const paperCols=[
    {label:['DIA'],w:28},{label:['JEJUM'],w:31},
    {label:['ANTES DO','ALMOÇO'],w:32},{label:['2h APÓS','ALMOÇO'],w:32},
    {label:['ANTES DO','JANTAR'],w:32},{label:['2h APÓS','JANTAR'],w:32},
    {label:['AO','DEITAR'],w:31},{label:['OBSERVAÇÕES'],w:55}
  ];
  function buildPdf(doc) {
    // A4 landscape, 1 page. Only three identifying fields: full name, start date, stamp.
    const W=297,M=12,BLUE=[24,72,136],TEXT=[27,42,61],SUB=[86,103,127],BORDER=[190,203,219];
    const text=(value,x,y,size=9,color=TEXT,weight='normal',opts={})=>{
      doc.setFont('helvetica',weight);doc.setFontSize(size);doc.setTextColor(...color);
      doc.text(value,x,y,opts);
    };
    const line=(x1,y1,x2,y2)=>{
      doc.setDrawColor(...BORDER);doc.setLineWidth(.3);doc.line(x1,y1,x2,y2);
    };
    doc.setFillColor(255,255,255);doc.rect(0,0,W,210,'F');
    doc.setFillColor(...BLUE);doc.rect(0,0,W,4,'F');
    text('TRAUBE',M,17,17,BLUE,'bold');
    text('REGISTRO DE GLICEMIA CAPILAR | 7 DIAS',M+43,17,12,TEXT,'bold');
    text('Nome completo:',M,33,10,TEXT,'bold');
    line(M+32,34,W-M-89,34);
    text('Data inicial:',W-M-85,33,10,TEXT,'bold');
    line(W-M-60,34,W-M,34);
    text('Anote apenas as medidas solicitadas pelo médico, em mg/dL. Após refeição: 2h do início.',M,43,8.5,SUB);
    const tableY=49, headH=14, rowH=14.5;
    doc.setFillColor(...BLUE);doc.rect(M,tableY,273,headH,'F');
    let x=M;
    for(const col of paperCols){
      const mid=tableY+7, isTwo=col.label.length>1;
      col.label.forEach((label,j)=>text(label,x+col.w/2,mid+(j-(col.label.length-1)/2)*4.1+1,7.6,[255,255,255],'bold',{align:'center'}));
      x+=col.w;
    }
    for(let i=0;i<7;i++){
      const y=tableY+headH+i*rowH;
      if(i%2){doc.setFillColor(247,249,253);doc.rect(M,y,273,rowH,'F');}
      let cx=M;
      paperCols.forEach((col,j)=>{
        doc.setDrawColor(...BORDER);doc.setLineWidth(.25);doc.rect(cx,y,col.w,rowH);
        if(j===0)text('Dia '+(i+1),cx+col.w/2,y+8.4,8.6,SUB,'bold',{align:'center'});
        cx+=col.w;
      });
    }
    const boxY=174,boxX=W-M-81,boxW=81,boxH=25;
    doc.setDrawColor(...BORDER);doc.setLineWidth(.5);
    doc.roundedRect(boxX,boxY,boxW,boxH,2.5,2.5);
    text('Carimbo do médico',boxX+3,boxY+5,8.4,SUB,'bold');
    text('Levar esta folha à consulta.',M,194,9,SUB);
  }

  btn.addEventListener('click',async () => {
    btn.disabled=true;
    const old=btn.textContent;btn.textContent='Gerando PDF…';
    try{
      if(!window.LuriaLazyVendors?.ensure) throw new Error('Gerador de PDF indisponível nesta versão.');
      await window.LuriaLazyVendors.ensure('jspdf');
      const Doc=window.jspdf?.jsPDF;
      if(!Doc)throw new Error('O navegador não conseguiu carregar o PDF.');
      const doc=new Doc({orientation:'landscape',unit:'mm',format:'a4',compress:true});
      buildPdf(doc);
      doc.save('Traube_Diario_Glicemico_7_dias.pdf');
      note('Modelo de 7 dias gerado em 1 página. Imprima em A4 horizontal e entregue ao paciente.');
    }catch(e){note('Não foi possível gerar o PDF: '+String(e?.message||e));}
    finally{btn.disabled=false;btn.textContent=old;}
  });
  note('Baixe a folha em PDF; após o retorno do paciente, escolha a data inicial para transcrever na grade.');
})();