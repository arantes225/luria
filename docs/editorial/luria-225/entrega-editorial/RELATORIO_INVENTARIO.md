# Inventário editorial LURIA — 2026-10-14

## Resultado e limite

Cronograma local: 180 IDs preservados; 45 complementos do pedido; 225 entradas em 12 blocos. O site publicado e o banco não foram consultados: os resultados descrevem os arquivos da cópia local.

- 26 cadernos reais encontrados; 17 abaixo do piso e 9 acima do piso na triagem.
- 32 núcleos com caderno candidato, todos classificados como cobertura parcial provisória até auditoria clínica.
- 193 núcleos sem caderno de escopo identificado, candidatos a criação. Menções incidentais não equivalem a cobertura.
- Cobertura integral efetivamente certificada: nenhuma nesta execução. Isso não significa que nenhuma apostila possa estar completa; essa medida permanece desconhecida.
- 21 núcleos apontam para cadernos abaixo de 60K; revisar objetivos antes de expandir. Não somar déficits de núcleos que apontam para o mesmo arquivo.

## O que foi examinado

Foram lidos cronograma, padrões editoriais, instruções de lote, scripts build/audit e estrutura do template Vulvovaginites. Todos os HTML/content.json foram processados para extrair títulos, seções, evidências textuais, URLs e hashes. Essa extração não equivale a leitura clínica integral ou validação de condutas. Os relatórios históricos de conteúdo, imagens e comparações foram consultados como evidência histórica, sem presumir estado atual do Admin.

As 180 entradas são extraídas diretamente do arquivo oficial local; IDs e nomes permanecem intactos. Os complementos não foram adicionados ao cronograma do aluno.

## Cobertura, fontes e imagens

Cada entrada em inventario-225.json contém área, correspondência, evidência, ação, temas relacionados e pendências. Cada caderno tem evidências próprias em evidencias/cadernos/: extensão, títulos, seções, URLs, hashes e presença no catálogo local. Fontes externas desses cadernos não foram abertas individualmente; doses não foram validadas. Nenhuma aprovação de imagem foi inferida pela existência de img ou pelo registro histórico.

Pendências documentais conhecidas: amniorrexe (figuras históricas 94/96/98), climatério (78), sangramento uterino (315/319). O relatório de 13/10 registra substituições de 96/98 e exclusão de renderização de 78/94/315/319: conferir estado real antes de reutilizar. Não reabrir esses problemas como se as correções documentadas não existissem.

SUS.pdf foi aberto pelo conector e seu texto examinado: comparação de escopo parcial (princípios, níveis, participação e gestão); autoria institucional não confirmada e visuais não inspecionados. Não é uma apostila completa equivalente ao futuro caderno LURIA. Nenhum texto privado foi copiado para esta entrega.

Planner Aristo 2026/2027 não localizado nas buscas Aristo e Aristo 2026; não foi lido. Comparação de cobertura com Aristo permanece pendente.

A página oficial do Inep aponta a Portaria 478/2025 como referência: [legislação oficial](https://www.gov.br/inep/pt-br/centrais-de-conteudo/legislacao/enamed/2025). É necessário ler a matriz integral, suas atualizações e mapear competências por capítulo; alinhamento integral ao ENAMED não foi atestado.

## Consolidações

- 097/141: Não consolidar automaticamente. Produzir matriz de objetivos e capítulos; preservar diferenças de contexto e idade.
- 127/132/136: Não consolidar automaticamente. Produzir matriz de objetivos e capítulos; preservar diferenças de contexto e idade.
- 167/169: Mesmo caderno candidato para 167 e 169; confirmar cobertura benigna e oncológica antes de habilitar ambos
- 159/164: Mesmo caderno candidato; conservar unidades distintas para rastreamento, lesões precursoras e doença invasiva
- 003/008: Não consolidar automaticamente. Produzir matriz de objetivos e capítulos; preservar diferenças de contexto e idade.
- 145/149/154: Não consolidar automaticamente. Produzir matriz de objetivos e capítulos; preservar diferenças de contexto e idade.
- 155/212/213/214/215/216/217/218/219: Não consolidar automaticamente. Produzir matriz de objetivos e capítulos; preservar diferenças de contexto e idade.
- 160/218: Não consolidar automaticamente. Produzir matriz de objetivos e capítulos; preservar diferenças de contexto e idade.
- 067/195/196/197: Não consolidar automaticamente. Produzir matriz de objetivos e capítulos; preservar diferenças de contexto e idade.
- 070/165/225: Não consolidar automaticamente. Produzir matriz de objetivos e capítulos; preservar diferenças de contexto e idade.
- 150/183/223: Não consolidar automaticamente. Produzir matriz de objetivos e capítulos; preservar diferenças de contexto e idade.

Também preservar pré-natal como candidato para 004/009/014/019 e hemorragias obstétricas para 039/044/049/054/059/064; verificar objetivos individuais. Consolidar arquivos apenas após comparação de capítulos. Ciclo menstrual, fisiologia gestacional, infertilidade, sexualidade, crescimento fetal e vulvovaginites permanecem como recursos próprios, mesmo fora dos 225 títulos. Não excluí-los por não corresponderem a núcleo independente.

## Fila e piloto

Primeiro grupo: 001, 002, 003, 005, 212. São temas sem caderno de escopo próprio identificado e representam cinco frentes sem biblioteca dedicada. Fila em fila-producao.json: até 20 por lote e grupos de até cinco. Identificadores editoriais nunca são renumerados.

O piloto está preparado documentalmente, não produzido como cinco apostilas completas. Não foram entregues arquivos científicos da Fase A; fundamentos.md e conteudo.md registram essa ausência. Fontes, comparação de escopo, imagens e matriz ENAMED precisam ser completadas antes de redação/integração. Não existe HTML final nem revisão clínica concluída. Não foi usado preenchimento artificial para satisfazer 60K.

## Verificação técnica

- audit-apostilas-60k.mjs: código 0; log preservado.
- audit-apostilas-batch.cjs: código 0; log preservado.
- check-syntax.cjs: código 0; log preservado.

Build não executado sobre conteúdo incompleto. Nenhum arquivo existente foi sobrescrito; CSS, rotas, Admin e banco permanecem sem alterações nesta execução. Nenhum deploy. Entrega local pronta para posterior integração em branch/PR; branch/PR ainda não criados.

## Inventário das 225 entradas

| ID | Núcleo | Área | Correspondência local | Cobertura preliminar | Prioridade | Relacionados |
|---|---|---|---|---|---|---|
| 001 | Síndromes coronarianas agudas | Clínica Médica | — | Ausente no acervo de escopo | P1 | — |
| 002 | Avaliação pré-operatória e risco cirúrgico | Cirurgia Geral | — | Ausente no acervo de escopo | P1 | — |
| 003 | Assistência ao recém-nascido em sala de parto | Pediatria | — | Ausente no acervo de escopo | P1 | 8 |
| 004 | Pré-natal de baixo risco | Ginecologia e Obstetrícia | apostilas/pre-natal-baixo-risco/index.html | Parcial provisória | P3 | 9, 14, 19 |
| 005 | Princípios e diretrizes do SUS | Medicina Preventiva | — | Ausente no acervo de escopo | P1 | 10, 15, 20, 25, 30, 35, 40, 45, 50 |
| 006 | Insuficiência cardíaca | Clínica Médica | — | Ausente no acervo de escopo | P1 | — |
| 007 | Cuidados perioperatórios | Cirurgia Geral | — | Ausente no acervo de escopo | P1 | — |
| 008 | Reanimação neonatal | Pediatria | — | Ausente no acervo de escopo | P1 | 3 |
| 009 | Diagnóstico e datação da gestação | Ginecologia e Obstetrícia | apostilas/pre-natal-baixo-risco/index.html | Parcial provisória | P3 | 4, 14, 19 |
| 010 | Lei nº 8.080/1990 | Medicina Preventiva | — | Ausente no acervo de escopo | P1 | 5, 15, 20, 25, 30, 35, 40, 45, 50 |
| 011 | Hipertensão arterial sistêmica | Clínica Médica | — | Ausente no acervo de escopo | P1 | — |
| 012 | Resposta metabólica ao trauma | Cirurgia Geral | — | Ausente no acervo de escopo | P1 | — |
| 013 | Prematuridade e baixo peso ao nascer | Pediatria | — | Ausente no acervo de escopo | P1 | — |
| 014 | Exames e rastreamentos no pré-natal | Ginecologia e Obstetrícia | apostilas/pre-natal-baixo-risco/index.html | Parcial provisória | P3 | 4, 9, 19 |
| 015 | Lei nº 8.142/1990 | Medicina Preventiva | — | Ausente no acervo de escopo | P1 | 5, 10, 20, 25, 30, 35, 40, 45, 50 |
| 016 | Arritmias e fibrilação atrial | Clínica Médica | — | Ausente no acervo de escopo | P1 | — |
| 017 | Reposição volêmica e distúrbios hidroeletrolíticos no paciente cirúrgico | Cirurgia Geral | — | Ausente no acervo de escopo | P1 | 96, 101 |
| 018 | Icterícia neonatal | Pediatria | — | Ausente no acervo de escopo | P1 | — |
| 019 | Vacinação e suplementação na gestação | Ginecologia e Obstetrícia | apostilas/pre-natal-baixo-risco/index.html | Parcial provisória | P3 | 4, 9, 14 |
| 020 | Atenção Primária à Saúde e seus atributos | Medicina Preventiva | — | Ausente no acervo de escopo | P1 | 5, 10, 15, 25, 30, 35, 40, 45, 50 |
| 021 | Valvopatias | Clínica Médica | — | Ausente no acervo de escopo | P1 | — |
| 022 | Choque hemorrágico | Cirurgia Geral | — | Ausente no acervo de escopo | P1 | — |
| 023 | Sepse neonatal | Pediatria | — | Ausente no acervo de escopo | P1 | — |
| 024 | Hipertensão gestacional e pré-eclâmpsia | Ginecologia e Obstetrícia | apostilas/sindromes-hipertensivas-da-gestacao/index.html | Parcial provisória | P2 | — |
| 025 | Estratégia Saúde da Família | Medicina Preventiva | — | Ausente no acervo de escopo | P1 | 5, 10, 15, 20, 30, 35, 40, 45, 50 |
| 026 | Endocardite infecciosa | Clínica Médica | — | Ausente no acervo de escopo | P1 | — |
| 027 | Nutrição no paciente cirúrgico | Cirurgia Geral | — | Ausente no acervo de escopo | P1 | — |
| 028 | Aleitamento materno | Pediatria | — | Ausente no acervo de escopo | P1 | — |
| 029 | Diabetes mellitus gestacional | Ginecologia e Obstetrícia | apostilas/diabetes-mellitus-gestacional/index.html | Parcial provisória | P2 | — |
| 030 | Política Nacional de Atenção Básica | Medicina Preventiva | — | Ausente no acervo de escopo | P1 | 5, 10, 15, 20, 25, 35, 40, 45, 50 |
| 031 | Pericardite e tamponamento cardíaco | Clínica Médica | — | Ausente no acervo de escopo | P1 | — |
| 032 | Cicatrização de feridas | Cirurgia Geral | — | Ausente no acervo de escopo | P1 | — |
| 033 | Alimentação complementar | Pediatria | — | Ausente no acervo de escopo | P1 | — |
| 034 | Infecções na gestação e transmissão vertical | Ginecologia e Obstetrícia | apostilas/infeccoes-gestacao-transmissao-vertical/index.html | Parcial provisória | P3 | — |
| 035 | Redes de Atenção à Saúde | Medicina Preventiva | — | Ausente no acervo de escopo | P1 | 5, 10, 15, 20, 25, 30, 40, 45, 50 |
| 036 | Tromboembolismo venoso e embolia pulmonar | Clínica Médica | — | Ausente no acervo de escopo | P1 | — |
| 037 | Infecção do sítio cirúrgico e antibioticoprofilaxia | Cirurgia Geral | — | Ausente no acervo de escopo | P1 | — |
| 038 | Crescimento e desenvolvimento | Pediatria | — | Ausente no acervo de escopo | P1 | 168, 207 |
| 039 | Sangramento na primeira metade da gestação | Ginecologia e Obstetrícia | apostilas/hemorragias-primeiro-terceiro-trimestre/index.html | Parcial provisória | P2 | 44, 49, 54, 59, 64 |
| 040 | Regionalização, hierarquização e referência/contrarreferência | Medicina Preventiva | — | Ausente no acervo de escopo | P1 | 5, 10, 15, 20, 25, 30, 35, 45, 50 |
| 041 | Choque circulatório | Clínica Médica | — | Ausente no acervo de escopo | P1 | — |
| 042 | Princípios de técnica cirúrgica | Cirurgia Geral | — | Ausente no acervo de escopo | P1 | — |
| 043 | Puericultura e prevenção de acidentes | Pediatria | — | Ausente no acervo de escopo | P1 | — |
| 044 | Abortamento | Ginecologia e Obstetrícia | apostilas/hemorragias-primeiro-terceiro-trimestre/index.html | Parcial provisória | P2 | 39, 49, 54, 59, 64 |
| 045 | Participação e controle social no SUS | Medicina Preventiva | — | Ausente no acervo de escopo | P1 | 5, 10, 15, 20, 25, 30, 35, 40, 50 |
| 046 | Asma | Clínica Médica | — | Ausente no acervo de escopo | P1 | 93 |
| 047 | Trauma: atendimento inicial e ABCDE | Cirurgia Geral | — | Ausente no acervo de escopo | P1 | — |
| 048 | Imunizações na infância | Pediatria | — | Ausente no acervo de escopo | P1 | 135 |
| 049 | Gestação ectópica | Ginecologia e Obstetrícia | apostilas/hemorragias-primeiro-terceiro-trimestre/index.html | Parcial provisória | P2 | 39, 44, 54, 59, 64 |
| 050 | Financiamento e gestão do SUS | Medicina Preventiva | — | Ausente no acervo de escopo | P1 | 5, 10, 15, 20, 25, 30, 35, 40, 45 |
| 051 | DPOC | Clínica Médica | — | Ausente no acervo de escopo | P1 | — |
| 052 | Traumatismo cranioencefálico | Cirurgia Geral | — | Ausente no acervo de escopo | P1 | — |
| 053 | Desidratação e terapia de reidratação | Pediatria | — | Ausente no acervo de escopo | P1 | — |
| 054 | Doença trofoblástica gestacional | Ginecologia e Obstetrícia | apostilas/hemorragias-primeiro-terceiro-trimestre/index.html | Parcial provisória | P2 | 39, 44, 49, 59, 64 |
| 055 | Vigilância em Saúde | Medicina Preventiva | — | Ausente no acervo de escopo | P1 | — |
| 056 | Pneumonias adquiridas na comunidade | Clínica Médica | — | Ausente no acervo de escopo | P1 | 88 |
| 057 | Trauma torácico | Cirurgia Geral | — | Ausente no acervo de escopo | P1 | — |
| 058 | Diarreia aguda | Pediatria | — | Ausente no acervo de escopo | P1 | — |
| 059 | Sangramento na segunda metade da gestação | Ginecologia e Obstetrícia | apostilas/hemorragias-primeiro-terceiro-trimestre/index.html | Parcial provisória | P2 | 39, 44, 49, 54, 64 |
| 060 | Vigilância epidemiológica | Medicina Preventiva | — | Ausente no acervo de escopo | P1 | — |
| 061 | Tuberculose pulmonar | Clínica Médica | — | Ausente no acervo de escopo | P1 | 103 |
| 062 | Trauma abdominal | Cirurgia Geral | — | Ausente no acervo de escopo | P1 | — |
| 063 | Doença do refluxo gastroesofágico na infância | Pediatria | — | Ausente no acervo de escopo | P1 | — |
| 064 | Placenta prévia e descolamento prematuro de placenta | Ginecologia e Obstetrícia | apostilas/hemorragias-primeiro-terceiro-trimestre/index.html | Parcial provisória | P2 | 39, 44, 49, 54, 59 |
| 065 | Vigilância sanitária | Medicina Preventiva | — | Ausente no acervo de escopo | P1 | — |
| 066 | Derrame pleural | Clínica Médica | — | Ausente no acervo de escopo | P1 | — |
| 067 | Trauma pélvico e geniturinário | Cirurgia Geral | — | Ausente no acervo de escopo | P1 | 195, 196, 197 |
| 068 | Desnutrição e deficiências nutricionais | Pediatria | — | Ausente no acervo de escopo | P1 | — |
| 069 | Trabalho de parto e assistência ao parto | Ginecologia e Obstetrícia | apostilas/assistencia-ao-parto/index.html | Parcial provisória | P2 | 74, 79, 84 |
| 070 | Vigilância ambiental e saúde do trabalhador | Medicina Preventiva | — | Ausente no acervo de escopo | P1 | 165, 225 |
| 071 | Insuficiência respiratória aguda | Clínica Médica | — | Ausente no acervo de escopo | P1 | — |
| 072 | Queimaduras | Cirurgia Geral | — | Ausente no acervo de escopo | P1 | — |
| 073 | Obesidade infantil | Pediatria | — | Ausente no acervo de escopo | P1 | — |
| 074 | Partograma | Ginecologia e Obstetrícia | apostilas/assistencia-ao-parto/index.html | Parcial provisória | P2 | 69, 79, 84 |
| 075 | Notificação compulsória de doenças e agravos | Medicina Preventiva | — | Ausente no acervo de escopo | P1 | — |
| 076 | Diabetes mellitus | Clínica Médica | — | Ausente no acervo de escopo | P1 | 81, 153 |
| 077 | Abdome agudo: abordagem inicial | Cirurgia Geral | — | Ausente no acervo de escopo | P1 | — |
| 078 | Infecções de vias aéreas superiores | Pediatria | — | Ausente no acervo de escopo | P1 | — |
| 079 | Indução do trabalho de parto | Ginecologia e Obstetrícia | apostilas/inducao-do-trabalho-de-parto/index.html | Parcial provisória | P2 | 69, 74, 84 |
| 080 | Investigação de surtos e epidemias | Medicina Preventiva | — | Ausente no acervo de escopo | P1 | — |
| 081 | Cetoacidose diabética e estado hiperosmolar | Clínica Médica | — | Ausente no acervo de escopo | P1 | 76, 153 |
| 082 | Apendicite aguda | Cirurgia Geral | — | Ausente no acervo de escopo | P1 | — |
| 083 | Bronquiolite viral aguda | Pediatria | — | Ausente no acervo de escopo | P1 | — |
| 084 | Distocias e parto operatório | Ginecologia e Obstetrícia | apostilas/assistencia-ao-parto/index.html | Parcial provisória | P2 | 69, 74, 79 |
| 085 | Medidas de frequência: incidência e prevalência | Medicina Preventiva | — | Ausente no acervo de escopo | P1 | — |
| 086 | Distúrbios da tireoide | Clínica Médica | — | Ausente no acervo de escopo | P1 | — |
| 087 | Colecistite e colelitíase | Cirurgia Geral | — | Ausente no acervo de escopo | P1 | — |
| 088 | Pneumonia na criança | Pediatria | — | Ausente no acervo de escopo | P1 | 56 |
| 089 | Sofrimento fetal e avaliação da vitalidade fetal | Ginecologia e Obstetrícia | apostilas/avaliacao-vitalidade-fetal/index.html | Parcial provisória | P2 | — |
| 090 | Medidas de associação e impacto | Medicina Preventiva | — | Ausente no acervo de escopo | P1 | — |
| 091 | Insuficiência adrenal e síndrome de Cushing | Clínica Médica | — | Ausente no acervo de escopo | P1 | — |
| 092 | Coledocolitíase e colangite | Cirurgia Geral | — | Ausente no acervo de escopo | P1 | — |
| 093 | Asma na infância | Pediatria | — | Ausente no acervo de escopo | P1 | 46 |
| 094 | Rotura prematura de membranas | Ginecologia e Obstetrícia | apostilas/amniorrexe-prematura/index.html | Parcial provisória | P3 | — |
| 095 | Sensibilidade, especificidade e valores preditivos | Medicina Preventiva | — | Ausente no acervo de escopo | P1 | — |
| 096 | Distúrbios hidroeletrolíticos | Clínica Médica | — | Ausente no acervo de escopo | P1 | 17, 101 |
| 097 | Pancreatite aguda cirúrgica | Cirurgia Geral | — | Ausente no acervo de escopo | P1 | 141 |
| 098 | Crupe e epiglotite | Pediatria | — | Ausente no acervo de escopo | P1 | — |
| 099 | Trabalho de parto prematuro | Ginecologia e Obstetrícia | apostilas/trabalho-parto-prematuro/content.json | Parcial provisória | P3 | — |
| 100 | Testes diagnósticos e curvas ROC | Medicina Preventiva | — | Ausente no acervo de escopo | P1 | — |
| 101 | Distúrbios ácido-base | Clínica Médica | — | Ausente no acervo de escopo | P1 | 17, 96 |
| 102 | Obstrução intestinal | Cirurgia Geral | — | Ausente no acervo de escopo | P1 | — |
| 103 | Tuberculose na infância | Pediatria | — | Ausente no acervo de escopo | P1 | 61 |
| 104 | Hemorragia pós-parto | Ginecologia e Obstetrícia | — | Ausente no acervo de escopo | P1 | — |
| 105 | Desenhos de estudos epidemiológicos | Medicina Preventiva | — | Ausente no acervo de escopo | P1 | — |
| 106 | Lesão renal aguda | Clínica Médica | — | Ausente no acervo de escopo | P1 | — |
| 107 | Hérnias da parede abdominal | Cirurgia Geral | — | Ausente no acervo de escopo | P1 | — |
| 108 | Infecção urinária na criança | Pediatria | — | Ausente no acervo de escopo | P1 | 121 |
| 109 | Puerpério normal e patológico | Ginecologia e Obstetrícia | — | Ausente no acervo de escopo | P1 | — |
| 110 | Ensaios clínicos e revisões sistemáticas | Medicina Preventiva | — | Ausente no acervo de escopo | P1 | — |
| 111 | Doença renal crônica | Clínica Médica | — | Ausente no acervo de escopo | P1 | — |
| 112 | Diverticulite aguda | Cirurgia Geral | — | Ausente no acervo de escopo | P1 | — |
| 113 | Síndrome nefrótica e síndrome nefrítica | Pediatria | — | Ausente no acervo de escopo | P1 | 116 |
| 114 | Infecção puerperal | Ginecologia e Obstetrícia | — | Ausente no acervo de escopo | P1 | — |
| 115 | Vieses, confundimento e causalidade | Medicina Preventiva | — | Ausente no acervo de escopo | P1 | — |
| 116 | Síndromes glomerulares | Clínica Médica | — | Ausente no acervo de escopo | P1 | 113 |
| 117 | Isquemia mesentérica | Cirurgia Geral | — | Ausente no acervo de escopo | P1 | — |
| 118 | Anemias na infância | Pediatria | — | Ausente no acervo de escopo | P1 | — |
| 119 | Planejamento reprodutivo e contracepção | Ginecologia e Obstetrícia | apostilas/planejamento-reprodutivo-contracepcao/index.html | Parcial provisória | P2 | — |
| 120 | Medicina baseada em evidências | Medicina Preventiva | — | Ausente no acervo de escopo | P1 | — |
| 121 | Infecção do trato urinário e pielonefrite | Clínica Médica | — | Ausente no acervo de escopo | P1 | 108 |
| 122 | Perfuração de víscera oca | Cirurgia Geral | — | Ausente no acervo de escopo | P1 | — |
| 123 | Febre sem sinais localizatórios | Pediatria | — | Ausente no acervo de escopo | P1 | — |
| 124 | Sangramento uterino anormal | Ginecologia e Obstetrícia | apostilas/sangramento-uterino-anormal/index.html | Parcial provisória | P2 | 139, 174, 179, 211 |
| 125 | Rastreamento e prevenção quaternária | Medicina Preventiva | — | Ausente no acervo de escopo | P1 | — |
| 126 | Cirrose e suas complicações | Clínica Médica | — | Ausente no acervo de escopo | P1 | — |
| 127 | Hemorragia digestiva alta | Cirurgia Geral | — | Ausente no acervo de escopo | P1 | 132, 136 |
| 128 | Sepse e choque séptico pediátrico | Pediatria | — | Ausente no acervo de escopo | P1 | — |
| 129 | Amenorreia | Ginecologia e Obstetrícia | apostilas/amenorreia/index.html | Parcial provisória | P3 | — |
| 130 | Níveis de prevenção e história natural da doença | Medicina Preventiva | — | Ausente no acervo de escopo | P1 | — |
| 131 | Hepatites virais | Clínica Médica | — | Ausente no acervo de escopo | P1 | — |
| 132 | Hemorragia digestiva baixa | Cirurgia Geral | — | Ausente no acervo de escopo | P1 | 127, 136 |
| 133 | Meningites e encefalites | Pediatria | — | Ausente no acervo de escopo | P1 | — |
| 134 | Síndrome dos ovários policísticos | Ginecologia e Obstetrícia | apostilas/sindrome-ovariana-metabolica-poliendocrina-somp/index.html | Parcial provisória | P2 | — |
| 135 | Imunização e Programa Nacional de Imunizações | Medicina Preventiva | — | Ausente no acervo de escopo | P1 | 48 |
| 136 | Hemorragia digestiva | Clínica Médica | — | Ausente no acervo de escopo | P1 | 127, 132 |
| 137 | Doença do refluxo e hérnia hiatal | Cirurgia Geral | — | Ausente no acervo de escopo | P1 | — |
| 138 | Crises convulsivas e estado de mal epiléptico | Pediatria | — | Ausente no acervo de escopo | P1 | — |
| 139 | Endometriose | Ginecologia e Obstetrícia | — | Ausente no acervo de escopo | P1 | 124, 174, 179, 211 |
| 140 | Saúde da criança na APS | Medicina Preventiva | — | Ausente no acervo de escopo | P1 | — |
| 141 | Pancreatite aguda | Clínica Médica | — | Ausente no acervo de escopo | P1 | 97 |
| 142 | Úlcera péptica e complicações | Cirurgia Geral | — | Ausente no acervo de escopo | P1 | — |
| 143 | Cardiopatias congênitas | Pediatria | — | Ausente no acervo de escopo | P1 | — |
| 144 | Climatério e menopausa | Ginecologia e Obstetrícia | apostilas/climaterio-menopausa/content.json | Parcial provisória | P2 | — |
| 145 | Saúde da mulher na APS | Medicina Preventiva | — | Ausente no acervo de escopo | P1 | 149, 154 |
| 146 | Doença inflamatória intestinal | Clínica Médica | — | Ausente no acervo de escopo | P1 | — |
| 147 | Câncer gástrico | Cirurgia Geral | — | Ausente no acervo de escopo | P1 | — |
| 148 | Febre reumática | Pediatria | — | Ausente no acervo de escopo | P1 | — |
| 149 | Infecções sexualmente transmissíveis | Ginecologia e Obstetrícia | apostilas/infeccoes-sexualmente-transmissiveis/index.html | Parcial provisória | P3 | 145, 154 |
| 150 | Saúde do adulto e do idoso na APS | Medicina Preventiva | — | Ausente no acervo de escopo | P1 | 183, 223 |
| 151 | Anemias | Clínica Médica | — | Ausente no acervo de escopo | P1 | — |
| 152 | Câncer colorretal | Cirurgia Geral | — | Ausente no acervo de escopo | P1 | — |
| 153 | Diabetes mellitus tipo 1 e cetoacidose | Pediatria | — | Ausente no acervo de escopo | P1 | 76, 81 |
| 154 | Doença inflamatória pélvica | Ginecologia e Obstetrícia | apostilas/cervicites-doenca-inflamatoria-pelvica/index.html | Parcial provisória | P2 | 145, 149 |
| 155 | Saúde mental na Atenção Primária | Medicina Preventiva | — | Ausente no acervo de escopo | P1 | 212, 213, 214, 215, 216, 217, 218, 219 |
| 156 | Leucemias e linfomas | Clínica Médica | — | Ausente no acervo de escopo | P1 | — |
| 157 | Doenças anorretais | Cirurgia Geral | — | Ausente no acervo de escopo | P1 | — |
| 158 | Doenças exantemáticas | Pediatria | — | Ausente no acervo de escopo | P1 | — |
| 159 | Rastreamento e lesões precursoras do câncer do colo uterino | Ginecologia e Obstetrícia | apostilas/cancer-colo-utero-hpv/content.json | Parcial provisória | P2 | 164 |
| 160 | Abordagem do tabagismo, álcool e outras drogas | Medicina Preventiva | — | Ausente no acervo de escopo | P1 | 218 |
| 161 | Sepse e choque séptico | Clínica Médica | — | Ausente no acervo de escopo | P1 | — |
| 162 | Nódulos e câncer de tireoide | Cirurgia Geral | — | Ausente no acervo de escopo | P1 | — |
| 163 | Violência e maus-tratos contra crianças e adolescentes | Pediatria | — | Ausente no acervo de escopo | P1 | — |
| 164 | Câncer do colo do útero | Ginecologia e Obstetrícia | apostilas/cancer-colo-utero-hpv/content.json | Parcial provisória | P2 | 159 |
| 165 | Saúde do trabalhador | Medicina Preventiva | — | Ausente no acervo de escopo | P1 | 70, 225 |
| 166 | HIV e infecções oportunistas | Clínica Médica | — | Ausente no acervo de escopo | P1 | — |
| 167 | Doenças benignas e câncer de mama | Cirurgia Geral | apostilas/cancer-de-mama/index.html | Parcial provisória | P3 | 169 |
| 168 | Puberdade e adolescência | Pediatria | — | Ausente no acervo de escopo | P1 | 38, 207 |
| 169 | Patologias benignas e câncer de mama | Ginecologia e Obstetrícia | apostilas/cancer-de-mama/index.html | Parcial provisória | P3 | 167 |
| 170 | Ética médica, sigilo e prontuário | Medicina Preventiva | — | Ausente no acervo de escopo | P1 | — |
| 171 | Artrites inflamatórias e doenças autoimunes | Clínica Médica | — | Ausente no acervo de escopo | P1 | — |
| 172 | Princípios de oncologia cirúrgica | Cirurgia Geral | — | Ausente no acervo de escopo | P1 | — |
| 173 | Urgências pediátricas e suporte básico/avançado | Pediatria | — | Ausente no acervo de escopo | P1 | — |
| 174 | Massas anexiais e câncer de ovário | Ginecologia e Obstetrícia | — | Ausente no acervo de escopo | P1 | 124, 139, 179, 211 |
| 175 | Declaração de óbito e indicadores de mortalidade | Medicina Preventiva | — | Ausente no acervo de escopo | P1 | — |
| 176 | Acidente vascular cerebral e crises convulsivas | Clínica Médica | — | Ausente no acervo de escopo | P1 | — |
| 177 | Complicações pós-operatórias | Cirurgia Geral | — | Ausente no acervo de escopo | P1 | — |
| 178 | Intoxicações exógenas na infância | Pediatria | — | Ausente no acervo de escopo | P1 | — |
| 179 | Câncer de endométrio | Ginecologia e Obstetrícia | — | Ausente no acervo de escopo | P1 | 124, 139, 174, 211 |
| 180 | Cuidados paliativos e comunicação de más notícias | Medicina Preventiva | — | Ausente no acervo de escopo | P1 | — |
| 181 | Dislipidemias, obesidade do adulto e risco cardiometabólico | Clínica Médica | — | Ausente no acervo de escopo | P1 | — |
| 182 | Cefaleias primárias e sinais de alerta neurológico | Clínica Médica | — | Ausente no acervo de escopo | P1 | — |
| 183 | Declínio cognitivo, delirium e síndromes geriátricas | Clínica Médica | — | Ausente no acervo de escopo | P1 | 150, 223 |
| 184 | Doença de Parkinson e alterações do movimento | Clínica Médica | — | Ausente no acervo de escopo | P1 | — |
| 185 | Neuropatias periféricas e doenças neuromusculares | Clínica Médica | — | Ausente no acervo de escopo | P1 | — |
| 186 | Dengue e outras arboviroses de importância clínica | Clínica Médica | — | Ausente no acervo de escopo | P1 | — |
| 187 | Hanseníase e infecções cutâneas de interesse sanitário | Clínica Médica | — | Ausente no acervo de escopo | P1 | — |
| 188 | Malária, leishmanioses e parasitoses sistêmicas | Clínica Médica | — | Ausente no acervo de escopo | P1 | — |
| 189 | Leptospirose, doença de Chagas e zoonoses prioritárias | Clínica Médica | — | Ausente no acervo de escopo | P1 | — |
| 190 | Dermatites, psoríase e dermatoses imunomediadas | Clínica Médica | — | Ausente no acervo de escopo | P1 | — |
| 191 | Neoplasias da pele e avaliação de lesões pigmentadas | Clínica Médica | — | Ausente no acervo de escopo | P1 | — |
| 192 | Anafilaxia e reações de hipersensibilidade grave | Clínica Médica | — | Ausente no acervo de escopo | P1 | — |
| 193 | Intoxicações agudas e acidentes por animais peçonhentos | Clínica Médica | — | Ausente no acervo de escopo | P1 | — |
| 194 | Hemostasia, coagulopatias e medicina transfusional | Clínica Médica | — | Ausente no acervo de escopo | P1 | — |
| 195 | Doenças prostáticas e avaliação clínica urológica | Cirurgia e especialidades | — | Ausente no acervo de escopo | P1 | 67, 196, 197 |
| 196 | Litíase urinária, obstruções e emergências urológicas | Cirurgia e especialidades | — | Ausente no acervo de escopo | P1 | 67, 195, 197 |
| 197 | Neoplasias do aparelho geniturinário | Cirurgia e especialidades | — | Ausente no acervo de escopo | P1 | 67, 195, 196 |
| 198 | Fraturas, luxações e avaliação inicial do trauma ortopédico | Cirurgia e especialidades | — | Ausente no acervo de escopo | P1 | — |
| 199 | Infecções osteoarticulares e emergências musculoesqueléticas | Cirurgia e especialidades | — | Ausente no acervo de escopo | P1 | — |
| 200 | Olho vermelho, perda visual e urgências oftalmológicas | Cirurgia e especialidades | — | Ausente no acervo de escopo | P1 | — |
| 201 | Doenças otorrinolaringológicas e urgências de vias aéreas superiores | Cirurgia e especialidades | — | Ausente no acervo de escopo | P1 | — |
| 202 | Doença arterial periférica e fundamentos de cirurgia vascular | Cirurgia e especialidades | — | Ausente no acervo de escopo | P1 | — |
| 203 | Triagens neonatais e rastreamento de doenças congênitas | Pediatria | — | Ausente no acervo de escopo | P1 | — |
| 204 | Distúrbios respiratórios e metabólicos neonatais | Pediatria | — | Ausente no acervo de escopo | P1 | — |
| 205 | Alergias alimentares, imunodeficiências e hipersensibilidade na infância | Pediatria | — | Ausente no acervo de escopo | P1 | — |
| 206 | Neoplasias pediátricas e reconhecimento de sinais de alerta | Pediatria | — | Ausente no acervo de escopo | P1 | — |
| 207 | Transtornos do neurodesenvolvimento e dificuldades de aprendizagem | Pediatria | — | Ausente no acervo de escopo | P1 | 38, 168 |
| 208 | Fibrose cística e doenças respiratórias crônicas na infância | Pediatria | — | Ausente no acervo de escopo | P1 | — |
| 209 | Gestação múltipla e suas complicações materno-fetais | Ginecologia e Obstetrícia | — | Ausente no acervo de escopo | P1 | — |
| 210 | Disfunções do assoalho pélvico, prolapsos e incontinência urinária | Ginecologia e Obstetrícia | — | Ausente no acervo de escopo | P1 | — |
| 211 | Miomatose uterina e alterações benignas do endométrio | Ginecologia e Obstetrícia | apostilas/sangramento-uterino-anormal/index.html | Parcial provisória | P2 | 124, 139, 174, 179 |
| 212 | Psicopatologia, entrevista psiquiátrica e exame do estado mental | Saúde Mental | — | Ausente no acervo de escopo | P1 | 155, 213, 214, 215, 216, 217, 218, 219 |
| 213 | Transtornos depressivos, automutilação e prevenção do suicídio | Saúde Mental | — | Ausente no acervo de escopo | P1 | 155, 212, 214, 215, 216, 217, 218, 219 |
| 214 | Transtornos ansiosos, obsessivo-compulsivos e relacionados ao trauma | Saúde Mental | — | Ausente no acervo de escopo | P1 | 155, 212, 213, 215, 216, 217, 218, 219 |
| 215 | Transtorno bipolar e tratamento estabilizador do humor | Saúde Mental | — | Ausente no acervo de escopo | P1 | 155, 212, 213, 214, 216, 217, 218, 219 |
| 216 | Esquizofrenia, transtornos psicóticos e uso de antipsicóticos | Saúde Mental | — | Ausente no acervo de escopo | P1 | 155, 212, 213, 214, 215, 217, 218, 219 |
| 217 | Crises psiquiátricas, agitação e avaliação de risco imediato | Saúde Mental | — | Ausente no acervo de escopo | P1 | 155, 212, 213, 214, 215, 216, 218, 219 |
| 218 | Transtornos por uso de substâncias, intoxicação e abstinência | Saúde Mental | — | Ausente no acervo de escopo | P1 | 155, 160, 212, 213, 214, 215, 216, 217, 219 |
| 219 | Transtornos alimentares e padrões disfuncionais de personalidade | Saúde Mental | — | Ausente no acervo de escopo | P1 | 155, 212, 213, 214, 215, 216, 217, 218 |
| 220 | Método clínico centrado na pessoa e consulta longitudinal | Medicina de Família e Comunidade | — | Ausente no acervo de escopo | P1 | — |
| 221 | Registro clínico orientado por problemas, método SOAP e coordenação do cuidado | Medicina de Família e Comunidade | — | Ausente no acervo de escopo | P1 | — |
| 222 | Abordagem familiar, genograma, ecomapa e diagnóstico territorial | Medicina de Família e Comunidade | — | Ausente no acervo de escopo | P1 | — |
| 223 | Cuidado domiciliar, multimorbidade e desprescrição | Medicina de Família e Comunidade | — | Ausente no acervo de escopo | P1 | 150, 183 |
| 224 | Segurança do paciente, gestão de riscos e qualidade assistencial | Saúde Coletiva e competências transversais | — | Ausente no acervo de escopo | P1 | — |
| 225 | Saúde ambiental, mudanças climáticas e resposta a emergências coletivas | Saúde Coletiva e competências transversais | — | Ausente no acervo de escopo | P1 | 70, 165 |
