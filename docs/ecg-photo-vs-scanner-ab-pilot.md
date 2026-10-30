# LURIA ECG — Comparativo Foto normal vs Scanner guiado (piloto)

## Objetivo

Verificar se fotografar o ECG com o aplicativo nativo de camera do aparelho (sem identificacao dinamica de derivações) gera imagens melhores do que o scanner guiado atual da LURIA. Ambas as capturas seguem **o mesmo motor atual** de deteccao de folha, layout, extracao, auditoria e revisao. Portanto, melhorias atribuiveis ao modo de captura podem ser estudadas separadamente das falhas do extrator.

### Modos

1. **Foto normal:** `<input type="file" accept="image/*" capture="environment">` aciona, quando suportado pelo navegador, a camera traseira nativa. O usuario enquadra e tira a foto, confere a **imagem integral original** numa pagina sobreposta sem menu e decide processar ou refazer. Nao ha mira de papel, recorte fixo, captura automatica nem filtro. No desktop, o seletor de arquivos serve de alternativa.
2. **Scanner guiado:** preserva o modo automatico atual e suas orientacoes/algoritmos.
3. **Ultrassensivel:** preserva a captura focada por derivacao.
4. **Galeria:** continua permitindo importar foto existente.

### Integridade da imagem e privacidade

- **Novo controle manual dos 4 cantos:** apos fotografar, o usuario arrasta TL/TR/BR/BL sobre as quinas do papel; a regiao externa e excluida e a perspectiva e retificada por homografia projetiva real, sem depender de uma moldura fixa. Uma opcao separada permite processar a foto inteira para controle de comparacao. A delimitacao valida convexidade e tamanho; nao e autorizacao clinica para a extracao.
- **Tres condicoes A/B:** foto inteira sem delimitar; foto com papel marcado manualmente; scanner guiado. Anotar separadamente para identificar melhoria da camera ou da geometria.
- O arquivo original e mantido em memoria e visualizado via URL de objeto local. O fluxo desta etapa nao faz upload automatico do arquivo.
- Para limitar consumo de memoria, a copia utilizada pelo extrator atual tem maior dimensao de ate 2600 px. A foto original **nao e substituida**, mas a extracao nao utiliza sua resolucao integral se for maior. Essa escolha sera um parametro de benchmark, nao uma promessa de precisao.
- Sem pre-processamento de contraste intenso, B&W, nitidez artificial, preenchimento de trechos, remocao de grade ou correcoes de perspectiva adicionais nesta nova etapa. O processamento **existente** do digitalizador pode continuar retificando/detectando a folha.
- Nao exporta pesos, chaves, tokens ou dados clinicos automaticamente. Resultados do sistema ainda sao experimentais e nao estabelecem validacao clinica.

### O que o CamScanner divulga publicamente

O CamScanner divulga deteccao de bordas, corte, correcao de perspectiva, reducao de sombras, modos de melhoramento da imagem, ajuste manual e preservacao de foto original. Estas funcionalidades nao revelam o codigo privado nem os detalhes exatos do modelo. Fonte: https://www.camscanner.com/ e https://dev.camscanner.com/ e FAQ oficial https://www.camscanner.com/faq?category=create-save .

A referencia de implementacao aberta e o fluxo OpenCV com detectacao de contornos e transformacao de quatro pontos, https://opencv.org/smart-document-scanning-with-live-ocr-using-opencv-js/ . **Nao foi incorporado o algoritmo proprietario CamScanner nem uma homografia nova nesta entrega**: isso exige avaliacao isolada por fotografia para nao introduzir perda do traco por recorte incorreto.

### Protocolo de teste A/B (sem alteracoes no Supabase)

1. Usar os mesmos **10–20 ECGs** impressos ou conjuntos de teste, de preferência sem dados identificaveis. Para cada ECG, fotografar uma vez pelo modo normal e uma vez pelo scanner no mesmo celular, posicao e iluminacao.
2. Registrar modelo de celular, navegadores, dimensoes da imagem, tempo, tentativas, se todas as bordas foram capturadas e se as 12 derivacoes estao legiveis.
3. Para cada tentativa, contar quantas derivacoes foram extraidas e auditadas, porcentagem de recapturas e erro de identificacao. Quando houver sinal original pareado, medir SNR, MAE em mV e correlacao individual por derivacao.
4. Nao tratar correlação alta com poucos traçados aproveitados como sucesso. Comparar **taxa de ECGs completos e tecnicamente validos** e falhas totais.
5. Caso foto normal vença, testar um **segundo pipeline de scanner documental** (delimitação manual + homografia de quatro pontos) **como opçao**, mantendo foto original e interrompendo o procedimento se houver suspeita de recorte.
6. Nenhuma interpretacao clinica baseada apenas nas fotos do piloto.

### Limites conhecidos

- A qualidade final ainda depende do motor de extracão atual. Um modo de captura melhor nao corrige erros do reconhecedor de ECG.
- Nem todos os navegadores oferecem captura fotografica nativa ao usar atributo `capture`. Nesses casos, o seletor de arquivos continua disponivel.
- Esta entrega nao implementa algoritmo CamScanner, nem camera com enquadramento inteligente em tempo real, nem auto-crop da folha.
