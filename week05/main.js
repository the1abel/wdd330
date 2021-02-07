/*
* Chapter 10: Testing and Debugging
*/
"use strict";
var myVar = "test"; // strict mode requires variables to be declared (with var/let/const), or a ReferenceError will be thrown and halt execution
console.log(window.navigator.userAgent)
console.log("Chrome version: ",
    window.navigator.userAgent.match("Chrome/(\\d+.\\d*.\\d*.\\d*)")[1]);

document.forms.errorCheck.addEventListener("submit", (event) => {
  event.preventDefault();
  const myError = new Error("Error checking is good."); // halts execution when thrown
  try {
    switch (document.errorCheck.throwError.value) {
      case "withError":
        throw myError; // halts execution
        break;

      case "withWarning":
        console.warn("Warnings are helpful too.");
        throw 2; // halts execution
        break;

      case "withDebugger":
        debugger; // DEBUG
        alert(document.getElementById("text").value);
        break;

      default:
        alert(document.getElementById("text").value);
    }
  } catch (error) {
    console.error("error output:", error);
  } finally {
    console.log("So cool!");
  }
})


 /*
 * Star Game
 */
const star = document.createElement("div");
star.innerHTML = "&starf;";
star.style.display = "inline";
star.style.position = "absolute";
const starGameBounds = document.getElementById("starGame").getBoundingClientRect();
star.style.top = starGameBounds.y + 40 + "px";
star.style.left = starGameBounds.x + 250 + "px";
document.body.appendChild(star);

let speed = 5;
const speedDisplay = document.getElementById("speed");
speedDisplay.innerText = speed;
document.getElementById("faster").addEventListener("click", (event) => {
  console.log("increased speed to", speed); // DEBUG
  speedDisplay.innerText = ++speed;
})
document.getElementById("slower").addEventListener("click", (event) => {
  console.log("decreased speed to", speed); // DEBUG
  speedDisplay.innerText = speed > 1 ? --speed : speed;
})

document.body.addEventListener("keydown", (event) => {
  // console.log(event); // DEBUG
  switch (event.key) {
    case "ArrowUp":
      function goUp() {
        let newY = parseInt(star.style.top) - speed;
        newY = newY < 0 ? 0 : newY;
        star.style.top = newY + "px";
        if (newY === 0) console.warn("The star cannot go any higher.");
      }
      repeater(goUp);
      break;
      
      case "ArrowDown":
        function goDown() {
          let newY = parseInt(star.style.top) + speed;
          const maxY = window.innerHeight - star.getBoundingClientRect().height;
          newY = newY > maxY ? maxY : newY;
          star.style.top = newY + "px";
          if (newY === maxY) console.warn("The star cannot go any lower.");
        }
        repeater(goDown);
      break;

    case "ArrowRight":
      repeater(() => {star.style.left = parseInt(star.style.left) + speed + "px"});
      function goRight() {
        let newX = parseInt(star.style.left) + speed;
        const maxX = window.innerWidth - star.getBoundingClientRect().width;
        newX = newX > maxX ? maxX : newX;
        star.style.left = newX + "px";
        if (newX === maxX) console.warn("The star cannot go any further right.");
      }
      repeater(goRight);
    break;

    case "ArrowLeft":
      repeater(() => {star.style.left = parseInt(star.style.left) - speed + "px"});
      function goLeft() {
        let newX = parseInt(star.style.left) - speed;
        newX = newX < 0 ? 0 : newX;
        star.style.left = newX + "px";
        if (newX === 0) console.warn("The star cannot go any further left.");
      }
      repeater(goLeft);
      break;
  }
})

function repeater(callback) {
  let repetitions = 10;
  const repeater = setInterval(() => {
    callback();
    if ( ! --repetitions) clearInterval(repeater);
  }, 5);
  const sb = star.getBoundingClientRect();
  console.log(`star coordinates: (${sb.x}, ${sb.y})`);
}
