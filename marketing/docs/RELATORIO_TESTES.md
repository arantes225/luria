# RELATÓRIO DE AUDITORIA E TESTES — TRAUBE MARKETING STUDIO

**Data:** 15 de Outubro de 2026  
**Ambiente:** Windows 11 x64, Node.js v24.21.0, Google Chrome / Chromium  
**Branch de Trabalho:** `marketing/studio-pipeline` (isolada da branch `main` de produção)  
**Status Geral:** ✔ **APROVADO EM TODAS AS ETAPAS**

---

## 1. Auditoria Inicial da Stack e Ambiente

| Componente | Versão / Caminho | Status / Observações |
| :--- | :--- | :--- |
| **Node.js** | `v24.21.0` | ✔ Ativo e compatível (`>=24.0.0`) |
| **Chromium** | `C:/Program Files/Google/Chrome/Application/chrome.exe` | ✔ Detectado e utilizado para Playwright e Remotion |
| **Remotion** | `4.0.535` | ✔ Instalado no workspace isolado `marketing/` |
| **FFmpeg** | `v7.1` (embutido no `@remotion/compositor-win32-x64-msvc`) | ✔ 100% funcional sem necessidade de instalação externa |
| **Site Principal** | GitHub Pages (`www.resibulando.online`) | ✔ **Intocado** (execução 100% local em ambiente isolado) |

---

## 2. Testes de Captura Automática da Interface Real (Playwright)

* **Cenário Testado:** `Study Rats` (aba Amigos / `amigos.html`).
* **Segurança de Dados:** Injeção de backend fictício (`marketing/capture/fixtures/supabase-marketing.js`) substituindo `/assets/js/supabase.js`.
  * Requisições externas para `supabase.co` foram **bloqueadas por software**.
  * Todos os usuários (Ana, Bruno, Caio, Duda) e a usuária ativa ("Você") são sintéticos.
  * Zero acesso ou exposição de dados reais de alunos da TRAUBE.
* **Resultados da Gravação:**
  * Resolução capturada: 390 × 844 @ 2x DPR (780 × 1688 físico).
  * Duração da cena gravada: 33.7 segundos (1.013 quadros screencast).
  * Ações registradas: abertura suave, avanço dos ratinhos no circuito, abertura do customizador, troca de variante (Tigrado) e acessório (Coroa), criação de desafio ("Maratona de Pediatria") e largada.
  * Arquivos gerados em `marketing/public/captures/study-rats/`:
    * `mobile.mp4` (2.9 MB, H.264 CFR)
    * `mobile-intro.png`, `mobile-race.png`, `mobile-customize.png`, `mobile-new-race.png`

---

## 3. Testes de Renderização e Montagem de Reels (Remotion)

* **Composição:** `ReelStudyRats`
* **Especificações do Vídeo Final:**
  * Arquivo: `marketing/dist/reels/reelstudyrats.mp4`
  * Tamanho: **8.45 MB**
  * Resolução: **1080 × 1920** (proporção 9:16 vertical)
  * Duração: **30.016 segundos** (900 quadros @ 30.0 fps)
  * Codec de Vídeo: **H.264 (High Profile, YUV420p, CRF 16)**
  * Codec de Áudio: **AAC 48.000 Hz estéreo (192 kbps)**
  * Áudio: Trilha sonora ambiente médica sintetizada em código (`marketing/public/audio/traube-ambient-focus-30s.mp3`), livre para uso comercial (CC0).
  * Legendas: 5 cartões dinâmicos com tipografia Inter, palavras-chave em azul ciano, posicionados acima da barra de navegação do Instagram.
* **Capa Oficial:**
  * Arquivo: `marketing/dist/covers/reelstudyrats-cover.png`
  * Dimensões: **1080 × 1920**
  * Zona de Segurança: Elementos principais centralizados para o corte 1:1 do feed de perfil do Instagram (1080 × 1080).

---

## 4. Testes do Calendário Editorial e Integridade Científica

* **Arquivo de Dados:** `marketing/calendar/calendar.json`
* **Testes de Validação (`calendar/validate.cjs`):**
  * ✔ Zero duplicatas de tema ou conflitos de data.
  * ✔ Todas as postagens clínicas possuem citações científicas formais (Surviving Sepsis Campaign 2021, AHA/ASA Stroke 2019, DAWN Trial, Bandura 1986).
  * ✔ Nenhuma estatística foi inventada.
  * ✔ Todas as hashtags são precedidas por `#` e respeitam os limites do algoritmo do Instagram.

---

## 5. Testes do Conector Metricool MCP

* **Conectividade:**
  * Teste HTTP com `https://ai.metricool.com/mcp` retornou `401 Unauthorized`, confirmando endpoint ativo com proteção OAuth 2.1 e cabeçalhos de discovery válidos (`.well-known/oauth-protected-resource`).
* **Travas de Segurança Aplicadas:**
  * ✔ `safeMode: true` impede publicação direta sem autorização.
  * ✔ `isDraft: true` força criação de postagens como rascunhos.
  * ✔ Rejeição de URLs locais (exige URLs HTTP/HTTPS públicas).
  * ✔ Prevenção de duplicatas via hash SHA-256 de texto + data.
  * ✔ **Resultado:** Nenhum post real foi enviado ou agendado no Instagram do cliente durante os testes.

---

## 6. Resultado da Suíte de Testes Automatizados

Execução via `npm test` (`node --test tests/*.test.cjs`):
```text
✔ Calendário editorial: validação estrutural e anti-duplicação
✔ Calendário editorial: conteúdos clínicos possuem fontes científicas comprovadas
✔ Metricool: modo seguro bloqueia publicação direta sem rascunho
✔ Metricool: rejeita mídias com caminhos locais não-HTTP
✔ Metricool: gera payload de rascunho compatível com Instagram Reels em modo offline
✔ Arquivos de saída da entrega obrigatória existem e estão íntegros
✔ Especificações técnicas do Reel: 1080x1920, 30s, H.264 e AAC
ℹ tests 7 | pass 7 | fail 0 | cancelled 0
```

---

## 7. Apuração de Custos Operacionais

| Recurso / Ferramenta | Custo Apurado |
| :--- | :--- |
| Captura Playwright | $0,00 (execução local) |
| Renderização Remotion | $0,00 (execução local) |
| FFmpeg / Áudio Sintético | $0,00 (código aberto / local) |
| Google Flow (prompts semiautomáticos) | $0,00 (interface interativa) |
| Metricool MCP (modo seguro / rascunho) | $0,00 (sem taxas de API) |
| **CUSTO TOTAL DESTA ETAPA** | **$0,00** |
