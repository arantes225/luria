# LURIA — Inventário editorial do Lote 5 (093–115)
Data: 14/10/2026. **Situação:** auditoria inicial, não certificação de completude.
Fonte da grade: `assets/js/cronograma-base-data.js`, aulas 93–115. Não inferir existência de apostila a partir do índice de assuntos.

| Nº | Área | Tema | Situação inicial no repositório |
|---|---|---|---|
| 093 | Pediatria | Asma na infância | Manuscrito em `_rascunhos/lote-05-093-asma-infancia.md` (**86.488 caracteres Markdown** nesta branch); capítulo de reconciliação GINA × PCDT preservado, corrigido critério temporal de sibilância pré-escolar e atualizada matriz editorial; validação farmacológica e revisão independente pendentes |
| 094 | GO | Rotura prematura de membranas | Pasta existente `amniorrexe-prematura/`; preservar e auditar |
| 095 | Preventiva | Sensibilidade, especificidade e valores preditivos | Rascunho original criado em `_rascunhos/lote-05-095-acuracia-testes-diagnosticos.md` (**30.223 caracteres Markdown**), com quatro casos completos, seis questões MCQ comentadas, cálculos Bayes/RV e fontes STARD/BMJ; falta aprofundamento, auditoria de fórmulas independente e imagens; sem publicação |
| 096 | Clínica | Distúrbios hidroeletrolíticos | Manuscrito ampliado em `_rascunhos/lote-05-096-disturbios-hidroeletroliticos.md` (**98.569 caracteres brutos Markdown**); 24 capítulos numerados + etapa zero, 10 casos clínicos e 14 questões autorais; ainda em revisão farmacológica e sem publicação; benchmarks do Drive parcialmente equivalentes |
| 097 | Cirurgia | Pancreatite aguda cirúrgica | Manuscrito original criado em `_rascunhos/lote-05-097-pancreatite-aguda.md` (**70.518 caracteres brutos Markdown**, cerca de 60,5 mil de prosa estimada); 28 blocos numerados, 9 casos e 10 questões; benchmarking Drive confirmado e fontes atualizadas; revisão científica/editorial independente pendente |
| 098 | Pediatria | Crupe e epiglotite | Pasta homônima não identificada na biblioteca. Buscas no Drive por crupe, laringite, laringotraqueíte, epiglotite, estridor e obstrução de vias aéreas encontraram apenas material INDIRETO (ATLS, ventilação e insuficiência respiratória), sem apostila comparável. Não iniciar edição sem referência equivalente ou acesso específico, conforme etapa zero |
| 099 | GO | Trabalho de parto prematuro | `trabalho-parto-prematuro/index.html` é apenas o contêiner (~3,1 mil caracteres); conteúdo médico já existe em `content.json` (~71,1 mil caracteres brutos). Preservar e auditar utilidade real |
| 100 | Preventiva | Testes diagnósticos e curvas ROC | Sem pasta homônima identificada; avaliar complementaridade com nº 095 |
| 101 | Clínica | Distúrbios ácido-base | Manuscrito original avançado em `_rascunhos/lote-05-101-disturbios-acido-base.md` (**73.679 caracteres brutos Markdown**, ~63.382 caracteres estimados sem títulos, linhas de tabelas e links); 25 seções 0–24, 10 casos e 12 questões. PDFs de gasometria partes 1/2 abertos no Drive e contrastados com revisão brasileira e consensos atuais. NÃO PUBLICADO; revisão clínica/editorial pendente |
| 102 | Cirurgia | Obstrução intestinal | Manuscrito original em `_rascunhos/lote-05-102-obstrucao-intestinal.md` (**61.990 caracteres brutos Markdown**), 25 blocos 0–24, 10 casos e 12 questões comentadas; comparação do Drive concluída e diretrizes WSES/ACR/ASCRS aplicadas criticamente. NÃO APROVADO / NÃO PUBLICADO |
| 103 | Pediatria | Tuberculose na infância | Sem pasta homônima identificada |
| 104 | GO | Hemorragia pós-parto | Manuscrito avançado em `_rascunhos/lote-05-104-hemorragia-pos-parto.md` (**102.189 caracteres Markdown** nesta branch); capítulo de hemorragia secundária aprofundado com investigação de lesões vasculares, Doppler e decisões por estabilidade; `assistencia-ao-parto/` preservada; revisão médica, imagens e integração pendentes |
| 105 | Preventiva | Desenhos de estudos epidemiológicos | Sem pasta homônima identificada |
| 106 | Clínica | Lesão renal aguda | Sem pasta homônima identificada |
| 107 | Cirurgia | Hérnias da parede abdominal | Sem pasta homônima identificada |
| 108 | Pediatria | Infecção urinária na criança | Sem pasta homônima identificada |
| 109 | GO | Puerpério normal e patológico | Sem pasta homônima identificada; auditar `assistencia-ao-parto/` |
| 110 | Preventiva | Ensaios clínicos e revisões sistemáticas | Sem pasta homônima identificada; cruzar nº 105 |
| 111 | Clínica | Doença renal crônica | Sem pasta homônima identificada |
| 112 | Cirurgia | Diverticulite aguda | Sem pasta homônima identificada |
| 113 | Pediatria | Síndrome nefrótica e síndrome nefrítica | Sem pasta homônima identificada |
| 114 | GO | Infecção puerperal | Sem pasta homônima identificada; cruzar 109 |
| 115 | Preventiva | Vieses, confundimento e causalidade | Sem pasta homônima identificada; cruzar 105 e 110 |

## Constatações de arquivo efetivamente aberto
- `apostilas/amniorrexe-prematura/index.html`: ~104.430 caracteres de HTML total. Contém capítulos em profundidade e esquemas. **Não significa 104.430 caracteres didáticos úteis.**
- `apostilas/trabalho-parto-prematuro/index.html`: ~3.107 caracteres de HTML, **renderer legítimo**, com atributo `data-apostila-content` apontando para `content.json`. O JSON foi efetivamente aberto: ~71.107 caracteres totais, sumário com mais de 20 seções (concepção, diagnóstico, corticoterapia, tocólise, MgSO4, EGB, RPMO, casos e referências). **Apostila existente substancial: não recriar.** O tamanho bruto do JSON não mede caracteres didáticos úteis.
- `apostilas/assistencia-ao-parto/index.html`: ~83.798 caracteres de HTML total, com capítulos e fluxos relevantes; não contar como cobertura automática de HPP, puerpério ou infecção puerperal.

## Regra de continuação
Para cada apostila seguinte: pesquisar e **abrir** uma apostila comparável no Drive; examinar previamente o conteúdo LURIA existente; registrar comparação e lacunas; confirmar diretrizes vigentes; produzir texto próprio; criar candidatas de imagem somente via Admin; exigir ≥60 mil caracteres didáticos úteis, questões/casos e autossuficiência antes da publicação.

## Primeira revisão
Tema 093: comparação realizada com **Asma.pdf** e **Crise Asmática.pdf** do Drive, além do padrão visual LURIA e GINA 2026. Textos do Drive são resumos não identificados como Estratégia MED, com referências antigas. **Situação:** rascunho inicial, não apto para publicação.

## Retificação documental de 14/10/2026
A classificação inicial da apostila 099 com base apenas em `index.html` estava incorreta. Após leitura de `content.json`, a etapa correta é **auditoria de profundidade e atualização**, não criação de novo documento. Para revisão clínica, comparar com o documento FEBRASGO sobre uso racional da tocólise, a recomendação da OMS 2022 sobre corticoterapia antenatal e, separadamente, a recomendação da OMS 2022 sobre tocólise. A consulta comparativa no Drive localizada neste turno é indireta (obstetrícia e sangramento de segunda metade), portanto **a etapa zero do tema 099 ainda está pendente de uma apostila verdadeiramente equivalente**.


## Continuação de 14/10/2026 — produção e benchmarks
- **093 — Asma na infância:** duas fichas do Drive realmente lidas (`Asma.pdf`, `Crise Asmática.pdf`), atualizadas criticamente com GINA 2026; consultados também a revisão nacional no Jornal Brasileiro de Pneumologia (2024) e os metadados de aprovação do PCDT Asma do Ministério da Saúde (Portaria Conjunta SAES/SCTIE nº 43/2026, atualização de anexo em setembro). Rascunho Markdown avançado; contagem simples não certifica autossuficiência nem elegibilidade de medicamentos para uso brasileiro. Sem conteúdo incorporado ao site.
- **104 — Hemorragia pós-parto:** apostila `04 - HEMORRAGIA POS PARTO.pdf` do Drive aberta e lida; origem institucional não identificada; `assistencia-ao-parto/index.html` da LURIA aberta e avaliada nas referências a HPP. Divergência crítica registrada: limiares tradicionais de 500 mL/1000 mL versus critério precoce OMS/FIGO/ICM 2025 de perda medida ≥300 mL com sinal hemodinâmico anormal ou ≥500 mL. Elaborado rascunho original e autônomo em `_rascunhos/lote-05-104-hemorragia-pos-parto.md`. Revisão adicional baseada no protocolo FEBRASGO Femina 2025 e Position Statement 2024. **Pendente de revisão, extensão e publicação.**
- **094 — RPMO:** a apostila existente permanece intocada. Busca neste turno não encontrou material diretamente equivalente no Drive; para respeitar Etapa Zero, **não editar até obter benchmark realmente adequado**. Fonte primária FEBRASGO 2024 e protocolo hospitalar 2026 identificados para futura atualização.
- **095 — Testes diagnósticos:** nenhum material específico de referência educacional localizado nas buscas iniciais no Drive; ainda não iniciada edição médica. Buscar outros termos e pastas antes de iniciar.


## Checkpoint editorial — 14/10/2026, complemento da apostila 104

**Arquivos reais confirmados:** apostila publicada preexistente \`apostilas/assistencia-ao-parto/index.html\`; novo rascunho \`apostilas/_rascunhos/lote-05-104-hemorragia-pos-parto.md\`. Nenhum conteúdo existente foi sobrescrito.

**Etapa zero concluída para 104:** revisão integral do texto extraído do PDF correlato \`04 - HEMORRAGIA POS PARTO.pdf\`, localizado e aberto no Drive; autoria institucional não confirmada, portanto jamais atribuir ao Estratégia MED. Benchmark comparado com capítulos e trechos de HPP da apostila LURIA de assistência ao parto, com checagem científica independentemente na OMS/FIGO/ICM 2025, no guia de implementação OMS 2026 e nas publicações/fluxograma FEBRASGO.

**Evolução do manuscrito:** 19.310 → 54.662 → 81.511 → **85.742 caracteres Markdown** (contagem de arquivo inteiro); extração aproximada da linguagem corrente sem títulos e linhas de tabela ~74.668 caracteres. Isto é **triagem métrica**, não cálculo auditado de 60 mil caracteres úteis nem prova de qualidade. Há 21 capítulos numerados de desenvolvimento, dez casos com identificadores explícitos (quatro iniciais e seis avançados), 14 questões de cinco alternativas com comentários individuais (as seis questões iniciais foram reconstruídas e oito questões avançadas foram acrescentadas), recursos didáticos e roteiro de doze imagens candidatas ainda NÃO criadas/avaliadas.

**Conteúdo diferencial acrescentado e baseado em fontes confirmadas:**
1. Prevenção por uterotônico e condutas não recomendadas na profilaxia segundo OMS 2025.
2. Reconhecimento objetivo por perda ≥300 mL com alteração hemodinâmica, ou ≥500 mL, sem espera em instabilidade clínica.
3. Fluxo de resposta coordenado (E-MOTIVE), com definição de tarefas e reavaliação.
4. Farmacologia clínica dos uterotônicos, interações e contraindicações (ex.: metilergometrina e hipertensão; carboprost e asma).
5. Interpretação de hemoglobina, fibrinogênio, plaquetas, coagulograma e implicações para reposição/hemoterapia.
6. Critérios estritos de segurança para balão intrauterino, opções cirúrgicas e temporizadoras.
7. Cenários especiais: acretismo, inversão uterina, hipertensão, asma, sangramento secundário.
8. Plano de cuidado após HPP e matriz de teste de autossuficiência.

**Lacunas técnicas que impedem marcar como finalizada:** auditoria de cada dose de oxitócico/hemoderivado em protocolos brasileiros e bulas vigentes; comparação crítica adicional com protocolos assistenciais dos serviços brasileiros; validação da consistência do texto e questões por revisor obstetra independente; seleção e autorização de imagens via Admin; adaptação de Markdown ao renderizador JSON/HTML; testes automáticos do projeto e inspeção desktop/PWA; certificação de cobertura/aprendizado por resolução independente de casos. **Status correto: EM REVISÃO, NÃO PUBLICADA.**

**Referências públicas efetivamente consultadas:** 
- OMS/FIGO/ICM, diretriz HPP 2025 — https://www.who.int/publications/i/item/9789240115637
- OMS, guia de implementação HPP 2026 — https://www.who.int/publications/i/item/9789240116115
- FEBRASGO, fluxo nacional — https://www.febrasgo.org.br/fluxograma/procedimento-para-tratar-hemorragia-pos-parto/
- FEBRASGO, Femina 2025, protocolos sobre HPP e manejo hemostático (textos oficiais indexados, links editoriais com alterações de hospedagem).

**Revisão de questões no mesmo checkpoint:** substituídas as seis questões originais abreviadas por seis questões completas, com explicação de A–E, referência didática ao conteúdo e mini-revisão; agora são **14 questões** (seis fundamentais e oito avançadas). Contagem de arquivo bruto atual: **85.742 caracteres**, estimativa textual simples sem cabeçalhos e tabelas ~**74.668**. Meta métrica superada em estimativa, **mas não atesta texto didático útil sem repetição**, atualização de todas as doses, autossuficiência nem aprovação humana. Nenhum HTML de produção alterado.


## Checkpoint adicional — revisão científica e abertura da apostila 096 (14/10/2026)

**093 — Asma infantil:** rascunho atualizado para 79.426 caracteres brutos de Markdown. Verificação direta de GINA 2026: episódios de sibilância no pré-escolar requerem pelo menos um episódio confirmado por profissional/cuidado descritivo convincente e duração compatível; hipótese pode continuar como *suspeita de asma*. Incluídos critérios clínicos de gravidade por idade; apresentados de forma autoral sem copiar quadros da GINA. Fontes: https://ginasthma.org/wp-content/uploads/2026/05/GINA-2026-Strategy-Report-WMS.pdf ; https://ginasthma.org/wp-content/uploads/2026/07/GINA-Summary-Guide-2026-WEB-WMS.pdf . Necessita validação de apresentações disponíveis no Brasil, dose por dispositivo, depuração de redundâncias e revisão externa.

**104 — Hemorragia pós-parto:** rascunho de 88.061 caracteres brutos de Markdown. Verificadas recomendações OMS/FIGO/ICM 2025: para prevenção não são recomendadas ergometrina/metilergometrina e associação fixa com ocitocina, enquanto fármacos dessa classe podem aparecer no tratamento se apropriados; dose terapêutica comum de ocitocina 10 UI IV lenta e manutenção conforme resposta; qualificação da recomendação de PFC diante de hemorragia grave. Fonte: https://www.ncbi.nlm.nih.gov/books/NBK619233/?report=printable . Precisa de consolidação de capítulos com conceitos redundantes e checagem das divergências com FEBRASGO e protocolos brasileiros.

**096 — Distúrbios hidroeletrolíticos:** iniciado manuscrito original de 31.799 caracteres brutos. Benchmark do Drive EFETIVAMENTE LIDO: “04 - ECG DISTURBIOS HIDROELETROLITICOS.pdf”, “08 - GASOMETRIA ARTERIAL - PARTE 2.pdf” e “02 - ESPECIALIDADES- NEFRO - DRC, LRA.pdf”. Nenhum é equivalente completo; **etapa zero apenas parcialmente satisfeita para abrangência total**. Dados de emergência ancorados na diretriz europeia de hiponatremia 2014 (https://academic.oup.com/ejendo/article/170/3/G1/6668028) e na UK Kidney Association 2023 (https://www.ukkidney.org/sites/default/files/FINAL%20VERSION%20-%20UKKA%20CLINICAL%20PRACTICE%20GUIDELINE%20-%20MANAGEMENT%20OF%20HYPERKALAEMIA%20IN%20ADULTS%20-%20191223.pdf). Diferenças relevantes versus PDF resumido: ECG não estratifica sozinho risco da hipercalemia; unidades de QT precisam ser corrigidas e conferidas.

**Gate:** nenhuma dessas apostilas foi integrada ao HTML/JSON da produção, nenhuma foi aprovada por revisor clínico independente; números brutos de caracteres não comprovam 60 mil caracteres úteis, cobertura autossuficiente nem legalidade de imagens. Próxima rodada deve aprofundar 096 e completar reconciliação de 093/104 sem recriar obras existentes.


## Checkpoint editorial 096 — aprofundamento com auditoria quantitativa (14/10/2026)

- **Etapa zero:** três materiais privados do Google Drive efetivamente abertos e lidos, todos com escopo apenas correlato (ECG de distúrbios eletrolíticos, gasometria e nefrologia LRA/DRC). A procedência como Estratégia MED não foi comprovada e **não deve ser afirmada**. O padrão visual da apostila LURIA de amniorrexe prematura foi novamente inspecionado. Não copiar figuras, títulos, tabelas ou frases dos materiais.
- **Conteúdo acrescido nesta rodada:** algoritmo de hiponatremia por tonicidade, urina e volemia; sobrecorreção; cálculo de déficit de água na hipernatremia; comparação crítica da velocidade de correção; hipercalemia no serviço de urgência (cardioproteção/deslocamento/eliminação); potássio baixo; metabolismo de cálcio, magnésio e fósforo; realimentação; cálculos de unidades; seis casos clínicos adicionais, nove questões adicionais e planejamento de 12 figuras.
- **Fontes brasileiras e internacionais:** Sociedade Brasileira de Nefrologia, Guia de Assistência Nefrológica Hospitalar, 2024, https://www.sbn.org.br/wp-content/uploads/2024/05/Clique-aqui-para-acessar-a-guia-na-integra.pdf ; UK Kidney Association, tratamento da hipercalemia, 2023; diretriz europeia de hiponatremia, 2014; Endocrine Society, hipercalcemia por malignidade, 2023; Society for Endocrinology, hipocalcemia e errata de doses 2019; KDIGO CKD-MBD 2017; ASPEN 2020; NICE CG32; revisão sistemática de hipernatremia no adulto publicada em 2025. Fontes discriminadas por capítulo no manuscrito.
- **Auditoria de arquivo após salvar:** 98.569 caracteres brutos Markdown; ~84.906 caracteres após retirada simplificada de títulos, tabelas, símbolos e endereços (estimativa de texto corrente, **não medição de conteúdo didático útil**); seções numeradas 0–24 sem lacuna; 10 casos identificados; 14 questões de cinco alternativas comentadas. Não certifica qualidade clínica.
- **Gates pendentes:** verificar bulas brasileiras e disponibilidade de cada sal/concentração/medicamento; conciliar protocolos locais; resolver redundâncias; revisão clínica independente; imagens pelo Admin; converter Markdown para content.json após aprovação; testes, matriz de autossuficiência e inspeção desktop/PWA.
- **Status:** RASCUNHO AVANÇADO — NÃO APROVADO / NÃO PUBLICADO. Não interpretar doses de guias estrangeiros como prescrição automática no Brasil.


## Checkpoint 097 — pancreatite aguda (14/10/2026)

**Verificação de existência:** inspeção da listagem de `apostilas/` não encontrou diretório próprio de pancreatite aguda; por prudência não se declara que nenhum conteúdo relacionado exista em outras apostilas. A página `amniorrexe-prematura/index.html` foi inspecionada como modelo visual e não sofreu modificação.

**Etapa zero concluída:** foram efetivamente lidos no Google Drive os PDFs *09 - ABDOME AGUDO INFLAMATORIO - PANCREATITE AGUDA.pdf* (~6,7k caracteres de texto extraído), *01 - ABDOME AGUDO - INTRODUCAO.pdf* e *07 - ABDOME AGUDO INFLAMATORIO - COLEDOCOLITIASE.pdf*. Autoria institucional do primeiro não verificável no arquivo; marca de redistribuição **não comprova relação com Estratégia MED**. A avaliação identificou conceitos desatualizados ou simplificados no material comparativo (jejum prolongado genérico, generalização de cirurgia/antibióticos, BISAP com sinal de BUN invertido, critérios Atlanta de grave imprecisos). **Não foram copiados trechos ou ilustrações desses PDFs**.

**Diretrizes e fontes de atualização:**
- ACG 2024: https://pubmed.ncbi.nlm.nih.gov/38857482/ (manejo e investigações).
- Atlanta revisada, consenso 2012 publicado 2013: https://gut.bmj.com/content/62/1/102 (gravidade e coleções).
- WATERFALL 2022: https://pubmed.ncbi.nlm.nih.gov/36103415/ (hidração agressiva vs moderada e sobrecarga).
- AGA 2019/2020: https://pubmed.ncbi.nlm.nih.gov/31479658/ (necrose infectada, drenagem, step-up).
- Artigo 2026 em periódico brasileiro *Arquivos de Gastroenterologia* sobre lama biliar e microlitíase: https://www.scielo.br/j/ag/a/VzKJwZBQfs5GZj3rbqBxzvN/abstract/?lang=pt (revisão narrativa; não é protocolo nacional).

**Produção confirmada no GitHub:** arquivo `apostilas/_rascunhos/lote-05-097-pancreatite-aguda.md`, 70.518 caracteres brutos; aproximadamente 60.510 caracteres após retirada mecânica de Markdown, cabeçalhos, URLs e linhas de tabelas. **Essa estimativa não atesta 60.000 caracteres didáticos úteis, nem ausência de repetição.** Sequência dos títulos de capítulo 0 a 27 sem salto, nove casos explicitamente identificados, dez questões originais com cinco alternativas, gabarito e comentários. Doze imagens propostas para curadoria futura no Admin; nenhuma imagem criada/inserida.

**Divergências científicas documentadas:** jejum de rotina substituído por alimentação precoce quando tolerada; fluidos moderados e reavaliação (sem confundir com privação de ressuscitação em choque); CPRE de rotina não recomendada sem colangite; colecistectomia na mesma internação na biliar leve; necrose estéril não requer antibiótico profilático de rotina; classificação grave pela falência orgânica persistente >48 h, não por qualquer coleção.

**Pendências antes de publicar:** auditoria de repetição/estrutura; checagem de indicações e parâmetros com diretrizes brasileiras e protocolos locais; revisão clínica por especialista em cirurgia do aparelho digestivo/gastroenterologia e farmacêutica quando relevante; questões respondidas de modo independente com âncoras; curadoria de exames reais licenciados e aprovação de imagens via Admin; migração para o formato do site e testes desktop/PWA. **Não publicar o manuscrito como protocolo clínico validado.**


## Checkpoint editorial — retomada do Lote 5 (14/10/2026, período noturno)

**098 — Crupe e epiglotite:** o diretório do repositório não apresentou apostila homônima. Consultas ao Drive por diferentes termos clínicos e sinônimos não localizaram apostila pediátrica comparável; apenas textos indiretos de trauma, estridor e ventilação. **Etapa zero não atingida:** fica pendente de referência específica/acesso, não se presume que o material ATLS equivalha a uma apostila pediátrica de obstrução de vias aéreas. O tema é preservado no lote.

**101 — Distúrbios ácido-base:** a comparação com as duas partes de `GASOMETRIA ARTERIAL` e o PDF de emergências hiperglicêmicas do Drive foi efetivamente realizada; autoria institucional original não demonstrada e portanto não atribuída ao Estratégia MED. A revisão identificou alterações necessárias (compensação da acidose respiratória crônica, notação correta de ânion gap, cortes de cloro urinário, critérios de CAD atualizados). Manuscrito próprio salvo em `apostilas/_rascunhos/lote-05-101-disturbios-acido-base.md`. Dados do GitHub após leitura: **73.679 caracteres Markdown**, estimativa mecânica de prosa **63.382** (não equivale a caracteres didáticos úteis auditados), seções numeradas **0–24**, **10 casos clínicos** e **12 questões de 5 alternativas com comentários**. Parte conceitual abrangendo fisiologia, algoritmo de gasometria, compensações, AG/albumina/delta, acidose tubular renal, alcalose e acidose respiratórias/metabólicas, CAD, intoxicações e decisões em acidemia grave. **Nenhum HTML publicado modificado**.

**Referências desta rodada:** Gomes & Pereira, `Interpretação de gasometria arterial`, VITTALLE/FURG 2021, https://periodicos.furg.br/vittalle/article/view/11501 ; Morikawa/Ganesh, `Acid-Base Interpretation`, AFP 2025, https://www.aafp.org/afp/2025/0200/acid-base-interpretation ; `Mixed Acid-Base Disturbances: Core Curriculum 2025`, AJKD, https://www.sciencedirect.com/science/article/pii/S0272638625009072 ; consenso ADA/EASD 2024, https://pmc.ncbi.nlm.nih.gov/articles/PMC11272983/ ; ensaio BICARICU-2 JAMA 2025, https://jamanetwork.com/journals/jama/fullarticle/2840824 ; EXTRIP Salicilatos, https://www.extrip-workgroup.org/salicylates.

**Gates antes de aprovação 101:** conferir medicamentos e recomendações nacionais aplicáveis, aperfeiçoar fisiologia renal e manejo de intoxicações, auditoria independente de todas as fórmulas e dos exemplos numéricos, validação de ≥60 mil caracteres didáticos úteis sem repetição, aprovar imagens pelo Admin, testar autossuficiência, converter ao formato LURIA e inspecionar desktop/PWA. **Status: RASCUNHO AVANÇADO — NÃO APROVADO / NÃO PUBLICADO.**


## Checkpoint 102 — obstrução intestinal (14/10/2026)

**Etapa zero concluída:** acesso e leitura efetivos aos materiais privados `12 - ABDOME AGUDO OBSTRUTIVO.pdf`, `HÉRNIAS.pdf` e `03 - OBESIDADE - COMPLICACOES POS BARIATRICA.pdf`. Referência anatômica/estrutural da LURIA já inspecionada. Autoria institucional original desses PDFs não está estabelecida; marca de redistribuição não comprova autoria do Estratégia MED. Não copiar textos/imagens protegidos.

**Revisão científica:** WSES Bologna 2017/2018 ASBO (https://pmc.ncbi.nlm.nih.gov/articles/PMC6006983/) estabelece tentativa não operatória somente em ASBO selecionada **sem peritonite, estrangulamento ou isquemia**; até cerca de 72h como janela frequentemente considerada segura sob monitorização, não regra universal. Ausência de contraste hidrossolúvel no cólon às ~24h sugere alto risco de falha conservadora. ACR (https://acsearch.acr.org/docs/69476/Narrative/) considera TC com contraste IV geralmente apropriada na suspeita aguda de obstrução do delgado. ASCRS 2021 (https://pubmed.ncbi.nlm.nih.gov/34016826/) diferencia volvo sigmoide, cecal e Ogilvie; ASCRS 2022 (https://doi.org/10.1097/DCR.0000000000002323) contempla opções de stent/estoma antes de colectomia na obstrução neoplásica esquerda em contextos apropriados.

**Material produzido/verificado:** `apostilas/_rascunhos/lote-05-102-obstrucao-intestinal.md` tem **61.990 caracteres brutos**, capítulos 0–24 sem lacuna, dez casos explicitamente numerados A–J e doze questões comentadas. Cobertura: síndrome e anatomia, obstrução complicada e alça fechada, clínica, TC/risco de isquemia, bridas e contraste, hérnias externas/internas, neoplasia, volvos, fecaloma, Crohn, íleo biliar, Ogilvie, tratamento clínico, critérios cirúrgicos, situações pós-operatórias e seguimento.

**Risco editorial:** conteúdo ainda próximo da meta quantitativa de 60 mil caracteres, mas não é comprovação dos **60 mil caracteres úteis**, e alguns fundamentos se repetem em blocos introdutórios e aprofundamento. Faltam revisão independente por cirurgião, checagem das referências nacionais disponíveis, aprovação de imagens pelo Admin, teste de questões com âncoras, integração ao renderer `content.json`, testes visuais e PWA. Nenhuma versão de produção foi sobrescrita. **STATUS: RASCUNHO AVANÇADO, NÃO PUBLICADO.**

## Checkpoint — continuação dirigida do lote 5 (14/10/2026)

**Branch isolada:** `editorial/lote-05-hpp-tardia-asma-20261014`. Este checkpoint documenta mudanças em *manuscritos*, não autorização de publicar.

**093 — Asma na infância.** O arquivo da branch-fonte já possuía 85.928 caracteres, incluindo capítulo recente de reconciliação farmacológica 2026 (o inventário da branch ainda citava a versão anterior de 79.426). A revisão preservou esse conteúdo e corrigiu precisamente o critério GINA 2026 para menores de seis anos: os episódios agudos contados no padrão recorrente devem durar **mais de 24 horas**, e pelo menos um deve envolver sibilância expiratória identificada por profissional ou relatada convincentemente por cuidador. A confirmação da sibilância não é exceção ao critério de duração. A matriz de casos/questões foi atualizada; continua faltando checagem nacional de apresentações, limites posológicos e revisão por especialista. Fonte primária: [GINA Strategy Report 2026, capítulo 10](https://ginasthma.org/wp-content/uploads/2026/05/GINA-2026-Strategy-Report-WMS.pdf).

**104 — Hemorragia pós-parto.** A seção 6, anteriormente reduzida a um parágrafo, tornou-se capítulo com oito subtópicos: limites de definição, sinais de alarme, avaliação por estabilidade, etiologias de sangramento tardio, Doppler (EMV versus lesão vascular verdadeira), tratamento orientado à causa, fluxograma original e dois novos cenários clínicos. Material verificável confrontado com [NICE NG194](https://www.nice.org.uk/guidance/ng194/chapter/Recommendations), [ISUOG 2026](https://obgyn.onlinelibrary.wiley.com/doi/full/10.1002/uog.70122), [RadioGraphics 2025](https://doi.org/10.1148/rg.240098), [RadioGraphics 2026](https://doi.org/10.1148/rg.250152) e [OMS/FIGO/ICM 2025](https://www.who.int/publications/i/item/9789240115637). A distinção entre janela do TXA na HPP primária e manejo da paciente com sangramento tardio é explícita. **Não certificar prescrições ainda.**

**094 — Rotura prematura de membranas (auditoria de preservação):** `amniorrexe-prematura/index.html` existente e extenso (~104.430 caracteres HTML), com casos e marcos gestacionais por idade; nenhuma fotografia/exame médico incorporado em tag `<img>` foi identificado na inspeção estrutural (ícones e ativos visuais decorativos são referências de CSS/caminho). Não modificar sem revisão clínica e de direitos de imagem.

**099 — Trabalho de parto prematuro (auditoria estrutural):** `trabalho-parto-prematuro/content.json` existente (~71.107 caracteres), JSON parseável, `v=2`, 25 identificadores de índice e 26 blocos (o adicional é de curadoria oculta). Seção de casos contém cinco casos nomeados e um caso integrador; seção de revisão contém questões de fixação. Curadoria oculta cita dez figuras candidatas, mas **não há `<img>` incorporada ao JSON**, portanto lista de candidatas não constitui implementação de imagens. Preservar renderer e conteúdo, verificar âncoras, aparência e validação clínica antes de declarar finalizada.

**Pendências transversais:** revisão independente por pediatria/pneumologia e obstetrícia; validação posológica, medicamentos/registro no Brasil e protocolos institucionais; depuração de redundâncias; curadoria e licenças das imagens; testes de renderização, PWA, links/âncoras, acessibilidade; publicação apenas após aprovação editorial e clínica. Contagem bruta Markdown/JSON/HTML não comprova contagem de texto didático útil.


## Checkpoint 095 — acurácia de testes diagnósticos (14/10/2026)

**Etapa zero:** busca por títulos/termos relacionados no Google Drive não identificou uma apostila geral comparável; resultados eram referências ocasionais a acurácia em materiais de doenças específicas. Não foram reaproveitados textos de terceiros. Foi conferida a diretriz [STARD 2015](https://www.equator-network.org/reporting-guidelines/stard/) e literatura do [BMJ sobre interpretação diagnóstica](https://www.bmj.com/content/345/bmj.e3999) e [efeito de espectro](https://www.bmj.com/content/353/bmj.i3139).

**Novo arquivo:** `apostilas/_rascunhos/lote-05-095-acuracia-testes-diagnosticos.md` (30.223 caracteres Markdown, primeira versão). Conteúdo próprio: matriz 2×2, sensibilidade, especificidade, VPP, VPN, comparação de três prevalências com N=1.000, RV+/RV−, conversão odds e probabilidades, testes em série/paralelo, vieses, quatro casos clínicos completos, seis questões de cinco alternativas justificadas, síntese e dez sugestões de figuras autorais. Exemplo fictício com sensibilidade 90%, especificidade 80% e prevalência 1% gera VP=9, FN=1, FP=198, VN=792 e VPP=4,35%, conferido matematicamente.

**Limites:** recorte da aula 095 centrado em tabela 2×2/Bayes, evitando duplicação com a aula 100 (pontos de corte, ROC/AUC). Ainda não atinge a meta qualitativa final nem 60 mil caracteres úteis. Faltam revisão independente das fórmulas, aplicação brasileira, aprofundamento metodológico, seleção de imagens, integração HTML/JSON, teste responsivo/PWA e aprovação editorial. **Status: rascunho, não publicado.**
