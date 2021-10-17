var resizeID:number;

window.addEventListener("resize", function() {
    clearTimeout(resizeID);
    resizeID = setTimeout(createGrid, 500);
})

window.addEventListener("load", function() {
    createGrid();
    setMenuStyle();
    setGlobals();
})

function clearGrid() {
    let gridContainer:HTMLElement = document.getElementById("my_grid_container")!;
    setGlobals();

    while (gridContainer.children[0] !== undefined) {
        gridContainer.removeChild(gridContainer.firstChild!);
    }
}

function createGrid() {

    clearGrid();
    let gridContainer:HTMLElement = document.getElementById("my_grid_container")!;

    let width:number = window.innerWidth;
    let height:number = window.innerHeight;

    let rowCount:number = Math.ceil(height/20) - 3;
    let cellsEachRow:number = Math.ceil(width/20) - 2;

    for (let i = 0; i < rowCount; i++) {

        let row:HTMLElement = document.createElement("div");
        row.className = "gridRow";

        for (let j = 0; j < cellsEachRow; j++) {

            let cell:HTMLElement = document.createElement("div");

            cell.id = `${(i*cellsEachRow) + j}`;
            cell.className = "gridCell";
            cell.style.left = `${j * 20 + 40}px`;
            cell.style.top = `${i * 20 + 40}px`;
            row.appendChild(cell);
        }
        gridContainer.appendChild(row);
    }
}

function setMenuStyle() {
    // any because HTMLCollection wont work with style
    let menuOptions:any = document.getElementById("my_options_menu")!.children;
    let optionsCount:number = menuOptions.length;

    for (let i = 0; i < optionsCount; i++) {

        menuOptions[i].style.left = `${300+i*150}px`
    }

    menuOptions[0].style.borderRadius = "0 0 0 10px";
    menuOptions[optionsCount-1].style.borderRadius = "0 0 10px 0";
}

function changeCursor(option:HTMLElement) {

    let body:HTMLElement = document.getElementById("my_cursor_style")!;

    switch(option.id) {

        case "option1":
            body.style.cursor = "url(https://chuckie-droid.de/square-red.png), pointer";
            activCursor = "start";
            break;

        case "option2":
            body.style.cursor = "url(https://chuckie-droid.de/square-green.png), pointer";
            activCursor = "target";
            break;

        case "option3":
            body.style.cursor = "url(https://chuckie-droid.de/bomb-solid.png), pointer";
            activCursor = "obstacle";
            break;

        case "option4":
            body.style.cursor = "auto";
            activCursor = "pointer";
            break;

        case "option5":
            body.style.cursor = "auto";
            activCursor = "pointer";
            break;

        case "option6":
            body.style.cursor = "auto";
            activCursor = "pointer";
            break;
    }
}

var activCursor:string = "pointer";
// Event listeners to mark corresponding cell on grid
var gridBody:HTMLElement = document.getElementById("my_grid_container")!;
var mouseIsDown:boolean = false;

gridBody.addEventListener("mousedown", () => { mouseIsDown = true; });
gridBody.addEventListener("mousemove", Event => {

    if (mouseIsDown === true && activCursor === "obstacle") {

        let cursorX:number = Event.clientX;
        let cursorY:number = Event.clientY;
        markCell(cursorX, cursorY, activCursor);
    }
});

gridBody.addEventListener("mouseup", () => { mouseIsDown = false; });
gridBody.addEventListener("click", Event => {

    if (activCursor === "target" || activCursor === "start") {

        let cursorX:number = Event.clientX;
        let cursorY:number = Event.clientY;
        markCell(cursorX, cursorY, activCursor);
    }
})

function markCell(x:number, y:number, iconName:string) {

    if (startLocked === true) {
        return;
    }

    // console.log(document.elementsFromPoint(x, y));
    let itemsAtCursor:any = document.elementsFromPoint(x, y)!;
    var cellAtCursor:HTMLElement | undefined = undefined;

    for (let i = 0; i < itemsAtCursor.length; i++) {

        if (itemsAtCursor[i].className === "gridCell") {
            cellAtCursor = itemsAtCursor[i];
        }
    }

     // if for marking the corresponding obstacle cell
    if (iconName === "obstacle") {

        if (obstacleCells.includes(cellAtCursor) || cellAtCursor === undefined) {
            return;
        }
        var bombCell:HTMLElement = addBombCell();
        cellAtCursor!.appendChild(bombCell);
        cellAtCursor!.classList.add("obstacle");
        obstacleCells.push(cellAtCursor)

    // if for marking the corresponding start cell
    } else if (iconName === "start") {

        if (startCell !== undefined) {
            startCell.style.backgroundColor = "#E5E7EB";
        }

        // hsl color == red
        cellAtCursor!.style.backgroundColor = "hsla(0, 100%, 50%, 0.753)";
        startCell = cellAtCursor;

    // if for marking the corresponding target cell
    } else if (iconName === "target") {

        if (targetCell !== undefined) {
            targetCell.style.backgroundColor = "#E5E7EB";
        }

        // hsl color == green
        cellAtCursor!.style.backgroundColor = "hsl(120, 96%, 30%)";
        targetCell = cellAtCursor;
    }
}

// start and reset buttons
var resetBtn:HTMLElement = document.getElementById("option5")!;
resetBtn.addEventListener("click", () => {
    createGrid();
})

var startBtn:HTMLElement = document.getElementById("option6")!;
startBtn.addEventListener("click", () => {

    if (startCell !== undefined && targetCell !== undefined) {
        startAlgorithm();
    } else {
        alert("Please Choose a start- and targetcell, aswell as a valid Algorithm");
    }
})

function startAlgorithm() {

    var chosenAlgorithm:string = document.getElementById("option4")!.childNodes[0].nodeValue!;

    if (startLocked === true) {
        return;
    }

    if (needsClearance === true) {
        var temp:any = [startCell!.id, targetCell!.id, obstacleCells];
        createGrid();

        let allCells:any = document.getElementsByClassName("gridCell");
        startCell = allCells[parseInt(temp[0])];
        targetCell = allCells[parseInt(temp[1])];
        startCell!.style.backgroundColor = "hsla(0, 100%, 50%, 0.753)";
        targetCell!.style.backgroundColor = "hsl(120, 96%, 30%)";

        obstacleCells = temp[2];
        obstacleCells.forEach((obstacle:HTMLElement) => {
            let bombCell:HTMLElement = addBombCell()
            allCells[parseInt(obstacle.id)].appendChild(bombCell);
            allCells[parseInt(obstacle.id)].classList.add("obstacle");
        });
        needsClearance = false
    }

    switch(chosenAlgorithm) {

        case "Dijkstra":
            startLocked = true;
            needsClearance = true;
            dijkstra(startCell!, targetCell!);
            break;

        case "Other1":
            startLocked = true;
            needsClearance = true;
            alert("Started Other1");
            break;

        case "Other2":
            startLocked = true;
            needsClearance = true;
            alert("Started Other2");
            break;

        default:
            alert("Please choose a valid Algorithm.");
            break;
    }
}

function addBombCell() {
    let bombCell:HTMLElement = document.createElement("i");
    bombCell.className = "fas fa-bomb";
    bombCell.style.position = "relative";
    bombCell.style.margin = "0 0 10px 2px";
    bombCell.style.verticalAlign = "middle";

    return bombCell;
}

// set global variables to start values
var visitedNodes:myNode[];
var startLocked:boolean;
var obstacleCells:any;
var startCell:HTMLElement | undefined;
var targetCell:HTMLElement | undefined;
var needsClearance:boolean;
var colorizeID:number;

function setGlobals() {
    startLocked = false;
    needsClearance = false;
    obstacleCells = [];
    startCell = undefined;
    targetCell = undefined;
}
