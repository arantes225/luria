// Bloco 6 - Aula 116: Síndromes Glomerulares (Parte 3: Seções 11 a 15)

export const sec11 = {
  id: 'nefrite-lupica-classificacao-isnrps-e-manejo',
  title: '11. Nefrite Lúpica: A Classificação Histopatológica ISN/RPS (Classes I a VI) e Terapia de Indução',
  body_html: `
<h3>O Glomérulo como Espelho do Lúpus Eritematoso Sistêmico</h3>
<p>O acometimento renal no Lúpus Eritematoso Sistêmico (LES) é o principal determinante prognóstico de morbimortalidade e sobrevida a longo prazo. Aproximadamente 50% a 60% de todos os pacientes com LES desenvolverão nefrite clinicamente evidente ao longo do curso da doença, com incidência ainda mais precoce e agressiva em indivíduos jovens, do sexo feminino e de etnia afrodescendente ou hispânica.</p>

<p>A patogenia envolve uma tempestade de quebra de tolerância autoimune com formação maciça de autoanticorpos contra componentes nucleares (notadamente o <strong>Anti-DNA dupla hélice nativo - anti-dsDNA</strong> e o <strong>Anti-Sm</strong>), formação de imunocomplexos circulantes insolúveis que se depositam no mesângio e subendotélio glomerular, além da ligação cruzada direta de anticorpos com antígenos plantados na membrana basal, desencadeando intensa ativação da via clássica do complemento com <strong>consumo simultâneo e profundo de C3 e C4 séricos</strong>.</p>

<h3>A Classificação Histopatológica Oficial ISN/RPS (International Society of Nephrology / Renal Pathology Society)</h3>
<p>A biópsia renal com imunofluorescência é mandatória em qualquer paciente com lúpus que apresente proteinúria persistente $\ge 0,5\\text{ g/24h}$ (ou relação proteína/creatinina urinária $\ge 0,5\\text{ mg/mg}$), sedimento ativo com hematúria dismórfica ou declínio inexplicado da TFG:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Classe ISN/RPS</th>
      <th>Denominação Histológica Oficial</th>
      <th>Achado Histopatológico Predominante</th>
      <th>Apresentação Clínica e Conduta Terapêutica</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Classe I</strong></td>
      <td><strong>Nefrite Lúpica Mesangial Mínima</strong></td>
      <td>Glomérulos normais à microscopia óptica. Imunofluorescência positiva revelando depósitos imunes restritos ao mesângio.</td>
      <td>Micro-hematúria e proteinúria discretas ou ausentes. Não requer terapia imunossupressora renal específica.</td>
    </tr>
    <tr>
      <td><strong>Classe II</strong></td>
      <td><strong>Nefrite Lúpica Proliferativa Mesangial</strong></td>
      <td>Hipercelularidade mesangial pura de qualquer grau com expansão da matriz mesangial e depósitos imunes mesangiais.</td>
      <td>Hematúria microscópica e proteinúria leve (&lt; 1 g/dia). Excelente prognóstico; tratamento nefroprotetor com iECA/BRA e hidroxicloroquina.</td>
    </tr>
    <tr>
      <td><strong>Classe III</strong></td>
      <td><strong>Nefrite Lúpica Focal</strong></td>
      <td>Glomerulonefrite proliferativa endocapilar e/ou extracapilar ativa envolvendo <strong>MENOS DE 50% de todos os glomérulos (&lt; 50%)</strong>.</td>
      <td>Síndrome nefrítica com hematúria dismórfica, hipertensão e proteinúria subnefrótica a nefrótica. <strong>Requer imunossupressão agressiva de indução</strong>.</td>
    </tr>
    <tr>
      <td><strong>Classe IV</strong><br>(A Mais Frequente e Agressiva!)</td>
      <td><strong>Nefrite Lúpica Proliferativa Difusa</strong></td>
      <td>Glomerulonefrite proliferativa endo e extracapilar acometendo <strong>50% OU MAIS de todos os glomérulos ($\ge 50\\%$)</strong>. Presença de <strong>alças em arame ("wire-loop lesions")</strong>, trombos hialinos luminais e crescentes celulares.</td>
      <td><strong>Quadro clínico dramático:</strong> Síndrome nefrítica severa, proteinúria nefrótica maciça, hipertensão refratária, consumo acentuado de C3/C4, títulos astronômicos de anti-dsDNA e risco iminente de perda renal. <strong>Tratamento imediato de indução mandatória</strong>.</td>
    </tr>
    <tr>
      <td><strong>Classe V</strong></td>
      <td><strong>Nefrite Lúpica Membranosa</strong></td>
      <td>Espessamento difuso da membrana basal glomerular com depósitos imunes subepiteliais contínuos e formação de espículas ("spikes").</td>
      <td><strong>Síndrome Nefrótica Pura</strong> com anasarca e dislipidemia. Menor consumo de complemento. Se pura, tratada com micofenolato ou inibidor de calcineurina; se associada à Classe III ou IV (mista), segue o protocolo da classe proliferativa.</td>
    </tr>
    <tr>
      <td><strong>Classe VI</strong></td>
      <td><strong>Nefrite Lúpica Esclerosante Avançada</strong></td>
      <td>Glomeruloesclerose global afetando <strong>90% ou mais de todos os glomérulos ($\ge 90\\%$)</strong> com fibrose intersticial irreversível.</td>
      <td>Doença renal crônica estágio terminal. <strong>Contraindicada imunossupressão agressiva</strong> (não há tecido viável a recuperar); preparo para diálise e transplante renal.</td>
    </tr>
  </tbody>
</table>

<h3>A Imunofluorescência "Full-House" Patognomônica</h3>
<p>Um dos conceitos mais refinados cobrados em provas é o achado de <strong>Padrão Full-House na Imunofluorescência</strong>: ao testar os reagentes na biópsia renal, observa-se <strong>marcação positiva intensa para TODAS as três imunoglobulinas (IgG, IgM e IgA) e para AMBAS as frações do complemento (C3 e C1q) simultaneamente</strong>. Esse padrão de "casa cheia" com depósitos em todos os compartimentos (mesângio, subendotélio e subepitélio) é virtualmente patognomônico de Nefrite Lúpica.</p>

<h3>Protocolos Modernos de Indução e Manutenção (KDIGO 2024)</h3>
<ul>
  <li><strong>Fase de Indução de Remissão (Primeiros 3 a 6 meses para Classes III e IV):</strong>
    <ol>
      <li>Pulsoterapia com <strong>Metilprednisolona Intravenosa</strong> (500 a 1.000 mg/dia por 3 dias consecutivos), seguida de Prednisona oral com desmame rápido;</li>
      <li>Associada a um dos dois esquemas imunossupressores principais:
        <ul>
          <li><strong>Micofenolato de Mofetila (MMF)</strong> na dose de 2 a 3 g/dia oral (superior em afrodescendentes e hispânicos; poupa a fertilidade ovariana em mulheres jovens);</li>
          <li><strong>Ciclofosfamida Intravenosa em Baixa Dose (Protocolo Euro-Lupus):</strong> 500 mg IV a cada 15 dias por 6 doses consecutivas (total de 3 g), com eficácia idêntica e toxicidade gonadal drasticamente inferior ao antigo esquema do NIH de altas doses;</li>
        </ul>
      </li>
      <li><strong>Terapia Tríplice Contemporânea:</strong> A adição recente de <strong>Belimumabe</strong> (anticorpo anti-BLyS) ou <strong>Voclosporina</strong> (novo inibidor de calcineurina) ao MMF e corticoide demonstrou taxas sem precedentes de remissão renal completa e preservação de néfrons;</li>
    </ol>
  </li>
  <li><strong>Fase de Manutenção (Duração mínima de 3 a 5 anos):</strong> <strong>Micofenolato de Mofetila (1 a 2 g/dia)</strong> ou Azatioprina associados a doses baixas de prednisona (&le; 5 mg/dia) e <strong>Hidroxicloroquina</strong> universal obrigatória (a hidroxicloroquina reduz flares renais, protege contra trombose e aumenta a sobrevida global).</li>
</ul>
`
};

export const sec12 = {
  id: 'microangiopatias-tromboticas-shu-ptt-e-crise-renal-esclerodermica',
  title: '12. Microangiopatias Trombóticas Renais: Síndrome Hemolítico-Urêmica (SHU) e Púrpura Trombocitopênica Trombótica (PTT)',
  body_html: `
<h3>O Mecanismo Fisiopatológico Unificado da Microangiopatia Trombótica (MAT)</h3>
<p>As <strong>Microangiopatias Trombóticas (MAT)</strong> compreendem um grupo dramático de afecções microvasculares oclusivas caracterizadas pela lesão primária do endotélio capilar e arteriolar glomerular e sistêmico. A agressão endotelial desencadeia desnudamento da membrana basal, exposição do fator tecidual subendotelial e ativação descontrolada de plaquetas, culminando na formação de <strong>microtrombos plaquetários ricos em fibrina que ocluem a luz da microcirculação</strong>.</p>

<p>Essa oclusão microvascular produz duas consequências clínicas imediatas e inseparáveis:</p>
<ol>
  <li><strong>Anemia Hemolítica Microangiopática (AHMA) com Esquizócitos:</strong> Ao transitarem em alta velocidade pelas arteríolas parcialmente obstruídas por malhas cortantes de fibrina, os eritrócitos sofrem fragmentação mecânica violenta por cisalhamento reológico, gerando <strong>esquizócitos (hemácias fragmentadas em formato de capacete ou meia-lua) visíveis em lâmina de sangue periférico (> 1% a 2%)</strong>, associados a marcadores laboratoriais de hemólise intravascular profunda: queda abrupta de <strong>Haptoglobina (indetectável)</strong>, elevação astronômica de <strong>Desidrogenase Lática (LDH)</strong>, hiperbilirrubinemia indireta e <strong>Teste de Coombs Direto rigorosamente NEGATIVO</strong> (hemólise puramente mecânica e não imune!);</li>
  <li><strong>Plaquetopenia de Consumo:</strong> As plaquetas são consumidas maciçamente no interior dos microtrombos, cursando com trombocitopenia severa (&lt; 50.000 a 100.000/mm³), porém com <strong>coagulograma (TAP/INR e TTPA) estritamente NORMAL</strong> (o que diferencia a MAT da Coagulação Intravascular Disseminada - CIVD, na qual os fatores de coagulação são consumidos e o coagulograma é alargado).</li>
</ol>

<h3>1. Síndrome Hemolítico-Urêmica Típica (SHU-D+ / Pós-Diarreica Infantil)</h3>
<p>Acomete primordialmente crianças pré-escolares entre 1 e 5 anos de idade. É desencadeada pela ingestão de carne bovina malcozida, leite cru ou água contaminada por cepas de <strong><em>Escherichia coli</em> produtora de toxina Shiga (STEC / EHEC, sorotipo clássico O157:H7)</strong> ou <em>Shigella dysenteriae</em> tipo 1:</p>
<ul>
  <li><strong>Evolução Clínica:</strong> Inicia-se com diarreia aguda que se torna intensamente <strong>sanguinolenta (colite hemorrágica)</strong>. Cerca de 5 a 10 dias após o início da diarreia, quando o quadro digestivo começa a regredir, a criança evolui abruptamente com palidez cutânea intensa, petéquias e <strong>Lesão Renal Aguda oligoanúrica grave</strong> com hematúria;</li>
  <li><strong>Conduta e Cuidados Proibidos:</strong> O tratamento é <strong>estritamente de suporte hemodinâmico e dialítico precoce</strong>. <strong>ANTIBIÓTICOS E ANTIDIARREICOS OPIOIDES SÃO FORMALMENTE CONTRAINDICADOS!</strong> A antibioticoterapia induz lise bacteriana maciça no cólon, liberando quantidades colossais de toxina Shiga na corrente sanguínea e agravando drasticamente a necrose endotelial renal. A transfusão de plaquetas deve ser evitada (alimenta a trombose microvascular), reservada apenas para hemorragias graves ativas com risco de morte.</li>
</ul>

<h3>2. Síndrome Hemolítico-Urêmica Atípica (SHUa / Mediada pelo Complemento)</h3>
<p>Pode ocorrer em qualquer faixa etária (crianças e adultos) sem qualquer histórico de diarreia prévia. Decorre de <strong>mutações genéticas hereditárias de perda de função nas proteínas reguladoras da via alternativa do complemento</strong> (Fator H, Fator I, CD46/MCP) ou presença de autoanticorpos anti-Fator H, levando à ativação crônica desimpedida do complexo de ataque à membrana (C5b-9) sobre o endotélio glomerular:</p>
<ul>
  <li>Apresenta prognóstico sombrio com evolução para doença renal terminal em mais de 50% dos casos se não tratada especificamente;</li>
  <li><strong>Terapia Revolucionária de Escolha:</strong> <strong>Eculizumabe ou Ravulizumabe</strong> (anticorpos monoclonais humanizados inibidores específicos da fração C5 do complemento), bloqueando a clivagem de C5 e a formação do complexo lítico C5b-9, com recuperação espetacular da função renal.</li>
</ul>

<h3>3. Púrpura Trombocitopênica Trombótica (PTT)</h3>
<p>A PTT acomete predominantemente adultos jovens (com nítido predomínio feminino). É causada pela <strong>deficiência grave da metaloproteinase ADAMTS13 (atividade funcional inferior a 10%)</strong>, habitualmente decorrente da produção de autoanticorpos adquiridos do tipo IgG anti-ADAMTS13:</p>
<ul>
  <li><strong>Fisiopatologia:</strong> A enzima ADAMTS13 é responsável por clivar e quebrar os <em>ultragrandes multímeros de Fator de von Willebrand (UL-vWF)</em> secretados pelas células endoteliais. Na sua ausência, esses multímeros gigantescos permanecem ancorados na luz vascular, aglutinando plaquetas em cascata em múltiplos órgãos (com <strong>predileção pelo SISTEMA NERVOSO CENTRAL e coração</strong>, enquanto a SHU acomete predominantemente os rins);</li>
  <li><strong>Quadro Clínico e a Pêntade Clássica:</strong> Anemia hemolítica microangiopática + Plaquetopenia profunda (&lt; 20.000 a 30.000/mm³) + <strong>Sintomas Neurológicos Flutuantes</strong> (confusão mental, cefaleia, afasia transitória, convulsões, coma) + Febre + Acometimento renal leve a moderado;</li>
  <li><strong>Tratamento de Emergência:</strong> <strong>PLASMAFÉRESE TERAPÊUTICA IMEDIATA DIÁRIA associada a Corticosteroides e Caplacizumabe</strong> (nanocorpo anti-vWF). A plasmaférese remove os anticorpos anti-ADAMTS13 e repõe a enzima funcional contida no plasma do doador. Sem plasmaférese precoce, a mortalidade ultrapassa 90%!</li>
</ul>
`
};

export const sec13 = {
  id: 'nefropatia-diabetica-e-amiloidose-renal',
  title: '13. Glomerulopatias Não Inflamatórias e Degenerativas: Nefropatia Diabética e Amiloidose Renal',
  body_html: `
<h3>1. Nefropatia Diabética (Doença Renal do Diabetes): A Maior Causa de Diálise no Mundo</h3>
<p>A Nefropatia Diabética é a principal causa isolada de doença renal crônica terminal em todo o mundo ocidental, acometendo entre 30% e 40% de todos os pacientes com Diabetes Mellitus tipo 1 e tipo 2 após 10 a 20 anos de evolução da doença metabólica. Sua fisiopatologia integra estresse hemodinâmico intraglomerular crônico e agressão metabólica celular direta:</p>

<ul>
  <li><strong>Hiperfiltração e Hipertensão Intraglomerular:</strong> A sobrecarga de glicose no túbulo proximal hiperativa o cotransportador sódio-glicose tipo 2 (<strong>SGLT2</strong>), aumentando a reabsorção tubular de sódio junto com a glicose. Como resultado, menos cloreto de sódio alcança a mácula densa no túbulo distal. A mácula densa interpreta a baixa concentração de sódio como hipoperfusão renal e desliga o <em>feedback tubuloglomerular</em>, deflagrando <strong>vasodilatação pronunciada da arteríola aferente</strong>. Concomitantemente, a angiotensina II local induz <strong>vasoconstrição da arteríola eferente</strong>. O gradiente pressórico transcapilar glomerular dispara (hiperfiltração com TFG &gt; 140 mL/min nas fases iniciais), exercendo estresse mecânico de cisalhamento sobre os podócitos e a matriz mesangial;</li>
  <li><strong>Glicosilação Não Enzimática Avançada (AGEs):</strong> A hiperglicemia mantida liga-se covalentemente às proteínas estruturais da membrana basal glomerular e da matriz mesangial formando Produtos Finais de Glicação Avançada (AGEs), que estimulam os receptores RAGE a secretar continuamente <strong>Fator de Crescimento Transformador Beta (TGF-}\\beta$)</strong> e colágeno, promovendo fibrose tecidual progressiva;</li>
  <li><strong>Estágios Evolutivos Clínicos:</strong>
    <ol>
      <li><em>Fase 1: Hipertrofia e Hiperfiltração Glomerular</em> (TFG aumentada, rins grandes);</li>
      <li><em>Fase 2: Lesão Estrutural Silenciosa</em> (Espessamento difuso da MBG com expansão mesangial sem proteinúria);</li>
      <li><em>Fase 3: Albuminúria Moderadamente Aumentada (Antiga Microalbuminúria):</em> Relação Albuminúria/Creatinúria (RAC) entre <strong>30 e 300 mg/g</strong>. Marco inicial do dano nefroniano detectável;</li>
      <li><em>Fase 4: Albuminúria Gravemente Aumentada / Nefropatia Clínica:</em> RAC &gt; 300 mg/g ou proteinúria franca de 24h &gt; 0,5 g/dia, com declínio progressivo e linear da TFG;</li>
      <li><em>Fase 5: Doença Renal Crônica Terminal:</em> TFG &lt; 15 mL/min/1,73m² exigindo diálise ou transplante;</li>
    </ol>
  </li>
  <li><strong>Histopatologia Patognomônica: Nódulos de Kimmelstiel-Wilson:</strong> À microscopia óptica, a expansão mesangial acentuada assume a forma de nódulos arredondados acelulares hialinos e homogêneos corados pelo PAS no centro dos lóbulos glomerulares (<strong>Glomeruloesclerose Nodular de Kimmelstiel-Wilson</strong>);</li>
  <li><strong>Tratamento e Prevenção Baseados em Evidências Modernas:</strong>
    <ul>
      <li>Controle glicêmico estrito ($HbA1c &lt; 7\\%$) e pressórico rigoroso ($PA &lt; 130/80\\text{ mmHg}$);</li>
      <li><strong>Bloqueio do Sistema Renina-Angiotensina com iECA (Enalapril) ou BRA (Losartana):</strong> Vasodilatam a arteríola eferente, reduzindo a pressão intraglomerular e a albuminúria;</li>
      <li><strong>Inibidores de SGLT2 (Dapagliflozina, Empagliflozina):</strong> Bloqueiam a reabsorção tubular proximal de sódio e glicose, restaurando a natriurese na mácula densa e deflagrando o feedback tubuloglomerular com <strong>vasoconstrição protetora da arteríola aferente</strong>, reduzindo a progressão para diálise e a mortalidade cardiovascular em mais de 35% a 40%;</li>
      <li><strong>Antagonista Não Esteroidal do Receptor Mineralocorticoide (Finerenona):</strong> Bloqueia a inflamação e fibrose tecidual com benefício renal comprovado.</li>
    </ul>
  </li>
</ul>

<h3>2. Amiloidose Renal (Amiloidose AL e AA)</h3>
<p>A Amiloidose é uma desordem proteica caracterizada pelo enovelamento incorreto de proteínas precursoras solúveis que se agregam em <strong>fibrilas insolúveis e rígidas de 7 a 10 nm de espessura com conformação molecular de folhas beta-pregueadas cruzadas</strong>, depositando-se patologicamente no espaço extracelular dos glomérulos e vasos renais:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Subtipo de Amiloidose</th>
      <th>Proteína Precursora Circulante</th>
      <th>Condições Clínicas de Base</th>
      <th>Características Clínicas Sistêmicas</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Amiloidose Primária (Amiloidose AL)</strong></td>
      <td><strong>Cadeias Leves de Imunoglobulinas</strong> (predomínio de cadeias leves <strong>Lambda $\lambda$</strong> sobre Kappa $\kappa$ na proporção de 3:1).</td>
      <td>Discrasias de plasmócitos clonais: <strong>Mieloma Múltiplo</strong>, Gamopatia Monoclonal de Significado Indeterminado (MGUS) ou Amiloidose AL sistêmica idiopática.</td>
      <td>Síndrome nefrótica maciça associada a <strong>Cardiomiopatia Infiltrativa Restritiva grave com espessamento miocárdico e baixa voltagem no ECG</strong>, macroglossia exuberante e púrpura periorbital ("olhos de guaxinim").</td>
    </tr>
    <tr>
      <td><strong>Amiloidose Secundária (Amiloidose AA)</strong></td>
      <td><strong>Proteína Amiloide Sérica A (SAA)</strong>, uma proteína de fase aguda sintetizada pelo fígado sob estímulo contínuo de IL-1 e IL-6.</td>
      <td>Processos inflamatórios infecciosos ou reumatológicos crônicos de longa duração: <strong>Artrite Reumatoide, Febre Familiar do Mediterrâneo, Bronquiectasias infectadas, Osteomielite crônica</strong>.</td>
      <td>Síndrome nefrótica e perda progressiva de função renal com hepatoesplenomegalia maciça indolor e ausência habitual de macroglossia ou cardiopatia inicial.</td>
    </tr>
  </tbody>
</table>

<p><strong>O Diagnóstico Histopatológico Patognomônico:</strong></p>
<div class="formula-box">
  $$\\text{Coloração Específica pelo Vermelho Congo (Congo Red)}$$
  $$\\text{Birefringência Verde-Maçã Típica sob Luz Polarizada (Apple-Green Birefringence)}$$
</div>
<p>À microscopia óptica, os depósitos amiloides são amorfos e acelulares, fracamente eosinofílicos e coram-se em vermelho-tijolo pelo Vermelho Congo. Ao acionar os filtros polarizadores do microscópio, as fibrilas em folha beta exibem uma espetacular <strong>birefringência verde-maçã esmeralda brilhante</strong>, selando o diagnóstico definitivo de amiloidose.</p>
`
};

export const sec14 = {
  id: 'guia-definitivo-de-diagnostico-por-imunofluorescencia-e-biopsia',
  title: '14. Compêndio Histopatológico e Guia de Padrões de Imunofluorescência para Provas Top-Tier',
  body_html: `
<h3>Tabela Mestra de Reconhecimento Diagnóstico Instantâneo na Biópsia Renal</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Glomerulopatia Específica</th>
      <th>Padrão de Imunofluorescência (IF)</th>
      <th>Microscopia Óptica (MO)</th>
      <th>Microscopia Eletrônica (ME)</th>
      <th>Status do Complemento Sérico</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Doença por Lesões Mínimas (DLM)</strong></td>
      <td><strong>Completamente NEGATIVA</strong> (sem anticorpos nem complemento)</td>
      <td>Glomérulos <strong>completamente normais</strong> à microscopia comum.</td>
      <td><strong>Apagamento e retração difusa dos pedicelos podocitários.</strong></td>
      <td><strong>NORMAL</strong></td>
    </tr>
    <tr>
      <td><strong>Glomeruloesclerose Segmentar e Focal (GESF)</strong></td>
      <td>Negativa (ou aprisionamento inespecífico de IgM e C3 nas cicatrizes)</td>
      <td><strong>Esclerose e hialinose focal</strong> (&lt; 50% dos glomérulos) e <strong>segmentar</strong> no tufo.</td>
      <td>Apagamento podocitário difuso ou focal com denudamento da MBG.</td>
      <td><strong>NORMAL</strong></td>
    </tr>
    <tr>
      <td><strong>Nefropatia Membranosa</strong></td>
      <td><strong>Deposição Granular Fina e Difusa de IgG e C3</strong> ao longo de todas as alças capilares.</td>
      <td>Espessamento homogêneo difuso da MBG com <strong>"espículas" (spikes) na prata</strong>.</td>
      <td><strong>Depósitos densos subepiteliais</strong> entre a MBG e os pedicelos.</td>
      <td><strong>NORMAL</strong></td>
    </tr>
    <tr>
      <td><strong>Nefropatia por IgA (Berger)</strong></td>
      <td><strong>Deposição Granular Intensa de IgA (e C3)</strong> restrita ao <strong>Mesângio Glomerular</strong>.</td>
      <td>Hipercelularidade e expansão da matriz mesangial (Classificação de Oxford: MEST-C).</td>
      <td>Depósitos elétron-densos restritos ao espaço mesangial e paramesangial.</td>
      <td><strong>NORMAL</strong></td>
    </tr>
    <tr>
      <td><strong>Glomerulonefrite Pós-Estreptocócica (GNPE)</strong></td>
      <td>Deposição granular grosseira de IgG e C3 em "céu estrelado" nas alças e mesângio.</td>
      <td>Glomerulonefrite proliferativa difusa com rica infiltração neutrofílica intracapilar.</td>
      <td><strong>Depósitos densos subepiteliais proeminentes em "ombro de camelo" (HUMPS).</strong></td>
      <td><strong>QUEDA PROFUNDA DE C3 E CH50</strong> (normaliza em até 8 semanas).</td>
    </tr>
    <tr>
      <td><strong>Glomerulonefrite Membranoproliferativa (GNMP)</strong></td>
      <td>Padrão em alças e mesângio de IgG/IgM + C3 (ou C3 isolado nas glomerulopatias por C3).</td>
      <td>Hipercelularidade mesangial e <strong>Duplo Contorno da MBG em trilhos de trem (tram-track)</strong>.</td>
      <td>Depósitos subendoteliais maciços com interposição mesangial circunferencial.</td>
      <td><strong>QUEDA CRÔNICA E PERMANENTE DE C3 E C4</strong></td>
    </tr>
    <tr>
      <td><strong>Doença de Goodpasture (GNRP Tipo I)</strong></td>
      <td><strong>Deposição LINEAR CONTÍNUA de IgG</strong> ao longo de toda a Membrana Basal Glomerular.</td>
      <td>Necrose focal com formação de <strong>Crescentes Celulares em &gt; 50% dos glomérulos</strong>.</td>
      <td>Ruptura e fragmentação mecânica da MBG com fibrina no espaço de Bowman.</td>
      <td><strong>NORMAL</strong></td>
    </tr>
    <tr>
      <td><strong>Nefrite Lúpica Proliferativa (Classe IV do LES)</strong></td>
      <td><strong>Padrão "FULL-HOUSE":</strong> Positividade maciça simultânea para IgG, IgM, IgA, C3 e C1q!</td>
      <td>Proliferação difusa endo/extracapilar, <strong>alças em arame ("wire-loop")</strong> e trombos hialinos.</td>
      <td>Depósitos densos subendoteliais, mesangiais e subepiteliais em todos os estratos.</td>
      <td><strong>QUEDA SIMULTÂNEA PROFUNDA DE C3 E C4</strong></td>
    </tr>
    <tr>
      <td><strong>Vasculites ANCA (GNRP Tipo III / Wegener / PAM)</strong></td>
      <td><strong>PAUCI-IMUNE:</strong> Imunofluorescência completamente negativa ou com escassos traços.</td>
      <td>Glomerulonefrite necrotizante com necrose fibrinoide e crescentes celulares extensos.</td>
      <td>Ruptura da MBG sem depósitos densos significativos de anticorpos.</td>
      <td><strong>NORMAL</strong></td>
    </tr>
  </tbody>
</table>
`
};

export const sec15 = {
  id: 'bateria-de-questoes-comentadas-padrao-revalida-enamed-glomerulares',
  title: '15. Bateria Exaustiva de Questões Comentadas Padrão ENAMED, Revalida e Concursos Top-Tier',
  body_html: `
<h3>Questões de Provas Oficiais com Análise Crítica de Gabarito e Distratores</h3>

<h4>Questão 4: ENAMED — Nefrite Lúpica e Imunofluorescência</h4>
<p><strong>Enunciado:</strong> Uma jovem de 22 anos com diagnóstico prévio de Lúpus Eritematoso Sistêmico comparece à consulta ambulatorial apresentando edema de membros inferiores e urina espumosa há 3 semanas. Os exames laboratoriais revelam creatinina sérica de 1,6 mg/dL, albuminúria em amostra isolada com relação proteína/creatinina de 4,2 mg/mg e sedimento urinário exibindo hematúria dismórfica com cilindros hemáticos e piúria. A dosagem de complemento revela C3 = 28 mg/dL (VR: 90-180) e C4 = 4 mg/dL (VR: 10-40). A paciente é submetida a biópsia renal diagnóstica. O achado de imunofluorescência direta patognomônico que confirma a etiologia lúpica desta glomerulopatia proliferativa difusa é:</p>
<p>A) Deposição linear contínua exclusiva de IgG ao longo de toda a extensão da membrana basal glomerular.<br>
B) Deposição granular isolada de IgA restrita ao compartimento mesangial.<br>
C) Padrão "Full-House", caracterizado pela deposição glomerular maciça concomitante de IgG, IgM, IgA, C3 e C1q em alças capilares e mesângio.<br>
D) Imunofluorescência estritamente negativa para todas as imunoglobulinas (padrão pauci-imune).<br>
E) Deposição exclusiva de cadeias leves kappa com ausência de complemento.</p>
<p><strong>Gabarito Oficial: Alternativa C.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
• <strong>Alternativa C (Correta):</strong> A assinatura imunológica inconfundível da <strong>Nefrite Lúpica (especialmente as classes proliferativas III e IV)</strong> na imunofluorescência direta é o chamado <strong>Padrão "Full-House"</strong> (casa cheia), definido pela marcação positiva e intensa para <strong>TODAS as classes de imunoglobulinas (IgG, IgM, IgA) e para AMBAS as frações do complemento (C3 e C1q)</strong>, distribuídas em alças capilares e matriz mesangial. A alternativa A descreve a Doença de Goodpasture. A alternativa B descreve a Nefropatia por IgA. A alternativa D descreve as vasculites ANCA. A alternativa C é a única correta.</p>

<h4>Questão 5: USP-RP — Diagnóstico da Síndrome Hemolítico-Urêmica na Infância</h4>
<p><strong>Enunciado:</strong> Lactente de 2 anos e meio é internado na enfermaria pediátrica com história de diarreia mucossanguinolenta intensa que se iniciou há 7 dias após ingestão de lanche de carne moída em feira livre. Há 24 horas, a mãe notou palidez acinzentada súbita, sonolência e redução drástica da diurese (apenas uma fralda molhada no dia). O exame físico revela palidez cutâneo-mucosa grave (+4/+4), edema de face, petéquias em membros e pressão arterial elevada para a idade no percentil &gt; 95 + 12 mmHg. Os exames laboratoriais revelam: Hemoglobina = 6,2 g/dL; Plaquetas = 32.000/mm³; Creatinina = 3,4 mg/dL; Ureia = 110 mg/dL; Desidrogenase Lática (LDH) = 2.400 U/L (muito elevada); Haptoglobina indetectável; Coagulograma (TAP/INR e TTPA) normal; Coombs Direto negativo; e a lâmina de sangue periférico demonstra presença de 4% de esquizócitos. Em relação a esta síndrome, é CORRETO afirmar que:</p>
<p>A) O tratamento mandatória imediato inclui a prescrição de ciprofloxacino intravenoso para erradicar a <em>E. coli</em> entero-hemorrágica produtora de toxina Shiga.<br>
B) Trata-se da Síndrome Hemolítico-Urêmica típica (SHU-D+), sendo o tratamento baseado em suporte clínico rigoroso, controle hidroeletrolítico e diálise se indicada, sendo FORMALMENTE CONTRAINDICADO o uso de antibióticos e antidiarreicos pelo risco de agravar a liberação de toxina e a lesão vascular.<br>
C) Deve-se realizar transfusão profilática imediata de concentrado de plaquetas para elevar a contagem acima de 100.000/mm³.<br>
D) A biópsia renal com imunofluorescência linear é necessária antes de iniciar qualquer intervenção.<br>
E) O quadro decorre de deficiência congênita grave da enzima ADAMTS13.</p>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
• <strong>Alternativa B (Correta):</strong> O quadro clínico reúne a tríade clássica da <strong>Síndrome Hemolítico-Urêmica típica (SHU pós-diarreica / D+)</strong>: Anemia Hemolítica Microangiopática (com esquizócitos, LDH altíssimo e Coombs negativo) + Plaquetopenia de consumo com coagulograma normal + Lesão Renal Aguda oligoanúrica. O ponto crítico de prova é o manejo: <strong>ANTIBIÓTICOS SÃO FORMALMENTE PROIBIDOS!</strong> A lise bacteriana pela droga aumenta a liberação intraluminal de toxina Shiga, elevando o risco de necrose cortical renal e óbito. Transfusão de plaquetas também é evitada, pois "alimenta" a trombose microvascular. O tratamento baseia-se em suporte intensivo e diálise precoce. Alternativa B impecável.</p>
`
};
