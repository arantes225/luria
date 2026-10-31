# Redesign global — prompt mestre definitivo (15/10/2026)

Branch: codex/luria-global-redesign. Checkpoint anterior às alterações: codex/checkpoint-master-20261015 → cec67245. Produção de referência: bc7dcccc; main conferida em 3cca0343 e integrada preservando apostilas recentes. Arquivos não rastreados de Calendário, POC YouTube e ferramentas foram preservados e ficam fora dos commits deste projeto.

## Etapa 0 — baseline

Aplicação estática HTML/CSS/JS, GitHub Pages e homologação Workers existente. Entrada CSS compartilhada ui-app.css sem imports adicionais, camadas com precedência !important explícita. Temas usam data-ui-identity (blue/pink) × data-ui-appearance (light/dark), persistidos por conta em luria:dashboard-ui:v2. Moldura pertence a luria-ui-navigation, com gap/radius/sidebar/header independentes.

Social atual: amigos.js + community-navigation.js; social-rooms.js reutiliza Supabase, chat, timer e voz existentes; social-group-community.js mantém chat/mural/materiais HTTPS/checklist. Grupos ainda não possuem o modo competitivo. studyrats.js e dados de desafios são globais entre contatos, não estão isolados por grupo. Será necessária migração aditiva nas etapas posteriores; não basta mover o DOM.

Atividades: social-native-activities.js possui criação manual de questões, decks por matéria/tema e simulador via módulo original em iframe. A criação manual não atende ao novo requisito de selecionar do banco institucional. Seleção de flashcards ainda precisa de filtros e deck temporário explícito. Direcionamento do simulador deverá ser investigado com teste de troca de atividades/estado e não apenas texto. Nenhum serviço de voz, autenticação, Spotify ou dados foi modificado.

## Etapa 1 — fundação implementada

Quatro paletas atualizadas no CSS compartilhado, sem novo mecanismo de temas. Moldura desacoplada da cor dos botões: azul claro #184888, azul escuro #102A4C, rosa claro #B2577D, rosa escuro #412439; geometria preservada. Temas escuros agora usam marinho/ameixa em vez de superfícies quase pretas comuns.

Tokens de teal/sálvia/violeta/coral/âmbar adaptados por identidade e luminosidade. Tokens contextuais para questões, flashcards, erros, apostilas, notas, TraubeZap, Alex, amigos, grupos, salas, ratos, simulador e ofensiva. Variantes opt-in de cards, ações contextuais, estados, modais e ícones. Fonte Inter e escala existentes preservadas; botões recebem arredondamento, padding e transições uniformes. A adoção e revisão de cada página permanece separada: tokens não significam redesign completo.

Testes: contraste AA de textos, textos secundários, ações e complementares nos quatro temas; verificação de moldura e persistência inalteradas. Conferência visual real pendente na homologação autorizada. Produção não publicada.

## Matriz de cobertura

| Área | Fundação | Revisão de composição | Validação visual/funcional |
|---|---|---|---|
| Aprender | Implementada | Implementada: Alex e três cards contextuais | Testes de integração passaram; visual pendente |
| Amigos | Implementada | Pendente nova entrada sem Study Rats | Pendente |
| Grupos/Study Rats | Implementada | Pendente competição por grupo | Pendente migração e isolamento |
| Salas | Implementada | Pendente modais e nova composição | Voz preservada; regressão pendente |
| Questões nas salas | Implementada | Pendente banco/filtros/modos | Não atende ainda ao novo fluxo |
| Flashcards nas salas | Implementada | Pendente seleção/deck temporário | Não atende ainda ao novo fluxo |
| Simulador nas salas | Implementada | Pendente investigação de estado/rota | Motor preservado |
| Dashboard/Consolidar/Cronograma | Implementada | Pendente revisão individual | Pendente |
| Questões/Flashcards/Caderno de Erros | Implementada | Pendente revisão individual | Pendente |
| Apostilas/Anotações/Alex/TraubeZap | Implementada | Pendente revisão individual | Pendente |
| Simulador/Estatísticas/Trabalho | Implementada | Pendente revisão individual | Lógica clínica preservada |
| Perfil/Admin/Configurações/Editais/Planos/secundárias | Implementada | Pendente revisão individual | Pendente |

Não há declaração de conclusão global. Sem publicação em produção, sem migração aplicada e sem reativar Netlify.

## Etapa 2 — Aprender implementada

Nova composição do card Alex com mascote oficial, formulário existente, sugestões que levam à tutoria real e anexos preservados. Apostilas, Anotações e TraubeZap adotam variantes da fundação com cores e ilustrações SVG próprias. O contador estático incorreto de uma apostila foi substituído por ação de biblioteca. Permissão admin do Alex mantida. Cinco testes de fundação/integração passaram. CSS educacional passa a respeitar componentes opt-in, eliminando o reset monocromático dessas variantes em vez de acumular sobrescritas. Validação visual real aguarda homologação.

## Continuação — 15/10: entrada da comunidade
- Fundação e Aprender publicadas somente na homologação: versão Cloudflare `054c97c2-c5e1-4946-baee-8a9f42f174c2`.
- Validação real de Aprender bloqueada pela permissão `dashboard` ausente na configuração da conta de homologação: o guard existente redireciona ao Dashboard. Nenhuma permissão foi alterada para contornar isso. Os quatro temas ainda precisam de capturas reais desta composição.
- Etapa 3 implementada localmente: portais contextuais Grupos/Salas dentro do conteúdo, retorno para Amigos sem barra redundante, amigos compactos, convite original preservado. Navegação usa links nativos e aria-current, mantendo hashes, retorno do navegador e encerramento da participação ao sair da Sala.
- A interface legada de competição foi retirada do painel inicial e mantida em container hidden/inert de compatibilidade, preservando os IDs e listeners. Não é ainda a integração por Grupo: Etapa 4 permanece pendente, com persistência/permissões/migração aditiva e ranking isolado obrigatórios.
- Quatro testes de contrato/fundação/Aprender passaram; CSP de 96 páginas verificada. Suíte social de regressão em execução nesta continuação.
- Segunda publicação (entrada de Amigos) não ocorreu: Wrangler não conseguiu alcançar o servidor de autenticação Cloudflare para atualizar o token. Código e build local preservados. Produção inalterada.
- Regressão social: 23/25 passaram na primeira execução; dois contratos antigos foram atualizados para a nova estrutura (competição fora do painel e links nativos). Ambos passaram na repetição direcionada, incluindo criação/entrada/mensagens persistidas via RPC e preservação dos nós do chat/timer. A chamada de voz real com múltiplos usuários não foi executada.
- Commit da Etapa 3 pendente: Git recusou criar `.git/index.lock` por ausência de permissão de escrita nesta sessão. Alterações permanecem no diretório de trabalho da branch `codex/luria-global-redesign`; nenhum reset ou force push realizado.

### Refinamento local da Etapa 3
- Removida a geração de capas decorativas em amigos.js, sem apenas escondê-las com CSS.
- Cores sociais passaram a referenciar resource-groups/rooms/streak, eliminando as sobrescritas de paleta locais. Corrigida a referência inexistente a accent-amber.
- Estilos dos portais limitados ao escopo da página Amigos. Navegação agora transfere o foco para o título da área aberta; o modal de amizade mantém a restauração do foco no botão Adicionar amigo.
- Suite de 29 testes: 28 passaram; o teste restante detectou uma regressão real de foco ao fechar o modal. Corrigida a causa e a repetição direcionada passou. CSP: 96 páginas verificadas. diff --check sem erros de whitespace.
- Revalidação de publicação e Git confirmou os mesmos bloqueios de rede Cloudflare e escrita no .git. Nenhuma nova publicação ou commit foi confirmado.

### Etapa 4 — configuração de tipo de Grupo (parcial, local)
- Fonte aditiva `supabase/migrations/20261015153556_social_group_competition.sql`: coluna competitive, criação atômica, alteração pelo comando group_update existente e capacidade explícita no snapshot. Nenhum grant ou política expandido; autorização de administrador existente preservada. O script aborta caso os trechos atuais das funções tenham divergido, em vez de sobrescrever uma implementação desconhecida.
- Compatibilidade: grupos sem escolha explícita permanecem sem competição; não há deleção/reassociação de competições antigas ou alteração de perfis/ratinhos. O inventário de histórico em produção continua obrigatório antes da migração final.
- Frontend: seletor em cards de rádio, indicador discreto nos cards e ativação/desativação para administradores. As opções não aparecem com backend antigo. Configuração booleana é enviada aos comandos reais, não apenas armazenada no frontend.
- Testes novos: PostgreSQL local confirmou criação, alternância, preservação dos grupos/membros, bloqueio de alteração direta e de chamadas por membro/terceiro, rejeição de payload inválido e reexecução idempotente. Dois testes de UI confirmaram o gate de capacidade, payload booleano e alteração pelo administrador.
- Regressão anterior completa de Amigos: 29/29 passaram após a correção do foco.
- Pendente: transformar esta fonte em migração Supabase timestampada pelo CLI (CLI indisponível nesta sessão), revisar contra o schema publicado, concluir o Study Rats isolado por Grupo e sua navegação condicional, validar visualmente quatro temas/mobile e aplicar somente ao ambiente autorizado. Nenhuma migração remota aplicada.
- Publicação/commit continuam pendentes devido ao acesso ao Cloudflare e à escrita no .git. A Etapa 4 não está declarada concluída; as demais páginas globais e atividades educacionais continuam na matriz como pendentes.
- Verificação combinada final desta continuação: 32/32 testes passaram (fundação, Aprender, navegação, regressão social e configuração competitiva). CSP de 96 páginas verificada; diff --check sem erros. Isto não substitui os testes visuais/autenticados pendentes.

## Bloco Grupos + Study Rats — implementação local integrada
- Corridas novas recebem group_id; corridas antigas permanecem com group_id NULL, sem reassociação nem exclusão automática. Fonte aditiva em supabase/migrations/20261015153559_social_group_studyrats.sql, ainda sem aplicação remota ou migração timestampada pelo CLI.
- RPC group_studyrats valida associação ao Grupo, modo competitivo e papel de administrador na criação. Participação é voluntária; é exigido o compartilhamento real do status de estudo. Métricas vêm das consultas originais da TRAUBE, filtradas por membros atuais, privacidade e bloqueios. Não se utiliza retenção por autoavaliação como taxa objetiva de acertos.
- Leituras v2/v3 antigas ficam restritas às corridas legadas. A função usada por RLS passa a exigir acesso ao Grupo competitivo para as novas corridas. O comando antigo de exclusão também fica restrito às corridas legadas, preservando as novas corridas contra esse caminho alternativo.
- O novo ranking usa somente até 50 competições recentes do Grupo por leitura. As métricas suportadas neste bloco são questões respondidas, flashcards revisados, dias de estudo e aulas concluídas. Taxa objetiva de acertos, tempo efetivo, metas e presets de período ainda exigem implementação/validação própria.
- Navegação do Grupo exibe Study Rats apenas quando competitivo e com capacidade confirmada pelo backend. A mesma instância original da pista/personalização é movida para dentro do Grupo; não há duplicação de IDs, mascotes, acessórios ou previews. Sai da comunidade e retorna ao container oculto de compatibilidade ao fechar/alterar o Grupo.
- Solicitações atrasadas de um Grupo não podem preencher outro; pista, convites e mensagens de status são limpos ao mudar o contexto. A área competitiva ganha largura enquanto o painel complementar fica recolhido. Voz/Spotify não foram alterados.
- Testes locais específicos passaram para isolamento entre dois Grupos, participação voluntária, progresso vindo de question_attempts, privacidade, remoção de membro, desativação/reativação sem apagar registros, leitura legada e bloqueio de exclusão por RPC antigo, navegação condicional, foco e preservação da mesma instância do ratinho. Regressão social anterior deste bloco: 31/31 passaram. Testes adicionais de workspace/competição/PWA: 5/5 passaram; repetição de backend/contexto após refinamento: 2/2 passaram.
- Cache do PWA e versões dos assets atualizados em conjunto; cache continua restrito a código público. CSP: 96 páginas verificadas.
- Não é uma conclusão da Etapa 4: faltam revisão contra produção antes da migração final, testes autenticados reais, capturas dos quatro temas/mobile, acabamento visual da pista e recursos competitivos ainda listados como pendentes. Commit e deploy continuam sem confirmação pelas restrições já registradas. Produção permanece inalterada.
- Verificação combinada final do bloco: 38/38 testes passaram; JavaScript validado; CSS analisado com PostCSS; CSP de 96 páginas verificada. Sem screenshots novos ou alegação de validação autenticada/multiusuário real.

## Atualização confirmada — 15/10, bloco integrado
- Restrições anteriores de Git/rede resolvidas nesta sessão. Etapa 3 registrada em 1fdff084; o conteúdo exato desse commit passou em 27 testes, em cópia independente.
- Frontend publicado somente na homologação, versão Cloudflare ae70026c-1b26-43c3-bce6-cfbd24cd4e89. Produção permanece inalterada.
- Migrações aditivas geradas pelo Supabase CLI 2.121.0, com SUPABASE_HOME local ao workspace. Os dois arquivos timestampados substituem as fontes provisórias. Ainda não aplicadas remotamente; os controles competitivos dependem da capacidade real do servidor.
- Oito capturas reais de Amigos disponíveis em browser-results/global-redesign: azul/rosa, claro/escuro, desktop/mobile. Revisão direta de azul claro desktop e rosa escuro mobile confirma os acessos contextuais e a ausência da pista no hall. Isso não valida PWA instalado nem todos os fluxos autenticados.
- Aprender continua com validação autenticada pendente devido ao acesso da conta. Atividades educacionais, demais páginas, métricas competitivas adicionais e testes multiusuário continuam pendentes.

## Revisão após rejeição visual — composição e uniformização
- A versão anterior de Amigos foi rejeitada pelo usuário. Não é referência aprovada de acabamento.
- Reduzida a fragmentação: contatos e informações auxiliares formam uma superfície contínua, com divisórias; contatos passam a linhas compactas. Portais Grupos/Salas mantêm destaque sem criar outra navegação.
- Contrato compartilhado de ações consolidado em ui-app.css: altura mínima 44px, texto 14px/600, raio 12px, padding e estados comuns. Escopo limitado ao conteúdo e diálogos, sem alterar moldura/controles institucionais. Preservadas variantes contextuais, sucesso e exclusão.
- Removidas quatro regras concorrentes de botões de education-ui-v2.css, incluindo a regra que aplicava formato de ação a todo botão, mesmo controles específicos.
- Consolidar adota os mesmos componentes de funcionalidades usados pela fundação: questões/flashcards/erros com cores contextuais, ícones e ações comuns. Dashboard mantém estrutura personalizável; ação principal usa o controle compartilhado.
- Versionamento dos estilos com identificador de entrega único: a inspeção real encontrou CSS antigo no navegador sob a URL numérica. Depois da correção, a medida real do botão Adicionar amigo confirmou 14px/600, mínimo 44px e raio 12px.
- 35 testes passaram nesta rodada (Dashboard, fundação, navegação, PWA e contratos de módulos), além de 19 testes sociais na rodada anterior. O teste do Dashboard registra avisos de MutationObserver no encerramento do JSDOM; não houve falha de asserção. O verificador amplo de CSS encontrou somente uma referência /view.css ausente na POC YouTube não rastreada de outro trabalho; arquivo preservado.
- O redesign global NÃO está concluído. Controles próprios de módulos, composição das demais páginas, quatro temas renderizados desta revisão, PWA instalado e fluxos multiusuário continuam pendentes. Não confundir atualização dos links CSS em todas as páginas com revisão visual de todas elas.
- Publicação final deste bloco somente na homologação: 12437703-3766-4da6-922a-68faec6c1ea9. Capturas Amigos desktop/mobile atualizadas; sem overflow horizontal nas duas larguras. A conta de homologação redireciona Consolidar ao Dashboard: a imagem dessa tentativa foi identificada como redirecionamento, não como validação de Consolidar. Nenhuma permissão alterada para contornar o acesso.
