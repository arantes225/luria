# Leitor experimental de ECG — captura e índices (26/10/2026)

## Escopo implementado

- **Rápido:** seleção/fotografia de uma página de ECG.
- **Ultra sensível:** captura local sequencial de DI, DII, DIII, aVR, aVL, aVF, V1–V6; seleção de derivação para refazer uma foto e progresso 0–12.
- **Índice técnico de qualidade por imagem (0–100, experimental):** combina resolução em pixels, energia de bordas (aproximação de foco), contraste global e exposição. O processamento roda no navegador, sem enviar o arquivo para análise de qualidade.
- **Confiança do modelo:** exibida como **não disponível/não calibrada**. A API antiga devolve apenas classes textuais ("alta", "moderada", "baixa") criadas pelo modelo de linguagem; não convertemos isso em probabilidades nem em confiança clínica.
- **Modo pesquisa:** o envio da foto completa ao endpoint atual `ecg-ai-reader` exige confirmação explícita de que é material de teste, sem identificação pessoal. O endpoint ainda usa um modelo Gemini externo; **não é o modelo autoral de ECG treinado com PTB-XL**.
- **Sem inferência nas 12 fotos:** o modo por derivação NÃO combina imagens, não reconstrói sinal e não envia as capturas. A interpretação multiderivação depende de uma etapa posterior de digitalização validada.

## Limitações e segurança

Este é um protótipo de pesquisa. Não utilizar com pacientes reais, na assistência ou para definir condutas. O índice visual não verifica o nome verdadeiro da derivação, a preservação do ST, a calibração, a integridade de todos os complexos, a existência de artefatos clinicamente relevantes ou a adequação diagnóstica.

Um índice alto **não comprova** captura suficiente para ECG. Os pesos e limites de qualidade foram escolhidos como ponto de partida de engenharia e precisam de validação com impressões e fotografias pareadas aos sinais originais. Um número de "confiança do diagnóstico" só poderá ser mostrado quando houver calibração independente por achado/classe, dados fora da amostra e métricas auditáveis.

O modo detalhado mantém os arquivos apenas em memória no navegador enquanto a página estiver aberta; não faz upload nem grava banco de dados. Alterações de página ou atualização perdem as capturas.

## Checklist de verificação

1. Executar `node tests/ecg-image-quality.test.cjs`.
2. Abrir `/trabalho/ecg/` em desktop, iOS e Android com imagens **fictícias**.
3. No modo rápido, selecionar JPG/PNG/WebP, verificar prévia, score e sugestões. Verificar bloqueio de teste de IA sem consentimento, com arquivo muito ruim ou sem sessão.
4. No modo ultra sensível, capturar uma derivação por vez, confirmar avanço no progresso, refazer uma derivação, alternar modos e verificar que o envio por IA fica desativado.
5. Fotografar impressões com foco ruim, brilho exagerado, cortes e ângulos diversos; confrontar a pontuação com avaliação humana cega e revisar limiares antes de qualquer uso externo.
6. Validar a interface com zoom e tecnologias assistivas. Verificar no DevTools que a avaliação de qualidade não faz requisições de rede.
7. Não publicar como ferramenta clínica nem afirmar que a confiança está calibrada até haver testes externos e regularização sanitária aplicável.

## Próximas etapas técnicas

- Detecção real de bordas da folha, orientação, área de grade, etiquetas e pulso de calibração.
- Análise de qualidade **por traçado** e digitalização multiderivação, sem gerar curvas sintéticas quando ilegíveis.
- Comparar captura única versus capturas separadas em exames impressos de origens variadas, contra referência digital e revisão especializada.
- Integrar o modelo autoral local/on-device (quando pronto), exportação segura e mecanismo de abstenção nos casos insuficientes.
- Validar as saídas probabilísticas por classe e escolher limiares baseados em risco clínico, não valores arbitrários da interface.
