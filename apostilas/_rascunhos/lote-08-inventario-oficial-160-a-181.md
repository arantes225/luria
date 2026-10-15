# LURIA — Lote 08 oficial: inventário editorial e matriz de produção

**Data de auditoria:** 14/10/2026  
**Origem da numeração:** painel `assets/js/apostilas-lotes-225.js` em `main` (260 temas, 13 lotes; o oitavo abrange **160–181**).  
**Base clínica:** `assets/js/cronograma-base-data.js` (aulas 001–180) + complemento curricular 181–260.  
**Padrão obrigatório:** `lead.apostilas.txt`, `apostilas/PRODUCAO_EM_LOTE.md`, `apostilas/EDITORIAL_STANDARD.md`.  
**Estado deste registro:** inventário inicial verificado no GitHub; nenhuma apostila do lote certificada como completa por esta auditoria.

> IMPORTANTE: as expressões “existente” e “rascunho” assinalam **material encontrado**, não aprovação científica, extensão útil >=60K, inclusão no catálogo nem verificação no PWA. Não transferir antigas etiquetas de “lote 09” automaticamente: a delimitação atual colocou essas aulas no **lote 08**.

| Aula | Tema oficial | Base encontrada em main | Conduta editorial |
|---|---|---|---|
| 160 | Abordagem do tabagismo, álcool e outras drogas | Sem livro temático próprio na pasta apostilas/ | Criar livro original; benchmark Tabagismo.pdf do Drive lido em 14/10, cobertura parcial; ampliar abordagem do álcool, outras substâncias e RAPS |
| 161 | Sepse e choque séptico | `apostilas/sepse-choque-septico/rascunho-editorial-lote09.md` + complementos 02 e **03** | **Complemento 03 produzido nesta branch** (SOFA, SSC 2026, ILAS 2025, 5 casos, 8 questões); falta integrar sem redundâncias |
| 162 | Nódulos e câncer de tireoide | `apostilas/nodulos-cancer-tireoide/rascunho-editorial-lote09.md` | **Ampliado nesta branch**, preservado original; conferir novos capítulos 3–7, casos/questões e revisão clínica pendente |
| 163 | Violência e maus-tratos contra crianças e adolescentes | `apostilas/violencia-maus-tratos-criancas-adolescentes/rascunho-editorial-lote09.md` (~67 mil caracteres Markdown em main, já existente) | Preservar rascunho com 9 casos e 14 questões; benchmarking específico no Drive pendente, não duplicar |
| 164 | Câncer do colo do útero | `apostilas/cancer-colo-utero-hpv/content.json` e `index.html` | **Preservar livro existente**; separar lesões precursoras/rastreamento (#159) de manejo oncológico |
| 165 | Saúde do trabalhador | `apostilas/saude-do-trabalhador/rascunho-editorial-lote09.md` | Reaproveitar rascunho extenso; validar normas, SINAN, nexo e rotinas vigentes |
| 166 | HIV e infecções oportunistas | `apostilas/hiv-infeccoes-oportunistas/rascunho-editorial-lote09.md` | Reaproveitar rascunho extenso; conferir PCDT atual e esquemas, situações especiais |
| 167 | Doenças benignas e câncer de mama | `apostilas/cancer-de-mama/index.html` | **Compartilhar e aproveitar o livro central de mama**, incluir interface cirúrgica; não clonar #169 |
| 168 | Puberdade e adolescência | **Encontrado posteriormente em main**: `apostilas/puberdade-adolescencia/rascunho-editorial-lote09.md` (~89 mil caracteres totais de Markdown, 12 casos, 18 questões) | **Não duplicar**; benchmark do Drive só parcial (puericultura/crescimento), requer revisão científica e integração editorial |
| 169 | Patologias benignas e câncer de mama | `apostilas/cancer-de-mama/index.html` | **Reaproveitar #167** com objetivos ginecológicos; um conteúdo canônico e indexação curricular dupla, evitando publicação duplicada |
| 170 | Ética médica, sigilo e prontuário | **Localizado em verificação posterior da main:** `apostilas/etica-medica-sigilo-prontuario/rascunho-editorial-lote09.md` (~90,7 KB) | Não duplicar; revisar com CFM/LGPD e benchmark equivalente do Drive ainda não localizado |
| 171 | Artrites inflamatórias e doenças autoimunes | **Encontrado em main:** `apostilas/artrites-inflamatorias-doencas-autoimunes/rascunho-editorial-lote09.md` (~111 mil bytes) | Preservar, auditar atualizações em Reumatologia e lacunas; não duplicar |
| 172 | Princípios de oncologia cirúrgica | **Encontrado posteriormente em `main`:** `apostilas/principios-oncologia-cirurgica/rascunho-editorial-lote09.md` (~95,7 mil caracteres de Markdown) | **Não duplicar**. Auditoria e atualização de matriz curricular, título antigo 'lote 09'; conservar original |
| 173 | Urgências pediátricas e suporte básico/avançado | **Priorizar base atual em `main`**: `apostilas/urgencias-pediatricas-suporte-basico-avancado/rascunho-editorial-lote09.md` (~104.716 caracteres); existe também rascunho de ~29.984 na branch | **NÃO duplicar/publicar ambos**; usar base mais robusta, conferir PALS 2025 e incorporar apenas lacunas do segundo |
| 174 | Massas anexiais e câncer de ovário | **Criado nesta branch:** `apostilas/_rascunhos/lote-08-aula-174-massas-anexiais-cancer-ovario.md` | 45.673 caracteres Markdown, 8 casos e 14 questões; IOTA/O-RADS e ASCO 2025; rascunho não certificado |
| 175 | Declaração de óbito e indicadores de mortalidade | **Criado na branch** `apostilas/_rascunhos/lote-08-aula-175-declaracao-obito-indicadores.md` (~38,8 mil caracteres totais) | Rascunho com DO, SIM/SINASC, indicadores, Portaria 10.273/2026, 7 casos e 10 questões; revisão jurídica pendente |
| 176 | Acidente vascular cerebral e crises convulsivas | `apostilas/_rascunhos/lote-08-aula-176-avc-crises-convulsivas.md` (34.940 chars) + `lote-08-aula-176-complemento-02-etiologia-prevencao.md` (21.902 chars) | **56.842 caracteres brutos separados**, 11 casos e 16 questões; consolidar TOAST e prevenção; MS 2025 versus AHA 2026 |
| 177 | Complicações pós-operatórias | **Criado na branch** `apostilas/_rascunhos/lote-08-aula-177-complicacoes-pos-operatorias.md` (~40 mil caracteres totais) | Texto original: ERAS, hemorragia, ISC, deiscência/fístulas, TEP, 8 casos e 12 questões; revisão cirúrgica pendente |
| 178 | Intoxicações exógenas na infância | **Criado na branch** `apostilas/_rascunhos/lote-08-aula-178-intoxicacoes-exogenas-infancia.md` (~42,5 mil caracteres totais) | Rascunho com toxíndromes, 8 casos e 12 questões, CIATox/SINAN; doses/revisão toxicológica pendentes |
| 179 | Câncer de endométrio | **Criado nesta branch:** `apostilas/_rascunhos/lote-08-aula-179-cancer-endometrio.md` | 43.732 caracteres Markdown, 7 casos e 12 questões; ACOG abril/2026, FIGO 2023, ESGO 2025; rascunho não certificado |
| 180 | Cuidados paliativos e comunicação de más notícias | `lote-08-aula-180-cuidados-paliativos-comunicacao.md` (38.162 chars) + 2 suplementos concorrentes (`lote-08-aula-180-complemento-02-doenca-nao-oncologica-comunicacao.md` 36.270 chars; `lote-08-aula-180-complemento-02-clinico-2026.md` 56.096 chars) | **Duas ampliações sobrepostas: NÃO somá-las como conteúdo útil**; curar capítulos exclusivos, conferir PNCP Portaria 10.181/2026, 6+8 casos em suplementos, validar com paliativista |
| 181 | Eletrocardiografia: fundamentos e interpretação sistemática | `apostilas/_rascunhos/lote-08-aula-181-eletrocardiografia.md` (**94.548 caracteres totais Markdown**) | **Expandida na branch, preservados 22 capítulos originais e criadas seções 23–37**: 17 casos e 24 questões; ECGs reais licenciados/revisão cardiológica ainda pendentes; **não certificada** |

## Regras contra duplicação
1. Câncer de mama (#167 e #169) deve ser **uma única base editorial**, com ênfases curriculares diferentes; não duplicar apostilas iguais.
2. Câncer do colo (#164) precisa dialogar com lesões precursoras (#159), sem repetir rastreamento integral.
3. Sepse adulta (#161) é distinta de sepse pediátrica (#128) e neonatal (#23).
4. ECG (#181) integra os livros cardiovasculares, mas precisa ensinar interpretação sistemática sem remeter o fundamento para outra apostila.
5. Manter intactos os arquivos em `main` enquanto houver rascunhos sendo preparados e alterações simultâneas do Codex.
6. Nenhum arquivo de terceiros do Drive pode ser reproduzido. Nomes de arquivos comparativos podem constar neste controle; URLs/IDs privados do Drive não devem ser publicados.

## Etapa zero — aula 160, efetivamente realizada
- **Material no Drive aberto e lido:** `Tabagismo.pdf` (arquivo sucinto, ~1.063 caracteres extraídos, referência a Maysa Mismetti; **instituição Estratégia MED não comprovada**).
- **Cobertura percebida:** estágios de mudança, Fagerström, TRN, bupropiona e vareniciclina, recaída; esquemático e insuficiente para aprender do zero. Não cobre adequadamente álcool, outras drogas, redes de cuidado, emergência e contexto brasileiro contemporâneo.
- **Fontes de atualização primária:** PCDT Tabagismo do Ministério da Saúde (página atualizada em jan/2025; protocolo de origem 2020), documentos da RAPS/CAPS do Ministério da Saúde (consulta em out/2026). Para álcool, confirmar diretrizes oficiais específicas e manejo em serviço antes de aprovar.
- **Aplicação original:** criar estrutura autoral própria, tabela de avaliação e risco, explicações fisiopatológicas, abordagem motivacional, tratamentos e quatro casos com questões, sem copiar texto, figuras ou sequenciamento exclusivo do material comparativo.
- **Apostila LURIA visual de referência aberta:** `apostilas/climaterio-menopausa/index.html` e sua arquitetura com `apostila-renderer.js`; nenhum CSS ou template global alterado.
- **Pendências para certificação:** extensão útil >=60.000 caracteres, teste de autossuficiência, revisão farmacológica independente, imagens candidatas autorizadas, QA de navegador e PWA.

## Gates de cada uma das 22 aulas
- Benchmark temático do Google Drive **aberto e examinado antes da alteração médica correspondente**, com instituição verificável ou limitação declarada.
- Matriz de cobertura, conteúdo original e não redundante, casos e questões comentadas; referências brasileiras atuais preferenciais.
- Nunca reivindicar “concluído” com base em contagem aparente, marcadores HTML ou existência de pasta.
- Banco de imagens separado para aprovação pelo Admin. Não embutir novas imagens médicas sem licença aprovada.
- `main` intocada; este ramo é somente trabalho editorial, sem merge/deploy.

## Continuação — 14/10/2026: mudanças efetivamente realizadas neste ciclo

1. **Aula 162 — Nódulos e câncer de tireoide:** o arquivo `apostilas/nodulos-cancer-tireoide/rascunho-editorial-lote09.md` foi **ampliado somente na branch editorial**, preservando a íntegra da base. Cerca de **57,6 mil caracteres de Markdown total** após incorporação de novos subcapítulos, agora 10 casos e 16 questões. Incluiu cálculo do TI-RADS, interpretação 2023 Bethesda, vigilância ativa e cirurgia pela ATA 2025, carcinoma medular/MEN2, anaplásico, complicações e seguimento. **Não são 57,6 mil caracteres didáticos únicos certificados.** Comparativo Drive diretamente específico indisponível; foi aberto material relacionado de tireotoxicose — benchmark parcial, limitação registrada.
2. **Aula 161 — Sepse e choque séptico:** criado `apostilas/sepse-choque-septico/complemento-editorial-03-lote08.md` (~21,3 mil caracteres totais de Markdown) com matriz SOFA pontuada, contexto SSC 2026/ILAS 2025, choque misto, reavaliação de perfusão, controle do foco, seguimento, 5 casos e 8 questões. Os dois arquivos preexistentes foram preservados; antes de publicar, será necessária **consolidação antirredundância**. Benchmark no Drive: dois materiais de choque efetivamente lidos, ambos apenas parcialmente equivalentes.
3. **Aula 168 — Puberdade e adolescência:** o inventário inicial ficou desatualizado por desenvolvimento simultâneo do Codex na `main`. Nova verificação encontrou `apostilas/puberdade-adolescencia/rascunho-editorial-lote09.md`, com ~89,3 mil caracteres totais, 12 casos e 18 questões. Não criar cópia. Foi lido `01 - PUERICULTURA - CRESCIMENTO E BAIXA ESTATURA.pdf` no Drive, útil apenas em crescimento e idade óssea; não substitui uma apostila específica de puberdade e saúde adolescente. **Pendente:** revisão e comparação direta e aprovação antes de incorporar.
4. **Etapas ainda não executadas:** seleção e aprovação de imagens clínicas no Admin, renderização com testes reais, revisão clínica independente de doses, consolidação dos rascunhos com `content.json` e indexação curricular. **Sem merge, sem publicação, sem deploy**.

### Advertência de integração

A branch editorial nasceu de um commit anterior ao surgimento de novos rascunhos na `main`. Antes de integrar, conferir HEAD atual, reconciliação de arquivos e eventuais alterações simultâneas do Codex. **Não forçar merge da PR e não trocar conteúdo antigo por nova versão menor.**


## Continuação — auditoria e produção das aulas 174 e 179 (14/10/2026)

**Materiais abertos no Drive antes da produção (etapa zero cumprida):**
- “01 - CANCER DE OVARIO.pdf”: material de ~10 mil caracteres, cobre mais oncologia que massas benignas, autoria Estratégia MED não confirmada (marca Medicina Livre). Inspirou apenas escopo de comparação. A LURIA acrescentou diferencial benigno, IOTA/ADNEX/O-RADS, emergência e terapias atuais de forma autoral.
- “02 - CANCER DE ENDOMETRIO.pdf”: material de ~9,6 mil caracteres, cobre FIGO 2023 e manejo de maneira simplificada, autoria Estratégia MED não confirmada (marca Medicina Livre). A LURIA atualizou especialmente classificação molecular e algoritmo ACOG de abril de 2026, evitando reproduções.

**Arquivos realmente criados nesta branch:**
- Aula 174: `apostilas/_rascunhos/lote-08-aula-174-massas-anexiais-cancer-ovario.md`. **45.673 caracteres Markdown totais, 21 capítulos, 8 casos, 14 questões**, 14 recursos visuais candidatos. Fontes centrais: ACR O-RADS v2022, IOTA 2026, ASCO 2025 e NCI.
- Aula 179: `apostilas/_rascunhos/lote-08-aula-179-cancer-endometrio.md`. **43.732 caracteres Markdown totais, 21 capítulos, 7 casos, 12 questões**, 12 recursos visuais candidatos. Fontes centrais: INCA, FIGO 2023, ESGO–ESTRO–ESP 2025, ACOG abril de 2026 e NCI.
- **Aulas 163 e 170:** rascunhos extensos encontrados em atualização concorrente de `main`, não recriados, não editados.

**Gates não superados:** extensão útil e não redundante de 60K por aula, completa conferência de referências e fármacos, revisão médica especialista e bibliografia brasileira, investigação de licença/aprovação WebP no Admin, casos e teste de autossuficiência, renderer nativo e QA PWA/desktop. Nenhuma das duas está publicada. A `main` foi preservada.

**Ponto de alta prioridade na revisão do endométrio:** diferenciar o algoritmo ACOG 2018 da atualização de 16/04/2026, que recomenda TVUS + amostragem tecidual inicial na maioria das pacientes com sangramento pós-menopausa. A implementação clínica brasileira depende de protocolos locais e sociedades nacionais; não generalizar sem verificação.

**Pendência de reconciliação:** main recebe produção simultânea em outras branches; atualizar/revisar base de PR antes de eventual integração e não sobrescrever rascunhos recentes.


## Continuação — 14/10/2026, aulas 175 e 178 e auditoria antirrepetição

- **Aula 175**: criado arquivo original `_rascunhos/lote-08-aula-175-declaracao-obito-indicadores.md`, aproximadamente 38.799 caracteres totais de Markdown, **7 casos** e **10 questões**, com DO, responsabilidade de emissão, SVO/IML, SIM/SINASC, mortalidade infantil/materna/perinatal, taxas com cálculos e direitos de humanização do luto. Foi registrada explicitamente a tensão entre Portaria GM/MS 10.273/2026 (conceitos de óbito fetal/luto) e critérios operacionais de emissão/registro de documentos anteriores. Dois benchmarks relacionados foram abertos no Drive, mas nenhum totalmente equivalente ao tema.
- **Aula 178**: criado arquivo original `_rascunhos/lote-08-aula-178-intoxicacoes-exogenas-infancia.md`, aproximadamente 42.530 caracteres totais de Markdown, **8 casos**, **12 questões**, toxíndromes, ABCDE, intoxicações medicamentosas e ambientais, CIATox e SINAN. Buscas Drive não localizaram livro equivalente. Orientações baseadas no MS e diretrizes RCH; antídotos sem doses prescritivas prontas, até revisão especializada.
- **Aulas 170 e 171**: descobertas na `main` durante nova checagem, como rascunhos grandes de Ética (~90,7 kB) e Artrites (~111 kB), respectivamente. **Não duplicadas.** Requerem auditoria específica e verificação de sincronização antes de qualquer integração.
- **Aulas 174 e 179**: os arquivos da etapa anterior foram lidos na branch e confirmados, não apenas assumidos como salvos.
- **Regra rígida:** contagem de caracteres **totais** de Markdown ≠ certificação de 60 mil caracteres úteis. Não marcar como prontas, não gerar HTML público, não aprovar imagens, não fazer merge ou deploy. Todos os textos adicionais dependem de revisão médica e, quando pertinente, jurídica.

## Continuação adicional — aula 177 (14/10/2026)

- **Aula 177 — Complicações pós-operatórias:** produzido novo rascunho de 39.976 caracteres totais de Markdown, 8 casos e 12 questões. Inclui complicações imediatas/tardias, red flags, hemorragia, ISC, falha anastomótica, fístula, íleo, obstrução, TEV/TEP, pulmão, rim, delirium, feridas, ERAS e alta segura.
- **Etapa zero cumprida parcialmente:** aberto e lido no Drive `04 - ESTOMAGO - COMPLICACOES AGUDAS POS GASTRECTOMIAS.pdf`, `03 - OBESIDADE - COMPLICACOES POS BARIATRICA.pdf` e `01 - AVALIACAO PRE-ANESTESICA.pdf`. São comparativos por subtema, não apostila abrangente equivalente. Não se copiaria nenhum material.
- **Fontes externas consultadas:** OMS prevenção de ISC (2018) e ERAS laparotomia de emergência (2023) e abdominal eletiva (2022). Conferência por CCIH/protocolo SUS continua obrigatória.
- **Status:** rascunho ainda não autossuficiente, imagens não aprovadas, ausência de homologação; preservar `main` e evitar merge/deploy.

## Continuação — 14/10/2026: identificação de 172 e rascunhos das aulas 173, 176 e 180

- **Aula 172 (Princípios de Oncologia Cirúrgica):** em checagem atualizada da `main`, encontrado `apostilas/principios-oncologia-cirurgica/rascunho-editorial-lote09.md`, com aproximadamente **95.694 caracteres totais de Markdown**, contendo biologia tumoral, biópsia, estadiamento, ressecabilidade, R0/R1/R2, terapia multimodal e cuidados operatórios. **Preservado; não copiado nem sobrescrito nesta branch.** A label antiga do lote deve ser reconciliada antes de integração.
- **Aula 173 (Urgências Pediátricas/BLS/PALS):** criado `apostilas/_rascunhos/lote-08-aula-173-urgencias-pediatricas-suporte-vida.md` com **29.984 caracteres totais**, **6 casos** e **8 questões**, AHA/AAP 2025. Material comparativo Drive **aberto e lido**: `02 - RESUMO - INTENSIVA - INSUFICIENCIA RESPIRATORIA, PARDS.pdf` e `01 - RESUMO - PEDIATRIA - INTENSIVA - SEDOANALGESIA E SRI.pdf`; **parcial**, sem ensino completo PALS. Diretriz AHA/AAP 2025 foi consultada diretamente. Dose por peso, concentrações e algoritmos de RCP exigem simulação/avaliação por especialista.
- **Aula 176 (AVC e Crises Convulsivas):** criado `apostilas/_rascunhos/lote-08-aula-176-avc-crises-convulsivas.md` com **34.940 caracteres totais**, **6 casos** e **8 questões**. O Drive não tinha título equivalente após busca por várias expressões; material `02 - TCE GRAVE, MORTE ENCEFALICA.pdf` foi **aberto e lido**, só relacionado a coma/avaliação neurológica, portanto benchmark **parcial**. Diretrizes MS PCDT 2025, AHA/ASA janeiro 2026, ILAE/ESETT usadas para redação original. O conteúdo de crise no Lote 07 deve ser reaproveitado, não replicado.
- **Aula 180 (Cuidados Paliativos e Comunicação de Más Notícias):** criado `apostilas/_rascunhos/lote-08-aula-180-cuidados-paliativos-comunicacao.md` com **38.162 caracteres totais**, **6 casos** e **8 questões**. Após buscas específicas no Drive sem documento equivalente, foi **aberto e lido** `01 - RESUMO - PEDIATRIA - INTENSIVA - SEDOANALGESIA E SRI.pdf`, útil apenas em dor/sedação, **não benchmark completo**. Foram consultados MS PNCP 2024/2026, CFM 1.805/2006 e 1.995/2012 e artigo SPIKES. **Sem prescrição pronta de opioides/sedativos; revisão médico-bioética necessária.**

### Nova auditoria de abrangência

**Todos os 22 temas do lote possuem pelo menos uma fonte editorial localizada ou um rascunho próprio nesta combinação de `main` e branch**, incluindo mapeamento #167/#169 para um único livro de mama. Isso **não significa 22 apostilas prontas**. Várias estão fragmentadas em complementos, sem imagens licenciadas, extensão didática suficiente, verificação científico-editorial, índice definitivo e QA.

**Integração bloqueada:** a `main` contém rascunhos criados paralelamente que a branch editorial ainda não contém (ex.: 172). Atualizar/reconciliar commits antes de merge, sem perder arquivo de outro lote. **Sem merge/deploy.**

## Continuação editorial — 15/10/2026: aulas 176 e 180, com comparação e segurança concorrente

**Aula 176 — AVC e crises convulsivas:** auditado o rascunho 01 existente na branch (**34.940 caracteres totais de Markdown**, seis casos e oito questões); encontrada e preservada a aula 138 de crises convulsivas pediátricas do Lote 07, mais robusta em sua faixa etária (**76.435 caracteres**, fonte main). Abrimos e examinamos no Drive o PDF `02 - TCE GRAVE, MORTE ENCEFALICA.pdf`, apenas comparativo parcial; não havia livro de AVC equivalente no resultado das buscas por AVC/isquemia/neurologia/convulsões. Confrontamos PCDT de AVC (2025), diretriz AHA/ASA de AVC isquêmico (2026), hemorragia espontânea (AHA/ASA 2022), PCDT Epilepsia (atualizado em maio/2026) e NICE status (2025). Criado complemento autoral `_rascunhos/lote-08-aula-176-complemento-02-etiologia-prevencao.md`, **21.902 caracteres totais**, cinco casos e oito questões, com TOAST, prevenção secundária, DAPT, FA, etiologia carotídea, imagens e complicações. Total bruto dos dois arquivos **56.842 caracteres**, portanto sequer atinge 60K brutos e não há certificação de extensão didática ou segurança clínica. Nenhum arquivo antigo foi apagado.

**Aula 180 — Cuidados paliativos:** auditado o rascunho 01 existente na branch (**38.162 caracteres**, seis casos e oito questões). Confirmado benchmark Drive parcial já lido, `01 - RESUMO - PEDIATRIA - INTENSIVA - SEDOANALGESIA E SRI.pdf`, sem apostila diretamente equivalente. Consultadas PNCP/MS 2024 e atos 2026, CFM 1.805/2006 e 1.995/2012, com limitação de prescrição farmacológica e necessidade de revisão bioética. Criado complemento autoral `_rascunhos/lote-08-aula-180-complemento-02-doenca-nao-oncologica-comunicacao.md`, **36.270 caracteres totais**, seis casos e dez questões, com IC/DPOC/demência/DRC/cirrose/ELA, plano antecipado, vias de cuidado, sintomas, limites proporcionais e comunicação. Total bruto dos dois arquivos **74.432 caracteres**, mas repetições e qualidade didática não foram auditadas para certificar ≥60K úteis.

**Produção simultânea do Codex/outro editor:** arquivos de 176/180 foram encontrados na branch antes de nova criação; tentativas de criar em caminho existente falharam com 422 sem sobrescrever. A versão da **aula 173** na `main` foi encontrada posteriormente com aproximadamente **104.716 caracteres** de Markdown, maior e mais abrangente que o rascunho independente de 29.984 caracteres da branch. **Não publicar ambos**; preferir auditoria/cotejo e unificação, mantendo o texto maior protegido.

**Resultado de abrangência:** 22/22 temas possuem algum acervo/rubrica editorial na combinação de main e branch, inclusive #167/#169 em base comum. **Nenhuma das 22 apostilas está homologada como premium por esta produção.** Não houve merge, deploy, aprovação de imagens, homologação farmacológica, revisão clínica independente ou validação real desktop/PWA. A branch pode estar defasada de mudanças paralelas na main; harmonizar antes de merge.


## Continuação em 15/10/2026 — curadoria paliativa e prevenção de duplicação

- A **aula 180** já tinha rascunho de **38.162 caracteres** e complemento editorial de **36.270 caracteres** criados em paralelo. Nesta etapa foi escrito e salvo um **segundo suplemento alternativo 02B** com **56.096 caracteres de Markdown**. O texto aprofunda legislação PNCP 2026 (Portaria 10.181/2026, PAC/DAV, EMCP/EAACP/RAS), escalas, cardiodesfibrilador, DRC, doença respiratória, demência, farmacologia segura, delirium, sedação proporcional, hipodermóclise e desospitalização, com **8 casos e 12 questões adicionais**.
- **ALERTA DE CURADORIA:** os complementos 02 e 02B cobrem vários temas iguais e nunca devem ser publicados ou somados integralmente como se fossem `36.270 + 56.096` caracteres de informação inédita. Comparar os capítulos, selecionar melhor redação para cada tópico, preservar itens próprios da versão 02 (ex.: cirrose e roteiros) e da versão 02B (atualização normativa, CDI, desprescrição, hipodermóclise), eliminar repetições e verificar cientificamente casos/questões antes de integrar.
- Conferido arquivo da **aula 176**, base 34.940 chars mais complemento 02 de 21.902 chars: total bruto 56.842, revisão e 60K úteis pendentes.
- Conferida a **aula 173** na `main` com **104.716 caracteres**, superior à versão alternativa da branch; utilizar a original como base canônica, sem duas publicações.
- Conferida a **aula 181** na branch (35.047 caracteres), corrigindo linha do inventário que ainda aparecia desatualizada.
- **Publicação permanece bloqueada:** falta comparação temática integral do Drive, curadoria de imagens reais com licenças, dosagens/indicações revisadas, unificação e QA PWA/desktop. Nenhuma mudança na `main` ou deploy foi feita nesta ação.


## Continuação — 15/10/2026, aula 181: eletrocardiografia avançada
- **Arquivo existente ampliado, não clonado:** `apostilas/_rascunhos/lote-08-aula-181-eletrocardiografia.md`, de 35.047 para **94.548 caracteres totais de Markdown**; seções 1–22 preservadas e acrescentadas 23–37, com 12 novos casos e 16 questões, resultando **17 casos clínicos e 24 questões comentadas** no arquivo. Não há confirmação de 60.000 caracteres didáticos úteis após remoção de redundâncias.
- **Novas competências:** artefatos e inversão de eletrodos; ECG estreito regular/irregular; TRNAV/TRAV/flutter/FA; taquicardia larga regular versus irregular; TV, captura e fusão; **FA pré-excitada e contraindicação de bloqueadores AV incluindo amiodarona IV segundo ACC/AHA 2023**; BAV 2:1/Mobitz/completo e síncope; ECG posterior V7–V9, V3R/V4R, Wellens, de Winter, aVR global, BRE/Sgarbossa; QTc, eletrólitos, Brugada, cardiomiopatias, marca-passo e artefatos que simulam FV.
- **Comparativos do Drive efetivamente abertos e lidos nesta etapa:** `03 - TAQUICARDIAS DE QRS LARGO.pdf`, `02 - TAQUIARRITMIA .pdf`, `06 - ECG SINDROMES CORONARIANAS II.pdf`, `03 - BLOQUEIOS DE RAMO.pdf`. Há material tematicamente relevante, mas **sem licença para reprodução comercial** e sem prova de autoria Estratégia MED; apenas matriz de cobertura, não reprodução de imagens ou textos.
- **Diretrizes verificadas:** SBC 2022 de laudos ECG, ACC/AHA 2025 SCA, AHA 2025 ACLS adulto, ACC/AHA 2023 FA e ESC 2023 SCA. Atenção a distinções de disponibilidade brasileira antes de tornar o texto assistencial.
- **Imagens:** 16 ECGs reais priorizados por necessidade didática, **nenhum incorporado nem aprovado**. Exigir licença comercial por arquivo, anonimização, laudo de referência, conversão WebP e QA Admin, desktop e PWA.
- **Status:** PR rascunho; `main` preservada; sem merge, deploy ou homologação. A meta editorial permanece texto autossuficiente + dados de ECG reais aprovados + prova de resolução dos casos apenas com a apostila.
