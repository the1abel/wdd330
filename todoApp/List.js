import Model from './model.js';
import { createModal, closeModal } from './utils.js';

let lists = [];

export default class List {
  constructor({listName = null, items = [], filter = 'all'}={}) {
    this.listName = listName ? listName : null;
    this.items = items.length ? items : [];
    this.filter = filter ? filter : 'all';
  }

  /**
   * INITIALIZE LIST GALLERY
   */
  static initGallery() {
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

    // name list when either button click or press Enter
    const nameList = () => {
      const newName = document.getElementById('newName').value;
      if (newName) {
        const list = lists[lists.length -1];
        list.listName = newName;
        list.renderEditableList();
        List.saveAllLists();
        document.getElementById('addItemInput').focus();
      }
    };

    document.getElementById('nameList').addEventListener('click', nameList);
    document.getElementById('newName').addEventListener('keyup', (event) => {
      if (event.key === "Enter") nameList();
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
   * SUM ACTIVE ITEMS (total of items Not completed)
   */
  sumActiveItems() {
    let sum = 0;
    for (const item of this.items) {
      sum += Number( ! item.completed);
    }
    document.getElementById('totalActiveSpan').innerText = sum ? sum : 'No';
  }

  /**
   * RENDER EDITABLE LIST for user to add/edit/delete list items
   */
  renderEditableList() {
    closeModal();

    // createModal and modalHeader
    const modalHeader = `<div class="editableListHeader">
                          <span>${this.listName}</span>
                          <span id="deleteList"><i class="far fa-trash-alt"></i></span>
                          <span id="renameList"><i class="fas fa-pencil-alt"></i></span>
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

    // function: change list item content/name
    const changeContent = (event, item) => {
      const contentSpan = event.target;
      let newContentInputRemoved = false;
      const updateContent = (event) => {
        if ( ! newContentInputRemoved) {
          newContentInputRemoved = true;
          contentSpan.innerText = event.target.value;
          item.content = event.target.value;
          document.getElementById('newContentInput').remove();
          contentSpan.style.display = 'initial';
          List.saveAllLists();
        }
      };

      contentSpan.style.display = 'none';
      const newContentInput = document.createElement('input');
      newContentInput.id = 'newContentInput';
      newContentInput.value = contentSpan.innerText;
      newContentInput.addEventListener('blur', updateContent);
      newContentInput.addEventListener('keyup', (event) => {
        if (event.key === "Enter") updateContent(event);
      });
      contentSpan.insertAdjacentElement('afterend', newContentInput);
      newContentInput.focus();
    };

    // function: grab list items to move them up and down (resort them)
    const grabListItem = (event) => {
      event.preventDefault(); // prevents text being highlighted as use moves mouse
      const subjectListItem = event.target.closest('.listItemDiv');
      subjectListItem.classList.add('moving');
      let previousY = event.clientY;

      // function: move list item
      const moveListItem = (moveEvent) => {
        const yDiff = moveEvent.clientY - previousY;
        subjectListItem.style.transform = `translateY(${yDiff}px)`;

        let index = parseInt(subjectListItem.dataset.index);
        let subjectListItemTop = subjectListItem.getBoundingClientRect().top;
        const p = subjectListItem.parentElement;
        
        if (index > 0 &&
            subjectListItemTop < p.children[index - 1].getBoundingClientRect().top) {
        /**
         * move item up one space
         */
          // handle element visual movement (adjust for new position)
          previousY = moveEvent.clientY;
          subjectListItem.style.transform = 'translateY(0px)';
          // swap nodes
          const old = p.replaceChild(subjectListItem, p.children[index - 1]);
          subjectListItem.insertAdjacentElement('afterEnd', old);
          // swap dataset indices
          old.dataset.index = index;
          subjectListItem.dataset.index = index - 1;
          // swap items in array
          const holder = this.items[index];
          this.items[index] = this.items[index - 1];
          this.items[index - 1] = holder;

        } else if (index < p.children.length -2 && // -2 due to footer & 0-based counting
            subjectListItemTop > p.children[index + 1].getBoundingClientRect().top) {
        /**
         * move item down one space
         **/
          // handle element visual movement (adjust for new position)
          previousY = moveEvent.clientY;
          subjectListItem.style.transform = 'translateY(0px)';
          // swap nodes
          const old = p.replaceChild(subjectListItem, p.children[index + 1]);
          subjectListItem.insertAdjacentElement('beforeBegin', old);
          // swap dataset indices
          old.dataset.index = index;
          subjectListItem.dataset.index = index + 1;
          // swap items in array
          const holder = this.items[index];
          this.items[index] = this.items[index + 1];
          this.items[index + 1] = holder;
        }
      };

      // function: release list item
      const releaseListItem = (event) => {
        subjectListItem.classList.remove('moving');
        document.body.removeEventListener('mousemove', moveListItem);
        document.body.removeEventListener('mouseup', releaseListItem);
        this.renderEditableList();
        List.saveAllLists();
      };

      document.body.addEventListener('mousemove', moveListItem);
      document.body.addEventListener('mouseup', releaseListItem);
    };      

    // create list items
    for (const [i, item] of this.items.entries()) {
      const listItemDiv = document.createElement('div');
      listItemDiv.setAttribute('data-index', i);
      listItemDiv.className = `listItemDiv\
          ${item.completed ? 'completed' : 'active'}\
          ${this.filter === 'active' && item.completed ? 'hidden' : ''}\
          ${this.filter === 'completed' && ! item.completed ? 'hidden' : ''}`;

      // grab bars
      const grabBars = document.createElement('i');
      grabBars.className = 'fas fa-grip-horizontal';
      grabBars.addEventListener('mousedown', grabListItem);
      listItemDiv.appendChild(grabBars);

      // checkbox
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'completeCheckbox';
      checkbox.checked = item.completed;
      checkbox.addEventListener('click', (event) => {this.completeItem(event, item)});
      listItemDiv.appendChild(checkbox);

      // item content
      const content = document.createElement('span');
      content.innerText = item.content;
      content.className = item.completed ? 'completed' : '';
      content.addEventListener('click', (event) => {changeContent(event, item)});
      listItemDiv.appendChild(content);

      // delete button
      const deleteBtn = document.createElement('button');
      deleteBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
      deleteBtn.className = 'btn warning';
      deleteBtn.addEventListener('click', (event) => {this.deleteItem(event, item)});
      listItemDiv.appendChild(deleteBtn);

      itemsContainer.appendChild(listItemDiv);
    }

    // items container footer
    const itemsContainerFooter = document.createElement('footer');
    itemsContainerFooter.className = 'itemsContainerFooter';

    // items container footer: active total count
    const totalActiveP = document.createElement('p');
    totalActiveP.className = 'totalActiveP';
    const totalActiveSpan = document.createElement('span');
    totalActiveSpan.id = 'totalActiveSpan';
    totalActiveP.appendChild(totalActiveSpan);
    const totalActiveText = document.createTextNode(' tasks left');
    totalActiveP.appendChild(totalActiveText);
    itemsContainerFooter.appendChild(totalActiveP);

    // items container footer: filter selector (function)
    const changeFilter = (filter) => {
      this.filter = filter ? filter : 'all';
      const active = document.getElementsByClassName('listItemDiv active');
      const completed = document.getElementsByClassName('listItemDiv completed');
      for (const btn of document.getElementsByClassName('filter')) {
        btn.classList.remove('current');
      }

      switch (filter) {
        case 'active':
          for (const activeItem of active) activeItem.classList.remove('hidden');
          for (const completedItem of completed) completedItem.classList.add('hidden');
          document.getElementsByClassName('filter active')[0].classList.add('current');
          break;
          
        case 'completed':
          for (const completedItem of completed) completedItem.classList.remove('hidden');
          for (const activeItem of active) activeItem.classList.add('hidden');
          document.getElementsByClassName('filter completed')[0].classList.add('current');
          break;
          
        default: // 'all'
          for (const completedItem of completed) completedItem.classList.remove('hidden');
          for (const activeItem of active) activeItem.classList.remove('hidden');
          document.getElementsByClassName('filter all')[0].classList.add('current');
          break;
      }
      List.saveAllLists();
    }

    // items container footer: filter selector
    const filterContainer = document.createElement('span');
    filterContainer.className = 'filterContainer';

    const icon = document.createElement('i');
    icon.className = 'fas fa-filter';
    filterContainer.appendChild(icon);

    const filterAllBtn = document.createElement('button');
    filterAllBtn.className = `btn filter all ${this.filter === 'all' ? 'current' : ''}`;
    filterAllBtn.innerText = 'All';
    filterAllBtn.addEventListener('click', () => {changeFilter('all')});
    filterContainer.appendChild(filterAllBtn);

    const filterActiveBtn = document.createElement('button');
    filterActiveBtn.className =
        `btn filter active ${this.filter === 'active' ? 'current' : ''}`;
    filterActiveBtn.innerText = 'Active';
    filterActiveBtn.addEventListener('click', () => {changeFilter('active')});
    filterContainer.appendChild(filterActiveBtn);

    const filterCompletedBtn = document.createElement('button');
    filterCompletedBtn.className =
        `btn filter completed ${this.filter === 'completed' ? 'current' : ''}`;
    filterCompletedBtn.innerText = 'Completed';
    filterCompletedBtn.addEventListener('click', () => {changeFilter('completed')});
    filterContainer.appendChild(filterCompletedBtn);

    itemsContainerFooter.appendChild(filterContainer);
    itemsContainer.appendChild(itemsContainerFooter);

    modalContent.appendChild(itemsContainer);

    // input to add new list item
    const addItemFooter = document.createElement('footer');

    const addItemInput = document.createElement('input');
    addItemInput.id = 'addItemInput';
    addItemInput.addEventListener(
        'keyup', (event) => { if (event.key === 'Enter') this.addItem()});
    addItemFooter.appendChild(addItemInput);

    const addBtn = document.createElement('button');
    addBtn.className = 'btn';
    addBtn.innerHTML = '<i class="fas fa-plus"></i>';
    addBtn.addEventListener('click', () => {this.addItem()});
    addItemFooter.appendChild(addBtn);

    modalContent.appendChild(addItemFooter);
    this.sumActiveItems();

    // focus on addItemInput if no items in list
    if ( ! this.items.length) document.getElementById('addItemInput').focus();
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
        lists.push(new List({ listName: l.listName, items: l.items , filter: l.filter }));
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
    if (addItemInput.value) {
      this.items.push({
        index: this.items.length,
        id: Date.now(),
        content: addItemInput.value,
        completed: false,
      })
      addItemInput.value = '';
      this.renderEditableList();
      document.getElementById('addItemInput').focus();
      List.saveAllLists();
    }
  }

  /**
   * COMPLETE ITEM
   * @param {event} event 
   * @param {object} item 
   */
  completeItem(event, item) {
    item.completed = ! item.completed;
    this.renderEditableList();
    List.saveAllLists();
  }
  
  /**
   * DELETE ITEM from a list
   * @param {event} event 
   * @param {object} item 
   */
  deleteItem(event, item) {
    const index = this.items.findIndex((val) => val.id === item.id);
    this.items.splice(index, 1);
    List.saveAllLists();
    event.target.closest('.btn').parentElement.remove();
    this.sumActiveItems();
  }

  /**
   * RENDER LIST
   */
  renameList() {
    closeModal();
    const modalContent = `<label for="newName">New list name
                            <input type="text" name="newName" id="newName"
                                value="${this.listName}">
                          </label>
                          <button id="renameList" class="btn">Save</button>`;
    createModal({ modalContent, modalHeader: 'Change list name' });

    document.getElementById('newName').focus();

    // save name when either button click or press Enter
    const saveName =() => {
      const newName = document.getElementById('newName').value;
      if (newName) {
        this.listName = newName;
        closeModal();
        List.renderAllLists();
        this.renderEditableList();
        List.saveAllLists();
      }
    };

    document.getElementById('renameList').addEventListener('click', saveName);
    document.getElementById('newName').addEventListener('keyup', (event) => {
      if (event.key === "Enter") saveName();
    });
  }
  
  /**
   * DELETE LIST
   */
  deleteList() {
    closeModal();
    const modalHeader = 'Confirm delete';
    const modalContent = `<div>
                            <p>Are you sure you want to permanently delete ${this.listName}?
                            <div>
                              <button id="cancelDelete" class="btn">Cancel</button>
                              <button id="confirmDelete" class="btn warning">Delete</button>
                            </div>
                          </div>`;
    createModal({
      modalHeader,
      modalContent,
      callbackOnClose: () => {this.renderEditableList()},
    });

    // cancel delete
    document.getElementById('cancelDelete')
      .addEventListener('click', () => {this.renderEditableList()});

    // confirm delete
    document.getElementById('confirmDelete').addEventListener('click', () => {
      const index = lists.indexOf(this);
      lists.splice(index, 1);
      List.saveAllLists();
      closeModal();
      List.renderAllLists();
    });
  }

  /**
   * SHOW ALL LISTS IN CONSOLE
   * A helper function (tied to the )
   */
  static showAllListsInConsole() {
    console.log(lists);
  }
}