
function createGrid(gridSize = 16) {
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
	element.style.backgroundColor = 'lightcoral';
	// element.style.border = "0.1px solid cyan";
}

// https://gomakethings.com/why-you-shouldnt-attach-event-listeners-in-a-for-loop-with-vanilla-javascript/
// https://gomakethings.com/why-event-delegation-is-a-better-way-to-listen-for-events-in-vanilla-js/
function draw(event) {
	if (event.target.matches('.square')) {
		changeBg(event.target);
	}
}

function toggle() {
	if (drawing && event.target.matches('.square')) {
		drawing = false;
		document.removeEventListener('mouseover', draw);
	} else if (event.target.matches('.square')) {
		document.addEventListener('mouseover', draw);
		drawing = true;
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


function popup() {
	event.preventDefault();
	if (menu.style.visibility !== "visible") {
		menu.style.visibility = "visible";
	} else menu.style.visibility = "hidden";
	// let menu = document.createElement('div');
	// menu.className = "floating-menu";
	// document.getElementsByClassName('container-m')[0].appendChild(menu);	
}

createGrid(4);

let squares = document.getElementsByClassName('square');
let menu = document.getElementsByClassName('floating-menu')[0];	
let drawing = false;

document.addEventListener('click', toggle);

// Popupmenu and its contents
document.addEventListener('contextmenu', popup);

const rButton = document.getElementById('reset');
rButton.addEventListener('click', reset);

const cSlider = document.getElementById('change');
cSlider.addEventListener('change', newGrid);
const sliderValue = document.getElementById('slider-value');
sliderValue.textContent = cSlider.value;
cSlider.addEventListener('input', () => {
	sliderValue.textContent = cSlider.value;
})

