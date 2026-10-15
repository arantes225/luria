# Lote 6 — Tema 130: Níveis de Prevenção e História Natural da Doença
**Etapa zero em 15/10/2026 · STATUS RASCUNHO — NÃO PUBLICAR**

## Inventário e preservação
- Inspecionados \`apostilas/\` e \`apostilas/_rascunhos/\` na branch editorial. **Nenhuma apostila publicada nem rascunho específico** de níveis de prevenção/história natural da doença estava presente.
- A apostila **120 — MBE** explica estatística de exames, inferência e viés; a **125 — Rastreamento e Prevenção Quaternária** aprofunda organização de programas e danos de sobrediagnóstico. A 130 deve ensinar **história natural, período pré-patogênico/patogênico, causalidade histórica, nível de atuação e situações clínicas que mudam de nível**, sem repetir indevidamente a 120/125.
- Diferenciar **níveis de atenção** (atenção primária, secundária e terciária na rede assistencial) de **níveis de prevenção** (primordial, primária, secundária, terciária e quaternária). Esses dois eixos são independentes: hospitais podem executar prevenção primária, e UBS faz prevenção terciária.

## Benchmark realmente lido ANTES da produção
1. Drive: **“SUS.pdf”**, ~2.670 caracteres extraídos, aborda equidade, integralidade, universalidade, regionalização e níveis de atenção. Serve para identificar confusão clássica dos níveis de atenção com prevenção; **não** é capítulo completo de Leavell/Clark.
2. Drive: **“Estudos Epidemiológicos.pdf”**, ~3.081 caracteres extraídos, resume estudos epidemiológicos. Serve apenas para evitar duplicação com MBE 120.
- Buscas por \`Leavell Clark\`, \`história natural da doença\` e \`níveis de prevenção\` não localizaram benchmark longo de autoria institucional confirmada. **Gate comparativo extenso permanece não cumprido**; não afirmar que os PDFs são material Estratégia MED.

## Fontes primárias oficiais identificadas
1. **OMS/OPAS, Carta de Ottawa (1986)** — promoção da saúde, políticas saudáveis, ambientes favoráveis, ação comunitária, competências pessoais e reorientação dos serviços. https://www.paho.org/en/documents/ottawa-charter-health-promotion .
2. **OMS, Health promotion** — promoção da saúde e determinantes. https://www.who.int/health-topics/health-promotion .
3. **Brasil, Portaria nº 2.446/2014** — redefine Política Nacional de Promoção da Saúde (PNPS); documento de referência histórica/regulatória. https://bvs.saude.gov.br/bvs/saudelegis/gm/2014/prt2446_11_11_2014.html .
4. **Brasil, Portaria de Consolidação nº 2/2017, Anexo I** — políticas nacionais, incluindo PNPS, verificar redação vigente e alterações. https://bvsms.saude.gov.br/bvs/saudelegis/gm/2017/prc0002_03_10_2017_comp.html .
5. **Brasil, Portaria GM/MS nº 2.436/2017 (PNAB)** — APS engloba promoção, prevenção, diagnóstico, tratamento, reabilitação, redução de danos, cuidados paliativos e vigilância. https://bvsms.saude.gov.br/bvs/saudelegis/gm/2017/prt2436_22_09_2017.html .
6. **Modelo histórico Leavell & Clark (décadas de 1950/1960)** — construção didática da história natural e três níveis clássicos; conceitos autorais explicativos sem atribuir edição/página de livro não localizada.

## Índice planejado
História natural: fase pré-patogênica e patogênica, período de suscetibilidade, fase subclínica, clínica e desfechos → tríade agente-hospedeiro-ambiente e determinantes → prevenção primordial → primária (promoção e proteção específica) → secundária (diagnóstico precoce e tratamento oportuno, rastreamento elegível) → terciária (limitação de incapacidade/reabilitação) → quaternária (iatrogenia) → erros de classificação → promoção da saúde/PNPS/APS → aplicações infecciosas, crônicas, materno-infantis, câncer, trabalho, saúde mental e urgência → 8 casos e 12 questões autorais → auditoria e imagens.

## Bloqueios
- [ ] Corpo didático profundo, meta 60 mil caracteres úteis; nenhuma repetição artificial.
- [ ] 8 casos completos e 12 questões comentadas, exemplos genuinamente distintos das 120/125.
- [ ] QA científico independente e fontes brasileiras atualizadas por cenário.
- [ ] Figuras/diagramas autorais ou licenciados com aprovação Admin antes de inclusão, 10 pautas quando pertinentes.
- [ ] JSON, HTML, validadores oficiais e inspeção desktop/PWA em ambiente apropriado.
- [ ] Não publicar/mesclar/implantar.

---

## Etapa 2 — Texto final do rascunho e verificações estruturais (15/10/2026)

- **Markdown:** `apostilas/_rascunhos/lote-06-130-niveis-de-prevencao-historia-natural-doenca.md` com 94.213 caracteres brutos, 31 capítulos, oito casos e doze questões. O corpo didático (capítulos 1–27) possui aproximadamente **68.982 caracteres** após remoção simples de URLs e marcação Markdown, excluindo casos, questões e referências. A contagem não prova unicidade semântica nem revisão médica.
- **JSON:** `apostilas/_rascunhos/lote-06-130-build-input-preliminar.json`, 30 seções de conteúdo e 7 referências, imagens novas não inseridas.
- **HTML:** `apostilas/_rascunhos/lote-06-130-preview.html` com 31 seções incluindo bibliografia, 8 casos, 12 questões, 12 listas de alternativas A–D e `noindex,nofollow`.
- **Navegação interna:** 0 âncoras ausentes e 0 IDs duplicados.
- **Verificação científica de escopo:** o texto distingue explicitamente história natural/níveis de prevenção, níveis da RAS, promoção da saúde/PNPS/PNAB e convenções específicas de cardiologia. Fontes oficiais brasileiras e da OMS identificadas, mas sem validação independente.

### Matriz lexical de autossuficiência — 12 questões
Teste automatizado simples da presença dos conceitos em capítulos **do corpo didático**, sem ler gabaritos. Não substitui análise pedagógica da coerência de cada alternativa.

| Questão | Competência | Capítulos | Termos buscados | Resultado |
| --- | --- | --- | --- | --- |
| 1 | Suscetibilidade pré-patogênica | 2 | pre-patogenico; suscetibilidade | Cobertura preliminar |
| 2 | Prevenção primordial | 4 | primordial; fatores de risco | Cobertura preliminar |
| 3 | Vacina em hospital | 5, 18 | vacin; hospital | Cobertura preliminar |
| 4 | Diagnóstico de HAS | 6, 12 | hipertensao; secundaria | Cobertura preliminar |
| 5 | Reabilitação terciária | 7 | reabilitacao; incapacidade | Cobertura preliminar |
| 6 | Quaternária | 8 | quaternaria; exames | Cobertura preliminar |
| 7 | PEP | 11, 17 | pos-exposicao; infeccao | Cobertura preliminar |
| 8 | TB latente | 3, 11 | tuberculose; infec | Cobertura preliminar |
| 9 | PNAB | 1, 10 | atencao primaria; prevencao | Cobertura preliminar |
| 10 | Carta de Ottawa | 10 | ottawa; ambientes | Cobertura preliminar |
| 11 | Cardiovascular | 19 | secundaria cardiovascular; reabilitacao | Cobertura preliminar |
| 12 | Rastreio versus diagnóstico | 6, 8 | rastreamento; sintoma | Cobertura preliminar |

**Resultado: 12/12 com cobertura lexical preliminar.** A primeira passagem identificou dois trechos que mereciam explicitação didática: **suscetibilidade** na fase pré-patogênica (cap. 2) e a diferença entre **reabilitação** e prevenção de recorrência cardiovascular (cap. 19). As três versões foram sincronizadas após a correção.

### Pendências para certificação
1. Revisão médica independente por docente de Preventiva/Saúde Coletiva, validando classificações ambíguas e interpretação da política brasileira.
2. Comparação com material extenso de autoria comprovada (Drive disponível apenas com resumos parciais).
3. Auditoria de originalidade semântica e eliminação de eventual sobreposição excessiva com apostilas 120 e 125.
4. Curadoria/produção de diagramas originais e, quando houver imagens externas, verificação individual de licença/autoria, compressão WebP e aprovação via Admin. Nenhuma figura publicada.
5. Execução **real** do builder e auditores do repositório, que não foi feita neste turno; checagem estrutural não substitui `node scripts/build-apostilas-batch.cjs --dry-run`.
6. Testes de visualização desktop/PWA, acessibilidade e desempenho; aprovação antes de merge ou deploy.

**Parecer:** rascunho completo com prévia técnica e 12/12 conceitos presentes nos capítulos; **NÃO PUBLICAR/NÃO CERTIFICADO**.
