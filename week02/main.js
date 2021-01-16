/*
 * Chapter 2: Testing
 * Scope of 'let'
 */
{
  thing = "something"; // same as declaring w/ 'var'; declares it on 'window' object
  let anotherThing = "something";
}
console.log(
  "thing: ",
  thing,
  "\tanotherThing: ",
  typeof anotherThing === "undefined" ? "undefined" : anotherThing
);

thing = "changed?";
anotherThing = "changed?";
console.log("thing: ", thing, "\tanotherThing: ", anotherThing);

/**
 * Chapter 2: Quiz Ninja Project
 */
function initCh2QuizProj() {
  const question = "What is Superman's real name?";
  const answer = prompt(question);
  alert(`You answered ${answer}`);
}

/*
 * Chapter 3: Testing
 */
let arr1 = ["do", "re", "me"];
let set = new Set();
console.log("set.add(): ", set.add(arr1));
arr1 = null;
console.log("set: ", set);

let arr2 = ["fa", "so", "la", "te", "do"];
let weakSet = new WeakSet();
console.log("weakSet.add(): ", weakSet.add(arr2));
arr2 = null;
console.log("weakSet: ", weakSet);

/**
 * Chapter 3: Quiz Ninja Project
 */
function initCh3QuizProj() {
  const quiz = [
    ["What is Superman's real name?","Clark Kent"],
    ["What is Wonder Woman's real name?","Diana Prince"],
    ["What is Batman's real name?","Bruce Wayne"]
  ];

  let score = 0;

  for(const [question, answer] of quiz){
    const response = prompt(question);

    if(response === answer){
      alert('Correct!');
      score++;
    } else {
      alert(`Wrong! The correct answer was ${answer}`);
    }
  }

  alert(`Game over.\nYou scored ${score} point${score !== 1 ? 's' : ''}.`);
}
