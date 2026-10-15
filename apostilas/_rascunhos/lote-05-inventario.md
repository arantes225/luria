# LURIA — Inventário editorial do Lote 5 (093–115)
Data: 14/10/2026. **Situação:** auditoria inicial, não certificação de completude.
Fonte da grade: `assets/js/cronograma-base-data.js`, aulas 93–115. Não inferir existência de apostila a partir do índice de assuntos.

| Nº | Área | Tema | Situação inicial no repositório |
|---|---|---|---|
| 093 | Pediatria | Asma na infância | Rascunho original iniciado em `_rascunhos/lote-05-093-asma-infancia.md`; não publicado |
| 094 | GO | Rotura prematura de membranas | Pasta existente `amniorrexe-prematura/`; preservar e auditar |
| 095 | Preventiva | Sensibilidade, especificidade e valores preditivos | Não identificada pasta temática homônima; buscar conteúdo integrado |
| 096 | Clínica | Distúrbios hidroeletrolíticos | Não identificada pasta homônima; auditar antes de criar |
| 097 | Cirurgia | Pancreatite aguda cirúrgica | Não identificada pasta homônima; auditar antes de criar |
| 098 | Pediatria | Crupe e epiglotite | Não identificada pasta homônima; auditar antes de criar |
| 099 | GO | Trabalho de parto prematuro | `trabalho-parto-prematuro/index.html` é apenas o contêiner (~3,1 mil caracteres); conteúdo médico já existe em `content.json` (~71,1 mil caracteres brutos). Preservar e auditar utilidade real |
| 100 | Preventiva | Testes diagnósticos e curvas ROC | Sem pasta homônima identificada; avaliar complementaridade com nº 095 |
| 101 | Clínica | Distúrbios ácido-base | Sem pasta homônima identificada |
| 102 | Cirurgia | Obstrução intestinal | Sem pasta homônima identificada |
| 103 | Pediatria | Tuberculose na infância | Sem pasta homônima identificada |
| 104 | GO | Hemorragia pós-parto | Sem pasta homônima identificada; possível relação com `assistencia-ao-parto/`, que deve ser lida antes de decidir |
| 105 | Preventiva | Desenhos de estudos epidemiológicos | Sem pasta homônima identificada |
| 106 | Clínica | Lesão renal aguda | Sem pasta homônima identificada |
| 107 | Cirurgia | Hérnias da parede abdominal | Sem pasta homônima identificada |
| 108 | Pediatria | Infecção urinária na criança | Sem pasta homônima identificada |
| 109 | GO | Puerpério normal e patológico | Sem pasta homônima identificada; auditar `assistencia-ao-parto/` |
| 110 | Preventiva | Ensaios clínicos e revisões sistemáticas | Sem pasta homônima identificada; cruzar nº 105 |
| 111 | Clínica | Doença renal crônica | Sem pasta homônima identificada |
| 112 | Cirurgia | Diverticulite aguda | Sem pasta homônima identificada |
| 113 | Pediatria | Síndrome nefrótica e síndrome nefrítica | Sem pasta homônima identificada |
| 114 | GO | Infecção puerperal | Sem pasta homônima identificada; cruzar 109 |
| 115 | Preventiva | Vieses, confundimento e causalidade | Sem pasta homônima identificada; cruzar 105 e 110 |

## Constatações de arquivo efetivamente aberto
- `apostilas/amniorrexe-prematura/index.html`: ~104.430 caracteres de HTML total. Contém capítulos em profundidade e esquemas. **Não significa 104.430 caracteres didáticos úteis.**
- `apostilas/trabalho-parto-prematuro/index.html`: ~3.107 caracteres de HTML, **renderer legítimo**, com atributo `data-apostila-content` apontando para `content.json`. O JSON foi efetivamente aberto: ~71.107 caracteres totais, sumário com mais de 20 seções (concepção, diagnóstico, corticoterapia, tocólise, MgSO4, EGB, RPMO, casos e referências). **Apostila existente substancial: não recriar.** O tamanho bruto do JSON não mede caracteres didáticos úteis.
- `apostilas/assistencia-ao-parto/index.html`: ~83.798 caracteres de HTML total, com capítulos e fluxos relevantes; não contar como cobertura automática de HPP, puerpério ou infecção puerperal.

## Regra de continuação
Para cada apostila seguinte: pesquisar e **abrir** uma apostila comparável no Drive; examinar previamente o conteúdo LURIA existente; registrar comparação e lacunas; confirmar diretrizes vigentes; produzir texto próprio; criar candidatas de imagem somente via Admin; exigir ≥60 mil caracteres didáticos úteis, questões/casos e autossuficiência antes da publicação.

## Primeira revisão
Tema 093: comparação realizada com **Asma.pdf** e **Crise Asmática.pdf** do Drive, além do padrão visual LURIA e GINA 2026. Textos do Drive são resumos não identificados como Estratégia MED, com referências antigas. **Situação:** rascunho inicial, não apto para publicação.

## Retificação documental de 14/10/2026
A classificação inicial da apostila 099 com base apenas em `index.html` estava incorreta. Após leitura de `content.json`, a etapa correta é **auditoria de profundidade e atualização**, não criação de novo documento. Para revisão clínica, comparar com o documento FEBRASGO sobre uso racional da tocólise, a recomendação da OMS 2022 sobre corticoterapia antenatal e, separadamente, a recomendação da OMS 2022 sobre tocólise. A consulta comparativa no Drive localizada neste turno é indireta (obstetrícia e sangramento de segunda metade), portanto **a etapa zero do tema 099 ainda está pendente de uma apostila verdadeiramente equivalente**.
