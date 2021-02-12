import Model from './Model.js';
import List from './List.js';

export default class Auth {
  constructor() {
    document.getElementById('main').innerHTML = this.logInHtml;
    document.getElementById('loginBtn').addEventListener('click', this.logInUser);
    document.getElementById('registerBtn').addEventListener('click', this.registerNewUser);
    document.getElementById('logout').addEventListener('click', this.logOutUser);
    document.body.addEventListener('keyup', (event) => {
      if (event.key === 'Enter' &&
          (event.target === document.getElementById('loginUsername') ||
           event.target === document.getElementById('loginPassword'))) {
        document.getElementById('loginBtn').click();

      } else if (event.key === 'Enter' &&
          event.target === document.getElementById('registerPassword2')) {
        document.getElementById('registerBtn').click();

      }
    });
  }

  /**
   * REGISTER NEW USER
   */
  registerNewUser() {
    const username = document.getElementById('registerUsername').value;
    const password1 = document.getElementById('registerPassword1').value;
    const password2 = document.getElementById('registerPassword2').value;
    const registerError = document.getElementById('registerError');

    if (username.length < 5) {
    // username too short
      registerError.innerText = 'User name must be at least 5 characters.';
      
    } else if ( ! Model.verifyUniqueUser(username)) {
    // username already exists in database
      registerError.innerHTML = 'User name already exists in our system.<br>\
          Do you want to log in?';

    } else if (password1.length < 10) {
    // passwords don't match
      registerError.innerHTML = 'Password must be at least 10 characters.';

    } else if (password1 !== password2) {
    // passwords don't match
      registerError.innerHTML = 'Passwords must match.';

    } else {
    // valid credentials
      Model.registerNewUser(username, password1);
      loadListsApp();

    }
    registerError.className = 'error';
  }

  /**
   * LOG IN USER
   */
  logInUser() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    if (Model.logInUser(username, password)) {
    // credentials confirmed
    loadListsApp();

    } else {
    // invalid credentials
      const loginError = document.getElementById('loginError');
      loginError.innerHTML = 'Invalid user name and password comb.<br>\
          Do you want to register as a New User?';
      loginError.className = 'error';
    }
  }

  /**
   * LOG OUT USER
   */
  logOutUser() {
    document.location.href = document.location.href;
  }

  /** LOG IN HTML */
  logInHtml =
        `<div class="loginDiv">
          <header>Log In</header>
          <label for="loginUsername">User Name
            <input type="text" name="loginUsername" id="loginUsername">
          </label>
          <label for="loginPassword">Password
            <input type="password" name="loginPassword" id="loginPassword">
          </label>
          <div class="right"><button id="loginBtn" class="btn">Go</button></div>
          <div id="loginError"></div>
        </div>

        <!-- Register -->
        <div class="loginDiv">
          <header>Register New User</header>
          <label for="registerUsername">User Name
            <input type="text" name="registerUsername" id="registerUsername">
          </label>
          <label for="registerPassword1">Password
            <input type="password" name="registerPassword1" id="registerPassword1">
          </label>
          <label for="registerPassword2">Repeat Password
            <input type="password" name="registerPassword2" id="registerPassword2">
          </label>
          <div class="right"><button id="registerBtn" class="btn">Go</button></div>
          <div id="registerError"></div>
        </div>`;
}

function loadListsApp() {
  List.initGallery();
  document.getElementById('createList').style.visibility = 'visible';
  document.getElementById('logout').style.visibility = 'visible';

  document.getElementById('createList').addEventListener('click', () => {
    List.createList();
  });
  
  document.querySelector('body header h1').addEventListener('click', () => {
    List.showAllListsInConsole();
  });
}