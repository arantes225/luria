# Etapa 8.3 — LuriaZap

Modernização em `plantao/luriazap/index.html` e `assets/css/luriazap-ui-v2.css`. Reutiliza fundações, temas e navegação v2 existentes. A camada local substitui os locks do telefone legado sem modificar o CSS compartilhado do Plantão. A pedido do usuário, `assets/js/app.js` recebeu apenas a entrada independente LuriaZap na navegação de Estudos e a distinção de seu estado ativo. O botão “Voltar ao Simulador” foi removido. A rota existente e a exigência de acesso à feature `plantao` foram preservadas.

Cabeçalho, cards de conversas, busca, ações, avatares, mensagens, trilha existente, respostas, composição e estados vazios usam tokens semânticos. A moldura decorativa do aparelho foi retirada da apresentação. Cards em duas colunas no desktop e uma no mobile; textos longos quebram sem truncamento. Busca e nova conversa têm alvos de 44 × 44 px no mobile.

Verificações locais:

- Chromium: 1440 × 900 e 390 × 844; claro/escuro × azul/rosa. Lista, pesquisa com e sem resultados, conversa, resposta guiada/conclusão, envio livre, retorno, nova conversa, retomada após recarregar e menu mobile. Sem rolagem horizontal indevida nos estados conferidos.
- Console do LuriaZap sem erros ou avisos nos fluxos testados. Navegação de retorno conferida até `/plantao/sala-emergencia/`; não houve execução de casos clínicos.
- `tests/ui-final-refinement.test.cjs`: 2 testes aprovados, incluindo a navegação compartilhada. `tests/luriazap-navigation.test.cjs`: mais 2 testes aprovados para seleção independente, navegação de Estudos/Trabalho e preservação do bloqueio de acesso. `node --check assets/js/app.js` aprovado.
- Verificação direcionada: CSP e hashes originais preservados, scripts inline idênticos e sintaticamente válidos, IDs únicos e IDs originais preservados, ordem relativa dos scripts originais mantida, recursos diretos locais existentes e um H1.
- Diff revisado; `git diff --check` sem erros. Código JavaScript das conversas, backend, CSP e Service Worker preservados. A única mudança JavaScript é a navegação solicitada. O listener inline original possui guarda para o botão ausente e foi mantido para preservar os hashes aprovados.

Limitações e pendências:

- Navegador usou backend sintético em origem local isolada. Integrações, permissões e persistência remotas não foram certificadas.
- “Nova conversa” já é uma tela preparatória, com envio desabilitado; sua integração com IA permanece fora do escopo.
- No caso guiado sintético, enviar mensagem livre antes de selecionar uma opção avançou o turno e deixou as opções anteriores sem ação. O comportamento decorre do fluxo JavaScript existente e não foi alterado nesta modernização visual; requer investigação funcional separada.
- Nenhuma pendência visual identificada nas telas e larguras conferidas.

Evidências: `ui-stage83-desktop.png` e `ui-stage83-mobile.png` (dados sintéticos).
