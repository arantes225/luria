# LURIA — Lote 1 do planejamento vigente (23 temas de 260)

> Mapeamento extraído em 14/10/2026 de `assets/js/cronograma-base-data.js` na `main`, que define os 180 primeiros temas. O painel `assets/js/apostilas-lotes-225.js` distribui 260 assuntos em 13 lotes; **Lote 1 = aulas 1–23**. Nome do segundo arquivo é legado, não a contagem atual.

O inventário histórico `LOTE_01_2026-10-14.md` tem 20 temas em recorte diferente e **não pode ser usado como status do Lote 1 oficial**. A tabela abaixo é o vínculo efetivo com a programação da plataforma, sem supor equivalência de títulos aproximados.

| Nº | Área | Tema no cronograma-base | Situação auditada nesta branch |
|---:|---|---|---|
| 01 | Clínica Médica | Síndromes coronarianas agudas | Rascunho em `apostilas/sindromes-coronarianas-agudas/content.json` — **não publicado, não certificado** |
| 02 | Cirurgia Geral | Avaliação pré-operatória e risco cirúrgico | Rascunho em `apostilas/avaliacao-pre-operatoria-risco-cirurgico/content.json` — **não publicado, não certificado** |
| 03 | Pediatria | Assistência ao recém-nascido em sala de parto | Correspondência com apostila existente **a verificar**; ainda sem rascunho vinculado nesta matriz |
| 04 | Ginecologia e Obstetrícia | Pré-natal de baixo risco | Correspondência com apostila existente **a verificar**; ainda sem rascunho vinculado nesta matriz |
| 05 | Medicina Preventiva | Princípios e diretrizes do SUS | Correspondência com apostila existente **a verificar**; ainda sem rascunho vinculado nesta matriz |
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

- Há **6 rascunhos autorais identificados** e vinculados às aulas 1, 2, 6, 7, 11 e 16. Nenhum deles tem aprovação final. O vínculo é editorial; não equivale a publicação.
- Os outros **17 temas precisam de inventário** dos arquivos existentes, correspondência com títulos/capítulos, benchmarking no Drive e leitura de fonte primária antes de editar/criar; não afirmar ausência sem varredura.
- O trabalho anterior em quatro apostilas de GO não deve ser contado automaticamente como cobertura de pré-natal, datação gestacional ou rastreamentos da primeira etapa.
- Não duplicar 'Assistência ao RN em sala de parto' e 'Reanimação neonatal': planejar fronteira pedagógica com reaproveitamento interno, mas preservar objetivos curriculares distintos.
- Cuidados perioperatórios pode cobrir parcialmente infecção de sítio cirúrgico e complicações pós-operatórias de lotes posteriores; evitar recriação redundante.
- Não criar `index.html`, inserir no catálogo, fazer merge ou deploy sem revisão médica humana, testes de autossuficiência e layout, e aprovação de imagens no Admin.

## Próximas verificações editoriais

1. Auditar temas 3–5 por correspondência com repositório e referências do Drive: assistência ao recém-nascido em sala de parto, pré-natal de baixo risco, princípios e diretrizes do SUS.
2. Rever os seis rascunhos com teste de questões representativas e crítica clínica antes de alterar seu status.
3. Conciliar diffs entre a `main` (260 temas) e a branch editorial antes de integrar.

**Fontes do mapeamento:** `assets/js/cronograma-base-data.js` (`main`); `assets/js/apostilas-lotes-225.js` (`main`). **Data:** 14/10/2026.