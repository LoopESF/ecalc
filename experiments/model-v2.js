// Experimental Écalc v2. NOT validated for insulin dosing or Loop settings.
// Inputs are grams in the full portion. Keep separate from the live app.
function clamp(x, min, max) { return Math.max(min, Math.min(max, x)); }
function interpolate(x, knots) {
  if (x <= knots[0][0]) return knots[0][1];
  for (let i = 1; i < knots.length; i++) {
    const [x1,y1] = knots[i], [x0,y0] = knots[i-1];
    if (x <= x1) return y0 + (y1-y0)*(x-x0)/(x1-x0);
  }
  return knots[knots.length-1][1];
}
function modelV2(carbs, fat, protein) {
  if (![carbs,fat,protein].every(n => Number.isFinite(n) && n >= 0)) {
    throw new RangeError('Nutrients must be non-negative finite grams');
  }
  // Smooth fat effect, avoiding the v1 jump at 25 g.
  const fatHours = interpolate(fat, [[0,2],[2,2],[5,3],[15,4],[25,5],[35,5]]);
  // Experimental protein effect: gradual, moderated at high fat.
  const proteinHours = clamp((protein-5)/25,0,1) * interpolate(fat,[[0,1],[15,0.5],[25,0.5],[35,1]]);
  // Experimental carb contribution, intentionally modest (not clinically fitted).
  const carbHours = interpolate(carbs,[[0,0],[15,0],[40,0.25],[80,0.5]]);
  const hours = clamp(fatHours + proteinHours + carbHours,2,6);
  return Math.round(hours*2)/2;
}
if (typeof module !== 'undefined') module.exports = {modelV2};
