# Alex: ações e integração entre páginas

O robô tem 21 movimentos. Os nove novos são `nod` (confirmação), `shakeHead` (tentar novamente sem raiva), `point` (dica), `search` (procurar), `loading` (aguardar), `listening` (escutar), `encourage` (incentivo), `stretch` (pausa) e `bow` (agradecimento).

Nas páginas internas com navegação v2, o companheiro flutuante é carregado após `docmap:ready` informar o usuário autenticado. Ele permite arrastar segurando o próprio robô, por toque/mouse ou setas do teclado. Durante o arraste, abre os braços e inclina o corpo na direção do deslocamento, voltando suavemente ao repouso ao soltar. Um toque curto abre ajuda contextual; arrastar não abre a ajuda. Não há botões abaixo do robô. Minimizar fica dentro da ajuda, e a restauração usa o indicador Alex. Movimento reduzido desativa os gestos, mantendo o arraste disponível. Posição e estado minimizado são salvos separadamente por usuário; nenhum token ou conteúdo pessoal é armazenado. A tutoria permanece visível apenas para admin. O layout acompanha o viewport e o teclado; minimizar libera o contexto 3D. Nas páginas Aprender e Professor Alex, o mesmo robô é transferido para o widget, evitando uma segunda renderização.

O adaptador de eventos não importa o motor 3D e não acessa dados, áudio ou serviços. O carregador compartilhado monta o widget; integrações específicas podem apenas enviar os eventos abaixo. `bindAlex` reutiliza a ligação existente do mesmo componente, evitando eventos duplicados. Se houver mais de um componente, envie `target` com o ID do destinatário.

```js
import './professor-alex-mascot.mjs?v=20261014-actions1';
import {bindAlex} from './professor-alex-integration.mjs?v=20261014-actions1';
const integration = bindAlex(document.querySelector('professor-alex-mascot'));
integration.react('welcome');
integration.react('loading', {phase:'start'});
try {
  await salvarDados();
  integration.react('success');
} catch {
  integration.react('error');
}
// Ao desmontar o widget em uma navegação interna:
integration.destroy();
```

Uma página já conectada pode usar eventos sem importar o adaptador novamente:

```js
document.dispatchEvent(new CustomEvent('luria:alex', {
  detail: {action:'material', target:'alex-mascot'}
}));
```

Para botões de ajuda, pode-se usar `data-alex-action="hint"`. O adaptador ignora controles desabilitados. Essa reação indica uma dica; a página continua responsável por abrir a dica e fornecer seu conteúdo.

| Evento real da página | Ação |
| --- | --- |
| Primeira apresentação do widget | `welcome` |
| Dúvida selecionada | `question` |
| Material selecionado | `material` |
| Explicação iniciada | `explain` |
| Gravação confirmada ou resposta correta | `success` |
| Operação falhou | `error` |
| Dica aberta | `hint` |
| Pesquisa em andamento | `search` com `phase:'start'` |
| Requisição em andamento | `loading` com `phase:'start'` |
| Captura de voz realmente ativa | `listening` com `phase:'start'` |
| Sessão concluída | `complete` |
| Conquista relevante confirmada | `achievement` |
| Incentivo solicitado | `encourage` |
| Pausa iniciada | `break` |
| Agradecimento | `thanks` |

Estados contínuos terminam com a mesma ação e `phase:'end'`, ou com um resultado (`success`, `error`, `complete`, `achievement`). Não emita sucesso antes de confirmar a operação, nem escuta antes de iniciar a captura. Os eventos não implementam IA ou microfone.

Gestos repetidos têm intervalo mínimo de 1,2 segundo. Enquanto aguarda, o Alex mantém o estado, sem aceitar dicas que interrompam a operação. Resultados interrompem a espera imediatamente. Movimento reduzido ou intensidade zero impede a repetição de estados contínuos; a expressão ainda comunica o estado. O componente pausa fora da tela e em abas ocultas, segue o tema e preserva a resolução Retina/PWA.

O laboratório em `docs/mascot-lab/` apresenta todos os movimentos. Sirva-o localmente com `node scripts/serve-mascot-lab.cjs`. A versão por arquivo precisa ser recompilada com `scripts/build-mascot-preview.cjs` após alterações.
