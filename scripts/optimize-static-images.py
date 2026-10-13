#!/usr/bin/env python3
"""Optimize only safe UI PNGs in the deployment checkout.

Requires Pillow. Never modifies medical/diagnostic images. This runs against
the disposable deployment workspace, not the originals in the Git repository.
"""
from __future__ import annotations

import argparse
import io
from pathlib import Path

from PIL import Image, ImageOps

ICON_FOLDER = Path("assets/img/logos")
PWA_SIZES = (180, 192, 512)
OTHER_LOSSLESS_PNGS = (
    Path("assets/img/logos/favicon.png"),
    Path("assets/img/logos/logo-icone-original.png"),
    Path("assets/img/logos/logo-principal.png"),
    Path("assets/img/logos/logo-icone-azul-claro.png"),
    Path("assets/img/logos/logo-icone-rosa-escuro.png"),
    Path("assets/img/studyrats/acessórios/atras/capacete-astronauta.png"),
)


def png_data(image: Image.Image) -> bytes:
    output = io.BytesIO()
    image.save(output, format="PNG", optimize=True, compress_level=9)
    return output.getvalue()


def optimize_pwa_icons(root: Path) -> tuple[int, int]:
    """Generate correct native dimensions for each PWA icon."""
    icon = root / ICON_FOLDER / "pwa-icon-512.png"
    if not icon.is_file():
        raise FileNotFoundError(f"Missing PWA icon source: {icon}")
    with Image.open(icon) as src:
        src.load()
        # Keep alpha channels and preserve the entire image without cropping.
        master = src.convert("RGBA")

    total_before = total_after = 0
    for size in PWA_SIZES:
        target = root / ICON_FOLDER / f"pwa-icon-{size}.png"
        if not target.is_file():
            raise FileNotFoundError(f"Missing icon target: {target}")
        total_before += target.stat().st_size
        image = ImageOps.contain(master, (size, size), method=Image.Resampling.LANCZOS)
        if image.size != (size, size):
            square = Image.new("RGBA", (size, size), (0, 0, 0, 0))
            square.alpha_composite(image, ((size - image.width) // 2, (size - image.height) // 2))
            image = square
        data = png_data(image)
        with Image.open(io.BytesIO(data)) as check:
            check.verify()
        target.write_bytes(data)
        total_after += len(data)
        print(f"PWA icon {size}: {len(data):,} bytes")
    return total_before, total_after


def optimize_ordinary_pngs(root: Path) -> tuple[int, int]:
    """Lossless re-encode nonmedical PNGs only if it actually saves bytes."""
    before = after = 0
    for rel in OTHER_LOSSLESS_PNGS:
        file = root / rel
        if not file.is_file():
            continue
        original = file.read_bytes()
        before += len(original)
        try:
            with Image.open(io.BytesIO(original)) as source:
                source.load()
                original_mode = source.mode
                original_pixels = source.tobytes()
                encoded = png_data(source)
            with Image.open(io.BytesIO(encoded)) as check:
                check.load()
                if check.mode != original_mode or check.tobytes() != original_pixels:
                    print(f"SKIP {rel}: pixel check failed")
                    after += len(original)
                    continue
            if len(encoded) < len(original):
                file.write_bytes(encoded)
                after += len(encoded)
                print(f"Lossless {rel}: {len(original):,} -> {len(encoded):,} bytes")
            else:
                after += len(original)
        except Exception as exc:
            print(f"SKIP {rel}: {exc}")
            after += len(original)
    return before, after


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=Path("."))
    args = parser.parse_args()
    root = args.root.resolve()
    before, after = optimize_pwa_icons(root)
    b2, a2 = optimize_ordinary_pngs(root)
    print(f"Total processed UI PNGs: {before+b2:,} -> {after+a2:,} bytes "
          f"({before+b2-after-a2:,} bytes saved). Medical assets unchanged.")


if __name__ == "__main__":
    main()
