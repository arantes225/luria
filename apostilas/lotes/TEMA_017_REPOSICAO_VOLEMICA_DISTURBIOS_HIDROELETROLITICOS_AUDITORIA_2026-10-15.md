# LURIA — Tema 017 | Reposição Volêmica e Distúrbios Hidroeletrolíticos no Paciente Cirúrgico
**Data:** 15/10/2026. **Fase:** Etapa zero e matriz de cobertura; rascunho editorial, sem publicação nem certificação.

## Inventário real na branch
- Tema 017 está previsto no currículo Lote 1 como Cirurgia Geral. Diretórios de `apostilas/` foram listados via GitHub e não havia apostila própria: `reposicao-volemica-disturbios-hidroeletroliticos`, `reposicao-volemica-paciente-cirurgico` nem `disturbios-hidroeletroliticos-paciente-cirurgico`.
- `apostilas/cuidados-perioperatorios-prevencao-complicacoes/content.json` (tema 007), 14 capítulos, foi lida para comparação: contém capítulo sobre perfusão/risco de LRA e ERAS, sem monografia de eletrólitos. Preservar seu conteúdo.
- `apostilas/resposta-metabolica-ao-trauma/content.json` (012), 15 capítulos, foi lida para evitar duplicação da fisiologia ebb/flow e lactato; a nova 017 tratará prescrição, diagnóstico quantitativo e decisão cirúrgica.
- Tema 022 (choque hemorrágico) receberá algoritmo de transfusão/hemostasia; não abordar de forma operacional simplista aqui.

## Etapa zero Google Drive — arquivos efetivamente lidos
1. **04 - ECG DISTURBIOS HIDROELETROLITICOS.pdf**, URL https://drive.google.com/file/d/1IfnC5gnECjxBTZJGkvf_fvOaHMPvfCPc/view?usp=drivesdk, **4.793 caracteres extraídos**. Contém esquemas eletrocardiográficos de K e Ca, foco cardiológico, não monografia sobre reposição. No rodapé consta "Medicina livre, venda proibida", não autorização de reutilização; autoria de cursinho Estratégia MED **não confirmada**. Algumas faixas numéricas e frases mnemônicas precisam de verificação; não copiar.
2. **08 - GASOMETRIA ARTERIAL - PARTE 2.pdf**, URL https://drive.google.com/file/d/1kMCgYJ9XqmadEABh1I19rvy5PmGJnP1s/view?usp=drivesdk, **8.923 caracteres extraídos**. Contém ânion-gap, correção pela albumina, distúrbios mistos, uso de Cl urinário. Resume lactato como anaeróbio, simplificação inadequada. Também material "Medicina livre", não Estrategia MED confirmada.
3. **02 - ESPECIALIDADES- NEFRO - DRC, LRA.pdf**, URL https://drive.google.com/file/d/1DjqkZT-EHp9zMu2NNF5NHIz3NMkVVvYx/view?usp=drivesdk, **19.972 caracteres extraídos**. Critérios KDIGO de LRA, diurese, K, acidose e necessidade de TSR; tem ênfase pediátrica e não deve ser generalizado ao adulto cirúrgico.
4. **01 - INTENSIVA - POLITRAUMA E QUEIMADURAS.pdf**, URL https://drive.google.com/file/d/1vE8Ez7qS3_U8_fEe-FgdlZQ6k-JnyoYo/view?usp=drivesdk, **26.658 caracteres extraídos**. Trauma/queimadura/ressuscitação, mas parte das fórmulas e protocolos de bolus está simplificada e não deve substituir atualizações.

**Síntese do benchmark:** conjunto correlato efetivamente acessível, mas nenhuma apostila específica e longa da terapia de fluidos do paciente cirúrgico; lacuna declarada, sem transcrição ou uso de imagens/tabelas de terceiros.

## Fontes primárias científicas para o rascunho
- NICE CG174, Intravenous fluid therapy in adults in hospital, 5 Rs; manutenção 25–30 mL/kg/d e aproximadamente 1 mmol/kg/d de Na, K, Cl, menos em idosos/frágeis/IRC/IC; glicose para cetose não equivale a nutrição: https://www.nice.org.uk/guidance/cg174/chapter/recommendations
- ESICM 2024 (part 1: choice), Intensive Care Med 50:813–831 DOI 10.1007/s00134-024-07369-9, preferência condicional a cristaloides e, em muitos críticos, balanceados; nuance TCE: https://pubmed.ncbi.nlm.nih.gov/38771364/
- ESICM 2025 (part 2: volume), DOI 10.1007/s00134-025-07840-1; ressuscitação em crítica deve usar avaliações seriadas; https://pubmed.ncbi.nlm.nih.gov/40163133/
- ESICM 2025 (part 3: de-escalation), DOI 10.1007/s00134-025-08058-x, retirada de excesso de fluidos na fase de recuperação: https://www.esicm.org/resources/guidelines-consensus-statements/
- Joint European societies: Clinical practice guideline on diagnosis and treatment of hyponatraemia (2014), bolus 150 mL 3% em 20 min para sintomas graves, limites de correção 10 mmol/L primeiras 24h e 8 cada 24h subsequentes na norma; individualizar limites menores quando alto risco de desmielinização: https://academic.oup.com/ejendo/article/170/3/G1/6668028
- UK Kidney Association 2023 Management of Hyperkalaemia in Adults: https://www.ukkidney.org/sites/default/files/FINAL%20VERSION%20-%20UKKA%20CLINICAL%20PRACTICE%20GUIDELINE%20-%20MANAGEMENT%20OF%20HYPERKALAEMIA%20IN%20ADULTS%20-%20191223.pdf. Documento específico de emergência; atenção à hipoglicemia pós-insulina e cálcio monitorizado.
- NICE CG32 refeeding: https://www.nice.org.uk/guidance/cg32/chapter/Recommendations. Integrar Mg/K/fosfato e segurança da nutrição.

## Cobertura planejada e distinção curricular
| Núcleo | Conteúdo original | Evitar duplicar |
|---|---|---|
| Conceitos, compartimentos e fisiologia renal | água total, osmolaridade/tonicidade, ADH/RAAS | endocrinologia completa do estresse (012) |
| 5 Rs | resuscitation, routine maintenance, replacement, redistribution, reassessment | apenas resumo ERAS do 007 |
| Avaliação da volemia | choque vs hipovolemia sem choque, clínica/POCUS/dinâmica, perfusão, balanço | transfusão/hemostasia específica (022) |
| Fluidos | NaCl 0,9%, balanceados, glicose 5%, soluções hipertônicas, coloides | receitas imutáveis |
| Perdas cirúrgicas | vômito/SG, ileostomia, fístulas, drenos, queimaduras e terceiro espaço | aplicação de fórmula única |
| Sódio | hipoNa sintomática/crônica, SIADH pós-op, hiperNa, risco de desmielinização | evitar correção cega |
| Potássio | hipoK e hiperK, ECG e cálcio, insulina/glicose, monitorização | hiperK sem checar rim/ECG |
| Mg/Ca/fósforo | complexidade de QT, refeeding, transfusão | misturar cálcio total com ionizado |
| Ácido-base | ânion-gap, albumina, delta, Winter, cloro urinário | chamar todo lactato de anaeróbio |
| LRA pós-operatória | KDIGO e LRA pré/renal/pós, prevenção e complicações | nefrologia avançada completa |
| Casos e questões | >= 4 casos clinicamente completos, >= 6 MCQs comentadas por alternativa | casos transcritos de PDF |

## Segurança e editoração
- Esta é uma apostila para estudantes/médicos, não prescrição pronta para paciente específico. Doses emergenciais somente com cenário, acesso, monitorização, unidades e protocolo institucional; evitar adição manual de potássio a bolsa. Atenção à rapidez de correção do sódio e à hipoglicemia pós-insulina.
- Preferir tabelas e diagramas **originais**; não incorporar imagens de ECG do Drive protegidas por copyright; imagens eventualmente identificadas passam pela curadoria Admin.
- Meta orientativa >=60.000 caracteres úteis; métrica não prova completude.
- Não gerar HTML/index, não mexer em catálogo, não mesclar branch, não fazer deploy/publicação. Revisão por cirurgia/anestesia/nefrologia e teste em desktop/PWA pendentes.