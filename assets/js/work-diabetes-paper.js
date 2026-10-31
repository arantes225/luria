/* Diabetes: printable 14-day capillary glucose sheet and offline-only transcription.
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
    ['apos_cafe','2h após café'],
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
    if(!/^\d{4}-\d{2}-\d{2}$/.test(value)||!dayPlus(value,13)) {
      note('Escolha uma data de início válida para os 14 dias.');
      return;
    }
    captureRows();
    if(rows.some(r=>timeSlots.some(t=>r[t[0]]?.trim())||r.notes?.trim()) &&
        !window.confirm('Criar uma nova grade apaga a transcrição temporária atual. Continuar?'))return;
    currentStart=value;
    rows=Array.from({length:14},(_,i)=>{
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
    const a=document.createElement('a');a.href=url;a.download='LURIA_Diario_Glicemico_'+currentStart+'.csv';
    document.body.appendChild(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),2000);
    note('CSV exportado para o dispositivo. Nenhuma medição foi salva na LURIA.');
  });
  const paperCols=[
    {label:['DATA'],w:25},{label:['JEJUM'],w:25},{label:['2h APÓS','CAFÉ'],w:27},
    {label:['ANTES DO','ALMOÇO'],w:27},{label:['2h APÓS','ALMOÇO'],w:28},
    {label:['ANTES DO','JANTAR'],w:27},{label:['2h APÓS','JANTAR'],w:28},
    {label:['AO','DEITAR'],w:25},{label:['OUTROS / SINTOMAS','HORÁRIO / OBSERVAÇÕES'],w:61}
  ];
  function buildPdf(doc) {
    const W=297,H=210,M=12,BLUE=[24,72,136],TEXT=[27,42,61],SUB=[86,103,127],BORDER=[203,215,232],PALE=[244,248,254];
    function text(t,x,y,size=9,color=TEXT,weight='normal',opt){
      doc.setFont('helvetica',weight);doc.setFontSize(size);doc.setTextColor(...color);
      doc.text(t,x,y,opt||{});
    }
    function line(x1,y1,x2,y2){
      doc.setDrawColor(...BORDER);doc.setLineWidth(0.25);doc.line(x1,y1,x2,y2);
    }
    function field(label,x,y,end){
      text(label,x,y,8,SUB,'bold');const start=x+doc.getTextWidth(label)+3;
      line(start,y+1,end,y+1);
    }
    for(let week=0;week<2;week++) {
      if(week) doc.addPage();
      doc.setFillColor(255,255,255);doc.rect(0,0,W,H,'F');
      doc.setFillColor(...BLUE);doc.rect(0,0,W,5,'F');
      text('LURIA',M,15.5,14,BLUE,'bold');
      text('|  DIÁRIO DE GLICEMIA CAPILAR',M+29,15.5,12.5,TEXT,'bold');
      doc.setFillColor(...PALE);doc.roundedRect(W-M-30,9.5,30,10.2,4.2,4.2,'F');
      text('SEMANA '+(week+1)+'/2',W-M-15,16,8.5,BLUE,'bold',{align:'center'});
      text('Preencha à mão. Anote os valores em mg/dL nos horários orientados pelo médico.',M,23,8.4,SUB);
      field('Paciente:',M,31,M+113);
      field('Período:',M+118,31,M+192);
      field('Médico(a):',M+197,31,W-M);
      field('Medicamentos em uso / dose:',M,39,M+167);
      field('Orientações de horários:',M+172,39,W-M);
      doc.setFillColor(...PALE);doc.roundedRect(M,43,273,8.4,2.7,2.7,'F');
      text('Use os horários combinados com a equipe. 2h após = 2h após o início da refeição.',M+3,48.5,8.2,BLUE,'bold');
      const top=56,header=13.9,rowH=14.8;
      doc.setFillColor(...BLUE);doc.rect(M,top,273,header,'F');
      let x=M;
      for(const col of paperCols){
        const yc=col.label.length===1?63.5:61;
        col.label.forEach((t,k)=>text(t,x+col.w/2,yc+k*4.3,col.w>58?7.2:7.7,[255,255,255],'bold',{align:'center'}));
        x+=col.w;
      }
      for(let i=0;i<7;i++) {
        const y=top+header+i*rowH;
        if(i%2) {doc.setFillColor(250,252,255);doc.rect(M,y,273,rowH,'F');}
        let xx=M;
        for(let col=0;col<paperCols.length;col++) {
          const cw=paperCols[col].w;
          doc.setDrawColor(...BORDER);doc.setLineWidth(.23);doc.rect(xx,y,cw,rowH);
          if(col===0){text('Dia '+String(week*7+i+1).padStart(2,'0'),xx+2,y+5.6,7.5,SUB,'bold');line(xx+2,y+10.8,xx+cw-2,y+10.8);}
          else if(col!==paperCols.length-1)line(xx+2.3,y+11.3,xx+cw-2.3,y+11.3);
          xx+=cw;
        }
      }
      const bottom=top+header+7*rowH;
      doc.setDrawColor(...BORDER);doc.setLineWidth(.3);
      doc.roundedRect(M,bottom+3.6,273,16.6,2.6,2.6);
      text('Observações da semana (alimentação, atividade, sintomas ou ocorrências):',M+3,bottom+9,8,SUB,'bold');
      line(M+3,bottom+13.8,W-M-3,bottom+13.8);
      text('Leve as duas folhas à consulta. Não ajuste medicamentos por conta própria.',M,204,7.6,SUB);
      text('LURIA  •  Registro manual  •  Página '+(week+1)+' de 2',W-M,204,7.2,SUB,'normal',{align:'right'});
    }
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
      doc.save('LURIA_Diario_Glicemico_14_dias.pdf');
      note('Modelo de 14 dias gerado. Imprima em A4 horizontal e entregue ao paciente.');
    }catch(e){note('Não foi possível gerar o PDF: '+String(e?.message||e));}
    finally{btn.disabled=false;btn.textContent=old;}
  });
  note('Baixe a folha em PDF; após o retorno do paciente, escolha a data inicial para transcrever na grade.');
})();