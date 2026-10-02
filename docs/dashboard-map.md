# Mapa oficial do Dashboard — LURIA

Este arquivo existe para evitar confusão entre os arquivos que participam do Dashboard.

## Regra principal

**Fonte canônica da página:** `dashboard/index.html`

Toda alteração de estrutura da rota `/dashboard/` deve partir desse arquivo.

`dashboard.html` é um arquivo legado/fallback e **não deve ser tratado como fonte principal**. Se for mantido no projeto, deve espelhar o canônico ou ser convertido em redirecionamento simples.

---

## Arquivos exclusivos ou diretamente responsáveis pelo Dashboard

### 1. `dashboard/index.html`
**Função:** HTML canônico da rota `/dashboard/`.

Responsável por:
- estrutura base da página;
- carregamento dos CSS e JS do Dashboard;
- topbar e shell;
- fallback visual do Dashboard.

**Editar quando:** mudar estrutura, ordem de scripts ou markup específico da página.

---

### 2. `assets/js/dashboard-layouts.js`
**Função:** renderização visual dos layouts 1–5 do Dashboard.

Responsável por:
- criar `#dashboard-alternative`;
- montar cards e grids;
- Dashboard 1–5;
- Ofensiva;
- Atividades do dia;
- Progresso por área;
- Pulo do Gato;
- cards "Estudar agora";
- geometria específica dos layouts.

**Editar quando:** mudar composição/estrutura visual de cards ou comportamento dos layouts.

**Não usar para:** autenticação, dados globais, sidebar ou regras de plano.

---

### 3. `assets/js/dashboard.js`
**Função:** dados e métricas do Dashboard.

Responsável por:
- agenda/atividades;
- métricas de aulas;
- flashcards;
- caderno de erros;
- estatísticas;
- dados por área;
- sincronização com Cronograma;
- disparar eventos de atualização do Dashboard.

**Editar quando:** mudar origem, consulta ou lógica de dados exibidos.

**Não usar para:** layout visual dos cards.

---

### 4. `assets/css/dashboard-layouts.css`
**Função:** estilos exclusivos dos layouts do Dashboard.

Responsável por:
- grids dos layouts 1–5;
- tamanho e alinhamento dos cards;
- responsividade/PWA do Dashboard;
- cards de ofensiva, progresso, atividades, Pulo do Gato etc.

**Editar quando:** mudar tamanho, spacing, alinhamento, grid ou aparência específica do Dashboard.

---

## Arquivos compartilhados que afetam o Dashboard

### 5. `assets/js/app.js`
**Função:** shell global do LURIA.

Afeta o Dashboard em:
- autenticação;
- sidebar;
- tema;
- topbar;
- perfil;
- notificações;
- carregamento do Command Center;
- regras globais de planos/entitlements.

**Cuidado:** mudanças aqui afetam o site inteiro.

---

### 6. `assets/js/luria-command-center.js`
**Função:** recursos inteligentes/globais adicionados por cima das páginas.

No Dashboard atualmente afeta:
- Buscar;
- Estudar agora;
- Voltar para a sessão;
- Command Center;
- posicionamento de elementos globais.

**Cuidado:** observers/mutações aqui podem quebrar o Dashboard mesmo sem tocar nos arquivos `dashboard-*`.

---

### 7. `assets/css/style.css`
**Função:** estilos globais.

Afeta:
- shell;
- topbar;
- cards globais;
- temas;
- responsividade geral.

**Cuidado:** não usar para ajustes específicos de Dashboard se puder ser resolvido em `dashboard-layouts.css`.

---

### 8. `assets/css/luria-brand-v5.css`
**Função:** identidade visual e controles superiores globais.

Afeta:
- Timer;
- sino;
- perfil;
- alinhamento superior;
- componentes de marca.

---

## PWA / cache

### 9. `service-worker.js`
**Função:** cache e fallback offline.

Pode causar:
- versão antiga do Dashboard continuar aparecendo;
- assets antigos após deploy;
- fallback para rota cacheada.

**Só alterar quando:** houver necessidade real de invalidar cache ou mudar estratégia offline.

---

### 10. `assets/js/pwa.js`
**Função:** registro e comportamento básico do PWA.

Normalmente não deve receber ajustes visuais do Dashboard.

---

## Testes

### 11. `tests/layout-pcr.browser.cjs`
**Função:** teste de navegador do site.

Agora deve incluir smoke test de `/dashboard/`:
- rota abre;
- `#dashboard-alternative` é criado;
- renderização termina;
- não depende do fallback visual.

---

## Arquivo legado

### `dashboard.html`
**Status:** legado/fallback.

**Não editar isoladamente.**

Toda alteração feita apenas nele pode divergir de `dashboard/index.html` e causar comportamento diferente entre:
- `/dashboard/`;
- `/dashboard.html`;
- PWA/cache;
- testes.

---

## Fluxo correto para alterações

### Mudança visual
1. `assets/js/dashboard-layouts.js` — se muda markup/estrutura.
2. `assets/css/dashboard-layouts.css` — se muda aparência/geometria.
3. `dashboard/index.html` — apenas se precisa alterar o shell/carregamento.
4. Rodar smoke test do Dashboard.

### Mudança de dados
1. `assets/js/dashboard.js`.
2. Verificar evento `luria:dashboard-data`.
3. Confirmar renderização em `dashboard-layouts.js`.

### Mudança no “Estudar agora” / Buscar
1. `assets/js/luria-command-center.js`.
2. Garantir que observers sejam idempotentes.
3. Testar `/dashboard/`.

### Mudança global
1. `assets/js/app.js`, `style.css` ou `luria-brand-v5.css`.
2. Confirmar que outras páginas continuam funcionando.

---

## Identificadores importantes

- `body[data-page="dashboard"]`
- `#dashboard-alternative`
- `body[data-dashboard-layout="1"..."5"]`
- evento `luria:dashboard-data`

---

## Regra de ouro

Se o pedido do usuário for "ajuste o Dashboard", **não tocar primeiro em `dashboard.html`, `service-worker.js` ou `404.html`**.

Começar por:
- `dashboard/index.html`
- `assets/js/dashboard-layouts.js`
- `assets/css/dashboard-layouts.css`
- `assets/js/dashboard.js`

Só envolver arquivos globais quando a causa realmente estiver neles.
