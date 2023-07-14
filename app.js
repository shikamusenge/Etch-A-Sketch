const bordDiv = document.querySelector("#board");
const pickedColor = document.getElementById("picked-color");
let color = "black";
let click = false;
pickedColor.addEventListener("change", () => {
  color = pickedColor.value;
});
const setSize = () => {
  const sizeInput = document.getElementById("grid-size");
  const loader = document.getElementById("loader");
  loader.style.display = "flex";
  const size = sizeInput.value;
  if (size > 0 && size < 100) {
    setGreed(size).then(() => (loader.style.display = "none"));
  } else alert("size should be greater than 0 and < 100");
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
const setGreed = async (size) => {
  bordDiv.querySelectorAll("div").forEach((div) => {
    div.remove();
  });
  const createDivisions = () => {
    let divisions = "";
    for (j = 1; j <= size * size; j++) {
      divisions += "<div class='grid'></div>";
    }
    return divisions;
  };
  const gridDivs = await createDivisions();
  bordDiv.innerHTML = gridDivs;
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
