import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

rng = np.random.default_rng(2026)
n = 1000
competence = rng.normal(loc=0, scale=1, size=n)
charisma = rng.normal(loc=0, scale=1, size=n)
surgeons = pd.DataFrame({"competence": competence, "charisma": charisma})
surgeons["score"] = surgeons["competence"] + surgeons["charisma"]
cutoff = surgeons["score"].quantile(0.9)
surgeons["prestige"] = surgeons["score"] > cutoff

r_all = surgeons["competence"].corr(surgeons["charisma"])
top = surgeons[surgeons["prestige"]]
rest = surgeons[~surgeons["prestige"]]
r_top = top["competence"].corr(top["charisma"])
r_rest = rest["competence"].corr(rest["charisma"])

print("DAG: Competence -> Prestige, Charisma -> Prestige")
print("all surgeons:", round(r_all, 2))
print("prestigious jobs:", len(top), round(r_top, 2))
print("everyone else:", len(rest), round(r_rest, 2))

fig, axes = plt.subplots(1, 2, figsize=[10, 4.5], layout="constrained")

# Left: DAG-style path diagram
ax = axes[0]
ax.set_xlim(0, 10)
ax.set_ylim(0, 10)
ax.axis("off")
ax.set_title("Collider DAG")

nodes = {
    "Competence": (2, 7.5),
    "Charisma": (8, 7.5),
    "Prestige": (5, 2.5),
}
for name, (x, y) in nodes.items():
    color = "#E15759" if name == "Prestige" else "#4E79A7"
    circle = plt.Circle((x, y), 1.1, color=color, alpha=0.25, ec=color, lw=2)
    ax.add_patch(circle)
    ax.text(x, y, name, ha="center", va="center", fontsize=11, fontweight="bold")

ax.annotate(
    "",
    xy=nodes["Prestige"],
    xytext=nodes["Competence"],
    arrowprops=dict(arrowstyle="->", color="#4dac26", lw=2),
)
ax.annotate(
    "",
    xy=nodes["Prestige"],
    xytext=nodes["Charisma"],
    arrowprops=dict(arrowstyle="->", color="#4dac26", lw=2),
)
ax.text(
    5,
    0.7,
    "Competence -> Prestige\nCharisma -> Prestige",
    ha="center",
    va="center",
    fontsize=10,
)

# Right: scatter showing collider bias
ax = axes[1]
ax.scatter(rest["competence"], rest["charisma"], alpha=0.25, s=18, color="#9aa0a6", label="everyone else")
ax.scatter(top["competence"], top["charisma"], alpha=0.85, s=28, color="#E15759", label="prestige")
ax.set_xlabel("Competence")
ax.set_ylabel("Charisma")
ax.set_title(
    f"All r={r_all:.2f} | Prestige r={r_top:.2f} | Else r={r_rest:.2f}"
)
ax.legend(loc="upper right")
ax.grid(alpha=0.3)

plt.show()
