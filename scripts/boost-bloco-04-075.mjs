import fs from 'fs';
import path from 'path';
import { htmlToBlocks, countUsefulChars, saveBook } from './bloco-04-utils.mjs';

const slug = 'notificacao-compulsoria-de-doencas-e-agravos';
const jsonPath = path.join('apostilas', slug, 'content.json');
const payload = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const secDeep1Id = 'lista-nacional-esmiucada-e-criterios-de-inclusao';
const secDeep1Title = 'Critérios Epidemiológicos de Definição da Lista Nacional e Análise Detalhada dos Agravos';
const secDeep1Html = `
<h3>Critérios Técnicos da Portaria Ministerial para Inclusão de Doenças na Lista Nacional</h3>
<p>A formulação da Lista Nacional de Notificação Compulsória de Doenças, Agravos e Eventos de Saúde Pública (Portaria de Consolidação GM/MS nº 4/2017 e atualizações vigentes) fundamenta-se em princípios epidemiológicos rigorosos recomendados pela Organização Mundial da Saúde (OMS) e pelo Centro de Vigilância Epidemiológica do Ministério da Saúde. Nem toda doença prevalente deve ser de notificação compulsória universal; a inclusão de um agravo obedece a sete critérios técnicos centrais:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Critério Técnico Oficial</th>
      <th>Fundamentação Conceitual e Operacional</th>
      <th>Exemplos Típicos de Agravos Enquadrados</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1. Magnitude</strong></td>
      <td>Elevada frequência da doença expressa por coeficientes elevados de incidência, prevalência, mortalidade ou anos potenciais de vida perdidos (APVP), refletindo grande impacto na carga global de morbimortalidade populacional.</td>
      <td>Tuberculose, Hanseníase, Dengue, Infecção pelo HIV/AIDS e Sífilis.</td>
    </tr>
    <tr>
      <td><strong>2. Transcendência</strong></td>
      <td>Severidade clínica, social e econômica do agravo, avaliada através de três componentes:
        <ul>
          <li><em>Severidade Clínica:</em> Alta taxa de letalidade e taxa de hospitalização;</li>
          <li><em>Relevância Social:</em> Estigma, discriminação, invalidez precoce ou sequelas incapacitantes permanentes;</li>
          <li><em>Relevância Econômica:</em> Perda massiva de produtividade, custos elevados com internações de alta complexidade e impacto na previdência social.</li>
        </ul>
      </td>
      <td>Raiva humana (letalidade próxima a 100%), Tétano neonatal, Paralisia Flácida Aguda / Poliomielite e Meningites bacterianas.</td>
    </tr>
    <tr>
      <td><strong>3. Potencial de Disseminação</strong></td>
      <td>Elevada velocidade de propagação direta ou vetorial do agente infeccioso, com alto número básico de reprodução ($R_0$) ou capacidade de deflagrar epidemias de alcance interestadual e internacional em curto período de tempo.</td>
      <td>Sarampo ($R_0$ entre 12 e 18), Influenza com novo subtipo pandêmico, Febre Amarela, Cólera e Mpox.</td>
    </tr>
    <tr>
      <td><strong>4. Vulnerabilidade</strong></td>
      <td>Existência de <strong>instrumentos técnicos e operacionais eficazes de prevenção, controle e intervenção sanitária</strong> disponíveis na rede do SUS (vacinas eficazes, quimioprofilaxia de contatos, eliminação de vetores, saneamento ou tratamento curativo padronizado). Se não houver intervenção viável, a vigilância universal perde utilidade epidemiológica.</td>
      <td>Doenças imunopreveníveis (Sarampo, Rubéola, Coqueluche, Difteria, Tétano) e infecções bacterianas com bloqueio quimioprofilático (Doença meningocócica).</td>
    </tr>
    <tr>
      <td><strong>5. Compromissos Internacionais</strong></td>
      <td>Cumprimento das metas pactuadas de erradicação, eliminação ou controle de doenças assumidas pelo Estado brasileiro perante a Assembleia Mundial da Saúde e o Regulamento Sanitário Internacional (RSI 2005).</td>
      <td>Poliomielite (manutenção do certificado de erradicação), Sarampo e Rubéola (eliminação da transmissão autóctone), Varíola e Peste.</td>
    </tr>
    <tr>
      <td><strong>6. Eventos Inusitados e Emergências de Saúde Pública</strong></td>
      <td>Ocorrência de doenças desconhecidas, variantes patogênicas mutantes, surtos de etiologia inexplicada ou eventos decorrentes de liberação acidental ou deliberada de agentes biológicos, químicos ou radioativos (Bioterrorismo).</td>
      <td>Antraz pneumônico, Botulismo, Síndrome Respiratória Aguda Grave (SRAG) e acidentes nucleares ou com radiações ionizantes.</td>
    </tr>
    <tr>
      <td><strong>7. Regulamento Sanitário Internacional (RSI 2005)</strong></td>
      <td>Quatro doenças exigem notificação imediata mandatória universal e incondicional à OMS segundo o Artigo 6º do RSI: <strong>Varíola, Poliomielite por poliovírus selvagem, Influenza humana causada por novo subtipo viral e Síndrome Respiratória Aguda Grave (SARS)</strong>.</td>
      <td>Poliovírus selvagem, gripe aviária pandêmica e novos coronavírus.</td>
    </tr>
  </tbody>
</table>

<h3>Aprofundamento Farmacoepidemiológico dos Agravos de Notificação Imediata</h3>
<p>A notificação em até 24 horas desencadeia protocolos clínicos farmacológicos imediatos que o médico de plantão deve conhecer detalhadamente:</p>
<ul>
  <li><strong>Acidentes Ofídicos e por Animais Peçonhentos (Notificação em até 24h):</strong>
    <ul>
      <li><em>Acidente Botrópico (Jararaca - 85% dos acidentes ofídicos no Brasil):</em> Ação proteolítica (inflamação e necrose local), coagulante (consumo de fibrinogênio com sangue incoagulável) e hemorrágica (lesão endotelial sistêmica por hemorraginas com hematúria, gengivorragia e choque). Tratamento: <strong>Soro Antibotrópico (SAB)</strong> em doses de 2 a 4 ampolas (leve), 4 a 8 ampolas (moderado) ou 12 ampolas (grave) por via venosa sem teste de sensibilidade prévio;</li>
      <li><em>Acidente Crotálico (Cascavel - 10% dos casos):</em> Ação neurotóxica (fascies miastênica de Rosenfeld com ptose palpebral bilateral, oftalmoplegia e visão turva), miotóxica (rabdomiólise com dor muscular difusa e mioglobinúria com urina cor de coca-cola) e coagulante. Risco crítico: <strong>Insuficiência Renal Aguda por necrose tubular aguda pigmentar mioglobinúrica</strong>. Tratamento: <strong>Soro Anticrotálico (SAC)</strong> associado a hidratação venosa vigorosa e alcalinização urinária com bicarbonato de sódio para manter fluxo urinário &gt; 2 mL/kg/h;</li>
      <li><em>Acidente Laquético (Surucucu - florestas tropicais):</em> Ação idêntica à botrópica associada a <strong>síndrome vagal intensa</strong> (bradicardia, hipotensão, cólicas abdominais e diarreia profusa). Tratamento: <strong>Soro Antibotrópico-Laquético (SABL)</strong>;</li>
      <li><em>Acidente Elapídico (Coral verdadeira):</em> Ação neurotóxica pura com paralisia precoce da musculatura respiratória. Tratar com <strong>Soro Antielapídico (SAE)</strong> e suporte de ventilação mecânica.</li>
    </ul>
  </li>
  <li><strong>Raiva Humana e Profilaxia Pré e Pós-Exposição (Notificação em até 24h):</strong>
    <ul>
      <li>A raiva é uma encefalomielite viral aguda invariavelmente letal provocada por Rhabdovirus transmitido pela saliva de mamíferos infectados (cães, gatos, morcegos hematófagos e não hematófagos, macacos e raposas);</li>
      <li><em>Classificação dos Acidentes:</em> Leves (arranhaduras superficiais por cão/gato não agressivo) vs Graves (mordeduras em cabeça, pescoço, mãos ou pés; ferimentos profundos ou múltiplos; qualquer contato/arranhadura por <strong>morcegos, animais silvestres ou animais desconhecidos/raivosos</strong>);</li>
      <li><em>Esquema Pós-Exposição em Acidente Grave com Animal Silvestre / Morcego / Cão Suspeito Desaparecido:</em> Lavagem imediata exaustiva com água e sabão por 15 minutos + <strong>Vacina Antirrábica Celular (4 doses nos dias D0, D3, D7 e D14)</strong> associada OBRIGATORIAMENTE à infiltração de <strong>Soro Antirrábico Humano (SAR - 40 UI/kg) ou Imunoglobulina Humana Antirrábica (IGHAR - 20 UI/kg)</strong> no leito da ferida e nos tecidos vizinhos no D0.</li>
    </ul>
  </li>
  <li><strong>Violência Sexual (Notificação Imediata em até 24h):</strong>
    <ul>
      <li>Atendimento multidisciplinar humanizado sem exigência de boletim de ocorrência policial ou autorização judicial;</li>
      <li><em>Profilaxia da Gravidez Indesejada:</em> <strong>Levonorgestrel oral (dose única de 1,5 mg)</strong> administrado idealmente nas primeiras 72 horas (podendo ser utilizado até 120 horas / 5 dias);</li>
      <li><em>Profilaxia do HIV (PEP Sexual):</em> <strong>Tenofovir + Lamivudina + Dolutegravir por 28 dias</strong>, iniciada obrigatoriamente nas primeiras 72 horas;</li>
      <li><em>Profilaxia de ISTs Não Virais:</em> <strong>Ceftriaxona 500 mg IM em dose única</strong> (gonorreia) + <strong>Azitromicina 1g oral em dose única</strong> (clamídia) + <strong>Metronidazol 2g oral em dose única</strong> (tricomoníase);</li>
      <li><em>Profilaxia da Hepatite B:</em> Vacina + Imunoglobulina específica (IGHA) se vítima não imunizada.</li>
    </ul>
  </li>
</ul>
`;

const secDeep2Id = 'investigacao-epidemiologica-e-encerramento-sinan';
const secDeep2Title = 'A Investigação Epidemiológica de Campo, Busca Ativa e Critérios de Encerramento no SINAN';
const secDeep2Html = `
<h3>O Fluxo Operacional da Informação Epidemiológica no SINAN</h3>
<p>O Sistema de Informação de Agravos de Notificação (SINAN) constitui a espinha dorsal da vigilância no Brasil, operando de forma descentralizada e integrada nas três esferas de governo:</p>
<ol>
  <li><strong>Unidade Notificadora Local (Porta de Entrada):</strong> Recepção do caso, identificação da suspeita clínica, atendimento imediato, preenchimento da <strong>Ficha de Notificação Individual (FNI)</strong> e comunicação imediata (se agravo de até 24h) por telefone/e-mail institucional ao setor de vigilância epidemiológica do distrito sanitário ou secretaria municipal;</li>
  <li><strong>Secretaria Municipal de Saúde (SMS):</strong> Digitação da notificação no banco de dados local do SINAN Net/SINAN Web, desencadeamento da equipe de campo para busca ativa de contatos e investigação ambiental, emissão de alertas locais e transmissão semanal dos lotes de dados para a SES;</li>
  <li><strong>Secretaria Estadual de Saúde (SES):</strong> Consolidação estadual, conferência de duplicidades, assessoria técnica aos municípios em surtos de grande magnitude, envio dos lotes de dados semanais para o Ministério da Saúde e articulação com Laboratórios Centrais de Saúde Pública (LACEN);</li>
  <li><strong>Ministério da Saúde (Secretaria de Vigilância em Saúde e Ambiente — SVSA):</strong> Consolidação nacional, análise epidemiológica dos coeficientes nacionais, monitoramento do cumprimento das metas do PNI e notificação à Organização Pan-Americana da Saúde (OPAS/OMS) de eventos internacionais.</li>
</ol>

<h3>Critérios Formais de Encerramento de Casos no SINAN</h3>
<p>Todo caso notificado e investigado deve ser encerrado formalmente no sistema dentro de um prazo regulamentar (habitualmente 60 a 90 dias após a notificação). O encerramento pode ocorrer segundo quatro critérios epidemiológicos oficiais:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Critério de Encerramento Oficial</th>
      <th>Definição Operacional e Exigências Técnicas</th>
      <th>Aplicações Clínicas Práticas</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1. Critério Laboratorial</strong></td>
      <td>Confirmação do agente etiológico ou de marcadores específicos através de métodos laboratoriais validados pelo LACEN/Fiocruz:
        <ul>
          <li>Isolamento do patógeno em cultura microbiológica pura;</li>
          <li>Identificação de material genético por Biologia Molecular (RT-PCR / TRM-TB);</li>
          <li>Sorologia específica: detecção de anticorpos da classe IgM ou soroconversão de IgG com aumento de 4 vezes nos títulos em amostras pareadas colhidas com 14 a 21 dias de intervalo;</li>
          <li>Exame histopatológico com biópsia demonstrando lesões patognomônicas.</li>
        </ul>
      </td>
      <td>Padrão-ouro na confirmação da maioria das infecções (TRM-TB positivo na tuberculose, sorologia IgM reagente no sarampo, RT-PCR positivo na febre amarela).</td>
    </tr>
    <tr>
      <td><strong>2. Critério Clínico-Epidemiológico</strong></td>
      <td>Utilizado quando o paciente <strong>não realizou exames laboratoriais específicos</strong> (ou os exames foram inconclusivos/inadequados por coleta tardia), mas apresenta <strong>quadro clínico compatível e VÍNCULO EPIDEMIOLÓGICO DIRETO COMPROVADO com outro caso confirmado por critério laboratorial</strong> durante o período de transmissibilidade e incubação da doença.</td>
      <td>
        • Em epidemias consolidadas de <strong>Dengue</strong> em municípios com transmissão sustentada (confirma-se dengue na grande maioria dos pacientes por critério clínico-epidemiológico, reservando o teste laboratorial para casos graves, gestantes e idosos);<br>
        • Contato domiciliar de caso de <strong>Sarampo</strong> que desenvolve exantema febril 10 dias após exposição direta.
      </td>
    </tr>
    <tr>
      <td><strong>3. Critério Clínico Puro</strong></td>
      <td>Aplicável a doenças que possuem <strong>expressão clínica e semiológica patognomônica</strong> inquestionável, dispensando exames microbiológicos sofisticados para confirmação diagnóstica.</td>
      <td>
        • <strong>Tétano Acidental / Tétano Neonatal:</strong> O diagnóstico é puramente clínico (trismo, riso sardônico, opistótono e espasmos induzidos por estímulos táteis/sonoros sem alteração de líquor);<br>
        • <strong>Acidentes Ofídicos e Peçonhentos:</strong> Diagnóstico clínico-anamnéstico baseado nas manifestações locais e sistêmicas causadas pelo veneno.
      </td>
    </tr>
    <tr>
      <td><strong>4. Descarte do Caso (Caso Descartado)</strong></td>
      <td>Ocorre quando a investigação clínica e epidemiológica minuciosa conclui que o paciente <strong>não apresentava a doença notificada</strong>, comprovando diagnóstico alternativo ou apresentando resultados laboratoriais negativos em amostras biológicas colhidas no momento e técnica adequados.</td>
      <td>Suspeita inicial de meningite bacteriana com líquor límpido e bacterioscopia/cultura negativas, com evolução afebril atribuída a cefaleia tensional.</td>
    </tr>
  </tbody>
</table>

<h3>A Busca Ativa Retrospectiva e Institucional</h3>
<p>A <strong>busca ativa de casos</strong> é a atividade de campo proativa indispensável para mensurar o volume de subnotificação e garantir que nenhum caso de agravo transmissível grave permaneça oculto na comunidade:</p>
<ul>
  <li><strong>Busca Ativa Domiciliar:</strong> Varredura quarteirão a quarteirão realizada pelos Agentes Comunitários de Saúde (ACS) e técnicos de vigilância em áreas geográficas vizinhas ao domicílio de um caso confirmado de doença de transmissão vetorial ou por gotículas (ex: bloqueio de sarampo em raio de 9 quadras);</li>
  <li><strong>Busca Ativa Institucional / Hospitalar:</strong> Visita periódica sistemática de enfermeiros de vigilância aos estabelecimentos assistenciais de saúde para inspecionar:
    <ul>
      <li>Livros de registro de atendimento do pronto-socorro e triagem de enfermagem;</li>
      <li>Livros de registros de punções lombares e laudos de líquor nos laboratórios de patologia clínica;</li>
      <li>Declarações de Óbito (DO) do Cartório de Registro Civil que citem diagnósticos suspeitos (ex: "óbito por febre a esclarecer", "insuficiência respiratória aguda", "sepse de foco indeterminado");</li>
      <li>Livros de internação de UTI pediátrica pesquisando Paralisias Flácidas Agudas em menores de 15 anos para vigilância da poliomielite.</li>
    </ul>
  </li>
</ul>
`;

const secDeep3Id = 'casos-clinicos-complexos-notificacao-e-bateria';
const secDeep3Title = 'Casos Clínicos de Alta Complexidade e Questões Avançadas de Residência Médica';
const secDeep3Html = `
<div class="book-case">
  <h4>Caso Clínico 3: Vigilância das Paralisias Flácidas Agudas e Erradicação da Pólio</h4>
  <p><strong>Identificação e Queixa:</strong> Menino de 4 anos é admitido na enfermaria de neuropediatria de hospital regional com história de fraqueza muscular rapidamente progressiva iniciada há 3 dias. A mãe relata que a criança apresentou quadro febril baixo e diarreia há 1 semana, seguido por dificuldade para ficar de pé e claudicação. Ao exame neurológico: lúcido, sem sinais meníngeos, hipotonia muscular acentuada em membros inferiores com predomínio no membro inferior direito, com força muscular grau 2 à direita e grau 4 à esquerda (paralisia assimétrica), reflexo patelar e aquileu abolidos à direita (arreflexia osteotendínea profunda) e sensibilidade tátil e dolorosa integralmente preservadas. A caderneta vacinal revela apenas 2 doses de vacina inativada contra poliomielite (VIP) nos primeiros meses de vida, sem doses subsequentes.</p>
  <p><strong>Discussão e Conduta Médica e de Vigilância:</strong></p>
  <ol>
    <li><strong>Definição de Caso Sentinela:</strong> Todo caso de <strong>Paralisia Flácida Aguda (PFA) em menores de 15 anos de idade</strong> (ou em qualquer idade se houver suspeita de poliomielite) constitui evento de <strong>NOTIFICAÇÃO COMPULSÓRIA IMEDIATA (EM ATÉ 24 HORAS)</strong>;</li>
    <li><strong>Racional Sanitário Global:</strong> O Brasil e as Américas possuem certificado de erradicação da circulação do poliovírus selvagem desde 1994. Para manter esse certificado, a OMS exige que todos os países mantenham um sistema sensível capaz de detectar e investigar pelo menos 1 caso de PFA para cada 100.000 crianças menores de 15 anos anualmente;</li>
    <li><strong>Diagnóstico Diferencial e Conduta Laboratorial Obrigatória:</strong> A causa mais prevalente de PFA na infância é a <strong>Síndrome de Guillain-Barré (polineuropatia desmielinizante inflamatória aguda)</strong>, seguida por mielite transversa e meningite viral. Contudo, <strong>É OBRIGATÓRIA A COLETA DE UMA AMOSTRA DE FEZES (cerca de 4 a 8 gramas) ATÉ O 14º DIA DE INÍCIO DO DÉFICIT MOTOR</strong> para pesquisa e isolamento viral do poliovírus selvagem ou vacinal mutante em laboratório de referência nacional (Fiocruz);</li>
    <li><strong>Reavaliação Neurológica dos 60 Dias:</strong> É obrigatório o exame neurológico de reavaliação aos 60 dias de evolução para pesquisar a persistência de sequela motora ou atrofia muscular residual, dado fundamental para o encerramento do caso.</li>
  </ol>
</div>

<div class="book-case">
  <h4>Caso Clínico 4: Malária na Região Sudeste — Dicotomia Geográfica</h4>
  <p><strong>Identificação e Queixa:</strong> Homem de 34 anos, biólogo, residente na cidade de Campinas (SP), comparece à UBS referindo febre alta súbita (39,8 °C) com calafrios trepidantes intensos, sudorese profusa e cefaleia, com episódios recorrentes em dias alternados (febre terçã). Relata que retornou há 12 dias de uma viagem de trabalho ecológico no interior do estado do Amazonas, onde pernoitou em áreas ribeirinhas na floresta. A gota espessa e o teste rápido imunocromatográfico realizados na UBS confirmam a presença de trofozoítos de <em>Plasmodium vivax</em>.</p>
  <p><strong>Discussão e Conduta Médica e de Vigilância:</strong></p>
  <ul>
    <li><strong>Classificação e Periodicidade da Notificação:</strong> A notificação deste caso de malária deve ser realizada de forma <strong>IMEDIATA (EM ATÉ 24 HORAS)</strong> à Secretaria Municipal de Saúde de Campinas e Secretaria de Estado da Saúde de São Paulo;</li>
    <li><strong>O Fundamento da Dicotomia Geográfica:</strong> Na <strong>Região Amazônica (área endêmica)</strong>, a malária é doença de rotina e controle de programa, sendo sua notificação <strong>SEMANAL</strong> no sistema SIVEP-Malária. Contudo, na <strong>Região Extra-Amazônica (estados do Sul, Sudeste, Centro-Oeste e Nordeste fora da bacia amazônica)</strong>, qualquer caso diagnosticado impõe <strong>NOTIFICAÇÃO IMEDIATA EM ATÉ 24 HORAS</strong>, a fim de que as equipes de entomologia e vigilância ambiental verifiquem imediatamente se o caso é importado ou autóctone e realizem o controle vetorial com inseticidas de ação residual em torno da moradia do paciente para impedir o estabelecimento de focos de transmissão autóctone por anofelinos locais;</li>
    <li><strong>Tratamento Clínico do P. vivax:</strong> Esquema padrão de primeira linha do Ministério da Saúde: <strong>Cloroquina por 3 dias</strong> (ação esquizonticida sanguínea rápida) associada a <strong>Primaquina por 7 dias</strong> (ação hipnozoiticida tecidual hepática para prevenir recaídas tardias).</li>
  </ul>
</div>

<h3>Bateria de Questões Comentadas com Distratores Exaustivos</h3>

<h4>Questão 3: UNIFESP — A Notificação Compulsória e a Responsabilidade dos Serviços Privados</h4>
<p><strong>Enunciado:</strong> O diretor técnico de um prestigiado hospital terciário da rede privada de saúde emite uma circular interna orientando os médicos do corpo clínico a "não preencher fichas de notificação compulsória do SUS no atendimento a pacientes particulares e de planos de saúde, cabendo a responsabilidade de vigilância exclusivamente aos serviços públicos municipais". Considerando a Lei Federal nº 6.259/1975, a Lei Federal nº 8.080/1990 e as normas de vigilância epidemiológica, assinale a correta:</p>
<p>A) A circular do diretor é plenamente legal, pois a fiscalização epidemiológica do SUS restringe-se estritamente aos usuários atendidos em unidades públicas ou filantrópicas conveniadas.<br>
B) A circular é manifestamente ilegal e contraria a legislação sanitária brasileira, pois a notificação compulsória de doenças, agravos e eventos de saúde pública é OBRIGATÓRIA para todos os serviços de saúde públicos E privados em território nacional, vinculando todos os profissionais médicos sob pena de sanções penais e ético-disciplinares.<br>
C) Apenas hospitais privados que recebem subsídios de renúncia fiscal são obrigados a notificar doenças infectocontagiosas.<br>
D) A responsabilidade por notificar doenças em pacientes privados é transferida automaticamente para a operadora do plano de saúde, isentando os médicos do hospital.<br>
E) A notificação em serviços privados só é permitida mediante autorização judicial expressa para quebra de sigilo médico do cliente pagante.</p>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
A legislação sanitária federal (Art. 7º da Lei 6.259/75 e Art. 8º da Portaria de Consolidação nº 4/2017) é peremptória: <strong>a notificação compulsória é de cumprimento obrigatório para todos os profissionais de saúde e para todos os estabelecimentos de saúde, públicos e PRIVADOS, em qualquer ponto do território nacional</strong>. O direito à vigilância epidemiológica e à proteção coletiva é de ordem pública e universal, não sofrendo qualquer mitigação pelo fato de o paciente ser atendido na rede privada suplementar. A omissão deliberada configura crime contra a saúde pública tipificado no Art. 269 do Código Penal. Alternativa B correta.</p>

<h4>Questão 4: AMRIGS — Notificação em Violência contra a Mulher e Sigilo</h4>
<p><strong>Enunciado:</strong> Uma mulher de 32 anos comparece ao pronto-atendimento hospitalar acompanhada por vizinha apresentando hematomas periorbitários bilaterais, escoriações em antebraços e equimoses digitais no pescoço decorrentes de agressão física desferida pelo cônjuge em ambiente doméstico. Durante o atendimento médico privativo, a paciente suplica em prantos ao médico para que "não conte a ninguém e não chame a polícia nem faça denúncia, pois tem medo de que o marido a mate". Frente à legislação federal vigente sobre a notificação de violência e ao Código de Ética Médica, qual a conduta legal e sanitária mandatória que o médico deve adotar?</p>
<p>A) Respeitar irrestritamente o pedido da paciente, abstendo-se de registrar a ocorrência no prontuário e de emitir qualquer ficha de notificação.<br>
B) Preencher compulsoriamente a Ficha de Notificação/Investigação de Violência Interpessoal e Autoprovocada do SINAN, encaminhando-a ao serviço de vigilância epidemiológica municipal em fluxo semanal sigiloso para fins estatísticos e de proteção social em saúde, acolhendo a paciente na rede de apoio assistencial, esclarecendo que a notificação epidemiológica em saúde NÃO se confunde com registro de ocorrência policial contra a vontade da mulher adulta capaz.<br>
C) Acionar imediatamente a Polícia Militar e voz de prisão ao agressor no domicílio sem o consentimento da vítima.<br>
D) Exigir que a paciente registre boletim de ocorrência na Delegacia da Mulher como condição prévia para receber o curativo e a prescrição médica.<br>
E) Apenas notificar a violência se houver fratura óssea demonstrada ao raio-X.</p>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
A notificação de casos suspeitos ou confirmados de violência doméstica e intrafamiliar é <strong>COMPULSÓRIA no âmbito do SUS (alimentando o SINAN em caráter estritamente sigiloso e de proteção em saúde)</strong>. Essa notificação é epidemiológica e sanitária, vinculando a paciente à rede de assistência social, psicológica e de saúde da mulher. Ela <strong>NÃO é uma denúncia policial</strong>; a mulher adulta e mentalmente capaz tem a prerrogativa de decidir sobre a representação criminal contra o agressor (salvo nos casos de violência contra crianças, adolescentes, idosos ou incapazes, onde a comunicação aos Conselhos Tutelares/Ministério Público é compulsória imediata). Condicionar o atendimento médico ao boletim de ocorrência (D) ou ignorar o agravo (A) constituem faltas éticas graves. Alternativa B correta.</p>
`;

payload.o = payload.o.filter(item => item[0] !== secDeep1Id && item[0] !== secDeep2Id && item[0] !== secDeep3Id && item[0] !== 'referencias');
payload.q = payload.q.filter(item => item[0] !== secDeep1Id && item[0] !== secDeep2Id && item[0] !== secDeep3Id && item[0] !== 'referencias');

payload.o.push([secDeep1Id, secDeep1Title]);
payload.q.push([secDeep1Id, 0, htmlToBlocks(secDeep1Title, secDeep1Html)]);

payload.o.push([secDeep2Id, secDeep2Title]);
payload.q.push([secDeep2Id, 0, htmlToBlocks(secDeep2Title, secDeep2Html)]);

payload.o.push([secDeep3Id, secDeep3Title]);
payload.q.push([secDeep3Id, 0, htmlToBlocks(secDeep3Title, secDeep3Html)]);

payload.o.push(['referencias', 'Referências Oficiais e Diretrizes']);
payload.q.push([
  'referencias',
  0,
  [
    ['2', 'Referências Oficiais e Diretrizes'],
    [
      'o',
      [
        '<a href="https://www.gov.br/saude/pt-br/assuntos/vigilancia-em-saude" target="_blank" rel="noopener noreferrer">Ministério da Saúde — Portaria de Consolidação GM/MS nº 4/2017 e Portaria de Consolidação GM/MS nº 5/2017</a>',
        '<a href="https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/n/notificacao-compulsoria" target="_blank" rel="noopener noreferrer">Ministério da Saúde — Lista Nacional de Notificação Compulsória</a>',
        '<a href="https://www.planalto.gov.br/ccivil_03/leis/l6259.htm" target="_blank" rel="noopener noreferrer">Lei Federal nº 6.259/1975 — Vigilância Epidemiológica e Notificação</a>',
        '<a href="https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm" target="_blank" rel="noopener noreferrer">Decreto-Lei nº 2.848/1940 — Código Penal Brasileiro (Art. 269)</a>',
        '<a href="https://portal.cfm.org.br/etica-medica/codigo-de-etica-medica/" target="_blank" rel="noopener noreferrer">Conselho Federal de Medicina — Código de Ética Médica</a>'
      ],
      'reference-list'
    ]
  ]
]);

saveBook(payload);
console.log('Aula 075 expandida e salva com sucesso!');
