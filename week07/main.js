/*
 * Chapter 11 Experimenting
 */
'use strict'; // requires variables to be declared (using var, const, or let)

// IIFE requires parens
(function() {console.log(
  'IIFE (Immediately Invoked Function Expression) requires parens around the function');
})();

function name1() {console.log('name1')}
let name2 = name1; // name2 is actually a copy of (not just a pointer to) name1
name2(); // outputs 'name1'
name2 = () => {console.log('name2')}
name2(); // outputs 'name2'
name1(); // outputs 'name1'

let nameA = {name: 'A'};
let nameB = nameA; // nameB just becomes a pointer to nameA
console.log(nameB.name); // outputs 'A'
nameB.name = 'B';
console.log(nameB.name); // outputs 'B'
console.log(nameA.name); // outputs 'B'


/*
 * promises
 */
console.log('******* PROMISES');

console.log('called selectFood with 5%');
function selectFood (bodyFat) {
  return new Promise( (resolve, reject) => {
    bodyFat < .12 ? resolve('pizza') : reject('salad');
})};

// note: this is asynchronous, and therefore placed at the top of the call stack, therefore
//       the return value isn't handled until the current execution context (script) finishes
selectFood(.05)
  .then((selection) => {console.log(`I want to eat ${selection}!`)})
  .catch((selection) => {console.log(`I "want" to eat ${selection} :/`)});

selectFood(.25)
  .then((selection) => {console.log(`I want to eat ${selection}!`)})
  .catch((selection) => {console.log(`I "want" to eat ${selection} :/`)});

console.log('called getGroceries with 25%');
const getGroceries = function(bodyFat) {
  return new Promise( (resolve, reject) => {
  // note: bodyFat is set when the promise is defined, not when it is called
  bodyFat < .12 ? resolve('ice cream') : reject('veggies');
})};

// note: this is asynchronous, and therefore placed at the top of the call stack, therefore
//       the return value isn't handled until the current execution context (script) finishes
getGroceries(.25)
  .then((selection) => {console.log(`I purchased ${selection}!`)})
  .catch((selection) => {console.log(`I purchased ${selection} :/`)});


/*
 * async/await
 */
console.log('******* ASYNC/AWAIT');
async function loadData() {
  try {
    let comments;
    await fetch('https://jsonplaceholder.typicode.com/comments/')
      .then(response => response.json())
      .then(json => comments = json);
    const p = document.createElement('p');
    p.innerHTML = `<strong style="color:green">This an async/await example, which also
      uses fetch()</strong>: ${JSON.stringify(comments[0])}`;
    document.getElementById('ch11').appendChild(p);
  } catch (error) {
    console.error(error);
  }
}

loadData();

/*
 * generator
 */
function* fibonacci(a, b) {
  let [prev, current] = [a, b];
  while(true) {
    [prev, current] = [current, prev + current];
    yield current;
  }
}
const sequence = fibonacci(1, 1);
console.log('sequence.next():', sequence.next()); // {value: 2, done: false}
console.log('sequence.next():', sequence.next()); // {value: 3, done: false}
console.log('sequence.next():', sequence.next()); // {value: 5, done: false}
for (const n of sequence) {
  if (n > 25) break;
  console.log(n); // 8, 13, 21
}

/*
 * Chapter 11 & 13 Quiz Ninja!
 */
import { view, game } from './quiz.js';

const url = 'https://spbooks.github.io/jsninja2/questions.json';

view.render(view.hiScore, game.hiScore());

fetch(url)
  .then(res => res.json())
  .then(quiz => {
    console.log(quiz.questions);
    view.start.addEventListener('click', () => game.start(quiz.questions), false);
    view.response.addEventListener('click', (event) => game.check(event), false);
  });

/*
 * Chapter 13 Experimenting
 */
