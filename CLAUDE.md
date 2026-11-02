# TRAUBE (repo `arantes225/luria`) — guia para o Claude

Ecossistema de educação médica: **modo estudo** (lançamento), **modo trabalho** (guia de bolso, pasta `trabalho/`) e **ECG** (leitor por IA, fechado até ANVISA; não divulgar).
Marca atual: **TRAUBE** (antes LURIA/StudyOS/Resibulando). O nome do repositório ainda é `luria`. Mascote: **Leco** (substitui "Professor Alex"; renomeação em andamento).

## Regras de trabalho
- Responder em português, em tópicos curtos, indo direto ao ponto. Começar toda resposta com "Luiz" (controle de perda de contexto).
- Antes de mexer no repositório, Supabase ou app: **pedir permissão**. Na dúvida sobre o pedido, perguntar antes.
- Mudança grande → branch + PR (dar o link do PR clicável). Mudança pequena → main.
- Preservar código funcional; não fazer alterações desnecessárias. Entregar arquivos completos, não patches soltos.
- Conteúdo médico: citar referências em degraus (PCDT/Ministério da Saúde → sociedades brasileiras → entidades americanas/europeias → demais). Fonte de maior degrau vence.
- Ao terminar tarefa longa: resumo curto.

## Stack
- Frontend estático (HTML/CSS/JS, PWA) publicado no **GitHub Pages** (`CNAME` na raiz; deploy em push na `main`: `.github/workflows/deploy-pages.yml`).
- Backend: **Supabase** (`supabase/migrations`, `supabase/functions`, SQL avulso em `db/`). Hospedagem/R2: Cloudflare (`cloudflare/`).
- Node >= 24. Comandos: `npm run check` (sintaxe + CSS + prompts + testes), `npm test` (`node --test` em `tests/*.test.cjs`).

## Mapa
- `*.html` na raiz = páginas públicas (URLs fixas). Cada uma tem JS em `assets/js/` e CSS em `assets/css/`.
- `trabalho/` = modo trabalho (anamnese, antimicrobianos, bulario, calculadora, diabetes, ecg, exames, fluidos-eletrólitos, pcr, protocolos, prescricao, plantões…).
- `apostilas/`, `questoes-simulados/`, `flashcards/`, `cronograma/`, `caderno*/`, `feynman/`, `professor-alex/` (Leco), `amigos/`, `jogos/` = modo estudo.
- `supabase/functions/`: `ecg-ai-reader`, `ecg-r2-catalog`, `professor-alex-gemini`, `external-quick-chart*`, `optimize-apostila-image`, `admin-enforce-image-cap`, `question-factory-*`, `qf-chatgpt-bridge`.
- `scripts/` = checks e builds; `tests/` = ~160 testes; `docs/` = documentação (começar por `docs/STRUCTURE.md`).

## NÃO ler inteiro (gasta contexto à toa)
- `docs/CEREBRO-STATUS.md` (gerado a cada push; lista centenas de branches).
- `apostilas/` (~600 arquivos), `assets/img`, `marketing/` (imagens, .glb), `docs/archive`, `docs/mascot-lab`.
- Arquivos enormes: `plantao/personagens-traube.html`, `assets/js/traube-personagens-original.js`, `assets/vendor/*`, `assets/js/*-seeds.js`, `apostilas/curadoria-imagens/data.json`.
- Use `grep`/`head`/`sed -n` e abra só o arquivo ou a função citada.

## Segurança (repositório PÚBLICO)
- Nunca commitar chaves, `.env`, gabaritos completos, acervo da fábrica de questões (`qf-*`, `content/weekly/`) nem dados de paciente. Há `gitleaks` e `.gitignore` reforçado.
- Alterações de segurança do Supabase (RLS, funções SECURITY DEFINER): preparar, mas **aplicar só com aprovação**.
- Antes de apagar branch/PR: listar e pedir permissão. (Há centenas de branches antigas.)
