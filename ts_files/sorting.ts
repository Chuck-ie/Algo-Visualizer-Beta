var resizeID:number;

window.addEventListener("resize", function() {
    clearTimeout(resizeID);
    resizeID = window.setTimeout(createPlayfield, 500);
    setSortingMenuStyle();
})

window.addEventListener("load", function() {
    setSortingMenuStyle();
    sortingGlobals();
    createPlayfield();
})

function clearPlayfield() {
    let playfieldContainer:HTMLElement = document.getElementById("my_sorting_container")!;
    sortingGlobals();

    while (playfieldContainer.children[0] !== undefined) {
        playfieldContainer.removeChild(playfieldContainer.firstChild!);
    }
}

function createPlayfield() {

    clearPlayfield();
    let playfieldContainer:HTMLElement = document.getElementById("my_sorting_container")!;
    let width:number = window.innerWidth;
    let height:number = window.innerHeight;
    let elementCount:number = Math.floor((width - 500) / 15);
    let heightDiff:number = Math.floor((height - 150) / elementCount);
    let storedElements:HTMLElement[] = new Array<HTMLElement>();

    for (let i = 0; i < elementCount; i++) {
        let newElement:HTMLElement = document.createElement("div");
        newElement.className = "sortingElement";
        newElement.id = `${i}`;
        newElement.style.height = `${i * heightDiff + heightDiff}px`;
        storedElements.push(newElement);
    }

    for (let j = elementCount; j > 0; j--) {
        let randomIndex:number = Math.floor(Math.random() * j);
        let randomElement:HTMLElement = storedElements[randomIndex]
        randomElement.style.left = `${j * 15 + 280}px`;
        storedElements.splice(randomIndex, 1);
        playfieldContainer.appendChild(randomElement);
    }

}

function setSortingMenuStyle() {
    // any because HTMLCollection wont work with style
    let menuOptions:any = document.getElementById("my_options_menu")!.children;
    let optionsCount:number = menuOptions.length;

    let width:number = window.innerWidth;
    // let height:number = window.innerHeight;

    for (let i = 0; i < optionsCount; i++) {
        menuOptions[i].style.left = `${width - 150}px`;
        menuOptions[i].style.top = `${i * 40}px`;
    }
}

async function colorizeElement(element:HTMLElement, color:string, ms:number) {
    element.style.backgroundColor = color;
    await sleep(ms)
}

function resetColors(mainIteration:number) {

    let playfieldContainer:any = document.getElementById("my_sorting_container");
    playfieldContainer.children[mainIteration].style.backgroundColor = "hsla(120, 96%, 30%, 0.5)";

    for (let i = mainIteration - 1; i >= 0; i--) {
        playfieldContainer.children[i].style.backgroundColor = "#E5E7EB";
    }
}

function sortingGlobals() {

}
