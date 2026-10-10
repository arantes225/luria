# Luria — Etapa 1: Design System e Dashboard

Implementação local em `ui-ux-redesign`, sobre `5cc7d37e`. Sem commit, push ou deploy.

## Entrega e arquivos

- Modificados: `dashboard/index.html` (canônico) e `dashboard.html` (espelho legado, conforme `dashboard-map.md`).
- Criados: `assets/css/ui-v2-foundations.css`, `assets/css/dashboard-ui-v2.css`, `assets/js/dashboard-ui-v2.js`.
- Criados: `assets/fonts/inter/InterVariable.woff2`, licença OFL em `assets/fonts/inter/LICENSE.txt`, `tests/dashboard-ui.test.cjs` e este relatório.
- Recursos novos carregados exclusivamente nas duas entradas do Dashboard. Estilos opt-in por `data-ui="v2"`; adaptador também exige `data-page="dashboard"`.

## Fundações e compatibilidade

Tokens semânticos de fundo, superfícies, texto, identidade, bordas interativas, foco, sucesso, informação, atenção, erro e desabilitado. Espaçamento em 4/8/12/16/24/32/48 px; controles de 44 px; raios 8/12/16 px; sidebar 264 px; conteúdo máximo 1280 px. Escala tipográfica responsiva com métricas tabulares.

Inter variável hospedada localmente, com nome exclusivo `Luria Inter`: não substitui fontes já usadas em páginas protegidas. Paletas derivadas das referências aprovadas; botões claros usam texto escuro no tema escuro. Seleção usa borda e `aria-pressed`, além da cor; mensagens apresentam texto explícito.

Dois atributos independentes no body: `data-ui-appearance="light|dark"` e `data-ui-identity="blue|pink"`. Um conjunto de estilos produz as quatro combinações. Os dois controles locais substituem a apresentação do seletor de tema no perfil somente no Dashboard.

Preferência visual em `luria:dashboard-ui:v2`, via API existente `LuriaLocalOwnerStore`, isolada por conta/dispositivo. Ausência de preferência mantém a correspondência do tema legado: claro→claro/azul, escuro→escuro/azul, Leila Mood/rosa→claro/rosa. Preferências legadas não são sobrescritas; `html[data-theme]` não é modificado pelo adaptador. Não há escrita em Supabase. Falha de armazenamento informa que o tema foi aplicado sem ser salvo.

As numerosas regras legadas com `!important` exigem especificidade local elevada; a repetição do ID nos seletores funciona como ponte de compatibilidade. Essa dívida fica confinada ao CSS do piloto; os arquivos compartilhados permanecem intactos.

## Dashboard

Cabeçalho compacto, ação de estudo antes das métricas, agenda em seguida, revisões com dados já existentes, progresso e indicadores complementares. Mantidos os layouts selecionáveis atuais (1, 2, 3 e 5), links, escolhas de duração e controladores existentes. Novos estados de espera/erro não inventam valores; revisão indisponível usa “—”, zero informado permanece zero.

Cards e botões com tokens, títulos coerentes, barras de progresso nomeadas, textos sem truncamento necessário, mascote existente preservado. Scroll natural e colunas adaptativas. Menu móvel com isolamento do fundo, ciclo de foco e Escape; skip link, foco visível e retorno de foco nos diálogos existentes de estudo/busca. Timer recebeu apenas cores herdadas de apresentação local; lógica e persistência não foram alteradas.

## Validação executada

Ambiente HTTP local com fixture de usuário e dados sintéticos, conexões externas/Service Worker bloqueados. Nenhum teste foi feito contra dados ou banco de produção.

| Verificação | Resultado |
|---|---|
| `npm run check` | 176 blocos JS/CJS: zero erros; prompts estáticos válidos; 44/48 testes aprovados |
| Novos testes `tests/dashboard-ui.test.cjs` | 9/9 aprovados, inclusive após o último ajuste de CSS |
| Layout 1, quatro temas × 1440/1280/1024/768/390/320 px | 24/24 sem overflow; escolhas de duração e tema ≥44 px de altura |
| Layouts 2 e 3, mesma matriz | 48/48 sem overflow horizontal |
| Layout 5, mesma matriz, agenda vazia | 24/24 sem overflow; validação funcional com aula iniciável bloqueada pelo defeito anterior descrito abaixo |
| Texto ampliado a 200% (raiz 32 px), 1280/768/390/320 px | Sem overflow; topbar cresce e conteúdo acompanha sua altura |
| Teclado | Menu móvel, Tab/Shift+Tab/Escape, seleção, abertura/fechamento de perfil e Pomodoro; diálogo de estudo com foco contido e retorno; busca Ctrl+K/consulta/Escape |
| Fluxo de estudo | Iniciar sessão abre `/sessao-estudo/`; retorno exibe “Voltar para a sessão”; troca de tema mantém estado e dados |
| Revisões/renderer | Nó de revisão restaurado após rerender; handlers de estudo preservados; zero distinto de ausência de dados |
| Isolamento | Regras CSS inspecionadas recursivamente; adaptador inativo fora do piloto; entradas protegidas não importam novos recursos |
| Git | `diff --check` sem erros; apenas entradas Dashboard modificadas entre arquivos preexistentes |

Contraste de pares computados, incluindo texto normal visível do Dashboard:

| Tema | Menor contraste de texto medido | Botão principal | Borda interativa/superfície |
|---|---:|---:|---:|
| Claro/azul | 4,69:1 | 6,86:1 | 3,74:1 |
| Claro/rosa | 4,81:1 | 5,78:1 | 4,14:1 |
| Escuro/azul | 5,02:1 | 7,58:1 | 4,07:1 |
| Escuro/rosa | 5,28:1 | 7,45:1 | 4,42:1 |

Estados semânticos e desabilitado também verificados em fixture local; razões medidas ≥4,66:1. Critérios de referência: [WCAG 2.2 — contraste mínimo](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html). Não constitui certificação ou conformidade integral WCAG.

Evidências locais ignoradas pelo Git: `.audit-artifacts/ui-v2/screenshots/` (quatro temas desktop e mobile), `final-responsive.json`, `final-text-enlargement.json`. Essas capturas exibem dados sintéticos.

## Proteção e limites

`index.html`, Simulador de Emergência, Mini-OSCE, LuriaZap, scripts/estilos compartilhados, motores, banco, workflows e Service Worker sem alterações. Nas quatro entradas protegidas, navegação local confirmou ausência de marcador v2 e de import dos novos recursos. Comparação visual de entrada e inspeção de dependências complementam o isolamento; capturas com estados assíncronos diferentes não permitem afirmar equivalência pixel a pixel nem cobertura de todos os fluxos clínicos.

Pendências anteriores, sem correção nesta etapa:

1. `assets/js/dashboard-layouts.js:313` chama `buildAmbientacaoUrl(item)`, que não existe, ao renderizar aula iniciável no layout 5. O helper disponível é `buildStudyStartUrl` em `assets/js/dashboard.js:188`. O render falha e tenta novamente; o novo feedback permite escolher outro layout, mas não corrige o defeito funcional. Exige autorização separada para a lógica afetada. Aceite funcional integral desse layout permanece pendente.
2. Suíte Plantão: `af-unstable-ed` (0 versus 100), `vf-arrest-ed` (57 versus 100), penalidade diagnóstica e teste agregador falham também na linha de base. Mantidos para revisão clínica, conforme decisão anterior do usuário.

Limitações: autenticação/rede reais e produção não exercitadas; PWA/offline e zoom nativo do navegador não validados (foi testada ampliação de texto); sem validação com leitor de tela humano. Controles internos e tipografia compacta do cronômetro ficam para Etapa 3. Cache de clientes instalados não foi invalidado porque alterações no Service Worker estão fora do escopo.

## Próxima etapa

Revisar visualmente o piloto e resolver/autorizar separadamente a pendência funcional do layout 5. Somente após aprovação, expandir tokens/componentes às páginas educacionais da Etapa 2, mantendo opt-in e verificando consumidores de cada página. Não carregar estes estilos globalmente sem essa revisão.
