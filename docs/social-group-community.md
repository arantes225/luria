# Comunidades permanentes de Grupos

Branch: codex/social-reference-composition. Checkpoint anterior: a22efa47.

## Entrega

Grupos deixam de ser apenas cards expansíveis. Abrir comunidade apresenta cabeçalho próprio, membros reais, quatro abas de conteúdo e lateral contextual com objetivo, checklist e acesso às salas existentes. O título geral é ocultado somente dentro da comunidade para evitar repetição; moldura, menu, navegação social e cabeçalho global preservados.

- Chat persistente, mensagens próprias à direita e demais à esquerda, histórico paginado, atualização por Realtime e rascunhos em memória preservados ao alternar abas/navegação.
- Mural persistente com publicações e fixação por administradores.
- Materiais por links HTTPS, com título, contexto e autoria. Upload de arquivos não está incluído neste bloco; não há botão fictício para isso.
- Checklist persistente, conclusão coletiva e progresso calculado pelas etapas reais.
- Convites, objetivo, participantes, histórico e criação de salas reutilizam os comandos existentes.

## Arquitetura e acesso

Uma tabela adicional, study_group_entries, vinculada aos grupos/membros existentes. Tipos chat/post/material/task, sem duplicar usuários, grupos, salas, materiais originais ou sistema de pontuação. RLS habilitada; authenticated tem somente SELECT direto, sem INSERT/UPDATE/DELETE. Escritas centralizadas em função privada com auth.uid, participação, bloqueios, autoria, administração, validação de conteúdo e limite de requisições. API pública usa SECURITY INVOKER e não é executável por anon. Remoção redige o conteúdo antes de manter a marca de remoção, permitindo invalidar a interface via Realtime sem expor conteúdo moderado. Mensagens antigas são paginadas e consultas limitadas. HTML escapado; URLs limitadas a HTTPS sem credenciais.

SQL aditivo reproduzível: db/social_group_community.sql, aplicado somente ao projeto kvprgusgfptslbhigsab. Não aplicado à produção. CLI oficial não pôde inicializar a pasta de configuração neste ambiente; o script foi executado pelo conector Supabase e não registrado como migração automática pelo CLI. Não inventado arquivo de histórico de migração.

## Arquivos

Novos: assets/js/social-group-community.js, assets/css/social-group-community.css, db/social_group_community.sql, tests/social-group-community.test.cjs e tests/social-group-community-ui.test.cjs.
Integração: assets/js/social-rooms.js, amigos.html, amigos/index.html, service-worker.js e tests/social-pwa.test.cjs.

## Validação

25 testes distintos passaram: 14 social-ui, 7 stage82, 1 PWA, 2 banco da comunidade e 1 interface da comunidade. Cobertura de não membro, anônimo, membro removido, autoria forjada, escrita direta, pin/moderação, URLs inválidas, idempotência, paginação, spam, XSS e preservação de rascunho em falhas/navegação. Consulta real na homologação confirmou RLS, ausência de escrita direta e RPC inacessível a anon. Transação real criou mensagem, mural fixado, tarefa concluída e material; rollback confirmado com zero publicações persistidas após a verificação. Não preenchidas telas com dados fictícios.

Advisors de segurança executados: sem ocorrência relacionada aos novos objetos; avisos de objetos anteriores e configurações gerais permanecem fora deste bloco.

Interface real: comunidade existente da conta de teste, leitura e conexão Realtime confirmadas. Quatro temas no desktop 1280×900; quatro abas em 390×844 nas quatro combinações sem overflow horizontal. Screenshots em browser-results/group-community/, incluindo desktop-chat-{blue,pink}-{light,dark}.png e mobile-{chat,mural,materiais,checklist}-{blue,pink}-{light,dark}.png. Matriz em matrix.json. A tela vazia reflete a ausência real de publicações, sem apagar ou fabricar dados para reproduzir mockups.

## Pendências e publicação

Não validado em dispositivo físico/PWA instalado ou áudio entre aparelhos. Materiais aceitam links; anexos ainda pendentes. Reações/respostas/menções do chat de salas não foram inventadas para o chat dos grupos. O gerenciamento existente de participantes/histórico continua acessível pela ação correspondente. O último pedido autoriza publicação no site original ao final, após implementar e validar também questões, flashcards e simulador nativos dentro das salas. Esse próximo bloco ainda não está incluído neste commit. Produção permanece inalterada neste ponto.

Referência técnica: https://supabase.com/docs/guides/database/postgres/row-level-security e https://supabase.com/docs/guides/realtime/authorization.
