function squareRoot(number) {
  'use strict';
  if (number < 0) {
    throw new RangeError("You can't find the square root of negative numbers")
  }
  return Math.sqrt(number);
};

describe("My first set of tests", () => {
  test('square root of 4 is 2', () => {
    expect(squareRoot(4)).toBe(2);
  });

  test('one', () => {
    expect(1).toBe(1);
  })

  test('one', () => {
    expect(1).not.toBe(2);
  })
});
