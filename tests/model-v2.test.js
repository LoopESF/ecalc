// Run with: node tests/model-v2.test.js
// Exploratory consistency tests, NOT clinical validation.
const assert = require('node:assert/strict');
const {modelV2} = require('../experiments/model-v2');
const examples = [
  [40,5,5,3], [40,15,5,4], [40,25,5,5], [40,35,5,5],
  [40,5,30,4], [40,25,30,5.5], [40,35,30,6],
  [15,25,5,5], [60,2,3,2], [25,0,0,2]
];
for (const [c,f,p,reference] of examples) {
  const result = modelV2(c,f,p);
  console.log(JSON.stringify({carbs:c,fat:f,protein:p,reference,v2:result,delta:result-reference}));
}
let checked=0;
for (let c=0;c<=100;c+=10) for (let f=0;f<=100;f+=5) for (let p=0;p<=100;p+=5) {
  const hours=modelV2(c,f,p);
  assert.ok(Number.isFinite(hours) && hours>=2 && hours<=6);
  assert.equal(hours*2,Math.round(hours*2));
  checked++;
}
for (const input of [[-1,1,1],[1,-1,1],[1,1,-1],[NaN,1,1],[Infinity,1,1]]) {
  assert.throws(()=>modelV2(...input),RangeError);
}
assert.ok(modelV2(80,5,5)>=modelV2(15,5,5));
console.log(`Passed ${checked} bounded/rounded model cases and invalid-input checks.`);
