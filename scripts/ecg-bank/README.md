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
- Sintéticas (20): >=10 células 9; escala medida 0; px/mm medido 3 contra 6 real (período da grade em metade).
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
