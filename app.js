const bordDiv = document.querySelector("#board");
const pickedColor = document.getElementById("picked-color");
let color = "black";
let click = false;
pickedColor.addEventListener("change", () => {
  color = pickedColor.value;
});
const setSize = () => {
  const sizeInput = document.getElementById("grid-size");
  const size = sizeInput.value;
  if (size > 0 && size < 100) setGreed(size);
  else alert("size should be greater than 0 and < 100");
};
const colors = document.querySelectorAll(".color");
colors.forEach((cl) => {
  cl.onclick = () => {
    color = cl.id;
    pickedColor.value = cl.dataset.color;
    colors.forEach((colorbox) => {
      cl.style.boxShadow = ``;
    });
    cl.style.boxShadow = ` 2px 2px 2px grey`;
  };
  cl.style.border = `solid 2px ${cl.id}`;
});
const write = (grid, color) => {
  grid.style.backgroundColor = `${color}`;
};
const setGreed = (size) => {
  bordDiv.innerHTML = "";
  for (j = 1; j <= size; j++) {
    for (i = 1; i <= size; i++) {
      bordDiv.innerHTML += "<div class='grid'></div>";
    }
  }
  bordDiv.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  const grids = document.querySelectorAll(".grid");
  grids.forEach((grid) => {
    grid.onmouseover = () => {
      if (click) write(grid, color);
    };
  });
};
setGreed(16);
document.onclick = () => {
  click = !click;
  document.querySelector("#paint").innerHTML = `${click}`;
};
document.querySelector("#rest-btn").onclick = () => {
  restDiagram();
};

function restDiagram() {
  const grids = document.querySelectorAll(".grid");
  grids.forEach((grid) => {
    write(grid, "white");
  });
}
