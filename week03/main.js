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