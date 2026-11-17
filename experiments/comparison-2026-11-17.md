# Écalc v1 versus experimental v2 — first comparison

Date: 2026-11-17

**Status:** Exploratory engineering comparison, NOT clinical validation. No insulin or Loop dosing recommendations. Neither model is validated as a prediction of glucose absorption.

## Execution

Local Node.js 22 run of the v2 model and tests corresponding to `experiments/model-v2.js` and `tests/model-v2.test.js`:
- 4,851 nutrient combinations (carbohydrate 0–100 g in 10 g steps, fat 0–100 g in 5 g steps, protein 0–100 g in 5 g steps) passed range/rounding checks.
- Invalid nutrient inputs were rejected.
- Reference points are the subjective examples used to design v1, so v1's exact agreement is circular and not evidence of accuracy.

## Original reference cases

| Carbs (g) | Fat (g) | Protein (g) | Original estimate (h) | V1 (h) | V2 (h) |
|---:|---:|---:|---:|---:|---:|
| 40 | 5 | 5 | 3 | 3 | 3.5 |
| 40 | 15 | 5 | 4 | 4 | 4.5 |
| 40 | 25 | 5 | 5 | 5 | 5.5 |
| 40 | 35 | 5 | 5 | 5 | 5.5 |
| 40 | 5 | 30 | 4 | 4 | 4 |
| 40 | 25 | 30 | 5.5 | 5.5 | 6 |
| 40 | 35 | 30 | 6 | 6 | 6 |
| 15 | 25 | 5 | 5 | 5 | 5 |
| 60 | 2 | 3 | 2 | 2 | 2.5 |
| 25 | 0 | 0 | 2 | 2 | 2 |

V2 differs from six of the ten original estimates by +0.5 hours. Mean absolute difference from those original estimates: v1 = 0 h (by construction), v2 = 0.3 h. **These numbers are not real-world prediction errors.**

## Next step before adoption

Collect independently observed meal records and define how the relevant post-meal glucose response is evaluated, including uncertainties and confounders (insulin timing, exercise, corrections, sensor lag, mixed meals). Only then compare whether a different model improves predictions. Do not commit private Nightscout credentials or identifiable health records to this public repository.

The published app (`main`) is unchanged; v2 remains an isolated experiment on `Development`.
