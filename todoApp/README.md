# Welcome to Abel's "Lists Galore" To-do web app

Check out [the app](./dist/index.html).

## The following features exceed the assignment's requirements:
 - Multiple users
 - User authentication (with passwords stored as one-way hash)
 - Multiple lists for each user
 - Drag-and-drop to sort items within a list
 - Filter setting retained in "database" for each individual list
 - Enter and Esc key listeners throughout application for good UX
 - ES6 classes & modules
 - Use of Webpack (bundle & minify JS) and Babel (transpile JS to ES5)
 - Encrypt into & decrypt from `localStorage`

## The following are the [assignment instructions](https://byui-cit.github.io/cit261/resources/todo.html):
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

## Note:
This class and assignment focus on front end web development. As such, this utilizes `localStorage` as the "database". Meanwhile, the `Model.js` ES6 module is designed and implemented in such a way that the methods could easily be refactored to reach out to a back end web service with 6 simple endpoints (validateUniqueUserName, registerNewUser, logInUser, logOutUser, readAllLists, saveAllLists).
