# Lote 06 · Tema 119 — Planejamento Reprodutivo e Contracepção
**Data da auditoria:** 14/10/2026. **Status:** revisão parcial em andamento; NÃO PUBLICAR.

## Identificação e preservação
- Origem editorial existente: `apostilas/planejamento-reprodutivo-contracepcao/index.html`.
- Aproximadamente 77.663 caracteres HTML no arquivo preexistente; cerca de 50 mil caracteres na área `book-main`, incluindo tags, referências e elementos auxiliares.
- O arquivo público contém 30 seções com IDs próprios e 5 casos muito breves. **Não havia questões de múltipla escolha comentadas**, embora haja quadros e “pulo do gato”.
- Nenhum arquivo publicado será regravado. Melhorias serão produzidas em uma **cópia HTML editorial** na branch `editorial/lote-06-auditoria-20261014`, garantindo preservação e possibilidade de revisão/diff antes de eventual merge.
- Há títulos numéricos duplicados e fora de ordem: após as seções de 1–16 métodos aparece “7. Contracepção de emergência”, depois 8–15, e títulos finais sem numeração consistente. Recomendar reorganização dos números sem mudar IDs âncora e sem remover os conteúdos já bons.

## Etapa zero — leitura comparativa realizada ANTES da escrita
- Documento no Google Drive: **`Planejamento familiar.pdf`**, aberto e lido em 14/10/2026. Aproximadamente 2.954 caracteres de texto extraído. Autoria institucional **não identificada/confirmada**; é um resumo esquemático, não uma apostila completa do Estratégia MED.
- Abrangência da amostra: contracepção de emergência, DIU, métodos combinados, métodos de progestagênio isolado, métodos definitivos e tabelas condensadas de contraindicações.
- Atenção científica: o material do Drive contém informação legal obsoleta (idade de 25 anos e consentimento conjugal obrigatório), incompatível com a Lei 14.443/2022. O material LURIA publicado já traz a regra atual: **21 anos ou dois filhos vivos; sem autorização conjugal; 60 dias de antecedência**. Portanto, preservá-la.
- Outra fonte LURIA: a própria apostila publicada foi aberta/inspecionada como base de identidade visual e fonte de conteúdo a aproveitar. Foram revisados seu índice, classes, navegação, seções, exemplos e referências.
- Fonte do Drive foi usada somente para comparação de cobertura. **Nenhum trecho ou imagem privada foi copiado, nenhuma URL/ID privada foi incluída no repositório.**
- Limitação: não foi localizada nesta busca uma apostila longa de mesmo tema com autoria Estratégia MED comprovada; etapa de benchmark **parcial**, sem certificação premium.

## Revisão externa verificada para edição
1. **OMS MEC 6ª edição (2025):** https://www.who.int/publications/i/item/9789240115583 . Categorias 1–4 e avaliação de segurança por condição/método.
2. **OMS SPR 4ª edição (2025):** https://www.who.int/publications/i/item/9789240115606 . Início/troca, contracepção de emergência e manejo de uso.
3. **CDC U.S. MEC 2024:** https://www.cdc.gov/contraception/hcp/usmec/index.html . Tabelas por condição; uso como documento internacional complementar, não norma brasileira.
4. **CDC U.S. SPR 2024:** https://www.cdc.gov/mmwr/volumes/73/rr/rr7303a1.htm . Condutas de início, uso e métodos de emergência.
5. **Lei 9.263/1996 com alterações da Lei 14.443/2022:** https://www.planalto.gov.br/ccivil_03/leis/l9263.htm . Esterilização voluntária e autonomia.
6. **Portarias SECTICS/MS 47 e 48/2025:** https://bvsms.saude.gov.br/bvs/saudelegis/sctie/2025/prt0047_09_07_2025.html e https://bvsms.saude.gov.br/bvs/saudelegis/sctie/2025/prt0048_09_07_2025.html . Implante etonogestrel para 18–49 e 14–17 anos, respectivamente, com implementação planejada.
7. **Notas Técnicas 51/2026 e 198/2026, Ministério da Saúde:** https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes/notas-tecnicas/2026/nota-tecnica-conjunta-no-51-2026-cgesmu-dgci-saps-e-cgafb-daf-sctie-ms.pdf/view e https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes/notas-tecnicas/2026/nota-tecnica-conjunta-no-198-2026-cgesmu-dgci-saps-ms.pdf/view . Distribuição e acesso progressivos, não disponibilidade homogênea presumida.

## Matriz de lacunas reais (original × revisão)
| Componente | Material existente | Melhoria autoral | Situação |
| --- | --- | --- | --- |
| Introdução e escolha informada | Presente, útil | Preservar | Manter |
| MEC/OMS 2025 | Já mencionado | Comparar condições complexas com método específico e interpretar 1–4 | Aprofundar |
| Métodos combinados | 4 capítulos curtos com repetição de 2 subtítulos | Ajustar contraindicações, mecanismos, segurança e decisão individual | Aprofundar |
| POPs/injetáveis | Apresentação curta | Diferenciar atraso e janela por formulação; interações farmacológicas e manejo | Aprofundar |
| LARC | Apresentação adequada mas condensada | Inserção de DIU, gestação, IST, complicações, expulsão e implementação SUS 2026 | Aprofundar |
| Emergência | Já inclui LNG/UPA/DIU cobre | Desenvolver algoritmo temporal e reinício de método regular | Aprofundar |
| Esterilização | Lei 2022 correta | Acrescentar estudos de caso, documentação, sigilo, oferta e consentimento | Preservar e expandir |
| Casos clínicos | 5 casos de poucas linhas | Ampliar casos com hipóteses, mecanismos, exames, conduta e erros comuns | Pendente |
| Questões autorais | Nenhuma questão comentada | Inserir ≥8 questões com alternativas e justificativas individuais | Pendente |
| Índice visual | 30 IDs no artigo, numeração de H2 repetida | Preservar IDs, corrigir os rótulos de títulos sem perder links | Pendente |
| Imagens | Não há novas imagens no artigo | Pesquisar e registrar candidatas licenciadas, fila Admin | Pendente |
| Testes e publicação | HTML funcionando em produção | Criar preview isolado e testar; jamais fazer deploy sem revisão | Pendente |

## Bloqueios de publicação
- [ ] Ampliar casos clínicos e questões com autossuficiência demonstrada.
- [ ] Revisão clínica independente e revisão normativa/compatibilidade Brasil, inclusive divergências OMS–CDC.
- [ ] Deduplicação semântica e contagem de caracteres didáticos úteis, excluindo nav, bibliografia e gabaritos.
- [ ] Revisão visual desktop/PWA e execução dos validadores reais do repositório.
- [ ] Curadoria/aprovação de imagens pelo Admin, preservando licenças.
- [ ] Benchmark longo de autoria confirmada ou declaração formal de indisponibilidade.
- [ ] Sem merge ou deploy automático.

**Decisão editorial:** preservar integralmente a apostila original e elaborar cópia de revisão; não marcar como pronta até fechamento dos critérios.


---

## Atualização — produção da cópia editorial e QA preliminar (14/10/2026)

### Produção efetivamente realizada
- Criada e mantida **\`apostilas/_rascunhos/lote-06-119-preview.html\`**, derivada do HTML já publicado, **sem alterar a página original** nem efetuar merge ou deploy.
- Preservadas as 30 seções originais por ID. Cinco blocos novos foram acrescentados: raciocínio avançado/MEC em comorbidades; início, troca e contracepção de emergência; DIU, implante, esterilização e acesso SUS; casos completos complementares; questões autorais.
- A numeração dos capítulos foi reconciliada em sequência didática e as âncoras de navegação foram reconstruídas a partir dos IDs persistentes. A seção de referências foi colocada ao final.
- Foram ampliados **os 5 casos originais** e redigidos **4 casos adicionais**, somando **9 casos clínicos**; os cinco primeiros receberam complementos de hipótese/raciocínio, exame, conduta e significado.
- Redigidas **10 questões originais** de quatro alternativas cada, com resposta, justificativa de todas as alternativas e mini-revisão.
- Desenvolvimento autoral adicional inclui: hipertensão por gravidade, diabetes com/sem vasculopatia, LES/anticorpos antifosfolípides, doença falciforme, doença renal, câncer de mama, hepatopatias, anticonvulsivantes e antirretrovirais quando pertinentes, dupla proteção, implantação progressiva no SUS, escolha de analgesia e contraindicações de DIU, fios não visíveis, gravidez com DIU, DMPA e retorno de fertilidade, transição de LARC e direitos reprodutivos.
- Legislação brasileira existente preservada; o resumo do Drive tinha regras antigas e **não foi transplantado** para a LURIA.

### Pré-auditoria quantitativa e técnica
| Item | Resultado conferido |
| --- | --- |
| HTML original | **77.663 caracteres** |
| HTML da prévia editorial | **139.436 caracteres** |
| Seções originais preservadas por ID | **30/30** |
| Seções totais no artigo da prévia | **35** |
| Corpo instrucional estimado, excluindo capítulos de casos, questões, revisão, bibliografia, mapa e resumo | **aproximadamente 67.610 caracteres de texto** |
| Casos com identificação individual | **9 (1–9)** |
| Questões com alternativas semânticas A–D | **10 (1–10)** |
| Matriz lexical de autossuficiência | **10/10 objetivos conceituais localizados no corpo didático** |
| Links de âncora quebrados no preview | **0** |
| IDs HTML repetidos | **0** |
| Parágrafos longos literalmente duplicados | **0 detectados** |
| Novas imagens clínicas embutidas | **0**, respeitando o fluxo do Admin |
| Indexação da prévia | \`noindex,nofollow\` |
| Publicação e merge | **Não realizados** |

O total de aproximadamente 67,6 mil caracteres representa **pré-contagem técnica**, incluindo tabelas e conteúdo possivelmente redundante por sentido: não é certificação do piso de 60.000 caracteres únicos úteis. A matriz lexical avalia existência de conceitos centrais das perguntas nos capítulos, não confirma a qualidade científica nem que todas as alternativas estejam plenamente explicadas. A auditoria profissional segue obrigatória.

### Priorização clínica na revisão final
1. Conferir tabela OMS MEC 2025 versus CDC MEC 2024 para cada condição e método; onde haja divergência, **documentar a fonte**, em vez de amalgamar categorias automaticamente.
2. Conferir formulações efetivamente registradas no Brasil, sobretudo POP de desogestrel, drospirenona e atrasos de dose, sem aplicar instruções de noretisterona/norgestrel a toda marca.
3. Verificar segurança e execução das orientações sobre DIU pós-parto, inserção intervalar, analgesia, gestação com DIU e proteção adicional após emergência.
4. Confirmar a aplicação atual da Lei 9.263/1996, alterada pela Lei 14.443/2022, incluindo casos de idade limítrofe e eventuais decisões judiciais posteriores.
5. Verificar Portarias 47/48 de 2025 e Notas Técnicas 51/198 de 2026 quanto a população elegível, implantação territorial e disponibilidade local; não inventar cobertura universal.
6. Revisar os casos e os gabaritos por pediatra/ginecologista ou equipe médica apropriada, inclusive linguagem não coercitiva e confidencialidade.
7. Fazer revisão semântica e editorial de redundâncias remanescentes, além da triagem literal já feita.

### Curadoria visual pendente
Buscas futuras devem priorizar, com autoria e licença individual comprovadas: (1) dispositivo DIU de cobre fora do corpo; (2) SIU-LNG e diferença anatômica; (3) implante subdérmico demonstrativo; (4) diagrama de inserção do DIU; (5) modelo de posição e fios do DIU; (6) esquema original de eixo hipotálamo–hipófise–ovário, criado com licença própria; (7) representação original da ação do progestagênio no muco; (8) cartão-resumo MEC sem copiar tabelas protegidas; (9) algoritmo autoral da contracepção de emergência; (10) fluxo autoral de esterilização voluntária e requisitos legais. **Esses itens são temas de imagens candidatas, não arquivos/licenças já aprovados.** Nenhuma imagem foi importada ou publicada.

### Bloqueios ainda vigentes
- [ ] Benchmark longo equivalente com autoria institucional confirmada no Drive ou registro formal de impossibilidade.
- [ ] Revisão científica e médica completa, referência por referência, especialmente critérios contraceptivos 2025 e direito brasileiro.
- [ ] Auditoria semântica de unicidade dos 60 mil caracteres instrutivos.
- [ ] Curadoria de imagens reais e didáticas com licença verificada; fluxo de aprovação no Admin.
- [ ] Executar validadores oficiais do repositório e inspeção de renderização desktop/PWA com correção dos defeitos.
- [ ] Processo separado de autorização para publicação/merge/deploy.

**Decisão:** a apostila 119 está **ampliada e preparada como prévia editorial**, não está finalizada, nem publicada.
