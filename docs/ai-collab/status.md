# ECG — status e evidências

Verificação documental em 27/10/2026. Use `não verificado` quando a fonte consultada não prova execução. Atualize cada linha com link permanente e data; não substitua estado de produção por estado de branch.

| Frente | Estado comprovado | Evidência / limite |
| --- | --- | --- |
| Repositório | **Público**, branch padrão `main` no momento da inspeção. | Metadados do GitHub em 27/10/2026; reavaliar antes de publicar informações novas. |
| Site Work ECG | Código de captura e página de câmera em `main`; restrição administrativa descrita no [PR #154](https://github.com/arantes225/luria/pull/154). | [PR #167](https://github.com/arantes225/luria/pull/167) mesclado. Teste da câmera em aparelho real e estado atual do site não foram comprovados nesta revisão. |
| Ajuste de rota da câmera | [PR #169](https://github.com/arantes225/luria/pull/169) mesclado em `main`; [PR #168](https://github.com/arantes225/luria/pull/168) ainda aberto na inspeção. | #169 preserva `/trabalho/ecg/` ao abrir/fechar a câmera. #168 parece uma proposta anterior equivalente; confirmar antes de encerrá-lo. |
| R2/PhysioNet | Workflow manual em `main` via [PR #117](https://github.com/arantes225/luria/pull/117). [Execução 40269274487](https://github.com/arantes225/luria/actions/runs/40269274487) e [execução 40237969553](https://github.com/arantes225/luria/actions/runs/40237969553) concluíram com sucesso; a etapa de envio ao R2 passou. | Modos escolhidos, inventário atual do bucket e comparação integral com checksums oficiais **não verificados** aqui. Houve também uma [execução cancelada](https://github.com/arantes225/luria/actions/runs/40243256081). |
| Interpretação IA | `ecg-ai-reader` exige sessão/admin no código; PR #154 relata publicação da função v2. | Não houve nesta revisão chamada ao endpoint, avaliação de acurácia ou conferência da versão implantada. |
| Treino Colab | **Sem métricas reproduzíveis encontradas em `main`.** | Nenhum notebook, hash de checkpoint ou relatório de treino no inventário do Git. Busca no Drive conectado não localizou relatório pelo nome; um link de Colab citado em outra conversa não estava acessível nessa conexão. Não se declara modelo treinado/aceito. |
| Digitalizador de sinal | **Não evidenciado em `main`.** | `ecg-layout.js` estima faixas de uma imagem; não produz onda calibrada, validação de escala nem métricas de erro. |
| Benchmark multimodelo | [PR #97](https://github.com/arantes225/luria/pull/97) aberto, com protótipo isolado. | O próprio PR relata zero deploy, zero chamadas pagas, zero teste clínico e suíte completa não executada. Não tratar o documento da branch como implementação lançada. |
| Validação clínica/regulatória | **Pendente.** | Nenhum resultado de validação externa ou aprovação formal foi estabelecido por esta revisão. |

## Como anexar resultado de treino/digitalizador

Para cada execução, inclua uma linha aqui ou um novo Markdown em `docs/ai-collab/experiments/` com: objetivo, origem/licença dos dados, versões, amostras e divisão, revisão do notebook/código, parâmetros e seed, métrica e intervalo, casos de falha, hash de artefato, localização privada sem URL assinada, data, revisor e decisão. Marque `relato não auditado` enquanto faltarem evidências. Não inclua exemplos identificáveis.
