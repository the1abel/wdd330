let time = 0;

setInterval(() => {
  time += 2;
  self.postMessage(`${time} seconds have passed.`);
  if (time === 30) {
    console.log('The web worker is now shutting itself down.');
    self.close();
  }
}, 2000);

console.log('This message was logged to console from web worker.');