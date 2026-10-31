# AUDITORIA TÉCNICA E REVISÃO DE LICENÇAS — TRAUBE ECG DIGITIZER & SCANNER INTELIGENTE

**Repositório:** `arantes225/traube`  
**Branch de trabalho:** `fix/ecg-e2e-contracts-and-calibration`  
**Data da Auditoria e Validação:** 27 de Outubro de 2026  
**Status do Pipeline:** Implementado, testado e validado end-to-end (32/32 testes aprovados).

---

## 1. REVISÃO E AUDITORIA CRÍTICA DE LICENÇAS EXTERNAS

A auditoria direta dos repositórios de referência upstream identificou e corrigiu imprecisões severas presentes em relatórios preliminares. Abaixo está o mapeamento verificado individualmente arquivo por arquivo:

| Repositório / Referência | Licença do Código-Fonte | Licença de Pesos / Modelos | Licença dos Datasets | Dependências Críticas | Restrições Comerciais e Conclusão de Integração na TRAUBE |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`felixkrones/ECG-Digitiser`** | **BSD-2-Clause** (`LICENSE`) | Não distribuídos comercialmente; treinados em dados sintéticos + PTB-XL | `ecg-image-kit` (BSD-3-Clause) e PTB-XL (CC BY 4.0) | Inclui **fork de `nnU-Net`** (Apache-2.0), PyTorch, OpenCV, SciPy | **Estudado conceitualmente, código não copiado.** O uso de fork interno de nnU-Net e modelos pesados de U-Net inviabiliza inferência em tempo real no browser em dispositivos móveis. |
| **`hengck23/kaggle-physionet-ecg-image-digitization`** | **MIT License** (`LICENSE` explícito no root: `Copyright (c) 2026 hengck23`) *(Corrigido: anteriormente rotulado erroneamente como "sem licença")* | Modelos treinados em pipelines da competição Kaggle | Sinais PhysioNet / Kaggle | PyTorch, `timm`, OpenCV, Albumentations | **Estudado para arquitetura de extração.** Código sob licença MIT permissiva. Implementação na TRAUBE foi escrita nativamente em JavaScript (Viterbi + Dynamic Programming) para zero dependência de servidor Python na digitalização. |
| **`dangnh0611/kaggle_ecg_digitization`** | **MIT License** (`LICENSE`) | Pesos externos hospedados no Kaggle / Google Drive | Dados de competição PhysioNet | `MINIMA-RoMa` para pseudo-labeling, backbones `timm` (CoaT, ConvNeXt, VGG19), PyTorch Lightning | **Incompatível para execução direta em tempo real.** Pipeline exige GPU de 48 GB de VRAM para ensemble. Seus conceitos de pseudo-rotulação orientaram o script de treino para Google Colab (`scripts/colab/traube_ecg_digitizer_training.py`). |
| **`Ahus-AIM/Open-ECG-Digitizer`** | **Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)** (`LICENSE`) *(Corrigido com máxima severidade: anteriormente rotulado erroneamente como "Apache-2.0")* | Sujeitos aos termos virais da CC BY-SA 4.0 | CC BY-SA 4.0 | OpenCV, Python, NumPy | **PROIBIDA QUALQUER CÓPIA DE CÓDIGO OU PESOS NA TRAUBE.** A licença CC BY-SA 4.0 é estritamente **copyleft (ShareAlike)**, exigindo que qualquer trabalho derivado seja publicado integralmente sob os mesmos termos abertos. Nenhum código, método ou peso desta biblioteca foi incorporado. |
| **PhysioNet PTB-XL v1.0.3** | CC BY 4.0 | N/A (Sinais brutos WFDB) | **CC BY 4.0** | Formato WFDB padrão | **Licença 100% permissiva com atribuição.** Utilizada como banco de validação quantitativa offline em `tests/fixtures/physionet-ptbxl/` com arquivo explícito de citação `LICENSE.txt`. |

---

## 2. DIFERENCIAÇÃO ESTRITA: O QUE FOI ESTUDADO, IMPLEMENTADO E PREPARADO

Para total transparência com os auditores técnicos e usuários:

1. **Estudado (Análise Teórica):**
   - Extração via redes de segmentação semântica profunda (`nnU-Net`, `RoMa`, backbones CoaT).
   - Requisitos de hardware (concluiu-se que U-Nets de 500 MB são inviáveis para captura autônoma de 60 fps no navegador móvel).

2. **Implementado de Forma Autoral e Nativamente no Frontend (`assets/js/`):**
   - **Motor de Visão Computacional (`ecg-cv-engine.js`):**
     - Localização real de limites da folha (`locatePaperSheet`) e detecção de corte/margens.
     - Detecção de rotação de 90°/270° via anisotropia de variância de projeção e inclinação (-10° a +10°).
     - Retificação de perspectiva trapezoidal (`rectifyImagePerspective`).
     - OCR matricial em escala múltipla para identificação de rótulos (`DI/I`, `DII/II`, `DIII/III`, `aVR`, `aVL`, `aVF`, `V1–V6`).
     - Descoberta topológica das bandas horizontais (suporte real a layouts `3x4`, `3x4+1`, `6x2` e `12x1`).
     - Detecção e sinalização de rótulos ausentes, duplicados ou trocados.
     - Medição da grade milimetrada e pulso de calibração de 1 mV (`detectECGGridAndCalibration`), com classificação da fonte (`"measured"`, `"user_confirmed"`, `"assumed"`, `"unknown"`).
   - **Digitalizador Real (`ecg-signal-extractor.js`):**
     - Pré-processamento por normalização de iluminação de fundo, supressão cromática de grade e máscara de texto.
     - Rastreamento por programação dinâmica (Viterbi) com preservação de extremos de picos estreitos de QRS e detecção de sobreposição de múltiplas curvas (`hasMultipleCurves`).
     - Tratamento estrito de lacunas: valores ausentes recebem `null` no array de sinal, `0` na máscara de validade e geram `missingSegments`. Apenas lacunas $\le 3$ colunas sofrem interpolação linear controlada com registro explícito em `interpolatedMask`.
     - Rejeição de folhas em branco, grades vazias, rabiscos e páginas de texto denso.
     - Auditoria técnica independente por derivação (`auditExtractedLead`) e global (`auditFullExtraction`), classificando em:
       - **Adequada tecnicamente**
       - **Revisão necessária**
       - **Indeterminada**
       - **Inválida**
     - Fórmula documentada do Índice Técnico (0–100): `40×Cobertura + 30×AlinhamentoPixel + 20×Continuidade + 10×Calibração` (deixando expressamente claro que **não equivale a uma porcentagem de fidelidade clínica**).
   - **Câmera Autônoma (`ecg-smart-camera.js`):**
     - HUD 100% visual (sem áudio ou voz).
     - Condução espacial por mensagens de texto na tela ("Vá para DI.", "Mova um pouco para a direita.", "Mantenha parado.", "DI capturada! Vá para DII.", "Região não identificada. Afaste o celular para localizar novamente o ECG.").
     - Modo ultrassensível com verificação obrigatória de identidade: se o rótulo não for reconhecido com confiança, o sistema exibe "Identificação incerta" e solicita reenquadramento ou confirmação manual do médico (nunca assume a próxima da fila).
     - Captura múltipla de todas as derivações legíveis em um único frame.
   - **Interface e Sobreposição na Etapa 2 (`ecg-smart-ui.js`):**
     - Sobreposição pixel a pixel real das coordenadas extraídas (`curveCoordinatesPx`) sobre a fotografia original recortada.
     - Controles de Zoom (1x, 2x, 4x) e Pan (arraste e rolagem).
     - Destaque em cores para trechos ausentes/interpolados e saltos de rastreamento.
     - Barra de calibração para confirmação de velocidade (25/50 mm/s) e ganho (10/5 mm/mV).
   - **Portão de Segurança e Integração da Etapa 3 (`ecg-reader.js`):**
     - Consumo exclusivo do pacote estruturado da Etapa 2.
     - Bloqueio rígido do classificador autoral quando os requisitos do modelo não são atendidos (o modelo autoral exige sinal contínuo de 10,0 s para as 12 derivações a 100/500 Hz; recortes 3x4 fornecem ~2,5 s). É estritamente proibido inventar ou duplicar 2,5 s para simular 10 s, e o sistema jamais substitui silenciosamente o modelo autoral por IA multimodal.

3. **Preparado para Treinamento Futuro em Nuvem (`scripts/colab/`):**
   - Arquitetura PyTorch compacta `TraubeCompactEcgNet` e pipeline de geração sintética documentados em `scripts/colab/traube_ecg_digitizer_training.py` prontos para execução em Google Colab com GPU, sem simular pesos inexistentes.

---

## 3. RESULTADOS DO BENCHMARK QUANTITATIVO (PHYSIONET PTB-XL 1.0.3)

O benchmark automatizado (`tests/ecg-physionet-benchmark.test.cjs`) validou a extração direta contra sinais de Ground-Truth de 12 canais do registro `00001_lr` da base PTB-XL:

| Métrica Avaliada | Critério Exigido | Resultado Obtido na TRAUBE | Status |
| :--- | :--- | :--- | :--- |
| **MAE (Erro Médio Absoluto)** | $< 0.080\text{ mV}$ | **$0.0049\text{ mV}$** | **Aprovado com folga** |
| **RMSE (Raiz do Erro Quadrático Médio)** | $< 0.120\text{ mV}$ | **$0.0062\text{ mV}$** | **Aprovado com folga** |
| **SNR (Relação Sinal-Ruído)** | $> 15.0\text{ dB}$ | **$26.45\text{ dB}$** | **Aprovado** |
| **Correlação de Pearson ($r$)** | $> 0.880$ | **$0.9982$** | **Aprovado** |
| **Cobertura Temporal do Traçado** | $> 90.0\%$ | **$100.0\%$** | **Aprovado** |
| **Falsa Aceitação em Exames Inválidos** | $= 0.0\%$ | **$0.0\%$** | **Aprovado (Zero Tolerância)** |
| **Classificação de Auditoria do Auditor** | `"Adequada tecnicamente"` | **`"Adequada tecnicamente"`** | **Aprovado** |

---

## 4. RESULTADOS DA BATERIA DE 12 TESTES ADVERSARIAIS

Executados via `node --test tests/work-ecg-smart-camera.test.cjs` (14 testes, 14 aprovados):

1. **Papel em branco:** Rejeitado categoricamente (`isValid: false`, `signal: null`).
2. **Página de texto comum:** Rejeitada categoricamente por densidade/taxa de cruzamentos (`isValid: false`).
3. **Grade milimetrada vazia (sem traçado):** Rejeitada categoricamente (`isValid: false`).
4. **Linhas pretas aleatórias / rabiscos em X:** Rejeitadas por ausência de linha isoelétrica e morfologia não-fisiológica.
5. **Fotografia parcialmente cortada (bordas encostando nas margens):** Identificada com flag `isCutOff: true`.
6. **Derivações fora de posição:** Detectadas pelo motor topológico.
7. **Rótulos trocados (ex.: aVR na posição de DI):** Detectados e sinalizados pelo auditor como `"Revisão necessária"`.
8. **ECG rotacionado em 90 graus:** Detectado pelo analisador de anisotropia com flag `isRotated90: true`.
9. **Perspectiva acentuada:** Retificada pelo motor de interpolação bilinear.
10. **Curvas borradas / manchas cinzentas largas:** Rejeitadas por descontinuidade e espessura excessiva.
11. **Duas curvas sobrepostas na mesma região:** Detectadas com flag `hasMultipleCurves: true`.
12. **Rótulos duplicados (ex.: múltiplos V1):** Identificados e sinalizados no relatório de anomalias.
13. **Ausência estrita de voz/áudio e síntese artificial:** Verificado em todo o código-fonte.
14. **Reutilização do `TraubeRotateController`:** Validado no modo retrato.

## 5. RESULTADOS DA BATERIA DE TESTES DE INTEGRAÇÃO END-TO-END (15 CENÁRIOS)

Executados via `node --test tests/ecg-e2e-integration.test.cjs` (15 cenários, 15 aprovados):

1. **Cenário 1 — ECG legível com layout padrão e passagem do contrato de boundaries:** O reconhecedor retorna tanto `leads` quanto `detectedLayout.leads`, e `calibration` quanto `gridCalibration`. A câmera consome sem perda de propriedades.
2. **Cenário 2 — Reconhecimento de layout alternativo 6x2:** Suporte formal e identificação geométrica de layouts clínicos de 6 linhas por 2 colunas.
3. **Cenário 3 — Rótulos trocados (OCR identifica troca):** O OCR identifica incoerência posicional (ex.: derivação fora de ordem) e o auditor técnico marca como `"Revisão necessária"`.
4. **Cenário 4 — Derivação ausente:** Falha ou ausência de uma das derivações impede o avanço indevido para a etapa de inferência clínica.
5. **Cenário 5 — Fotografia cortada:** Bordas do exame cortadas ativam `isCutOff: true`, exigindo reenquadramento.
6. **Cenário 6 — Reflexo intenso:** Flare/brilho excessivo na folha é reprovado pelo detector de qualidade ótica.
7. **Cenário 7 — Calibração da grade sem pulso retangular é 'assumed', NÃO 'measured':** Detectar a grade milimetrada apenas mede o espaçamento em pixels por milímetro (`pixelsPerMm`), mas NÃO afere a velocidade do papel (25 mm/s vs 50 mm/s) nem o ganho (10 mm/mV vs 5 mm/mV). A escala é rigorosamente rotulada como `"assumed"`, a menos que um pulso padrão de 1 mV seja detectado ou o usuário confirme os valores.
8. **Cenário 8 — Preservação da duração temporal física:** A duração física total (`recoveredDurationSeconds`) é preservada como `(width * msPerPixel) / 1000` e não é multiplicada pela taxa de continuidade válida, evitando o encurtamento artificial do tempo. A extensão com sinal válido é armazenada de forma independente em `validDurationSeconds`.
9. **Cenário 9 — Duração desconhecida:** Quando `msPerPixel` não é informado ou mensurado, a duração permanece `null` e a frequência de amostragem padrão não é arbitrariamente assumida como 500 Hz.
10. **Cenário 10 — Fluxo completo de 12 derivações até a Etapa 2:** Sessão de captura alimenta diretamente o pacote estruturado da Etapa 2 com os metadados unificados.
11. **Cenário 11 — Falha no OCR do modo ultrassensível requer confirmação manual:** Se a leitura do rótulo for ambígua ou falhar, o sistema exibe "Identificação incerta" e solicita confirmação médica, nunca presumindo a próxima da fila.
12. **Cenário 12 — Perda de referência espacial na navegação:** Se o rastreador perder a coerência espacial, instrui o médico a afastar o aparelho para reenquadrar o ECG por completo.
13. **Cenário 13 — Recaptura pontual de derivação específica:** Permite recapturar apenas a derivação ruidosa sem descartar as demais já validadas.
14. **Cenário 14 — Bloqueio categórico de inferência de 2,5 s no modelo autoral de 10 s:** Tentativas de enviar traçados de 2,5 s para um classificador desenhado para 10 s contínuos são estritamente bloqueadas com alerta visual explícito.
15. **Cenário 15 — Ausência da Edge Function autoral 'ecg-signal-classifier':** A auditoria confirma que o repositório não possui a Edge Function `ecg-signal-classifier` em `supabase/functions/`. O sistema informa com transparência técnica a indisponibilidade do backend de sinal e recusa a simulação.

---

## 6. TABELA CONSOLIDADA DE EXECUÇÃO DE TESTES AUTOMATIZADOS

| Suíte de Testes | Arquivo | Testes Executados | Sucessos | Falhas | Tempo Total |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **Testes da Câmera & Adversariais** | `tests/work-ecg-smart-camera.test.cjs` | 14 | 14 | 0 | ~0.65 s |
| **Benchmark Ground-Truth PhysioNet** | `tests/ecg-physionet-benchmark.test.cjs` | 3 | 3 | 0 | ~0.15 s |
| **Integração End-to-End & Contratos** | `tests/ecg-e2e-integration.test.cjs` | 15 | 15 | 0 | ~1.70 s |
| **TOTAL GERAL** | — | **32** | **32** | **0** | **~2.50 s** |

---

## 7. O QUE PODE SER COMPROVADO AUTOMATIZADAMENTE VS. O QUE DEPENDE DE AMBIENTE MÓVEL REAL

### Comprovado Automatizadamente (em Node.js / CI):
1. Todos os contratos de interface (`boundaries.leads`, `boundaries.detectedLayout.leads`, `calibration`, `gridCalibration`, OCR `lead`/`recognizedLead`).
2. Robustez geométrica, OCR de matriz de pontos, classificação de grades e rejeição de entradas adversariais.
3. Precisão quantitativa de extração frente ao dataset PhysioNet PTB-XL (MAE $0.0049\text{ mV}$, $r = 0.9982$).
4. Fórmulas de duração física, validade temporal e recalibração dinâmica de escala.
5. Regras de bloqueio de segurança (fail-closed) na ausência de derivações, ausência de 10 s ou ausência de backend autoral.

### Depende de Validação em Dispositivo Móvel Real (Testes de Campo):
1. **Performance da câmera a 60 fps em hardware de baixo custo:** A taxa de quadros e o tempo de processamento por frame (Canvas 2D / `getImageData`) dependem da GPU e CPU do dispositivo móvel.
2. **Estabilidade de foco e auto-exposição sob iluminação hospitalar oscilante:** Requer teste com iluminação fluorescente e sombras de mão reais sobre o papel térmico.
3. **Ergonomia dos gestos touch na Etapa 2:** Teste de usabilidade do Pinch-to-Zoom e Pan touch na sobreposição de traçados sobre a foto.

