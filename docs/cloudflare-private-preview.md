# LURIA — prévia privada no Cloudflare Pages

## Objetivo e estado

Ver a plataforma em um link de **homologação**, sem disponibilizar o site completo como produção.
O GitHub Pages antigo e o domínio `www.resibulando.online` **não são alterados por este pacote**.
Os arquivos de publicação do Cloudflare ficam em `build/pages` e são gerados
por `node scripts/build-cloudflare-pages.cjs`.

### Comportamento do build (trava de lançamento)

| Branch no Cloudflare | Variável `LURIA_RELEASE_APPROVED` | Resultado |
| --- | --- | --- |
| `main` | ausente, `no`, outro valor | **Apenas página "Em preparação"**, sem código da LURIA |
| `main` | `yes` | Site completo, publicação pública deliberada |
| Qualquer branch diferente de `main` | qualquer valor | Site completo como **prévia**, a ser protegido pelo Access |
| Sem `CF_PAGES_BRANCH` | ausente | Apenas página "Em preparação" |
| Sem `CF_PAGES_BRANCH` | `LURIA_LOCAL_PREVIEW=yes` | Site completo localmente |

**Importante:** Cloudflare Pages sempre cria um endereço público `<projeto>.pages.dev` para sua branch de produção; antes do lançamento ele só exibirá a página neutra de preparação. As URLs de preview também são públicas por padrão. A política de Access deve ser ligada **antes de autorizar qualquer preview do aplicativo**.

## Passos para conectar a conta Cloudflare (ação no painel)

1. No Cloudflare, abrir **Workers & Pages > Create > Pages > Connect to Git** e autorizar o GitHub ao repositório `arantes225/luria`. A integração suporta repositório privado.
2. Configurar:
   - Production branch: `main`
   - Framework preset: `None`
   - Build command: `node scripts/build-cloudflare-pages.cjs`
   - Build output directory: `build/pages`
   - Root directory: raiz do repositório
   - `LURIA_RELEASE_APPROVED`: **não cadastrar ainda** (ou definir `no`).
3. Na primeira publicação de `main`, conferir que `<projeto>.pages.dev` exibe **somente "Estamos preparando a plataforma"**.
4. Antes de habilitar previews, abrir **Settings > General > Enable access policy**. Conferir que o acesso exige login e que apenas seu usuário/e-mails autorizados podem abrir links de prévia. O Access padrão protege URLs de *preview*, **não** `<projeto>.pages.dev` ou domínios personalizados.
5. Abrir **Settings > Builds > Branch control**. Permitir builds de preview da branch `preview/luria` (e outras branches de teste somente conforme necessário); manter a branch de produção em `main`.
6. Só agora criar/atualizar `preview/luria` no GitHub para gerar a URL privada com HTTPS, exibida em **Workers & Pages > Deployments**, e testar o login do Access em uma janela anônima.
7. **Não configurar domínio personalizado, redirecionar DNS nem desligar GitHub Pages ainda.** O site antigo continua independente durante a migração.
8. Quando aprovar a versão pública, planejar o corte do domínio separadamente, configurar o ambiente de produção, aprovar explicitamente `LURIA_RELEASE_APPROVED=yes`, executar o build de produção e validar o site antes de atualizar DNS/desativar GitHub Pages.

**Atenção a PRs já abertos:** ao conectar a integração do GitHub, o Cloudflare pode detectar branches/PRs existentes. Antes do Access, manter os builds de preview desligados no Branch control para evitar URLs completas abertas ao público.

## Dependência do banco de dados

No estado atual da LURIA, `assets/js/supabase.js` contém a URL e a chave pública do **Supabase já usado pelo site**. Um preview do frontend pode, portanto, autenticar e modificar **os mesmos dados**, se o usuário tiver permissão. Cloudflare Access protege a entrada no site, mas **não isola o banco de dados**. Não executar testes destrutivos, pagamentos ou importações com dados reais.

Recomendado antes de liberar testes multiusuário: criar um projeto Supabase de homologação, migrar schemas/RLS, disponibilizar dados fictícios e configurar o frontend de prévia para usá-lo. Ajustar também os redirect URLs de autenticação e eventuais configurações de Google OAuth para o subdomínio de preview. Não compartilhar secrets no frontend ou no repositório.

## Comandos para prévia local sem Cloudflare

```bash
node --test tests/cloudflare-preview-build.test.cjs
LURIA_LOCAL_PREVIEW=yes node scripts/build-cloudflare-pages.cjs
python3 -m http.server 8788 -d build/pages
```

Acessar `http://localhost:8788` no computador. Para acessar de outro dispositivo, é necessário um ambiente seguro na rede local; não abrir portas à internet por conta própria. Em Windows PowerShell:
`$env:LURIA_LOCAL_PREVIEW="yes"; node scripts/build-cloudflare-pages.cjs`.

## Proteção e limitação

O build usa a mesma lista de arquivos permitidos de `scripts/build-pages.cjs`, copia apenas o artefato estático e remove o `CNAME` do GitHub Pages. Nas prévias, adiciona instruções `noindex`; **isso não substitui autenticação**. O código JavaScript enviado ao navegador continua visível para quem tiver acesso — nunca incluir pesos do leitor de ECG nem tokens privados.

Cloudflare Access não é controlado por este repositório. O nome do projeto, permissões GitHub, domínio e política de acesso exigem configuração na conta Cloudflare. Sem ela, **a prévia remota privada não existe ainda**.

## Verificações antes de liberar

- Confirmar que `main` mostra apenas o placeholder.
- Confirmar que uma URL aleatória de preview exige login Cloudflare Access.
- Testar as rotas `/`, `/login/`, `/aprender/`, `/trabalho/`, `/admin/` em iPhone e computador.
- Conferir CSP, conteúdo estático, PWA e retorno de autenticação.
- Confirmar que nenhum upload/CRUD do preview altera produção sem consentimento.
- Confirmar que `www.resibulando.online` permaneceu no serviço anterior durante a migração.
