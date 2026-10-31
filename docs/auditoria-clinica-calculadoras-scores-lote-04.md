# TRAUBE — Auditoria clínica de escores, lote 4/6 (escores 20–49)

**Data:** 24/10/2026  
**Repositório:** `arantes225/luria` — branch `main`  
**Escopo:** 30 instrumentos conforme a ordem real do catálogo de `assets/js/work-scores.js`.  
**Ações:** revisar critérios, classificação, população-alvo, restrições, documentação e fontes; corrigir falhas confirmadas; escrever testes de regressão.  
**Limite:** suporte ao raciocínio médico, sem autorização para usar pontuação sem validação independente em pacientes reais.

## Auditoria individual

| Posição | Instrumento | Resultado, correção ou limitação |
|---:|---|---|
| 20 | Padua | 11 fatores e pontuação de 0 a 20 verificados; mobilidade reduzida definida com ≥3 dias, hormônio estrogênico esclarecido. Aplicação restrita a pacientes clínicos hospitalizados. |
| 21 | Apfel simplificado | Quatro fatores binários e soma 0–4 confirmados; alerta contra inferir risco individual exato de náusea/vômito pós-operatório. |
| 22 | Bishop | Cinco componentes e soma 0–13 confirmados; lembrar variação entre examinadores e que não determina indução sozinho. |
| 23 | Apgar | Cinco componentes 0–2 mantidos; **adicionado campo para registrar 1º, 5º ou 10º minuto** sem alterar pontuação. Ressalva de não adiar reanimação. |
| 24 | MASCC | Sete domínios, pontuação máxima 26; corte ≥21 verificado. Não converte baixo risco em alta automática para neutropenia febril. |
| 25 | STOP-BANG | Oito critérios verificados; rótulo do IMC tornou explícito **>35, não ≥35**. Rastreio de apneia, não diagnóstico. |
| 26 | GRACE | Formulário dedicado preservado, com ressalva de que usa cálculo por faixas; precisa confronto externo com calculadora de referência antes de decisões invasivas. |
| 27 | TIMI SCA sem supra | Sete componentes, máximo 7; interpreta apenas a população adequada, nunca substitui ECG/troponina seriada. |
| 28 | RCRI/Lee | **Correção de fronteira:** creatinina é **≥2,0 mg/dL**. Todos os seis critérios conferidos com guideline AHA/ACC 2024. |
| 29 | CHA₂DS₂-VA | Seis componentes e máximo 8; escore sem sexo explícito conforme diretrizes atuais, com aviso de decisão individualizada. |
| 30 | CRB-65 | Quatro critérios, soma 0–4; ausência de ureia não equivale a ausência de outros critérios de gravidade. |
| 31 | PSI/PORT | Cálculo dedicado por idade, sexo, exames e comorbidades; limitado expressamente à classificação numérica II–V; classe I requer algoritmo clínico próprio. |
| 32 | ICH Score | Cinco componentes, pontuação 0–6; ressalva explícita contra decisões de restrição de suporte a partir de prognóstico populacional. |
| 33 | Hunt–Hess | Graus I–V conferidos; depende do exame após estabilização e contexto de sedação. |
| 34 | Fisher modificada | Categorias 0–4 conferidas com critérios radiológicos de HSA e hemorragia intraventricular. |
| 35 | Caprini | **Revisão estrutural crítica:** versão anterior permitia marcar simultaneamente idades mutuamente exclusivas e cirurgia maior + laparoscópica, produzindo pontos errados. Agora há 1 pergunta de idade e 1 categoria principal de cirurgia; checklist ampliado segundo RAM 2013, com fatores adicionais e documentação da versão. **Exige confrontação externa antes de uso como profilaxia**. |
| 36 | CIWA-Ar | Itens e faixa usual 0–67 revisados; **bloqueio “não aplicável”** quando paciente não consegue comunicar sintomas ou cooperar, como delirium grave e intubação. |
| 37 | RTS ponderado | Três domínios GCS, PAS, FR; fórmula ponderada original mantida e ressalva de não substituir atendimento ao trauma. |
| 38 | HINTS | **Bloqueio crítico:** somente calcular interpretação central/periférica em síndrome vestibular aguda contínua com nistagmo espontâneo **e examinador treinado**. |
| 39 | CAGE | Quatro perguntas e máximo 4; triagem de uso problemático de álcool, não diagnóstico definitivo. |
| 40 | Fagerström | Seis perguntas e faixa 0–10; aplicação delimitada a cigarro, não vape sem validação. |
| 41 | Framingham 2008 | Cálculo original por sexo e idade 30–74 preservado; distinguir risco global de outras equações (PREVENT/SCORE2). |
| 42 | Centor/McIsaac | Quatro sinais + ajuste etário; pontuação −1 a 5 verificada. Não usar para antibiótico sem algoritmo de confirmação apropriado. |
| 43 | SIRS | Quatro domínios, máximo 4; é resposta inflamatória inespecífica, não diagnóstico de sepse. |
| 44 | NYHA | Classes I–IV mantidas; descreve impacto funcional, não fração de ejeção. |
| 45 | Genebra revisado | Oito variáveis, 0–22 pontos e limites de baixo/intermediário/alto risco conferidos; prazo de cirurgia/fratura e contexto de anestesia geral explicitados. |
| 46 | 4Ts HIT | Quatro domínios e faixa 0–8; requer cronologia de exposição à heparina, nadir e diagnósticos alternativos. |
| 47 | mMRC | Classes 0–4 confirmadas; medida de dispneia funcional, não marcador diagnóstico de DPOC. |
| 48 | BODE | Quatro domínios e máximo 10 conferidos: IMC, VEF1, mMRC, TC6min; ferramenta prognóstica na DPOC estável. |
| 49 | ASA estado físico | ASA I–VI conferida; sufixo E conforme urgência definido pela equipe. Não é mortalidade prevista. |

## Testes e implementação

- Código revisado: `assets/js/work-scores.js` com metadados `auditDate` e `safetyNote` para os 30 instrumentos; novo formulário completo/estruturado de fatores do Caprini, blocos para HINTS e CIWA-Ar.
- Teste de regressão: `tests/clinical-scores-audit-batch4.test.cjs`.
- Cache busting: `trabalho/scores/index.html` aponta a `work-scores.js?v=20261024-audit-batch4`.
- Service worker: `luria-pwa-20261024-clinical-audit-batch4`.
- **63/63 testes no lote 4 passaram em execução JavaScript isolada.** Inclui 30 verificações por instrumento, 23 testes de limites de soma, 10 testes de estrutura/contexto (incluindo Caprini/HINTS/CIWA-Ar).
- **221/221 verificações acumuladas dos quatro lotes passaram** em avaliação JavaScript isolada; não são testes clínicos ponta a ponta.
- **Ainda não confirmado:** CI, publicação no domínio, integração visual em navegador/PWA, teste de acessibilidade e comparação de todos os casos com instrumentação de referência.

## Novos instrumentos recomendados (roadmap)

### Prioridade 1 — alto impacto no pronto-socorro, critérios clínicos estruturáveis

| Ferramenta | Situação atual | Justificativa |
|---|---|---|
| **Canadian CT Head Rule (CCHR)** | Não existe no catálogo | Avaliação do TCE leve em adultos; ACEP 2023 recomenda CCHR como primeira escolha, conforme população aplicável. |
| **NEXUS cervical e Canadian C-Spine Rule** | Não existem | Seleção criteriosa de imagem em trauma cervical, respeitando exclusões e estado de alerta. |
| **Ottawa Ankle/Knee Rules** | Não existem | Racionalização de exames radiográficos após lesões traumáticas em populações validadas. |
| **YEARS para TEP** | Não existe | Diretriz AHA/ACC 2026 aceita três critérios clínicos combinados com D-dímero nos limiares apropriados. Exige unidade FEU explícita e lógica de população. |
| **4AT — delirium** | Não existe | Triagem breve de delirium, licença **CC BY 4.0** que permite reutilização com atribuição correta. |
| **Hestia** | Não existe | Avaliação de elegibilidade para manejo ambulatorial após TEP confirmado, com exclusões clínicas e sociais. |
| **KDIGO IRA** | Referência, sem cálculo | Prioridade para operacionalizar estágios por creatinina e diurese, com unidade e tempo serial. |
| **PECARN TCE pediátrico** | Referência, sem cálculo | Alta utilidade para trauma; requer duas faixas etárias, indicações de imagem/observação e exclusões criteriosas. |

### Prioridade 2 — ambulatório e internação

| Ferramenta | Situação atual | Justificativa |
|---|---|---|
| **4AT/CAM-ICU** | 4AT ausente; CAM referência | Delirium no enfermaria e UTI; não confundir com GCS. |
| **Braden e avaliação de queda** | Ausentes | Prevenção em enfermaria e pacientes fragilizados, com medidas individualizadas. |
| **Epworth** | Ausente | Sonolência diurna e apneia suspeita, junto ao STOP-BANG. |
| **SARC-F** | Ausente | Rastreio de sarcopenia em pacientes idosos/crônicos. |
| **FRAX** | Ausente | Estimativa de risco de fratura; validar licença e cálculo oficial nacional antes de implementar. |
| **Wells integrado a YEARS/D-dímero ajustado pela idade** | Wells existe; algoritmo não | Melhor fluxo decisório que oferecer escores separados sem algoritmo. |

### Prioridade 3 — já cadastrados, mas não calculados

**APACHE II, SAPS 3, PESI completo, Ranson, Tokyo colecistite/colangite, PECARN, CAM, KDIGO, PREVENT, GOLD/GINA, percentis da OMS e limiares de bilirrubina neonatal.** Não criar uma saída numérica até validar condições e regras originais. Algumas são algoritmos, referências ou classificações, e não escores aditivos simples.

## Fontes de maior hierarquia utilizadas

1. **Ministério da Saúde**, [PCDT DPOC atualizado em 2026](https://www.gov.br/saude/pt-br/assuntos/pcdt/d/doenca-pulmonar-obstrutiva-cronica/view).
2. **AHA/ACC 2024**, [Guideline perioperatório — RCRI](https://www.jacc.org/doi/10.1016/j.jacc.2024.06.013).
3. **AHA/ACC 2026**, [Diretriz de TEP — YEARS, Wells, Genebra, PERC](https://www.jacc.org/doi/10.1016/j.jacc.2025.11.005).
4. **ACEP 2023**, [TCE leve em adultos — CCHR](https://pmc.ncbi.nlm.nih.gov/articles/PMC10617828/).
5. **Caprini RAM 2013**, [Completion of Updated Caprini Risk Assessment Model](https://pmc.ncbi.nlm.nih.gov/articles/PMC6714938/), e [revisão de risco](https://pmc.ncbi.nlm.nih.gov/articles/PMC9783939/).
6. **4AT**, [Licença e uso oficial](https://www.the4at.com/4at-faq).
7. **GOLD**, [2026 Report and Pocket Guide](https://goldcopd.org/2026-gold-report-and-pocket-guide/).
8. **NINDS/NLM**, [Fisher modificada](https://cde.nlm.nih.gov/deView?tinyId=g2T3x6vuCpc).
9. **BODE original**, Celli BR et al., NEJM. 2004;350:1005–1012.

## Pendências

- Validação clínica independente de todo score antes de suportar decisões diretas em pacientes reais; particular cuidado com Caprini (versão/itens), GRACE, PSI, HINTS, CIWA-Ar, anticoagulação e doses.
- Teste real em interface e acessibilidade, inclusive componente "não aplicável" e campos neutros do Apgar.
- Integração de fluxos completos que peçam dados vitais/laboratoriais no formato correto e sinalizem contraindicações.
- Revisar escopos legais dos instrumentos antes da distribuição comercial.
- Confirmar deploy e integridade da PWA no domínio público.
- **Próximo lote:** escores 50–79; após, lote final 80–95 (16 instrumentos).

