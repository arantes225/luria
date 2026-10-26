# LURIA ECG — piloto de captura móvel (iOS e Android)

**Status: experimental, sem capacidade diagnóstica.** Projeto de captura nativa de foto de ECG impresso, destinado a validar a experiência de câmera em aparelhos reais. **Não usar para decidir condutas clínicas com pacientes.**

## O que existe
- Interface independente empacotada localmente, sem `server.url` apontando para website remoto.
- Câmera nativa e seleção de galeria com `@capacitor/camera`; fallback de input para navegador.
- Prévia, rotação de 90 graus, inspeção preliminar de brilho/contraste e resolução; remoção de referência da imagem.
- Não há Supabase, Gemini, API de LLM, telemetria, armazenamento de imagem na LURIA ou modelo ONNX embutido.
- A câmera/plataforma nativa pode criar cópias temporárias do arquivo fora da memória do JavaScript, conforme o comportamento do sistema operacional. Não prometer eliminação completa desses temporários.

## Requisitos
- Node.js 22+ e npm.
- iOS: macOS e Xcode compatível com Capacitor 8; conta de desenvolvimento e assinatura para distribuição.
- Android: Android Studio, SDK e dispositivo/emulador.

## Build e instalação
Em `mobile/ecg-pilot`:

```sh
npm install
npm run test
npm run build
npx cap add ios       # em um Mac, só na primeira vez
npx cap add android   # somente na primeira vez
npx cap sync
npx cap open ios      # abrir Xcode e instalar no dispositivo de teste
npx cap open android  # abrir Android Studio e instalar no dispositivo de teste
```

Executar `npm run sync` após alterações de código web. Os diretórios nativos `ios/` e `android/` **ainda precisam ser gerados e conferidos**; não foi gerado um IPA/AAB nesta etapa.

### Permissões de câmera no iOS
Adicionar ao `ios/App/App/Info.plist` após `cap add ios`:

```xml
<key>NSCameraUsageDescription</key>
<string>A LURIA usa a câmera para fotografar ECGs impressos durante testes de pesquisa.</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>A LURIA acessa uma foto escolhida pelo usuário para pré-visualização local do ECG.</string>
<key>NSPhotoLibraryAddUsageDescription</key>
<string>A LURIA poderá salvar fotos na biblioteca apenas se essa função for implementada e autorizada no futuro.</string>
```

Neste piloto, `saveToGallery` é falso e não há função para salvar na biblioteca. Revisar se a permissão de adição é realmente necessária antes da publicação.

**Importante:** `com.luria.ecg.capturepilot` é ID **provisório de desenvolvimento**. Registrar e substituir por um bundle ID oficial de titularidade da empresa antes de assinar/publicar. Definir ícones, splash, privacy manifest do iOS, dados de privacidade nas lojas, testes de acessibilidade, fluxos de autenticação e políticas de compras antes de qualquer submissão.

## Testes em aparelhos reais (pendentes)
1. Safari iPhone, app Capacitor iPhone, Chrome Android e app Android.
2. Foto pela câmera e seleção de galeria; câmera traseira, orientação, botões, negação de permissão e cancelamento.
3. JPEG, HEIC, PNG, fotos muito grandes, pouca memória e interrupção/troca de apps.
4. Desligar internet após instalação e conferir ausência de chamadas de saída no piloto.
5. Inspecionar arquivos temporários e comportamento de limpeza nativa; testar permissões restritas.
6. Conferir zoom, teclado, leitor de tela, safe areas, iluminação e contraste.
7. Testar apenas com ECGs sintéticos ou desidentificados, com protocolo aprovado para pesquisa.

## Pendências para interpretação de fotos
A rede atual LURIA ECG recebeu sinais digitais `[12, 1000]` (100 Hz por 10 s), não fotos. Impressos 3×4 podem ter 2,5 s por derivação. Antes de conectar pesos do modelo:
- detectar folha, endireitar perspectiva, identificar disposição das derivações e calibração;
- separar grade/artefatos, reconstruir sinais em mV e tempo com máscaras de regiões não observadas;
- medir erro de digitalização e incerteza nos diferentes modelos de papel/equipamento;
- treinar/validar uma rede adaptada à duração real e aos artefatos de foto;
- avaliar em bases independentes com revisão clínica, LGPD/segurança e enquadramento regulatório (Anvisa);
- realizar conversão ONNX e ensaios de CPU/memória em iPhone e Android.

O leitor legado `assets/js/ecg-reader.js` envia imagens à função `ecg-ai-reader`, que usa Gemini; **não foi migrado e não deve ser utilizado com ECGs reais de pacientes sem avaliação contratual e regulatória.**

## Integração futura
A LURIA atual é um PWA/site estático amplo; este é um piloto de câmera independente. Para a App Store, planejar integrações nativas genuínas, experiência completa e assinaturas segundo as regras da loja. Este piloto isolado **não é um aplicativo pronto para publicar**.
