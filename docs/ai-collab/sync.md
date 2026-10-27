# Sincronização entre ChatGPT, Antigravity e Claude Code

## Fluxo de trabalho

1. Abra o mesmo repositório e atualize sua cópia de `main`. Leia `AGENTS.md` e [status.md](status.md). Confira PRs abertos e arquivos locais antes de começar; `main` pode mudar enquanto outro agente trabalha.
2. Crie uma branch por mudança. Não edite `main` diretamente. Comunique a tarefa em [tasks.md](tasks.md) ou no PR e mantenha o status de evidências.
3. Faça alterações pequenas, teste o que mudou e revise o diff por dados sensíveis e conflitos. Abra PR com objetivo, evidência, riscos e pendências. Não faça merge ou deploy clínico por inferência.
4. Antes de trocar de IA, grave o estado em [handoff.md](handoff.md) e publique a branch/PR. O próximo agente deve buscar a branch e conferir o código e a data das notas. Se houver conflito, resolva no Git e registre a decisão no PR.
5. Após merge, atualize `main` no outro ambiente. O GitHub não envia a memória de uma conversa à outra; o próximo agente precisa ler os arquivos/PRs novamente.

## Por ferramenta

- **ChatGPT/Codex:** o GitHub conectado nesta tarefa permitiu ler `arantes225/luria`. Em novas sessões, confirme que a conexão e o repositório estão disponíveis. A conexão do ChatGPT para consulta recupera arquivos autorizados sob demanda; a escrita nesta tarefa usa a capacidade de desenvolvimento disponível. Não há índice ou sincronização de chat garantidos.
- **Google Antigravity:** abra o checkout do mesmo repositório. A documentação oficial reconhece `AGENTS.md` no workspace; não é necessário criar um `GEMINI.md` duplicado. Faça `pull/fetch` antes de trabalhar e PR/handoff ao terminar.
- **Claude Code, quando instalado:** abra a raiz do checkout; `CLAUDE.md` encaminha às regras comuns. Confirme a leitura e use o mesmo fluxo Git. A presença do arquivo não instala nem autentica o Claude Code.
- **Obsidian, opcional:** abra o checkout como vault ou apenas `docs/ai-collab/`. Edições continuam sujeitas a Git/PR; Obsidian não sincroniza agentes por si só.
- **Colab/R2:** notebook, execução e objetos privados ficam nos ambientes próprios. Publique no Git somente resumo sanitizado, revisão, métricas e hashes verificáveis. Nunca mova dataset, peso ou segredo para este diretório.

Se o objetivo for reação automática a PRs, isso requer uma automação configurada separadamente pela pessoa responsável, com acesso e gatilhos revisados. Este PR não cria vigilância contínua nem muda permissões.
