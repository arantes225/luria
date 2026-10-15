# LURIA — Lote 02 · Auditoria de autossuficiência e segurança científica

> **Data de referência:** 14/10/2026 · **Escopo:** cinco manuscritos da branch `editorial/apostilas-lote-02-asma-20261014` · **Status: AUDITORIA PARCIAL, NÃO CERTIFICADA, SEM MERGE/DEPLOY**.

## 1. Procedimento e regras

Esta auditoria aplicou o `lead_apostilas`, `apostilas/PRODUCAO_EM_LOTE.md`, `apostilas/EDITORIAL_STANDARD.md` e leitura comparativa obrigatória no Drive. Reabertos em 14/10/2026 os materiais *Asma.pdf*, *DPOC estável.pdf*, *01 - DIABETES - CLASSIFICACAO, FISIOPATOLOGIA E DIAGNOSTICO DO DM.pdf*, *Pneumonia Comunitária na Pediatria.pdf* e *02 - INFECTOLOGIA - TUBERCULOSE.pdf*. A identificação de autoria Estratégia MED **não pôde ser comprovada**; o arquivo de pneumonia é **pediátrico, não uma referência comparativa adulta equivalente**. Nenhum texto/imagem/tabela privado do Drive foi incorporado.

Comparadas afirmações-chave com **GINA 2026 (fonte primária de asma)**, **GOLD 2026 (DPOC)**, **SBD 2026 (DM2)**, **ATS — diretriz CAP 2025, publicada online em 18/07/2025 e no volume de janeiro/2026**, e **Ministério da Saúde, Nota Informativa nº 2/2026 (TB resistente)**. A checagem é **pontual**, não uma verificação linha a linha de todas as dezenas de prescrições e estudos. Nenhum validador do renderer ou do PWA foi executado, pois os manuscritos ainda não estão convertidos a JSON de livro.

## 2. Medições reprodutíveis no material editorial

| Livro | Caracteres brutos Markdown | Texto linear aproximado sem cabeçalhos, sintaxe Markdown, tabelas e callouts* | Casos | Questões | Parágrafos exatos repetidos ≥170 caracteres** |
| --- | ---: | ---: | ---: | ---: | ---: |
| Asma brônquica | 74.961 | 59.422 | 8 | 12 | 0 |
| DPOC | 78.323 | 65.393 | 12 | 16 | 0 |
| Diabetes mellitus | 73.020 | 58.832 | 10 | 16 | 0 |
| Pneumonia adquirida na comunidade do adulto | 69.435 | 56.368 | 12 | 18 | 0 |
| Tuberculose | 85.383 | 67.277 | 10 | 18 | 0 |

* **Não é contagem de “conteúdo útil”.** A estimativa de texto linear **exclui tabelas que podem ser clinicamente valiosas** e não avalia consistência, novidade, redundância de ideias nem nível de aprendizagem. Serve apenas para identificar quanto conteúdo ainda depende de avaliação editorial. **Não usar esse número para reprovar/aprovar automaticamente o mínimo de 60K úteis.**

** Compara parágrafos de pelo menos 170 caracteres após normalizar maiúsculas/minúsculas e espaços. **Zero repetições exatas não exclui paráfrases redundantes.** Por estrutura acumulativa de ampliações 01/02/03, os mesmos conceitos voltam em diferentes capítulos; é obrigatória uma edição estrutural de coesão e desduplicação sem perder detalhes.

## 3. Verificações científico-editoriais concluídas nesta rodada

### 3.1 Asma — correção efetivamente aplicada

- **Inconsistência corrigida no capítulo 19.2:** a GINA 2026 mantém para confirmação diagnóstica da asma em adultos sintomáticos aumento de VEF1 ou CVF **≥12% e ≥200 mL em relação ao basal**; a proposta ERS/ATS 2022 **>10% do previsto** não foi adotada automaticamente como critério equivalente de diagnóstico de asma. O texto agora ensina a diferença e a razão da decisão da GINA. **Fonte:** GINA 2026 Strategy Report, seção *Bronchodilator responsiveness*; https://ginasthma.org/2026-gina-strategy-report/.
- **Teste de autossuficiência parcial (aprovado conceitualmente):** interpretar um VEF1 antes/depois e calcular percentual/volume; justificar uso de CI e explicar por que inalador de LABA qualquer não serve como alívio; reconhecer exaustão e tórax silencioso. **Âncoras:** 19–23 e questões 7–12.
- **Pendente:** quadro único revisado por idade/dispositivo/dose e máximo diário para todos os regimes reais disponíveis; elegibilidade, contraindicações e monitorização do PCDT retificado em 09/2026 para cada biológico; autossuficiência para asma ocupacional/gestação/criança pequena; remover repetição entre seções introdutórias e ampliações tardias.

### 3.2 DPOC — dupla norma documentada, sem intervenção incorreta

- **Confronto verificado:** GOLD 2026 posiciona no grupo E a pessoa com **uma exacerbação moderada** prévia nos 12 meses; o PCDT brasileiro da Portaria nº 29/2025 mantém referência de classificação baseada no GOLD anterior. O manuscrito já identifica a diferença e não deve generalizar o critério internacional para acesso administrativo SUS. **Fonte primária:** https://goldcopd.org/2026-gold-report-and-pocket-guide/; https://www.gov.br/saude/pt-br/assuntos/pcdt/d/doenca-pulmonar-obstrutiva-cronica/view.
- **Teste de autossuficiência parcial:** calcular VEF1/CVF e grau espirométrico; diferenciar retenção crônica de CO2 e acidose descompensada; justificar VNI e interpretar SpO2 sem confundi-la com PaCO2. **Âncoras:** 5, 16–22; casos 7–8; questões 9–16.
- **Pendente:** tabela de doses por dispositivo e ajuste prático; indicação/corte de oxigenoterapia domiciliar por PaO2/SpO2; esquema antibiótico por riscos e função renal/gestação; planilha oficial SUS de elegibilidade; avaliação de biológicos adicionados à GOLD 2026 em pessoas exacerbadoras selecionadas sem presumir incorporação local.

### 3.3 Diabetes mellitus — ponto de segurança confirmado

- **Verificação pontual:** Diretriz SBD 2026 estabelece redução de metformina na **TFGe 30–45 mL/min/1,73 m²** para no máximo **1 g/dia** e suspensão quando TFGe <30, como consta no manuscrito. **Fonte:** https://diretriz.diabetes.org.br/manejo-do-diabetes-mellitus-tipo-2/.
- **Teste parcial:** diagnosticar por jejum/HbA1c/TOTG, reconhecer interferência da hemólise sobre HbA1c; não ignorar CAD euglicêmica em usuários de iSGLT2; calcular osmolaridade efetiva e diferenciar hipoglicemia que permite VO de alteração de consciência. **Âncoras:** 7, 10, 15, 18–22; questões 10, 13–16.
- **Pendente:** metas por fragilidade e populações especiais com diretriz específica; esquemas farmacológicos por apresentações **e critérios SUS**; transição entre insulina IV/SC e correções de potássio em CAD com protocolos de ambiente monitorado; avaliação técnica de dose basal/prandial evitando uso de cálculo ilustrativo como prescrição.

### 3.4 Pneumonia comunitária do adulto — benchmark bloqueante

- **Verificação científica:** a ATS publicada online em julho/2025 (volume janeiro/2026) **sugere condicionalmente** cursos inferiores a cinco dias, mínimo de três, para **PAC não grave com estabilidade clínica** e sem complicações que justifiquem maior duração. Para PAC grave, recomenda cinco dias ou mais. **Corticosteroide**: não na PAC não grave por indicação de pneumonia; considerar em PAC grave hospitalizada selecionada, **exceto influenza**. Essas ressalvas já constam do manuscrito. **Fonte:** https://doi.org/10.1164/rccm.202507-1692ST.
- **Teste parcial:** calcular CURB-65 e PaO2/FiO2 corretamente, reconhecer saturação incompatível com alta apesar de escore baixo, reconhecer empiema e falha terapêutica. **Âncoras:** 8, 11, 19–23 e questões 11–18.
- **Bloqueio:** referência do Drive comparada é **pediátrica**; falta benchmark comparável de **PAC adulta**. **Não certificar etapa zero como completa nem publicar** até obter referência equivalente ou resolver formalmente a lacuna com material acessível conforme instruções do projeto.
- **Pendente:** antibioticoterapia de adulto por risco, alergia, gestação, TFGe e microrganismo; cobertura especial com justificativa, disponibilidade local; fontes brasileiras mais recentes que SBPT 2018 se existentes; imagens licenciadas de radiografia/TC/US.

### 3.5 Tuberculose — correção de caso aplicada e nota integral confrontada

- **Erro potencial corrigido no Caso 7:** com TRM “MTB detectado, **sem marcador de resistência à rifampicina**”, não se deve escrever uma hipótese como se a resistência já estivesse identificada. O novo texto descreve adequadamente o limite do teste e a necessidade de cultura/teste de sensibilidade segundo o fluxo do SUS.
- **Fonte normativa verificada:** Nota Informativa nº 2/2026-CGTM/DATHI/SVSA/MS; https://www.gov.br/aids/pt-br/central-de-conteudo/notas-informativas/2026/nota-informativa-no-2_2026_cgtm_dathi_svsa_ms.pdf/@@display-file/file. Restrição BPaL/BPaLM: idade ≥14, excluir gestantes/lactantes, acometimento de SNC, osteoarticular e TB miliar/disseminada. BPaLM máximo 26 semanas; BPaL pode alcançar 39 semanas em critérios especiais. O manuscrito já registra essas diferenças corretamente após edição anterior.
- **Teste parcial:** diferenciar IGRA de diagnóstico de doença ativa, explicar TRM/baciloscopia/cultura, avaliar persistência bacteriológica e diferenças entre BPaL e BPaLM. **Âncoras:** 16–20 e questões 11–18.
- **Pendente prioritário:** dose completa RHZE/RH e ILTB por faixas de peso e apresentações SUS, critérios específicos TB/HIV, gestação/meningite/ostearticular, monitorização de BPaL por risco de QT e toxicidade de linezolida; vigilância laboratorial e fluxos locais.

## 4. Provas de autossuficiência: amostras internas selecionadas

| Apostila | Pergunta-desafio | Onde a resposta é ensinada | Leitura de evidência | Veredito limitado |
| --- | --- | --- | --- | --- |
| Asma | O que significa VEF1 2,00 → 2,30 L após broncodilatador? | Cap. 19 e caso 5 | cálculo 300 mL e 15% sobre basal | Explicado neste tópico |
| DPOC | Uma exacerbação moderada muda o grupo entre diretrizes? | Cap. 5 e caso 3 | divergência GOLD 2026/PCDT nacional | Explicado neste tópico |
| Diabetes | Pode haver CAD com glicemia 180 mg/dL? | Cap. 10, 22, casos 3/8 | cetose + acidose + contexto iSGLT2 | Explicado neste tópico |
| Pneumonia | CURB-65 zero autoriza alta com SpO2 84%? | Cap. 8, 19, caso 7 | não: hipoxemia e esforço mudam local | Explicado neste tópico |
| Tuberculose | TB-DR meníngea pode receber BPaLM? | Cap. 18, 21, caso 8 | não: exclusão expressa na Nota 2/2026 | Explicado neste tópico |

**Importante:** cinco questões-resumo com âncoras não constituem **auditoria exaustiva** de todas as questões, decisões terapêuticas, efeitos adversos e populações especiais. Não confundir amostra aprovada com livro aprovado.

## 5. Portões de produção (situação atual)

| Gate | Asma | DPOC | Diabetes | PAC adulto | Tuberculose |
| --- | --- | --- | --- | --- | --- |
| Rascunho original extenso | Sim | Sim | Sim | Sim | Sim |
| ≥4 casos e ≥6 questões comentadas | Sim | Sim | Sim | Sim | Sim |
| Métrica bruta >60.000 | Sim | Sim | Sim | Sim | Sim |
| **≥60.000 caracteres didáticos úteis sem redundância** | **Não aferido** | **Não aferido** | **Não aferido** | **Não aferido** | **Não aferido** |
| Benchmark adulto/específico de cursinho adequado | Parcial | Parcial | Parcial | **Ausente** | Parcial |
| Doses, contraindicações e situações especiais completas | Pendente | Pendente | Pendente | Pendente | Pendente |
| 10 candidatas de imagens REAIS com licença verificada | Não | Não | Não | Não | Não |
| Revisão médica integral e questão a questão | Não | Não | Não | Não | Não |
| JSON de livro + renderer + testes PWA | Não | Não | Não | Não | Não |
| **APROVADA/PUBLICADA** | **NÃO** | **NÃO** | **NÃO** | **NÃO** | **NÃO** |

## 6. Próximas ações específicas, não mais texto de preenchimento

1. **Pneumonia:** obter e ler benchmark adulto adequado (etapa zero); sem ele a certificação permanece bloqueada.
2. **Tuberculose:** montar as tabelas normativas completas por peso/idade e revisar a linha de cuidado de TB/HIV; separar esquema da TB sensível, ILTB e TB-DR em quadros diferentes.
3. **Asma:** produzir quadro prático validado de dose por idade, dispositivo e etapa e conferir integralmente biológicos/elegibilidade PCDT/GINA.
4. **DPOC:** consolidar PCDT SUS x GOLD 2026, antibioticoterapia e oxigenoterapia; revisar cada classe/apresentação.
5. **Diabetes:** detalhar transição e insulinoterapia sob protocolo clínico, ajustes por TFGe e fraqueza/hipoglicemia, com as fontes SUS/SBD.
6. Em todas: **edição de coesão** para mover as “ampliações editoriais 02/03” aos capítulos correspondentes, eliminar duplicações conceituais e retirar notas de produção do texto visível ao aluno; preservar registro de proveniência em documento editorial separado.
7. Após auditoria científica: curadoria de imagens com licença comercial comprovada; só então manifesto para Admin, conversão `books[].sections[].body_html` via `scripts/build-apostilas-batch.cjs --dry-run` e testes de sintaxe, conteúdo e layout. **Não sobrescrever outras apostilas do repositório nem fazer merge/deploy sem aprovação.**

**Parecer:** ainda não publicável. Esta rodada produziu **duas correções clínicas concretas** (Asma/Tuberculose) e **matriz factual de cinco livros**. Medidas automáticas não certificam segurança de prescrição ou qualidade integral de conteúdo.


## 7. Etapa 07 — preenchimento de lacunas prescritivas com fontes primárias

**Execução em 14/10/2026:** após reabrir fontes comparativas do Drive e conferir documentos primários, foram feitos dois commits de **conteúdo clínico novo nos capítulos pertinentes**, sem alterar as apostilas de referência nem publicar o lote.

**Tuberculose — doses por peso:** inseridos no capítulo 9 o quadro RHZE 150/75/400/275 mg e RH 150/75 ou 300/150 mg, com quatro faixas (20–35, 36–50, 51–70, acima de 70 kg), fases de dois e quatro meses, equivalências de apresentações, três cálculos explicados e separação 2RHZE/10RH em TB de SNC e osteoarticular. No capítulo 11, incluídas referências de 3HP, 4R, 6H e 9H, contraindicações e a apresentação fixa de 3HP, com exemplo de dose semanal. No capítulo 19, foram detalhados os intervalos para início de TARV em TB/HIV e a interação rifampicina–dolutegravir. **Fontes:** PCDT HIV Módulo 2 (2024), páginas impressas 25, 27–29 e 31–33; Manual de Recomendações de TB do Ministério da Saúde e atualização do comprimido fixo 3HP em 2025. **Conflito registrado:** a página antiga da Linha de Cuidado HIV simplifica a faixa acima de 50 kg para quatro comprimidos, enquanto PCDT 2024 e Manual usam cinco comprimidos acima de 70 kg. A tabela adotada é a mais completa, mas não houve teste de dispensação com paciente nem auditoria farmacêutica independente. **Pendências residuais:** pediatria, gestação, ajustes em hepatopatia/nefropatia, regimes especiais e tabelas BPaL/BPaLM completas.

**Pneumonia adulta — terapia empírica:** acrescentada a seção 11.0A, com tratamentos empíricos documentados em adultos ambulatoriais saudáveis, comorbidades, PAC hospitalar e PAC grave, incluindo amoxicilina, doxiciclina, beta-lactâmicos associados a macrolídeo, opções de internação e alertas sobre quinolonas. **Divergência explícita:** amoxicilina/clavulanato 875/125 mg é descrita a cada **8 h** em tabela da SBPT 2018, mas a cada **12 h** para perfil ambulatorial com comorbidades na ATS/IDSA 2019; o texto **não declara equivalência** nem escolhe uma dose indiscriminada. **Fontes:** SBPT 2018 DOI 10.1590/S1806-37562018000000130 e ATS/IDSA 2019 DOI 10.1164/rccm.201908-1581ST. A diretriz ATS 2025 sobre duração foi incorporada como comparação e não usada para generalizar três dias de terapia. **Bloqueio não resolvido:** falta benchmark de PAC adulta no Drive; material pediátrico correlato não substitui essa leitura.

### Testes de consistência reproduzíveis realizados sobre as fontes

- **34 kg:** faixa 20–35; 2 × (R150/H75/Z400/E275) = R300/H150/Z800/E550 mg, fase intensiva.
- **49 kg:** faixa 36–50; 3 comprimidos RHZE; manutenção 3 × RH150/75 equivale a RH300/150 mais RH150/75.
- **70 kg exatos:** faixa 51–70 → quatro comprimidos; **75 kg:** acima de 70 → cinco comprimidos (na apresentação DFC definida).
- **3HP adulto elegível:** rifapentina e isoniazida **900 mg de cada, uma vez por semana**, não por dia; as apresentações precisam ser conferidas.
- **PAC com comorbidades:** a estratégia da ATS/IDSA 2019 exige distinguir **beta-lactâmico + macrolídeo/doxiciclina** de beta-lactâmico isolado e de quinolona respiratória seletiva; o quadro novo documenta essa decisão.

**Resultado:** duas lacunas de conteúdo reduzidas, mas **nenhuma das cinco apostilas foi certificada**. O teste de autossuficiência continua parcial. Não há \`content.json\`, incorporação ao catálogo, lote de imagens aprovado, auditoria visual ou deploy.


## Etapa 08 — consolidação estrutural dos cinco manuscritos (14/10/2026)

Foram criadas versões novas e **independentes** de leitura contínua, mantendo todos os arquivos históricos `*_RASCUNHO.md` intactos:

| Tema | Nova versão editorial | Capítulos em sequência | Caracteres brutos da versão de leitura | Casos / questões |
|---|---|---:|---:|---:|
| Asma | `LOTE_02_ASMA_EDICAO_CONTINUA.md` | 10 | 65.653 | 8 / 12 |
| DPOC | `LOTE_02_DPOC_EDICAO_CONTINUA.md` | 9 | 71.258 | 12 / 16 |
| Diabetes mellitus | `LOTE_02_DIABETES_MELLITUS_EDICAO_CONTINUA.md` | 10 | 64.223 | 10 / 16 |
| PAC adulta | `LOTE_02_PNEUMONIA_ADQUIRIDA_NA_COMUNIDADE_EDICAO_CONTINUA.md` | 10 | 68.748 | 12 / 18 |
| Tuberculose | `LOTE_02_TUBERCULOSE_EDICAO_CONTINUA.md` | 9 | 84.634 | 10 / 18 |

Os capítulos foram agrupados por lógica didática (fundamentos, quadro clínico/diagnóstico, estratificação, tratamento, exceções, casos e questões) **sem alterar propositalmente as informações médicas**; o texto foi preservado em blocos, mudando a ordem, hierarquia e a localização de casos/questões. Excluíram-se da versão de leitura os capítulos editoriais puros de benchmark, checklist, extensão e autossuficiência; os registros históricos e auditorias continuam no repositório. A bibliografia essencial foi reunida ao final.

Criado `LOTE_02_MANIFESTO_CONSOLIDACAO_2026-10-14.json`, com fonte/versão de leitura, áreas, títulos, capítulos, SHA, tamanho e contagem de casos/questões por livro. **Validações automatizadas limitadas:** cinco conjuntos de capítulos numerados em sequência, pelo menos quatro casos e seis questões por livro, URLs bibliográficas explícitas, nenhum capítulo de auditoria editorial num índice de aluno. Não foram detectadas repetições exatas ou similaridades textuais altas no teste heurístico de parágrafos realizado; isso **não exclui redundância semântica**.

**Ressalva indispensável:** o tamanho bruto de cada `EDICAO_CONTINUA.md` é menor que o histórico porque capítulos inteiros de metadados e auditoria foram retirados da versão voltada ao aluno. A estimativa de caracteres de texto sem marcação ultrapassou 60 mil nos cinco, mas é só **métrica aproximada**, não aprovação de 60 mil caracteres clínicos didáticos úteis. A revisão final de coesão entre blocos, dose por apresentação, atualidade das condutas, origem de imagens e autossuficiência é manual. Nenhum destes arquivos constitui `books[].sections[].body_html`, `content.json` ou página pública do site.

**Estado:** 5 rascunhos históricos mantidos + 5 edições contínuas independentes + manifesto; **0 certificados, 0 publicados, 0 merges e 0 deploys**.


## Etapa 09 — entrada do gerador e pré-publicação (14/10/2026)

Os cinco manuscritos consolidados foram convertidos estruturalmente para **entrada JSON com `books[].sections[].body_html`** e salvos em:

`apostilas/lotes/LOTE_02_INPUT_PREPUBLICACAO.json`

**Trata-se de arquivo de entrada para `scripts/build-apostilas-batch.cjs`, NÃO de `content.json` compacto v2 dos livros existentes e NÃO de HTML publicado.** Nenhum index, catálogo, publicação, merge ou deploy foi gerado.

### Pré-validação independente do conteúdo JSON salvo no GitHub

| Livro / slug | Seções | Caracteres legíveis estimados pelo método do gerador | Tabelas HTML | Referências |
|---|---:|---:|---:|---:|
| `asma-bronquica` | 10 | 62.814 | 6 | 4 |
| `dpoc` | 9 | 68.036 | 5 | 4 |
| `diabetes-mellitus` | 10 | 61.152 | 6 | 4 |
| `pneumonia-adquirida-na-comunidade` | 10 | 65.357 | 8 | 4 |
| `tuberculose` | 9 | 80.409 | 11 | 4 |

**Total: 48 seções, 36 tabelas, 20 referências e nenhuma imagem inserida.** No exame programático do JSON recuperado, todas as cinco entradas superaram a triagem de 60 mil caracteres, mantiveram seções separadas de casos/questões e não apresentaram erros estruturais simples. O exame anterior da transformação também verificou ausência de parágrafos longos literalmente duplicados. **Essas medidas não certificam conteúdo didático útil, acurácia de doses, qualidade de redação, acessibilidade, tradução de Markdown nem interpretação médica.** Particularmente a diabetes tem margem pequena acima do corte e não pode sofrer perdas na revisão final sem revalidar a extensão.

### Pré-validação reproduzível — script read-only adicionado

`scripts/validate-apostilas-lote-02.cjs`

Quando executado no checkout completo dessa branch, ele **importa `buildBook` do gerador existente**, usa o template compartilhado `apostilas/vulvovaginites/index.html`, verifica se não existe arquivo público de destino, testa o conteúdo, IDs e tabelas, exige fila de imagens vazia e **não escreve arquivos**.

```bash
node scripts/validate-apostilas-lote-02.cjs --json
node scripts/build-apostilas-batch.cjs --input apostilas/lotes/LOTE_02_INPUT_PREPUBLICACAO.json --dry-run
```

**Importante:** ambos os comandos estão documentados para execução no repositório; nesta conversa, foi feita validação estrutural em memória e leitura de volta do JSON do GitHub, **não execução real dos scripts Node no checkout**. Não afirmar “dry-run passou” sem executar.

### Gates que permanecem bloqueados

1. Releitura clínica completa, fármaco a fármaco, em PCDT/diretrizes por populações específicas e farmacêutico/médico responsável.
2. Revisão editorial de fluidez entre blocos convertidos e inspeção visual das tabelas no template LURIA.
3. Benchmarks completos: especialmente material de PAC adulta ausente no Drive; a apostila pediátrica é correlata, não equivalente.
4. Curadoria e licenciamento de imagens reais, com aprovação explícita pela fila Admin; o JSON intencionalmente contém `images: []`.
5. Rodar os comandos de preflight/dry-run no checkout, corrigir qualquer resultado e validar renderer em desktop e PWA.
6. Antes de gerar artefatos públicos, decisão explícita sobre compatibilidade entre o **gerador HTML** atual e o **`content.json` v2** compacto usado por outras apostilas LURIA. O primeiro gera `index.html`, não necessariamente `content.json` v2.
7. Aprovação editorial explícita antes de merge ou deploy.

**Estado: cinco entradas tecnicamente estruturadas, cinco obras ainda não certificadas, nenhuma publicação.**


## Etapa 10 — preenchimento de lacunas clínicas e sincronização do JSON (14/10/2026)

**Escopo:** a partir das edições contínuas do Lote 02, sem editar os rascunhos históricos ou o catálogo, foram identificadas lacunas reais em Asma, DPOC e Diabetes mellitus. Foram reabertos no Drive antes de editar: `Asma.pdf` e `Crise Asmática.pdf`; `DPOC estável.pdf`; `01 - DIABETES - CLASSIFICACAO, FISIOPATOLOGIA E DIAGNOSTICO DO DM.pdf`. Os PDFs de cursinho foram usados exclusivamente como comparação de cobertura; não há autoria institucional Estratégia MED comprovada. A validação clínica priorizou GINA 2026/CDC-NIOSH, Ministério da Saúde (Linha de Cuidado de DPOC) e ADA Standards 2026/consenso ADA-EASD 2024. Não foram reutilizadas imagens, tabelas ou trechos de fontes privadas ou protegidas.

### Adições realizadas na **edição contínua** e no **JSON de pré-publicação**

- **Asma (`asma-bronquica`):** capítulos de asma relacionada ao trabalho (diferença entre ocupacional e agravada pelo trabalho, anamnese e PFE seriado durante e fora da exposição), diagnóstico diferencial com obstrução laríngea induzível e condutas na gestação/puerpério; **casos 9–10 e questões 13–15**. Fonte: GINA 2026, https://ginasthma.org/2026-gina-strategy-report/ ; CDC/NIOSH, https://www.cdc.gov/niosh/asthma/hcp/diagnosing/index.html . Não usar material gráfico da GINA sem licença.
- **DPOC (`dpoc`):** ODP com critérios fisiológicos em ar ambiente e estabilidade — PaO2 ≤55 mmHg/SaO2 ≤88%; PaO2 56–59 mmHg associada a cor pulmonale/policitemia; separação do encaminhamento com SpO2 <92%; orientação de avaliações repetidas, segurança de oxigênio, mMRC/CAT/BODE e teste de caminhada; **casos 13–14 e questões 17–19**. Fonte: Ministério da Saúde, https://linhasdecuidado.saude.gov.br/portal/doenca-pulmonar-obstrutiva-cronica/unidade-de-atencao-primaria/planejamento-terapeutico/ . A página mantém aspectos de classificação terapêutica antiga: **não extrapolá-los ao GOLD 2026**.
- **Diabetes (`diabetes-mellitus`):** critérios 2024 de CAD/EHH, beta-hidroxibutirato, K <3,5 mmol/L antes de iniciar insulina IV, diferenciação entre glicose e resolução da cetose, transição IV→SC, metas ADA 2026 para idosos por estado funcional, plano de dias de doença e interpretação de CGM; **casos 11–12 e questões 17–20**. Fontes: https://doi.org/10.2337/dci24-0032 e https://doi.org/10.2337/dc26-s006 ; https://doi.org/10.2337/dc26-s013 . Detalhes hospitalares são educacionais e continuam dependentes de protocolo.

### Auditoria cruzada de arquivos lidos de volta da branch

| Livro | Edição contínua, caracteres Markdown brutos | Caracteres visíveis aproximados no JSON | Casos | Questões | Tabelas no JSON |
| --- | ---: | ---: | ---: | ---: | ---: |
| Asma | 78.862 | 75.595 | 10 | 15 | 8 |
| DPOC | 82.949 | 79.369 | 14 | 19 | 6 |
| Diabetes mellitus | 82.273 | 78.573 | 12 | 20 | 9 |
| PAC adulto (sem mudança de conteúdo nesta etapa) | 68.748 | 65.321 | 12 | 18 | 8 |
| Tuberculose (sem mudança de conteúdo nesta etapa) | 84.634 | 80.401 | 10 | 18 | 11 |
| **Total** | **397.466** | **399.259** | **58** | **90** | **42** |

As contagens são **brutas e heurísticas** (o JSON computa caracteres visíveis aproximados; o Markdown contém formatação e notas). Os cinco livros superam 60.000 caracteres em estimativa de texto, porém nenhum está **certificado** quanto à suficiência pedagógica ou à exatidão integral. Não confundir contagem de texto com aprovação editorial.

**Consistência verificada no JSON:** cinco slugs exclusivos; 48 seções com IDs distintos em cada livro; novas seções e questões de Asma, DPOC e Diabetes presentes tanto no Markdown quanto no `LOTE_02_INPUT_PREPUBLICACAO.json`; 42 tabelas com tags de abertura/fechamento balanceadas; cinco arrays de imagens vazios. Nenhum arquivo `index.html` público novo foi criado. Foi feita validação programática do conteúdo pela leitura de volta do GitHub; **o script Node de preflight e o dry-run do gerador ainda não foram executados no checkout real**.

**Limites ainda abertos:** revisão farmacológica por adulto/criança, gestação e função renal/hepática; revisão médica independente; imagem clínica licenciada e aprovada; referência adulta equivalente de PAC não encontrada no Drive; verificação manual de coerência e possíveis repetições semânticas; testes desktop/PWA; compatibilidade de saída com `content.json` compacto. **Status do lote: NÃO CERTIFICADO e NÃO PUBLICADO.**


## Etapa 11 — ampliação clínica de PAC adulta e Tuberculose (14/10/2026)

### Revisão do material pré-existente e comparação no Drive
Antes de editar, foram conferidos `lead_apostilas`, as versões `*_EDICAO_CONTINUA.md`, o input JSON do gerador e os materiais do Drive. Para **pneumonia**, a busca ampliada por `pneumonia` retornou `Pneumonia Comunitária na Pediatria.pdf`, que foi aberto e comparado, mas **não é benchmark adulto equivalente** e **não fundamentou doses/regimes de PAC adulta**. Para **tuberculose**, foram abertos `02 - INFECTOLOGIA - TUBERCULOSE.pdf`, `02 - TUBERCULOSE EXTRA PULMONAR.pdf` e `03 - TRATAMENTO DE TUBERCULOSE E EFEITOS COLATERAIS DO RIPE.pdf`. Nenhuma redação/tabela privada foi incorporada; a comparação serve apenas para identificar temas/armadilhas, e a autoria Estratégia MED não foi confirmada.

### Texto novo efetivamente gravado na branch editorial
- **PAC adulta:** `LOTE_02_PNEUMONIA_ADQUIRIDA_NA_COMUNIDADE_EDICAO_CONTINUA.md` ampliado de **68.748 para 83.616 caracteres Markdown brutos** (**+14.868**). Novas seções **7.3–7.8**: parâmetros de estabilidade, transição IV→VO, descalonamento/uso responsável de antibiótico, diferenças entre ATS/IDSA 2019 e ATS 2025 para duração, radiografia de controle seletiva e plano de alta; **casos clínicos 13–14** e **questões autorais 19–21**.
- **Tuberculose:** `LOTE_02_TUBERCULOSE_EDICAO_CONTINUA.md` ampliado de **84.634 para 101.570 caracteres Markdown brutos** (**+16.936**). Novas seções **4.4–4.5**: toxicidades R/H/Z/E, hepatotoxicidade com limiares clínico-laboratoriais, monitorização visual/neurológica, consulta e TDO; **6.3–6.4**: investigação de contatos, prevenção/BCG e distinção ILTB/TB ativa; **casos 11–12** e **questões 19–21**. O conteúdo de segurança é ilustrativo/educacional e não cria um protocolo de prescrição autônoma.

### Fontes externas conferidas na redação
- **PAC:** ATS/IDSA 2019, https://pmc.ncbi.nlm.nih.gov/articles/PMC6812437/ ; ATS 2025, https://doi.org/10.1164/rccm.202507-1692ST ; IDSA *CAP Clinical Pathway*, https://www.idsociety.org/globalassets/idsa/practice-guidelines/community-acquired-pneumonia-in-adults/cap-clinical-pathway-final-online.pdf .
- **TB:** Ministério da Saúde, *Tratamento*, atualizado em 16/03/2026, https://www.gov.br/aids/pt-br/assuntos/tuberculose/tratamento ; *Prevenção*, https://www.gov.br/aids/pt-br/assuntos/tuberculose/prevencao ; *Diagnóstico*, https://www.gov.br/aids/pt-br/assuntos/tuberculose/diagnostico ; CDC *Adverse Events During TB Treatment*, https://www.cdc.gov/tb/hcp/treatment/adverse-events.html ; ATS/CDC/IDSA *Treatment of Drug-Susceptible TB*, https://www.idsociety.org/practice-guideline/treatment-of-drug-susceptible-tb/ .

### JSON sincronizado e controle técnico
Os blocos clínicos, casos e questões novos foram inseridos nos capítulos correspondentes de `LOTE_02_INPUT_PREPUBLICACAO.json`, sem reconstruir/apagar os blocos preexistentes; o arquivo foi salvo e relido no GitHub. O `LOTE_02_MANIFESTO_CONSOLIDACAO_2026-10-14.json` foi atualizado para **versão 3**, com SHA atual de cada manuscrito, métricas e pendências.

| Livro | Texto Markdown bruto | Texto visível estimado no JSON* | Casos | Questões | Tabelas HTML |
| --- | ---: | ---: | ---: | ---: | ---: |
| Asma | 78.862 | 75.595 | 10 | 15 | 8 |
| DPOC | 82.949 | 79.369 | 14 | 19 | 6 |
| Diabetes mellitus | 82.273 | 78.573 | 12 | 20 | 9 |
| PAC adulta | **83.616** | **79.676** | **14** | **21** | **10** |
| Tuberculose | **101.570** | **96.822** | **12** | **21** | **13** |
| **Total** | **429.270** | **410.035** | **62** | **96** | **46** |

* A estimativa numérica não equivale a certificação de conteúdo útil, correção científica ou ausência de redundância semântica.

**Validação programática básica feita no JSON:** cinco livros/48 seções; nomes de seção/IDs preservados; tags de tabelas equilibradas; cada livro acima de 60 mil caracteres estimados; **cinco arrays `images: []`**; nenhuma nova página pública foi gerada. O `node scripts/validate-apostilas-lote-02.cjs` e o `build-apostilas-batch.cjs --dry-run` **não** foram executados em checkout completo, portanto não declarar passagem nesses testes.

**Pendências de aprovação:** fonte de comparação **adulta** ainda ausente para PAC; revisão médica/farmacológica integral e por subgrupos; curadoria/licença de imagens reais e aprovação Admin; revisão de transição entre capítulos e repetição de conceitos; verificação no renderer desktop/PWA e compatibilidade de saída HTML vs `content.json`. Os cinco livros continuam **NÃO CERTIFICADOS, NÃO PUBLICADOS**, sem merge/deploy.


## Etapa 12 — expansão prática de DPOC e Diabetes (14/10/2026)

**Etapa zero:** lido `lead_apostilas` antes de iniciar a rodada. Foram abertos no Drive `DPOC estável.pdf`, `DPOC exacerbada.pdf`, `01 - DIABETES - CLASSIFICACAO, FISIOPATOLOGIA E DIAGNOSTICO DO DM.pdf` e `03 - ANTIDIABETICOS ORAIS E SUBCUTANEOS.pdf` para identificar tópicos da formação médica presentes/ausentes. Como os documentos são resumos privados com recomendações que podem estar desatualizadas, não foram usados para copiar texto, imagem ou determinar conduta. As adições foram redigidas originalmente, com referências verificáveis e limitações declaradas.

### Alterações científicas efetivamente gravadas

**DPOC — `LOTE_02_DPOC_EDICAO_CONTINUA.md`:**
- Seções **4.5–4.7**, explicando mecanismos de pMDI (spray), DPI (pó seco), SMI (névoa suave), aerocâmara e nebulização; diferenças entre inspiração lenta/profunda e rápida/forte; falhas de preparação, dispositivo vazio, espiração no bocal e força manual; matriz para não escalar terapia antes de confirmar uso, adesão, exposição, diagnóstico concorrente e exacerbações.
- Seção **7.4**, checklist e raciocínio de retorno após exacerbação e situações que apontam etiologia cardíaca ou outras causas além da obstrução.
- Casos novos **15 e 16** e questões **20–22**, com comentários de todas as alternativas.
- Fontes: GOLD 2026, https://goldcopd.org/2026-gold-report-and-pocket-guide/ ; NHLBI/NIH, https://www.nhlbi.nih.gov/resources/how-use-dry-powder-inhaler-fact-sheet ; American Lung Association 2026, https://www.lung.org/lung-health-diseases/lung-disease-lookup/asthma/treatment/devices/metered-dose-inhaler .
- Rascunho de leitura passou de **82.949 a 100.806 caracteres brutos** (acréscimo de **17.857**), mantendo estrutura de nove capítulos.

**Diabetes — `LOTE_02_DIABETES_MELLITUS_EDICAO_CONTINUA.md`:**
- Seções **7.3–7.5**, incluindo estratificação renal **G1–G5 + A1–A3**, RAC + TFGe, confirmação de persistência, diferencial nefropatia não diabética, papel de IECA/BRA, iSGLT2 e risco de hipoglicemia em DRC; rastreamento retiniano, neuropatia, monofilamento e risco IWGDF de úlcera com intervalos de seguimento.
- **Divergência explicitada:** SBD capítulo DRD disponível na coletânea 2026, mas revisão assinalada em **04/07/2024**, faz recomendação mais abrangente de IECA/BRA em RAC >30 mg/g independentemente de PA; ADA 2026 recomenda na coexistência com hipertensão e albuminúria, e desaconselha IECA/BRA na prevenção primária indiscriminada sem albuminúria. Decisão terapêutica demanda contexto clínico; não alegar que ambas as fontes dizem a mesma coisa.
- Casos novos **13–14** e questões **21–23**, com explicação das alternativas.
- Fontes: SBD, https://diretriz.diabetes.org.br/avaliacao-e-tratamento-da-doenca-renal-do-diabetes-2/ ; ADA 2026 seção 12, https://doi.org/10.2337/dc26-S012 ; ADA 2026 seção 10, https://doi.org/10.2337/dc26-S010 .
- Rascunho de leitura passou de **82.273 a 99.173 caracteres brutos** (acréscimo de **16.900**), mantendo dez capítulos.

### Paridade de publicação controlada e verificada

As sete adições (quatro em DPOC, três em Diabetes) foram convertidas em HTML seguro e sincronizadas **nos capítulos correspondentes** de `LOTE_02_INPUT_PREPUBLICACAO.json`; nenhuma imagem foi adicionada e nenhum `index.html` foi criado.

| Livro | Markdown bruto da edição contínua | Texto visível aproximado do JSON | Casos totais no Markdown | Questões totais no Markdown | Tabelas HTML |
| --- | ---: | ---: | ---: | ---: | ---: |
| Asma | 78.862 | 75.595 | 10 | 15 | 8 |
| **DPOC** | **100.806** | **96.512** | **16** | **22** | **9** |
| **Diabetes** | **99.173** | **94.789** | **14** | **23** | **13** |
| Pneumonia adulta | 83.616 | 79.676 | 14 | 21 | 10 |
| Tuberculose | 101.570 | 96.822 | 12 | 21 | 13 |
| **Total** | **464.027** | **443.394** | **66** | **102** | **53** |

**Importante sobre a contagem de casos/questões:** quatro manuscritos (DPOC, Diabetes, PAC e TB) ainda têm **Casos e Questões 1–2 em parágrafos compactos de capítulos anteriores** à seção final de casos/questões; o conteúdo permanece no arquivo e JSON, mas **a organização de leitura não está concluída**. Esse problema foi detectado em auditoria estrutural e deve ser corrigido movendo e ampliando os primeiros dois casos e questões nos próximos passes, sem duplicação.

**Gates pendentes:** contagem de caracteres é aproximação e não certificado científico; doses e medicamentos sem revisão independente integral; paridade Markdown/HTML foi conferida nos novos trechos mas não houve execução Node real do gerador; imagens sem curadoria/licenças; referência equivalente de pneumonia **adulta** no Drive ainda não encontrada; testes PWA/desktop não realizados; nenhuma publicação, merge ou deploy.


## Etapa 13 — consolidação de casos e questões iniciais (14/10/2026)

**Pendência saneada:** DPOC, Diabetes, PAC adulta e Tuberculose mantinham **Caso 1, Caso 2, Questão 1 e Questão 2** como pequenos parágrafos inseridos em capítulos teóricos, enquanto suas seções finais iniciavam no número 3. Foram removidos **16 parágrafos compactos**, preservados os rascunhos históricos `*_RASCUNHO.md`, e criados **oito casos completos e oito questões revisadas** nas respectivas seções finais, com sequência numérica 1…N.

### Conteúdo médico refeito e aprofundado

- **DPOC:** suspeita com imagem de hiperinsuflação que requer confirmação por VEF1/CVF pós-broncodilatador; exacerbação com acidose hipercápnica, critérios de VNI e suporte de vias aéreas. As duas questões tratam de confirmação funcional e suporte em exacerbação. Fontes: GOLD 2026, https://goldcopd.org/2026-gold-report-and-pocket-guide/.
- **Diabetes:** jovem com cetoacidose, hipocalemia e decisão segura de iniciar insulina; adulto com DM2 e risco cardiorrenal persistente apesar da HbA1c próxima da meta. Questões sobre confirmação do diagnóstico em assintomático e tratamento dirigido a desfechos. Fonte: ADA 2026, capítulo 2, https://doi.org/10.2337/dc26-s002 ; consenso de crises de 2024, https://doi.org/10.2337/dci24-0032 ; SBD 2026.
- **Pneumonia comunitária adulta:** PAC de baixo risco com avaliação fisiológica e viabilidade de tratamento ambulatorial; idosa com confusão, hipoxemia, hipotensão e sepse possível. Questões sobre decisão de internação e derrame parapneumônico complicado. Fonte ATS/IDSA 2019, https://doi.org/10.1164/rccm.201908-1581ST. **Benchmark equivalente de cursinho para PAC adulta ainda ausente no Drive**: não declarar etapa zero plenamente atendida.
- **Tuberculose:** caso típico de exposição e sintomas com coleta respiratória/TRM/cultura e investigação de contatos; suspeita em HIV com baixa contagem CD4, amostra escassa e teste molecular negativo que não afasta TB. Questões sobre ILTB versus doença ativa e próximo passo após TRM negativo. Fonte Ministério da Saúde, *Diagnóstico* (atualizado março/2026), https://www.gov.br/aids/pt-br/assuntos/tuberculose/diagnostico ; PCDT HIV Módulo 2 2024.

### Verificação final de sequência Markdown↔JSON

| Livro | Caracteres brutos edição contínua | Caracteres visíveis aproximados do JSON | Casos de 1 a N | Questões de 1 a N | Tabelas HTML |
| --- | ---: | ---: | ---: | ---: | ---: |
| Asma | 78.862 | 75.595 | 10 | 15 | 8 |
| DPOC | **105.212** | **100.783** | **16** | **22** | 9 |
| Diabetes | **103.938** | **99.415** | **14** | **23** | 13 |
| PAC adulta | **88.830** | **84.740** | **14** | **21** | 10 |
| Tuberculose | **106.987** | **102.106** | **12** | **21** | 13 |
| **Total** | **483.829** | **462.639** | **66** | **102** | **53** |

Conferidos diretamente a partir dos arquivos GitHub após os commits: cinco livros, seções de casos e questões numeradas sequencialmente de 1 até N, **sem entradas antigas inline**, paridade exata entre números dos títulos em Markdown e HTML por livro, IDs de capítulo sem duplicação, tabelas balanceadas e **zero imagens** no JSON. O `LOTE_02_MANIFESTO_CONSOLIDACAO_2026-10-14.json` foi atualizado para **versão 5**. O validador `scripts/validate-apostilas-lote-02.cjs` recebeu verificações de ordem, completude e ausência de casos deslocados para futuras execuções em checkout.

**Limites do parecer:** estes são testes estruturais feitos por leitura de conteúdo no GitHub; o **Node preflight/dry-run não foi executado** no checkout completo. A qualidade médica e farmacológica, direitos das imagens, revisão semântica de repetição e testes desktop/PWA também **não estão certificados**. O conteúdo dos novos casos utiliza **vinhetas clínicas fictícias originais**, não reproduz material de curso; as fontes do Drive foram reabertas como comparativos, com prioridade para diretrizes oficiais na construção da resposta. **5 manuscritos em pré-publicação, 0 certificados, 0 publicados, sem merge/deploy**.


## Etapa 14 — revisão de decisões terapêuticas GOLD 2026 e ATS 2025 (15/10/2026)

**Motivação:** ao reler as edições contínuas, a situação de DPOC com uma única exacerbação moderada podia ser interpretada como indicação automática de escalonamento com CI, e a seção de PAC viral tratava a recomendação de 2025 sem explicitar as **quatro condições** distintas por local de cuidado/comorbidade.

**DPOC — alterações reais em `LOTE_02_DPOC_EDICAO_CONTINUA.md`:**
- Inserido **3.2 ABE inicial não é algoritmo de seguimento**, com tabela de quatro situações; a GOLD 2026 usa ≥1 exacerbação moderada/severa para **grupo E na avaliação inicial** de quem ainda não recebe terapia de manutenção, enquanto decisões de quem já está tratado seguem algoritmo distinto.
- Acrescentado alerta de que grupo E **não determina automaticamente CI/tripla terapia**; avaliar LABA/LAMA inicial, eosinófilos, técnica, comorbidades e risco de pneumonia, além das regras brasileiras de dispensação.
- Ajustado o texto do caso 3 para especificar avaliação inicial; novos **Caso 17 e Questão 23** com raciocínio e comentário de todas as alternativas.
- Fonte primária: GOLD 2026 Report and Pocket Guide, https://goldcopd.org/2026-gold-report-and-pocket-guide/ ; resumo de alterações GOLD 2026 (diferencia INITIAL/FOLLOW-UP), https://goldcopd.org/wp-content/uploads/2025/11/KEY-CHANGES-GOLD-2026-10Nov2025.pdf . **Nenhuma figura da GOLD foi copiada/reproduzida.**

**PAC adulta — alterações reais em `LOTE_02_PNEUMONIA_ADQUIRIDA_NA_COMUNIDADE_EDICAO_CONTINUA.md`:**
- Inseridas **5.5 Teste viral positivo: matriz da ATS 2025 para antibiótico empírico** e **5.6 Ultrassom pulmonar como alternativa diagnóstica condicional**, incluindo três linhas de raciocínio essenciais: (i) ambulatorial sem comorbidades + PAC com evidência clínica/imagem + vírus positivo pode **não receber antibiótico**, de forma condicional; (ii) ambulatorial **com comorbidades** ou internado com PAC **não grave ou grave**: ATS sugere **antibiótico empírico** devido ao risco de coinfecção; (iii) US pulmonar só é alternativa à radiografia com competência e protocolo adequados, não excluindo focos centrais ou diferenciais.
- Dois casos originais (**15 e 16**) e duas questões (**22 e 23**), mantendo sequência completa; retirada do corpo do aluno uma nota interna sobre inexistência de comparativo adulto no Drive, que permanece documentada **aqui**.
- Fonte primária: ATS 2025, https://doi.org/10.1164/rccm.202507-1692ST ; comunicado da própria sociedade, https://site.thoracic.org/press-releases/treatment-with-antibiotics-and-steroids-in-adults-with-pneumonia-addressed-in-latest-clinical-practice-guideline . Esta atualização foi feita pela **ATS**, não atribuir endosso automático à IDSA de 2019. Aplicabilidade ao Brasil requer protocolos e epidemiologia locais; as recomendações virais são condicionais e de certeza muito baixa.
- Benchmark do Drive para PAC permanece **pediátrico**; etapa zero específica de adulto segue **pendente**. Dados do material privado não foram reproduzidos.

### Paridade e métricas após gravação

| Livro | Markdown bruto na edição contínua | Texto visível aproximado no JSON | Casos | Questões | Tabelas |
| --- | ---: | ---: | ---: | ---: | ---: |
| Asma | 78.862 | 75.595 | 10 | 15 | 8 |
| **DPOC** | **111.611** | **106.963** | **17** | **23** | **10** |
| Diabetes mellitus | 103.938 | 99.415 | 14 | 23 | 13 |
| **PAC adulta** | **96.147** | **91.723** | **16** | **23** | **12** |
| Tuberculose | 106.987 | 102.106 | 12 | 21 | 13 |
| **Total** | **497.545** | **475.802** | **69** | **105** | **56** |

O `LOTE_02_INPUT_PREPUBLICACAO.json` foi sincronizado e o manifesto atualizado para **v6**; conferidos no momento do salvamento a sequência de casos/questões, fechamento de tabelas e nenhuma imagem não aprovada (`images: []`). **Nenhuma certificação de dose ou de conteúdo útil decorre automaticamente destas contagens.** O script Node de preflight e dry-run do gerador **não foram executados em checkout completo**; ainda faltam revisão clínica/farmacêutica integral, licenças de imagens reais, layout no leitor/PWA e publicação aprovada.

**Estado: 5 edições contínuas em revisão, 0 publicadas, 0 merges e 0 deploys.**


## Etapa 15 — correção pediátrica de Asma (GINA 2026) e Tuberculose (SUS) · 15/10/2026

**Procedimento de etapa zero:** `lead_apostilas` conferido integralmente antes de iniciar. Foram lidos no Drive `Asma.pdf`, `Crise Asmática.pdf` e `02 - INFECTOLOGIA - TUBERCULOSE.pdf` **apenas como material comparativo de cobertura**, preservando autoria, sem reutilizar quadros, redação ou imagens. A decisão clínica foi construída a partir das fontes **primárias oficiais**: GINA 2026 Summary Guide, páginas impressas 28–29, conferidas textualmente e visualmente; e Ministério da Saúde, Nota nº 5/2024 sobre TB pediátrica, páginas 1–3, conferidas textualmente e visualmente; página oficial do MS de TB atualizada em março/2026.

### 15.1 Asma — conteúdo novo realmente gravado
- Na seção **8**, acrescentadas **8.3 Asma entre 6 e 11 anos** e **8.4 Pré-escolares**.
- Alteração científica relevante: **GINA 2026 passou a admitir CI-formoterol em baixa dose conforme necessidade na etapa inicial de 6–11 anos**, alternativamente a CI em associação ao SABA na estratégia de alívio anti-inflamatório. A apostila esclarece a diferença em relação à orientação do ano anterior, distingue escalonamento de controle diário, explicita que **SABA isolado não é estratégia completa**, que LABA isolado é inadequado e que formulação/idade/bula/PCDT brasileiro precisam ser checados. **Não extrapolar o fluxograma de 6–11 para crianças ≤5 anos**.
- Acrescentados **Casos 11–12** e **Questões 16–17** com raciocínio, diferencial e comentário por alternativa.
- Fonte: https://ginasthma.org/wp-content/uploads/2026/07/GINA-Summary-Guide-2026-WEB-WMS.pdf ; relatório completo https://ginasthma.org/2026-gina-strategy-report/ .
- **Licenciamento:** as figuras do documento GINA são protegidas; **nenhuma reprodução foi incorporada**, somente texto e quadro pedagógico autorais, com atribuição científica.

### 15.2 Tuberculose — conteúdo novo realmente gravado
- Na seção **7**, acrescentadas **7.4 Tuberculose pediátrica e diagnóstico paucibacilar** e **7.5 Quando indicar quatro versus seis meses no SUS**.
- O esquema encurtado de **4 meses (2RHZ(E)/2RH)** é alternativa para **TB sensível não grave com elegibilidade expressa e sem suspeita de resistência**. A Nota MS 5/2024 distingue menores de dez anos (fase inicial RHZ) de adolescentes a partir de dez (RHZE), peso <4 kg ou idade ≤3 meses (não elegíveis), doença disseminada/miliar, formas graves e necessidade de reavaliação mensal. TB meníngea/osteoarticular grave segue duração especial de 12 meses conforme forma clínica; crianças com HIV necessitam avaliação e seguimento próprios. **A tabela adulta de DFC RHZE não é aplicável indiscriminadamente à pediatria.**
- Acrescentados **Casos 13–14** e **Questões 22–23** com diferenciação de doença leve/forma grave, exame clínico, imagem, teste molecular e prevenção.
- Fontes: https://www.gov.br/aids/pt-br/central-de-conteudo/notas-informativas/2024/nota-informativa-no-5-2024-cgtm.pdf/@@download/file ; https://www.gov.br/aids/pt-br/assuntos/tuberculose/tratamento ; https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes/svsa/tuberculose/manual-de-recomendacoes-e-controle-da-tuberculose-no-brasil-2a-ed.pdf .

### 15.3 Controle de sincronização e pré-publicação

| Livro | Caracteres Markdown brutos | Texto legível estimado no JSON | Casos | Questões | Tabelas HTML |
| --- | ---: | ---: | ---: | ---: | ---: |
| **Asma** | **90.608** | **87.011** | **12** | **17** | **9** |
| DPOC | 111.611 | 106.963 | 17 | 23 | 10 |
| Diabetes | 103.938 | 99.415 | 14 | 23 | 13 |
| Pneumonia | 96.147 | 91.723 | 16 | 23 | 12 |
| **Tuberculose** | **121.300** | **115.877** | **14** | **23** | **15** |
| **Total** | **523.604** | **500.989** | **73** | **109** | **59** |

**Nota de contagem:** total da coluna de caracteres legíveis precisa ser calculado automaticamente do manifesto atualizado; números individuais foram aferidos do JSON salvo. Estimativa legível não certifica 60 mil caracteres didáticos úteis.

Os seis novos blocos (dois capítulos clínicos com seus subtópicos, seções de casos e questões para cada apostila) foram convertidos em HTML com escape e sincronizados no arquivo `LOTE_02_INPUT_PREPUBLICACAO.json`. A validação em memória e leitura de volta de conteúdo do GitHub verificou sequência 1…N de casos/questões, tabelas balanceadas, cinco livros com mais de 60 mil caracteres estimados e **nenhuma imagem adicionada**. `LOTE_02_MANIFESTO_CONSOLIDACAO_2026-10-14.json` atualizado para **versão 7**.

**Persistem bloqueios:** esquemas pediátricos ainda exigem conferência de apresentações e normas regulatórias brasileiras na liberação clínica; revisão farmacológica integral dos cinco livros; imagens médicas com licença e liberação no Admin; benchmark de PAC adulta no Drive; redução de possíveis redundâncias semânticas; testes reais Node do gerador, desktop e PWA. **Sem publicação, merge ou deploy**.


## Etapa 16 — ampliação pediátrica: Asma e Tuberculose (15/10/2026)

**Pré-requisitos editoriais cumpridos:** leitura integral do `lead_apostilas`; releitura de `PRODUCAO_EM_LOTE.md`; benchmark **aberto e lido** no Drive: `Asma.pdf`, `Crise Asmática.pdf`, `02 - INFECTOLOGIA - TUBERCULOSE.pdf` e `02 - TUBERCULOSE EXTRA PULMONAR.pdf` (autoria institucional Estratégia MED **não comprovada**); confronto com uma apostila LURIA em `apostilas/cancer-colo-utero-hpv/content.json`. Benchmark privado consultado somente para análise de cobertura; **sem copiar texto/imagem/tabela**. Diretrizes primárias GINA/MS foram abertas e tabelas clínicas conferidas visualmente em PDF.

### 16.1 Asma — conteúdo novo salvo na edição contínua e no JSON

- Seções **8.5–8.6** com diagnóstico funcional entre 6–17 anos: critério GINA 2026 de resposta ao broncodilatador **≥12% do VEF1 previsto** (diferente da porcentagem sobre o basal, usada no adulto com requisito absoluto de ≥200 mL); cálculo completo 1,35→1,60 L com VEF1 previsto 2,00 L; PFE e variabilidade diária **>13%** média em 2 semanas, aumento pós-BD **≥15%**; interpretação prudente de FeNO **>35 ppb**, sem confundir marcador de inflamação com prova definitiva.
- Exacerbação de escolar, reconhecimento do **tórax silencioso** e da exaustão, plano individual para família/escola, cautela com formulação AIR/MART por idade, e posologia de **prednisolona 1–2 mg/kg/dia até 40 mg por 3–5 dias** apenas como referência de diretriz e decisão clínica supervisionada.
- Casos **13–14**, questões **18–19**, comentários por alternativas.
- **Fonte primária**: GINA, `2026 Summary Guide`, pp. 8, 29, 34–37, PDF https://ginasthma.org/wp-content/uploads/2026/07/GINA-Summary-Guide-2026-WEB-WMS.pdf ; comparado também com Strategy Report 2026. A GINA **proíbe reprodução direta de suas figuras/tabelas protegidas**, e os cálculos/quadros do manuscrito são autorais. Confirmar doses/formulações comercialmente autorizadas no Brasil antes do lançamento.

### 16.2 Tuberculose — conteúdo novo salvo na edição contínua e no JSON

- Seção **7.6** para seleção do tratamento sensível pediátrico: critério **idade ≤3 meses OU peso <4 kg** exclui encurtamento; criança **>3 meses e <10 anos**, na fase intensiva, costuma usar **RHZ**, com combinação dispersível RHZ **75/50/150 mg** e RH **75/50 mg** no intervalo de **4 a <25 kg**; em menor de dez com **≥25 kg**, doses individualizadas; faixa **≥10 e <16 anos** usa **RHZE** na fase intensiva, com manutenção RH, observando apresentações. A prescrição exata de comprimidos exige peso, protocolo e validação farmacêutica; nenhuma contagem inventada por faixa.
- Quatro meses (2RHZ(E)/2RH) continuam **alternativa** em TB sensível **não grave e elegível**; acompanhar **mensalmente**, revisar no quarto mês, investigar recaída/ausência de melhora, podendo prolongar manutenção para completar seis meses por reavaliação do programa. TB miliar, meníngea, grave ou resistente não se enquadra automaticamente.
- Casos **15–16**, questões **24–25** (criança de 9 anos/26 kg e bebê de 4 meses/3,7 kg), com explicações de condutas.
- **Fonte primária**: Ministério da Saúde, Nota Informativa nº 5/2024-CGTM/DATHI/SVSA/MS, páginas 1–3, https://www.gov.br/aids/pt-br/central-de-conteudo/notas-informativas/2024/nota-informativa-no-5-2024-cgtm.pdf/@@display-file/file ; MS *Tratamento*, atualizado 16/03/2026; Portaria SCTIE/MS nº 43/2019 de incorporação de formas pediátricas. Confirmar uso de combinações e doses com programa SUS antes de publicar.

### 16.3 Medições verificadas após gravação

| Livro | Edição contínua, caracteres brutos | Texto estimado visível no JSON | Casos | Questões | Tabelas HTML |
| --- | ---: | ---: | ---: | ---: | ---: |
| Asma | **101.889** | **97.842** | **14** | **19** | **11** |
| DPOC | 111.611 | 106.963 | 17 | 23 | 10 |
| Diabetes mellitus | 103.938 | 99.415 | 14 | 23 | 13 |
| PAC adulta | 96.147 | 91.723 | 16 | 23 | 12 |
| Tuberculose | **133.614** | **127.771** | **16** | **25** | **16** |
| **Total** | **547.199** | **523.714** | **77** | **113** | **62** |

As novas seis porções de capítulo/casos/questões foram inseridas em `LOTE_02_INPUT_PREPUBLICACAO.json`, sem modificar os rascunhos históricos ou criar HTML público. O manifesto está na **versão 8**, com SHA verificado. Todos os livros continuam com `images: []`. A contagem de caracteres é métrica editorial **não equivalente a “60 mil caracteres úteis validados”**.

**Gate ainda bloqueado:** revisão médica e farmacêutica integral, licenciamento/autorização das imagens e aprovação pelo Admin, deduplicação e fluidez dos capítulos, execução do validador Node e `--dry-run` no checkout, teste visual desktop/PWA e revisão de compatibilidade `content.json` v2. **0 livros certificados; 0 publicados; nenhum merge/deploy.**


## Etapa 15 — pediatria, doses por apresentação e prevenção (15/10/2026)

**Escopo:** preenchimento adicional, não mera contagem de caracteres, das edições contínuas de Asma e Tuberculose. O `lead_apostilas` foi consultado antes da execução. A Etapa Zero reabriu no Drive `Asma.pdf`, `02 - INFECTOLOGIA - TUBERCULOSE.pdf` e `03 - TRATAMENTO DE TUBERCULOSE E EFEITOS COLATERAIS DO RIPE.pdf`, apenas como comparativos privados de cobertura. Nenhum trecho ou imagem desses PDFs foi incorporado. Para as **recomendações novas** foram conferidas diretamente fontes oficiais atuais, incluindo inspeção visual das tabelas GINA 2026 e da Nota ministerial 5/2024.

### Asma — arquivo `LOTE_02_ASMA_EDICAO_CONTINUA.md`

- Criada a seção **8.7**, sobre interpretação de AIR/MART **6–11 anos** na GINA 2026: budesonida-formoterol **80/4,5 mcg (dose entregue)** corresponde à apresentação rotulada em certos mercados como **100/6 mcg (dose medida/nominal)**, sem equivaler a copiar concentração adulta. A GINA descreve 1 inalação sob demanda na estratégia AIR-only de baixa etapa, manutenção 1 vez ao dia na etapa 3 MART e duas vezes ao dia na etapa 4 MART, com doses extras sob demanda em formulações adequadas.
- Alerta claro: **contar todas as inalações em 24 horas (manutenção + resgate)**. A tabela da GINA orienta buscar atendimento quando ultrapassar **oito inalações totais** no esquema pediátrico ali descrito; sinais clínicos de gravidade exigem assistência **antes** de atingir esse valor. Não extrapolar para outros produtos/idades sem verificar bula e elegibilidade nacional. A opção de beclometasona-formoterol tem evidência e registro específicos e **não deve ser tratada como intercambiável automaticamente**.
- Inseridos **casos 15–16**, discutindo limite de doses e troca indevida de concentração adulta, e **questões 20–21**, com alternativas comentadas.
- **Fonte verificada visualmente:** GINA 2026 Summary Guide, páginas impressas **28, 29 e 45**, https://ginasthma.org/wp-content/uploads/2026/07/GINA-Summary-Guide-2026-WEB-WMS.pdf . Conteúdo redigido de forma original, **sem copiar figuras/tabelas protegidas da GINA**.

### Tuberculose — arquivo `LOTE_02_TUBERCULOSE_EDICAO_CONTINUA.md`

- Criada seção **7.7** com matriz própria da apresentação RHZ dispersível **75/50/150 mg** e RH dispersível **75/50 mg** para **<10 anos, entre 4 kg e menos de 25 kg**, com **1/2/3/4 comprimidos por dia**, respectivamente, para faixas **4–7/8–11/12–15/16–24 kg**. Incluídos cálculos explicados e decisão dinâmica quando criança ganha peso; crianças <10 anos e ≥25 kg exigem **doses individualizadas** conforme norma.
- Separação explícita entre as **apresentações/doses** e a **duração de tratamento**: a tabela de distribuição pediátrica descrevia originalmente **2RHZ/4RH**; a Nota Informativa **5/2024** autoriza **2RHZ/2RH** somente em TB sensível **não grave, sem resistência suspeita e elegível**, com avaliação ao quarto mês. Não extrapolar a TB meníngea/osteoarticular, lactentes ≤3 meses ou <4 kg.
- Criada seção **6.5**, para distinguir RH pediátrico na prevenção da **ILTB** (Nota Informativa 6/2024: opção 3RH de **90 doses**, até cinco meses conforme elegibilidade) do RH da **fase de manutenção da TB ativa**. Investigação para afastar TB ativa e interações com TARV são obrigatórias.
- Inseridos **casos 17–18** sobre mudança de faixa de peso e criança com HIV exposta ao caso-fonte e **questões 26–28** com cálculos e comentários.
- **Fontes brasileiras:** Nota 5/2024 (quadros e critérios em PDF oficial, páginas 1–3), https://www.gov.br/aids/pt-br/central-de-conteudo/notas-informativas/2024/nota-informativa-no-5-2024-cgtm.pdf/@@display-file/file ; MS *Tratamento da TB em crianças*, quadro RHZ/RH de distribuição por peso, https://www.gov.br/aids/pt-br/central-de-conteudo/publicacoes/2023/folder-de-mesa_tratamento_tb_criancas_eletronico.pdf ; MS prevenção pediátrica RH de 90 doses, https://www.gov.br/aids/pt-br/assuntos/noticias/2024/julho/saude-recomenda-dose-fixa-combinada-de-medicamentos-para-prevencao-da-tuberculose-em-criancas .

### Verificação cruzada realizada em memória e por GitHub

| Livro | Caracteres Markdown brutos | Caracteres legíveis aproximados do JSON* | Casos | Questões | Tabelas HTML |
| --- | ---: | ---: | ---: | ---: | ---: |
| Asma | **111.835** | **107.459** | **16** | **21** | **12** |
| DPOC | 111.611 | 106.963 | 17 | 23 | 10 |
| Diabetes | 103.938 | 99.415 | 14 | 23 | 13 |
| PAC adulta | 96.147 | 91.723 | 16 | 23 | 12 |
| Tuberculose | **147.888** | **141.410** | **18** | **28** | **18** |
| **Total** | **571.419** | **547.970** | **81** | **118** | **65** |

*Estimativa por remoção de tags/entidades e normalização dos espaços; **não certifica 60 mil caracteres didáticos úteis**. Os arquivos `*_RASCUNHO.md` seguem preservados. O `LOTE_02_INPUT_PREPUBLICACAO.json` e o `LOTE_02_MANIFESTO_CONSOLIDACAO_2026-10-14.json` foram atualizados para refletir a edição; manifesto versão **9**. Tabelas novas no JSON usam HTML estrutural, não imagens externas.

**Limitações impeditivas de publicação:** checagem de todas as doses contra a **bula brasileira específica**, revisão médica independente inclusive elegibilidade infantil e HIV, benchmark adulto de PAC ainda ausente no Drive, validação real `node` do gerador em checkout, inspeção desktop/PWA, imagens didáticas licenciadas e aprovadas pelo Admin. **Status: cinco manuscritos editoriais não certificados, zero publicados, sem merge/deploy**.
