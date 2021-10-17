"use strict";
function hideSidebar(sidebarDiv, dummySidebarDiv) {
    var sidebarDisplay = window.getComputedStyle(sidebarDiv).display;
    if (sidebarDisplay === "block") {
        sidebarDiv.style.display = "none";
        dummySidebarDiv.style.display = "block";
    }
    else if (sidebarDisplay === "none") {
        sidebarDiv.style.display = "block";
        dummySidebarDiv.style.display = "none";
    }
}
window.addEventListener("load", function () {
    dropDOWN();
});
// dropDOWNmenu behaviour on click
function dropDOWN() {
    var dropDOWNmenus = document.getElementsByClassName("my_dropDOWN_content");
    for (var i = 0; i < dropDOWNmenus.length; i++) {
        for (var j = 0; j < dropDOWNmenus[i].childElementCount; j++) {
            var currChild = dropDOWNmenus[i].children[j];
            currChild.addEventListener("click", function (Event) {
                var headerParent = Event.target.parentElement.parentElement;
                headerParent.childNodes[0].nodeValue = Event.target.innerHTML;
            });
        }
    }
}
