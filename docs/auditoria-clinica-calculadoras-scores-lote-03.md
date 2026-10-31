# TRAUBE — auditoria clínica, lote 3/6 (ferramentas 61–90)

**Data:** 24/10/2026  
**Abrangência:** 11 calculadoras finais (61–71) + 19 escores iniciais (01–19).  
**Repositório:** `arantes225/luria`, branch `main`  
**Validação realizada:** fórmulas e limites, unidades, entradas plausíveis, restrição de população, referências primárias/diretrizes, proteção contra interpretação inadequada e testes unitários reproduzíveis.

## Resultado geral

- 30 ferramentas examinadas individualmente.
- 11/11 exemplos matemáticos de calculadoras passaram.
- 19/19 escores com pontuação/fluxo ou integridade documental reavaliados.
- 43/43 verificações automatizadas em JavaScript isolado passaram no lote 3.
- 158/158 verificações totais dos lotes 1, 2 e 3 passaram quando reexecutadas isoladamente.
- **Sem confirmação** de CI remoto, testes E2E no navegador/PWA, auditoria clínica independente, certificação regulatória ou publicação no site.
- A checagem de escores avançados com lógica customizada (NEWS2, SOFA, MELD-Na, GBS) inclui documentação das limitações e verificações estáticas do código; **não representa validação de casos clínicos completos ou confrontação prospectiva de todos os limiares**.

## Calculadoras 61–71 — revisão individual

| # | Ferramenta | Resultado/alteração |
|---:|---|---|
| 61 | Ganho ponderal gestacional | Validação de idade gestacional e pesos; ganho negativo **aceito**. Mantido aviso para interpretar ganho conforme IMC pré-gestacional, semanas e multiplicidade. |
| 62 | Regra dos nove (adulto) | **Correção de fórmula:** campos extra não interferem no somatório da SCQ; somente segmentos completos entram na regra. Restringida a adultos, queimaduras de espessura parcial/profunda; exigir Lund–Browder para áreas parciais e pediatria. |
| 63 | Reposição inicial em queimaduras | Confirmada recomendação ABA de **2 mL/kg/%SCQ no primeiro período de 24 h**, apenas adultos ≥20% SCQ; explícito que é estimativa inicial, não prescrição ou velocidade fixa. |
| 64 | Mifflin–St Jeor | Equação sexo-específica e unidades conferidas; acrescentada restrição adulta e aviso para estados de doença e gestação. |
| 65 | Gasto energético total | Multiplicação por fator de atividade conferida; entradas limitadas ao modelo aproximado, não extrapolar para UTI. |
| 66 | Meta proteica | Conversão g/kg/dia × kg conferida; requer definição prévia da meta pelo profissional, não recomenda valores automaticamente. |
| 67 | Cálcio total mg/dL → mmol/L | Fator 4,008 conferido; reforçada distinção do cálcio ionizado. |
| 68 | Plaquetas ×10³/µL → /µL | Conversão por 1000 conferida. **Zero agora aceito** no cálculo, com ressalva sobre criticidade clínica. |
| 69 | FIB-4 | Mantida fórmula AST×idade/(plaquetas×√ALT). **Mudança clínica:** limita triagem à faixa etária apropriada (≥35) e interpreta valores em ≥65 anos com corte de 2,0; não usar na doença aguda. |
| 70 | MELD 3.0 | Confirmada equação OPTN/HRSA, com limites de parâmetros, critério de diálise explícito e idade adulta. Resultado marcado como estimativa: confirmação **obrigatória no calculador oficial** para transplante. |
| 71 | Critérios de Light | **Correção de apresentação:** informa quantos dos três critérios são positivos em vez de resultado binário 0/1; qualquer critério positivo favorece exsudato. Mantida ressalva sobre pseudoexsudatos e coleta pareada. |

## Escores 01–19 — revisão individual

| # | Escore | Resultado/alteração |
|---:|---|---|
| 01 | Glasgow (GCS) | Conferidos três componentes e limites 3–15; adicionada advertência para não atribuir 0/mínimo a componentes não testáveis por sedação/intubação. |
| 02 | NEWS2 | **Segurança reforçada:** opção da Escala SpO₂ 2 só produz resultado com confirmação explícita de hipercapnia e alvo de 88–92%. Fontes RCP mantidas. |
| 03 | qSOFA | Faixa 0–3 e três critérios conferidos; não deve ser usado como único teste para descartar sepse. |
| 04 | SOFA | **Correção de opções clínicas:** dopamina 5–15 versus >15, epinefrina/norepinefrina 0,1, duração ≥1 h e creatinina ≥5; alerta sobre suporte, linha de base e limitações clínicas. |
| 05 | HEART | Faixa 0–10 revisada; ECG de 2 pontos especifica depressão significativa de ST; suspeita de IAM com supra exige protocolo próprio sem atraso pelo HEART. |
| 06 | CHA₂DS₂-VASc | Faixa 0–9; risco em FA. Lembrete: sexo feminino isolado não determina anticoagulação; ver também diretrizes que usam CHA₂DS₂-VA. |
| 07 | HAS-BLED | Faixa 0–9; critérios de PAS >160, doença renal/hepática, TTR/INR lábil em varfarina, álcool ≥8 unidades/semana, antiagregantes/AINEs mais explícitos. Risco de sangramento **não justifica negar anticoagulação isoladamente**. |
| 08 | Wells (TEP) | Faixa 0–12,5, ponto de corte >4 no modelo de 2 níveis. Imobilização ≥3 dias/cirurgia nas 4 semanas definida. Não dispensa algoritmo por probabilidade e estabilidade. |
| 09 | PERC | **Correção crítica:** inclui confirmação da baixa probabilidade clínica pré-teste (<15%). Sem ela, resultado fica **não aplicável**, mesmo com oito critérios negativos. |
| 10 | Wells (TVP) | Escore −2 a 9; prazo de cirurgia maior até 12 semanas explicitado. Usar D-dímero e US conforme algoritmo adequado. |
| 11 | sPESI | Critérios 0–6 revisados; apenas prognóstico **após TEP confirmado**, não diagnóstico ou alta automática. |
| 12 | CURB-65 | Faixa 0–5; unidade aclarada (ureia >7 mmol/L equivale a ~42 mg/dL de ureia ou ~19,6 mg/dL de BUN). |
| 13 | NIHSS | Faixa 0–42 conferida; não pontuar como normal componente impossível de testar. Treinamento do examinador ainda necessário. |
| 14 | ABCD² | Faixa 0–7 conferida, com alerta de que nota baixa não permite adiar investigação urgente de AIT. |
| 15 | Child-Pugh | Faixa 5–15 e categorias A/B/C conferidas; INR pode estar alterado por anticoagulação e ascite/encefalopatia dependem da avaliação. |
| 16 | MELD-Na (histórico) | **Correção matemática:** ajuste por sódio só aplicado no código se MELD basal >11; aviso claro de que 2016 é **modelo histórico**, não o modelo oficial atual de alocação adulta do OPTN. |
| 17 | Glasgow-Blatchford | Campos e limiares de BUN (mg/dL), hemoglobina sexo-específica e sinais clínicos revisados; o escore não determina alta sem julgamento médico. |
| 18 | BISAP | Faixa 0–5; explicitado **SIRS ≥2 critérios** nas primeiras 24 h da pancreatite. |
| 19 | Alvarado | Faixa 0–10; temperatura ≥37,3 °C, leucócitos >10 mil/µL e neutrófilos >75% ou desvio à esquerda; não define cirurgia sem avaliação. |

## Arquivos alterados

- `assets/js/clinical-calculators-audit-batch3.js` — mudanças/validação das últimas 11 calculadoras.
- `trabalho/calculadora/index.html` — import do módulo de auditoria.
- `assets/js/work-scores.js` — aplicação de correções nos 19 escores e avisos contextuais.
- `trabalho/scores/index.html` — versão de JS atualizada para invalidação do cache.
- `service-worker.js` — shell offline da PWA atualizado para `clinical-audit-batch3`.
- `tests/clinical-calculators-scores-audit-batch3.test.cjs` — testes das 30 ferramentas.

### Como reproduzir

```bash
node --test tests/clinical-calculators-audit-batch1.test.cjs
node --test tests/clinical-calculators-audit-batch2.test.cjs
node --test tests/clinical-calculators-scores-audit-batch3.test.cjs
```

As **43 verificações** do lote 3 incluem casos numéricos, bloqueios de entradas inválidas, limites dos escores pontuáveis, presença das fontes, gates PERC/NEWS2, limites do SOFA e distinção MELD-Na/MELD 3.0. Alguns critérios personalizados foram checados por estrutura/código, e não por teste visual interativo.

## Fonte científica prioritária e normas consultadas

1. [HRSA/OPTN — MELD Calculator](https://www.hrsa.gov/optn/data-calculators/allocation-calculators/meld-calculator), atualização de fórmula em julho de 2023.
2. [OPTN — Política de alocação e fórmulas de MELD](https://optn.transplant.hrsa.gov/media/3idbp5vq/policy-guid-change_impr-liv-alloc-meld-peld-sta-1a-sta-1b_liv.pdf).
3. [American Burn Association, Clinical Practice Guidelines on Burn Shock Resuscitation (2024)](https://academic.oup.com/jbcr/article/45/3/565/7458089).
4. [EASL/EASD/EASO — MASLD (2024)](https://pmc.ncbi.nlm.nih.gov/articles/PMC11299976/).
5. [AHA/ACC et al. — Pulmonary Embolism Guideline (2026)](https://www.jacc.org/doi/10.1016/j.jacc.2025.11.005).
6. [Royal College of Physicians — NEWS2](https://www.rcp.ac.uk/resources/national-early-warning-score-news-2/).
7. [Manuais MSD, tabela SOFA](https://www.msdmanuals.com/pt/profissional/multimedia/table/escala-de-avalia%C3%A7%C3%A3o-sequencial-da-disfun%C3%A7%C3%A3o-org%C3%A2nica-sofa).
8. [Glasgow-Blatchford — revisão de critérios](https://pmc.ncbi.nlm.nih.gov/articles/PMC5325906/).

## Pendências para o Modo Trabalho

- Validação clínica independente por especialistas para casos reais, principalmente índices de transplante, queimaduras, sepse, síndromes coronarianas, risco tromboembólico e apoio à prescrição.
- Automação de testes ponta a ponta para inputs inválidos, modal, fluxos PWA offline/online, segurança CSP, controle de sessão e responsividade.
- Para NIHSS e Glasgow, documentar formalmente a opção **não testável** nos componentes; não atribuir valores arbitrários quando faltarem informações.
- Confrontar as respostas numéricas dos escores customizados com calculadoras originais, casos clínicos sintéticos e médicos responsáveis.
- Confirmar CI e deploy em produção; commits em `main` não equivalem por si só à publicação comprovada.

**Próxima revisão:** lote 4 — escores 20–49 (30 itens), preservando lista e ordem do catálogo efetivamente renderizado.
