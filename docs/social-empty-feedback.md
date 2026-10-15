# Área social — estados vazios e orientação

Branch: codex/social-reference-composition. Checkpoint: 21bc3b66.

Bloco visual: busca de amigos sem resultado, lista de amigos vazia, materiais recebidos, solicitações, sugestões, busca de grupos e hall de salas vazio. Ícones consistentes, título curto e orientação contextual; nenhum dado fictício nem botão sem ação. Reutilizadas as ações existentes de convite, criação, busca e filtros.

Arquivos: assets/css/social-friends.css; marcação dos estados em assets/js/amigos.js e assets/js/social-rooms.js; estado de busca de grupos em amigos.html e amigos/index.html; versões/cache em service-worker.js e tests/social-pwa.test.cjs.

Validação: sintaxe dos dois scripts; oito testes de navegação, preservação dos fluxos e PWA passaram; build de homologação concluído. Estados reais conferidos nos quatro temas em 1280×800 sem overflow horizontal. Buscas sem correspondência em grupos e salas conferidas em 390×844. Buscas limpas ao final, sem alterar dados persistidos. Mensagens e permissões existentes preservadas; nenhuma alteração no backend ou integrações.

Capturas: browser-results/social-feedback/desktop-{blue,pink}-{light,dark}.png, mobile-groups.png e mobile-rooms.png. Limites: dados reais da conta não permitem fotografar todos os estados simultaneamente; ausência total de amigos foi implementada sem apagar amizades para testá-la. Mobile emulado não substitui dispositivos físicos/PWA instalado.

Homologação: 7ec9ab05-e423-4a13-ae2f-d07d34416fc4. Produção não alterada.
