# Política de Segurança · TRAUBE Platform

A segurança, confidencialidade e integridade dos dados dos nossos usuários e conteúdos médicos são prioridades fundamentais da plataforma **TRAUBE** (`arantes225/luria`).

---

## 1. Versões com Suporte a Correções de Segurança

| Componente | Versão Suportada | Status |
| :--- | :--- | :--- |
| **TRAUBE Web Client (`main`)** | Latest release / produção | :white_check_mark: Suportado |
| **Supabase Database & Edge Functions** | PostgreSQL 17 / Supabase GA | :white_check_mark: Suportado |
| **Branches de desenvolvimento / experimentais** | Não estável | :x: Não suportado |

---

## 2. Divulgação Responsável e Reporte de Vulnerabilidades

Incentivamos a colaboração da comunidade e pesquisadores de segurança éticos ("hackers do bem"). Se você identificar uma brecha de segurança, falha de controle de acesso (BOLA/IDOR), vazamento de dados ou vulnerabilidade na plataforma:

### Como Reportar:
1. **GitHub Private Vulnerability Reporting (Recomendado):**
   - Acesse a aba **Security** > **Advisories** do repositório no GitHub.
   - Clique em **"Report a vulnerability"** para abrir um relatório privado e criptografado que será visualizado exclusivamente pelos mantenedores.
2. **Contato Direto do Mantenedor:**
   - Envie um relatório detalhado com passos de reprodução (PoC seguro), escopo afetado e impacto estimado.
   - **NÃO** abra issues públicas no GitHub para relatar vulnerabilidades não corrigidas.

### Nosso Compromisso (Safe Harbor):
- Não moveremos ações legais contra pesquisadores que realizem testes de segurança de boa-fé, respeitando as seguintes condições:
  - Não acessar, alterar ou exfiltrar dados reais de outros usuários.
  - Não realizar ataques de negação de serviço (DoS/DDoS) ou perturbar a disponibilidade do serviço.
  - Conceder um prazo razoável para triagem e aplicação da correção antes de qualquer divulgação pública.
- Comprometemo-nos a responder e confirmar o recebimento do reporte em até **48 horas úteis**.

---

## 3. Diretrizes de Arquitetura e Controles de Defesa Ativa

O ecossistema TRAUBE adota o modelo de defesa em profundidade (*Defense in Depth*):

1. **Row Level Security (RLS):**
   - Todas as tabelas no esquema `public` possuem RLS estritamente habilitado (`rowsecurity = true`).
   - Dados restritos e conexões de terceiros (como Google Calendar e Notion) operam sob modelo *deny-all* direto no cliente, com acesso mediado exclusivamente por funções `SECURITY DEFINER` auditadas ou serviços autenticados.
2. **Funções com Privilégios Elevados (`SECURITY DEFINER`):**
   - Funções com permissões elevadas exigem fixação explícita de `SET search_path = ''` para prevenir ataques de *Search Path Hijacking* (CVE-2018-1058).
   - Validações de controle de acesso em nível de objeto (BOLA) e verificação de perfil administrativo (`is_admin()` / MFA AAL2) são executadas antes de qualquer operação de escrita ou leitura privilegiada.
3. **Content Security Policy (CSP):**
   - Todas as páginas estáticas geradas impõem cabeçalhos/metatags estritas de CSP, desabilitando manipuladores inline (`script-src-attr 'none'`), `object-src 'none'` e restringindo origens externas estritamente a domínios autorizados.
4. **Proteção contra Tabnabbing:**
   - Todos os links externos abertos em nova aba (`target="_blank"`) devem conter obrigatoriamente `rel="noopener noreferrer"`.
5. **Varredura Contínua de Segredos:**
   - O pipeline de CI/CD inclui automação do **Gitleaks** para impedir a inclusão acidental de chaves de serviço, segredos ou tokens de terceiros no histórico do Git.
