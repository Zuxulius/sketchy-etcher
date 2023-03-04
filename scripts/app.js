
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
	// if (rainbow) bg = rng();
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


function popup(event) {
	event.preventDefault();
	if (menu.style.display !== "flex") {
		menu.style.display = "flex";
	} else {
		menu.style.display = "none";
	}
}

createGrid();

let squares = document.getElementsByClassName('square');
let menu = document.getElementsByClassName('floating-menu')[0];	
let drawing = false;
let bg = "lightcoral";

document.addEventListener('click', toggle);

// Popupmenu and its contents
document.addEventListener('contextmenu', popup);

const rButton = document.getElementById('reset');
rButton.addEventListener('click', reset);

const eButton = document.getElementById('exit');
eButton.addEventListener('mousedown', () => {menu.style.display = "none"});

const cSlider = document.getElementById('change');
cSlider.addEventListener('change', newGrid); // 'input' to continuously change grid
const sliderValue = document.getElementById('slider-value');
sliderValue.textContent = `${cSlider.value}x${cSlider.value}`;

cSlider.addEventListener('input', () => {
	sliderValue.textContent = `${cSlider.value}x${cSlider.value}`;
})




// TODO Color picker, Eraser, Rainbow-mode, Background picker TODO

const eraser = document.getElementById('eraser');
eraser.addEventListener('click', erase);

function erase() {
	if (bg === "transparent") {
		bg = color.value;
		document.body.style.cursor = "default";
	} else {
	bg = "transparent";
	document.body.style.cursor = "pointer";
	}
}


const color = document.getElementById('color');
color.addEventListener('change', (e) => bg = e.target.value);
color.addEventListener('click', function () {bg = color.value; document.body.style.cursor = "crosshair"});




