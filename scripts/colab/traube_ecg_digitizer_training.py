"""Treino visual experimental por recortes de derivação anotados.

Este módulo NÃO usa .hea como rótulo visual. O benchmark de digitalização sintética
com sinais WFDB pertence a tests/ecg-physionet-benchmark.test.cjs. Treino visual
exige manifest.json com fotografias/escaneamentos, rótulos visíveis e caixas reais.
Nenhum modelo é treinado ou exportado na ausência desses dados.
"""

import os
import sys
import json
import argparse
import numpy as np
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
from PIL import Image

CANONICAL_LEADS = ["DI", "DII", "DIII", "aVR", "aVL", "aVF", "V1", "V2", "V3", "V4", "V5", "V6"]
LEAD_TO_IDX = {name: idx for idx, name in enumerate(CANONICAL_LEADS)}

# -------------------------------------------------------------------------
# 1. ARQUITETURA COMPACTA (ResNet-Lite com Cabeças de Rótulo e Bounding Box)
# -------------------------------------------------------------------------

class TraubeCompactEcgNet(nn.Module):
    """
    Rede Convolucional Compacta multitarefa projetada para inferência rápida no cliente (ONNX / WebAssembly):
    1. Cabeça de Classificação de Rótulo (12 classes de derivação).
    2. Cabeça de Regressão de Bounding Box (x_min, y_min, x_max, y_max normalizados entre 0 e 1).
    """
    def __init__(self, num_classes=12):
        super(TraubeCompactEcgNet, self).__init__()
        
        self.features = nn.Sequential(
            nn.Conv2d(1, 32, kernel_size=3, stride=2, padding=1),  # /2
            nn.BatchNorm2d(32),
            nn.ReLU(inplace=True),
            
            nn.Conv2d(32, 64, kernel_size=3, stride=2, padding=1), # /4
            nn.BatchNorm2d(64),
            nn.ReLU(inplace=True),
            
            nn.Conv2d(64, 128, kernel_size=3, stride=2, padding=1), # /8
            nn.BatchNorm2d(128),
            nn.ReLU(inplace=True),
            
            nn.Conv2d(128, 256, kernel_size=3, stride=2, padding=1), # /16
            nn.BatchNorm2d(256),
            nn.ReLU(inplace=True),
            
            nn.AdaptiveAvgPool2d((1, 1))
        )
        
        # Cabeça 1: Classificação do rótulo da derivação
        self.classifier_head = nn.Sequential(
            nn.Flatten(),
            nn.Dropout(0.35),
            nn.Linear(256, 128),
            nn.ReLU(inplace=True),
            nn.Linear(128, num_classes)
        )
        
        # Cabeça 2: Bounding Box (coordenadas relativas [0, 1])
        self.bbox_head = nn.Sequential(
            nn.Flatten(),
            nn.Linear(256, 64),
            nn.ReLU(inplace=True),
            nn.Linear(64, 4),
            nn.Sigmoid()
        )
        
    def forward(self, x):
        feat = self.features(x)
        logits = self.classifier_head(feat)
        bbox = self.bbox_head(feat)
        return {
            "logits": logits,
            "bbox": bbox
        }

# -------------------------------------------------------------------------
# 2. DATASET COM ANOTAÇÕES REAIS E/OU SINAIS WFDB DA PTB-XL
# -------------------------------------------------------------------------

class PtBxlAnnotatedEcgDataset(Dataset):
    """
    Recortes reais anotados. O nome legado é mantido para compatibilidade com notebooks.
    Cada registro precisa de image_path, patient_id, lead e bbox normalizada.
    """
    def __init__(self, record_list, img_size=(128, 256), augment=True):
        self.records = record_list
        self.img_h, self.img_w = img_size
        self.augment = augment

    def __len__(self):
        return len(self.records)

    def __getitem__(self, idx):
        record = self.records[idx]
        with Image.open(record["image_path"]) as source:
            image = source.convert("L").resize((self.img_w, self.img_h))
            img = np.asarray(image, dtype=np.float32)[None, :, :] / 255.0

        # Variações leves apenas no treino; rótulos e caixas nunca são sintetizados.
        if self.augment:
            img = np.clip(img * np.random.uniform(0.9, 1.1), 0.0, 1.0)

        target_class = torch.tensor(LEAD_TO_IDX[record["lead"]], dtype=torch.long)
        target_bbox = torch.tensor(record["bbox"], dtype=torch.float32)

        return torch.from_numpy(img), target_class, target_bbox

# -------------------------------------------------------------------------
# 3. PIPELINE DE TREINAMENTO E VALIDAÇÃO NO GOOGLE COLAB
# -------------------------------------------------------------------------

def load_annotated_manifest(data_dir):
    path = os.path.join(data_dir, "manifest.json") if data_dir and os.path.isdir(data_dir) else data_dir
    if not path or not os.path.isfile(path):
        raise ValueError("Treino bloqueado: forneça manifest.json com recortes visuais anotados; arquivos .hea isolados não bastam.")
    with open(path, "r", encoding="utf-8") as handle:
        records = json.load(handle)
    if not isinstance(records, list) or not records:
        raise ValueError("Treino bloqueado: manifesto de anotações vazio ou inválido.")
    base_dir = os.path.dirname(os.path.abspath(path))
    for index, row in enumerate(records):
        if not isinstance(row, dict) or not all(row.get(k) for k in ("image_path", "patient_id", "lead", "bbox")):
            raise ValueError(f"Anotação {index}: image_path, patient_id, lead e bbox são obrigatórios.")
        if row["lead"] not in LEAD_TO_IDX or len(row["bbox"]) != 4:
            raise ValueError(f"Anotação {index}: derivação ou caixa inválida.")
        x0, y0, x1, y1 = row["bbox"]
        if not (0 <= x0 < x1 <= 1 and 0 <= y0 < y1 <= 1):
            raise ValueError(f"Anotação {index}: bbox deve ser normalizada e não vazia.")
        row["image_path"] = os.path.abspath(os.path.join(base_dir, row["image_path"]))
        if not os.path.isfile(row["image_path"]):
            raise ValueError(f"Anotação {index}: imagem não encontrada.")
    return records


def split_by_patient(records):
    patients = sorted({str(row["patient_id"]) for row in records})
    if len(patients) < 3:
        raise ValueError("Treino bloqueado: são necessários ao menos 3 pacientes/registros distintos para treino, validação e teste isolados.")
    rng = np.random.default_rng(20261027)
    rng.shuffle(patients)
    n_train = max(1, int(len(patients) * 0.7))
    n_val = max(1, int(len(patients) * 0.15))
    if n_train + n_val >= len(patients):
        n_train = len(patients) - 2
        n_val = 1
    groups = [set(patients[:n_train]), set(patients[n_train:n_train+n_val]), set(patients[n_train+n_val:])]
    return [[row for row in records if str(row["patient_id"]) in group] for group in groups]


def run_training_pipeline(data_dir=None, epochs=3, batch_size=16, lr=1e-3, onnx_export_path=None):
    records = load_annotated_manifest(data_dir)
    train_records, val_records, test_records = split_by_patient(records)
    print(f"[TRAUBE-ECG] Recortes anotados: treino={len(train_records)}, validação={len(val_records)}, teste retido={len(test_records)}")
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"[TRAUBE-ECG] Dispositivo de execução: {device}")

    train_ds = PtBxlAnnotatedEcgDataset(train_records, augment=True)
    val_ds = PtBxlAnnotatedEcgDataset(val_records, augment=False)

    train_loader = DataLoader(train_ds, batch_size=batch_size, shuffle=True)
    val_loader = DataLoader(val_ds, batch_size=batch_size, shuffle=False)

    model = TraubeCompactEcgNet(num_classes=12).to(device)
    criterion_cls = nn.CrossEntropyLoss()
    criterion_box = nn.SmoothL1Loss()
    optimizer = optim.AdamW(model.parameters(), lr=lr, weight_decay=1e-4)

    metrics_log = []

    for epoch in range(epochs):
        model.train()
        train_loss = 0.0
        correct = 0
        total = 0

        for imgs, targets_cls, targets_box in train_loader:
            imgs = imgs.to(device)
            targets_cls = targets_cls.to(device)
            targets_box = targets_box.to(device)

            optimizer.zero_grad()
            out = model(imgs)

            loss_c = criterion_cls(out["logits"], targets_cls)
            loss_b = criterion_box(out["bbox"], targets_box)
            loss = loss_c + 2.5 * loss_b

            loss.backward()
            optimizer.step()

            train_loss += loss.item()
            preds = out["logits"].argmax(dim=1)
            correct += (preds == targets_cls).sum().item()
            total += targets_cls.size(0)

        train_acc = (correct / total) * 100

        # Validação
        model.eval()
        val_loss = 0.0
        val_correct = 0
        val_total = 0
        with torch.no_grad():
            for imgs, targets_cls, targets_box in val_loader:
                imgs = imgs.to(device)
                targets_cls = targets_cls.to(device)
                targets_box = targets_box.to(device)

                out = model(imgs)
                loss_c = criterion_cls(out["logits"], targets_cls)
                loss_b = criterion_box(out["bbox"], targets_box)
                val_loss += (loss_c + 2.5 * loss_b).item()

                preds = out["logits"].argmax(dim=1)
                val_correct += (preds == targets_cls).sum().item()
                val_total += targets_cls.size(0)

        val_acc = (val_correct / val_total) * 100
        epoch_info = {
            "epoch": epoch + 1,
            "train_loss": train_loss / len(train_loader),
            "train_acc": train_acc,
            "val_loss": val_loss / len(val_loader),
            "val_acc": val_acc
        }
        metrics_log.append(epoch_info)
        print(f"Epoch {epoch+1}/{epochs} - Train Loss: {epoch_info['train_loss']:.4f} (Acc: {train_acc:.1f}%) | Val Loss: {epoch_info['val_loss']:.4f} (Acc: {val_acc:.1f}%)")

    # Exportação para ONNX
    if onnx_export_path:
        model.eval()
        dummy_input = torch.randn(1, 1, 128, 256, device=device)
        torch.onnx.export(
            model,
            dummy_input,
            onnx_export_path,
            input_names=["input_image"],
            output_names=["logits", "bbox"],
            dynamic_axes={"input_image": {0: "batch_size"}, "logits": {0: "batch_size"}, "bbox": {0: "batch_size"}},
            opset_version=14
        )
        print(f"[TRAUBE-ECG] Modelo exportado com sucesso para ONNX: {onnx_export_path}")

    return {
        "model": model,
        "metrics_log": metrics_log
    }

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Pipeline de Treino TRAUBE ECG")
    parser.add_argument("--data_dir", type=str, default=None, help="Diretório dos arquivos WFDB/anotações")
    parser.add_argument("--epochs", type=int, default=1, help="Número de épocas")
    parser.add_argument("--batch_size", type=int, default=16, help="Tamanho do batch")
    parser.add_argument("--onnx", type=str, default=None, help="Caminho para exportação do modelo ONNX")
    args = parser.parse_args()

    run_training_pipeline(data_dir=args.data_dir, epochs=args.epochs, batch_size=args.batch_size, onnx_export_path=args.onnx)


