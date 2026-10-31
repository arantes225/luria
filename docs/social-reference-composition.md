# Nova composição social baseada nas referências — 14/10/2026

Branch: codex/social-reference-composition.
Checkpoint reversível: 88bbee63. Árvore de trabalho versionada estava limpa antes desta rodada; arquivos não versionados de outros trabalhos foram preservados e não fazem parte da entrega.
Homologação: https://traube-homologacao.lfab225.workers.dev/amigos/
Versão publicada: 55d28d14-c3ab-458d-a35d-e1875407ee7a.
Produção não foi alterada nesta rodada. A aprovação anterior de produção não foi reaproveitada para este novo desenho.

## Composição implementada em bloco

### Amigos
Cards com capa vetorial discreta, avatar circular sobreposto e ações compactas. Um único contato recebe composição horizontal no desktop, sem criar perfis para preencher a tela. Busca, solicitações, sugestões, bloqueios e convite existentes preservados. As caixas externas repetitivas foram removidas da lista; a coluna secundária usa superfícies distintas e estados vazios mais leves. Nova área editorial com ilustração vetorial acadêmica e link funcional para Grupos. Navegação contextual mais compacta.

### Grupos
Hall com apresentação própria, capas maiores e emblemas destacados. Ao expandir no desktop, a capa vira uma coluna lateral contextual; objetivo e ações ocupam a área principal. No celular, a composição volta a uma coluna. Número de membros, descrição, área, papel, convites e ações continuam vindo da implementação autorizada. Não foram inventados chat, materiais ou checklist exclusivos dos grupos.

### Study Rats
O circuito ocupa a largura total da comunidade, com campo contínuo, faixas curvas, cenário vetorial acadêmico e classificação lateral no desktop. No celular, a classificação aparece abaixo da pista e os ratinhos permanecem visíveis. Não foram alteradas as regras de progresso, ordenação, arquivos dos personagens, acessórios, offsets, permissões ou armazenamento. A única alteração no renderizador da corrida adiciona um SVG decorativo sem eventos.

### Salas
Hall com abertura ilustrada, cards contextuais por modalidade, hierarquia entre nome/atividade/ocupação e filtros compactados no celular. Interior com abertura visual, cards de atividades e timer em destaque. Os painéis existentes foram organizados em três abas acessíveis: Sessão, Plano e materiais, Progresso. Alternar abas mantém os nós de timer, chat e conteúdo montados; não cria outra sessão nem refaz conexões.

O chat mantém mensagens próprias à direita e demais à esquerda. O botão compacto fica à esquerda para não conflitar com o Alex, que continua à direita. Voz, Jam, controle da sessão e serviços existentes não foram reimplementados.

## Relação com as imagens
- Referências 2 e 10: capa/avatar, hierarquia de contatos, navegação e ações contextuais.
- Referências 3 e 8: comunidade com capa, emblema, área principal e ferramentas secundárias.
- Referências 1, 4, 9 e 10: área principal de atividade maior que o chat, cores suaves por modalidade e informações distribuídas em painéis.
- Referência Study Rats dos mosaicos: corrida protagonista e classificação contextual, usando exclusivamente os personagens originais.
- Não foram copiadas as outras logos, novas mascotes, fotografias de perfis, estatísticas, mensagens ou modalidades fictícias dos conceitos. As ilustrações desta implementação são SVGs leves de livros, estudo e cenário, com cores dos tokens existentes.

## Arquivos modificados
- amigos.html e amigos/index.html: composição, ilustrações, wrappers e abas dos painéis, sem duplicar IDs existentes.
- assets/css/social-friends.css, social-groups.css, social-rats.css, social-rooms-design.css: regras isoladas por social-composition dentro da camada existente.
- assets/js/amigos.js: capa decorativa no card.
- assets/js/studyrats.js: cenário decorativo da pista.
- assets/js/social-view.js: navegação acessível entre painéis existentes, incluindo teclado, hidden e inert.
- service-worker.js: versão do cache e referências dos assets.
- scripts/build-social-staging.cjs: inclusão dos módulos .mjs já existentes do Alex no artefato de homologação, como ocorre em produção. Sem alterações no mascote ou suas preferências.
- tests/social-ui.test.cjs, social-pwa.test.cjs, social-staging-build.test.cjs, stage82-ui.test.cjs: preservação de nós/rascunho, versão dos assets, módulos preservados e escopo correto das abas principais.

## Testes e evidências
- 29 testes distintos passaram: 14 de interface social, 1 de cache PWA, 3 do artefato de homologação, 7 de navegação/fluxos Stage 82 e 4 de preservação UI Stage 22.
- Novo teste confirma que abas dos painéis não recriam timer/composer nem descartam rascunho; teclado End também seleciona e foca a aba correta.
- CSS alterado analisado com PostCSS; scripts alterados verificados com node --check.
- 24 combinações medidas no navegador: Amigos/Grupos/Salas × azul claro/azul escuro/rosa claro/rosa escuro × 1280×800 e 390×844. Nenhum overflow horizontal observado. Matriz em browser-results/reference-composition/viewport-matrix.json.
- Capturas adicionais do circuito nos quatro temas e dois tamanhos; interior da sala nos quatro temas desktop; grupo expandido, modal de amizade, personalização e chat compacto.
- Na sala Oi, alternar os painéis manteve timer 50:00 e composer presente. Não foi iniciada sessão, chamada de voz ou enviada mensagem.
- Após corrigir a colisão com o Alex, o botão de chat ficou em x=20…97; Alex a partir de x=282. Chat abriu/fechou e o composer terminou em y=763 dentro da viewport 390×844.
- Link Explorar meus grupos testado: seleciona Grupos. Editor original abriu/fechou sem selecionar itens ou alterar personalizações.
- Viewport restaurada ao terminar; página Amigos deixada aberta em homologação.

## Capturas reais
Pasta: browser-results/reference-composition/.
- before-desktop.png: versão anterior no site oficial (1280×720, conta de produção).
- desktop-Amigos-blue-light.png: nova composição em homologação (1280×800, conta de testes).
- desktop-Grupos-*.png e group-interior.png.
- desktop-Salas-*.png, room-*.png e room-session-blue-light.png.
- desktop-rats-*.png e mobile-rats-*.png.
- mobile-Amigos-*.png, mobile-Grupos-*.png e mobile-Salas-*.png (390×844).
- mobile-chat.png, add-friend-modal.png e customizer.png.
A comparação anterior/depois envolve ambientes e contas diferentes; os dados reais não foram alterados para igualá-los. As imagens de referência não são apresentadas como screenshots da TRAUBE.

## Limites e pendências
- Emulação de viewport não equivale a Safari/iPhone/Android físicos ou PWA instalado. Teclado físico/virtual real, rotação e suspensão ainda precisam de conferência em dispositivos.
- Não foi repetido teste de áudio entre aparelhos; a lógica de voz permaneceu intacta.
- Nem todas as combinações desbloqueáveis de acessórios foram inspecionadas visualmente; catálogo, seleção e offsets continuam cobertos pelos testes existentes.
- Recursos exclusivos de grupos e modalidades coletivas ausentes continuam pendentes, sem botões fictícios.
- Revisão visual é uma etapa de avaliação pelo usuário; esta entrega não afirma reprodução literal ou equivalência subjetiva às referências.
