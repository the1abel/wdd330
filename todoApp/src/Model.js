let user = null;
let data = {};

export default class Model {
  /**
   * VERIFY UNIQUE USER does not already exist in database
   * @param {string} username 
   */
  static verifyUniqueUser(username) {
    data = JSON.parse(localStorage.getItem('data')) || {};
    return ! data[username];
  }

  /**
   * HASH CODE
   * Hash a code (generate a hash code) from a salt and a password.
   * Derived from https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript#answer-7616484
   * @param {string} salt 
   * @param {string} password 
   */
  static hashCode(salt, password) {
    const str = salt + password;
    let hash = 0, i, chr;
    for (i = 0; i < str.length; i++) {
      chr   = str.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }

  /**
   * REGISTER NEW USER
   * @param {string} username 
   * @param {string} password 
   */
  static registerNewUser(username, password) {
    if (Model.verifyUniqueUser(username)) {
      user = username;
      data = JSON.parse(localStorage.getItem('data')) || {};
      const passwordSalt = Date.now(); // milliseconds since epoch
      data[username] = {
        password: {
          salt: passwordSalt,
          hash: Model.hashCode(passwordSalt, password),
        },
      };
      Model.saveAllLists([]);

      return true;
    };

    return false;
  }

  /**
   * LOG IN USER
   * @param {string} username 
   * @param {string} password 
   */
  static logInUser(username, password) {
    data = JSON.parse(localStorage.getItem('data'));
    if ( ! data || ! data[username]) {
      data = null;

      return false;
    }
    
    const passwordFromDb = data[username].password;
    if (Model.hashCode(passwordFromDb.salt, password) === passwordFromDb.hash) {
      user = username;

      return true;
    }

    return false;
  }

  /**
   * LOG OUT USER
   */
  static logOutUser() {
    user = null;
  }

  /**
   * READ ALL LISTS
   */
  static readAllLists() {
    if (user) {
      data = JSON.parse(localStorage.getItem('data'));
      return data[user].lists;
    } else {
      console.error('User is not logged in.');
    }
  }
  
  /**
   * SAVE ALL LISTS
   */
  static saveAllLists(lists) {
    if (user) {
      data[user].lists = lists;
      localStorage.setItem('data', JSON.stringify(data));
    } else {
      console.error('User is not logged in.');
    }
  }
}