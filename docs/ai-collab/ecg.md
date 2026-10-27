# ECG — arquitetura do piloto

Atualizado em 27/10/2026. Descreve o código de `main` inspecionado; não é especificação clínica aprovada.

```text
PTB-XL / PTB-XL+ (PhysioNet) ── workflow manual ──> R2 privado
                                                   │
Aprender ECG ── sessão autenticada ──> ecg-r2-catalog ──> catálogo/URL de leitura curta

Trabalho/ECG ── câmera e revisão local ── envio explícito ──> ecg-ai-reader
  (admin)        (foto/layout; sem sinal digital)          (Supabase/Gemini)

Colab: pesquisa/treino separado; ainda sem modelo treinado ligado a esse fluxo.
Benchmark Cloudflare: PR #97 aberto, desativado por padrão; fora de `main`.
```

## Componentes observados

| Etapa | Código/registro | Limite atual |
| --- | --- | --- |
| Importação | `.github/workflows/import-physionet-r2.yml`; `docs/physionet-r2-import.md` | Manual, copia datasets públicos para R2; existência do workflow não comprova execução nem conteúdo do bucket. |
| Estudo | `aprender/ecg/index.html`; `supabase/functions/ecg-r2-catalog/index.ts` | Catálogo autenticado de PTB-XL/PTB-XL+ e URL assinada de leitura por 300 s, quando R2 está configurado. Não presume controle clínico pelo catálogo. |
| Captura Work | `trabalho/ecg/index.html`; `assets/js/ecg-camera-map.js`, `ecg-layout.js`, `ecg-frame-guide.js` | Câmera no aparelho, orientação e estimativa geométrica de faixas. Formato e identidade de derivação requerem revisão humana. Não extrai sinal calibrado. |
| Interpretação Work | `assets/js/ecg-reader.js`; `assets/js/ecg-admin-guard.js`; `supabase/functions/ecg-ai-reader/index.ts` | Envio explícito após revisão. A função exige usuário e `is_admin()` e usa `CLIENT_GEMINI` no backend. Resposta é apoio experimental, não diagnóstico. A disponibilidade/deploy da função deve ser verificada separadamente. |
| Benchmark proposto | [PR #97](https://github.com/arantes225/luria/pull/97), `docs/work-ecg-validation.md` naquela branch | Worker isolado, desligado e sem testes clínicos ou chamadas pagas documentadas no PR; não faz parte de `main`. |

`assets/js/ecg-local-camera.js` é um protótipo local separado; confirme qual script a página carrega antes de alterar o fluxo ativo. A rota de estudo e a ferramenta Work têm finalidades distintas.

## Pesquisa, treino e digitalização

O local de desenvolvimento citado para treino é Google Colab. Não foi encontrado em `main` um notebook, checkpoint, conjunto de métricas reproduzíveis, código de treinamento ou digitalizador de waveform integrado. A detecção de layout da câmera não deve ser chamada de digitalizador. Antes de registrar um resultado, anote em [status.md](status.md): fonte autorizada, versão da base, divisão treino/validação/teste, código/commit ou revisão do notebook, seed, métricas com denominadores/intervalos, artefato e hash, data e responsável pela revisão. Não copie dados ou pesos para GitHub.

## Portões para uso futuro

Exigir verificação de licença e atribuição das bases; privacidade e segurança do armazenamento; avaliação de qualidade e calibração da foto/sinal; validação externa e revisão médica; análise jurídica, LGPD e enquadramento regulatório. Os critérios e aprovações precisam de documentos próprios antes de qualquer uso com pacientes. Não inferir autorização clínica da existência de uma página, API ou resultado de laboratório.
