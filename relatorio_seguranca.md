# LURIA — Auditoria de segredos e plano de resposta

**Escopo:** repositório `arantes225/luria`, incluindo histórico Git e prevenção de novos vazamentos.  
**Estado:** investigação e mitigação parcial; **não** declarar incidente resolvido sem validação dos provedores.  
**Confidencialidade:** nenhum segredo completo, JWT ou URL pré-assinada deve constar deste documento, de comentários de PR ou de logs.

## 1. Evidências e limites

O Jules relatou uma varredura de **10.231 commits** com Gitleaks v8.18.2 (histórico obtido com `--unshallow`). Esse número documenta a execução informada pelo agente, **não** uma nova varredura independente desta PR. Identificadores de commits abaixo são apenas referências para investigação.

O workflow preventivo `.github/workflows/security-secrets.yml` usa `gitleaks/gitleaks-action@v3`. Em PRs, os logs observados mostraram varredura **incremental**, não auditoria exaustiva de todo o histórico. Um check verde de PR não certifica que todos os commits antigos estejam livres de segredos.

## 2. Achados e classificação

### A. AWS — identificador de chave em URL pré-assinada (investigação prioritária)

- **Local:** commit `08e0d70d`, `docs/auditoria-apostilas-2026-10-16/evidencias/links-http.json` (arquivo removido posteriormente).
- **Evidência relatada:** um identificador `AKIA…` em URL S3 pré-assinada. Não reproduzimos a URL, a assinatura nem o identificador completo.
- **Classificação:** potencial exposição **temporária do recurso endereçado pela URL** enquanto a assinatura era válida. **Um Access Key ID isolado não é o Secret Access Key** e não comprova comprometimento da conta AWS.
- **Ações manuais:** identificar titular e serviço; conferir expiração da URL e escopo do objeto; avaliar logs/acessos anômalos. Se houver evidência de Secret Access Key exposto ou suspeita fundamentada de abuso, revogar/rotacionar a credencial no provedor e verificar recursos associados. Se a conta for de terceiros, encaminhar o relato ao proprietário sem publicar os valores.

### B. Supabase — JWTs históricos de papel `anon` (risco dependente das permissões)

- **Locais relatados:** commits `dc93e4ab` e `2754c71e`, incluindo ponte da fábrica de questões e `app.js`.
- **Classificação:** JWT `anon` / chave pública de cliente não equivale a `service_role` nem, isoladamente, a uma sessão autenticada de usuário. Não existe prova neste relatório de vazamento de um JWT privilegiado ou da assinatura `JWT secret`.
- **Ações manuais:** classificar todos os tokens por papel e validade, verificar políticas RLS, exposição de dados e permissões efetivas do papel anônimo. Somente exigir rotação de segredos de assinatura ou chaves privilegiadas diante de evidência de comprometimento, considerando o impacto sobre tokens existentes.

### C. Ponte da fábrica — `ACCESS` embutido em código estático (risco de exposição de conteúdo)

- **Local:** commit `dc93e4ab`, `qf-*/index.html`; também há snapshots JSON da fábrica presentes no repositório público.
- **Classificação:** uma chave de acesso distribuída em HTML/JS público **não é uma barreira de autorização**. Trocar o literal por outro literal não resolve.
- **Ações manuais:** desativar a ponte pública não necessária e proteger acessos reais por autenticação/autorização no servidor, com controle de origem dos dados. Migrar acervo proprietário para armazenamento privado; excluir arquivos apenas do artefato do Pages não os remove do GitHub nem de forks/clones.

### D. Supabase publishable keys e nomes de storage local (não secretos)

- Valores `sb_publishable_...` são concebidos para exposição no cliente. A integridade de dados depende de RLS, autenticação e serviços server-side.
- `luria_calc_favorites_v1` é um nome de chave do `localStorage`, não uma credencial.
- Um falso positivo só pode ser permitido por correspondência específica e documentada; **nunca** isentar arquivos inteiros como `relatorio_seguranca.md`, HTMLs ou JSONs de auditoria.

## 3. Prevenção implementada nesta PR

1. O arquivo `.gitleaks.toml` herda **explicitamente** as regras nativas (`[extend] useDefault = true`).
2. A allowlist restringe-se a um formato de **publishable key inteira**. Não contém caminhos inteiros ignorados, valores AWS, tokens `ACCESS` ou JWTs.
3. Um único workflow, `.github/workflows/security-secrets.yml`, executa o Gitleaks em push, PR, execução manual e agenda semanal, com privilégios mínimos.
4. A CI cria amostras **sintéticas somente no runner**, verifica que uma amostra inofensiva passa e que um falso token de formato conhecido é detectado. As amostras não são gravadas no Git nem publicadas como artefatos.
5. O `.gitignore` evita commits acidentais de arquivos de ambiente, credenciais e evidências locais, sem substituir o scanner de segredos.

**Validação pendente:** conferir o resultado real dos checks desta PR após o push, inclusive o teste sintético e os alertas restantes. A auditoria histórica precisa ser executada separadamente, com triagem e rastreabilidade.

## 4. Pendências de operação (não automatizadas)

- Verificar no provedor quaisquer credenciais potencialmente comprometidas, revogar as realmente expostas e inspecionar indícios de utilização indevida.
- Revisar políticas RLS e funções `SECURITY DEFINER` no Supabase; testar isolamento entre contas sem utilizar dados de usuários reais.
- Planejar hospedagem compatível com repositório privado antes de tornar o GitHub privado, para não interromper o GitHub Pages.
- Se uma reescrita do histórico for necessária **após rotação dos segredos**, planejar `git filter-repo` em cópia de trabalho descartável, backup, congelamento coordenado de merges e confirmação explícita dos mantenedores. **Não executar automaticamente** `reset --hard`, `git gc --prune` ou force-push. Reescrever o histórico **não apaga** cópias, forks, caches nem artefatos já distribuídos.
- Não declarar a remediação concluída até existirem evidências de rotação/revogação quando aplicável, validação de CI e revisão independente.

## 5. Referências operacionais

- Workflow: `.github/workflows/security-secrets.yml`.
- Publicação segura: `docs/SECURITY_PUBLICATION_RUNBOOK.md`.
- Verificações no Supabase: `Security Advisor` e consulta das concessões `EXECUTE` das funções privilegiadas.
