# Central social TRAUBE — auditoria de 13/10/2026

Repositório: `arantes225/luria`, base `main`. Não houve alteração ou publicação no ambiente remoto.

## Arquitetura encontrada

- Site estático HTML/CSS/JS. GitHub Pages publica automaticamente pushes em `main`.
- Rota canônica `/amigos/index.html` e arquivo legado `amigos.html`, atualmente divergentes.
- Design system: `ui-app.css`, tokens `--color-*`, camadas educacionais, Inter local, navegação v2 e moldura institucional. Referências verificadas: Estatísticas, Aprender, Consolidar, Questões e Simulados, Flashcards e Dashboard.
- `amigos.js`: busca por ID, RPCs `my_friends`, `add_friend_by_luria_id`, `remove_friend` e materiais via `my_direct_shares`.
- `studyrats.js`: editor e desafios compartilhados; `profiles.studyrat_variant`, `studyrat_accessory`, `studyrat_accessory_offsets`. Offsets v1 (pixels) e v2 (normalizados) já coexistem.
- Dez sprites originais em `assets/img/studyrats/ratinhos`. Dezessete arquivos de acessórios; inicialmente dezesseis selecionáveis, além de “sem acessório”. `mouse-ears-headband.webp` estava fora do catálogo, mas a inspeção das RPCs confirmou suporte ao ID `mouse-ears`. O catálogo foi corrigido para restaurar esse item sem alterar IDs ou dados. Nenhum sprite foi substituído.
- Progresso calculado no servidor por revisões de flashcards, dias com sessões registradas, retenção, aulas concluídas e questões respondidas. A posição visual também usa tempo transcorrido e desempenho relativo. Preservar ambos os contratos.
- Supabase confirmado por inspeção **somente de leitura** do catálogo: RLS nas tabelas sociais existentes; RPCs públicas invocam funções privilegiadas no schema `private`. Não existem grupos, salas nem chat persistente.
- Amizades atuais são arestas sem aceite. Migrar mantendo arestas existentes aceitas; pedidos novos precisam de aprovação.
- Exemplos de salas, grupos, convites e sugestões são fictícios. Salas locais guardam apenas nome/código/data em `luria:study-rooms`, sem controle de acesso ou colaboração.
- `TraubeStudyTimer` em `app.js`: sessão individual persistente, pausa por inatividade, gravação em `study_sessions`, continuidade entre páginas. Reutilizar para tempo efetivo; timer coletivo representa a fase da sessão, sem pontuação duplicada.
- Questões: `question_sets` e `question_items` individuais, `question_bank` central. Não ampliar RLS individual para expor gabaritos; resolução coletiva precisa de projeção no servidor que omite respostas até a revelação.
- PWA: `service-worker.js`, shell pré-cacheado, limites de cache e rotas canônicas. Realtime e voz exigem conectividade.
- Há Supabase Edge Functions. Não há Worker/SFU de voz configurado no repositório. Segredos e autorização SFU devem ficar no servidor.

## Preservação e reutilização

Logo TRAUBE, sprites e personalizações, desafios e regras, dados de amizades e compartilhamentos, timer e métricas individuais, banco/listas de questões, autenticação, navegação, temas e componentes globais. Novos estilos ficam restritos à página social.

## Implementação proposta

Uma central com abas Amigos e Salas; Study Rats, amigos, grupos e sugestões em Amigos. Sala persistente separada de sessões; banco com RLS e RPCs para operações atômicas, canais privados para presença/digitação, chat persistente, quiz sem acesso prematuro aos gabaritos e áudio exclusivamente WebRTC/SFU autorizado no servidor.

Alterações de banco e serviços são preparadas para homologação. Não aplicar em produção, publicar em `main` ou habilitar infraestrutura paga sem autorização. A validação local deve usar usuários e conteúdo sintéticos, sem escrita remota.
