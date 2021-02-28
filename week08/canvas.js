const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
context.strokeStyle = 'grey';
context.lineWidth = 4;
context.fillStyle = 'lightgrey';
context.fillRect(10, 10, 100, 100); // x, y, width, height
context.strokeRect(10, 10, 100, 120); // x, y, width, height

let drawStart = {x: null, y: null};

canvas.addEventListener('mousedown', (event) => {
  drawStart.x = event.clientX;
  drawStart.y = event.clientY;
  console.log('begin draw at:', drawStart);
});
canvas.addEventListener('mouseup', (event) => {
  const canvasBounds = canvas.getBoundingClientRect();
  const width = event.clientX - drawStart.x;
  const height = event.clientY - drawStart.y;
  context.fillRect(drawStart.x - canvasBounds.x, drawStart.y - canvasBounds.y, width, height);
  context.strokeRect(drawStart.x - canvasBounds.x, drawStart.y - canvasBounds.y, width, height);
  console.log(`end draw at: \{${event.clientX}, ${event.clientY}\}\
      \twidth: ${width}, height: ${height}`);
});

document.querySelector('.line.red').onclick = () => {context.strokeStyle = 'red'};
document.querySelector('.line.green').onclick = () => {context.strokeStyle = 'green'};
document.querySelector('.line.blue').onclick = () => {context.strokeStyle = 'blue'};
document.querySelector('.fill.red').onclick = () => {context.fillStyle = 'red'};
document.querySelector('.fill.green').onclick = () => {context.fillStyle = 'green'};
document.querySelector('.fill.blue').onclick = () => {context.fillStyle = 'blue'};

function drawPattern() {
  const img = new Image();
  img.src = "bike_sprite.jpg";
  img.onload = function() {
    const pattern = context.createPattern(img, "repeat"); // uses context from line 2
    context.fillStyle = pattern;
    context.fillRect(120, 110, 100, 100);
    context.strokeRect(120, 110, 100, 100);
  };
}

function drawGradient() {
  const gradient = context.createLinearGradient(0, 0, 0, 200);
  gradient.addColorStop(0, "blue");
  gradient.addColorStop(1, "white");
  context.fillStyle = gradient;
  context.fillRect(230, 10, 100, 100);
  context.strokeRect(230, 10, 100, 100);
}

function drawCircle() {
  context.beginPath();
  // arc(x, y, radius, startAngle, endAngle, anticlockwise)
  context.arc(375, 50, 30, 0, Math.PI*2, true);
  context.closePath();
  context.fill(); // important
  context.stroke(); // important
}

function saveDrawing() {
  const url = canvas.toDataURL("image/png", 1.0);
  document.getElementById('imageUrl').innerText = url;
  console.log(url);
  // window.open(canvas.toDataURL("image/png", 1.0)); // doesn't work in Chrome
}

function convertToGreyScale() {
  console.log('converting to grey scale');
  const imageData = context.getImageData(0, 0, 100, 100);
  let red, green, blue, greyScale;
  for (var i = 0; i < imageData.data.length; i += 4) {
    // get RGB
    red = imageData.data[i];
    green = imageData.data[i + 1];
    blue = imageData.data[i + 2];
    // alpha (opacity) not used for this function

    // convert to greyScale
    greyScale = red * 0.3 + green * 0.59 + blue * 0.11;

    // set RGB values to greyScale
    imageData.data[i] = greyScale;
    imageData.data[i + 1] = greyScale;
    imageData.data[i + 2] = greyScale;

    context.putImageData(imageData, 0, 0);
  }

}