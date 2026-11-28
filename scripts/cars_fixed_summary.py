from pathlib import Path

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

here = Path(__file__).resolve().parent

url = ("https://raw.githubusercontent.com/flyaflya/"
       "decAdvocacyChallenge/main/carsFixed.csv")
cars = pd.read_csv(url)
print(cars.head())
print(cars.shape)

summary = (cars.groupby(["shopID", "boss"])["carsFixed"]
           .agg(days="count", average="mean")
           .round(2))
print(summary)

# Side-by-side bars: each shop's average carsFixed with boss away vs present
by_shop = summary["average"].unstack("boss")
shops = by_shop.index.astype(str)
x = range(len(shops))
width = 0.36

fig, ax = plt.subplots(figsize=(8, 4.5))
ax.bar([i - width / 2 for i in x], by_shop[0], width, label="Boss away (0)", color="#4C78A8")
ax.bar([i + width / 2 for i in x], by_shop[1], width, label="Boss present (1)", color="#F58518")
ax.set_xticks(list(x), [f"Shop {s}" for s in shops])
ax.set_ylabel("Average cars fixed")
ax.set_title("Cars fixed by shop — stratified on boss")
ax.legend()
ax.set_ylim(0, max(by_shop.max()) * 1.15)
for i, shop in enumerate(shops):
    ax.text(i - width / 2, by_shop.loc[int(shop), 0] + 0.8, f"{by_shop.loc[int(shop), 0]:.1f}",
            ha="center", va="bottom", fontsize=8)
    ax.text(i + width / 2, by_shop.loc[int(shop), 1] + 0.8, f"{by_shop.loc[int(shop), 1]:.1f}",
            ha="center", va="bottom", fontsize=8)
fig.tight_layout()

out = here / "cars_fixed_by_shop.png"
fig.savefig(out, dpi=150)
print(f"saved {out}")
plt.close(fig)

# Jittered scatter: every day, Patrick away vs there
rng = np.random.default_rng(42)
fig, ax = plt.subplots(figsize=[9, 4.5], layout="constrained")
for boss, color, offset, label in [(0, "lightgrey", -0.18, "Patrick away"),
                                   (1, "darkorchid", 0.18, "Patrick there")]:
    days = cars[cars["boss"] == boss]
    x = days["shopID"] + offset + rng.uniform(-0.12, 0.12, len(days))
    ax.scatter(x, days["carsFixed"], s=22, color=color, label=label)
ax.set_xticks(range(1, 6), [f"Shop {i}" for i in range(1, 6)])
ax.set_ylabel("Cars fixed that day")
ax.legend(loc="lower right")
ax.set_title("Your days add the most cars at Shops 4 and 2; Shop 3 gains the least",
             loc="left")
out = here / "patrick.png"
fig.savefig(out, dpi=150)
print(f"saved {out}")
plt.close(fig)
