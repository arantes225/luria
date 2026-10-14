# Validação local da central social

Base auditada: `73eb11e8`, branch de trabalho `codex/social-study-rooms`.

Este documento registra a validação local inicial. Posteriormente, com autorização do usuário, foram configurados Supabase e Workers isolados de homologação, incluindo SFU e TURN; o usuário confirmou conexão e áudio entre PC e Safari no Wi-Fi, áudio no Safari usando 5G e saída/reentrada no PC. As publicações e verificações reais posteriores estão em [social-staging.md](social-staging.md). Nenhuma publicação em produção.

## Resultado

| Verificação | Resultado |
|---|---|
| Bateria final de banco, UI, voz, PWA e navegação | 37 testes aprovados; zero falhas |
| Última execução da suíte geral | 539/544 aprovados; cinco falhas preexistentes |
| Sintaxe | 248 blocos JS/CJS; zero erros; Worker MJS verificado separadamente |
| CSS e rotas | 56 folhas e 88 páginas; zero erros |
| CSP | 96 páginas verificadas |
| Navegador real | 15 combinações: larguras 1440, 1024, 768, 390 e 320; temas azul, rosa e escuro |
| Assets e editor PWA | 180 combinações de dez ratinhos com dezessete acessórios e a opção sem acessório; imagens carregadas, escala conjunta e editor acessível |
| Movimento reduzido | Transições da pista desativadas por `prefers-reduced-motion` |

A suíte geral foi executada antes dos últimos reforços pontuais de autorização da voz e de consentimento no quiz. Esses reforços e as demais mudanças posteriores passaram na bateria final de 37 testes. Não se afirma que a suíte completa está verde.

## Evidência funcional

`tests/social-database.test.cjs` aplica o SQL preparado sobre PostgreSQL embarcado (PGlite), com os contratos existentes simulados apenas no bootstrap do ambiente de teste. As consultas, constraints, RLS e funções sociais executadas são as da entrega.

Verificações incluem: manutenção de amizades aceitas e offsets dos acessórios; recusas a usuários não autenticados; aceite de pedidos somente pelo destinatário; grupos e administradores; opt-in e propriedade dos canais de presença; lotação e convites; acesso ao histórico; idempotência do chat; timer coletivo sem inserção de tempo fictício; sessão Auth revogada impedindo voz; projeção das alternativas sem metadados de gabarito; respostas ocultas até revelação; tentativas individuais anteriores preservadas; histórico mantido ao sair e arquivar; fluxo antigo de exclusão de questões não bloqueado pelas novas referências.

`tests/social-ui.test.cjs` executa o JavaScript da página em DOM com RPCs ligadas ao mesmo banco embarcado. Testa criação e reentrada em salas, histórico persistente, pedidos, grupos, XSS inerte e rascunhos preservados após falhas, isolados por conta e sala.

`tests/social-voice.test.cjs` verifica o Worker e o Durable Object com API SFU simulada: autorização antes de alocar, serialização, segunda aba recusada, assinaturas limitadas à sala, rejeição de vídeo e limpeza de tracks expiradas. `tests/social-voice-client.test.cjs` verifica captura apenas de áudio, encerramento e ausência de vazamento em capturas atrasadas.

`tests/social-layout.browser.cjs` usa Chrome real, banco em memória e interceptação de rede. Todas as requisições externas são bloqueadas. Contas, nomes e progresso nas capturas são **dados sintéticos de QA**, não sugestões/perfis oferecidos pelo produto.

Capturas e métricas estão em `browser-results/social/`. Os resultados textuais das execuções ficam em `browser-results/validation/`. Esses diretórios são ignorados pelo Git para não colocar dados de teste no site publicado.

## Falhas anteriores à entrega

As cinco falhas abaixo se reproduziram numa cópia limpa da base, executando os mesmos testes sem as alterações sociais:

- `frontend-xss`: fixture de Admin não define `apostilaVisibleImageRows`.
- `pwa-v2`: asserção de layout aposentado do Dashboard.
- `question-factory`: comparação dos prompts estáticos diverge no checkout Windows.
- `service-worker`: asserção de quantidade total de entradas de precache.
- `service-worker`: asserção de um ícone não visitado pelo precache atual.

O check de prompts também identifica divergência preexistente nas duas entradas de Admin. Arquivos e testes dessas funcionalidades foram mantidos. O teste de versão corrente do service worker foi atualizado para a versão social, sem alterar o mecanismo global de atualização do PWA.

## O que exige homologação real

O teste local não substitui verificações no ambiente hospedado. O ambiente de homologação foi provisionado posteriormente, com SQL, secrets, rota, Durable Object, SFU e TURN; o usuário confirmou saída/reentrada no PC e áudio entre PC/Safari. Permanecem verificações específicas de saída/reentrada e fechamento no Safari, suspensão, mudanças de rede, maior lotação, RLS/convites/moderação, Storage, quotas e demais fluxos coletivos. O roteiro e as evidências atuais estão em `social-staging.md` e `cloudflare/study-voice/README.md`.

O workflow passa a executar a bateria social antes de futuros deploys. A regra existente de publicação automática em pushes em `main` permanece; as publicações de homologação utilizaram Workers isolados, sem acionar esse workflow ou publicar em produção.
