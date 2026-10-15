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
| 161 | Sepse e choque séptico | `apostilas/sepse-choque-septico/rascunho-editorial-lote09.md` + complemento 02 | Consolidar e aprofundar; verificar SSC 2026/ILAS, antimicrobianos, perfusão e foco; não sobrescrever os dois arquivos |
| 162 | Nódulos e câncer de tireoide | `apostilas/nodulos-cancer-tireoide/rascunho-editorial-lote09.md` | Aprofundar USG/TI-RADS, PAAF/Bethesda, avaliação de TSH, cirurgia e seguimento |
| 163 | Violência e maus-tratos contra crianças e adolescentes | `apostilas/violencia-maus-tratos-criancas-adolescentes/rascunho-editorial-lote09.md` | Revisar com linha de cuidado, ECA, notificação, proteção, diferenciais e segurança |
| 164 | Câncer do colo do útero | `apostilas/cancer-colo-utero-hpv/content.json` e `index.html` | **Preservar livro existente**; separar lesões precursoras/rastreamento (#159) de manejo oncológico |
| 165 | Saúde do trabalhador | `apostilas/saude-do-trabalhador/rascunho-editorial-lote09.md` | Reaproveitar rascunho extenso; validar normas, SINAN, nexo e rotinas vigentes |
| 166 | HIV e infecções oportunistas | `apostilas/hiv-infeccoes-oportunistas/rascunho-editorial-lote09.md` | Reaproveitar rascunho extenso; conferir PCDT atual e esquemas, situações especiais |
| 167 | Doenças benignas e câncer de mama | `apostilas/cancer-de-mama/index.html` | **Compartilhar e aproveitar o livro central de mama**, incluir interface cirúrgica; não clonar #169 |
| 168 | Puberdade e adolescência | Sem livro próprio identificado | Criar livro pediátrico; separar de alterações puberais patológicas específicas |
| 169 | Patologias benignas e câncer de mama | `apostilas/cancer-de-mama/index.html` | **Reaproveitar #167** com objetivos ginecológicos; um conteúdo canônico e indexação curricular dupla, evitando publicação duplicada |
| 170 | Ética médica, sigilo e prontuário | Sem livro próprio identificado | Criar, base CFM/LGPD/legislação vigente; casos e documentação |
| 171 | Artrites inflamatórias e doenças autoimunes | Sem livro próprio identificado | Criar com diagnóstico diferencial, red flags, investigação e encaminhamento |
| 172 | Princípios de oncologia cirúrgica | Sem livro próprio identificado | Criar com estadiamento, R0/R1/R2, decisão multidisciplinar e seguimento |
| 173 | Urgências pediátricas e suporte básico/avançado | Sem livro próprio identificado | Criar com prioridades ABCDE, deterioração e reanimação por faixas etárias |
| 174 | Massas anexiais e câncer de ovário | Sem livro próprio identificado | Criar com estratificação ultrassonográfica, referência oncológica e tratamentos |
| 175 | Declaração de óbito e indicadores de mortalidade | Sem livro próprio identificado | Criar com exemplos originais de cadeia causal e regras de preenchimento |
| 176 | Acidente vascular cerebral e crises convulsivas | Sem livro próprio identificado | Criar com fluxos de AVC e estado de mal; verificar elegibilidade terapêutica |
| 177 | Complicações pós-operatórias | Sem livro próprio identificado | Criar, integrando sem duplicar `cuidados-perioperatorios` e infecção de sítio |
| 178 | Intoxicações exógenas na infância | Sem livro próprio identificado | Criar com toxíndromes, descontaminação, CIATox e antídotos de referência |
| 179 | Câncer de endométrio | Sem livro próprio identificado | Criar diagnóstico, estadiamento e tratamento conforme risco |
| 180 | Cuidados paliativos e comunicação de más notícias | Sem livro próprio identificado | Criar com comunicação SPIKES, manejo de sintomas e diretivas antecipadas |
| 181 | Eletrocardiografia: fundamentos e interpretação sistemática | Sem livro próprio identificado | Criar com metodologia ECG, exemplos reais licenciados, arritmias e padrões de isquemia |

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