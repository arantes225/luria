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
