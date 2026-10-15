"""Safety tests for editorial PTB-XL waveform and selector tools.

Execute:
    python -m pytest -q scripts/editorial/tests/test_ptbxl_pipeline.py
These fixtures are ARTIFICIAL TEST SIGNALS and MUST NEVER be included
in the LURIA medical library or labeled as clinical ECGs.
"""
from __future__ import annotations

import csv
import importlib.util
import json
from pathlib import Path

import numpy as np
import pytest


SCRIPTS = Path(__file__).resolve().parents[1]


def import_script(name: str):
    path = SCRIPTS / f"{name}.py"
    spec = importlib.util.spec_from_file_location(name, path)
    assert spec is not None and spec.loader is not None
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


@pytest.fixture
def renderer():
    return import_script("render_ptbxl_ecgs")


@pytest.fixture
def selector():
    return import_script("select_ptbxl_candidates")


def make_synthetic_wfdb(root: Path, ecg_id: str, amplitude=0.3, bad_lead=False, resolution=100):
    """Create nonclinical sine wave test record in a WFDB 16-bit container."""
    folder = root / f"records{resolution}" / f"{int(ecg_id)//1000*1000:05d}"
    folder.mkdir(parents=True, exist_ok=True)
    path = folder / f"{ecg_id}_{'lr' if resolution == 100 else 'hr'}"
    hz, n = resolution, resolution * 10
    ts = np.arange(n) / hz
    mvolts = np.stack(
        [amplitude * np.sin(2*np.pi*(1.2+0.05*i)*ts) for i in range(12)],
        axis=-1,
    )
    digital = np.rint(mvolts * 1000).astype("<i2")
    digital.tofile(path.with_suffix(".dat"))
    leads = ["I", "II", "III", "AVR", "AVL", "AVF",
             "V1", "V2", "V3", "V4", "V5", "V6"]
    if bad_lead:
        leads[-1] = "V5"  # duplicate lead must fail closed
    header = [f"{path.name} 12 {hz} {n}"]
    for lead in leads:
        header.append(
            f"{path.name}.dat 16 1000.0(0)/mV 16 0 0 0 0 {lead}"
        )
    path.with_suffix(".hea").write_text("\n".join(header)+"\n")
    return path


def test_reader_protects_paths_and_nonstandard_leads(renderer, tmp_path):
    make_synthetic_wfdb(tmp_path, "00001", amplitude=0.3)
    vals, hz, leads, header = renderer.read_record(tmp_path, "00001")
    assert vals.shape == (1000, 12)
    assert hz == 100
    assert len(leads) == 12
    assert np.isclose(vals[0, 0], 0)
    with pytest.raises(ValueError):
        renderer.read_record(tmp_path, "../../etc/passwd")
    make_synthetic_wfdb(tmp_path, "00002", bad_lead=True)
    with pytest.raises(ValueError, match="duplicate|unexpected"):
        renderer.read_record(tmp_path, "00002")


def test_renderer_writes_test_webp_but_no_medical_label(renderer, tmp_path):
    make_synthetic_wfdb(tmp_path, "00003")
    values, fs, leads, _ = renderer.read_record(tmp_path, "00003")
    output = tmp_path / "scratch" / "test-not-clinical.webp"
    result = renderer.render_record(values, fs, leads, output, 120)
    assert output.exists()
    assert output.stat().st_size <= 120 * 1024
    assert result["width"] >= 1280
    assert result["bytes"] == output.stat().st_size


def test_nonfinite_millivolts_fail_closed(renderer, tmp_path):
    make_synthetic_wfdb(tmp_path, "00004", amplitude=0.4)
    values, fs, leads, _ = renderer.read_record(tmp_path, "00004")
    values[9, 1] = float('nan')
    with pytest.raises(ValueError, match="Nonfinite"):
        renderer.render_record(values, fs, leads, tmp_path / "test.webp", 120)


def test_original_500hz_wfdb_and_uniform_scale(renderer, tmp_path):
    make_synthetic_wfdb(tmp_path, "00005", amplitude=0.6, resolution=500)
    values, fs, leads, header = renderer.read_record(tmp_path, "00005", resolution=500)
    assert values.shape == (5000, 12)
    assert fs == 500 and header.name == "00005_hr.hea"
    output = tmp_path / "original-500hz-NOT-A-CLINICAL-ECG.webp"
    result = renderer.render_record(values, fs, leads, output, 120)
    assert output.exists() and result["bytes"] <= 120 * 1024
    assert result["uniform_ylim_mv"] >= 2.0
    with pytest.raises(FileNotFoundError):
        renderer.read_record(tmp_path, "00005", resolution=100)
    with pytest.raises(ValueError, match="Resolution"):
        renderer.read_record(tmp_path, "00005", resolution=123)


def test_selector_prefers_human_reviewed_fold_and_omits_personal_id(selector, tmp_path):
    statements = tmp_path / "scp_statements.csv"
    with statements.open("w", newline="") as fp:
        w = csv.writer(fp)
        w.writerow(["", "description", "rhythm"])
        w.writerow(["AFIB", "atrial fibrillation", "1"])
        w.writerow(["NORM", "normal", ""])
        w.writerow(["STACH", "sinus tachycardia", "1"])
    database = tmp_path / "ptbxl_database.csv"
    cols = [
        "ecg_id", "patient_id", "filename_lr", "scp_codes", "strat_fold",
        "validated_by_human", "electrodes_problems", "static_noise",
        "burst_noise", "baseline_drift"
    ]
    with database.open("w", newline="") as fp:
        w = csv.DictWriter(fp, fieldnames=cols)
        w.writeheader()
        w.writerow({
            "ecg_id":1,"patient_id":1271,
            "filename_lr":"records100/00000/00001_lr",
            "scp_codes":"{'AFIB': 100.0}","strat_fold":"10",
            "validated_by_human":"True"
        })
        w.writerow({
            "ecg_id":2,"patient_id":1272,
            "filename_lr":"records100/00000/00002_lr",
            "scp_codes":"{'NORM': 100.0}","strat_fold":"9",
            "validated_by_human":"True"
        })
        w.writerow({
            "ecg_id":3,"patient_id":1273,
            "filename_lr":"records100/00000/00003_lr",
            "scp_codes":"{'AFIB': 100.0}","strat_fold":"8",
            "validated_by_human":"True"
        })
        w.writerow({
            "ecg_id":4,"patient_id":1274,
            "filename_lr":"records100/00000/00004_lr",
            "scp_codes":"{'AFIB': 100.0}","strat_fold":"10",
            "validated_by_human":"True",
            "static_noise":"[0, 1]"
        })
    data = selector.make_candidates(database, statements, 2)
    assert sorted(r["ecg_id"] for r in data["records"]) == ["00001", "00002"]
    assert len(data["records"]) == 2
    assert all(r["publication_approved"] is False for r in data["records"])
    assert all(r["clinical_label_verified"] is False for r in data["records"])
    assert "patient_id" not in json.dumps(data)
    assert "AFIB" not in data["target_codes_without_candidates"]
    assert "STACH" in data["target_codes_without_candidates"]
    assert "CLBBB" in data["unavailable_target_codes"]


def test_selector_rejects_non_metadata_and_bad_paths(selector, tmp_path):
    p = tmp_path / "s.csv"
    p.write_text(",description\nNORM,normal\n", encoding="utf-8")
    db = tmp_path / "db.csv"
    db.write_text("ecg_id,patient_id,scp_codes\n1,1,\"{'NORM': 100}\"\n")
    with pytest.raises(ValueError, match="Missing required"):
        selector.make_candidates(db, p)
