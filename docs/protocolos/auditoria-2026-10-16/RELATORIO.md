# Auditoria e preenchimento dos protocolos clínicos — 16/10/2026

## Escopo e ambiente
- Projeto: LURIA; tabela `public.clinical_protocols` do projeto Supabase Studyos (`sxdsfklllilhdyuamvvg`).
- Esta auditoria modificou **dados de produção** e preservou os backups nesta branch editorial; não fez merge, deploy do frontend nem alterações de schema/RLS.
- Contagem inicial e final: **420 protocolos**, dos quais **189 marcados como `verified` e 231 como `review_needed`**. A marca `verified` é herdada, não certificação médica conferida por esta auditoria.

## Correções aplicadas e verificadas

1. **Normalização de sinais de alarme e registro assistencial em 227 protocolos**: nas faixas 91–127 (37 registros) e nos outros 190 registros com inconsistências de formato, `red_flags` estruturados em objetos passaram a ser arrays de strings exibíveis na UI; `notification.text` foi preenchido a partir de `notification.items` nos casos apropriados, preservando o campo original.
   - Antes: 202 protocolos com sinais de alarme armazenados como objetos e 225 notificações com `items` sem `text`. Os conjuntos se sobrepunham.
   - Depois: **420/420** com alertas em formato renderizável e **420/420** com notificação ou registro textual visível.
   - As alterações não modificaram conteúdo clínico de sinais de alarme nem marcaram revisão como concluída.
2. **Enriquecimento clínico de 6 protocolos ainda pendentes**:
   - **92 — Apendicite aguda**: WSES 2025/publicado 2026: cirurgia em até 24 horas em não complicada e estável; antibiótico pós-operatório curto em casos complicados após controle de foco apropriado.
   - **95 — Colangite aguda**: cobertura antimicrobiana orientada a flora e risco; CPRE e descompressão precoces com tempo ajustado à gravidade; referências ASGE/Tokyo.
   - **96 — Pancreatite aguda**: preferência por Ringer lactato, hidratação moderada com reavaliações e dieta oral em 24–48h na forma leve tolerante.
   - **110 — Fasceíte necrosante**: LRINEC baixo não exclui diagnóstico; cirurgia urgente, reexploração geralmente 24–36h e penicilina + clindamicina no `S. pyogenes` documentado.
   - **113 — Manejo perioperatório de anticoagulantes**: ressalva à ponte com heparina, contextualizando recomendação condicional CHEST 2022 e possibilidade individual em alto risco no AHA/ACC 2024, sem prescrição universal.
   - **127 — Síndrome compartimental**: diretriz específica AAOS 2025 em substituição à homepage genérica; limitações de extrapolação a crianças e síndrome crônica.
3. **Complemento da seção `exams` em 6 procedimentos de emergência** (204, 205, 207, 236, 237, 245) com avaliação clínica e monitorização, deixando explícito que exames não podem retardar RCP, controle hemorrágico ou via aérea.
4. **Deduplicação de 10 referências URL idênticas** nos IDs 94, 102, 106, 112, 164, 246, 250, 255, 257 e 294; preservada a primeira ocorrência de cada URL.
5. **Correção em código da interface apenas nesta branch**, em `assets/js/trabalho-protocolos.js`: ao detectar texto iniciado por `Registro assistencial:`, o cabeçalho futuro será "Registro assistencial" (em vez de "Notificação"). Este ajuste **ainda não está na main**.

## Testes de verificação pós-escrita (consultas reais ao banco)
- 420 registros após alterações, 189 `verified`, 231 `review_needed`.
- Nenhum `red_flags` em formato de objeto, nenhuma `notification` sem `text`.
- Nenhuma seção `exams`, `treatment` ou `source_refs` vazia.
- Nenhum link bibliográfico URL idêntico duplicado; 831 referências totais cadastradas.
- Os seis enriquecimentos científicos persistidos e ainda `review_needed`.
- Nenhum status alterado por esta execução.

## Pendências e riscos — não confundir com aprovação clínica final
- **Revisão individual e confronto afirmação–fonte** para os 231 protocolos `review_needed`, com atenção a dosagens, contraindicações, populações especiais, datas e recomendações locais do Ministério da Saúde e sociedades.
- **7 registros `verified` sem data de revisão** (IDs 2, 3, 5, 6, 8, 11, 293) e **3 `review_needed` com data de revisão antiga** (58, 59, 60); não corrigir cosmeticamente para simular validação.
- **12 links bibliográficos genéricos às homepages** em IDs 65, 104, 105, 159, 178, 180, 201, 322, 323, 324, 402 e 403; substituir por documento específico mediante localização e conferência de fonte.
- **Rever campo `setting`**: emergências como choque e colangite estão como `ambulatorial`. Mudar apenas com definição documentada do vocabulário e das consequências para filtros de UI.
- A qualidade médica **não pode ser inferida** da presença formal de campos. Fazer checagem substantiva, revisão humana de conduta clínica, exames, doses e protocolos institucionais antes de publicar como orientação médica definitiva.
- Integração de código de interface na main e inspeção visual no navegador/PWA dependem de revisão de PR e fluxo normal; não foram feitos aqui.

## Backups rastreáveis
- `backup-antes-normalizacao-91-127.json`: 37 protocolos originais dos campos normalizados.
- `backup-restantes-estrutura.json`: 190 outros registros estruturais.
- `backup-antes-auditoria-clinica-8.json`: 8 documentos anteriores à primeira ampliação e limpeza de fontes.
- `backup-referencias-duplicadas.json`: 6 documentos de outras categorias com links redundantes.
- `backup-antes-fontes-113-127.json`: 2 documentos antes das fontes específicas.
- `backup-exames-vazios-seis.json`: 6 documentos antes de complementos dos exames.

## Fontes nucleares efetivamente consultadas
- WSES Jerusalem Guidelines 2025, JAMA Surgery 2026: https://pubmed.ncbi.nlm.nih.gov/41604201/
- ASGE Cholangitis Guideline, 2021: https://www.asge.org/home/resources/publications/guidelines/asge-guideline-on-the-management-of-cholangitis
- ACG Acute Pancreatitis: https://pmc.ncbi.nlm.nih.gov/articles/PMC13221274/
- IDSA Necrotizing Fasciitis: https://www.idsociety.org/practice-guideline/skin-and-soft-tissue-infections/
- CHEST perioperative antithrombotic guideline: https://journal.chestnet.org/article/S0012-3692%2822%2901359-9/abstract
- AHA/ACC 2024 cardiovascular perioperative management: https://www.jacc.org/doi/10.1016/j.jacc.2024.06.013
- AAOS Acute Compartment Syndrome, 2025: https://www.aaos.org/quality/quality-programs/acute-compartment-syndrome/
- DAS difficult airway, 2025: https://doi.org/10.1016/j.bja.2025.10.006
- AHA/Red Cross 2024 first aid: https://cpr.heart.org/en/resuscitation-science/2024-first-aid-guidelines
