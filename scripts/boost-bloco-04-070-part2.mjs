import fs from 'fs';
import path from 'path';
import { htmlToBlocks, countUsefulChars, saveBook } from './bloco-04-utils.mjs';

const slug = 'vigilancia-ambiental-e-saude-do-trabalhador';
const jsonPath = path.join('apostilas', slug, 'content.json');
const payload = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const sec3Id = 'contaminantes-quimicos-emergentes-e-nexo-epidemiologico';
const sec3Title = 'Aprofundamento Avançado: Contaminantes Químicos Emergentes, Amianto no STF e Nexo Técnico Epidemiológico Previdenciário (NTEP)';
const sec3Html = `
<h3>O Nexo Técnico Epidemiológico Previdenciário (NTEP) e o FAP</h3>
<p>Instituído pela Lei Federal nº 11.430/2006 e regulamentado pelo Decreto Federal nº 6.042/2007, o <strong>Nexo Técnico Epidemiológico Previdenciário (NTEP)</strong> representou uma revolução jurídica e pericial na caracterização das doenças ocupacionais no Brasil. Historicamente, cabia exclusivamente ao trabalhador comprovar judicialmente que sua doença decorrera das condições laborais (ônus da prova do empregado). Com o NTEP, operou-se a <strong>inversão do ônus da prova</strong> a favor do trabalhador segurado:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Dimensão Pericial e Econômica</th>
      <th>Regulamentação e Mecanismo Operacional no INSS</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>O Cruzamento Estatístico CNAE x CID</strong></td>
      <td>O NTEP estabelece uma matriz estatística que cruza a atividade econômica preponderante da empresa (Classificação Nacional de Atividades Econômicas — <strong>CNAE</strong>) com o diagnóstico médico codificado da doença que motivou a incapacidade temporária (Classificação Internacional de Doenças — <strong>CID-10 / CID-11</strong>). Quando a incidência de determinado agravo em um setor econômico for significativamente superior à média dos demais setores, presume-se legalmente a existência de <strong>nexo causal presumido entre o trabalho e a patologia</strong>.</td>
    </tr>
    <tr>
      <td><strong>Inversão do Ônus da Prova</strong></td>
      <td>Identificado o vínculo estatístico entre o CNAE da empresa e o CID do atestado médico pericial, a perícia médica federal do INSS converte automaticamente o benefício previdenciário comum (antigo Auxílio-Doença Previdenciário B31) em <strong>Auxílio por Incapacidade Temporária Acidentário (Benefício B91)</strong>. Cabe agora à empresa o ônus de provar pericialmente que a patologia não decorreu do trabalho.</td>
    </tr>
    <tr>
      <td><strong>Repercussões Jurídicas para o Trabalhador</strong></td>
      <td>A concessão do benefício B91 assegura:
        <ul>
          <li><strong>Estabilidade Provisória no Emprego:</strong> Manutenção obrigatória do contrato de trabalho por no mínimo 12 meses após a alta médica pericial do INSS (Art. 118 da Lei 8.213/91);</li>
          <li><strong>Recolhimento Contínuo do FGTS:</strong> A empresa é obrigada a continuar depositando mensalmente o Fundo de Garantia do Tempo de Serviço durante todo o período de afastamento por incapacidade acidentária.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><strong>O Fator Acidentário de Prevenção (FAP)</strong></td>
      <td>O FAP é um multiplicador variável (oscila entre 0,5000 e 2,0000) aplicado sobre a alíquota dos Riscos Ambientais do Trabalho (RAT / SAT de 1%, 2% ou 3% sobre a folha de pagamento). Empresas que investem em ergonomia e segurança e reduzem acidentes e adoecimentos recebem bônus (redução da alíquota até pela metade: FAP = 0,5); empresas negligentes com altos índices de acidentes e NTEP são penalizadas com aumento da alíquota tributária em até 100% (FAP = 2,0).</td>
    </tr>
  </tbody>
</table>

<h3>A Decisão Histórica do STF sobre o Banimento do Amianto (ADI 4066)</h3>
<p>O julgamento da <strong>Ação Direta de Inconstitucionalidade (ADI) 4066</strong> e da ADPF 109 pelo Supremo Tribunal Federal, concluído em 29 de novembro de 2017, consolidou-se como o maior marco jurisdicional de saúde pública e ambiental do século XXI no Brasil:</p>
<ul>
  <li><strong>Inconstitucionalidade do Artigo 2º da Lei Federal nº 9.055/1995:</strong> O plenário do STF declarou inconstitucional o dispositivo legal que permitia no Brasil o "uso controlado" do amianto crisotila (asbesto branco), reconhecendo formalmente que não existe qualquer limiar seguro de exposição biológica às fibras microscópicas de asbesto;</li>
  <li><strong>Efeito Vinculante Erga Omnes:</strong> A decisão baniu categoricamente em todo o território nacional a extração mineral, industrialização, transporte, comercialização, importação e exportação de qualquer variedade de amianto no país;</li>
  <li><strong>Fundamentos Constitucionais de Saúde Pública:</strong> Prevalência dos direitos fundamentais à vida, à integridade física do trabalhador e ao meio ambiente ecologicamente equilibrado (Artigos 196, 200 e 225 da CF/88) sobre os interesses meramente econômicos do setor extrativo mineral.</li>
</ul>

<h3>Pneumopatias Ocupacionais Não Fibrogênicas e por Poeiras Orgânicas</h3>
<p>Além da silicose e asbestose, a prática médica ambulatorial e os exames de concurso cobram frequentemente o diagnóstico diferencial com outras afecções pulmonares ocupacionais:</p>
<ul>
  <li><strong>Bissinose:</strong> Pneumopatia causada pela inalação crônica de endotoxinas bacterianas presentes em poeiras de <strong>algodão, linho e cânhamo</strong> na indústria têxtil. Apresenta sintomatologia clássica de <strong>"Opressão Torácica das Segundas-Feiras" (Monday Morning Tightness)</strong>: o trabalhador refere dispneia, tosse e aperto no peito no primeiro dia de retorno à fábrica após o repouso do fim de semana, com melhora progressiva ao longo dos dias subsequentes por fenômeno de tolerância imunológica/taquifilaxia;</li>
  <li><strong>Pneumonite de Hipersensibilidade (Alveolite Alérgica Extrínseca):</strong> Reação inflamatória imunomediada mista (anticorpos precipitantes IgG e imunidade celular mediada por linfócitos T) deflagrada pela inalação crônica de antígenos orgânicos (fungos termofílicos e proteínas animais). Exemplos clássicos:
    <ul>
      <li><strong>Pulmão do Fazendeiro:</strong> Inalação de esporos de <em>Actinomyces</em> presentes em feno e grãos mofados armazenados em silos;</li>
      <li><strong>Pulmão do Criador de Pombos / Aves:</strong> Inalação de proteínas aviárias presentes nas fezes dessecadas e penas de pombos, periquitos e canários;</li>
      <li><strong>Bagaçose:</strong> Inalação de poeira de bagaço de cana-de-açúcar colonizado por fungos termofílicos.</li>
    </ul>
  </li>
  <li><strong>Pneumoconioses Não Fibrogênicas (Sobrecarga de Poeiras Inertes):</strong> Deposição pura de partículas radiopacas nos macrófagos sem proliferação colágena destrutiva, sem sintomas respiratórios e com prova de função pulmonar normal: <strong>Siderose</strong> (óxido de ferro em soldadores), <strong>Baritose</strong> (sulfato de bário) e <strong>Estanose</strong> (estanho).</li>
</ul>

<h3>Bateria de Questões Comentadas com Distratores Exaustivos</h3>

<h4>Questão 5: UNESP / Residência Médica — Pneumoconiose e Tuberculose</h4>
<p><strong>Enunciado:</strong> Homem de 56 anos, ex-trabalhador de mineração subterrânea de quartzo por 22 anos, portador de silicose pulmonar crônica diagnosticada há 8 anos, comparece à UBS referindo que há 4 semanas vem apresentando febre diária ao final da tarde com sudorese noturna profusa, emagrecimento de 5 kg e tosse com expectoração esverdeada e rajas de sangue (escarro hemoptoico). A radiografia de tórax de controle evidencia, além das múltiplas opacidades nodulares simétricas prévias nos lobos superiores e calcificação em "casca de ovo" dos linfonodos hilares, o surgimento de uma nova lesão cavitária escavada de paredes espessas medindo 3,5 cm no segmento apical do lobo superior direito. A hipótese diagnóstica primária prioritária e a conduta confirmatória imediata são:</p>
<p>A) Silicose complicada com fibrose maciça progressiva pura; prescrever prednisona oral em dose imunossupressora.<br>
B) Silicotuberculose (coinfecção por Mycobacterium tuberculosis ativa); realizar imediatamente Teste Rápido Molecular para Tuberculose (TRM-TB) e baciloscopia de escarro, mantendo precauções para aerossóis.<br>
C) Asbestose avançada associada a mesotelioma maligno de pleura; indicar toracocentese diagnóstica.<br>
D) Abscesso pulmonar bacteriano por Pseudomonas aeruginosa; iniciar ciprofloxacino oral em domicílio.<br>
E) Sarcoidose pulmonar estágio IV; indicar biópsia transbrônquica imediata sem investigação de micobactérias.</p>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
• A alternativa B é a resposta correta e incontestável. A silicose provoca toxicidade macrofágica irreversível, inibindo a fagocitose e a resposta imune celular mediada por macrófagos e linfócitos T. Essa imunodeficiência local confere ao paciente silicótico um <strong>risco relativo até 30 vezes superior de adoecimento por tuberculose ativa</strong> (Silicotuberculose). Qualquer surgimento de sintomas constitucionais (febre vespertina, emagrecimento, sudorese) ou escavação de nódulo em silicótico impõe a investigação prioritária e imediata de tuberculose com TRM-TB e cultura.<br>
• A alternativa A é perigosa: prescrever corticoide em paciente com tuberculose ativa sem cobertura antimicrobiana prévia deflagra disseminação miliar potencialmente fatal.<br>
• A alternativa C confunde a poeira mineral: quartzo é sílica, não amianto (asbesto).<br>
• A alternativa D ignora o nexo clássico da tuberculose no silicótico.<br>
• A alternativa E é incorreta, pois as calcificações em casca de ovo e nódulos apicais com história de mineração definem silicose, e não sarcoidose.</p>

<h4>Questão 6: SMS-SP / Residência Médica — Vigilância da Água (VIGIAGUA)</h4>
<p><strong>Enunciado:</strong> A equipe municipal de Vigilância em Saúde Ambiental (VIGIAMB / VIGIAGUA) recebe laudo laboratorial de monitoramento fiscal de amostra de água colhida na rede de distribuição de um bairro residencial. O laudo revela ausência de turbidez, pH de 7,2, presença de Escherichia coli em 100 mL de amostra e concentração de Cloro Residual Livre de 0,05 mg/L. Considerando a Portaria GM/MS nº 888/2021, que estabelece os procedimentos de controle e de vigilância da qualidade da água para consumo humano e seu padrão de potabilidade, assinale a interpretação correta e a medida a ser adotada:</p>
<p>A) A água é considerada potável, pois a presença de bactérias coliformes termotolerantes é aceitável em redes de distribuição urbanas desde que a turbidez esteja normal.<br>
B) A água encontra-se IMPRÓPRIA para o consumo humano; o padrão de potabilidade exige ausência absoluta de Escherichia coli em 100 mL e o cloro residual livre está abaixo do limite mínimo obrigatório (que deve ser de pelo menos 0,2 mg/L), exigindo cloração corretiva imediata na estação de tratamento.<br>
C) O teor de cloro está excessivamente alto, devendo a concessionária de água suspender imediatamente a dosagem de hipoclorito de sódio.<br>
D) A presença de E. coli indica contaminação viral pura, sendo recomendada a desinfecção por radiação ultravioleta em nível domiciliar exclusivo.<br>
E) A responsabilidade sobre o padrão de potabilidade é exclusiva do morador da residência, não cabendo ao SUS qualquer ação fiscalizatória sobre redes públicas.</p>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
A Portaria GM/MS nº 888/2021 estabelece como padrão microbiológico inegociável de potabilidade a <strong>ausência total (não detecção) de Escherichia coli e coliformes totais em amostras de 100 mL de água tratada</strong>. Ademais, para assegurar a barreira de desinfecção contínua ao longo de toda a extensão dos encanamentos e prevenir a recontaminação bacteriana secundária, a norma exige a manutenção mandatória de uma concentração de <strong>Cloro Residual Livre de no mínimo 0,2 mg/L</strong> (faixa recomendada de 0,2 a 2,0 mg/L) em qualquer ponto da rede de distribuição. O valor de 0,05 mg/L atesta subdosagem grave de cloro, permitindo a proliferação bacteriana de origem fecal. A alternativa B é a única correta.</p>
`;

payload.o = payload.o.filter(item => item[0] !== sec3Id && item[0] !== 'referencias');
payload.q = payload.q.filter(item => item[0] !== sec3Id && item[0] !== 'referencias');

payload.o.push([sec3Id, sec3Title]);
payload.q.push([sec3Id, 0, htmlToBlocks(sec3Title, sec3Html)]);

payload.o.push(['referencias', 'Referências Oficiais e Diretrizes']);
payload.q.push([
  'referencias',
  0,
  [
    ['2', 'Referências Oficiais e Diretrizes'],
    [
      'o',
      [
        '<a href="https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-do-trabalhador" target="_blank" rel="noopener noreferrer">Ministério da Saúde — Política Nacional de Saúde do Trabalhador e da Trabalhadora (PNSTT)</a>',
        '<a href="https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm" target="_blank" rel="noopener noreferrer">Constituição Federal de 1988 — Artigo 200 (Competências do SUS)</a>',
        '<a href="https://www.planalto.gov.br/ccivil_03/leis/l8080.htm" target="_blank" rel="noopener noreferrer">Lei Federal nº 8.080/1990 — Lei Orgânica da Saúde</a>',
        '<a href="https://www.planalto.gov.br/ccivil_03/leis/l8213cons.htm" target="_blank" rel="noopener noreferrer">Lei Federal nº 8.213/1991 — Planos de Benefícios da Previdência Social e Acidentes de Trabalho</a>',
        '<a href="https://www.gov.br/saude/pt-br/assuntos/vigilancia-em-saude" target="_blank" rel="noopener noreferrer">Ministério da Saúde — Protocolos de Vigilância em Saúde Ambiental (VIGIAMB / VIGIAGUA)</a>'
      ],
      'reference-list'
    ]
  ]
]);

saveBook(payload);
console.log('Aula 070 expandida e salva com sucesso!');
