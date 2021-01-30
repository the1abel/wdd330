/*
 * Chapter 8 Experimenting
 */
function parrot(event) {
  event.target.setCustomValidity("")
  document.getElementById("parrot").innerHTML = event.target.value;
}

function logParrot(event) {
  console.log(event.target.value);
}

document.forms.test8.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const values = Object.fromEntries(data.entries());
  values.topics = data.getAll("topics"); // get multi-select values (such as checkboxes)
  values.powers = data.getAll("powers");
  console.log(values);
}


/*
 * Chapter 8 Quiz Ninja!
 */
const quiz = [
  { name: "Superman", realName: "Clark Kent" },
  { name: "Wonder Woman", realName: "Diana Prince" },
  { name: "Batman", realName: "Bruce Wayne" }
];

// View Object
const view8 = {
  score: document.querySelector('#score strong'),
  question: document.getElementById('question'),
  response: document.getElementById('response'),
  result: document.getElementById('result'),
  info: document.getElementById('info'),
  start: document.getElementById("start8"),

  render(target, content, attributes) {
    for(const key in attributes) {
      target.setAttribute(key, attributes[key]);
    }
    target.innerHTML = content;
  },

  show(element) {
    element.style.display = 'block';
  },

  hide(element) {
    element.style.display = 'none';
  },
};

// Game Object
const game8 = {
  start(quiz) {
    view8.hide(view8.start);
    view8.score.innerText = this.score = 0;
    view8.info.result = "";
    view8.info.innerText = "";
    this.questions = [...quiz];
    this.ask();
  },

  ask(name) {
    if (this.questions.length > 0) {
      this.question = this.questions.pop();
      const question = `What is ${this.question.name}'s real name?`;
      view8.render(view8.question, question);
    } else {
      this.gameOver();
    }
  },

  check(event) {
    event.preventDefault();
    const response = view8.response.answer.value;
    const answer = this.question.realName;
    if (response === answer) {
      view8.render(view8.result, 'Correct!', {'class':'correct'});
      this.score++;
      view8.render(view8.score, this.score);
    } else {
      view8.render(view8.result, `Wrong! The correct answer was ${answer}`, {'class':'wrong'});
    }

    view8.question.innerText = "";
    view8.response.answer.value = "";
    this.ask();
  },
  
  gameOver() {
    view8.render(view8.info,
        `Game over.<br>You scored ${this.score} point${this.score !== 1 ? 's' : ''}`);
    view8.show(view8.start);
  },
};

view8.response.addEventListener('submit', (event) => game8.check(event), false);


/*
 * Chapter 12 Experimenting
 */



 /*
 * Chapter 12 Quiz Ninja!
 */
