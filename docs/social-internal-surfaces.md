# LURIA — acabamento das superfícies internas

Branch: codex/social-reference-composition. Checkpoint anterior: 18174184.

Bloco visual sobre a composição nova: cabeçalho contextual do convite, ID pessoal com hierarquia mais clara, faixa lateral de grupo mais estreita, ferramentas internas em superfícies próprias, agrupamento dos campos de criação de sala, limites de altura dos modais e organização das opções de personalização. Nenhum controlador, chamada de API, banco ou permissão foi alterado. Ratinho salvo, itens disponíveis e camadas originais preservados.

Arquivos: quatro folhas social-friends, social-groups, social-rats e social-rooms-design; versões em amigos.html e amigos/index.html; cache em service-worker.js e expectativas em tests/social-pwa.test.cjs.

Validação: 1 teste de cache PWA e 3 testes de isolamento/CSP do build passaram. Convite real aberto e fechado em azul claro, azul escuro, rosa claro e rosa escuro, a 390×844; limites do diálogo dentro da tela nos quatro casos. Formulário de sala a 390×844: rolagem interna, margens visíveis e campos de 16 px. Grupo real expandido em 1280×800, sem overflow horizontal. Personalização aberta sem mudar a seleção. Nenhum convite, grupo, sala ou mensagem criado para preencher capturas.

Capturas reais em browser-results/social-internals/: invite-{blue,pink}-{light,dark}.png, mobile-create-room.png, desktop-group.png e customizer.png. Matriz medida em matrix.json. As referências inspiram hierarquia e superfícies; estes refinamentos não representam uma nova reconstrução completa nem demonstram equivalência subjetiva aos mockups.

Limites: não testado em dispositivo físico ou PWA instalado. Não repetido áudio real. A revisão dos quatro temas deste bloco cobre o convite; a matriz completa da composição anterior consta em docs/social-reference-composition.md. Estados vazios continuam com as mensagens reais existentes, sem dados ilustrativos. Recursos de grupo ainda ausentes continuam pendentes, sem controles fictícios.

Publicação restrita à homologação. Produção não alterada neste bloco.
