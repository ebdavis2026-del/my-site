import numpy as np
import pandas as pd

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
