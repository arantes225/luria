# LURIA — Aula 181, curadoria de tiras contínuas DII (15/10/2026)

**Status:** material médico real preparado para revisão, não homologado.

## Resultado técnico

A execução [GitHub Actions 38760090485](https://github.com/arantes225/luria/actions/runs/38760090485) concluiu **success**. Foram processados os mesmos 14 registros reais PTB-XL v1.0.3, em 500 Hz, produzindo 14 imagens DII com **10 segundos contínuos e 5.000 amostras**, sem recortes entre ciclos. Cada WebP tem 2.400 × 465 pixels e pesa entre **70.452 e 84.012 bytes**, abaixo do limite técnico de 120.000 bytes. O manifesto valida fonte WFDB, SHA-256, tempo, voltagem e licença.

**Artefato GitHub Actions:** ID 11985541737, nome LURIA-PTBXL-DII-10s-500Hz-REVIEW-ONLY, com expiração 22/10/2026. A versão conjunta entregue na conversa, LURIA_ECG_181_14_pares_500Hz_12derivacoes_DII10s_REVIEW.zip, reúne **14 imagens de 12 derivações + 14 tiras DII**, totalizando 28 imagens reais organizadas em 14 pares. Nenhum arquivo de imagem foi publicado no site ou adicionado à main.

**Fonte:** Wagner P et al. PTB-XL 1.0.3, PhysioNet. DOI 10.13026/kfzx-aw45, licença CC BY 4.0, com atribuição e registro de adaptações obrigatórios.

## Uso didático: o que cada par ajuda a verificar

| Registros / códigos originais | Perguntas de revisão cardiológica |
|---|---|
| 00057 NORM | Há P antes de cada QRS, RR regulares e intervalos normais? |
| 08215 AFIB | A ausência de P e irregularidade dos RR são comprováveis na DII? |
| 00449 AFLT | Há atividade atrial organizada e relação de condução AV compatível? |
| 07075 SVTAC | Regularidade, morfologia de P e diferenciais de reentrada/flutter? |
| 00892 STACH, 00611 SBRAD | P sinusal, FC real e contexto de aceleração/lentificação? |
| 00218 1AVB | PR medido corretamente e condução 1:1 demonstrada? |
| 19164 2AVB | Existe P não conduzida? Progressão de PR? Evitar chamar 2:1 de Mobitz II automaticamente |
| 00959 3AVB | P e QRS realmente dissociados? Identificar escape e artefatos |
| 00598 CLBBB, 00172 CRBBB | Morfologia/duração de QRS dependem do ECG completo de 12 derivações |
| 01391 IMI, 00271 ASMI | Códigos de infarto do banco não comprovam IAM agudo; correlacionar Q/ST/T e clínica |
| 02221 LNGQT | Medir QT/RR e QTc por fórmula explícita antes de qualquer diagnóstico |

## Advertências e bloqueios

O formato de 12 derivações apresenta quatro janelas sucessivas de 2,5 s e é útil para morfologia/topografia. A tira DII de 10 s complementa esse formato na análise de ritmo, mas **não substitui todas as 12 derivações, Holter ou avaliação clínica**. As grades estão em unidades digitais de tempo/voltagem; o tamanho físico da imagem no navegador não equivale automaticamente a papel calibrado a 25 mm/s e 10 mm/mV.

Todos os códigos são **anotações candidatas do PTB-XL, e não laudos independentes da LURIA**. Os 14 pares ainda exigem revisão por cardiologista, validação das legendas, licença e atribuição por imagem, aprovação no Admin e testes de PWA/desktop. **Zero imagens homologadas, zero publicadas, sem merge/deploy.**

**Arquivos técnicos na branch:** scripts/editorial/render_ptbxl_rhythm_strips.py, scripts/editorial/ptbxl-14-ids-review.json, scripts/editorial/tests/test_ptbxl_pipeline.py e .github/workflows/editorial-ptbxl-rhythm-10s.yml.
