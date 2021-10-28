
async function selectionSort() {

    let playfieldContainer:any = document.getElementById("my_sorting_container");
    let containerSize:number = playfieldContainer.childElementCount;

    for (let i = containerSize - 1; i >= 0; i--) {
        
        let currentElement:HTMLElement = playfieldContainer.children[i];
        let bestHeight:number = Number(currentElement.clientHeight);
        let bestIndex:number = i;        

        colorizeElement(currentElement, "#FADA5E", 0);
        // colorizeElement(currentElement, "hsla(120, 96%, 30%, 0.5)", 0);

        for (let j = (i - 1); j >= 0; j--) {

            let compareElement:HTMLElement = playfieldContainer.children[j];
            let compareHeight:number = Number(compareElement.clientHeight);

            await colorizeElement(compareElement, "#E6727A", 20);

            if (compareHeight < bestHeight) {
                bestHeight = compareHeight;
                bestIndex = j;
            }
        }

        if (bestIndex != i) {
            let currentHeight:number = currentElement.clientHeight;
            playfieldContainer.children[i].style.height = `${bestHeight}px`;
            playfieldContainer.children[bestIndex].style.height = `${currentHeight}px`;
        }
        resetColors(i);
    }
}

