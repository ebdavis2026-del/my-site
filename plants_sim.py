import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

rng = np.random.default_rng(11)
n = 100
pesticide = rng.binomial(n=1, p=0.5, size=n)
fungus = rng.binomial(n=1, p=0.8 - 0.6 * pesticide)
growth = 10 - 4 * fungus + rng.normal(loc=0, scale=1.5, size=n)
plants = pd.DataFrame({"pesticide": pesticide, "fungus": fungus, "growth": growth})

print(plants.head().round(2))
print(plants.groupby("pesticide")["growth"].mean().round(2))
print(pd.crosstab(plants["pesticide"], plants["fungus"]))
print(plants.groupby(["fungus", "pesticide"])["growth"].agg(["count", "mean"]).round(2))

overall = plants.groupby("pesticide")["growth"].mean()
print("naive effect (pesticide 1 - 0):", round(overall[1] - overall[0], 2))

fig, ax = plt.subplots(figsize=[7, 4.3], layout="constrained")
x_map = {0: 0, 1: 1}
colors = {0: "#4E79A7", 1: "#E15759"}
markers = {0: "o", 1: "^"}
offsets = {0: -0.12, 1: 0.12}
labels_done = set()

for (fung, pest), row in plants.groupby(["fungus", "pesticide"])["growth"].agg(["count", "mean"]).iterrows():
    x = x_map[fung] + offsets[pest]
    label = f"pesticide={pest}" if pest not in labels_done else None
    labels_done.add(pest)
    ax.scatter(
        [x],
        [row["mean"]],
        s=80 + 4 * row["count"],
        color=colors[pest],
        marker=markers[pest],
        zorder=3,
        label=label,
    )
    ax.text(
        x,
        row["mean"] + 0.25,
        f"{row['mean']:.2f}\n(n={int(row['count'])})",
        ha="center",
        va="bottom",
        fontsize=9,
    )
    ax.hlines(row["mean"], x_map[fung] - 0.25, x_map[fung] + 0.25, colors=colors[pest], linestyles="--", linewidth=2)

ax.set_xticks([0, 1])
ax.set_xticklabels(["No fungus", "Fungus present"])
ax.set_ylabel("Mean growth (higher is better)")
ax.set_title("Within Fungus Status, Pesticide Barely Changes Growth")
ax.legend(loc="upper right")
ax.grid(axis="y", alpha=0.3)
plt.show()
