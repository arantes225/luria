# Migração controlada da voz para a nova conta Cloudflare

Este documento prepara um Worker de teste separado, sem alterar o Worker de produção `luria-study-voice`, o Worker de homologação existente ou o Supabase de produção.

## Configuração preparada

- Worker novo: `luria-study-voice-nova`
- Conta Cloudflare nova: `353fa1a99bef6c7f9cdf85920e782ed6`
- App Realtime SFU novo: `61a2773cb9679a75ff6c1b42ad83a138`
- Arquivo: `cloudflare/study-voice/wrangler.nova.test.toml`
- Código: o mesmo `cloudflare/study-voice/worker.mjs`, incluindo `RoomVoice`, autorização Supabase e contabilização existente
- Banco de teste: `luria-homologacao` (`kvprgusgfptslbhigsab`), sem dados de produção

A configuração inicia com `VOICE_ENABLED = "false"`. Isso evita aceitar conexões antes que os secrets sejam instalados e o endpoint seja verificado.

## Secrets obrigatórios

Cadastrar no Worker novo, sem colocá-los no repositório, nos arquivos públicos ou nesta conversa:

- `SFU_APP_SECRET`: secret do app SFU novo
- `TURN_KEY_ID`: ID da chave TURN já criada
- `TURN_KEY_API_TOKEN`: token da chave TURN já criada
- `VOICE_ACCOUNTING_KEY`: a mesma capacidade secreta já validada pelo RPC `social_voice_account`; não gerar, substituir ou alterar a chave no Supabase durante esta migração

O valor de `VOICE_ACCOUNTING_KEY` deve ser conferido apenas pelo resultado funcional do RPC no ambiente de teste. O banco mantém somente o hash da capacidade; o valor não deve ser lido, impresso ou salvo.

## Sequência segura

1. Autenticar o Wrangler na conta nova e conferir que o Account ID efetivo é `353fa1a99bef6c7f9cdf85920e782ed6`.
2. Fazer dry-run usando `cloudflare/study-voice/wrangler.nova.test.toml`.
3. Publicar o Worker novo ainda com `VOICE_ENABLED = "false"`.
4. Instalar os quatro secrets com entrada interativa/segura e verificar somente a existência dos secrets, nunca seus valores.
5. Fazer uma chamada autenticada de saúde/negociação sem expor token, SDP ou segredo nos logs. Confirmar as respostas esperadas de origem e autenticação.
6. Alterar `VOICE_ENABLED` para `true` somente no Worker novo e testar com duas contas de teste, em dois dispositivos/navegadores, na mesma sala de homologação: entrada, microfone, áudio nos dois sentidos, heartbeat, mute e saída.
7. Conferir no Supabase de homologação que a contabilização foi criada/liberada corretamente, sem alterar a chave existente.
8. Manter produção e o Worker antigo ativos. Qualquer troca do cliente ou do domínio oficial exige nova autorização explícita e repetição dos testes.

## Comandos operacionais

Executar dentro de `cloudflare/study-voice`, após obter autenticação na conta nova:

```text
npx --yes wrangler@4.150.0 whoami
npx --yes wrangler@4.150.0 deploy --config wrangler.nova.test.toml --dry-run
npx --yes wrangler@4.150.0 deploy --config wrangler.nova.test.toml
npx --yes wrangler@4.150.0 secret put SFU_APP_SECRET --config wrangler.nova.test.toml
npx --yes wrangler@4.150.0 secret put TURN_KEY_ID --config wrangler.nova.test.toml
npx --yes wrangler@4.150.0 secret put TURN_KEY_API_TOKEN --config wrangler.nova.test.toml
npx --yes wrangler@4.150.0 secret put VOICE_ACCOUNTING_KEY --config wrangler.nova.test.toml
```

O deploy não deve avançar para o teste de mídia se o Wrangler estiver autenticado em outra conta, se algum secret estiver ausente, se o SFU responder com erro, ou se a autorização/contabilização do Supabase falhar. Nesses casos, manter `VOICE_ENABLED = "false"` e registrar o bloqueio.
