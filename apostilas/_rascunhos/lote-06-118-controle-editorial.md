# Lote 6 — Apostila 118 · Controle editorial e autossuficiência

**Status:** rascunho original em revisão; sem publicação/merge/deploy; documento atualizado em 14/10/2026.

## Inventário e extensão
- Tema 118 da sequência de 260 apostilas/13 lotes, área Pediatria.
- Não havia pasta publicada ou rascunho de mesmo título na consulta inicial ao repositório `arantes225/luria`.
- Fonte: `apostilas/_rascunhos/lote-06-118-anemias-na-infancia.md` com **91.765 caracteres brutos Markdown**.
- Corpo didático aproximado dos capítulos 1–27, excluindo casos e questões: **61.994 caracteres após remoção de marcadores básicos e URLs**. Não é certificação de texto único/validado.
- **31 capítulos numerados** no rascunho, sendo os capítulos 28 e 29 de casos e questões, e 30 e 31 de referências e auditoria.
- **8 casos clínicos**, **12 questões** originais comentadas com análise das alternativas.

## Etapa zero — benchmark realmente lido
Foram abertos, lidos e comparados os seguintes documentos do Google Drive: **“03 - HEMATO - ANEMIA FERROPRIVA, SUPLEMENTACAO DE FERRO E TALASSEMIA.pdf”** (aproximadamente 25,3 mil caracteres de texto extraído); **“01 - INTRODUCAO AS ANEMIAS.pdf”** (19,2 mil); **“02 - HEMATO - ANEMIA FALCIFORME.pdf”** (15,6 mil); e o resumo **“Anemias.pdf”** (3,1 mil). A autoria institucional como Estratégia MED **não foi confirmada**; marcas/identificações presentes no material indicam outras proveniências e não autorizam tratar tais PDFs como apostilas oficiais Estratégia MED. Um documento LURIA existente (`apostilas/amenorreia/index.html`) foi aberto para conferir organização editorial, CSS, navegação e estilo sem reutilizar texto clínico. Os documentos privados do Drive não foram copiados e seus links/IDs não foram depositados no repositório.

## Referências médicas verificadas externamente
1. **SBP 2026**, diretriz nº 32 (17/03/2026): prevenção para lactente termo saudável 10–12,5 mg de Fe elementar/dia em ciclos de 3 meses (início ~6 e ~12 meses), e **tratamento 3–6 mg/kg/dia**, reavaliando Hb em 30–45 dias. Fonte: https://www.sbp.com.br/wp-content/uploads/2026/03/25239c-Diretrizes-Recom-p-tratam-e-prevencao-da-deficiencia-de-Fe-e-anemia-ferropriva.pdf .
2. **OMS 2024:** Hb menor que 10,5 g/dL em 6–23 meses; menor que 11 em 24–59 meses. Fonte: https://www.who.int/publications/i/item/9789240088542 .
3. **PCDT Doença Falciforme**, portaria 2024: https://www.gov.br/saude/pt-br/assuntos/pcdt/d/doenca-falciforme/view .
4. **PCDT AHAI**, Portaria Conjunta nº 7/2025: https://bvs.saude.gov.br/bvs/saudelegis/Saes/2025/poc0007_14_07_2025.html .
5. **Ministério da Saúde PNSF** Nota Técnica 15/2022, distinguir do tratamento da anemia: https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes/notas-tecnicas/2022/nota-tecnica-no-15-2022.pdf .

## Matriz de cobertura das questões — corpo didático, excluindo gabaritos

| Questão | Competência testada | Capítulo | Palavras-chave encontradas | Status |
| --- | --- | --- | --- | --- |
| 1 | Hb por idade na OMS 2024 | 2 | 6–23 meses ✓; 10,5 ✓ | Cobertura lexical preliminar |
| 2 | Diagnóstico ferropriva | 6 | ferritina ✓; rdw ✓ | Cobertura lexical preliminar |
| 3 | Profilaxia SBP 2026 | 8 | 10–12,5 mg/dia ✓; ciclos ✓ | Cobertura lexical preliminar |
| 4 | Resposta ao ferro terapêutico | 7 | 30–45 dias ✓; 1,0 g/dL ✓ | Cobertura preliminar |
| 5 | Microcitose familiar e fracionamento | 9 | talassemia ✓; HPLC ✓ | Cobertura preliminar |
| 6 | Febre na falciforme | 10 | febre ✓; antibiótico ✓ | Cobertura lexical preliminar |
| 7 | Crise aplástica | 11 | parvovírus ✓; reticulócitos ✓ | Cobertura lexical preliminar |
| 8 | Esferocitose | 12 | esferócitos ✓; negativo ✓ | Cobertura lexical preliminar |
| 9 | G6PD na crise | 13 | falsamente normal ✓; hemólise ✓ | Cobertura lexical preliminar |
| 10 | SHU | 19 | esquizócitos ✓; plaquetopenia ✓ | Cobertura lexical preliminar |
| 11 | B12 e folato | 17 | neurológica ✓; folato ✓ | Cobertura lexical preliminar |
| 12 | Falência da medula | 18 | leucemia ✓; pancitopenia ✓ | Cobertura lexical preliminar |

**Resultado: 12/12**, usando teste de presença de conceitos no corpo didático independente das questões. **Limite essencial:** cobertura por busca de termos não prova que a justificativa de cada alternativa está completa ou clinicamente correta. Revisão pedagógica e médica continua obrigatória.

## Preparação técnica
- `apostilas/_rascunhos/lote-06-118-build-input-preliminar.json`: 30 seções no formato de insumo JSON para o gerador; 11 referências externas; imagens não inseridas.
- `apostilas/_rascunhos/lote-06-118-preview.html`: HTML de **prévia editorial** derivado do template LURIA, com aviso de não validação e `noindex,nofollow`.
- Pré-teste estrutural: **12 questões**, **8 casos**, **12 grupos de alternativas A–D**, **0 âncoras faltantes**, **0 imagens embutidas** no artigo.
- Os scripts oficiais do repositório (`node scripts/build-apostilas-batch.cjs --input ... --dry-run`, `audit-apostilas-60k.mjs`, `audit-apostilas-batch.cjs`, `check-syntax.cjs`) **não foram executados**; há apenas pré-validações em JavaScript do conteúdo e HTML. Não relatar aprovação pelo validador oficial.

## Pendências bloqueadoras da conclusão
- [ ] Leitura comparativa de referência realmente extensa e de autoria institucional confirmada, se acessível; caso contrário manter limitação documental.
- [ ] Revisão médica especializada frase a frase (especialmente riscos transfusionais, prescrição pediátrica, doença falciforme, profilaxias e G6PD).
- [ ] Confirmar unicidade semântica do texto; contagem do corpo útil e autossuficiência reais, não somente 60K brutos/termos em questões.
- [ ] Curadoria de ao menos 10 imagens candidatas que sejam úteis, autorizadas e com fonte/licença individual verificadas; fila de aprovação Admin, sem inserção direta.
- [ ] Execução de validadores oficiais e inspeção desktop/PWA; corrigir eventuais erros.
- [ ] Revisão de títulos/subtítulos, legenda das figuras, conforto de leitura e referenciamento.
- [ ] Aprovação médica/editorial antes de publicar; nenhum merge/deploy automático.


## Correção após teste de autossuficiência
A matriz inicial encontrou lacunas na exposição dos capítulos 7 e 9 em relação às perguntas 4 e 5. Foram incluídas explicações explícitas sobre **ganho de Hb ≥1 g/dL após 30–45 dias de ferro oral segundo SBP 2026** e sobre **HPLC/eletroforese de hemoglobinas na investigação de talassemias**. O Markdown fonte, insumo JSON e HTML de prévia foram atualizados na mesma branch. A cobertura passou a 12/12 na triagem, sem constituir ainda aprovação clínica.
