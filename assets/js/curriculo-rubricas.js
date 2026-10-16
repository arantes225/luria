/* Official sources checked 2026-10-16. Each edition has independent criteria. */
(() => {
  const part = (id, label, points, limit = 1) => ({ id, label, points, limit });
  const criterion = (id, title, max, page, note, parts) => ({ id, title, max, page, note, parts });
  window.LuriaCurriculoRubricas = [{
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
  window.LuriaCurriculoRubricas[0].criteria.find(row => row.id === 'docentes').exclusive = true;
  window.LuriaCurriculoRubricas[0].institution = 'USP-SP';
  window.LuriaCurriculoRubricas[0].region = 'SP';
  window.LuriaCurriculoRubricas[0].edition = '2027';
  window.LuriaCurriculoRubricas[0].groups = [
    {id:'formacao',title:'Instituição de formação',tone:'violet',criteria:['instituicao','hospital','docentes']},
    {id:'pesquisa',title:'Pesquisa e publicações',tone:'amber',criteria:['pesquisa','artigos']},
    {id:'academicas',title:'Atividades acadêmicas',tone:'blue',criteria:['monitoria']},
    {id:'eventos',title:'Congressos e apresentações',tone:'teal',criteria:['eventos','oral','poster']},
    {id:'extensao',title:'Extensão e representação',tone:'rose',criteria:['extensao','representacao']},
    {id:'qualificacoes',title:'Qualificações e suporte à vida',tone:'indigo',criteria:['pos','suporte']}
  ];
  for (const [institution,region] of [['UNIFESP','SP'],['FMABC','SP'],['Santa Casa SP','SP'],['SES-DF','DF'],['SES-PE','PE'],['USP-RP','SP'],['PSU-MG','MG'],['Santa Casa BH','MG'],['PUC-Campinas','SP'],['UNICAMP','SP'],['Einstein','SP'],['UFPA','PA'],['PSU-GO','GO'],['PUC-SP','SP']]) {
    window.LuriaCurriculoRubricas.push({ id:institution.toLowerCase().replace(/[^a-z0-9]/g,'-')+'-pending', title:institution+' · Edital a conferir', institution, region, status:'pending', scope:'A avaliação curricular e a edição vigente deste processo ainda precisam ser confirmadas em edital oficial.' });
  }
  const psu=window.LuriaCurriculoRubricas.find(row=>row.institution==='PSU-MG');
  Object.assign(psu,{
    id:'psu-mg-2027-direto-v20260924', title:'PSU-MG / AREMG · 2027 · Entrada direta',edition:'2027',
    status:'reviewed',max:13,checkedAt:'2026-10-16',
    source:'https://www.galaxcms.com.br/up_crud_comum/601/Anexo1-AvaliacaoCurricularPadronizadaEntradaDiretaPSUMG2027-20260924112431.pdf',
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
      {...criterion('mg-cursos','Cursos médicos',.6,17,'Requisitos específicos e entidades emissoras: páginas 16–18.',[part('mg-c1','Dois cursos elegíveis',.6),part('mg-c2','Um curso elegível',.3)]),exclusive:true},
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
})();
