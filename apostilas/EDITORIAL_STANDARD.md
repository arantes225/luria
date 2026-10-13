# Padrão editorial das Apostilas LURIA

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

## Padrão Livro-Texto 40K — revisão global da biblioteca (12/10/2026)

**Escopo:** aplica-se a **todos os cadernos/apostilas já existentes**, publicados ou não, e a quaisquer materiais futuros, independentemente de estarem em \`index.html\` ou em \`content.json\`. Não basta mudar a instrução de criação: cada conteúdo precisa ser efetivamente revisado, reescrito, expandido e validado.

### Mínimo editorial objetivo
- **Pelo menos 40.000 caracteres de conteúdo didático realmente legível por apostila**; excluem-se código HTML, CSS, JavaScript, JSON estrutural, tags, navegação, menus, capa/hero, sumário, nomes de campos, bibliografia e repetições artificiais. A contagem deve ser feita sobre os textos desenvolvidos dos capítulos. O mínimo **não** funciona como teto.
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
- Não marcar o caderno como "40K revisado" antes da verificação objetiva da extensão **e** de uma revisão clínica e pedagógica humana/editorial.

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
- [ ] Conteúdo realmente desenvolvido com >= 40.000 caracteres úteis aferidos.
- [ ] Revisão item a item de cobertura, lacunas, lógica fisiopatológica, diagnóstico, conduta e atualização.
- [ ] Referências pertinentes, verificáveis, incluídas junto às recomendações e na bibliografia.
- [ ] Capítulos completos, índice/âncoras e layout LURIA/PWA preservados.
- [ ] Imagens aprovadas preservadas; candidatas adicionais curadas pelo Admin, não publicadas automaticamente.
- [ ] Teste de abertura do arquivo principal, CSS/JS, índice e imagens no desktop e PWA.
- [ ] Revisão clínica antes de carimbar a edição como concluída.

**Inventário inicial das 25 pastas e suas lacunas:** consultar \`apostilas/AUDITORIA_LIVRO_TEXTO_2026-10-12.md\`. Contagem de caracteres, sozinha, não equivale a revisão clínica nem a publicação de uma versão reescrita.
