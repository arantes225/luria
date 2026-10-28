# Avaliação Técnica de Referências — Digitalização e Reconhecimento Espacial de ECG
**Documento Interno LURIA — Diretrizes de Visão Computacional e Propriedade Intelectual**
Data: 27 de Outubro de 2026

---

## 1. Contexto e Objetivo
O objetivo da LURIA é implementar um scanner de ECG que:
1. Identifique automaticamente a folha do ECG, a orientação do papel e as regiões das derivações (DI, DII, DIII, aVR, aVL, aVF, V1–V6 e tiras de ritmo).
2. Conduza o usuário em tempo real sem voz e sem avanços manuais fictícios.
3. Extraia o traçado de sinal **real** diretamente dos pixels/matriz da imagem recortada.
4. Rejeite categoricamente preenchimento sintético de ondas ou simulações de sinal.

---

## 2. Auditoria Técnica das Soluções e Avaliação de Licenças

### A. `felixkrones/ECG-Digitiser` (Vencedor George B. Moody PhysioNet Challenge 2024 - SignalSavants)
- **Licença do Código**: **BSD-2-Clause License** (permissiva e compatível com produtos proprietários, sem exigência de open source / copyleft).
- **Abordagem Técnica**:
  - **Alinhamento e Rotação**: Utiliza Transformada de Hough probabilística para detectar as linhas da grade milimetrada do papel e calcular o ângulo de inclinação $\theta$, aplicando rotação afim inversa para deskewing.
  - **Segmentação das Derivações**: Arquitetura U-Net compacta treinada para segmentar a máscara binária dos traçados de tinta frente à grade de fundo.
  - **Vetorização de Máscaras**: Coluna a coluna (ao longo do eixo do tempo), extrai o centróide ponderado dos pixels pretos da curva, convertendo coordenadas $(x, y)$ em série temporal $(t, mV)$ através da escala do papel (25 mm/s e 10 mm/mV).
- **Aplicabilidade na LURIA**:
  - As técnicas de alinhamento por Hough e vetorização por rastreamento de centróide vertical de pixels escuros são perfeitamente adaptáveis em algoritmos determinísticos locais (Canvas/WebAssembly/Web Worker), sem necessidade de pesos de terceiros.

### B. `hengck23/kaggle-physionet-ecg-image-digitization`
- **Licença do Código**: **Sem licença formal explícita no repositório**.
  - *Implicação de IP*: Sob o direito autoral padrão internacional, a ausência de arquivo LICENSE impede a cópia direta de código-fonte em produto proprietário sem permissão formal expressa do autor.
- **Abordagem Técnica**:
  - Detecção de caixas delimitadoras de derivações via detecção de texto/rótulos (DI, V1...) e regressão de coordenadas de início e fim da tira.
  - Normalização geométrica para compensar perspectivas cônicas de fotos de celular.
- **Aplicabilidade na LURIA**:
  - Utilizar **estritamente como referência metodológica/conceitual** para a lógica de delimitação de caixas de derivações e correção de rotação, sem copiar nenhum trecho de código.

### C. `dangnh0611/kaggle_ecg_digitization` (5º Lugar PhysioNet Kaggle)
- **Licença do Código**: **MIT License** (permissiva comercialmente, compatível com o ecossistema proprietário da LURIA).
- **Abordagem Técnica**:
  - Predição de mapas de calor (heatmaps) para pontos-chave da curva e configuração da grade milimetrada.
  - Alinhamento de distorções estruturais e modelo de refinamento para bordas e áreas de alta variação de amplitude (QRS).
- **Aplicabilidade na LURIA**:
  - O pipeline de extração coluna a coluna com refinamento para picos estreitos (QRS) oferece excelente fundamentação para o motor de digitalização real no navegador.

### D. `Ahus-AIM/Open-ECG-Digitizer`
- **Licença do Código**: **Apache-2.0 License** (permissiva, requer apenas aviso de copyright e atribuição).
- **Abordagem Técnica**:
  - Framework fim a fim para detecção de grade, segmentação de curvas e extração de valores de voltagem em milivolts.

---

## 3. Diretriz Arquitetural para o Extrator Real na LURIA

1. **Eliminação Total de Ondas Sintéticas**:
   - O extrator em tempo de execução opera diretamente no `ImageData` do canvas onde a derivação foi fotografada.
2. **Algoritmo Real de Extração de Curva**:
   - **Binarização Adaptativa Local**: Diferencia o traço de tinta preta/escura da grade de fundo vermelha/laranja/rosa através do canal de saturação e luminância:
     $$\text{Ink}(x, y) = (\text{Luma}(x, y) < 110) \land (\text{Red}(x, y) - \text{Blue}(x, y) < 40)$$
   - **Rastreamento de Curva Coluna a Coluna**: Para cada coluna de tempo $x \in [0, W]$, busca o centróide vertical $y$ dos pixels de tinta:
     $$y_{\text{sinal}}(x) = \frac{\sum_y y \cdot w(x, y)}{\sum_y w(x,y)}$$
   - **Mapeamento de Calibração**: Converte pixels para milivolts baseado na altura da grade (10 mm/mV) e velocidade (25 mm/s).
   - **Validação de Sinal Real**: Se uma região tiver menos de 15% de continuidade de pixels de traçado (como folha em branco, listras sem morfologia de ECG ou ruído extremo), o extrator classifica como **Inválido / Não Detectado** e **rejeita** a derivação.
3. **Portão de Segurança Estrito**:
   - A Etapa 3 (IA) recusa-se categoricamente a processar exames que contenham derivações ausentes ou sinais que falhem no teste de integridade física.
