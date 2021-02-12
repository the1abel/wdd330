# Welcome to Abel's "Lists Galore" To-do web app

Experience [Lists Galore](https://the1abel.github.io/wdd330/todoApp/dist/) in action for yourself!

## The following features exceed the assignment's requirements:
 - Multiple users
 - User authentication (with passwords stored & validated via one-way hash)
 - Multiple lists for each user
 - Drag-and-drop to sort items within a list
 - Filter setting retained in "database" for each individual list
 - Enter and Esc key listeners throughout application for good UX
 - ES6 classes & modules
 - Webpack (bundle & minify JS) and Babel (transpile JS to ES5)
 - Encrypt into & decrypt from `localStorage`

## Following are the [assignment instructions](https://byui-cit.github.io/cit261/resources/todo.html):
 1. Description: Build a simple web app to manage a ToDo list. It should allow the creation of new tasks, the viewing of tasks, a process to mark tasks as complete, ability to remove tasks, and the ability to filter by complete/not complete.
 2. Todo app wireframe  
    ![](https://byui-cit.github.io/cit261/images/todo-wireframe.png)  
 3. UI actions
    1. Show a list of tasks
    2. Add a new task
    3. Complete a task
    4. Remove a task
    5. Filter tasks (complete/incomplete)
 4. Data sources: localStorage
    1. todo: { id : timestamp, content: string, completed: bool }
    2. toDoList = [toDo];
 5. Initial Module list: ToDos.js, localStorage helpers (ls.js), utilities.js
 6. Colors/Typography/specific Element styling: Student to determine

## Code Style Considerations:
With as many opinions about coding style as there are software developers, in the absence of any guidance from leadership, for this project I chose to favor limiting scope, fewer classes, and fewer top-level methods in each class.
This is admittedly ripe for refactor, as the `List` class combines View and Controller code, as well as code applicable to a "set of Lists" and each "child List".
Also, `List#renderEditableList()` (`List.js` lines 94-350, including functions nested to limit scope) generates all elements and attributes programmatically, instead of writing HTML as a string for the browser to parse (via `Element#innerHTML`), which results in better performance (albeit irrelevant for most client devices).

## Note:
This assignment is focused on front end web development.  As such, this app utilizes `localStorage` as the "database".  Meanwhile, the `Model.js` ES6 module is designed and implemented in such a way that the methods could easily be refactored to reach out to a back end web service with 6 simple endpoints (validateUniqueUserName, registerNewUser, logInUser, logOutUser, readAllLists, saveAllLists).  NoSQL would be ideal for these transactions.
