let user = null;
let data = {};
const salt = 'Father shall consecrate thine afflictions for thy gain.';

/**
 * MODEL
 * Singleton class with only static methods and "private members" (user & data)
 */
export default class Model {
  /**
   * VERIFY UNIQUE USER does not already exist in database
   * @param {string} username 
   */
  static verifyUniqueUser(username) {
    data = JSON.parse(Model.decipher(localStorage.getItem('data'))) || {};
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
   * CIPHER (encrypt a string)
   * Derived from https://stackoverflow.com/questions/18279141/javascript-string-encryption-and-decryption#answer-54026460
   * @param {string} text 
   */
  static cipher(text) {
    const textToChars = text => text.split('').map(c => c.charCodeAt(0));
    const byteHex = n => ("0" + Number(n).toString(16)).substr(-2);
    const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);

    return text.split('')
        .map(textToChars)
        .map(applySaltToChar)
        .map(byteHex)
        .join('');
  }

  /**
   * DECIPHER (decrypt a string)
   * Derived from https://stackoverflow.com/questions/18279141/javascript-string-encryption-and-decryption#answer-54026460
   * @param {string} encodedText 
   */
  static decipher(encodedText) {
      if ( ! encodedText) return null;

      const textToChars = text => text.split('').map(c => c.charCodeAt(0));
      const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);
      return encodedText.match(/.{1,2}/g)
          .map(hex => parseInt(hex, 16))
          .map(applySaltToChar)
          .map(charCode => String.fromCharCode(charCode))
          .join('');
  }

/**
   * REGISTER NEW USER
   * @param {string} username 
   * @param {string} password 
   */
  static registerNewUser(username, password) {
    if (Model.verifyUniqueUser(username)) {
      user = username;
      data = JSON.parse(Model.decipher(localStorage.getItem('data'))) || {};
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
    data = JSON.parse(Model.decipher(localStorage.getItem('data')));
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
      data = JSON.parse(Model.decipher(localStorage.getItem('data')));
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
      localStorage.setItem('data', Model.cipher(JSON.stringify(data)));
    } else {
      console.error('User is not logged in.');
    }
  }
}