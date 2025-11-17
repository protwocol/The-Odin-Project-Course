const body = document.querySelector("body");
const container = document.querySelector(".container");
const button = document.querySelector("button");
const containerSize = 700;

let gridSize = 16;

function canvasSize(size) {
  const grid = size ** 2;
  const boxSize = containerSize / size;
  const pixel = boxSize - 2 + "px";

  for (let r = 0; r < grid; r++) {
    const div = document.createElement("div");
    div.classList.add("box");

    div.style.width = pixel;
    div.style.height = pixel;

    div.addEventListener("mouseenter", (e) => {
      const element = e.target;
      const currentColor = window.getComputedStyle(element).backgroundColor;
      const getRgb = currentColor.match(/\d+/g);

      const maxValue = Math.max(...getRgb);
      const reducedValue = maxValue * 0.9;

      if (
        !getRgb ||
        (getRgb[0] === "0" && getRgb[1] === "0" && getRgb[2] === "0")
      ) {
        return;
      }

      let getRandomValue = () => {
        return Math.floor(Math.random() * reducedValue);
      };

      let r = getRandomValue();
      let g = getRandomValue();
      let b = getRandomValue();

      e.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    });

    container.appendChild(div);
  }
}

button.addEventListener("click", () => {
  const number = prompt("Input number 1-100: ");
  if (number > 100 || number < 1) {
    alert("invalid number!");
    return;
  }

  gridSize = number;
  container.innerHTML = "";
  canvasSize(gridSize);
});

canvasSize(gridSize);
