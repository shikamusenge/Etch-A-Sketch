// variables
const bordDiv = document.querySelector("#board");
const pickedColor = document.getElementById("picked-color");
const colors = document.querySelectorAll(".color");
const resetBtn = document.querySelector("#rest-btn");
let color = "black";
let click = false;

/* functions */

const changeColor = () => {
  color = pickedColor.value;
};

const setSize = () => {
  const sizeInput = document.getElementById("grid-size");
  const loader = document.getElementById("loader");
  loader.style.display = "flex";
  const size = sizeInput.value;
  if (size > 0 && size < 100) {
    setGreed(size).then(() => (loader.style.display = "none"));
  } else alert("size should be greater than 0 and < 100");
};

const write = (grid, color) => {
  grid.style.backgroundColor = `${color}`;
};

const documentClick = () => {
  click = !click;
  document.querySelector("#paint").innerHTML = `${click}`;
};

function restDiagram() {
  const grids = document.querySelectorAll(".grid");
  grids.forEach((grid) => {
    write(grid, "white");
  });
}

const colorSelect = () => {
  color = cl.id;
  pickedColor.value = cl.dataset.color;
  colors.forEach((colorbox) => {
    cl.style.boxShadow = ``;
  });
  cl.style.boxShadow = ` 2px 2px 2px grey`;
};

/* end of functions */

/* event listeners */

pickedColor.addEventListener("change", changeColor);
document.addEventListener("click", documentClick);
resetBtn.addEventListener("click", restDiagram);

/* end of event listeners */

colors.forEach((cl) => {
  cl.onclick = () => {
    color = cl.id;
    pickedColor.value = cl.dataset.color;
    cl.style.boxShadow = ` 2px 2px 2px grey`;
  };
  cl.style.border = `solid 2px ${cl.id}`;
});

const setGreed = (size) => {
  bordDiv.innerHTML = "";
  for (i = 0; i < size ** 2; i++) {
    const boardItem = document.createElement("div");
    boardItem.classList.add("grid");
    boardItem.addEventListener("mouseover", () => {
      if (click) write(boardItem, color);
    });
    bordDiv.appendChild(boardItem);
  }
  bordDiv.style.setProperty("--size", size);
};

setGreed(16);
