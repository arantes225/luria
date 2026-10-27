# Registro de decisões

Registre apenas decisões confirmadas. Mudanças de direção recebem nova linha, sem apagar o histórico. Propostas ficam em [tasks.md](tasks.md).

| ID / data | Decisão | Motivo e consequência |
| --- | --- | --- |
| D-001 · 27/10/2026 | Usar Git + PR + este diretório como memória compartilhada entre ferramentas. | Estado auditável e disponível no checkout; Obsidian é opcional. Conversas não se sincronizam automaticamente. |
| D-002 · 27/10/2026 | `AGENTS.md` contém as regras comuns; `CLAUDE.md` apenas encaminha. | Evita regras duplicadas e contraditórias. Antigravity também reconhece `AGENTS.md`. |
| D-003 · 27/10/2026 | O piloto de documentação não muda código, workflow, permissões ou produção. | Permite revisão do PR sem acionar importação, treino ou uso clínico. |
| D-004 · 27/10/2026 | Registrar resultado apenas com fonte e nível de verificação. | Código, merge, deploy, execução e validação clínica são fatos diferentes. |
