function factorsOf(n) {
  const factors = [];
  for (let i=1; i <= n ; i++) {
    if (n/i === Math.floor(n/i)){
      factors.push(i);
    }
  }
  return factors; // returns an array
}

module.exports = factorsOf;