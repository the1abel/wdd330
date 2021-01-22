const quiz = [
  { name: "Superman", realName: "Clark Kent" },
  { name: "Wonder Woman", realName: "Diana Prince" },
  { name: "Batman", realName: "Bruce Wayne" }
];

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