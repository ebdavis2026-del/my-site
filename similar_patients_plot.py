import pandas as pd
import matplotlib.pyplot as plt

url = "https://flyaflya.github.io/confounderChallenge/"
patients = pd.read_csv(url + "patients_data.csv")
similar = patients[patients["severity"].between(-1, 1)]
print(similar.groupby("doctor_name")["post_surgical_score"].agg(["count", "mean"]).round(2))

fig, ax = plt.subplots(figsize=[7, 4.3], layout="constrained")
ax.axvspan(-1, 1, color="khaki", alpha=0.35)
for name, color, marker in [("Doc Dreamy", "#4E79A7", "o"), ("Doc Duck", "#E15759", "^")]:
    docDF = patients[patients["doctor_name"] == name]
    ax.scatter(
        docDF["severity"],
        docDF["post_surgical_score"],
        color=color,
        marker=marker,
        alpha=0.75,
        label=name,
    )
    bandMean = similar.loc[
        similar["doctor_name"] == name, "post_surgical_score"
    ].mean()
    ax.hlines(bandMean, -1, 1, color=color, linestyle="--", linewidth=2)

ax.set_xlabel("Initial Patient Severity")
ax.set_ylabel("Post-Surgical Symptom Score (lower is better)")
ax.set_title("Among Similar Patients, Doc Duck Scores 0.29 Lower (Better)")
ax.legend(loc="upper left")
plt.show()
