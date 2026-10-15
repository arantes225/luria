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
