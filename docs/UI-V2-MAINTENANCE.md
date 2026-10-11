# Manutenção do frontend v2

Os estilos continuam opt-in. A landing page da raiz não importa os recursos v2.

| Responsabilidade | Arquivos |
| --- | --- |
| Paletas, tokens, superfícies do shell e aliases legados | `ui-v2-foundations.css` |
| Navegação, contêiner principal, menus e scrollbar | `ui-navigation-v2.css` |
| Componentes e páginas de Estudos | `dashboard-ui-v2.css`, `education-ui-v2.css`, `education-pages-v2.css`, `flashcards-ui-v2.css`, `community-ui-v2.css` |
| Componentes e ferramentas de Trabalho | `work-ui-v2.css` |
| Administração | `admin-ui-v2.css` |
| Controles clínicos isolados | `pcr-ui-v2.css`, `plantao-ui-v2.css` |

- Carregar a fundação antes dos consumidores. No PCR, manter `pcr-ui-v2.css` antes de `work-ui-v2.css`: a prioridade das declarações importantes em camadas é inversa à das declarações normais.
- As camadas importantes são uma ponte para os locks legados, inclusive CSS injetado por JavaScript. Corrigir a regra responsável dentro do escopo existente; não acrescentar uma cadeia de sobrescritas.
- Reutilizar tokens semânticos, incluindo `--ui-control`, preservando variantes clínicas maiores. Não uniformizar controles com necessidades diferentes.
- Consultar HTML, JavaScript e templates antes de remover seletores. Cards de Scores, menus e métricas são gerados dinamicamente.
- O fundo do documento usa `--color-background`; sidebar, topbar e `.app-shell` usam a superfície tingida. Isso preserva o shell e evita cores `color()` incompatíveis com o renderizador de PDF do Passômetro.
- Validar componentes afetados em claro/escuro e azul/rosa, nas larguras 320, 390, 768 e 1440 px. Usar dados sintéticos; não enviar dados clínicos ou alterar permissões para testar o layout.

Regressão direcionada: `node --test --test-isolation=none tests/dashboard-ui.test.cjs tests/ui-final-refinement.test.cjs tests/ui-stage22.test.cjs tests/passometro-html.test.cjs`.

A revisão visual não certifica cálculos clínicos, integrações reais ou conformidade integral com WCAG.

Nesta etapa, foram revisadas telas principais e fluxos representativos com dados sintéticos. A sessão real do Passômetro em `localhost:5500` exige login; sua verificação funcional ocorreu no servidor isolado. Integrações e validações clínicas completas permanecem fora desta execução. Os estilos legados ainda usados por páginas e componentes dinâmicos foram preservados; a ponte de camadas continua necessária.
