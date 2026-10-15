# LURIA — Etapa zero | Aula 012: Resposta metabólica ao trauma

**Data:** 15/10/2026. **Estado:** novo rascunho, não certificado.

## Inventário e vínculo curricular
- O lote vigente lista a aula 012 como **Cirurgia Geral — Resposta metabólica ao trauma**. O inventário de caminhos específicos `apostilas/resposta-metabolica-ao-trauma/content.json`, variantes de slug e pasta HTML não encontrou correspondência; antes de criar, será feita nova leitura do destino para evitar sobreposição concorrente.
- Apostila LURIA aberta: `apostilas/cuidados-perioperatorios-prevencao-complicacoes/content.json`, 14 seções sobre segurança, analgesia, ERAS, nutrição perioperatória e recuperação. Contém pouco desenvolvimento de mecanismos hormonais e catabolismo. **Não duplicar** cuidados perioperatórios, PIP, infecção de sítio cirúrgico ou anticoagulação.
- Outros temas correlatos do lote: 017 (reposição volêmica e distúrbios hidroeletrolíticos) e 022 (choque hemorrágico). Aqui enfocar fisiologia da resposta ao estresse, leitura dos marcadores, consequência metabólica, catabolismo, prevenção da segunda agressão e início racional do suporte metabólico, sem recriar fluxos completos de hemotransfusão/choque.

## Referência do Google Drive: etapa efetivamente cumprida com limitação
Três PDFs **foram abertos e tiveram texto extraído**, todos do acervo privado do usuário:
1. **01 - INTENSIVA - POLITRAUMA E QUEIMADURAS.pdf** — 26.658 caracteres de texto extraídos, com ATLS, fisiologia do choque, queimaduras e notas de hipercatabolismo, cortisol e inflamação. É material predominantemente de trauma inicial, não um capítulo de fisiologia metabólica.
2. **01 - CHOQUE - ABORDAGEM INICIAL.pdf** — 7.986 caracteres; perfusão, cálculo de oferta de O₂, classificação de choque e lactato, úteis ao diferencial entre estresse e hipoperfusão.
3. **01 - TRAUMA REVISAO ABCDE.pdf** — 4.990 caracteres; priorização A–E e reavaliação. Algumas frases resumidas divergem de boas práticas atuais (cristaloide em volume fixo para todos, oxigênio a 100% para todos, etc.) e não foram transpostas à LURIA.

**Autoria institucional de cursinho não confirmada** nesses arquivos; NÃO atribuir ao Estratégia MED. PDF mais próximo não satisfaz o ideal de comparação com livro específico, mas há conteúdo relacionado e a limitação fica explícita. Sem reutilização de redação, tabelas ou imagens de terceiros.

## Referências científicas externas e o que elas sustentam
- **European guideline on management of major bleeding and coagulopathy following trauma, sixth edition**, Critical Care 2023, doi:10.1186/s13054-023-04327-7. Orienta uso seriado de lactato ou base deficit, identificação de hipocalcemia ionizada e tratamento de coagulopatia; não dá suporte a afirmação de que lactato alto significa exclusivamente hipóxia.
- **ESPEN practical and partially revised guideline: Clinical nutrition in the intensive care unit**, Clinical Nutrition 2023, doi a confirmar no artigo. Contraindica início de dieta enteral plena em choque não controlado; iniciar em baixa dose pode ser considerado após controle hemodinâmico com vigilância da perfusão intestinal.
- **ESPEN guideline on clinical nutrition in surgery — Update 2025**, Clinical Nutrition 53 (2025) 222–261, doi:10.1016/j.clnu.2025.08.029. Apoia integração precoce da terapia nutricional ao cuidado cirúrgico, com alimentação oral precoce quando possível e terapia enteral em pacientes selecionados; não universalizar a sequência do pós-operatório eletivo para trauma instável.
- **ESPEN guideline/versão atualizada do cuidado nutricional em UTI** requer interpretação conforme quadro e hemodinâmica; evitar meta calórica plena nos primeiros dias de risco de síndrome de realimentação.
- Para fisiologia clássica, a divisão **ebb/flow** é ferramenta didática e não cronômetro universal. Diferenciar mecanismos neuroendócrinos, imunológicos, endoteliais e de lesão celular, e a heterogeneidade por gravidade.

## Matriz de lacunas e aplicação original
| Aspecto | Drive | Complemento novo LURIA |
|---|---|---|
| Ebb e flow | ausentes | definição, variação clínica, limites da dicotomia |
| Eixos simpático, HPA e RAAS | cortisol apenas em menção | cascata hormonal e efeito glicêmico, vascular e renal |
| Inflamação/hiperinflamação | cita citocinas sem explicar | DAMPs, PRRs, IL-6, TNF, resposta de fase aguda e imunossupressão associada |
| Perfusão e choque | revisão inicial do ABCDE | oferta/consumo O₂, lactato não específico, base deficit, tendência seriada |
| Metabolismo intermediário | não desenvolvido | glicogênio, gliconeogênese, resistência insulínica, lipólise e proteólise |
| Proteína e cicatrização | não desenvolvido | balanço nitrogenado, perda muscular, dificuldade de reabilitação e sarcopenia |
| Célula e endotélio | poucas notas | glicocálix, permeabilidade, imunotrombose, coagulopatia, disfunção mitocondrial |
| Nutrição segura | dado resumido sem exceções | oral/enteral/parenteral e contraindicações em choque, risco de realimentação |
| Prova e prática | mapas isolados | ≥4 casos com hipóteses/exames/conduta; ≥6 questões com análise de todas alternativas |

## Decisão editorial e imagens
Criar `apostilas/resposta-metabolica-ao-trauma/content.json` no formato v2 original e modular, com quadros/fluxos próprios, referências verificáveis e pendências. Diagramas de hormônios, citocinas, ebb/flow e balanço nitrogenado são melhores produzidos nativamente em texto/tabelas originais e, caso sejam indicadas imagens clínicas reais, preparar candidatas documentais para Admin somente após autoria e licença verificadas; não usar imagens protegidas do Drive.

Não considerar o rascunho completo ou certificado por comprimento. Revisão científica independente, teste de questões de residência, coerência com livros 007/017/022, controle de plágio, acessibilidade PWA e validação humana permanecem exigidos. **Sem merge/deploy e sem index.html nesta etapa.**
