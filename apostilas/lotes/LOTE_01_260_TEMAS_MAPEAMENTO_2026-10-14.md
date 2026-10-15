# LURIA — Lote 1 do planejamento vigente (23 temas de 260)

> Mapeamento extraído em 14/10/2026 de `assets/js/cronograma-base-data.js` na `main`, que define os 180 primeiros temas. O painel `assets/js/apostilas-lotes-225.js` distribui 260 assuntos em 13 lotes; **Lote 1 = aulas 1–23**. Nome do segundo arquivo é legado, não a contagem atual.

O inventário histórico `LOTE_01_2026-10-14.md` tem 20 temas em recorte diferente e **não pode ser usado como status do Lote 1 oficial**. A tabela abaixo é o vínculo efetivo com a programação da plataforma, sem supor equivalência de títulos aproximados.

| Nº | Área | Tema no cronograma-base | Situação auditada nesta branch |
|---:|---|---|---|
| 01 | Clínica Médica | Síndromes coronarianas agudas | Rascunho em `apostilas/sindromes-coronarianas-agudas/content.json` — **não publicado, não certificado** |
| 02 | Cirurgia Geral | Avaliação pré-operatória e risco cirúrgico | Rascunho em `apostilas/avaliacao-pre-operatoria-risco-cirurgico/content.json` — **não publicado, não certificado** |
| 03 | Pediatria | Assistência ao recém-nascido em sala de parto | Rascunho revisado em `apostilas/assistencia-recem-nascido-sala-parto/content.json`; 13 seções, 10 casos, 18 questões e triagem de ~78 mil caracteres aparentes — **não certificado, não publicado** |
| 04 | Ginecologia e Obstetrícia | Pré-natal de baixo risco | HTML preexistente preservado em `apostilas/pre-natal-baixo-risco/index.html`; revisão parcial e novo módulo original sobre prevenção da pré-eclâmpsia, caso e questões; **não certificado** |
| 05 | Medicina Preventiva | Princípios e diretrizes do SUS | Rascunho original em `apostilas/principios-diretrizes-sus/content.json`, 16 seções, 7 casos, 15 questões, triagem ~69.979 caracteres aparentes — **não publicado/não certificado** |
| 06 | Clínica Médica | Insuficiência cardíaca | Rascunho em `apostilas/insuficiencia-cardiaca/content.json` — **não publicado, não certificado** |
| 07 | Cirurgia Geral | Cuidados perioperatórios | Rascunho em `apostilas/cuidados-perioperatorios-prevencao-complicacoes/content.json` — **não publicado, não certificado** |
| 08 | Pediatria | Reanimação neonatal | Correspondência com apostila existente **a verificar**; ainda sem rascunho vinculado nesta matriz |
| 09 | Ginecologia e Obstetrícia | Diagnóstico e datação da gestação | Correspondência com apostila existente **a verificar**; ainda sem rascunho vinculado nesta matriz |
| 10 | Medicina Preventiva | Lei nº 8.080/1990 | Correspondência com apostila existente **a verificar**; ainda sem rascunho vinculado nesta matriz |
| 11 | Clínica Médica | Hipertensão arterial sistêmica | Rascunho em `apostilas/hipertensao-arterial-sistemica/content.json` — **não publicado, não certificado** |
| 12 | Cirurgia Geral | Resposta metabólica ao trauma | Correspondência com apostila existente **a verificar**; ainda sem rascunho vinculado nesta matriz |
| 13 | Pediatria | Prematuridade e baixo peso ao nascer | Correspondência com apostila existente **a verificar**; ainda sem rascunho vinculado nesta matriz |
| 14 | Ginecologia e Obstetrícia | Exames e rastreamentos no pré-natal | Correspondência com apostila existente **a verificar**; ainda sem rascunho vinculado nesta matriz |
| 15 | Medicina Preventiva | Lei nº 8.142/1990 | Correspondência com apostila existente **a verificar**; ainda sem rascunho vinculado nesta matriz |
| 16 | Clínica Médica | Arritmias e fibrilação atrial | Rascunho em `apostilas/arritmias-fibrilacao-atrial/content.json` — **não publicado, não certificado** |
| 17 | Cirurgia Geral | Reposição volêmica e distúrbios hidroeletrolíticos no paciente cirúrgico | Correspondência com apostila existente **a verificar**; ainda sem rascunho vinculado nesta matriz |
| 18 | Pediatria | Icterícia neonatal | Correspondência com apostila existente **a verificar**; ainda sem rascunho vinculado nesta matriz |
| 19 | Ginecologia e Obstetrícia | Vacinação e suplementação na gestação | Correspondência com apostila existente **a verificar**; ainda sem rascunho vinculado nesta matriz |
| 20 | Medicina Preventiva | Atenção Primária à Saúde e seus atributos | Correspondência com apostila existente **a verificar**; ainda sem rascunho vinculado nesta matriz |
| 21 | Clínica Médica | Valvopatias | Correspondência com apostila existente **a verificar**; ainda sem rascunho vinculado nesta matriz |
| 22 | Cirurgia Geral | Choque hemorrágico | Correspondência com apostila existente **a verificar**; ainda sem rascunho vinculado nesta matriz |
| 23 | Pediatria | Sepse neonatal | Correspondência com apostila existente **a verificar**; ainda sem rascunho vinculado nesta matriz |


## Orientação de produção

- Há **8 rascunhos `content.json` identificados** (aulas 1, 2, 3, 5, 6, 7, 11 e 16) e **uma apostila HTML preexistente com revisão parcial** (aula 4). Nenhum desses nove temas recebeu certificação final. O vínculo é editorial; não equivale a uma nova publicação.
- Os outros **14 temas precisam de inventário** dos arquivos existentes, correspondência com títulos/capítulos, benchmarking no Drive e leitura de fonte primária antes de editar/criar; não afirmar ausência sem varredura.
- O trabalho anterior em quatro apostilas de GO não deve ser contado automaticamente como cobertura de pré-natal, datação gestacional ou rastreamentos da primeira etapa.
- Não duplicar 'Assistência ao RN em sala de parto' e 'Reanimação neonatal': planejar fronteira pedagógica com reaproveitamento interno, mas preservar objetivos curriculares distintos.
- Cuidados perioperatórios pode cobrir parcialmente infecção de sítio cirúrgico e complicações pós-operatórias de lotes posteriores; evitar recriação redundante.
- Não criar `index.html`, inserir no catálogo, fazer merge ou deploy sem revisão médica humana, testes de autossuficiência e layout, e aprovação de imagens no Admin.

## Próximas verificações editoriais

1. Auditar o tema 008 (reanimação neonatal), distinguindo-o do tema 003. Os temas 003–005 seguem sem certificação, assim como os demais rascunhos.
2. Rever os seis rascunhos com teste de questões representativas e crítica clínica antes de alterar seu status.
3. Conciliar diffs entre a `main` (260 temas) e a branch editorial antes de integrar.

**Fontes do mapeamento:** `assets/js/cronograma-base-data.js` (`main`); `assets/js/apostilas-lotes-225.js` (`main`). **Data:** 14/10/2026.

## Continuação de 14/10/2026 — temas 003 e 004

- **003 / Assistência ao recém-nascido em sala de parto**: preservado `apostilas/assistencia-recem-nascido-sala-parto/content.json`; expansão com base na SBP 2026 (≥34 e <34 semanas), AHA/AAP 2025, MS 2026 e calendário PNI. Documento `Reanimação Neonatal.pdf` do Drive aberto (autoria institucional não confirmada): benchmarking somente, texto original. Auditoria estrutural: 13 capítulos, 10 títulos de casos, 18 questões, 13 referências e cerca de 78.416 caracteres aparentes em blocos do JSON, sem erros de IDs no sumário. Métrica automática **não** comprova autossuficiência. Nenhum `index.html` criado, sem nova publicação. A reanimação avançada pertence à aula 008, não duplicar.
- **004 / Pré-natal de baixo risco**: HTML preexistente de 116.636 caracteres preservado e ampliado com módulo original de prevenção da pré-eclâmpsia, tabela de risco, fluxo, caso e três questões, passando a 125.180 caracteres serializados. Documentos do Drive `02 - ASSISTENCIA AO PRE-NATAL.pdf` (25.315 caracteres lidos) e `Pré-Natal.pdf` (1.603 caracteres lidos) foram abertos; conteúdo antigo sobre número mínimo de consultas não substitui orientação vigente da Linha de Cuidado MS (≥8 contatos). Cotejo primário: MS Linha de Cuidado Pré-natal, calendário vacinal 2026 e FEBRASGO 2023/2024. A LURIA já contemplava VSR desde 28 semanas; preservado. Inserido link de navegação no livro sem duplicar IDs. Não revisado visualmente em desktop/PWA.
- **Pendências comuns:** auditoria de duplicação semântica, revisão científica independente, testes de autossuficiência por questões, legibilidade móvel, reconciliação com alterações da `main`, curadoria de imagens e aprovação no Admin. **Sem merge/deploy realizado nesta continuação.**


## Continuação de 14/10/2026 — tema 005

- **Princípios e Diretrizes do SUS:** inventário completo dos diretórios `apostilas/` pela API GitHub; tema específico ausente. Benchmark do Drive `SUS.pdf` efetivamente aberto (2.670 caracteres de texto extraído), com autoria institucional não confirmada; utilizado apenas para mapear competências sem copiar conteúdo.
- **Registro editorial da etapa zero:** `apostilas/lotes/TEMA_005_SUS_AUDITORIA_2026-10-14.md`, sem IDs/URLs privados de Drive no repositório público.
- **Novo rascunho original:** `apostilas/principios-diretrizes-sus/content.json`, 16 seções, 7 casos e 15 questões com justificativas das alternativas. Fundamento: CF/88, Leis 8.080/8.142, Decreto 7.508, PNAB 2017 e Resolução CNS 453/2012. Organiza fronteira dos temas 010 (detalhes Lei 8.080) e 015 (detalhes Lei 8.142).
- **Auditoria automática do conteúdo salvo:** JSON válido; 16 IDs do sumário correspondem a 16 seções únicas; 181 blocos com tipos reconhecidos; 14 tabelas, aproximadamente 69.979 caracteres de texto aparente (não certifica ≥60k caracteres didáticos úteis); sem parágrafos textualmente idênticos detectados. O conteúdo está **em rascunho**, sem `index.html` ou publicação.
- **Pendências:** revisão jurídica/científica independente das versões consolidadas e alterações recentes, teste de cobertura e questões por especialistas, revisão semântica de redundâncias não literais, imagens/diagramas com curadoria se agregarem valor e aprovação no Admin, teste PWA/desktop e conciliação com main. **Nenhum merge ou deploy.**
