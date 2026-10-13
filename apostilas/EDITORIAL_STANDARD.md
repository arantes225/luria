# Padrão editorial das Apostilas LURIA

## Norma vigente — mínimo de 60.000 caracteres didáticos úteis (13/10/2026)

**A partir desta data, o piso editorial obrigatório é 60.000 caracteres reais por apostila, sem teto fixo.** Esta norma substitui o piso anterior de 60.000, inclusive em apostilas antigas já expandidas ou ainda pendentes de revisão. A referência quantitativa é o texto instrutivo único dos capítulos, descontando HTML, CSS, JavaScript, JSON estrutural, navegação, capa, sumário, referências, enunciados decorativos e trechos repetidos. A ferramenta de auditoria é *triagem*, não certificação clínica nem prova de que todas as palavras são únicas.

**Regra editorial mais importante: não reexplicar e não converter elementos didáticos em textões.** Atingir 60 mil não autoriza reciclar fisiopatologia, repetir a mesma ideia em introdução, diagnóstico e revisão, ou adicionar blocos extensos, deslocados e sem nexo. Cada conceito fundamental é ensinado uma única vez, no ponto lógico; menções posteriores devem acrescentar uma implicação, distinção ou remissão breve ao trecho original. Antes de inserir texto novo, localizar o que já é ensinado e desenvolver apenas lacunas identificáveis.

- **Aprofundamento aditivo e localizado:** ampliar causas, mecanismos, sinais, diagnóstico diferencial, interpretação de exames, escolhas de conduta, exceções, complicações e seguimento no capítulo da doença ou sistema correspondente; nunca despejar apêndice genérico ao final.
- **Os visuais continuam ensinando:** manter e, quando cabível, aprofundar tabelas, algoritmos, fluxogramas, esquemas, mapas mentais, callouts, quadros e imagens aprovadas. Explicações breves e causais acompanham a figura ou o ponto de decisão; não substituir a figura por várias páginas de prosa nem escrever por extenso tudo que a tabela já comunica.
- **Leitura como cursinho premium:** alternar parágrafos enxutos e conectados, subtítulos informativos e recursos visuais pertinentes; utilizar casos, comparação de entidades, valores de exames e decisões clínicas para ensinar fatos novos. Cortar redundância mesmo quando isso reduzir a contagem — depois completar com ciência útil, não enchimento.
- **Revisão de repetição:** verificar se dois blocos, tabelas ou casos transmitem a mesma conclusão sem ganho real. Consolidar o redundante, preservar o melhor recurso e preencher lacunas em outro ponto. Novos blocos precisam responder uma pergunta ainda não respondida na apostila.
- **Condição de conclusão:** >=60.000 caracteres úteis *e* revisão clínica, de redundância, fontes/doses, layout desktop/PWA, imagens, navegação e valor para questões. Bater o número não gera selo automático.

**Scripts:** usar `node scripts/audit-apostilas-60k.mjs --json` para triagem geral; o antigo `audit-apostilas-40k.mjs` permanece como alias de compatibilidade, mas passa a aplicar o piso de 60 mil. O gerador de apostilas e a auditoria em lote também devem obedecer a esse piso.

---

## Regra operacional a partir de 13/10/2026: produção em lote e imagens no Admin

- **Produzir, revisar e publicar apostilas por lote**, não pelo rito manual de abrir cada página para curadoria. Adotar a revisão de conteúdo e o controle de qualidade para todos os temas do lote; não confundir automação com redução da profundidade.
- **Todas as imagens clínicas inéditas são candidatas para o Admin**, não figuras publicadas de forma direta. Registrar origem, licença, legenda, propósito didático e seção de destino no manifesto. Revisar exclusivamente em `/admin/`, com filtros por apostila e aprovação ou rejeição de itens selecionados.
- **Apenas imagens já aprovadas podem aparecer no conteúdo público.** Itens previamente aprovados podem ser reutilizados sem nova cópia. As imagens presentes em apostilas antigas devem ser preservadas e auditadas separadamente, sem despublicação automática.
- **Texto e imagens têm etapas independentes:** publicar capítulos aprofundados não exige que a imagem candidata esteja aprovada. A revisão das imagens ocorre posteriormente, em lote no Admin.
- **Ferramentas:** `scripts/build-apostilas-batch.cjs` recebe conteúdo profundo estruturado em JSON, cria novos arquivos HTML e exporta o manifesto; `scripts/audit-apostilas-batch.cjs` percorre a biblioteca inteira e sinaliza lacunas. Consulte `apostilas/PRODUCAO_EM_LOTE.md` para os campos, limites, segurança e sequência recomendada.
- **Exigir profundidade real** antes de marcar conteúdo como concluído: fisiopatologia explicada, critérios diagnósticos e armadilhas, tratamentos com particularidades, complicações, seguimento, situações especiais e casos de prova. Uma métrica de caracteres não é certificação de qualidade.

## Regra central
**Nível de aprofundamento: ALTO.**

Cada apostila deve ser escrita como se fosse o principal e, se necessário, o único material de estudo do leitor sobre aquele tema. O texto não pode depender de outra fonte para completar conceitos essenciais.

## Princípios obrigatórios

1. Explicar, não apenas listar.
2. Desenvolver o raciocínio fisiopatológico e clínico.
3. Organizar o conteúdo do básico ao avançado.
4. Evitar tópicos telegráficos quando o tema exigir desenvolvimento.
5. Incluir, quando aplicável:
   - definição;
   - epidemiologia e fatores de risco;
   - fisiopatologia;
   - quadro clínico;
   - classificação;
   - diagnóstico;
   - critérios diagnósticos;
   - diagnósticos diferenciais;
   - exames complementares e interpretação;
   - tratamento não farmacológico;
   - tratamento farmacológico;
   - doses, vias, ajustes e monitorização quando pertinentes;
   - situações especiais;
   - complicações e mecanismo de cada complicação;
   - prognóstico;
   - seguimento;
   - condutas práticas;
   - pontos de prova e armadilhas frequentes.
6. Tabelas, algoritmos, fluxogramas e callouts devem complementar o texto, nunca substituir explicações necessárias.
7. A leitura deve permitir que o aluno entenda **por que** uma conduta é tomada, não apenas qual é a conduta.
8. Sempre que houver material interno LURIA/Drive sobre o tema, ele deve ser consultado para entender cobertura, sequência e estilo didático. Conteúdo desatualizado não deve ser perpetuado quando diretrizes mais recentes divergirem.
9. Referências devem aparecer em lista organizada, priorizando diretrizes, consensos e entidades brasileiras quando disponíveis.
10. Se um subtópico introduzir uma nova entidade clínica (por exemplo, hipoglicemia), tratá-la como um mini-capítulo completo: definição, fisiopatologia, quadro clínico, diagnóstico, classificação quando aplicável, tratamento e prevenção/seguimento.

## Critério de qualidade
Antes de publicar, perguntar: **“Um estudante conseguiria estudar esse tema do zero até um nível de prova e prática clínica usando apenas esta apostila?”**  
Se a resposta for não, o conteúdo ainda está insuficiente.


## Regra obrigatória de imagens — curadoria antes da publicação

11. **Toda nova apostila deve pesquisar no mínimo 10 imagens candidatas**, mesmo que nem todas sejam utilizadas no resultado final.
12. A busca de imagens faz parte da criação da apostila e deve acontecer antes da publicação final. Não usar imagem apenas para “encher” a página: cada candidata precisa ter uma justificativa didática clara.
13. Prioridade de fontes:
   - Ministério da Saúde, CONITEC, ANVISA, Fiocruz, universidades públicas e sociedades médicas brasileiras;
   - OMS/WHO, CDC, NIH/NCI, PhysioNet e outras entidades institucionais;
   - Wikimedia Commons apenas quando a licença for compatível e a autoria/licença puderem ser preservadas;
   - artigos científicos e atlas com permissão/licença compatível.
14. Para cada imagem candidata, registrar obrigatoriamente:
   - URL direta da imagem;
   - URL da fonte original;
   - nome da fonte/autoria;
   - licença/condição de uso quando disponível;
   - legenda sugerida;
   - texto alternativo;
   - seção/subseção exata onde a imagem deve entrar;
   - justificativa didática em uma frase.
15. **Não baixar nem armazenar definitivamente a candidata antes da aprovação humana.** A fila deve referenciar a imagem original. Isso evita ocupar Storage com imagens que serão rejeitadas.
16. Toda nova apostila deve abrir, para o administrador, com um bloco de **“Curadoria de imagens” logo após a capa/hero**, semelhante à fila de imagens do Admin, contendo no mínimo 10 candidatas e os comandos:
   - **Expandir** — ver a imagem em tamanho maior;
   - **Rejeitar** — excluir definitivamente a candidata da fila;
   - **Aprovar** — aprovar a imagem e inseri-la automaticamente no ponto do texto previamente definido.
17. Imagens pendentes **não aparecem no corpo da apostila para o aluno**. Somente imagens aprovadas podem ser renderizadas no conteúdo.
18. Ao aprovar, a imagem deve entrar junto do trecho que ela explica, nunca em uma galeria aleatória. A legenda deve dizer ao aluno **o que observar** na figura e citar a fonte.
19. Ao rejeitar, a candidata deve ser removida da fila, sem permanecer como item “rejeitado” ocupando espaço ou poluindo a curadoria.
20. O mínimo de 10 candidatas é uma regra de **busca e curadoria**, não uma meta de 10 imagens publicadas. A apostila final pode ter menos imagens se apenas algumas forem realmente boas e didaticamente necessárias.
21. Imagens indispensáveis ao entendimento de um instrumento, exame, anatomia, mecanismo ou classificação devem receber prioridade. Exemplos: partograma em uma apostila de assistência ao parto, ECG em uma apostila de eletrocardiografia, radiografia quando o diagnóstico depende do padrão radiológico e fotografias clínicas quando a morfologia é central ao reconhecimento.
22. Sempre preferir a **figura útil isolada** ao PDF/documento inteiro incorporado. Se a fonte for um PDF, extrair/recortar apenas a figura necessária e preservar a referência da publicação original.

23. Ao registrar uma candidata, garantir que o domínio da imagem esteja contemplado no `img-src` da Content-Security-Policy da apostila; ao aprovar uma nova fonte, atualizar o CSP se necessário para que a imagem realmente carregue.


## Piso de profundidade obrigatório

A partir de outubro de 2026, nenhuma apostila pode ser considerada concluída apenas por conter definição, diagnóstico e tratamento. O conteúdo deve atingir profundidade suficiente para funcionar como material principal de estudo.

### Camadas mínimas por tema
1. **Base conceitual:** definição, terminologia e classificação.
2. **Mecanismo:** fisiologia/fisiopatologia explicada causalmente.
3. **Reconhecimento clínico:** apresentação típica, atípica e sinais de gravidade.
4. **Diagnóstico:** critérios, limitações dos exames, interpretação e armadilhas.
5. **Diagnósticos diferenciais:** como separar entidades parecidas na prática.
6. **Conduta:** o que fazer, quando fazer, por que fazer e quando não fazer.
7. **Situações especiais:** gestação, puerpério, adolescência, comorbidades, imunossupressão, urgência e falha terapêutica quando aplicáveis.
8. **Complicações:** mecanismo, prevenção, reconhecimento e resposta.
9. **Seguimento e prognóstico:** o que acontece depois da conduta inicial.
10. **Integração:** casos clínicos, fluxos mentais e erros frequentes de prova/prática.

### Regra contra superficialidade
- Se um subtópico puder ser resumido em uma única frase sem explicar mecanismo, interpretação ou decisão clínica, ele deve ser revisto.
- Listas de condutas devem ser acompanhadas do raciocínio que diferencia uma opção da outra.
- Exames devem incluir **o que significam, o que não significam e quando enganam**.
- Tratamentos farmacológicos devem incluir objetivo, escolha, contraindicações/limitações e monitorização quando relevantes.
- Condutas divergentes entre fontes devem ser explicitadas, com prioridade para Ministério da Saúde, FEBRASGO, sociedades brasileiras e protocolos nacionais vigentes.
- A extensão não é meta por si só: profundidade deve vir de densidade clínica, não de repetição.

### Auditoria de densidade
Antes de publicar, comparar a apostila com as mais completas da biblioteca. Conteúdos muito abaixo da densidade média devem receber uma camada adicional de fisiopatologia, diagnóstico diferencial, decisão clínica e situações especiais antes da publicação.


---

## Padrão Livro-Texto 60K — atualização de 13/10/2026 do padrão iniciado em 12/10/2026

**Escopo:** aplica-se a **todos os cadernos/apostilas já existentes**, publicados ou não, e a quaisquer materiais futuros, independentemente de estarem em \`index.html\` ou em \`content.json\`. Não basta mudar a instrução de criação: cada conteúdo precisa ser efetivamente revisado, reescrito, expandido e validado.

### Mínimo editorial objetivo
- **Pelo menos 60.000 caracteres de conteúdo didático realmente legível por apostila**; excluem-se código HTML, CSS, JavaScript, JSON estrutural, tags, navegação, menus, capa/hero, sumário, nomes de campos, bibliografia e repetições artificiais. A contagem deve ser feita sobre os textos desenvolvidos dos capítulos. O mínimo **não** funciona como teto.
- Não adicionar parágrafos genéricos apenas para alcançar a contagem: conferir coerência científica, ausência de duplicações, explicações completas, fontes e utilidade clínica.
- Todas as entidades abordadas no tema devem ser explicadas em sequência causal: **base anatômica/fisiológica → gatilho/etiologia → mecanismos celulares e sistêmicos → repercussão funcional → manifestação → exame/diagnóstico → decisão e tratamento → acompanhamento**.
- Se houver apresentações, síndromes ou categorias independentes, aprofundar cada uma por completo, sem misturar subtópicos de maneira que confunda a comparação.
- Escrever em **prosa didática desenvolvida**, com parágrafos relacionados. Tabelas, classificações, caixas e listas devem ajudar a navegar no material, jamais substituí-lo.
- Integrar anatomia, embriologia, histologia, bioquímica, farmacologia e epidemiologia conforme a pertinência clínica, e explicar o que cada achado indica e **por quê**.
- Fórmulas: significado/unidade de todas as variáveis, fundamento, limitações, interpretação e cálculo comentado quando pertinente.
- Imagens e exames: o que observar, sinais específicos, significado clínico, limitações e legenda funcional.
- Terapias: indicação, mecanismo, escolha, contraindicações, riscos, doses **quando verificadas**, ajustes/monitorização, falha, alternativas e seguimento.
- Acrescentar casos clínicos comentados e diferenciais quando forem didáticos; não confundir hipótese de prova com protocolo clínico.
- Revisar diretrizes oficiais e consensos atuais, com preferência pelo contexto brasileiro; descrever divergências relevantes de forma transparente.
- Cada caderno deve ter seções/subseções lógicas e índice funcional. **Preservar URLs, IDs de seções relevantes, o renderer, a identidade LURIA, a interface responsiva e os recursos de leitura/estudo.** Não modificar a autoria/atribuição original sem orientação expressa.
- Não marcar o caderno como "60K revisado" antes da verificação objetiva da extensão **e** de uma revisão clínica e pedagógica humana/editorial.

### Continuidade rigorosa do fluxo de imagens estabelecido
1. **Reutilizar inicialmente as imagens já aprovadas no acervo LURIA**, mantendo seus vínculos e posicionamento; não descartar aprovações anteriores por causa da revisão textual.
2. Identificar lacunas didáticas por capítulo e pesquisar candidatas em **fontes reais rastreáveis** (sociedades médicas, governo, universidades, atlas de licença compatível). Priorizar esquemas técnicos fiéis para processos; **fotografias clínicas reais**, e não esquemas inventados, quando aparência macroscópica/lesão/dispositivo for o objeto do aprendizado.
3. Não criar radiografias, ECGs, fotos clínicas ou exames artificiais fingindo serem achados reais. Não usar imagens decorativas ou documentos inteiros quando a figura isolada basta.
4. Candidatas novas → \`apostila_image_review_queue\` do Supabase, com URL, autoria/origem, licença, legenda, texto alternativo, seção exata e justificativa. Buscar ao menos 10 candidatas por caderno, sem obrigatoriedade de publicar 10.
5. Status \`pending\`: **não inserir no corpo público**. Aprovar/rejeitar através do Admin; somente as aprovadas podem ser exibidas no trecho correspondente.
6. Após aprovação, validar URL/arquivo, otimizar em **WebP** respeitando os limites de mídia definidos para o site (preferencialmente 80–100 KB para ilustrações comuns e até 120 KB para ECG/radiologia/exames), preservar proporções e garantir que a imagem abra no PWA.
7. Incluir legenda interpretativa, fonte/licença e acessibilidade \`alt\` com significado clínico; verificar CSP de \`img-src\`, tamanhos e responsividade.
8. Na revisão de um caderno **não** remover ou trocar imagens aprovadas sem justificativa técnica e verificação visual. Pendências da fila seguem pendentes até ação administrativa; nunca aprovar automaticamente em lote.

### Critérios mínimos de aceitação por apostila
- [ ] Conteúdo realmente desenvolvido com >= 60.000 caracteres úteis aferidos.
- [ ] Revisão item a item de cobertura, lacunas, lógica fisiopatológica, diagnóstico, conduta e atualização.
- [ ] Referências pertinentes, verificáveis, incluídas junto às recomendações e na bibliografia.
- [ ] Capítulos completos, índice/âncoras e layout LURIA/PWA preservados.
- [ ] Imagens aprovadas preservadas; candidatas adicionais curadas pelo Admin, não publicadas automaticamente.
- [ ] Teste de abertura do arquivo principal, CSS/JS, índice e imagens no desktop e PWA.
- [ ] Revisão clínica antes de carimbar a edição como concluída.

**Inventário inicial das 25 pastas e suas lacunas:** consultar \`apostilas/AUDITORIA_LIVRO_TEXTO_2026-10-12.md\`. Contagem de caracteres, sozinha, não equivale a revisão clínica nem a publicação de uma versão reescrita.


---

## Diretriz irrevogável — aprofundar SEM desmontar os recursos visuais

**Correção expressa do escopo feita pelo responsável pela LURIA em 12/10/2026: o mínimo vigente de 60.000 caracteres significa ADICIONAR aprofundamento ao material existente, nunca trocar seus esquemas por texto corrido. Quanto mais visual, melhor, desde que seja didaticamente correto e legível.**

### Regra de preservação visual (obrigatória para os 25 cadernos e todos os futuros)
1. **Não excluir, simplificar ou transformar em parágrafos** os mapas mentais, esquemas anatômicos, esquemas fisiológicos/fisiopatológicos, fluxogramas, algoritmos clínicos, gráficos, tabelas, quadros comparativos, caixas de atenção, callouts, cards, pulo do gato, recursos interativos e figuras que já existem. Preservar também os estilos CSS, IDs, interações, cores, composição responsiva e disposição visual desses componentes.
2. A revisão editorial deve ser **aditiva**: manter o componente visual e **aprofundar o texto explicativo junto a ele** (antes, depois ou em um bloco complementar integrado). Sempre que possível, enriquecer o próprio esquema visual com rótulos legíveis, etapas intermediárias, legendas clínicas, relações causais ou detalhes importantes, sem torná-lo visualmente carregado.
3. Quando um gráfico ou fluxograma mostrar uma seta ou relação causal, explicar o que ocorre em cada transição, por que acontece, quais exceções são relevantes e como interpretar clinicamente. Não substituir fluxos por listas.
4. Quando uma tabela comparar doenças, mecanismos, exames ou tratamentos, preservar a tabela, podendo **acrescentar colunas/linhas úteis e ampliar o comentário interpretativo**. Nunca remover a tabela sob o pretexto de tornar o texto mais acadêmico.
5. Quando um callout, destaque ou **Pulo do Gato** já existir, mantê-lo e enriquecer a explicação ao redor. Não converter callouts em parágrafos sem identidade visual. Evitar simplesmente repetir o callout em uma nova seção textual.
6. Preservar os **mapas mentais** e, quando houver lacunas, adicionar ramificações relevantes e uma leitura guiada do mapa. Não substituí-los por sumários em texto.
7. Preservar toda imagem já aprovada, incluindo o local de inserção, salvo correção de erro comprovado; imagens adicionais seguem rigorosamente o fluxo de curadoria/aprovação do Admin, com preferência por esquemas reais, técnicos e fotos clínicas reais quando pertinentes.
8. Adicionar **novos elementos visuais** quando houver ganho didático real: sequências de mecanismo, mapas conceituais, diagramas de decisão, tabelas de diferenciais, comparações lado a lado, gráficos de tendências e esquemas de exames. Elementos HTML/CSS/SVG desenhados no site devem ser acessíveis, ter bom contraste, continuar legíveis no PWA e obedecer ao padrão visual LURIA.
9. **Contagem de caracteres**: os 60.000 caracteres mínimos vêm exclusivamente de aprofundamento didático substancial; **não** é necessário nem desejável aumentar o número de caracteres às custas do conteúdo visual. Tampouco contar classes, tags, JS ou SVG como caracteres didáticos para atingir a meta.
10. Antes e depois de cada alteração, registrar/verificar um inventário dos componentes visuais: quantidade, tipo, âncora, funcionamento, renderização em tela larga e no PWA. Fazer comparação visual para garantir que os elementos foram mantidos e que não apareceram overflow, imagens quebradas, callouts ocultos ou alterações de proporção.
11. Só remover ou substituir um esquema existente quando for **objetivamente incorreto, inseguro ou duplicado**, justificando a mudança e, preferencialmente, corrigindo-o **na mesma linguagem visual**, preservando a experiência do estudante. Nunca fazer remoções em massa como parte de uma conversão para formato de livro.
12. A expansão deve ocorrer **junto aos capítulos e esquemas correspondentes**, não apenas pelo acréscimo repetitivo de um grande bloco de "aprofundamento" ao final do arquivo. Para materiais já expandidos, uma segunda passada deve integrar parágrafos novos às seções visuais originais e enriquecer as figuras, evitando trechos deslocados.

### Definição de conclusão — conteúdo + visual
Uma apostila revisada só pode ser considerada concluída se:
- tiver pelo menos 60.000 caracteres de explicação didática **real**, revisada e cientificamente correta;
- preservar 100% dos componentes visuais úteis da versão anterior e seu funcionamento;
- ampliar o aprofundamento **dos esquemas já existentes** e introduzir visualizações novas onde agreguem aprendizado;
- manter o fluxo de aprovação de imagens e conferir fontes, legendas e acessibilidade;
- passar por inspeção de layout no desktop e no PWA.

**Princípio final: não é "texto no lugar de esquemas"; é "mais conteúdo explicando e complementando MAIS recursos visuais".**


---

## Referência visual de cursinho — Drive, auditoria de 12/10/2026

A pedido do responsável pela LURIA, foram examinados diretamente os PDFs disponibilizados no Drive:
- \`02 - CORRIMENTOS VAGINAIS .pdf\`: **10 páginas**, composição em **duas colunas**, hierarquia cromática viva, quadro inicial com fluxograma diagnóstico, texto curto em blocos, gráficos, esquemas de microbiota e epitélio, imagem de microscopia real, comparativos e pequenos destaques.
- \`02 - ASSISTENCIA AO PRE-NATAL.pdf\`: **8 páginas**, duas colunas, visão de alto rendimento na abertura, tabelas compactas, ilustrações clínicas, esquemas, caixas realçadas e subtítulos frequentes.
- Como controle, outras três referências consultadas (\`01 - IAMCSST.pdf\`, \`01 - CIRURGIA CARDIACA - DOENCA DA AORTA.pdf\`, \`12 - ABDOME AGUDO OBSTRUTIVO.pdf\`) tinham 9, 10 e 4 páginas. **Não afirmar que essas referências específicas possuem 40–60 páginas**, pois não possuem.

**O que se deve emular:** princípios gerais de linguagem editorial de cursinho de medicina — fragmentação pedagógica, duas colunas em páginas impressas quando couber, ótima densidade informativa, figuras orientadas por raciocínio, quadros de prova, distinção clínica e algoritmos reais. **Não copiar texto, ilustrações proprietárias, logotipos, assinatura de marca, composição idêntica ou elementos gráficos protegidos dos arquivos externos.** Manter identidade azul/rosa/escuro e visual LURIA.

### Formato digital e impressão
1. O site LURIA é **responsivo e de rolagem contínua**, portanto **não converter todo o conteúdo em cartões enormes nem fixar dimensões A4 na tela do PWA**. Na versão desktop, usar ocasionalmente duas colunas internas quando isso melhora leituras comparativas; em telas estreitas, empilhar em uma coluna sem reduzir legibilidade.
2. No modo impressão/PDF, contemplar **paginação A4 com aproximadamente 40–60 páginas para temas completos que justifiquem essa extensão**, nunca fabricar folhas vazias, divisões forçadas ou letra ampliada artificialmente apenas para aumentar o contador. O número de páginas é consequência de texto científico consistente + diagramas, imagens, tabelas e espaços de leitura.
3. **Preservar mapas mentais, callouts, Pulo do Gato, gráficos, tabelas, fluxos e imagens** antes de qualquer ajuste. Exemplo de capítulo: breve conceito desenvolvido, **esquema causal**, quadro de diferencial, leitura da imagem, algoritmo de decisão comentado e um caso comentado.
4. **Evitar "textões":** apresentar preferencialmente dois ou três parágrafos articulados e então o recurso visual adequado. O requisito mínimo de 60.000 caracteres continua válido para o caderno integral, mas o material deve distribuí-los ao longo das seções e **nunca cumpri-lo com blocos massivos ao final**.
5. Em temas com entidades diferentes, **capítulos separados para cada uma** e seção posterior de comparação lado a lado. Em ginecologia, por exemplo, candidíase, vaginose e tricomoníase devem receber explicações próprias antes do quadro comparativo.
6. Tabelas e fluxogramas devem ser acompanhados de legendas com **o que observar, significado e consequência prática**. Sempre que um fluxograma contiver ponto de decisão, explique brevemente no local por que o ramo importa.
7. Ícones, cores e caixas de atenção têm semântica consistente, alto contraste e devem ser legíveis tanto em light quanto dark e PWA. Não fazer um "mar de caixas": mesclar quadros, diagramas e leitura fluida.
8. Realçar os principais critérios, limiares e armadilhas no próprio fluxo da página, sem criar ilustrações fictícias de exames. Fontes de imagens e aprovação no Admin seguem inalteradas.
9. **Aprovação editorial final requer comparação visual de antes/depois**, manutenção dos elementos originais e avaliação de uma amostra de tela mobile + desktop + exportação/print.
10. O nível de aprofundamento não será medido por total de páginas isoladamente, mas também pela completude, legibilidade, valor pedagógico e fidelidade às diretrizes atuais.

**Meta de percepção:** parecer uma apostila de cursinho premium com identidade própria da LURIA, não um artigo científico corrido, não um livro tradicional de colunas imensas de texto, nem uma cópia do material de terceiros.


---

## Correção de QA — 12/10/2026: não inflar páginas com imagens nem com apêndices

O responsável rejeitou expressamente a repetição de imagens para aumentar páginas, o empilhamento de quatro figuras e o acúmulo de aprofundamentos no fim da apostila. Essas práticas são **falhas editoriais**, mesmo que a meta quantitativa seja atingida.

**Novos critérios de revisão obrigatória:**
1. **Uma função pedagógica por figura.** Nunca duplicar em HTML uma imagem já injetada pela fila de aprovadas; reconhecer URL de origem e equivalentes otimizados. Não inserir imagens de mesmo significado repetidamente apenas para alongar a página.
2. **Sem galerias, pares automáticos ou quatro imagens agrupadas.** Figuras devem ser posicionadas junto ao parágrafo, subtópico ou exame que explicam, com legenda que ensine o que observar. Figura complementar no máximo uma por seção que já contenha figura, salvo exceção justificada por tópicos distintos.
3. **Dimensões padrão LURIA**: figura clínica em largura usual de cerca de 480–520 px no desktop, altura proporcional, limite aproximado de 320–340 px na visualização comum, e 100% responsiva no PWA; maior apenas quando necessária para leitura de detalhes. A imagem original é expansível, não deve ser esticada ou achatada.
4. **Aprofundamento integrado, não anexado em camadas.** Não acumular seções repetidas no fim sob títulos genéricos como "Capítulos aprofundados", "Estudo etiológico" e "Aprofundamento". Cada explicação entra no capítulo da sua entidade, respeitando a sequência conceito → mecanismo → clínica → diagnóstico → diferencial → tratamento → complicação → seguimento. Referências devem encerrar o caderno.
5. **Texto e recursos visuais complementares.** Intercalar explicações com tabelas, diagramas, fluxos, cards e callouts originais, evitando longos blocos contínuos. Tabelas precisam ter relevância e interpretação, não são tabelas decorativas.
6. **A contagem de 60.000 caracteres é piso de texto útil, não meta de altura.** Excluir repetições textuais, CSS/JS, sumário, referências e artifícios gráficos. Nunca criar páginas ou imagens para completar uma métrica.
7. **Verificação antes/depois:** auditar URLs de imagens repetidas, imagens agrupadas, quantidade de visuais, capítulos após a bibliografia, títulos repetidos, links de sumário, tabelas, layout PWA e legibilidade das legendas.
8. **Não remover as imagens da fila do Admin por conveniência visual.** Aprovação original permanece registrada; o renderer escolhe inserções pedagógicas sem duplicar ou transformar a seção em galeria.
9. **Qualidade do texto:** evitar páragrafos repetindo explicações anteriores; aprofundar fisiopatologia e raciocínio com distinções clínicas, resultados discordantes e situações especiais objetivas. Quando um tópico fica extenso, subdividir com subtítulos relevantes.
10. **Finalização significa revisão substantiva e visual**, não somente atender caracteres. Validar pelo menos uma renderização real desktop/mobile e registrar limitações quando não houver navegador de teste disponível.


---

## Regra de organização por doença — bloco clínico completo

Diretriz expressa do responsável (12/10/2026): **não fragmentar diagnóstico, tratamento, prevenção e seguimento em capítulos genéricos quando a apostila cobre doenças diferentes**.

**Sequência editorial sugerida por doença (usar apenas os tópicos que acrescentem conteúdo real):**
1. Conceito e epidemiologia (frequência, contextos e fatores de risco).
2. Etiologia e fisiopatologia, com esquema causal original ou sequência visual quando útil.
3. Quadro clínico e exame físico, com imagens reais aprovadas próximas à descrição clínica.
4. Diagnóstico, critérios, exames, limitações e diagnósticos diferenciais **daquela doença**, com imagem de microscopia/exame junto à interpretação.
5. Tratamento da doença, classificando gravidade, primeira linha, alternativas, contraindicações, situações especiais e quando encaminhar; quadro de posologia quando adequado.
6. Profilaxia, aconselhamento e medidas preventivas **específicas**, incluindo parcerias quando pertinente.
7. Complicações, seguimento e manejo de falha/recorrência, integrados ao mesmo bloco.
8. Pulo do Gato, algoritmo e caso comentado associados à etiologia, de forma compacta.

**Regra de pertinência:** não criar seções vazias ou artificiais para uniformizar visualmente os capítulos. Fisiopatologia, epidemiologia, profilaxia, complicações, fluxograma e caso comentado só recebem um bloco próprio quando houver matéria substancial e didática a explicar. Se a informação for breve, incorporá-la ao contexto clínico ou etiológico já existente. Uma sequência editorial ajuda a orientar, não deve impor seis caixas idênticas a todas as doenças. Aprofundamento é qualidade explicativa, não preenchimento de espaços.

**Abertura de apostila multidoenças:** separar nitidamente conceitos do sítio anatômico, fisiologia normal e abordagem inicial do paciente; usar um único recurso visual dominante por explicação, sem empilhar mapa mental, diversos cards, tabelas e fluxos com a mesma mensagem. Colocar mapa mental de integração junto à revisão final quando a abertura estiver carregada. Preservar imagens aprovadas e respeitar o tamanho padrão.

**Não fazer:** abrir três doenças, depois um capítulo único misturando os diagnósticos, depois outro com todos os tratamentos e depois um terceiro com todas as profilaxias. Blocos comuns somente para fundamentos de fisiologia/triagem inicial, diagnósticos transversais não pertencentes às doenças principais, e **quadro comparativo final** após todos os blocos completos.

**Regra de imagens clínicas:** nenhuma imagem remota inacessível deve aparecer como imagem quebrada. Se o arquivo não puder ser validado ou hospedado corretamente com licença, substituir a tentativa inline por link funcional à fonte científica com contexto didático, deixando claro que a fotografia está na publicação externa. A solução definitiva ideal é imagem clínica real, conferida, otimizada, com permissões verificadas e hospedagem estável; não usar imagem gerada para fingir um achado médico real. Não mexer automaticamente no status de aprovação da fila do Admin.

**Conferência obrigatória:** em cada caderno, validar a ordem das seções e do índice, eliminar headings repetidos, confirmar que cada imagem é única e está próxima do texto relevante, manter callouts/esquemas/fluxos, e encerrar com referências. Aplicar esta diretriz às outras apostilas à medida que forem revisadas; não assumir que todas já foram migradas.



## Padrão editorial de cores e composição — outubro de 2026

A apostila deve ter identidade gráfica consistente, leitura agradável e **relação clara entre tipo de bloco e função didática**. Não é permitido inflar comprimento com repetição visual.

**Paleta editorial LURIA**: azul de marca como cor estrutural (`#184888`); rosa suave para candidíase (`#b95780`), verde-azulado para vaginose (`#138a88`), violeta para tricomoníase (`#7962bd`), âmbar como destaque exclusivo da revisão de fixação. Usar combinações acessíveis no escuro e no PWA, evitando depender da cor como única forma de distinção.

**Hierarquia**
- Título de capítulo e faixa de subtópico devem comunicar onde o leitor está.
- Texto-base em parágrafos didáticos com subtítulos; quadros somente quando houver comparação ou raciocínio que ganhe com o formato.
- Tabelas para matrizes diagnósticas, diferenças de esquemas e critérios; nunca duplicar a mesma comparação no card logo seguinte.
- Figuras clínicas originais junto do quadro clínico; microscopia junto do diagnóstico. Legenda fiel à imagem real; nunca substituir por foto de outro sinal clínico mantendo uma legenda antiga.
- **Pulo do Gato** é reservado a dicas de alto impacto, com sua identidade de mascote; outras observações ficam em notas discretas sem mascote.
- **O que não posso esquecer** é um único painel de fechamento, com itens curtos e numerados e hierarquia visual clara. Não deve aparecer como mera lista anônima.
- **Quadro final** de múltiplas doenças: uma única tabela comparativa mais um alerta pertinente. Não empilhar dois fluxos, três cards, dois quadros e um callout repetindo a mesma informação.

**Foto externa quebrada:** recuperar fotografia verdadeira com licença de reutilização confiável; quando a fotografia exata não estiver disponível, uma alternativa real só pode ser usada com legenda corrigida que indique **precisamente** o que mostra. Preferir imagem real de domínio público/CC0 e CDN verificável, ou hospedagem própria quando viável, preservando atribuição. Nunca substituir foto do colo em morango por secreção cervical dizendo que é petéquia. Validação no site/PWA é obrigatória antes de afirmar que uma foto está renderizada.

**Revisão editorial**: checar, por capítulo, densidade de cards, frequência de callouts, variedade de recursos visuais com propósito, contraste de cores, composição mobile e foco didático. Se dois blocos informarem a mesma coisa sem adicionar aprendizado, consolidá-los.



## Ajuste final de legibilidade — referência visual de cursinhos

Comparação feita com os PDFs de referência da pasta do responsável ("02 - CORRIMENTOS VAGINAIS .pdf" e "02 - ASSISTENCIA AO PRE-NATAL.pdf") e o padrão de apostila extensa + ficha de revisão de preparatórios para residência. **São inspirações para hierarquia, não autorização para copiar textos, imagens, identidade visual ou diagramação proprietária.**

**O que aproveitar dos materiais de referência:** títulos hierárquicos e regulares, destaque visual seletivo, tabelas apenas para comparação, figura clínica junto da explicação, seções que começam com premissa e terminam com consequência prática, densidade de informação real e referências completas.

**O que NÃO replicar literalmente:** corpo de texto de aproximadamente 9 pt em duas colunas do PDF impresso (pequeno para leitura no PWA), uso repetitivo de um mesmo destaque colorido em blocos contíguos, páginas criadas artificialmente ou quatro imagens na mesma faixa.

**Escala para leitura digital na LURIA (desktop):**
- Texto-base: referência 14–14,5 px, entrelinhas ~1,68–1,72 e linhas preferencialmente até ~82 caracteres; evitar parágrafos intermináveis.
- H2: ~22 px, H3 da unidade clínica: ~16–17 px, H4 interno: ~14–14,5 px. Não duplicar subtítulos como "Tratamento" imediatamente seguido de "Tratamento — esquemas" sem motivo clínico.
- Respiração vertical: aproximadamente 15 px após parágrafos, 20–23 px entre unidades clínicas e cerca de 24–28 px de margem interna nos blocos brancos. Um elemento visual deve apoiar a explicação, não impor espaços vazios.
- Tabelas: célula de aproximadamente 13 px, espaçamento interno suficiente para consulta; quadro comparativo final único e fontes vinculadas.
- PWA: manter corpo 14 px com entrelinhas 1,68, cards secundários mais discretos e imagens responsivas sem desproporção nem grupos.
- Callouts: usar o Pulo do Gato apenas para insights não redundantes; não colocar outro callout com a mesma informação junto dele.
- Tratamento editorial: preservar texto com causalidade clínica e mecanismos necessários; retirar definições repetidas entre apresentação, clínica e diagnóstico e substituir, quando pertinente, por interpretações de exames, diferenciais e condutas explicadas.

**Verificação:** validar navegação, headings H2/H3/H4, notas duplicadas, semântica da legenda, vínculos de referências, sintaxe CSS/JS, PWA e formato de impressão. Não declarar testes gráficos reais se não houve acesso a um navegador da página publicada.



## Critério de suficiência para questões — estudo por material único

**Obrigatório nas revisões médicas da LURIA:** o caderno deve permitir ao estudante compreender o tema sem consultar outro material de base. Não basta alcançar 60.000 caracteres ou citar uma doença: o ensino deve conectar mecanismo, manifestações, interpretação dos testes, escolhas terapêuticas e consequências, incluindo recorrência e complicações quando forem relevantes.

A qualidade deve ser avaliada por perguntas clínicas reais que o material permite responder, e não por número de páginas. Antes da publicação, conferir:
- se a fisiologia e as definições necessárias ao raciocínio estão presentes, sem blocos vazios e sem repetir a mesma explicação;
- se cada doença principal tem quadro clínico, diagnósticos diferenciais, critérios, interpretação de exames com limitações, esquemas de tratamento (dose, via e duração quando pertinentes), exceções, contraindicações, gestação e outros grupos especiais conforme o tema;
- se complicações, falha de tratamento, recidiva, recorrência, resistência e seguimento foram abordados com profundidade proporcional à importância clínica;
- se o conteúdo diferencia recomendações do Ministério da Saúde/PCDT, FEBRASGO e diretrizes internacionais quando houver divergências relevantes para provas;
- se casos comentados e questões de fixação exigem raciocínio, explicam por que uma escolha é correta e protegem contra pegadinhas, sem transformar o livro em um banco de questões disfarçado;
- se imagens são reais, relevantes, únicas e situadas no ponto adequado; quadros só entram quando a informação ganha com a forma visual;
- se os parágrafos mantêm comprimento confortável, títulos seguem ordem didática, exemplos aparecem após fundamentos e a bibliografia é verificável;
- se a leitura em computador e PWA não exige fonte pequena, largura excessiva, galerias repetidas ou deslocamento lateral de toda a página.

**Referência dos cursinhos do Drive**: estudar a hierarquia de capítulos, tabelas resumidas de decisão, recursos visuais oportunos, quantidade de explicação por assunto e espaçamentos. Recriar linguagem e figuras originais e adaptar para leitura digital. Não copiar seu texto, páginas, design proprietário ou imagens sem licença.

**Critério de aprovação:** selecionar um conjunto diverso de questões representativas da residência para cada capítulo; só considerar o caderno autossuficiente quando a maior parte das respostas puder ser fundamentada por trechos do próprio caderno, sem depender de conhecimento não ensinado. A revisão permanece aberta até esse teste; a contagem de caracteres, isoladamente, não prova suficiência.


## Eficiência e escala da biblioteca — CSS compartilhado e carregamento sob demanda

Ao ampliar todas as apostilas para no mínimo 60 mil caracteres didáticos (e mais, quando necessário), **não sacrificar profundidade clínica para economizar bytes**. O conteúdo útil permanece no HTML, com estrutura semântica; peso e latência devem ser otimizados por recursos compartilhados, compressão e cache.

- **Não repetir CSS extenso em cada HTML.** Utilizar `/assets/css/apostila-luria-book.css` como folha comum para as páginas que adotarem o template editorial LURIA. O caminho foi introduzido em Vulvovaginites em 13/10/2026. Verificar compatibilidade de seletores antes de migrar outras apostilas. Atualizar `?v=` ao alterar regras que afetam leitores com cache.
- **Manter a página HTML autossuficiente em conteúdo**, mas não em folhas de estilo repetidas. Os arquivos de CSS/JS externos devem ser reutilizados por todas as apostilas. Não duplicar bibliotecas em cada capítulo.
- **Abrir sob demanda.** O aluno baixa o HTML da apostila que abriu, e não toda a biblioteca. Nunca colocar centenas de capítulos no `APP_SHELL` do service worker para instalação do PWA. O cache de navegação pode manter as últimas páginas visitadas dentro de limites; um eventual modo de leitura offline em lote precisa ser seletivo, explícito e mostrar o tamanho estimado.
- **Imagens são normalmente o maior fator de crescimento.** Preferir WebP com o limite já estabelecido e `loading="lazy"`, exceto imagens críticas acima da dobra; não incorporar base64 no HTML nem baixar antecipadamente uma galeria de conteúdo ainda não vista. Preservar atribuição e fidelidade clínica.
- **Para verificar o peso**, registrar separadamente HTML bruto, CSS compartilhado, peso das imagens, total das solicitações na primeira visita, tamanho transferido após compressão do servidor e comportamento em abertura com cache. A soma do HTML e do CSS externo na primeira visita pode ser semelhante à versão inline; o ganho de escala decorre da reutilização.
- **Infraestrutura e custos:** controlar peso total do site, volume de mídia e tráfego mensal. Os limites e as condições comerciais de GitHub Pages devem ser reavaliados ao escalar, especialmente por se tratar de plataforma SaaS com assinaturas.
- **Testes antes do rollout:** conferir URLs e CSS no desktop, PWA e impressão; validar sintaxe, índice, navegação, imagens, CSP e cache do service worker. Não declarar resultado do navegador se somente a estrutura do código foi verificada.
