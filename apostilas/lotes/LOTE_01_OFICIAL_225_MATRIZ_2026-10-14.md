# LURIA — Lote 1 OFICIAL do plano de 225 temas: auditoria e preenchimento
**Data:** 14/10/2026. **Base de verdade:** `assets/js/cronograma-base-data.js` na `main` + painel `assets/js/apostilas-lotes-225.js`, com **23 temas no primeiro lote**. **Branch de produção:** `editorial/apostilas-lote-01-etapa-01-20261014`; PR #37 draft.
**Importante:** o arquivo `LOTE_01_2026-10-14.md` descreve um **inventário histórico de 20 temas não equivalente** ao novo Lote 1 de 23. Este documento consolida a correspondência atual sem apagar trabalhos úteis feitos antes.

## Etapa zero e fontes
O texto integral de `lead.apostilas.txt` / Prompt Magno foi conferido, assim como `apostilas/EDITORIAL_STANDARD.md` e `apostilas/PRODUCAO_EM_LOTE.md`. Cada novo aprofundamento médico do ciclo foi precedido de nova leitura de benchmark do Google Drive conectado, em documentos correspondentes a SCA, IC, HAS pediátrica (uso restrito a comparação), FA/taquiarritmia, avaliação pré-anestésica e complicações pós-bariátricas (escopo restrito). Também foram abertos dois comparativos de pré-natal, úteis para auditoria sem alteração do livro existente.

**Preferência de fontes:** houve busca pelo título `Estratégia MED`, sem documento de autoria institucional confirmada; não foi presumida qualquer atribuição. Os materiais comparativos não autorizam copiar textos, gráficos ou ECGs. Para condutas prevalecem fontes primárias brasileiras: SBC 2024 (perioperatório), SBC 2025 (HAS e FA), SBC 2026 (IC), ANVISA 2025–2026 (ISC); AHA/ACC 2024/2025 e ESC 2026 complementam. O conteúdo novo deste ciclo permanece original e não copia as figuras dos comparativos.

## Inventário curricular oficial (temas 001–023)
| Nº | Área | Tema do cronograma | Situação encontrada | Arquivo principal ou correlato | Lacuna e decisão editorial |
|---|---|---|---|---|---|
| 01 | Clínica Médica | Síndromes coronarianas agudas | Rascunho aprofundado | `apostilas/sindromes-coronarianas-agudas/content.json` | 13 seções; ECG/troponina/reperfusão e segurança antitrombótica 2025 |
| 02 | Cirurgia Geral | Avaliação pré-operatória e risco cirúrgico | Rascunho aprofundado | `apostilas/avaliacao-pre-operatoria-risco-cirurgico/content.json` | 14 seções; SBC/AHA 2024, risco, drogas e MINS |
| 03 | Pediatria | Assistência ao recém-nascido em sala de parto | Não há livro próprio identificado | — | Assistência ao RN inclui exame inicial/termorregulação; distinguir reanimação #8 |
| 04 | Ginecologia e Obstetrícia | Pré-natal de baixo risco | Apostila existente robusta, auditoria pendente | `apostilas/pre-natal-baixo-risco/index.html` | 33 seções HTML, ~70 mil caracteres aparentes; evitar duplicação de #9, #14 e #19 |
| 05 | Medicina Preventiva | Princípios e diretrizes do SUS | Não há livro próprio identificado | — | Princípios e diretrizes do SUS: base conceitual antes das leis |
| 06 | Clínica Médica | Insuficiência cardíaca | Rascunho aprofundado | `apostilas/insuficiencia-cardiaca/content.json` | 13 seções; SBC 2026, ESC 2026 e descongestão |
| 07 | Cirurgia Geral | Cuidados perioperatórios | Rascunho aprofundado | `apostilas/cuidados-perioperatorios-prevencao-complicacoes/content.json` | 15 seções; segurança, Anvisa, ERAS e complicações |
| 08 | Pediatria | Reanimação neonatal | Não há livro próprio identificado | — | NRP/SBP: reanimação neonatal; evitar misturar conduta de RN vigoroso #3 |
| 09 | Ginecologia e Obstetrícia | Diagnóstico e datação da gestação | Parcialmente contemplado em pré-natal | `apostilas/pre-natal-baixo-risco/index.html` | Datação e DUM incerta presentes; verificar se merece módulo separado ou seção consolidada |
| 10 | Medicina Preventiva | Lei nº 8.080/1990 | Não há livro próprio identificado | — | Lei nº 8.080: organização, competências e direitos no SUS |
| 11 | Clínica Médica | Hipertensão arterial sistêmica | Rascunho aprofundado | `apostilas/hipertensao-arterial-sistemica/content.json` | 13 seções reorganizadas; ~74,7 mil caracteres de texto aparente; diagnóstico, MAPA/MRPA, farmacologia, HAS secundária e emergências DBHA 2025; NÃO certificada |
| 12 | Cirurgia Geral | Resposta metabólica ao trauma | Não há livro próprio identificado | — | Resposta metabólica ao trauma requer eixo neuroendócrino, fases e cuidado nutricional |
| 13 | Pediatria | Prematuridade e baixo peso ao nascer | Não há livro próprio identificado | — | Prematuridade e BPN; separar fisiologia e complicações |
| 14 | Ginecologia e Obstetrícia | Exames e rastreamentos no pré-natal | Parcialmente contemplado em pré-natal | `apostilas/pre-natal-baixo-risco/index.html` | Rastreios e ultrassonografia presentes; detalhamento pode ser módulo próprio |
| 15 | Medicina Preventiva | Lei nº 8.142/1990 | Não há livro próprio identificado | — | Lei nº 8.142: participação social e transferências financeiras |
| 16 | Clínica Médica | Arritmias e fibrilação atrial | Rascunho aprofundado | `apostilas/arritmias-fibrilacao-atrial/content.json` | 15 seções; ECG, FA, tromboembolismo e cardioversão SBC 2025 |
| 17 | Cirurgia Geral | Reposição volêmica e distúrbios hidroeletrolíticos no paciente cirúrgico | Parcialmente contemplado em perioperatório | `apostilas/cuidados-perioperatorios-prevencao-complicacoes/content.json` | Fluidos e LRA discutidos; faltam distúrbios e correções detalhadas |
| 18 | Pediatria | Icterícia neonatal | Não há livro próprio identificado | — | Icterícia neonatal: triagem, bilirrubinas, nomogramas e investigação |
| 19 | Ginecologia e Obstetrícia | Vacinação e suplementação na gestação | Parcialmente contemplado em pré-natal | `apostilas/pre-natal-baixo-risco/index.html` | Vacinação e suplementação já abordadas; conferir PNI atualizado e evitar replicação |
| 20 | Medicina Preventiva | Atenção Primária à Saúde e seus atributos | Não há livro próprio identificado | — | APS e atributos com referência a Starfield e normas brasileiras |
| 21 | Clínica Médica | Valvopatias | Não há livro próprio identificado | — | Valvopatias aparecem em referências cardíacas, mas não há apostila dedicada |
| 22 | Cirurgia Geral | Choque hemorrágico | Parcialmente contemplado em perioperatório | `apostilas/cuidados-perioperatorios-prevencao-complicacoes/content.json` | Hemorragia cirúrgica mencionada; não substitui choque hemorrágico |
| 23 | Pediatria | Sepse neonatal | Não há livro próprio identificado | — | Sepse neonatal; diferenciar sepse precoce/tardia, diagnósticos e terapia |

**Interpretação numérica:** 7/23 temas têm apostila própria localizada (6 novos rascunhos + 1 apostila HTML preexistente de pré-natal); **16/23 ainda não têm arquivo próprio correspondente**. Destes 16, alguns já estão **parcialmente contemplados** em pré-natal/perioperatório (ver tabela). Isso não representa 7 apostilas prontas; os seis rascunhos são material incompleto, sem página `index.html`, sem revisão integral e fora do catálogo.

## Auditoria qualitativa das obras existentes
### Pré-natal (tema 004)
`apostilas/pre-natal-baixo-risco/index.html`: aproximadamente **70 mil caracteres de texto aparente no corpo** e 33 seções HTML. Já cobre linha do tempo, consultas, datação, rastreamento, vacinas, sífilis/urocultura, sinais de alerta, cinco casos base, questões e fluxos. Manter intacta por ora: tamanho não comprova precisão, e há possível sobreposição curricular com #9, #14 e #19. **Próxima auditoria:** confrontar capítulos com Ministério da Saúde, PNI 2026 e FEBRASGO; avaliar quais subtemas realmente precisam de material autônomo. Benchmarks reabertos: `Pré-Natal.pdf` (1.603 caracteres, muito curto) e `02 - ASSISTENCIA AO PRE-NATAL.pdf` (25.315 caracteres), sem autoria institucional Estratégia MED verificada. Há tópicos nos comparadores sujeitos a atualização (rotina de exames, consultas, vacinas); não reproduzir automaticamente.
### Seis rascunhos de Clínica e Cirurgia
Todos foram abertos como `content.json`, possuem sumários correspondentes e cinco casos/seis questões iniciais. Em 14/10/2026 receberam capítulos adicionais substantivos:
- **SCA:** estratégia antitrombótica da diretriz ACC/AHA 2025, risco hemorrágico, interação com anticoagulação crônica e alta, dois casos e duas questões adicionais.
- **Pré-operatório:** avaliação seletiva cardiovascular, SGLT2i/risco metabólico, MINS, fragilidade e medicações, dois casos e duas questões adicionais.
- **IC:** SBC 2026/ESC 2026, diagnóstico e diferenciais, pilares, perfis hemodinâmicos e descongestão, dois casos e duas questões adicionais.
- **Perioperatório:** Anvisa prevenção de ISC, segurança de antibioticoprofilaxia, febre e sinais de infecção profunda, dois casos e duas questões adicionais.
- **HAS:** MAPA vigília/sono/24 horas, MRPA por 4–6 dias, metas DBHA 2025, hipertensão resistente, dois casos e duas questões adicionais.
- **FA:** SBC/SOBRAC 2025, cardioversão da FA estável >24h, ETE ou anticoagulação prévia, ≥4 semanas pós-reversão, escore VA, dois casos e duas questões adicionais.

## Matriz de pendências antes de declarar qualquer apostila pronta
1. **Profundidade:** atingir aproximadamente 60 mil caracteres *didáticos úteis* por livro, não contagem de JSON/HTML. Todos os seis rascunhos ainda abaixo da meta. O pré-natal, apesar de extenso, exige leitura crítica.
2. **Correção científica:** conferir integralmente doses, ajustes renais, contraindicações e algoritmos (SBC/MS/Anvisa/PNI); aplicar checagem médica especializada e revisão editorial de redundâncias.
3. **Cobertura curricular:** evitar criar um livro novo para #9, #14 ou #19 sem avaliar o que já está consolidado em pré-natal; porém, os 23 itens do cronograma devem estar acessíveis por correspondência clara.
4. **Casos e questões:** validar que todos os enunciados e distratores podem ser resolvidos somente com conteúdo do próprio livro; manter comentários completos.
5. **Imagens:** pesquisar pelo menos dez candidatas quando o tema justificar, licenças e finalidade didática; integração só via fluxo Admin, WebP responsivo. Nenhuma nova imagem adicionada neste ciclo.
6. **Publicação:** novos `content.json` não contam como páginas disponíveis sem `index.html`. Não criar casca/índice ou inserir catálogo até certificação. Testes reais desktop/PWA e validação automatizada são pendentes.
7. **Branches:** a `main` avançou durante a produção do PR #37 (inclusive painel de 225 temas). Reconciliar e revisar diffs antes de integração, sem descartar alterações do Codex.

**Status global do Lote 1:** auditoria parcial + aprofundamento aplicado a seis rascunhos + preservação de pré-natal. **0 livros novos certificados, 0 merge, 0 deploy.**

## Continuação de 14/10/2026 — aprofundamento integral da HAS
**Tema curricular:** 011, Hipertensão arterial sistêmica.
**Arquivo alterado:** `apostilas/hipertensao-arterial-sistemica/content.json`.
**Etapa zero refeita:** comparativo `02 - CARDIO - HAS.pdf` reaberto e examinado (é material principalmente pediátrico, com percentis por altura; não usar como diretriz de HAS em adultos). Comparativo endócrino `03 - HIPERALDOSTERONISMO PRIMARIO.pdf` também reaberto; limiar isolado de ARR de resumo antigo não foi copiado, visto que Endocrine Society 2025 usa cutoffs por método. Estratégia MED não foi identificado institucionalmente nestes PDFs.
**Fontes médicas para o conteúdo original:** Diretriz Brasileira de Hipertensão Arterial — 2025, Brandão AA et al., Arq Bras Cardiol 122(9):e20250624, DOI 10.36660/abc.20250624; Endocrine Society Primary Aldosteronism — 2025; AHA/ACC High Blood Pressure — 2025 (comparação onde aplicável).
**Preenchimento:** três grandes capítulos substantivos incorporados aos capítulos existentes: (1) prescrição e segurança da farmacologia, faixa habitual de doses por DBHA, associações/monitorização/efeitos adversos; (2) HAS secundária, aldosteronismo com interferentes, causas renais/endócrinas e diferenciais; (3) emergência hipertensiva por órgão ameaçado, AVC, dissecção, EAP, SCA, gravidez/puerpério, idosos e DRC, acrescidos de casos e questões novos. Mantida a seção independente aprofundada de MAPA/MRPA/controle fora do consultório.
**QA documental feito após save:** JSON analisável; 13 índices = 13 seções; IDs únicos; tipos de blocos válidos; zero parágrafos extensos literalmente repetidos na triagem; 115 parágrafos (inclui original e ampliação); ~74,7 mil caracteres de **texto aparente** (extração de blocos) e 90,8 mil caracteres serializados do JSON. A contagem aparente contém enunciados/legendas e **não certifica automaticamente** a meta de 60.000 caracteres didáticos úteis. Nenhuma imagem foi embutida. Foi feita a incorporação das ampliações dentro dos capítulos correspondentes para diminuir risco de colcha de retalhos.
**Curadoria visual:** `apostilas/lotes/HAS_CANDIDATAS_IMAGENS_2026-10-14.md` registra onze imagens candidatas com URLs de origem, licenças informadas, autores identificados e papel didático. A aprovação de autoria/licença/qualidade e inserção centralizada no Admin estão pendentes. **Não foram adicionadas imagens clínicas.**
**Gates que impedem publicação:** revisão científica independente de doses e manejo, validação de correspondência texto-questões/casos, auditoria manual de redundâncias semânticas e autossuficiência, conferência final de licenças e acessibilidade das 11 candidatas, testes reais de renderização/capítulos no desktop e PWA, revisão de ligação ao catálogo. **Status: redação aprofundada, não certificada e sem página `index.html`.**
