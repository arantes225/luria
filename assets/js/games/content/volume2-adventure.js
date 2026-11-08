/* Volume 2: dezoito novas cenas de narrativa, intercaladas entre as fases
   da jornada original. A última cena e o encerramento seguem preservados. */
(() => {
  "use strict";
  const C = window.TraubeGameContent;
  if (!C) return;
  const choice=(id,chapter,room,title,story,prompt,options,answer,explanation,refs)=>({
    id,chapter,room,title,story,prompt,type:"choice",options,answer,explanation,refs
  });
  const select=(id,chapter,room,title,story,prompt,options,answers,explanation,refs)=>({
    id,chapter,room,title,story,prompt,type:"select",options,answers,explanation,refs
  });
  const sort=(id,chapter,room,title,story,prompt,steps,explanation,refs)=>({
    id,chapter,room,title,story,prompt,type:"sort",steps,
    variants:[steps.map((_,i)=>i)],explanation,refs
  });
  const a0=[
    choice("v2e01",0,"Classificação de risco","19h05 · A próxima prioridade","Uma criança com febre está alerta, mas a cuidadora informa que ela vomita tudo o que ingere.","Qual conduta protege a criança?",[
      "Reconhecer sinal geral de perigo e acionar avaliação urgente","Devolver à fila eletiva","Orientar brincadeiras durante a espera","Dar alta sem reavaliação"
    ],0,"Vomitar tudo o que ingere é sinal geral de perigo na AIDPI.",["aidpi"]),
    select("v2e02",0,"Identificação de amostras","19h15 · O rótulo incompleto","Um exame foi coletado, mas a etiqueta apresenta apenas o número do leito. É preciso prevenir troca de amostras.","Selecione os DOIS identificadores pessoais adequados.",[
      "Nome completo do paciente","Número do leito","Data de nascimento","Cor do cobertor"
    ],[0,2],"A identificação de amostras deve usar dados pessoais confiáveis, não a localização do paciente.",["identity"]),
    sort("v2e03",0,"Higiene e preparo","19h25 · Preparação segura","Antes de novo procedimento, suas mãos estão visivelmente sujas. Ordene os marcos da higienização.","Organize a sequência agrupada.",[
      "Reconhecer a sujidade e escolher água e sabonete",
      "Molhar as mãos e aplicar sabonete",
      "Friccionar as superfícies e enxaguar",
      "Secar e evitar nova contaminação"
    ],"A indicação da técnica depende da sujidade; secagem e prevenção da recontaminação completam o processo.",["hands"]),
    choice("v2e04",0,"Sala de acolhimento","19h40 · Uma fraqueza súbita","Adulto aguarda em cadeira quando passa a apresentar assimetria facial e dificuldade para falar.","Qual prioridade?",[
      "Pedir que volte após o descanso","Acionar imediatamente a avaliação de AVC","Orientar exercícios de fala no corredor","Aguardar a triagem do dia seguinte"
    ],1,"Déficit neurológico focal súbito exige avaliação urgente.",["stroke"]),
    select("v2e05",0,"Posto de comunicação","19h50 · Passagem da triagem","A equipe de emergência assume o paciente com déficit focal súbito. Quais informações permitem dar continuidade?",[
      "Qual é a cor da cadeira","Último momento conhecido sem sintomas","Sinais neurológicos observados e evolução","A marca do relógio do acompanhante"
    ],[1,2],"A cronologia e o déficit neurológico são informações críticas para o fluxo de AVC.",["stroke"]),
    sort("v2e06",0,"Equipe de emergência","20h · Risco comunicado","Um encaminhamento urgente foi indicado. A avaliação e o cuidado imediato ocorrem com a equipe; ordene a comunicação.","Qual sequência registra a decisão?",[
      "Reconhecer o achado de maior risco",
      "Comunicar o achado e acionar a equipe apropriada",
      "Reunir informações e intervenções já realizadas",
      "Confirmar o recebimento do plano pela equipe de destino"
    ],"A continuidade depende de reconhecimento, comunicação e confirmação.",["identity","stroke"])
  ];
  const a1=[
    choice("v2e07",1,"Sala de observação 2","23h10 · A febre passou","Paciente com suspeita de dengue tem agora dor abdominal intensa e contínua, apesar da redução da febre.","O que fazer?",[
      "Considerar alta por estar sem febre","Dar apenas orientações de repouso futuro","Reavaliar imediatamente devido ao sinal de alarme","Presumir efeito de alimentação"
    ],2,"Na dengue, defervescência pode coincidir com o período crítico.",["dengue"]),
    select("v2e08",1,"Triagem de risco","23h20 · Dois dados que importam","Outra paciente com dengue relata sintomas novos. A equipe investiga sinais de alarme.","Selecione os DOIS sinais de alarme.",[
      "Vômitos persistentes","Retomada do apetite","Tontura ao levantar","Melhora isolada da mialgia"
    ],[0,2],"Vômitos persistentes e hipotensão postural/lipotímia exigem avaliação e reclassificação.",["dengue","dengueaps"]),
    sort("v2e09",1,"Glicemia capilar","23h35 · Antes de alimentar","Adulto consciente, com deglutição segura, apresenta glicemia de 64 mg/dL. A abordagem clínica ocorre em paralelo.","Ordene o ciclo de correção oral.",[
      "Reconhecer a hipoglicemia e confirmar deglutição segura",
      "Oferecer carboidrato de rápida absorção",
      "Aguardar o período recomendado e medir novamente",
      "Decidir próxima etapa com base no resultado"
    ],"A rechecagem guia a necessidade de nova correção.",["cdc","hypo"]),
    choice("v2e10",1,"Centro obstétrico","23h50 · Sintomas que mudam o risco","Uma gestante refere cefaleia forte com borramento visual e apresenta pressão elevada.","Qual conduta geral é apropriada?",[
      "Ignorar por ser tarde da noite","Dar alta por estar afebril","Aguardar consulta de rotina","Acionar avaliação obstétrica urgente"
    ],3,"Sintomas neurológicos associados à hipertensão na gestação exigem atenção imediata.",["pregnancy","eclampsia"]),
    select("v2e11",1,"Cuidados maternos","00h10 · Comunicação obstétrica","A equipe assume paciente com suspeita de complicação hipertensiva e precisa dos dados de risco.","Selecione DOIS elementos clinicamente relevantes.",[
      "Cor da bolsa da paciente","Pressão arterial e evolução dos sintomas","Modelo da pulseira do acompanhante","Tratamentos já realizados e pendências"
    ],[1,3],"Uma passagem adequada reúne condição clínica, intervenção e monitorização.",["pregnancy"]),
    sort("v2e12",1,"Recuperação cirúrgica","00h30 · Fim de procedimento","Cirurgia eletiva foi concluída. Organize as verificações documentais dependentes; cuidados clínicos seguem em paralelo.","Ordene os marcos de fechamento.",[
      "Confirmar conclusão do procedimento",
      "Conferir contagens e amostras",
      "Realizar sign out com plano pós-operatório",
      "Transferir cuidados com comunicação à equipe receptora"
    ],"A saída segura depende de verificações e da passagem clínica.",["surgery"])
  ];
  const a2=[
    choice("v2e13",2,"Sala pediátrica","01h30 · A cuidadora percebeu","Criança em observação passa a ficar letárgica e não consegue beber.","Qual decisão é mais segura?",[
      "Reavaliar imediatamente e acionar equipe","Aguardar amanhecer sem medir sinais vitais","Dar alta apenas porque a febre caiu","Solicitar que durma sem supervisão"
    ],0,"Letargia e incapacidade para beber são sinais gerais de perigo.",["aidpi","child"]),
    select("v2e14",2,"Revisão de prontuários","02h · Dois pontos antes da saída","Uma paciente com dengue não apresenta sinais de alarme na avaliação atual. A equipe vai orientar seguimento.","Selecione DUAS orientações essenciais.",[
      "Orientar retorno imediato se surgirem sinais de alarme","Informar que nunca haverá piora","Combinar reavaliação conforme risco e protocolo","Desconsiderar mudanças durante a defervescência"
    ],[0,2],"Retorno e reconhecimento de sinais de alarme são parte da orientação segura.",["dengueaps"]),
    sort("v2e15",2,"Reavaliação de glicemia","02h40 · A medida seguinte","Adulto tratado por hipoglicemia tem nova glicemia de 93 mg/dL após correção, permanece consciente e comendo normalmente.","Organize o fechamento da avaliação.",[
      "Observar a resposta à correção",
      "Confirmar a glicemia recuperada na rechecagem",
      "Planejar alimentação e prevenção de recorrência",
      "Documentar evolução e orientações"
    ],"A correção precisa ser confirmada, com plano para evitar nova queda.",["cdc","hypo"]),
    choice("v2e16",2,"Segurança do paciente","03h30 · Identificadores divergentes","A prescrição mostra data de nascimento diferente da pulseira do paciente.","Qual ação é mais segura?",[
      "Usar o número do leito como critério final","Esclarecer a discrepância antes da administração","Administrar e conferir depois","Ignorar a pulseira e descartar o registro"
    ],1,"A medicação depende da identificação correta e reconciliação da divergência.",["identity"]),
    select("v2e17",2,"Sala de transferências","04h · O que acompanhará a paciente","Gestante com quadro hipertensivo grave será transferida após estabilização inicial e contato com o destino.","Selecione DUAS informações relevantes na passagem.",[
      "A cor da mala","Intervenções já realizadas e resposta","O horário do café da equipe","Condição clínica e necessidade de monitorização"
    ],[1,3],"O serviço receptor precisa conhecer risco, tratamento e resposta.",["pregnancy","eclampsia"]),
    sort("v2e18",2,"Planejamento de alta","05h10 · Uma saída bem comunicada","Paciente com dengue foi avaliado, não tem sinais de alarme e possui seguimento definido. Ordene a comunicação final.","Qual sequência fecha o cuidado com segurança?",[
      "Confirmar avaliação e classificação de risco atuais",
      "Definir e comunicar o plano de acompanhamento",
      "Explicar os sinais de alarme e a necessidade de retorno imediato",
      "Registrar orientações e confirmar compreensão"
    ],"A alta depende de avaliação atual e orientação compreendida.",["dengueaps"])
  ];
  const place=(chapter, scenes)=>{
    const destination=C.adventure.findIndex(s=>s.chapter>chapter);
    const index=destination<0?C.adventure.length:destination;
    C.adventure.splice(index,0,...scenes);
  };
  place(0,a0);
  place(1,a1);
  // As cenas do último capítulo antecedem a passagem de turno original e o final.
  const finalChapterSpot=C.adventure.findIndex(s=>s.id==="handoff");
  C.adventure.splice(finalChapterSpot<0?C.adventure.length:finalChapterSpot,0,...a2);
})();
