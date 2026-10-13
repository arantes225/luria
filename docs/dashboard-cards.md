# Dashboard — Clássica e Cards

Implementação local de 12/10/2026. Seleção exclusiva em Configurações → Personalizar → Layout do dashboard.

- Duas opções: Clássica (visão geral existente) e Cards (central de aplicativos).
- Removidos o seletor no topo e os renderizadores antigos 2, 3, 4 e 5. A função `layout1` é idêntica à de HEAD; componentes compartilhados, dados e controladores existentes foram preservados. O CSS compartilhado e imagens antigas não foram excluídos.
- Cards reutilizados em quatro seções: Estudar e revisar (6), Praticar e consolidar (4), Simulação e desempenho (3), Comunidade (1). Ícones coloridos preservados. Três colunas em desktop, duas intermediárias, uma no mobile.
- Prévias esquemáticas nas Configurações, dimensões iguais, indicação de seleção e foco por teclado.

## Preferência e migração

Um único controlador `dashboard-preferences.js` usa `LuriaLocalOwnerStore` e a chave existente `luria:dashboard-layout:<conta>`. Valores canônicos: `classic` e `cards`. Valores numéricos antigos (1–5) ou inválidos são normalizados para `classic`, preservando a antiga Opção 1. O número 2 antigo não ativa a nova Cards. Sem preferência ou com storage indisponível, Clássica é o fallback. A escolha temporária `luria:dashboard-view:v1:<conta>` é retirada e não participa da seleção. Preferências de guest não são importadas nem gravadas. Falhas de gravação deixam a seleção anterior e exibem mensagem. Eventos de conta, storage e pageshow atualizam a seleção.

## Arquivos

- `dashboard/index.html`, `configuracoes/index.html`.
- `assets/css/dashboard-cards.css`.
- `assets/js/dashboard-cards.js`, `dashboard-preferences.js`, `dashboard-layout-settings.js`, `dashboard-layouts.js`.
- `tests/dashboard-cards.test.cjs`.
- Este relatório e `dashboard-cards-desktop.png`, `dashboard-cards-mobile.png`.

## Verificação

- Oito testes novos aprovados: duas opções, preservação de DOM/dados/listeners, persistência/reload, isolamento por conta, storage events, migração de valores 1–5/inválidos, falha de storage, regras de acesso, 14 rotas/categorias, CSP preservada e renderizador Clássico real.
- `node --test --test-isolation=none tests/dashboard-cards.test.cjs tests/dashboard-ui.test.cjs`: 23 aprovados, uma falha preexistente no teste genérico de CSS (`html body[data-page="trabalho_bulario"] .drug-list`). Arquivo do Trabalho não modificado. Oito testes novos reexecutados após o último ajuste de pageshow: 8/8.
- Sintaxe dos quatro JS alterados e dos scripts inline das duas páginas conferida. Git diff e diff --check revisados. Não há IDs novos duplicados. Configurações já continha o ID duplicado `restart-luria-onboarding`; sem relação com o seletor, preservado fora deste escopo.
- Chromium local: desktop 1440×900 e mobile 390×844; quatro temas na Dashboard, seletor claro/escuro, dimensões consistentes, ausência de overflow horizontal, seleção nativa por teclado e foco visível. Clássica abre seus componentes reais; Cards permanece após recarregar e navegar. Os 14 links foram clicados e seus destinos conferidos.
- Console da Dashboard e Configurações sem erros/avisos nos fluxos registrados.

## Limitações

Navegador usou o harness local com backend sintético e usuário administrativo, sem dados ou chamadas remotas de produção. Restrições de acesso também foram testadas com entitlements sintéticos não administrativos. Isso valida a navegação e a apresentação locais, sem afirmar aprovação de integrações ou autenticação de produção. Nenhum commit, push, merge, deploy ou mudança remota foi realizado.
