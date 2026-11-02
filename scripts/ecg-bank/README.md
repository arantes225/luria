# Banco de teste do leitor de ECG por foto

Mede o motor (`assets/js/ecg-cv-engine.js`) em imagens que simulam foto de celular.
Nada aqui é validação clínica; mede só detecção, grade e calibração.

1. Sintético com verdade conhecida (PTB-XL 00001/00002, CC BY 4.0, de `tests/fixtures`):
   `python3 scripts/ecg-bank/make_bank.py /tmp/ecg-synth`
2. Públicas reais (BSD-3, sem sinal de referência):
   `git clone --depth 1 https://github.com/alphanumericslab/ecg-image-kit /tmp/eik`
   (usar `/tmp/eik/sample-data/ecg-images`)
3. Rodar: `node scripts/ecg-bank/run_bank.cjs <pasta> [--json saida.json]` (requer Pillow)

## Linha de base (2/nov/2026, commit 5178016)
- Públicas (52 imagens): detectadas 18 (35%); com >=10 células 11 (21%); grade 47; pulso 0; escala medida 0.
- Sintéticas (20): >=10 células 9; escala medida 0. (Correção: o "3 px/mm" registrado aqui antes era defeito do gerador, que pintava todas as linhas de pixel; ver abaixo.)
- Imagem real do usuário: 12/12 células e escala medida só na versão original e com sombra; rotação 3°, desfoque, resolução baixa e perspectiva leve falham.

## Evolução (>=10 células)
| Commit | Públicas (52) | Sintéticas (20) |
|---|---|---|
| 5178016 (base) | 11 | 9 |
| 444f5e2 (rótulo "I" sem conflito falso) | 23 | 11 |
| endireitamento por projeção da grade | 23 | 15 |

O endireitamento recupera 100% das rotações de 3° e 8° e a combinação "celular"
do primeiro registro; não muda as públicas porque quase nenhuma está inclinada.
Pendentes nas sintéticas: desfoque (sigma 2), sombra forte e a combinação "celular" do segundo registro.

## Critério estrito (a partir do commit seguinte ao dd5a6fc)
Sucesso = layout conhecido (3x4, 3x4+ritmo, 6x2, 12x1) e 10–12 células válidas.
O critério bruto (>=10 células) contava layouts inventados como "15x1" e inflava o placar.
`run_bank.cjs` agora usa as mesmas opções de foto da câmera (allowDensePreview/allowTopologyFallback).

| Etapa | Públicas, estrito (52) |
|---|---|
| Linha de base | 10 |
| Rótulo "I" sem conflito falso | 14 |
| Opções de foto corretas no banco | 18 |
| Filtro de faixas regulares (rede de passo constante) | 27 |
| Banco com layout 6 faixas = 3x4 + ritmo por padrão | 31 |
| Limite inferior da última linha principal | 35 |
| Limiar de traço das faixas relativo ao fundo (papel claro >= 215 mantém 142) | 43 (83%) |

Sintéticas: 16 de 20 (pendentes: desfoque sigma 2, combinação "celular", resolução 50% do registro 2).

## Correção do gerador sintético e medida de acurácia
O gerador pintava todas as linhas de pixel como grade, então o papel sintético não tinha
grade real e o motor media 3 px/mm. Corrigido: com a grade certa o motor mede 6 px/mm
(o valor verdadeiro) em clean, ruído, rotações e perspectiva leve. Sintéticas com a grade
corrigida: 13 de 20 (falham: desfoque, combinação "celular", perspectiva forte do registro 2,
resolução 50% do registro 2, rot3 do registro 1).

`node scripts/ecg-bank/accuracy.cjs <pasta>` compara o traçado extraído com o PTB-XL original
(imagens com geometria preservada). Resultado atual (clean e ruído, 12/12 derivações):
- Erro de rastreamento 0,6 a 0,7 px (≈ 0,01 mV na escala real), correlação 0,98 a 0,99.
- Razão de amplitude extraída/real 1,03 a 1,07 (superestima 3 a 7%).
- Com desfoque forte (res50) o período da grade dobra (12 px/mm no lugar de 6): risco de escala 2x.
- Escala segue `assumed` (pulso de calibração não detectado nas sintéticas).

## ATENÇÃO: correção do banco (extrator real)
Até o commit 97530a2, `run_bank.cjs` NÃO carregava `ecg-signal-extractor.js`. O motor lê
`global.TraubeEcgSignalExtractor` na hora da chamada; sem ele cai na checagem simplificada de
célula (`basicCellWaveformCheck`), que é bem mais permissiva que o app real. Todos os placares
acima (inclusive 43/52) refletem esse caminho simplificado. Com o extrator carregado, como no
navegador:

| Banco | Estrito (extrator real) |
|---|---|
| Públicas (52) | 24 (46%) |
| Sintéticas (20) | 13 |

Falhas públicas com o extrator real: 13 imagens "sem derivações válidas suficientes"
(continuidade de tinta 0,1 a 0,3 em fotos de traço fino; ou grade/sombra dominando, 0,88),
8 em 3x4 + ritmo com menos de 10 células, 4 de 2 a 3 tiras, 1 rótulo fora de posição, 1 parcial (ecg 8).
Os ganhos anteriores da validação de células, do filtro de faixas e do limiar das faixas
precisam ser reavaliados com o extrator real.

## Extrator: piso da regra de tinta densa 0,58 -> 0,30
Fotos com grade cinza têm densidade de tinta bruta > 8% e caem na regra "densa", que mantém
só os 12% mais escuros com piso de 0,58. O suavizamento [1 2 1]² reduz o contraste de um traço fino,
que ficava abaixo do piso e sumia (continuidade de tinta 0,1 a 0,3). Com piso 0,30:
públicas (extrator real) 24 -> 32 de 52 (62%); sintéticas inalteradas (13/20).
Subconjunto testado (13 falhas + 7 controles): 0,45 -> 9/20; 0,30 e 0,20 -> 12/20; escolhido 0,30.

## Medir o Gemini como "professor" de rótulos (rodar na sua máquina)
```
export GEMINI_API_KEY="..."        # só no seu terminal; nunca no repositório nem no chat
export GEMINI_MODEL="gemini-2.5-flash"   # opcional
python3 scripts/ecg-bank/make_bank.py /tmp/ecg-synth
node scripts/ecg-bank/gemini_eval.mjs /tmp/ecg-synth            # 20 imagens
node scripts/ecg-bank/gemini_eval.mjs /tmp/ecg-synth --only clean,rot3 --limit 6   # teste rápido
```
Usa SÓ imagens sintéticas (PTB-XL, CC BY 4.0, sem dado de paciente): a imagem é enviada ao Google.
Nunca use com ECG de paciente real. Saída: derivações lidas, correlação, MAE (mV), razão de amplitude,
% de derivações fiéis (r > 0,9 e amplitude 0,8 a 1,25) e tokens (para estimar custo).
`--dry` valida as métricas sem chamar a API (esperado 100%); `--dry-bad` envia resposta errada de
propósito (esperado 0%). Critério sugerido para o Gemini servir de professor: >= 80% de derivações
fiéis também nas imagens degradadas (rot3, rot8, persp_leve, ruido, sombra).
