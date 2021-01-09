const projectsObj = {
  "Week 01: LocalStorage": "week01/index.html",
  "Week 02: Arrays, Logic, Loops, and Functions": "week02/index.html",
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
