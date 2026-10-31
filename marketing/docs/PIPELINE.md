# TRAUBE MARKETING STUDIO — MANUAL COMPLETO DO PIPELINE

Sistema automatizado de produção de conteúdo (Instagram Reels e carrosséis) para a plataforma médica **TRAUBE**, operando 100% em ambiente local, sem alterar o site em produção e sem custos de API.

---

## 1. Estrutura de Diretórios (`marketing/`)

```text
marketing/
├── automation/               # Rotinas recorrentes e automação de ponta a ponta
│   └── weekly.cjs            # Ciclo semanal completo: validação, render e relatório
├── calendar/                 # Calendário editorial e controle de qualidade
│   ├── calendar.json         # Base oficial de temas, roteiros, datas e fontes
│   ├── import.cjs            # Importador e mesclador de pautas externas
│   ├── status.cjs            # Visualizador de status e diversidade temática
│   └── validate.cjs          # Validador de fontes médicas e anti-duplicação
├── capture/                  # Gravação automática da interface real
│   ├── fixtures/             # Mock do Supabase e dados sintéticos
│   │   └── supabase-marketing.js
│   ├── lib/                  # Infraestrutura de gravação
│   │   ├── director.cjs      # Toques visíveis, cursor e rolagem suave
│   │   ├── recorder.cjs      # Screencast de alta qualidade via CDP + FFmpeg
│   │   └── site.cjs          # Roteamento seguro e bloqueio de rede externa
│   ├── scenes/               # Roteiros de navegação por funcionalidade
│   │   └── study-rats.cjs    # Cena gravada do Study Rats (Aba Amigos)
│   └── run.cjs               # CLI de captura (mobile e desktop)
├── dist/                     # Arquivos finais gerados (prontos para publicação)
│   ├── covers/               # Capas dos Reels (1080x1920 e corte feed 1:1)
│   ├── preview/              # Quadros de inspeção
│   ├── reels/                # Vídeos finais em MP4 (1080x1920, 30s, 30fps)
│   └── reports/              # Relatórios executivos semanais
├── docs/                     # Documentação técnica e operacional
│   ├── FLOW_GUIDE.md         # Guia do Google Flow e geração de clipes
│   ├── METRICOOL.md          # Especificação e testes do MCP oficial Metricool
│   ├── PIPELINE.md           # Este manual
│   └── RELATORIO_TESTES.md   # Relatório de conformidade e testes
├── flow/                     # Integração com Google Flow (cenas generativas)
│   ├── clips/                # Pasta de entrada para clipes MP4 baixados
│   ├── prompts/              # Prompts cinematográficos prontos para copiar
│   │   ├── study-rats-flow.md
│   │   └── sepse-emergencia-flow.md
│   ├── build-prompts.cjs     # CLI para gerar novos prompts de casos clínicos
│   ├── import-clips.cjs      # Validador e indexador de clipes baixados
│   └── manifest.json         # Índice de clipes disponíveis para o Remotion
├── logs/                     # Registro de auditoria, custos e execuções
│   └── runs.jsonl            # Log append-only de cada execução
├── metricool/                # Integração oficial Metricool MCP
│   ├── check.cjs             # Diagnóstico de conexão e autenticação
│   ├── client.cjs            # Cliente MCP com trava de segurança e rascunhos
│   ├── config.json           # Configurações de modo seguro
│   └── plan.cjs              # Inspeciona rascunhos e previne duplicatas
├── public/                   # Assets públicos consumidos pelo Remotion
│   ├── assets/logos/         # Logomarcas oficiais da TRAUBE
│   ├── audio/                # Trilha sonora ambiente médica sintetizada
│   └── captures/             # Gravações de tela brutas em MP4
├── remotion/                 # Estúdio de montagem de vídeo em React/TypeScript
│   ├── components/           # Componentes reutilizáveis
│   │   ├── Background.tsx    # Fundo médico com grid sutil e gradiente
│   │   ├── BrandHeader.tsx   # Logo oficial, badge e categoria
│   │   ├── OutroCard.tsx     # Card final com CTA e resibulando.online
│   │   ├── PhoneMockup.tsx   # Smartphone com contorno azul TRAUBE e tela real
│   │   ├── ProgressBar.tsx   # Barra de progresso superior do Reel
│   │   └── Subtitles.tsx     # Legendas dinâmicas no terço inferior seguro
│   ├── compositions/         # Composições de 30 segundos
│   │   ├── ReelCover.tsx     # Capa estática
│   │   └── ReelStudyRats.tsx # Reel de 30s do Study Rats
│   ├── index.tsx             # Root Remotion
│   └── theme.ts              # Paleta de cores oficial (#184888, Inter, etc.)
├── scripts/                  # Scripts utilitários de suporte
│   ├── doctor.cjs            # Diagnóstico de dependências e binários
│   ├── generate-music.cjs    # Síntese matemática da trilha sonora royalty-free
│   ├── render.cjs            # CLI de renderização de vídeos e capas
│   └── lib/common.cjs        # Utilitários compartilhados
├── tests/                    # Suíte de testes automatizados
│   ├── calendar.test.cjs
│   ├── metricool.test.cjs
│   └── render.test.cjs
└── package.json              # Dependências isoladas da pipeline
```

---

## 2. Comandos Principais (`npm run ...`)

Execute os comandos a partir da pasta `marketing/`:

| Comando | Descrição |
| :--- | :--- |
| `npm run doctor` | Verifica a integridade da stack, binários FFmpeg e navegador. |
| `npm run capture` | Grava automaticamente a interface real da TRAUBE com dados fictícios. |
| `npm run capture:list` | Lista todos os cenários de captura disponíveis. |
| `npm run music` | Sintetiza a trilha sonora ambiente oficial de 30s (livre de royalties). |
| `npm run render` | Renderiza o Reel MP4 (1080x1920, 30s) e a Capa com o Remotion. |
| `npm run studio` | Abre o editor visual interativo do Remotion no navegador. |
| `npm run calendar:status`| Exibe a programação de posts, status e fontes científicas. |
| `npm run calendar:validate` | Audita fontes médicas, limites de hashtags e anti-duplicação. |
| `npm run flow:prompts` | Gera e lista prompts cinematográficos para o Google Flow. |
| `npm run flow:import` | Inspeciona e incorpora clipes baixados do Flow à montagem. |
| `npm run metricool:check` | Testa conectividade e autenticação com o MCP oficial Metricool. |
| `npm run metricool:plan` | Exibe prévia dos rascunhos que seriam agendados no Metricool. |
| `npm run weekly` | Executa o ciclo semanal completo de produção e gera relatório executivo. |
| `npm test` | Executa a suíte de testes automatizados com Node test runner. |

---

## 3. Fluxo de Trabalho Passo a Passo

### Passo 1: Criar ou Ajustar Pautas no Calendário
Edite `calendar/calendar.json` adicionando temas, roteiros, datas e referências bibliográficas obrigatórias. Execute `npm run calendar:validate` para garantir integridade.

### Passo 2: Gravar Telas da Interface Real
Para gravar um cenário:
```powershell
node capture/run.cjs --scene study-rats --format mobile
```
O sistema sobe o site em ambiente isolado, injeta dados fictícios, simula ações e salva o vídeo em `public/captures/<cena>/mobile.mp4`.

### Passo 3: Montar e Renderizar o Reel
```powershell
node scripts/render.cjs --composition ReelStudyRats --cover
```
O Remotion gera o vídeo final em `dist/reels/reelstudyrats.mp4` e a capa em `dist/covers/reelstudyrats-cover.png`.

### Passo 4: Integração com Google Flow (Opcional)
Se o roteiro exigir cenas generativas contextuais, consulte `flow/prompts/`, gere no Flow e salve em `flow/clips/<tema>/`. Execute `npm run flow:import` para que o Remotion inclua o clipe automaticamente.

### Passo 5: Aprovação Humana e Agendamento no Metricool
Nenhuma publicação é disparada sem aprovação. Quando o responsável aprovar:
1. Altere `"approved": true` no `calendar/calendar.json`.
2. Execute `node metricool/plan.cjs` para validar a prévia dos rascunhos.
3. Configure as credenciais oficiais no ambiente e envie como rascunho.

---

## 4. Diretrizes de Segurança, Privacidade e Custos

1. **Zero Dados Reais de Alunos:** Toda gravação ocorre em sandbox local com fixtures sintéticos. Nomes e estatísticas são fictícios.
2. **Site em Produção Protegido:** Nenhuma alteração é enviada para produção ou para a branch `main`. O trabalho reside na branch `marketing/studio-pipeline`.
3. **Custo $0,00:** Todas as ferramentas utilizadas (Playwright, Remotion local, síntese de áudio harmônica, Google Flow interativo) operam sem consumo de APIs pagas.
