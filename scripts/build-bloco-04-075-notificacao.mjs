import { saveBook } from './bloco-04-utils.mjs';

const book = {
  slug: 'notificacao-compulsoria-de-doencas-e-agravos',
  title: 'Notificação Compulsória de Doenças e Agravos',
  area: 'Medicina Preventiva',
  materia: 'Vigilância Epidemiológica e Notificação Sanitária',
  description: 'Tratado completo sobre Notificação Compulsória no Sistema Único de Saúde (SUS) e Regulamento Sanitário Internacional (RSI 2005) para concursos de Residência Médica e ENAMED: fundamentos doutrinários e legais (Lei Federal nº 6.259/1975, Lei nº 8.080/1990, Portarias de Consolidação nº 4 e 5, e Portarias GM/MS vigentes atualizadas 2024–2026); conceito e finalidade sanitária ("informação para a ação"); obrigatoriedade legal e ética do profissional de saúde (Artigo 269 do Código Penal Brasileiro e infração ao Código de Ética Médica); quem deve notificar; o preceito inegociável da notificação na suspeita clínica (vedação absoluta de aguardar confirmação diagnóstica ou laboratorial); Lista Nacional de Notificação Compulsória de Doenças, Agravos e Eventos de Saúde Pública (DNC); cronologia e periodicidade rígida: Notificação Imediata em até 24 horas (comunicação pelo canal mais rápido à SMS, SES e Ministério da Saúde) versus Notificação Semanal em até 7 dias; Notificação Negativa sistemática; instrumentos do SINAN (Ficha de Notificação Individual — FNI e Ficha de Investigação de Caso — FIC); fluxo de retroalimentação e encerramento de casos; 4 casos clínicos estruturados com conduta de vigilância em saúde e questões comentadas na íntegra.',
  sections: [
    {
      id: 'marcos-legais-e-finalidade-sanitaria-notificacao',
      title: '1. Marcos Legais, Doutrinários e a Finalidade Sanitária da Notificação Compulsória',
      body_html: `
<h3>O Conceito Doutrinário: Informação para a Ação Imediata</h3>
<p>A <strong>Notificação Compulsória</strong> é a comunicação obrigatória à autoridade sanitária competente da ocorrência de determinada doença, agravo ou evento de saúde pública, realizada pelos profissionais de saúde ou qualquer cidadão, com a finalidade primordial de deflagrar medidas imediatas e inadiáveis de investigação epidemiológica, contenção de surtos, bloqueio vacinal, isolamento, quarentena, assistência clínica e proteção à coletividade.</p>
<p>No modelo de vigilância em saúde consolidado pelo Sistema Único de Saúde (SUS), a notificação compulsória jamais deve ser encarada pelo médico como uma tarefa meramente burocrática ou cartorial de preenchimento estatístico retrospectivo. A sua razão de ser é expressa no princípio clássico da epidemiologia: <strong>"Informação para a Ação"</strong>. O valor de uma notificação é medido pela sua <strong>oportunidade</strong> — isto é, pela rapidez com que a informação alcança as equipes de campo da vigilância para bloquear a cadeia de transmissão comunitária e salvar vidas.</p>

<h3>Bases Legais e Regulatórias no Brasil</h3>
<ol>
  <li><strong>Lei Federal nº 6.259, de 30 de outubro de 1975:</strong> Dispõe sobre a organização das ações de Vigilância Epidemiológica e do Programa Nacional de Imunizações (PNI), instituindo em âmbito nacional a notificação compulsória de doenças e regulamentando a sua obrigatoriedade em todo o território nacional;</li>
  <li><strong>Lei Federal nº 8.080, de 19 de setembro de 1990 (Lei Orgânica da Saúde):</strong> Define em seu Artigo 6º, § 2º que compete ao SUS executar as ações de vigilância epidemiológica, compreendendo o conhecimento contínuo e a intervenção sobre fatores condicionantes da saúde coletiva;</li>
  <li><strong>Portarias de Consolidação GM/MS nº 4/2017 e nº 5/2017:</strong> Consolidam as normas sobre os sistemas de vigilância em saúde e os fluxos tripartite (União, Estados e Municípios);</li>
  <li><strong>Portaria GM/MS vigente atualizada (Lista Nacional de Notificação Compulsória):</strong> Republicada e atualizada periodicamente pelo Ministério da Saúde (incorporando novos agravos emergentes, como Mpox, SRAG e eventos adversos graves pós-vacinação).</li>
</ol>

<h3>A Regra de Ouro Inegociável: Notifica-se a SUSPEITA Clínica!</h3>
<div class="book-alert book-alert-important">
  <strong>REGRA ABSOLUTA DE PROVA E DA PRÁTICA CLÍNICA:</strong>
  <p>A notificação compulsória <strong>DEVE SER REALIZADA DIANTE DA SIMPLES SUSPEITA CLÍNICA OU EPIDEMIOLÓGICA</strong> da doença ou agravo. <strong>É FORMALMENTE PROIBIDO E CONSTITUI ERRO GRAVE AGUARDAR O RESULTADO DE EXAMES LABORATORIAIS CONFIRMATÓRIOS (sorologias, culturas, PCR, histopatologia) OU A EVOLUÇÃO DO CASO PARA EMITIR A NOTIFICAÇÃO!</strong></p>
  <p><em>Racional Sanitário:</em> Se um médico aguardar 7 a 15 dias pelo laudo laboratorial de um caso suspeito de Sarampo, Febre Amarela, Meningite Meningocócica ou Cólera, a oportunidade sanitária de realizar o bloqueio vacinal dos contatos nas primeiras 72 horas, instituir a quimioprofilaxia ou isolar o paciente terá sido irremediavelmente perdida, deflagrando surtos comunitários incontroláveis com mortes evitáveis.</p>
</div>

<h3>Quem Tem a Obrigação Legal de Notificar?</h3>
<ul>
  <li><strong>Profissionais de Saúde no Exercício da Profissão:</strong> Médicos, enfermeiros, cirurgiões-dentistas, farmacêuticos, biomédicos e médicos veterinários que prestem assistência ao paciente ou animal acometido;</li>
  <li><strong>Responsáveis por Estabelecimentos Públicos e Privados:</strong> Diretores clínicos e administrativos de hospitais, Unidades Básicas de Saúde (UBS/ESF), UPAs, clínicas privadas, consultórios, laboratórios de análises clínicas, bancos de sangue, creches, escolas, presídios, portos, aeroportos e hotéis;</li>
  <li><strong>Qualquer Cidadão Comum:</strong> A legislação confere legitimidade a qualquer indivíduo do povo para comunicar à autoridade sanitária a ocorrência de casos suspeitos ou surtos em sua comunidade (comunicação de rumor).</li>
</ul>

<h3>Aspectos Médico-Legais e Éticos: O Crime de Omissão de Notificação de Doença</h3>
<p>O sigilo médico é um direito do paciente e um dever ético profissional, porém o Código de Ética Médica (Artigo 73) e a legislação brasileira estabelecem expressamente como justa causa para a revelação de fato sigiloso o <strong>"dever legal de notificação compulsória"</strong>. A omissão do médico assistente em comunicar doença de notificação legal não é mera falta administrativa, configurando <strong>Crime Contra a Saúde Pública</strong> tipificado no Código Penal Brasileiro:</p>
<blockquote>
  <strong>Artigo 269 do Código Penal Brasileiro:</strong><br>
  <em>"Deixar o médico de denunciar à autoridade pública doença cuja notificação é compulsória:<br>
  Pena — detenção, de 6 (seis) meses a 2 (dois) anos, e multa."</em>
</blockquote>
`
    },
    {
      id: 'cronologia-imediata-vs-semanal',
      title: '2. Periodicidade da Notificação: Imediata (até 24h) vs Semanal (até 7 dias)',
      body_html: `
<h3>Estratificação Temporal: A Lógica Epidemiológica da Urgência</h3>
<p>A Lista Nacional do Ministério da Saúde divide as doenças e agravos em duas categorias rígidas de periodicidade, com fluxos operacionais inteiramente distintos:</p>

<h3>1. Notificação Compulsória Imediata (Em até 24 Horas)</h3>
<p>Destina-se aos agravos que apresentam altíssimo potencial de disseminação rápida (transmissibilidade explosiva), elevada letalidade, vulnerabilidade a medidas urgentes de bloqueio comunitário nas primeiras horas, ou que configurem <strong>Emergência de Saúde Pública de Importância Internacional (ESPII)</strong> segundo o Regulamento Sanitário Internacional (RSI 2005).</p>
<p><strong>Como Notificar?</strong> Deve ser feita pelo meio de comunicação mais rápido e disponível (telefone institucional de plantão da vigilância, e-mail criptografado ou formulário eletrônico online em tempo real — FormSUS/SINAN Web), complementada posteriormente pela ficha física do SINAN.</p>
<p><strong>Fluxo Tripartite Simultâneo:</strong> A Portaria ministerial exige que a maioria das doenças de notificação imediata seja comunicada <strong>simultaneamente às três esferas de gestão do SUS: Secretaria Municipal de Saúde (SMS), Secretaria Estadual de Saúde (SES) e Ministério da Saúde (MS)</strong>.</p>

<h3>2. Notificação Compulsória Semanal (Em até 7 Dias)</h3>
<p>Destina-se a doenças de curso crônico, endêmico consolidado ou de menor velocidade de propagação direta pessoa a pessoa, nas quais as medidas de controle são programáticas e organizadas pela rotina das equipes de Atenção Primária e serviços especializados.</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Periodicidade</th>
      <th>Critérios Epidemiológicos de Enquadramento</th>
      <th>Rol Completo dos Agravos de Notificação Obrigatória (Padrão Oficial de Prova)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>IMEDIATA<br>(Até 24 Horas)</strong></td>
      <td>Risco iminente de surto/epidemia, alta letalidade, necessidade de bloqueio vacinal ou quimioprofilaxia imediata de contatos, ou emergência internacional.</td>
      <td>
        • <strong>Acidente por Animal Peçonhento</strong> (cobras, aranhas, escorpiões);<br>
        • <strong>Acidente de Trabalho Grave, com Óbito ou em Crianças/Adolescentes</strong>;<br>
        • <strong>Antraz Pneumônico ou Cutâneo</strong>;<br>
        • <strong>Botulismo</strong> (intoxicação alimentar neuroparalítica grave);<br>
        • <strong>Cólera</strong>;<br>
        • <strong>Coqueluche</strong> (bloqueio de contactantes em creches/domicílio);<br>
        • <strong>Dengue — Casos Graves e Óbitos Suspeitos</strong> (dengue clássica ambulatorial é semanal!);<br>
        • <strong>Doença Aguda pelo Vírus Zika em Gestantes</strong>;<br>
        • <strong>Doença de Chagas Aguda</strong> (transmissão oral por açaí/caldo de cana ou vetorial);<br>
        • <strong>Doença Invasiva por Haemophilus influenzae</strong>;<br>
        • <strong>Doença Meningocócica e Outras Meningites</strong> (urgência de quimioprofilaxia de contatos íntimos);<br>
        • <strong>Doenças com Suspeita de Disseminação Intencional (Bioterrorismo)</strong>;<br>
        • <strong>Febre Amarela</strong> (bloqueio vacinal no território);<br>
        • <strong>Febre de Chikungunya — Casos em áreas sem transmissão prévia ou Óbitos</strong>;<br>
        • <strong>Febre do Nilo Ocidental e Outras Arboviroses Emergentes</strong>;<br>
        • <strong>Febre Maculosa e Outras Rickettsioses</strong>;<br>
        • <strong>Hantavirose</strong>;<br>
        • <strong>Influenza Humana por Novo Subtipo Viral</strong> (potencial pandêmico);<br>
        • <strong>Malária na Região Extra-Amazônica</strong> (na Amazônia Legal é semanal!);<br>
        • <strong>Mpox (Varíola dos Macacos)</strong>;<br>
        • <strong>Paralisia Flácida Aguda (Vigilância da Poliomielite)</strong>;<br>
        • <strong>Peste (Peste Bubônica/Pneumônica)</strong>;<br>
        • <strong>Raiva Humana e Acidente por Animal Potencialmente Transmissor da Raiva</strong> (mordedura de cão/gato/morcego);<br>
        • <strong>Rubéola e Síndrome da Rubéola Congênita (SRC)</strong>;<br>
        • <strong>Sarampo</strong> (emergência de bloqueio vacinal em até 72 horas);<br>
        • <strong>Síndrome Respiratória Aguda Grave (SRAG)</strong> hospitalizada;<br>
        • <strong>Varíola</strong>;<br>
        • <strong>Violência Sexual e Tentativa de Suicídio</strong> (outras violências são semanais!).
      </td>
    </tr>
    <tr>
      <td><strong>SEMANAL<br>(Até 7 Dias)</strong></td>
      <td>Doenças crônicas, transmissíveis endêmicas com controle de programa ou agravos sem necessidade de intervenção ambiental imediata nas primeiras 24 horas.</td>
      <td>
        • <strong>Acidentes de Trabalho Comuns (sem gravidade extrema/óbito)</strong>;<br>
        • <strong>Câncer Relacionado ao Trabalho</strong>;<br>
        • <strong>Dengue Clássica / Febre de Chikungunya em Áreas Endêmicas com Transmissão Estabelecida</strong>;<br>
        • <strong>Dermatoses Ocupacionais</strong>;<br>
        • <strong>Doença de Chagas Crônica</strong>;<br>
        • <strong>Doença de Creutzfeldt-Jakob (DCJ)</strong>;<br>
        • <strong>Esquistossomose</strong>;<br>
        • <strong>Hanseníase</strong> (todas as formas clínicas);<br>
        • <strong>Hepatites Virais (A, B, C, D, E)</strong>;<br>
        • <strong>Infecção pelo Vírus HIV em Adultos, Crianças e Gestantes/Parturientes/Puérperas</strong>;<br>
        • <strong>Intoxicações Exógenas (por substâncias químicas, medicamentos, agrotóxicos)</strong>;<br>
        • <strong>Leishmaniose Tegumentar Americana (LTA)</strong>;<br>
        • <strong>Leishmaniose Visceral (Calazar)</strong>;<br>
        • <strong>LER/DORT Ocupacional</strong>;<br>
        • <strong>Malária na Região Amazônica (Área Endêmica)</strong>;<br>
        • <strong>Perda Auditiva Induzida por Ruído (PAIR) Ocupacional</strong>;<br>
        • <strong>Pneumoconioses (Silicose, Asbestose)</strong>;<br>
        • <strong>Sífilis (Adquirida, em Gestante e Congênita)</strong>;<br>
        • <strong>Tétano Acidental e Tétano Neonatal</strong>;<br>
        • <strong>Toxoplasmose Gestacional e Congênita</strong>;<br>
        • <strong>Tuberculose (Pulmonar e Extrapulmonar)</strong>;<br>
        • <strong>Violências Domésticas, Intrafamiliares e Outras Violências Interpessoais (exceto violência sexual e tentativa de suicídio, que são imediatas!)</strong>.
      </td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'casos-especiais-de-notificacao-e-pegadinhas',
      title: '3. Casos Especiais, Dicotomias Clássicas e Pegadinhas Recorrentes em Provas',
      body_html: `
<h3>As Quatro Dicotomias Clássicas de Prova (Imediata vs Semanal)</h3>
<p>Bancas examinadoras de residência médica e ENAMED frequentemente constroem questões explorando agravos cuja periodicidade de notificação varia conforme a gravidade, população afetada ou localização geográfica. Domine estas distinções:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Agravo Epidemiológico</th>
      <th>Quando a Notificação é IMEDIATA (até 24h)?</th>
      <th>Quando a Notificação é SEMANAL (até 7 dias)?</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Dengue</strong></td>
      <td>Casos de <strong>Dengue Grave</strong>, dengue com sinais de alarme internados ou <strong>Óbitos Suspeitos por Dengue</strong>.</td>
      <td>Casos suspeitos de <strong>Dengue Clássica / Sem Sinais de Alarme</strong> atendidos ambulatorialmente em municípios endêmicos.</td>
    </tr>
    <tr>
      <td><strong>Malária</strong></td>
      <td>Casos diagnosticados na <strong>Região Extra-Amazônica</strong> (qualquer caso fora da Amazônia Legal exige alerta imediato para investigar transmissão autóctone!).</td>
      <td>Casos diagnosticados na <strong>Região Amazônica (Área Endêmica)</strong>.</td>
    </tr>
    <tr>
      <td><strong>Violência</strong></td>
      <td><strong>Violência Sexual</strong> e <strong>Tentativa de Suicídio</strong> (exigem profilaxias de emergência e proteção imediata).</td>
      <td>Violência doméstica física habitual, psicológica, negligência e violência patrimonial.</td>
    </tr>
    <tr>
      <td><strong>Vírus Zika</strong></td>
      <td>Caso agudo de infecção pelo Vírus Zika em <strong>GESTANTE</strong> ou óbito com suspeita de Zika.</td>
      <td>Zika em adultos não gestantes em áreas com transmissão já estabelecida.</td>
    </tr>
  </tbody>
</table>

<h3>A Notificação Negativa: Por Que Ela é Obrigatória?</h3>
<p>A <strong>Notificação Negativa</strong> é a declaração formal, semanal e obrigatória preenchida no SINAN pelo responsável técnico de cada unidade de saúde atestando que, <em>durante aquela semana epidemiológica específica, nenhuma doença de notificação compulsória constante da lista oficial foi atendida ou registrada no serviço</em>.</p>
<p><em>Racional Epidemiológico:</em> A notificação negativa comprova que o sistema de vigilância epidemiológica daquele município está <strong>ativo, vigilante e em operação contínua</strong>. Sem a notificação negativa, a autoridade sanitária central não tem como discernir se a ausência de casos notificados decorre de uma real ausência biológica da doença no território ou se traduz um <strong>silêncio epidemiológico artificial</strong> causado por colapso, greve ou desleixo dos profissionais de saúde da unidade.</p>

<h3>Os Instrumentos Operacionais do SINAN</h3>
<ul>
  <li><strong>Ficha de Notificação Individual (FNI):</strong> Preenchida no primeiro contato pelo médico ou equipe assistencial no momento da suspeita. Contém dados demográficos do paciente, ocupação, endereço residencial detalhado e hipótese diagnóstica primária;</li>
  <li><strong>Ficha de Investigação de Caso (FIC):</strong> Instrumento especializado preenchido pelos técnicos e epidemiologistas da vigilância epidemiológica municipal durante o rastreamento de campo. Registra dados clínicos aprofundados, resultados de exames laboratoriais, busca ativa de contactantes, fonte de infecção identificada e o <strong>encerramento formal do caso</strong> (critério laboratorial, clínico-epidemiológico ou descarte).</li>
</ul>
`
    },
    {
      id: 'casos-clinicos-estruturados-notificacao',
      title: '4. Casos Clínicos Estruturados e Condutas em Vigilância Epidemiológica',
      body_html: `
<div class="book-case">
  <h4>Caso Clínico 1: Exantema Febril em Creche e Notificação Imediata</h4>
  <p><strong>Identificação e Queixa:</strong> Menina de 3 anos de idade, previamente hígida, é trazida pela mãe à Unidade de Pronto Atendimento com história de febre alta (39,2 °C) há 4 dias, acompanhada de tosse seca intensa, coriza hialina profusa, conjuntivite com fotofobia acentuada e surgimento há 24 horas de exantema maculopapular avermelhado de progressão craniocaudal, que se iniciou atrás das orelhas e na linha de implantação dos cabelos, estendendo-se para face e tronco, com áreas de pele sã entre as lesões. Ao exame da cavidade oral, o médico observa pequenas manchas esbranquiçadas puntiformes circundadas por halo hiperemiado na mucosa jugal, na altura dos molares (Manchas de Koplik). A mãe relata que a caderneta vacinal está atrasada e que a criança frequenta creche em tempo integral.</p>
  <p><strong>Discussão e Conduta Médica:</strong></p>
  <ol>
    <li><strong>Diagnóstico Sindrômico e Clínico:</strong> O quadro é patognomônico de <strong>Sarampo</strong> (pródromos catarrais exuberantes, conjuntivite, tosse, febre alta, exantema morbiliforme craniocaudal e manchas de Koplik);</li>
    <li><strong>Conduta de Vigilância Epidemiológica:</strong> O Sarampo é agravo de <strong>NOTIFICAÇÃO COMPULSÓRIA IMEDIATA (EM ATÉ 24 HORAS)</strong> às secretarias municipal, estadual e Ministério da Saúde;</li>
    <li><strong>Regra de Ouro:</strong> A notificação deve ser transmitida <strong>IMEDIATAMENTE NA SUSPEITA CLÍNICA</strong>, sem aguardar o resultado da sorologia IgM ou PCR de urina/swab nasofaríngeo colhidos;</li>
    <li><strong>Intervenção de Campo:</strong> A notificação imediata deflagra o <strong>bloqueio vacinal seletivo na creche e contatos domiciliares nas primeiras 72 horas</strong> pós-exposição com a vacina Tríplice Viral (SCR) para todos os suscetíveis a partir dos 6 meses de vida, além de isolamento respiratório por gotículas da paciente.</li>
  </ol>
</div>

<div class="book-case">
  <h4>Caso Clínico 2: Febre e Cefaleia em Jovem Recruta — Quimioprofilaxia de Contatos</h4>
  <p><strong>Identificação e Queixa:</strong> Jovem de 19 anos, recruta em quartel militar, dá entrada no pronto-socorro com febre de início súbito (40 °C), cefaleia holocraniana excruciante, vômitos em jato, confusão mental e surgimento de petéquias cutâneas em membros inferiores nas últimas 6 horas. Exame físico: rigidez de nuca marcante com sinais de Kernig e Brudzinski positivos. A punção lombar revela líquor turvo sob pressão com diplococos Gram-negativos aos pares intra e extracelulares (<em>Neisseria meningitidis</em>).</p>
  <p><strong>Discussão e Conduta Médica:</strong></p>
  <ul>
    <li><strong>Classificação:</strong> Doença Meningocócica (Meningite Meningocócica associada a meningococcemia). Agravo de <strong>NOTIFICAÇÃO COMPULSÓRIA IMEDIATA (EM ATÉ 24 HORAS)</strong>;</li>
    <li><strong>Isolamento:</strong> Isolamento respiratório por <strong>gotículas</strong> até completar 24 horas de antibioticoterapia venosa bactericida adequada (Ceftriaxona venosa);</li>
    <li><strong>Quimioprofilaxia dos Contactantes Íntimos:</strong> Deve ser iniciada idealmente nas primeiras 24 a 48 horas para prevenir casos secundários entre aqueles que compartilham o mesmo dormitório no quartel e familiares próximos. Fármaco de 1ª escolha: <strong>Rifampicina oral (600 mg de 12/12h por 2 dias em adultos)</strong>; alternativas seguras: dose única de <strong>Ceftriaxona 250 mg IM</strong> (droga de escolha em gestantes) ou dose única de <strong>Ciprofloxacino 500 mg VO</strong>.</li>
  </ul>
</div>
`
    },
    {
      id: 'questoes-comentadas-notificacao-compulsoria',
      title: '5. Questões Comentadas de Concursos e Residência Médica na Íntegra',
      body_html: `
<h3>Questão 1: ENARE — Periodicidade e Fluxo da Notificação Compulsória</h3>
<p><strong>Enunciado:</strong> Um médico recém-formado assume plantão em Unidade Básica de Saúde e atende quatro pacientes com diagnósticos suspeitos distintos:</p>
<p>1. Paciente com tosse crônica produtiva há 4 semanas, emagrecimento e suspeita clínica de tuberculose pulmonar.<br>
2. Paciente vítima de picada de cobra jararaca (acidente ofídico botrópico) com dor e edema no membro inferior direito.<br>
3. Gestante de 22 semanas com teste rápido treponêmico positivo em consulta pré-natal (sífilis em gestante).<br>
4. Criança de 5 anos trazida pelo SAMU com quadro agudo de febre alta, rigidez de nuca e petéquias purpúricas em tronco (suspeita de meningite meningocócica).</p>
<p>De acordo com a Lista Nacional de Notificação Compulsória do Ministério da Saúde, exigem <strong>notificação imediata (em até 24 horas)</strong> às autoridades sanitárias os casos:</p>
<p>A) 1 e 3 apenas.<br>
B) 2 e 4 apenas.<br>
C) 1, 2 e 4 apenas.<br>
D) 2, 3 e 4 apenas.<br>
E) 1, 2, 3 e 4.</p>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
• <strong>Caso 1 (Tuberculose):</strong> Notificação compulsória <strong>SEMANAL</strong> (em até 7 dias). Trata-se de agravo transmissível de curso crônico manejado programmaticamente na APS.<br>
• <strong>Caso 2 (Acidente por Animal Peçonhento):</strong> Notificação compulsória <strong>IMEDIATA (até 24 horas)</strong>. A vigilância epidemiológica precisa monitorar estoques de soros antivenenos e investigar o foco animal.<br>
• <strong>Caso 3 (Sífilis em gestante):</strong> Notificação compulsória <strong>SEMANAL</strong> (em até 7 dias). O tratamento com penicilina benzatina deve ser iniciado na hora, mas a comunicação ao SINAN é semanal.<br>
• <strong>Caso 4 (Doença Meningocócica):</strong> Notificação compulsória <strong>IMEDIATA (até 24 horas)</strong>. É fundamental deflagrar a quimioprofilaxia de contatos íntimos nas primeiras horas com rifampicina ou ceftriaxona para conter surtos secundários de alta letalidade.<br>
Portanto, apenas os casos 2 e 4 exigem notificação imediata em até 24h. Alternativa B correta.</p>

<h3>Questão 2: USP / Residência Médica — Momento da Notificação e Omissão Penal</h3>
<p><strong>Enunciado:</strong> Durante o atendimento em ambulatório de especialidades, um médico atende um paciente com lesões cutâneas hipocrômicas com perda de sensibilidade térmica e espessamento do nervo ulnar direito, suspeitando fortemente de hanseníase. O médico solicita biópsia de pele e baciloscopia de raspado intradérmico e decide aguardar o laudo anatomopatológico (previsto para 20 dias) antes de preencher a Ficha de Notificação do SINAN, temendo "notificar um caso que venha a ser descartado". Sobre a conduta do profissional frente às normas sanitárias e éticas vigentes, assinale a correta:</p>
<p>A) A conduta está correta, pois a legislação brasileira veda a notificação de agravos crônicos sem confirmação microbiológica ou histopatológica prévia.<br>
B) A conduta está equivocada, pois a notificação de doenças compulsórias deve ser realizada obrigatoriamente diante da suspeita clínica, sem aguardar exames complementares de confirmação, e a omissão deliberada constitui infração ética e crime tipificado no Código Penal.<br>
C) A notificação é facultativa na hanseníase, sendo exigida apenas em casos que evoluem para incapacidade física de grau 2.<br>
D) O médico agiu com prudência, pois a notificação de casos não confirmados gera penalidades administrativas automáticas ao profissional emitente pelo Conselho Federal de Medicina.<br>
E) A responsabilidade pela notificação no SUS é exclusiva dos enfermeiros da Vigilância em Saúde, não cabendo ao médico qualquer obrigação formal.</p>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
A regra basilar da vigilância epidemiológica determina que <strong>notifica-se a SUSPEITA clínica</strong>. Aguardar resultados laboratoriais tardios retarda o início de ações de busca ativa de contactantes e controle sanitário. Se o exame laboratorial posterior resultar negativo, o caso será formalmente <em>descartado</em> na Ficha de Investigação do SINAN, sem qualquer prejuízo ou sanção ao médico notificador (pelo contrário: a suspeição faz parte do bom exercício da medicina preventiva). Além disso, a omissão voluntária da notificação de agravo compulsório contraria o Código de Ética Médica e configura o crime previsto no Artigo 269 do Código Penal. Alternativa B correta.</p>
`
    },
    {
      id: 'sintese-de-alto-rendimento-notificacao-compulsoria',
      title: '6. Síntese de Alto Rendimento e Regras Mnemônicas para o ENAMED',
      body_html: `
<h3>Os Dez Mandamentos da Notificação Compulsória para Concursos</h3>
<ul>
  <li><strong>1. Regra de Ouro Primária:</strong> Notifica-se a <strong>SUSPEITA CLÍNICA</strong>, NUNCA aguardando confirmação laboratorial! Notificar suspeita não é erro; deixar de notificar é crime (Art. 269 do Código Penal)!</li>
  <li><strong>2. Imediata em até 24 Horas:</strong> Lembrar das emergências epidêmicas e de bloqueio: <strong>Sarampo, Febre Amarela, Raiva humana e acidente rábico grave, Meningite meningocócica, Botulismo, Cólera, Peste, Antraz, Acidente por Animal Peçonhento, Violência Sexual e Tentativa de Suicídio</strong>!</li>
  <li><strong>3. Semanal em até 7 Dias:</strong> Agravos crônicos e de programa: <strong>Tuberculose, Hanseníase, Sífilis (todas), HIV/AIDS, Hepatites virais, Leishmanioses, Doença de Chagas crônica e Violência doméstica comum</strong>.</li>
  <li><strong>4. Dicotomias de Prova Decisivas:</strong>
    <ul>
      <li>Dengue clássica ambulatorial = Semanal; Dengue grave ou óbito = <strong>Imediata</strong>;</li>
      <li>Malária na Amazônia = Semanal; Malária fora da Amazônia (extra-amazônica) = <strong>Imediata</strong>;</li>
      <li>Violência física habitual/doméstica = Semanal; Violência sexual e tentativa de suicídio = <strong>Imediata</strong>;</li>
      <li>Zika comum = Semanal; Zika em gestante ou óbito = <strong>Imediata</strong>.</li>
    </ul>
  </li>
  <li><strong>5. Notificação Negativa:</strong> Declaração semanal obrigatória de que nenhum caso ocorreu. Prova que o sistema está <strong>ativo e vigilante</strong>, descartando o silêncio epidemiológico artificial.</li>
  <li><strong>6. Sigilo Médico vs Dever Legal:</strong> O sigilo médico cede expressamente diante do dever legal de notificação compulsória (justa causa ética do CEM).</li>
  <li><strong>7. Acidente de Trabalho:</strong> Deve ser notificado no SINAN e ter <strong>CAT emitida até o 1º dia útil seguinte</strong>, havendo ou não afastamento das atividades laborais! Acidente grave ou com óbito exige notificação imediata em até 24h.</li>
  <li><strong>8. Instrumentos do SINAN:</strong> FNI (Ficha de Notificação Individual na entrada) vs FIC (Ficha de Investigação de Caso aprofundada de campo).</li>
  <li><strong>9. Bloqueio Vacinal no Sarampo:</strong> A notificação imediata do caso suspeito desencadeia o <strong>bloqueio vacinal com tríplice viral em até 72 horas</strong> nos contactantes da creche/domicílio a partir dos 6 meses de vida.</li>
  <li><strong>10. Quimioprofilaxia da Meningite Meningocócica:</strong> Notificação imediata deflagra a quimioprofilaxia dos contatos íntimos nas primeiras 24-48h com <strong>Rifampicina oral por 2 dias</strong> (ou Ceftriaxona dose única em gestantes).</li>
</ul>
`
    }
  ],
  references: [
    {
      title: 'Ministério da Saúde — Portaria de Consolidação GM/MS nº 4/2017 e Portaria de Consolidação GM/MS nº 5/2017',
      url: 'https://www.gov.br/saude/pt-br/assuntos/vigilancia-em-saude'
    },
    {
      title: 'Ministério da Saúde — Lista Nacional de Notificação Compulsória de Doenças, Agravos e Eventos de Saúde Pública',
      url: 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/n/notificacao-compulsoria'
    },
    {
      title: 'Lei Federal nº 6.259/1975 — Vigilância Epidemiológica e Programa Nacional de Imunizações',
      url: 'https://www.planalto.gov.br/ccivil_03/leis/l6259.htm'
    },
    {
      title: 'Decreto-Lei nº 2.848/1940 — Código Penal Brasileiro (Artigo 269: Omissão de Notificação de Doença)',
      url: 'https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm'
    },
    {
      title: 'Conselho Federal de Medicina — Código de Ética Médica (Resolução CFM nº 2.217/2018)',
      url: 'https://portal.cfm.org.br/etica-medica/codigo-de-etica-medica/'
    }
  ]
};

const charCount = saveBook(book);
console.log(`[AULA 075 CONCLUÍDA] Total de caracteres: ${charCount}`);
