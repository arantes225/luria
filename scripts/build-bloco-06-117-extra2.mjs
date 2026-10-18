// scripts/build-bloco-06-117-extra2.mjs
// Seção extra 2 de aprofundamento para Aula 117: Isquemia Mesentérica

export const secEndovascularEAvancos = {
  id: 'terapia-endovascular-avancada-e-terapia-intensiva-perioperatoria',
  title: '5. Técnicas Endovasculares Avançadas, Cuidados Críticos em UTI, Nutrição Parenteral e Prevenção de Complicações',
  body_html: `
<h3>A Revolução Endovascular na Isquemia Mesentérica Aguda e Crônica</h3>
<p>O tratamento das afecções isquêmicas intestinais foi amplamente transformado pelo avanço das técnicas percutâneas guiadas por fluoroscopia em salas híbridas de hemodinâmica. A abordagem endovascular minimamente invasiva oferece a extraordinária vantagem de restaurar a perfusão tecidual sem a necessidade de toracotomia ou laparotomia de grande porte em pacientes idosos, cardiopatas graves e instáveis:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Procedimento Endovascular</th>
      <th>Vias de Acesso e Dispositivos Utilizados</th>
      <th>Indicações Clínicas e Critérios Anatômicos</th>
      <th>Taxa de Sucesso Técnico e Complicações Potenciais</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Aspiração Mecânica e Trombectomia Farmacomecânica</strong></td>
      <td>Acesso por punção da <strong>Artéria Braquial Esquerda</strong> (que oferece trajeto descendente favorável com menor ângulo de entrada no óstio da AMS) ou punção femoral retrógrada. Utilização de cateteres de aspiração de grande calibre (6F a 8F) acoplados a sistemas de aspiração a vácuo contínuo (AngioJet, Indigo/Penumbra).</td>
      <td><strong>Embolia aguda da AMS</strong> e trombose arterial recente diagnosticada precocemente em pacientes <strong>SEM sinais peritoneais francos de necrose intestinal</strong>.</td>
      <td>Sucesso técnico de recanalização em <strong>80% a 90% dos casos</strong>. Complicações: dissecção da parede arterial da AMS, embolização distal de microtrombos para alças ileais e sangramento no sítio de punção braquial com hematoma local.</td>
    </tr>
    <tr>
      <td><strong>Trombolise Guiada por Cateter Intramesentérico</strong></td>
      <td>Infusão contínua intraluminal de trombolítico de última geração (Alteplase / rt-PA na dose de 0,5 a 1,0 mg/hora) diretamente no trombo oclusivo associada à heparinização sistêmica.</td>
      <td>Trombose arterial subaguda ou trombose venosa mesentérica extensa refratária à heparina. <strong>Contraindicada se sangramento gastrointestinal ativo, cirurgia de grande porte nas últimas 2 semanas ou necrose intestinal suspeita.</strong></td>
      <td>Risco significativo de hemorragia intraperitoneal maciça através de alças isquêmicas previamente friáveis e sangramento sistêmico grave.</td>
    </tr>
    <tr>
      <td><strong>Angioplastia com Stent Balão-Expansível Ostial</strong></td>
      <td>Posicionamento de <strong>Stent metálico balão-expansível revestido (coberto) ou não revestido</strong> na origem da AMS ou tronco celíaco, sob fluoroscopia de alta resolução, ultrapassando a placa aterosclerótica calcificada estenosante em 1 a 2 mm para a luz da aorta.</td>
      <td><strong>Padrão-ouro absoluto na Isquemia Mesentérica Crônica (Angina Abdominal)</strong> e na trombose aguda sobre placa calcificada estável. Os stents revestidos (covered stents) apresentam taxas de patência primária a longo prazo significativamente superiores aos stents convencionais (85% vs 65% em 3 anos).</td>
      <td>Alívio imediato dos sintomas pós-prandiais, recuperação do ganho de peso e prevenção de oclusão aguda trombótica fatal. Taxa de re-estenose tratável por nova angioplastia com balão farmacológico.</td>
    </tr>
  </tbody>
</table>

<h3>Suporte Hemodinâmico Intensivo e Cuidados Críticos em UTI</h3>
<p>O paciente que sobrevive a um episódio de isquemia mesentérica aguda e é submetido à revascularização vascular enfrenta uma fase crítica de cuidados pós-operatórios na Unidade de Terapia Intensiva:</p>
<ol>
  <li><strong>Ressuscitação Hemodinâmica com Cristaloides Balanceados:</strong> A lesão de reperfusão induz aumento massivo da permeabilidade capilar sistêmica, com perda colossal de fluidos para o terceiro espaço intra-abdominal. O objetivo hemodinâmico é garantir <strong>Débito Cardíaco e Pressão de Perfusão satisfatórios (PAM $\ge 65$ a $70$ mmHg)</strong>;</li>
  <li><strong>A Escolha Crítica de Drogas Vasoativas na UTI:</strong>
    <ul>
      <li><em>Vasopressores Potentes:</em> Devem ser utilizados com extremo comedimento. A <strong>Noradrenalina</strong> é o vasopressor de escolha para restauração da PAM; contudo, doses excessivas agravam a vasoconstrição esplâncnica secundária;</li>
      <li><em>Evitar Vasopressina e Adrenalina em Doses Elevadas:</em> A vasopressina atua diretamente nos receptores V1 da musculatura lisa vascular mesentérica, promovendo vasoconstrição esplâncnica devastadora que pode induzir re-isquemia das alças recém-revascularizadas;</li>
      <li><em>Inotrópicos no Baixo Débito:</em> Se houver disfunção ventricular miocárdica (choque cardiogênico ou choque séptico com miocardiopatia séptica), a associação precoce de <strong>Dobutamina (2,5 a 10 $\mu$g/kg/min)</strong> ou Milrinona melhora o débito cardíaco sistêmico e otimiza a perfusão da microcirculação das vilosidades intestinais;</li>
    </ul>
  </li>
  <li><strong>Monitorização Contínua da Pressão Intra-Abdominal (PIA) e Prevenção da Síndrome Compartimental Abdominal (SCA):</strong>
    <p>O edema maciço da parede do intestino delgado e o volumoso acúmulo de líquido ascite inflamatório na cavidade peritoneal pós-reperfusão elevam expressivamente a pressão no interior do abdome. Todo paciente crítico pós-isquemia deve ser monitorado por <strong>mensuração seriada da Pressão Intra-Abdominal via Cateter Vesical de Demora (técnica transvesical com instilação de 25 mL de soro fisiológico)</strong>:</p>
    <ul>
      <li><em>Hipertensão Intra-Abdominal (HIA):</em> Definida como PIA mantida $\ge 12$ mmHg;</li>
      <li><em>Síndrome Compartimental Abdominal (SCA):</em> Definida como <strong>PIA sustentada $&gt; 20$ mmHg associada a nova disfunção orgânica de órgãos nobres</strong> (queda do débito urinário por compressão renal, aumento das pressões de pico ventilatório por elevação diafragmática e hipotensão por compressão da veia cava inferior e queda do retorno venoso);</li>
      <li><em>Prevenção e Conduta:</em> A manutenção do <strong>abdome aberto em laparostomia (com curativo a vácuo / bolsa de Bogotá)</strong> na primeira cirurgia é a intervenção preventiva mais eficaz para evitar a SCA. Se o abdome foi fechado primariamente e desenvolve SCA, a <strong>reabertura descompressiva cirúrgica imediata à beira do leito na UTI</strong> é procedimento salvador de vida mandatório.</li>
    </ul>
  </li>
  <li><strong>Manejo Nutricional e Introdução de Nutrição Parenteral Total (NPT):</strong>
    <p>Pacientes submetidos a ressecções intestinais extensas ou em abdome aberto com laparostomia não toleram dieta enteral precoce. A <strong>Nutrição Parenteral Total (NPT) por cateter venoso central profundo exclusivo</strong> deve ser iniciada precocemente (dentro de 48 a 72 horas de estabilização pós-operatória), fornecendo aporte balanceado de glicose, emulsões lipídicas com triglicerídeos de cadeia média e longa, aminoácidos e micronutrientes (zinco, selênio e vitaminas hidrossolúveis) para sustentar a síntese proteica reparadora e regeneração epitelial intestinal.</p>
  </li>
  <li><strong>Profilaxia Trombótica Secundária e Anticoagulação Prolongada:</strong>
    <p>A heparinização intravenosa não fracionada contínua deve ser mantida ao longo de todo o período pós-operatório imediato. Após a estabilização e fechamento definitivo da parede abdominal, realiza-se a transição para <strong>Anticoagulação Oral Definitiva</strong> (com Anticoagulantes Orais Diretos - DOACs como Rivaroxabana ou Apixabana, ou Varfarina com alvo de RNI entre 2,0 e 3,0):</p>
    <ul>
      <li>Na <strong>Embolia da AMS secundária à Fibrilação Atrial</strong>: anticoagulação oral plena por <strong>tempo indeterminado (para toda a vida)</strong> para prevenir novos eventos cardioembólicos em outros leitos vasculares (como AVC isquêmico);</li>
      <li>Na <strong>Trombose Venosa Mesentérica por Trombofilia Primária</strong>: anticoagulação mantida por no mínimo 6 a 12 meses, ou por tempo indeterminado se mutações de alto risco (homozigose para Fator V de Leiden ou SAF);</li>
      <li>Na <strong>Trombose Arterial com Stent Mesentérico</strong>: dupla antiagregação plaquetária (AAS + Clopidogrel) por 1 a 3 meses, seguida de monoterapia com AAS indefinidamente.</li>
    </ul>
  </li>
  <li><strong>Diagnóstico Precoce da Re-Oclusão e Falência do Enxerto:</strong>
    <p>O retorno súbito de dor abdominal intensa na UTI, nova elevação do lactato sérico, taquicardia inexplicada ou piora da acidose metabólica em paciente revascularizado deve suscitar <strong>imediata suspeita de trombose precoce do enxerto vascular ou oclusão do stent</strong>. A realização de nova Angio-TC de emergência ou relaparotomia descompressiva não deve ser postergada.</p>
  </li>
</ol>
`
};
