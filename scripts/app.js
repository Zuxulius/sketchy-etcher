
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



createGrid();

let squares = document.getElementsByClassName('square');
let menu = document.getElementsByClassName('floating-menu')[0];	
let drawing = false;
let rainbow = true;
let bg = "";

document.addEventListener('click', toggle);

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
	console.log(event.target);
	if (event.target.id === "default") {
		document.body.style.setProperty("background", "rgb(67,34,195)"); 
		document.body.style.setProperty("background", "radial-gradient(circle, rgba(67,34,195,0.08869485294117652) 0%, rgba(236,253,45,0.20073967086834732) 100%)");
	}
	if (event.target.id === "white") document.body.style.background = "white";
	if (event.target.id === "black") document.body.style.background = "black";
}
const submenu = document.getElementsByClassName('menu-div-right')[0];
submenu.addEventListener('click', setBg);

