# Relatório de Auditoria de Segurança do Histórico Git - LURIA

## 1. Escopo e Metodologia

- **Repositório auditado:** `arantes225/luria`
- **Ferramenta utilizada:** Gitleaks v8.18.2
- **Escopo temporal:** Todo o histórico Git (commits, branches, arquivos removidos).
- **Limitações:** A análise estática por expressões regulares (Gitleaks) foca em padrões conhecidos de credenciais, o que pode gerar falsos positivos se não devidamente filtrado.
- **Commits auditados:** 10.231 commits (incluindo todas as referências fetchadas, `--unshallow`).

## 2. Achados Confirmados

Durante a varredura em todo o histórico, foram encontrados vazamentos reais e potenciais. Os valores completos dos segredos foram ofuscados.

### 2.1. Credenciais da AWS (Alta Gravidade)
- **Gravidade:** Alta.
- **Ocorrência:** Commit `08e0d70d` no arquivo `docs/auditoria-apostilas-2026-10-16/evidencias/links-http.json`.
- **Tipo:** Access Key ID da AWS (`AKIAI[REDACTED]A`) e uma URL presigned válida no momento do commit.
- **Status:** Presente no histórico antigo. Arquivo foi removido em commits subsequentes.
- **Risco:** Permite (ou permitia, dependendo do IAM) acesso indevido ao bucket S3 `host-article-assets`, expondo arquivos e gerando custos.
- **Correção necessária:** Revogar a Access Key associada na AWS imediatamente.

### 2.2. JWT Supabase (Média Gravidade)
- **Gravidade:** Média/Baixa.
- **Ocorrência:** Presente no histórico nos arquivos `qf-r8K2[REDACTED]P1cF/index.html` (Commit `dc93e4ab`) e `app.js` (ex.: Commit `2754c71e`).
- **Tipo:** JWT de token anônimo do Supabase (com papel `anon`).
- **Status:** Presente no histórico, possivelmente inativo dependendo da rotação da chave JWT do Supabase.
- **Risco:** Tokens `anon` com JWT assinado com a `jwt_secret` podem permitir leitura e operações de APIs que estão liberadas para usuários anônimos via RLS (Row Level Security).
- **Correção necessária:** O projeto já possui políticas e chaves rotacionadas (publishable), mas é sempre bom confirmar as regras de RLS para acesso `anon`.

### 2.3. Chave Genérica de API/Acesso (Média Gravidade)
- **Gravidade:** Média.
- **Ocorrência:** Commit `dc93e4ab` no arquivo `qf-r8K2[REDACTED]P1cF/index.html`.
- **Tipo:** Variável `ACCESS` com valor fixo para a ponte de acesso, que atua como barreira estática (`r8K2[REDACTED]P1cF`).
- **Status:** Presente no histórico.
- **Risco:** Bypass do controle de acesso estático para essa página pública específica caso a chave não tenha sido invalidada ou trocada.
- **Correção necessária:** Se esta página ainda usar esse método de autenticação, o valor deve ser modificado (rotacionado).

### 2.4. Chaves Publishable do Supabase (Baixa Gravidade / Falso Positivo)
- **Gravidade:** Nenhuma (By design).
- **Ocorrência:** Centenas de incidências no histórico em arquivos como `app.js`, `supabase.js`, `auth.js` (`sb_publishable_...`).
- **Motivo:** Essas chaves (publishable keys) não são segredos, elas servem para identificar o projeto em chamadas client-side. A segurança real recai sobre o JWT (`anon` / `authenticated`) e o RLS (Row Level Security).

## 3. Prioridades de Correção

1. **REVOGAÇÃO IMEDIATA (AWS):** Acessar a conta AWS da LURIA (se a conta for da LURIA) ou notificar o parceiro de conteúdo sobre a chave vazada `AKIAI[REDACTED]A`. Ela precisa ser inativada no IAM Console, pois as urls presigned do s3 continham esse id.
2. **Revisar RLS (Supabase):** Confirmar que o perfil `anon` no Supabase possui apenas acessos de leitura necessários para páginas públicas (sem edição não autorizada e sem vazamento de PII dos pacientes/usuários).
3. **Senhas/Rotacionamentos (Supabase):** Garantir que o segredo JWT de fato foi trocado desde os commits que expuseram a string JWT do início do desenvolvimento.

## 4. Medidas Preventivas para a Versão Atual e Futura

Para impedir vazamentos adicionais, proponho a implementação no GitHub Actions de um *secret scanner* preventivo que impeça commits com chaves em plain-text.

**Plano de ação na branch de segurança:**
- Adicionar uma workflow `security-scan.yml` via GitHub Actions (rodando TruffleHog ou Gitleaks).
- Atualizar o `.gitignore` para barrar pastas padrão de evidências, outputs e dados que contenham informações sensíveis (ex: `**/*.env`, `docs/auditoria-*/evidencias/`).

## 5. Auditoria de Histórico e Limpeza de Repositório
Note que a remoção do arquivo ou as exclusões no `.gitignore` ou `.gitleaks.toml` não deletam os objetos do histórico antigo armazenados nas packfiles do Git.

Para eliminar definitivamente o objeto vazado (como o json com a chave AWS) e garantir que a credencial não seja acessada por quem faz um git clone do histórico completo, será necessário:
1. Revogar/rotacionar todas as chaves vazadas imediatamente.
2. Planejar uma reescrita de histórico em uma janela de manutenção coordenada para a branch main, utilizando ferramentas como `BFG Repo-Cleaner` ou `git filter-repo`.
3. Executar o comando no ambiente local dos desenvolvedores (`git fetch origin && git reset --hard origin/main` seguido de `git reflog expire --expire=now --all` e `git gc --prune=now --aggressive`).
Esse procedimento exige alinhamento com a equipe e força que todos recarreguem suas branchs locais sobre um novo commit raiz livre dos dados sensíveis.
