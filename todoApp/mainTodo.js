import List from './List.js';

List.initListGallery();

document.getElementById('createList').addEventListener('click', () => {
  List.createList();
});

document.querySelector('body header h1').addEventListener('click', () => {
  List.showAllListsInConsole();
});