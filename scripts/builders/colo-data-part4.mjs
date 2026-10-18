// scripts/builders/colo-data-part4.mjs

export const secColo4 = [
  {
    id: 'fisiopatologia-molecular-estadiamento-figo-histologia',
    title: '8. Aprofundamento: Histopatologia do Carcinoma Cervical, Variantes Raras e Estadiamento Clínico-Radiológico FIGO 2018/2026',
    body_html: `
      <h3>Tipos Histológicos Primários do Câncer de Colo Uterino</h3>
      <p>O câncer invasor do colo uterino compreende um espectro heterogêneo de linhagens celulares com comportamento biológico, prognóstico e resposta à quimiorradioterapia distintos:</p>

      <table class="book-table">
        <thead>
          <tr>
            <th>Tipo Histológico</th>
            <th>Proporção Global</th>
            <th>Origem Epitelial e Associação com HPV</th>
            <th>Particularidades Clínicas e Prognósticas</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Carcinoma Epidermoide (Escamoso / Espinocelular)</strong></td>
            <td>Cerca de <strong>75% a 80%</strong> dos casos invasores</td>
            <td>Origina-se do epitélio pavimentoso da zona de transformação ectocervical. Fortemente associado ao <strong>HPV 16</strong> (e em menor grau tipos 18, 31, 33, 45).</td>
            <td>Apresenta progressão típica e sequencial a partir de NIC I &rarr; NIC II &rarr; NIC III. Apresenta padrão exofítico vegetante ("couve-flor"), infiltrativo ulcerado ou endofítico nodular. Alta sensibilidade à radioterapia pélvica e quimioterapia baseada em cisplatina.</td>
          </tr>
          <tr>
            <td><strong>Adenocarcinoma Cervical (Mucinoso e Não Mucinoso)</strong></td>
            <td>Cerca de <strong>15% a 20%</strong> (incidência relativa crescente)</td>
            <td>Origina-se das células glandulares secretoras de muco do canal endocervical. Primordialmente associado ao <strong>HPV 18</strong> (e tipo 45).</td>
            <td>Surge a partir do <strong>Adenocarcinoma <em>in situ</em> (AIS)</strong>. Frequentemente oculto no interior do canal endocervical, com ectocolo macroscopicamente normal, tornando a citopatologia convencional menos sensível (alta taxa de falsos-negativos no raspado ectocervical comum). Tende a ter comportamento mais agressivo, maior propensão a metástases linfonodais pélvicas precoces e menor radiossensibilidade que o carcinoma epidermoide.</td>
          </tr>
          <tr>
            <td><strong>Carcinoma Adenoescamoso</strong></td>
            <td>3% a 5% dos casos</td>
            <td>Exibe diferenciação mista escamosa e glandular no mesmo tumor.</td>
            <td>Prognóstico historicamente mais reservado em comparação aos carcinomas epidermoides puros do mesmo estádio anatômico.</td>
          </tr>
          <tr>
            <td><strong>Carcinoma Neuroendócrino de Pequenas Células (Small Cell)</strong></td>
            <td>Menos de 1% a 2% (raro)</td>
            <td>Origina-se de células neuroendócrinas basais endocervicais.</td>
            <td>Extremamente agressivo e de alto grau mitótico, com disseminação hematogênica sistêmica precoce (fígado, pulmão, cérebro). Tratamento exige esquemas sistêmicos agressivos combinados semelhantes aos do câncer de pulmão pequenas células (platina + etoposídeo).</td>
          </tr>
        </tbody>
      </table>

      <h3>Estadiamento Clínico, Radiológico e Patológico FIGO 2018/2026</h3>
      <p>Historicamente, o câncer de colo de útero era a única neoplasia ginecológica estadiada exclusivamente por métodos clínicos (exame físico bimanual sob anestesia, toque retal, cistoscopia, retossigmoidoscopia e radiografia de tórax), para viabilizar sua aplicação uniforme em países de baixa renda. A partir da atualização da <strong>FIGO 2018 (revisada em 2026)</strong>, foi formalmente autorizada a incorporação de <strong>métodos de imagem seccionais avançados (Ressonância Magnética de pelve e PET-CT)</strong> e achados anátomo-patológicos cirúrgicos para refinar a classificação dos estádios:</p>

      <table class="book-table">
        <thead>
          <tr>
            <th>Estádio FIGO</th>
            <th>Definição Anatômica e Critérios de Extensão</th>
            <th>Conduta Terapêutica Primária</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Estádio I</strong></td>
            <td><strong>Carcinoma estritamente confinado ao colo uterino</strong> (sem extensão corporal ou parametrial).</td>
            <td>Cirúrgica em fases iniciais; preservação da fertilidade possível em IA e IB1 selecionados.</td>
          </tr>
          <tr>
            <td>• <strong>IA1</strong></td>
            <td>Invasão estromal microscópica máxima <strong>&le; 3 mm em profundidade</strong>.</td>
            <td>Conização a frio com margens livres (se desejo reprodutivo) ou Histerectomia Total Simples (tipo A de Piver). Dispensa linfadenectomia.</td>
          </tr>
          <tr>
            <td>• <strong>IA2</strong></td>
            <td>Invasão estromal microscópica <strong>> 3 mm e &le; 5 mm em profundidade</strong>.</td>
            <td>Histerectomia radical modificada + Linfadenectomia pélvica bilateral (ou traquelectomia radical se desejo reprodutivo).</td>
          </tr>
          <tr>
            <td>• <strong>IB1</strong></td>
            <td>Lesão invasora clinicamente visível ou > 5 mm profundidade, com maior diâmetro <strong>&le; 2 cm</strong>.</td>
            <td>Histerectomia Radical com Wertheim-Meigs (tipo C) ou Traquelectomia Radical + Linfadenectomia pélvica.</td>
          </tr>
          <tr>
            <td>• <strong>IB2</strong></td>
            <td>Lesão invasora com maior diâmetro <strong>> 2 cm e &le; 4 cm</strong>.</td>
            <td>Cirurgia de Wertheim-Meigs (Histerectomia Radical + Linfadenectomia Pélvica) ou Quimiorradioterapia primária.</td>
          </tr>
          <tr>
            <td>• <strong>IB3</strong></td>
            <td>Lesão invasora com maior diâmetro <strong>> 4 cm</strong> restrita ao colo.</td>
            <td><strong>Quimiorradioterapia concomitante definitiva</strong> (Cisplatina semanal + Teleterapia externa + Braquiterapia de alta taxa de dose).</td>
          </tr>
          <tr>
            <td><strong>Estádio II</strong></td>
            <td>Tumor invade além do útero, mas <strong>não atinge o terço inferior da vagina nem a parede pélvica</strong>.</td>
            <td>Quimiorradioterapia primária (exceto IIA1 inicial que pode ser cirúrgico).</td>
          </tr>
          <tr>
            <td>• <strong>IIA1 e IIA2</strong></td>
            <td>Invasão dos dois terços superiores da vagina <strong>sem invasão parametrial</strong> (&le; 4 cm no IIA1; > 4 cm no IIA2).</td>
            <td>IIA1 pode operar (Wertheim-Meigs); IIA2 é tratado com Quimiorradioterapia definitiva.</td>
          </tr>
          <tr>
            <td>• <strong>IIB</strong></td>
            <td><strong>Invasão evidente do paramétrio</strong> (parametrite neoplásica nodular ao toque retal), mas sem atingir a parede óssea pélvica.</td>
            <td><strong>QUIMIORRADIOTERAPIA DEFINITIVA</strong>. A cirurgia de Wertheim-Meigs é contraindicada pelo comprometimento parametrial (não atinge margens livres).</td>
          </tr>
          <tr>
            <td><strong>Estádio III</strong></td>
            <td>Tumor envolve o <strong>terço inferior da vagina</strong>, estende-se até a <strong>parede óssea pélvica</strong>, causa <strong>hidronefrose / rim não funcionante</strong> OU apresenta <strong>metástases linfonodais confirmadas</strong>.</td>
            <td>Quimiorradioterapia definitiva.</td>
          </tr>
          <tr>
            <td>• <strong>IIIA</strong></td>
            <td>Invasão do terço inferior da vagina, sem extensão à parede pélvica.</td>
            <td>Quimiorradioterapia definitiva.</td>
          </tr>
          <tr>
            <td>• <strong>IIIB</strong></td>
            <td>Extensão até a parede óssea pélvica e/ou hidronefrose ou exclusão funcional renal.</td>
            <td>Quimiorradioterapia definitiva.</td>
          </tr>
          <tr>
            <td>• <strong>IIIC1 e IIIC2</strong></td>
            <td><strong>Metástases Linfonodais</strong> documentadas por imagem ou patologia (IIIC1: linfonodos pélvicos; IIIC2: linfonodos para-aórticos).</td>
            <td>Quimiorradioterapia definitiva (com extensão de campo para-aórtico se IIIC2).</td>
          </tr>
          <tr>
            <td><strong>Estádio IV</strong></td>
            <td>Tumor invade a <strong>mucosa da bexiga urinária ou reto</strong> (confirmado por biópsia) OU <strong>metástases à distância</strong>.</td>
            <td>Paliativo / Quimioterapia sistêmica com imunoterapia (Anti-PD-1: Pembrolizumabe) + Terapia antiangiogênica (Bevacizumabe).</td>
          </tr>
        </tbody>
      </table>
    `
  },
  {
    id: 'testes-dna-hpv-biologia-molecular-futuro-do-rastreamento',
    title: '9. Testes Moleculares de DNA-HPV: A Transição Mundial e o Projeto Piloto no SUS',
    body_html: `
      <h3>O Esgotamento da Citopatologia e a Superioridade dos Testes Moleculares</h3>
      <p>Embora a citopatologia convencional pelo método de Papanicolau tenha reduzido historicamente a mortalidade por câncer de colo uterino em países desenvolvidos com alta cobertura populacional organizada, o exame apresenta limitações inerentes de desempenho diagnóstico. Em condições reais de atenção primária, a sensibilidade da citologia para detecção de lesões precursoras de alto grau (NIC II/III) situa-se entre <strong>50% e 60%</strong>, decorrente de fatores de amostragem no raspado, sobreposição celular, processos inflamatórios e subjetividade interobservador na leitura microscópica.</p>

      <p>Em contrapartida, os <strong>Testes de Biologia Molecular para Detecção de DNA de HPV de Alto Risco Oncogênico (testes de PCR ou captura híbrida)</strong> apresentam <strong>sensibilidade superior a 95%</strong> e altíssimo <strong>Valor Preditivo Negativo (VPN > 99%)</strong>. Uma mulher com teste molecular negativo para HPV oncogênico apresenta risco virtualmente nulo de desenvolver câncer invasor do colo uterino nos 5 a 10 anos subsequentes.</p>

      <h3>Recomendações da Organização Mundial da Saúde (OMS) e o Futuro no Brasil</h3>
      <ul>
        <li><strong>Diretriz Global da OMS (2021/2026):</strong> Recomenda enfaticamente a substituição da citopatologia pelo <strong>teste de DNA-HPV como método primário de rastreamento</strong> populacional, iniciando aos <strong>30 anos de idade</strong>, com intervalo seguro de <strong>5 a 10 anos</strong> entre os testes negativos;</li>
        <li><strong>Genotipagem Parcial para Tipos 16 e 18:</strong> Os testes modernos realizam a genotipagem seletiva imediata para os subtipos 16 e 18. Mulheres com teste positivo para HPV 16 ou 18 são encaminhadas <strong>diretamente para colposcopia</strong> devido ao risco imediato de lesão grave;</li>
        <li><strong>Triagem (Triage) Citológica ou por Biomarcadores:</strong> Caso o teste de DNA-HPV seja positivo para o pool dos demais tipos de alto risco (não-16/18), realiza-se a triagem citológica (em base líquida na mesma amostra coletada) ou teste de imunocitoquímica dupla para <strong>p16/Ki-67</strong>: se a citologia ou p16/Ki-67 for alterada, encaminha-se para colposcopia; se normal, repete-se o teste em 12 meses;</li>
        <li><strong>Implementação no Sistema Único de Saúde (SUS):</strong> A Comissão Nacional de Incorporação de Tecnologias no Sistema Único de Saúde (CONITEC) aprovou a incorporação progressiva do teste de DNA-HPV para rastreamento cervical no SUS. Até que a transição nacional e a infraestrutura logística estejam universalmente estabelecidas em todos os municípios brasileiros, <strong>permanecem vigentes e plenamente exigidas em provas as Diretrizes Brasileiras com Citopatologia Convencional</strong> (dos 25 aos 64 anos, com intervalo anual e trienal).</li>
      </ul>
    `
  },
  {
    id: 'conizacao-tecnicas-margens-e-risco-obstetrico',
    title: '10. Procedimentos Cirúrgicos do Colo Uterino: Aspectos Técnicos e Preservação da Fertilidade',
    body_html: `
      <h3>Detalhes Operatórios da Cirurgia de Alta Frequência (CAF / EZPEC / LEEP)</h3>
      <p>A Cirurgia de Alta Frequência revolucionou o tratamento das neoplasias intraepiteliais cervicais ao transformar um procedimento cirúrgico que exigia internação em um ato ambulatorial rápido e de alta resolubilidade:</p>
      
      <h4>Passo a Passo Técnico:</h4>
      <ol>
        <li><strong>Inspeção Colposcópica Imediata Pré-Operatória:</strong> Confirmação topográfica dos limites externos da lesão acetobranca após aplicação de ácido acético a 5% e demarcação da área iodonegativa pelo teste de Schiller com Lugol;</li>
        <li><strong>Anestesia Local Infiltrativa com Vasoconstritor:</strong> Infiltração paracervical ou estromal do colo uterino nas posições horárias de 3, 6, 9 e 12 horas utilizando lidocaína a 1% ou 2% associada a epinefrina (1:100.000 ou 1:200.000), garantindo analgesia completa e expressiva vasoconstrição estromal temporária para minimizar o sangramento operatório;</li>
        <li><strong>Seleção Adequada da Alça Diatérmica:</strong>
          <ul>
            <li><strong>Excisão Tipo 1 (ZT 1):</strong> Alça circular rasa (1,5 a 2,0 cm de largura por 0,5 a 0,8 cm de profundidade);</li>
            <li><strong>Excisão Tipo 2 (ZT 2):</strong> Alça de maior curvatura, retirando de 1,0 a 1,5 cm de profundidade para alcançar a JEC;</li>
            <li><strong>Excisão Tipo 3:</strong> Excisão profunda que avança de 1,5 a 2,5 cm no canal endocervical (indicada somente se conização a frio não estiver disponível);</li>
          </ul>
        </li>
        <li><strong>Passagem Contínua da Alça:</strong> A alça de tungstênio deve ser acionada no modo de corte puro ou corte misto (blend) e transpassar o colo em <em>movimento único, suave e perpendicular</em>, evitando paradas mecânicas que causam queima excessiva e carbonização das margens anatômicas da peça;</li>
        <li><strong>Hemostasia do Leito Cirúrgico:</strong> Eletrocoagulação pontual com eletrodo esférico (ball electrode) e aplicação tópica de pasta de Monsel (solução de subsulfato férrico), que exerce efeito hemostático químico estrogênico por precipitação proteica.</li>
      </ol>

      <h3>Manejo das Complicações Obstétricas Pós-Tratamento Excisional</h3>
      <p>Mulheres submetidas a conizações excisionais cervicais (especialmente conizações a frio clássicas ou CAFs com profundidade de ressecção > 1,5-2,0 cm) apresentam risco aumentado nas gestações subsequentes de:</p>
      <ul>
        <li><strong>Insuficiência Istmocervical (IIC):</strong> Dilatação cervical indolor no segundo trimestre com herniação das membranas e perda fetal;</li>
        <li><strong>Parto Prematuro Espontâneo e Ruptura Prematura de Membranas Ovulares (RPMO):</strong> Secundários ao encurtamento anatômico do comprimento cervical e à perda da barreira mecânica do muco cervical antibacteriano;</li>
        <li><strong>Conduta Obstétrica Preventiva:</strong> Toda gestante com histórico de conização cervical prévia deve ser monitorizada com <strong>ultrassonografia transvaginal seriada para medida do comprimento cervical</strong> entre 16 e 24 semanas de gestação. Se o comprimento cervical for <strong>&le; 25 mm</strong> antes de 24 semanas, está formalmente indicado o tratamento com <strong>Progesterona Natural Micronizada vaginal (200 mg/dia ao deitar)</strong> até 36 semanas, associada ou não à realização de <em>cerclagem cervical</em> (técnica de McDonald) se houver histórico de perdas gestacionais prévias no segundo trimestre.</li>
      </ul>
    `
  }
];
