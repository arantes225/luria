#!/usr/bin/env python3
"""Gera o banco de teste de ECG por foto (determinístico, sem rede).

Fontes: registros PTB-XL de tests/fixtures/physionet-ptbxl (CC BY 4.0) renderizados
como papel de ECG 3x4 + ritmo, depois degradados como numa foto de celular.
Saída: <out>/<registro>__<degradacao>.jpg e <out>/manifest.json (verdade conhecida).
As imagens NÃO são versionadas; só este script e o manifesto gerado em CI/local.

Uso: python3 scripts/ecg-bank/make_bank.py <pasta_saida>
"""
import json, sys, pathlib
import cv2
import numpy as np

ROOT = pathlib.Path(__file__).resolve().parents[2]
FIX = ROOT / "tests/fixtures/physionet-ptbxl"
LEADS = ["I", "II", "III", "AVR", "AVL", "AVF", "V1", "V2", "V3", "V4", "V5", "V6"]
LABEL = {"I": "I", "II": "II", "III": "III", "AVR": "aVR", "AVL": "aVL", "AVF": "aVF",
         "V1": "V1", "V2": "V2", "V3": "V3", "V4": "V4", "V5": "V5", "V6": "V6"}
GRID = [["I", "AVR", "V1", "V4"], ["II", "AVL", "V2", "V5"], ["III", "AVF", "V3", "V6"]]
PX_MM = 6.0  # px por mm no ECG limpo (25 mm/s, 10 mm/mV)


def read_record(name):
    """Lê .hea/.dat formato 16 intercalado (PTB-XL 100 Hz). Retorna mV por derivação."""
    hea = (FIX / f"{name}.hea").read_text().splitlines()
    _, nsig, fs, nsamp = hea[0].split()[:4]
    nsig, fs, nsamp = int(nsig), int(fs), int(nsamp)
    gain = float(hea[1].split()[2].split("(")[0])
    raw = np.fromfile(FIX / f"{name}.dat", dtype="<i2").reshape(nsamp, nsig).astype(float)
    return {lead: raw[:, i] / gain for i, lead in enumerate(LEADS)}, fs


def render(sig, fs):
    W, H = 1800, 1100
    img = np.full((H, W, 3), 255, np.uint8)
    x0, y0, x1, y1 = 90, 70, W - 90, H - 70
    for x in range(x0, x1):
        d = (x - x0) / PX_MM
        if abs(d - round(d)) < 1e-6 or (x - x0) % int(PX_MM) == 0:
            img[y0:y1, x] = (225, 222, 250) if (x - x0) % int(PX_MM * 5) else (190, 185, 240)
    for y in range(y0, y1):
        if (y - y0) % int(PX_MM) != 0:
            continue  # só as linhas da grade (1 mm); antes pintava todas as linhas de pixel
        img[y, x0:x1] = (225, 222, 250) if (y - y0) % int(PX_MM * 5) else (190, 185, 240)
    rows_y = [y0 + 130 + i * 250 for i in range(4)]
    seg_px = int(2.5 * 25 * PX_MM)  # 2,5 s por coluna
    truth = {}
    for r in range(4):
        cy = rows_y[r]
        # pulso 1 mV (10 mm) por 5 mm de largura, colado ao início da linha
        px0 = x0 + 12
        pw, ph = int(5 * PX_MM), int(10 * PX_MM)
        cv2.polylines(img, [np.array([[px0, cy], [px0, cy - ph], [px0 + pw, cy - ph], [px0 + pw, cy]])], False, (20, 20, 20), 2)
        start = px0 + pw + 20
        cols = 4 if r < 3 else 1
        for c in range(cols):
            lead = GRID[r][c] if r < 3 else "II"
            cell_x = start + c * (seg_px + 25) if r < 3 else start
            n = (seg_px if r < 3 else seg_px * 4)
            s = sig[lead]
            seg = s[c * int(2.5 * fs):(c + 1) * int(2.5 * fs)] if r < 3 else s
            xs = np.linspace(0, len(seg) - 1, n)
            ys = np.interp(xs, np.arange(len(seg)), seg)
            pts = np.stack([cell_x + np.arange(n), cy - ys * 10 * PX_MM], 1).astype(np.int32)
            cv2.polylines(img, [pts], False, (25, 25, 25), 1, cv2.LINE_AA)
            cv2.putText(img, LABEL[lead] if r < 3 else "II", (cell_x + 4, cy + 95), cv2.FONT_HERSHEY_COMPLEX, 0.55, (10, 10, 10), 1, cv2.LINE_AA)
            truth[f"{lead}@{r}.{c}"] = {
                "lead": lead, "row": r, "col": c, "x0": int(cell_x), "baseline_y": int(cy), "samples": int(n),
                # curva verdadeira em pixels da imagem limpa (y cresce para baixo)
                "y": [round(float(v), 2) for v in (cy - ys * 10 * PX_MM)],
                "mv": [round(float(v), 4) for v in ys],
            }
    return img, truth


def persp(img, k):
    h, w = img.shape[:2]
    s = np.float32([[0, 0], [w, 0], [w, h], [0, h]])
    d = np.float32([[k * w, k * h * .6], [w - k * w * .3, 0], [w, h], [0, h - k * h * .5]])
    return cv2.warpPerspective(img, cv2.getPerspectiveTransform(s, d), (w, h), borderValue=(40, 40, 40))


def rot(img, a):
    h, w = img.shape[:2]
    return cv2.warpAffine(img, cv2.getRotationMatrix2D((w / 2, h / 2), a, 1), (w, h), borderValue=(30, 30, 30))


def shadow(img):
    h, w = img.shape[:2]
    return np.clip(img * np.tile(np.linspace(1, .55, w), (h, 1))[..., None], 0, 255).astype(np.uint8)


def noise(img, rng):
    return np.clip(img + rng.normal(0, 8, img.shape), 0, 255).astype(np.uint8)


def small(img, f):
    h, w = img.shape[:2]
    return cv2.resize(cv2.resize(img, None, fx=f, fy=f, interpolation=cv2.INTER_AREA), (w, h))


def main():
    out = pathlib.Path(sys.argv[1])
    out.mkdir(parents=True, exist_ok=True)
    manifest = {"px_per_mm_clean": PX_MM, "images": []}
    for name in ["00001_lr", "00002_lr"]:
        sig, fs = read_record(name)
        clean, truth = render(sig, fs)
        rng = np.random.default_rng(7)
        variants = {
            "clean": clean, "rot3": rot(clean, 3), "rot8": rot(clean, 8),
            "persp_leve": persp(clean, .04), "persp_forte": persp(clean, .10),
            "blur2": cv2.GaussianBlur(clean, (0, 0), 2), "sombra": shadow(clean),
            "ruido": noise(clean, rng), "res50": small(clean, .5),
            "celular": noise(shadow(cv2.GaussianBlur(persp(rot(clean, 3), .04), (0, 0), 1.2)), rng),
        }
        for tag, im in variants.items():
            fn = f"{name}__{tag}.jpg"
            cv2.imwrite(str(out / fn), im, [cv2.IMWRITE_JPEG_QUALITY, 55 if tag == "celular" else 80])
            manifest["images"].append({"file": fn, "record": name, "degradation": tag,
                                       "geometry_preserved": tag in ("clean", "sombra", "ruido", "blur2", "res50"),
                                       "truth_clean": truth})
    (out / "manifest.json").write_text(json.dumps(manifest))
    print(len(manifest["images"]), "imagens em", out)


if __name__ == "__main__":
    main()
