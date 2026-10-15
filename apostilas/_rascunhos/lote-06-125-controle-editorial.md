# Lote 06 · Tema 125 — Rastreamento e Prevenção Quaternária
**Controle editorial inicial:** 14/10/2026 · **Status:** rascunho de planejamento, sem publicação.

## Auditoria de existência e prevenção de duplicação
- Inventariados os diretórios \`apostilas/\` e \`apostilas/_rascunhos/\` na branch editorial; não havia apostila específica publicada ou rascunho nominal de **Rastreamento e Prevenção Quaternária**.
- **Tema 120 — Medicina Baseada em Evidências** já aborda desempenho de exames (sensibilidade/especificidade/valores preditivos), inferência causal e vieses em geral. A 125 **não deve recontar toda bioestatística**: aprofunda o percurso de rastreamento, decisão clínica individual versus política populacional, risco/benefício, sobrediagnóstico, organização do SUS e prevenção quaternária.
- O tema 130 — Níveis de Prevenção e História Natural da Doença — deverá apresentar modelo de Leavell & Clark e níveis de prevenção em sentido geral. A 125 limitará a explicação desses níveis ao necessário para definir prevenção quaternária.

## Benchmark realizado antes da escrita
- Buscas em Drive por \`rastreamento\`, \`prevenção quaternária\`, \`screening\`, \`sobrediagnóstico\` e temas relacionados não localizaram uma apostila longa exatamente deste recorte com autoria institucional confirmada.
- Documentos **abertos e lidos**: \`03 - COLO DE UTERO .pdf\` (aprox. 9,5 mil caracteres extraídos) e \`MASTOLOGIA.pdf\` (aprox. 2,7 mil caracteres). São resumos temáticos de oncologia, não benchmark integral de Preventiva. Ambos mencionam parâmetros de rastreamento anteriores às atualizações do SUS. Foram usados exclusivamente para mapear termos e **detectar desatualizações**; não foram copiados seus textos nem reproduzidos links/IDs privados no repositório.
- Não declarar que um roteiro antigo de colpocitologia isoladamente equivale ao programa brasileiro de DNA-HPV implantado em 2025–2026, nem que rastreio mamográfico populacional oficial é anual a partir de 40 anos no SUS.

## Referências oficiais externas verificadas
1. **Brasil, Ministério da Saúde, Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero (2025)** — Parte I, teste molecular DNA-HPV oncogênico primário, implementação organizada: https://www.gov.br/saude/pt-br/assuntos/pcdt/r/rastreamento-cancer-do-colo-do-utero/view .
2. **Ministério da Saúde (2026), FAQ de rastreamento** — teste DNA-HPV para mulheres 25–64 anos; intervalo de 5 anos após resultado negativo segundo critérios do protocolo: https://www.gov.br/saude/pt-br/composicao/saes/atencao-ao-cancer/faq/faq/como-funciona-o-rastreamento-do .
3. **Ministério da Saúde/INCA, Nota Técnica nº 626/2025** — programa populacional de mamografia 50–74 anos, bienal; acesso sob demanda para 40–49 e acima de 74 anos com decisão informada: https://www.gov.br/inca/pt-br/assuntos/noticias/2025/ministerio-da-saude-padroniza-informacoes-para-acesso-ao-exame-de-mamografia-no-sus .
4. **INCA (10/08/2026)** — incorporação na tabela SUS de teste imunoquímico fecal (FIT) para rastreamento de pessoas assintomáticas de 50–75 anos, bienal; publicação não implica oferta imediata em toda UBS: https://www.gov.br/inca/pt-br/assuntos/noticias/2026/sus-inclui-teste-de-alta-tecnologia-para-rastreamento-de-cancer-colorretal .
5. **UK National Screening Committee (atualização 2025), princípios**: https://www.gov.uk/guidance/principles-of-population-screening/principles-of-screening . Benefício demonstrado do percurso completo (teste, confirmação e tratamento), dano e custo.
6. **UK National Screening Committee (2025), decisão informada:** https://www.gov.uk/guidance/principles-of-population-screening/informed-choice .
7. **OMS Europa (2024), avaliação dos programas de rastreamento de DCV:** https://www.who.int/europe/publications/i/item/978-92-890-6088-2 . Não extrapolar automaticamente resultados europeus para toda política de APS brasileira.

## Matriz de conteúdo distinto da apostila 120
| Tema | MBE 120 | Rastreamento 125 |
| --- | --- | --- |
| Sensibilidade, VPP, Bayes | Fórmulas e cálculos aprofundados | Aplicação em baixa prevalência e consequências populacionais |
| Lead-time/length-time | Introdução com exemplos | Diferenciar sobrediagnóstico, falsos positivos, vieses e carga assistencial com decisões |
| Estudo de efetividade | Avaliação crítica geral | Evidência da estratégia populacional completa e indicadores de programa |
| Programas SUS | Visão de ATS | DNA-HPV 2025, mamografia 2025, FIT 2026 e encaminhamento |
| Prevenção quaternária | Definição contextual | Indicações, desprescrição, incidentalomas, cascatas diagnósticas e comunicação clínica |
| Ética | Pesquisa | Autonomia/consentimento, redução de desigualdade no rastreio organizado |
| Questões e casos | Geral de MBE | Aplicação em população assintomática e APS |

## Estrutura editorial desejada
Conceitos → princípios de programa → pré-teste e riscos → sobre/subdiagnóstico → métricas de qualidade e rastreio organizado → programas brasileiros atuais → outros rastreios e contraindicações → prevenção quaternária e cascatas → comunicação com pacientes → fluxos → 8 casos e 12 questões → referências e auditoria.

## Bloqueios de conclusão
- [ ] Redigir conteúdo autoral sem duplicar a 120; meta ≥60 mil caracteres úteis.
- [ ] 8 casos e 12 questões comentadas, com cobertura auditada.
- [ ] Checagem Brasil 2026 e diferenças entre recomendações de sociedades e Ministério; não prometer oferta universal.
- [ ] Curadoria de até 10 figuras didáticas e aprovação Admin.
- [ ] JSON, HTML e execução dos validadores oficiais, com inspeção desktop/PWA.
- [ ] Revisão médica independente antes de qualquer merge/deploy.

---

## Etapa 2 — conteúdo integral, casos, questões e prévia técnica (14/10/2026)

**Produção realizada na branch editorial, sem sobrescrever material público:**
- `apostilas/_rascunhos/lote-06-125-rastreamento-prevencao-quaternaria.md`: **88.001 caracteres brutos**, 30 capítulos numerados; capítulos 1–26 integram o corpo didático, 27 reúne 8 casos, 28 reúne 12 questões, 29 fontes e 30 controle editorial.
- `apostilas/_rascunhos/lote-06-125-build-input-preliminar.json`: 29 seções (introdução, corpo, casos e questões), 9 referências e zero imagens clínicas.
- `apostilas/_rascunhos/lote-06-125-preview.html`: **107.589 caracteres HTML**, 30 seções incluindo bibliografia, `noindex,nofollow`, 8 casos, 12 questões e 12 conjuntos de alternativas.
- Prévia **não publicada**, sem merge/deploy. Instruções atuais Brasil 2025–2026 citadas no próprio texto.

**Robustez didática:** aproximadamente **62.798 caracteres instrucionais** na filtragem simples de títulos/corpo dos capítulos 1–26, excluindo casos, questões, fontes e seção de controle, URLs e sintaxe Markdown. Isso não comprova sozinho unicidade semântica nem revisão clínica independente. A conferência preliminar não identificou parágrafos instrucionais longos literalmente duplicados.

**Checagem estrutural:** IDs HTML repetidos: 0; links de âncora inexistentes: 0; questões: 12; casos: 8; listas com alternativas A–D: 12. A checagem é textual e não substitui execução do build nem visualização em PWA.

### Matriz lexical de autossuficiência das questões
Consulta aos **títulos e corpo didático dos capítulos**, sem usar o gabarito do bloco de questões:
| Questão | Conceito | Capítulo(s) | Termos verificados | Situação |
| --- | --- | --- | --- | --- |
| 1 | Rastrear versus diagnosticar | 1, 2 | sintomas; diagnostico | Cobertura preliminar |
| 2 | DNA-HPV SUS | 6 | dna-hpv; 25 a 64 | Cobertura preliminar |
| 3 | Mamografia no SUS | 7 | 50; 74; 40 | Cobertura preliminar |
| 4 | FIT positivo | 8 | fit; colonoscopia | Cobertura preliminar |
| 5 | Lead-time | 3, 21 | lead-time; morte | Cobertura preliminar |
| 6 | Sobrediagnóstico | 3 | sobrediagnostico; falso positivo | Cobertura preliminar |
| 7 | VPP baixo | 4 | sensibilidade; 495 | Cobertura preliminar |
| 8 | Risco hereditário | 11 | lynch; colonoscopias | Cobertura preliminar |
| 9 | Prevenção quaternária | 13, 14 | prevencao quaternaria; dano | Cobertura preliminar |
| 10 | Qualidade do programa | 12, 18 | confirmacao; seguimento | Cobertura preliminar |
| 11 | Incidentalomas | 14, 16 | incidental; tireoide | Cobertura preliminar |
| 12 | Sintoma após teste negativo | 1, 22 | nodulo; diagnostico | Cobertura preliminar |

**Resultado 12/12 em triagem lexical**, não certificação do mérito médico ou da explicação de cada alternativa. A primeira passagem considerava apenas o corpo da seção e deixou de identificar “incidentalomas” por corresponder ao **título** do capítulo 16 e a formas derivadas no texto; a busca foi corrigida para abranger título e expressão conceitual, sem editar a informação médica para satisfazer termo.

**Verificações aritméticas:** com sensibilidade 90%, especificidade 95%, prevalência 1% em 10.000 indivíduos, 90 verdadeiros positivos, 495 falsos positivos e VPP = 90/585 = **15,38%**. O exercício de 50 vs 40 mortes em 10.000 implica redução absoluta = **0,1 ponto percentual** e relativa = 20%. Números são deliberadamente fictícios e **não** representam efeito real de programas do SUS.

### Critérios ainda não cumpridos
- [ ] Auditoria por médico de Preventiva/APS e revisão detalhada de cada norma ministerial 2026, incluindo grupos de alto risco, políticas de transição e oferta territorial.
- [ ] Deduplicação semântica, controle de utilidade e correção editorial da obra inteira.
- [ ] Curadoria de até 10 imagens/diagramas autorais ou licenciados e aprovação via Admin, sem uso automático de imagens externas.
- [ ] Executar **realmente** o script oficial de geração e auditores do repositório (não foram executados aqui).
- [ ] Testes visuais desktop/PWA, responsividade, navegação, acessibilidade e desempenho.
- [ ] Aprovação formal antes de publicação/merge/deploy.

**Parecer: apostila 125 integralmente redigida e com prévia técnica; rascunho ainda não certificado ou publicado.**
