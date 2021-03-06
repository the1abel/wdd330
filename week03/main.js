// "use strict" // for testing `this` in function declaration in the global scope
const quiz = [
  { name: "Superman", realName: "Clark Kent" },
  { name: "Wonder Woman", realName: "Diana Prince" },
  { name: "Batman", realName: "Bruce Wayne" }
];

/**
 * Chapter 5: Quiz Ninja Project
 */
function initCh5QuizProj() {
  const game = {
    start(quiz) {
      this.questions = [...quiz];
      this.score = 0;

      // main game loop
      for (const question of this.questions) {
        this.question = question;
        this.ask();
      }

      // end of main game loop
      this.gameOver();
    },

    ask() {
      const question = `What is ${this.question.name}'s real name?`;
      const response = prompt(question);
      this.check(response);
    },

    check(response){
      const answer = this.question.realName;

      if (response === answer){
        alert('Correct!');
        this.score++;
      } else {
        alert(`Wrong! The correct answer was ${answer}`);
      }
    },

    gameOver() {
      alert(`Game over.\nYou scored ${this.score} point${this.score !== 1 ? 's' : ''}`);
    },
  };

  game.start(quiz);
}

/*
 * Chapter 6: Testing
 */
const heroNameLabel = document.getElementById("heroNameLabel");
console.log("heroNameLabel.htmlFor:", heroNameLabel.htmlFor);

const bats = document.getElementById("bats");
console.log("bats.classList:", bats.classList);
bats.classList.replace("vigilante", "loner");
console.log("bats.classList after replace():", bats.classList);
bats.classList.toggle("hero");
console.log("bats.classList after toggle('hero'):", bats.classList);
bats.classList.toggle("hero");
console.log("bats.classList after toggle('hero'):", bats.classList);

const roster = document.getElementById("roster");

const buttons = ` <button onclick="moveUp(event)">▲</button>
                  <button onclick="moveDown(event)">▼</button>
                  <button onclick="deleteMe(event)">&times;</button>`;

for (const elem of roster.children) {
  elem.insertAdjacentHTML("beforeend", buttons);
}

function moveDown(event) {
  const subjectLi = event.target.parentElement;
  const ul = subjectLi.parentElement;
  const allLis = Array.from(ul.children);
  if (
    allLis[allLis.length - 1] !== subjectLi &&
    allLis[allLis.length - 2] !== subjectLi
  ) {
    const index = allLis.indexOf(subjectLi);
    ul.insertBefore(subjectLi, allLis[index + 2]);
  } else {
    ul.appendChild(subjectLi);
  }
}

function moveUp(event) {
  const subjectLi = event.target.parentElement;
  const ul = subjectLi.parentElement;
  const allLis = Array.from(ul.children);
  const index = allLis.indexOf(subjectLi);
  if (index !== 0) {
    ul.insertBefore(subjectLi, allLis[index - 1]);
  }
}

function deleteMe(event) {
  event.target.parentElement.parentElement.removeChild(event.target.parentElement);
}

function replaceFirstWithThird() {
  roster.replaceChild(roster.children[2], roster.children[0]);
}

function insertHtml() {
  document.getElementById("target").innerHTML =
      document.getElementById("heroInput").value;
}

function addScriptTag() {
  // abort if script and button were already added
  if (document.getElementById("testAddedScriptBtn")) {
    return;
  }

  const script = document.createElement("script");
  script.innerText = `function testInsertedScriptTag() {alert("Inserted script tag's function works!")}`;
  document.body.appendChild(script);
  
  const button = document.createElement("button");
  button.id = "testAddedScriptBtn";
  button.innerText = "Test inserted script";
  button.addEventListener("click", testInsertedScriptTag);
  document.getElementById("heroTesting").appendChild(button);
}


/**
 * Chapter 6: Quiz Ninja Project
 */
function initCh6QuizProj() {
  // View Object
  const view = {
    score: document.querySelector('#score strong'),
    question: document.getElementById('question'),
    result: document.getElementById('result'),
    info: document.getElementById('info'),
    render(target, content, attributes) {
      for(const key in attributes) {
        target.setAttribute(key, attributes[key]);
      }
      target.innerHTML = content;
      document.getElementById("questionPrompt").innerHTML = "";
    },
  };

  const game = {
    start(quiz) {
      this.questions = [...quiz];
      this.score = 0;

      // main game loop
      for (const question of this.questions) {
        this.question = question;
        this.ask();
      }

      // end of main game loop
      this.gameOver();
    },

    ask() {
      const question = `What is ${this.question.name}'s real name?`;
      view.render(view.question, question);
      const response = prompt(question);
      this.check(response);
      // this.promptQuestion(question);
    },

    /*
     * FAIL: I forgot the `for` loop isn't made to wait for a response.  Awaiting async...
     */
    // promptQuestion(question) {
    //   const questionPrompt = document.getElementById("questionPrompt");
    //
    //   const questionDisplay = document.createElement("p");
    //   questionDisplay.textContent = question;
    //   questionPrompt.appendChild(questionDisplay);
    //
    //   const input = document.createElement("input");
    //   input.type = "text";
    //   input.id = "answer";
    //   questionPrompt.appendChild(input);
    //
    //   const goButton = document.createElement("button");
    //   goButton.textContent = "Go";
    //   goButton.addEventListener("click", this.handleAnswer);
    //   questionPrompt.appendChild(goButton);
    // },

    // handleAnswer() {
    //   this.check(document.getElementById("answer").value);
    // },

    check(response) {
      const answer = this.question.realName;
      if (response === answer) {
        view.render(view.result, 'Correct!', {'class':'correct'});
        this.score++;
        view.render(view.score, this.score);
        alert('Correct!');
      } else {
        view.render(view.result, `Wrong! The correct answer was ${answer}`, {'class':'wrong'});
        alert(`Wrong! The correct answer was ${answer}`);
      }
    },
    
    gameOver() {
      view.render(view.info, `Game over.<br>You scored ${this.score} point${this.score !== 1 ? 's' : ''}`);
    },
  };

  game.start(quiz);
}


/*
 * Chapter 7: Testing
 */
function handleEvent(event){
  event.target.classList.toggle("highlight");
  console.log(`${event.type} event at screen: (${event.screenX},${event.screenY}) page: (${event.pageX},${event.pageY}) client: (${event.screenX},${event.screenY})`);
}

// mouse events
document.getElementById("click").addEventListener("click", handleEvent);
document.getElementById("dblclick").addEventListener("dblclick", handleEvent);
document.getElementById("mouse").addEventListener("mouseover", handleEvent);
document.getElementById("mouse").addEventListener("mouseout", handleEvent);

// key events
addEventListener("keypress", (event) => {console.log("keypress:", event.key, event)});
addEventListener('keydown', (event) => {
  if (event.key === 'c' && event.ctrlKey) console.log('Ctrl+c was pressed');
});
addEventListener('keydown', (event) => {
  if (event.key === 'PageDown' && event.ctrlKey && event.shiftKey) {
    console.log('Ctrl+Shift+PageDown was pressed');
  }
});

// touch event
addEventListener("touchstart", (event) => {console.log("touchstart:", event)});

// preventDefault()
document.getElementById("googleLink").addEventListener("click", (event) => {
  event.preventDefault();
  console.log("I killed this link.");
});


/**
 * Chapter 7: Quiz Ninja Project
 */
document.getElementById("ch7QuizProjStartBtn").addEventListener("click", initCh7QuizProj);

function initCh7QuizProj() {
  // View Object
  const view = {
    score: document.querySelector('#score strong'),
    question: document.getElementById('question'),
    result: document.getElementById('result'),
    info: document.getElementById('info'),
    start: document.getElementById("ch7QuizProjStartBtn"),
    render(target, content, attributes) {
      for(const key in attributes) {
        target.setAttribute(key, attributes[key]);
      }
      target.innerHTML = content;
      document.getElementById("questionPrompt").innerHTML = "";
    },
    show(element) {
      element.style.display = 'block';
      element.style.backgroundColor= "green"; // just do demonstrate that this method works
    },
    hide(element) {
      element.style.display = 'none';
    },
  };

  const game = {
    start(quiz) {
      view.hide(view.start);
      this.questions = [...quiz];
      this.score = 0;

      // main game loop
      for (const question of this.questions) {
        this.question = question;
        this.ask();
      }

      // end of main game loop
      this.gameOver();
    },

    ask() {
      const question = `What is ${this.question.name}'s real name?`;
      view.render(view.question, question);
      const response = prompt(question);
      this.check(response);
    },

    check(response) {
      const answer = this.question.realName;
      if (response === answer) {
        view.render(view.result, 'Correct!', {'class':'correct'});
        this.score++;
        view.render(view.score, this.score);
        alert('Correct!');
      } else {
        view.render(view.result, `Wrong! The correct answer was ${answer}`, {'class':'wrong'});
        alert(`Wrong! The correct answer was ${answer}`);
      }
    },
    
    gameOver() {
      view.render(view.info,
          `Game over.<br>You scored ${this.score} point${this.score !== 1 ? 's' : ''}`);
      view.show(view.start);
    },
  };

  game.start(quiz);
}


/*
 * `this` Testing
 */
console.log("\n***instantiated objects***")
class Something {
  constructor (name) {
    this.name = name;
  }

  thing = 5;

  test = this.thing + " ***let's see if this works";

  display() {
    console.log(`this.thing (${this.name}):`, this.thing);
  }

  display2() {
    displayFromGlobal(this.name);
  }

  delayedDisplay() {
    setTimeout(function() {console.log(`this.thing in delayed, anonymous arrow function(${this.name}):`, this.thing)}, 100);
  }
}

const thing1 = new Something("thing1");
const thing2 = new Something("thing2");
console.log("***test:", thing1.test);
thing1.display();
thing1.display2();
thing1.thing = 1;
thing1.display();
thing1.display2();
thing2.display();


console.log("\n***global variables***")
var thing = 4; // the variable is hoisted, but the assignment is not hoisted
console.log("this.thing (global):", this.thing);


console.log("\n***simple function***")
function displayFromGlobal(calledBy) {
  // ERROR ***IF*** in "use strict" mode
  console.log(`this.thing (${calledBy} from global):`, this.thing);
}
displayFromGlobal();


console.log("\n***simple object***")
const somethingElse = {
  thing: 25,
  display() {
    console.log(`this.thing (simple obj):`, this.thing);
  },

  // ERROR because `this` is the global context for simple objects
  functionCall() {
    setTimeout(function() {this.functionCall2("function declaration")}, 100);
  },

  // SUCCESS `self: this` binds `this` to the context inside this simple object
  self: this,
  functionCall2() {
    setTimeout(function() {self.functionCall2("function declaration (with self)")}, 100);
  },
  arrowFunctionCall() {
    setTimeout(() => {this.functionCall2("arrow function")}, 100);
  },

  // SUCCESS because arrow function binds `this` to the context inside this simple object
  functionCall2(functionDefinition) {
    console.log(`this from functionCall2 via ${functionDefinition}:`, this);
  },
}
somethingElse.display();
somethingElse.functionCall();
somethingElse.functionCall2();
somethingElse.arrowFunctionCall();


// console.log("\n***instantiated object (again)***")
thing2.display();
thing2.display2();
thing2.delayedDisplay();

// `this` is `event.target` for function declaration
document.getElementById("thisChecker")
.addEventListener('click', function(event) {console.log("this:", this)});
// `this` is `window` for arrow function
document.getElementById("thisCheckerArrow")
  .addEventListener('click', (event) => {console.log("this:", this)});

const someOtherThing = {
  prop1: "value",
  prop2: function() {
    return this.prop1;
  },
  prop3: "another " + this.prop1,
};
console.log("someOtherThing.prop2():", someOtherThing.prop2());
console.log("someOtherThing.prop3:", someOtherThing.prop3);
