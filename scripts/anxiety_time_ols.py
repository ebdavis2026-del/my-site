import pandas as pd
import statsmodels.formula.api as smf

five = pd.DataFrame({
    "person": ["Alice", "Bob", "Charlie", "Diana", "Eve"],
    "stress": [2, 4, 6, 8, 10],
    "time": [1, 3, 2, 5, 4],
    "anxiety": [3, 7, 8, 12, 11],
})
fit_time = smf.ols("anxiety ~ time", data=five).fit()
print(fit_time.params.round(3))
print("R-squared:", round(fit_time.rsquared, 3))

five = five.assign(
    predicted=fit_time.fittedvalues,
    error=lambda df: df["anxiety"] - df["predicted"],
)
print(five.round(2))
print("SSE:", round((five["error"] ** 2).sum(), 2))

print("\n--- anxiety ~ stress + time ---")
fit_both = smf.ols("anxiety ~ stress + time", data=five).fit()
print(fit_both.params.round(3))
print("R-squared:", round(fit_both.rsquared, 3))
