import Model from './model.js';
import { createModal, closeModal } from './utils.js';

let lists = [];

export default class List {
  constructor({listName = null, items = []}={}) {
    if ( ! listName) {
      // default constructor
      this.listName = null;
      this.items = [];

    } else {
      // non-default constructor
      this.listName = listName;
      this.items = items;
    }
  }

  /**
   * INITIALIZE LIST GALLERY
   */
  static initListGallery() {
    List.readAllLists();
    if (lists.length) List.renderAllLists();
  }

  /**
   * CREATE LIST
   */
  static createList() {
    lists.push(new List());

    const modalContent = `<label for="newName">List name
                            <input type="text" name="newName" id="newName">
                          </label>
                          <button id="nameList" class="btn">Create list</button>`;
    createModal({
        modalContent,
        modalHeader: 'Create a list',
        callbackOnClose: () => {if ( ! lists[lists.length -1].name) lists.pop()}
        // if modal was closed without giving it a name, then remove the empty list
    });

    document.getElementById('newName').focus();

    document.getElementById('nameList').addEventListener('click', () => {
      const newName = document.getElementById('newName').value;
      if (newName) {
        const list = lists[lists.length -1];
        list.listName = newName;
        closeModal();
        list.renderEditableList();
        List.saveAllLists();
        document.getElementById('addItemInput').focus();
      }
    });
  }

  /**
   * RENDER STATIC LIST
   */
  renderStaticList() {
    const staticListDiv = document.createElement('div');
    staticListDiv.className = 'staticListDiv';
    staticListDiv.addEventListener('click', () => {this.renderEditableList()});
    const header = document.createElement('header');
    header.innerText = this.listName;
    staticListDiv.appendChild(header);

    for (const item of this.items) {
      const p = document.createElement('p');
      p.innerText = item.content;
      p.className = item.completed ? 'completed' : '';
      staticListDiv.appendChild(p);
    }

    document.getElementById('listsGallery').appendChild(staticListDiv);
  }

  /**
   * RENDER EDITABLE LIST for user to add/edit/delete list items
   */
  renderEditableList() {
    const modalHeader = `<div class="editableListHeader">
                          <span>${this.listName}</span>
                          <span id="deleteList">Delete</span>
                          <span id="renameList">Edit</span>
                        </div>`;
    createModal({ modalHeader, callbackOnClose: List.renderAllLists });

    document.getElementById('deleteList')
      .addEventListener('click', () => {this.deleteList()});

    document.getElementById('renameList')
      .addEventListener('click', () => {this.renameList()});

    // create modal content
    const modalContent = document.getElementById('modalContent');
    const itemsContainer = document.createElement('div');
    itemsContainer.className = 'itemsContainer';

    this.items.forEach((item, i) => {
      const listItemDiv = document.createElement('div');
      listItemDiv.className = 'listItemDiv';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = item.completed;
      checkbox.addEventListener('click', (event) => {List.completeItem(event, item)});
      listItemDiv.appendChild(checkbox);

      const label = document.createElement('span');
      label.innerText = item.content;
      if (item.completed) {
        label.className = 'completed';
      }
      listItemDiv.appendChild(label);

      const deleteBtn = document.createElement('button');
      deleteBtn.innerHTML = '&times;';
      deleteBtn.className = 'btn';
      deleteBtn.addEventListener('click', (event) => {this.deleteItem(event, item)});
      listItemDiv.appendChild(deleteBtn);

      itemsContainer.appendChild(listItemDiv);
    });
    modalContent.appendChild(itemsContainer);

    const addItemDiv = document.createElement('div');

    const addItemInput = document.createElement('input');
    addItemInput.id = 'addItemInput';
    addItemInput.addEventListener(
        'keyup', (event) => { if (event.key === 'Enter') this.addItem()});
    addItemDiv.appendChild(addItemInput);

    const addBtn = document.createElement('button');
    addBtn.className = 'btn';
    addBtn.innerHTML = '&plus;';
    addBtn.addEventListener('click', () => {this.addItem()});
    addItemDiv.appendChild(addBtn);

    modalContent.appendChild(addItemDiv);
  }

  /**
   * RENDER ALL LISTS
   */
  static renderAllLists() {
    const listsGallery = document.getElementById('listsGallery');
    listsGallery.innerHTML = '';
    for (const l of lists) {
      l.renderStaticList();
    }
  }

  /**
   * READ ALL LISTS
   */
  static readAllLists() {
    const rawLists = Model.readAllLists(lists); // simple objects, which lack methods
    if (rawLists) {
      for (const l of rawLists) {
        lists.push(new List({ listName: l.listName, items: l.items }));
      }
    }
  }

  /**
   * SAVE ALL LISTS
   */
  static saveAllLists() {
    Model.saveAllLists(lists);
  }

  /**
   * ADD ITEM to a list
   */
  addItem() {
    const addItemInput = document.getElementById('addItemInput');
    this.items.push({
      id: Date.now(),
      content: addItemInput.value,
      completed: false,
    })
    addItemInput.value = '';
    closeModal();
    this.renderEditableList();
    document.getElementById('addItemInput').focus();
    List.saveAllLists();
  }

  /**
   * COMPLETE ITEM
   * @param {event} event 
   * @param {object} item 
   */
  static completeItem(event, item) {
    item.completed = ! item.completed;
    event.target.parentElement.children[1].classList.toggle('completed');
    List.saveAllLists();
  }
  
  /**
   * DELETE ITEM from a list
   * @param {event} event 
   * @param {object} item 
   */
  deleteItem(event, item) {
    const i = this.items.findIndex((val) => val.id === item.id);
    this.items.splice(i, 1);
    List.saveAllLists();
    event.target.parentElement.remove();
  }

  renameList() {
    closeModal();
    const modalContent = `<label for="newName">New list name
                            <input type="text" name="newName" id="newName"
                                value="${this.listName}">
                          </label>
                          <button id="renameList" class="btn">Save</button>`;
    createModal({ modalContent, modalHeader: 'Change list name' });

    document.getElementById('newName').focus();

    document.getElementById('renameList').addEventListener('click', () => {
      const newName = document.getElementById('newName').value;
      if (newName) {
        this.listName = newName;
        closeModal();
        List.renderAllLists();
        this.renderEditableList();
        List.saveAllLists();
      }
    });
  }

  deleteList() {
    alert('need to create deleteList() method'); // DEBUG
  }

  static showAllListsInConsole() {
    console.log(lists);
  }
}