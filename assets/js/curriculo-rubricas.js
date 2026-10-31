/* Official sources checked 2026-10-16. Each edition has independent criteria. */
(() => {
  const part = (id, label, points, limit = 1) => ({ id, label, points, limit });
  const criterion = (id, title, max, page, note, parts) => ({ id, title, max, page, note, parts });
  window.TraubeCurriculoRubricas = [{
    id: 'fmusp-2027-direto-v20261007', title: 'FMUSP / FUVEST · 2027 · Acesso direto',
    status: 'reviewed', max: 100, checkedAt: '2026-10-16',
    source: 'https://www.fuvest.br/wp-content/uploads/rm2027-edital-02-2026.pdf',
    updates: 'https://www.fuvest.br/wp-content/uploads/rm2027-retificacao-2026-10-07.pdf',
    listing: 'https://www.fuvest.br/residencia-medica/2/',
    scope: 'Áreas básicas e acesso direto, item 2.4, programas do item 1.1.2. Não se aplica às especialidades com pré-requisito ou a treineiros.',
    multipliers: [{id:'1', label:'ENAMED 2025: conceito 1, 2 ou 3 / sem fator informado', value:1}, {id:'4', label:'ENAMED 2025: conceito 4', value:1.1}, {id:'5', label:'ENAMED 2025: conceito 5', value:1.2}],
    criteria: [
      criterion('instituicao','Pós-graduação da instituição formadora',15,31,'Apenas programas elegíveis em Medicina I, II, III ou Saúde Coletiva. Anexar documentos institucionais e da graduação.',[
        part('i1','Instituição com pelo menos 2 programas de excelência (conceitos 6 ou 7)',15),part('i2','Programas de doutorado acadêmico com conceitos 4 ou 5',3,3),part('i3','Programas apenas de mestrado acadêmico',1.5,2),part('i4','Programas de mestrado ou doutorado profissional',1,2)]),
      criterion('hospital','Hospital de ensino',12,31,'Comprovação emitida pela direção da instituição.',[part('h1','Hospital próprio',12),part('h2','Hospital formalmente conveniado',3)]),
      criterion('docentes','Titulação do corpo docente',8,31,'Documento da instituição para as áreas elegíveis. Selecione somente a faixa aplicável.',[part('d1','Mais de 80% de doutores',8),part('d2','Mais de 60% até 80% de doutores',4),part('d3','Mais de 50% até 60% de doutores ou mestres',2)]),
      criterion('monitoria','Monitoria na graduação em Medicina',4,32,'Mesmo programa de monitoria; certificado institucional com período e horas. Não repetir o mesmo período em mais de uma faixa.',[part('m1','Mais de 2 semestres e pelo menos 192 horas',4),part('m2','2 semestres e pelo menos 128 horas',3),part('m3','1 semestre e pelo menos 64 horas',1)]),
      criterion('pesquisa','Iniciação científica',14,32,'Exige certificação ou relatório elegível e publicação/aceite identificando o candidato, quando aplicável. Não contar o mesmo projeto duas vezes.',[part('p1','Com bolsa, ≥2 semestres e artigo relacionado',14),part('p2','Com bolsa, 2 semestres sem publicação',2,2),part('p3','Sem bolsa, ≥2 semestres e artigo relacionado',8)]),
      criterion('artigos','Publicações adicionais',10,33,'Não reutilizar artigo contabilizado na iniciação científica. Comprovar autoria e indexação/aceite.',[part('a1','Artigo no PubMed',10),part('a2','Artigo diferente no SciELO',8)]),
      criterion('eventos','Organização e participação em eventos',5,33,'Conferir reconhecimento da entidade e certificado de organização ou participação. Não repetir atividade.',[part('e1','Organização: entidade AMB ou internacional elegível',4),part('e2','Organização: liga, estudantes ou diretório',1,2),part('e3','Participação: entidade AMB ou internacional elegível',1,2),part('e4','Participação: liga, estudantes ou diretório',1)]),
      criterion('oral','Apresentação oral de trabalhos',8,33,'Certificado deve identificar o candidato como apresentador. Conferir organizador e premiação nos termos do edital.',[part('o1','Evento internacional elegível, com prêmio',8),part('o2','Evento internacional elegível, sem prêmio',7),part('o3','Congresso nacional de entidade AMB, com prêmio',6),part('o4','Congresso nacional de entidade AMB, sem prêmio',5),part('o5','Jornada de sociedade AMB, com prêmio',4),part('o6','Jornada de sociedade AMB, sem prêmio',3),part('o7','Jornada de liga, estudantes ou diretório',1,2)]),
      criterion('poster','Apresentação de pôster',4,34,'Exige autoria e responsabilidade pela apresentação comprovadas.',[part('t1','Evento internacional elegível',4),part('t2','Evento nacional de entidade AMB',3),part('t3','Evento de liga, estudantes ou diretório',1)]),
      criterion('extensao','Extensão universitária',5,34,'Exclui ligas e extensão curricular. Exige registro na instituição formadora, período e certificado ou relatório assinado pela comissão de extensão ou direção (retificação de 07/10/2026).',[part('x1','Diretoria do grupo por 1 ano',5),part('x2','Membro do grupo por pelo menos 2 anos',3),part('x3','Membro do grupo por pelo menos 1 ano',1)]),
      criterion('pos','Aprimoramento profissional',8,35,'Título concluído. Conferir áreas elegíveis, reconhecimento CNRM e equivalência internacional conforme edital.',[part('f1','Doutorado acadêmico elegível',8),part('f2','Mestrado acadêmico elegível',4),part('f3','Residência médica em outra área',2)]),
      criterion('suporte','Cursos de suporte à vida',4,35,'ACLS, ATLS, PALS ou BLS: presenciais, válidos no ano da inscrição, com certificação AHA ou ACS e certificado de conclusão.',[part('s1','Cursos elegíveis',2,2)]),
      criterion('representacao','Representação estudantil',3,35,'Exclui ligas. Conferir entidade, instituição, período, função e carga horária no certificado.',[part('r1','Pelo menos 2 anos / 4 semestres',3),part('r2','Pelo menos 1 ano / 2 semestres',1)])
    ]
  }];
  window.TraubeCurriculoRubricas[0].criteria.find(row => row.id === 'docentes').exclusive = true;
  window.TraubeCurriculoRubricas[0].institution = 'USP-SP';
  window.TraubeCurriculoRubricas[0].region = 'SP';
  window.TraubeCurriculoRubricas[0].edition = '2027';
  window.TraubeCurriculoRubricas[0].groups = [
    {id:'formacao',title:'Instituição de formação',tone:'violet',criteria:['instituicao','hospital','docentes']},
    {id:'pesquisa',title:'Pesquisa e publicações',tone:'amber',criteria:['pesquisa','artigos']},
    {id:'academicas',title:'Atividades acadêmicas',tone:'blue',criteria:['monitoria']},
    {id:'eventos',title:'Congressos e apresentações',tone:'teal',criteria:['eventos','oral','poster']},
    {id:'extensao',title:'Extensão e representação',tone:'rose',criteria:['extensao','representacao']},
    {id:'qualificacoes',title:'Qualificações e suporte à vida',tone:'indigo',criteria:['pos','suporte']}
  ];
  for (const [institution,region] of [['UNIFESP','SP'],['FMABC','SP'],['Santa Casa SP','SP'],['SES-PE','PE'],['USP-RP','SP'],['PSU-MG','MG'],['PUC-Campinas','SP'],['UNICAMP','SP'],['Einstein','SP'],['UFPA','PA'],['PSU-GO','GO'],['PUC-SP','SP']]) {
    window.TraubeCurriculoRubricas.push({ id:institution.toLowerCase().replace(/[^a-z0-9]/g,'-')+'-pending', title:institution+' · Edital a conferir', institution, region, status:'pending', scope:'A avaliação curricular e a edição vigente deste processo ainda precisam ser confirmadas em edital oficial.' });
  }
  const psu=window.TraubeCurriculoRubricas.find(row=>row.institution==='PSU-MG');
  Object.assign(psu,{
    id:'psu-mg-2027-direto-v20260924', title:'PSU-MG / AREMG · 2027 · Entrada direta',edition:'2027',
    status:'reviewed',max:13,checkedAt:'2026-10-17',
    source:'https://www.galaxcms.com.br/up_crud_comum/601/Anexo1-AvaliacaoCurricularPadronizadaEntradaDiretaPSUMG2027-20260924112431.pdf',
    updates:'https://www.galaxcms.com.br/up_crud_comum/601/Retificacao2aosEditaisdoPSUMG2027-20261006110849.pdf',
    listing:'https://www.aremg.org.br/detalhes-do-processo/anexos-aos-editais-psu-mg-2027/2348',
    scope:'Entrada direta. Anexo 1 de 2027. Confira períodos, documentação, autoria e impedimentos no anexo; atividades concomitantes podem ser recusadas.',
    criteria:[
      {...criterion('mg-notas1','Histórico: primeiros 4 anos',1.5,5,'Faixa alcançada em 50% das disciplinas.',[part('mg-n1a','≥85',1.5),part('mg-n1b','≥80',1),part('mg-n1c','≥75',.5),part('mg-n1d','Demais faixas elegíveis',.25)]),exclusive:true},
      {...criterion('mg-notas2','Histórico: últimos 2 anos',1.5,5,'70% das disciplinas; conferir internatos mínimos.',[part('mg-n2a','≥85 / A',1.5),part('mg-n2b','≥80 / B',1),part('mg-n2c','Faixa inferior',.5),part('mg-n2d','Conceitual elegível',.25),part('mg-n2e','Apenas diploma / CRM',.1)]),exclusive:true},
      {...criterion('mg-lingua','Idioma estrangeiro',1,6,'Certificação e equivalência: páginas 6–8.',[part('mg-l1','Inglês avançado',1),part('mg-l2','Intermediário inglês / avançado outro idioma / formação elegível',.5),part('mg-l3','Intermediário outro idioma',.25)]),exclusive:true},
      criterion('mg-pratica','Estágio, PET e monitoria',2,9,'Confira duração, horas, instituição e concomitância.',[part('mg-estagio','Estágio / PET elegível',1),part('mg-monitoria','Monitoria: ≥16 semanas, ≥80h',1)]),
      criterion('mg-ic','Pesquisa',1.3,12,'Atividades distintas; conferir períodos e comprovação.',[part('mg-ic1','Bolsa: ≥6 meses, ≥80h',.5),part('mg-ic2','Participação adicional: ≥6 meses, ≥80h',.3),part('mg-ic3','Projeto CNPq distinto: ≥12 meses, ≥80h, resultado científico',.5)]),
      criterion('mg-eventos','Organização e palestra',.5,13,'Eventos elegíveis distintos, fora de ligas.',[part('mg-organiza','Organizador',.25),part('mg-palestra','Palestrante',.25)]),
      criterion('mg-liga','Liga e representação',1.1,14,'Confira cargos, carga horária e períodos.',[part('mg-liga1','Liga: 2 semestres, ≥50h',.8),part('mg-repr','Representação elegível: ≥1 ano',.3)]),
      criterion('mg-suporte','Suporte avançado à vida',.7,16,'Carteira válida de entidade reconhecida.',[part('mg-s1','Curso elegível: ≥16h',.7)]),
      {...criterion('mg-cursos','Cursos de temas médicos',.6,17,'Retificação nº 2 (05/10/2026): 0,6 ponto para dois cursos ou 0,3 para um, realizados nos últimos 5 anos, com pelo menos 8 horas cada. Devem ser emitidos formalmente pela AMB, associações médicas estaduais filiadas, sociedades reconhecidas pela AMB, CFM, CRM ou sindicato médico; não valem documentos de instituições de ensino, empresas, hospitais, clínicas ou cooperativas. Os dois cursos devem ser diferentes, de entidades diferentes e ter intervalo mínimo de 30 dias.',[part('mg-c1','Dois cursos elegíveis',.6),part('mg-c2','Um curso elegível',.3)]),exclusive:true},
      criterion('mg-ext','Extensão e comunidade',1,19,'Confira registro, horas e períodos.',[part('mg-x1','Extensão institucional elegível',.7),part('mg-x2','Conjunto de ações comunitárias elegível',.3)]),
      {...criterion('mg-trabalhos','Apresentação científica',.8,22,'Confira autoria, orientador com RQE e publicação.',[part('mg-t1','Apresentação elegível',.5),part('mg-t2','Apresentação com publicação elegível',.8)]),exclusive:true},
      {...criterion('mg-artigos','Artigo publicado',1,24,'Não basta aceite. Conferir autoria, RQE e indexação.',[part('mg-a1','MEDLINE/PubMed, Embase, Scopus ou Web of Science',1),part('mg-a2','SciELO/LILACS, Qualis ≥B2',.5)]),exclusive:true}
    ],
    groups:[
      {id:'formacao',title:'Formação',tone:'violet',criteria:['mg-notas1','mg-notas2']},
      {id:'pesquisa',title:'Pesquisa e publicações',tone:'amber',criteria:['mg-ic','mg-artigos','mg-trabalhos']},
      {id:'academicas',title:'Atividades acadêmicas',tone:'blue',criteria:['mg-pratica','mg-liga']},
      {id:'eventos',title:'Congressos e cursos',tone:'teal',criteria:['mg-eventos','mg-cursos','mg-suporte']},
      {id:'extensao',title:'Extensão e comunidade',tone:'rose',criteria:['mg-ext']},
      {id:'qualificacoes',title:'Qualificações',tone:'indigo',criteria:['mg-lingua']}
    ]
  });
  psu.criteria.forEach((row,index)=>{row.number=['1.1','1.2','2','3','4','5','6','7','8','9','10','11'][index];});
  const usprp=window.TraubeCurriculoRubricas.find(row=>row.institution==='USP-RP');
  Object.assign(usprp,{
    id:'usp-rp-2027-direto-v20260922', title:'USP-RP / HCFMRP · 2027 · Acesso direto', edition:'2027',
    status:'reviewed',max:10,checkedAt:'2026-10-17',
    source:'https://extranet.hcrp.usp.br/novorh/arquivos/3650/E3650239202610417.pdf',
    listing:'https://extranet.hcrp.usp.br/novorh/ListaArquivos.aspx?area=0&edital=3650&s=3',
    scope:'Acesso direto do HCFMRP-USP. Item 5 do edital 2027; a banca pode avaliar pertinência e qualidade das atividades, respeitando os tetos de cada bloco.',
    criteria:[
      criterion('rp-hospital','Hospital universitário da instituição de origem',.5,14,'Instituição de origem com hospital universitário próprio. Exige comprovação emitida pela instituição.',[part('rp-hospital','Hospital universitário próprio',.5)]),
      {...criterion('rp-pos','Pós-graduação da instituição de origem',.5,14,'Programas de pós-graduação na área da saúde credenciados pela CAPES. Selecione apenas uma faixa.',[part('rp-pos5','Cinco ou mais programas',.5),part('rp-pos24','Dois a quatro programas',.3),part('rp-pos1','Um programa',.2)]),exclusive:true},
      {...criterion('rp-enamed','Desempenho institucional no ENAMED',.5,14,'Conceito da instituição no último ENAMED. Selecione somente um conceito.',[part('rp-e1','Conceito 1',.1),part('rp-e2','Conceito 2',.2),part('rp-e3','Conceito 3',.3),part('rp-e4','Conceito 4',.4),part('rp-e5','Conceito 5',.5)]),exclusive:true},
      criterion('rp-assistencia','Atividades assistenciais extracurriculares',2,14,'Liga: pelo menos 1 ano letivo consecutivo e 80 horas. Voluntariado social: últimos 7 anos e 120 horas por atividade.',[part('rp-liga','Ano letivo de liga estudantil elegível',.5,2),part('rp-voluntario','Bloco de 120 horas de trabalho voluntário social elegível',.5,2)]),
      criterion('rp-ciencia','Atividades científicas',3,15,'Artigo completo, iniciação científica e apresentações. O teto do bloco é 3 pontos; não contar o mesmo período ou trabalho duas vezes.',[part('rp-artigo','Artigo completo elegível',1,3),part('rp-ic-sem','Ano de iniciação científica sem bolsa',.5,2),part('rp-ic-com','Ano de iniciação científica com bolsa',.7,2),part('rp-oral','Apresentação oral como primeiro autor',.5,2),part('rp-poster-reg','Pôster regional',.1,6),part('rp-poster-est','Pôster estadual',.15,4),part('rp-poster-nac','Pôster nacional',.2,3),part('rp-poster-int','Pôster internacional',.3,2)]),
      criterion('rp-ensino','Ensino extracurricular',1.5,15,'Monitoria com bolsa, docência em preparação para vestibular, organização de eventos científicos, provas avaliativas não obrigatórias e prêmios acadêmicos. O teto do bloco é 1,5 ponto.',[part('rp-monitoria','Semestre de monitoria com bolsa',.25,4),part('rp-docencia','Ano letivo de docência elegível',.5,2),part('rp-organiza','Evento científico organizado',.3,2),part('rp-prova','Prova avaliativa elegível',.5,2),part('rp-premio','Prêmio acadêmico institucional',.2,2)]),
      criterion('rp-estudantes','Atividades estudantis',2,16,'Cargos em entidades estudantis e representação discente, com pelo menos 1 ano letivo consecutivo e comprovação institucional. O teto do bloco é 2 pontos.',[part('rp-entidade','Ano letivo em cargo estudantil elegível',.5,2),part('rp-colegiado','Ano em colegiado oficial',.5,2),part('rp-comissao','Ano em comissão oficial de avaliação ou reforma curricular',.5,2)])
    ],
    groups:[
      {id:'formacao',title:'Histórico acadêmico',tone:'violet',criteria:['rp-hospital','rp-pos','rp-enamed']},
      {id:'academicas',title:'Assistência extracurricular',tone:'blue',criteria:['rp-assistencia']},
      {id:'pesquisa',title:'Atividades científicas',tone:'amber',criteria:['rp-ciencia']},
      {id:'ensino',title:'Ensino extracurricular',tone:'teal',criteria:['rp-ensino']},
      {id:'estudantis',title:'Atividades estudantis',tone:'rose',criteria:['rp-estudantes']}
    ]
  });
  usprp.criteria.find(row=>row.id==='rp-enamed').exclusive=true;
  const pucsp=window.TraubeCurriculoRubricas.find(row=>row.institution==='PUC-SP');
  Object.assign(pucsp,{
    id:'puc-sp-2027-direto-v20260904',title:'PUC-SP · 2027 · Área básica e acesso direto',edition:'2027',
    status:'reviewed',max:100,checkedAt:'2026-10-17',
    source:'https://www.nucvest.com.br/downloads/pucsp/residencia-medica/2027/abad/Edital-RM-2027-ABAD.pdf',
    listing:'https://www.nucvest.com.br/pucsp/residencia-medica/2027/abad/index.html',
    scope:'Área básica e acesso direto, item 4.4.4 do edital 2027. A avaliação curricular vale até 100 pontos, convertidos pela seleção em nota de 0 a 10.',
    criteria:[
      criterion('pucsp-monitoria','Monitoria',9,10,'Durante a graduação e certificada pela instituição de ensino. Menos de 6 meses não pontua.',[part('pucsp-mon6','Monitoria com 6 meses',3,3),part('pucsp-mon12','Monitoria com 12 meses',6,1)]),
      criterion('pucsp-ic','Iniciação científica ou projeto de extensão',20,10,'Durante a graduação, certificado pela instituição, órgão de fomento ou entidade indicada no edital. Exige 12 meses.',[part('pucsp-ic12','Atividade elegível de 12 meses',10,2)]),
      criterion('pucsp-pub','Publicações científicas em saúde',30,10,'Artigos avaliados pela CAPES, capítulos de livro e autoria ou coautoria de livros. O teto do bloco é 30 pontos.',[part('pucsp-pub5','Publicação de 5 pontos ou capítulo de livro',5,6),part('pucsp-pub10','Publicação de 10 pontos ou autoria/coautoria de livro',10,3)]),
      criterion('pucsp-trabalhos','Trabalhos apresentados em congressos',12,10,'Pôster ou apresentação oral. A pontuação varia conforme o alcance do congresso.',[part('pucsp-post-lr','Pôster locorregional',1,12),part('pucsp-oral-lr','Apresentação oral locorregional',2,6),part('pucsp-post-n','Pôster nacional',2,6),part('pucsp-oral-n','Apresentação oral nacional',3,4),part('pucsp-post-i','Pôster internacional',3,4),part('pucsp-oral-i','Apresentação oral internacional',4,3)]),
      criterion('pucsp-eventos','Participação em eventos',6,10,'Participação como ouvinte em congressos, cursos, jornadas, simpósios e eventos equivalentes.',[part('pucsp-cong-lr','Congresso locorregional',1,6),part('pucsp-cong-n','Congresso nacional',2,3),part('pucsp-cong-i','Congresso internacional',3,2),part('pucsp-outro-lr','Outro evento locorregional',.25,24),part('pucsp-outro-n','Outro evento nacional',.5,12),part('pucsp-outro-i','Outro evento internacional',1,6)]),
      criterion('pucsp-suporte','Cursos de suporte à vida',3,10,'ACLS, ATLS ou PALS, com certificado válido na data de envio da documentação.',[part('pucsp-suporte','Curso elegível e válido',1,3)]),
      criterion('pucsp-internato','Duração do internato',10,10,'O edital atribui 10 pontos ao internato com duração de 3 anos.',[part('pucsp-internato3','Internato de 3 anos',10)]),
      criterion('pucsp-representacao','Representação e gestão acadêmica',4,10,'Cargo em órgão colegiado, liga, atlética, centro acadêmico ou estrutura equivalente, com pelo menos 12 meses.',[part('pucsp-representa','Cargo elegível de pelo menos 12 meses',2,2)]),
      criterion('pucsp-premios','Prêmios em congressos',4,10,'Prêmio recebido pelo candidato em congresso locorregional, nacional ou internacional.',[part('pucsp-premio-lr','Prêmio locorregional',1,4),part('pucsp-premio-n','Prêmio nacional',2,2),part('pucsp-premio-i','Prêmio internacional',4)]),
      criterion('pucsp-idioma','Língua estrangeira',2,10,'Certificado de proficiência ou suficiência no respectivo idioma.',[part('pucsp-idioma','Idioma com certificado elegível',1,2)])
    ],
    groups:[
      {id:'academicas',title:'Atividades acadêmicas',tone:'blue',criteria:['pucsp-monitoria','pucsp-ic','pucsp-representacao']},
      {id:'pesquisa',title:'Pesquisa e publicações',tone:'amber',criteria:['pucsp-pub','pucsp-trabalhos','pucsp-premios']},
      {id:'eventos',title:'Congressos e formação complementar',tone:'teal',criteria:['pucsp-eventos','pucsp-suporte']},
      {id:'formacao',title:'Formação',tone:'violet',criteria:['pucsp-internato']},
      {id:'qualificacoes',title:'Qualificações',tone:'indigo',criteria:['pucsp-idioma']}
    ]
  });
  const unicamp=window.TraubeCurriculoRubricas.find(row=>row.institution==='UNICAMP');
  Object.assign(unicamp,{
    id:'unicamp-2027-direto-v20260916',title:'UNICAMP · 2027 · Acesso direto',edition:'2027',
    status:'reviewed',max:100,checkedAt:'2026-10-17',
    source:'https://portal.fcm.unicamp.br/wp-content/uploads/sites/58/2026/09/001-Edital-Acesso-Direto-2027.pdf',
    listing:'https://intranet.fcm.unicamp.br/editais/residencia-medica',
    scope:'Programas de acesso direto do item 1.1. A avaliação curricular vale até 100 pontos e compõe 10% da nota final; os documentos devem seguir a ordem do item 5.2.',
    criteria:[
      {...criterion('unicamp-pos','Pós-graduação da instituição formadora',15,6,'A instituição deve possuir programa em Medicina aceito pela CAPES. Selecione apenas a maior titulação aplicável.',[part('unicamp-doutorado','Doutorado stricto sensu',15),part('unicamp-mestrado','Mestrado stricto sensu',10)]),exclusive:true},
      {...criterion('unicamp-hospital','Hospital de ensino da instituição formadora',10,7,'Exige comprovante assinado pela comissão de ensino de graduação. Selecione apenas a situação aplicável.',[part('unicamp-hospital-proprio','Hospital de ensino próprio',10),part('unicamp-hospital-conveniado','Hospital de ensino formalmente conveniado',5)]),exclusive:true},
      {...criterion('unicamp-ic','Iniciação científica',20,7,'Comprovar duração, projeto, orientador e, quando houver, a agência ou instituição da bolsa. Não conte o mesmo projeto em mais de uma faixa.',[part('unicamp-ic-bolsa-mais','Com bolsa por mais de 2 semestres',20),part('unicamp-ic-bolsa-ate','Com bolsa por até 2 semestres',15),part('unicamp-ic-sem-mais','Sem bolsa por mais de 2 semestres',10),part('unicamp-ic-sem-ate','Sem bolsa por até 2 semestres',5)]),exclusive:true},
      criterion('unicamp-artigos','Artigos científicos completos',15,7,'Artigo publicado ou aceito, com identificação do candidato entre os autores e DOI. O teto do bloco é 15 pontos.',[part('unicamp-pubmed','Artigo indexado no PubMed',10,2),part('unicamp-scielo','Artigo indexado no SciELO',5,3)]),
      criterion('unicamp-congressos','Trabalhos apresentados em congresso',10,7,'Certificado deve identificar autoria ou coautoria, forma de apresentação e evento. O teto do bloco é 10 pontos.',[part('unicamp-oral-sociedade','Apresentação oral em congresso de sociedade médica nacional ou internacional',10),part('unicamp-poster-sociedade','Pôster em congresso de sociedade médica nacional ou internacional',6),part('unicamp-oral-local','Apresentação oral em congresso médico acadêmico local ou regional',2,5),part('unicamp-poster-local','Pôster em congresso médico acadêmico local ou regional',2,5)]),
      criterion('unicamp-liga','Liga acadêmica',5,8,'Participação mínima de 2 semestres na mesma liga, com certificado e relatório do coordenador médico.',[part('unicamp-liga','Participação elegível em liga acadêmica',5)]),
      {...criterion('unicamp-monitoria','Monitoria ou aperfeiçoamento didático',5,8,'Certificado ou declaração deve informar duração, carga horária e atividade. Selecione apenas uma faixa.',[part('unicamp-monitoria-mais','Mais de 2 semestres letivos',5),part('unicamp-monitoria-ate','Até 2 semestres letivos',2)]),exclusive:true},
      {...criterion('unicamp-extensao','Programa ou projeto de extensão',10,8,'Exclui atividades regulares da graduação. O certificado deve informar duração e atividade. Selecione apenas uma faixa.',[part('unicamp-extensao-96','Mais de 96 horas',10),part('unicamp-extensao-48','Mais de 48 e menos de 96 horas',5)]),exclusive:true},
      criterion('unicamp-representacao','Representação estudantil em colegiados',5,8,'Representação discente institucional por pelo menos 2 semestres; exclui ligas, centro acadêmico, atlética e equipe esportiva.',[part('unicamp-representacao','Representação elegível em colegiado',5)]),
      criterion('unicamp-entidades','Centro acadêmico, atlética e equipe universitária',5,9,'Atividade por pelo menos 2 semestres, comprovada pela instituição. O teto conjunto é 5 pontos.',[part('unicamp-ca','Diretoria de centro ou diretório acadêmico',2,2),part('unicamp-atletica','Diretoria de atlética',2,2),part('unicamp-equipe','Equipe esportiva universitária ou bateria',1,5)])
    ],
    groups:[
      {id:'formacao',title:'Instituição de formação',tone:'violet',criteria:['unicamp-pos','unicamp-hospital']},
      {id:'pesquisa',title:'Pesquisa e publicações',tone:'amber',criteria:['unicamp-ic','unicamp-artigos']},
      {id:'eventos',title:'Congressos',tone:'teal',criteria:['unicamp-congressos']},
      {id:'academicas',title:'Atividades acadêmicas',tone:'blue',criteria:['unicamp-liga','unicamp-monitoria']},
      {id:'extensao',title:'Extensão e representação',tone:'rose',criteria:['unicamp-extensao','unicamp-representacao','unicamp-entidades']}
    ]
  });
  const ufpa=window.TraubeCurriculoRubricas.find(row=>row.institution==='UFPA');
  Object.assign(ufpa,{
    id:'ufpa-2026-v20250918',title:'UFPA · 2026 · Residência médica',edition:'2026',
    status:'reviewed',max:100,checkedAt:'2026-10-17',
    source:'https://www.ceps.ufpa.br/images/conteudo/residencia/medica%202026/editais%20avisos/ANEXO-II-FICHA-AVALIACAO-CURRICULO.pdf',
    listing:'https://www.ceps.ufpa.br/index.php/medica2026/998-editais/2245-anexos',
    scope:'Matriz oficial mais recente disponível no portal da UFPA em 17/10/2026. O processo 2027 ainda não estava publicado; esta edição 2026 deve ser revisada quando a nova ficha sair.',
    criteria:[
      criterion('ufpa-projetos','Pesquisa, extensão, iniciação científica ou PET',24,1,'Cada certificado deve ter pelo menos 180 horas e atender à assinatura institucional exigida na ficha. O teto é de três documentos.',[part('ufpa-projeto-bolsa','Projeto elegível com bolsa',8,3),part('ufpa-projeto-voluntario','Projeto elegível como voluntário',7,3)]),
      {...criterion('ufpa-monitoria','Monitoria ou estágio não obrigatório',6,1,'Atividade em disciplina da área médica, com pelo menos 180 horas e comprovação institucional. Apenas um documento é avaliado.',[part('ufpa-monitoria-bolsa','Monitoria ou estágio elegível com bolsa',6),part('ufpa-monitoria-voluntario','Monitoria ou estágio elegível como voluntário',5)]),exclusive:true},
      criterion('ufpa-artigos','Artigos científicos completos',30,1,'Artigo completo publicado em revista da área da saúde ou afins, de qualquer Qualis. Resumos e anais não pontuam.',[part('ufpa-artigo','Artigo científico elegível',10,3)]),
      criterion('ufpa-apresentacoes','Trabalhos em eventos científicos',20,1,'Apresentação oral ou pôster em evento científico. No máximo dois documentos.',[part('ufpa-apresentacao','Trabalho apresentado em evento científico',10,2)]),
      criterion('ufpa-eventos','Eventos científicos e cursos',10,1,'Ouvinte, organizador ou curso oficial com pelo menos 30 horas; cada documento vale 1 ponto.',[part('ufpa-evento','Documento elegível',1,10)]),
      criterion('ufpa-idiomas','Línguas estrangeiras',10,1,'Curso oficial com mais de 150 horas ou teste formal e reconhecido. A mesma língua pontua apenas uma vez.',[part('ufpa-idioma','Idioma elegível',5,2)])
    ],
    groups:[
      {id:'pesquisa',title:'Pesquisa e publicações',tone:'amber',criteria:['ufpa-projetos','ufpa-artigos','ufpa-apresentacoes']},
      {id:'academicas',title:'Atividades acadêmicas',tone:'blue',criteria:['ufpa-monitoria']},
      {id:'eventos',title:'Eventos e cursos',tone:'teal',criteria:['ufpa-eventos']},
      {id:'qualificacoes',title:'Qualificações',tone:'indigo',criteria:['ufpa-idiomas']}
    ]
  });
  const santacasasp=window.TraubeCurriculoRubricas.find(row=>row.institution==='Santa Casa SP');
  Object.assign(santacasasp,{
    id:'santa-casa-sp-2027-direto-v20260921',title:'Santa Casa SP · 2027 · Acesso direto',edition:'2027',
    status:'reviewed',max:10,checkedAt:'2026-10-17',
    source:'https://www.concursosfcc.com.br/concursos/scmsp126/edital_de_abertura_21_09_26_publicar_2.pdf',
    updates:'https://www.concursosfcc.com.br/concursos/scmsp126/retificacao_01.pdf',
    listing:'https://www.concursosfcc.com.br/concursos/scmsp126/index.html',
    scope:'Matriz de 2027 para os programas de acesso direto listados no primeiro grupo do Anexo II. Programas com pré-requisito usam outras matrizes e não devem ser calculados neste cartão.',
    criteria:[
      {...criterion('scsp-enamed','Conceito da instituição no ENAMED 2025',2.5,26,'Conceito da faculdade onde cursou a graduação. Exige documento assinado pela Diretoria da Faculdade de Medicina.',[part('scsp-enamed5','Conceito 5',2.5),part('scsp-enamed4','Conceito 4',1.5),part('scsp-enamed3','Conceito 3',1),part('scsp-enamed2','Conceito 2',.5)]),exclusive:true},
      {...criterion('scsp-hospital','Internato em hospital de ensino',2,26,'Exige documento assinado pela Diretoria da Faculdade de Medicina. Selecione somente a situação aplicável.',[part('scsp-hospital-proprio','Hospital de ensino próprio',2),part('scsp-hospital-conveniado','Hospital de ensino formalmente conveniado',.5)]),exclusive:true},
      criterion('scsp-artigos','Artigos em revista indexada',1,26,'Artigo em periódico indexado no PubMed ou SciELO. O teto é de dois artigos.',[part('scsp-artigo','Artigo indexado elegível',.5,2)]),
      {...criterion('scsp-anais','Artigos em anais de congresso',.5,26,'Publicações diferentes das usadas em revista indexada. Selecione apenas uma faixa.',[part('scsp-anais1','Um artigo',.25),part('scsp-anais2','Dois ou mais artigos',.5)]),exclusive:true},
      {...criterion('scsp-ic','Atividade científica',1,26,'Atividade científica com ou sem bolsa. Selecione somente a situação aplicável.',[part('scsp-ic-fomento','Com bolsa federal ou estadual de fomento prevista no edital',1),part('scsp-ic-outra','Com outra bolsa ou sem bolsa',.5)]),exclusive:true},
      {...criterion('scsp-monitoria','Monitoria',1,26,'A mesma monitoria deve ter a duração e a carga horária mínima indicadas no edital. Selecione apenas uma faixa.',[part('scsp-monitoria2','Dois ou mais semestres e pelo menos 128 horas',1),part('scsp-monitoria1','Um semestre e pelo menos 64 horas',.5)]),exclusive:true},
      criterion('scsp-eventos','Congressos, simpósios e jornadas',1,27,'O certificado deve indicar a função. O teto conjunto é 1 ponto.',[part('scsp-evento-ativo','Organizador, palestrante ou apresentador oral',.5,2),part('scsp-evento-ouvinte','Ouvinte',.25,4)]),
      {...criterion('scsp-ligas','Ligas acadêmicas',1,27,'Certificado institucional com o período da atividade. Selecione apenas uma faixa.',[part('scsp-liga2','Dois ou mais semestres na mesma liga',1),part('scsp-liga1','Um semestre na mesma liga',.5)]),exclusive:true}
    ],
    groups:[
      {id:'formacao',title:'Instituição de formação',tone:'violet',criteria:['scsp-enamed','scsp-hospital']},
      {id:'pesquisa',title:'Pesquisa e publicações',tone:'amber',criteria:['scsp-artigos','scsp-anais','scsp-ic']},
      {id:'academicas',title:'Atividades acadêmicas',tone:'blue',criteria:['scsp-monitoria','scsp-ligas']},
      {id:'eventos',title:'Congressos e jornadas',tone:'teal',criteria:['scsp-eventos']}
    ]
  });
  const psugo=window.TraubeCurriculoRubricas.find(row=>row.institution==='PSU-GO');
  Object.assign(psugo,{
    id:'psu-go-2027-direto-v20260924',title:'PSU-GO · 2027 · Entrada direta',edition:'2027',
    status:'reviewed',max:10,checkedAt:'2026-10-17',
    source:'https://www.galaxcms.com.br/up_crud_comum/601/Anexo2AvaliacaoCurricularPadronizadaEntradaDiretaPSUGO2027-20260924103521.pdf',
    listing:'https://mail.aremg.org.br/detalhes-do-processo/anexos-aos-editais-psu-go-2027/2382',
    scope:'Entrada direta do PSU-GO 2027. O anexo oficial fixa 10 pontos para a segunda etapa; confira as exigências documentais e os períodos válidos antes do envio.',
    criteria:[
      criterion('go-formacao','Comprovação da formação',.1,2,'Diploma, CRM ou declaração elegível de conclusão, conforme o item 1.',[part('go-formacao','Documento de formação elegível',.1)]),
      criterion('go-monitoria','Monitoria',.5,2,'Cada semestre letivo vale 0,25 ponto. Duração mínima de 4 meses e declaração oficial com o período.',[part('go-monitoria','Semestre letivo de monitoria elegível',.25,2)]),
      criterion('go-pesquisa','Pesquisa com bolsa',.9,2,'Programa oficial ou agência de fomento; certificado ou declaração do responsável ou órgão financiador.',[part('go-pesquisa','Pesquisa de iniciação científica com bolsa',.45,2)]),
      criterion('go-trabalhos','Trabalhos científicos apresentados',1,2,'Apresentação em congresso médico como autor ou coautor, realizada entre 2020 e 2026.',[part('go-trabalho','Trabalho científico elegível',.25,4)]),
      criterion('go-publicacoes','Artigos completos e capítulos de livro',1.5,2,'Publicação com corpo editorial, realizada entre 2020 e 2026. Exige documentação do periódico.',[part('go-publicacao','Artigo completo ou capítulo elegível',.5,3)]),
      criterion('go-eventos','Congressos, jornadas e extensão',1,2,'Evento entre 2020 e 2026, com pelo menos 8 horas ou 2 dias consecutivos, nos termos do item 6.',[part('go-evento','Evento elegível',.1,10)]),
      criterion('go-ligas','Ligas acadêmicas',.5,2,'0,25 por ano, observados o limite e os períodos não coincidentes do item 7.',[part('go-liga','Ano elegível de liga',.25,2)]),
      criterion('go-representacao','Representação estudantil',.5,2,'Representação titular nos cargos e órgãos previstos no item 8.',[part('go-representacao','Representação elegível',.25,2)]),
      criterion('go-progresso','Teste de progresso e desempenho institucional',1.5,2,'Teste de progresso vale 0,5 por participação, até três. O conceito institucional acrescenta 0,2, 0,3 ou 0,4; informe apenas o conceito aplicável. O teto conjunto é 1,5 ponto.',[part('go-teste','Participação em teste de progresso',.5,3),part('go-enamed3','Conceito institucional 3',.2),part('go-enamed4','Conceito institucional 4',.3),part('go-enamed5','Conceito institucional 5',.4)]),
      criterion('go-suporte','Suporte avançado à vida',1,2,'ATLS, ACLS, BLS, PALS ou PHTLS válido, realizado nos últimos 2 anos, com menção expressa de aprovação.',[part('go-suporte','Curso elegível com aprovação',.5,2)]),
      criterion('go-proficiencia','Prova de proficiência em Medicina',1,2,'Uma prova realizada por associação ou conselho médico regional, com declaração de participação e aprovação.',[part('go-proficiencia','Prova elegível com aprovação',1)]),
      criterion('go-estagio','Estágio supervisionado',.5,2,'Estágio no Brasil ou exterior, com pelo menos 1 mês e certificado assinado pela instituição e orientador. Inclui eletivo.',[part('go-estagio','Estágio elegível',.5)])
    ],
    groups:[
      {id:'formacao',title:'Formação e desempenho',tone:'violet',criteria:['go-formacao','go-progresso','go-proficiencia']},
      {id:'pesquisa',title:'Pesquisa e publicações',tone:'amber',criteria:['go-pesquisa','go-trabalhos','go-publicacoes']},
      {id:'academicas',title:'Atividades acadêmicas',tone:'blue',criteria:['go-monitoria','go-ligas','go-representacao','go-estagio']},
      {id:'eventos',title:'Eventos e suporte à vida',tone:'teal',criteria:['go-eventos','go-suporte']}
    ]
  });
  const puccampinas=window.TraubeCurriculoRubricas.find(row=>row.institution==='PUC-Campinas');
  Object.assign(puccampinas,{
    id:'puc-campinas-2027-direto-v20260915',title:'PUC-Campinas · 2027 · Acesso direto',edition:'2027',
    status:'reviewed',max:100,checkedAt:'2026-10-17',
    source:'https://www.tekyou.com.br/puccampinas/selecao2027/edital/PUCCampinas27_ResidenciaMedica.pdf',
    updates:'https://www.tekyou.com.br/puccampinas/selecao2027/edital/PUCCampinas27_Errata1.pdf',
    listing:'https://www.tekyou.com.br/puccampinas/selecao2027/',
    scope:'Programas de acesso direto, Anexo I do edital 2027. A avaliação curricular vale 100 pontos e compõe 10% da nota final. Sanções disciplinares na graduação deduzem 5 pontos cada.',
    criteria:[
      {...criterion('puccamp-hospital','Hospital de ensino da instituição formadora',10,21,'Selecione somente a condição aplicável.',[part('puccamp-hospital-proprio','Hospital de ensino próprio',10),part('puccamp-hospital-conveniado','Hospital de ensino formalmente conveniado',3)]),exclusive:true},
      criterion('puccamp-pos','Pós-graduação da instituição formadora',4,21,'A instituição formadora possui programa de mestrado ou doutorado em Medicina.',[part('puccamp-pos','Mestrado ou doutorado em Medicina na instituição',4)]),
      {...criterion('puccamp-enamed-instituicao','Conceito institucional no ENAMED',4,21,'Selecione somente o conceito da instituição formadora.',[part('puccamp-enamed3','Conceito institucional 3',1),part('puccamp-enamed4','Conceito institucional 4 ou 5',4)]),exclusive:true},
      {...criterion('puccamp-monitoria','Monitoria',10,21,'Certificado institucional com a carga horária total. Selecione a maior faixa cumprida pela atividade.',[part('puccamp-mon192','Pelo menos 192 horas',10),part('puccamp-mon128','Pelo menos 128 horas',4),part('puccamp-mon64','Pelo menos 64 horas',2)]),exclusive:true},
      {...criterion('puccamp-enamed-aluno','Nota individual no ENAMED',4,21,'Selecione somente a faixa correspondente à nota do candidato.',[part('puccamp-aluno8','Nota igual ou superior a 8',4),part('puccamp-aluno6','Nota igual ou superior a 6 e inferior a 8',2)]),exclusive:true},
      criterion('puccamp-suporte','Cursos de suporte e emergência',4,21,'Curso de curta duração com mais de 12 horas entre os previstos no edital, com data, duração e entidade organizadora no certificado.',[part('puccamp-curso','Curso elegível',1,4)]),
      {...criterion('puccamp-sancoes','Sanções disciplinares',0,21,'Cada sanção disciplinar durante a graduação deduz 5 pontos da avaliação curricular.',[part('puccamp-sancao','Sanção disciplinar comprovada',-5,20)]),deduction:true,min:-100},
      criterion('puccamp-artigos','Artigos científicos',10,21,'Artigos completos em periódicos indexados. Não repita a mesma publicação em faixas diferentes; anexe autoria, referência e DOI.',[part('puccamp-artigo1','Artigo em periódico indexado',1,10),part('puccamp-artigo2','Artigo com fator de impacto até 0,5',2,5),part('puccamp-artigo10','Artigo com fator de impacto maior que 1,0',10)]),
      criterion('puccamp-congressos','Comunicações em congressos',10,21,'Tema livre ou pôster, conforme o alcance do congresso. O teto do bloco é 10 pontos.',[part('puccamp-oral-int','Tema livre em congresso internacional',4,3),part('puccamp-poster-int','Pôster em congresso internacional',2,5),part('puccamp-oral-nac','Tema livre em congresso nacional',2,5),part('puccamp-poster-nac','Pôster em congresso nacional',1,10),part('puccamp-oral-reg','Tema livre em congresso regional',1,10),part('puccamp-poster-reg','Pôster em congresso regional',.5,20),part('puccamp-academico','Comunicação em congresso acadêmico oficial',.5,20)]),
      criterion('puccamp-ic','Iniciação científica',14,21,'Participação efetiva em pesquisa, comprovada pela instituição.',[part('puccamp-ic-bolsa','Pesquisa com bolsa de iniciação científica',10),part('puccamp-ic-sem','Pesquisa sem bolsa de iniciação científica',4)]),
      criterion('puccamp-ligas','Ligas e representação estudantil',5,21,'O teto conjunto é 5 pontos. Não repita o mesmo período ou vínculo em mais de uma faixa.',[part('puccamp-liga-diretoria','Diretoria de liga por um ano',4),part('puccamp-liga2','Ligante por pelo menos 2 anos',2),part('puccamp-liga1','Ligante por pelo menos 1 ano',1),part('puccamp-representacao','Representação estudantil, departamento científico ou atlética',2,3)]),
      criterion('puccamp-organizacao','Organização de eventos',10,21,'Congressos organizados por entidade profissional de classe valem 2 pontos; jornadas e eventos de ligas valem 1 ponto.',[part('puccamp-org-congresso','Congresso estadual, nacional ou internacional elegível',2,5),part('puccamp-org-liga','Jornada ou evento organizado por liga acadêmica',1,10)]),
      {...criterion('puccamp-voluntariado','Voluntariado',5,21,'Atividade comprovada. Selecione somente a faixa correspondente ao total de horas.',[part('puccamp-vol100','Mais de 100 horas',5),part('puccamp-vol50','Entre 50 e 100 horas',2)]),exclusive:true},
      criterion('puccamp-ingles','Proficiência em inglês',10,21,'Certificação prevista no edital com nível igual ou superior a B2, ou TOEFL igual ou superior a 460.',[part('puccamp-ingles','Proficiência elegível',10)])
    ],
    groups:[
      {id:'formacao',title:'Curso de graduação',tone:'violet',criteria:['puccamp-hospital','puccamp-pos','puccamp-enamed-instituicao','puccamp-monitoria','puccamp-enamed-aluno','puccamp-suporte','puccamp-sancoes']},
      {id:'pesquisa',title:'Pesquisa e publicações',tone:'amber',criteria:['puccamp-artigos','puccamp-ic']},
      {id:'eventos',title:'Congressos e apresentações',tone:'teal',criteria:['puccamp-congressos','puccamp-organizacao']},
      {id:'extensao',title:'Voluntariado e órgãos colegiados',tone:'rose',criteria:['puccamp-ligas','puccamp-voluntariado']},
      {id:'qualificacoes',title:'Proficiência',tone:'indigo',criteria:['puccamp-ingles']}
    ]
  });
  const fmabc=window.TraubeCurriculoRubricas.find(row=>row.institution==='FMABC');
  Object.assign(fmabc,{
    id:'fmabc-2027-direto-v20260923',title:'FMABC · 2027 · Acesso direto',edition:'2027',
    status:'reviewed',max:10,checkedAt:'2026-10-17',
    source:'https://arquivos-site.avalia.org.br/publicacoes/d16d85c3-794c-489e-b76d-72695ca65753.pdf',
    listing:'https://www.avalia.org.br/concursos/640',
    scope:'Especialidades de acesso direto, Anexo I do edital 001/2027. A análise curricular vale até 10 pontos e considera somente atividades realizadas durante o curso de Medicina.',
    criteria:[
      criterion('fmabc-extras','Estágios e atividades extracurriculares',4,37,'Atividades realizadas durante a graduação. Cada item tem teto próprio e o bloco soma até 4 pontos.',[part('fmabc-progresso','Quatro ou mais testes de progresso interinstitucionais elegíveis',1),part('fmabc-estagio','Estágio ou eletivo com mais de 120 horas e pelo menos 20 dias',1),part('fmabc-associacao','Associação acadêmica por pelo menos 6 meses',.5),part('fmabc-social','Projeto social ou extensão junto à comunidade',.5),part('fmabc-acls','ACLS comprovado',.5),part('fmabc-colegiado','Representação em órgão colegiado institucional',.5)]),
      criterion('fmabc-monitoria','Monitorias',1.5,37,'Monitorias comprovadas pela instituição; não repita a mesma atividade em duas faixas.',[part('fmabc-mon-ano','Monitoria de pelo menos 40 horas e 1 ano',1),part('fmabc-mon-sem','Monitoria de 20 a 40 horas e 1 semestre',.5)]),
      criterion('fmabc-ic','Iniciação científica',1,37,'Participação em grupo regular de pesquisa, com ou sem bolsa, por pelo menos 1 ano.',[part('fmabc-ic','Iniciação científica elegível',1)]),
      {...criterion('fmabc-artigos','Artigos completos indexados',1,37,'Publicação completa em revista indexada no PubMed ou LILACS. Resumo em anais não pontua.',[part('fmabc-artigo2','Dois ou mais artigos elegíveis',1),part('fmabc-artigo1','Um artigo elegível',.5)]),exclusive:true},
      {...criterion('fmabc-trabalhos','Trabalhos em eventos científicos',1,37,'Tema livre, pôster ou apresentação oral, com a categoria descrita no certificado.',[part('fmabc-trabalho2','Dois ou mais trabalhos elegíveis',1),part('fmabc-trabalho1','Um trabalho elegível',.5)]),exclusive:true},
      criterion('fmabc-organizacao','Organização de eventos acadêmicos',.5,37,'Organização de liga, jornada acadêmica, curso, simpósio, congresso ou evento equivalente.',[part('fmabc-organizacao','Organização elegível',.5)]),
      {...criterion('fmabc-eventos','Participação em eventos',.5,37,'Jornadas, cursos, simpósios, congressos e eventos equivalentes, com a categoria descrita no certificado.',[part('fmabc-eventos4','Quatro ou mais eventos',.5),part('fmabc-eventos3','Até três eventos',.25)]),exclusive:true},
      criterion('fmabc-ingles','Proficiência em inglês',.5,37,'Teste reconhecido previsto no edital. Certificados de cursos de inglês não são aceitos.',[part('fmabc-ingles','Proficiência elegível',.5)])
    ],
    groups:[
      {id:'academicas',title:'Atividades acadêmicas',tone:'blue',criteria:['fmabc-extras','fmabc-monitoria']},
      {id:'pesquisa',title:'Pesquisa e publicações',tone:'amber',criteria:['fmabc-ic','fmabc-artigos','fmabc-trabalhos']},
      {id:'eventos',title:'Eventos científicos',tone:'teal',criteria:['fmabc-organizacao','fmabc-eventos']},
      {id:'qualificacoes',title:'Proficiência',tone:'indigo',criteria:['fmabc-ingles']}
    ]
  });
  Object.assign(window.TraubeCurriculoRubricas.find(row=>row.institution==='UNIFESP'),{
    id:'unifesp-2027-por-programa-v20260923',title:'UNIFESP · 2027 · Matrizes por programa',edition:'2027',status:'program-specific',checkedAt:'2026-10-17',
    source:'https://documento.vunesp.com.br/documento/stream/Nzg4NzcyOA%3d%3d',listing:'https://www.vunesp.com.br/UFSP2602',
    scope:'O edital oficial de 2027 traz matrizes diferentes para cada programa e especialidade. Uma nota única para UNIFESP seria incorreta; o simulador por especialidade será liberado quando essa seleção for adicionada.'
  });
  Object.assign(window.TraubeCurriculoRubricas.find(row=>row.institution==='Einstein'),{
    id:'einstein-2027-pesos-pendentes-v20260803',title:'Einstein · 2027 · Pesos ainda não publicados',edition:'2027',status:'weights-pending',checkedAt:'2026-10-17',
    source:'https://documento.vunesp.com.br/documento/stream/Nzc3MTg1NA%3d%3d',listing:'https://www.vunesp.com.br/FEAE2603',
    scope:'O edital oficial de 2027 prevê análise curricular, mas determina que as atividades e os respectivos pesos sejam publicados em aditivo específico. Esse aditivo ainda não constava nas publicações oficiais em 17/10/2026.'
  });
  // SES-PE: avaliação curricular comum aos programas de Residência Médica, item 9 do edital 2027.
  Object.assign(window.TraubeCurriculoRubricas.find(row=>row.institution==='SES-PE'),{
    id:'ses-pe-2027-r1-v20261020',title:'SES-PE / SUS-PE · 2027 · R1',edition:'2027',
    status:'reviewed',max:100,checkedAt:'2026-10-28',
    source:'https://www.upenet.com.br/concursos/2027/27_RED_MED/Edital-e-Anexos/EDITAL%20RESID%C3%8ANCIA%20M%C3%89DICA-SUS-PE%202027%20-%20PUBLICA%C3%87%C3%83O.pdf',
    listing:'https://www.upenet.com.br/concursos/2027/27_RED_MED/?concurso=27_resid_Med',
    scope:'Acesso direto (R1), item 9, pp. 11–13. Prova 90%, currículo 10%. Enviar cada comprovante no campo e PDF próprios durante a inscrição. Conferir a errata oficial de 23/10/2026 e exigências de assinatura, período, autoria e não sobreposição.',
    criteria:[
      {...criterion('pe-historico','Aproveitamento curricular (média geral)',30,12,'Média global na escala 0–10 ou equivalente. Documentos oficiais; em situações sem equivalência aceita, aplica-se a faixa de 5 pontos.',[
        part('pe-h90','Média geral maior ou igual a 9,0',30),part('pe-h80','Média geral maior ou igual a 8,0 e menor que 9,0',20),part('pe-h70','Média geral maior ou igual a 7,0 e menor que 8,0',10),part('pe-houtro','Média inferior ou conceitos sem equivalência reconhecida',5)
      ]),exclusive:true},
      criterion('pe-monitoria','Monitoria e/ou PID',15,12,'5 pontos por semestre elegível; cada semestre deve ter ao menos 108 horas e comprovação institucional.',[part('pe-mon','Semestre elegível (mínimo de 108 h)',5,3)]),
      criterion('pe-pesquisa','Iniciação científica (PIBIC, PIC, PIBITI, PIVIC)',15,12,'5 pontos por ano de projeto elegível. Ver requisitos de participação, duração, carga horária e documentação do item 9.7.',[part('pe-ic','Ano elegível de projeto de pesquisa',5,3)]),
      criterion('pe-extensao','Extensão, PET-Saúde, PET ou VER-SUS',20,12,'5 pontos por semestre de atividade elegível, com documentos exigidos no item 9.7.',[part('pe-ext','Semestre elegível',5,4)]),
      criterion('pe-artigo','Artigo publicado com orientador ou preceptor',5,12,'Artigo de saúde publicado com participação de orientador e/ou preceptor; verificar autoria, publicação e comprovantes.',[part('pe-art','Artigo elegível publicado',5)]),
      criterion('pe-oral','Apresentação oral / comunicação coordenada',10,12,'2 pontos por trabalho em evento científico; até 5 trabalhos.',[part('pe-oral','Trabalho elegível apresentado oralmente',2,5)]),
      criterion('pe-poster','Apresentação de pôster',5,12,'1 ponto por trabalho em evento científico; até 5 trabalhos.',[part('pe-post','Trabalho elegível apresentado em pôster',1,5)])
    ],
    groups:[
      {id:'formacao',title:'Histórico escolar',tone:'violet',criteria:['pe-historico']},
      {id:'academicas',title:'Monitoria e iniciação científica',tone:'blue',criteria:['pe-monitoria','pe-pesquisa']},
      {id:'extensao',title:'Extensão e comunidade',tone:'rose',criteria:['pe-extensao']},
      {id:'pesquisa',title:'Produção científica',tone:'amber',criteria:['pe-artigo','pe-oral','pe-poster']}
    ]
  });

  const unifesp=window.TraubeCurriculoRubricas.find(row=>row.institution==='UNIFESP');
  const unifespPdf='https://ipmeducacao.com.br/wp-content/uploads/2026/10/UFSP2602_224_20260923140351.pdf-1.pdf';
  // Edital nº 690/2026, item 15.1.7 (a partir da página impressa 23).
  // Sem transcrição individual validada, o programa é selecionável, mas SEM nota inventada.
  const r1Names=[
    'Acupuntura','Anestesiologia','Cirurgia Cardiovascular','Cirurgia Geral','Clínica Médica',
    'Dermatologia','Genética Médica','Infectologia','Medicina de Emergência',
    'Medicina de Família e Comunidade','Medicina de Tráfego','Medicina Esportiva',
    'Medicina Intensiva','Medicina Preventiva e Social','Neurocirurgia','Neurologia',
    'Obstetrícia e Ginecologia','Oftalmologia','Ortopedia e Traumatologia',
    'Otorrinolaringologia','Patologia','Patologia Clínica e Medicina Laboratorial',
    'Pediatria','Psiquiatria','Radiologia e Diagnóstico por Imagem','Radioterapia'
  ];
  const slug=text=>text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  unifesp.specialties=r1Names.map(name=>({
    id:'unifesp-2027-r1-'+slug(name),
    title:'UNIFESP · 2027 · '+name+' (R1)',institution:'UNIFESP',region:'SP',edition:'2027',
    specialty:name,status:'program-specific',checkedAt:'2026-10-28',
    source:unifespPdf,listing:'https://www.vunesp.com.br/UFSP2602',
    scope:'Quadro individual de '+name+' no item 15.1.7 do Edital nº 690/2026. A especialidade está cadastrada, mas seus subitens ainda precisam de transcrição e validação individual antes de liberar a nota. Não utilizar pontuação de outra especialidade.',
    criteriaOverview:[
      'Instituição de origem e desempenho acadêmico','Atividades científicas e publicações',
      'Monitoria, extensão e atividades extracurriculares','Congressos e cursos',
      'Representação, distinções e proficiência — conforme quadro individual'
    ]
  }));
  const uniSelect=name=>unifesp.specialties.find(r=>r.specialty===name);
  Object.assign(uniSelect('Cirurgia Geral'),{
    status:'reviewed',max:12,
    source:unifespPdf,
    scope:'Acesso direto R1, edital 690/2026, pp. 28–30; oito itens, máximo bruto de 12 pontos. Nota final da etapa = pontos × 10 / 12 (truncada pela banca a duas casas). Atividades válidas uma vez, com comprovantes formais, e prazos mínimos previstos em cada item.',
    criteria:[
      criterion('uni-cg-centro','Formação em centro de excelência',2,28,'Cumulativamente: hospital de ensino, residência médica credenciada, residência multiprofissional e programa stricto sensu com mestrado e doutorado; todos comprovados.',[part('uni-cg-centro1','Todos os quatro requisitos comprovados',2)]),
      {...criterion('uni-cg-artigos','Artigo MEDLINE/PubMed',2,29,'Pelo menos um artigo aceito formalmente ou publicado e indexado; pontua a melhor posição de autoria, uma única vez.',[part('uni-cg-art-12','Primeiro ou segundo autor',2),part('uni-cg-art-outro','Outra posição de autoria',1)]),exclusive:true},
      {...criterion('uni-cg-congresso','Congresso nos últimos 2 anos',2,29,'Somente Congresso de sociedade médica elegível; jornadas, fóruns e seminários não são aceitos.',[part('uni-cg-cong-trab','Congresso com apresentação comprovada',2),part('uni-cg-cong-ouv','Congresso sem apresentação',1)]),exclusive:true},
      criterion('uni-cg-rep','Representação estudantil/acadêmica',1,29,'Cargo formal por ao menos 12 meses ininterruptos.',[part('uni-cg-rep1','Cargo elegível e período comprovado',1)]),
      {...criterion('uni-cg-ic','Iniciação científica',2,29,'Mínimo de 12 meses ininterruptos; projeto e bolsa documentalmente comprovados.',[part('uni-cg-ic-b','Com bolsa',2),part('uni-cg-ic-v','Voluntária',1)]),exclusive:true},
      criterion('uni-cg-extra','Atividade extracurricular acadêmica',1,30,'Monitoria, liga, extensão ou voluntariado médico formal por pelo menos 12 meses ininterruptos; uma vez.',[part('uni-cg-extra1','Atividade elegível',1)]),
      criterion('uni-cg-premio','Prêmio ou distinção acadêmica',1,30,'Prêmio científico de primeiro lugar, láurea ou distinção médica formal elegível.',[part('uni-cg-premio1','Prêmio ou distinção válida',1)]),
      criterion('uni-cg-idioma','Proficiência em idioma estrangeiro',1,30,'Teste oficial no patamar exigido (ex.: TOEFL iBT ≥80 ou IELTS ≥6,5). Curso de idioma não substitui exame.',[part('uni-cg-idioma1','Exame de proficiência válido',1)])
    ],
    groups:[
      {id:'formacao',title:'Instituição de origem',tone:'violet',criteria:['uni-cg-centro']},
      {id:'pesquisa',title:'Pesquisa e publicações',tone:'amber',criteria:['uni-cg-artigos','uni-cg-ic']},
      {id:'academicas',title:'Atividades acadêmicas',tone:'blue',criteria:['uni-cg-extra','uni-cg-rep']},
      {id:'eventos',title:'Congressos e distinções',tone:'teal',criteria:['uni-cg-congresso','uni-cg-premio']},
      {id:'qualificacoes',title:'Proficiência',tone:'indigo',criteria:['uni-cg-idioma']}
    ]
  });
  Object.assign(uniSelect('Acupuntura'),{
    status:'reviewed',max:10,source:unifespPdf,
    scope:'Acesso direto R1, edital 690/2026, pp. 23–24. A confirmação de requisitos e a nota final cabem à banca. Nos itens por faixa, só a melhor alternativa pontua.',
    criteria:[
      criterion('uni-ac-instit','Instituição de origem',.5,23,'Hospital e programas exigem comprovação institucional.',[
        part('uni-ac-hosp','Hospital de ensino credenciado',.25),
        part('uni-ac-rm','Programas de residência médica credenciados',.125),
        part('uni-ac-pg','Pós-graduação stricto sensu credenciada',.125)
      ]),
      {...criterion('uni-ac-enamed','Conceito institucional no ENAMED',.5,23,'A nota da instituição no ENAMED é multiplicada por 0,1; escolha apenas um conceito.',[
        part('uni-ac-en1','Conceito 1',.1),part('uni-ac-en2','Conceito 2',.2),part('uni-ac-en3','Conceito 3',.3),part('uni-ac-en4','Conceito 4',.4),part('uni-ac-en5','Conceito 5',.5)
      ]),exclusive:true},
      criterion('uni-ac-historico','Desempenho acadêmico e duração do internato',1,24,'Nota e horas padronizadas pelo edital. Os dois indicadores, conjuntamente, valem até 1 ponto.',[
        part('uni-ac-cr','Parcela de coeficiente de rendimento (até 0,5)',.5),part('uni-ac-int','Parcela da duração do internato (até 0,5)',.5)
      ]),
      criterion('uni-ac-rep','Representação estudantil',1,24,'Atividade institucional elegível, com comprovação.',[part('uni-ac-rep1','Representação comprovada',1)]),
      {...criterion('uni-ac-ic','Iniciação científica',.5,24,'Apenas a faixa mais elevada de participação elegível.',[part('uni-ac-icb','Com bolsa',.5),part('uni-ac-icv','Sem bolsa',.25)]),exclusive:true},
      {...criterion('uni-ac-pub','Produção científica (melhor publicação)',.5,24,'Apenas a melhor produção documentada.',[part('uni-ac-pub1','SciELO: primeiro autor',.5),part('uni-ac-pub2','SciELO: coautor',.25),part('uni-ac-pub3','Outras publicações',.1)]),exclusive:true},
      criterion('uni-ac-mon','Monitoria',1,24,'Monitoria acadêmica institucional documentada.',[part('uni-ac-mon1','Monitoria elegível',1)]),
      {...criterion('uni-ac-extra','Atividade extracurricular',1,24,'Liga, extensão ou estágio extracurricular, sem pontuar o mesmo comprovante mais de uma vez.',[
        part('uni-ac-liga','Liga acadêmica',1),part('uni-ac-ext','Projeto de extensão',1),part('uni-ac-est','Estágio supervisionado não curricular',1)
      ]),exclusive:true},
      criterion('uni-ac-cong','Congressos e cursos de extensão',1,25,'Participação elegível conforme exigências do programa.',[part('uni-ac-cong1','Congresso ou curso elegível',1)]),
      criterion('uni-ac-premio','Prêmio ou distinção acadêmica',1,25,'Prêmio ou distinção comprovada.',[part('uni-ac-premio1','Prêmio elegível',1)]),
      {...criterion('uni-ac-comun','Atividades comunitárias, culturais ou esportivas',1,25,'Pontuação única pela participação documentada, sem cumulatividade dentro do item.',[part('uni-ac-comun1','Atividade comunitária',1),part('uni-ac-cult1','Atividade cultural ou esportiva',1)]),exclusive:true},
      criterion('uni-ac-idioma','Língua estrangeira',1,26,'Proficiência com comprovação conforme o programa.',[part('uni-ac-idioma1','Idioma elegível',1)])
    ],
    groups:[
      {id:'formacao',title:'Formação e histórico',tone:'violet',criteria:['uni-ac-instit','uni-ac-enamed','uni-ac-historico']},
      {id:'pesquisa',title:'Pesquisa e publicações',tone:'amber',criteria:['uni-ac-ic','uni-ac-pub']},
      {id:'academicas',title:'Monitorias e extensão',tone:'blue',criteria:['uni-ac-mon','uni-ac-extra','uni-ac-rep']},
      {id:'eventos',title:'Congressos e prêmios',tone:'teal',criteria:['uni-ac-cong','uni-ac-premio']},
      {id:'extensao',title:'Comunidade',tone:'rose',criteria:['uni-ac-comun']},
      {id:'qualificacoes',title:'Línguas',tone:'indigo',criteria:['uni-ac-idioma']}
    ]
  });
  // Para Clínica Médica, os itens que dependem de média padronizada são apresentados
  // com a ressalva de que o candidato só deve selecionar a fração plena se a atingir.
  Object.assign(uniSelect('Clínica Médica'),{
    status:'reviewed',max:10,source:unifespPdf,
    scope:'Acesso direto R1, edital 690/2026, pp. 30–32. Os subitens de histórico e internato envolvem conversão proporcional definida pela banca. Esta calculadora estima pontuação plena desses subitens, sem inferir dados da graduação.',
    criteria:[
      criterion('uni-cm-instit','Instituição de origem',1,30,'Requisitos institucionais documentados. A nota ENAMED tem campo separado.',[
        part('uni-cm-hosp','Hospital de ensino credenciado',.5),part('uni-cm-rm','Residência médica credenciada',.25),part('uni-cm-pg','Pós-graduação stricto sensu',.25)
      ]),
      {...criterion('uni-cm-enamed','Conceito institucional no ENAMED',.75,30,'Edital indica o multiplicador ×0,1 e limite anunciado de 0,75. Um conceito de 1–5 fornece 0,1–0,5 ponto. Não preencher mais de uma faixa.',[
        part('uni-cm-en1','ENAMED conceito 1',.1),part('uni-cm-en2','ENAMED conceito 2',.2),part('uni-cm-en3','ENAMED conceito 3',.3),part('uni-cm-en4','ENAMED conceito 4',.4),part('uni-cm-en5','ENAMED conceito 5',.5)
      ]),exclusive:true},
      criterion('uni-cm-hist','Histórico e internato',1,31,'Coeficiente de rendimento e duração do internato são padronizados. Cada parcela tem teto 0,5; valores parciais devem ser conferidos pela banca.',[part('uni-cm-cr','Parcela plena de rendimento acadêmico',.5),part('uni-cm-internato','Parcela plena de duração do internato',.5)]),
      criterion('uni-cm-repr','Representação estudantil',.5,31,'Participação em representação acadêmica elegível.',[part('uni-cm-rep1','Representação documentada',.5)]),
      {...criterion('uni-cm-ic','Iniciação científica',.75,31,'Escolha apenas a melhor modalidade elegível.',[part('uni-cm-icb','Com bolsa',.75),part('uni-cm-icv','Sem bolsa',.5)]),exclusive:true},
      {...criterion('uni-cm-pub','Produção científica (melhor artigo)',.75,31,'Somente a melhor publicação documentada.',[part('uni-cm-pub1','SciELO: primeiro autor',.75),part('uni-cm-pub2','SciELO: coautor',.5),part('uni-cm-pub3','Outra publicação',.25)]),exclusive:true},
      criterion('uni-cm-mon','Monitoria',1,31,'Participação em monitoria elegível.',[part('uni-cm-mon1','Monitoria comprovada',1)]),
      {...criterion('uni-cm-extra','Liga, extensão ou estágio extracurricular',1,31,'Item não cumulativo. Pontuar somente a melhor atividade.',[part('uni-cm-liga','Liga acadêmica',1),part('uni-cm-ext','Projeto de extensão',.75),part('uni-cm-est','Estágio supervisionado não curricular',.75)]),exclusive:true},
      criterion('uni-cm-cong','Congressos e cursos',1,31,'Subitens cumulativos até 1 ponto: ACLS/ATLS e similares (0,4), curso certificado com mais de 8 h por sociedade reconhecida (0,3), congressos (0,3).',[part('uni-cm-acls','Suporte avançado à vida',.4),part('uni-cm-curso','Curso certificado elegível',.3),part('uni-cm-cong1','Congresso científico',.3)]),
      criterion('uni-cm-premio','Prêmio acadêmico',.25,31,'Prêmios e distinções acadêmicas elegíveis.',[part('uni-cm-premio1','Prêmio comprovado',.25)]),
      {...criterion('uni-cm-comun','Atividades comunitárias/culturais/esportivas',1,32,'Pontua a melhor atividade, sem cumulação.',[part('uni-cm-comun1','Atividade comunitária',1),part('uni-cm-cult1','Atividade cultural ou esportiva',1)]),exclusive:true},
      {...criterion('uni-cm-idioma','Língua estrangeira',1,32,'Conferir nível de proficiência.',[part('uni-cm-idioma-a','Avançada',1),part('uni-cm-idioma-i','Intermediária',.5),part('uni-cm-idioma-b','Básica',.25)]),exclusive:true}
    ],
    groups:[
      {id:'formacao',title:'Formação e histórico',tone:'violet',criteria:['uni-cm-instit','uni-cm-enamed','uni-cm-hist']},
      {id:'pesquisa',title:'Pesquisa e produção',tone:'amber',criteria:['uni-cm-ic','uni-cm-pub']},
      {id:'academicas',title:'Atividades acadêmicas',tone:'blue',criteria:['uni-cm-mon','uni-cm-extra','uni-cm-repr']},
      {id:'eventos',title:'Congressos e prêmios',tone:'teal',criteria:['uni-cm-cong','uni-cm-premio']},
      {id:'extensao',title:'Comunidade',tone:'rose',criteria:['uni-cm-comun']},
      {id:'qualificacoes',title:'Proficiência',tone:'indigo',criteria:['uni-cm-idioma']}
    ]
  });
  // As oito especialidades seguintes reproduzem o mesmo quadro de pontos
  // do item 15.1.7 (edital nº 690/2026). IDs separados preservam as respostas.
  // A correspondência foi conferida pela leitura dos quadros individuais,
  // não é uma regra geral para todas as especialidades da UNIFESP.
  const matchingAcupunctureMatrices=[
    ['Anestesiologia',25],['Cirurgia Cardiovascular',26],
    ['Genética Médica',33],['Infectologia',35],
    ['Medicina de Família e Comunidade',38],['Medicina de Tráfego',39],
    ['Medicina Esportiva',41],['Medicina Preventiva e Social',44]
  ];
  for(const [specialty,page] of matchingAcupunctureMatrices){
    const template=uniSelect('Acupuntura');
    const row=uniSelect(specialty);
    if(!row||!template)throw Error('Matriz UNIFESP ausente: '+specialty);
    const prefix='uni-'+slug(specialty).replace(/-/g,'')+'-';
    const rename=id=>id.replace(/^uni-ac-/,prefix);
    Object.assign(row,{
      status:'reviewed',max:10,
      scope:'Acesso direto R1 — quadro específico de '+specialty+' no item 15.1.7 do edital nº 690/2026 (a partir da página '+page+'). Pontuação por categorias com teto 10. A pontuação da instituição exige comprovação e ENAMED com apenas uma faixa. Valores de histórico e internato devem ser apurados segundo as regras de padronização da banca.',
      criteria:template.criteria.map(criterion=>({
        ...criterion,id:rename(criterion.id),page,
        parts:criterion.parts.map(part=>({...part,id:rename(part.id)}))
      })),
      groups:template.groups.map(group=>({
        ...group,criteria:group.criteria.map(rename)
      }))
    });
  }

  Object.assign(unifesp,{
    id:'unifesp-2027-r1-especialidades',title:'UNIFESP · 2027 · Escolher especialidade R1',
    edition:'2027',status:'program-specific',checkedAt:'2026-10-28',
    source:unifespPdf,listing:'https://www.vunesp.com.br/UFSP2602',
    scope:'Selecione uma especialidade de acesso direto (R1) para consultar o quadro próprio do edital 690/2026. Nunca aplique automaticamente a matriz de outra especialidade.'
  });
  Object.assign(window.TraubeCurriculoRubricas.find(row=>row.institution==='Einstein'),{
    checkedAt:'2026-10-28',title:'Einstein · 2027 · Critérios publicados, pesos aguardados',
    scope:'Edital 2027, item 7.2.6: análise curricular com peso 1 (10% da nota final). São avaliados: iniciação científica documentada (horas/semanas/meses de dedicação na graduação), publicações PubMed (primeiro ou último autor, coautor, DOI e JCR na data da publicação) e mestrado/doutorado finalizado ou em curso. Enviar um PDF único de até 10 MB, nomeado CPF_Nome Completo, entre 05 e 09/12/2026. O edital remete a tabela de pontuação a aditivo específico, não confirmado nas publicações consultadas em 28/10; não se deve estimar pesos inexistentes.',
    criteriaOverview:['Iniciação científica documentada e tempo de dedicação','Publicações PubMed, autoria, DOI e impacto JCR','Mestrado/doutorado concluído ou em andamento','Pontuação unitária: aguardando aditivo oficial']
  });
})();
