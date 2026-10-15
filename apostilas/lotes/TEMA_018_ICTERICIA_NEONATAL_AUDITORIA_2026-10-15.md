# LURIA — Tema 018: Icterícia Neonatal | Auditoria e primeira redação
**Data:** 15/10/2026. **Área:** Pediatria / Neonatologia. **Currículo:** Lote 1 (001–023), tema 018. **Branch:** `editorial/apostilas-lote-01-etapa-01-20261014`. **Status:** rascunho autoral NÃO certificado, NÃO publicado.

## Etapa zero realizada
- Foi lido integralmente o `lead.apostilas.txt` (Prompt Magno), o padrão `apostilas/EDITORIAL_STANDARD.md` e a matriz oficial de 225 temas.
- Foi verificado que não existia `apostilas/ictericia-neonatal/content.json` nesta branch antes da redação, nem livro próprio para o tema 018 na matriz, embora haja contextualização da icterícia do prematuro em 013 e de cuidados do recém-nascido em 003.
- Google Drive conectado: pesquisa pelas expressões **icterícia** e **neonatal** e abertura efetiva da apostila `01 - ICTERICIA E COLESTASE NEONATAL.pdf`. Foram lidos aproximadamente 14.963 caracteres extraídos (não apenas a miniatura). Documento de revisão com seções sobre metabolismo, Kramer, causas de hemólise, aleitamento, encefalopatia, curvas, fototerapia, colestase e atresia biliar; tem diagramas, curvas históricas e poucas avaliações de casos. Contém nota de **Medicina Livre, venda proibida**; NÃO foi identificada autoria institucional Estratégia MED. O material foi usado exclusivamente como benchmark de cobertura, não copiado ou publicado. URL privada não deve constar no GitHub.
- Diferenciação curricular: #013 prematuridade, #003 cuidados imediatos, #008 reanimação e #023 sepse neonatal são correlatos, mas não substituem investigação, tratamento e seguimento da hiperbilirrubinemia e da colestase, focos próprios de #018.

## Matriz de lacunas do comparativo
| Núcleo | Encontrado no benchmark | Correção / aprofundamento LURIA |
|---|---|---|
| Metabolismo | Esquema sintético produção/conjugação/entero-hepática | Explicação causal e contexto de prematuridade, albumina e neurotoxicidade |
| Inspeção/Kramer | Zonas anatômicas com aproximações de BT | Inspeção é triagem clínica, nunca substitui TcB/TSB; atenção fototipo |
| 'Icterícia fisiológica <12' | Limites fixos antigos | Substituir por curvas por horas, IG, TSB e riscos (AAP 2022) |
| Bhutani P95 | Risco e sugestões de fototerapia confundidos | Distinguir nomograma de previsão histórica versus limiar terapêutico |
| Hemólise | ABO, Rh, G6PD, esferocitose | Ritmo horário, DAT contextual, G6PD falso-normal durante hemólise |
| Aleitamento | Icterícia precoce do aleitamento / leite materno | Ingesta subótima com sinais clínicos, manutenção do aleitamento quando possível |
| Fototerapia | Limiares simplificados, suspensão BT 8–10 | Curva correta, equipamento, TSB sérica, critério relativo para suspensão |
| Exsanguineotransfusão | BT e quadros clínicos com cortes fixos | Escalada 2 mg/dL abaixo do limiar de exsanguineotransfusão, emergência |
| Colestase | BD>1 mg/dL, AVB, Kasai | Abolir critério >20% como pré-requisito, acolia/colúria, US não excludente, encaminhamento |
| <35 semanas | Resumo genérico | Protocolos próprios de consenso; AAP 2022 não se aplica abaixo de 35 semanas |
| Questões e casos | Mapa resumo sem conjunto robusto | Cinco casos e dez questões comentadas por alternativa, autorais |

## Referências públicas conferidas para a redação original
1. Kemper AR et al. AAP 2022, `Pediatrics` 150:e2022058859, DOI 10.1542/peds.2022-058859; FAQ oficial AAP. A página AAP declara vigência até agosto de 2027.
2. Fawaz R et al. NASPGHAN/ESPGHAN, `J Pediatr Gastroenterol Nutr` 2017;64:154–168, DOI 10.1097/MPG.0000000000001334.
3. Maisels MJ et al. `J Perinatol` 2012;32:660–664, DOI 10.1038/jp.2012.71, somente consenso para menos de 35 semanas.
4. Sociedade Brasileira de Pediatria, Departamento Científico de Hepatologia, atualizações de atresia biliar de 2024 e 2025 (`sbp.com.br/atresia-biliar/`).
5. Nota: limites específicos e versões brasileiras de curvas devem ser revisados por pediatra/neonatologista; nenhuma tabela terapêutica foi fabricada a partir de valores fixos.

## Implementação efetiva
- Criado `apostilas/ictericia-neonatal/content.json` no formato LURIA v2, sem HTML, catálogo ou deploy.
- Estrutura inicial: **17 seções**, entre fisiologia, medição, causas, curvas, fototerapia, encefalopatia, colestase, <35 semanas, alta e revisão; **5 casos clínicos** e **10 questões autorais com comentários**.
- QA inicial: JSON parseável, 17 IDs únicos, índice alinhado a seções; aproximadamente 29,6 mil caracteres de parágrafos didáticos nessa primeira gravação (não equivale a meta certificada de 60K).
- Imagens e gráficos de terceiros do benchmark NÃO foram copiados. Curvas clínicas precisam ser reutilizadas somente mediante licença, autorização ou link/consulta à fonte oficial. A candidatura de imagens requer curadoria Admin e otimização em WebP, sem publicação automática.

## Pendências para certificação
1. Ampliar texto único e relevante a pelo menos 60.000 caracteres didáticos úteis, sem redundância nem repetição.
2. Revisão científica externa de todas as condutas, limiares, faixa de aplicação e referências brasileiras (SBP e MS).
3. Exame de coerência entre texto, casos e respostas, incluindo avaliação de todas as alternativas.
4. Curadoria de pelo menos dez candidatas clínicas/diagramáticas quando agregarem didática, licença individual, fila `pending` do Admin; não incorporar a página sem aprovação.
5. Validar renderizador JSON/HTML, integridade de índice, navegação, acessibilidade, desktop e PWA; não incluir no catálogo antes da aprovação.
6. Manter PR #37 draft, sem merge ou deploy. Reconciliar branch divergente da main antes de qualquer integração.

**Status:** CONTINUAÇÃO DE REDAÇÃO — não certificar como pronta por contagem ou estrutura.

## Continuação de 15/10/2026 — aprofundamento do tema 018 e QA textual
- Após a redação inicial, houve três ampliações substantivas **dentro das seções clínicas pertinentes**: (1) fisiologia, triagem, hemólise e leitura de curvas; (2) fototerapia, encefalopatia, investigação da colestase e seguimento; (3) diferenciais, armadilhas de classificação, prematuridade e segurança na transição do cuidado.
- **Triagem quantitativa reproduzível sobre a versão da branch:** 63.686 caracteres somente em blocos de parágrafos didáticos dos capítulos, **excluindo** casos, questões e referências; supera o piso numérico de 60.000 caracteres, mas a contagem **não comprova sozinha autossuficiência, precisão médica ou ausência de redundância semântica**.
- JSON analisado em memória a partir da cópia lida de volta do GitHub: 17 capítulos, 17 entradas no índice, correspondência completa SIM, IDs únicos SIM, 5 casos e 10 questões autorais; 0 parágrafos longos literalmente duplicados nessa triagem.
- Cuidados clínicos: a revisão bibliográfica se fundamenta na AAP 2022 para ≥35 semanas, NASPGHAN/ESPGHAN para colestase, consenso de prematuros <35 semanas e fontes SBP para atresia; protocolos específicos/doses devem passar por revisão independente antes de certificação. Sem gráficos de curvas copiados para dentro do material.
- **Curadoria visual:** apostilas/lotes/ICTERICIA_NEONATAL_CANDIDATAS_IMAGENS_2026-10-15.md registra dez candidatos com links de origem, função, licença quando verificável e condições; 0 aprovados, 0 inseridos, não houve alteração no Admin.
- **QA ainda pendente:** revisão independente do mérito científico integral; comparação semântica contra repetições e teste de autossuficiência; cada questão deve ser validada frente aos capítulos; direitos autorais/licenças e eventual consentimento das fotos; funcionamento do renderer em desktop/PWA e integração no catálogo.
- **Governança:** continua rascunho editorial, sem `index.html`, sem merge/deploy. A branch editorial diverge da `main`, requer reconciliação cuidadosa antes de qualquer publicação.
