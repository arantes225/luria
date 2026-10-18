import { saveBook } from './bloco-04-utils.mjs';

const book = {
  slug: 'vigilancia-ambiental-e-saude-do-trabalhador',
  title: 'Vigilância Ambiental e Saúde do Trabalhador',
  area: 'Medicina Preventiva',
  materia: 'Saúde do Trabalhador e Vigilância Ambiental',
  description: 'Tratado completo de Vigilância em Saúde Ambiental e Saúde do Trabalhador no SUS para concursos de Residência Médica e ENAMED: bases constitucionais (Art. 200 da CF/88, Lei 8.080/90, Portarias de Consolidação nº 2 e 5), Política Nacional de Saúde do Trabalhador e da Trabalhadora (PNSTT); Classificação das Doenças Relacionadas ao Trabalho segundo Richard Schilling (Grupos I, II e III); pneumoconioses fibrogênicas e não fibrogênicas (silicose, asbestose, bissinose, siderose); LER/DORT e ergonomia; Perda Auditiva Induzida por Ruído (PAIR); intoxicações ocupacionais por metais pesados (saturnismo, hidrargirismo, benzenismo, agrotóxicos inibidores da colinesterase); Síndrome de Burnout (CID-11 QD85); Acidentes de Trabalho (típico, trajeto, equiparados) e Comunicação de Acidente de Trabalho (CAT); RENAST e CEREST; Vigilância em Saúde Ambiental (VIGIAMB: VIGIAGUA, VIGIAR, VIGISOLO/VIGIPEQ e VIGIDESASTRES); contaminantes ambientais emergentes e desastres tecnológicos; 4 casos clínicos estruturados e questões comentadas com análise minuciosa de distratores.',
  sections: [
    {
      id: 'marcos-legais-e-politica-nacional-trabalhador',
      title: '1. Marcos Legais, Doutrinários e a Política Nacional de Saúde do Trabalhador (PNSTT)',
      body_html: `
<h3>Bases Constitucionais e Legais da Saúde do Trabalhador no SUS</h3>
<p>A incorporação da Saúde do Trabalhador como responsabilidade precípua do Estado no Brasil representa uma das maiores vitórias do movimento da Reforma Sanitária. Historicamente tutelada pelo Ministério do Trabalho sob uma ótica securitária, monetarizada, compensatória e fiscalizatória restrita aos ambientes formais fabris, a proteção à saúde do trabalhador foi formalmente alçada à condição de <strong>competência constitucional expressa do Sistema Único de Saúde (SUS)</strong> com a promulgação da Carta Magna de 1988.</p>
<p>O <strong>Artigo 200, inciso II da Constituição Federal de 1988</strong> estabelece como dever inescusável do SUS:</p>
<blockquote><em>"Executar as ações de vigilância sanitária e epidemiológica, bem como as de saúde do trabalhador."</em></blockquote>
<p>A Lei Federal nº 8.080/1990 (Lei Orgânica da Saúde), em seu Artigo 6º, § 3º, detalha minuciosamente o escopo material das ações de saúde do trabalhador no SUS:</p>
<ul>
  <li><strong>Assistência ao Trabalhador Vítima de Acidentes de Trabalho ou Portador de Doença Profissional/Ocupacional:</strong> Diagnóstico precoce, tratamento, reabilitação física e psicossocial no âmbito da atenção primária, especializada e terciária;</li>
  <li><strong>Vigilância Epidemiológica dos Agravos Relacionados ao Trabalho:</strong> Notificação compulsória sistemática no SINAN, investigação de nexo causal, monitoramento de acidentes graves/fatais e rastreamento de doenças ocupacionais;</li>
  <li><strong>Vigilância Sanitária dos Ambientes e Processos de Trabalho:</strong> Fiscalização, intervenção técnica e sanitária nos locais de trabalho para eliminação ou controle de riscos físicos, químicos, biológicos, ergonômicos e psicossociais, inclusive com poderes legais para interditar máquinas, setores ou estabelecimentos que apresentem perigo iminente à integridade física do trabalhador;</li>
  <li><strong>Informação ao Trabalhador:</strong> Garantia do direito indisponível do trabalhador e de suas representações sindicais de serem informados previamente sobre os riscos ocupacionais a que estão expostos e os resultados de pesquisas e avaliações ambientais.</li>
</ul>

<h3>A Política Nacional de Saúde do Trabalhador e da Trabalhadora (PNSTT)</h3>
<p>Instituída pela Portaria GM/MS nº 1.823/2012 e consolidada na Portaria de Consolidação GM/MS nº 2/2017, a <strong>Política Nacional de Saúde do Trabalhador e da Trabalhadora (PNSTT)</strong> rege as diretrizes operacionais do SUS para a atenção integral à saúde da população trabalhadora urbana e rural, do setor formal ou informal, autônomos, temporários, cooperativados, servidores públicos, terceirizados e desempregados. Seus princípios basilares preconizam:</p>
<ol>
  <li><strong>Universalidade do Cuidado:</strong> Todo trabalhador é sujeito de direito do SUS, independentemente do tipo de vínculo empregatício ou contribuição previdenciária ao INSS;</li>
  <li><strong>Transversalidade e Integralidade:</strong> As ações de saúde do trabalhador não constituem um serviço estanque, mas perpassam obrigatoriamente todos os níveis de complexidade da Rede de Atenção à Saúde (RAS), tendo a Atenção Primária à Saúde (APS / Estratégia Saúde da Família) como ordenadora do cuidado e coordenadora do acompanhamento longitudinal no território;</li>
  <li><strong>Superação do Paradigma da Higiene e Medicina do Trabalho Tradicional:</strong> Supera-se o modelo centrado na monetarização do risco (adicionais de insalubridade e periculosidade) e na mera adaptação do indivíduo ao posto de trabalho, afirmando o imperativo ético de <em>modificar e transformar os processos de trabalho</em> para torná-los promotores de saúde e emancipação humana;</li>
  <li><strong>Precipuamente Preventiva e Intersetorial:</strong> Articulação contínua entre saúde, trabalho, previdência social, meio ambiente, educação e sistema judiciário (Ministério Público do Trabalho — MPT).</li>
</ol>

<h3>A Rede Nacional de Atenção Integral à Saúde do Trabalhador (RENAST) e os CEREST</h3>
<p>Para viabilizar a retaguarda técnica e pedagógica nas macrorregiões de saúde, a Portaria GM/MS nº 1.679/2002 criou a <strong>Rede Nacional de Atenção Integral à Saúde do Trabalhador (RENAST)</strong>, articulando a rede assistencial e de vigilância através dos <strong>Centros de Referência em Saúde do Trabalhador (CEREST)</strong>, organizados nas esferas estadual e regional:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Dimensão do CEREST</th>
      <th>Papel Técnico-Político no SUS</th>
      <th>O que o CEREST NÃO Deve Fazer (Pegadinhas de Concurso)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Função de Apoio Matricial e Retaguarda Especializada</strong></td>
      <td>Presta consultoria técnica, apoio matricial clínico e pedagógico às equipes de Atenção Primária (eSF/eMulti) e da Rede de Urgência/Emergência para investigação de nexo causal técnico, diagnósticos complexos de doenças profissionais e orientação para reabilitação profissional.</td>
      <td><strong>NÃO É uma Unidade Básica de Saúde comum de livre demanda:</strong> O CEREST não substitui o posto de saúde nem atua como pronto-atendimento ambulatorial geral para queixas corriqueiras.</td>
    </tr>
    <tr>
      <td><strong>Vigilância nos Ambientes de Trabalho (VISAT)</strong></td>
      <td>Realiza inspeções sanitárias <em>in loco</em>, mapeamento de processos produtivos de risco, investigação sanitária de surtos ocupacionais e acidentes de trabalho com óbito ou mutilações em conjunto com a Vigilância Sanitária e MPT.</td>
      <td><strong>NÃO É um Serviço Especializado em Engenharia de Segurança e em Medicina do Trabalho (SESMT):</strong> O CEREST não realiza exames admissionais, demissionais ou periódicos de empresas privadas; tais exames são ônus financeiro exclusivo dos empregadores (Norma Regulamentadora nº 7 — NR-7).</td>
    </tr>
    <tr>
      <td><strong>Produção e Gestão da Informação Epidemiológica</strong></td>
      <td>Alimenta e qualifica o SINAN, investiga subnotificações, monitora indicadores sentinelas e elabora relatórios de situação epidemiológica para controle social nos Conselhos de Saúde.</td>
      <td><strong>NÃO É órgão pericial de concessão de benefícios previdenciários:</strong> O CEREST não concede aposentadoria ou auxílio-doença, atribuição restrita à Perícia Médica Federal do Instituto Nacional do Seguro Social (INSS).</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'classificacao-de-schilling',
      title: '2. A Classificação de Richard Schilling das Doenças Relacionadas ao Trabalho',
      body_html: `
<h3>O Marco Conceitual de Schilling (1984)</h3>
<p>A determinação social do adoecimento no trabalho é multifacetada e raramente segue um modelo biológico puramente linear. Para categorizar a multiplicidade de relações causais existentes entre o exercício profissional e o desencadeamento ou agravamento de afecções clínicas, o médico e epidemiologista britânico Richard Schilling propôs em 1984 uma classificação tripartite mundialmente consagrada, adotada oficialmente pelo Ministério da Saúde do Brasil e objeto constante de questões nas provas do ENAMED e de Residência Médica:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Grupo de Schilling</th>
      <th>Papel Causal do Trabalho</th>
      <th>Características Fisiopatológicas e Clínicas</th>
      <th>Exemplos Típicos Clássicos de Prova</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Grupo I de Schilling</strong></td>
      <td>O trabalho é <strong>CAUSA NECESSÁRIA</strong> (Condição <em>sine qua non</em>)</td>
      <td>Sem a exposição ocupacional direta e específica ao agente etiológico agressivo no ambiente laboral, a enfermidade clínica <strong>NÃO existiria</strong>. São as chamadas "doenças profissionais típicas" ou tecnopatias estritas. Há um nexo biológico e causal direto entre a intensidade/tempo de exposição e o dano celular tecidual.</td>
      <td>
        • <strong>Silicose</strong> (inalação crônica de poeira de sílica livre cristalina);<br>
        • <strong>Asbestose / Mesotelioma</strong> (exposição crônica a fibras de amianto);<br>
        • <strong>Saturnismo</strong> (intoxicação ocupacional por chumbo inorgânico);<br>
        • <strong>Benzenismo</strong> (intoxicação hematológica ocupacional por benzeno);<br>
        • <strong>Hidrargirismo</strong> (intoxicação por vapor de mercúrio);<br>
        • <strong>Bissinose</strong> (inalação de poeiras de algodão em indústrias têxteis).
      </td>
    </tr>
    <tr>
      <td><strong>Grupo II de Schilling</strong></td>
      <td>O trabalho é <strong>FATOR CONTRIBUTIVO</strong> em etiologia multicausal (Concausa direta)</td>
      <td>A doença apresenta etiologia clínica multifatorial complexa (fatores genéticos, ambientais, nutricionais, metabólicos e comportamentais), porém as condições operacionais, sobrecargas físicas ou exigências psicossociais do trabalho <strong>contribuem decisivamente para o seu surgimento, aceleração ou maior gravidade clínica</strong>.</td>
      <td>
        • <strong>Hipertensão Arterial Sistêmica (HAS)</strong> e <strong>Doença Arterial Coronariana (Infarto Agudo do Miocárdio)</strong> associadas ao trabalho sob estresse crônico com alta demanda e baixo controle (modelo de Karasek) e turnos noturnos alternados;<br>
        • <strong>Neoplasias Malignas de Bexiga</strong> em trabalhadores expostos a aminas aromáticas (indústria de tinturas e borrachas);<br>
        • <strong>Varizes de Membros Inferiores</strong> em profissionais que trabalham em ortostatismo prolongado estático (garçons, seguranças, cirurgiões);<br>
        • <strong>Síndrome de Burnout</strong> (esgotamento profissional em ocupações de cuidado e alta exigência emocional).
      </td>
    </tr>
    <tr>
      <td><strong>Grupo III de Schilling</strong></td>
      <td>O trabalho é <strong>PROVOCADOR DE DISTÚRBIO LATENTE OU AGRAVADOR</strong> de doença preexistente</td>
      <td>O indivíduo já é portador constitucional de uma doença crônica de base ou de uma suscetibilidade biológica latente assintomática, mas a exposição ocupacional atua como gatilho agudo de descompensação ou acelera a perda funcional do órgão.</td>
      <td>
        • <strong>Asma Brônquica Ocupacional</strong> (desencadeada ou agravada por poeiras orgânicas, isocianatos ou farináceos em padarias);<br>
        • <strong>Dermatite de Contato Alérgica</strong> (agravamento em pedreiros pelo cromo presente no cimento);<br>
        • <strong>Bronquite Crônica e Enfisema</strong> agravados por exposição a vapores químicos irritantes;<br>
        • <strong>Epilepsia</strong> com crises deflagradas por privação crônica de sono em motoristas profissionais de longas jornadas.
      </td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'pneumoconioses-fibrogenicas-e-nao-fibrogenicas',
      title: '3. Pneumoconioses: Silicose, Asbestose e Diagnóstico Diferencial de Poeiras Minerais',
      body_html: `
<h3>Conceito e Mecanismos Gerais das Pneumoconioses</h3>
<p>As <strong>pneumoconioses</strong> constituem um grupo heterogêneo de pneumopatias parenquimatosas crônicas decorrentes do acúmulo patológico de poeiras minerais inorgânicas nos pulmões, associado à resposta tecidual inflamatória e cicatrizante celular do hospedeiro. A deposição de partículas inaladas no parênquima pulmonar depende criticamente do seu diâmetro aerodinâmico:</p>
<ul>
  <li>Partículas maiores que 10 $\mu$m são impactadas e retidas pelas vibrissas nasais e epitélio ciliado da nasofaringe;</li>
  <li>Partículas entre 5 e 10 $\mu$m depositam-se nas bifurcações brônquicas e são eliminadas pelo aparelho mucociliar;</li>
  <li><strong>Partículas Respiráveis (&lt; 2,5 a 5 $\mu$m):</strong> Penetram profundamente nas vias aéreas distais, alcançando os alvéolos e bronquíolos respiratórios. Ali, não há depuração mucociliar, sendo fagocitadas por macrófagos alveolares, o que deflagra a cascata inflamatória fibrogênica crônica.</li>
</ul>

<h3>1. Silicose: A Pneumoconiose Mais Prevalente no Brasil</h3>
<p>A <strong>silicose</strong> é causada pela inalação continuada de partículas microscópicas de <strong>sílica livre cristalina (quartzo, cristobalita e tridimita)</strong>. No Brasil, atinge trabalhadores da mineração subterrânea de ouro e carvão, perfuração de poços artesianos, pedreiras de britagem e granito, corte e polimento de pedras ornamentais (pedra-sabão, mármore, ardósia), cerâmica, fundições metálicas, fabricação de vidro e jateamento de areia (o jateamento de areia a seco para limpeza de tanques e embarcações é formalmente PROIBIDO no Brasil pela Portaria MTE nº 99/2004 devido à extrema agressividade respiratória).</p>
<p><strong>Fisiopatologia Fibrogênica do Nódulo Silicótico:</strong></p>
<ol>
  <li>As partículas inaladas de sílica cristalina são fagocitadas pelos macrófagos alveolares;</li>
  <li>Na superfície da sílica, radicais livres altamente oxidantes lisam a membrana dos fagolisossomos dos macrófagos, liberando enzimas proteolíticas diretamente no citoplasma e deflagrando a <strong>apoptose maciça do macrófago</strong>;</li>
  <li>A morte celular libera mediadores pró-inflamatórios e pró-fibrogênicos potentes: TNF-$\alpha$, Interleucina-1 (IL-1$\beta$), Fator de Crescimento Derivado de Plaquetas (PDGF) e Fator Transformador do Crescimento Beta (TGF-$\beta$);</li>
  <li>Esses mediadores recrutam fibroblastos, que sintetizam matriz colágena acelular disposta concentricamente ("aspecto em casca de cebola"), circundada por uma coroa de linfócitos e macrófagos carregados de pigmento, formando o clássico <strong>nódulo silicótico</strong>;</li>
  <li>Com o tempo, os nódulos sofrem hialinização central e confluem, formando massas fibróticas colossais (Fibrose Maciça Progressiva — FMP).</li>
</ol>

<p><strong>Apresentação Clínica e Formas Evolutivas:</strong></p>
<ul>
  <li><strong>Forma Crônica Simples (Mais Comum):</strong> Surge após 10 a 20 anos ou mais de exposição contínua a níveis baixos a moderados de poeira. O paciente é tipicamente oligossintomático ou assintomático nas fases iniciais; a dispneia aos esforços e tosse surgem tardiamente com a progressão da fibrose;</li>
  <li><strong>Forma Acelerada:</strong> Manifesta-se entre 5 e 10 anos de exposição a concentrações elevadas de poeira, progredindo rapidamente para insuficiência respiratória e cor pulmonale;</li>
  <li><strong>Forma Aguda (Silicoproteinose):</strong> Ocorre após meses a poucos anos (&lt; 2 a 5 anos) de exposição maciça e desprotegida a poeiras ultra-concentradas (como em cavadores de poços manuais ou jateadores). Causa preenchimento alveolar por exsudato proteináceo rico em fosfolipídios PAS-positivo (idêntico à proteinose alveolar pulmonar), evoluindo com hipoxemia grave e óbito em curto prazo.</li>
</ul>

<p><strong>Padrão Radiológico (Radiografia de Tórax OIT e TC de Alta Resolução):</strong></p>
<ul>
  <li>Predomínio exuberante nos <strong>lobos superiores e porções posteriores dos pulmões</strong>;</li>
  <li>Múltiplas opacidades nodulares pequenas, arredondadas e bem delimitadas (&lt; 10 mm);</li>
  <li>Calcificação de linfonodos hilares e mediastinais na periferia, conferindo o clássico padrão patognomônico em <strong>"Casca de Ovo" (<em>Eggshell Calcification</em>)</strong>;</li>
  <li>A evolução para a forma complicada é definida pelo surgimento de <strong>Massas de Fibrose Maciça Progressiva (conglomerados &gt; 10 mm ou &gt; 20 mm)</strong> nos lobos superiores, que tracionam e distorcem as estruturas anatômicas hilares e causam enfisema bolhoso compensatório perilesional.</li>
</ul>

<p><strong>Complicações Críticas da Silicose:</strong></p>
<ul>
  <li><strong>Silicotuberculose:</strong> A disfunção crônica dos macrófagos alveolares induzida pela sílica destrói as defesas locais contra micobactérias. O paciente silicótico tem um <strong>risco relativo até 30 vezes maior de desenvolver tuberculose pulmonar ativa</strong>. Toda piora clínica rápida, febre vespertina, emagrecimento, hemoptise ou escavação de nódulo em silicótico impõe a investigação imediata de tuberculose ativa por TRM-TB e baciloscopia;</li>
  <li><strong>Câncer de Pulmão:</strong> A IARC/OMS classifica a sílica livre cristalina como <em>Carcinógeno Humano do Grupo 1</em> (causador comprovado de neoplasia brônquica);</li>
  <li><strong>Doenças Autoimunes / Síndrome de Caplan:</strong> Associação de nódulos reumatoides pulmonares volumosos múltiplos com Artrite Reumatoide em trabalhadores expostos a poeiras minerais. Maior risco de Esclerose Sistêmica (Síndrome de Erasmus).</li>
</ul>

<h3>2. Asbestose: O Amianto e Suas Repercussões Pleurais e Parenquimatosas</h3>
<p>A <strong>asbestose</strong> é a fibrose intersticial pulmonar difusa provocada pela inalação crônica de fibras microscópicas de <strong>asbesto (amianto)</strong>, mineral fibroso outrora amplamente utilizado na construção civil (telhas onduladas de cimento-amianto, caixas d'água), materiais de isolamento térmico e acústico, e lonas/pastilhas de freio automotivo. O amianto encontra-se <strong>definitivamente banido no território brasileiro por decisão vinculante do Supremo Tribunal Federal (STF) na ADI 4066 em novembro de 2017</strong>, em face da sua inquestionável carcinogenicidade humana.</p>
<p><strong>Diferenças Fisiopatológicas e Radiológicas Fundamentais: Silicose vs Asbestose:</strong></p>
<table class="book-table">
  <thead>
    <tr>
      <th>Parâmetro de Comparação</th>
      <th>Silicose (Poeira de Quartzo / Sílica)</th>
      <th>Asbestose (Fibras de Amianto / Asbesto)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Topografia Pulmonar Preferencial</strong></td>
      <td><strong>Lobos Superiores</strong> e segmentos posteriores pulmonares.</td>
      <td><strong>Lobos Inferiores</strong> e regiões subpleurais periféricas (padrão de pneumonia intersticial usual / fibrose basal com bronquiolectasias de tração).</td>
    </tr>
    <tr>
      <td><strong>Acometimento Pleural</strong></td>
      <td>Raro; pleura habitualmente preservada nas formas simples.</td>
      <td><strong>Acometimento Pleural Marcante e Quase Universal:</strong> Formação de <strong>placas pleurais parietais fibrohialinas calcificadas</strong> (bilaterais ao longo das cúpulas diafragmáticas e arcos costais posteriores) e derrames pleurais exsudativos benignos.</td>
    </tr>
    <tr>
      <td><strong>Achados Microscópicos Específicos</strong></td>
      <td>Nódulo silicótico concêntrico hialinizado acelular em "casca de cebola".</td>
      <td><strong>Corpúsculos de Asbesto (Corpos Ferruginosos):</strong> Fibras de amianto revestidas por uma bainha marrom-dourada de ferritina e hemossiderina, com extremidades alargadas em forma de haltere.</td>
    </tr>
    <tr>
      <td><strong>Neoplasias Associadas</strong></td>
      <td>Câncer de pulmão brônquico (adenocarcinoma e carcinoma epidermoide).</td>
      <td>
        • <strong>Carcinoma Broncogênico:</strong> Risco multiplicado exponencialmente em tabagistas expostos ao amianto (efeito sinérgico multiplicativo);<br>
        • <strong>Mesotelioma Maligno de Pleura e Peritônio:</strong> Neoplasia altamente letal com período de latência prolongado de <strong>30 a 50 anos</strong>, que se desenvolve mesmo após exposições ocupacionais breves ou ambientais de baixa intensidade (não requer asbestose prévia!).
      </td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'ler-dort-e-saude-auditiva-pair',
      title: '4. LER/DORT e Perda Auditiva Induzida por Ruído (PAIR)',
      body_html: `
<h3>LER/DORT: Distúrbios Osteomusculares Relacionados ao Trabalho</h3>
<p>As <strong>Lesões por Esforços Repetitivos / Distúrbios Osteomusculares Relacionados ao Trabalho (LER/DORT)</strong> constituem a maior causa de absenteísmo, incapacidade temporária e concessão de auxílio por incapacidade temporária acidentária no Brasil. A denominação DORT foi incorporada pelo Ministério da Saúde e Previdência Social para explicitar que a gênese desses distúrbios não se limita exclusivamente ao movimento repetitivo estrito, mas abrange um complexo de sobrecargas biomecânicas e ergonômicas.</p>
<p><strong>Fatores de Risco Ergonômicos Determinantes (Norma Regulamentadora nº 17 — NR-17):</strong></p>
<ul>
  <li>Repetitividade contínua de movimentos com ciclos de trabalho inferiores a 30 segundos;</li>
  <li>Sobrecarga muscular estática (manutenção de posturas desfavoráveis ou viciosas por períodos prolongados, como flexão cervical mantida ou braços elevados acima da linha dos ombros);</li>
  <li>Aplicação de força excessiva manual com pinça digital pontual;</li>
  <li>Compressão mecânica localizada de tecidos nervosos ou vasculares (ex: apoio de punhos em superfícies cortantes);</li>
  <li>Vibração segmentar mão-braço (uso de furadeiras, motosserras, britadeiras);</li>
  <li>Fatores de organização do trabalho: ausência de pausas fisiológicas programadas, cobrança excessiva de produtividade, metas inatingíveis, jornadas prolongadas com horas extras sistemáticas e impossibilidade de controlar o ritmo de trabalho.</li>
</ul>

<p><strong>Principais Formas Clínicas de LER/DORT:</strong></p>
<ul>
  <li><strong>Síndrome do Túnel do Carpo (STC):</strong> Compressão do <strong>Nervo Mediano</strong> sob o retináculo dos flexores no punho. Manifesta-se por parestesias, dormência, queimação e dor nas faces palmares dos três primeiros dedos e metade radial do quarto dedo, com piora noturna clássica. Testes semiológicos provocativos de escolha:
    <ul>
      <li><strong>Sinal de Tinel:</strong> Disparo de parestesias no território do mediano à percussão digital suave da face volar do punho;</li>
      <li><strong>Teste de Phalen:</strong> Manutenção dos punhos em flexão máxima forçada de 90° por 60 segundos com as faces dorsais das mãos unidas, reproduzindo as parestesias nos dedos.</li>
    </ul>
  </li>
  <li><strong>Tendinite / Tenossinovite de De Quervain:</strong> Inflamação dos tendões do <strong>Abdutor Longo do Polegar</strong> e <strong>Extensor Curto do Polegar</strong> no primeiro compartimento dorsal do punho (comum em digitadores, costureiras, operadores de telemarketing e mães que sustentam lactentes). Teste semiológico patognomônico:
    <ul>
      <li><strong>Manobra de Finkelstein:</strong> O examinador instrui o paciente a fletir o polegar para a palma da mão e fechar os quatro dedos sobre ele formando um punho cerrado; em seguida, o examinador realiza a pronação com desvio ulnar forçado e passivo do punho, desencadeando dor lancinante na topografia da estilóide radial.</li>
    </ul>
  </li>
  <li><strong>Epicondilite Lateral ("Cotovelo de Tenista"):</strong> Tendinopatia dos extensores de punho e dedos (em especial o músculo extensor radial curto do carpo) no epicôndilo lateral do úmero, comum em mecânicos, operadores de britadeira e carpinteiros. Dor à extensão resistida do punho com cotovelo estendido (Teste de Cozen);</li>
  <li><strong>Epicondilite Medial ("Cotovelo de Golfista"):</strong> Tendinopatia dos músculos flexores-pronadores no epicôndilo medial do úmero.</li>
</ul>

<h3>Perda Auditiva Induzida por Ruído (PAIR) Ocupacional</h3>
<p>A <strong>PAIR</strong> é uma das afecções ocupacionais mais prevalentes e preveníveis na indústria manufatureira, metalúrgica, aeroportuária e têxtil. Decorre da exposição continuada a níveis de pressão sonora elevados (&gt; 85 dB(A) por jornada de 8 horas diárias segundo a NR-15 sem uso de Equipamento de Proteção Individual — EPI adequado).</p>
<p><strong>Critérios Diagnósticos e Características Audiométricas Patognomônicas da PAIR:</strong></p>
<table class="book-table">
  <thead>
    <tr>
      <th>Critério Fisiológico / Clínico</th>
      <th>Expressão Médica e Audiométrica Oficial (Portaria GM/MS nº 19/1998)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Tipo de Perda Auditiva</strong></td>
      <td><strong>Sensório-Neural</strong> (perceptiva), decorrente da destruição mecânica e metabólica irreversível das células ciliadas da cóclea (órgão de Corti) no ouvido interno. Não há acometimento condutivo (tímpano e cadeia ossicular normais).</td>
    </tr>
    <tr>
      <td><strong>Lateralidade e Simetria</strong></td>
      <td><strong>Quase invariavelmente BILATERAL e SIMÉTRICA</strong>. Traçados audiológicos assimétricos sugerem exposição a ruído de impacto lateralizado (ex: tiro com arma de fogo) ou patologias retrococleares não ocupacionais (como Schwannoma vestibular / neurinoma do acústico).</td>
    </tr>
    <tr>
      <td><strong>Reversibilidade</strong></td>
      <td><strong>IRREVERSÍVEL e PERMANENTE</strong>. Não há regeneração das células ciliadas lesadas nem tratamento clínico medicamentoso ou cirúrgico restaurador. Contudo, <strong>cessada a exposição ao ruído ocupacional, A PERDA AUDITIVA NÃO PROGRIDE MAIS</strong>.</td>
    </tr>
    <tr>
      <td><strong>Morfologia da Curva Audiométrica</strong></td>
      <td>Presença clássica da <strong>Gota Acústica / Entalhe Audiométrico (Notch)</strong>: a perda de acuidade auditiva inicia-se seletivamente nas altas frequências de <strong>3.000, 4.000 ou 6.000 Hz</strong>, com recuperação parcial na frequência ultra-alta de 8.000 Hz. As frequências graves e médias de conversação (500, 1.000 e 2.000 Hz) são preservadas nas fases iniciais, razão pela qual o trabalhador demora anos para perceber a perda comunicativa.</td>
    </tr>
    <tr>
      <td><strong>Sintomas Associados</strong></td>
      <td>Zumbido (<em>tinnitus</em>) contínuo de alta frequência e intolerância a sons intensos decorrente do fenômeno de <strong>Recrutamento Auditivo</strong> (lesão coclear).</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'toxicologia-ocupacional-metais-agrotoxicos',
      title: '5. Toxicologia Ocupacional: Saturnismo, Benzenismo, Hidrargirismo e Agrotóxicos',
      body_html: `
<h3>Principais Síndromes Toxicológicas Ocupacionais</h3>

<h3>1. Saturnismo (Intoxicação Ocupacional por Chumbo Inorgânico)</h3>
<p>Ocorre em fabricantes e recicladores de baterias automotivas de chumbo-ácido, indústrias de munições, fundições de bronze e soldas metálicas. O chumbo absorvido liga-se aos eritrócitos e deposita-se preferencialmente no tecido ósseo (onde permanece por décadas). Mecanismo patogênico central: inibição enzimática alostérica das enzimas da via de síntese do heme (principalmente a <strong>Ácido Delta-Aminolevulínico Desidratase — ALA-D</strong> e a <strong>Ferroquelatase</strong>), bloqueando a incorporação de ferro à protoporfirina IX.</p>
<p><strong>Quadro Clínico e Laboratorial Clássico:</strong></p>
<ul>
  <li><strong>Trato Gastrointestinal:</strong> Cólica saturnina (dor abdominal em cólica intensa, difusa e refratária com abdome plano sem peritonite), constipação intestinal crônica e náuseas;</li>
  <li><strong>Hematológico:</strong> Anemia normocítica ou microcítica com reticulocitose discreta e presença de <strong>pontilhado basófilo grosseiro nos eritrócitos</strong> ao sangue periférico (grumos ribossomais precipitados);</li>
  <li><strong>Neurológico:</strong> Neuropatia periférica motora pura que afeta preferencialmente o <strong>Nervo Radial</strong>, determinando a clássica <strong>"Mão Caída" / Queda do Punho</strong> por paresia dos extensores dos dedos e do punho sem alteração sensitiva significativa; em exposições graves, encefalopatia saturnina com convulsões e coma;</li>
  <li><strong>Semiologia Bucal:</strong> Deposição de sulfeto de chumbo nas gengivas em contato com placa bacteriana, formando a <strong>Linha de Burton</strong> (orla gengival azulada ou enegrecida junto aos dentes incisivos e caninos);</li>
  <li><strong>Marcadores Biológicos:</strong> Dosagem de <strong>Chumbo no sangue total (Plumbemia)</strong> e aumento do ácido delta-aminolevulínico na urina (ALA-U);</li>
  <li><strong>Tratamento Específico:</strong> Afastamento imediato da exposição e terapia quelante com <strong>DMSA oral (Succimer)</strong> ou <strong>EDTA Cálcico dissódico IV</strong> nos casos graves sintomáticos.</li>
</ul>

<h3>2. Benzenismo (Mielotoxicidade por Benzeno)</h3>
<p>O benzeno é um hidrocarboneto aromático volátil presente na destilação do petróleo, siderurgias (coquarias) e em postos de combustíveis (frentistas). Seus metabólitos reativos (hidroquinona e benzoquinona) induzem estresse oxidativo na medula óssea:</p>
<ul>
  <li><strong>Mielotoxicidade:</strong> Hipoplasia ou aplasia medular com pancitopenia progressiva (neutropenia, trombocitopenia e anemia macrocítica precoce);</li>
  <li><strong>Carcinogênese Ocupacional Comprovada:</strong> Risco comprovado de <strong>Leucemia Mieloide Aguda (LMA)</strong> e Síndromes Mielodisplásicas (SMD);</li>
  <li><strong>Regra Propedêutica:</strong> O hemograma completo com contagem de plaquetas é o exame fundamental de rastreamento periódico dos trabalhadores expostos. Quedas persistentes de leucócitos ou plaquetas impõem investigação hematológica e afastamento.</li>
</ul>

<h3>3. Hidrargirismo (Intoxicação por Mercúrio)</h3>
<p>Ocorre em garimpos ilegais de ouro (queima de amálgama com inalação de vapor de mercúrio metálico) e fabricação de lâmpadas fluorescentes e cloro-álcalis. Manifesta-se pela tríade clássica:</p>
<ol>
  <li><strong>Tremor Mercurial Intencional:</strong> Inicia-se nos dedos e pálpebras, progredindo para membros superiores e fala;</li>
  <li><strong>Eretismo Mercurial (Alteração Neuropsiquiátrica):</strong> Mudança severa de personalidade, timidez mórbida, irritabilidade extrema, labilidade emocional, insônia e alucinações;</li>
  <li><strong>Gengivite e Estomatite</strong> com sialorreia profusa e dentes amolecidos.</li>
</ol>

<h3>4. Intoxicação Ocupacional por Agrotóxicos Inibidores da Acetilcolinesterase</h3>
<p>Os inseticidas <strong>Organofosforados</strong> e <strong>Carbamatos</strong> são largamente utilizados na agricultura brasileira. Ambos inibem a enzima acetilcolinesterase na fenda sináptica, provocando o acúmulo patológico de acetilcolina e deflagrando a <strong>Síndrome Colinérgica Aguda</strong>:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Componente da Síndrome Colinérgica</th>
      <th>Receptores Estimulados</th>
      <th>Manifestações Clínicas Clássicas de Emergência</th>
      <th>Tratamento Farmacológico Antídoto</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Efeitos Muscarínicos (Parassimpáticos)</strong></td>
      <td>Receptores Muscarínicos</td>
      <td><strong>Mnemônico DUMBELS:</strong> Diarreia, Urina (incontinência), Miose puntiforme bilateral, Bradicardia, Broncorreia profusa e broncoespasmo (principal causa de morte por asfixia), Êmese, Lacrimejamento e Salivação excessiva (sialorreia). Sudorese profusa.</td>
      <td><strong>ATROPINA Venosa em Doses Altas e Repetidas:</strong> Antagonista competitivo dos receptores muscarínicos. A dose é titulada não pela frequência cardíaca, mas pelo <strong>clareamento da broncorreia e melhora dos estertores pulmonares</strong>.</td>
    </tr>
    <tr>
      <td><strong>Efeitos Nicotínicos</strong></td>
      <td>Receptores Nicotínicos (Placa Motora e Gânglios)</td>
      <td>Fasciculações musculares finas difusas, cãibras, fraqueza muscular profunda que evolui para <strong>paralisia da musculatura respiratória diafragmática</strong>; hipertensão arterial e taquicardia precoces reflexas.</td>
      <td><strong>OXIMAS (Pralidoxima IV):</strong> Reativadores da enzima colinesterase fosforilada. Indicados <em>exclusivamente nas intoxicações por organofosforados</em> antes que ocorra o fenômeno de "envelhecimento" irreversível da enzima. <strong>NÃO estão indicadas nas intoxicações puras por carbamatos</strong> (pois a ligação carbamato-enzima é reversível espontaneamente).</td>
    </tr>
    <tr>
      <td><strong>Efeitos no SNC</strong></td>
      <td>Receptores Centrais</td>
      <td>Ansiedade, ataxia, convulsões tônico-clônicas generalizadas, coma e depressão do centro respiratório.</td>
      <td>Benzodiazepínicos (Diazepam IV) para controle agressivo de convulsões e agitação.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'acidentes-de-trabalho-e-emissao-da-cat',
      title: '6. Acidentes de Trabalho, Aspectos Previdenciários e a Emissão da CAT',
      body_html: `
<h3>Definição Legal do Acidente de Trabalho (Lei nº 8.213/1991)</h3>
<p>O <strong>Artigo 19 da Lei Federal nº 8.213/1991</strong> define o acidente de trabalho como:</p>
<blockquote><em>"Aquele que ocorre pelo exercício do trabalho a serviço de empresa ou de empregador doméstico, ou pelo exercício do trabalho dos segurados especiais, provocando lesão corporal ou perturbação funcional que cause a morte ou a perda ou redução, permanente ou temporária, da capacidade para o trabalho."</em></blockquote>

<p><strong>Tipologias Legais dos Acidentes de Trabalho:</strong></p>
<ol>
  <li><strong>Acidente Típico (Macrotrauma):</strong> Ocorre subitamente no local e durante a jornada de trabalho habitual (ex: queda de andaime na construção civil, amputação de dedo em prensa mecânica, perfuração com agulha em profissional de enfermagem);</li>
  <li><strong>Doença Profissional / Ocupacional (Equiparada por Lei a Acidente de Trabalho):</strong> Entidades mórbidas desencadeadas pelas condições peculiares do trabalho (Schilling I, II ou III);</li>
  <li><strong>Acidente de Trajeto (In Itinere):</strong> Ocorre no percurso da residência para o local de trabalho ou deste para aquela, qualquer que seja o meio de locomoção (transporte público, veículo próprio ou a pé), desde que não tenha havido desvio substancial de rota por interesse estritamente pessoal. A Reforma Trabalhista (Lei 13.467/2017) alterou regras de jornada (horas <em>in itinere</em>), mas para fins previdenciários e assistenciais acidentários, <strong>o acidente de trajeto continua formalmente equiparado a acidente de trabalho, exigindo a emissão da CAT!</strong></li>
</ol>

<h3>A Comunicação de Acidente de Trabalho (CAT): Regras e Prazos Obrigatórios</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Aspecto Legal e Operacional</th>
      <th>Regra Oficial Rígida (Lei 8.213/91 e Instruções Normativas do INSS)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Prazo Legal para Registro da CAT</strong></td>
      <td>A empresa empregadora é obrigada a emitir a CAT junto à Previdência Social até o <strong>PRIMEIRO DIA ÚTIL SEGUINTE AO DA OCORRÊNCIA</strong>.</td>
    </tr>
    <tr>
      <td><strong>Prazo em Caso de Morte Imediata</strong></td>
      <td>Em caso de acidente com óbito imediato do trabalhador, a comunicação à autoridade competente e registro da CAT devem ser realizados <strong>IMEDIATAMENTE</strong>.</td>
    </tr>
    <tr>
      <td><strong>Necessidade de Afastamento do Trabalho?</strong></td>
      <td><strong>NÃO! A CAT DEVE SER EMITIDA OBRIGATORIAMENTE EM TODO E QUALQUER ACIDENTE, HAVENDO OU NÃO AFASTAMENTO DO TRABALHO!</strong> Exemplo clássico de prova: acidente biológico com material perfurocortante em enfermeiro sem afastamento da jornada exige emissão imediata da CAT.</td>
    </tr>
    <tr>
      <td><strong>Legitimidade Concorrente para Emissão da CAT</strong></td>
      <td>Se a empresa recusar-se ou omitir-se de emitir a CAT no prazo legal, podem registrá-la formalmente de forma supletiva: o <strong>próprio trabalhador acidentado</strong>, seus dependentes, a entidade sindical representativa da categoria, o <strong>médico assistente que prestou o atendimento</strong> ou qualquer autoridade pública (SUS, Ministério do Trabalho, MPT, juiz).</td>
    </tr>
    <tr>
      <td><strong>Estabilidade Provisória no Emprego (Art. 118)</strong></td>
      <td>O segurado que sofreu acidente de trabalho tem garantida a manutenção do seu contrato de trabalho pelo prazo mínimo de <strong>12 meses após a cessação do auxílio por incapacidade temporária acidentária (Benefício B91)</strong>, desde que tenha permanecido afastado por período superior a 15 dias consecutivos.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'vigilancia-em-saude-ambiental-vigilancias',
      title: '7. Vigilância em Saúde Ambiental (VIGIAMB): VIGIAGUA, VIGIAR, VIGISOLO e Desastres',
      body_html: `
<h3>Estrutura Doutrinária da Vigilância em Saúde Ambiental no SUS</h3>
<p>A <strong>Vigilância em Saúde Ambiental (VIGIAMB)</strong>, regulamentada pela Portaria de Consolidação GM/MS nº 5/2017 e pela Política Nacional de Vigilância em Saúde (Resolução CNS nº 588/2018), consiste no conjunto de ações contínuas de identificação de riscos, monitoramento de contaminantes físicos, químicos e biológicos do meio ambiente e promoção de medidas de mitigação destinadas a proteger a saúde humana das populações expostas. Estrutura-se nacionalmente em quatro subsistemas operacionais integrados:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Subsistema VIGIAMB</th>
      <th>Foco de Risco Ambiental</th>
      <th>Indicadores Monitorados e Ações Práticas do SUS</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>VIGIAGUA</strong> (Qualidade da Água para Consumo Humano)</td>
      <td>Água destinada à ingestão, preparo de alimentos e higiene pessoal.</td>
      <td>Monitoramento do cumprimento do padrão de potabilidade da <strong>Portaria GM/MS nº 888/2021</strong> nos sistemas de abastecimento público e soluções alternativas. Indicadores centrais: ausência de <em>Escherichia coli</em> e coliformes totais em 100 mL de amostra, turbidez e manutenção de <strong>Teor Residual de Cloro Livre entre 0,2 e 2,0 mg/L</strong> em toda a rede de distribuição para garantir a inativação microbiológica contínua.</td>
    </tr>
    <tr>
      <td><strong>VIGIAR</strong> (Qualidade do Ar)</td>
      <td>Poluição atmosférica urbana, queima de biomassa florestal e emissões industriais.</td>
      <td>Monitoramento dos poluentes atmosféricos regulados pelo CONAMA: <strong>Material Particulado fino ($PM_{2,5}$ e $PM_{10}$)</strong>, Ozônio ($O_3$), Dióxido de Enxofre ($SO_2$), Monóxido de Carbono ($CO$) e Dióxido de Nitrogênio ($NO_2$). Avalia a correlação direta com o aumento de internações hospitalares e óbitos por doenças respiratórias agudas (asma, bronquiolite, pneumonia) e cardiovasculares em crianças e idosos.</td>
    </tr>
    <tr>
      <td><strong>VIGISOLO / VIGIPEQ</strong> (Solo e Contaminantes Químicos)</td>
      <td>Solos contaminados por resíduos perigosos, agrotóxicos e substâncias químicas tóxicas.</td>
      <td>Cadastro e vigilância de <strong>Populações Sob Risco de Exposição a Substâncias Químicas (Áreas Contaminadas)</strong>, como lixões desativados, postos de combustíveis com vazamentos subterrâneos, áreas agrícolas de uso intensivo de pesticidas e minerações com metais pesados (mercúrio, chumbo, arsênio). Realização de biomonitoramento humano.</td>
    </tr>
    <tr>
      <td><strong>VIGIDESASTRES</strong> (Desastres Naturais e Antrópicos)</td>
      <td>Eventos climáticos extremos e desastres tecnológicos.</td>
      <td>Atuação nos eixos de Preparação, Resposta e Recuperação frente a inundações, secas severas, deslizamentos de encostas e desastres industriais/tecnológicos (como os rompimentos de barragens de rejeitos de mineração em Mariana e Brumadinho). Vigilância epidemiológica pós-desastre para prevenção de surtos de <strong>leptospirose, hepatite A, doenças diarreicas agudas e tétano acidental</strong>.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'casos-clinicos-estruturados-saude-trabalhador',
      title: '8. Casos Clínicos Estruturados e Integradores em Saúde do Trabalhador',
      body_html: `
<div class="book-case">
  <h4>Caso Clínico 1: Canteiro de Obras e Falência Auditiva Insidiosa</h4>
  <p><strong>Identificação e Queixa:</strong> Homem de 48 anos, operador de betoneira e martelete pneumático em indústria de construção civil pesada há 16 anos, procura a Unidade Básica de Saúde queixando-se de que "a família reclama que a televisão está sempre alta demais" e que tem dificuldade de compreender a fala das pessoas em ambientes ruidosos ou festas de família. Relata ainda zumbido contínuo bilateral em tom agudo ("chiado de grilo") há cerca de 2 anos. Nega otorreia, vertigem ou uso de medicamentos ototóxicos. Admite que não costuma utilizar os protetores auriculares fornecidos pelo encarregado da obra por achá-los "desconfortáveis e quentes".</p>
  <p><strong>Exame Físico e Propedêutica:</strong> Otoscopia bilateral rigorosamente normal, com membranas timpânicas íntegras, translúcidas e de coloração nacarada, com triângulo luminoso preservado. Teste de Weber indiferenciado na linha média e Teste de Rinne positivo bilateralmente (condução aérea superior à óssea). A audiometria tonal por via aérea e óssea revela traçado com limiares normais entre 250 e 2.000 Hz, com queda acentuada sensorioneural bilateral e simétrica de 55 dB na frequência de 4.000 Hz, com recuperação parcial para 35 dB na frequência de 8.000 Hz (clássico entalhe audiométrico / gota acústica).</p>
  <p><strong>Discussão e Conduta Médica:</strong> O caso preenche todos os critérios clínicos e complementares de <strong>Perda Auditiva Induzida por Ruído (PAIR) ocupacional</strong> (Schilling I): exposição crônica a níveis elevados de ruído sem proteção auricular, hipoacusia sensorioneural bilateral simétrica irreversível com entalhe acústico típico em 4.000 Hz. Condutas mandatórias: 1. Estabelecer o nexo causal no prontuário; 2. <strong>Emissão obrigatória da Comunicação de Acidente de Trabalho (CAT)</strong>; 3. Notificação compulsória no <strong>SINAN</strong> (PAIR é agravo de notificação compulsória); 4. Encaminhamento ao CEREST regional para apoio e reabilitação; 5. Readequação imediata do posto de trabalho pelo SESMT com fornecimento obrigatório e treinamento de protetor auricular de alta atenuação tipo concha; 6. Orientar o paciente de que a perda é irreversível, mas cessada a exposição desprotegida, a doença não evoluirá.</p>
</div>

<div class="book-case">
  <h4>Caso Clínico 2: Acidente com Material Biológico em Profissional de Saúde</h4>
  <p><strong>Identificação e Queixa:</strong> Técnica de enfermagem de 29 anos sofreu perfuração profunda na polpa digital do dedo indicador esquerdo com agulha calibrosa oca com sangue visível, logo após puncionar acesso venoso periférico em paciente internado na enfermaria de infectologia. A profissional procurou imediatamente a sala de emergência do hospital 30 minutos após o acidente.</p>
  <p><strong>Discussão e Conduta Médica:</strong> A abordagem do acidente ocupacional com material biológico é uma emergência médica que exige protocolo rigoroso de profilaxia pós-exposição (PEP):</p>
  <ol>
    <li><strong>Cuidados Locais Imediatos:</strong> Lavagem exaustiva do sítio perfurado com água corrente e sabão neutro. É <strong>formalmente contraindicado espremer o ferimento</strong> (a compressão mecânica lesa capilares e facilita o influxo viral) ou aplicar substâncias corrosivas/antissépticos irritantes (como hipoclorito de sódio ou éter);</li>
    <li><strong>Avaliação do Paciente-Fonte:</strong> Realização imediata de testes rápidos para HIV, Hepatite B (HBsAg) e Hepatite C (Anti-HCV). Se o paciente-fonte for desconhecido ou recusar o teste, a decisão é tomada considerando o risco epidemiológico;</li>
    <li><strong>Quimioprofilaxia para HIV (PEP HIV):</strong> Idealmente iniciada nas <strong>primeiras 2 horas</strong> pós-acidente, tendo como limite máximo de eficácia <strong>72 horas</strong>. O esquema padrão vigente do Ministério da Saúde para adultos consiste em: <strong>Tenofovir (TDF 300 mg) + Lamivudina (3TC 300 mg) + Dolutegravir (DTG 50 mg) em dose única diária por 28 dias consecutivos</strong>;</li>
    <li><strong>Profilaxia para Hepatite B:</strong> Checar o cartão vacinal e dosagem de <strong>Anti-HBs</strong> da trabalhadora. Se a profissional possuir comprovação vacinal com 3 doses e Anti-HBs &ge; 10 mUI/mL (respondedora comprovada), ela é considerada <strong>imune e protegida</strong>, não necessitando de vacina ou Imunoglobulina Humana Anti-Hepatite B (IGHA). Se não vacinada ou Anti-HBs negativo: iniciar vacinação imediata e prescrever IGHA (0,06 mL/kg IM) idealmente nas primeiras 24 horas;</li>
    <li><strong>Hepatite C:</strong> Não há vacina ou imunoglobulina eficaz pós-exposição para o vírus HCV; a conduta é o monitoramento sorológico e de PCR-RNA com 30, 90 e 180 dias;</li>
    <li><strong>Procedimentos Médico-Legais:</strong> <strong>Emissão obrigatória da CAT</strong> (independe de haver afastamento) e notificação no <strong>SINAN</strong> de Acidente com Material Biológico.</li>
  </ol>
</div>
`
    },
    {
      id: 'questoes-comentadas-saude-trabalhador',
      title: '9. Questões de Concursos e Residência Médica Comentadas na Íntegra',
      body_html: `
<h3>Questão 1: ENARE — Classificação de Schilling</h3>
<p><strong>Enunciado:</strong> Um médico do trabalho de uma indústria automobilística avalia quatro trabalhadores com diferentes afecções clínicas para determinar o nexo causal com o trabalho segundo a Classificação de Richard Schilling:</p>
<p>I. Trabalhador de 52 anos com silicose crônica pulmonar confirmada por raio-X de tórax após 20 anos na fundição de blocos de motores.<br>
II. Trabalhadora de 44 anos com síndrome do túnel do carpo bilateral após 10 anos na linha de montagem com movimentos de pinça repetitivos rápidos.<br>
III. Trabalhador de 58 anos com infarto agudo do miocárdio associado a estresse laboral crônico em cargo de alta responsabilidade e turnos alternados.<br>
IV. Trabalhador asmático desde a infância que apresenta crises agudas graves de broncoespasmo durante a jornada de trabalho no setor de pintura automotiva contendo isocianatos.</p>
<p>Segundo a Classificação de Schilling, os trabalhadores I, III e IV enquadram-se, respectivamente, nos Grupos:</p>
<p>A) Grupo I, Grupo II e Grupo III.<br>
B) Grupo I, Grupo I e Grupo II.<br>
C) Grupo II, Grupo I e Grupo III.<br>
D) Grupo III, Grupo II e Grupo I.<br>
E) Grupo I, Grupo III e Grupo II.</p>
<p><strong>Gabarito Oficial: Alternativa A.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
• <strong>Trabalhador I (Silicose):</strong> O trabalho com sílica é a <strong>causa necessária</strong> para a doença (Schilling Grupo I). Sem a exposição ocupacional à poeira mineral, a silicose não ocorreria.<br>
• <strong>Trabalhador III (Infarto Agudo do Miocárdio / Estresse Crônico):</strong> A coronariopatia é uma afecção multicausal complexa, mas o estresse crônico do ambiente laboral atua como <strong>fator contributivo / concausa</strong> na sua gênese (Schilling Grupo II).<br>
• <strong>Trabalhador IV (Asma prévia agravada por isocianatos no trabalho):</strong> O trabalhador já era constitucionalmente asmático, e os vapores de isocianatos no trabalho atuam como <strong>desencadeadores ou agravadores</strong> de doença preexistente (Schilling Grupo III).<br>
A alternativa A estabelece a correspondência exata.</p>

<h3>Questão 2: USP / Residência Médica — Comunicação de Acidente de Trabalho (CAT)</h3>
<p><strong>Enunciado:</strong> Durante o plantão noturno em uma Unidade de Pronto Atendimento (UPA), um médico atende um operário de fábrica que sofreu esmagamento superficial da falange distal do 2º quirodáctilo esquerdo ao manusear uma prensa mecânica. O exame radiológico descartou fraturas ósseas, procedendo-se a curativo local com liberação para retorno às atividades laborais normais no dia seguinte, sem necessidade de afastamento funcional. O empregador informou ao operário que, como não houve fratura nem necessidade de afastamento do trabalho, a empresa não emitirá a Comunicação de Acidente de Trabalho (CAT). Diante da legislação previdenciária e trabalhista vigente, qual a conduta correta do médico assistente?</p>
<p>A) Concordar com a empresa, pois a emissão da CAT é dispensada legalmente quando o acidente não acarreta afastamento das atividades laborais por período superior a 15 dias consecutivos.<br>
B) Orientar o trabalhador de que a empresa cometeu irregularidade, pois a emissão da CAT é obrigatória para todo e qualquer acidente de trabalho, havendo ou não afastamento, e o próprio médico assistente ou sindicato pode emiti-la formalmente caso a empresa persista na recusa.<br>
C) Encaminhar o trabalhador imediatamente para perícia no INSS, que é o único órgão com competência legal para cadastrar e emitir a CAT.<br>
D) Prescrever atestado médico de 16 dias compulsoriamente apenas para obrigar a empresa a cadastrar a CAT junto ao Ministério do Trabalho.<br>
E) Dispensar a notificação previdenciária e realizar apenas o registro interno no livro de ocorrências da UPA.</p>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
A legislação federal (Art. 22 da Lei nº 8.213/1991) estabelece categoricamente que a <strong>CAT deve ser emitida para todo acidente de trabalho, independentemente de ter havido ou não afastamento das atividades laborais</strong>. A ausência de incapacidade laboral temporária não isenta a obrigatoriedade do registro. Ademais, na hipótese de omissão ou recusa da empresa empregadora, o próprio trabalhador acidentado, seus dependentes, a entidade sindical representativa, o <strong>médico assistente que prestou o atendimento</strong> ou qualquer autoridade pública possuem legitimidade legal supletiva para formalizar a emissão da CAT. A alternativa B é a única correta.</p>
`
    }
  ],
  references: [
    {
      title: 'Ministério da Saúde — Política Nacional de Saúde do Trabalhador e da Trabalhadora (PNSTT)',
      url: 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-do-trabalhador'
    },
    {
      title: 'Constituição da República Federativa do Brasil de 1988 — Artigo 200 (Competências do SUS)',
      url: 'https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm'
    },
    {
      title: 'Lei Federal nº 8.080/1990 — Lei Orgânica da Saúde',
      url: 'https://www.planalto.gov.br/ccivil_03/leis/l8080.htm'
    },
    {
      title: 'Lei Federal nº 8.213/1991 — Planos de Benefícios da Previdência Social e Acidentes de Trabalho',
      url: 'https://www.planalto.gov.br/ccivil_03/leis/l8213cons.htm'
    },
    {
      title: 'Ministério da Saúde — Protocolos de Atenção à Saúde do Trabalhador e Portaria GM/MS nº 888/2021 (VIGIAGUA)',
      url: 'https://www.gov.br/saude/pt-br/assuntos/vigilancia-em-saude'
    }
  ]
};

const charCount = saveBook(book);
console.log(`[AULA 070 CONCLUÍDA] Total de caracteres: ${charCount}`);
