// Hike View handler
export default class HikesView {
  constructor(model, parentElement) {
    this.model = model;
    this.parentElement = parentElement;
    // will need this
    this.imgBasePath = '//byui-cit.github.io/cit261/examples/';
  }
  renderHikeList() {
    // loop through our list of hikes building out the appropriate HTML for each and append it to the listElement
    const hikeList = this.model.getAllHikes();
    this.parentElement.innerHTML = "";
    for (const hike of hikeList) {
      this.parentElement.appendChild(this.renderOneHikeLight(hike));
    }
  }
  renderOneHikeLight(hike) {
    // this method will be used to create the list of hikes with less detail: name, image, distance, difficulty
    const item = document.createElement("li");

    item.innerHTML = ` <h2>${hike.name}</h2>
                      <div class="image">
                        <img src="${this.imgBasePath}${hike. imgSrc}" alt="${hike.imgAlt}">
                        </div>
                      <div>
                              <div>
                                  <h3>Distance</h3>
                                  <p>${hike.distance}</p>
                              </div>
                              <div>
                                  <h3>Difficulty</h3>
                                  <p>${hike.difficulty}</p>
                              </div>
                      </div>`;
    item.addEventListener("click", () => {this.renderOneHikeFull(hike)});

    return item;
  }
  renderOneHikeFull(hike) {
    // this method will be used to one hike with full detail...you will need this for the stretch goal! 
    const li = document.createElement("li");

    li.innerHTML = `<h2>${hike.name}</h2>
                      <div class="image">
                        <img src="${this.imgBasePath}${hike. imgSrc}"
                            alt="${hike.imgAlt}">
                      </div>
                      <div>
                        <div>
                            <h3>Distance</h3>
                            <p>${hike.distance}</p>
                        </div>
                        <div>
                            <h3>Difficulty</h3>
                            <p>${hike.difficulty}</p>
                        </div>
                        <div>
                          <h3>Description</h3>
                          <p>${hike.description}</p>
                        </div>
                        <div>
                          <h3>Directions</h3>
                          <p>${hike.directions}</p>
                        </div>
                      </div>`;

    const button = document.createElement("button");
    button.innerText = "Back";
    // NOTE: The next 2 lines do the same thing (slightly different syntax)
    // button.addEventListener("click", () => {this.showHikeList()});
    button.onclick = () => {this.renderHikeList()};
    li.appendChild(button);

    this.parentElement.innerHTML = "";
    this.parentElement.appendChild(li);
  }
}