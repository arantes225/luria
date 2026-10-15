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
