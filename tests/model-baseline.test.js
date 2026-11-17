// Baseline snapshot of the v1 absorption heuristic in index.html.
// Run: node tests/model-baseline.test.js
// These are regression checks against the original hand-chosen examples,
// NOT independent validation or medical treatment guidance.
const assert = require('node:assert/strict');

function modelV1(c, f, p) {
  let base = f <= 2 ? 2 : f <= 5 ? 2 + (f - 2) / 3
    : f <= 15 ? 3 + (f - 5) / 10
    : f <= 25 ? 4 + (f - 15) / 10 : 5;
  let extra = Math.max(0, Math.min(1, (p - 5) / 25));
  if (f >= 15 && f <= 25) extra *= .5;
  else if (f > 25) extra *= Math.min(1, .5 + (f - 25) / 20);
  let h = Math.min(6, Math.max(2, base + extra));
  return Math.round(h * 2) / 2;
}

const examples = [
  [40,5,5,3], [40,15,5,4], [40,25,5,5], [40,35,5,5],
  [40,5,30,4], [40,25,30,5.5], [40,35,30,6],
  [15,25,5,5], [60,2,3,2], [25,0,0,2]
];
for (const [carbs, fat, protein, expected] of examples) {
  assert.equal(modelV1(carbs, fat, protein), expected);
}
for (let fat = 0; fat <= 100; fat += 2) {
  for (let protein = 0; protein <= 100; protein += 5) {
    const h = modelV1(40, fat, protein);
    assert.ok(Number.isFinite(h) && h >= 2 && h <= 6);
    assert.equal(h * 2, Math.round(h * 2));
  }
}
assert.equal(modelV1(15,25,5), modelV1(60,25,5),
  'Current v1 ignores carbohydrate quantity for absorption duration');
console.log('Écalc v1 baseline passed (10 examples, 1071 range checks).');
