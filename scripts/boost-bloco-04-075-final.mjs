import fs from 'fs';
import path from 'path';
import { htmlToBlocks, countUsefulChars, saveBook } from './bloco-04-utils.mjs';

const slug = 'notificacao-compulsoria-de-doencas-e-agravos';
const jsonPath = path.join('apostilas', slug, 'content.json');
const payload = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Seção 1 Adicional: O Fluxo Detalhado das Doenças de Notificação Imediata (DNI) e o Regulamento Sanitário Internacional (RSI-2005)
const secDniId = 'protocolos-detalhados-de-notificacao-imediata-e-rsi';
const secDniTitle = 'Protocolos das Doenças de Notificação Imediata (DNI), Emergências em Saúde Pública e Regulamento Sanitário Internacional';
const secDniHtml = `
<h3>Arquitetura Operacional da Notificação Compulsória Imediata (Até 24 Horas)</h3>
<p>A notificação compulsória imediata (prazo estrito de até 24 horas a partir do conhecimento da suspeita diagnóstica) destina-se a agravos cujo potencial de letalidade, rápida disseminação transfronteiriça ou vulnerabilidade a medidas urgentes de bloqueio de contatos e quimioprofilaxia exigem mobilização sanitária em tempo real. Uma demora de poucas horas no desencadeamento das ações de contenção pode inviabilizar o controle de um surto de meningite bacteriana ou permitir que uma variante emergente de influenza se dissemine por todo o território nacional.</p>

<p>A operacionalização da notificação imediata não depende da chegada de uma ficha física de papel ao órgão central de saúde. Ela se dá por canais eletrônicos rápidos e telefonia dedicada, especificamente:</p>
<ul>
  <li><strong>CIEVS (Centro de Informações Estratégicas em Vigilância em Saúde):</strong> Rede estruturada pelo Ministério da Saúde em articulação com as secretarias estaduais e municipais de saúde, disponível 24 horas por dia, 7 dias por semana, com números 0800, correio eletrônico institucional e aplicativos de mensageria criptografada;</li>
  <li><strong>Notifica-SUS / Sinan Web:</strong> Módulos digitais de inserção instantânea de dados clínicos preliminares;</li>
  <li><strong>Telefonia Direta dos Serviços de Vigilância Epidemiológica Municipal e Hospitalar (VEH).</strong></li>
</ul>

<h3>A Diferenciação entre Esferas de Destino da Notificação Imediata</h3>
<p>Um dos pontos mais cobrados nos exames de residência médica de maior concorrência é a destinação da notificação imediata. Nem todo agravo de notificação imediata deve ser comunicado diretamente às três esferas de gestão (Municipal, Estadual e Federal/Ministério da Saúde). A Portaria de Consolidação estabelece distinções cruciais:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Destino da Notificação Imediata</th>
      <th>Doenças, Agravos e Eventos Enquadrados</th>
      <th>Racional Epidemiológico e Operacional</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Notificação Imediata às TRÊS Esferas de Gestão (Município, Estado e Ministério da Saúde em até 24h)</strong></td>
      <td>
        • <strong>Botulismo</strong>, <strong>Cólera</strong> e <strong>Febre Amarela</strong>;<br>
        • <strong>Peste</strong>, <strong>Poliomielite</strong> e <strong>Raiva Humana</strong>;<br>
        • <strong>Sarampo</strong> e <strong>Rubéola</strong> (doenças em fase de eliminação);<br>
        • <strong>Varíola</strong> e <strong>Varíola dos Macacos (Mpox)</strong>;<br>
        • <strong>Síndrome Respiratória Aguda Grave (SRAG)</strong> associada a coronavírus emergente ou novo subtipo viral de Influenza;<br>
        • <strong>Doença de Chagas Aguda</strong>;<br>
        • <strong>Acidentes por animais peçonhentos graves ou óbitos</strong>;<br>
        • <strong>Eventos Adversos Graves Pós-Vacinação (EAPV)</strong>;<br>
        • <strong>Emergências de Saúde Pública de Importância Internacional (ESPII)</strong> e eventos inusitados.
      </td>
      <td>Trata-se de agravos de alcance potencialmente pandêmico, ameaças de bioterrorismo ou compromissos globais de erradicação/eliminação, demandando resposta técnica e logística coordenada diretamente pela União em conjunto com estados e municípios.</td>
    </tr>
    <tr>
      <td><strong>Notificação Imediata APENAS à Secretaria Municipal de Saúde (SMS) em até 24h</strong></td>
      <td>
        • <strong>Doença Meningocócica e Outras Meningites</strong> (a esfera municipal organiza a quimioprofilaxia de contatos imediatos com rifampicina nas primeiras horas);<br>
        • <strong>Coqueluche</strong> (bloqueio quimioprofilático e atualização vacinal dos contatos domiciliares e escolares mais próximos);<br>
        • <strong>Difteria</strong> (busca de contatos, quimioprofilaxia com eritromicina/penicilina e isolamento respiratório de gotículas);<br>
        • <strong>Tétano Acidental e Neonatal</strong> (investigação do foco ambiental e assistência hospitalar imediata em leito de UTI);<br>
        • <strong>Febre Maculosa e Rickettsioses</strong> (orientação terapêutica empírica imediata com doxiciclina e controle de carrapatos no peridomicílio).
      </td>
      <td>O bloqueio profilático dos contatos ou a investigação do foco primário ocorre no território de residência e convivência do paciente, cuja competência de campo é prioritariamente local da vigilância do município.</td>
    </tr>
  </tbody>
</table>

<h3>O Regulamento Sanitário Internacional (RSI-2005) e o Algoritmo do Anexo 2</h3>
<p>O Regulamento Sanitário Internacional, aprovado pela 58ª Assembleia Mundial da Saúde em 2005 e promulgado no Brasil pelo Decreto nº 10.212/2020, é o principal instrumento jurídico global destinado a prevenir, proteger, controlar e dar resposta de saúde pública à propagação internacional de doenças, sem interferência desnecessária no tráfego e no comércio globais.</p>

<p>O Artigo 6º e o Anexo 2 do RSI-2005 estabelecem um instrumento decisório padronizado mundialmente. Quatro doenças exigem notificação imediata e incondicional à OMS (qualquer caso único já constitui ESPII ou evento que a deflagra):</p>
<ol>
  <li><strong>Varíola</strong> (Smallpox);</li>
  <li><strong>Poliomielite por poliovírus selvagem</strong>;</li>
  <li><strong>Influenza humana causada por novo subtipo viral</strong> (com potencial pandêmico);</li>
  <li><strong>Síndrome Respiratória Aguda Grave (SARS)</strong>.</li>
</ol>

<p>Para qualquer outro evento de saúde pública, o Anexo 2 determina a aplicação de quatro perguntas-chave consecutivas. Se a resposta for AFIRMATIVA para <strong>pelo menos duas das quatro perguntas</strong>, o evento DEVE ser notificado imediatamente à OMS pelo Ponto Focal Nacional do RSI (no Brasil, sediado na SVS/MS):</p>
<ul>
  <li><strong>Pergunta 1:</strong> O impacto na saúde pública é GRAVE? (alta letalidade, acometimento maciço de população vulnerável, colapso de serviços de urgência);</li>
  <li><strong>Pergunta 2:</strong> O evento é INCOMUM ou INESPERADO? (doença desconhecida, apresentação clínica aberrante, surto sem causa aparente);</li>
  <li><strong>Pergunta 3:</strong> Há risco significativo de DISSEMINAÇÃO INTERNACIONAL? (presença de vetores com mobilidade internacional, agravo em polos turísticos de trânsito aeroportuário intenso);</li>
  <li><strong>Pergunta 4:</strong> Há risco significativo de RESTRIÇÃO AO COMÉRCIO OU ÀS VIAGENS internacionais? (restrições alfandegárias iminentes, interdição de voos ou de cargas de exportação).</li>
</ul>
`;

// Seção 2 Adicional: Vigilância Sentinela, Eventos Supostamente Atribuíveis à Vacinação (ESAVI) e Notificação em Situações Ocupacionais
const secSentinelaId = 'vigilancia-sentinela-esavi-e-saude-trabalhador';
const secSentinelaTitle = 'Vigilância Sentinela, Redes Especializadas, Investigação de ESAVI e Agravos à Saúde do Trabalhador';
const secSentinelaHtml = `
<h3>O Conceito e o Funcionamento da Vigilância Sentinela</h3>
<p>Ao contrário da vigilância universal (na qual cada caso suspeito em qualquer ponto do país deve ser reportado), a <strong>vigilância sentinela</strong> é uma estratégia amostral de alta sensibilidade e densidade técnica. Ela é instalada em estabelecimentos de saúde estratégicos (unidades sentinela, prontos-socorros de referência e laboratórios centrais) com o propósito de monitorar a circulação de patógenos, a variação antigênica e as tendências epidemiológicas sem sobrecarregar a rede com fichas universais de baixa especificidade.</p>

<p>Os principais exemplos práticos de vigilância sentinela no Brasil compreendem:</p>
<ul>
  <li><strong>Síndrome Gripal (SG):</strong> Unidades básicas e prontos-atendimentos selecionados colhem swabs de nasofaringe de uma cota pré-determinada de pacientes sintomáticos respiratórios agudos para tipagem viral (Influenza A e B, SARS-CoV-2, Vírus Sincicial Respiratório, Adenovírus, Rinovírus e Metapneumovírus), alimentando o sistema SIVEP-Gripe;</li>
  <li><strong>Vigilância Sentinela da Síndrome Respiratória Aguda Grave (SRAG) em UTIs:</strong> Todo paciente internado em UTI com desconforto respiratório, dessaturação ($SpO_2 &lt; 95\\%$) ou falência hemodinâmica é triado compulsoriamente com painel molecular completo;</li>
  <li><strong>Doenças Diarreicas Agudas (DDA):</strong> Monitoramento sentinela (Monitorização das Doenças Diarreicas Agudas - MDDA) para detecção precoce de enteropatógenos virais (Rotavírus, Norovírus) e bacterianos (Shigella, Salmonella, Vibrio cholerae);</li>
  <li><strong>Redes Sentinela para Resistência Antimicrobiana (RAM):</strong> Hospitais terciários sentinela que reportam isolados bacterianos multirresistentes (Enterobactérias produtoras de carbapenemase - KPC, NDM; Pseudomonas aeruginosa e Acinetobacter baumannii resistentes a polimixinas).</li>
</ul>

<h3>Eventos Supostamente Atribuíveis à Vacinação ou Imunização (ESAVI)</h3>
<p>A segurança dos imunobiológicos no Brasil é monitorada pelo Programa Nacional de Imunizações (PNI) em conjunto com a Anvisa através da plataforma e-SUS Notifica / Módulo ESAVI. É responsabilidade indeclinável de todo médico notificar e investigar eventos pós-vacinais adversos.</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Categoria de ESAVI</th>
      <th>Definição Operacional e Manifestações</th>
      <th>Prazo e Conduta de Investigação</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>ESAVI Grave</strong></td>
      <td>Qualquer evento adverso que:
        <ul>
          <li>Evolui para <strong>óbito</strong>;</li>
          <li>Causa <strong>risco iminente de morte</strong> (choque anafilático agudo);</li>
          <li>Exige <strong>hospitalização</strong> ou prolongamento de internação hospitalar prévia;</li>
          <li>Resulta em <strong>anomalia congênita</strong> ou defeito de nascimento em concepto de mãe imunizada na gestação;</li>
          <li>Causa <strong>incapacidade permanente</strong> ou disfunção residual significativa (ex.: Síndrome de Guillain-Barré, Encefalite pós-vacinal, Síndrome de Trombose com Trombocitopenia - STT).</li>
        </ul>
      </td>
      <td><strong>Notificação Imediata em até 24 HORAS</strong> a todas as esferas de gestão. Coleta imediata de exames laboratoriais, parecer com neurologista/hematologista e registro rigoroso do lote e laboratório produtor do imunobiológico.</td>
    </tr>
    <tr>
      <td><strong>Cluster de ESAVI (Agrupamento Temporal)</strong></td>
      <td>Ocorrência de dois ou mais casos de evento adverso semelhante associados à aplicação de vacinas do mesmo lote em uma mesma sala de imunização ou município.</td>
      <td><strong>Notificação Imediata em até 24 HORAS</strong> com eventual retenção cautelar preventiva do lote de vacinas pela autoridade sanitária local até análise de controle de qualidade pelo INCQS/Fiocruz.</td>
    </tr>
    <tr>
      <td><strong>ESAVI Não Grave</strong></td>
      <td>Reações locais benignas autolimitadas (dor local leve, eritema local $&lt; 5$ cm, endurecimento) ou febre baixa transitória ($&lt; 38,5^\\circ$C) sem comprometimento sistêmico grave.</td>
      <td>Notificação de rotina/semanal ou registro em prontuário, orientando medidas sintomáticas à família.</td>
    </tr>
  </tbody>
</table>

<h3>Agravos Relacionados ao Trabalho de Notificação Compulsória Universal</h3>
<p>A Portaria Ministerial inclui agravos ocupacionais específicos na Lista Nacional com ficha específica no SINAN, cuja notificação independe da modalidade de vínculo empregatício do trabalhador (formal, com carteira assinada, terceirizado, estatutário, autônomo ou informal):</p>
<ul>
  <li><strong>Acidente de Trabalho com Exposição a Material Biológico:</strong> Acidentes perfurocortantes em profissionais de saúde ou coletores com risco de transmissão do HIV, Hepatite B e Hepatite C (notificação semanal, conduta de profilaxia pós-exposição imediata em até 72h);</li>
  <li><strong>Acidente de Trabalho Grave, Fatal ou Envolvendo Crianças e Adolescentes:</strong> Quedas de altura, mutilações, óbitos em ambiente de trabalho ou trabalho infantil perigoso (notificação <strong>IMEDIATA em até 24h</strong>);</li>
  <li><strong>LER / DORT (Lesões por Esforços Repetitivos / Distúrbios Osteomusculares Relacionados ao Trabalho):</strong> Tendinites, síndrome do túnel do carpo e bursites de nexo causal laboral (notificação semanal);</li>
  <li><strong>Perda Auditiva Induzida por Ruído (PAIR):</strong> Surdez neurossensorial bilateral ocupacional por ruído industrial contínuo (notificação semanal);</li>
  <li><strong>Dermatoses Ocupacionais e Câncer Relacionado ao Trabalho:</strong> Mesotelioma por amianto, leucemias por exposição crônica a benzeno (notificação semanal);</li>
  <li><strong>Intoxicações Exógenas Ocupacionais:</strong> Intoxicações por agrotóxicos em trabalhadores rurais, chumbo ou solventes orgânicos (notificação <strong>IMEDIATA em até 24h</strong> se agudas com internação/óbito).</li>
</ul>
`;

// Seção 3 Adicional: Bateria Completa de 10 Questões de Provas de Residência Médica e ENAMED com Distratores Exaustivamente Comentados
const secQuestoesId = 'bateria-avancada-questoes-enamed-residencia-notificacao';
const secQuestoesTitle = 'Bateria de Questões Comentadas do ENAMED e Concursos Médicos de Alto Desafio';
const secQuestoesHtml = `
<h3>Questões com Análise Completa de Distratores</h3>

<h4>Questão 1: ENAMED / ENARE — O Prazos de Notificação e Conduta em Meningite Bacteriana</h4>
<p><strong>Enunciado:</strong> Um médico plantonista atende em uma Unidade de Pronto Atendimento (UPA) um paciente de 19 anos com febre alta ($39,5^\circ\\text{C}$), cefaleia holocraniana intensa, vômitos em jato, rigidez de nuca nítida e petéquias disseminadas em tronco e membros inferiores. A punção lombar revela líquor turvo, com 4.800 leucócitos/$mm^3$ (95% neutrófilos), glicose de 10 mg/dL e visualização de diplococos Gram-negativos aos pares à bacterioscopia. O médico inicia ceftriaxona endovenosa e isolamento respiratório de gotículas. Em relação à notificação compulsória deste caso, assinale a opção que descreve a conduta estritamente correta:</p>
<p>A) A notificação é de periodicidade semanal, devendo a ficha do SINAN ser encaminhada no encerramento da semana epidemiológica após o resultado da cultura automatizada com antibiograma.<br>
B) A notificação compulsória é IMEDIATA (em até 24 horas) e deve ser realizada prioritariamente à Secretaria Municipal de Saúde, não dependendo do resultado definitivo da cultura para o seu desencadeamento operacional.<br>
C) Por se tratar de doença transmissível com risco comunitário, a notificação deve ser feita exclusivamente ao Ministério da Saúde em Brasília, sendo desnecessário comunicar a vigilância municipal.<br>
D) A confirmação diagnóstica bacterioscópica é insuficiente para notificar; deve-se aguardar a identificação sorogrupal da cepa meningocócica pelo laboratório de referência (LACEN) para evitar falsos-positivos no sistema.<br>
E) A notificação só é obrigatória se o paciente evoluir para óbito ou choque séptico com púrpura fulminante.</p>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
• <strong>Alternativa B (Correta):</strong> A Doença Meningocócica é agravo de <strong>notificação compulsória IMEDIATA (até 24 horas) à Secretaria Municipal de Saúde</strong>. O princípio elementar da vigilância epidemiológica preconiza que a notificação deve ser disparada diante da <strong>SUSPEITA CLÍNICA</strong> (ou bacterioscópica preliminar), sem esperar o isolamento em cultura, pois os contatos íntimos domiciliares e de creche/alojamento necessitam de quimioprofilaxia quimioterápica urgente (habitualmente com Rifampicina) nas primeiras 24 a 48 horas após a suspeita.<br>
• <strong>Alternativa A (Incorreta):</strong> Esperar a semana epidemiológica e o laudo de cultura inviabilizaria a quimioprofilaxia dos contatos íntimos, aumentando o risco de casos secundários graves.<br>
• <strong>Alternativa C (Incorreta):</strong> O canal preferencial imediato da doença meningocócica é a esfera municipal (SMS), responsável pelas medidas operacionais no território.<br>
• <strong>Alternativa D (Incorreta):</strong> A espera pela sorogrupagem contraria o princípio da intervenção em tempo hábil.<br>
• <strong>Alternativa E (Incorreta):</strong> Qualquer suspeita de meningite meningocócica é notificável independentemente da evolução clínica favorável ou desfecho fatal.</p>

<h4>Questão 2: USP-RP — Sífilis na Gestação e Notificação Universal</h4>
<p><strong>Enunciado:</strong> Durante consulta de pré-natal de primeiro trimestre na Unidade Básica de Saúde, uma gestante de 22 anos, assintomática, apresenta teste rápido treponêmico reagente confirmado por VDRL com título de 1:32. O parceiro sexual é convocado para avaliação e recusa o tratamento, afirmando estar hígido. O médico prescreve Penicilina G Benzatina 2.400.000 UI IM semanal por 3 semanas consecutivas para a gestante. Quanto às obrigações sanitárias de notificação:</p>
<p>A) A sífilis em gestante é de notificação compulsória periódica semanal, sendo dispensável notificar o concepto após o parto se a mãe completar as 3 doses de penicilina.<br>
B) Deve-se emitir a Ficha de Notificação/Investigação de Sífilis em Gestante no SINAN em periodicidade semanal; caso o concepto nasça vivo ou natimorto com critérios de sífilis congênita, será gerada uma SEGUNDA ficha de notificação compulsória para Sífilis Congênita.<br>
C) A notificação só é autorizada se o parceiro sexual consentir formalmente por escrito, sob pena de quebra de sigilo conjugal vedada pelo Código de Ética Médica.<br>
D) Apenas casos com lesões clínicas ativas primárias (cancro duro) ou secundárias (roséola) são passíveis de inclusão no SINAN.<br>
E) A sífilis em gestante é de notificação imediata em até 24 horas por telefone ao Ministério da Saúde.</p>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
• <strong>Alternativa B (Correta):</strong> A Sífilis em Gestante é agravo de <strong>notificação semanal</strong>. O sistema do Ministério da Saúde trata a mãe e o filho como entidades epidemiológicas distintas: a gestante gera a ficha de <em>Sífilis em Gestante</em>; ao nascimento, o recém-nascido exposto que se enquadre na definição de caso (por exemplo, parceiro não tratado ou queda inadequada de títulos) DEVE gerar a ficha de <em>Sífilis Congênita</em>. Trata-se de duas notificações compulsórias obrigatórias complementares.<br>
• <strong>Alternativa A (Incorreta):</strong> A notificação do recém-nascido é obrigatória quando há critérios de sífilis congênita, mesmo que a mãe tenha recebido penicilina, sobretudo com parceiro sabidamente infectado e não tratado.<br>
• <strong>Alternativa C (Incorreta):</strong> O segredo médico cede diante do dever legal sanitário de notificação compulsória.<br>
• <strong>Alternativa D (Incorreta):</strong> A sífilis latente (assintomática com sorologia reagente) é de notificação obrigatória plena.<br>
• <strong>Alternativa E (Incorreta):</strong> A periodicidade oficial nacional é semanal, não imediata em 24h.</p>

<h4>Questão 3: SMS-SP — Febre Amarela e Epizootias em Primatas Não Humanos</h4>
<p><strong>Enunciado:</strong> Um agente comunitário de saúde e moradores de uma área rural próxima a remanescente de Mata Atlântica encontram dois bugios (macacos do gênero Alouatta) mortos na mata sem sinais externos de traumatismo. No dia seguinte, um trabalhador rural residente a 1 km da área procura o posto de saúde com quadro de febre de início súbito há 3 dias, cefaleia intensa, mialgia proeminente e dor lombar. O médico suspeita de Febre Amarela. Qual a conduta de vigilância epidemiológica imperativa a ser adotada?</p>
<p>A) Notificar a morte dos primatas não humanos (epizootia) e o caso humano suspeito em fluxo SEMANAL de rotina ao SINAN.<br>
B) A notificação de epizootia de primatas não humanos é exclusiva de médicos veterinários, cabendo ao médico clínico apenas registrar a suspeita do paciente humano.<br>
C) A suspeita de Febre Amarela Humana e a ocorrência de Morte/Adoecimento de Primatas Não Humanos (Epizootias) são eventos de NOTIFICAÇÃO COMPULSÓRIA IMEDIATA (em até 24 horas) a todas as três esferas de gestão (SMS, SES e MS), deflagrando imediatamente a busca de novos casos humanos e a intensificação vacinal seletiva na área.<br>
D) Aguardar a confirmação de necropsia do macaco com PCR positivo para deflagrar a notificação do paciente humano.<br>
E) A febre amarela não faz mais parte da lista nacional de notificação compulsória devido à cobertura vacinal histórica do país.</p>
<p><strong>Gabarito Oficial: Alternativa C.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
• <strong>Alternativa C (Correta):</strong> Tanto o caso humano suspeito de Febre Amarela quanto as <strong>Epizootias em Primatas Não Humanos (PNH)</strong> são de notificação <strong>IMEDIATA em até 24 horas para o Município, Estado e Ministério da Saúde</strong>. Os primatas funcionam como sentinelas biológicos essenciais da circulação viral silvestre. A constatação de bugios mortos precede a eclosão de casos humanos em semanas ou meses, exigindo busca ativa e bloqueio vacinal peridomiciliar emergencial.<br>
• <strong>Alternativas A, B, D e E:</strong> Estão frontalmente erradas quanto ao prazo de 24h, à relevância dos animais sentinelas e à necessidade de comunicação intergovernamental instantânea.</p>

<h4>Questão 4: UERJ — Notificação Compulsória Negativa</h4>
<p><strong>Enunciado:</strong> Em um determinado município do interior do estado, não foram diagnosticados nem notificados novos casos de tuberculose, hanseníase ou dengue durante a semana epidemiológica nº 14. O coordenador da vigilância epidemiológica municipal determinou o arquivamento das pastas sem qualquer envio de dados ao sistema estadual, alegando que "não havendo casos, inexiste dever de prestar informações sanitárias". Essa conduta do coordenador:</p>
<p>A) É correta e expressa eficiência na desburocratização dos serviços locais de saúde.<br>
B) É incorreta e constitui transgressão à norma técnica do SINAN, pois os municípios e estabelecimentos de saúde são obrigados a realizar a Notificação Compulsória Negativa, informando formalmente que na referida semana não foi identificado nenhum caso de doença constante da lista, atestando a sensibilidade e o funcionamento ativo do sistema de vigilância.<br>
C) Só estaria incorreta se a omissão perdurasse por mais de seis meses consecutivos.<br>
D) Está amparada pela Lei nº 8.080/1990, que desobriga gestores municipais de alimentar bancos de dados centrais.<br>
E) É aceitável apenas para municípios com população inferior a 50.000 habitantes.</p>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
• <strong>Alternativa B (Correta):</strong> A <strong>Notificação Negativa</strong> é a declaração formal periódica (semanal no SINAN) enviada pela autoridade ou unidade de saúde informando que, na semana epidemiológica correspondente, <strong>não foi registrado qualquer caso de doença ou agravo da lista de notificação</strong>. Isso comprova que a unidade esteve em pleno funcionamento e com profissionais atentos à vigilância, impedindo que o nível central confunda a ausência real de casos com omissão de notificação ou falência operacional do serviço de saúde.<br>
• <strong>Demais alternativas:</strong> Desconhecem o conceito fundamental da notificação negativa no controle sanitário do SUS.</p>

<h4>Questão 5: UNESP — Violência contra Idosos e Obrigações Legais</h4>
<p><strong>Enunciado:</strong> Uma paciente de 78 anos, portadora de demência de Alzheimer em estágio moderado, é levada ao serviço de emergência por uma sobrinha distante. Ao exame físico, o médico constata desidratação grave, desnutrição proteico-calórica avançada, múltiplas lesões por pressão em região sacral e trocantérica com necrose tecidual e fezes ressecadas incrustadas, além de relato de que o filho curador retém o benefício previdenciário da idosa e a mantém trancada em quarto escuro sem cuidados de higiene. Diante do quadro flagrante de negligência grave e maus-tratos a pessoa idosa, assinale o dever legal do médico assistente:</p>
<p>A) Emitir apenas atestado médico orientando a família e solicitar que a sobrinha procure um advogado civil se desejar.<br>
B) Preencher compulsoriamente a Ficha de Notificação de Violência Interpessoal/Autoprovocada para o SINAN e realizar a comunicação OBRIGATÓRIA aos órgãos de proteção (Conselho Municipal do Idoso, Ministério Público ou Delegacia de Proteção ao Idoso) em cumprimento estrito ao Estatuto do Idoso (Lei nº 10.741/2003).<br>
C) Manter sigilo profissional absoluto, pois a revelação de maus-tratos familiares é vedada pelo sigilo médico sem autorização prévia do filho curador.<br>
D) Aguardar nova internação para certificar se a negligência é recorrente antes de acionar a rede protetiva.<br>
E) A notificação de violência só se aplica a agressões físicas traumáticas por armas brancas ou de fogo, não abrangendo negligência ou abandono.</p>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
• <strong>Alternativa B (Correta):</strong> No caso de suspeita ou confirmação de violência, abuso, negligência ou maus-tratos contra pessoas idosas (bem como contra crianças, adolescentes e pessoas com deficiência), o médico tem <strong>dupla obrigação inegociável</strong>: (1) Preencher a <strong>Ficha de Notificação de Violência no SINAN</strong> (dever epidemiológico-sanitário); e (2) Fazer a <strong>comunicação formal imediata ao Ministério Público, Delegacia de Polícia ou Conselho do Idoso</strong> (dever legal expresso no Art. 19 do Estatuto do Idoso). O sigilo profissional não se aplica frente a essa determinação legal expressa.<br>
• <strong>Demais alternativas:</strong> São juridicamente incorretas e eticamente inaceitáveis, sujeitando o profissional a sanções legais e ético-disciplinares.</p>

<h4>Questão 6: AMP — Doença de Chagas Aguda vs. Crônica</h4>
<p><strong>Enunciado:</strong> Durante investigação epidemiológica de febre prolongada em município do Nordeste, dois pacientes são atendidos na mesma semana: o Paciente 1 apresenta febre há 18 dias, edema bipalpebral unilateral indolor (Sinal de Romaña) e chagoma de inoculação após ingestão de suco de açaí artesanal in natura; o exame a fresco de sangue periférico revela tripomastigotas móveis de Trypanosoma cruzi. O Paciente 2 é um senhor de 65 anos, hipertenso crônico, cuja radiografia de tórax e ecocardiograma solicitados para acompanhamento de rotina mostram cardiomegalia às custas de ventrículo esquerdo com aneurisma de ponta e bloqueio de ramo direito associado a hemibloqueio anterior esquerdo ao ECG, com sorologia IgG anti-T. cruzi reagente e ausência de quadro agudo. Em relação à notificação compulsória:</p>
<p>A) Ambos os pacientes devem ser notificados imediatamente em até 24 horas a todas as esferas de governo.<br>
B) Apenas o Paciente 1 (Doença de Chagas Aguda) é de notificação compulsória IMEDIATA (até 24 horas); a Doença de Chagas Crônica (Paciente 2) passou a ser de notificação compulsória de periodicidade SEMANAL (Portaria GM/MS nº 264/2020), não configurando notificação imediata.<br>
C) A Doença de Chagas Crônica não é agravo de notificação compulsória em nenhuma hipótese no Brasil.<br>
D) Ambos são agravos de notificação exclusivamente mensal realizada pelo laboratório de análises clínicas.<br>
E) A Doença de Chagas só é notificável se houver transmissão vetorial clássica por triatomíneos, estando os casos por transmissão oral isentos de inserção no SINAN.</p>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
• <strong>Alternativa B (Correta):</strong> A distinção entre as formas de Chagas é um clássico de prova: a <strong>Doença de Chagas AGUDA é agravo de notificação compulsória IMEDIATA (em até 24 horas para Município, Estado e Ministério da Saúde)</strong>, visando o rastreamento urgente de surtos por transmissão oral (açaí/caldo de cana) ou vetorial ativa. Por outro lado, a <strong>Doença de Chagas CRÔNICA foi incluída na lista nacional pela Portaria nº 264/2020 com periodicidade SEMANAL</strong>, permitindo mapear a carga da doença e garantir acesso universal ao tratamento (Benznidazol) e ao acompanhamento cardiológico e digestivo no SUS.<br>
• <strong>Alternativas A, C, D e E:</strong> Desconhecem a atualização da Portaria de 2020 e confundem os fluxos temporais de cada fase clínica.</p>
`;

// Inserir as novas seções antes das referências
payload.o = payload.o.filter(item => item[0] !== secDniId && item[0] !== secSentinelaId && item[0] !== secQuestoesId && item[0] !== 'referencias');
payload.q = payload.q.filter(item => item[0] !== secDniId && item[0] !== secSentinelaId && item[0] !== secQuestoesId && item[0] !== 'referencias');

payload.o.push([secDniId, secDniTitle]);
payload.q.push([secDniId, 0, htmlToBlocks(secDniTitle, secDniHtml)]);

payload.o.push([secSentinelaId, secSentinelaTitle]);
payload.q.push([secSentinelaId, 0, htmlToBlocks(secSentinelaTitle, secSentinelaHtml)]);

payload.o.push([secQuestoesId, secQuestoesTitle]);
payload.q.push([secQuestoesId, 0, htmlToBlocks(secQuestoesTitle, secQuestoesHtml)]);

// Recriar referências atualizadas
payload.o.push(['referencias', 'Referências Oficiais e Diretrizes']);
payload.q.push([
  'referencias',
  0,
  [
    ['2', 'Referências Oficiais e Diretrizes'],
    [
      'o',
      [
        '<a href="https://www.gov.br/saude/pt-br/assuntos/vigilancia-em-saude" target="_blank" rel="noopener noreferrer">Ministério da Saúde — Portaria de Consolidação GM/MS nº 4/2017 e Anexos Vigentes</a>',
        '<a href="https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/n/notificacao-compulsoria" target="_blank" rel="noopener noreferrer">Ministério da Saúde — Guia de Vigilância em Saúde (5ª Edição Revisada)</a>',
        '<a href="https://www.who.int/publications/i/item/9789241580496" target="_blank" rel="noopener noreferrer">Organização Mundial da Saúde — Regulamento Sanitário Internacional (RSI-2005)</a>',
        '<a href="https://www.planalto.gov.br/ccivil_03/leis/l6259.htm" target="_blank" rel="noopener noreferrer">Lei Federal nº 6.259/1975 — Organização da Vigilância Epidemiológica no Brasil</a>',
        '<a href="https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2020/decreto/d10212.htm" target="_blank" rel="noopener noreferrer">Decreto Federal nº 10.212/2020 — Promulgação das Emendas ao RSI-2005</a>',
        '<a href="https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm" target="_blank" rel="noopener noreferrer">Decreto-Lei nº 2.848/1940 — Código Penal Brasileiro (Art. 269)</a>',
        '<a href="https://portal.cfm.org.br/etica-medica/codigo-de-etica-medica/" target="_blank" rel="noopener noreferrer">Conselho Federal de Medicina — Código de Ética Médica</a>'
      ],
      'reference-list'
    ]
  ]
]);

saveBook(payload);
console.log('Aula 075 super-expandida com sucesso!');
