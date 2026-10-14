# Etapa 3 — Study Rats (14/10/2026)

Branch codex/social-visual-refinement. Checkpoint/base: 507b14d6. Alterações alheias permanecem fora do commit.

## Implementação

Referências 1/9/10 orientaram protagonismo da corrida e classificação. Pista curva com faixas mais definidas, chegada maior, cores complementares adaptativas, cards de status e classificação por desafio. Prévia do corredor no cabeçalho e acabamento do editor. Composição específica de faixas em coluna para larguras estreitas, mantendo sprites visíveis. Animações por transform preservadas e redução de movimento respeitada.

Sprites, acessórios, IDs, catálogo, offsets v1/v2 e regras de pontuação não foram substituídos. O ranking novo usa a mesma ordenação e unidade do desafio existente; não combina tempo, questões e flashcards em uma pontuação nova. Não se inventaram conquistas ou séries históricas. A criação/entrada de sala saiu da pista; permanece na aba Salas.

## Consistência corrigida

A prévia mascarava o personagem salvo para azul/sem acessório quando o plano restringia mudanças, enquanto a pista mostrava os dados persistidos. A leitura do perfil passa a preservar a seleção salva. O próprio participante usa essa fonte também na pista e classificação; outros participantes usam os dados autorizados da RPC. Restrições de troca continuam nas funções de salvamento, sem ampliação de permissões. Não houve migração nem escrita remota para validar a correção.

## Arquivos

amigos.html; amigos/index.html; assets/css/social-rats.css; assets/js/studyrats.js; assets/js/social-rooms.js (remoção da apresentação redundante de salas na pista); service-worker.js; tests/social-ui.test.cjs; tests/social-pwa.test.cjs; este relatório.

## Testes e evidências

12 testes de interface/PWA aprovados, incluindo seleção salva bloqueada para novas trocas, consistência com linhas antigas da corrida e offsets normalizados. Sintaxe JS e parse CSS conferidos. Métricas de avanço e consultas de progresso preservadas.

Navegador autenticado: o perfil marrom aparece no cabeçalho, editor, pista e classificação. O desafio existente tem dois participantes e zero flashcards; esses dados foram preservados. Nenhum personagem foi trocado para criar capturas. O plano atual permite selecionar somente azul/sem acessório; a seleção marrom já salva continua sendo exibida, com explicação no editor.

Capturas reais em browser-results/rats-stage3: desktop-blue-dark.png, desktop-blue-light.png, desktop-pink-light.png, desktop-pink-dark.png, compact-blue-dark.png, compact-blue-light.png, compact-pink-light.png, compact-pink-dark.png, customizer-blue-dark.png e standings-blue-dark.png. Temas alternados pelo menu oficial e azul/escuro restaurado. Larguras efetivas 1280 e 614 px; sem overflow horizontal. Os dois sprites da pista carregaram com largura renderizada de 144 px e permaneceram dentro da área visível na composição estreita.

Pendências: iPhone/Android/PWA físico, teclado virtual e inspeção visual exaustiva de todos os acessórios. A homologação não foi modificada para desbloquear itens. Vínculo contextual de desafios a grupos e conquistas adicionais não foram implementados nesta tarefa visual.

## Publicação

Homologação autorizada pelo usuário; versão final 6d8e22a7-ec59-498e-8cd6-54beb738f541. Produção, autenticação, banco, voz e música preservados. Sem push. Etapa 4 (Salas) ainda não iniciada.
