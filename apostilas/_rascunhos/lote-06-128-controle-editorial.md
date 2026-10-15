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
