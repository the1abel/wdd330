/**
 * Chapter 9 Experimenting
 */
// WINDOWS
// const win = window.open('page2.html');
// setTimeout(() => {win.close()}, 2000);

let page2FloatingWindow;
const closePage2Btn = document.getElementById('closePage2');
const enlargePage2Btn = document.getElementById('enlargePage2');
const textInput = document.getElementById('textInput');

// NOTE: this will not work with .addEventListener() because it doesn't pass the return value to the <a> anchor tag
// document.getElementById('page2link').onclick = (e) => {
document.getElementById('page2link').addEventListener('click', (e) => {
  page2FloatingWindow =
      window.open('page2.html', 'floatingWindow', 'width=600,height=300');
      // window.open('page2.html', 'floatingWindow', 'width=600,height=300');

  // position & resize window
  page2FloatingWindow.window.moveTo(500, 500);
  page2FloatingWindow.window.resizeTo(500, 500);

  // reveal close button
  closePage2Btn.hidden = false;
  enlargePage2Btn.hidden = false;
  textInput.hidden = false;
  // return false; // necessary if href attribute is set for the <a> element
});

closePage2Btn.addEventListener('click', (e) => {
  page2FloatingWindow.close();
  closePage2Btn.hidden = true;
  enlargePage2Btn.hidden = true;
  textInput.hidden = true;
})

enlargePage2Btn.addEventListener('click', (e) => {
  const width = page2FloatingWindow.window.screen.width; // monitor's width
  const height = page2FloatingWindow.window.screen.height; // monitor's height
  page2FloatingWindow.resizeTo(width, height); // fill monitor
});

textInput.addEventListener('keyup', (e) => {
  page2FloatingWindow.window.document.getElementById('textOutput').innerHTML =
      e.target.value;
})


// COOKIES
document.cookie = 'name=Abel'; // set
document.cookie = 'hero=Jesus Christ'; // set
const cookies = document.cookie.split('; '); // get
console.log('cookies:', cookies);
for (const crumb of cookies) {
  const [key, value] = crumb.split('=');
  console.log(key, '\t', value);
}


// SET INTERVAL
const squares = document.querySelectorAll('.square');
const spinSquaresBtn = document.getElementById('spinSquares');
const pauseSquaresBtn = document.getElementById('pauseSquares');
let animationId;
let angle = 0;

spinSquaresBtn.addEventListener('click', rotateSquares);
function rotateSquares() {
  spinSquaresBtn.hidden = true;
  pauseSquaresBtn.hidden = false;
  angle = (angle + 2) %360;
  squares[0].style.transform = `rotate(${angle}deg)`;
  squares[1].style.transform = `translateY(-200px) rotate(${-angle + 45}deg)`;
  animationId = requestAnimationFrame(rotateSquares);
};

pauseSquaresBtn.addEventListener('click', (e) => {
  cancelAnimationFrame(animationId);
  spinSquaresBtn.hidden = false;
  pauseSquaresBtn.hidden = true;
});


/**
 * Chapter 15 Experimenting
 */
