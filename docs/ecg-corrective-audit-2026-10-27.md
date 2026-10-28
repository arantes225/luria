# Auditoria corretiva do scanner ECG — 27/10/2026

## Base e alcance

Base: `fix/ecg-e2e-contracts-and-calibration` (`2957e7384b36f94f3f8f28e56f26606bb8fc3eb0`), um commit à frente de `main` (`3f357c230261285d55144be22115378ffdaefc83`) na inspeção inicial. O repositório estava público. PRs paralelas de ECG foram identificadas; esta mudança não altera Supabase, R2, dados de pacientes, pesos, pagamentos ou deploy.

| Problema confirmado | Correção | Evidência | Estado |
|---|---|---|---|
| `recognizedLabels` não chegava como `leadIdentities` | Identidade canônica por célula e derivação, com OCR, hipótese, região, confiança, confirmação humana e conflito | Teste de imagem renderizada atravessa reconhecedor → câmera → extrator → auditor → pacote | Corrigido em teste controlado |
| Reconhecedor emitia anomalias como strings; câmera esperava campos de objeto | Lista única de objetos com `code` e contexto; duplicatas, ausências e conflitos preservados | Teste adversarial V3 em região DI rejeitado | Corrigido em teste controlado |
| Auditor podia conceder “Adequada tecnicamente” com identidade desconhecida ou calibração desconhecida | Estados indeterminados bloqueiam; hipótese geométrica e confirmação manual exigem revisão | Testes de auditoria e benchmark sintético | Corrigido |
| Ganho e escala temporal alterados depois da extração poderiam manter vetor incorreto | Recálculo direto das coordenadas em pixels e linha de base; sem valor presumido de pixels/mm | Testes 25/50 mm/s e 5/10 mm/mV com imagem de traçado controlado | Corrigido em teste controlado |
| Setas usavam o centro nominal da folha | Registro leve de bordas da folha entre quadros, com movimento observado e perda/recuperação da referência | Sequência de imagens transladadas nas quatro direções | Implementado; validação em celular pendente |
| Envio ao modelo autoral possuía taxa fixa de 500 Hz | Taxa passa a vir do pacote; compatibilidade exige identidade, máscaras e taxa explícita; backend continua bloqueado | Teste com clique e contador de chamadas igual a zero | Corrigido |
| Dataset Colab fabricava curva e caixas idênticas para todas as classes | Manifesto obrigatório de imagens anotadas e divisão por paciente; ausência de dados impede treinamento | Inspeção de código e compilação sintática Python | Treino não executado |

## Critérios e limitações das evidências

- O teste de integração usa imagem de ECG **renderizada programaticamente**, com pixels de traçado e rótulos; a API Canvas é simulada com recorte de pixels real. Não é validação fotográfica.
- O benchmark PTB-XL existente usa **um registro digital** convertido em imagem (derivação I), sem câmera. Métricas desse único caso não estimam desempenho em fotografias, outros layouts, outros fabricantes ou pacientes. O teste não possui OCR e, corretamente, sua auditoria clínica permanece indeterminada apesar da boa correspondência do sinal.
- A sequência espacial transladada testa bordas de folha detectadas em quadros sintéticos. Aproximação forte sem folha inteira produz “referência espacial perdida”; não há homografia robusta nem validação com movimento físico de smartphone.
- `technicalIndex` é índice experimental de estrutura de pixels, sem equivalência a porcentagem de fidelidade clínica.
- Não há fotografias hospitalares com sinal de referência, anotações visuais por paciente nem medições em iOS/Android neste ambiente. Faltam MAE, RMSE, SNR, correlação, cobertura, erro de calibração, identidade e falsa aceitação em **conjunto fotográfico independente**.
- As listas de Edge Functions dos projetos Supabase conectados **Studyos** e **luria-homologacao** foram consultadas; `ecg-signal-classifier` não aparece em nenhuma. Outros ambientes não foram inspecionados. O fluxo autoral continua bloqueado. Nenhum modelo de interpretação foi criado.

## Dados exigidos para o treino visual

`scripts/colab/luria_ecg_digitizer_training.py` requer `manifest.json`, lista de registros com `image_path`, `patient_id`, `lead` canônica e `bbox` normalizada `[x0,y0,x1,y1]` referente ao **recorte visual**. As imagens precisam conter rótulo visível e localização anotada, com variedade de layouts, iluminação, perspectiva, fabricantes e calibrações, além de direitos de uso documentados. O script separa pacientes entre treino, validação e teste retido. Arquivos `.hea/.dat` isolados servem ao benchmark sintético de digitalização e não fornecem rótulos visuais.

## Pendências de validação

1. Testar o modo ultrassensível, recaptura, sobreposição e zoom em navegadores móveis reais, inclusive perda e recuperação espacial com aproximação física.
2. Construir conjunto fotográfico legalmente utilizável com sinais originais e anotações independentes; medir métricas por derivação, layout, aparelho e condição de captura.
3. Substituir os cenários antigos ainda superficiais de interface por automação de navegador/aparelho; manter o teste de integração de pixels como evidência limitada.
4. Revisar clinicamente as associações e medidas antes de qualquer uso com exames reais. A aplicação continua experimental.

