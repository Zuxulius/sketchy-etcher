let grid = document.getElementsByClassName("container-m")[0];
grid.style = "width: 100vw; height: 100vw;"

let gridSize = 64;
let squareSize = 100/gridSize;

for (i=0;i<gridSize;i++) {
	let container = document.createElement('div');
	container.style = "display: flex; width: 100%;";
	container.className = i;
	grid.appendChild(container);

	for (j=0;j<gridSize;j++) {
		let div = document.createElement('div');
		div.className = "square";
		div.style = `height: ${squareSize}vw; width: ${squareSize}vw;`
		document.getElementsByClassName(i)[0].appendChild(div);
	}
}

let squares = document.getElementsByClassName('square');

function changeBg (element) {
	element.style.backgroundColor = 'lightcyan';
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
		drawing = true;
		document.addEventListener('mouseover', draw);
	}
}


let drawing = false;
// document.addEventListener('mouseover', draw);
document.addEventListener('click', toggle);
