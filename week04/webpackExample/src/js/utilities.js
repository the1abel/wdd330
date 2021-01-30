function random(a,b=1) {
  // if only 1 argument is provided, we need to swap the values of a and b
  if (b === 1) {
    [a,b] = [b,a];
  }
  return Math.floor((b-a+1) * Math.random()) + a;
}

 function shuffle(arr) {
  for (let i = arr.length; i; i--) {
    let j = random(i)-1;
    [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
  }
}

export {
  random,
  shuffle,
}