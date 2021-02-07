/*
 * .spec.js (borrowed from Ruby) works the same as .test.js
 * See results at ./coverage/index.html
 *    if package.json.jest includes "coverageReporters": ["html"]
 */
const factorsOf = require('../factors.js');

describe('Factor tests:', () => {
  test('factors of 12', () => {
    expect(factorsOf(12)).toEqual([1,2,3,4,6,12]); // .toEqual tests an array
  });

  test('factors of 15', () => {
    expect(factorsOf(15).toEqual([1,2,3,4,6,12]));
  });
});