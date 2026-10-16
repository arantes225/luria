# LURIA — Lote 6 · Tema 122 · Controle de reconciliação e revisão científico-editorial
**Revisão:** 16/10/2026. **Status:** RASCUNHO CONSOLIDADO PARA REVISÃO CLÍNICA; SEM PUBLICAÇÃO, MERGE OU DEPLOY.

## 1. O que foi comparado antes de editar

**Documento principal preservado (linha 06):**
`apostilas/_rascunhos/lote-06-122-perfuracao-de-viscera-oca.md`, origem: `editorial/lote-06-auditoria-20261014`. Antes: **111.814 caracteres brutos**, **8 casos** e **12 questões** (números por marcadores Markdown), 31 capítulos de corpo, casos, questões e bibliografia. Já cobrindo pneumoperitônio, RX, TC, trauma, diverticulite, úlcera, Boerhaave, perfurações iatrogênicas e antibióticos.

**Documento complementar preservado (linha 07 legada):**
`apostilas/_rascunhos/lote-07-aula-122-perfuracao-viscera-oca.md`, existente no ramo de continuação, origem `main`. Antes: **79.156 caracteres brutos**, 9 casos e 14 questões, com organização por mecanismos e discussão de TC como mapa operatório, perfuração cecal por tumor distal, e atualização SIS 2024.

**Racional para não concatenar os arquivos:** ambas as bases explicam anatomia, cirurgia, antibióticos e alguns cenários repetidos, mas não possuem o mesmo sequenciamento nem as mesmas vinhetas. A estratégia foi **preservar a linha 06 completa** e transferir **competências ausentes/insuficientemente operacionais** da linha 07 sob texto original e exemplos próprios. A linha 07 continua disponível integralmente no ramo; nenhuma frase ou questão foi copiada mecanicamente dela.

## 2. Etapa Zero — benchmarking externo realmente lido ANTES da edição

Arquivos acessados no Google Drive em 16/10/2026:
1. `13 - ABDOME AGUDO PERFURATIVO.pdf`, **4.012 caracteres extraídos**: tipos de perfuração, pneumoperitônio e sinais radiológicos, perfuração de úlcera, Boerhaave, cirurgia e manejo conservador excepcional. Traz simplificações (“cirurgia para toda ruptura esofágica” e “90% de úlcera perfurada por H. pylori”), que **não foram aceitas** como verdade universal.
2. `10 - ABDOME AGUDO INFLAMATORIO - DIVERTICULITE AGUDA.pdf`, **6.088 caracteres**: Hinchey, abscesso, peritonite e estratégia operatória; simplificações tipo “Hinchey IV = Hartmann sempre” precisam ser confrontadas com WSES.
3. `12 - ABDOME AGUDO OBSTRUTIVO.pdf`, **7.717 caracteres**: obstrução, causas neoplásicas, distensão proximal, peritonite e consequências, usado somente para verificar o recorte obstrução → isquemia → perfuração.

**Proveniência:** PDFs identificados como material com circulação “Medicina Livre”; **autoria como Estratégia MED não confirmada**. São resumos, não livro-texto equivalente para benchmark pleno. Nenhum trecho, gráfico, tabela ou radiografia do Drive foi reproduzido. A comparação deste acervo serve ao levantamento de tópicos, não à autorização de uso comercial de imagem.

## 3. Diretrizes primárias confrontadas e decisões

| Fonte verificada | Conteúdo utilizado | Limitação interpretativa |
|---|---|---|
| WSES 2020: `https://pmc.ncbi.nlm.nih.gov/articles/PMC6947898/` | Úlcera perfurada, operação/ressuscitação, tratamento não operatório somente em caso excepcional com selamento confirmado e monitorização | Não basta “pneumoperitônio pequeno” isoladamente para indicar conservador |
| WSES 2020: `https://pmc.ncbi.nlm.nih.gov/articles/PMC7206757/` | Diverticulite com gás distante sem fluido difuso: não operatório apenas em **selecionados** com seguimento estreito; peritonite requer intervenção | Não atribuir “Hartmann obrigatório” a todos os Hinchey IV ou peritonite |
| WSES 2022: `https://pmc.ncbi.nlm.nih.gov/articles/PMC8896237/` | Trauma intestinal: TC inicial pode ser equívoca, necessidade de exames seriados, TC repetida após aproximadamente 6 h em casos selecionados | Reimagem não substitui cirurgia na deterioração |
| SIS 2024: `https://journals.sagepub.com/doi/full/10.1089/sur.2024.137` | Até **4 dias** após controle adequado em muitos casos; grupo de críticos selecionados pode receber sugestão de limite próximo a **8 dias** | Não recomendar oito dias para todo paciente de UTI nem quatro dias quando falta controle do foco |
| SSC 2026: `https://www.sccm.org/clinical-resources/guidelines/guidelines/surviving-sepsis-campaign-international-guidelines-for-management-of-sepsis-and-septic-shock-2026` | Controle precoce da fonte em **adultos** com sepse/choque e anatomia que exige intervenção, idealmente **dentro de seis horas** (condicional; evidência muito baixa) | Seis horas não são período autorizado de espera; não extrapolar guideline de adulto ao cuidado pediátrico |

## 4. Conteúdo novo incorporado ao Markdown principal

**Arquivo consolidado:** `apostilas/_rascunhos/lote-06-122-perfuracao-de-viscera-oca.md` no ramo `editorial/lote-06-continuacao-132-137-20261015`.

| Posição | Nova contribuição | Lacuna sanada |
|---|---|---|
| **10.4** | TC em sete perguntas; tabela gás/parede/líquido/causa/obstrução/qualidade/urgência, critérios para não atrasar cirurgia, diferenciação pneumoperitônio/pneumoretroperitônio/pneumatose | A versão anterior continha achados mas não guia completo de interpretação sistemática |
| **13.5** | Duração pós-controle fonte em SIS 2024: distinção **até quatro dias** versus subgrupos críticos com sugestão **até oito dias**, diferenciação de falha de controle e profilaxia em trauma | A versão anterior enfatizava só o curso curto e exceções genéricas |
| **18.5** | Explicação mecânica de obstrução distal e perfuração proximal/cecal, repercussão da válvula ileocecal, fluxograma operacional | Perfuração por neoplasia já citada, mas merecia explicação completa da relação causa-orifício |
| **Caso 9** | Neoplasia obstrutiva de sigmoide com perfuração cecal, laudo e decisões resolvidas | Complementa casos de perfuração estercoral e pós-operatória |
| **Caso 10** | Paciente melhorando após reparo de úlcera, risco de antibioticoterapia longa sem necessidade; contraexemplo para fonte não controlada | Treina stewardship pós-operatório com raciocínio causal |
| **Questão 13** | Obstrução tumoral distal versus ruptura cecal, comentário A–D | Avalia raciocínio topográfico |
| **Questão 14** | SIS 2024, crítica à regra de 4 dias para todos os críticos, com justificativas | Avalia ciência aplicada a duração e condição |

**Após revisão:** **129.525 caracteres brutos**, **10 casos clínicos**, **14 questões**. Foram preservados os 8/12 anteriores e adicionadas 2/2. **Isso não certifica 60.000 caracteres didáticos únicos, texto sem redundância semântica, qualidade de dose ou aprovação externa.** O arquivo `lote-07-aula-122-perfuracao-viscera-oca.md` não foi sobrescrito nem apagado.

## 5. Curadoria visual e licença: catalogar sem publicar

O manifesto `apostilas/_rascunhos/lote-06-122-imagens-candidatas-parciais.json` foi trazido do ramo anterior e suas **dez páginas de origem** checadas. **Todas têm indicação de licença na página**, principalmente Wikimedia Commons CC BY/CC BY-SA e um capítulo de radiologia NCBI aberto sob CC BY 4.0, sujeito a crédito de terceiros na figura. Uma discrepância de catálogo foi **corrigida:** `122-C10` (pneumoperitônio pós-operatório, Hellerhoff) usa **CC BY-SA 4.0**, e não CC BY-SA 3.0. Exige atribuição/ShareAlike para adaptações.

**Alertas pedagógicos:** C03–C05 pertencem ao **mesmo paciente/mesmo caso** de deiscência; C02/C06 são alternativas de Chilaiditi e C08/C09 alternativas do sinal de Rigler. Assim, dez links de origem **não equivalem a dez imagens complementares independentes**. Cada imagem requer decisão de necessidade, leitura radiológica, atribuição completa, processamento de arquivo e aprovação Admin. **Nenhuma imagem foi baixada, incorporada, convertida em WebP ou aprovada.**

## 6. Portões de publicação bloqueados

- [x] Etapa Zero com leitura real de três PDFs comparáveis e explicitação de limites.
- [x] Confronto da LURIA linha 06 e linha 07, preservação da base e acréscimo focal.
- [x] Fontes internacionais principais verificadas quanto aos pontos acrescentados.
- [x] 10 casos/14 questões com incremento original e rascunho salvo fora de `main`.
- [x] Manifesto com dez **fontes de imagem**, incluindo correção de licença C10.
- [ ] Benchmarks extensos de qualidade equivalente com autoria institucional comprovada (prioridade Estratégia MED, se acessível).
- [ ] Revisão de cirurgia de emergência/anestesia/infectologia para diagnóstico e farmacoterapia, doses e contraindicações em SUS brasileiro.
- [ ] Auditoria semântica de repetição e **teste de autossuficiência do aluno** sem consultar o gabarito das questões; contagem real de texto útil.
- [ ] Seleção de figuras **independentes** e aprovação Admin, com créditos, arquivos WebP, licença comercial/ShareAlike e avaliação da imagem por radiologista.
- [ ] Atualizar o arquivo **JSON de build** e a **prévia HTML antigos** para refletir os dois casos, duas questões e três subseções; as versões antigas na branch de origem ficaram **obsoletas por este conteúdo** e não devem ser usadas para publicação.
- [ ] Executar scripts oficiais de QA, validação de HTML/CSP/IDs, navegadores desktop/PWA e revisão clínica externa.
- [ ] Merge/deploy somente após gate de certificação. **Nenhum realizado nesta etapa.**

**Próxima apostila em fila de reconciliação:** **123 — Febre sem Sinais Localizatórios**, com duas bases de redação e quatro exercícios extras na linha 07 a confrontar.
