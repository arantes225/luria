// Bloco 6 - Aula 118: Anemias na Infância (Parte 4: Seções 16 a 19)

export const sec16 = {
  id: 'anemias-megaloblasticas-deficiencia-de-b12-e-folato-na-infancia',
  title: '16. Anemias Megaloblásticas Pediátricas: Deficiência de Vitamina B12 e Folato e o Erro Inato do Metabolismo',
  body_html: `
<h3>Fisiopatologia da Assincronia Núcleo-Citoplasmática</h3>
<p>As <strong>Anemias Megaloblásticas</strong> resultam de um bloqueio na síntese de DNA celular devido à carência de cofatores enzimáticos essenciais — a <strong>Cobalamina (Vitamina B12)</strong> e o <strong>Folato (Ácido Fólico / Vitamina B9)</strong> —, enquanto a síntese de RNA e de proteínas citoplasmáticas prossegue em ritmo inalterado. Essa discrepância bioquímica gera a patognomônica <strong>Assincronia Núcleo-Citoplasmática</strong>: o núcleo do eritroblasto permanece imaturo com cromatina frouxa e retardada, enquanto o citoplasma cresce aceleradamente e acumula hemoglobina, gerando precursores eritroides gigantescos na medula óssea (megaloblastos) e hemácias ovaladas avantajadas no sangue periférico (<strong>Macro-ovalócitos com VCM frequentemente entre 110 e 130 fL</strong>).</p>

<p>Além da série vermelha, todas as linhagens hematopoiéticas de rápida renovação celular são severamente afetadas, produzindo <strong>Pancitopenia</strong> (leucopenia com neutrófilos hipersegmentados contendo $\ge 5$ a 6 lobos nucleares e plaquetopenia moderada) acompanhada de apoptose intramedular massiva (eritropoiese ineficaz com elevação de LDH e bilirrubina indireta mimetizando hemólise).</p>

<h3>Particularidades da Deficiência de Vitamina B12 em Lactentes</h3>
<ul>
  <li><strong>Lactentes Filhos de Mães Vegetarianas Estritas ou Veganas sem Suplementação:</strong> A vitamina B12 está presente exclusivamente em alimentos de origem animal (carnes, ovos, leite). O concepto já nasce com estoques hepáticos de cobalamina deficientes e consome leite materno virtualmente desprovido de B12;</li>
  <li><strong>O Quadro Neuropsiquiátrico Devastador:</strong> Diferentemente do adulto, no lactente a deficiência de cobalamina instala-se entre o <strong>4º e o 12º mês de vida</strong> com manifestações neurológicas precoces e graves: <strong>regressão motora (a criança perde marcos já adquiridos como sustentar a cabeça, sentar ou rolar), apatia profunda, hipotonia muscular, irritabilidade e movimentos anômalos coreiformes/mioclônicos</strong>, decorrentes de defeito na mielinização do sistema nervoso central e degeneração combinada subaguda da medula espinhal;</li>
  <li><strong>Diferenciação Bioquímica Entre Deficiência de B12 e Folato:</strong>
    <ul>
      <li><em>Na Deficiência de Vitamina B12:</em> Há elevação sérica e urinária concomitante de <strong>Ácido Metilmalônico (MMA)</strong> E de <strong>Homocisteína</strong> (pois a cobalamina atua na enzima metilmalonil-CoA mutase e na metionina sintase);</li>
      <li><em>Na Deficiência Pura de Ácido Fólico:</em> Há elevação isolada de <strong>Homocisteína</strong>, com <strong>Ácido Metilmalônico RIGOROSAMENTE NORMAL</strong>;</li>
    </ul>
  </li>
  <li><strong>Atenção ao Risco Iatrogênico de Tratar Apenas com Folato:</strong> Nunca administrar ácido fólico isolado a um paciente com deficiência de vitamina B12! O folato corrige temporariamente a anemia megaloblástica por desvio metabólico ("cilada do folato"), mas <strong>permite que o dano neurológico progrida de forma acelerada e irreversível</strong>, levando a sequelas neurológicas motoras permanentes.</li>
</ul>
`
};

export const sec17 = {
  id: 'regras-de-transfusao-pediatrica-e-reacoes-transfusionais',
  title: '17. Hemoterapia Pediátrica: Indicações Estritas, Cálculo do Volume e Reações Transfusionais',
  body_html: `
<h3>O Princípio da Restrição Transfusional em Pediatria</h3>
<p>Em pediatria e neonatologia, a transfusão de concentrado de hemácias não deve ser guiada por um "gatilho numérico rígido e isolado" de hemoglobina (como transfundir automaticamente qualquer criança com Hb &lt; 7 ou 8 g/dL). A decisão transfusional baseia-se na <strong>velocidade de instalação da anemia, na tolerância hemodinâmica e na presença de sinais objetivos de hipóxia tecidual</strong> (taquicardia desproporcional, taquipneia, acidose lática, letargia profunda ou choque):</p>

<ul>
  <li>Em anemias crônicas de instalação lenta (como a anemia ferropriva carencial), os mecanismos adaptativos fisiológicos (aumento de 2,3-DPG desviando a curva para a direita, aumento do débito cardíaco por baixa viscosidade) permitem que a criança tolere níveis surpreendentemente baixos de hemoglobina (4 ou 5 g/dL) sem descompensação circulatória. Nesses casos, a conduta correta é o <strong>tratamento farmacológico oral ou intravenoso com ferro</strong>, reservando a transfusão apenas para insuficiência cardíaca congestiva descompensada iminente;</li>
  <li>Quando a transfusão é estritamente mandatória na anemia crônica grave com instabilidade, realiza-se transfusão em <strong>alíquota lenta fracionada de 5 a 10 mL/kg em infusão lenta de 3 a 4 horas</strong>, associada à administração de <strong>Furosemida intravenosa (0,5 a 1 mg/kg)</strong> no meio da infusão para prevenir a temida <em>Sobrecarga Circulatória Associada à Transfusão (TACO)</em>.</li>
</ul>

<h3>Cálculo Matemático do Volume de Concentrado de Hemácias Pediátrico</h3>
<p>O volume a ser prescrito para elevar a hemoglobina a um nível seguro e programado é calculado por duas fórmulas consagradas:</p>

<div class="formula-box">
  $$\\text{Volume de Concentrado de Hemácias (mL)} = \\text{Peso (kg)} \\times \\Delta\\text{Hb Desejado (g/dL)} \\times 4$$
  $$\\text{Regra Prática de Bolso: } 10\\text{ a } 15\\text{ mL/kg de Concentrado de Hemácias elevam a Hb em cerca de } 2,0\\text{ a } 3,0\\text{ g/dL}$$
</div>

<h3>Modificações Especiais do Hemocomponente em Pediatria</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Modificação Técnica da Bolsa</th>
      <th>Objetivo Clínico e Mecanismo de Prevenção</th>
      <th>Indicações Pediátricas Mandatórias</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Desleucocitação (Filtração de Leucócitos)</strong></td>
      <td>Remove mais de 99,9% dos leucócitos do doador presentes na bolsa, prevenindo aloimunização contra antígenos HLA, prevenindo <strong>Reação Febril Não Hemolítica</strong> e eliminando a transmissão do <strong>Citomegalovírus (CMV)</strong>.</td>
      <td><strong>Obrigatória em todos os recém-nascidos prematuros</strong>, candidatos a transplante de medula óssea, pacientes falciformes e talassêmicos em regime transfusional crônico.</td>
    </tr>
    <tr>
      <td><strong>Irradiação Gama (25 Gy)</strong></td>
      <td>Inativa e impede a replicação dos linfócitos T viáveis do doador infundidos no receptor imunocomprometido.</td>
      <td><strong>Prevenção da Doença do Enxerto Contra o Hospedeiro Transfusional (DECH-TA / GVHD)</strong>, afecção com letalidade &gt; 90%. Obrigatória em prematuros &lt; 1.200 g, imunodeficiências congênitas graves (SCID) e transfusões intrauterinas.</td>
    </tr>
    <tr>
      <td><strong>Fenotipagem Eritrocitária Estendida</strong></td>
      <td>Compatibilização antígenos eritrocitários menores (Sistemas Rh: C, c, E, e; e Sistema Kell: K).</td>
      <td><strong>Obrigatória em Doença Falciforme e Talassemia Maior</strong> para prevenir o desastre da aloimunização e crises hiper-hemolíticas transfusionais.</td>
    </tr>
  </tbody>
</table>
`
};

export const sec18 = {
  id: 'algoritmo-geral-de-conduta-nas-anemias-infantis',
  title: '18. Fluxograma Mental e Algoritmo Diagnóstico Unificado das Anemias na Infância',
  body_html: `
<h3>O Roteiro Mental em 4 Passos do Pediatra Geral</h3>
<ol>
  <li><strong>Passo 1: Identificar a Anemia e Avaliar a Resposta Medular (Reticulócitos):</strong>
    <ul>
      <li>Hemoglobina abaixo do percentil 2,5 para a idade $\rightarrow$ Solicitar Reticulócitos e lâmina de sangue periférico;</li>
      <li><strong>Reticulócitos ELEVADOS (&gt; 2% a 3% - Hiperproliferativa):</strong> Suspeitar de Hemólise ou Sangramento agudo $\rightarrow$ Checar Bilirrubina Indireta, LDH, Haptoglobina e Teste de Coombs Direto;</li>
      <li><strong>Reticulócitos BAIXOS ou NORMAIS (Hipoproliferativa / Arregenerativa):</strong> Deficiência carencial ou supressão medular $\rightarrow$ Prosseguir para Passo 2;</li>
    </ul>
  </li>
  <li><strong>Passo 2: Análise Morfométrica pelo VCM e RDW:</strong>
    <ul>
      <li><strong>Microcítica e Hipocrômica (VCM baixo / HCM baixo):</strong>
        <ul>
          <li><strong>RDW ELEVADO (&gt; 15%) e Ferritina Baixa:</strong> <strong>Anemia Ferropriva</strong> $\rightarrow$ Tratar com Sulfato Ferroso 3 a 5 mg/kg/dia por 3 meses pós-cura da anemia;</li>
          <li><strong>RDW NORMAL (&le; 14%), Hemácias Altas (&gt; 5,5 milhões) e Mentzer &lt; 13:</strong> <strong>Traço Talassêmico ($\beta$ ou $\alpha$)</strong> $\rightarrow$ Eletroforese de Hemoglobina ($HbA_2 &gt; 3,5\\%$);</li>
        </ul>
      </li>
      <li><strong>Macrocítica (VCM elevado):</strong>
        <ul>
          <li>Checar Ácido Fólico e Vitamina B12; investigar dieta materna (vegetarianismo) e sintomas neurológicos de regressão motora;</li>
        </ul>
      </li>
      <li><strong>Normocítica / Normocrômica:</strong>
        <ul>
          <li>Checar função renal, provas inflamatórias (PCR/VHS) e histórico neonatal (nadir da anemia fisiológica entre 8 e 12 semanas);</li>
        </ul>
      </li>
    </ul>
  </li>
  <li><strong>Passo 3: Se Hemolítica (Reticulócitos Altos, Icterícia Indireta e Esplenomegalia):</strong>
    <ul>
      <li>Lâmina com esferócitos e <strong>CHCM elevado (&gt; 36 g/dL)</strong> com Coombs negativo $\rightarrow$ <strong>Esferocitose Hereditária</strong> (Teste de fragilidade osmótica / EMA);</li>
      <li>Lâmina com hemácias em foice, dactilite ou crise vaso-oclusiva $\rightarrow$ <strong>Doença Falciforme ($HbSS$)</strong> (Eletroforese de Hb / Padrão FS no teste do pezinho);</li>
      <li>Crise hemolítica aguda pós-fármaco oxidante (sulfa, naftalina) com corpúsculos de Heinz $\rightarrow$ <strong>Deficiência de G6PD</strong>;</li>
    </ul>
  </li>
  <li><strong>Passo 4: Sinais de Alarme de Malignidade e Falência Medular:</strong>
    <ul>
      <li>Bicitopenia ou pancitopenia, dores ósseas noturnas, febre prolongada, hepatoesplenomegalia maciça e linfadenopatia generalizada $\rightarrow$ <strong>Encaminhamento urgente para Mielograma</strong> para descartar Leucemia Aguda (LLA) ou Aplasia Medular.</li>
    </ul>
  </li>
</ol>
`
};

export const sec19 = {
  id: 'bateria-de-questoes-comentadas-top-tier-complementares-anemias',
  title: '19. Questões de Concursos Top-Tier: Megaloblástica, Hemoterapia e Talassemia Maior',
  body_html: `
<h3>Questões com Discussão Profunda de Gabarito e Raciocínio Clínico Aprofundado</h3>

<h4>Questão 6: FMUSP — Deficiência de Cobalamina no Lactente</h4>
<p><strong>Enunciado:</strong> Lactente de 8 meses de vida é trazido para avaliação médica devido a quadro de atraso e regressão do desenvolvimento neuropsicomotor: aos 5 meses mantinha a cabeça firme e rolava no leito, mas há cerca de 6 semanas tornou-se profundamente apático, perdeu a sustentação cefálica, recusa alimentos sólidos e apresenta tremores finos em extremidades. O exame físico evidencia palidez cutânea moderada, hipotonia muscular axial global e desnutrição. A mãe é vegetariana estrita (vegana) há 6 anos e a criança esteve em aleitamento materno exclusivo até os 7 meses sem qualquer suplementação vitamínica. O hemograma revela: Hemoglobina = 7,6 g/dL; Hematócrito = 23%; Hemácias = 2,1 milhões/$\mu$L; <strong>VCM = 118 fL (macrocitose acentuada)</strong>; Leucócitos = 3.800/mm³ com presença de <strong>neutrófilos com mais de 6 lobos nucleares</strong>; Plaquetas = 110.000/mm³; Reticulócitos = 0,5% (hipoproliferativa). Diante deste quadro clínico, o diagnóstico etiológico provável e a conduta farmacológica mandatória são, respectivamente:</p>
<p>A) Anemia Ferropriva grave; prescrição de sulfato ferroso oral em altas doses.<br>
B) Deficiência de Ácido Fólico; prescrição exclusiva de ácido fólico oral em monoterapia.<br>
C) Deficiência de Vitamina B12 (Cobalamina) secundária à dieta materna vegana sem suplementação; administração imediata de Vitamina B12 parenteral (cianocobalamina ou hidroxocobalamina intramuscular) para reverter o quadro hematológico e impedir sequelas neurológicas permanentes.<br>
D) Síndrome de Diamond-Blackfan; pulsoterapia com metilprednisolona.<br>
E) Hipotireoidismo congênito descompensado; levotiroxina sódica oral.</p>
<p><strong>Gabarito Oficial: Alternativa C.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
• <strong>Alternativa C (Correta):</strong> O quadro é patognomônico de <strong>Anemia Megaloblástica por Deficiência de Vitamina B12 no Lactente</strong> filho de mãe vegetariana estrita:
1. Tríade clínica clássica: Anemia macrocítica (VCM = 118 fL) + Pancitopenia com neutrófilos hipersegmentados + <strong>Regressão e estagnação do neurodesenvolvimento com hipotonia</strong>;
2. Como a cobalamina atua diretamente na mielinização cerebral e na síntese de metionina, sua carência no cérebro infantil em desenvolvimento gera sintomas neurológicos gravíssimos;
3. O tratamento exige <strong>reposição imediata de Vitamina B12 intramuscular</strong>. A alternativa B descreve um erro médico fatal: prescrever ácido fólico isolado corrigiria a anemia mas aceleraria a degeneração neurológica irreversível. Alternativa C indiscutível.</p>

<h4>Questão 7: UNIFESP — Febre e Hemoterapia em Falciformes</h4>
<p><strong>Enunciado:</strong> Um menino de 7 anos com diagnóstico de anemia falciforme homozigota ($HbSS$) necessita ser submetido a cirurgia eletiva de colecistectomia videolaparoscópica para tratamento de colelitíase sintomática. O paciente encontra-se assintomático, com níveis basais habituais de Hemoglobina de 7,8 g/dL e saturação de O2 de 96% em ar ambiente. No preparo pré-operatório para procedimentos cirúrgicos sob anestesia geral em pacientes com doença falciforme, a diretriz hematológica padrão preconiza:</p>
<p>A) Não transfundir, pois níveis de hemoglobina acima de 7,0 g/dL são contraindicação absoluta para hemoderivados.<br>
B) Realizar transfusão simples pré-operatória de concentrado de hemácias fenotipado e desleucocitado para atingir o nível alvo de Hemoglobina entre 9,0 e 10,0 g/dL, reduzindo a proporção de $HbS$ e prevenindo crises vaso-oclusivas e Síndrome Torácica Aguda no pós-operatório.<br>
C) Realizar exsanguíneotransfusão agressiva objetivando hemoglobina superior a 13,0 g/dL.<br>
D) Administrar apenas suplementação oral de ferro elementar 30 dias antes da cirurgia.<br>
E) Suspender o ácido fólico 2 semanas antes do procedimento anestésico.</p>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
• <strong>Alternativa B (Correta):</strong> A anestesia geral, a intubação orotraqueal e o pneumoperitônio videolaparoscópico impõem estresse hipóxico e acidótico transitório que pode deflagrar falcização maciça e Síndrome Torácica Aguda pós-operatória. O ensaio clínico randomizado clássico <em>Transfusion Alternative in Sickle Cell Anemia (TAPS)</em> comprovou que a <strong>Transfusão Simples Pré-Operatória com alvo de Hemoglobina em torno de 9,0 a 10,0 g/dL</strong> reduz pela metade as complicações pulmonares graves pós-cirúrgicas, com eficácia equivalente à exsanguíneotransfusão agressiva e menor risco de complicações. O sangue deve ser obrigatoriamente <strong>fenotipado e desleucocitado</strong>. Alternativa B impecável.</p>
`
};
