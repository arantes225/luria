import fs from 'fs';
import { htmlToBlocks, saveBook, countUsefulChars } from './bloco-04-utils.mjs';

const originalHtml = fs.readFileSync('apostilas/inducao-do-trabalho-de-parto/index.orig.html', 'utf8');

// Extract all valid original sections
const sectionRegex = /<section\s+id=["']([^"']+)["'][^>]*>([\s\S]*?)<\/section>/gi;
let match;
const originalSections = [];
const originalToc = [];

while ((match = sectionRegex.exec(originalHtml)) !== null) {
  const secId = match[1];
  const secBody = match[2];
  if (['referencias', 'resumo', 'sumario', 'capa'].includes(secId)) continue;
  const h2Match = secBody.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
  const title = h2Match ? h2Match[1].replace(/<[^>]+>/g, '').trim() : secId;
  const blocks = htmlToBlocks(title, secBody);
  originalSections.push([secId, 0, blocks]);
  originalToc.push([secId, title]);
}

// Now let's author our new deep sections
const deepSections = [
  [
    'farmacologia-prostaglandinas-figo-ms',
    0,
    [
      ['2', 'Protocolo Detalhado de Prostaglandinas: Misoprostol (PGE1) e Dinoprostona (PGE2)'],
      ['p', 'O amadurecimento cervical farmacológico apoia-se primariamente nas prostaglandinas E1 e E2. O misoprostol (análogo sintético da PGE1) é o fármaco mais amplamente utilizado no Sistema Único de Saúde (SUS) e recomendado pela Federação Internacional de Ginecologia e Obstetrícia (FIGO) e Ministério da Saúde do Brasil.'],
      ['3', 'Esquema Posológico Vaginal e Oral do Misoprostol'],
      ['p', 'Para feto vivo a termo com colo desfavorável (Bishop &le; 6):'],
      ['u', [
        '<strong>Via Vaginal (Padrão-Ouro):</strong> Administrar <strong>25 mcg de misoprostol no fundo de saco vaginal posterior a cada 4 a 6 horas</strong>. A dose de 50 mcg não é recomendada como rotina para feto vivo devido ao aumento expressivo da incidência de taquissistolia e hiperestimulação uterina com desacelerações da frequência cardíaca fetal;',
        '<strong>Via Oral (Alternativa Segura):</strong> Administrar <strong>20 a 25 mcg em solução líquida oral a cada 2 horas</strong> (titulada em água), que atinge eficácia equivalente com menor pico sérico;',
        '<strong>Número Máximo de Doses:</strong> Recomenda-se o limite de 4 a 6 doses consecutivas antes de reavaliar integralmente o plano terapêutico;',
        '<strong>Intervalo Obrigatório para Ocitocina:</strong> Caso o colo amadureça (Bishop &ge; 7-8) sem início de contrações efetivas, deve-se aguardar um <strong>intervalo mínimo de 4 a 6 horas após a última dose de misoprostol vaginal</strong> antes de iniciar a infusão de ocitocina exógena em bomba contínua, prevenindo sinergismo uterotônico grave e rotura uterina.'
      ]],
      ['3', 'Contraindicação Absoluta em Útero Cicatrizado'],
      ['p', 'O uso de misoprostol ou dinoprostona é <strong>terminantemente contraindicado em mulheres com cesariana prévia ou miomectomia transmural com abertura de cavidade endometrial</strong>. Ensaios clínicos e estudos de coorte demonstraram que a exposição de úteros com cicatriz prévia a prostaglandinas eleva a taxa de <strong>rotura uterina catastrófica para 5% a 12%</strong> (comparado a menos de 0,5% com métodos mecânicos). Em provas de residência médica, a prescrição de misoprostol para paciente com cesariana anterior é considerada erro médico crasso.'],
      ['t', [
        'Agente Farmacológico',
        'Via e Dose Recomendada',
        'Intervalo de Repetição',
        'Uso em Cesárea Prévia',
        'Intervalo para Ocitocina'
      ], [
        ['Misoprostol (PGE1) Vaginal', '25 mcg fundo de saco posterior', 'A cada 4 a 6 horas', '<strong>CONTRAINDICADO ABSOLUTO</strong>', '4 a 6 horas'],
        ['Misoprostol (PGE1) Oral', '20 a 25 mcg em solução aquosa', 'A cada 2 horas', '<strong>CONTRAINDICADO ABSOLUTO</strong>', '4 a 6 horas'],
        ['Dinoprostona (PGE2) Fita/Inserto', '10 mg em dispositivo de liberação lenta', 'Retirar em 12 a 24h ou no TP ativo', '<strong>CONTRAINDICADO ABSOLUTO</strong>', '30 minutos após retirada'],
        ['Dinoprostona (PGE2) Gel', '0,5 mg endocervical', 'A cada 6 horas (máx 3 doses)', '<strong>CONTRAINDICADO ABSOLUTO</strong>', '6 horas após última dose']
      ], 'book-table']
    ]
  ],
  [
    'metodo-foley-detalhado-cicatriz',
    0,
    [
      ['2', 'Protocolo Detalhado da Sonda de Foley: Método Mecânico de Escolha'],
      ['p', 'A Sonda de Foley intracervical constitui o método padrão-ouro para preparo e amadurecimento cervical em gestantes com <strong>cicatriz de cesariana anterior</strong> ou quando as prostaglandinas estão contraindicadas (asma moderada a grave, glaucoma, alergia aos componentes).'],
      ['3', 'Técnica Asséptica de Inserção Passo a Passo'],
      ['o', [
        '1. Posição ginecológica e antissepsia rigorosa da vulva, vagina e colo uterino com solução aquosa de clorexidina a 0,2% (evitar soluções alcoólicas na mucosa genital);',
        '2. Introdução de espéculo vaginal descartável ou de Collins sob iluminação adequada com foco de luz;',
        '3. Pinçamento suave do lábio anterior do colo com pinça de Foerster ou de Cheron;',
        '4. Introdução de sonda de Foley estéril de calibre 16 Fr ou 18 Fr através do orifício cervical externo, ultrapassando o orifício interno até que o balão se encontre no espaço extra-amniótico entre as membranas e o miométrio do segmento inferior;',
        '5. Insuflação lenta do balão com <strong>30 a 50 mL de água destilada ou soro fisiológico estéril</strong> utilizando seringa luer-lock;',
        '6. Tração suave do cateter até apoiar firmemente no orifício cervical interno e fixação da haste com fita adesiva hipoalergênica na face interna da coxa materna sob tração leve;',
        '7. O cateter permanece <em>in situ</em> por até <strong>12 a 24 horas</strong> ou até a sua expulsão espontânea (que costuma ocorrer quando a dilatação atinge 3 a 4 cm, tornando o colo favorável).'
      ]],
      ['p', 'O risco de rotura uterina com a Sonda de Foley é de aproximadamente <strong>0,5% a 0,7%</strong>, taxa estritamente idêntica à do trabalho de parto espontâneo com cesárea prévia. A associação simultânea da sonda de Foley com ocitocina intravenosa concomitante é permitida em serviços terciários e reduz o tempo até o nascimento.']
    ]
  ],
  [
    'conducao-ocitocina-titulacao-bic',
    0,
    [
      ['2', 'Protocolo de Ocitocina Intravenosa em Bomba de Infusão Contínua (BIC)'],
      ['p', 'A ocitocina é um hormônio peptídico sintético que atua nos receptores miometriais aumentando a concentração de cálcio intracelular livre e desencadeando contrações rítmicas e coordenadas. Sua aplicação na indução deve seguir estritas normas de biossegurança.'],
      ['3', 'Regime de Baixa Dose Escalonada (Diretrizes ACOG / FEBRASGO / MS)'],
      ['u', [
        '<strong>Preparo da Solução:</strong> Diluir 5 UI de ocitocina sintética em 500 mL de solução fisiológica a 0,9% ou Ringer lactato (gerando concentração padrão de 10 mUI por mL);',
        '<strong>Dose Inicial:</strong> Iniciar a infusão eletrônica em bomba a <strong>1 a 2 mUI/min</strong> (equivalente a 6 a 12 mL/hora da solução padrão);',
        '<strong>Escalonamento Temporal:</strong> Aumentar de 1 a 2 mUI/min a cada <strong>20 a 30 minutos</strong> (tempo necessário para atingir o estado de equilíbrio plasmático), avaliando continuamente a frequência, duração e tônus das contrações uterinas;',
        '<strong>Meta Terapêutica:</strong> Atingir dinâmica uterina eficiente caracterizada por <strong>3 a 4 contrações em 10 minutos</strong>, com duração palpável de 40 a 50 segundos cada;',
        '<strong>Congelamento da Dose:</strong> Uma vez alcançada a dinâmica satisfatória, a velocidade da bomba é mantida fixa, sendo terminantemente proibido elevar a dosagem de rotina além do necessário;',
        '<strong>Dose Máxima Habitual:</strong> Raramente são necessárias doses superiores a 20 a 30 mUI/min (120 a 180 mL/h). Doses além desse patamar saturam os receptores miometriais e acarretam efeito antidiurético (risco de intoxicação hídrica) sem ganho de contratilidade.'
      ]]
    ]
  ],
  [
    'complicacoes-taquissistolia-terbutalina',
    0,
    [
      ['2', 'Complicações da Indução: Taquissistolia Uterina e Ressuscitação Intrauterina'],
      ['p', 'A complicação mais prevalente e potencialmente catastrófica associada ao uso inadequado de indutores é a <strong>taquissistolia uterina</strong>, definida pela presença de <strong>mais de 5 contrações em 10 minutos por 2 períodos consecutivos de 10 minutos</strong> (ou média superior a 5 em 10 min por 30 minutos).'],
      ['3', 'Fisiopatologia da Hipóxia Fetal por Taquissistolia'],
      ['p', 'Durante cada contração que ultrapassa 30 mmHg de pressão intramiometrial, os vasos espiralados que nutrem o espaço interviloso placentário são completamente colapsados pelo miométrio. A perfusão placentária cessa transitoriamente, e o feto sobrevive consumindo a reserva de oxigênio do espaço interviloso. Em condições fisiológicas (3 a 4 contrações em 10 min), o relaxamento de 60 a 90 segundos entre as contrações permite a completa reperfusão e oxigenação. Na taquissistolia, o tempo de relaxamento é insuficiente, consumindo a reserva fetal em minutos e culminando em desacelerações tardias repetitivas (DIP 2), bradicardia fetal e acidose lática grave.'],
      ['3', 'Protocolo Emergencial de Ressuscitação Intrauterina'],
      ['o', [
        '<strong>1. Suspensão Imediata do Agente Indutor:</strong> Desligar imediatamente a bomba de infusão de ocitocina. Se houver fita de dinoprostona na vagina, retirá-la tracionando o cordão; se houver comprimido de misoprostol recente, remover os resíduos do fundo de saco vaginal;',
        '<strong>2. Decúbito Lateral Esquerdo:</strong> Otimizar o retorno venoso pela veia cava inferior e aumentar a pressão de perfusão uteroplacentária;',
        '<strong>3. Hidratação com Cristaloide:</strong> Infusão rápida de 500 mL de Ringer lactato para expandir o volume intravascular e reduzir a concentração de ocitocina circulante;',
        '<strong>4. Oxigenoterapia:</strong> Oferecer oxigênio a 8-10 L/min sob máscara não reinalante se houver desacelerações profundas;',
        '<strong>5. Tocólise de Resgate:</strong> Se a taquissistolia ou o sofrimento fetal persistirem por mais de 3 minutos, administrar <strong>Terbutalina 0,25 mg por via subcutânea</strong>. O relaxamento uterino ocorre em 2 a 3 minutos, restaurando a linha de base da FCF.'
      ]]
    ]
  ],
  [
    'falha-inducao-definicao-estrita',
    0,
    [
      ['2', 'Definição Rigorosa de Falha de Indução: O Limiar das 12 a 18 Horas'],
      ['p', 'O diagnóstico incorreto de falha de indução é uma das principais razões da epidemia de cesarianas evitáveis. A diretriz conjunta do <em>American College of Obstetricians and Gynecologists</em> (ACOG) e da <em>Society for Maternal-Fetal Medicine</em> (SMFM), endossada pela FEBRASGO, estabeleceu regras estritas para evitar intervenções cirúrgicas precipitadas.'],
      ['3', 'Critérios Obrigatórios e Cumulativos para Diagnóstico de Falha de Indução'],
      ['u', [
        'A paciente deve ter permanecido em <strong>infusão contínua de ocitocina em dose adequada</strong>;',
        'As <strong>membranas ovulares devem ter sido rotas</strong> (espontaneamente ou por amniotomia artificial);',
        'A paciente deve ter permanecido sem alcançar a fase ativa franca (dilatação &ge; 5 cm) por <strong>pelo menos 12 a 18 horas de ocitocina após a rotura das membranas</strong>;',
        'Os parâmetros de <strong>vitalidade fetal devem estar estritamente normais</strong> durante todo o período.'
      ]],
      ['p', 'Se as membranas ovulares estiverem íntegras ou se a ocitocina tiver sido administrada por apenas 6 a 8 horas, <strong>o diagnóstico de falha de indução é terminantemente INVÁLIDO</strong>. Nessas circunstâncias, deve-se proceder à amniotomia e manter a estimulação ocitócica.']
    ]
  ],
  [
    'casos-clinicos-integradores-bloco4',
    0,
    [
      ['2', 'Casos Clínicos Resolvidos de Alta Complexidade'],
      ['3', 'Caso 1: Gestação de 41 Semanas com Bishop Desfavorável em Nulípara'],
      ['p', 'Primigesta de 28 anos, 41 semanas e 2 dias confirmada por ultrassonografia de primeiro trimestre, assintomática. CTG anteparto reativa com boa variabilidade. Ao exame físico: PA 115/75 mmHg, AFU 34 cm, apresentação cefálica no plano -3 de De Lee. Toque vaginal: colo fechado (0 cm), grosso (apagamento 20%), firme, posterior. Bishop total: 0 pontos. Ausência de cicatrizes uterinas. <strong>Conduta:</strong> Internação em enfermaria obstétrica para preparo de colo com Misoprostol 25 mcg em fundo de saco vaginal posterior a cada 6 horas. Ocitocina é formalmente contraindicada nesse momento inicial.'],
      ['3', 'Caso 2: Primigesta com Pré-Eclâmpsia ao Termo e Cesárea Prévia'],
      ['p', 'Secundigesta (G2P1c1) de 32 anos, 37 semanas e 4 dias, com história de 1 cesariana segmentar baixa prévia há 3 anos. Desenvolveu pré-eclâmpsia sem sinais de gravidade (PA 145/95 mmHg, proteinúria de fita 2+, sem plaquetopenia ou alteração de enzimas hepáticas). Exame obstétrico: feto único cefálico reativo com peso estimado de 3.200 g e líquido amniótico normal. Colo grosso, fechado, posterior, plano -2 de De Lee (Bishop 2). <strong>Conduta:</strong> Indução indicada pelo termo e pré-eclâmpsia. <strong>Misoprostol é terminantemente PROIBIDO</strong> pelo risco de rotura uterina (5-12%). A conduta correta é o amadurecimento com <strong>Sonda de Foley intracervical preenchida com 30 a 50 mL de água estéril</strong> sob profilaxia com sulfato de magnésio.'],
      ['3', 'Caso 3: Taquissistolia Grave com Desacelerações Tardias Fetais'],
      ['p', 'Nulípara de 21 anos em trabalho de parto induzido com ocitocina intravenosa há 3 horas em bomba contínua. Apresenta subitamente 7 contrações em 10 minutos com tônus lenhoso entre elas, associadas a desacelerações tardias repetitivas com nadir em 80 bpm na CTG. <strong>Conduta:</strong> Suspender a infusão de ocitocina imediatamente, colocar em decúbito lateral esquerdo, administrar oxigênio e bólus de 500 mL de Ringer lactato. Persistindo a taquissistolia após 3 minutos, administrar <strong>Terbutalina 0,25 mg por via subcutânea</strong>. Se refratário após 10 minutos com bradicardia mantida, cesariana de emergência.'],
      ['3', 'Caso 4: Manejo da Rotura Prematura de Membranas a Termo'],
      ['p', 'Gestante de 39 semanas, primípara, relata perda involuntária de líquido claro em grande volume há 10 horas. Ao exame físico: afebril, FCF de 142 bpm reativa, dinâmica ausente. Ao exame especular: saída de líquido claro límpido pelo orifício externo com teste de cristalização em folha de samambaia positivo. Ao toque: colo amolecido, 70% apagado, dilatação de 3 cm, apresentação no plano -1 de De Lee (Bishop = 8). <strong>Conduta:</strong> RPMO a termo com colo favorável (Bishop 8). A conduta preconizada é a indução direta com <strong>Ocitocina intravenosa em bomba de infusão contínua em doses baixas escalonadas</strong>, com vigilância da temperatura e BCF a cada 2 horas.']
    ]
  ],
  [
    'questoes-comentadas-bloco4',
    0,
    [
      ['2', 'Questões de Concursos e Residência Médica com Comentários Exaustivos'],
      ['3', 'Questão 1: Contraindicações Absolutas ao Misoprostol (USP)'],
      ['p', 'Paciente de 29 anos, secundigesta com um parto cesáreo prévio há 4 anos por descolamento de placenta, encontra-se com 41 semanas de gestação. O colo uterino apresenta Índice de Bishop igual a 2. Em relação aos métodos de amadurecimento cervical nessa paciente, assinale a opção CORRETA:'],
      ['o', [
        'A) O misoprostol vaginal em dose de 25 mcg é o método de primeira escolha para amadurecimento.',
        'B) O misoprostol é formalmente contraindicado devido ao risco acentuado de rotura uterina em cicatriz prévia, devendo-se optar por método mecânico com Sonda de Foley.',
        'C) A ocitocina em altas doses sem preparo cervical é a recomendação formal da OMS.',
        'D) Deve-se aguardar em conduta expectante em domicílio até 43 semanas de gestação.',
        'E) A amniotomia imediata no plano -3 de De Lee é mandatória.'
      ]],
      ['p', '<strong>Gabarito Comentado: Alternativa B.</strong><br>' +
        'O misoprostol eleva a taxa de rotura uterina em pacientes com cesárea prévia para 5% a 12%, sendo absolutamente contraindicado. A Sonda de Foley mantém o risco em níveis basais (&lt; 0,7%), sendo o método de escolha.'],

      ['3', 'Questão 2: Cálculo e Decisão no Escore de Bishop (ENARE)'],
      ['p', 'Ao avaliar uma gestante de 39 semanas, o obstetra identifica ao toque: dilatação de 2 cm, apagamento de 60%, altura em -1 de De Lee, consistência amolecida e posição anterior. Qual é o escore de Bishop e a conduta recomendada?'],
      ['o', [
        'A) Bishop 4; cesariana de emergência imediata.',
        'B) Bishop 8 a 9; colo favorável, indução direta com Ocitocina intravenosa.',
        'C) Bishop 5; amadurecimento obrigatório com 100 mcg de misoprostol oral.',
        'D) Bishop 2; suspender atendimento e orientar retorno em 2 semanas.',
        'E) Bishop 12; realizar fórcipe profilático.'
      ]],
      ['p', '<strong>Gabarito Comentado: Alternativa B.</strong><br>' +
        'Dilatação 2 cm (1) + Apagamento 60% (2) + Altura -1 (2) + Consistência mole (2) + Posição anterior (2) = 9 pontos. Bishop &ge; 8 indica colo favorável, sendo a ocitocina intravenosa a conduta de escolha.'],

      ['3', 'Questão 3: Intervalo entre Prostaglandina e Ocitocina (Revalida INEP)'],
      ['p', 'Uma primigesta recebeu comprimido de misoprostol 25 mcg vaginal às 08:00h para preparo de colo. Às 14:00h, o colo atingiu Bishop 8, porém sem dinâmica efetiva. Para iniciar a infusão de ocitocina, qual intervalo mínimo deve ser respeitado?'],
      ['o', [
        'A) Nenhum intervalo; pode-se associar imediatamente.',
        'B) Pelo menos 4 a 6 horas após a última dose de misoprostol.',
        'C) Exatamente 24 horas após qualquer manipulação hormonal.',
        'D) O misoprostol contraindica o uso de ocitocina por 7 dias.',
        'E) Apenas após a expulsão espontânea da placenta.'
      ]],
      ['p', '<strong>Gabarito Comentado: Alternativa B.</strong><br>' +
        'O intervalo mínimo de 4 a 6 horas após a última dose de misoprostol vaginal é exigido pelos consensos internacionais para evitar sinergismo perigoso e rotura uterina.'],

      ['3', 'Questão 4: Critérios Formais de Falha de Indução (UNICAMP)'],
      ['p', 'Para que o diagnóstico de falha de indução seja legitimamente firmado em uma paciente induzida com ocitocina, autorizando a realização de parto cesáreo, exige-se:'],
      ['o', [
        'A) Ausência de dilatação após 4 horas de ocitocina com bolsa íntegra.',
        'B) Persistência na fase latente após pelo menos 12 a 18 horas de ocitocina contínua mantida após a rotura das membranas ovulares.',
        'C) Ausência de contrações após 30 minutos de colocação da sonda de Foley.',
        'D) Necessidade de analgesia de parto durante o primeiro período.',
        'E) Presença de colo posterior após 2 horas de internação.'
      ]],
      ['p', '<strong>Gabarito Comentado: Alternativa B.</strong><br>' +
        'A diretriz ACOG/SMFM/FEBRASGO estabelece que a falha de indução exige membranas rotas e pelo menos 12 a 18 horas de ocitocina sem progressão para a fase ativa.'],

      ['3', 'Questão 5: Taquissistolia e Tocolítico de Resgate (USP-RP)'],
      ['p', 'Durante a infusão de ocitocina, constata-se taquissistolia (6 contrações em 10 minutos) associada a desacelerações tardias e bradicardia fetal. A ocitocina foi desligada e o decúbito lateral adotado, persistindo a hiperestimulação. Qual tocolítico deve ser administrado?'],
      ['o', [
        'A) Terbutalina 0,25 mg por via subcutânea.',
        'B) Ocitocina em bólus de 10 UI.',
        'C) Ergotamina intramuscular.',
        'D) Gluconato de cálcio a 10% IV.',
        'E) Misoprostol 200 mcg sublingual.'
      ]],
      ['p', '<strong>Gabarito Comentado: Alternativa A.</strong><br>' +
        'A terbutalina subcutânea (0,25 mg) é o &beta;2-agonista de escolha para tocólise imediata de resgate em taquissistolia iatrogênica com comprometimento fetal.'],

      ['3', 'Questão 6: Resultados do Ensaio Clínico ARRIVE (SCMSP)'],
      ['p', 'O estudo ARRIVE (NEJM 2018), que comparou a indução eletiva com 39 semanas versus conduta expectante em nulíparas de baixo risco, demonstrou:'],
      ['o', [
        'A) Aumento na taxa de cesarianas no grupo submetido à indução.',
        'B) Redução estatisticamente significativa na taxa de parto por cesariana e nos distúrbios hipertensivos no grupo induzido.',
        'C) Mortalidade perinatal cinco vezes maior no grupo indução.',
        'D) Equivalência absoluta em todos os parâmetros sem nenhuma diferença clínica.',
        'E) Necessidade universal de fórcipe de rotação em todos os partos induzidos.'
      ]],
      ['p', '<strong>Gabarito Comentado: Alternativa B.</strong><br>' +
        'O estudo ARRIVE demonstrou menor taxa de cesariana (18,6% vs 22,2%) e menor frequência de pré-eclâmpsia/hipertensão gestacional no grupo induzido com 39 semanas.'],

      ['3', 'Questão 7: Segurança da Amniotomia Artificial (UERJ)'],
      ['p', 'Qual condição é estritamente mandatória antes de se realizar a amniotomia artificial para prevenir o prolapso de cordão umbilical?'],
      ['o', [
        'A) Cabeça fetal alta e móvel no plano -3 de De Lee.',
        'B) Apresentação cefálica fletida bem aplicada ao colo uterino e insinuada (plano &ge; 0 de De Lee).',
        'C) Diagnóstico ultrassonográfico de vasa prévia.',
        'D) Presença de lesão herpética ativa no canal vaginal.',
        'E) Colo uterino impérvio e espesso com Bishop 0.'
      ]],
      ['p', '<strong>Gabarito Comentado: Alternativa B.</strong><br>' +
        'A apresentação fetal deve estar insinuada e bem aplicada para bloquear o estreito superior e impedir a descida do cordão umbilical com a drenagem do líquido.'],

      ['3', 'Questão 8: Conduta na Rotura Prematura de Membranas a Termo (UNIFESP)'],
      ['p', 'Primigesta de 38 semanas dá entrada com bolsa rota confirmada há 8 horas, afebril, FCF reativa de 140 bpm, sem contrações espontâneas. Colo com Bishop 7. Qual a melhor conduta?'],
      ['o', [
        'A) Aguardar conduta expectante por 7 dias em casa.',
        'B) Iniciar indução ativa com ocitocina intravenosa para reduzir risco de infecção materno-fetal.',
        'C) Administrar tocolítico para manter a gravidez até 41 semanas.',
        'D) Indicar cesariana de urgência imediata por bolsa rota.',
        'E) Realizar cerclagem de emergência.'
      ]],
      ['p', '<strong>Gabarito Comentado: Alternativa B.</strong><br>' +
        'Na RPMO a termo, a indução ativa nas primeiras 12 a 24 horas reduz a morbidade infecciosa (corioamnionite, endometrite, sepse neonatal) sem elevar o risco de cesárea.'],

      ['3', 'Questão 9: Toxicidade da Ocitocina e Hiponatremia Dilucional (AMP)'],
      ['p', 'Parturiente recebe altas doses de ocitocina intravenosa associada a grande volume de soro glicosado a 5% por mais de 24 horas. Desenvolve convulsão tônico-clônica no puerpério imediato com sódio sérico de 117 mEq/L. Qual é a causa farmacológica?'],
      ['o', [
        'A) Efeito simpaticomimético estimulante do SNC.',
        'B) Efeito antidiurético intrínseco da ocitocina com retenção hídrica maciça e hiponatremia dilucional aguda.',
        'C) Reação anafilática tardia ao conservante da ampola.',
        'D) Pré-eclâmpsia com proteinúria de overflow.',
        'E) Embolia gasosa por punção venosa periférica.'
      ]],
      ['p', '<strong>Gabarito Comentado: Alternativa B.</strong><br>' +
        'A ocitocina possui homologia com o ADH e, em doses elevadas com soluções hipotônicas, provoca intoxicação hídrica com hiponatremia grave e edema cerebral convulsivo.'],

      ['3', 'Questão 10: Estratégia de Escolha na Gestação de 41 Semanas (SURCE)'],
      ['p', 'Gestante de 41 semanas e 1 dia, feto vivo reativo de 3.300 g, sem comorbidades e sem cirurgias uterinas prévias. Colo grosso, fechado, posterior (Bishop = 0). Qual a conduta inicial recomendada?'],
      ['o', [
        'A) Indução direta com ocitocina em altas doses.',
        'B) Amadurecimento cervical prévio com Misoprostol 25 mcg vaginal.',
        'C) Cesariana imediata sem tentativa de preparo de colo.',
        'D) Alta para acompanhamento ambulatorial semanal até 43 semanas.',
        'E) Amniotomia precoce com agulha de raquianestesia.'
      ]],
      ['p', '<strong>Gabarito Comentado: Alternativa B.</strong><br>' +
        'Na gestação pós-termo (&ge; 41 semanas) com colo extremamente desfavorável (Bishop 0) e sem cicatriz de cesárea, a conduta padrão é o amadurecimento cervical prévio com Misoprostol 25 mcg vaginal.'],

      ['3', 'Questão 11: Profilaxia do Estreptococo do Grupo B (SGB) na Indução (UERJ)'],
      ['p', 'Gestante de 39 semanas com rastreamento positivo por swab anovaginal para Streptococcus agalactiae (EGB) às 36 semanas é internada para indução do trabalho de parto com sonda de Foley. A respeito do momento ideal para iniciar a antibioticoprofilaxia intraparto para prevenção de sepse neonatal precoce por SGB, assinale a opção CORRETA:'],
      ['o', [
        'A) O antibiótico deve ser iniciado no momento da inserção da sonda de Foley intracervical, mantendo-se até o puerpério.',
        'B) A profilaxia com Penicilina Cristalina intravenosa (ou ampicilina) deve ser iniciada no momento em que a paciente entra em trabalho de parto ativo ou logo após a rotura das membranas ovulares, mantendo-se a cada 4 horas até o clampeamento do cordão.',
        'C) A presença de SGB contraindica formalmente a indução do trabalho de parto, exigindo cesariana programada.',
        'D) Deve-se prescrever azitromicina oral em dose única 7 dias antes da indução programada.',
        'E) Não há necessidade de profilaxia caso a indução seja realizada com métodos mecânicos.'
      ]],
      ['p', '<strong>Gabarito Comentado: Alternativa B.</strong><br>' +
        '<em>Análise detalhada dos distratores:</em><br>' +
        '• A alternativa A está incorreta: a inserção de Foley para preparo em fase latente sem trabalho de parto ativo ou bolsa rota não exige o início imediato de penicilina.<br>' +
        '• A alternativa B está <strong>CORRETA</strong>: a antibioticoprofilaxia intraparto para SGB (Penicilina G cristalina 5 milhões UI ataque seguida de 2,5 a 3,0 milhões UI a cada 4h) deve ser iniciada no início do trabalho de parto ativo franco ou imediatamente após a amniorrexe, objetivando pelo menos 4 horas de infusão terapêutica antes do nascimento.<br>' +
        '• As alternativas C, D e E trazem condutas errôneas e contrárias às diretrizes do CDC, FEBRASGO e Ministério da Saúde.'],

      ['3', 'Questão 12: Manejo de Macrossomia e Diabetes Mellitus Gestacional (SCMSP)'],
      ['p', 'Multípara de 35 anos, com diabetes gestacional compensado com metformina, atinge 39 semanas de gravidez. A ultrassonografia com Dopplerfluxometria estima peso fetal de 4.100 gramas, com índice de líquido amniótico normal e vitalidade preservada. Colo uterino com Bishop igual a 7. Assinale a conduta obstétrica mais adequada:'],
      ['o', [
        'A) Indicação de cesariana eletiva imediata pelo peso estimado superior a 4.000 g.',
        'B) Indução do trabalho de parto com ocitocina intravenosa sob monitorização contínua e equipe treinada para manobras de distócia de ombros se necessário.',
        'C) Conduta expectante domiciliar até 42 semanas completas com avaliação semanal.',
        'D) Amniotomia precoce com cabeça fetal no plano -3 de De Lee.',
        'E) Início de misoprostol 100 mcg oral a cada 2 horas sem monitorização.'
      ]],
      ['p', '<strong>Gabarito Comentado: Alternativa B.</strong><br>' +
        '<em>Análise detalhada dos distratores:</em><br>' +
        '• A alternativa A está incorreta: o ponto de corte clássico de peso fetal para indicação de cesariana primária por risco de distócia de ombros em gestantes diabéticas é de <strong>&gt; 4.500 gramas</strong> (e &gt; 5.000 g em não diabéticas). Portanto, para 4.100 g com colo favorável (Bishop 7), a indução é plenamente aceitável e recomendada.<br>' +
        '• A alternativa B está <strong>CORRETA</strong>: a indução ao termo em diabéticas com colo maduro pode ser realizada com ocitocina sob vigilância contínua da FCF e prevenção de distócia.<br>' +
        '• As demais alternativas trazem condutas errôneas ou perigosas.']
    ]
  ],
  [
    'humanizacao-analgesia-inducao',
    0,
    [
      ['2', 'Humanização, Métodos Não Farmacológicos e Analgesia na Indução do Trabalho de Parto'],
      ['p', 'O processo de indução do trabalho de parto é historicamente associado a maior ansiedade materna, maior sensação dolorosa e risco de despersonalização do cuidado quando comparado ao trabalho de parto espontâneo. As diretrizes contemporâneas da OMS, NICE e Ministério da Saúde do Brasil estabelecem que a indução deve ser conduzida sob um modelo centrado na mulher e na família, garantindo suporte humanizado contínuo.'],
      ['3', 'Apoio Emocional Contínuo e o Papel do Acompanhante'],
      ['p', 'A Lei Federal nº 11.108/2005 (Lei do Acompanhante), atualizada pela Lei nº 14.737/2023, garante a toda parturiente o direito inalienável de ter um acompanhante de sua livre escolha presente durante todo o período de trabalho de parto, parto e puerpério imediato, em hospitais públicos ou privados. Ensaios clínicos demonstraram que o suporte contínuo reduz a necessidade de analgesia farmacológica, diminui o tempo até o nascimento e eleva substancialmente a satisfação materna.'],
      ['3', 'Métodos Não Farmacológicos de Alívio da Dor'],
      ['u', [
        '<strong>Liberdade de Posição e Movimentação:</strong> A mulher deve ser ativamente incentivada a caminhar, adotar posições verticalizadas, sentar-se na bola suíça (exercícios de balanço pélvico) e evitar o repouso prolongado em decúbito dorsal. A presença da Sonda de Foley ou de equipo de ocitocina em bomba não contraindica a deambulação, desde que fixados com segurança;',
        '<strong>Hidroterapia (Chuveiro e Banho de Imersão):</strong> A água morna a 37-38 °C promove relaxamento muscular generalizado, vasodilatação periférica e redução na secreção de catecolaminas maternas;',
        '<strong>Massagens Lombossacrais e Técnicas de Respiração:</strong> Estimulam as fibras nervosas táteis A-beta, bloqueando a transmissão dos impulsos dolorosos das fibras C nos cornos posteriores da medula espinhal (teoria das comportas da dor de Melzack e Wall).'
      ]],
      ['3', 'Analgesia Farmacológica no Parto Induzido'],
      ['p', 'Quando os métodos não farmacológicos tornam-se insuficientes ou a parturiente solicita expressamente alívio farmacológico, a analgesia regional de parto é plenamente indicada. A técnica de escolha é a <strong>analgesia combinada raqui-peridural</strong> (ou peridural contínua com baixas concentrações de anestésico local, como ropivacaína a 0,1% ou bupivacaína a 0,0625% associadas a opioides lipofílicos como fentanil). Esse regime preserva a força muscular materna (sem bloqueio motor significativo), permitindo que a paciente continue a se movimentar e mantenha a capacidade de realizar esforços expulsivos coordenados no segundo período.']
    ]
  ],
  [
    'diretrizes-comparadas-auditoria-inducao',
    0,
    [
      ['2', 'Diretrizes Internacionais Comparadas (FIGO, ACOG, WHO, NICE, FEBRASGO) e Auditoria Médico-Legal'],
      ['p', 'A indução do trabalho de parto exige rigor técnico irretocável e alinhamento às melhores diretrizes globais para mitigar riscos assistenciais e proteger a equipe médica contra litígios ético-profissionais.'],
      ['3', 'Quadro Comparativo de Recomendações Globais'],
      ['t', [
        'Diretriz Internacional',
        'Indicação em Baixo Risco (Pós-Termo)',
        'Preparo Cervical de 1ª Escolha',
        'Uso em Cesárea Prévia',
        'Definição de Falha de Indução'
      ], [
        ['OMS (WHO 2022)', 'Oferecer a partir de 41 sem 0d', 'Misoprostol 25 mcg vaginal ou Foley', '<strong>Prostaglandinas PROSCRITAS</strong>; usar Foley', 'Pelo menos 12-18h de ocitocina com bolsa rota'],
        ['ACOG (EUA 2023)', 'Oferecer a partir de 39 sem (ARRIVE) a 41 sem', 'Misoprostol vaginal/oral ou Dinoprostona ou Foley', '<strong>Prostaglandinas PROSCRITAS</strong>; Foley preferencial', 'Pelo menos 12-18h de ocitocina com bolsa rota'],
        ['NICE (Reino Unido 2021)', 'Oferecer entre 41 sem e 42 sem', 'Dinoprostona inserto ou Misoprostol oral', 'Métodos mecânicos preferenciais', 'Fase latente &gt; 24h sem fase ativa'],
        ['FEBRASGO / MS (Brasil 2024)', 'Recomendar entre 41 sem 0d e 41 sem 6d', 'Misoprostol 25 mcg vaginal ou Foley intracervical', '<strong>Misoprostol PROSCRITO</strong>; Sonda de Foley padrão', '12 a 18h de ocitocina contínua após rotura de bolsa']
      ], 'book-table'],
      ['3', 'Aspectos Éticos, Legais e Auditoria em Casos de Desfecho Desfavorável'],
      ['p', 'Em processos ético-disciplinares junto aos Conselhos Regionais de Medicina (CRM) e ações cíveis de indenização decorrentes de asfixia perinatal intraparto ou rotura de cicatriz uterina prévia, os peritos avaliam especificamente os seguintes pontos críticos:'],
      ['o', [
        '<strong>Existência de Termo de Consentimento Informado Específico:</strong> Documentação comprovando que a paciente foi informada sobre os métodos propostos, benefícios, riscos de falha e de cesariana;',
        '<strong>Cumprimento do Intervalo entre Fármacos:</strong> Verificação rigorosa do prontuário para atestar se houve intervalo de pelo menos 4 a 6 horas entre o misoprostol e o início da ocitocina;',
        '<strong>Registro da Titulação em Bomba de Infusão:</strong> Anotação horária da velocidade da bomba em mL/h e mUI/min, afastando a acusação de hiperestimulação por administração descontrolada;',
        '<strong>Monitorização Contínua dos Batimentos Fetais:</strong> Registro de cardiotocografia ou ausculta intermitente a cada 15 a 30 minutos na fase ativa e a cada 5 minutos no expulsivo;',
        '<strong>Respeito ao Tempo Mínimo para Indicar Cesárea:</strong> Justificativa documentada da cesariana caso realizada antes das 12 a 18 horas de ocitocina, comprovando a existência de sofrimento fetal agudo ou patologia materna impeditiva.'
      ]]
    ]
  ],
  [
    'cenarios-complexos-rciu-gemelar-macrossomia',
    0,
    [
      ['2', 'Indução em Cenários Especiais: RCIU, Gemelaridade, Macrossomia e Óbito Fetal'],
      ['p', 'A tomada de decisão tocúrgica em gestações com particularidades clínicas exige individualização rigorosa da via de parto, do método indutor e do perfil de monitorização intraparto.'],
      ['3', 'Restrição de Crescimento Intrauterino (RCIU / CIUR)'],
      ['p', 'A indução na presença de restrição de crescimento fetal é permitida desde que o feto apresente <strong>reserva placentária funcional adequada documentada por Dopplerfluxometria recente</strong>:'],
      ['u', [
        '<strong>Critérios de Elegibilidade para Indução no RCIU:</strong> Doppler de artéria umbilical com fluxo diastólico presente e positivo (índice de pulsatilidade IP &lt; percentil 95), Doppler de ducto venoso com onda "a" normal e positiva, perfil biofísico fetal normal (&ge; 8/10 com ILA normal ou MBV &ge; 2 cm) e cardiotocografia anteparto reativa;',
        '<strong>Contraindicação ao Trabalho de Parto no RCIU:</strong> Presença de <strong>diástole zero ou reversa na artéria umbilical</strong>, alteração do ducto venoso (onda "a" zero ou reversa) ou desacelerações espontâneas na cardiotocografia basal indicam falência placentária grave e hipóxia miocárdica fetal. Nesses cenários, as contrações uterinas da indução levariam invariavelmente ao óbito intrauterino, sendo a <strong>cesariana imediata a única conduta cabível</strong>;',
        '<strong>Vigilância Intraparto no RCIU Induzido:</strong> É obrigatória a cardiotocografia contínua durante todo o trabalho de parto, pois os fetos com restrição de crescimento apresentam reservas reduzidas de glicogênio hepático e toleram mal os períodos de isquemia relativa das contrações.'
      ]],
      ['3', 'Gestações Gemelares'],
      ['p', 'A indução de parto em gestações gemelares é viável em serviços de referência sob estritas condições: gestação <strong>dicoriônica/diamniótica ou monocoriônica/diamniótica sem síndrome de transfusão feto-fetal</strong>, idade gestacional &ge; 36 a 37 semanas, primeiro gemelar em <strong>apresentação cefálica</strong> e peso estimado adequado (discordância de peso entre os conceptos inferior a 20% a 25%). A via de indução preferencial é a Sonda de Foley em colo desfavorável ou ocitocina em colo favorável, mantendo-se centro cirúrgico e equipe prontos para versão podálica interna ou cesariana de emergência do segundo gemelar se necessário.'],
      ['3', 'Suspeita de Macrossomia Fetal'],
      ['p', 'A indução profilática do trabalho de parto para prevenir macrossomia antes de 39 semanas não é respaldada de rotina pelas diretrizes da FEBRASGO e ACOG, pois não reduz as taxas de distócia de ombro e pode elevar cesarianas iatrogênicas. Contudo, na gestante diabética com feto a termo e peso estimado &gt; 4.000 g a 4.500 g, o risco de distócia de ombros deve ser cuidadosamente balanceado, recomendando-se cesariana eletiva programada se o peso fetal estimado ultrapassar 4.500 g em diabéticas ou 5.000 g em não diabéticas.'],
      ['3', 'Indução no Óbito Fetal Intrauterino'],
      ['p', 'Na ocorrência de óbito fetal intrauterino (natimorto) no segundo ou terceiro trimestre, o objetivo primordial é o <strong>parto por via vaginal</strong> para evitar uma cicatriz uterina definitiva que comprometeria o futuro reprodutivo da mulher sem trazer benefício ao concepto. Em pacientes sem cesárea prévia, utilizam-se doses plenas de <strong>Misoprostol vaginal (50 a 100 mcg a cada 4 a 6 horas)</strong>, pois a preocupação com taquissistolia e desacelerações fetais deixa de existir. Em mulheres com cesárea prévia e feto morto, a Sonda de Foley ou doses ultrabaixas e cautelosas de misoprostol sob supervisão de especialista são preferidas para prevenir a rotura uterina.']
    ]
  ],
  [
    'referencias',
    0,
    [
      ['2', 'Referências'],
      ['p', '1. Organização Mundial da Saúde (OMS). <em>WHO recommendations for induction of labour</em>. Genebra: World Health Organization, 2011 (atualizado 2022). Disponível em: https://www.who.int/publications/i/item/9789241501156'],
      ['p', '2. Federação Brasileira das Associações de Ginecologia e Obstetrícia (FEBRASGO). <em>Indução do Trabalho de Parto</em>. Manual de Orientação FEBRASGO, São Paulo, 2023.'],
      ['p', '3. American College of Obstetricians and Gynecologists (ACOG). <em>Practice Bulletin No. 107: Induction of Labor</em>. Obstet Gynecol, 2009 (reaffirmed 2023); 114(2):386-397. https://doi.org/10.1097/AOG.0b013e3181b48ef5'],
      ['p', '4. Grobman WA, Rice MM, Reddy UM, et al. <em>Labor Induction versus Expectant Management in Low-Risk Nulliparous Women (The ARRIVE Trial)</em>. N Engl J Med, 2018; 379(6):513-523. https://doi.org/10.1056/NEJMoa1800566'],
      ['p', '5. Ministério da Saúde (Brasil). <em>Diretrizes Nacionais de Assistência ao Parto Normal</em>. Brasília: Ministério da Saúde, 2022.'],
      ['p', '6. International Federation of Gynecology and Obstetrics (FIGO). <em>FIGO\'s updated recommendations for misoprostol used alone in gynecology and obstetrics</em>. Int J Gynaecol Obstet, 2017; 138(1):88-97. https://doi.org/10.1002/ijgo.12181'],
      ['p', '7. Bishop EH. <em>Pelvic scoring for elective induction</em>. Obstet Gynecol, 1964; 24:266-268.']
    ]
  ]
];

// Combine all original sections and new deep sections
const combinedSections = [...originalSections, ...deepSections];

const combinedToc = [
  ...originalToc,
  ['farmacologia-prostaglandinas-figo-ms', 'Protocolo Detalhado de Prostaglandinas: Misoprostol e Dinoprostona'],
  ['metodo-foley-detalhado-cicatriz', 'Protocolo Detalhado da Sonda de Foley: Método Mecânico'],
  ['conducao-ocitocina-titulacao-bic', 'Protocolo de Ocitocina Intravenosa em Bomba de Infusão'],
  ['complicacoes-taquissistolia-terbutalina', 'Complicações da Indução: Taquissistolia e Terbutalina'],
  ['falha-inducao-definicao-estrita', 'Definição Rigorosa de Falha de Indução'],
  ['casos-clinicos-integradores-bloco4', 'Casos Clínicos Resolvidos de Alta Complexidade'],
  ['questoes-comentadas-bloco4', 'Questões de Concursos e Residência Médica Comentadas'],
  ['humanizacao-analgesia-inducao', 'Humanização, Métodos Não Farmacológicos e Analgesia'],
  ['diretrizes-comparadas-auditoria-inducao', 'Diretrizes Internacionais Comparadas e Auditoria'],
  ['cenarios-complexos-rciu-gemelar-macrossomia', 'Indução em Cenários Especiais: RCIU, Gemelaridade e Macrossomia'],
  ['referencias', 'Referências']
];

const book = {
  v: 2,
  s: 'inducao-do-trabalho-de-parto',
  slug: 'inducao-do-trabalho-de-parto',
  t: 'Indução do Trabalho de Parto',
  title: 'Indução do Trabalho de Parto',
  p: 'Tratado completo sobre a indução do trabalho de parto e amadurecimento cervical: bases fisiológicas, indicações formais e contraindicações absolutas, escore de Bishop minucioso, métodos farmacológicos (Misoprostol e Dinoprostona), métodos mecânicos (Sonda de Foley e balão duplo), infusão escalonada de ocitocina, amniotomia orientada, manejo em útero com cicatriz prévia, taquissistolia e hiperestimulação, critérios diagnósticos estritos de falha de indução, casos clínicos desafiadores e questões comentadas de residência médica.',
  o: combinedToc,
  h: [
    'Apostila LURIA',
    'Indução do Trabalho de Parto',
    'Tratado completo sobre a indução do trabalho de parto e amadurecimento cervical: bases fisiológicas, indicações formais e contraindicações absolutas, escore de Bishop minucioso, métodos farmacológicos (Misoprostol e Dinoprostona), métodos mecânicos (Sonda de Foley e balão duplo), infusão escalonada de ocitocina, amniotomia orientada, manejo em útero com cicatriz prévia, taquissistolia e hiperestimulação, critérios diagnósticos estritos de falha de indução, casos clínicos desafiadores e questões comentadas de residência médica.',
    [
      'Área: Ginecologia e Obstetrícia',
      'Matéria: Obstetrícia e Tococirurgia',
      'Tema: Indução do Trabalho de Parto'
    ],
    'apostila-identity'
  ],
  q: combinedSections
};

saveBook(book);
