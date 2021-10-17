
function hideSidebar(sidebarDiv:HTMLElement, dummySidebarDiv:HTMLElement) {

    let sidebarDisplay:string = window.getComputedStyle(sidebarDiv).display;

    if (sidebarDisplay === "block") {
        sidebarDiv.style.display = "none";
        dummySidebarDiv.style.display = "block";

    } else if (sidebarDisplay === "none") {
        sidebarDiv.style.display = "block";
        dummySidebarDiv.style.display = "none";
    }
}

window.addEventListener("load", function() {
    dropDOWN();
})

// dropDOWNmenu behaviour on click
function dropDOWN() {

    var dropDOWNmenus:HTMLCollection = document.getElementsByClassName("my_dropDOWN_content");
    
    for (let i = 0; i < dropDOWNmenus.length; i++) {

        for (let j = 0; j < dropDOWNmenus[i].childElementCount; j++) {

            let currChild:Element = dropDOWNmenus[i].children[j];

            currChild.addEventListener("click", (Event:any) => {
                let headerParent:HTMLElement = Event.target.parentElement.parentElement;
                headerParent.childNodes[0].nodeValue = Event.target.innerHTML;
            })
        }
    }
}

