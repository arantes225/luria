# Navegação inferior mobile — 21/10/2026

## Regra implementada

A orientação posterior do usuário substitui a restrição inicial a PWA: a navegação depende exclusivamente do breakpoint existente de **até 980 px**, dentro do shell autenticado de Estudos/Trabalho. Não depende de standalone, instalação, user agent ou ponteiro/touch.

Acima do breakpoint, a navegação anterior permanece: sidebar em Estudos e o hub/topbar já aprovado em Trabalho (esse ambiente já não mostrava sidebar no desktop). Páginas públicas, administrativas com shell próprio e frames embutidos não recebem uma segunda navegação.

## Destinos e interação

| Ambiente | Atalhos |
| --- | --- |
| Estudos | Início `/dashboard/`; Aulas `/aprender/`; Flashcards `/flashcards/`; Simulador `/plantao/sala-emergencia/`; Mais |
| Trabalho | Início `/trabalho/`; Ferramentas; Prescrição `/trabalho/prescricao/`; PCR `/trabalho/pcr/`; Mais |

Aulas utiliza o hub de aprendizado real. Ferramentas abre o mesmo painel compartilhado, filtrado para ferramentas médicas; não foi criada uma rota fictícia.

Mais é um `dialog` nativo com destinos categorizados, fechamento por botão, Escape, toque no backdrop e seleção de destino. O foco fica no diálogo e volta ao acionador quando fechado. Os links e a disponibilidade reutilizam a sidebar, o perfil e os entitlements existentes; não alteram autorização. Perfil, Configurações e troca de ambiente permanecem acessíveis. O item ativo acompanha a rota/submódulo. O menu lateral mobile anterior fica oculto e inerte enquanto a barra está visível.

## Espaço e experiências internas

- Altura compartilhada: `--ui-bottom-navigation: calc(76px + env(safe-area-inset-bottom, 0px))`; padding inferior correspondente no conteúdo e insets laterais/superior quando disponíveis.
- Barra e painel usam tokens dos quatro temas, alvos de toque confortáveis e foco visível.
- Barra suspensa durante revisão ativa de Flashcards, caso ativo do Simulador, sessão/busca em overlay, fullscreen e teclado virtual detectável pelo visual viewport. Retorna ao sair dessas experiências.
- Frames das salas não criam outra barra; o shell pai continua responsável pela navegação.
- Chat das salas e barra de salvar da Cola Rápida recebem afastamento pela variável comum. O robô considera a altura real da barra para não cobri-la.
- Mantidas as regras mobile anteriores para formulários, cards, menus de perfil e outros controles.

## Arquivos desta entrega

- `assets/js/ui-navigation-v2.js`: evolução do adaptador compartilhado anterior; cinco atalhos, painel, estados, permissões e ciclo de vida.
- `assets/css/ui-app.css`: apresentação e reservas de espaço da navegação; removidos overrides antigos conflitantes da barra/drawer.
- `assets/js/professor-alex-companion.mjs`: limite inferior considera a navegação e responde à alteração de visibilidade.
- `tests/mobile-bottom-navigation.test.cjs`: seis testes de comportamento do novo componente.
- `tests/work-hub.test.cjs`: expectativas do mobile atualizadas; testes desktop e controles clínicos preservados.
- `tests/alex-companion-theme.test.cjs`: regressão do posicionamento do robô com/sem barra.
- Este relatório.

O checkout já continha alterações de botões/temas/mascote da solicitação anterior, inclusive nos dois arquivos compartilhados e no teste do companion. Essas alterações foram preservadas; o `git diff` completo inclui esse trabalho anterior.

## Validação

**27 testes direcionados aprovados**, zero falhas entre os testes selecionados:

```sh
node --test --test-isolation=none --test-skip-pattern="dashboard layout choice|all authenticated Work pages share" tests/mobile-bottom-navigation.test.cjs tests/pwa-v2.test.cjs tests/ui-final-refinement.test.cjs tests/professor-alex-startup.test.cjs tests/work-hub.test.cjs tests/social-native-activities-ui.test.cjs tests/alex-companion-theme.test.cjs
```

Também passaram `node --check` nos dois JavaScripts modificados, parsing de `ui-app.css` com a dependência local `css-tree` e `git diff --check`.

Chromium local com backend fictício, sem acesso ao Supabase real:

- Navegador convencional e standalone emulado: mesma barra com cinco itens a 390 × 844.
- Viewports compacta 320 px, intermediária 412 px, tablet 768/980 px, paisagem 844 × 390 e desktop 1440 × 900; sem overflow horizontal da página nos cenários observados.
- Acima de 980 px: sidebar de Estudos reaparece, barra ausente. A viewport solicitada de 981 px foi arredondada pelo browser para 982 px; o limite exato de 981 px também está coberto no teste de comportamento.
- Dashboard, Aulas, Flashcards, biblioteca e caso ativo do Simulador, Dashboard Trabalho, Prescrição e abertura/execução da PCR.
- Navegação pelos atalhos, troca de ambiente nos dois sentidos, retorno do navegador, perfil/Configurações, painel médico e Mais. Escape e foco modal conferidos no Chromium.
- Quatro combinações de tema conferidas na barra de Estudos; tema rosa também conferido em Trabalho. PCR com rolagem e controles finais acessíveis, reserva inferior de 100 px no cenário sem inset.
- Robô acima da barra: 24 px de separação observada. Console sem warnings/erros nos fluxos finais observados.

Capturas locais em `.audit-artifacts/mobile-navigation/`: Estudos rosa escuro, Mais, Trabalho rosa claro e painel de ferramentas.

## Limitações e pendências

- Sem teste em iPhone/Android físico ou PWA realmente instalado. `env(safe-area-inset-*)` está aplicado; notch, indicador de início e comportamento do teclado precisam de confirmação em aparelhos reais.
- Flashcards abriu e manteve o atalho ativo, mas o fixture local não disponibilizou uma sessão de revisão acionável. A suspensão/restauração durante revisão está coberta no teste do adaptador, não em uma revisão real no navegador.
- Chat de sala/Cola Rápida: afastamentos implementados no CSS; a integração das salas está coberta pelos testes relacionados, mas esses afastamentos não foram confirmados em dispositivo físico.
- Dois testes legados ficaram fora da seleção: `dashboard layout choice is not replaced by layout 1 in installed mode` exige uma string de implementação já ausente no HEAD; `all authenticated Work pages share the hub adapter and preserve the public access page` depende de `postcss`, declarado porém ausente nas dependências locais. Não foram instaladas dependências nem alterada a Dashboard para satisfazer esse matcher.
- Testes simulados não validam backend, permissões de produção ou atendimentos clínicos reais. Não foi executada suíte clínica geral.

Sem alterações em CSP, autenticação, contratos Supabase, Service Worker, manifest ou regras clínicas. Sem commit, push, merge ou deploy.
