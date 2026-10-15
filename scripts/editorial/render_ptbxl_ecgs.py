#!/usr/bin/env python3
"""Render real 12-lead PTB-XL WFDB format-16 waveforms to review-only WebP.

Dataset: PTB-XL v1.0.3 by Wagner et al. (2022), PhysioNet.
DOI: 10.13026/kfzx-aw45
License: CC BY 4.0: https://creativecommons.org/licenses/by/4.0/

WARNING: This tool does not interpret ECGs. The source clinical label must be
reviewed independently; plots are not approved for publication automatically.
No files are downloaded. The operator must obtain authorized dataset bytes.

Example:
  python scripts/editorial/render_ptbxl_ecgs.py \
    --dataset /data/ptb-xl/1.0.3 --manifest editorial-egcs.json \
    --output /tmp/luria-ecgs --limit-kb 120
"""
from __future__ import annotations

import argparse
import json
import math
import re
from pathlib import Path

import numpy as np
import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.ticker import MultipleLocator
from PIL import Image

LEAD_ORDER = [
    ["I", "AVR", "V1", "V4"],
    ["II", "AVL", "V2", "V5"],
    ["III", "AVF", "V3", "V6"],
]
ACCEPTED_LEADS = {item for row in LEAD_ORDER for item in row}
DATASET_ROOT = "https://physionet.org/files/ptb-xl/1.0.3"
LICENSE = "https://creativecommons.org/licenses/by/4.0/"
DATASET_CITATION = (
    "Wagner P, Strodthoff N, Bousseljot RD, Samek W, Schaeffter T. "
    "PTB-XL v1.0.3. PhysioNet 2022. doi:10.13026/kfzx-aw45."
)


def read_record(dataset_root: Path, record_id: str, resolution: int = 100) -> tuple[np.ndarray, int, list[str], Path]:
    """Read genuine PTB-XL 100/500Hz records, WFDB interleaved format 16."""
    if resolution not in (100, 500):
        raise ValueError("Resolution must be 100 or 500 Hz")
    if not re.fullmatch(r"\d{5}", record_id):
        raise ValueError("ecg_id must be exactly five digits; never pass path fragments")
    folder = dataset_root / f"records{resolution}" / f"{int(record_id)//1000*1000:05d}"
    stem = f"{record_id}_{'lr' if resolution == 100 else 'hr'}"
    header = folder / f"{stem}.hea"
    payload = folder / f"{stem}.dat"
    if not header.is_file() or not payload.is_file():
        raise FileNotFoundError(f"Missing header or signal: {header} / {payload}")
    lines = header.read_text(encoding="utf-8").splitlines()
    fields = lines[0].split()
    if len(fields) < 4 or fields[0] != stem:
        raise ValueError(f"Unexpected WFDB record header: {header}")
    n_leads, sampling, n_samples = map(int, fields[1:4])
    if n_leads != 12 or sampling != resolution or n_samples != resolution * 10:
        raise ValueError("Expected 12 leads and exactly ten seconds at chosen resolution")
    if len(lines) < 13:
        raise ValueError("Insufficient lead definitions")
    lead_names: list[str] = []
    gains: list[float] = []
    baselines: list[int] = []
    for line in lines[1:13]:
        cols = line.split()
        if cols[0] != f"{stem}.dat" or cols[1] != "16":
            raise ValueError("This safe reader supports single interleaved format-16 .dat only")
        match = re.fullmatch(r"([0-9.]+)\((-?\d+)\)/mV", cols[2])
        if match is None:
            raise ValueError(f"Unsupported ADC gain/baseline: {cols[2]}")
        gains.append(float(match.group(1)))
        baselines.append(int(match.group(2)))
        lead_names.append(cols[-1].upper())
    if len(set(lead_names)) != 12 or set(lead_names) != ACCEPTED_LEADS:
        raise ValueError(f"Missing, duplicate, or unexpected leads: {lead_names}")
    raw = np.fromfile(payload, dtype="<i2")
    if raw.size != n_samples * 12:
        raise ValueError(f"Unexpected sample count: {raw.size}")
    values = raw.reshape((n_samples, 12)).astype(np.float64)
    values = (values - np.array(baselines)[None, :]) / np.array(gains)[None, :]
    if not np.all(np.isfinite(values)):
        raise ValueError("Nonfinite voltage samples")
    return values, sampling, lead_names, header


def render_record(
    values: np.ndarray, sample_rate: int, lead_names: list[str], out: Path, limit_kb: int
) -> dict:
    """Plot *measured* time-voltage waveforms; fail rather than clip traces."""
    if values.shape != (sample_rate * 10, 12) or sample_rate not in (100, 500):
        raise ValueError("Unexpected PTB-XL signal shape or rate")
    lookup = {s: i for i, s in enumerate(lead_names)}
    # Every lead MUST use the same mV range. Independent y-axis autoscaling
    # would misrepresent voltage comparisons and hypertrophy criteria.
    max_mv = float(np.max(np.abs(values)))
    if not np.isfinite(max_mv) or max_mv > 50:
        raise ValueError("Nonfinite/out-of-range physical voltage; inspect source")
    common_ylim = max(2.0, math.ceil((max_mv + 0.1) * 2) / 2)
    chunk_samples = int(2.5 * sample_rate)
    fig, axs = plt.subplots(3, 4, figsize=(14.4, 9.0), dpi=140, sharey=True)
    for row in range(3):
        for col in range(4):
            name = LEAD_ORDER[row][col]
            ax = axs[row, col]
            clip = values[col * chunk_samples : (col + 1) * chunk_samples, lookup[name]]
            if clip.size != chunk_samples:
                raise ValueError("Time chunk missing")
            ax.set_ylim(-common_ylim, common_ylim)
            ax.set_xlim(0, 2.5)
            ax.xaxis.set_major_locator(MultipleLocator(0.2))
            ax.xaxis.set_minor_locator(MultipleLocator(0.04))
            ax.yaxis.set_major_locator(MultipleLocator(0.5))
            ax.yaxis.set_minor_locator(MultipleLocator(0.1))
            ax.grid(which="major", color="#d9bec4", linewidth=0.55)
            ax.grid(which="minor", color="#f3e1e5", linewidth=0.25)
            xx = np.arange(chunk_samples) / sample_rate
            ax.plot(xx, clip, color="#19212a", linewidth=0.75)
            ax.set_title(name, loc="left", fontsize=10, pad=0)
            ax.tick_params(left=False, bottom=False, labelleft=False, labelbottom=False)
            for spine in ax.spines.values():
                spine.set_visible(False)
    fig.suptitle(f"ECG clínico PTB-XL — 12 derivações, {sample_rate} Hz, escala mV uniforme", fontsize=13)
    fig.text(
        0.5, 0.016,
        f"Trechos sucessivos de 2,5 s por coluna • {sample_rate} amostras/s • "
        "mesma escala vertical em todas as derivações • reprodução digital, não papel calibrado",
        fontsize=7.2, ha="center",
    )
    fig.tight_layout(rect=(0, 0.045, 1, 0.965))
    out.parent.mkdir(parents=True, exist_ok=True)
    tmp = out.with_suffix(".png")
    fig.savefig(tmp, dpi=140, facecolor="white")
    plt.close(fig)
    im = Image.open(tmp).convert("RGB")
    tmp.unlink(missing_ok=True)
    max_bytes = limit_kb * 1024
    success = False
    size = im.size
    for width in (1800, 1600, 1440, 1280):
        height = round(size[1] * width / size[0])
        small = im.resize((width, height), Image.Resampling.LANCZOS)
        for quality in (88, 82, 75, 68, 60):
            small.save(out, "WEBP", quality=quality, method=6)
            if out.stat().st_size <= max_bytes:
                success = True
                break
        if success:
            break
    if not success:
        out.unlink(missing_ok=True)
        raise ValueError(f"Cannot produce legible image under {limit_kb} KB; review manually")
    return {"width":width,"height":height,"bytes":out.stat().st_size, "uniform_ylim_mv": common_ylim, "sampling_hz": sample_rate}


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--dataset", type=Path, required=True,
                        help="Existing verified PTB-XL v1.0.3 directory, no auto-download")
    parser.add_argument("--manifest", type=Path, required=True,
                        help="JSON list of {'ecg_id': '00001', 'learning_goal': '...'} entries")
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--limit-kb", type=int, default=120)
    parser.add_argument("--resolution", type=int, choices=(100, 500), default=100)
    args = parser.parse_args()
    if not 50 <= args.limit_kb <= 500:
        parser.error("limit-kb outside accepted editorial range")
    entries = json.loads(args.manifest.read_text(encoding="utf-8"))
    if not isinstance(entries, list) or not 1 <= len(entries) <= 25:
        parser.error("manifest must contain between 1 and 25 records")
    seen: set[str] = set()
    results: list[dict] = []
    for entry in entries:
        ecg_id = entry["ecg_id"]
        if ecg_id in seen:
            raise ValueError(f"Repeated record ID: {ecg_id}")
        seen.add(ecg_id)
        readings, hz, names, header = read_record(args.dataset, ecg_id, args.resolution)
        output = args.output / f"luria-ecg-ptbxl-{ecg_id}.webp"
        meta = render_record(readings, hz, names, output, args.limit_kb)
        results.append({
            "file":output.name,
            "ecg_id":ecg_id,
            "learning_goal":entry.get("learning_goal", ""),
            "dataset": "PTB-XL version 1.0.3",
            "record_header": f"{DATASET_ROOT}/records{args.resolution}/{header.parent.name}/{header.name}",
            "sampling_hz": hz,
            "uniform_vertical_mV_limit": max(2.0, math.ceil((float(np.max(np.abs(readings))) + 0.1) * 2) / 2),
            "license":LICENSE,
            "credit":DATASET_CITATION,
            "format": "real source waveform, derivative plot",
            "clinical_label_verified": False,
            "publication_approved": False,
            "patient_metadata_included": False,
            "image":meta,
        })
    report = args.output / "manifesto-revisao-imagens-ptbxl.json"
    report.write_text(json.dumps(results,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    print(f"Produced {len(results)} review-only ECG plots; images require clinician approval.")


if __name__ == "__main__":
    main()
