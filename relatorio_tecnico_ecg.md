# Relatório Técnico: Módulos de IA e Digitalização de ECG

## 1. Inventário de Módulos
A infraestrutura do projeto de ECG é fragmentada em módulos voltados para a aquisição da imagem e a leitura através da integração com o LLM (Gemini):

- **Aquisição e Digitalização:**
  - `assets/js/ecg-camera-map.js`: Fluxo mestre de captura de imagens, utilizando as APIs de mídia do navegador e gerindo o enquadramento.
  - `assets/js/ecg-local-camera.js`: Módulo voltado à captura local de alta qualidade, calculando parâmetros como luminosidade, textura e estabilidade do quadro em tempo real.
  - `assets/js/ecg-layout.js`: Analisa a geometria de regiões escuras (traçados) para inferir o arranjo da folha (linhas contínuas vs colunas) de maneira puramente visual no client-side.
  - `assets/js/ecg-frame-guide.js`: Componente que gera instruções visuais e de navegação em tempo real ("suba", "aproxime") usando estimativas espaciais e a API do `ecg-layout.js`.

- **Entrada e Saída / Classificador de IA:**
  - `assets/js/ecg-reader.js`: Módulo de leitura no navegador. Inspeciona a resolução da imagem submetida para detectar e rejeitar arquivos impróprios. Responsável por delegar a chamada criptografada para o backend de IA.
  - `supabase/functions/ecg-ai-reader/index.ts`: Edge Function remota que intermedeia o contato do cliente com a API do provedor LLM (Google Gemini). Efetua checagens do papel `admin`, valida metadados do payload da imagem, constrói e passa o prompt clínico restritivo e estrutura a saída final em JSON.

- **Utilitários e Permissões:**
  - `assets/js/ecg-admin-guard.js`: Portão de acesso em interface para administradores.
  - `assets/js/trabalho-ecg.js`: Cálculos de FC, QTc, e relatórios textuais utilitários que atuam isolados da IA.

## 2. Dependências
As dependências do lado do cliente para a funcionalidade do ECG compreendem as APIs Web nativas: `MediaDevices`, `Canvas API` (para amostragem de frames e contagem de brilho) e `FileReader` / `URL.createObjectURL` para digitalização provisória e preparação da imagem.
Nos testes automatizados, utiliza-se a ferramenta `node:test` e a biblioteca `jsdom` para simular o DOM da aplicação (mock de HTMLCanvasElement e navigator.mediaDevices) de maneira puramente determinística. A simulação da API isola perfeitamente o ambiente de produção.

## 3. Abordagem e Cobertura dos Testes
Para garantir um ecossistema de digitalização estável e a ausência de chamadas não intencionais à API, foi adotada a seguinte abordagem para novos testes reproduzíveis, alinhados com o inventário acima e executados com jsdom:

- **Calibração, Derivações e Artefatos Locais (`ecg-local-camera.test.cjs`):** Testes unitários do validador de frames isolando e aferindo os sinais de "Luz Excessiva", "Baixa Iluminação", "Falta de Foco" e "Quadro Estável", injetando pixels fixos no mock de Canvas.
- **Entrada e Saída do Classificador (`ecg-reader-classifier.test.cjs`):** Simulamos a cadeia de arquivos injetando arquivos `.png` falsos de baixa ou alta resolução no DOM e confirmamos que a rejeição pre-flight acontece devidamente (sem que os dados sigam em frente). Quando a imagem atende aos requisitos, realizamos mock da função RPC do Supabase para aferir que os achados vindos de volta da IA populam adequadamente o HTML na DOM.

As abordagens asseguraram a preservação total de checkpoints antigos e ausência de execução no ambiente remoto. Nenhuma credencial foi acessada, alterada ou revelada durante todo o processo de testabilidade.
