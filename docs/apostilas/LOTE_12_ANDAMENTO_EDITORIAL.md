# LURIA — Lote 12: andamento editorial (15/10/2026)

**Branch de produção:** `editorial/lote-12-producao-20261015`  
**Regra:** NÃO PUBLICAR, não fazer merge ou deploy sem validação editorial/médica.

## Apostilas produzidas nesta branch

- **#267 — Endoscopia digestiva e urgências endoscópicas:** **rascunho original preservado e profundamente expandido** em `apostilas/endoscopia-digestiva-urgencias-endoscopicas/rascunho-editorial-lote12.md`: de 13.642 para **93.880 caracteres / 597 linhas / 10 casos / 12 questões**. Inclui ESGE 2026 para úlcera, Baveno VII, ACG 2023 HDB, corpo estranho ESGE/ASGE, EoE ACG/FBG 2025, CPRE/colangite/PEP ASGE, antitrombóticos BSG/ESGE 2021, 13 candidatas visuais rastreáveis (não integradas). Commits `8adfc6c`, `6907303`, `1f46599`. **PENDENTE revisão médica, inspeção/licenciamento de imagens, padronização HTML e checagem de referências brasileiras antes de publicação.**
- **#268 — Cirurgia cardiovascular para o generalista:** manuscrito expandido em `apostilas/cirurgia-cardiovascular-para-o-generalista/rascunho-editorial-lote12.md`, 68.455 caracteres em 451 linhas, 6 casos clínicos extensos, 8 questões autorais comentadas, tabelas/algoritmos, cirurgia coronariana, valvar e aórtica, endocardite, manejo antitrombótico, complicações e seguimento. Commits `6e3ab16` (criação) e `239d712` (ampliação). **Status: rascunho editorial, não revisado/aprovado para publicação**. Não duplicar apostila #21 (valvopatias clínicas) nem #240 (aneurisma/aorta clínica).

## Ainda pendentes, conforme matriz oficial ENAMED / MedCof

- **#266 — Oncologia de cabeça e pescoço:** rascunho preexistente do diretório canônico `apostilas/oncologia-cabeca-pescoco/` (16.318 caracteres) foi **aproveitado e aprofundado**, resultando em manuscrito de **75.089 caracteres** em `apostilas/oncologia-cabeca-pescoco/rascunho-editorial-lote12.md`. Contém três núcleos (CEC por sítio, massa cervical, anomalias congênitas), 8 casos e 10 questões autorais comentadas, referências INCA/NCI/AAO-HNS e atualização FDA 2025. Arquivo alternativo foi excluído após verificação de consolidação (commits `70ef096`, `266e66e`). **Ainda rascunho; sem figuras integradas ou revisão médica final**.
- **#269 — Ultrassonografia obstétrica e medicina fetal:** manuscrito expandido em `apostilas/ultrassonografia-obstetrica-medicina-fetal/rascunho-editorial-lote12.md`, **69.001 caracteres / 483 linhas / 6 casos / 8 questões**. Inclui datagem, planos morfológicos, biometria, placenta/cordão, Doppler e interpretação de RCF, rastreamento genético, medicina fetal, gestações múltiplas e 12 imagens candidatas com status de licença. Commits `b9f39fd` e `247d367`. **EM REVISÃO**, sem imagens integradas e sem validação médica final. Preservar temas publicados de vitalidade, crescimento e pré-natal, bem como #89.
- **#270 — Intercorrências clínicas na gestação:** manuscrito ampliado em `apostilas/intercorrencias-clinicas-na-gestacao/rascunho-editorial-lote12.md` com **75.205 caracteres / 520 linhas / 8 casos clínicos / 10 questões comentadas**. Inclui cardiopatias (ESC 2025/mWHO 2.0), anticoagulação e TEV, trombofilias/SAF (ACR/EULAR 2023), tireoidopatias (ATA 2026), epilepsia (AAN/AES/SMFM 2024), anemia (OMS 2024), doenças respiratórias, renais e autoimunes; referências, fluxos e matriz de 12 propostas visuais. Commits `689021a` e `bd84e3f`. **RASCUNHO EM REVISÃO:** sem imagens integradas/licenciadas e sem validação médica.
- **#278 — Ciclo menstrual e eixo hipotálamo–hipófise–ovário:** **JÁ PUBLICADA** e **auditada de modo não destrutivo**. HTML de 81.031 caracteres com um `<figure><img>` e cinco perguntas rápidas (não equivalem às questões completas do Prompt Magno); preservar capítulos, ampliar imagens e questões depois de aprovação. Relatório `docs/apostilas/LOTE_12_AUDITORIA_278_SEM_MODIFICAR_20261015.md`. Não foi alterada.
- **#238–249:** **12/12 manuscritos encontrados no GitHub**, todos em `rascunho-editorial-lote12.md` nos diretórios temáticos, com 17–33 mil caracteres aproximadamente; **0/12 correspondentes publicados** no catálogo Supabase. Não há `index.html` nos 12 diretórios. Auditoria de inventário/lacunas e 4 pontos de diretriz em `docs/apostilas/LOTE_12_AUDITORIA_238_249_20261015.md`. Todos necessitam aprofundamento, imagens licenciadas e revisão científica antes de publicação.

**Origem do plano:** `docs/apostilas/CONTINUAR_PROXIMO_CHAT_LOTES_11_13.md` na branch `audit/enamed-7areas-lotes-finais-20261015`, e `assets/js/apostilas-editorial-enamed-2026.js`.

## Pendências antes de certificar #268

1. Auditoria médico-científica independente e cotejo de diretrizes nacionais com ESC/EACTS, ACC/AHA, EACTS e protocolos locais.
2. Curadoria de no mínimo 10 candidatos visuais de fontes confiáveis, seleção por utilidade e **verificação individual de licença/atribuição**; otimização WebP e integração sem imagens de apostilas terceirizadas.
3. Conferir a farmacologia perioperatória, indicação de anticoagulação/antiagregação e critérios valvares conforme a versão de diretriz vigente e população.
4. Revisão editorial de redundância com #21 e #240, casos e questões, qualidade do layout e responsividade.
5. Registrar aprovação técnica antes de qualquer incorporação ao conteúdo consumido pelo site.

## Próxima execução sugerida

A auditoria inicial #238–249, a consolidação #266 e a conferência não destrutiva #278 foram registradas. **#267 expandida** e registrada em manuscrito editorial, ainda não publicável. **Próxima prioridade:** revisar e aprofundar #249 (violência sexual e direitos reprodutivos), #246 (afogamento), #247 (hiperêmese) e #248 (colestase) por criticidade, preservando seus rascunhos; manter a #278 intacta e todas as publicações suspensas até aprovação. Nenhum merge ou deploy.
