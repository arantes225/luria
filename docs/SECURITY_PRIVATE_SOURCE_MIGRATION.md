# LURIA — Migração dos recursos internos para origem privada

Status: **planejamento / nenhuma exclusão autorizada ou realizada**.

## Diagnóstico verificado em 2026-10-13

- O repositório principal é público e a publicação via GitHub Pages era feita a partir da raiz.
- O artefato público passou a ser preparado por `scripts/build-public-pages.cjs` (PR #33, em rascunho).
- Os diretórios internos estão excluídos do novo artefato, mas continuam acessíveis diretamente pelo GitHub e pelo histórico.
- Inventário da branch `main`:
  - `qf-*/`: 22 arquivos; 4.113.057 bytes
  - `.tmp/`: 8 arquivos; 1.932.920 bytes
  - `tmp/`: 1 arquivo; 28.000 bytes
  - `docs/`: 81 arquivos; 4.819.555 bytes
  - `db/`: 33 arquivos; 213.878 bytes
  - `supabase/`: 6 arquivos; 98.657 bytes
- Arquivos JSON de conteúdo semanal em `content/weekly/` também têm questões. Avaliar individualmente se devem continuar públicos; não removê-los sem mapear o uso da página.
- O workflow de publicação ainda precisa de integração após aprovação do PR #33. O PR não é um deploy.

## Separação recomendada

1. Criar uma origem **privada** exclusivamente para a fábrica de questões e recursos administrativos, preservando todo o código-fonte e histórico de produção necessário.
2. Verificar checksum/quantidade de arquivos do backup privado antes de qualquer remoção na origem pública.
3. Identificar consumidores do diretório de revisão de questões e direcioná-los a backend autenticado ou a um repositório privado. Nunca transportar tokens privilegiados em JavaScript do navegador.
4. Substituir/rotacionar credenciais e códigos de acesso encontrados em arquivos públicos. Uma credencial que apareceu no GitHub deve ser tratada como exposta mesmo depois da remoção.
5. Criar PR de remoção dos arquivos internos da branch principal somente depois dos passos anteriores e dos testes funcionais.
6. Verificar cópias no histórico Git, forks, caches e deploys antigos. Remoção da branch não equivale a revogação nem garante apagar cópias antigas.
7. Manter a biblioteca de questões autorais protegida no Supabase, entregando às contas autorizadas apenas o necessário por sessão com limites no servidor e RLS/entitlements corretos.
8. Conferir rotas PWA, apostilas, questões, simuladores, admin e funções externas antes de qualquer migração de domínio/deploy.

## Checks de publicação

- `node scripts/build-public-pages.cjs` gera `.pages-dist/`.
- `.github/workflows/pages-artifact-audit.yml` valida a filtragem em pull requests sem publicar o site.
- Alterações envolvendo dados de usuários ou permissões precisam ser validadas com duas contas diferentes em staging.
- Não acionar Netlify; manter sincronização desativada.

## Flashcards legados

- Foram identificados 214 flashcards contendo 334 referências para URLs de `flashcard-media`.
- Existem 63 chaves diferentes referenciadas, mas somente 22 objetos são encontrados no bucket legado.
- 41 chaves ausentes não tiveram correspondência por nome em outros buckets.
- Não tornar `flashcard-media` privado antes de migrar referências existentes e recuperar/substituir os arquivos ausentes.
- Não sobrescrever, apagar ou anonimizar os dados originais dos alunos.

## Limites atuais da execução

- A conexão do GitHub disponível nesta conversa não oferece criação de novo repositório privado.
- Nenhuma migração de conteúdo para outra origem foi concluída.
- Nenhuma tentativa de limpar histórico ou apagar arquivos foi efetuada.
