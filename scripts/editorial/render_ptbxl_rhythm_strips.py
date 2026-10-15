#!/usr/bin/env python3
"""Draw full 10-second lead II rhythm strips from original PTB-XL v1.0.3 500Hz WFDB files.

Real clinical signals only; labels are metadata candidates, NOT certified diagnoses.
Requires original files in records500, which are NOT bundled in this repository.
Usage:
 python scripts/editorial/render_ptbxl_rhythm_strips.py \
   --dataset /data/ptbxl --manifest scripts/editorial/ptbxl-14-ids-review.json \
   --output /tmp/review-rhythm --limit-bytes 120000

Data: Wagner et al., PTB-XL v1.0.3, PhysioNet, doi:10.13026/kfzx-aw45;
license CC BY 4.0. Outputs require licensed attribution and medical review.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import math
import re
from pathlib import Path

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.ticker import MultipleLocator
import numpy as np
from PIL import Image

from render_ptbxl_ecgs import (
    DATASET_CITATION, DATASET_ROOT, LICENSE, read_record,
)

def extract_lead_ii(values: np.ndarray, fs: int, names: list[str]) -> np.ndarray:
    """Return all *original* lead II values; never resample or synthesize."""
    if fs != 500 or values.shape != (5000, 12):
        raise ValueError("Require PTB-XL original 500Hz 10-second waveform")
    if len(names) != 12 or names.count("II") != 1:
        raise ValueError("Missing/ambiguous lead II")
    lead = np.asarray(values[:, names.index("II")], dtype=np.float64)
    if not np.isfinite(lead).all():
        raise ValueError("Nonfinite lead II")
    if float(np.max(np.abs(lead))) > 50:
        raise ValueError("Physically implausible range; inspect source")
    return lead


def render_strip(
    values: np.ndarray,
    fs: int,
    names: list[str],
    path: Path,
    limit_bytes: int = 120000,
) -> dict:
    if not 40000 <= limit_bytes <= 200000:
        raise ValueError("Editorial output limit out of bounds")
    y = extract_lead_ii(values, fs, names)
    max_abs = float(np.max(np.abs(y)))
    # No amplitude clipping. mV limits always included in manifest.
    bound = max(1.5, math.ceil((max_abs + 0.15) * 2) / 2)
    t = np.arange(y.size, dtype=np.float64) / fs
    fig, ax = plt.subplots(figsize=(17.0, 3.3), dpi=145)
    ax.set_xlim(0, 10)
    ax.set_ylim(-bound, bound)
    ax.xaxis.set_major_locator(MultipleLocator(0.2))
    ax.xaxis.set_minor_locator(MultipleLocator(0.04))
    ax.yaxis.set_major_locator(MultipleLocator(0.5))
    ax.yaxis.set_minor_locator(MultipleLocator(0.1))
    ax.grid(which="major", color="#e0b3bb", linewidth=0.5)
    ax.grid(which="minor", color="#f3e0e4", linewidth=0.22)
    ax.plot(t, y, color="#1e2730", linewidth=0.7, zorder=3, antialiased=True)
    # A 1mV calibration ruler and a 1s ruler are accurately defined in axes.
    # These are DIGITAL axes; resizing the rendered figure changes physical mm.
    ax.plot([0.08, 0.08], [-bound + 0.12, -bound + 1.12],
            color="#304b68", lw=1.4, zorder=5)
    ax.plot([0.08, 1.08], [-bound + 0.12, -bound + 0.12],
            color="#304b68", lw=1.4, zorder=5)
    ax.text(0.14, -bound + 1.12, "1 mV", color="#304b68", fontsize=8, va="bottom")
    ax.text(1.08, -bound + 0.12, "1 s", color="#304b68", fontsize=8, va="bottom")
    ax.set_xlabel("Tempo (segundos) • amostragem 500 Hz", fontsize=10)
    ax.set_ylabel("DII • milivolts", fontsize=10)
    ax.tick_params(axis="both", which="minor", length=0, labelsize=0)
    ax.tick_params(axis="both", which="major", labelsize=8, length=0)
    for spine in ax.spines.values():
        spine.set_visible(False)
    fig.suptitle(
        "DII contínua — 10 segundos reais (PTB-XL 500 Hz) • REVISÃO, NÃO HOMOLOGADO",
        fontsize=12, y=0.98
    )
    fig.text(
        0.5, 0.012,
        "Grade digital: 0,04/0,2 s e 0,1/0,5 mV • escala declarada • NÃO é papel físico calibrado",
        ha="center", fontsize=8
    )
    fig.subplots_adjust(left=0.055, right=0.99, bottom=0.19, top=0.86)
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_suffix(".png")
    fig.savefig(tmp, facecolor="white", dpi=145)
    plt.close(fig)
    with Image.open(tmp) as original:
        src = original.convert("RGB")
    tmp.unlink(missing_ok=True)
    size = src.size
    fit = None
    for width in (2400, 2200, 2000, 1800, 1600, 1400):
        height = round(size[1] * width / size[0])
        image = src.resize((width, height), Image.Resampling.LANCZOS)
        for q in (90, 85, 80, 74, 68, 60, 50):
            image.save(path, "WEBP", quality=q, method=6)
            bytes_now = path.stat().st_size
            if bytes_now <= limit_bytes:
                fit = {"width": width, "height": height, "bytes": bytes_now, "quality": q}
                break
        if fit is not None:
            break
    if fit is None:
        path.unlink(missing_ok=True)
        raise ValueError("Cannot render rhythm strip under size cap; do not force illegible image")
    return {
        **fit,
        "sampling_hz": 500,
        "samples": int(y.size),
        "seconds": 10,
        "lead": "II",
        "maximum_observed_absolute_mV": round(max_abs, 5),
        "vertical_limit_mV": float(bound),
        "digital_grid_minor_seconds": 0.04,
        "digital_grid_minor_mV": 0.1,
        "physical_paper_calibrated": False,
        "has_full_10s_contiguous_same_lead": True,
        "sha256_webp": hashlib.sha256(path.read_bytes()).hexdigest(),
    }


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--dataset", type=Path, required=True)
    ap.add_argument("--manifest", type=Path, required=True)
    ap.add_argument("--output", type=Path, required=True)
    ap.add_argument("--limit-bytes", type=int, default=120000)
    args = ap.parse_args()
    requests = json.loads(args.manifest.read_text(encoding="utf-8"))
    if not isinstance(requests, list) or not 1 <= len(requests) <= 25:
        raise ValueError("Expect a list of 1-25 ECG IDs")
    seen: set[str] = set()
    report: list[dict] = []
    for item in requests:
        ecg_id = item["ecg_id"]
        if not isinstance(ecg_id, str) or not re.fullmatch(r"[0-9]{5}", ecg_id):
            raise ValueError("Invalid ECG identifier")
        if ecg_id in seen:
            raise ValueError("Duplicate ECG identifier")
        seen.add(ecg_id)
        signals, hz, names, header = read_record(args.dataset, ecg_id, resolution=500)
        outfile = args.output / ("luria-ptbxl-" + ecg_id + "-DII-10s.webp")
        meta = render_strip(signals, hz, names, outfile, args.limit_bytes)
        report.append({
            "ecg_id": ecg_id,
            "file": outfile.name,
            "source": DATASET_ROOT + "/records500/" + header.parent.name + "/" + header.name,
            "source_dataset": "PTB-XL v1.0.3",
            "source_scp_learning_goal_unverified": item.get("learning_goal", ""),
            "credit": DATASET_CITATION,
            "license": LICENSE,
            "derived_visualization": "continuous original lead II waveform; digital grid; WebP",
            "signal_reviewed_by_independent_cardiologist": False,
            "clinical_diagnosis_approved": False,
            "image_approved_for_LURIA": False,
            "publication_allowed_in_workflow": False,
            "technical": meta,
        })
    dest = args.output / "MANIFESTO-DII-10S-REVIEW.json"
    dest.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    (args.output / "LEIA-ME-NAO-PUBLICAR.txt").write_text(
        "Sinais clinicos reais do PTB-XL v1.0.3, CC BY 4.0; eixos em mV/s.\n"
        "Cada imagem = 10 segundos continuos de DII em 500 Hz. Nao homologada.\n"
        "Revisar diagnostico/morfologia com cardiologista e verificar licenca/legenda.\n"
        "Nenhum render automatizado serve como laudo ou autorizacao de publicacao.\n"
        "Wagner P et al. doi:10.13026/kfzx-aw45.\n",
        encoding="utf-8"
    )
    print(f"{len(report)} continuous 10-second original lead II strips, NOT clinical approvals.")


if __name__ == "__main__":
    main()
