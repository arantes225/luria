# TRAUBE — auditoria das calculadoras, lote 2/6 (31–60)

**Data:** 24 de outubro de 2026  
**Repositório:** `arantes225/luria`, branch `main`  
**Escopo:** calculadoras na posição 31–60 do catálogo real, de SpO₂/FiO₂ a projeção de idade gestacional por ultrassonografia.  
**Método:** verificação da fórmula, homogeneidade de unidades, limites e valores zero/negativos, população de aplicação, interpretação, referências e riscos em uso assistencial. Ajustes carregados pela página sem reescrever script CSP inline.  
**Atenção:** nenhuma calculadora foi certificada como dispositivo médico. Os resultados de doses, infusões e ventilação são auxiliares e **não fornecem indicação de tratamento ou prescrição**.

## Resultados por ferramenta

| # | Ferramenta | Auditoria e ações aplicadas |
|---:|---|---|
| 31 | Relação SpO₂/FiO₂ | Fórmula confirmada. Validação SpO₂ e FiO₂; advertência do efeito teto da oximetria e de que o índice isolado não define SDRA. |
| 32 | Peso corporal predito | Fórmula ARDSNet conferida; idade e limites plausíveis de altura acrescentados; distinção explícita do peso real. |
| 33 | Driving pressure | Confirmada pressão de platô menos **PEEP total**, e não necessariamente PEEP ajustada no ventilador; aceita PEEP zero e rejeita valores incompatíveis. |
| 34 | Complacência estática | Mantém VT/(Pplat−PEEP total); bloqueia denominador ≤0; exige condições passivas e medição confiável. |
| 35 | Holliday-Segar 4-2-1 | Taxa aproximada de manutenção confirmada. Adicionada idade pediátrica, com restrição para crianças a partir de 1 mês e ressalva para neonatos e situações especiais; não transforma taxa em prescrição de fluido. |
| 36 | Schwartz bedside | Coeficiente 0,413 confirmado com NIDDK, creatinina IDMS; restrição a crianças 1–17 anos; removida interpretação de faixas adultas KDIGO. |
| 37 | Taxa de infusão de glicose (GIR) | Conversão de % m/v para mg/mL e mL/h para mg/kg/min conferida; explicita concentração da solução FINAL e limita valores incompatíveis. |
| 38 | Idade gestacional (DUM) | Validação de datas civis reais, ordem cronológica e idade gestacional até 45 semanas. Resultados em semanas/dias. |
| 39 | Data provável do parto | Confirma DUM+280 dias; valida data real (incluindo 29 de fevereiro); explica pressuposto do ciclo de 28 dias e preferência pela datação obstétrica válida. |
| 40 | mL/h ↔ gotas/min | **Erro corrigido:** além de 20 e 60 gotas/mL, aceita 10 e 15 gotas/mL; fator deve ser o indicado no equipo. |
| 41 | % → mg/mL | Reforça que a fórmula X%×10 só vale para percentual **massa/volume**, não % peso/peso ou volume/volume. |
| 42 | mg ↔ mcg | **Erro corrigido:** rótulo bidirecional antes fazia só mg→mcg; agora calcula nos dois sentidos com escolha explícita. |
| 43 | Glicose mg/dL ↔ mmol/L | **Erro corrigido:** agora bidirecional, usando 18,0182 mg/dL por mmol/L e rótulo de unidade de origem. |
| 44 | Celsius ↔ Fahrenheit | **Erro corrigido:** agora bidirecional, inclusive zero e valores negativos, desde que acima do zero absoluto. |
| 45 | Dose em mg → volume mL | Fórmula aritmética confirmada. Foco em **concentração final**, dose máxima e checagem independente para fármacos de alto risco. |
| 46 | Dose mg/kg/dose | Confirma multiplicação por peso; inclui tipo de peso (atual/ideal/ajustado) e aviso de que dose total e dose máxima dependem do medicamento. |
| 47 | Diurese mL/kg/h | **Falha corrigida:** 0 mL de urina passa a ser aceito e interpretado como anúria; ressalva sobre duração do critério KDIGO. |
| 48 | mcg/kg/min → mL/h | Fórmula e unidades confirmadas. Explicita concentração FINAL e peso da prescrição; alerta para dupla checagem e programação correta da bomba. |
| 49 | Relação albumina/creatinina urinária | Fórmula mg/L ÷ g/L conferida. **Erro de fronteira corrigido:** categoria A3 é **≥300 mg/g**, e não somente >300 mg/g. |
| 50 | HOMA-IR | Fórmula glicose(mg/dL)×insulina(µUI/mL)/405; exige valores de jejum e esclarece inexistência de cutoff universal. |
| 51 | Colesterol não HDL | CT−HDL confirmado; rejeita HDL maior que CT e ressalta metas por risco cardiovascular. |
| 52 | Índice de Mentzer | VCM em fL / hemácias em milhões/µL; exige confirmação de microcitose para interpretação. Não separa etiologias sozinho. |
| 53 | Contagem absoluta de neutrófilos | Cálculo e unidades confirmados. **Falha corrigida:** aceita 0% de neutrófilos, que pode ser quadro crítico. |
| 54 | Saturação de transferrina | Fórmula ferro/TIBC×100; evita confusão com ferritina e rejeita resultado >100% por entradas incompatíveis. |
| 55 | Reticulócitos corrigidos | Reticulócitos (%)×hematócrito do paciente/hematócrito de referência; aceita reticulócitos zero, com validação das porcentagens. |
| 56 | Índice de produção reticulocitária | Fator de maturação antes informado livremente; agora calculado por **faixa aproximada do hematócrito**, sem simular correção exata em todos os pacientes. |
| 57 | Gradiente alvéolo-arterial O₂ | Equação alveolar simplificada revisada com pressão barométrica e FiO₂ fração; unidades e limites ambientais conferidos. |
| 58 | Volume corrente protetor | Fórmula PBW×mL/kg confirmada; valida alvo 4–8 mL/kg e deixa claro que não é ajuste de ventilador. |
| 59 | Idade corrigida da prematuridade | **Falha corrigida:** idade cronológica 0 agora é válida; uso limitado a prematuros e faixa aproximada de acompanhamento até 24 meses. |
| 60 | IG por ultrassonografia anterior | Soma exata de semanas, dias e tempo decorrido; valida sequência das datas e exibe semanas+dias, sem alterar automaticamente a DPP. |

## Auditoria técnica e testes

- Código de auditoria: `assets/js/clinical-calculators-audit-batch2.js`.
- Integração na página original: `trabalho/calculadora/index.html`.
- Suíte de regressão: `tests/clinical-calculators-audit-batch2.test.cjs`.
- Cache PWA versionado: `service-worker.js`.
- Rodar localmente quando houver ambiente Node: `node --test tests/clinical-calculators-audit-batch2.test.cjs`.
- **65/65 verificações passaram em execução JavaScript isolada:** 30 fórmulas/cenários positivos, 28 cenários negativos, 6 testes de regressão funcional e uma conferência de catálogo/referências. Foram também conferidas a integridade de sintaxe e a existência do carregamento. Não foram confirmados testes reais de navegador, autorização do usuário, CI ou publicação do domínio.

## Riscos residuais e validações externas necessárias

1. **Dose/infusão** (`doseml`, `dosekg`, `mkg`, `gir`, `gts`): cálculos aritméticos não verificam automaticamente indicação, dose máxima, estabilidade da solução, renal/hepática, farmacocinética nem disponibilidade do medicamento. Precisam de farmacêutico e médico revisor antes de uso em atendimento real.
2. **Ventilação** (`pbw`, `dp`, `cstat`, `tidalvt`, `sf`): medidas dependem de contexto clínico, método de ventilação, esforço respiratório, altura e qualidade da oximetria.
3. **Pediatria** (`hs`, `schwartz`, `gir`, `pretermcorr`): exclui prematuros/neonatos de protocolos gerais quando aplicável; interpretações por faixa etária e condição especial exigem validação específica.
4. **Obstetrícia** (`ig`, `dpp`, `igultra`): o melhor critério obstétrico de datação prevalece; USG tardia não substitui DPP previamente bem estabelecida.
5. **Índices hematológicos** (`mentzer`, `rpi`, `reticcorr`): são ferramentas de triagem, não diagnósticos automáticos; fator de maturação do RPI é aproximado.
6. **Revisão regulatória:** a disponibilização para médicos em pacientes reais pode enquadrar a funcionalidade em obrigações sanitárias de software como dispositivo médico; requer avaliação jurídica/regulatória específica.

## Fontes oficiais e primárias

- [NHLBI / ARDSNet — Low Tidal Volume Ventilation Protocol](https://biolincc.nhlbi.nih.gov/media/studies/factt/Protocol.pdf).
- [AAP — Clinical Practice Guideline: Maintenance Intravenous Fluids in Children](https://publications.aap.org/pediatrics/article/142/6/e20183083/37529/Clinical-Practice-Guideline-Maintenance) (2018).
- [NIDDK — eGFR Equations for Children, Adolescents, and Young Adults](https://www.niddk.nih.gov/research-funding/research-programs/kidney-clinical-research-epidemiology/laboratory/glomerular-filtration-rate-equations/children-adolescents-young-adults).
- [ACOG/SMFM/AIUM — Methods for Estimating the Due Date](https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2017/05/methods-for-estimating-the-due-date) (reafirmado em 2025).
- [NIH/NIDDK — KDIGO Albuminuria Categories](https://www.ncbi.nlm.nih.gov/books/NBK609462/table/kidneydisease.T.albuminuria_categories_a/).
- [FDA — Infusion Pump Risk Reduction Strategies for Clinicians](https://www.fda.gov/medical-devices/infusion-pumps/infusion-pump-risk-reduction-strategies-clinicians).

**Próximo lote:** calculadoras 61–71 (11 restantes) e, para manter revisão em grupos de até 30, a primeira parte dos escores. O catálogo atual possui **71 calculadoras**, não 72; a diferença decorre da contagem anterior que estava 1 item acima.
