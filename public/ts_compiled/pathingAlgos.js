"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function dijkstra(start, target) {
    return __awaiter(this, void 0, void 0, function () {
        var startNode, targetNode, allCells, rowLength, neighbourPos, visitedCells, nextNodes, currNode, iterator, _loop_1, state_1;
        return __generator(this, function (_a) {
            if (start.classList.contains("obstacle")) {
                return [2 /*return*/];
            }
            ;
            startNode = {
                actualCell: start,
                predecessorNode: undefined,
                shortestPath: 0
            };
            startNode.predecessorNode = startNode;
            targetNode = {
                actualCell: target,
                predecessorNode: undefined,
                shortestPath: Infinity
            };
            allCells = document.getElementsByClassName("gridCell");
            rowLength = document.getElementsByClassName("gridRow")[0].childElementCount;
            neighbourPos = [1, -1, rowLength, -rowLength];
            visitedCells = [];
            nextNodes = [startNode];
            currNode = startNode;
            iterator = 0;
            _loop_1 = function () {
                if (currNode.actualCell === target) {
                    targetNode.predecessorNode = currNode.predecessorNode;
                    return "break";
                }
                nextNodes.shift();
                // currNode.actualCell.style.backgroundColor = "red";
                var currRowPos = parseInt(currNode.actualCell.id) / rowLength;
                neighbourPos.forEach(function (x) {
                    // if statement to check, if neighbourPos is out of array range
                    if (parseInt(currNode.actualCell.id) + x < 0 || parseInt(currNode.actualCell.id) + x >= allCells.length) {
                        return;
                    }
                    ;
                    var neighbourCell = allCells[parseInt(currNode.actualCell.id) + x];
                    var isDuplicate = false;
                    visitedCells.forEach(function (cell) {
                        if (cell === neighbourCell) {
                            isDuplicate = true;
                        }
                        ;
                    });
                    if (isDuplicate !== false) {
                        return;
                    }
                    ;
                    var neighbourRowPos = parseInt(neighbourCell.id) / rowLength;
                    visitedCells.push(neighbourCell);
                    // bunch of if statements to filter out unwanted neighbours
                    if ((x === 1 || x === -1) && Math.floor(currRowPos) !== Math.floor(neighbourRowPos)) {
                        return;
                    }
                    ;
                    if (neighbourCell.classList.contains("obstacle")) {
                        return;
                    }
                    ;
                    var newNeighbourNode = {
                        actualCell: neighbourCell,
                        predecessorNode: currNode,
                        shortestPath: currNode.shortestPath + 1
                    };
                    nextNodes.push(newNeighbourNode);
                });
                if (nextNodes.length > 0) {
                    currNode = nextNodes[0];
                    colorizeCell(currNode.actualCell, iterator);
                    iterator++;
                }
                else {
                    return "break";
                }
            };
            while (nextNodes.length !== 0) {
                state_1 = _loop_1();
                if (state_1 === "break")
                    break;
            }
            if (targetNode.predecessorNode !== undefined) {
                markShortestPath(targetNode, iterator);
            }
            startLocked = false;
            return [2 /*return*/];
        });
    });
}
function colorizeCell(cell, i) {
    setTimeout(function () {
        cell.style.backgroundColor = "#E6727A";
        cell.style.animationName = "visitedCell";
        cell.style.animationDuration = "1.5s";
    }, i * 10);
}
function markShortestPath(currNode, i) {
    if (currNode.predecessorNode !== currNode) {
        setTimeout(function () {
            currNode.actualCell.style.backgroundColor = "#AED173";
            currNode.actualCell.style.animationName = "shortestPath";
            currNode.actualCell.style.animationDuration = "1s";
            markShortestPath(currNode.predecessorNode, 5);
        }, i * 10);
    }
}
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
