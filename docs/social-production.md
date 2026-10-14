# Publicação das salas no site oficial

Em 14/10/2026, o usuário autorizou publicar as funcionalidades no próprio site e deixar o layout para um próximo prompt.

## Configuração

Site: https://www.resibulando.online/amigos/. Hospedagem GitHub Pages preservada, sem reativar builds do Netlify. O cliente continua usando o Supabase oficial sxdsfklllilhdyuamvvg; contas, amizades, ratinhos e suas personalizações não são copiados da homologação.

A migração aditiva 20261014035037_luria_social_rooms_release foi aplicada em uma transação, com salas, grupos, chat, Realtime, Storage privado, agenda, materiais e cotas. Conferência após aplicação: oito perfis e uma amizade aceita preservados, zero salas de teste importadas, onze novas tabelas públicas protegidas por RLS e bucket privado. O bootstrap de homologação NÃO foi aplicado em produção. As duas migrações incrementais exclusivas da homologação ficam em supabase/staging-migrations; supabase/migrations registra a entrega completa aplicada em produção.

Worker separado luria-study-voice, configurado por wrangler.production.toml, usa o banco oficial e um Durable Object próprio. As origens aceitas são exatamente https://www.resibulando.online e https://resibulando.online. Usa o app SFU e a chave TURN já existentes na mesma conta Cloudflare; sessões são autorizadas e isoladas pelo Worker de cada ambiente. Não houve aquisição de outro serviço ou cópia de JWTs.

Como GitHub Pages não executa rotas server-side, o cliente chama https://luria-study-voice.lfab225.workers.dev/api/study-voice. Somente a CSP de Amigos permite essa origem exata. A homologação mantém seu proxy no mesmo domínio. Essa diferença exige repetir testes reais de áudio no domínio oficial, especialmente Safari/dados móveis.

SFU_APP_SECRET, TURN_KEY_ID, TURN_KEY_API_TOKEN e uma capacidade de contabilização exclusiva de produção foram instalados como secrets; nenhum valor está no frontend ou no Git. O banco guarda somente o hash da capacidade. Limite inicial: três horas por usuário/dia, compartilhado entre salas, microfone desligado ao entrar. Sair da sala/hall ou fechar a página encerra a chamada, com leases para falhas de rede. A quota não equivale a um teto contratual de faturamento.

## Publicação e verificação

O histórico foi atualizado a partir de main d5a53d52, preservando as alterações recentes de apostilas e plantão. O conflito de versão de cache foi resolvido mantendo ambos os conjuntos de assets e adotando luria-pwa-social-rooms-20261014.

O workflow existente continua publicando no GitHub Pages após suas verificações. Agora prepara build/pages somente com assets públicos; fontes server-side, SQL, configurações, dependências, testes e secrets ficam fora do artefato. Não remove páginas ou conteúdo do site.

162 testes passaram, incluindo regressões da plataforma, permissões sociais, respostas protegidas, cotas, áudio, build público e isolamento da homologação. Sintaxe, CSS, CSP e auditoria editorial prevista no workflow foram executadas. Os avisos editoriais antigos não foram apresentados como falhas novas.

Advisors conferidos após migração. Tabelas sociais privadas negam acesso direto deliberadamente. A função de limpeza de voz SECURITY DEFINER exige a capacidade secreta do servidor e só liquida/encerra conexões expiradas; não concede acesso de usuário ou administração. Avisos informativos de índices novos sem uso são esperados. Avisos existentes de senhas vazadas e outras funções não foram tratados como uma auditoria global aprovada. Documentação dos avisos: https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy e https://supabase.com/docs/guides/database/database-linter?lint=0028_anon_security_definer_function_executable.

## Próxima etapa

O redesenho integral do layout aguarda o prompt do usuário. Jam depende de convite oficial do Spotify. Continuidade de voz entre páginas HTML completas permanece fora desta entrega; a regra de desconectar ao sair continua aplicada. Homologação e contas de teste permanecem separadas e disponíveis.
