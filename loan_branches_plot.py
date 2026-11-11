import matplotlib.pyplot as plt

rows = [
    ("simple", "Branch North", 24, 2.8),
    ("simple", "Branch South", 8, 2.1),
    ("complex", "Branch North", 10, 5.3),
    ("complex", "Branch South", 32, 4.6),
]

# Naive (overall weighted) means
north_n = 24 + 10
south_n = 8 + 32
north_overall = (24 * 2.8 + 10 * 5.3) / north_n
south_overall = (8 * 2.1 + 32 * 4.6) / south_n
naive_effect = south_overall - north_overall

print("Overall (naive):")
print(f"  Branch North: n={north_n}, mean days={north_overall:.2f}")
print(f"  Branch South: n={south_n}, mean days={south_overall:.2f}")
print(f"  naive effect (South - North): {naive_effect:.2f}")
print()
print("Stratified (within application complexity):")
print("  simple:  North 2.8 vs South 2.1  -> South faster by 0.7")
print("  complex: North 5.3 vs South 4.6  -> South faster by 0.7")
print("  stratified effect: South is better in both groups")

fig, ax = plt.subplots(figsize=[7, 4.3], layout="constrained")
x_map = {"simple": 0, "complex": 1}
colors = {"Branch North": "#4E79A7", "Branch South": "#E15759"}
markers = {"Branch North": "o", "Branch South": "^"}
offsets = {"Branch North": -0.12, "Branch South": 0.12}

for complexity, branch, n, mean_days in rows:
    x = x_map[complexity] + offsets[branch]
    ax.scatter(
        [x],
        [mean_days],
        s=80 + 4 * n,
        color=colors[branch],
        marker=markers[branch],
        zorder=3,
        label=branch if complexity == "simple" else None,
    )
    ax.text(
        x,
        mean_days + 0.18,
        f"{mean_days}\n(n={n})",
        ha="center",
        va="bottom",
        fontsize=9,
    )

for complexity, xpos in x_map.items():
    for branch, color in colors.items():
        mean = next(m for c, b, n, m in rows if c == complexity and b == branch)
        ax.hlines(mean, xpos - 0.25, xpos + 0.25, colors=color, linestyles="--", linewidth=2)

ax.set_xticks([0, 1])
ax.set_xticklabels(["Simple applications", "Complex applications"])
ax.set_ylabel("Mean days to approval (lower is better)")
ax.set_title("Among Similar Applications, Branch South Is 0.7 Days Faster")
ax.set_ylim(1.5, 6.2)
ax.legend(loc="upper left")
ax.grid(axis="y", alpha=0.3)
plt.show()
