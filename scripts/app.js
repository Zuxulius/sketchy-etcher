
const index = document.body.innerHTML;

function createGrid(nGrid = 16) {
	let gridSize = nGrid;
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

function newGrid(nGrid) {
	document.body.innerHTML = index;
	createGrid(nGrid);
}

createGrid(4);

let squares = document.getElementsByClassName('square');

let drawing = false;
// document.addEventListener('mouseover', draw);
document.addEventListener('click', toggle);
