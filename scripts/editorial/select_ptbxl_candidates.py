#!/usr/bin/env python3
"""Prepare review-only PTB-XL candidate records by real SCP-ECG annotations.

Do not infer an ECG diagnosis from a metadata code. The output is a list of
candidate examples for cardiologist visual review, not verified teaching cases.

Usage:
 python scripts/editorial/select_ptbxl_candidates.py \
   --database /data/ptb-xl/1.0.3/ptbxl_database.csv \
   --statements /data/ptb-xl/1.0.3/scp_statements.csv \
   --output /tmp/luria/ecg-candidates.json
"""
from __future__ import annotations

import argparse
import ast
import csv
import json
from collections import Counter
from pathlib import Path

PREFERRED_TARGETS = {
    "NORM": "ECG sem alterações relevantes (candidato)",
    "AFIB": "Ritmo irregular: fibrilação atrial (candidato)",
    "AFLT": "Ondas F: flutter atrial (candidato)",
    "SVTAC": "Taquicardia supraventricular (candidato)",
    "STACH": "Taquicardia sinusal (candidato)",
    "SBRAD": "Bradicardia sinusal (candidato)",
    "CLBBB": "Bloqueio completo de ramo esquerdo (candidato)",
    "CRBBB": "Bloqueio completo de ramo direito (candidato)",
    "1AVB": "Bloqueio AV de primeiro grau (candidato)",
    "2AVB": "Bloqueio AV de segundo grau (candidato)",
    "3AVB": "Bloqueio AV avançado/completo (candidato)",
    "IMI": "Achados anotados de infarto inferior, estágio indefinido (candidato)",
    "ASMI": "Achados anotados de infarto anterosseptal, estágio indefinido (candidato)",
    "LNGQT": "QT longo anotado (candidato)",
    "LVH": "Hipertrofia ventricular esquerda anotada (candidato)",
    "PVC": "Extrassístole ventricular anotada (candidato)",
    "PAC": "Extrassístole atrial anotada (candidato)",
}

CITATION = (
    "Wagner P et al. PTB-XL v1.0.3. PhysioNet (2022). "
    "https://doi.org/10.13026/kfzx-aw45"
)
SOURCE = "https://physionet.org/content/ptb-xl/1.0.3/"
LICENSE = "https://creativecommons.org/licenses/by/4.0/"


def read_statement_definitions(path: Path) -> set[str]:
    with path.open(encoding="utf-8", newline="") as fp:
        rows = csv.DictReader(fp)
        if not rows.fieldnames:
            raise ValueError("SCP statement definitions empty")
        # SCP code is the first CSV column, often unnamed.
        first = rows.fieldnames[0]
        return {str(row.get(first, "")).strip() for row in rows}


def parse_codes(source: str) -> dict[str, float]:
    raw = ast.literal_eval(source)
    if not isinstance(raw, dict):
        raise ValueError("SCP codes must be an explicit Python dict literal")
    result = {}
    for code, val in raw.items():
        if not isinstance(code, str) or not isinstance(val, (int, float)):
            raise ValueError("Invalid SCP code value")
        result[code] = float(val)
    return result


def as_bool(value: str) -> bool:
    return str(value).strip().lower() in {"1", "true", "yes", "t"}


def acceptable_signal(row: dict[str, str]) -> bool:
    """Conservative screen. Missing artifact annotations are NOT proof of quality."""
    for col in ("electrodes_problems", "static_noise", "burst_noise", "baseline_drift"):
        if str(row.get(col, "")).strip().lower() not in {"", "nan", "none", "[]", "false"}:
            return False
    return True


def make_candidates(database: Path, statements: Path, maximum: int = 2) -> dict:
    if not 1 <= maximum <= 5:
        raise ValueError("Maximum candidates per code must be between 1 and 5")
    available_codes = read_statement_definitions(statements)
    unknown = sorted(set(PREFERRED_TARGETS) - available_codes)
    if unknown:
        # Unknown code is omitted but explicitly reported as a missing class.
        target_codes = {k: v for k, v in PREFERRED_TARGETS.items() if k in available_codes}
    else:
        target_codes = dict(PREFERRED_TARGETS)
    candidates: dict[str, list[dict]] = {k: [] for k in target_codes}
    seen_patients: dict[str, set[str]] = {k: set() for k in target_codes}
    counts = Counter()

    with database.open(encoding="utf-8", newline="") as fp:
        rows = csv.DictReader(fp)
        needed = {"ecg_id", "filename_lr", "scp_codes", "strat_fold",
                  "validated_by_human", "patient_id"}
        if not needed.issubset(set(rows.fieldnames or [])):
            raise ValueError(f"Missing required PTB-XL metadata fields: {needed}")
        for row in rows:
            counts["total"] += 1
            if str(row.get("strat_fold", "")).strip() not in {"9", "10"}:
                continue
            if not as_bool(row.get("validated_by_human", "")):
                continue
            if not acceptable_signal(row):
                continue
            filename = str(row["filename_lr"]).strip()
            ecg_str = str(row["ecg_id"]).strip()
            try:
                ecg_id = f"{int(ecg_str):05d}"
            except ValueError:
                continue
            # Fail closed on unexpected paths, no traversal/remote path.
            expected_path = (
                f"records100/{int(ecg_id)//1000*1000:05d}/{ecg_id}_lr"
            )
            if filename != expected_path:
                continue
            patient = str(row["patient_id"]).strip()
            try:
                codes = parse_codes(str(row["scp_codes"]))
            except (SyntaxError, ValueError, TypeError):
                continue
            counts["quality_eligible"] += 1
            for code in target_codes:
                if code not in codes or patient in seen_patients[code]:
                    continue
                seen_patients[code].add(patient)
                candidates[code].append({
                    "ecg_id": ecg_id,
                    "learning_goal": target_codes[code],
                    "source_scp_code": code,
                    "source_scp_likelihood": codes[code],
                    "source_fold": int(row["strat_fold"]),
                    "source_validated_by_human": True,
                    "source_record_url": (
                        f"https://physionet.org/files/ptb-xl/1.0.3/"
                        f"{expected_path}.hea"
                    ),
                    "review_required": True,
                    "clinical_label_verified": False,
                    "publication_approved": False,
                })

    # Prefer higher annotated probability and fold 10 when comparable.
    selected = []
    for code, records in candidates.items():
        records.sort(
            key=lambda x: (
                -x["source_scp_likelihood"],
                -x["source_fold"],
                x["ecg_id"],
            )
        )
        selected.extend(records[:maximum])
    return {
        "dataset": "PTB-XL 1.0.3",
        "source": SOURCE,
        "license": LICENSE,
        "citation": CITATION,
        "screening": (
            "Clinical metadata candidates only: fold 9/10, validated_by_human, "
            "no flagged artefacts. Metadata and code labels are not final diagnoses."
        ),
        "records": selected,
        "unavailable_target_codes": unknown,
        "target_codes_without_candidates": [
            code for code, recs in candidates.items() if not recs
        ],
        "total_records_examined": counts["total"],
        "eligible_records_after_screening": counts["quality_eligible"],
        "not_checked": [
            "Individual trace morphology",
            "Clinical diagnosis versus automated report",
            "Image accuracy/legibility and artifact confirmation",
            "Each trace licensing/attribution and publication review",
        ],
    }


def main() -> None:
    p = argparse.ArgumentParser()
    p.add_argument("--database", type=Path, required=True)
    p.add_argument("--statements", type=Path, required=True)
    p.add_argument("--output", type=Path, required=True)
    p.add_argument("--per-code", type=int, default=2)
    args = p.parse_args()
    data = make_candidates(args.database, args.statements, args.per_code)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(
        json.dumps(data, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(
        f"{len(data['records'])} candidates; "
        f"{len(data['target_codes_without_candidates'])} codes unresolved. "
        "No diagnosis or image approved automatically."
    )


if __name__ == "__main__":
    main()
