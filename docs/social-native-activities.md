# Atividades nativas das salas

Branch: codex/social-reference-composition. Implementação posterior à comunidade persistente de grupos (b6771232).

## Comportamento

- Questões: seleção de lista própria, criação/preenchimento no editor original dentro da sala e resolução coletiva pelo mecanismo existente. Listas incompletas não iniciam uma sessão.
- Flashcards: criação no editor original, seleção de deck por área/matéria/tema, frente sincronizada, revelação pelo administrador e avaliação individual. Referências aos cards originais; não duplica a biblioteca. Avaliações coletivas não alteram automaticamente a repetição espaçada individual.
- Simulador: escolha de caso institucional e execução do simulador original dentro da sala. Cada pessoa inicia seu atendimento. A sessão clínica real é validada no servidor; resultados coletivos ficam ocultos até todos concluírem ou o administrador encerrar.
- Não exige envio de links. Permissões e limites das bibliotecas originais permanecem. Conta sem acesso recebe aviso e ação indisponível.
- Voz, autenticação, motor clínico, monitor, casos e pontuação não foram reimplementados.

## Dados e segurança

SQL aditivo: db/social_native_activities.sql. Uma atividade por sala e respostas privadas. Leitura exige participação vigente; comandos de administração, acesso às bibliotecas, autoria dos cards, sessão clínica, bloqueios e limite de requisições são validados no servidor. Escrita direta é revogada. Realtime publica somente alterações da atividade; respostas privadas não são publicadas.

O compartilhamento de imagem autoriza somente frente do card atual e verso já revelado, com URL assinada curta. O editor e o simulador usam iframe da própria origem; eventos de sessão exigem origem, janela, sala e caso correspondentes. Sair da sala desmonta os módulos incorporados.

## Validação

27 testes sociais passaram, incluindo testes novos de banco e interface. Testes incluem conta externa à sala, escrita direta negada, card privado de outro autor, verso oculto, avaliação inválida, imutabilidade da avaliação enviada, exclusão entre questões e outras atividades, sessão clínica alheia negada e resultados ocultos. Interface verifica editores originais, escape de conteúdo, preservação do iframe durante atualizações e limpeza na saída.

SQL aplicado somente à homologação nesta fase. Validação real identificou a conta luriamed sem acesso às três bibliotecas; teste visual completo dos editores depende de conta de homologação já habilitada. Publicação final em produção foi autorizada pelo usuário, mas permanece pendente da validação e integração com main.
