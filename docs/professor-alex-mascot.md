# Professor Alex 2.0 — laboratório 3D

Prévia para aprovação visual. O personagem é um modelo tridimensional procedural com materiais, iluminação e quatro membros independentes, reconstruído a partir das duas referências. As imagens PNG servem para comparação; não são o modelo animado. A aprovação da fidelidade visual e a verificação em iOS/Android reais permanecem pendentes.

## Abrir a demonstração

Abra `docs/mascot-lab/local.html` manualmente no Chrome ou Edge. Esta edição funciona por arquivo, sem instalação nem conexão. Mantenha os arquivos da pasta juntos. Para servir os módulos originais e testar PWA/offline:

```sh
node scripts/serve-mascot-lab.cjs
```

Abra `http://127.0.0.1:4173/docs/mascot-lab/`. O servidor escuta somente em loopback. O laboratório é habilitado apenas em localhost ou no arquivo local; o controle de hostname não substitui autorização de servidor. Não carregue esta página na plataforma pública. A implementação não carrega o antigo Professor Alex, não modifica as páginas existentes nem registra o service worker da plataforma. O cache experimental é opcional e tem escopo exclusivo do laboratório.

## Componente reutilizável

A arquitetura existente é HTML/CSS/JavaScript estático. O Web Component funciona sem framework ou etapa de build:

```html
<script type="module" src="/assets/js/professor-alex-mascot.mjs"></script>
<professor-alex-mascot expression="happy" animation="idle" size="320"
  theme="auto" interactive="true" speaking="false" intensity="1">
</professor-alex-mascot>
```

O módulo exporta `ProfessorAlexMascot`, `EXPRESSIONS` e `ANIMATIONS`. Propriedades JavaScript refletem atributos. `size` aceita pixels (80–900), `small`, `medium`, `large`. `intensity` aceita 0–2; zero congela os movimentos. `theme` aceita `auto`, `light`, `dark`, `pink` (também claro/escuro/rosa). Em `auto`, observa `html[data-theme]` e as preferências v2 `body[data-ui-appearance]` / `body[data-ui-identity]`, incluindo `leila-mood`.

Expressões: `happy`, `attentive`, `thoughtful`, `surprised`, `confused`, `excited`, `wink`, `angry`. Também aceita os oito nomes em português, sem acentos. Em `angry`, rosto, botão inferior, encaixes, anéis e bases dos membros ficam vermelhos, com transição suave. Ao sair desse modo, retornam ao tema selecionado. Nos temas azuis, os detalhes usam azul claro neon, com emissão e halos suaves. A dúvida usa olhos redondos e sobrancelhas arqueadas, sem as diagonais irritadas do modo estourado; pensar tem um olho semicerrado e uma sobrancelha levantada.

O botão inferior central tem moldura cinza, encaixe escuro e barra luminosa horizontal, conforme a referência do robô flutuante. Os braços têm mais volume, encaixe escuro com centro luminoso na extremidade voltada ao corpo e anel azul na extremidade externa. As pernas são afuniladas, com bases mais largas, pequenas aberturas luminosas superiores e solas azuis visíveis. Todos os membros permanecem desconectados do corpo.

As faixas dos membros têm 32 pequenos LEDs instanciados em cada anel; encaixes e solas usam uma textura de pontos luminosos gerada localmente. Núcleos claros e halos ciano dão o acabamento de luz neon. O enquadramento padrão evita que a perspectiva vertical faça um braço parecer mais alto que o outro.

O corpo usa uma superfície curva com normais suaves; o visor é um quadrado arredondado com lados curvos, mais alto e menos retangular. Os braços começam numa altura próxima dos círculos laterais, um pouco abaixo deles, com altura igual e ângulos espelhados. O eixo de cada braço fica no encaixe próximo ao corpo, e o socket/LED acompanha a carcaça nesse mesmo pivô, sem se destacar durante a rotação. No aceno, o ombro mantém a altura e a extremidade gira para ficar aproximadamente 30° acima da horizontal. Despertar é uma sequência diferente, com olhos abrindo, alongamento suave e pequeno cumprimento com a cabeça.

Animado usa olhos `><` e os dois braços voltados para cima. Confuso tem um pequeno redemoinho de desenho animado acima da cabeça, com rotação suave (estático quando a preferência de movimento reduzido está ativa).

Na digitação, as mãos alternam toques sobre um teclado sólido branco com teclas escuras em relevo. Na leitura, seguram uma folha bege opaca com quatro linhas em zigue-zague, em moldura escura e mais afastada do corpo. O alcance é limitado para evitar cruzamento das mãos na intensidade máxima. Ao pensar, é a extremidade externa do braço que chega ao rosto. Explicar combina gestos alternados com animação demonstrativa de boca, sem áudio.

O laboratório usa um fundo azul com contraste suficiente para a carcaça branca, com variantes coerentes nos temas escuro e rosa. Uma sombra suave no canvas melhora a leitura da silhueta quando o componente é usado sobre branco; o fundo do componente continua transparente.

Movimentos: `wave`, `celebrate`, `thinking`, `explaining`, `typing`, `reading`, `confused`, `angry`, `sleep`, `wake`. São eventos temporários, com entrada/saída suaves e retorno à expressão selecionada. `sleep` demonstra um ciclo de repouso e também retorna ao idle.

Há duas cenas adicionais: `celebrateScene` (6,5 s), com três pulos diferentes, deslocamento lateral, giro, confetes e movimentos independentes dos braços e pernas; e `angryScene` (6 s), com dois giros, expressão de raiva intensificada, agitação dos membros, fogo estilizado e fumaça. A câmera abre temporariamente para aproveitar o cenário e volta ao enquadramento original. Efeitos são gerados localmente, sem assets externos. Movimento reduzido e intensidade zero suprimem os efeitos dinâmicos.

Para repetir o mesmo gesto:

```js
const alex = document.querySelector('professor-alex-mascot');
alex.playAnimation('celebrate');
alex.speaking = true;
alex.setMouthOpenness(0.7); // futuro adaptador de áudio: 0–1
alex.setMouthOpenness(null); // retomar a demonstração de fala
alex.setView(-Math.PI / 6, 0.06); // yaw/pitch em radianos
alex.animation = 'idle'; // interromper o gesto, manter expressão selecionada
```

Eventos: `alex-ready`, `alex-error`, `alex-react`, `alex-animation-end` (`detail.animation`). Nenhum serviço de IA, microfone ou áudio é utilizado. Olhos seguem o cursor de forma limitada; o clique/toque/Enter aciona saudação. A boca tem animação independente do visor e dos olhos.

## Renderização e desempenho

Three.js 0.180.0, licença MIT, distribuído localmente em dois módulos minificados (~720 KB sem compressão). Nenhum download de modelo, textura ou CDN em execução. Textura facial e iluminação de estúdio são geradas em memória. São aproximadamente 23.460 triângulos e 39 chamadas de desenho no repouso, sem pós-processamento ou mapas de sombra. A biblioteca é carregada somente ao importar o mascote. Os quatro arquivos de runtime somam 760.442 bytes (cerca de 0,76 MB), ou 193.249 bytes com gzip (cerca de 0,19 MB); o ZIP de entrega também contém referências e laboratório e, portanto, é maior.

Limite de 30 fps e DPR 1,5; renderização pausa fora da tela e em aba oculta. `prefers-reduced-motion` desativa flutuação, piscadas, perseguição do cursor e demonstração dinâmica de fala. Ainda permite selecionar expressões e executar a sequência estática dos gestos. Ao remover o componente, cancela o loop, desconecta os observadores e libera geometria, materiais, texturas e contexto. WebGL 2 é necessário; a falha exibe uma mensagem em vez de substituir por outro personagem.

## Arquivos

- `assets/js/professor-alex-mascot.mjs`: modelo, animação, face, tema, interação e ciclo de vida.
- `assets/css/professor-alex-mascot.css`: estilo encapsulado no Shadow DOM.
- `assets/vendor/three*.mjs`, `three.LICENSE`: motor 3D local e licença.
- `docs/mascot-lab/`: laboratório, referências, manifest, ícone e cache opcional.
- `docs/mascot-lab/local.html`, `local.bundle.js`: edição compilada para abrir por arquivo.
- `scripts/serve-mascot-lab.cjs`: servidor exclusivo do laboratório em loopback.
- `scripts/build-mascot-preview.cjs`: recompilação opcional da prévia por arquivo, com esbuild fornecido por `ALEX_ESBUILD_MODULE`.
- `tests/professor-alex.browser.cjs`: verificação real de WebGL, expressões, gestos, temas, fala, acessibilidade, tamanho mobile, pausa e descarte.
- `tests/professor-alex-offline.test.cjs`: instalação do cache, recursos 3D offline e preservação dos caches existentes.

A página `professor-alex/index.html` usa o novo mascote no cabeçalho, com fundo azul suave. `assets/js/professor-alex-page.mjs` conecta os gestos às escolhas do formulário: dúvida → pensar, material → ler, envio → explicar, modo Estourado → cena de raiva. O componente e o adaptador da página são separados para permitir novas integrações depois. A biblioteca 3D só é importada nessa aba; as outras páginas mantêm os personagens atuais e as regras de acesso existentes.

`tests/professor-alex-page.browser.cjs` verifica a página real com CSP, formulário, material, cores do modo Estourado, viewport mobile e movimento reduzido. A autenticação é substituída apenas na fixture do teste, sem contas reais; a página publicada conserva a autorização Admin já existente.

## Validação

Os testes WebGL passam no Chrome headless, em desktop e em viewport mobile de 390×844. Foram verificados oito rostos, dez gestos, duas cenas, três temas, movimento reduzido, fala demonstrativa, teclado, membros independentes, pausa fora da tela e reconexão do componente. A fixação e o alinhamento dos encaixes dos ombros são verificados em todos os 12 movimentos; há validação do retorno das cores e do enquadramento das cenas. O teste de cache verifica arquivos reais, sem exigir acesso externo. A instalação de PWA e o desempenho em iOS/Android físicos não foram validados neste ambiente.

```sh
node --check assets/js/professor-alex-mascot.mjs
node --check docs/mascot-lab/lab.mjs
node scripts/check-syntax.cjs
node scripts/sync-csp.cjs
node --test tests/professor-alex-offline.test.cjs
```

Para o teste de navegador, forneça um Playwright instalado por `ALEX_PLAYWRIGHT_MODULE` e, opcionalmente, `ALEX_BROWSER_CHANNEL` (padrão `chrome`), depois execute `node tests/professor-alex.browser.cjs`. O teste serve uma cópia controlada por HTTP no navegador; não acessa contas nem a produção.

A suíte ampla do repositório apresenta falhas anteriores em preferências do dashboard/PWA, seletores de estilos, cópias estáticas de prompts e navegação de comunidade. `check:prompts` também apresenta divergências existentes. Essas áreas não foram alteradas para esta etapa. O CSP das 96 páginas existentes e os testes selecionados pelo workflow de produção continuam validados separadamente.

Publicação na aba Professor Alex autorizada pelo usuário em 13/10/2026. A integração com IA/voz e a inclusão em outras páginas ficam para as próximas etapas.
