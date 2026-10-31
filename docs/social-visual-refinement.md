# Revisão visual social — 14/10/2026

Atualização Spotify: o player oficial agora abre automaticamente dentro do card, assim que uma faixa, álbum ou playlist é selecionada. Substitui o popover opcional descrito na revisão inicial; mantém o iframe durante atualizações e mudanças de modo e o remove na saída. Sem conteúdo selecionado, mostra “Escolher música”, sem playlist fictícia. Homologação atualizada para `7cbb63c0-5512-4eb3-a3c0-ba4310f8f259`; teste de persistência do player, interface e PWA passaram. Reprodução de conteúdo real continua pendente.

## Base e publicação

Branch: `codex/social-visual-refinement`. Base reversível: `754cd7d9`, com árvore equivalente à versão de produção `572efe450feb23805d502d64e3bf11f0f1dd7c43`.

Antes da alteração, os arquivos publicados de social-v3, social-rooms e social-voice foram comparados à referência `9d2c0dd7`: conteúdo idêntico. Essa equivalência não atribui retrospectivamente a publicação anterior ao commit. Evidência local em `browser-results/social-visual/baseline.json`.

Publicado somente em `https://traube-homologacao.lfab225.workers.dev/amigos/`, versão do site `a5e56ba2-60f6-44d8-98f3-30ac090d62cd`. Nenhum deploy de produção, migração, alteração de credenciais ou publicação do Worker de voz nesta revisão.

## Arquitetura preservada

Site estático com shell, temas, timer global, fontes e ícones compartilhados. Amigos conserva seus IDs, handlers e contratos. Salas utiliza os RPCs existentes no Supabase, mensagens persistentes e canais privados de presença/Realtime; estudo efetivo continua vinculado aos registros reais da TRAUBE. Voz utiliza o Worker existente, Cloudflare SFU e TURN, sem áudio pelo Supabase. Permissões, RLS, respostas protegidas até a revelação e limites de voz permanecem na implementação existente.

`social-v4.css` é isolado à página. `social-view.js` cuida da apresentação e delega ações aos controles existentes, sem criar canais, timers, mídia ou sistemas paralelos. Os modos usam o comando existente de atualização de sala e não desmontam a conexão. Eventos internos cancelados por troca de contexto deixam de exibir um erro de autenticação enganoso; resultados antigos continuam descartados.

## Alterações

- Amigos: cards proporcionais, ações secundárias do amigo em menu, grupos e sugestões compactos, acesso às salas pelo Study Rats.
- Study Rats: circuito curvo com faixas e chegada; ratinhos originais, camadas, acessórios, formatos de offsets e progresso preservados. Transformações conjuntas acompanham a trajetória e respeitam redução de movimento.
- Hall: criação e código de entrada próximos, filtros compactos, prioridade às salas próprias e dos amigos conforme dados autorizados.
- Sala: cabeçalho contextual, participantes horizontais, voz independente, quatro modos visuais, atividade e chat em duas colunas. Spotify permanece acessível enquanto a atividade rola.
- Chat: mensagens em balões, resposta e reações com ícones acessíveis, campo fixo, envio por Enter com Shift+Enter para nova linha; painel móvel com abertura e fechamento explícitos.
- Agenda, materiais e música: diálogos dedicados com os mesmos formulários e permissões. Embed oficial não é recriado a cada atualização; fecha por ação explícita ou saída da sala. Jam é um convite oficial compartilhado, sem simulação de reprodução sincronizada.

## Validação

44 testes passaram: interface social, estados e rascunhos, modo/agenda sem desmontagem, conservação do Embed, amizades, personalizações, saída/reentrada, sinalização e autorização de voz, TURN, quotas, PWA, isolamento do artefato e regressões da comunidade. Verificações de sintaxe, CSS e CSP também passaram durante a revisão.

Inspeção no navegador: estudo livre, foco, todos juntos e revisão nas dimensões 1440×900, 1366×768, 1920×1080, 390×844 e 375×812; sem overflow horizontal. Amigos e hall também inspecionados nas cinco dimensões. Capturas finais, métricas e imagens rosa/escuro estão em `browser-results/social-visual/`. Chat móvel, abertura/fechamento dos três diálogos e versão dos assets publicados conferidos. Preferência original escuro/azul restaurada; modo original livre da sala Oi preservado.

Limites da validação: áudio real nos aparelhos com os novos botões ainda não foi testado pelo usuário. Jam/reprodução com conteúdo real e uma sessão coletiva de questões com lista real também precisam de validação integrada. A conta possui um desafio real ativo com dois ratinhos; não foram criados participantes ou resultados fictícios nem removido esse desafio para forçar uma captura vazia. Estados sem conteúdo permanecem cobertos pela interface e pelos testes locais. A continuidade de voz entre navegações completas do site não foi adicionada; sair da sala continua desligando a chamada.

## Ajuste de música — decisão do usuário
A interface passa a oferecer somente o convite oficial do Spotify Jam. Formulário de playlist e player incorporado removidos; dados musicais anteriores permanecem no banco. Administradores compartilham/removem o convite, participantes abrem ou copiam. Testes de interface e funcionalidades (9), PWA (1) e sintaxe (263 blocos) aprovados. Alteração local, ainda sem publicação desta etapa.


Mural de Jams adicionado ao hall, reutilizando somente os convites das salas retornadas pelo fluxo autorizado. Anúncios visíveis por quatro horas; não representam confirmação de sessão ativa. Teste integrado aprovado e publicação em homologação 88f50629-39d0-4058-a543-854c0125fc20 aceita pelo Wrangler; a conferência HTTP ainda retornou a versão anterior, portanto a disponibilidade pública permanece pendente. Nenhuma migração de banco necessária.

