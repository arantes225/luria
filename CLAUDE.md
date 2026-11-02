# Traube — regras enxutas de execução

Produto: Traube. Assistente: Leco. Fonte de verdade: código e documentação versionados neste repositório. Não presumir que uma alteração esteja publicada.

## Roteamento com custo controlado
- Pedido simples, limitado a um módulo: executar diretamente com UM especialista (ou na sessão principal). Não chamar gerente.
- Pedido moderado: um executor; acionar revisor apenas se o risco exigir.
- Pedido entre setores ou arquitetura complexa: consultar APENAS o(s) gerente(s) relevante(s), em leitura, e então delegar a execução diretamente aos especialistas disponíveis.
- Mudanças de RLS, autenticação, migrações, conteúdo clínico de alto risco ou dados pessoais: exigir revisão independente e autorizações apropriadas.
- Não convocar todos os times por padrão. Limite preferencial de 1–3 executores simultâneos; 4–5 só com atividades independentes e justificativa.
- Evitar cascatas: gerente NÃO cria especialistas; devolve plano curto ao coordenador, que decide a execução. Não repetir auditorias já cobertas por testes determinísticos.
- Preferir script, teste, grep, skill ou hook a agente para verificações repetitivas (hora, formato, links, contraste verificável, sintaxe).
- Pedir aos agentes apenas caminhos pertinentes e diferenças necessárias. Não carregar repositório inteiro nem reproduzir logs extensos.
- Resposta de cada delegado: arquivos / achados / alteração / teste executado / risco / bloqueio; máximo ~180 palavras, salvo necessidade técnica.
- Reusar contexto já verificado; não pesquisar ou explicar novamente sem motivo. Evitar loops: no máximo duas tentativas de correção do mesmo problema sem nova evidência.

## Qualidade e publicação
- Aplicar Checklist Master proporcionalmente ao risco: escopo, alteração, testes, conferência visual quando aplicável, estado de branch/PR/deploy/produção.
- Rodar verificações específicas primeiro; usar `npm run check` em integração ampla quando cabível.
- Trabalho no código em branch/PR; não permitir edição simultânea do mesmo arquivo por agentes diferentes.
- Não declarar testes, deploy, disponibilidade ou publicação sem evidência. Para riscos clínicos, exigir revisão humana competente antes de liberar orientações sensíveis.
- Produção, migração destrutiva, dados de usuários e mudança crítica de segurança dependem de autorização humana explícita. Permissões técnicas devem reforçar essas regras.

## Escalonamento
Gerentes disponíveis: `gerente-medicina`, `gerente-engenharia`, `gerente-visual`, `gerente-seguranca`. Eles são consultores de coordenação, não etapas obrigatórias. As especialidades já configuradas fora do repositório devem ser reutilizadas; não criar agentes duplicados sem inventário.
Detalhes: `docs/AGENTES-ARQUITETURA-EFICIENTE.md`.
