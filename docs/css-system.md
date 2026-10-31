# Base visual do TRAUBE

Todas as páginas da aplicação carregam **`assets/css/ui-app.css` uma única vez,
antes dos estilos de página**. Isso declara a ordem das layers antes que algum
módulo crie uma delas. A landing page, login e acesso público ao prontuário
mantêm seus layouts próprios.

## Responsabilidades

| Arquivo | Responsabilidade |
| --- | --- |
| `ui-app.css` | Base única: layers, fonte, paletas, tokens, navegação, shell, controles e safe area |
| CSS de cada módulo | Grades internas, componentes específicos e estados de conteúdo |

## Como manter uniforme

- Não adicionar links separados para foundations/navigation/work-navigation.
  Essas regras já estão reunidas no entry point; não recriar os arquivos separados.
- Não definir dimensões, posição, margem, padding ou rolagem de `.app-shell`,
  `.main`, `.topbar`, `#sidebar` ou da `.main > .page` no CSS de uma página.
  Alterações comuns pertencem a `ui-navigation-v2.css`.
- Usar os tokens `--color-*`, `--ui-*` para novas cores e dimensões.
  Os aliases antigos (`--accent`, `--bg`, `--text` etc.) são ligados aos mesmos
  tokens em uma layer própria, evitando que locks antigos mudem a paleta.
- Os estilos legados do shell estão excluídos dos elementos de páginas v2 por
  seletores com especificidade zero. Continuam disponíveis para telas públicas.
- Estados especiais mantêm regras explícitas: PIN administrativo, dialogs,
  hub de Trabalho e casos clínicos em paisagem. Cores de sinais clínicos e
  templates de impressão/exportação não são cores decorativas do tema.
- O JavaScript decide estados e acessibilidade; não injeta os ajustes legados
  de navegação nas páginas v2. Detecção de PWA permanece no JS, safe area no CSS.

## Verificação

`npm run check:css` valida sintaxe de todos os CSS, styles inline de páginas da
aplicação, existência de imports e carregamento único/antecipado do entry point.
Também integra `npm run check` e a suíte `css-system.test.cjs`.

`node tests/css-system.browser.cjs` verifica páginas e estados usando Playwright
e uma conta sintética local. Caso o Chromium não esteja instalado pelo
Playwright, definir `PLAYWRIGHT_EXECUTABLE_PATH` com o executável disponível.
Os resultados ficam em `browser-results/css-system` ou no diretório indicado
por `CSS_BROWSER_RESULTS`.

## Auditoria desta migração

Foram revisados 70 CSS e 96 HTML. 88 entradas da aplicação agora compartilham
a base; quatro entradas antigas que ainda usavam apenas o shell legado foram
migradas. Foram isolados 647 seletores legados de shell e removidas 397
declarações redundantes de geometria, incluindo 203 em estilos inline.
21 grupos de estilos de navegação/controles saíram da injeção em runtime nas
páginas v2. A tag `</style>` indevida em `amigos.css` e sequências literais de
nova linha no CSS inline do Cronograma também foram corrigidas.

As URLs antigas `.html` abrem agora a implementação canônica correspondente,
mantendo parâmetros e fragmentos. Isso evita que duas páginas com o mesmo
endereço aparente tenham templates e folhas de estilo diferentes.

A base consolidada agora também controla a moldura e a rolagem interna descritas abaixo.

## Consolidação dos arquivos

Os CSS ativos foram reduzidos de **73 para 55**, sem mudar as regras ou sua ordem nas 96 páginas HTML. A base compartilhada é carregada por uma única URL, sem cinco downloads adicionais por imports.

- `ui-app.css`: incorpora foundations, controles, navegação de Trabalho, navegação da aplicação e componentes comuns. As seções internas mantêm a ordem das layers.
- `plantao.css`: base compartilhada do Plantão e comportamento PWA, usada pela emergência e pelo TraubeZap.
- `emergency-case.css`: paciente, paisagem e variantes de mulher adulta/homem idoso, em sua ordem original.
- `admin.css`: administração e gerenciamento administrativo de editais.
- `editais-provas.css`: apresentação de provas e catálogo.
- Seis CSS sem carregamento atual ficam em `docs/archive/css/` para consulta histórica: fase3, simulador-hub, caderno-recursos, caderno-notion-editor-fix, editais-v15 e flashcards-central-v18. Não são parte da aplicação.

Estilos com consumidores ou prioridades diferentes permanecem separados. Por exemplo, o CSS público do prontuário não recebe regras internas da aplicação; impressão, livros e módulos clínicos também conservam suas responsabilidades. Não agrupar estilos atravessando outro stylesheet ou bloco inline: isso altera a cascata.

O cache PWA e todas as páginas usam `ui-app.css?v=7`. Os testes verificam a base consolidada, as prioridades internas e a existência dos stylesheets das telas públicas também. O teste de navegador atende todas as requisições com arquivos locais e conta sintética.

## Moldura da aplicação

A área externa e o header usam a cor primária do tema. A app-shell fica abaixo do header, com cantos de 26px e faixas laterais/inferior de 8px (18px e 4px no celular). Sidebar e conteúdo ficam dentro dela. A main tem rolagem própria; o documento fica fixo. Não definir transform ou contain na app-shell: popups e cenários clínicos fullscreen dependem do viewport como referência.

A largura máxima de conteúdo é 1520px, com padding horizontal de 24px no desktop e 16px no celular. A topbar não tem borda inferior; seu fundo é contínuo com a moldura. As barras de rolagem usam cores do tema e trilho transparente. Plantão e onboarding rolam a main nas telas v2. A navegação instalada mantém a reserva de espaço inferior e a emergência em paisagem conserva seu modo imersivo.

A abertura usa um estado de carregamento com link nativo de recuperação até Auth, tema da conta, navegação e montagem inicial estarem prontos. O Dashboard também aguarda seu modelo escolhido ou uma mensagem de recuperação. Não revelar templates intermediários usando um timer fixo. A apresentação é liberada após as condições de prontidão e os adapters completarem suas alterações no DOM.

O botão de recolher/expandir fica no topo da sidebar no desktop, também quando recolhida. No celular o controle volta à sidebar enquanto o drawer está aberto; o acesso de abertura permanece disponível quando a sidebar está escondida.

A linha de cabeçalho da sidebar apresenta o rótulo Menu e o controle à direita. O ícone do painel indica recolher/expandir; com a sidebar recolhida o controle fica centralizado. O drawer aberto usa um único controle de fechar, com ícone de X. Labels e títulos acessíveis acompanham o estado.
