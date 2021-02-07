export default class Model {
    /**
   * READ ALL LISTS
   */
  static readAllLists() {
    return JSON.parse(localStorage.getItem('lists'));
  }
  
  /**
   * SAVE ALL LISTS
   */
  static saveAllLists(lists) {
    localStorage.setItem('lists', JSON.stringify(lists));
  }
}