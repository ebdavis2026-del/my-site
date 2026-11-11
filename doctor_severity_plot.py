import matplotlib.pyplot as plt

rows = [
    ("low", "Doc Dreamy", 24, 1.8),
    ("low", "Doc Duck", 12, 1.4),
    ("high", "Doc Dreamy", 10, 4.5),
    ("high", "Doc Duck", 24, 4.1),
]

dreamy_n = 24 + 10
duck_n = 12 + 24
dreamy_overall = (24 * 1.8 + 10 * 4.5) / dreamy_n
duck_overall = (12 * 1.4 + 24 * 4.1) / duck_n
naive_effect = duck_overall - dreamy_overall

print("Overall (naive):")
print(f"  Doc Dreamy: n={dreamy_n}, mean score={dreamy_overall:.2f}")
print(f"  Doc Duck:   n={duck_n}, mean score={duck_overall:.2f}")
print(f"  naive effect (Duck - Dreamy): {naive_effect:.2f}")
print()
print("Stratified (within severity):")
print("  low severity:  Dreamy 1.8 vs Duck 1.4 -> Duck better by 0.4")
print("  high severity: Dreamy 4.5 vs Duck 4.1 -> Duck better by 0.4")
print("  stratified effect: Doc Duck is better in both groups")

fig, ax = plt.subplots(figsize=[7, 4.3], layout="constrained")
x_map = {"low": 0, "high": 1}
colors = {"Doc Dreamy": "#4E79A7", "Doc Duck": "#E15759"}
markers = {"Doc Dreamy": "o", "Doc Duck": "^"}
offsets = {"Doc Dreamy": -0.12, "Doc Duck": 0.12}

for severity, doctor, n, mean_score in rows:
    x = x_map[severity] + offsets[doctor]
    ax.scatter(
        [x],
        [mean_score],
        s=80 + 4 * n,
        color=colors[doctor],
        marker=markers[doctor],
        zorder=3,
        label=doctor if severity == "low" else None,
    )
    ax.text(
        x,
        mean_score + 0.18,
        f"{mean_score}\n(n={n})",
        ha="center",
        va="bottom",
        fontsize=9,
    )

for severity, xpos in x_map.items():
    for doctor, color in colors.items():
        mean = next(m for s, d, n, m in rows if s == severity and d == doctor)
        ax.hlines(mean, xpos - 0.25, xpos + 0.25, colors=color, linestyles="--", linewidth=2)

ax.set_xticks([0, 1])
ax.set_xticklabels(["Low severity", "High severity"])
ax.set_ylabel("Mean post-surgical symptom score (lower is better)")
ax.set_title("Among Similar Patients, Doc Duck Scores 0.4 Lower (Better)")
ax.set_ylim(0.8, 5.3)
ax.legend(loc="upper left")
ax.grid(axis="y", alpha=0.3)
plt.show()
