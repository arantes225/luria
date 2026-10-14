# Etapa 1 — Amigos, revisão por referências de 14/10/2026

Branch: codex/social-visual-refinement. Base anterior: 069719f9. Checkpoint reversível: 011c048a. Arquivos não relacionados (calendário, bootstrap de homologação e provas de conceito de música) permaneceram fora dos commits desta etapa.

## Direção e implementação

As dez imagens foram examinadas. As imagens 1/9 (mesmo mosaico), 2 e 10 orientaram a Etapa 1: avatares destacados, cards compactos, ação de convite junto aos contatos e solicitações em painel contextual. As imagens 3/8 de grupos e 4–7 de atividades ficam como referência para etapas posteriores; não foram usadas para fabricar integrações ou resultados.

- Meus Amigos assume a área principal; Study Rats permanece preservado abaixo.
- Navegação Amigos | Grupos | Salas, com hash, teclado, aria-selected e painéis inertes quando ocultos. Grupos apenas ganhou destino próprio; não iniciou seu redesign.
- Cards de contato com avatar real ou inicial, status autorizado, ação Estudar junto e menu existente de perfil/remover/bloquear.
- Adicionar amigo abre o fluxo original pelo ID em um modal, com foco e fechamento restaurados.
- Solicitações e sugestões ficam no painel lateral; estados vazios e ícones receberam acabamento discreto.
- Tokens complementares teal, lavanda e âmbar adaptados aos dois eixos atuais. CSS isolado social-friends.css, sem alterar CSS global.

Os resultados priorizam composição e hierarquia das referências, sem copiar personagens, capas, perfis, contagens, presença ou mensagens fictícias. A conta real tem apenas um amigo, sem foto nem status compartilhado; a captura preserva essas condições. Não se atribui o aspecto preenchido dos mockups a dados inexistentes.

## Arquivos desta etapa

amigos.html; amigos/index.html; assets/css/social-friends.css; assets/js/amigos.js; assets/js/community-navigation.js; assets/js/social-view.js; service-worker.js; tests/social-ui.test.cjs; tests/social-pwa.test.cjs; tests/stage82-ui.test.cjs; este documento.

## Validação

21 testes aprovados: interface social, convites, solicitações, persistência, rascunhos, modos existentes, ratinhos, saída da sala, navegação por teclado, regressões da comunidade e cache PWA. Teste adicional do ciclo do modal aprovado após sua correção. JS sintaticamente válido; CSS novo e social-v4 parseados sem erro. A verificação global de CSS foi interrompida por duração excessiva, portanto não se declara aprovação global desse comando.

Capturas reais em browser-results/friends-stage1:
- before.png: estado anterior (614 × 528).
- desktop-blue-light.png, desktop-blue-dark.png, desktop-pink-light.png, desktop-pink-dark.png (1280 × 720).
- compact-blue-light.png, compact-blue-dark.png, compact-pink-light.png, compact-pink-dark.png (614 × 528).
- invite-blue-light.png e invite-pink-light.png: modal final com ID real; nenhuma solicitação foi enviada.

A moldura, cabeçalho, sidebar, timer e perfil continuam sendo os componentes globais. Temas alternados por seus controles oficiais e restaurados para azul/escuro. Não houve escrita de dados reais para testes. Sem overflow horizontal nas larguras efetivamente inspecionadas.

Regressões encontradas e corrigidas: flex antigo comprimindo nomes; regras antigas de cabeçalho/lista prevalecendo; modal depois do script impedia registrar eventos de fechamento. Modal reposicionado antes do script e conferido no navegador.

## Homologação e pendências

Publicação expressamente autorizada pelo usuário. Versão final Cloudflare: 776a60c6-fb31-43d8-92e1-f447646b6a16. Interface real conferida após publicação. Produção e hospedagem preservadas, sem push, migração, alteração de Supabase, voz, Spotify ou limites.

A API de viewport não aplicou as dimensões pedidas; o navegador forneceu 1280 e 614 px. Não se declara teste em 390/375 px, iPhone, Android, teclado virtual ou PWA instalado. Esses testes físicos/narrow permanecem pendentes. Solicitações/sugestões preenchidas foram cobertas por testes locais, sem criar perfis falsos na homologação.

Etapa 1 entregue para avaliação visual, com essas limitações registradas. A Etapa 2 (Grupos) aguarda aprovação.
