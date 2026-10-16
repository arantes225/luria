const fs=require('node:fs'), cp=require('node:child_process'), crypto=require('node:crypto');
const base='docs/auditoria-apostilas-2026-10-16';
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
const file=`${base}/correcoes-estrutura-20261016.json`;
const log=JSON.parse(fs.readFileSync(file,'utf8'));
for(const c of log.changes){
  const original=cp.execFileSync('git',['show',`2d29133:${c.path}`],{encoding:'utf8',maxBuffer:3e6});
  const prior=JSON.parse(fs.readFileSync(`${base}/status-individual.json`,'utf8')).items.find(x=>x.path===c.path).source_sha256;
  const candidates=[original,original.replace(/\r?\n/g,'\r\n'),original.replace(/\r\n/g,'\n')];
  if(!candidates.some(x=>hash(x)===prior))throw Error('Original não corresponde ao inventário: '+c.path);
  c.source_sha256=prior;
  c.result_sha256=hash(fs.readFileSync(c.path,'utf8'));
}
log.benchmark={date:'2026-10-16',readable_text_examined:true,visual_pdf_examined:false,preferred_author_confirmed:false,searches:['Ciclo menstrual','Mastologia','Anticoncepção','contracepção','Estratégia ginecologia'],materials:['fisiologia menstrual.pdf','MASTOLOGIA.pdf','Planejamento familiar.pdf'],scope:'Resumos parciais com identificação Maysa Mismetti; nenhuma autoria Estratégia MED confirmada. Comparação de tópicos e sequência; nenhuma conduta copiada ou validada a partir dos resumos. Conferência científica integral permanece pendente.'};
log.validation={batch_tests_pass:35,syntax_blocks:289,syntax_errors:0,clinical_approval:false,visual_desktop_pwa:false};
fs.writeFileSync(file,JSON.stringify(log,null,2)+'\n');
for(const c of log.changes){
 const key=c.path.split('/')[1],p=`${base}/pareceres/${key}.md`;
 let s=fs.readFileSync(p,'utf8');
 if(!s.includes('## Execução das correções estruturais'))s+='\n## Execução das correções estruturais — 16/10/2026\n\nCorreção implementada após comparação parcial com resumo correlato do Drive. Ver [registro de execução](../EXECUCAO_CORRECOES.md) e [hashes antes/depois](../correcoes-estrutura-20261016.json). O parecer acima é histórico e descreve o estado anterior. A alteração técnica não representa aprovação científica integral.\n';
 fs.writeFileSync(p,s);
}
console.log('Checkpoint de três correções atualizado.');
