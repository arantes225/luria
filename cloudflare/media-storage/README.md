# LURIA: Cloudflare R2 para mídia privada (opcional)

## Estado desta entrega

Este diretório contém uma **integração preparada, não publicada**. Não há R2 bucket criado por este commit, nenhuma alteração no Supabase, nenhum arquivo migrado e nenhuma rota da LURIA ativada no R2. O Worker `cloudflare/study-voice` e a produção permanecem intocados. A implementação existente de `assets/js/storage-router.js` continua usando o Supabase por padrão.

### Por que não migrar tudo imediatamente?

Auditoria somente de leitura em 23/10/2026: o Supabase de produção tinha aproximadamente 646 objetos e cerca de 9 MB registrados em `storage.objects.metadata.size`. Metadados podem estar incompletos. Há buckets privados (`docmap` e anexos das salas); migrá-los sem preservar as autorizações quebraria o isolamento entre alunos. Nenhuma economia material foi demonstrada para esse volume.

## Preparação no Cloudflare (exige autorização no dashboard)

1. Ative R2 em sua conta Cloudflare; examine as informações de faturamento. A ativação pode exigir método de pagamento mesmo dentro da franquia gratuita.
2. Crie **um bucket privado**, como `luria-media-staging`, sem habilitar domínio público nem `r2.dev`. Execute `npx wrangler@4.150.0 r2 bucket create luria-media-staging` a partir de uma máquina autenticada com `npx wrangler@4.150.0 login`.
3. Copie `wrangler.example.toml` para `wrangler.staging.toml`, confirme o nome do bucket, o `SUPABASE_URL` de homologação, a chave **publishable** de homologação e as origens autorizadas. Não utilize JWT, service_role, segredo R2 ou dados pessoais no arquivo.
4. Instale um `SIGNING_SECRET` aleatório de pelo menos 32 caracteres **somente** no Cloudflare: `npx wrangler@4.150.0 secret put SIGNING_SECRET --config wrangler.staging.toml`.
5. Publique **apenas o Worker de homologação**: `npx wrangler@4.150.0 deploy --config wrangler.staging.toml`.
6. Verifique `GET /healthz` e os testes de autorização (sem JWT = 401; JWT alheio = 403; URL assinada expirada = 401; acesso próprio = 200). Antes de aceitar arquivos no R2, ajuste `MEDIA_WRITE_ENABLED = "true"` no Wrangler de homologação e republique; o padrão é **somente leitura**.
7. Registre o provider **apenas na cópia de teste**:
   ```js
   LuriaStorage.registerR2Provider("r2", {
     endpoint: "https://luria-media-staging.<sua-conta>.workers.dev",
     bucket: "luria-media-staging"
   });
   LuriaStorage.configureRoute("flashcard_images", {
     provider: "r2",
     bucket: "luria-media-staging"
   });
   ```
   O login deve ser realizado no mesmo projeto Supabase configurado no Worker. Objetos novos devem começar pelo UUID do aluno: `<user-id>/flashcards/<nome>.webp`.

## Contrato e limites

- R2 é **privado**; a autenticação é verificada no servidor contra `/auth/v1/user` do Supabase do ambiente. O usuário só pode ler, assinar, enviar ou apagar arquivos cujo caminho comece com seu próprio UUID.
- `GET /v1/files/<user-id>/...`: JWT no header ou URL assinada de curta duração (máximo 15 minutos).
- `PUT /v1/files/<user-id>/...`: JWT e arquivo de imagem suportado ou PDF; máximo 10 MB; bloqueado enquanto `MEDIA_WRITE_ENABLED=false`.
- `DELETE /v1/files/<user-id>/...`: JWT; bloqueado enquanto writes estiverem desativados.
- `POST /v1/sign`: JWT, corpo JSON `{key, expiresIn}`; retorna `{signedUrl}`.
- O provider preserva o contrato `{data,error}` do `LuriaStorage`, gera referências `luria-storage://r2/luria-media-staging/<caminho>` e continua lendo referências antigas do Supabase.
- A otimização automática de até 80 KB implementada no wrapper `supabase.js` não se aplica automaticamente ao adaptador R2; antes de ativar uma rota, valide limites e qualidade das imagens no fluxo da página.
- O bridge suporta somente arquivos privados por usuário; **não** ativar para apostilas globais, imagens compartilhadas de questões, anexos de sala, mídias de marketing ou funções de Admin sem regras próprias.
- URLs assinadas **não** são chaves permanentes do banco. Armazene a referência de provider ou o caminho estável. Não apague objetos originais sem cópia, verificação e rollback.
- CORS restringe as origens do navegador, mas não substitui autorização. Nunca coloque `SIGNING_SECRET` no GitHub ou no JavaScript público.

## Validação e próximos passos

Execute `node --test tests/storage-r2.test.cjs` e `node --check cloudflare/media-storage/worker.mjs`. Depois de testes autenticados no ambiente de homologação, decidir se há volume suficiente para migrar **novos uploads** de uma categoria primeiro. O domínio público, banco, Auth, voz e imagens existentes continuam no provedor atual.

Documentação oficial: https://developers.cloudflare.com/r2/get-started/workers-api/ e https://developers.cloudflare.com/r2/buckets/public-buckets/
