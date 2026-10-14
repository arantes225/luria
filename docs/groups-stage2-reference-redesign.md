# Etapa 2 — Grupos (14/10/2026)

Branch codex/social-visual-refinement. Base/checkpoint: dd6955a9, Etapa 1 preservada. Arquivos não relacionados continuam fora do commit.

## Entrega visual

Referências 3 e 8: cards com capa discreta, emblema, especialidade, descrição e contagem real de membros; interior com hierarquia e ações contextuais. Não foram copiadas fotos médicas, estatísticas ou comunidades fictícias. A homologação possui um grupo com um membro; isso foi mantido nas capturas.

Hall com busca local nos grupos autorizados, estados vazios, feedback de busca e convite existente. Abrir grupo expande o card para a largura disponível, com objetivo à esquerda e ações de salas à direita no desktop; uma coluna no compacto. Participantes, papéis administrativos, objetivo e histórico continuam usando os comandos existentes. O painel aberto persiste durante atualização da lista. Não se criou limite de membros nem se reutilizou a capacidade das salas como limite de grupo.

## Arquivos

amigos.html, amigos/index.html, assets/css/social-groups.css, assets/js/social-rooms.js (apresentação dos grupos e busca), service-worker.js, tests/social-ui.test.cjs, tests/social-pwa.test.cjs, este relatório.

## Validação

10 testes de interface/PWA aprovados; novo teste de grupos também passou, cobrindo nome escapado, busca, número de membros real, comandos de participantes/histórico e manutenção da expansão. Sintaxe JS e parse CSS sem erros. Nenhuma migração ou mudança de autenticação, APIs, voz, música, custos ou limites.

Inspeção real da homologação: hall, interior e participantes. Capturas em browser-results/groups-stage2: desktop-blue-dark.png, interior-blue-dark.png, interior-blue-light.png, interior-pink-light.png, interior-pink-dark.png, group-members-blue-dark.png, compact-blue-dark.png, compact-blue-light.png, compact-pink-light.png, compact-pink-dark.png e compact-interior-blue-dark.png. A captura group-members-blue-dark antecede o refinamento do interior em duas colunas; as interior-* mostram a composição final.

Quatro temas alternados pelos controles existentes; azul/escuro restaurado. Larguras reais 1280 e 614 px sem overflow horizontal. Não se declara aprovação de iPhone/Android, teclado virtual ou PWA instalado: limitações do viewport da etapa anterior permanecem.

## Pendências funcionais preservadas

Não há chat, materiais ou checklist persistentes exclusivos de grupo na arquitetura atual. Esses recursos existem nas salas. Não foram adicionados botões fictícios, novas tabelas ou sistemas paralelos para simular sua presença. O comando Ver salas conserva o filtro existente de salas dos grupos do usuário; não foi introduzida consulta nova por grupo específico.

## Publicação

Homologação autorizada pelo usuário. Versão final d71469ca-9a44-41fe-96f7-fe52bdf18caf, interface conferida em navegador autenticado. Sem push ou publicação em produção. Etapa 3 (Study Rats) ainda não iniciada.
