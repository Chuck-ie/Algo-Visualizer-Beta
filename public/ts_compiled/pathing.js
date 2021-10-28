"use strict";
var resizeID;
window.addEventListener("resize", function () {
    clearTimeout(resizeID);
    resizeID = window.setTimeout(createGrid, 500);
});
window.addEventListener("load", function () {
    createGrid();
    setPathingMenuStyle();
    pathingGlobals();
});
function clearGrid() {
    var gridContainer = document.getElementById("my_grid_container");
    pathingGlobals();
    while (gridContainer.children[0] !== undefined) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
}
function createGrid() {
    clearGrid();
    var gridContainer = document.getElementById("my_grid_container");
    var width = window.innerWidth;
    var height = window.innerHeight;
    var rowCount = Math.ceil(height / 20) - 3;
    var cellsEachRow = Math.ceil(width / 20);
    for (var i = 0; i < rowCount; i++) {
        var row = document.createElement("div");
        row.className = "gridRow";
        for (var j = 0; j < cellsEachRow; j++) {
            var cell = document.createElement("div");
            cell.id = "" + ((i * cellsEachRow) + j);
            cell.className = "gridCell";
            cell.style.left = j * 20 + 20 + "px";
            cell.style.top = i * 20 + 40 + "px";
            row.appendChild(cell);
        }
        gridContainer.appendChild(row);
    }
}
function changeCursor(option) {
    var body = document.getElementById("my_cursor_style");
    switch (option.id) {
        case "option1":
            body.style.cursor = "url(https://chuckie-droid.de/icons/square-red.png), pointer";
            activCursor = "start";
            break;
        case "option2":
            body.style.cursor = "url(https://chuckie-droid.de/icons/square-green.png), pointer";
            activCursor = "target";
            break;
        case "option3":
            body.style.cursor = "url(https://chuckie-droid.de/icons/bomb-solid.png), pointer";
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
var activCursor = "pointer";
// Event listeners to mark corresponding cell on grid
var gridBody = document.getElementById("my_grid_container");
var mouseIsDown = false;
gridBody.addEventListener("mousedown", function () { mouseIsDown = true; });
gridBody.addEventListener("mousemove", function (Event) {
    if (mouseIsDown === true && activCursor === "obstacle") {
        var cursorX = Event.clientX;
        var cursorY = Event.clientY;
        markCell(cursorX, cursorY, activCursor);
    }
});
gridBody.addEventListener("mouseup", function () { mouseIsDown = false; });
gridBody.addEventListener("click", function (Event) {
    if (activCursor === "target" || activCursor === "start") {
        var cursorX = Event.clientX;
        var cursorY = Event.clientY;
        markCell(cursorX, cursorY, activCursor);
    }
});
function markCell(x, y, iconName) {
    if (startLocked === true) {
        return;
    }
    // console.log(document.elementsFromPoint(x, y));
    var itemsAtCursor = document.elementsFromPoint(x, y);
    var cellAtCursor = undefined;
    for (var i = 0; i < itemsAtCursor.length; i++) {
        if (itemsAtCursor[i].className === "gridCell") {
            cellAtCursor = itemsAtCursor[i];
        }
    }
    // if for marking the corresponding obstacle cell
    if (iconName === "obstacle") {
        if (obstacleCells.includes(cellAtCursor) || cellAtCursor === undefined) {
            return;
        }
        var bombCell = addBombCell();
        cellAtCursor.appendChild(bombCell);
        cellAtCursor.classList.add("obstacle");
        obstacleCells.push(cellAtCursor);
        // if for marking the corresponding start cell
    }
    else if (iconName === "start") {
        if (startCell !== undefined) {
            startCell.style.backgroundColor = "#E5E7EB";
        }
        // hsl color == red
        cellAtCursor.style.backgroundColor = "hsla(0, 100%, 50%, 0.753)";
        startCell = cellAtCursor;
        // if for marking the corresponding target cell
    }
    else if (iconName === "target") {
        if (targetCell !== undefined) {
            targetCell.style.backgroundColor = "#E5E7EB";
        }
        // hsl color == green
        cellAtCursor.style.backgroundColor = "hsla(120, 96%, 30%, 1)";
        targetCell = cellAtCursor;
    }
}
// start and reset buttons
var resetBtn = document.getElementById("option5");
resetBtn.addEventListener("click", function () {
    createGrid();
});
var startBtn = document.getElementById("option6");
startBtn.addEventListener("click", function () {
    if (startCell !== undefined && targetCell !== undefined) {
        startAlgorithm();
    }
    else {
        alert("Please Choose a start- and targetcell, aswell as a valid Algorithm");
    }
});
function startAlgorithm() {
    var chosenAlgorithm = document.getElementById("option4").childNodes[0].nodeValue;
    if (startLocked === true) {
        return;
    }
    if (needsClearance === true) {
        var temp = [startCell.id, targetCell.id, obstacleCells];
        createGrid();
        var allCells_1 = document.getElementsByClassName("gridCell");
        startCell = allCells_1[parseInt(temp[0])];
        targetCell = allCells_1[parseInt(temp[1])];
        startCell.style.backgroundColor = "hsla(0, 100%, 50%, 0.753)";
        targetCell.style.backgroundColor = "hsla(120, 96%, 30%, 0.753)";
        obstacleCells = temp[2];
        obstacleCells.forEach(function (obstacle) {
            var bombCell = addBombCell();
            allCells_1[parseInt(obstacle.id)].appendChild(bombCell);
            allCells_1[parseInt(obstacle.id)].classList.add("obstacle");
        });
        needsClearance = false;
    }
    switch (chosenAlgorithm) {
        case "Dijkstra":
            startLocked = true;
            needsClearance = true;
            dijkstra(startCell, targetCell);
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
    var bombCell = document.createElement("i");
    bombCell.className = "fas fa-bomb";
    bombCell.style.position = "relative";
    bombCell.style.margin = "0 0 10px 2px";
    bombCell.style.verticalAlign = "middle";
    return bombCell;
}
// set global variables to start values
var visitedNodes;
var startLocked;
var obstacleCells;
var startCell;
var targetCell;
var needsClearance;
var colorizeID;
function pathingGlobals() {
    startLocked = false;
    needsClearance = false;
    obstacleCells = [];
    startCell = undefined;
    targetCell = undefined;
}
function setPathingMenuStyle() {
    // any because HTMLCollection wont work with style
    var menuOptions = document.getElementById("my_options_menu").children;
    var optionsCount = menuOptions.length;
    for (var i = 0; i < optionsCount; i++) {
        menuOptions[i].style.left = 300 + i * 150 + "px";
    }
    menuOptions[0].style.borderRadius = "0 0 0 10px";
    menuOptions[optionsCount - 1].style.borderRadius = "0 0 10px 0";
}
function colorizeCell(cell, i) {
    if (cell == targetCell) {
        return;
    }
    setTimeout(function () {
        cell.style.backgroundColor = "rgb(0, 197, 255)";
        cell.style.animationName = "visitedCell";
        cell.style.animationDuration = "1.5s";
    }, i * 5);
}
function markShortestPath(currNode, i, isStart) {
    if (isStart === void 0) { isStart = false; }
    if (currNode.predecessorNode !== currNode) {
        setTimeout(function () {
            if (isStart === true) {
                markShortestPath(currNode.predecessorNode, 5);
            }
            else {
                currNode.actualCell.style.backgroundColor = "#AED173";
                currNode.actualCell.style.animationName = "shortestPath";
                currNode.actualCell.style.animationDuration = "1s";
                markShortestPath(currNode.predecessorNode, 5);
            }
        }, i * 5);
    }
}
