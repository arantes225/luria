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
