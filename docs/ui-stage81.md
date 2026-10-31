# Etapa 8.1 — módulos de estudo

Data: 12/10/2026. Alterações locais, sem commit, push, merge ou deploy.

## Problemas, causas e resultados

| Problema | Causa e correção | Status | Evidência / pendência |
| --- | --- | --- | --- |
| Editor de Anotações espalhado e ferramentas distantes | Trilhas antigas do grid separavam estrutura, conteúdo e ações. Os mesmos nós e listeners foram reunidos em um painel direito com rolagem interna e ferramentas sticky. No mobile, ações recolhíveis e barra junto ao editor. | Corrigido e validado | Anotação de 30 parágrafos; desktop/mobile; escrita, negrito em parágrafo, salvar, recarregar e voltar. |
| Menus de Anotações cortados/sobrepostos | Âncoras e z-index de todos os grupos competiam; a paleta tinha células maiores que sua distribuição. Limites calculados pelo espaço disponível, abertura acima quando necessária, grupo aberto acima dos demais e paleta de quatro colunas. | Corrigido e validado | Paleta mobile sem ícones sobrepostos; menu Mais dentro do painel desktop; controles originais preservados. |
| Cards da biblioteca de Questões/Simulados | Faltava fechar o contêiner superior no template: o conteúdo entrava na linha flex de ferramentas. Corrigido o HTML gerado, grid fluido, títulos, estatísticas e áreas de interação. | Corrigido e validado | Quatro conjuntos sintéticos, título longo, seleção e menu; teste confirma cabeçalho/conteúdo como irmãos. |
| Numeração e navegador da resolução | Células de 24 px e regra mobile que ocultava todo o painel. Células de pelo menos 44 px, grid fluido, painel abaixo da questão no mobile, labels de estado e questão atual. | Corrigido e validado | 18 questões numeradas; salto à questão 2; correto/pendente; desktop/mobile sem overflow da página. |
| Comentário TRAUBE travando após responder | Dois observers competiam: o shell inseria ações relacionadas e o resolvedor as removia, gerando ciclo de mutações. Substituída a remoção contínua por opt-out explícito respeitado pelo shell; observer de aprimoramento montado apenas uma vez. | Corrigido e validado | Abrir/fechar após resposta, oculto antes de confirmar; Chromium e regressões de respostas, histórico e concorrência. Conteúdo externo/IA não validado. |
| Hall/biblioteca/menus de Flashcards | Cards fixos em faixa horizontal, ícones com cor inadequada e controles comprimidos no mobile. Biblioteca em grid, hall mantém o carrossel existente, ações de 44 px, menus contidos e filtros empilhados. | Corrigido e validado | 14 decks, título longo, menu, filtro, avanço do carrossel; revisão aberta/encerrada; edição salva e recuperada no backend sintético. |
| Uploads de frente e verso | Dimensões herdadas do input e do botão nativo não coincidiam. Padronizados padding, fonte e botão de seleção, preservando inputs e processamento. | Corrigido e validado | Dois arquivos `ui81.png` selecionados; ambos com 53,5 px de altura e 314,4 px de largura no mobile; nome visível; desktop também conferido. Upload remoto não testado. |
| Botões indevidos em Fazer Flashcards | Não apareceram ações alheias à criação nas telas conferidas. | Não reproduzido | Mantidos os controles legítimos. Nenhuma ação removida por suposição. |
| Memória por matéria e gráficos | `table-layout:fixed`, colunas percentuais e quebra arbitrária comprimiam palavras; regras posicionais antigas do grid venciam as regras dos cards atuais. Removidos esses conflitos somente de Flashcards, tabela com largura mínima e rolagem interna, distribuição por cards existentes. | Corrigido e validado | 15 linhas; desktop 1052 px; mobile container 314 px/tabela 898 px, scroll interno até 583 px, sem overflow da página. Cabeçalhos legíveis. |
| Caderno de Erros: biblioteca, ações e edição | Grids rígidos, botões comprimidos e retorno da biblioteca sem wrap. Além disso, `dialog[open] {overflow:visible!important}` deixava o rodapé de edição fora da tela. Layouts locais fluidos e overflow corrigido especificamente no diálogo de edição. | Corrigido e validado | Estados vazio/preenchido, biblioteca, visualização e edição; alteração de tema do erro salva e recuperada no backend sintético. |
| Criar novo em modal | A criação era uma seção da página. Um diálogo nativo reutiliza o formulário, campos e salvamento originais; Escape/Fechar preservam rascunho e restauram foco; fechamento bloqueado durante envio. A abertura por `?tab=create` ocorre após a inicialização da biblioteca. | Corrigido e validado | Desktop/mobile, rolagem interna até Salvar, sucesso/erro, um único formulário, rascunho, foco, fechamento atrasado e link direto. |
| Retornos entre telas | Flashcards não tinha retorno claro nas seções internas; retorno da revisão de Erros era inserido na topbar compartilhada e comprimido no mobile. Adicionado retorno interno sem limpar campos; retorno de Erros movido para o conteúdo com destino explícito. Removido retorno duplicado do painel de Anotações. | Corrigido e validado | Biblioteca/criação de Flashcards preservam rascunho; controle adicional oculto durante revisão ativa; revisão de Erros volta ao módulo; Anotações volta à biblioteca. |

## Validação visual

Chromium: **1440 × 900** e **390 × 844**. Ambiente local isolado com SDK/RPCs sintéticos e bloqueio de acesso ao Supabase real. Verificados menus abertos/fechados, títulos longos, formulários, arquivos selecionados, criação/edição/revisão e retornos. Não foram observados erros de console ou violações CSP inesperadas nos fluxos conferidos.

Combinações verificadas: claro azul (bibliotecas, editor e estatísticas), claro rosa (resolução mobile, editor e modal), escuro azul (editor longo, biblioteca/edição de Flashcards, uploads e modal mobile), escuro rosa (modal e tabela mobile). Isso é cobertura dirigida, não uma matriz exaustiva de todos os controles em todos os temas.

Evidência desktop: [tabela e distribuição dos cards](ui-stage81-desktop.png).

## Testes executados

- `node --test --test-isolation=none tests/ui-stage81.test.cjs tests/stage77-questions.test.cjs tests/flashcard-metrics-import.test.cjs`: **44 aprovados** (11 novos, 23 regressões de Questões, 10 métricas/importação).
- `node --test --test-isolation=none --test-name-pattern='Caderno has|Review-only answer|Flashcard creation/import' tests/stage77-functional.test.cjs`: **3 aprovados**.
- **47 testes distintos aprovados**, nenhuma falha final. Execução sem isolamento de processo para contornar `spawn EPERM` do sandbox; não foi necessário instalar dependências.
- Sintaxe dos cinco JS externos modificados e do script inline do resolvedor: **6 scripts válidos**. HTML inspecionado pelo DOM e testes dos contêineres/controles relevantes.
- `node scripts/sync-csp.cjs`: **96 páginas consistentes**; hash do resolvedor atualizado pelo gerador existente. Avisos de parsing CSS do jsdom no gerador não são violações do Chromium.
- `git diff --check` e revisão do diff. Não executada suíte clínica, PWA, Edge Functions ou validação integrada completa.

## Arquivos modificados

- `assets/css/education-ui-v2.css` — correções delimitadas por página para Anotações, Questões e Erros.
- `assets/css/flashcards-ui-v2.css` — cards, filtros, menus, uploads e contraste dos títulos dos modais.
- `assets/css/estatisticas.css` — somente regras do painel de Flashcards.
- `assets/js/caderno-notion-editor-fix.js` — composição do painel com os mesmos nós e posicionamento dos menus; integração Notion inalterada.
- `assets/js/questoes-simulados.js` — fechamento do contêiner do card.
- `assets/js/luria-command-center.js` — opt-out e montagem única dos aprimoramentos do comentário.
- `assets/js/flashcards-ui-v2.js` — retorno usando o controlador existente.
- `assets/js/caderno-erros.js` — diálogo da criação usando o formulário existente.
- `resolver-questoes/index.html` — navegador mobile, acessibilidade, comentário e hash CSP.
- `caderno-erros/revisao/index.html` — retorno fora da topbar.
- `tests/ui-stage81.test.cjs`, este relatório e `docs/ui-stage81-desktop.png`.

Os `!important` locais respondem à precedência já existente das camadas e regras legadas; não foram alteradas regras globais de outras páginas. Não foram modificados algoritmos, contratos, autenticação, sanitização, persistência remota ou políticas de segurança.

## Pendências e limites

- **Pendente:** em verificação adicional do editor, retirar negrito de um heading produziu `font-weight:normal` inline, descartado ao recuperar a anotação pela sanitização existente. O negrito estrutural de um parágrafo foi salvo e recuperado. Esse comportamento não foi corrigido: a etapa proíbe alterar sanitização; requer tratamento seguro específico em rodada posterior.
- Notion real, serviços de IA, storage/upload remoto, backend real e arquivo Anki no navegador não foram verificados ponta a ponta. A regressão automatizada existente de importação sanitizada passou; seu mock não comprova funcionamento em produção.
- Sem pendência visual identificada nos layouts e menus corrigidos durante a cobertura descrita. Não se afirma equivalência em todos os dispositivos ou fluxos externos.
- Configurações/Perfil do primeiro print e os demais módulos excluídos continuam reservados às próximas etapas.
