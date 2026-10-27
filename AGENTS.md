# LURIA — instruções compartilhadas

Estas instruções valem para Codex/ChatGPT com acesso ao repositório e Google Antigravity. Para Claude Code, `CLAUDE.md` aponta para este arquivo. A memória compartilhada é o Git; conversas e memórias internas de cada IA não são sincronizadas automaticamente.

1. Antes de mudar algo, confira a branch, `git status`, o código atual e [docs/ai-collab/README.md](docs/ai-collab/README.md). Leia o status e o último handoff do assunto. Trate notas antigas como histórico, não como prova do estado atual.
2. Trabalhe em branch e PR para mudanças novas. Não faça merge, deploy, execute importações ou altere permissões, secrets, banco ou recursos de produção sem autorização específica. Preserve mudanças alheias e os workflows existentes.
3. Para ECG, separe captura local, estimativa geométrica, interpretação experimental, benchmark e treinamento. Nenhuma dessas etapas implica validação clínica. Leia [docs/ai-collab/ecg.md](docs/ai-collab/ecg.md) e [docs/ai-collab/status.md](docs/ai-collab/status.md).
4. Não versione credenciais, URLs assinadas, dados clínicos identificáveis, imagens de pacientes, datasets ou checkpoints de modelo. Use apenas descrições sanitizadas e referências a artefatos em armazenamento privado. Considere este repositório público até verificar sua visibilidade no GitHub.
5. Ao concluir uma sessão, registre decisões duráveis em [decisions.md](docs/ai-collab/decisions.md), evidências e estado em [status.md](docs/ai-collab/status.md), próximo passo em [tasks.md](docs/ai-collab/tasks.md), e um handoff curto em [handoff.md](docs/ai-collab/handoff.md). Atualize [changes.md](docs/ai-collab/changes.md) quando houver mudança efetiva. Não invente métricas nem marque deploy com base apenas em commit.
6. Verifique o menor conjunto pertinente de testes. Para a aplicação, os comandos existentes estão em `package.json`; o CI de PR está em `.github/workflows/deploy-pages.yml`. Documentação Markdown não exige um novo pipeline.

Siga [sync.md](docs/ai-collab/sync.md) para trocar de IA ou de ambiente. Esses arquivos são Markdown comum e podem ser abertos no Obsidian, sem depender dele.
