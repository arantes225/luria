# LURIA — Tema 019 | Vacinação e suplementação na gestação
**Data da continuação:** 15/10/2026. **Lote:** oficial 001–023, tema 019, GO. **Branch:** `editorial/apostilas-lote-01-etapa-01-20261014`. **Status:** texto ampliado e estruturalmente validado, **NÃO certificado**; sem publicação/merge/deploy.

## 1. Etapa zero e inventário
- O arquivo `lead.apostilas.txt` (Prompt Magno) foi lido antes da produção, assim como `apostilas/EDITORIAL_STANDARD.md`, o controle `LOTE_01_OFICIAL_225_MATRIZ_2026-10-14.md` e `PRENATAL_AUDITORIA_TEMA_004_2026-10-14.md`.
- Verificada a inexistência prévia de `apostilas/vacinacao-suplementacao-gestacao/content.json` nesta branch. O tema já estava parcialmente abordado na apostila publicada `apostilas/pre-natal-baixo-risco/index.html` (tema 004).
- O livro original de pré-natal foi efetivamente aberto e examinados trechos de cronograma vacinal, capítulos sobre ácido fólico/ferro/cálcio/vitamina D, doses do PNI, VSR, dTpa e questões. **Decisão:** preservar `index.html` integralmente, sem reescrever o pré-natal nem duplicar as demais consultas, ultrassonografias ou exames.
- A apostila específica 019 ensina **indicação, mecanismo, calendário, esquemas de recuperação, doses, interações, contraindicações, diferenciação entre prevenção e tratamento, especiais, casos e decisões**, sem substituir a 004 (visão longitudinal do pré-natal), a 014 (exames e rastreamentos) e capítulos de doenças específicas.

## 2. Benchmark do Drive: consulta efetiva, não apenas resultado da busca
- Foi aberto e lido `02 - ASSISTENCIA AO PRE-NATAL.pdf`, com aproximadamente **25.315 caracteres extraídos**. Cobre consulta pré-concepcional, ácido fólico e grupos de risco, vacinação (dT/dTpa, HPV, tríplice viral, covid-19) e suplementação. O arquivo traz rodapé **Medicina Livre, venda proibida**; autoria institucional Estratégia MED **não confirmada**.
- Também foi aberto `03 - HEMATO - ANEMIA FERROPRIVA, SUPLEMENTACAO DE FERRO E TALASSEMIA.pdf` (aproximadamente **25.353 caracteres**), centrado predominantemente em hematologia e pediatria, útil apenas para comparação parcial da didática de anemia e ferritina. Não é protocolo obstétrico.
- Ambos foram utilizados **somente para identificar lacunas e padrões didáticos**. Não houve reprodução ou paráfrase próxima de textos, tabelas, figuras, esquemas ou questões. Documentos do Drive são privados; seus identificadores e links não integram este arquivo público.

## 3. Matriz de lacunas e correções editoriais
| Tema | Conteúdo preservado na 004 | Lacuna tratada em 019 |
|---|---|---|
| Cartão vacinal | Lista de vacinas e calendário geral | Leitura de histórico, imunidade, anticorpos, perda de cartão, recuperação de séries e registro |
| dTpa/dT | Marco de 20 semanas e proteção | Quatro históricos prévios, esquema de atualização e diferenciação da proteção neonatal |
| VSR | Marco de 28 semanas, dose por gestação | Mecanismo passivo, evento de aplicação precoce sem redose, neonatal versus anticorpo monoclonal |
| Influenza/covid-19 | Indicação geral | Temporada, produto, intervalo de covid, comparação de mecanismos e coadministração |
| Hepatite B | Completar se pendente | Série 0-1-6, diferença de HBsAg/anti-HBs, proteção materna versus transmissão vertical |
| Vacinas vivas | Contraindicações gerais | Exceção febre amarela e adiamento para puerpério, aplicação inadvertida |
| Folato | Profilaxia periconcepcional e alto risco | Metabolismo, B12, risco de DTN, alta dose individual, antiepilépticos e barreiras de adesão |
| Ferro | Recomendação geral no pré-natal | Dose **elementar** brasileira versus OMS, prevenção versus anemia, ferritina/hepcidina, tratamento e seguimento |
| Cálcio | 1.000 mg elementar da 12ª semana até o parto | Equivalência com carbonato 1.250 mg, interações, contraindicações e diferença de AAS/OMS |
| Outros micronutrientes | Vitamina D selecionada | B12, iodo, vitaminas lipossolúveis, pós-bariátrica e segurança de produtos múltiplos |

### Divergências com material comparativo antigo explicitamente corrigidas
1. Uma dose de VSR desde a **28ª semana**, a cada gestação, conforme calendário MS 2026 — ausente em apostila comparativa histórica.
2. Covid-19: documento técnico brasileiro 2026 prevê **uma dose por gestação**, em qualquer fase, observando intervalo desde última dose (documento técnico indica **seis meses**, salvo particularidades). Não copiar lista antiga de marcas/produtos sem verificar disponibilidade atual.
3. Suplementação brasileira de cálcio é **universal** desde 12 semanas com **1.000 mg de cálcio elementar** ao dia; evitar copiar comparador que a restringe a risco nutricional e recomenda outro valor, e separar recomendação OMS (1,5–2 g/dia para baixa ingesta).
4. Linha de cuidado brasileira de ferro: **40 mg/dia de ferro elementar** em profilaxia a partir de 20 semanas até terceiro mês pós-parto/pós-aborto. OMS: 30–60 mg/dia + 400 µg de folato idealmente desde início da gravidez; não fundir esquemas.
5. Deficiência comprovada de ferro e anemia não são tratadas por mera perpetuação de dose profilática; investigar e tratar conforme mecanismo.

## 4. Fontes científicas públicas consultadas
1. Ministério da Saúde, **Calendário Nacional de Vacinação — Gestante 2026**: https://www.gov.br/saude/pt-br/vacinacao/arquivos/calendario-nacional-de-vacinacao-gestante (versão vigente em 15/10/2026).
2. MS, **Calendário Técnico Nacional de Vacinação da Gestante** (publicado/atualizado 2026), inclusive tabela dTpa/dT e intervalo covid: https://www.gov.br/saude/pt-br/composicao/svsa/pni/calendario-tecnico/calendario-tecnico-nacional-de-vacinacao-gestante . **Nota de QA:** algumas páginas do documento técnico têm cabeçalho "ano 2025" apesar do documento ser servido como atualização 2026; confrontar versão mais recente e notas posteriores quando aplicar regras condicionais.
3. MS, **FAQ VSR 2026**, elegibilidade e aplicação antes da 28ª semana: https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/v/vsr/faq/publico-alvo-e-elegibilidade-vsr/quem-pode-receber-a-vacina e https://www.gov.br/saude/pt-br/vacinacao/esavi/faq/faq/vacina-contra-virus-sincicial-respiratorio-vsr/uma-mulher-foi-vacinada-antes .
4. MS, **Nota Técnica Conjunta nº 251/2024 — cálcio na gestação**, publicação oficial: https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes/notas-tecnicas/2024/nota-tecnica-conjunta-no-251-2024-coemm-cgesmu-dgci-saps-ms-e-cgan-deppros-saps-ms.pdf/@@download/file .
5. MS, **Linha de Cuidado de Pré-natal de Baixo Risco — Planejamento Terapêutico** (ferro elementar 40 mg): https://linhasdecuidado.saude.gov.br/portal/pre-natal-baixo-risco/unidade-de-atencao-primaria/planejamento-terapeutico/ .
6. OMS, **Daily iron and folic acid supplementation during pregnancy**, atualização 2024: https://www.who.int/tools/elena/interventions/daily-iron-pregnancy .
7. OMS, **Recommendations on Antenatal Care for a Positive Pregnancy Experience**, cálcio e ferro, síntese em https://www.ncbi.nlm.nih.gov/books/NBK409113/ .

## 5. Produção e QA estrutural em leitura de volta
- Arquivo novo: `apostilas/vacinacao-suplementacao-gestacao/content.json` (esquema JSON LURIA v2).
- Estrutura: **15 seções**, 15 entradas de índice em correspondência, IDs únicos, 7 tabelas e fluxos textuais originais, **6 casos clínicos**, **12 questões autorais comentadas**.
- Auditoria mecanizada simples após leitura de volta: JSON decodificado, **148 parágrafos didáticos dos capítulos**, **67.485 caracteres** em parágrafos de capítulos, excluindo casos, questões e referências, **zero parágrafos longos literalmente duplicados**, zero tipos de bloco fora da lista de esquema analisada.
- **Importante:** o número cumpre apenas a triagem quantitativa; não prova revisão científica integral, exclusão de redundâncias semânticas ou que todas as questões possam ser resolvidas unicamente pelo livro. Ainda existem testes editoriais e médicos a fazer.

## 6. Estratégia visual
Este tema não exige radiografias, ECG ou fotos clínicas de pacientes. Os visuais de maior rendimento são **tabelas originais** e diagramas autorais: linha do tempo da gravidez com vacinas e suplementos, algoritmo de recuperação dT/dTpa, distinção ferro elementar vs sal, calendário de horários cálcio/ferro, fluxo do folato pré-concepcional e quadro de contraindicações. Há **7 tabelas integradas**; diagramas visuais adicionais e 10 candidatas externas não foram artificialmente incluídos apenas para atingir número. Não reproduzir infográficos oficiais protegidos por copyright sem verificar licença; candidatas clínicas, se surgirem, somente via fluxo Admin `pending`.

## 7. Gates pendentes (não certificar)
- Revisão científica independente por obstetrícia, imunização/PNI e nutrição, incluindo toda dose, intervalo e afirmação sobre vacina viva/condições especiais.
- Confirmar se não existem atualizações de calendário ou notas após os documentos aqui citados; conferir divergência de ano no cabeçalho do calendário técnico.
- Revisar semântica de redundâncias, coerência capítulo-caso-questão e legibilidade de todas as alternativas; documentar teste de autossuficiência.
- Validação com renderer do JSON, legibilidade das tabelas, acessibilidade, desktop/PWA e performance; aprovação visual autoral.
- **Não criar `index.html`, não inserir no catálogo, não fazer merge/deploy.** A branch editorial diverge da `main`; reconciliar diffs com trabalho paralelo do Codex.

**Próximo tema curricular:** 020 — Atenção Primária à Saúde e seus atributos.
