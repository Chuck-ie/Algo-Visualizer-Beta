// global vars and types for Dijkstra
interface myNode {
    actualCell: HTMLElement;
    predecessorNode: myNode | undefined;
    shortestPath: number;
}

async function dijkstra(start:HTMLElement, target:HTMLElement) {

    if (start.classList.contains("obstacle")) { return };

    let startNode:myNode = {
        actualCell: start,
        predecessorNode: undefined,
        shortestPath: 0
    }
    startNode.predecessorNode = startNode;
    
    let targetNode:myNode = {
        actualCell: target,
        predecessorNode: undefined,
        shortestPath: Infinity
    }

    let allCells:any = document.getElementsByClassName("gridCell");
    let rowLength:number = document.getElementsByClassName("gridRow")[0].childElementCount;
    let neighbourPos:number[] =  [1, -1, rowLength, -rowLength];
    let visitedCells:HTMLElement[] = [];
    let nextNodes:myNode[] = [startNode];
    let currNode:myNode = startNode;
    let iterator:number = 0;

    while (nextNodes.length !== 0) {

        if (currNode.actualCell === target) {
            targetNode.predecessorNode = currNode.predecessorNode;
            break;
        }

        nextNodes.shift();
        // currNode.actualCell.style.backgroundColor = "red";
        let currRowPos:number = parseInt(currNode.actualCell.id)/rowLength;

        neighbourPos.forEach((x:number) => {
            // if statement to check, if neighbourPos is out of array range
            if (parseInt(currNode.actualCell.id) + x < 0 || parseInt(currNode.actualCell.id) + x >= allCells.length) { return };

            let neighbourCell:HTMLElement = allCells[parseInt(currNode.actualCell.id) + x];
            let isDuplicate:boolean = false;

            visitedCells.forEach((cell:HTMLElement) => {
                if (cell === neighbourCell) { isDuplicate = true };
            })

            if (isDuplicate !== false) { return };
            let neighbourRowPos:number = parseInt(neighbourCell.id)/rowLength;
            visitedCells.push(neighbourCell);

            // bunch of if statements to filter out unwanted neighbours
            if ((x === 1 || x === -1) && Math.floor(currRowPos) !== Math.floor(neighbourRowPos)) { return };
            if (neighbourCell.classList.contains("obstacle")) { return };

            let newNeighbourNode:myNode = {
                actualCell: neighbourCell,
                predecessorNode: currNode,
                shortestPath: currNode.shortestPath + 1
            }
            nextNodes.push(newNeighbourNode);
        })

        if (nextNodes.length > 0) {
            currNode = nextNodes[0];
            colorizeCell(currNode.actualCell, iterator);
            iterator++;
        } else {
            break;
        }
    }

    if (targetNode.predecessorNode !== undefined) {
        markShortestPath(targetNode, iterator);
    }
    startLocked = false;
}

function colorizeCell(cell:HTMLElement, i:number) {

    setTimeout(() => {
        cell.style.backgroundColor = "#E6727A";
        cell.style.animationName = "visitedCell";
        cell.style.animationDuration = "1.5s";
    }, i * 10);
}

function markShortestPath(currNode:myNode, i:number) {

    if (currNode.predecessorNode !== currNode) {
        setTimeout(() => {
            currNode.actualCell.style.backgroundColor = "#AED173";
            currNode.actualCell.style.animationName = "shortestPath";
            currNode.actualCell.style.animationDuration = "1s";
            markShortestPath(currNode.predecessorNode!, 5);
        }, i * 10)
    }
}

function sleep(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

