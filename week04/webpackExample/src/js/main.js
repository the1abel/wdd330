import _ from 'lodash';
document.getElementById("epoch").innerText = _.now();

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