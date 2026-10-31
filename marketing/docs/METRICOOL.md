# RELATÓRIO TÉCNICO: INTEGRAÇÃO OFICIAL METRICOOL MCP

Este documento consolida a investigação técnica e implementação da integração com o servidor oficial MCP (Model Context Protocol) da Metricool para a plataforma médica **TRAUBE**.

---

## 1. Descoberta e Verificação do Servidor Oficial

* **Endpoint Oficial:** `https://ai.metricool.com/mcp`
* **Transporte:** Streamable HTTP / Server-Sent Events (SSE).
* **Protocolo de Autenticação:** OAuth 2.1 com PKCE (código de autorização e refresh token).
  * URL de Autorização: `https://app.metricool.com/oauth/authorize`
  * URL de Token: `https://app.metricool.com/oauth/token`
  * Escopos Oficiais: `mcp:read`, `mcp:write`
  * Header de Autenticação alternativa: `X-Mc-Auth: <METRICOOL_API_TOKEN>`
* **Documentação Oficial:**
  * [How to Connect Metricool's MCP](https://help.metricool.com/en/article/how-to-connect-metricools-mcp-1364s63/)
  * [MCP Limits and Plan Requirements](https://help.metricool.com/mcp-limits-and-plan-requirements-h72jg)

---

## 2. Planos e Requisitos de Acesso

* **Plano Gratuito (Free) vs. Pago (Advanced/Custom):**
  * O acesso ao endpoint remoto MCP (`https://ai.metricool.com/mcp`) está disponível em **todos os planos, inclusive no plano Free** da Metricool, respeitando a cota mensal da conta (até 20 posts agendados/mês no plano gratuito).
  * A alternativa local em linha de comando baseada no pacote Python PyPI (`mcp-metricool`) requer plano **Advanced ou Custom**, pois consome internamente a API REST v2 (`https://app.metricool.com/api/v2/*`).
  * **Decisão TRAUBE:** Priorizar o conector oficial HTTP/SSE remoto e a camada de simulação local sem custos.

---

## 3. Catálogo de Ferramentas Expostas (28 Tools)

A inspeção da biblioteca oficial revelou as 28 ferramentas disponibilizadas:

| Categoria | Nome da Ferramenta | Descrição e Parâmetros Chave |
| :--- | :--- | :--- |
| **Marcas & Config** | `get_brands` | Retorna lista de marcas conectadas (`id`, `label`, `timezone`, `networks`). |
| | `get_brands_complete` | Configurações detalhadas de redes e tokens. |
| **Agendamento** | `get_scheduled_posts` | Consulta calendário (`blog_id`, `start`, `end`, `timezone`). |
| | `post_schedule_post` | Agenda publicação ou cria rascunho (`date`, `blog_id`, `info`). |
| | `update_schedule_post` | Atualiza publicação ou rascunho existente (`id`, `date`, `blog_id`, `info`). |
| **Métricas & Histórico** | `get_instagram_reels` | Métricas de Reels (`init_date`, `end_date`, `blog_id`). |
| | `get_instagram_posts` | Métricas de posts e carrosséis. |
| | `get_analytics` | Extração de métricas consolidadas (`impressions`, `reach`, `engagement`). |
| | `get_best_time_to_post` | Retorna horários de maior engajamento por rede. |

---

## 4. Suporte a Rascunhos (Drafts) e Mídia

### Criação de Rascunhos
* O objeto `info` aceita expressamente `"draft": true`.
* Quando `draft: true`, o post entra no calendário do Metricool em amarelo/cinza como rascunho pendente de aprovação, **sem disparar publicação automática**.

### Requisitos de Mídia para Instagram Reels
1. **URLs Públicas Obrigatórias:** O Metricool **não aceita** envio de binários locais pelo payload do MCP. O campo `"media"` deve conter uma lista de URLs públicas diretas (`https://.../video.mp4`) acessíveis pelos servidores da Meta/Metricool (ex.: bucket público do Supabase Storage, Cloudflare R2 ou Google Drive público).
2. **Especificações Técnicas do Vídeo:**
   * Contêiner: **MP4** (H.264 / AAC 48kHz).
   * Proporção: **9:16 Vertical (1080 × 1920)**.
   * Taxa de bits: 5.000 a 25.000 kbps (CRF 14–16).
   * GOP fechado e átomo `moov` no início do arquivo (`-movflags +faststart`).
   * Tamanho máximo: 4 GB.

---

## 5. Implementação no TRAUBE Marketing Studio

A pasta `marketing/metricool/` implementa:

1. **`client.cjs`:**
   * Modo Seguro (`safeMode: true`): impede qualquer disparo direto para produção.
   * Criação de Rascunho (`isDraft: true` por padrão).
   * Prevenção de duplicatas: hash SHA-256 de texto + data para impedir agendamento repetido.
   * Fallback Gracioso: caso não haja credenciais, executa em modo **Dry-Run**, gerando o payload e registrando no log sem quebrar a pipeline de vídeo.
2. **`plan.cjs`:**
   * Inspeciona `calendar/calendar.json`, filtra posts com status de aprovação humana e exibe tabela de rascunhos.
3. **`check.cjs`:**
   * Testa a conectividade HTTP com `https://ai.metricool.com/mcp` e orienta sobre configuração de credenciais.

---

## 6. Procedimento de Configuração de Credenciais pelo Usuário

Quando o usuário desejar conectar sua conta real da Metricool:
```powershell
$env:METRICOOL_API_TOKEN="seu_token_obtido_no_metricool"
$env:METRICOOL_USER_ID="seu_user_id"
node metricool/check.cjs
```
Pela diretriz de segurança #7, **na primeira execução nenhum post foi publicado ou agendado no Instagram real**.
