// A possible saving mechanism
// function getCurrentGrid() {
// 	const colorArray = [];
// 	const cells = document.querySelectorAll('.square');
// 	cells.forEach(cell => {
// 		colorArray.push(cell.style.backgroundColor);
// 	});
// 	console.log(colorArray);
// }

function createDefaultGrid(gridSize = 50, colors = []) {
	let squareSize = 100/gridSize;
	let grid = document.getElementsByClassName("container-m")[0];
	grid.style = "width: 100vw; height: 100vw;"
	let colorIndex = 0;

	for (let i=0;i<gridSize;i++) {
		let container = document.createElement('div');
		container.style = "display: flex; width: 100%;";
		container.className = "container";
		container.id = i;
		grid.appendChild(container);

		for (let j=0;j<gridSize;j++) {
			let div = document.createElement('div');
			div.className = "square";
			div.style = `height: ${squareSize}vw; width: ${squareSize}vw; background-color: ${colors[colorIndex]};`
			document.getElementById(i).appendChild(div);
			colorIndex++;
		}
	}
}

function createGrid(gridSize = 50) {
	let squareSize = 100/gridSize;
	let grid = document.getElementsByClassName("container-m")[0];
	grid.style = "width: 100vw; height: 100vw;"

	for (let i=0;i<gridSize;i++) {
		let container = document.createElement('div');
		container.style = "display: flex; width: 100%;";
		container.className = "container";
		container.id = i;
		grid.appendChild(container);

		for (let j=0;j<gridSize;j++) {
			let div = document.createElement('div');
			div.className = "square";
			div.style = `height: ${squareSize}vw; width: ${squareSize}vw;`
			document.getElementById(i).appendChild(div);
		}
	}
}

function changeBg (element) {
	element.style.backgroundColor = bg;
}

// https://gomakethings.com/why-you-shouldnt-attach-event-listeners-in-a-for-loop-with-vanilla-javascript/
// https://gomakethings.com/why-event-delegation-is-a-better-way-to-listen-for-events-in-vanilla-js/
function draw(event) {
	if (rainbow) bg = rng();
	if (event.target.matches('.square')) {
		changeBg(event.target);
	}
}

function toggle(event) {
	if (drawing && event.target.matches('.square')) {
		document.body.style.cursor = "default";
		drawing = false;
		document.removeEventListener('mouseover', draw);
	} else if (event.target.matches('.square')) {
		bg === "transparent" ? document.body.style.cursor = "pointer" : document.body.style.cursor = "crosshair";
		document.addEventListener('mouseover', draw);
		drawing = true;
		event.target.style.backgroundColor = bg;
	}
}

function reset() {
	for (let square of squares) {
		square.style.backgroundColor = "transparent";
	}
}

function newGrid(event) {
	let containers = document.getElementsByClassName('container');
	Array.from(containers).forEach(container => container.remove());
	createGrid(event.target.value);
}

let squares = document.getElementsByClassName('square');
let menu = document.getElementsByClassName('floating-menu')[0];	
let drawing = false;
let rainbow = true;
let bg = "";

document.addEventListener('click', toggle);
document.addEventListener('mouseover', draw);

// Popupmenu
function popup(event) {
	event.preventDefault();
	if (menu.style.display !== "flex") {
		menu.style.display = "flex";
	} else {
		menu.style.display = "none";
	}
}

document.addEventListener('contextmenu', popup);

// Reset
const rButton = document.getElementById('reset');
rButton.addEventListener('click', reset);

// Exit button
const eButton = document.getElementById('exit');
eButton.addEventListener('mousedown', () => {menu.style.display = "none"});

// Gridsize slider
const cSlider = document.getElementById('change');
cSlider.addEventListener('input', newGrid); // 'input' = continuous gridchange, 'change' = after release
const sliderValue = document.getElementById('slider-value');
sliderValue.textContent = `${cSlider.value}x${cSlider.value}`;

cSlider.addEventListener('input', () => {
	sliderValue.textContent = `${cSlider.value}x${cSlider.value}`;
})

// Eraser
const eraser = document.getElementById('eraser');
eraser.addEventListener('click', erase);

function erase() {
	if (bg === "transparent") {
		bg = color.value;
		rainbow = false;
		document.body.style.cursor = "default";
	} else {
		bg = "transparent";
		document.body.style.cursor = "pointer";
		rainbow = false;
	}
}

// Color picker
const color = document.getElementById('color');
color.addEventListener('change', (e) => bg = e.target.value);
color.addEventListener('click', function () {
	bg = color.value; 
	document.body.style.cursor = "crosshair";
	rainbow = false;

});

// Rainbow mode
function rainbowOn() {
	if (rainbow) {
		rainbow = false;
		bg = color.value;
	}
	else {
		rainbow = true; 
		document.body.style.cursor = "crosshair"; 
		bg = rng();};
}

function rng() {
	let r,b,g;
	r = Math.floor(Math.random() * 255);
	b = Math.floor(Math.random() * 255);
	g = Math.floor(Math.random() * 255);
	return `rgb(${r}, ${b}, ${g})`
}

const rainbowB = document.getElementById('rainbow');
rainbowB.addEventListener('click', rainbowOn);

// Backgrounds
function setBg(event) {
	if (event.target.id === "default") {
		document.body.style.setProperty("background", "rgb(67,34,195)"); 
		document.body.style.setProperty("background", "radial-gradient(circle, rgba(67,34,195,0.08869485294117652) 0%, rgba(236,253,45,0.20073967086834732) 100%)");
	}
	if (event.target.id === "white") document.body.style.background = "white";
	if (event.target.id === "black") document.body.style.background = "black";
}
const submenu = document.getElementsByClassName('menu-div-right')[0];
submenu.addEventListener('click', setBg);

// Button focusing
const submenuB = document.getElementsByClassName('menu-div-left')[0];
submenuB.addEventListener('click', function(event) {
	if (event.target.matches('.states')) {
		event.target.style.backgroundColor === 'darkorange' ? event.target.style.backgroundColor = 'white' : event.target.style.backgroundColor = "darkorange";
		}
	if (event.target.id === 'eraser') {rainbowB.style.backgroundColor = 'white';} else if (event.target.id === "rainbow") {eraser.style.backgroundColor = 'white'}
	else if (event.target.id === 'color') {rainbowB.style.backgroundColor = 'white'; eraser.style.backgroundColor = 'white'};
})

// Initialize starting conditions
rainbowB.style.backgroundColor = "darkorange";
import { defaultGrid } from "./welcome.js";
// createDefaultGrid(50, defaultGrid);

// createGrid();


// ChatGPT codes game of life
//TODO TODO TODO TODO

function initializeGameOfLife(gridSize = 50, probability = 0.3) {
  let cellState = new Array(gridSize);
  for (let i = 0; i < gridSize; i++) {
    cellState[i] = new Array(gridSize).fill(0);
  }

  // Initialize the grid with random cell states
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      cellState[i][j] = Math.random() < probability ? 1 : 0;
    }
  }

  createGrid(gridSize); // assuming you have already defined the createGrid function

  // Update the cell colors based on the initial state
  let cells = document.getElementsByClassName("square");
  for (let i = 0; i < cells.length; i++) {
    let row = cells[i].parentNode.id;
    let col = Array.from(cells[i].parentNode.children).indexOf(cells[i]);
    if (cellState[row][col] === 1) {
      cells[i].style.backgroundColor = color.value;
    } else {
      cells[i].style.backgroundColor = 'transparent';
    }
    cells[i].dataset.state = cellState[row][col];
  }

  return cellState;
}

function updateGameOfLife(cellState, gridSize = 50, speed = 100) {
  let lastTime = 0;
  function step(timestamp) {
    if (timestamp - lastTime > speed) {
      // Copy the current state to a new array
      let newCellState = JSON.parse(JSON.stringify(cellState));
      
      // Update the state of each cell based on its neighbors
      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          let aliveNeighbors = 0;
          for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
              if (x === 0 && y === 0) {
                continue;
              }
              let neighborRow = i + x;
              let neighborCol = j + y;
              if (neighborRow < 0) {
                neighborRow = gridSize - 1;
              } else if (neighborRow >= gridSize) {
                neighborRow = 0;
              }
              if (neighborCol < 0) {
                neighborCol = gridSize - 1;
              } else if (neighborCol >= gridSize) {
                neighborCol = 0;
              }
              aliveNeighbors += cellState[neighborRow][neighborCol];
            }
          }
          if (cellState[i][j] === 1 && (aliveNeighbors < 2 || aliveNeighbors > 3)) {
            newCellState[i][j] = 0; // Any live cell with fewer than two live neighbours or more than three live neighbours dies
          } else if (cellState[i][j] === 0 && aliveNeighbors === 3) {
            newCellState[i][j] = 1; // Any dead cell with exactly three live neighbours becomes a live cell
          }
        }
      }

      // Update the colors of the cells based on the new state
      let cells = document.getElementsByClassName("square");
      for (let i = 0; i < cells.length; i++) {
        let row = cells[i].parentNode.id;
        let col = Array.from(cells[i].parentNode.children).indexOf(cells[i]);
        if (newCellState[row][col] === 1) {
          cells[i].style.backgroundColor = color.value;
        } else {
          cells[i].style.backgroundColor = 'transparent';
        }
        cells[i].dataset.state = newCellState[row][col];
      }

      // Update the cell state variable to the new state
      cellState = newCellState;
      lastTime = timestamp;
    }
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

let gridSize = cSlider.value;
let cellState = initializeGameOfLife(gridSize, 0.3);
updateGameOfLife(cellState, gridSize, 100);
