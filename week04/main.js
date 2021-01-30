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
class MyClass {
  constructor() {
    this.prop1 = "constructed prop";
    let _color = "red";
    this.getColor = () => {return _color};
    this.setColor = (color) => {return _color = color;};
  }
  prop2 = "a non-instance prop";
  prototype = {
    // this includes the constructor function
    prop3: "a base class prototype prop"
  }
}
console.log(MyClass.prototype)
const thing = new MyClass();
console.log("Newly instantiated thing:", thing);
MyClass.prototype.prop4 = "a post-definition add-on prototype prop";
console.log("Added MyClass.prototype.prop4.  thing:", thing);

console.log("thing.constructor.prototype:", thing.constructor.prototype);
console.log("Object.getPrototypeOf(thing):", Object.getPrototypeOf(thing));
console.log("thing.prop4:", thing.prop4);
thing.prop4 = 4;
console.log("thing.prop4:", thing.prop4);
const thing2 = new MyClass();
console.log("thing2", thing2, "\tthing2.prop4:", thing2.prop4);

console.log("thing.getColor()", thing.getColor());
thing2.setColor("blue");
console.log("called thing2.setColor(\"blue\")");
console.log("thing.getColor()", thing.getColor());
console.log("thing2.getColor()", thing2.getColor());

console.log("Object.getPrototypeOf(thing).constructor.name:", Object.getPrototypeOf(thing).constructor.name);

console.log("Object.getOwnPropertyDescriptor(thing, 'prop1':", Object.getOwnPropertyDescriptor(thing, 'prop1'));

function mixin(target, ...objects) {
  for (const object of objects) {
    if (typeof object === 'object') {
      for (const key of Object.keys(object)) {
        if (typeof object[key] === 'object') {
          target[key] = Array.isArray(object[key]) ? [] : {};
          mixin(target[key],object[key]); // recursive for deep copy
        } else {
          Object.assign(target,object);
        }
      }
    }
  }
  return target;
}

const mixinProps = {PI: Math.PI, abs: Math.abs};
mixin(thing, mixinProps);
console.log("post-mixin addition of thing.PI:", thing.PI);
console.log("post-mixin addition of thing.abs:", thing.abs(-25));

/*
 * Chapter 12 Quiz Ninja!
 */
function random(a,b=1) {
  // if only 1 argument is provided, we need to swap the values of a and b
  if (b === 1) {
    [a,b] = [b,a];
  }
  return Math.floor((b-a+1) * Math.random()) + a;
}

 function shuffle(arr) {
  for (let i = arr.length; i; i--) {
    let j = random(i)-1;
    [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
  }
}

// View Object
const view12 = {
  score: document.querySelector('#score12 strong'),
  question: document.getElementById('question12'),
  response: document.getElementById('response12'),
  result: document.getElementById('result12'),
  info: document.getElementById('info12'),
  start: document.getElementById("start12"),

  render(target, content, attributes) {
    for(const key in attributes) {
      target.setAttribute(key, attributes[key]);
    }
    target.innerHTML = content;
  },

  buttons(array){
    return array.map(value => `<button>${value}</button>`).join('');
  },

  show(element) {
    element.style.display = 'block';
  },

  hide(element) {
    element.style.display = 'none';
  },
};

// Game Object
const game12 = {
  start(quiz) {
    view12.hide(view12.start);
    view12.score.innerText = this.score = 0;
    view12.info.result = "";
    view12.info.innerText = "";
    this.questions = [...quiz];
    this.ask();
  },

  ask(name) {
    if (this.questions.length > 0) {
      shuffle(this.questions);
      this.question = this.questions.pop();
      const options = [quiz[0].realName, quiz[1].realName, quiz[2].realName];
      shuffle(options);
      const question = `What is ${this.question.name}'s real name?`;
      view12.render(view12.question, question);
      view12.render(view12.response, view12.buttons(options));
    } else {
      this.gameOver();
    }
  },

  check(event) {
    const response = event.target.textContent;
    const answer = this.question.realName;
    if (response === answer) {
      view12.render(view12.result, 'Correct!', {'class':'correct'});
      this.score++;
      view12.render(view12.score, this.score);
    } else {
      view12.render(view12.result, `Wrong! The correct answer was ${answer}`, {'class':'wrong'});
    }

    view12.question.innerText = "";
    this.ask();
  },
  
  gameOver() {
    view12.render(view12.info,
        `Game over.<br>You scored ${this.score} point${this.score !== 1 ? 's' : ''}`);
    view12.show(view12.start);
  },
};

view12.response.addEventListener('click', (event) => game12.check(event), false);



/*
 * Chapter 15 Experimenting
 */



/*
 * Chapter 15 Quiz Ninja!
 */
