import fs from "node:fs";
import path from "node:path";
import { saveBook } from "./bloco-02-utils.mjs";

const file = path.resolve(process.cwd(), "scripts/build-bloco-02-preventiva-2.mjs");
let content = fs.readFileSync(file, "utf8");

// Remove the trailing `};` on bookReg
content = content.replace(/\s*\]\s*\}\s*;\s*$/, "");

const remainingSections = `,
    {
      id: 'complexos-reguladores-centrais-regulacao-sisreg',
      title: '7. Complexos Reguladores, Centrais de Regulação e o Sistema de Regulação (SISREG)',
      body_html: \`
<h3>Estrutura e Funcionamento dos Complexos Reguladores (Portaria nº 1.559/2008)</h3>
<p>O <strong>Complexo Regulador</strong> é a estrutura operacional de gestão que articula, integra e operacionaliza as ações da Regulação do Acesso à Assistência no âmbito do SUS. Pode ter abrangência municipal, regional ou estadual, devendo atuar sob a autoridade sanitária do respectivo gestor. Um Complexo Regulador é composto por <strong>três tipos de unidades operacionais (Centrais de Regulação)</strong>:</p>
<ol>
  <li><strong>Central de Regulação de Urgências (SAMU 192):</strong> Responsável pela recepção das chamadas da população via linha telefônica 192, acolhimento inicial pelo Técnico de Regulação Médica (TARM) e <strong>regulação médica imediata pelo Médico Regulador</strong>, que decide o envio da equipe mais adequada (Unidade de Suporte Básico — USB com técnico e condutor; Unidade de Suporte Avançado — USA/UTI Móvel com médico e enfermeiro; Motolância; Aeromédico) ou fornece orientação médica por telefone; além disso, o médico regulador do SAMU tem a prerrogativa legal da <em>Vaga Zero</em> para encaminhar o paciente grave diretamente à porta hospitalar de emergência mais adequada;</li>
  <li><strong>Central de Regulação de Internações Hospitalares (Central de Leitos):</strong> Responsável pelo mapeamento em tempo real da disponibilidade de leitos clínicos, cirúrgicos, pediátricos, obstétricos e de Terapia Intensiva (UTI Adulto, Pediátrica e Neonatal) nos estabelecimentos hospitalares próprios, contratados e conveniados. O médico assistente da UPA ou hospital solicitante insere o laudo de solicitação de internação (com histórico clínico, hipótese diagnóstica, exames complementares e justificativa de necessidade de leito especializado/UTI); o Médico Regulador da Central de Leitos avalia a solicitação, confere a conformidade clínica e autoriza a emissão da <strong>Autorização de Internação Hospitalar (AIH)</strong>, direcionando o paciente para o hospital de referência com a vaga mais oportuna;</li>
  <li><strong>Central de Regulação Ambulatorial:</strong> Regula o acesso a consultas médicas especializadas (cardiologia, neurologia, ortopedia, oncologia etc.) e a exames complementares de média e alta complexidade (SADT — tomografia computadorizada, ressonância magnética, endoscopia, ecocardiograma, cateterismo cardíaco). Opera com base em cotas programadas e pactuadas (PGASS/PPI) e em filas de espera organizadas prioritariamente por classificação de risco clínico.</li>
</ol>

<h3>O SISREG e os Sistemas Informatizados de Regulação</h3>
<p>O <strong>Sistema de Regulação (SISREG)</strong> é o software web oficial disponibilizado gratuitamente pelo Ministério da Saúde (atualmente em sua versão SISREG III) para informatizar os Complexos Reguladores em todo o território nacional. Estados como São Paulo utilizam sistemas próprios integrados (como a CROSS — Central de Regulação de Ofertas de Serviços de Saúde / SIRESP), mas que obedecem à mesma lógica de governança regulatória.</p>
<p>O SISREG opera em <strong>três módulos interdependentes</strong>:</p>
<ul>
  <li><strong>Módulo Ambulatorial:</strong> Gerencia as cotas de vagas disponibilizadas pelos prestadores (estabelecimentos executantes) para consultas especializadas e exames, e permite que as Unidades Básicas de Saúde (solicitantes) insiram os pedidos clínicos dos pacientes;</li>
  <li><strong>Módulo Hospitalar / Internação:</strong> Gerencia o censo diário de leitos hospitalares e processa os laudos de solicitação de internação eletiva e de urgência para emissão de AIH;</li>
  <li><strong>Módulo de Administração / Gestão:</strong> Permite ao gestor municipal e estadual configurar parâmetros de oferta, definir perfis de acesso, auditar cancelamentos e absenteísmo e monitorar tempos médios de espera por especialidade e por região.</li>
</ul>

<h3>A Decisão do Médico Regulador no SISREG: As Quatro Saídas Possíveis</h3>
<p>Ao analisar uma solicitação de consulta ou exame inserida pela equipe da Atenção Primária no SISREG, o Médico Regulador não é um "agendador automático"; ele exerce julgamento clínico-sanitário documentado, podendo emitir <strong>uma de quatro decisões formais</strong>:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Decisão do Médico Regulador no SISREG</th>
      <th>Significado Clínico-Administrativo</th>
      <th>Conduta da Equipe Solicitante na UBS</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1. Aprovado / Agendado (ou Encaminhado à Fila com Prioridade)</strong></td>
      <td>A solicitação preenche rigorosamente o protocolo clínico de acesso, a indicação está justificada e há vaga disponível (ou a solicitação entra na fila estratificada pela classificação de risco atribuída: Vermelho, Amarelo, Verde ou Azul).</td>
      <td>Imprimir o comprovante de agendamento com data, horário, local e orientações de preparo do exame para entrega ao paciente.</td>
    </tr>
    <tr>
      <td><strong>2. Pendência de Informação (Devolvido para Complementação)</strong></td>
      <td>A justificativa clínica está incompleta ou faltam dados essenciais exigidos pelo protocolo (ex.: solicitada consulta em cardiologia por sopro sem descrever se é sistólico/diastólico e sem anexar resultado do ecocardiograma basal).</td>
      <td>O médico da UBS deve reavaliar o prontuário, complementar as informações clínicas solicitadas no sistema e reenviar a guia, preservando a data de cadastro original.</td>
    </tr>
    <tr>
      <td><strong>3. Recusado / Cancelado com Justificativa Técnica</strong></td>
      <td>O caso clínico descrito não tem indicação para o procedimento solicitado segundo o protocolo clínico vigente, ou a condição pode e deve ser conduzida integralmente na Atenção Básica (ex.: pedido de tomografia de crânio para cefaleia tensional clássica sem sinais de alarme).</td>
      <td>O médico da UBS deve acolher a devolutiva técnica da regulação, manter o acompanhamento clínico do usuário na APS e, se houver novas alterações ou evolução atípica, reformular o plano de cuidado.</td>
    </tr>
    <tr>
      <td><strong>4. Cancelamento Administrativo / Duplicidade</strong></td>
      <td>Identificação de agendamentos idênticos em duplicidade para o mesmo usuário ou solicitação inserida em módulo/prestador incorreto.</td>
      <td>Correção cadastral da agenda pelo operador municipal.</td>
    </tr>
  </tbody>
</table>
\`
    },
    {
      id: 'referencia-contrarreferencia-apoio-matricial-pec',
      title: '8. O Sistema de Referência e Contrarreferência na Prática: Fluxos, Prontuário Eletrônico e Apoio Matricial',
      body_html: \`
<h3>A Mecânica Clínica da Referência e Contrarreferência</h3>
<p>Nas Redes de Atenção à Saúde, a continuidade do cuidado depende do perfeito funcionamento de um circuito de mão dupla conhecido como <strong>Sistema de Referência e Contrarreferência</strong>:</p>
<ul>
  <li><strong>Referência (Encaminhamento):</strong> É o ato pelo qual a equipe de Atenção Primária à Saúde (ou porta de urgência), após esgotar os recursos propedêuticos e terapêuticos de seu nível de densidade tecnológica, encaminha formalmente o usuário para um serviço de maior densidade tecnológica (Atenção Secundária ou Terciária) para realização de consulta especializada, exame complexo ou internação. A referência deve ser obrigatoriamente formalizada através de um documento clínico estruturado (a <strong>Guia de Encaminhamento</strong> ou solicitação no Prontuário Eletrônico / SISREG), contendo: identificação completa, história clínica resumida, hipótese diagnóstica principal e secundárias (com CID-10 e CIAP-2), exames já realizados com resultados, tratamentos prévios utilizados e o <strong>motivo explícito do encaminhamento</strong> (se é para elucidação diagnóstica, definição de conduta cirúrgica ou parecer especializado específico).</li>
  <li><strong>Contrarreferência (Devolutiva):</strong> É o compromisso ético e técnico pelo qual o médico especialista ou a equipe hospitalar, após realizar a consulta, procedimento ou conceder alta clínica, <strong>devolve o paciente à equipe de Atenção Primária que o encaminhou</strong>, acompanhado de um relatório detalhado (a <strong>Ficha de Contrarreferência</strong> ou Sumário de Alta Hospitalar). Esse documento deve informar: o diagnóstico definitivo firmado, os resultados dos exames complementares realizados, o tratamento instituído ou procedimento cirúrgico executado, as orientações de seguimento ambulatorial e a prescrição farmacológica recomendada para continuidade na APS.</li>
</ul>
<p><strong>A patologia histórica da "via de mão única":</strong> O principal estrangulamento histórico do SUS foi a transformação da referência em uma "via de mão única": o paciente era encaminhado pela UBS para o hospital ou policlínica e <strong>nunca mais retornava à APS</strong>, ficando "retido" em consultas ambulatoriais de rotina de cardiologistas ou nefrologistas apenas para renovação de receitas. Esse fenômeno bloqueia as vagas de novos casos na média complexidade e quebra a <strong>longitudinalidade do cuidado</strong> na Atenção Primária. A reversão desse quadro exige protocolos de alta ambulatorial e a implantação do <strong>Prontuário Eletrônico do Cidadão (PEC / e-SUS APS)</strong> integrado à Rede Nacional de Dados em Saúde (RNDS), permitindo que o médico da UBS visualize instantaneamente o laudo da tomografia e a nota de alta emitida pelo hospital terciário.</p>

<h3>Apoio Matricial e Telessaúde: Superando a Lógica Burocrática do Encaminhamento</h3>
<p>Para qualificar a relação entre a Atenção Primária e os especialistas focais, o SUS desenvolveu duas ferramentas contemporâneas decisivas:</p>
<ol>
  <li><strong>Apoio Matricial (Matriciamento):</strong> Metodologia de trabalho formulada por Gastão Wagner de Sousa Campos que organiza a relação entre a <em>equipe de referência</em> (Equipe de Saúde da Família que tem o vínculo longitudinal com a população) e os <em>apoiadores matriciais</em> (profissionais das equipes eMulti, CAPS ou serviços de especialidades). O matriciamento opera em duas dimensões complementares: a <strong>dimensão técnico-pedagógica</strong> (discussão compartilhada de casos clínicos, capacitação em serviço e alinhamento de condutas entre médico de família e especialista focal) e a <strong>dimensão clínico-assistencial</strong> (atendimento conjunto compartilhado / interconsulta de casos complexos, elaboração pactuada do Projeto Terapêutico Singular — PTS). O matriciamento evita encaminhamentos desnecessários e aumenta a resolutividade clínica da APS;</li>
  <li><strong>Telessaúde e Teleinterconsulta (Portaria GM/MS nº 3.492/2024 / PMAE):</strong> O uso da teleconsultoria síncrona ou assíncrona entre o médico da ESF e especialistas (cardiologistas, dermatologistas com teledermatologia, endocrinologistas) permite discutir o caso em tempo real enquanto o paciente está na UBS. Dados nacionais do Telessaúde Brasil Redes demonstram que <strong>cerca de 60% a 70% das teleconsultorias evitam o encaminhamento presencial do usuário para a fila de espera da atenção especializada</strong>, resolvendo o problema no próprio território.</li>
</ol>
\`
    },
    {
      id: 'tfd-portaria-055-1999-cnrac-alta-complexidade',
      title: '9. Tratamento Fora do Domicílio (TFD) e Central Nacional de Regulação de Alta Complexidade (CNRAC)',
      body_html: \`
<h3>O Tratamento Fora do Domicílio (TFD — Portaria SAS/MS nº 055/1999)</h3>
<p>Instituído pela <strong>Portaria SAS/MS nº 055, de 24 de fevereiro de 1999</strong>, o <strong>Tratamento Fora do Domicílio (TFD)</strong> é um instrumento legal que garante o acesso de pacientes atendidos no SUS a serviços assistenciais de média e alta complexidade em outro município do mesmo estado ou em outro estado da Federação, quando <strong>esgotados todos os meios de tratamento e elucidação diagnóstica no município ou estado de residência</strong>.</p>
<p>Regras e requisitos estritos do TFD que são exaustivamente cobrados em provas de residência:</p>
<ul>
  <li><strong>Critério da Distância Mínima:</strong> O TFD só é concedido quando a distância entre o município de residência do paciente e o município de destino do tratamento for <strong>superior a 50 km</strong>;</li>
  <li><strong>Esgotamento Local de Recursos:</strong> Deve haver laudo médico circunstanciado emitido pelo médico assistente do SUS comprovando que todos os recursos diagnósticos e terapêuticos disponíveis no município/estado de origem foram efetivamente esgotados e que o tratamento proposto em outro centro oferece real probabilidade de cura, controle ou melhora clínica (o TFD é <strong>vedado para procedimentos puramente experimentais</strong> ou não previstos na RENASES/Tabela SUS);</li>
  <li><strong>Garantia Prévia de Vaga:</strong> O paciente <strong>jamais pode viajar pelo TFD sem a confirmação prévia e formal do agendamento da consulta, procedimento ou leito hospitalar</strong> pelo Complexo Regulador de destino;</li>
  <li><strong>Benefícios Cobertos pelo TFD:</strong> A portaria cobre passagens de transporte terrestre, fluvial ou aéreo (este último mediante laudo médico justificando incapacidade de locomoção terrestre ou urgência de tempo) para o paciente e, quando clinicamente justificado (crianças, idosos, pessoas com deficiência ou restrição funcional grave), para <strong>1 (um) acompanhante</strong>, além de <strong>ajuda de custo diária para alimentação e pernoite</strong> durante o período de permanência estritamente ambulatorial no município de destino;</li>
  <li><strong>Vedações Expressas do TFD:</strong> O TFD <strong>não se destina</strong> a ressarcir despesas de pacientes já internados em hospitais (cujas diárias são cobertas pela AIH); não reembolsa despesas particulares realizadas sem prévia autorização da comissão de TFD da Secretaria de Saúde; e não pode ser concedido quando o município de residência possui o serviço habilitado no SUS mas com fila temporária de espera.</li>
</ul>

<h3>A Central Nacional de Regulação da Alta Complexidade (CNRAC)</h3>
<p>Criada pela Portaria GM/MS nº 2.309/2001 (reorganizada e consolidada na Portaria de Consolidação GM/MS nº 1/2017), a <strong>Central Nacional de Regulação da Alta Complexidade (CNRAC)</strong> é uma unidade operacional do Ministério da Saúde que atua na <strong>regulação interestadual</strong> de procedimentos de altíssima complexidade e custo, para os quais um determinado estado não possui oferta instalada ou esgotou integralmente sua capacidade resolutiva.</p>
<p>A CNRAC atua em áreas de alta especialização médica regulamentadas em portarias específicas:</p>
<ol>
  <li><strong>Cirurgia Cardiovascular de Alta Complexidade:</strong> Cirurgias de cardiopatias congênitas complexas em neonatos e crianças pequenas, implante de dispositivos de assistência circulatória ventricular e cirurgias de aorta complexas;</li>
  <li><strong>Neurocirurgia de Alta Complexidade:</strong> Cirurgia de epilepsia refratária com estimulação vagal, embolização de aneurismas e malformações arteriovenosas (MAV) cerebrais complexas e cirurgia funcional para doença de Parkinson (DBS);</li>
  <li><strong>Traumatologia e Ortopedia de Alta Complexidade:</strong> Cirurgias de deformidades graves da coluna vertebral e artroplastias de revisão complexas;</li>
  <li><strong>Procedimentos Especiais:</strong> Transplante de medula óssea alogênico não aparentado e procedimentos de alta densidade em genética clínica e oncologia pediátrica.</li>
</ol>
<p><strong>Fluxo operacional da CNRAC:</strong> A solicitação é inserida pela Central Estadual de Regulação de Alta Complexidade (CERAC) do estado de origem; o médico regulador nacional da CNRAC confere a elegibilidade clínica e aciona a CERAC do estado de destino que possui o hospital universitário ou filantrópico habilitado com vaga disponível. O financiamento é realizado mediante transferência federal de recursos de Fundo a Fundo diretamente para o teto financeiro do estado executante por meio do Fundo de Ações Estratégicas e Compensação (FAEC).</p>
\`
    },
    {
      id: 'seis-casos-clinicos-regiao-regulacao-referencia',
      title: '10. Casos Clínicos Complexos: Gestão Regional, Conflitos de Regulação e Vaga Zero',
      body_html: \`
<div class="drive-block">
  <h4>Caso Clínico 1 — Conflito Intermunicipal na CIR e o Princípio da Solidariedade Regional</h4>
  <p><strong>Vinheta de Gestão:</strong> O Secretário Municipal de Saúde do Município "A" (município-polo com 220.000 habitantes, sede de Região de Saúde e gestor do único Hospital Geral com UTI e maternidade de alto risco da região) decide publicar uma portaria municipal restringindo o atendimento do hospital local exclusivamente a moradores que apresentem comprovante de residência em seu município, alegando que o teto financeiro do SUS municipal está deficitário e que as prefeituras dos municípios vizinhos (municípios "B", "C" e "D", com 8.000 a 15.000 habitantes cada) não repassam verbas complementares para o custeio do pronto-socorro hospitalar. Em consequência, uma gestante de 32 semanas em trabalho de parto prematuro moradora do Município "B" tem seu atendimento recusado na portaria do hospital do Município "A", sendo obrigada a retornar de ambulância para sua cidade natal, onde o parto ocorre no leito de uma UBS sem suporte neonatal, evoluindo com sofrimento fetal grave.</p>
  <p><strong>Análise Sanitária, Jurídica e Conduta:</strong> A decisão do gestor do Município "A" é flagrantemente ilegal e inconstitucional. Viola o <strong>Art. 198 da CF/88</strong> (que institui o SUS como uma rede regionalizada e hierarquizada), o <strong>Art. 7º da Lei nº 8.080/1990</strong> (princípio da <strong>universalidade do acesso</strong> e da igualdade da assistência à saúde sem preconceitos ou privilégios de qualquer espécie) e o <strong>Decreto nº 7.508/2011</strong> (que define a Região de Saúde como espaço integrado de planejamento e execução de ações para todos os munícipes agrupados). O município-polo que recebe recursos federais e estaduais de média e alta complexidade (MAC) no teto financeiro do SUS para ser referência regional <strong>não pode fechar suas portas ou exigir comprovante de residência para recusar atendimento a cidadãos de outros municípios da região</strong>. A conduta correta: o Ministério Público Estadual e a Secretaria Estadual de Saúde devem ser acionados para suspender imediatamente o ato ilícito; na <strong>Comissão Intergestores Regional (CIR)</strong> e na CIB, os gestores devem renegociar a Programação Geral (PGASS/PRI), redistribuir o teto de custeio hospitalar ou formalizar um <strong>Consórcio Intermunicipal de Saúde (CIS)</strong> ou COAP, no qual todos os municípios consorciados compartilhem formalmente o cofinanciamento do pronto-socorro regional, assegurando atendimento universal e ordenado via regulação.</p>
</div>

<div class="drive-block">
  <h4>Caso Clínico 2 — Prerrogativa Ético-Legal da "Vaga Zero" pelo Médico Regulador do SAMU</h4>
  <p><strong>Vinheta Clínica:</strong> Homem de 42 anos é vítima de capotamento automobilístico em rodovia vicinal a 30 km do centro urbano. A equipe da Unidade de Suporte Avançado (USA) do SAMU 192 realiza o atendimento inicial no local: paciente intubado com colar cervical e prancha rígida, pupilas anisocóricas (midríase à direita), PA 80/50 mmHg, FC 128 bpm, com FAST positivo em espaço hepatorrenal e fratura pélvica instável (choque hemorrágico e TCE grave com iminência de herniação uncal). O Médico Intervencionista do SAMU entra em contato via rádio com a Central de Regulação Médica de Urgência solicitando destino hospitalar imediato. O Médico Regulador do SAMU contata o Hospital Universitário Terciário de Trauma (único hospital da macrorregião com tomógrafo, neurocirurgia e centro cirúrgico de emergência), mas o médico plantonista da emergência do hospital nega a recepção da ambulância, alegando que o hospital está "superlotado", que todos os leitos de UTI estão ocupados e que a sala de ressuscitação já possui dois pacientes graves.</p>
  <p><strong>Análise Sanitária, Jurídica e Conduta:</strong> Diante de um paciente com risco iminente de morte cuja sobrevida depende de intervenção cirúrgica emergencial indisponível em outro serviço da região, o Médico Regulador de Urgência do SAMU tem a prerrogativa técnico-legal de aplicar a <strong>VAGA ZERO</strong> (conforme normatizado pela <strong>Portaria GM/MS nº 2.048/2002</strong> e pelas <strong>Resoluções CFM nº 1.671/2003 e nº 2.077/2014</strong>). A Vaga Zero é um dispositivo de autoridade sanitária excepcional que <strong>obriga o hospital de referência terciária a acolher imediatamente o paciente grave, independentemente de haver leitos vagos declarados no momento</strong>, cabendo à equipe hospitalar reorganizar internamente sua estrutura para prestar a estabilização cirúrgica e o suporte vital. O médico plantonista do hospital não pode recusar a entrada da ambulância do SAMU em vaga zero sob pena de cometer infração ética e crime de <strong>omissão de socorro (Art. 135 do Código Penal)</strong>. O Médico Regulador do SAMU deve documentar a determinação de Vaga Zero no sistema e a ambulância deve ser encaminhada diretamente ao hospital terciário.</p>
</div>

<div class="drive-block">
  <h4>Caso Clínico 3 — Solicitação Indevida de TFD para Tratamento Existente no Estado</h4>
  <p><strong>Vinheta de Regulação:</strong> Paciente de 54 anos residente em município do interior da Bahia com diagnóstico de câncer de próstata localizado tem indicação de radioterapia conformacional pélvica. O médico assistente do município de origem preenche laudo de solicitação de Tratamento Fora do Domicílio (TFD) para que o paciente viaje a São Paulo (SP) e realize a radioterapia no Hospital das Clínicas da USP, justificando que "o serviço de São Paulo possui aceleradores lineares mais modernos e renomados nacionalmente". Ao analisar o pedido na Comissão Estadual de TFD, o médico auditor identifica que o estado da Bahia possui serviços de oncologia habilitados (CACON/UNACON) em Salvador e em Feira de Santana que realizam radioterapia pelo SUS, embora com tempo médio de espera de 35 dias para início do tratamento.</p>
  <p><strong>Análise Sanitária e Decisão do Auditor:</strong> O pedido de TFD interestadual <strong>deve ser indeferido</strong> com base na Portaria SAS/MS nº 055/1999. O TFD interestadual só pode ser concedido quando <strong>todos os meios de tratamento no próprio estado de residência estiverem comprovadamente esgotados ou forem inexistentes</strong>. A preferência pessoal do paciente ou do médico por um hospital universitário famoso em outro estado não constitui critério de elegibilidade do SUS. Havendo oferta de radioterapia na rede estadual pactuada na CIR/CIB, a conduta correta do Complexo Regulador é <strong>regular o paciente para a fila do CACON/UNACON estadual mais próximo de sua residência</strong>, observando o cumprimento do prazo máximo legal de 60 dias da Lei nº 12.732/2012 para início da terapia oncológica.</p>
</div>

<div class="drive-block">
  <h4>Caso Clínico 4 — Classificação de Risco na Central de Regulação Ambulatorial (Cardiologia)</h4>
  <p><strong>Vinheta Clínica:</strong> Dois pacientes atendidos na mesma manhã em uma UBS recebem solicitação de consulta médica com cardiologista no SISREG:
  <ul>
    <li><em>Paciente A:</em> 68 anos, hipertenso crônico assintomático, PA 135/85 mmHg em uso de enalapril 20 mg/dia, sem queixas torácicas, ECG normal; encaminhado pelo médico novato da UBS "para avaliação de rotina com cardiologista";</li>
    <li><em>Paciente B:</em> 61 anos, hipertenso e diabético, relata episódios de dor retroesternal em aperto desencadeados aos médios esforços com irradiação para mandíbula há 3 semanas, com alívio em repouso (Angina Estável Classe II de CCS); ECG mostra infradesnivelamento de ST de 1 mm em V5-V6.</li>
  </ul>
  O operador administrativo da UBS inseriu ambos os pedidos no SISREG na mesma hora.</p>
  <p><strong>Análise Sanitária e Decisão do Médico Regulador:</strong> O Médico Regulador da Central Ambulatorial aplica os <strong>Protocolos de Regulação do Acesso</strong> baseados em classificação de risco clínico:
  <ul>
    <li>Para o <strong>Paciente B</strong>, a solicitação é classificada como <strong>Prioridade Alta / Amarela</strong> (risco cardiovascular elevado com angina de esforço e alteração isquêmica no ECG), sendo autorizada e agendada para atendimento em ambulatório de cardiologia em prazo oportuno (idealmente &lt; 15 a 30 dias) para estratificação isquêmica anatômica/funcional (teste ergométrico, cintilografia ou angiotomografia coronariana);</li>
    <li>Para o <strong>Paciente A</strong>, a solicitação é <strong>recusada/devolvida com justificativa técnica</strong>: o paciente é assintomático, tem PA controlada e ECG normal, configurando hipertensão arterial de risco habitual que deve ser acompanhada integralmente pela equipe da Atenção Básica (UBS/eSF), sem indicação técnica de encaminhamento à atenção especializada focal. A regulação impede o represamento inútil de vagas na média complexidade.</li>
  </ul>
</div>

<div class="drive-block">
  <h4>Caso Clínico 5 — Ruptura de Contrarreferência após Cirurgia Eletiva e Matriciamento</h4>
  <p><strong>Vinheta de Continuidade:</strong> Paciente de 58 anos foi submetido a colectomia esquerda com colostomia protetora em hospital geral regional de referência após encaminhamento regulado pela sua UBS. No 5º dia pós-operatório, recebe alta hospitalar com prescrição manual em folha de receituário comum contendo analgésicos e um recado verbal da enfermagem: "procure o postinho para tirar os pontos em 10 dias e conseguir bolsas de colostomia". O paciente comparece à UBS sem sumário de alta, sem relatório cirúrgico e sem laudo anatomopatológico. A equipe de enfermagem da UBS não foi previamente avisada e a unidade não dispõe de bolsas de colostomia do tamanho adequado no estoque imediato.</p>
  <p><strong>Análise Sanitária e Plano de Melhoria:</strong> O caso evidencia uma <strong>falha grave de contrarreferência e quebra da Linha de Cuidado do Paciente Ostomizado na RAS</strong>. O hospital de referência violou os princípios da desospitalização responsável e da continuidade do cuidado: todo paciente cirúrgico que recebe alta deve sair com <strong>Sumário de Alta Hospitalar completo</strong> e contrarreferência inserida no prontuário eletrônico compartilhado ou entregue por escrito, informando a técnica operatória, o resultado ou pendência do laudo histopatológico e o plano de cuidados. Além disso, antes da alta de um paciente ostomizado, o Núcleo Interno de Regulação (NIR) do hospital deve articular a <strong>contrarreferência com o serviço de atenção à pessoa ostomizada da RCPD e com a eSF da UBS de referência</strong> para que a família receba treinamento e os insumos (placas e bolsas de colostomia) estejam disponíveis na UBS no momento da desospitalização. A conduta imediata: acolhimento da família pela eSF, contato telefônico da enfermeira da UBS com o serviço hospitalar para obtenção da nota de alta, retirada dos pontos, cadastro prioritário no programa de estomaterapia e acionamento da equipe eMulti para apoio no cuidado domiciliar.</p>
</div>

<div class="drive-block">
  <h4>Caso Clínico 6 — Regulação de Urgência e Recusa de Acolhimento em Hospital Municipal</h4>
  <p><strong>Vinheta Ético-Legal:</strong> Em uma cidade de 50.000 habitantes que possui um Hospital Geral Municipal com pronto-socorro e sala de estabilização, dá entrada uma criança de 4 anos com insuficiência respiratória grave por broncoespasmo refratário e estridor. O médico plantonista da porta recusa-se a internar a criança na sala vermelha da própria unidade, afirmando aos pais que "o município não possui UTI Pediátrica e, portanto, a criança não pode ser atendida aqui, devendo a família colocá-la no carro próprio e levá-la imediatamente para o Hospital Infantil da capital a 120 km de distância".</p>
  <p><strong>Análise Sanitária, Jurídica e Conduta:</strong> A conduta do médico plantonista configura flagrante negligência ética e violação da Lei nº 8.080/1990 e das normas do Conselho Federal de Medicina. Em situações de urgência e emergência com risco de vida, <strong>todo e qualquer serviço de saúde integrante do SUS é Porta de Entrada obrigatória e tem o dever inegociável de prestar o atendimento inicial, estabilizar a via aérea e os parâmetros hemodinâmicos do paciente em sua sala vermelha/estabilização</strong>. A ausência de UTI Pediátrica definitiva no hospital local não autoriza a recusa do atendimento inicial: a criança deve ser imediatamente acolhida na sala de estabilização (oxigenoterapia, broncodilatadores inalatórios, corticoterapia venosa ou intubação orotraqueal se falência respiratória) e, simultaneamente, o médico assistente deve <strong>acionar a Central de Regulação de Urgências do SAMU 192 e a Central de Leitos do Estado</strong> para solicitar transferência inter-hospitalar em Unidade de Suporte Avançado (USA) pediátrica com vaga regulada em UTI Pediátrica. Jamais transferir paciente instável em veículo particular sem estabilização e sem suporte médico.</p>
</div>
\`
    },
    {
      id: 'dez-questoes-comentadas-residencia-regionalizacao',
      title: '11. Questões Comentadas de Concursos e Residência Médica: Do Enunciado ao Gabarito',
      body_html: \`
<h3>Questão Comentada 1 — Os 5 Requisitos Obrigatórios da Região de Saúde (USP / ENARE)</h3>
<p><strong>Enunciado:</strong> De acordo com o Decreto Presidencial nº 7.508/2011, que regulamenta a Lei Federal nº 8.080/1990 para dispor sobre a organização do SUS, o planejamento da saúde, a assistência à saúde e a articulação interfederativa, a Região de Saúde é constituída por agrupamentos de municípios limítrofes com a finalidade de integrar a organização, o planejamento e a execução de ações e serviços de saúde. Para ser formalmente instituída, a Região de Saúde deve conter, no mínimo, ações e serviços de:</p>
<ul>
  <li><strong>A)</strong> Atenção Primária; Urgência e Emergência; Atenção Psicossocial; Atenção Ambulatorial Especializada e Hospitalar; e Vigilância em Saúde.</li>
  <li><strong>B)</strong> Atenção Primária; Vigilância Sanitária; Saúde do Trabalhador; Transplantes de Órgãos; e Transporte Aeromédico.</li>
  <li><strong>C)</strong> Atenção Primária; Policlínicas Regionais; CAPS III 24 horas; Hemodiálise; e Farmácia Popular.</li>
  <li><strong>D)</strong> Vigilância Epidemiológica; Vigilância Sanitária; Urgência Móvel SAMU 192; Cirurgia Cardíaca; e Oncologia CACON.</li>
</ul>
<p><strong>Gabarito Oficial: Alternativa A.</strong></p>
<p><strong>Comentário Analítico das Alternativas:</strong></p>
<ul>
  <li><strong>Alternativa A (Correta):</strong> Reproduz com absoluta fidelidade a lista taxativa do <strong>Artigo 5º do Decreto nº 7.508/2011</strong>: para ser instituída, a Região de Saúde deve conter, no mínimo, ações e serviços de: <em>I — Atenção Primária; II — Urgência e Emergência; III — Atenção Psicossocial; IV — Atenção Ambulatorial Especializada e Hospitalar; e V — Vigilância em Saúde</em> (mnemônico clássico: VASP-U ou PA-UPS).</li>
  <li><strong>Alternativas B, C e D (Incorretas):</strong> Misturam serviços de alta complexidade (transplantes, hemodiálise, cirurgia cardíaca) que pertencem ao nível macrorregional ou federal com os requisitos mínimos obrigatórios da Região de Saúde.</li>
</ul>

<h3>Questão Comentada 2 — Portas de Entrada das Redes de Atenção à Saúde (UNICAMP / ENARE)</h3>
<p><strong>Enunciado:</strong> Um dos pontos mais cobrados do Decreto nº 7.508/2011 refere-se à diferenciação entre os requisitos para instituir a Região de Saúde e as Portas de Entrada da Rede de Atenção à Saúde (RAS). Nos termos expressos do Artigo 9º do Decreto nº 7.508/2011, são consideradas Portas de Entrada às ações e aos serviços de saúde nas Redes de Atenção à Saúde exclusivamente os serviços de:</p>
<ul>
  <li><strong>A)</strong> Atenção Primária; Atenção de Urgência e Emergência; Atenção Psicossocial; e Especiais de Acesso Aberto.</li>
  <li><strong>B)</strong> Atenção Primária; Hospitais Gerais Terciários; Ambulatórios de Especialidades Médicas; e Unidades de Terapia Intensiva.</li>
  <li><strong>C)</strong> Unidades Básicas de Saúde; Prontos-Socorros; Serviços de TFD; e Centros de Hemodiálise.</li>
  <li><strong>D)</strong> Apenas a Atenção Primária à Saúde, sendo proibido o acesso direto do cidadão a qualquer outro serviço do SUS sem prévio encaminhamento da UBS.</li>
</ul>
<p><strong>Gabarito Oficial: Alternativa A.</strong></p>
<p><strong>Comentário Analítico das Alternativas:</strong></p>
<ul>
  <li><strong>Alternativa A (Correta):</strong> O <strong>Art. 9º do Decreto nº 7.508/2011</strong> estabelece taxativamente as 4 Portas de Entrada da RAS: <em>I — Atenção Primária; II — Atenção de Urgência e Emergência; III — Atenção Psicossocial; e IV — Especiais de Acesso Aberto</em> (como CTA/SAE e CEREST).</li>
  <li><strong>Alternativa B (Incorreta):</strong> A atenção hospitalar eletiva e ambulatorial especializada <strong>NÃO</strong> são portas de entrada; pelo Art. 10, são serviços de acesso referenciado pelas portas de entrada.</li>
  <li><strong>Alternativa C (Incorreta):</strong> TFD e hemodiálise são serviços de suporte e especializados referenciados.</li>
  <li><strong>Alternativa D (Incorreta):</strong> Embora a Atenção Primária seja a ordenadora preferencial do acesso, as urgências, a atenção psicossocial e os serviços especiais são expressamente portas de entrada diretas.</li>
</ul>

<h3>Questão Comentada 3 — As Três Dimensões da Política Nacional de Regulação (Portaria nº 1.559/2008) (UFRJ)</h3>
<p><strong>Enunciado:</strong> A Política Nacional de Regulação do SUS (Portaria GM/MS nº 1.559/2008 / Portaria de Consolidação GM/MS nº 2/2017) organiza as ações regulatórias em três dimensões integradas. Assinale a alternativa que correlaciona corretamente uma dessas dimensões com o seu respectivo objeto de atuação no sistema:</p>
<ul>
  <li><strong>A)</strong> A Regulação do Acesso à Assistência atua diretamente na intermediação entre a necessidade do cidadão e a disponibilização da alternativa assistencial mais adequada (leitos, consultas e exames) por meio de Centrais de Regulação e protocolos de classificação de risco.</li>
  <li><strong>B)</strong> A Regulação de Sistemas de Saúde limita-se exclusivamente ao atendimento telefônico dos chamados de ambulâncias do SAMU 192 nas capitais.</li>
  <li><strong>C)</strong> A Regulação da Atenção à Saúde atua na fiscalização sanitária de alimentos em supermercados e restaurantes pela ANVISA.</li>
  <li><strong>D)</strong> A Regulação do Acesso à Assistência é uma competência privativa do Ministério da Saúde, sendo vedada a existência de Centrais de Regulação municipais ou estaduais no SUS.</li>
</ul>
<p><strong>Gabarito Oficial: Alternativa A.</strong></p>
<p><strong>Comentário Analítico das Alternativas:</strong></p>
<ul>
  <li><strong>Alternativa A (Correta):</strong> Define com absoluta precisão o escopo da <strong>Regulação do Acesso à Assistência (Regulação Assistencial)</strong>: operacionalizar o encontro entre a necessidade clínica do indivíduo e a vaga/recurso mais oportuno através dos Complexos Reguladores.</li>
  <li><strong>Alternativa B (Incorreta):</strong> O SAMU integra a Regulação do Acesso; a Regulação de Sistemas tem caráter macro (planejamento, normas, auditoria do sistema).</li>
  <li><strong>Alternativa C (Incorreta):</strong> A fiscalização sanitária de alimentos integra a Regulação de Sistemas (Vigilância Sanitária); a Regulação da Atenção atua sobre a contratualização e controle dos prestadores de saúde credenciados no SCNES.</li>
  <li><strong>Alternativa D (Incorreta):</strong> As três esferas de governo (federal, estadual e municipal) possuem competência e operam Centrais de Regulação no SUS.</li>
</ul>

<h3>Questão Comentada 4 — O Contrato Organizativo da Ação Pública da Saúde (COAP) (UNIFESP)</h3>
<p><strong>Enunciado:</strong> O Decreto Presidencial nº 7.508/2011 instituiu o Contrato Organizativo da Ação Pública da Saúde (COAP) como instrumento de formalização do pacto de gestão na Região de Saúde. Sobre a natureza jurídica e as regras do COAP, assinale a alternativa correta:</p>
<ul>
  <li><strong>A)</strong> O COAP é um contrato administrativo assinado exclusivamente entre operadoras de planos de saúde privados e o Ministério da Saúde para vender consultas particulares em hospitais do SUS.</li>
  <li><strong>B)</strong> O COAP é um acordo de colaboração multilateral firmado entre todos os entes federativos (União, Estado e Municípios participantes da Região de Saúde) para integrar as ações e serviços da rede regionalizada, fixando responsabilidades, indicadores, metas e recursos financeiros de cada ente.</li>
  <li><strong>C)</strong> A assinatura do COAP extingue imediatamente as Secretarias Municipais de Saúde da região, transferindo toda a gestão dos municípios para o Governo Federal.</li>
  <li><strong>D)</strong> A fiscalização e auditoria do cumprimento do COAP é atribuição exclusiva do Conselho Federal de Medicina (CFM), sendo vedada a atuação do Sistema Nacional de Auditoria (SNA).</li>
</ul>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Analítico das Alternativas:</strong></p>
<ul>
  <li><strong>Alternativa B (Correta):</strong> Nos termos dos Artigos 33 e 34 do Decreto nº 7.508/2011, o <strong>COAP</strong> é o acordo de colaboração firmado entre a União, o Estado e todos os Municípios da Região de Saúde para consolidar a integração regional e a cogestão sanitária com responsabilidades e metas definidas.</li>
  <li><strong>Alternativa A (Incorreta):</strong> O COAP é um contrato de direito público interfederativo do SUS, não tendo relação com planos privados de saúde.</li>
  <li><strong>Alternativa C (Incorreta):</strong> O COAP preserva a autonomia e as competências constitucionais de cada esfera de governo.</li>
  <li><strong>Alternativa D (Incorreta):</strong> Pelo Art. 40 do Decreto, a fiscalização e auditoria do COAP compete ao <strong>Sistema Nacional de Auditoria (SNA)</strong> em cada esfera gestora.</li>
</ul>

<h3>Questão Comentada 5 — Critérios e Vedações no Tratamento Fora do Domicílio (TFD) (SUS-SP / IAMSPE)</h3>
<p><strong>Enunciado:</strong> A respeito das normas que regulamentam a concessão de Tratamento Fora do Domicílio (TFD) no Sistema Único de Saúde (Portaria SAS/MS nº 055/1999), assinale a afirmativa correta:</p>
<ul>
  <li><strong>A)</strong> O TFD pode ser autorizado para custear tratamentos médicos de caráter puramente experimental ou estético não previstos na Tabela de Procedimentos do SUS, desde que solicitados por hospital privado.</li>
  <li><strong>B)</strong> O TFD é autorizado quando esgotados todos os meios de tratamento e diagnóstico no município e estado de origem, devendo a distância ser superior a 50 km e haver garantia prévia de agendamento no destino, cobrindo transporte e ajuda de custo para alimentação/pernoite.</li>
  <li><strong>C)</strong> É obrigatória a concessão de passagem de avião de primeira classe para todo e qualquer paciente encaminhado via TFD, independentemente da distância ou condição clínica.</li>
  <li><strong>D)</strong> O TFD cobre o pagamento de diárias de internação hospitalar particular para pacientes que optarem por leito privativo de luxo em outro estado.</li>
</ul>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Analítico das Alternativas:</strong></p>
<ul>
  <li><strong>Alternativa B (Correta):</strong> Reúne todos os requisitos legais da Portaria SAS/MS nº 055/1999: esgotamento local comprovado, distância mínima &gt; 50 km, garantia prévia de atendimento no destino e cobertura de transporte e ajuda de custo diária.</li>
  <li><strong>Alternativas A, C e D (Incorretas):</strong> O TFD é expressamente vedado para procedimentos experimentais/não constantes da tabela SUS, não cobre internações particulares e reserva o transporte aéreo exclusivamente para situações de indicação clínica justificada.</li>
</ul>

<h3>Questão Comentada 6 — Requisitos de Acesso a Medicamentos na RENAME (Decreto nº 7.508/2011) (FUVEST)</h3>
<p><strong>Enunciado:</strong> O Artigo 28 do Decreto Presidencial nº 7.508/2011 estabelece os requisitos obrigatórios para que o usuário do SUS tenha acesso a medicamentos e produtos de interesse para a saúde no âmbito do sistema público. Assinale a alternativa que NÃO constitui um desses requisitos cumulativos:</p>
<ul>
  <li><strong>A)</strong> Estar o usuário assistido por ações e serviços de saúde do SUS.</li>
  <li><strong>B)</strong> Ter o medicamento sido prescrito por profissional de saúde, no exercício regular de suas funções no SUS.</li>
  <li><strong>C)</strong> Estar a prescrição em conformidade com a RENAME e com os Protocolos Clínicos e Diretrizes Terapêuticas (PCDT).</li>
  <li><strong>D)</strong> Ter o paciente renda familiar comprovada inferior a um salário mínimo e apresentar certidão de quitação de tributos municipais.</li>
</ul>
<p><strong>Gabarito Oficial: Alternativa D.</strong></p>
<p><strong>Comentário Analítico das Alternativas:</strong></p>
<ul>
  <li><strong>Alternativa D (Incorreta / Gabarito da questão):</strong> O SUS é <strong>universal e gratuito</strong>; a exigência de comprovação de renda baixa ou quitação de impostos é manifestamente ilegal e inconstitucional, violando a universalidade do Art. 196 da CF/88.</li>
  <li><strong>Alternativas A, B e C (Requisitos Legais do Art. 28):</strong> Representam com fidelidade os incisos I, II e III do Art. 28 do Decreto nº 7.508/2011 (somados ao inciso IV: dispensação em unidades indicadas pelo SUS).</li>
</ul>

<h3>Questão Comentada 7 — Instâncias Intergestores e Composição da CIR (UERJ)</h3>
<p><strong>Enunciado:</strong> A Comissão Intergestores Regional (CIR), criada pelo Pacto pela Saúde (2006) sob o nome de CGR e consolidada pelo Decreto nº 7.508/2011 e pela Lei nº 12.466/2011, é o espaço permanente de pactuação regional no SUS. Quem compõe a CIR em uma determinada Região de Saúde?</p>
<ul>
  <li><strong>A)</strong> Representantes da Secretaria Estadual de Saúde (SES) e TODOS os Secretários Municipais de Saúde dos municípios que integram aquela Região de Saúde.</li>
  <li><strong>B)</strong> Apenas o Secretário Estadual de Saúde e os prefeitos municipais, sendo vedada a participação de secretários de saúde.</li>
  <li><strong>C)</strong> 50% de usuários do SUS, 25% de profissionais de saúde e 25% de gestores, com eleições a cada 2 anos.</li>
  <li><strong>D)</strong> Representantes do Ministério da Saúde, do CONASS e do CONASEMS em Brasília.</li>
</ul>
<p><strong>Gabarito Oficial: Alternativa A.</strong></p>
<p><strong>Comentário Analítico das Alternativas:</strong></p>
<ul>
  <li><strong>Alternativa A (Correta):</strong> Na <strong>CIR</strong>, a composição intergestores regional é formada pela Secretaria Estadual de Saúde e por <strong>todos os secretários municipais de saúde da respectiva Região de Saúde</strong>.</li>
  <li><strong>Alternativa B (Incorreta):</strong> Quem compõe a CIR são os gestores de saúde (secretários), e não os prefeitos diretamente.</li>
  <li><strong>Alternativa C (Incorreta):</strong> Essa composição paritária (50% usuários, 25% trabalhadores, 25% gestores/prestadores) é exclusiva dos <strong>Conselhos de Saúde</strong> (Lei nº 8.142/1990 e Resolução CNS nº 453/2012), e não das Comissões Intergestores.</li>
  <li><strong>Alternativa D (Incorreta):</strong> MS + CONASS + CONASEMS formam a <strong>CIT (Comissão Intergestores Tripartite)</strong> no âmbito federal.</li>
</ul>

<h3>Questão Comentada 8 — Central Nacional de Regulação de Alta Complexidade (CNRAC) (ENARE)</h3>
<p><strong>Enunciado:</strong> A Central Nacional de Regulação da Alta Complexidade (CNRAC) é a instância responsável pela regulação interestadual no SUS. Qual das seguintes situações assistenciais representa a indicação típica de acionamento da CNRAC?</p>
<ul>
  <li><strong>A)</strong> Consulta de rotina em oftalmologia para prescrição de óculos de leitura em paciente assintomático.</li>
  <li><strong>B)</strong> Recém-nascido em estado da Região Norte com diagnóstico de cardiopatia congênita complexa (Transposição das Grandes Artérias) com indicação cirúrgica neonatal urgente (Cirurgia de Jatene), quando o estado de origem não dispõe de serviço habilitado de cirurgia cardíaca pediátrica de alta complexidade.</li>
  <li><strong>C)</strong> Tratamento odontológico restaurador de cárie dentária com resina composta.</li>
  <li><strong>D)</strong> Coleta de exame de preventivo do câncer do colo do útero (Papanicolau) em mulher de 35 anos.</li>
</ul>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Analítico das Alternativas:</strong></p>
<ul>
  <li><strong>Alternativa B (Correta):</strong> A CNRAC destina-se exclusivamente a procedimentos de <strong>altíssima complexidade e especialização médica</strong> (cirurgia cardiovascular pediátrica complexa, neurocirurgia funcional/Parkinson/epilepsia, transplante de medula óssea alogênico e ortopedia de alta complexidade) quando o estado de origem não possui o serviço ou esgotou integralmente sua capacidade resolutiva.</li>
  <li><strong>Alternativas A, C e D (Incorretas):</strong> São procedimentos da Atenção Primária ou Média Complexidade ambulatorial, que devem ser resolvidos na própria UBS ou na Região de Saúde.</li>
</ul>

<h3>Questão Comentada 9 — O Princípio da Vaga Zero e Responsabilidade Médica (CREMESP)</h3>
<p><strong>Enunciado:</strong> Em relação ao conceito ético-legal da "Vaga Zero", regulamentado pelo Conselho Federal de Medicina (Resolução CFM nº 2.077/2014) e pelo Ministério da Saúde (Portaria GM/MS nº 2.048/2002), é correto afirmar que:</p>
<ul>
  <li><strong>A)</strong> É um recurso de acesso excepcional que garante a internação imediata de pacientes em leitos eletivos para realização de cirurgias plásticas estéticas.</li>
  <li><strong>B)</strong> É uma prerrogativa exclusiva do Médico Regulador de Urgências para direcionar pacientes em situação de risco iminente de morte a um serviço de referência terciária, não podendo o hospital de destino recusar a admissão do paciente alegando falta de leitos.</li>
  <li><strong>C)</strong> Pode ser utilizado livremente por qualquer médico da Atenção Básica para agendar exames de sangue de rotina com prioridade.</li>
  <li><strong>D)</strong> Foi considerado inconstitucional pelo Supremo Tribunal Federal, sendo expressamente proibido o seu uso no território nacional.</li>
</ul>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Analítico das Alternativas:</strong></p>
<ul>
  <li><strong>Alternativa B (Correta):</strong> A Vaga Zero é prerrogativa técnica e legal indelegável do <strong>Médico Regulador de Urgência</strong> para salvar vidas em emergências extremas, impondo ao hospital de referência o dever imediato de acolhimento e estabilização.</li>
  <li><strong>Alternativas A, C e D (Incorretas):</strong> Vaga Zero é restrita à urgência com risco vital, é plenamente constitucional e ética, e não tem aplicação em procedimentos eletivos ou estéticos.</li>
</ul>

<h3>Questão Comentada 10 — Apoio Matricial e Projeto Terapêutico Singular (PTS) (UFMG)</h3>
<p><strong>Enunciado:</strong> Na articulação entre a Atenção Primária e os serviços de apoio especializado nas Redes de Atenção à Saúde, o Apoio Matricial (Matriciamento) visa superar a fragmentação burocrática das guias de encaminhamento. Assinale a alternativa que expressa corretamente uma característica do Matriciamento no SUS:</p>
<ul>
  <li><strong>A)</strong> O apoiador matricial assume integralmente o atendimento e transfere o paciente para o hospital, proibindo a equipe de Saúde da Família de manter contato com a família.</li>
  <li><strong>B)</strong> O matriciamento opera na retaguarda assistencial e técnico-pedagógica, realizando atendimentos conjuntos (interconsultas) e construção compartilhada de Projetos Terapêuticos Singulares (PTS) entre a equipe de referência da APS e os especialistas, qualificando o cuidado no próprio território.</li>
  <li><strong>C)</strong> O matriciamento é uma técnica de auditoria contábil voltada a multar médicos que solicitam exames laboratoriais.</li>
  <li><strong>D)</strong> No apoio matricial, o médico especialista substitui o juiz de direito na determinação de prisões de pacientes psiquiátricos.</li>
</ul>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Analítico das Alternativas:</strong></p>
<ul>
  <li><strong>Alternativa B (Correta):</strong> O apoio matricial integra suporte técnico-pedagógico (educação permanente) e clínico-assistencial (interconsulta, Projeto Terapêutico Singular — PTS compartilhado), valorizando a longitudinalidade da equipe de referência da Atenção Primária.</li>
  <li><strong>Alternativas A, C e D (Incorretas):</strong> Distorcem completamente o conceito humanizado e interprofissional do matriciamento formulado por Gastão Wagner de Sousa Campos.</li>
</ul>
\`
    },
    {
      id: 'sintese-retencao-referencias-oficiais-legislacao-sus',
      title: '12. Síntese Executiva de Alta Retenção e Referências Oficiais da Legislação do SUS',
      body_html: \`
<h3>Síntese Executiva de Alta Retenção para Provas de Residência Médica</h3>
<ul>
  <li><strong>Bases Constitucionais e Legais (Art. 198 CF/88 e Lei nº 8.080/1990):</strong> O SUS é uma <strong>rede regionalizada e hierarquizada</strong> com direção única em cada esfera de governo. Descentralização com municipalização exige cooperação regional solidária para garantir integralidade e economia de escala.</li>
  <li><strong>Evolução Histórica:</strong> NOB 91 (produção INAMPS); NOB 93 (gestão incipiente, parcial e semiplena; repasse fundo a fundo; criação da CIB e CIT); NOB 96 (GPAB e GPSM; criação do PAB e da PPI); NOAS 2001/2002 (foco na regionalização; criação do PDR, PDI e GPABA); Pacto pela Saúde 2006 (Vida, Defesa e Gestão; fim da habilitação burocrática, TCG, regionalização solidária e criação dos CGR).</li>
  <li><strong>Decreto nº 7.508/2011 (Marco Regulatório):</strong>
    <ul>
      <li><strong>Região de Saúde (Art. 2º e 4º):</strong> Espaço geográfico contínuo de municípios limítrofes, instituída pelo <strong>Estado em articulação com os Municípios</strong>, respeitadas as diretrizes da CIT. Pode ser interestadual.</li>
      <li><strong>Os 5 Serviços Mínimos Obrigatórios para Instituir uma Região de Saúde (Art. 5º — VASP-U):</strong> (1) Atenção Primária; (2) Urgência e Emergência; (3) Atenção Psicossocial; (4) Atenção Ambulatorial Especializada e Hospitalar; e (5) Vigilância em Saúde.</li>
      <li><strong>As 4 Portas de Entrada da RAS (Art. 9º):</strong> (1) Atenção Primária; (2) Atenção de Urgência e Emergência; (3) Atenção Psicossocial; e (4) Especiais de Acesso Aberto (CTA/SAE e CEREST). Serviços hospitalares eletivos e especializados são <strong>referenciados</strong> (Art. 10).</li>
      <li><strong>Mapa da Saúde (Art. 2º, V):</strong> Mapeia a capacidade instalada e recursos humanos do <strong>SUS e da iniciativa privada</strong>.</li>
      <li><strong>COAP (Art. 33 a 41):</strong> Acordo multilateral de colaboração entre União, Estado e Municípios na Região de Saúde; fiscalizado pelo SNA.</li>
      <li><strong>RENAME e RENASES (Art. 21 a 29):</strong> Atualizadas a cada <strong>2 anos</strong> pelo Ministério da Saúde. Requisitos do Art. 28: estar assistido pelo SUS, prescrito por profissional no SUS, conforme RENAME/PCDT e dispensado em unidade do SUS.</li>
      <li><strong>Comissões Intergestores (Art. 14-A da Lei 8.080 e Dec. 7.508):</strong> CIT (MS + CONASS + CONASEMS), CIB (SES + COSEMS) e CIR (SES + todos os secretários municipais da região). Decisões exclusivamente por <strong>consenso (pactuação)</strong>.</li>
    </ul>
  </li>
  <li><strong>Política Nacional de Regulação (Portaria nº 1.559/2008 / PRC nº 2):</strong> 3 dimensões: (1) Regulação de Sistemas (macro, normas, auditoria, ANVISA/ANS); (2) Regulação da Atenção (contratualização, SCNES, controle de prestadores); e (3) Regulação do Acesso / Assistencial (Centrais de Regulação, Complexos Reguladores, SISREG, AIH, APAC, leitos e urgências).</li>
  <li><strong>Vaga Zero (Portaria 2.048/2002 e Res. CFM 2.077/2014):</strong> Prerrogativa do <strong>Médico Regulador do SAMU/Urgências</strong> em risco iminente de morte; hospital de referência é obrigado a acolher imediatamente.</li>
  <li><strong>TFD (Portaria SAS/MS nº 055/1999):</strong> Esgotamento local comprovado; distância &gt; 50 km; garantia prévia de vaga; cobre transporte e diárias de alimentação/pernoite; vedado para casos particulares ou procedimentos experimentais.</li>
  <li><strong>CNRAC:</strong> Regulação interestadual federal via FAEC para cirurgia cardiovascular pediátrica, neurocirurgia complexa e transplante de medula alogênico.</li>
</ul>
\`
    }
  ],
  references: [
    {
      label: 'BRASIL. Presidência da República. Decreto nº 7.508, de 28 de junho de 2011. Regulamenta a Lei nº 8.080, de 19 de setembro de 1990, para dispor sobre a organização do Sistema Único de Saúde - SUS, o planejamento da saúde, a assistência à saúde e a articulação interfederativa.',
      url: 'https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/decreto/d7508.htm'
    },
    {
      label: 'BRASIL. Presidência da República. Lei nº 8.080, de 19 de setembro de 1990. Dispõe sobre as condições para a promoção, proteção e recuperação da saúde, a organização e o funcionamento dos serviços correspondentes.',
      url: 'https://www.planalto.gov.br/ccivil_03/leis/l8080.htm'
    },
    {
      label: 'BRASIL. Ministério da Saúde. Portaria GM/MS nº 1.559, de 1º de agosto de 2008 (consolidada no Anexo XXVI da Portaria de Consolidação GM/MS nº 2/2017). Institui a Política Nacional de Regulação do Sistema Único de Saúde - SUS.',
      url: 'https://bvsms.saude.gov.br/bvs/saudelegis/gm/2008/prt1559_01_08_2008.html'
    },
    {
      label: 'BRASIL. Ministério da Saúde. Portaria de Consolidação GM/MS nº 1, de 28 de setembro de 2017. Consolidação das normas sobre os direitos e deveres dos usuários da saúde, a organização e o funcionamento do Sistema Único de Saúde (PRI, PGASS e CNRAC).',
      url: 'https://bvsms.saude.gov.br/bvs/saudelegis/gm/2017/prc0001_03_10_2017.html'
    },
    {
      label: 'BRASIL. Ministério da Saúde. Secretaria de Assistência à Saúde. Portaria SAS/MS nº 055, de 24 de fevereiro de 1999. Dispõe sobre a rotina do Tratamento Fora de Domicílio - TFD no âmbito do Sistema Único de Saúde.',
      url: 'https://bvsms.saude.gov.br/bvs/saudelegis/sas/1999/prt0055_24_02_1999.html'
    },
    {
      label: 'CONSELHO FEDERAL DE MEDICINA. Resolução CFM nº 2.077, de 18 de julho de 2014. Normatiza o funcionamento dos Serviços Hospitalares de Urgência e Emergência e a prerrogativa da Vaga Zero.',
      url: 'https://sistemas.cfm.org.br/normas/visualizar/resolucoes/BR/2014/2077'
    }
  ]
};

saveBook(bookReg);
`;

content += remainingSections;
fs.writeFileSync(file, content, "utf8");
console.log("Updated build-bloco-02-preventiva-2.mjs with complete bookReg!");
