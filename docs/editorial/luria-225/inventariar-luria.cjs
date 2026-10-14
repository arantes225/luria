"use strict";
// Auditoria local de evidências. Nunca escreve no repositório de origem.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto'),{spawnSync}=require('node:child_process');
const root=path.resolve(process.argv[2]||path.join(__dirname,'../../..')),out=path.resolve(__dirname,'entrega-editorial'),date='2026-10-14';
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const write=(p,v)=>{const target=path.join(out,p);fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,typeof v==='string'?v:JSON.stringify(v,null,2)+'\n','utf8');};
const norm=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const strip=s=>String(s).replace(/<script\b[\s\S]*?<\/script>/gi,' ').replace(/<style\b[\s\S]*?<\/style>/gi,' ').replace(/<[^>]*>/g,' ').replace(/&(?:nbsp|amp|lt|gt|quot|#\d+);/g,' ').replace(/\s+/g,' ').trim();
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
const ctx={window:{}};vm.runInNewContext(read('assets/js/cronograma-base-data.js'),ctx,{timeout:1000});
const base=ctx.window.LURIA_BASE_SCHEDULES.medicine;
if(base.length!==180||base.some((t,i)=>t.aula!==i+1))throw Error('Cronograma divergente: preservar IDs e investigar.');
const extra=JSON.parse(fs.readFileSync(path.join(__dirname,'complementos.json'),'utf8'));
if(extra.length!==45)throw Error('Complementos divergentes');
const areaExtra=id=>id<=194?'Clínica Médica':id<=202?'Cirurgia e especialidades':id<=208?'Pediatria':id<=211?'Ginecologia e Obstetrícia':id<=219?'Saúde Mental':id<=223?'Medicina de Família e Comunidade':'Saúde Coletiva e competências transversais';
const catalog=[...base.map(t=>({id:t.aula,title:t.theme,area:t.area,origin:'cronograma-base-data.js'})),...extra.map((title,i)=>({id:181+i,title,area:areaExtra(181+i),origin:'complementos propostos pelo usuário'}))];
const checks={};
for(const script of ['audit-apostilas-60k.mjs','audit-apostilas-batch.cjs','check-syntax.cjs']){
 const args=['scripts/'+script,...(script.startsWith('audit')?['--json']:[])];
 const r=spawnSync(process.execPath,args,{cwd:root,encoding:'utf8',maxBuffer:16*1024*1024});
 checks[script]={exit_code:r.status,stdout:r.stdout,stderr:r.stderr,error:r.error?.message||null};
 write('evidencias/'+script+'.log',r.stdout+'\n'+r.stderr);
}
if(checks['audit-apostilas-60k.mjs'].exit_code!==0)throw Error('Falha na triagem 60k: ver log');
const metrics=JSON.parse(checks['audit-apostilas-60k.mjs'].stdout);
const batch=JSON.parse(checks['audit-apostilas-batch.cjs'].stdout);
write('evidencias/triagem-60k.json',metrics);write('evidencias/triagem-batch.json',batch);
const index=read('apostilas/index.html');
const books=metrics.report.map(m=>{
 const html=read('apostilas/'+m.slug+'/index.html');
 const p='apostilas/'+m.slug+'/'+m.source,source=read(p);
 let text,headings,sections;
 if(m.source==='content.json'){
  const d=JSON.parse(source);sections=(d.q||[]).map(s=>({id:s[0],title:s[1],text:strip(JSON.stringify(s[2]||[]))}));
  text=sections.map(s=>s.text).join(' ');headings=sections.map(s=>({id:s.id,title:s.title}));
 }else{
  const article=html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/i)?.[1]||html;
  text=strip(article);headings=[...article.matchAll(/<h([234])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map(h=>({title:strip(h[2])}));
  sections=[...article.matchAll(/<section\b[^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/section>/gi)].map(s=>({id:s[1],title:strip(s[2].match(/<h[23]\b[^>]*>([\s\S]*?)<\/h[23]>/i)?.[1]||s[1]),text:strip(s[2])}));
 }
 const links=[...source.matchAll(/href="(https:\/\/[^"\s]+)"/g)].map(m=>m[1]);
 const malformedHeadings=headings.filter(h=>String(h.title).length>400);
 const b={...m,path:p,sha256:sha(source),html_sha256:sha(html),headings,sections:sections.map(({text,...s})=>({...s,chars:text.length})),structural_warnings:malformedHeadings.map(h=>({type:'titulo_excessivamente_longo_possivel_markup_incorreto',length:String(h.title).length,excerpt:String(h.title).slice(0,180)})),reference_links:[...new Set(links)],listed_in_local_catalog_source:index.includes('/apostilas/'+m.slug+'/'),publication_state:'não consultado no banco/site',bibliography:'URLs extraídas; conteúdo, vigência e doses não verificados',images_status:'aprovações atuais não consultadas; conferir Admin e auditoria histórica',clinical_validation:'pendente',text};
 write('evidencias/cadernos/'+m.slug+'.json',Object.fromEntries(Object.entries(b).filter(([k])=>k!=='text')));
 return b;
});
// Correspondências editoriais explícitas; nenhuma é certificação de cobertura.
const mappings={
 4:['pre-natal-baixo-risco','pré-natal'],9:['pre-natal-baixo-risco','datação'],14:['pre-natal-baixo-risco','rastreamento'],19:['pre-natal-baixo-risco','vacina'],
 24:['sindromes-hipertensivas-da-gestacao','pré-eclâmpsia'],29:['diabetes-mellitus-gestacional','diagnóstico'],34:['infeccoes-gestacao-transmissao-vertical','transmissão'],
 39:['hemorragias-primeiro-terceiro-trimestre','primeir'],44:['hemorragias-primeiro-terceiro-trimestre','abort'],49:['hemorragias-primeiro-terceiro-trimestre','ectópica'],54:['hemorragias-primeiro-terceiro-trimestre','trofoblástica'],59:['hemorragias-primeiro-terceiro-trimestre','placenta'],64:['hemorragias-primeiro-terceiro-trimestre','descolamento'],
 69:['assistencia-ao-parto','parto'],74:['assistencia-ao-parto','partograma'],79:['inducao-do-trabalho-de-parto','indução'],84:['assistencia-ao-parto','distocia'],89:['avaliacao-vitalidade-fetal','cardiotoco'],94:['amniorrexe-prematura','rotura'],99:['trabalho-parto-prematuro','prematuro'],
 119:['planejamento-reprodutivo-contracepcao','contracep'],124:['sangramento-uterino-anormal','sangramento'],129:['amenorreia','amenorreia'],134:['sindrome-ovariana-metabolica-poliendocrina-somp','policístic'],144:['climaterio-menopausa','menopausa'],149:['infeccoes-sexualmente-transmissiveis','sífilis'],154:['cervicites-doenca-inflamatoria-pelvica','pélvica'],159:['cancer-colo-utero-hpv','rastreamento'],164:['cancer-colo-utero-hpv','invas'],167:['cancer-de-mama','benign'],169:['cancer-de-mama','mama'],211:['sangramento-uterino-anormal','miom']
};
const overlaps=[[97,141],[127,132,136],[167,169],[159,164],[3,8],[145,149,154],[155,212,213,214,215,216,217,218,219],[160,218],[67,195,196,197],[70,165,225],[150,183,223]];
const relatedGroups=[...overlaps,[4,9,14,19],[39,44,49,54,59,64],[69,74,79,84],[76,81,153],[96,101,17],[48,135],[46,93],[56,88],[61,103],[121,108],[116,113],[38,168,207],[124,139,174,179,211],[5,10,15,20,25,30,35,40,45,50]];
const fragmentSearch={28:'aleitamento',104:'hemorragia pós-parto',109:'puerpério',114:'infecção puerperal',139:'endometriose',145:'saúde da mulher',168:'puberdade',174:'massa anexial',179:'câncer endometrial',209:'gestação múltipla',210:'incontinência'};
const records=catalog.map(t=>{
 const pair=mappings[t.id],b=pair?books.find(b=>b.slug===pair[0]):null;
 if(pair&&!b)throw Error('Correspondência aponta para arquivo inexistente: '+pair[0]);
 const keyword=pair?.[1],pos=b?norm(b.text).indexOf(norm(keyword)):-1;
 const evidence=b?{path:b.path,search_term:keyword,term_found:pos>=0,excerpt:pos>=0?b.text.slice(Math.max(0,pos-110),pos+320):null,matching_headings:b.headings.filter(h=>norm(h.title).includes(norm(keyword))),book_chars:b.chars,book_sha256:b.sha256}:null;
 const related=[...new Set(relatedGroups.filter(g=>g.includes(t.id)).flat())].filter(id=>id!==t.id).sort((a,b)=>a-b);
 const fragments=fragmentSearch[t.id]?books.flatMap(book=>{const found=book.headings.filter(h=>String(h.title).length<400&&norm(h.title).includes(norm(fragmentSearch[t.id])));return found.length?[{path:book.path,headings:found,scope:'subtópicos relacionados; profundidade e equivalência não avaliadas'}]:[];}):[];
 return {...t,block:Math.ceil(t.id/20),schedule_id:t.id<=180?t.id:null,existing_book:b?.path||null,coverage:b?'parcial — correspondência candidata, integralidade não verificada':'ausente — sem caderno de escopo correspondente identificado',coverage_certified:false,evidence,related_existing_fragments:fragments,
 action:b?(b.chars<60000?'auditar e expandir lacunas comprovadas':'auditar individualmente; corrigir somente lacunas comprovadas'):'criar após receber Fase A e comparação de escopo',priority:b?(b.chars<60000?2:3):1,related_topics:related,
 bibliography_pending:b?'Verificar pertinência e atualidade das referências existentes; rastrear recomendações e doses':'Selecionar, abrir e verificar fontes primárias; referências da Fase A não entregues',
 images_pending:b?'Confirmar aprovação/licença/posição no Admin; preservar imagens existentes':'Definir visuais pedagógicos; pesquisar fontes/licenças; candidatas clínicas passam pelo Admin',
 validation_pending:['matriz de objetivos por capítulo','autossuficiência','redundância','bibliografia','revisão médica humana','layout desktop/PWA','comparação Aristo não disponível'],
 phase_a:'nenhum arquivo científico novo entregue para este tema'};
});
const partial=records.filter(t=>t.existing_book),absent=records.filter(t=>!t.existing_book);
const stats={entries:records.length,schedule_entries:base.length,complements:extra.length,existing_books:books.length,books_below_60k:metrics.missing,books_at_least_60k:books.length-metrics.missing,topics_with_candidate_book:partial.length,topics_without_candidate_book:absent.length,integral_coverage_certified:0,integral_coverage_unknown:true,topics_mapped_to_books_below_60k:partial.filter(t=>t.evidence.book_chars<60000).length};
write('inventario-225.json',{date,repository:'.',source_commit:spawnSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).stdout.trim(),method:'Inventário documental e triagem automatizada; correspondências explícitas com evidências; ausência significa ausência de caderno de escopo, não ausência de qualquer menção.',stats,entries:records});
write('correspondencias-propostas.json',{status:'proposta — não aplicada ao site',entries:partial.map(t=>({theme_id:t.id,path:'/apostilas/'+path.basename(path.dirname(t.existing_book))+'/',source_path:t.existing_book,coverage:t.coverage,enabled:false,requires:'auditoria de cobertura e teste de acesso do aluno'}))});
const pilot=[1,2,3,5,212];
const queueFirst=[...pilot,6,47,28,20,213,11,77,38,85,214,76,82,48,95,215];
const absenceIDs=new Set(absent.map(t=>t.id));
if(pilot.some(id=>!absenceIDs.has(id)))throw Error('Piloto contém tema já correspondente');
const ordered=[...queueFirst.filter(id=>absenceIDs.has(id)),...absent.map(t=>t.id).filter(id=>!queueFirst.includes(id))];
const lots=[];for(let i=0;i<ordered.length;i+=20){const ids=ordered.slice(i,i+20),groups=[];for(let j=0;j<ids.length;j+=5)groups.push(ids.slice(j,j+5));lots.push({lot:lots.length+1,priority:1,topics:ids,groups,status:'planejado; reavaliar ausências antes de executar'});}
write('fila-producao.json',{date,reason:'Piloto combina fundamentos das áreas sem cadernos próprios identificados: Clínica, Cirurgia, Pediatria, Preventiva e Saúde Mental. Restante dos ausentes por IDs após vinte escolhas iniciais; ordem preliminar, reavaliar carga e fontes.',pilot,lots,expansion_queue:partial.filter(t=>t.priority===2).map(t=>t.id),review_queue:partial.filter(t=>t.priority===3).map(t=>t.id),verification_does_not_occupy_production_slots:true});
const overlapRows=overlaps.map(ids=>({ids,decision:ids.includes(167)?'Mesmo caderno candidato para 167 e 169; confirmar cobertura benigna e oncológica antes de habilitar ambos':ids.includes(159)?'Mesmo caderno candidato; conservar unidades distintas para rastreamento, lesões precursoras e doença invasiva':'Não consolidar automaticamente. Produzir matriz de objetivos e capítulos; preservar diferenças de contexto e idade.',consolidated:false}));
write('consolidacoes.json',overlapRows);
const cells=s=>String(s??'—').replace(/\|/g,'/').replace(/\n/g,' ');
const rows=records.map(t=>`| ${String(t.id).padStart(3,'0')} | ${cells(t.title)} | ${cells(t.area)} | ${t.existing_book||'—'} | ${t.existing_book?'Parcial provisória':'Ausente no acervo de escopo'} | P${t.priority} | ${t.related_topics.join(', ')||'—'} |`);
const report=`# Inventário editorial LURIA — ${date}\n\n## Resultado e limite\n\nCronograma local: 180 IDs preservados; 45 complementos do pedido; 225 entradas em 12 blocos. O site publicado e o banco não foram consultados: os resultados descrevem os arquivos da cópia local.\n\n- ${books.length} cadernos reais encontrados; ${metrics.missing} abaixo do piso e ${books.length-metrics.missing} acima do piso na triagem.\n- ${partial.length} núcleos com caderno candidato, todos classificados como cobertura parcial provisória até auditoria clínica.\n- ${absent.length} núcleos sem caderno de escopo identificado, candidatos a criação. Menções incidentais não equivalem a cobertura.\n- Cobertura integral efetivamente certificada: nenhuma nesta execução. Isso não significa que nenhuma apostila possa estar completa; essa medida permanece desconhecida.\n- ${stats.topics_mapped_to_books_below_60k} núcleos apontam para cadernos abaixo de 60K; revisar objetivos antes de expandir. Não somar déficits de núcleos que apontam para o mesmo arquivo.\n\n## O que foi examinado\n\nForam lidos cronograma, padrões editoriais, instruções de lote, scripts build/audit e estrutura do template Vulvovaginites. Todos os HTML/content.json foram processados para extrair títulos, seções, evidências textuais, URLs e hashes. Essa extração não equivale a leitura clínica integral ou validação de condutas. Os relatórios históricos de conteúdo, imagens e comparações foram consultados como evidência histórica, sem presumir estado atual do Admin.\n\nAs 180 entradas são extraídas diretamente do arquivo oficial local; IDs e nomes permanecem intactos. Os complementos não foram adicionados ao cronograma do aluno.\n\n## Cobertura, fontes e imagens\n\nCada entrada em inventario-225.json contém área, correspondência, evidência, ação, temas relacionados e pendências. Cada caderno tem evidências próprias em evidencias/cadernos/: extensão, títulos, seções, URLs, hashes e presença no catálogo local. Fontes externas desses cadernos não foram abertas individualmente; doses não foram validadas. Nenhuma aprovação de imagem foi inferida pela existência de img ou pelo registro histórico.\n\nPendências documentais conhecidas: amniorrexe (figuras históricas 94/96/98), climatério (78), sangramento uterino (315/319). O relatório de 13/10 registra substituições de 96/98 e exclusão de renderização de 78/94/315/319: conferir estado real antes de reutilizar. Não reabrir esses problemas como se as correções documentadas não existissem.\n\nSUS.pdf foi aberto pelo conector e seu texto examinado: comparação de escopo parcial (princípios, níveis, participação e gestão); autoria institucional não confirmada e visuais não inspecionados. Não é uma apostila completa equivalente ao futuro caderno LURIA. Nenhum texto privado foi copiado para esta entrega.\n\nPlanner Aristo 2026/2027 não localizado nas buscas Aristo e Aristo 2026; não foi lido. Comparação de cobertura com Aristo permanece pendente.\n\nA página oficial do Inep aponta a Portaria 478/2025 como referência: [legislação oficial](https://www.gov.br/inep/pt-br/centrais-de-conteudo/legislacao/enamed/2025). É necessário ler a matriz integral, suas atualizações e mapear competências por capítulo; alinhamento integral ao ENAMED não foi atestado.\n\n## Consolidações\n\n${overlapRows.map(o=>'- '+o.ids.map(id=>String(id).padStart(3,'0')).join('/')+': '+o.decision).join('\n')}\n\nTambém preservar pré-natal como candidato para 004/009/014/019 e hemorragias obstétricas para 039/044/049/054/059/064; verificar objetivos individuais. Consolidar arquivos apenas após comparação de capítulos. Ciclo menstrual, fisiologia gestacional, infertilidade, sexualidade, crescimento fetal e vulvovaginites permanecem como recursos próprios, mesmo fora dos 225 títulos. Não excluí-los por não corresponderem a núcleo independente.\n\n## Fila e piloto\n\nPrimeiro grupo: 001, 002, 003, 005, 212. São temas sem caderno de escopo próprio identificado e representam cinco frentes sem biblioteca dedicada. Fila em fila-producao.json: até 20 por lote e grupos de até cinco. Identificadores editoriais nunca são renumerados.\n\nO piloto está preparado documentalmente, não produzido como cinco apostilas completas. Não foram entregues arquivos científicos da Fase A; fundamentos.md e conteudo.md registram essa ausência. Fontes, comparação de escopo, imagens e matriz ENAMED precisam ser completadas antes de redação/integração. Não existe HTML final nem revisão clínica concluída. Não foi usado preenchimento artificial para satisfazer 60K.\n\n## Verificação técnica\n\n${Object.entries(checks).map(([s,c])=>'- '+s+': código '+c.exit_code+'; log preservado.').join('\n')}\n\nBuild não executado sobre conteúdo incompleto. Nenhum arquivo existente foi sobrescrito; CSS, rotas, Admin e banco permanecem sem alterações nesta execução. Nenhum deploy. Entrega local pronta para posterior integração em branch/PR; branch/PR ainda não criados.\n\n## Inventário das 225 entradas\n\n| ID | Núcleo | Área | Correspondência local | Cobertura preliminar | Prioridade | Relacionados |\n|---|---|---|---|---|---|---|\n${rows.join('\n')}\n`;
write('RELATORIO_INVENTARIO.md',report);
write('checkpoint.json',{date,status:'inventario_preliminar_salvo_piloto_documental',stats,completed:['inventário de arquivos e IDs','triagens existentes','correspondências propostas','fila dinâmica','planos do piloto'],not_completed:['auditoria clínica integral','comparativo Aristo','matriz ENAMED integral','Fase A científica de cinco temas','aprovação editorial','HTML final','branch/PR'],next:'Completar benchmark e matriz ENAMED; receber arquivos Fase A por tema; revisar referências; desenvolver e validar uma apostila por vez; manter o lote não aprovado até revisão individual.',repository_modified:false,production_modified:false});
console.log(JSON.stringify(stats,null,2));
