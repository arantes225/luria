# Etapa 5 — Quatro temas e PWA (14/10/2026)

Branch codex/social-visual-refinement. Checkpoint/base: cb0f230b. Alterações alheias permanecem fora do commit.

## Ajustes

- Folha social-responsive.css isolada à área social; sem novo tema e sem alteração do mecanismo de persistência.
- Campos sociais em largura compacta com 16 px para evitar o zoom de foco associado a fontes menores no Safari.
- Modais com limite de altura dinâmica, safe areas e contenção de rolagem.
- Chat compacto acompanha a altura/offset de visualViewport. Atualizações agrupadas por requestAnimationFrame, sem recriar o campo ou descartar rascunhos. Fallback para innerHeight quando visualViewport não existe.
- Painel curto ajustado à área útil; controle de fechamento no cabeçalho do próprio painel, sem disputar a posição do perfil global.
- Foco visível, textos longos, alvos de toque e redução de movimento refinados.
- Cache PWA inclui explicitamente todas as folhas sociais novas e o controlador de apresentação versionado; mantém exclusão de requisições autenticadas e links de convite.

Arquivos: amigos.html; amigos/index.html; assets/css/social-responsive.css; assets/js/social-view.js; service-worker.js; tests/social-pwa.test.cjs; tests/social-ui.test.cjs; tests/social-staging-build.test.cjs; este relatório.

## Testes

16 testes de interface, PWA e build de homologação aprovados. O teste novo de redução/retorno da área visível passou separadamente, totalizando 17 testes distintos. Ele valida manutenção do rascunho e identidade do compositor durante resize, offsets e retorno ao tamanho normal. O teste de cache passou novamente com a versão final da folha. Sintaxe JS e parse CSS conferidos.

Build verificado: projeto Supabase de homologação isolado, sem definições de banco, segredos ou metadados Git no artefato. Hashes CSP dos scripts inline compatíveis. O teste antigo que fixava o nome de um cache anterior foi atualizado para comparar com a versão efetiva da fonte.

## Inspeção real

Revisão de Amigos, Grupos e hall em azul claro, azul escuro, rosa claro e rosa escuro; alternância pelos controles oficiais. Preferência azul/escuro restaurada. Fontes dos campos de amigos e grupos medidas em 16 px. Largura efetiva de 614 px sem overflow horizontal. Capturas em browser-results/social-stage5: friends-*, groups-* e hall-* para os quatro pares identidade/luminosidade, além de chat-visible-area.png.

Chat real: entrada na sala Oi, histórico existente carregado, painel aberto/fechado sem envio de mensagem, modo review preservado e saída da sala ao terminar. Na captura final, área visível com 528 px, painel entre y=84 e y=458; botão Fechar entre y=90 e y=130; campo de envio dentro do painel. Não houve entrada na voz, início de estudo, alteração de participantes/papéis ou conteúdo.

Durante a revisão, o fechamento inicialmente disputava espaço com o cabeçalho global. Foi movido para o painel e conferido novamente no navegador. Não se afirma teste real do teclado apenas porque o compositor recebeu foco em um navegador desktop.

## Limites — pendências de dispositivo

A ferramenta de viewport não aplicou dimensões de celular nas etapas anteriores. A revisão real desta etapa foi em 614×528; as etapas 1–4 também têm capturas reais em 1280×720. Não se declara inspeção em 375/390 px, iPhone, Android, teclado virtual nativo ou PWA instalado. A lógica de resize foi testada de forma automatizada, não com teclado físico móvel. Instalação, suspensão/retomada, rotação e teste em aparelho continuam pendentes antes de afirmar aprovação integral do PWA.

Essas limitações não bloqueiam a entrega dos ajustes visuais em homologação, mas impedem considerar encerrada a validação física da Etapa 5. As pendências funcionais das etapas anteriores permanecem; nada foi simulado para preencher as telas.

## Publicação

Publicação autorizada pelo usuário na homologação. Versão final 81a15066-2550-473e-9395-e2ef9ddd8127. CSS social-responsive v3 e social-view stage5 conferidos no site real. Sem publicação em produção, push, migração ou mudança de infraestrutura/custos.
