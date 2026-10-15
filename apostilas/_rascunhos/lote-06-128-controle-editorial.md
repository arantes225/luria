# Lote 06 — 128: Sepse e Choque Séptico Pediátrico
**Data editorial:** 15/10/2026 · **Status:** rascunho; nenhum merge ou deploy.

## Etapa zero — existência e relação curricular
- Inventariados \`apostilas/\` e \`apostilas/_rascunhos/\` na branch \`editorial/lote-06-auditoria-20261014\`; não encontrado livro específico de sepse/choque séptico pediátrico com número 128 antes da criação deste controle.
- **Tema 123 — Febre sem sinais localizatórios** cobre estratificação inicial e lactente febril sem choque. 128 centra-se em reconhecimento de disfunção orgânica ameaçadora, ressuscitação, antibióticos, vasopressores, suporte intensivo e recuperação.
- **Tema 133 — Meningites e encefalites** aborda particularidades do foco neurológico; 128 deve ensinar o suficiente para abordagem crítica sem duplicar todo o tema infeccioso.
- **Tema 127 — Hemorragia Digestiva Alta** e temas cirúrgicos usam choque por outros mecanismos; este capítulo distingue choque pediátrico distributivo/cardiogênico/hipovolêmico e mistos.

## Benchmark: material Google Drive efetivamente aberto e examinado
1. \`02 - CHOQUE - TIPOS DE CHOQUE.pdf\` (~12,2 mil caracteres textuais extraídos), contém classificação de choque, perfusão e tratamento de sepse **adulta** (SOFA ≥2, PAM 65, bolo 30 mL/kg, norepinefrina). **Não transplantar esses limiares para crianças**, pois a faixa etária e a diretriz pediátrica 2026 diferem.
2. \`01 - CHOQUE - ABORDAGEM INICIAL.pdf\` (~8,0 mil caracteres), contém fisiologia de oferta de oxigênio, janela de perfusão, causas do choque, fluidorresponsividade e POCUS. Bom benchmark de raciocínio, mas deriva de conceitos adultos e precisa ser adaptado à pediatria.
3. \`01 - RESUMO - PEDIATRIA - INTENSIVA - SEDOANALGESIA E SRI.pdf\` (~15,0 mil caracteres), inclui analgesia/sedação e intubação. **Não é capítulo de sepse pediátrica**; serve como lista de riscos da intubação, mantendo a farmacologia sob revisão especializada.
- Autoria institucional **Estratégia MED não comprovada**. Alguns resumos possuem aviso “Medicina livre, venda proibida”; nenhum conteúdo, figura ou tabela foi copiado. **Não foi localizado no Drive benchmark completo, nominal e autoral de sepse/choque pediátrico**. Registrar limitação e proibir certificação como completa antes de comparação adequada.

## Fontes científicas primárias atuais
1. **Surviving Sepsis Campaign Pediatric 2026 (SCCM/ESICM)**: Weiss et al. *Intensive Care Medicine*, publicado em 23/03/2026, DOI 10.1007/s00134-026-08360-2. https://sccm.org/clinical-resources/guidelines/guidelines/surviving-sepsis-campaign-international-guidelines-for-the-management-of-sepsis-and-septic-shock-in . Substitui no ensino o uso automático da SSC pediátrica 2020 como “mais recente”.
2. **Phoenix Sepsis Criteria 2024**: Schlapbach et al., *JAMA* 331:665–674, DOI 10.1001/jama.2024.0179. https://pmc.ncbi.nlm.nih.gov/articles/PMC10900966/ . Infecção suspeita + **Phoenix ≥2** para definição de sepse pediátrica; choque séptico: sepse + ≥1 ponto cardiovascular. **Não usar Phoenix como barreira para iniciar tratamento em criança deteriorando**: critério de classificação/identificação de disfunção orgânica não substitui julgamento precoce.
3. **Phoenix desenvolvimento/validação:** https://doi.org/10.1001/jama.2024.0196 .
4. **SCCM SSC 2026**: antibiótico idealmente **≤1 h em choque**, **≤3 h** em sepse provável sem choque após rápida avaliação; hemoculturas somente sem atraso relevante; lactato como parte da avaliação.
5. **Fluidos SSC 2026:** em sistema com UTI, até 40–60 mL/kg na primeira hora (bolos 10–20, **reavaliar a cada bolo e parar se congestão ou choque revertido**); sem UTI e sem hipotensão, **não administrar bolos**, manter fluidos de manutenção; sem UTI mas hipotensão, até 40 mL/kg com reavaliação. Não é objetivo rígido de 60 mL/kg.
6. **Vasoativos SSC 2026:** não há evidência suficiente para eleger obrigatoriamente epinefrina ou norepinefrina como primeira linha em todas as crianças; iniciar por via periférica monitorada se o acesso central atrasar terapia.
7. **Corticoide SSC 2026:** contra hidrocortisona de rotina quando estabilidade restaurada; evidência insuficiente quando refratário, exceto tratar insuficiência adrenal suspeita/documentada com dose de estresse.
8. **Acesso SUS:** conferir protocolos locais de sepse pediátrica/UTIP, CCIH, antimicrobianos e equipamentos; não presumir antibiótico ou UTI disponíveis em toda unidade.

## Matriz de lacunas: resumos adultos → obra pediátrica específica
| Tópico | Materiais do Drive | Apostila 128 deve ensinar |
| --- | --- | --- |
| Definição | SOFA adulto, Sepsis-3 | Phoenix 2024, faixa etária, limites do escore |
| Choque | PAM ≥65 adulto | perfusão e PA por idade, hipotensão tardia |
| Reanimação | 30 mL/kg adulto | cenário com UTI vs sem UTI; 10–20 por vez |
| Antibiótico | 1h genérico | ≤1h em choque e ≤3h sem choque, seleção por idade/foco |
| Vasoativos | noradrenalina adulta como regra | adrenalina versus noradrenalina, acesso periférico |
| Monitorização | lactato e PVC | perfusão clínica, trends, diurese, POCUS treinado |
| Pediatria neonatal | Ausente | reconhecer recorte neonatal específico |
| Respiratório | sedação geral | risco de intubação no choque e ventilação cautelosa |
| Endócrino | hidrocortisona em choque adulto | contraindicação a rotina; exceção adrenal |
| Educação | resumo de conceitos | 8 casos, 12 MCQs, tabelas e algoritmos originais |

## Gates de aprovação
- [ ] 60k+ caracteres **didáticos úteis únicos**, sem contar exercícios/referências.
- [ ] 8 casos e 12 questões com justificativas independentes.
- [ ] Revisão especialista de fluidos, antimicrobianos, ventilação, vasoativos e grupos especiais.
- [ ] Confirmar correspondência de critérios Phoenix completos e nomenclatura 2026.
- [ ] Curadoria de imagens clínicas e fluxogramas autorais com licenças/ Admin.
- [ ] JSON, HTML preliminar e validadores oficiais realmente executados.
- [ ] Benchmark de especialidade com autoria/verificação; avaliação de acessibilidade PWA.
- [ ] Nenhum merge/deploy automático.

---

## Etapa de produção e QA estrutural — 15/10/2026

**Arquivos gerados e mantidos exclusivamente na branch editorial:**
- \`apostilas/_rascunhos/lote-06-128-sepse-choque-septico-pediatrico.md\` — **90.623 caracteres brutos**, 35 capítulos numerados; capítulos 1–31 são o corpo instrucional, 32 contém 8 casos, 33 contém 12 questões, 34 contém bibliografia e 35 marca gates editoriais.
- \`apostilas/_rascunhos/lote-06-128-build-input-preliminar.json\` — 34 seções (introdução + capítulos 1–33), 8 referências rastreáveis e zero imagens inseridas.
- \`apostilas/_rascunhos/lote-06-128-preview.html\` — 35 seções de conteúdo incluindo referências, 8 casos, 12 questões e 12 conjuntos de quatro alternativas, sem novas imagens. Meta \`noindex,nofollow\`; padrão baseado no template visual LURIA.

**Contagem didática:** cerca de **63.242 caracteres** no corpo dos capítulos 1–31, após remoção simples de URLs e sinais Markdown; casos, questões, referências e controle não entram. A contagem **não prova** que os 63 mil caracteres sejam todos semanticamente únicos e úteis. A triagem textual não encontrou parágrafos longos literalmente duplicados, mas repetição conceitual ainda exige leitura editorial.

**QA estrutural conferido com leitura de arquivos do próprio GitHub:**
- Capítulos sequenciais: 35/35.
- Oito casos e doze questões A–D, com explicações das alternativas.
- JSON: 34 seções e 8 referências.
- HTML: 35 seções, 8 casos, 12 questões, 12 listas de alternativas; **zero âncoras internas ausentes e zero IDs duplicados**.
- Cálculos aritméticos didáticos conferidos: 15 kg × 10 mL/kg = 150 mL; 15 kg × 20 mL/kg = 300 mL; 18 kg × 20 mL/kg = 360 mL; 16 kg × 10 mL/kg = 160 mL; 12 kg × 20 mL/kg = 240 mL.
- A primeira matriz identificou lacuna de exemplo próprio para a Questão 4 (criança de 15 kg). O **capítulo 30 foi ampliado** com 150 e 300 mL, e a mesma correção foi propagada ao Markdown, ao JSON e ao HTML.

### Matriz preliminar de cobertura por questões

Esta é uma **triagem lexical do conteúdo didático** nos capítulos de apoio, sem ler os próprios gabaritos. Não substitui revisão da veracidade científica ou suficiência de justificativas.

| Questão | Conceito | Capítulos de apoio | Resultado |
| --- | --- | --- | --- |
| 1 | Phoenix e choque | 3 | Termos presentes |
| 2 | Choque antes de hipotensão | 1–2 | Termos presentes |
| 3 | Antibioticoterapia no choque | 7, 10 | Termos presentes |
| 4 | Cálculo de bolo por peso de 15 kg | 8, 30 | Exemplo acrescentado e presente |
| 5 | Fluido sem UTI e sem hipotensão | 8, 24 | Termos presentes |
| 6 | Congestão por bolos | 8, 20 | Termos presentes |
| 7 | Vasoativos sem preferência universal | 9 | Termos presentes |
| 8 | Meningococcemia e punção lombar | 28 | Termos presentes |
| 9 | Corticoide e insuficiência adrenal | 16 | Termos presentes |
| 10 | Controle de fonte em empiema | 11, 28 | Termos presentes |
| 11 | Sepse neonatal e hipotermia | 18 | Termos presentes |
| 12 | Dengue, choque e hematócrito | 19 | Termos presentes |

**Resultado: 12/12 na triagem lexical**, com todos os conceitos sinalizados em seus capítulos. Não extrapolar o resultado como prova de que toda alternativa estaria suficientemente explicada ou de que uma conduta é clinicamente segura.

### Portas de qualidade ainda NÃO cumpridas

1. **Revisão clínica independente por pediatra intensivista** de fluidos, limites de recursos, drogas vasoativas, suporte respiratório/oxigênio, neonatos, dengue e cenários especiais; não usar regimes de emergência como receita individual.
2. Verificar **todas as linhas das tabelas Phoenix** na fonte primária e coerência com SSC 2026, inclusive diferenças entre recomendações fortes/condicionais/sem evidência suficiente.
3. Revisão de originalidade semântica, utilidade real e linguagem para aluno sem conhecimento prévio.
4. Benchmark longo do mesmo tema em fonte institucional de autoria comprovada, não encontrado no Drive; os materiais lidos antes da redação são **comparáveis apenas de modo parcial**.
5. Curadoria visual com autoria/licença e adequação clínica confirmadas, compressão e aprovação **somente pela fila do Admin**. Ainda **zero imagens novas publicadas**.
6. Execução real de \`scripts/build-apostilas-batch.cjs --dry-run\`, \`scripts/audit-apostilas-60k.mjs\`, \`scripts/audit-apostilas-batch.cjs\` e \`scripts/check-syntax.cjs\` num checkout apropriado; **não foram executados**, e a checagem estrutural em JavaScript não os substitui.
7. Inspeção visual desktop/PWA, impressão, acessibilidade e desempenho, seguida de aprovação editorial formal antes de merge/deploy.

**Parecer:** a apostila 128 está redigida e convertida para prévia, mas permanece **RASCUNHO NÃO CERTIFICADO / NÃO PUBLICAR**.
