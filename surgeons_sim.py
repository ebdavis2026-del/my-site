import numpy as np
import pandas as pd

rng = np.random.default_rng(2026)
n = 1000
competence = rng.normal(loc=0, scale=1, size=n)
charisma = rng.normal(loc=0, scale=1, size=n)
surgeons = pd.DataFrame({"competence": competence, "charisma": charisma})
surgeons["score"] = surgeons["competence"] + surgeons["charisma"]
cutoff = surgeons["score"].quantile(0.9)
surgeons["prestigious"] = surgeons["score"] > cutoff
print(surgeons.head().round(2))
print("cutoff:", round(cutoff, 2))

r_all = surgeons["competence"].corr(surgeons["charisma"])
top = surgeons[surgeons["prestigious"]]
r_top = top["competence"].corr(top["charisma"])
print("all surgeons:", round(r_all, 2))
print("prestigious jobs:", len(top), round(r_top, 2))
rest = surgeons[~surgeons["prestigious"]]
r_rest = rest["competence"].corr(rest["charisma"])
print("everyone else:", len(rest), round(r_rest, 2))
