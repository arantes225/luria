# Voz das salas TRAUBE

Atualização de 14/10/2026: publicação em produção autorizada pelo usuário. O serviço separado `luria-study-voice` usa `wrangler.production.toml` e o Supabase oficial; ver [registro de produção](../../docs/social-production.md). As seções abaixo registram a preparação e os testes anteriores em homologação.

Este Worker faz apenas sinalização e autorização. O áudio trafega diretamente pelo Cloudflare Realtime SFU via WebRTC. Supabase mantém identidade, participação e permissões; não transporta áudio.

## Configuração de homologação

1. Ter um projeto Supabase de homologação com o schema atual da TRAUBE, sem copiar dados pessoais de produção. Aplicar `db/social_study_rooms.sql` nesse ambiente e conferir as políticas, grants e a publicação Realtime.
2. Criar um app SFU no Cloudflare autorizado pelo responsável pela conta. Configurar `SFU_APP_ID` e cadastrar `SFU_APP_SECRET` como secret do Worker. Nunca colocar o secret no HTML, JavaScript público ou `wrangler.toml`.
3. Preencher `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY` e `ALLOWED_ORIGINS` com valores do ambiente de teste. A chave Supabase é pública; não se usa `service_role` neste Worker.
4. Configurar a binding `ROOM_VOICE` e sua migration de Durable Object, já descritas em `wrangler.toml`.
5. Publicar **somente em homologação autorizada**. Encaminhar `/api/study-voice/*` do mesmo domínio do site para o Worker. Ele aceita o prefixo sem reescrita adicional. GitHub Pages sozinho não executa esta rota: é necessário um proxy/Worker no domínio de teste. Se for adotado um endpoint em outro domínio, ajustar o endereço do cliente e permitir apenas esse domínio específico na CSP de Amigos.
6. Verificar áudio real entre dois navegadores/dispositivos, redes distintas, iOS e Android, com permissão de microfone, reprodução bloqueada pelo navegador, perda de conexão, troca de sala e chamada com oito participantes.

Em 13/10/2026, o usuário ativou Realtime na conta Cloudflare de homologação e criou o app `luria-homologacao-voz`. O site de testes e o código do Worker de voz foram publicados nessa conta pelo painel. O segredo SFU está criptografado nas variáveis do Worker e a origem aceita é apenas `https://luria-homologacao.lfab225.workers.dev`. Consulte `docs/social-staging.md` para o progresso e pendências. Nada foi publicado no domínio oficial ou no Supabase de produção.

O registro do namespace SQLite `RoomVoice`/binding `ROOM_VOICE` foi concluído pelo Wrangler após autorização explícita do usuário, na versão `00296800-a457-4f6b-b0f7-dc86c108e76f`. `wrangler.staging.toml` usa `exports.RoomVoice` e aceita somente a origem do site de testes. O Wrangler 4.150.0 está fixado no pacote local; `login --device --browser=false --scopes account:read user:read workers_scripts:write` permite autorizar sem callback localhost. Credenciais OAuth ficam no diretório ignorado definido por `XDG_CONFIG_HOME`; não copiar ou exibir esse diretório. `ativar-homologacao.cmd` é uma alternativa manual. Os segredos cadastrados no serviço foram preservados e não são enviados ao frontend. O projeto Supabase de homologação já recebeu as migrações; não reaplicar o bootstrap ou o SQL social nesse banco. Áudio real ainda precisa ser validado com microfone e duas contas/dispositivos.

## Controle de acesso e recursos

- `VOICE_ENABLED=false` nas variáveis do Worker pausa novas conexões e renovações sem impedir a limpeza. Clientes cooperativos encerram a voz no próximo heartbeat (45 segundos); sessões abandonadas expiram e são limpas pelos alarmes (lease de dois minutos), com repetição em caso de falha SFU. Isso não é limite contratual de cobrança ou encerramento instantâneo garantido. Para reabrir, usar `VOICE_ENABLED=true`.

- Cada operação valida o JWT em `/auth/v1/user` e chama `social_voice_authorize` com o JWT do usuário. A função exige sessão presente em `auth.sessions`, participação ativa e sala não arquivada.
- A sala admite até oito usuários. Um Durable Object serializa operações e vincula cada sessão SFU ao usuário, à sala e a uma conexão de navegador. Uma segunda aba é recusada enquanto a primeira estiver ativa.
- Publicação aceita somente SDP de áudio. O cliente pede `video: false`. Não há APIs de câmera, gravação, transcrição, tela ou DataChannel.
- Assinaturas remotas são geradas pelo servidor a partir de usuários autorizados da mesma sala; não é possível fornecer um session ID arbitrário de outra sala.
- Heartbeat a cada 45 segundos renova uma lease de dois minutos. Alarmes fecham tracks abandonadas; falhas de limpeza usam backoff. A duração máxima de uma chamada é oito horas.
- O servidor nunca grava JWTs ou tokens de acesso. Guarda somente metadados SFU e limites de uso. As respostas têm `Cache-Control: no-store`.
- O cliente para todas as capturas ao sair, trocar de sala ou deixar a página. Uma captura que retorna atrasada também é encerrada.
- Se a saída não chegar por falha de rede, a aba conserva somente os IDs da saída já iniciada, conta e horário no `sessionStorage` por até dez minutos. A próxima tentativa da mesma conta/sala repete a saída antes da nova alocação; não reutiliza o client ID para estabelecer outra chamada. Não há tokens nesse registro nem persistência de conexões ativas. Uma falha de Broadcast não encerra mídia saudável; sincronização de assinaturas aguarda transporte conectado.
- O microfone e a oferta são preparados antes da alocação SFU; assinaturas remotas aguardam a conexão do transporte. A limpeza acontece por alarmes e não bloqueia heartbeats saudáveis. Sessões que retornam `425 session_error` deixam a lista ativa e permanecem em registros privados de limpeza, persistidos inclusive após reinício, até confirmação de fechamento ou expiração.
- A saída de voz precede a liberação de participação no banco. Voltar ao hall ou à aba Amigos também encerra a voz. Ao fechar a página, `pagehide` tenta enviar a saída autenticada com `fetch(..., {keepalive: true})`, sem esperar leitura assíncrona da sessão. Fechamento abrupto ou falta de rede não garante entrega; leases/alarmes continuam necessários. Após timeout do fechamento SFU, conferir recursos inativos antes de liberar uma conexão pendente.

## Referências oficiais verificadas

Na homologação, `wrangler.site.staging.toml` serve os assets e encaminha apenas `/api/study-voice/*` ao Worker de voz por service binding. `staging.public.json` usa `voiceOrigin=null` para chamadas de sinalização no próprio endereço do site. O proxy não injeta autorização ou Origin: o serviço continua validando os valores enviados pelo navegador. Essa configuração não foi aplicada ao domínio de produção ou ao GitHub Pages.

- [Connection API](https://developers.cloudflare.com/realtime/sfu/api/): caminhos, autenticação do backend e operações de tracks.
- [Connection patterns](https://developers.cloudflare.com/realtime/sfu/get-started/connection-patterns/): oferta/resposta, assinaturas e fechamento forçado de tracks.
- [Supabase Realtime Authorization](https://supabase.com/docs/guides/realtime/authorization): canais privados, Presence e políticas em `realtime.messages`.

Em redes restritivas, configurar os secrets `TURN_KEY_ID` e `TURN_KEY_API_TOKEN` no Worker. A rota autenticada `ice` exige a mesma participação ativa na sala, respeita a pausa administrativa e gera credenciais Cloudflare TURN de dez minutos, com limite de quatro emissões por usuário/sala a cada minuto. O cliente recebe somente os campos ICE necessários, sem a chave permanente; renova as credenciais durante o heartbeat quando faltam menos de dois minutos, usando `setConfiguration`. Credenciais temporárias não são persistidas no banco, armazenamento do navegador, caches ou logs; encerramento normal para imediatamente captura e transporte, enquanto a validade da credencial TURN expira em até dez minutos. Sem ambos os secrets o ambiente mantém STUN; configuração parcial retorna erro. Não é garantia contra abuso ou limite contratual de faturamento.

Os testes locais simulam a API SFU; não validam transporte de mídia real, rede, quotas ou faturamento. A homologação precisa de teste real com Safari e áudio audível entre dois participantes.
