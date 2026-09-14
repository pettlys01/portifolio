"""Recorta um objeto gerado sobre fundo escuro liso e salva webp com alfa.

Desfaz a mistura com a cor do fundo (I = a*F + (1 - a)*B), então as bordas
suaves e o brilho não ficam com halo — e, como o site é escuro, o que era
quase preto some sem aparecer recorte. Só a maior mancha conectada fica:
o reflexo no "chão" que o modelo desenha embaixo do objeto é descartado.

uso: python tools/cutout.py entrada.png saida.webp [largura_max] [cortar_abaixo]

cortar_abaixo (0–1): zera o que fica abaixo dessa altura — pra quando o
reflexo no chão encosta no objeto e não dá pra separar pela mancha.
"""
import sys
from collections import deque

import numpy as np
from PIL import Image, ImageFilter

src, dst = sys.argv[1], sys.argv[2]
max_w = int(sys.argv[3]) if len(sys.argv) > 3 else 640
cut_below = float(sys.argv[4]) if len(sys.argv) > 4 else None

im = np.asarray(Image.open(src).convert("RGB")).astype(np.float32) / 255
h, w, _ = im.shape
b = 20
border = np.concatenate([im[:b].reshape(-1, 3), im[-b:].reshape(-1, 3), im[:, :b].reshape(-1, 3), im[:, -b:].reshape(-1, 3)])
bg = np.median(border, axis=0)

diff = np.max(np.abs(im - bg), axis=2)
lo, hi = 0.05, 0.30
a = np.clip((diff - lo) / (hi - lo), 0, 1)
a = a * a * (3 - 2 * a)

if cut_below is not None:
    cut = int(cut_below * h)
    fade = np.clip((cut - np.arange(h)) / 8, 0, 1).astype(np.float32)
    a = a * fade[:, None]

# Maior componente conectado, medido numa grade reduzida (rápido em Python).
S = 256
small_img = Image.fromarray((a * 255).astype(np.uint8)).resize((S, S), Image.BILINEAR)
# Fecha frestas escuras finas (ex.: a borda preta da tela de um celular) antes
# de separar as manchas, senão a moldura vira um pedaço à parte e é descartada.
small = np.asarray(small_img.filter(ImageFilter.MaxFilter(5))) > 60
seen = np.zeros_like(small, dtype=bool)
best = None
for sy, sx in zip(*np.nonzero(small)):
    if seen[sy, sx]:
        continue
    comp = []
    q = deque([(sy, sx)])
    seen[sy, sx] = True
    while q:
        y, x = q.popleft()
        comp.append((y, x))
        for ny, nx in ((y + 1, x), (y - 1, x), (y, x + 1), (y, x - 1)):
            if 0 <= ny < S and 0 <= nx < S and small[ny, nx] and not seen[ny, nx]:
                seen[ny, nx] = True
                q.append((ny, nx))
    if best is None or len(comp) > len(best):
        best = comp
keep = np.zeros((S, S), dtype=np.uint8)
ys, xs = zip(*best)
keep[list(ys), list(xs)] = 255
keep_img = Image.fromarray(keep).filter(ImageFilter.MaxFilter(9)).resize((w, h), Image.BILINEAR).filter(ImageFilter.GaussianBlur(6))
a = a * (np.asarray(keep_img).astype(np.float32) / 255)

a3 = a[..., None]
fg = np.clip((im - (1 - a3) * bg) / np.maximum(a3, 1e-3), 0, 1)
fg[a < 1e-3] = 0

ys, xs = np.where(a > 0.08)
pad = 18
y0, y1 = max(ys.min() - pad, 0), min(ys.max() + pad, h)
x0, x1 = max(xs.min() - pad, 0), min(xs.max() + pad, w)
rgba = np.dstack([fg, a])[y0:y1, x0:x1]
out = Image.fromarray((rgba * 255 + 0.5).astype(np.uint8), "RGBA")
if out.width > max_w:
    out = out.resize((max_w, round(out.height * max_w / out.width)), Image.LANCZOS)
out.save(dst, "WEBP", quality=88, method=6)
print(dst, out.size)
