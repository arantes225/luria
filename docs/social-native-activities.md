# Atividades nativas das salas

Branch: codex/social-reference-composition. Implementação posterior à comunidade persistente de grupos (b6771232).

## Comportamento

- Questões: seleção de lista própria, criação de questões completas na sala (enunciado, 2–5 alternativas, gabarito, comentário e referência) ou importação no editor original e resolução coletiva pelo mecanismo existente. Listas incompletas não iniciam uma sessão.
- Flashcards: criação no editor original, seleção de deck por área/matéria/tema, frente sincronizada, revelação pelo administrador e avaliação individual. Referências aos cards originais; não duplica a biblioteca. Avaliações coletivas não alteram automaticamente a repetição espaçada individual.
- Simulador: escolha de caso institucional e execução do simulador original dentro da sala. Cada pessoa inicia seu atendimento. A sessão clínica real é validada no servidor; resultados coletivos ficam ocultos até todos concluírem ou o administrador encerrar.
- Não exige envio de links. Permissões e limites das bibliotecas originais permanecem. Conta sem acesso recebe aviso e ação indisponível.
- Voz, autenticação, motor clínico, monitor, casos e pontuação não foram reimplementados.

## Dados e segurança

SQL aditivo: db/social_native_activities.sql. Uma atividade por sala e respostas privadas. Leitura exige participação vigente; comandos de administração, acesso às bibliotecas, autoria dos cards, sessão clínica, bloqueios e limite de requisições são validados no servidor. Escrita direta é revogada. Realtime publica somente alterações da atividade; respostas privadas não são publicadas.

O compartilhamento de imagem autoriza somente frente do card atual e verso já revelado, com URL assinada curta. O editor e o simulador usam iframe da própria origem; eventos de sessão exigem origem, janela, sala e caso correspondentes. Sair da sala desmonta os módulos incorporados.

## Validação

68 testes sociais passaram, incluindo testes novos de banco e interface. Testes incluem conta externa à sala, escrita direta negada, card privado de outro autor, verso oculto, avaliação inválida, imutabilidade da avaliação enviada, exclusão entre questões e outras atividades, sessão clínica alheia negada e resultados ocultos. Interface verifica editores originais, escape de conteúdo, preservação do iframe durante atualizações e limpeza na saída.

SQL aplicado à homologação e validado por criação transacional com rollback. A configuração dos planos estava vazia: após autorização explícita, foram cadastradas as três permissões Plus iguais às de produção e concedido acesso gratuito por 7 dias à conta luriamed, sem admin. Um caso institucional original foi disponibilizado na homologação; o atendimento real abriu na sala e o participante mudou para Em atendimento. O retorno pelo fluxo original descartou a sessão incompleta. Não foram persistidas questões de teste.

Capturas reais em browser-results/native-activities (desktop e mobile; azul/rosa claro/escuro). Sem overflow horizontal nos tamanhos medidos, 1280 e 390 px. Os editores e o simulador abrem na mesma origem. Limitação: o teste real não envolveu dois participantes simultâneos nas novas atividades; isolamento e sincronização são cobertos pelos testes de banco e cliente.

Integração com origin/main registrada em 69dfe54b, preservando atualizações de apostilas. Publicação final em produção autorizada pelo usuário; registro da versão será atualizado após o deploy.
