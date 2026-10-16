# Cadeia de produção — artefatos e ações pendentes

Data de corte: 16/10/2026. Snapshot de 36 branches editoriais/de auditoria; arquivos idênticos foram deduplicados por caminho e blob.

## Transições observadas

A ampliação é intencional: matérias foram incorporadas a apostilas existentes e outras receberam livros novos, incluindo lotes 10–13. A auditoria avalia se cada incorporação foi ensinada de modo coeso, referenciada e levada adiante na cadeia, sem tratar o aumento do catálogo como erro.

| Transição | Evidência | Problema / ação |
|---|---|---|
| Ampliação → destino | Matriz editorial ampliada: 280 entradas; 401 módulos com destino principal | Usar a matriz ampliada, localizar cada conteúdo incorporado no tema existente ou na nova apostila e conferir a profundidade; preservar remissões e evitar duplicação. |
| Tema → plano | PR #36 contém cinco planos; branches posteriores já produzem partes desses temas | Recalcular a fila pelos arquivos atuais e versões de branch, preservando o piloto como histórico. |
| Plano → conteúdo | Markdown central, pastas temáticas e content.json v2 coexistem | Registrar caminho/commit, tema, objetivos e status num controle de handoff; aproveitar a arquitetura existente. |
| Conteúdo → fonte | Bibliografias e notas estão dispersas; muitas páginas têm data de portal diferente de revisão científica | Matriz afirmação-fonte-trecho-versão-data, especialmente doses e condutas; não usar HTTP 200 como validação. |
| Conteúdo → revisão | Autodeclarações no rascunho e validadores de marcadores | Exigir evidência de revisão por capítulo e questões justificadas, distinguindo autochecagem e revisão humana. |
| Revisão → HTML | Gerador espera books/sections/body_html; parte do lote 01 já está em q/o/h | Adaptar o handoff sem criar segundo renderer ou descartar as seções existentes. Testar o contêiner para os 20 JSON sem index. |
| HTML → validação | build/audit/60k fazem triagens técnicas; manuscritos/branches ficam de fora | Somar auditoria de cadeia e validação individual, sem reduzir piso ou aceitar conteúdo artificial. |
| Curadoria → imagem | Banco com 93 aprovadas e 20 pendentes; renderer oculta/deduplica/limita | Conferir fonte/licença, legenda, achado e seção, depois testar URL e renderização; aprovação não comprova exibição. |
| Arquivo → catálogo | 18 registros publicados no banco e fallback local | Reconciliar rotas sem concluir que ausência no banco equivale a indisponibilidade. |
| Branch → integração | 36 branches e versões diferentes do mesmo caminho | Comparar versões e dependências; não fazer merge automático de lotes antigos sobre revisões novas. |
| Integração → publicação | Workflow de main pode disparar deploy | Só integrar após aprovação concreta; esta auditoria não faz merge ou deploy. |

## Limites verificados dos automatizadores

- build-apostilas-batch.cjs confere formato, extensão, repetição literal, marcadores, URLs HTTPS e bloqueia imagens diretas. Isso é útil, mas não comprova leitura das fontes, revisão médica, pertinência da bibliografia ou licença real.
- audit-apostilas-60k.mjs não mede os MD da cadeia; contar a pasta _rascunhos como caderno ausente distorce o inventário.
- audit-apostilas-batch.cjs seleciona pastas com index.html; arquivos estruturados sem contêiner e manuscritos não entram na mesma fila.
- O gerador permite até 50 entradas por execução. Distinguir lotes do catálogo ampliado de grupos operacionais: o pedido estabelece filas de trabalho de até 20 com subgrupos de até cinco; isso não obriga renumerar o catálogo ampliado.
- Não foi identificado um único manifesto completo ligando todos os temas, versões, evidências bibliográficas, imagens e aprovação. O relatório reúne o retrato, sem substituir o sistema de conteúdo existente.

## Ações por branch

### audit/enamed-7areas-lotes-finais-20261015

Commit `34ab4b5d8dda2863392f8738abbd055450564a57`; 19 arquivos editoriais diferentes da main no recorte; 0 content.json sem contêiner.

- Comparar o delta por conteúdo, não pela idade/nome da branch.
- Preservar conteúdos atuais da main e não interpretar mudança documental como validação clínica.
- Concluir referências, imagens e revisão individual dos artefatos relacionados abaixo antes da integração.

### editorial/apostila-266-oncologia-cabeca-pescoco-20261015

Commit `7ee4d30975ee2a750ed86a947eeb7f97afe321ef`; 1 arquivos editoriais diferentes da main no recorte; 0 content.json sem contêiner.

- Comparar o delta por conteúdo, não pela idade/nome da branch.
- Preservar conteúdos atuais da main e não interpretar mudança documental como validação clínica.
- Concluir referências, imagens e revisão individual dos artefatos relacionados abaixo antes da integração.

### editorial/apostilas-lote-01-etapa-01-20261014

Commit `58e8985785e79ca44f5aa3f9580b98bce418d264`; 51 arquivos editoriais diferentes da main no recorte; 20 content.json sem contêiner.

- Comparar o delta por conteúdo, não pela idade/nome da branch.
- Preservar conteúdos atuais da main e não interpretar mudança documental como validação clínica.
- Concluir referências, imagens e revisão individual dos artefatos relacionados abaixo antes da integração.

### editorial/apostilas-lote-02-asma-20261014

Commit `6b123c4a4b76995741faae765ac2acc7b8cbe9d4`; 17 arquivos editoriais diferentes da main no recorte; 0 content.json sem contêiner.

- Comparar o delta por conteúdo, não pela idade/nome da branch.
- Preservar conteúdos atuais da main e não interpretar mudança documental como validação clínica.
- Concluir referências, imagens e revisão individual dos artefatos relacionados abaixo antes da integração.

### editorial/apostilas-lote-03-trauma-20261015

Commit `035186f5a5b91c90649d010a583d745ca5995dd1`; 14 arquivos editoriais diferentes da main no recorte; 0 content.json sem contêiner.

- Comparar o delta por conteúdo, não pela idade/nome da branch.
- Preservar conteúdos atuais da main e não interpretar mudança documental como validação clínica.
- Concluir referências, imagens e revisão individual dos artefatos relacionados abaixo antes da integração.

### editorial/inventario-225-piloto

Commit `554206a7c05b69acfa6b1f2f5736a8de84974fdb`; 82 arquivos editoriais diferentes da main no recorte; 0 content.json sem contêiner.

- Comparar o delta por conteúdo, não pela idade/nome da branch.
- Preservar conteúdos atuais da main e não interpretar mudança documental como validação clínica.
- Concluir referências, imagens e revisão individual dos artefatos relacionados abaixo antes da integração.

### editorial/lote-03-auditoria-20261014

Commit `8533876dacfe0f0a6503682017ea5572e1e88888`; 34 arquivos editoriais diferentes da main no recorte; 0 content.json sem contêiner.

- Comparar o delta por conteúdo, não pela idade/nome da branch.
- Preservar conteúdos atuais da main e não interpretar mudança documental como validação clínica.
- Concluir referências, imagens e revisão individual dos artefatos relacionados abaixo antes da integração.

### editorial/lote-04-aula067-trauma-pelvico-geniturinario-20261015

Commit `16ce93f6139c30faf0cb4b7d301b1d57a01c0863`; 1 arquivos editoriais diferentes da main no recorte; 0 content.json sem contêiner.

- Comparar o delta por conteúdo, não pela idade/nome da branch.
- Preservar conteúdos atuais da main e não interpretar mudança documental como validação clínica.
- Concluir referências, imagens e revisão individual dos artefatos relacionados abaixo antes da integração.

### editorial/lote-04-aula068-desnutricao-pediatrica-20261015

Commit `c489ab99292ae844cee93ff5ac739685419c36eb`; 1 arquivos editoriais diferentes da main no recorte; 0 content.json sem contêiner.

- Comparar o delta por conteúdo, não pela idade/nome da branch.
- Preservar conteúdos atuais da main e não interpretar mudança documental como validação clínica.
- Concluir referências, imagens e revisão individual dos artefatos relacionados abaixo antes da integração.

### editorial/lote-04-aula65-vigilancia-sanitaria-20261015

Commit `9c3b8871a8d5e8dbd40596a496ebbe662b78d90e`; 1 arquivos editoriais diferentes da main no recorte; 0 content.json sem contêiner.

- Comparar o delta por conteúdo, não pela idade/nome da branch.
- Preservar conteúdos atuais da main e não interpretar mudança documental como validação clínica.
- Concluir referências, imagens e revisão individual dos artefatos relacionados abaixo antes da integração.

### editorial/lote-04-aula66-derrame-pleural-20261015

Commit `14383f0cd290b5862957d375fba13dbc1f81cced`; 1 arquivos editoriais diferentes da main no recorte; 0 content.json sem contêiner.

- Comparar o delta por conteúdo, não pela idade/nome da branch.
- Preservar conteúdos atuais da main e não interpretar mudança documental como validação clínica.
- Concluir referências, imagens e revisão individual dos artefatos relacionados abaixo antes da integração.

### editorial/lote-05-103-tuberculose-infancia-20261015

Commit `7680fd40fde855a0aa1530158db8bf6ae9843374`; 37 arquivos editoriais diferentes da main no recorte; 0 content.json sem contêiner.

- Comparar o delta por conteúdo, não pela idade/nome da branch.
- Preservar conteúdos atuais da main e não interpretar mudança documental como validação clínica.
- Concluir referências, imagens e revisão individual dos artefatos relacionados abaixo antes da integração.

### editorial/lote-05-105-estudos-epidemiologicos-20261014

Commit `3d2bec7daf60f37848c38e882340561bd5baba14`; 24 arquivos editoriais diferentes da main no recorte; 0 content.json sem contêiner.

- Comparar o delta por conteúdo, não pela idade/nome da branch.
- Preservar conteúdos atuais da main e não interpretar mudança documental como validação clínica.
- Concluir referências, imagens e revisão individual dos artefatos relacionados abaixo antes da integração.

### editorial/lote-05-106-lesao-renal-aguda-20261015

Commit `6820961799a8c31d4c68094eea3818764230a43b`; 25 arquivos editoriais diferentes da main no recorte; 0 content.json sem contêiner.

- Comparar o delta por conteúdo, não pela idade/nome da branch.
- Preservar conteúdos atuais da main e não interpretar mudança documental como validação clínica.
- Concluir referências, imagens e revisão individual dos artefatos relacionados abaixo antes da integração.

### editorial/lote-05-107-hernias-parede-20261015

Commit `5ce51e242f75dde64aeb6c407af2d822e5cacfeb`; 26 arquivos editoriais diferentes da main no recorte; 0 content.json sem contêiner.

- Comparar o delta por conteúdo, não pela idade/nome da branch.
- Preservar conteúdos atuais da main e não interpretar mudança documental como validação clínica.
- Concluir referências, imagens e revisão individual dos artefatos relacionados abaixo antes da integração.

### editorial/lote-05-108-itu-infancia-20261015

Commit `94820fd6da395c8f67f62d4426369f3f88e7d285`; 27 arquivos editoriais diferentes da main no recorte; 0 content.json sem contêiner.

- Comparar o delta por conteúdo, não pela idade/nome da branch.
- Preservar conteúdos atuais da main e não interpretar mudança documental como validação clínica.
- Concluir referências, imagens e revisão individual dos artefatos relacionados abaixo antes da integração.

### editorial/lote-05-109-puerperio-20261015

Commit `43c7f8d4e7215923850733a1250bb7f65fb8b81f`; 29 arquivos editoriais diferentes da main no recorte; 0 content.json sem contêiner.

- Comparar o delta por conteúdo, não pela idade/nome da branch.
- Preservar conteúdos atuais da main e não interpretar mudança documental como validação clínica.
- Concluir referências, imagens e revisão individual dos artefatos relacionados abaixo antes da integração.

### editorial/lote-05-110-ensaios-revisoes-20261015

Commit `5d18ebd3ffa79c1c9886933b2f2640069566620c`; 30 arquivos editoriais diferentes da main no recorte; 0 content.json sem contêiner.

- Comparar o delta por conteúdo, não pela idade/nome da branch.
- Preservar conteúdos atuais da main e não interpretar mudança documental como validação clínica.
- Concluir referências, imagens e revisão individual dos artefatos relacionados abaixo antes da integração.

### editorial/lote-05-111-drc-20261015

Commit `8b4fc3101ba752c5d6b5b1284a49268ae709dc2c`; 31 arquivos editoriais diferentes da main no recorte; 0 content.json sem contêiner.

- Comparar o delta por conteúdo, não pela idade/nome da branch.
- Preservar conteúdos atuais da main e não interpretar mudança documental como validação clínica.
- Concluir referências, imagens e revisão individual dos artefatos relacionados abaixo antes da integração.

### editorial/lote-05-112-diverticulite-20261015

Commit `553484d6d4841ab956d9b029979be36bf4c64049`; 32 arquivos editoriais diferentes da main no recorte; 0 content.json sem contêiner.

- Comparar o delta por conteúdo, não pela idade/nome da branch.
- Preservar conteúdos atuais da main e não interpretar mudança documental como validação clínica.
- Concluir referências, imagens e revisão individual dos artefatos relacionados abaixo antes da integração.

### editorial/lote-05-113-nefrotica-nefritica-20261015

Commit `e0136bae51c5b5f09f1eb756d5cd247fb234d2ce`; 33 arquivos editoriais diferentes da main no recorte; 0 content.json sem contêiner.

- Comparar o delta por conteúdo, não pela idade/nome da branch.
- Preservar conteúdos atuais da main e não interpretar mudança documental como validação clínica.
- Concluir referências, imagens e revisão individual dos artefatos relacionados abaixo antes da integração.

### editorial/lote-05-114-infeccao-puerperal-20261015

Commit `254d7726f460d75b988412b0ff3f298f342c7237`; 34 arquivos editoriais diferentes da main no recorte; 0 content.json sem contêiner.

- Comparar o delta por conteúdo, não pela idade/nome da branch.
- Preservar conteúdos atuais da main e não interpretar mudança documental como validação clínica.
- Concluir referências, imagens e revisão individual dos artefatos relacionados abaixo antes da integração.

### editorial/lote-05-115-vieses-causalidade-20261015

Commit `27b0cbff882fc26905c2e4b7bf476127c559bcc3`; 35 arquivos editoriais diferentes da main no recorte; 0 content.json sem contêiner.

- Comparar o delta por conteúdo, não pela idade/nome da branch.
- Preservar conteúdos atuais da main e não interpretar mudança documental como validação clínica.
- Concluir referências, imagens e revisão individual dos artefatos relacionados abaixo antes da integração.

### editorial/lote-05-auditoria-clinica-20261014

Commit `d83e87709d3bc2954263ab39737a82d20421c4b2`; 21 arquivos editoriais diferentes da main no recorte; 0 content.json sem contêiner.

- Comparar o delta por conteúdo, não pela idade/nome da branch.
- Preservar conteúdos atuais da main e não interpretar mudança documental como validação clínica.
- Concluir referências, imagens e revisão individual dos artefatos relacionados abaixo antes da integração.

### editorial/lote-05-hpp-tardia-asma-20261014

Commit `38bd13a43ef2ec10fe9c42119e79ebadbd5ab02b`; 23 arquivos editoriais diferentes da main no recorte; 0 content.json sem contêiner.

- Comparar o delta por conteúdo, não pela idade/nome da branch.
- Preservar conteúdos atuais da main e não interpretar mudança documental como validação clínica.
- Concluir referências, imagens e revisão individual dos artefatos relacionados abaixo antes da integração.

### editorial/lote-06-auditoria-20261014

Commit `c4dd1cb1938e8a3ba16ebc86e4c091efff028976`; 71 arquivos editoriais diferentes da main no recorte; 0 content.json sem contêiner.

- Comparar o delta por conteúdo, não pela idade/nome da branch.
- Preservar conteúdos atuais da main e não interpretar mudança documental como validação clínica.
- Concluir referências, imagens e revisão individual dos artefatos relacionados abaixo antes da integração.

### editorial/lote-06-continuacao-132-137-20261015

Commit `2e25a301b8d1cebd6e30c1c4f730a1558987bb1b`; 26 arquivos editoriais diferentes da main no recorte; 0 content.json sem contêiner.

- Comparar o delta por conteúdo, não pela idade/nome da branch.
- Preservar conteúdos atuais da main e não interpretar mudança documental como validação clínica.
- Concluir referências, imagens e revisão individual dos artefatos relacionados abaixo antes da integração.

### editorial/lote-07-aula-123-cps-2026-20261015

Commit `f1bfa47f16d7f646de800f24a92789e037f66640`; 9 arquivos editoriais diferentes da main no recorte; 0 content.json sem contêiner.

- Comparar o delta por conteúdo, não pela idade/nome da branch.
- Preservar conteúdos atuais da main e não interpretar mudança documental como validação clínica.
- Concluir referências, imagens e revisão individual dos artefatos relacionados abaixo antes da integração.

### editorial/lote-08-inventario-e-producao-20261014

Commit `54468b6e5f6245c04d331bdf1ac8e3886bbac6f3`; 34 arquivos editoriais diferentes da main no recorte; 0 content.json sem contêiner.

- Comparar o delta por conteúdo, não pela idade/nome da branch.
- Preservar conteúdos atuais da main e não interpretar mudança documental como validação clínica.
- Concluir referências, imagens e revisão individual dos artefatos relacionados abaixo antes da integração.

### editorial/lote-09-producao-20261015

Commit `edff1b463bf352f87bb25e74d1d8809bf8ba98e7`; 9 arquivos editoriais diferentes da main no recorte; 0 content.json sem contêiner.

- Comparar o delta por conteúdo, não pela idade/nome da branch.
- Preservar conteúdos atuais da main e não interpretar mudança documental como validação clínica.
- Concluir referências, imagens e revisão individual dos artefatos relacionados abaixo antes da integração.

### editorial/lote-10-204-225

Commit `7249798b99b9edeb001549f214d85f5ddcccd138`; 13 arquivos editoriais diferentes da main no recorte; 0 content.json sem contêiner.

- Comparar o delta por conteúdo, não pela idade/nome da branch.
- Preservar conteúdos atuais da main e não interpretar mudança documental como validação clínica.
- Concluir referências, imagens e revisão individual dos artefatos relacionados abaixo antes da integração.

### editorial/lote-10-apostilas-20261015

Commit `c6d1a1b196a36ba686d88e4e0cca35286ff6cdab`; 29 arquivos editoriais diferentes da main no recorte; 0 content.json sem contêiner.

- Comparar o delta por conteúdo, não pela idade/nome da branch.
- Preservar conteúdos atuais da main e não interpretar mudança documental como validação clínica.
- Concluir referências, imagens e revisão individual dos artefatos relacionados abaixo antes da integração.

### editorial/lote-11-demensias-20261015

Commit `9afcb000a54382a4e6118e1ebb3be9768bcb6610`; 17 arquivos editoriais diferentes da main no recorte; 0 content.json sem contêiner.

- Comparar o delta por conteúdo, não pela idade/nome da branch.
- Preservar conteúdos atuais da main e não interpretar mudança documental como validação clínica.
- Concluir referências, imagens e revisão individual dos artefatos relacionados abaixo antes da integração.

### editorial/lote-12-producao-20261015

Commit `47485f3b8c2b379fa0fe8967a8d75598ebdc1a57`; 41 arquivos editoriais diferentes da main no recorte; 0 content.json sem contêiner.

- Comparar o delta por conteúdo, não pela idade/nome da branch.
- Preservar conteúdos atuais da main e não interpretar mudança documental como validação clínica.
- Concluir referências, imagens e revisão individual dos artefatos relacionados abaixo antes da integração.

### editorial/lote-13-preenchimento-20261015

Commit `31b271d3f0090f1589598cc7ed6baf382de8ed3d`; 39 arquivos editoriais diferentes da main no recorte; 0 content.json sem contêiner.

- Comparar o delta por conteúdo, não pela idade/nome da branch.
- Preservar conteúdos atuais da main e não interpretar mudança documental como validação clínica.
- Concluir referências, imagens e revisão individual dos artefatos relacionados abaixo antes da integração.

### editorial/lote04-aula64-placenta-dpp-20261014

Commit `201eec85c15371a487a87a861cb1c82bb58d1ee8`; 9 arquivos editoriais diferentes da main no recorte; 0 content.json sem contêiner.

- Comparar o delta por conteúdo, não pela idade/nome da branch.
- Preservar conteúdos atuais da main e não interpretar mudança documental como validação clínica.
- Concluir referências, imagens e revisão individual dos artefatos relacionados abaixo antes da integração.

## Todos os caminhos de conteúdo fora da main ou em versão divergente

| Artefato / ficha | Versões | Branches | Próxima etapa |
|---|---:|---|---|
| [apostilas/afogamento-emergencias-ambientais-infancia/rascunho-editorial-lote12.md](cadeia/afogamento-emergencias-ambientais-infancia-rascunho-editorial-lote12-md.md) | 1 | editorial/lote-12-producao-20261015 | Conteúdo fora da main |
| [apostilas/alteracoes-fisiologicas-da-gestacao/index.html](cadeia/alteracoes-fisiologicas-da-gestacao-index-html.md) | 1 | editorial/apostilas-lote-01-etapa-01-20261014 | Comparar com main |
| [apostilas/amenorreia/index.html](cadeia/amenorreia-index-html.md) | 1 | editorial/lote-07-aula-123-cps-2026-20261015 | Comparar com main |
| [apostilas/aneurisma-aorta-emergencias-vasculares/rascunho-editorial-lote12.md](cadeia/aneurisma-aorta-emergencias-vasculares-rascunho-editorial-lote12-md.md) | 1 | editorial/lote-12-producao-20261015 | Conteúdo fora da main |
| [apostilas/LOTE_03_ANDAMENTO_2026-10-14.md](cadeia/LOTE-03-ANDAMENTO-2026-10-14-md.md) | 1 | editorial/lote-03-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/arritmias-fibrilacao-atrial/content.json](cadeia/arritmias-fibrilacao-atrial-content-json.md) | 1 | editorial/apostilas-lote-01-etapa-01-20261014 | Conteúdo fora da main |
| [apostilas/assistencia-ao-parto/index.html](cadeia/assistencia-ao-parto-index-html.md) | 1 | editorial/apostilas-lote-01-etapa-01-20261014 | Comparar com main |
| [apostilas/assistencia-recem-nascido-sala-parto/content.json](cadeia/assistencia-recem-nascido-sala-parto-content-json.md) | 1 | editorial/apostilas-lote-01-etapa-01-20261014 | Conteúdo fora da main |
| [apostilas/atencao-primaria-saude-atributos/content.json](cadeia/atencao-primaria-saude-atributos-content-json.md) | 1 | editorial/apostilas-lote-01-etapa-01-20261014 | Conteúdo fora da main |
| [apostilas/avaliacao-pre-operatoria-risco-cirurgico/content.json](cadeia/avaliacao-pre-operatoria-risco-cirurgico-content-json.md) | 1 | editorial/apostilas-lote-01-etapa-01-20261014 | Conteúdo fora da main |
| [apostilas/avaliacao-vitalidade-fetal/index.html](cadeia/avaliacao-vitalidade-fetal-index-html.md) | 1 | editorial/apostilas-lote-01-etapa-01-20261014 | Comparar com main |
| [apostilas/cancer-colo-utero-hpv/content.json](cadeia/cancer-colo-utero-hpv-content-json.md) | 2 | editorial/apostilas-lote-02-asma-20261014<br>editorial/inventario-225-piloto<br>editorial/lote-03-auditoria-20261014<br>editorial/lote-06-auditoria-20261014<br>editorial/apostilas-lote-01-etapa-01-20261014 | Comparar com main |
| [apostilas/cancer-de-mama/index.html](cadeia/cancer-de-mama-index-html.md) | 1 | editorial/apostilas-lote-01-etapa-01-20261014<br>editorial/apostilas-lote-02-asma-20261014<br>editorial/inventario-225-piloto<br>editorial/lote-03-auditoria-20261014<br>editorial/lote-06-auditoria-20261014<br>editorial/lote-08-inventario-e-producao-20261014<br>editorial/lote04-aula64-placenta-dpp-20261014 | Comparar com main |
| [apostilas/catarata-glaucoma-retinopatias/rascunho-editorial-lote12.md](cadeia/catarata-glaucoma-retinopatias-rascunho-editorial-lote12-md.md) | 1 | editorial/lote-12-producao-20261015 | Conteúdo fora da main |
| [apostilas/choque-circulatorio/index.html](cadeia/choque-circulatorio-index-html.md) | 1 | editorial/lote-03-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/cirurgia-cardiovascular-para-o-generalista/rascunho-editorial-lote12.md](cadeia/cirurgia-cardiovascular-para-o-generalista-rascunho-editorial-lote12-md.md) | 1 | editorial/lote-12-producao-20261015 | Conteúdo fora da main |
| [apostilas/colestase-intra-hepatica-gestacao/rascunho-editorial-lote12.md](cadeia/colestase-intra-hepatica-gestacao-rascunho-editorial-lote12-md.md) | 1 | editorial/lote-12-producao-20261015 | Conteúdo fora da main |
| [apostilas/cuidados-perioperatorios-prevencao-complicacoes/content.json](cadeia/cuidados-perioperatorios-prevencao-complicacoes-content-json.md) | 1 | editorial/apostilas-lote-01-etapa-01-20261014 | Conteúdo fora da main |
| [apostilas/diagnostico-datacao-gestacao/content.json](cadeia/diagnostico-datacao-gestacao-content-json.md) | 1 | editorial/apostilas-lote-01-etapa-01-20261014 | Conteúdo fora da main |
| [apostilas/doenca-celiaca-ma-absorcao/rascunho-editorial-lote12.md](cadeia/doenca-celiaca-ma-absorcao-rascunho-editorial-lote12-md.md) | 1 | editorial/lote-12-producao-20261015 | Conteúdo fora da main |
| [apostilas/endoscopia-digestiva-urgencias-endoscopicas/rascunho-editorial-lote12.md](cadeia/endoscopia-digestiva-urgencias-endoscopicas-rascunho-editorial-lote12-md.md) | 1 | editorial/lote-12-producao-20261015 | Conteúdo fora da main |
| [apostilas/exames-rastreamentos-pre-natal/content.json](cadeia/exames-rastreamentos-pre-natal-content-json.md) | 1 | editorial/apostilas-lote-01-etapa-01-20261014 | Conteúdo fora da main |
| [apostilas/financiamento-gestao-sus/index.html](cadeia/financiamento-gestao-sus-index-html.md) | 1 | editorial/lote-03-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/hiperemese-gravidica/rascunho-editorial-lote12.md](cadeia/hiperemese-gravidica-rascunho-editorial-lote12-md.md) | 1 | editorial/lote-12-producao-20261015 | Conteúdo fora da main |
| [apostilas/hipertensao-arterial-sistemica/content.json](cadeia/hipertensao-arterial-sistemica-content-json.md) | 1 | editorial/apostilas-lote-01-etapa-01-20261014 | Conteúdo fora da main |
| [apostilas/ictericia-neonatal/content.json](cadeia/ictericia-neonatal-content-json.md) | 1 | editorial/apostilas-lote-01-etapa-01-20261014 | Conteúdo fora da main |
| [apostilas/imunizacoes-infancia/index.html](cadeia/imunizacoes-infancia-index-html.md) | 1 | editorial/lote-03-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/insuficiencia-cardiaca/content.json](cadeia/insuficiencia-cardiaca-content-json.md) | 1 | editorial/apostilas-lote-01-etapa-01-20261014 | Conteúdo fora da main |
| [apostilas/intercorrencias-clinicas-na-gestacao/rascunho-editorial-lote12.md](cadeia/intercorrencias-clinicas-na-gestacao-rascunho-editorial-lote12-md.md) | 1 | editorial/lote-12-producao-20261015 | Conteúdo fora da main |
| [apostilas/lei-8080-1990/content.json](cadeia/lei-8080-1990-content-json.md) | 1 | editorial/apostilas-lote-01-etapa-01-20261014 | Conteúdo fora da main |
| [apostilas/lei-8142-1990/content.json](cadeia/lei-8142-1990-content-json.md) | 1 | editorial/apostilas-lote-01-etapa-01-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-03/57-trauma-toracico.md](cadeia/-rascunhos-lote-03-57-trauma-toracico-md.md) | 1 | editorial/lote-03-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-03/48-imunizacoes-infancia.md](cadeia/-rascunhos-lote-03-48-imunizacoes-infancia-md.md) | 1 | editorial/lote-03-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-03/45-controle-social-sus.md](cadeia/-rascunhos-lote-03-45-controle-social-sus-md.md) | 1 | editorial/lote-03-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-03/42-VALIDACAO-HTML.md](cadeia/-rascunhos-lote-03-42-VALIDACAO-HTML-md.md) | 1 | editorial/lote-03-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-03/47-VALIDACAO-HTML.md](cadeia/-rascunhos-lote-03-47-VALIDACAO-HTML-md.md) | 1 | editorial/lote-03-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-03/42-tecnica-cirurgica.md](cadeia/-rascunhos-lote-03-42-tecnica-cirurgica-md.md) | 1 | editorial/lote-03-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-03/41-choque-circulatorio.md](cadeia/-rascunhos-lote-03-41-choque-circulatorio-md.md) | 1 | editorial/lote-03-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-03/47-trauma-atendimento-inicial.md](cadeia/-rascunhos-lote-03-47-trauma-atendimento-inicial-md.md) | 1 | editorial/lote-03-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-03/46-asma.md](cadeia/-rascunhos-lote-03-46-asma-md.md) | 1 | editorial/lote-03-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-03/56-pneumonia-adquirida-comunidade.md](cadeia/-rascunhos-lote-03-56-pneumonia-adquirida-comunidade-md.md) | 1 | editorial/lote-03-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-03/58-diarreia-aguda.md](cadeia/-rascunhos-lote-03-58-diarreia-aguda-md.md) | 1 | editorial/lote-03-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-03/50-VALIDACAO-EDITORIAL.md](cadeia/-rascunhos-lote-03-50-VALIDACAO-EDITORIAL-md.md) | 1 | editorial/lote-03-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-03/47-VALIDACAO-EDITORIAL.md](cadeia/-rascunhos-lote-03-47-VALIDACAO-EDITORIAL-md.md) | 1 | editorial/lote-03-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-03/46-VALIDACAO-EDITORIAL.md](cadeia/-rascunhos-lote-03-46-VALIDACAO-EDITORIAL-md.md) | 1 | editorial/lote-03-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-03/60-vigilancia-epidemiologica.md](cadeia/-rascunhos-lote-03-60-vigilancia-epidemiologica-md.md) | 1 | editorial/lote-03-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-03/55-vigilancia-em-saude.md](cadeia/-rascunhos-lote-03-55-vigilancia-em-saude-md.md) | 1 | editorial/lote-03-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-03/50-financiamento-gestao-sus.md](cadeia/-rascunhos-lote-03-50-financiamento-gestao-sus-md.md) | 1 | editorial/lote-03-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-03/51-dpoc.md](cadeia/-rascunhos-lote-03-51-dpoc-md.md) | 1 | editorial/lote-03-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-03/43-puericultura-prevencao-acidentes.md](cadeia/-rascunhos-lote-03-43-puericultura-prevencao-acidentes-md.md) | 1 | editorial/lote-03-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-03/41-VALIDACAO-HTML.md](cadeia/-rascunhos-lote-03-41-VALIDACAO-HTML-md.md) | 1 | editorial/lote-03-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-03/46-REGISTRO-REVISAO-20261014.md](cadeia/-rascunhos-lote-03-46-REGISTRO-REVISAO-20261014-md.md) | 1 | editorial/lote-03-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-03/53-desidratacao-terapia-reidratacao.md](cadeia/-rascunhos-lote-03-53-desidratacao-terapia-reidratacao-md.md) | 1 | editorial/lote-03-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-03/44-49-54-59-expansao-obstetrica.md](cadeia/-rascunhos-lote-03-44-49-54-59-expansao-obstetrica-md.md) | 1 | editorial/lote-03-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-03/48-VALIDACAO-HTML.md](cadeia/-rascunhos-lote-03-48-VALIDACAO-HTML-md.md) | 1 | editorial/lote-03-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-03/52-traumatismo-cranioencefalico.md](cadeia/-rascunhos-lote-03-52-traumatismo-cranioencefalico-md.md) | 1 | editorial/lote-03-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/lotes/LOTE_02_DPOC_EDICAO_CONTINUA.md](cadeia/lotes-LOTE-02-DPOC-EDICAO-CONTINUA-md.md) | 1 | editorial/apostilas-lote-02-asma-20261014 | Conteúdo fora da main |
| [apostilas/lotes/LOTE_02_INPUT_PREPUBLICACAO.json](cadeia/lotes-LOTE-02-INPUT-PREPUBLICACAO-json.md) | 1 | editorial/apostilas-lote-02-asma-20261014 | Conteúdo fora da main |
| [apostilas/lotes/LOTE_02_TUBERCULOSE_EDICAO_CONTINUA.md](cadeia/lotes-LOTE-02-TUBERCULOSE-EDICAO-CONTINUA-md.md) | 1 | editorial/apostilas-lote-02-asma-20261014 | Conteúdo fora da main |
| [apostilas/lotes/LOTE_02_TUBERCULOSE_RASCUNHO.md](cadeia/lotes-LOTE-02-TUBERCULOSE-RASCUNHO-md.md) | 1 | editorial/apostilas-lote-02-asma-20261014 | Conteúdo fora da main |
| [apostilas/lotes/LOTE_02_PNEUMONIA_ADQUIRIDA_NA_COMUNIDADE_EDICAO_CONTINUA.md](cadeia/lotes-LOTE-02-PNEUMONIA-ADQUIRIDA-NA-COMUNIDADE-EDICAO-CONTINUA-md.md) | 1 | editorial/apostilas-lote-02-asma-20261014 | Conteúdo fora da main |
| [apostilas/lotes/LOTE_02_MANIFESTO_CONSOLIDACAO_2026-10-14.json](cadeia/lotes-LOTE-02-MANIFESTO-CONSOLIDACAO-2026-10-14-json.md) | 1 | editorial/apostilas-lote-02-asma-20261014 | Conteúdo fora da main |
| [apostilas/lotes/LOTE_02_ASMA_EDICAO_CONTINUA.md](cadeia/lotes-LOTE-02-ASMA-EDICAO-CONTINUA-md.md) | 1 | editorial/apostilas-lote-02-asma-20261014 | Conteúdo fora da main |
| [apostilas/lotes/LOTE_02_DIABETES_MELLITUS_RASCUNHO.md](cadeia/lotes-LOTE-02-DIABETES-MELLITUS-RASCUNHO-md.md) | 1 | editorial/apostilas-lote-02-asma-20261014 | Conteúdo fora da main |
| [apostilas/lotes/LOTE_02_ASMA_RASCUNHO.md](cadeia/lotes-LOTE-02-ASMA-RASCUNHO-md.md) | 1 | editorial/apostilas-lote-02-asma-20261014 | Conteúdo fora da main |
| [apostilas/lotes/LOTE_02_DPOC_RASCUNHO.md](cadeia/lotes-LOTE-02-DPOC-RASCUNHO-md.md) | 1 | editorial/apostilas-lote-02-asma-20261014 | Conteúdo fora da main |
| [apostilas/lotes/LOTE_02_PNEUMONIA_ADQUIRIDA_NA_COMUNIDADE_RASCUNHO.md](cadeia/lotes-LOTE-02-PNEUMONIA-ADQUIRIDA-NA-COMUNIDADE-RASCUNHO-md.md) | 1 | editorial/apostilas-lote-02-asma-20261014 | Conteúdo fora da main |
| [apostilas/lotes/LOTE_02_DIABETES_MELLITUS_EDICAO_CONTINUA.md](cadeia/lotes-LOTE-02-DIABETES-MELLITUS-EDICAO-CONTINUA-md.md) | 1 | editorial/apostilas-lote-02-asma-20261014 | Conteúdo fora da main |
| [apostilas/malformacoes-sindromes-geneticas/rascunho-editorial-lote12.md](cadeia/malformacoes-sindromes-geneticas-rascunho-editorial-lote12-md.md) | 1 | editorial/lote-12-producao-20261015 | Conteúdo fora da main |
| [apostilas/nodulos-cancer-tireoide/rascunho-editorial-lote09.md](cadeia/nodulos-cancer-tireoide-rascunho-editorial-lote09-md.md) | 1 | editorial/lote-08-inventario-e-producao-20261014 | Comparar com main |
| [apostilas/oncologia-cabeca-pescoco/rascunho-editorial-lote12.md](cadeia/oncologia-cabeca-pescoco-rascunho-editorial-lote12-md.md) | 1 | editorial/lote-12-producao-20261015 | Conteúdo fora da main |
| [apostilas/oncologia-pediatrica/rascunho-editorial-lote12.md](cadeia/oncologia-pediatrica-rascunho-editorial-lote12-md.md) | 1 | editorial/lote-12-producao-20261015 | Conteúdo fora da main |
| [apostilas/pre-natal-baixo-risco/index.html](cadeia/pre-natal-baixo-risco-index-html.md) | 1 | editorial/apostilas-lote-01-etapa-01-20261014 | Comparar com main |
| [apostilas/prematuridade-baixo-peso-nascer/content.json](cadeia/prematuridade-baixo-peso-nascer-content-json.md) | 1 | editorial/apostilas-lote-01-etapa-01-20261014 | Conteúdo fora da main |
| [apostilas/principios-diretrizes-sus/content.json](cadeia/principios-diretrizes-sus-content-json.md) | 1 | editorial/apostilas-lote-01-etapa-01-20261014 | Conteúdo fora da main |
| [apostilas/puberdade-precoce-atrasada/rascunho-editorial-lote12.md](cadeia/puberdade-precoce-atrasada-rascunho-editorial-lote12-md.md) | 1 | editorial/lote-12-producao-20261015 | Conteúdo fora da main |
| [apostilas/purpuras-coagulopatias-hemoglobinopatias-pediatricas/rascunho-editorial-lote12.md](cadeia/purpuras-coagulopatias-hemoglobinopatias-pediatricas-rascunho-editorial-lote12-md.md) | 1 | editorial/lote-12-producao-20261015 | Conteúdo fora da main |
| [apostilas/reanimacao-neonatal/content.json](cadeia/reanimacao-neonatal-content-json.md) | 1 | editorial/apostilas-lote-01-etapa-01-20261014 | Conteúdo fora da main |
| [apostilas/reposicao-volemica-disturbios-hidroeletroliticos/content.json](cadeia/reposicao-volemica-disturbios-hidroeletroliticos-content-json.md) | 1 | editorial/apostilas-lote-01-etapa-01-20261014 | Conteúdo fora da main |
| [apostilas/resposta-metabolica-ao-trauma/content.json](cadeia/resposta-metabolica-ao-trauma-content-json.md) | 1 | editorial/apostilas-lote-01-etapa-01-20261014 | Conteúdo fora da main |
| [apostilas/sangramento-uterino-anormal/index.html](cadeia/sangramento-uterino-anormal-index-html.md) | 1 | editorial/lote-07-aula-123-cps-2026-20261015 | Comparar com main |
| [apostilas/saude-do-trabalhador/rascunho-editorial-lote09.md](cadeia/saude-do-trabalhador-rascunho-editorial-lote09-md.md) | 1 | editorial/lote04-aula64-placenta-dpp-20261014 | Comparar com main |
| [apostilas/sepse-choque-septico/complemento-editorial-03-lote08.md](cadeia/sepse-choque-septico-complemento-editorial-03-lote08-md.md) | 1 | editorial/lote-08-inventario-e-producao-20261014 | Conteúdo fora da main |
| [apostilas/sindrome-ovariana-metabolica-poliendocrina-somp/index.html](cadeia/sindrome-ovariana-metabolica-poliendocrina-somp-index-html.md) | 1 | editorial/lote-07-aula-123-cps-2026-20261015 | Comparar com main |
| [apostilas/sindromes-coronarianas-agudas/content.json](cadeia/sindromes-coronarianas-agudas-content-json.md) | 1 | editorial/apostilas-lote-01-etapa-01-20261014 | Conteúdo fora da main |
| [apostilas/tecnica-cirurgica/index.html](cadeia/tecnica-cirurgica-index-html.md) | 1 | editorial/lote-03-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/trauma-atendimento-inicial/index.html](cadeia/trauma-atendimento-inicial-index-html.md) | 1 | editorial/lote-03-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/trauma-raquimedular/rascunho-editorial-lote12.md](cadeia/trauma-raquimedular-rascunho-editorial-lote12-md.md) | 1 | editorial/lote-12-producao-20261015 | Conteúdo fora da main |
| [apostilas/ultrassonografia-obstetrica-medicina-fetal/rascunho-editorial-lote12.md](cadeia/ultrassonografia-obstetrica-medicina-fetal-rascunho-editorial-lote12-md.md) | 1 | editorial/lote-12-producao-20261015 | Conteúdo fora da main |
| [apostilas/vacinacao-suplementacao-gestacao/content.json](cadeia/vacinacao-suplementacao-gestacao-content-json.md) | 1 | editorial/apostilas-lote-01-etapa-01-20261014 | Conteúdo fora da main |
| [apostilas/valvopatias/content.json](cadeia/valvopatias-content-json.md) | 1 | editorial/apostilas-lote-01-etapa-01-20261014 | Conteúdo fora da main |
| [apostilas/violencia-sexual-direitos-reprodutivos/rascunho-editorial-lote12.md](cadeia/violencia-sexual-direitos-reprodutivos-rascunho-editorial-lote12-md.md) | 1 | editorial/lote-12-producao-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-10-211-transtornos-depressivos-risco-suicidio.md](cadeia/-rascunhos-lote-10-211-transtornos-depressivos-risco-suicidio-md.md) | 1 | editorial/lote-10-apostilas-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-123-febre-sem-sinais-localizatorios.md](cadeia/-rascunhos-lote-06-123-febre-sem-sinais-localizatorios-md.md) | 1 | editorial/lote-06-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/aula-266-oncologia-cabeca-pescoco-etapa01.md](cadeia/-rascunhos-aula-266-oncologia-cabeca-pescoco-etapa01-md.md) | 1 | editorial/apostila-266-oncologia-cabeca-pescoco-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-08-aula-181-curadoria-ptbxl-imagens.md](cadeia/-rascunhos-lote-08-aula-181-curadoria-ptbxl-imagens-md.md) | 1 | editorial/lote-08-inventario-e-producao-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-08-aula-176-consolidada-curada-20261015.md](cadeia/-rascunhos-lote-08-aula-176-consolidada-curada-20261015-md.md) | 1 | editorial/lote-08-inventario-e-producao-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-10-aula-208-gestacao-gemelar-alto-risco.md](cadeia/-rascunhos-lote-10-aula-208-gestacao-gemelar-alto-risco-md.md) | 1 | editorial/lote-10-204-225 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-08-aula-173-urgencias-pediatricas-suporte-vida.md](cadeia/-rascunhos-lote-08-aula-173-urgencias-pediatricas-suporte-vida-md.md) | 1 | editorial/lote-08-inventario-e-producao-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-128-preview.html](cadeia/-rascunhos-lote-06-128-preview-html.md) | 1 | editorial/lote-06-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-13-272-fibrose-cistica.md](cadeia/-rascunhos-lote-13-272-fibrose-cistica-md.md) | 1 | editorial/lote-13-preenchimento-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-122-controle-reconciliacao-20261016.md](cadeia/-rascunhos-lote-06-122-controle-reconciliacao-20261016-md.md) | 1 | editorial/lote-06-continuacao-132-137-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-07-aula-139-endometriose.md](cadeia/-rascunhos-lote-07-aula-139-endometriose-md.md) | 1 | editorial/lote-05-103-tuberculose-infancia-20261015<br>editorial/lote-05-105-estudos-epidemiologicos-20261014<br>editorial/lote-05-106-lesao-renal-aguda-20261015<br>editorial/lote-05-107-hernias-parede-20261015<br>editorial/lote-05-108-itu-infancia-20261015<br>editorial/lote-05-109-puerperio-20261015<br>editorial/lote-05-110-ensaios-revisoes-20261015<br>editorial/lote-05-111-drc-20261015<br>editorial/lote-05-112-diverticulite-20261015<br>editorial/lote-05-113-nefrotica-nefritica-20261015<br>editorial/lote-05-114-infeccao-puerperal-20261015<br>editorial/lote-05-115-vieses-causalidade-20261015<br>editorial/lote-05-auditoria-clinica-20261014<br>editorial/lote-05-hpp-tardia-asma-20261014 | Comparar com main |
| [apostilas/_rascunhos/lote-08-aula-179-cancer-endometrio.md](cadeia/-rascunhos-lote-08-aula-179-cancer-endometrio-md.md) | 1 | editorial/lote-08-inventario-e-producao-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-13-275-emergencias-cirurgia-pediatrica.md](cadeia/-rascunhos-lote-13-275-emergencias-cirurgia-pediatrica-md.md) | 1 | editorial/lote-13-preenchimento-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-13-256-reabilitacao-deficiencia-comunidade.md](cadeia/-rascunhos-lote-13-256-reabilitacao-deficiencia-comunidade-md.md) | 1 | editorial/lote-13-preenchimento-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-08-aula-180-complemento-02-clinico-2026.md](cadeia/-rascunhos-lote-08-aula-180-complemento-02-clinico-2026-md.md) | 1 | editorial/lote-08-inventario-e-producao-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-123-build-input-preliminar.json](cadeia/-rascunhos-lote-06-123-build-input-preliminar-json.md) | 1 | editorial/lote-06-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-126-controle-editorial.md](cadeia/-rascunhos-lote-06-126-controle-editorial-md.md) | 1 | editorial/lote-06-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-07-aula-128-sepse-choque-septico-pediatrico.md](cadeia/-rascunhos-lote-07-aula-128-sepse-choque-septico-pediatrico-md.md) | 2 | audit/enamed-7areas-lotes-finais-20261015<br>editorial/lote-05-103-tuberculose-infancia-20261015<br>editorial/lote-05-105-estudos-epidemiologicos-20261014<br>editorial/lote-05-106-lesao-renal-aguda-20261015<br>editorial/lote-05-107-hernias-parede-20261015<br>editorial/lote-05-108-itu-infancia-20261015<br>editorial/lote-05-109-puerperio-20261015<br>editorial/lote-05-110-ensaios-revisoes-20261015<br>editorial/lote-05-111-drc-20261015<br>editorial/lote-05-112-diverticulite-20261015<br>editorial/lote-05-113-nefrotica-nefritica-20261015<br>editorial/lote-05-114-infeccao-puerperal-20261015<br>editorial/lote-05-115-vieses-causalidade-20261015<br>editorial/lote-05-auditoria-clinica-20261014<br>editorial/lote-05-hpp-tardia-asma-20261014<br>editorial/lote-08-inventario-e-producao-20261014<br>editorial/lote-10-apostilas-20261015<br>editorial/lote-11-demensias-20261015<br>editorial/lote-12-producao-20261015<br>editorial/lote-13-preenchimento-20261015<br>editorial/lote-07-aula-123-cps-2026-20261015 | Comparar com main |
| [apostilas/_rascunhos/lote-10-aula-209-aloimunizacao-doenca-hemolitica-perinatal.md](cadeia/-rascunhos-lote-10-aula-209-aloimunizacao-doenca-hemolitica-perinatal-md.md) | 1 | editorial/lote-10-204-225 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-11-aula-229-obesidade-sindrome-metabolica.md](cadeia/-rascunhos-lote-11-aula-229-obesidade-sindrome-metabolica-md.md) | 1 | editorial/lote-11-demensias-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-131-controle-editorial.md](cadeia/-rascunhos-lote-06-131-controle-editorial-md.md) | 1 | editorial/lote-06-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-117-controle-editorial.md](cadeia/-rascunhos-lote-06-117-controle-editorial-md.md) | 1 | editorial/lote-06-auditoria-20261014<br>editorial/lote-06-continuacao-132-137-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-07-aula-123-febre-sem-sinais-localizatorios.md](cadeia/-rascunhos-lote-07-aula-123-febre-sem-sinais-localizatorios-md.md) | 2 | audit/enamed-7areas-lotes-finais-20261015<br>editorial/lote-05-103-tuberculose-infancia-20261015<br>editorial/lote-05-105-estudos-epidemiologicos-20261014<br>editorial/lote-05-106-lesao-renal-aguda-20261015<br>editorial/lote-05-107-hernias-parede-20261015<br>editorial/lote-05-108-itu-infancia-20261015<br>editorial/lote-05-109-puerperio-20261015<br>editorial/lote-05-110-ensaios-revisoes-20261015<br>editorial/lote-05-111-drc-20261015<br>editorial/lote-05-112-diverticulite-20261015<br>editorial/lote-05-113-nefrotica-nefritica-20261015<br>editorial/lote-05-114-infeccao-puerperal-20261015<br>editorial/lote-05-115-vieses-causalidade-20261015<br>editorial/lote-05-auditoria-clinica-20261014<br>editorial/lote-05-hpp-tardia-asma-20261014<br>editorial/lote-08-inventario-e-producao-20261014<br>editorial/lote-10-apostilas-20261015<br>editorial/lote-12-producao-20261015<br>editorial/lote-13-preenchimento-20261015<br>editorial/lote04-aula64-placenta-dpp-20261014<br>editorial/lote-07-aula-123-cps-2026-20261015 | Comparar com main |
| [apostilas/_rascunhos/lote-07-aula-130-historia-natural-niveis-prevencao.md](cadeia/-rascunhos-lote-07-aula-130-historia-natural-niveis-prevencao-md.md) | 2 | editorial/lote-07-aula-123-cps-2026-20261015<br>audit/enamed-7areas-lotes-finais-20261015<br>editorial/lote-05-103-tuberculose-infancia-20261015<br>editorial/lote-05-105-estudos-epidemiologicos-20261014<br>editorial/lote-05-106-lesao-renal-aguda-20261015<br>editorial/lote-05-107-hernias-parede-20261015<br>editorial/lote-05-108-itu-infancia-20261015<br>editorial/lote-05-109-puerperio-20261015<br>editorial/lote-05-110-ensaios-revisoes-20261015<br>editorial/lote-05-111-drc-20261015<br>editorial/lote-05-112-diverticulite-20261015<br>editorial/lote-05-113-nefrotica-nefritica-20261015<br>editorial/lote-05-114-infeccao-puerperal-20261015<br>editorial/lote-05-115-vieses-causalidade-20261015<br>editorial/lote-05-auditoria-clinica-20261014<br>editorial/lote-05-hpp-tardia-asma-20261014<br>editorial/lote-08-inventario-e-producao-20261014<br>editorial/lote-10-apostilas-20261015<br>editorial/lote-11-demensias-20261015<br>editorial/lote-12-producao-20261015<br>editorial/lote-13-preenchimento-20261015 | Comparar com main |
| [apostilas/_rascunhos/lote-03-057-trauma-toracico.md](cadeia/-rascunhos-lote-03-057-trauma-toracico-md.md) | 1 | editorial/apostilas-lote-03-trauma-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-11-aula-228-neuropatias-doencas-neuromusculares.md](cadeia/-rascunhos-lote-11-aula-228-neuropatias-doencas-neuromusculares-md.md) | 1 | editorial/lote-11-demensias-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-07-aula-136-hemorragia-digestiva-integrada.md](cadeia/-rascunhos-lote-07-aula-136-hemorragia-digestiva-integrada-md.md) | 3 | editorial/lote-06-continuacao-132-137-20261015<br>audit/enamed-7areas-lotes-finais-20261015<br>editorial/lote-10-apostilas-20261015<br>editorial/lote-11-demensias-20261015<br>editorial/lote-12-producao-20261015<br>editorial/lote-13-preenchimento-20261015<br>editorial/lote-05-103-tuberculose-infancia-20261015<br>editorial/lote-05-105-estudos-epidemiologicos-20261014<br>editorial/lote-05-106-lesao-renal-aguda-20261015<br>editorial/lote-05-107-hernias-parede-20261015<br>editorial/lote-05-108-itu-infancia-20261015<br>editorial/lote-05-109-puerperio-20261015<br>editorial/lote-05-110-ensaios-revisoes-20261015<br>editorial/lote-05-111-drc-20261015<br>editorial/lote-05-112-diverticulite-20261015<br>editorial/lote-05-113-nefrotica-nefritica-20261015<br>editorial/lote-05-114-infeccao-puerperal-20261015<br>editorial/lote-05-115-vieses-causalidade-20261015<br>editorial/lote-05-auditoria-clinica-20261014<br>editorial/lote-05-hpp-tardia-asma-20261014 | Comparar com main |
| [apostilas/_rascunhos/lote-10-aula-210-psicopatologia-entrevista-eem.md](cadeia/-rascunhos-lote-10-aula-210-psicopatologia-entrevista-eem-md.md) | 1 | editorial/lote-10-204-225 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-131-preview.html](cadeia/-rascunhos-lote-06-131-preview-html.md) | 1 | editorial/lote-06-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-116-sindromes-glomerulares.md](cadeia/-rascunhos-lote-06-116-sindromes-glomerulares-md.md) | 1 | editorial/lote-06-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-10-204-vasculites-pediatricas-kawasaki.md](cadeia/-rascunhos-lote-10-204-vasculites-pediatricas-kawasaki-md.md) | 1 | editorial/lote-10-apostilas-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-09-aula-187-antibioticoterapia-uso-racional.md](cadeia/-rascunhos-lote-09-aula-187-antibioticoterapia-uso-racional-md.md) | 1 | editorial/lote-09-producao-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-116-sindromes-glomerulares-edicao-consolidada.md](cadeia/-rascunhos-lote-06-116-sindromes-glomerulares-edicao-consolidada-md.md) | 1 | editorial/lote-06-auditoria-20261014<br>editorial/lote-06-continuacao-132-137-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-07-aula-133-meningites-encefalites.md](cadeia/-rascunhos-lote-07-aula-133-meningites-encefalites-md.md) | 2 | editorial/lote-06-continuacao-132-137-20261015<br>editorial/lote-05-103-tuberculose-infancia-20261015<br>editorial/lote-05-105-estudos-epidemiologicos-20261014<br>editorial/lote-05-106-lesao-renal-aguda-20261015<br>editorial/lote-05-107-hernias-parede-20261015<br>editorial/lote-05-108-itu-infancia-20261015<br>editorial/lote-05-109-puerperio-20261015<br>editorial/lote-05-110-ensaios-revisoes-20261015<br>editorial/lote-05-111-drc-20261015<br>editorial/lote-05-112-diverticulite-20261015<br>editorial/lote-05-113-nefrotica-nefritica-20261015<br>editorial/lote-05-114-infeccao-puerperal-20261015<br>editorial/lote-05-115-vieses-causalidade-20261015<br>editorial/lote-05-auditoria-clinica-20261014<br>editorial/lote-05-hpp-tardia-asma-20261014 | Comparar com main |
| [apostilas/_rascunhos/lote-03-047-trauma-atendimento-inicial-xabcde.md](cadeia/-rascunhos-lote-03-047-trauma-atendimento-inicial-xabcde-md.md) | 1 | editorial/apostilas-lote-03-trauma-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-116-teste-autossuficiencia.md](cadeia/-rascunhos-lote-06-116-teste-autossuficiencia-md.md) | 1 | editorial/lote-06-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-07-aula-121-itu-pielonefrite.md](cadeia/-rascunhos-lote-07-aula-121-itu-pielonefrite-md.md) | 3 | audit/enamed-7areas-lotes-finais-20261015<br>editorial/lote-05-103-tuberculose-infancia-20261015<br>editorial/lote-05-105-estudos-epidemiologicos-20261014<br>editorial/lote-05-106-lesao-renal-aguda-20261015<br>editorial/lote-05-107-hernias-parede-20261015<br>editorial/lote-05-108-itu-infancia-20261015<br>editorial/lote-05-109-puerperio-20261015<br>editorial/lote-05-110-ensaios-revisoes-20261015<br>editorial/lote-05-111-drc-20261015<br>editorial/lote-05-112-diverticulite-20261015<br>editorial/lote-05-113-nefrotica-nefritica-20261015<br>editorial/lote-05-114-infeccao-puerperal-20261015<br>editorial/lote-05-115-vieses-causalidade-20261015<br>editorial/lote-05-auditoria-clinica-20261014<br>editorial/lote-05-hpp-tardia-asma-20261014<br>editorial/lote-08-inventario-e-producao-20261014<br>editorial/lote-10-apostilas-20261015<br>editorial/lote-11-demensias-20261015<br>editorial/lote-12-producao-20261015<br>editorial/lote-13-preenchimento-20261015<br>editorial/lote04-aula64-placenta-dpp-20261014<br>editorial/lote-07-aula-123-cps-2026-20261015 | Comparar com main |
| [apostilas/_rascunhos/lote-10-aula-210-psicopatologia-entrevista-exame-mental.md](cadeia/-rascunhos-lote-10-aula-210-psicopatologia-entrevista-exame-mental-md.md) | 1 | editorial/lote-10-204-225 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-118-controle-editorial.md](cadeia/-rascunhos-lote-06-118-controle-editorial-md.md) | 1 | editorial/lote-06-auditoria-20261014<br>editorial/lote-06-continuacao-132-137-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-10-aula-205-dor-pelvica-aguda-torcao-anexial.md](cadeia/-rascunhos-lote-10-aula-205-dor-pelvica-aguda-torcao-anexial-md.md) | 1 | editorial/lote-10-204-225 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-13-260-biosseguranca-iras.md](cadeia/-rascunhos-lote-13-260-biosseguranca-iras-md.md) | 1 | editorial/lote-13-preenchimento-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-04-aula-068-desnutricao-deficiencias-nutricionais.md](cadeia/-rascunhos-lote-04-aula-068-desnutricao-deficiencias-nutricionais-md.md) | 1 | editorial/lote-04-aula068-desnutricao-pediatrica-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-128-build-input-preliminar.json](cadeia/-rascunhos-lote-06-128-build-input-preliminar-json.md) | 1 | editorial/lote-06-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-131-build-input-preliminar.json](cadeia/-rascunhos-lote-06-131-build-input-preliminar-json.md) | 1 | editorial/lote-06-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-11-aula-231-hemoglobinopatias.md](cadeia/-rascunhos-lote-11-aula-231-hemoglobinopatias-md.md) | 1 | editorial/lote-11-demensias-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-05-109-puerperio-normal-patologico.md](cadeia/-rascunhos-lote-05-109-puerperio-normal-patologico-md.md) | 1 | editorial/lote-05-103-tuberculose-infancia-20261015<br>editorial/lote-05-109-puerperio-20261015<br>editorial/lote-05-110-ensaios-revisoes-20261015<br>editorial/lote-05-111-drc-20261015<br>editorial/lote-05-112-diverticulite-20261015<br>editorial/lote-05-113-nefrotica-nefritica-20261015<br>editorial/lote-05-114-infeccao-puerperal-20261015<br>editorial/lote-05-115-vieses-causalidade-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-13-273-imunodeficiencias-infancia.md](cadeia/-rascunhos-lote-13-273-imunodeficiencias-infancia-md.md) | 1 | editorial/lote-13-preenchimento-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-117-isquemia-mesenterica.md](cadeia/-rascunhos-lote-06-117-isquemia-mesenterica-md.md) | 1 | editorial/lote-06-auditoria-20261014<br>editorial/lote-06-continuacao-132-137-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-07-aula-132-hemorragia-digestiva-baixa.md](cadeia/-rascunhos-lote-07-aula-132-hemorragia-digestiva-baixa-md.md) | 2 | editorial/lote-06-continuacao-132-137-20261015<br>editorial/lote-05-103-tuberculose-infancia-20261015<br>editorial/lote-05-105-estudos-epidemiologicos-20261014<br>editorial/lote-05-106-lesao-renal-aguda-20261015<br>editorial/lote-05-107-hernias-parede-20261015<br>editorial/lote-05-108-itu-infancia-20261015<br>editorial/lote-05-109-puerperio-20261015<br>editorial/lote-05-110-ensaios-revisoes-20261015<br>editorial/lote-05-111-drc-20261015<br>editorial/lote-05-112-diverticulite-20261015<br>editorial/lote-05-113-nefrotica-nefritica-20261015<br>editorial/lote-05-114-infeccao-puerperal-20261015<br>editorial/lote-05-115-vieses-causalidade-20261015<br>editorial/lote-05-auditoria-clinica-20261014<br>editorial/lote-05-hpp-tardia-asma-20261014 | Comparar com main |
| [apostilas/_rascunhos/lote-06-120-preview.html](cadeia/-rascunhos-lote-06-120-preview-html.md) | 1 | editorial/lote-06-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-121-infeccao-urinaria-pielonefrite.md](cadeia/-rascunhos-lote-06-121-infeccao-urinaria-pielonefrite-md.md) | 2 | editorial/lote-06-continuacao-132-137-20261015<br>editorial/lote-06-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-08-aula-160-tabagismo-alcool-outras-drogas.md](cadeia/-rascunhos-lote-08-aula-160-tabagismo-alcool-outras-drogas-md.md) | 1 | editorial/lote-08-inventario-e-producao-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-13-276-diarreia-aguda-c-difficile.md](cadeia/-rascunhos-lote-13-276-diarreia-aguda-c-difficile-md.md) | 1 | editorial/lote-13-preenchimento-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-13-255-longitudinalidade-coordenacao-matriciamento.md](cadeia/-rascunhos-lote-13-255-longitudinalidade-coordenacao-matriciamento-md.md) | 1 | editorial/lote-13-preenchimento-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-05-104-hemorragia-pos-parto.md](cadeia/-rascunhos-lote-05-104-hemorragia-pos-parto-md.md) | 2 | editorial/lote-05-auditoria-clinica-20261014<br>editorial/lote-05-103-tuberculose-infancia-20261015<br>editorial/lote-05-105-estudos-epidemiologicos-20261014<br>editorial/lote-05-106-lesao-renal-aguda-20261015<br>editorial/lote-05-107-hernias-parede-20261015<br>editorial/lote-05-108-itu-infancia-20261015<br>editorial/lote-05-109-puerperio-20261015<br>editorial/lote-05-110-ensaios-revisoes-20261015<br>editorial/lote-05-111-drc-20261015<br>editorial/lote-05-112-diverticulite-20261015<br>editorial/lote-05-113-nefrotica-nefritica-20261015<br>editorial/lote-05-114-infeccao-puerperal-20261015<br>editorial/lote-05-115-vieses-causalidade-20261015<br>editorial/lote-05-hpp-tardia-asma-20261014 | Comparar com main |
| [apostilas/_rascunhos/lote-06-127-controle-editorial.md](cadeia/-rascunhos-lote-06-127-controle-editorial-md.md) | 1 | editorial/lote-06-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-11-aula-230-osteoporose-sarcopenia-fragilidade.md](cadeia/-rascunhos-lote-11-aula-230-osteoporose-sarcopenia-fragilidade-md.md) | 1 | editorial/lote-11-demensias-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-125-preview.html](cadeia/-rascunhos-lote-06-125-preview-html.md) | 1 | editorial/lote-06-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-05-105-desenhos-estudos-epidemiologicos.md](cadeia/-rascunhos-lote-05-105-desenhos-estudos-epidemiologicos-md.md) | 1 | editorial/lote-05-103-tuberculose-infancia-20261015<br>editorial/lote-05-105-estudos-epidemiologicos-20261014<br>editorial/lote-05-106-lesao-renal-aguda-20261015<br>editorial/lote-05-107-hernias-parede-20261015<br>editorial/lote-05-108-itu-infancia-20261015<br>editorial/lote-05-109-puerperio-20261015<br>editorial/lote-05-110-ensaios-revisoes-20261015<br>editorial/lote-05-111-drc-20261015<br>editorial/lote-05-112-diverticulite-20261015<br>editorial/lote-05-113-nefrotica-nefritica-20261015<br>editorial/lote-05-114-infeccao-puerperal-20261015<br>editorial/lote-05-115-vieses-causalidade-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-09-aula-185-sindromes-geriatricas-quedas-polifarmacia.md](cadeia/-rascunhos-lote-09-aula-185-sindromes-geriatricas-quedas-polifarmacia-md.md) | 1 | editorial/lote-09-producao-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-133-controle-cientifico-20261015.md](cadeia/-rascunhos-lote-06-133-controle-cientifico-20261015-md.md) | 1 | editorial/lote-06-continuacao-132-137-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-121-controle-editorial.md](cadeia/-rascunhos-lote-06-121-controle-editorial-md.md) | 1 | editorial/lote-06-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-127-hemorragia-digestiva-alta.md](cadeia/-rascunhos-lote-06-127-hemorragia-digestiva-alta-md.md) | 1 | editorial/lote-06-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-119-controle-editorial.md](cadeia/-rascunhos-lote-06-119-controle-editorial-md.md) | 1 | editorial/lote-06-auditoria-20261014<br>editorial/lote-06-continuacao-132-137-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-05-093-asma-infancia.md](cadeia/-rascunhos-lote-05-093-asma-infancia-md.md) | 3 | editorial/lote-05-103-tuberculose-infancia-20261015<br>editorial/lote-05-105-estudos-epidemiologicos-20261014<br>editorial/lote-05-106-lesao-renal-aguda-20261015<br>editorial/lote-05-107-hernias-parede-20261015<br>editorial/lote-05-108-itu-infancia-20261015<br>editorial/lote-05-109-puerperio-20261015<br>editorial/lote-05-110-ensaios-revisoes-20261015<br>editorial/lote-05-111-drc-20261015<br>editorial/lote-05-112-diverticulite-20261015<br>editorial/lote-05-113-nefrotica-nefritica-20261015<br>editorial/lote-05-114-infeccao-puerperal-20261015<br>editorial/lote-05-115-vieses-causalidade-20261015<br>editorial/lote-05-hpp-tardia-asma-20261014<br>editorial/lote-05-auditoria-clinica-20261014<br>editorial/lote-06-auditoria-20261014 | Comparar com main |
| [apostilas/_rascunhos/lote-10-207-prolapso-incontinencia-urinaria-feminina.md](cadeia/-rascunhos-lote-10-207-prolapso-incontinencia-urinaria-feminina-md.md) | 1 | editorial/lote-10-apostilas-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-10-aula-211-transtornos-depressivos-risco-suicidio.md](cadeia/-rascunhos-lote-10-aula-211-transtornos-depressivos-risco-suicidio-md.md) | 1 | editorial/lote-10-204-225 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-130-niveis-de-prevencao-historia-natural-doenca.md](cadeia/-rascunhos-lote-06-130-niveis-de-prevencao-historia-natural-doenca-md.md) | 1 | editorial/lote-06-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-125-controle-editorial.md](cadeia/-rascunhos-lote-06-125-controle-editorial-md.md) | 1 | editorial/lote-06-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-127-preview.html](cadeia/-rascunhos-lote-06-127-preview-html.md) | 1 | editorial/lote-06-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-09-aula-183-dislipidemias-risco-cardiovascular.md](cadeia/-rascunhos-lote-09-aula-183-dislipidemias-risco-cardiovascular-md.md) | 1 | editorial/lote-09-producao-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-126-build-input-preliminar.json](cadeia/-rascunhos-lote-06-126-build-input-preliminar-json.md) | 1 | editorial/lote-06-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-120-medicina-baseada-em-evidencias.md](cadeia/-rascunhos-lote-06-120-medicina-baseada-em-evidencias-md.md) | 1 | editorial/lote-06-auditoria-20261014<br>editorial/lote-06-continuacao-132-137-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-123-controle-editorial.md](cadeia/-rascunhos-lote-06-123-controle-editorial-md.md) | 1 | editorial/lote-06-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-13-253-luto-crises-adaptacao.md](cadeia/-rascunhos-lote-13-253-luto-crises-adaptacao-md.md) | 1 | editorial/lote-13-preenchimento-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-05-100-curvas-roc-testes-diagnosticos.md](cadeia/-rascunhos-lote-05-100-curvas-roc-testes-diagnosticos-md.md) | 1 | editorial/lote-05-103-tuberculose-infancia-20261015<br>editorial/lote-05-105-estudos-epidemiologicos-20261014<br>editorial/lote-05-106-lesao-renal-aguda-20261015<br>editorial/lote-05-107-hernias-parede-20261015<br>editorial/lote-05-108-itu-infancia-20261015<br>editorial/lote-05-109-puerperio-20261015<br>editorial/lote-05-110-ensaios-revisoes-20261015<br>editorial/lote-05-111-drc-20261015<br>editorial/lote-05-112-diverticulite-20261015<br>editorial/lote-05-113-nefrotica-nefritica-20261015<br>editorial/lote-05-114-infeccao-puerperal-20261015<br>editorial/lote-05-115-vieses-causalidade-20261015<br>editorial/lote-05-hpp-tardia-asma-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-119-preview.html](cadeia/-rascunhos-lote-06-119-preview-html.md) | 1 | editorial/lote-06-auditoria-20261014<br>editorial/lote-06-continuacao-132-137-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-03-051-dpoc.md](cadeia/-rascunhos-lote-03-051-dpoc-md.md) | 1 | editorial/apostilas-lote-03-trauma-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-05-106-lesao-renal-aguda.md](cadeia/-rascunhos-lote-05-106-lesao-renal-aguda-md.md) | 1 | editorial/lote-05-103-tuberculose-infancia-20261015<br>editorial/lote-05-106-lesao-renal-aguda-20261015<br>editorial/lote-05-107-hernias-parede-20261015<br>editorial/lote-05-108-itu-infancia-20261015<br>editorial/lote-05-109-puerperio-20261015<br>editorial/lote-05-110-ensaios-revisoes-20261015<br>editorial/lote-05-111-drc-20261015<br>editorial/lote-05-112-diverticulite-20261015<br>editorial/lote-05-113-nefrotica-nefritica-20261015<br>editorial/lote-05-114-infeccao-puerperal-20261015<br>editorial/lote-05-115-vieses-causalidade-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-129-preview.html](cadeia/-rascunhos-lote-06-129-preview-html.md) | 1 | editorial/lote-06-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-08-aula-178-intoxicacoes-exogenas-infancia.md](cadeia/-rascunhos-lote-08-aula-178-intoxicacoes-exogenas-infancia-md.md) | 1 | editorial/lote-08-inventario-e-producao-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-04-aula-067-trauma-pelvico-geniturinario.md](cadeia/-rascunhos-lote-04-aula-067-trauma-pelvico-geniturinario-md.md) | 1 | editorial/lote-04-aula067-trauma-pelvico-geniturinario-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-05-111-doenca-renal-cronica.md](cadeia/-rascunhos-lote-05-111-doenca-renal-cronica-md.md) | 1 | editorial/lote-05-103-tuberculose-infancia-20261015<br>editorial/lote-05-111-drc-20261015<br>editorial/lote-05-112-diverticulite-20261015<br>editorial/lote-05-113-nefrotica-nefritica-20261015<br>editorial/lote-05-114-infeccao-puerperal-20261015<br>editorial/lote-05-115-vieses-causalidade-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-05-108-itu-infancia.md](cadeia/-rascunhos-lote-05-108-itu-infancia-md.md) | 1 | editorial/lote-05-103-tuberculose-infancia-20261015<br>editorial/lote-05-108-itu-infancia-20261015<br>editorial/lote-05-109-puerperio-20261015<br>editorial/lote-05-110-ensaios-revisoes-20261015<br>editorial/lote-05-111-drc-20261015<br>editorial/lote-05-112-diverticulite-20261015<br>editorial/lote-05-113-nefrotica-nefritica-20261015<br>editorial/lote-05-114-infeccao-puerperal-20261015<br>editorial/lote-05-115-vieses-causalidade-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-08-aula-180-consolidada-curada-20261015.md](cadeia/-rascunhos-lote-08-aula-180-consolidada-curada-20261015-md.md) | 1 | editorial/lote-08-inventario-e-producao-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-13-254-saude-mental-adolescente.md](cadeia/-rascunhos-lote-13-254-saude-mental-adolescente-md.md) | 1 | editorial/lote-13-preenchimento-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-05-114-infeccao-puerperal.md](cadeia/-rascunhos-lote-05-114-infeccao-puerperal-md.md) | 1 | editorial/lote-05-103-tuberculose-infancia-20261015<br>editorial/lote-05-114-infeccao-puerperal-20261015<br>editorial/lote-05-115-vieses-causalidade-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-13-259-sistemas-informacao-saude.md](cadeia/-rascunhos-lote-13-259-sistemas-informacao-saude-md.md) | 1 | editorial/lote-13-preenchimento-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-124-preview.html](cadeia/-rascunhos-lote-06-124-preview-html.md) | 1 | editorial/lote-06-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-08-aula-174-massas-anexiais-cancer-ovario.md](cadeia/-rascunhos-lote-08-aula-174-massas-anexiais-cancer-ovario-md.md) | 1 | editorial/lote-08-inventario-e-producao-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-09-aula-182-rcp-adulto-cuidados-pos-parada.md](cadeia/-rascunhos-lote-09-aula-182-rcp-adulto-cuidados-pos-parada-md.md) | 1 | editorial/lote-09-producao-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-05-110-ensaios-clinicos-revisoes-sistematicas.md](cadeia/-rascunhos-lote-05-110-ensaios-clinicos-revisoes-sistematicas-md.md) | 1 | editorial/lote-05-103-tuberculose-infancia-20261015<br>editorial/lote-05-110-ensaios-revisoes-20261015<br>editorial/lote-05-111-drc-20261015<br>editorial/lote-05-112-diverticulite-20261015<br>editorial/lote-05-113-nefrotica-nefritica-20261015<br>editorial/lote-05-114-infeccao-puerperal-20261015<br>editorial/lote-05-115-vieses-causalidade-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-126-cirrose-e-complicacoes.md](cadeia/-rascunhos-lote-06-126-cirrose-e-complicacoes-md.md) | 1 | editorial/lote-06-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-09-aula-184-cefaleias-sinais-alarme-neurologicos.md](cadeia/-rascunhos-lote-09-aula-184-cefaleias-sinais-alarme-neurologicos-md.md) | 1 | editorial/lote-09-producao-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-11-aula-232-coagulopatias-trombofilias-hemoterapia.md](cadeia/-rascunhos-lote-11-aula-232-coagulopatias-trombofilias-hemoterapia-md.md) | 1 | editorial/lote-11-demensias-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-07-aula-137-drge-hernia-hiatal.md](cadeia/-rascunhos-lote-07-aula-137-drge-hernia-hiatal-md.md) | 2 | editorial/lote-05-103-tuberculose-infancia-20261015<br>editorial/lote-05-105-estudos-epidemiologicos-20261014<br>editorial/lote-05-106-lesao-renal-aguda-20261015<br>editorial/lote-05-107-hernias-parede-20261015<br>editorial/lote-05-108-itu-infancia-20261015<br>editorial/lote-05-109-puerperio-20261015<br>editorial/lote-05-110-ensaios-revisoes-20261015<br>editorial/lote-05-111-drc-20261015<br>editorial/lote-05-112-diverticulite-20261015<br>editorial/lote-05-113-nefrotica-nefritica-20261015<br>editorial/lote-05-114-infeccao-puerperal-20261015<br>editorial/lote-05-115-vieses-causalidade-20261015<br>editorial/lote-05-auditoria-clinica-20261014<br>editorial/lote-05-hpp-tardia-asma-20261014<br>editorial/lote-06-continuacao-132-137-20261015 | Comparar com main |
| [apostilas/_rascunhos/lote-05-113-sindromes-nefrotica-nefritica-infancia.md](cadeia/-rascunhos-lote-05-113-sindromes-nefrotica-nefritica-infancia-md.md) | 1 | editorial/lote-05-103-tuberculose-infancia-20261015<br>editorial/lote-05-113-nefrotica-nefritica-20261015<br>editorial/lote-05-114-infeccao-puerperal-20261015<br>editorial/lote-05-115-vieses-causalidade-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-05-096-disturbios-hidroeletroliticos.md](cadeia/-rascunhos-lote-05-096-disturbios-hidroeletroliticos-md.md) | 1 | editorial/lote04-aula64-placenta-dpp-20261014 | Comparar com main |
| [apostilas/_rascunhos/lote-07-aula-140-saude-crianca-aps.md](cadeia/-rascunhos-lote-07-aula-140-saude-crianca-aps-md.md) | 1 | editorial/lote-05-103-tuberculose-infancia-20261015<br>editorial/lote-05-105-estudos-epidemiologicos-20261014<br>editorial/lote-05-106-lesao-renal-aguda-20261015<br>editorial/lote-05-107-hernias-parede-20261015<br>editorial/lote-05-108-itu-infancia-20261015<br>editorial/lote-05-109-puerperio-20261015<br>editorial/lote-05-110-ensaios-revisoes-20261015<br>editorial/lote-05-111-drc-20261015<br>editorial/lote-05-112-diverticulite-20261015<br>editorial/lote-05-113-nefrotica-nefritica-20261015<br>editorial/lote-05-114-infeccao-puerperal-20261015<br>editorial/lote-05-115-vieses-causalidade-20261015<br>editorial/lote-05-auditoria-clinica-20261014<br>editorial/lote-05-hpp-tardia-asma-20261014 | Comparar com main |
| [apostilas/_rascunhos/lote-11-aula-226-demencias.md](cadeia/-rascunhos-lote-11-aula-226-demencias-md.md) | 1 | editorial/lote-11-demensias-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-130-build-input-preliminar.json](cadeia/-rascunhos-lote-06-130-build-input-preliminar-json.md) | 1 | editorial/lote-06-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-128-sepse-choque-septico-pediatrico.md](cadeia/-rascunhos-lote-06-128-sepse-choque-septico-pediatrico-md.md) | 1 | editorial/lote-06-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-13-271-endocrinologia-pediatrica.md](cadeia/-rascunhos-lote-13-271-endocrinologia-pediatrica-md.md) | 1 | editorial/lote-13-preenchimento-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-08-aula-180-complemento-02-doenca-nao-oncologica-comunicacao.md](cadeia/-rascunhos-lote-08-aula-180-complemento-02-doenca-nao-oncologica-comunicacao-md.md) | 1 | editorial/lote-08-inventario-e-producao-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-03-052-traumatismo-cranioencefalico.md](cadeia/-rascunhos-lote-03-052-traumatismo-cranioencefalico-md.md) | 1 | editorial/apostilas-lote-03-trauma-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-125-rastreamento-prevencao-quaternaria.md](cadeia/-rascunhos-lote-06-125-rastreamento-prevencao-quaternaria-md.md) | 1 | editorial/lote-06-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-126-preview.html](cadeia/-rascunhos-lote-06-126-preview-html.md) | 1 | editorial/lote-06-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-10-aula-207-prolapso-incontinencia-urinaria-feminina.md](cadeia/-rascunhos-lote-10-aula-207-prolapso-incontinencia-urinaria-feminina-md.md) | 1 | editorial/lote-10-204-225 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-121-build-input-preliminar.json](cadeia/-rascunhos-lote-06-121-build-input-preliminar-json.md) | 1 | editorial/lote-06-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-07-aula-138-crises-convulsivas-estado-mal.md](cadeia/-rascunhos-lote-07-aula-138-crises-convulsivas-estado-mal-md.md) | 1 | editorial/lote-05-103-tuberculose-infancia-20261015<br>editorial/lote-05-105-estudos-epidemiologicos-20261014<br>editorial/lote-05-106-lesao-renal-aguda-20261015<br>editorial/lote-05-107-hernias-parede-20261015<br>editorial/lote-05-108-itu-infancia-20261015<br>editorial/lote-05-109-puerperio-20261015<br>editorial/lote-05-110-ensaios-revisoes-20261015<br>editorial/lote-05-111-drc-20261015<br>editorial/lote-05-112-diverticulite-20261015<br>editorial/lote-05-113-nefrotica-nefritica-20261015<br>editorial/lote-05-114-infeccao-puerperal-20261015<br>editorial/lote-05-115-vieses-causalidade-20261015<br>editorial/lote-05-auditoria-clinica-20261014<br>editorial/lote-05-hpp-tardia-asma-20261014 | Comparar com main |
| [apostilas/_rascunhos/lote-13-250-transtornos-alimentares.md](cadeia/-rascunhos-lote-13-250-transtornos-alimentares-md.md) | 1 | editorial/lote-13-preenchimento-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-129-controle-editorial.md](cadeia/-rascunhos-lote-06-129-controle-editorial-md.md) | 1 | editorial/lote-06-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-118-build-input-preliminar.json](cadeia/-rascunhos-lote-06-118-build-input-preliminar-json.md) | 1 | editorial/lote-06-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-121-preview.html](cadeia/-rascunhos-lote-06-121-preview-html.md) | 1 | editorial/lote-06-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-controle-integracao-116-137-20261015.md](cadeia/-rascunhos-lote-06-controle-integracao-116-137-20261015-md.md) | 1 | editorial/lote-06-continuacao-132-137-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-07-aula-127-hemorragia-digestiva-alta.md](cadeia/-rascunhos-lote-07-aula-127-hemorragia-digestiva-alta-md.md) | 1 | audit/enamed-7areas-lotes-finais-20261015<br>editorial/lote-05-103-tuberculose-infancia-20261015<br>editorial/lote-05-105-estudos-epidemiologicos-20261014<br>editorial/lote-05-106-lesao-renal-aguda-20261015<br>editorial/lote-05-107-hernias-parede-20261015<br>editorial/lote-05-108-itu-infancia-20261015<br>editorial/lote-05-109-puerperio-20261015<br>editorial/lote-05-110-ensaios-revisoes-20261015<br>editorial/lote-05-111-drc-20261015<br>editorial/lote-05-112-diverticulite-20261015<br>editorial/lote-05-113-nefrotica-nefritica-20261015<br>editorial/lote-05-114-infeccao-puerperal-20261015<br>editorial/lote-05-115-vieses-causalidade-20261015<br>editorial/lote-05-auditoria-clinica-20261014<br>editorial/lote-05-hpp-tardia-asma-20261014<br>editorial/lote-08-inventario-e-producao-20261014<br>editorial/lote-10-apostilas-20261015<br>editorial/lote-11-demensias-20261015<br>editorial/lote-12-producao-20261015<br>editorial/lote-13-preenchimento-20261015 | Comparar com main |
| [apostilas/_rascunhos/lote-06-118-anemias-na-infancia.md](cadeia/-rascunhos-lote-06-118-anemias-na-infancia-md.md) | 1 | editorial/lote-06-auditoria-20261014<br>editorial/lote-06-continuacao-132-137-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-08-aula-176-avc-crises-convulsivas.md](cadeia/-rascunhos-lote-08-aula-176-avc-crises-convulsivas-md.md) | 1 | editorial/lote-08-inventario-e-producao-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-03-058-diarreia-aguda-pediatria.md](cadeia/-rascunhos-lote-03-058-diarreia-aguda-pediatria-md.md) | 1 | editorial/apostilas-lote-03-trauma-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-08-aula-175-declaracao-obito-indicadores.md](cadeia/-rascunhos-lote-08-aula-175-declaracao-obito-indicadores-md.md) | 1 | editorial/lote-08-inventario-e-producao-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-120-build-input-preliminar.json](cadeia/-rascunhos-lote-06-120-build-input-preliminar-json.md) | 1 | editorial/lote-06-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-127-build-input-preliminar.json](cadeia/-rascunhos-lote-06-127-build-input-preliminar-json.md) | 1 | editorial/lote-06-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-13-257-planejamento-gestao-servicos-saude.md](cadeia/-rascunhos-lote-13-257-planejamento-gestao-servicos-saude-md.md) | 1 | editorial/lote-13-preenchimento-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-122-perfuracao-de-viscera-oca.md](cadeia/-rascunhos-lote-06-122-perfuracao-de-viscera-oca-md.md) | 2 | editorial/lote-06-auditoria-20261014<br>editorial/lote-06-continuacao-132-137-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-08-aula-178-consolidada-revisao-20261016.md](cadeia/-rascunhos-lote-08-aula-178-consolidada-revisao-20261016-md.md) | 1 | editorial/lote-08-inventario-e-producao-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-122-build-input-preliminar.json](cadeia/-rascunhos-lote-06-122-build-input-preliminar-json.md) | 1 | editorial/lote-06-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-05-103-tuberculose-infancia.md](cadeia/-rascunhos-lote-05-103-tuberculose-infancia-md.md) | 1 | editorial/lote-05-103-tuberculose-infancia-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-120-controle-editorial.md](cadeia/-rascunhos-lote-06-120-controle-editorial-md.md) | 1 | editorial/lote-06-auditoria-20261014<br>editorial/lote-06-continuacao-132-137-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-122-preview.html](cadeia/-rascunhos-lote-06-122-preview-html.md) | 1 | editorial/lote-06-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-12-aula-238-trauma-raquimedular.md](cadeia/-rascunhos-lote-12-aula-238-trauma-raquimedular-md.md) | 1 | editorial/lote-12-producao-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-07-aula-135-imunizacoes-pni-2026.md](cadeia/-rascunhos-lote-07-aula-135-imunizacoes-pni-2026-md.md) | 2 | editorial/lote-05-103-tuberculose-infancia-20261015<br>editorial/lote-05-105-estudos-epidemiologicos-20261014<br>editorial/lote-05-106-lesao-renal-aguda-20261015<br>editorial/lote-05-107-hernias-parede-20261015<br>editorial/lote-05-108-itu-infancia-20261015<br>editorial/lote-05-109-puerperio-20261015<br>editorial/lote-05-110-ensaios-revisoes-20261015<br>editorial/lote-05-111-drc-20261015<br>editorial/lote-05-112-diverticulite-20261015<br>editorial/lote-05-113-nefrotica-nefritica-20261015<br>editorial/lote-05-114-infeccao-puerperal-20261015<br>editorial/lote-05-115-vieses-causalidade-20261015<br>editorial/lote-05-auditoria-clinica-20261014<br>editorial/lote-05-hpp-tardia-asma-20261014<br>editorial/lote-06-continuacao-132-137-20261015 | Comparar com main |
| [apostilas/_rascunhos/lote-04-aula-066-derrame-pleural.md](cadeia/-rascunhos-lote-04-aula-066-derrame-pleural-md.md) | 1 | editorial/lote-04-aula66-derrame-pleural-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-131-hepatites-virais.md](cadeia/-rascunhos-lote-06-131-hepatites-virais-md.md) | 1 | editorial/lote-06-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-10-208-gestacao-gemelar-alto-risco.md](cadeia/-rascunhos-lote-10-208-gestacao-gemelar-alto-risco-md.md) | 1 | editorial/lote-10-apostilas-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-11-aula-233-oncologia-clinica-emergencias-oncologicas.md](cadeia/-rascunhos-lote-11-aula-233-oncologia-clinica-emergencias-oncologicas-md.md) | 1 | editorial/lote-11-demensias-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-123-preview.html](cadeia/-rascunhos-lote-06-123-preview-html.md) | 1 | editorial/lote-06-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-08-aula-174-complemento-02-conduta-e-casos.md](cadeia/-rascunhos-lote-08-aula-174-complemento-02-conduta-e-casos-md.md) | 1 | editorial/lote-08-inventario-e-producao-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-13-251-transtornos-personalidade-autolesao.md](cadeia/-rascunhos-lote-13-251-transtornos-personalidade-autolesao-md.md) | 1 | editorial/lote-13-preenchimento-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-05-115-vieses-confundimento-causalidade.md](cadeia/-rascunhos-lote-05-115-vieses-confundimento-causalidade-md.md) | 1 | editorial/lote-05-103-tuberculose-infancia-20261015<br>editorial/lote-05-115-vieses-causalidade-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-10-aula-204-vasculites-pediatricas-kawasaki.md](cadeia/-rascunhos-lote-10-aula-204-vasculites-pediatricas-kawasaki-md.md) | 1 | editorial/lote-10-204-225 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-10-aula-207-anexo-editorial.md](cadeia/-rascunhos-lote-10-aula-207-anexo-editorial-md.md) | 1 | editorial/lote-10-204-225 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-07-aula-122-perfuracao-viscera-oca.md](cadeia/-rascunhos-lote-07-aula-122-perfuracao-viscera-oca-md.md) | 1 | audit/enamed-7areas-lotes-finais-20261015<br>editorial/lote-05-103-tuberculose-infancia-20261015<br>editorial/lote-05-105-estudos-epidemiologicos-20261014<br>editorial/lote-05-106-lesao-renal-aguda-20261015<br>editorial/lote-05-107-hernias-parede-20261015<br>editorial/lote-05-108-itu-infancia-20261015<br>editorial/lote-05-109-puerperio-20261015<br>editorial/lote-05-110-ensaios-revisoes-20261015<br>editorial/lote-05-111-drc-20261015<br>editorial/lote-05-112-diverticulite-20261015<br>editorial/lote-05-113-nefrotica-nefritica-20261015<br>editorial/lote-05-114-infeccao-puerperal-20261015<br>editorial/lote-05-115-vieses-causalidade-20261015<br>editorial/lote-05-auditoria-clinica-20261014<br>editorial/lote-05-hpp-tardia-asma-20261014<br>editorial/lote-08-inventario-e-producao-20261014<br>editorial/lote-10-apostilas-20261015<br>editorial/lote-11-demensias-20261015<br>editorial/lote-12-producao-20261015<br>editorial/lote-13-preenchimento-20261015<br>editorial/lote04-aula64-placenta-dpp-20261014 | Comparar com main |
| [apostilas/_rascunhos/lote-08-aula-177-consolidada-revisao-20261015.md](cadeia/-rascunhos-lote-08-aula-177-consolidada-revisao-20261015-md.md) | 1 | editorial/lote-08-inventario-e-producao-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-10-205-dor-pelvica-torcao-anexial.md](cadeia/-rascunhos-lote-10-205-dor-pelvica-torcao-anexial-md.md) | 1 | editorial/lote-10-apostilas-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-08-aula-177-complicacoes-pos-operatorias.md](cadeia/-rascunhos-lote-08-aula-177-complicacoes-pos-operatorias-md.md) | 1 | editorial/lote-08-inventario-e-producao-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-13-258-ats-custo-efetividade.md](cadeia/-rascunhos-lote-13-258-ats-custo-efetividade-md.md) | 1 | editorial/lote-13-preenchimento-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-08-aula-180-cuidados-paliativos-comunicacao.md](cadeia/-rascunhos-lote-08-aula-180-cuidados-paliativos-comunicacao-md.md) | 1 | editorial/lote-08-inventario-e-producao-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-122-controle-editorial.md](cadeia/-rascunhos-lote-06-122-controle-editorial-md.md) | 1 | editorial/lote-06-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-09-aula-186-arboviroses-dengue-chikungunya-zika.md](cadeia/-rascunhos-lote-09-aula-186-arboviroses-dengue-chikungunya-zika-md.md) | 1 | editorial/lote-09-producao-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-10-aula-213-transtornos-ansiosos-toc-trauma.md](cadeia/-rascunhos-lote-10-aula-213-transtornos-ansiosos-toc-trauma-md.md) | 1 | editorial/lote-10-204-225 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-05-112-diverticulite-aguda.md](cadeia/-rascunhos-lote-05-112-diverticulite-aguda-md.md) | 1 | editorial/lote-05-103-tuberculose-infancia-20261015<br>editorial/lote-05-112-diverticulite-20261015<br>editorial/lote-05-113-nefrotica-nefritica-20261015<br>editorial/lote-05-114-infeccao-puerperal-20261015<br>editorial/lote-05-115-vieses-causalidade-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-05-101-disturbios-acido-base.md](cadeia/-rascunhos-lote-05-101-disturbios-acido-base-md.md) | 1 | editorial/lote-05-103-tuberculose-infancia-20261015 | Comparar com main |
| [apostilas/_rascunhos/lote-06-124-controle-editorial.md](cadeia/-rascunhos-lote-06-124-controle-editorial-md.md) | 1 | editorial/lote-06-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-10-aula-212-transtorno-bipolar-episodios-humor.md](cadeia/-rascunhos-lote-10-aula-212-transtorno-bipolar-episodios-humor-md.md) | 1 | editorial/lote-10-204-225 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-09-aula-188-anafilaxia-reacoes-alergicas-graves.md](cadeia/-rascunhos-lote-09-aula-188-anafilaxia-reacoes-alergicas-graves-md.md) | 1 | editorial/lote-09-producao-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-07-aula-131-hepatites-virais.md](cadeia/-rascunhos-lote-07-aula-131-hepatites-virais-md.md) | 1 | editorial/lote-05-103-tuberculose-infancia-20261015<br>editorial/lote-05-105-estudos-epidemiologicos-20261014<br>editorial/lote-05-106-lesao-renal-aguda-20261015<br>editorial/lote-05-107-hernias-parede-20261015<br>editorial/lote-05-108-itu-infancia-20261015<br>editorial/lote-05-109-puerperio-20261015<br>editorial/lote-05-110-ensaios-revisoes-20261015<br>editorial/lote-05-111-drc-20261015<br>editorial/lote-05-112-diverticulite-20261015<br>editorial/lote-05-113-nefrotica-nefritica-20261015<br>editorial/lote-05-114-infeccao-puerperal-20261015<br>editorial/lote-05-115-vieses-causalidade-20261015<br>editorial/lote-05-auditoria-clinica-20261014<br>editorial/lote-05-hpp-tardia-asma-20261014 | Comparar com main |
| [apostilas/_rascunhos/lote-06-116-controle-editorial.md](cadeia/-rascunhos-lote-06-116-controle-editorial-md.md) | 1 | editorial/lote-06-auditoria-20261014<br>editorial/lote-06-continuacao-132-137-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-11-aula-227-parkinson-disturbios-movimento.md](cadeia/-rascunhos-lote-11-aula-227-parkinson-disturbios-movimento-md.md) | 1 | editorial/lote-11-demensias-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-04-aula-065-vigilancia-sanitaria.md](cadeia/-rascunhos-lote-04-aula-065-vigilancia-sanitaria-md.md) | 1 | editorial/lote-04-aula65-vigilancia-sanitaria-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-05-107-hernias-parede-abdominal.md](cadeia/-rascunhos-lote-05-107-hernias-parede-abdominal-md.md) | 1 | editorial/lote-05-103-tuberculose-infancia-20261015<br>editorial/lote-05-107-hernias-parede-20261015<br>editorial/lote-05-108-itu-infancia-20261015<br>editorial/lote-05-109-puerperio-20261015<br>editorial/lote-05-110-ensaios-revisoes-20261015<br>editorial/lote-05-111-drc-20261015<br>editorial/lote-05-112-diverticulite-20261015<br>editorial/lote-05-113-nefrotica-nefritica-20261015<br>editorial/lote-05-114-infeccao-puerperal-20261015<br>editorial/lote-05-115-vieses-causalidade-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-03-055-vigilancia-em-saude.md](cadeia/-rascunhos-lote-03-055-vigilancia-em-saude-md.md) | 1 | editorial/apostilas-lote-03-trauma-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-10-aula-206-miomas-polipos-patologia-uterina-benigna.md](cadeia/-rascunhos-lote-10-aula-206-miomas-polipos-patologia-uterina-benigna-md.md) | 1 | editorial/lote-10-204-225 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-10-210-psicopatologia-exame-mental.md](cadeia/-rascunhos-lote-10-210-psicopatologia-exame-mental-md.md) | 1 | editorial/lote-10-apostilas-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-118-preview.html](cadeia/-rascunhos-lote-06-118-preview-html.md) | 1 | editorial/lote-06-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-03-050-financiamento-gestao-sus.md](cadeia/-rascunhos-lote-03-050-financiamento-gestao-sus-md.md) | 1 | editorial/apostilas-lote-03-trauma-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-116-build-input-preliminar.json](cadeia/-rascunhos-lote-06-116-build-input-preliminar-json.md) | 1 | editorial/lote-06-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-128-controle-editorial.md](cadeia/-rascunhos-lote-06-128-controle-editorial-md.md) | 1 | editorial/lote-06-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-10-209-aloimunizacao-materno-fetal-doenca-hemolitica.md](cadeia/-rascunhos-lote-10-209-aloimunizacao-materno-fetal-doenca-hemolitica-md.md) | 1 | editorial/lote-10-apostilas-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-136-137-controle-editorial-cientifico-20261015.md](cadeia/-rascunhos-lote-06-136-137-controle-editorial-cientifico-20261015-md.md) | 1 | editorial/lote-06-continuacao-132-137-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-07-aula-125-rastreamento-prevencao-quaternaria.md](cadeia/-rascunhos-lote-07-aula-125-rastreamento-prevencao-quaternaria-md.md) | 1 | audit/enamed-7areas-lotes-finais-20261015<br>editorial/lote-05-103-tuberculose-infancia-20261015<br>editorial/lote-05-105-estudos-epidemiologicos-20261014<br>editorial/lote-05-106-lesao-renal-aguda-20261015<br>editorial/lote-05-107-hernias-parede-20261015<br>editorial/lote-05-108-itu-infancia-20261015<br>editorial/lote-05-109-puerperio-20261015<br>editorial/lote-05-110-ensaios-revisoes-20261015<br>editorial/lote-05-111-drc-20261015<br>editorial/lote-05-112-diverticulite-20261015<br>editorial/lote-05-113-nefrotica-nefritica-20261015<br>editorial/lote-05-114-infeccao-puerperal-20261015<br>editorial/lote-05-115-vieses-causalidade-20261015<br>editorial/lote-05-auditoria-clinica-20261014<br>editorial/lote-05-hpp-tardia-asma-20261014<br>editorial/lote-08-inventario-e-producao-20261014<br>editorial/lote-10-apostilas-20261015<br>editorial/lote-12-producao-20261015<br>editorial/lote-13-preenchimento-20261015<br>editorial/lote04-aula64-placenta-dpp-20261014 | Comparar com main |
| [apostilas/_rascunhos/lote-08-aula-176-complemento-02-etiologia-prevencao.md](cadeia/-rascunhos-lote-08-aula-176-complemento-02-etiologia-prevencao-md.md) | 1 | editorial/lote-08-inventario-e-producao-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-125-build-input-preliminar.json](cadeia/-rascunhos-lote-06-125-build-input-preliminar-json.md) | 1 | editorial/lote-06-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-135-controle-cientifico-20261015.md](cadeia/-rascunhos-lote-06-135-controle-cientifico-20261015-md.md) | 1 | editorial/lote-06-continuacao-132-137-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-10-206-miomas-polipos-patologia-uterina-benigna.md](cadeia/-rascunhos-lote-10-206-miomas-polipos-patologia-uterina-benigna-md.md) | 1 | editorial/lote-10-apostilas-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-134-controle-cientifico-20261015.md](cadeia/-rascunhos-lote-06-134-controle-cientifico-20261015-md.md) | 1 | editorial/lote-06-continuacao-132-137-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-03-053-desidratacao-terapia-reidratacao-pediatria.md](cadeia/-rascunhos-lote-03-053-desidratacao-terapia-reidratacao-pediatria-md.md) | 1 | editorial/apostilas-lote-03-trauma-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-05-095-acuracia-testes-diagnosticos.md](cadeia/-rascunhos-lote-05-095-acuracia-testes-diagnosticos-md.md) | 1 | editorial/lote-05-103-tuberculose-infancia-20261015<br>editorial/lote-05-105-estudos-epidemiologicos-20261014<br>editorial/lote-05-106-lesao-renal-aguda-20261015<br>editorial/lote-05-107-hernias-parede-20261015<br>editorial/lote-05-108-itu-infancia-20261015<br>editorial/lote-05-109-puerperio-20261015<br>editorial/lote-05-110-ensaios-revisoes-20261015<br>editorial/lote-05-111-drc-20261015<br>editorial/lote-05-112-diverticulite-20261015<br>editorial/lote-05-113-nefrotica-nefritica-20261015<br>editorial/lote-05-114-infeccao-puerperal-20261015<br>editorial/lote-05-115-vieses-causalidade-20261015<br>editorial/lote-05-hpp-tardia-asma-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-130-preview.html](cadeia/-rascunhos-lote-06-130-preview-html.md) | 1 | editorial/lote-06-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-116-preview.html](cadeia/-rascunhos-lote-06-116-preview-html.md) | 1 | editorial/lote-06-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-10-205-dor-pelvica-aguda-torcao-anexial.md](cadeia/-rascunhos-lote-10-205-dor-pelvica-aguda-torcao-anexial-md.md) | 1 | editorial/lote-10-apostilas-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-08-aula-181-eletrocardiografia.md](cadeia/-rascunhos-lote-08-aula-181-eletrocardiografia-md.md) | 1 | editorial/lote-08-inventario-e-producao-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-117-preview.html](cadeia/-rascunhos-lote-06-117-preview-html.md) | 1 | editorial/lote-06-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-06-130-controle-editorial.md](cadeia/-rascunhos-lote-06-130-controle-editorial-md.md) | 1 | editorial/lote-06-auditoria-20261014 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-13-274-ortopedia-pediatrica.md](cadeia/-rascunhos-lote-13-274-ortopedia-pediatrica-md.md) | 1 | editorial/lote-13-preenchimento-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-13-252-saude-mental-gestacao-puerperio.md](cadeia/-rascunhos-lote-13-252-saude-mental-gestacao-puerperio-md.md) | 1 | editorial/lote-13-preenchimento-20261015 | Conteúdo fora da main |
| [apostilas/_rascunhos/lote-07-aula-126-cirrose-complicacoes.md](cadeia/-rascunhos-lote-07-aula-126-cirrose-complicacoes-md.md) | 1 | audit/enamed-7areas-lotes-finais-20261015<br>editorial/lote-05-103-tuberculose-infancia-20261015<br>editorial/lote-05-105-estudos-epidemiologicos-20261014<br>editorial/lote-05-106-lesao-renal-aguda-20261015<br>editorial/lote-05-107-hernias-parede-20261015<br>editorial/lote-05-108-itu-infancia-20261015<br>editorial/lote-05-109-puerperio-20261015<br>editorial/lote-05-110-ensaios-revisoes-20261015<br>editorial/lote-05-111-drc-20261015<br>editorial/lote-05-112-diverticulite-20261015<br>editorial/lote-05-113-nefrotica-nefritica-20261015<br>editorial/lote-05-114-infeccao-puerperal-20261015<br>editorial/lote-05-115-vieses-causalidade-20261015<br>editorial/lote-05-auditoria-clinica-20261014<br>editorial/lote-05-hpp-tardia-asma-20261014<br>editorial/lote-08-inventario-e-producao-20261014<br>editorial/lote-10-apostilas-20261015<br>editorial/lote-11-demensias-20261015<br>editorial/lote-12-producao-20261015<br>editorial/lote-13-preenchimento-20261015 | Comparar com main |
| [apostilas/_rascunhos/lote-06-117-build-input-preliminar.json](cadeia/-rascunhos-lote-06-117-build-input-preliminar-json.md) | 1 | editorial/lote-06-auditoria-20261014 | Conteúdo fora da main |
