# Publicação da comunidade e atividades nativas — 15/10/2026

## Versões

- Branch de trabalho: codex/social-reference-composition.
- Integração com a produção anterior: 69dfe54b (base bbeb271e).
- Implementação: b6771232 (grupos), b78caf33 / a8e29a13 / a651a716 (atividades).
- Publicação principal: 44d5fa663c8cd5f4c05f64a04080d7bf902a8092.
- Git tree publicado idêntico ao checkpoint local: c34e8654f0ee7caf4161f89b680df7dc815208de.
- GitHub Actions: https://github.com/arantes225/luria/actions/runs/38684973244 — quality e deploy concluídos com sucesso.
- Homologação: 16390d60-1a8e-4446-981d-ca385a56ee20, antes do ajuste final do mascote interno.

## Conteúdo

Comunidade de grupo com chat, mural, materiais por HTTPS e checklist persistentes, além de nova composição visual de Amigos, Grupos, Study Rats e Salas. Ratinho, acessórios, identidade institucional, moldura e quatro temas preservados. Halo restrito aos temas escuros.

Na sala: criação de listas completas de questões, importação no editor original, criação de flashcards no editor original, seleção e revisão coletiva de decks, escolha e execução do simulador clínico original. Nenhuma dessas atividades exige envio de links. O anfitrião escolhe a atividade; cada participante usa suas permissões existentes.

## Verificação

68 testes sociais no conjunto principal, mais teste específico do contexto incorporado e ausência de mascote duplicado (69 no total do conjunto atualizado). CI também validou CSS, rotas, CSP e regressões gerais. Banco de produção verificado após as duas migrações aditivas: RLS ativo, RPC anônimo negado, INSERT direto negado e tabelas novas sem dados de teste.

Capturas reais: browser-results/native-activities e browser-results/group-community. Desktop 1280 e mobile 390 sem overflow horizontal nas medições. Azul/rosa claro/escuro conferidos no novo painel. Editor de flashcards, criação completa de questões e simulador abertos na homologação. Caso institucional original usado para iniciar o atendimento; sala indicou Em atendimento. Retorno pelo fluxo original descartou a sessão incompleta. Criação de questões validada por transação com rollback. Nenhuma questão de teste persistiu.

## Limites e pendências

- As novas atividades não foram testadas manualmente com duas pessoas simultâneas; permissões, revelação, dados originais e eventos foram verificados por testes de banco/cliente.
- A revisão coletiva de flashcards não altera automaticamente o agendamento individual de repetição espaçada; a interface informa isso.
- Materiais de grupos neste bloco aceitam links HTTPS; upload de arquivos para o grupo não foi implementado.
- Advisor trouxe apenas informação de RLS sem políticas para a tabela privada de respostas (acesso direto intencionalmente revogado). Avisos antigos de outras áreas permanecem fora do escopo.
- Configuração Plus e concessão de 7 dias à conta luriamed ocorreram somente na homologação, com aprovação explícita. Nenhum plano de produção foi alterado.

Git push local falhou no gerenciador de credenciais do Windows. Publicação realizada pela integração GitHub, com comparação integral de tree e atualização sem force mediante SHA esperado. O primeiro pacote excedeu o orçamento da revisão automática e não executou; divisão por arquivos resolveu o limite, sem desativar a revisão.
