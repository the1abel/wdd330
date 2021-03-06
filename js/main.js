const projectsObj = {
  "Week 01: LocalStorage": "week01",
  "Week 02: Arrays, Logic, Loops, and Functions": "week02",
  "Week 03: Objects, DOM, and Events": "week03",
  "Week 04: Forms, OOP, Modern JavaScript": "week04",
  "Week 05: Testing and Debugging": "week05",
  "TODO App": "todoApp/dist",
  "Week 07: Further Functions, Ajax": "week07",
  "Week 08: Transformations, Transitions, Canvas, SVG, and Drag and Drop": "week08",
  "Week 09: The Window Object and HTML5": "week09",
};

const projectsList = document.getElementById("projectsList");
const previewPane = document.getElementById("previewPane");

for (const prop in projectsObj) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.textContent = prop;
  a.href = projectsObj[prop];
  li.appendChild(a);
  li.addEventListener("mouseenter", () => {previewPane.src = projectsObj[prop]});
  projectsList.appendChild(li);
}
