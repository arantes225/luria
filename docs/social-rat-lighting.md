# TRAUBE — iluminação dos ratinhos e editor compacto

Branch: codex/social-reference-composition. Checkpoint anterior: a4a00d77.

Pedido incorporado: halo iluminado somente nas aparências escuras. As regras antigas dependiam do data-theme da raiz; as novas regras isoladas usam data-ui-appearance, preservando a independência entre identidade azul/rosa e luminosidade clara/escura. Nos claros há apenas sombra neutra discreta. Nos escuros o halo usa a cor semântica adaptada à identidade. Aplicação consistente no topo, prévia, pista, ranking e opções existentes.

Editor: opções de ratinho e acessório lado a lado no mobile, tiles compactos e status vazio sem reservar altura. Prévia, sprites, offsets, camadas, itens, permissões e seleções salvas intactos. Nenhum arquivo de imagem ou controlador alterado.

Arquivos: assets/css/social-rats.css; versões em amigos.html, amigos/index.html, service-worker.js e tests/social-pwa.test.cjs.

Validação: teste PWA passou; build isolado concluído. Interface real a 390×844 nas quatro combinações: filtro neutro nos claros e halo nos escuros, sem overflow; editor com aproximadamente 530 px de altura. Capturas desktop azul claro/escuro a 1280×800. Auditoria adicional de Amigos, Grupos e Salas em 320 e 768 px: sem overflow horizontal nem controles escapando da viewport. Não alterados dados para capturas; não trocada seleção do personagem.

Evidências: browser-results/rat-lighting/mobile-{blue,pink}-{light,dark}.png, desktop-blue-{light,dark}.png e matrix.json. Viewport emulado; dispositivos físicos, teclado virtual e PWA instalado permanecem pendentes de teste real. Não verificadas todas as combinações desbloqueáveis de acessórios.

Homologação publicada: a76df0d8-6563-4c65-a2e0-3ed3b16c1902. Produção não alterada.
