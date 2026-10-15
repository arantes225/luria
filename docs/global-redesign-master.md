# Redesign global — prompt mestre definitivo (15/10/2026)

Branch: codex/luria-global-redesign. Checkpoint anterior às alterações: codex/checkpoint-master-20261015 → cec67245. Produção de referência: bc7dcccc; main conferida em 3cca0343 e integrada preservando apostilas recentes. Arquivos não rastreados de Calendário, POC YouTube e ferramentas foram preservados e ficam fora dos commits deste projeto.

## Etapa 0 — baseline

Aplicação estática HTML/CSS/JS, GitHub Pages e homologação Workers existente. Entrada CSS compartilhada ui-app.css sem imports adicionais, camadas com precedência !important explícita. Temas usam data-ui-identity (blue/pink) × data-ui-appearance (light/dark), persistidos por conta em luria:dashboard-ui:v2. Moldura pertence a luria-ui-navigation, com gap/radius/sidebar/header independentes.

Social atual: amigos.js + community-navigation.js; social-rooms.js reutiliza Supabase, chat, timer e voz existentes; social-group-community.js mantém chat/mural/materiais HTTPS/checklist. Grupos ainda não possuem o modo competitivo. studyrats.js e dados de desafios são globais entre contatos, não estão isolados por grupo. Será necessária migração aditiva nas etapas posteriores; não basta mover o DOM.

Atividades: social-native-activities.js possui criação manual de questões, decks por matéria/tema e simulador via módulo original em iframe. A criação manual não atende ao novo requisito de selecionar do banco institucional. Seleção de flashcards ainda precisa de filtros e deck temporário explícito. Direcionamento do simulador deverá ser investigado com teste de troca de atividades/estado e não apenas texto. Nenhum serviço de voz, autenticação, Spotify ou dados foi modificado.

## Etapa 1 — fundação implementada

Quatro paletas atualizadas no CSS compartilhado, sem novo mecanismo de temas. Moldura desacoplada da cor dos botões: azul claro #184888, azul escuro #102A4C, rosa claro #B2577D, rosa escuro #412439; geometria preservada. Temas escuros agora usam marinho/ameixa em vez de superfícies quase pretas comuns.

Tokens de teal/sálvia/violeta/coral/âmbar adaptados por identidade e luminosidade. Tokens contextuais para questões, flashcards, erros, apostilas, notas, LuriaZap, Alex, amigos, grupos, salas, ratos, simulador e ofensiva. Variantes opt-in de cards, ações contextuais, estados, modais e ícones. Fonte Inter e escala existentes preservadas; botões recebem arredondamento, padding e transições uniformes. A adoção e revisão de cada página permanece separada: tokens não significam redesign completo.

Testes: contraste AA de textos, textos secundários, ações e complementares nos quatro temas; verificação de moldura e persistência inalteradas. Conferência visual real pendente na homologação autorizada. Produção não publicada.

## Matriz de cobertura

| Área | Fundação | Revisão de composição | Validação visual/funcional |
|---|---|---|---|
| Aprender | Implementada | Implementada: Alex e três cards contextuais | Testes de integração passaram; visual pendente |
| Amigos | Implementada | Pendente nova entrada sem Study Rats | Pendente |
| Grupos/Study Rats | Implementada | Pendente competição por grupo | Pendente migração e isolamento |
| Salas | Implementada | Pendente modais e nova composição | Voz preservada; regressão pendente |
| Questões nas salas | Implementada | Pendente banco/filtros/modos | Não atende ainda ao novo fluxo |
| Flashcards nas salas | Implementada | Pendente seleção/deck temporário | Não atende ainda ao novo fluxo |
| Simulador nas salas | Implementada | Pendente investigação de estado/rota | Motor preservado |
| Dashboard/Consolidar/Cronograma | Implementada | Pendente revisão individual | Pendente |
| Questões/Flashcards/Caderno de Erros | Implementada | Pendente revisão individual | Pendente |
| Apostilas/Anotações/Alex/LuriaZap | Implementada | Pendente revisão individual | Pendente |
| Simulador/Estatísticas/Trabalho | Implementada | Pendente revisão individual | Lógica clínica preservada |
| Perfil/Admin/Configurações/Editais/Planos/secundárias | Implementada | Pendente revisão individual | Pendente |

Não há declaração de conclusão global. Sem publicação em produção, sem migração aplicada e sem reativar Netlify.

## Etapa 2 — Aprender implementada

Nova composição do card Alex com mascote oficial, formulário existente, sugestões que levam à tutoria real e anexos preservados. Apostilas, Anotações e LuriaZap adotam variantes da fundação com cores e ilustrações SVG próprias. O contador estático incorreto de uma apostila foi substituído por ação de biblioteca. Permissão admin do Alex mantida. Cinco testes de fundação/integração passaram. CSS educacional passa a respeitar componentes opt-in, eliminando o reset monocromático dessas variantes em vez de acumular sobrescritas. Validação visual real aguarda homologação.
