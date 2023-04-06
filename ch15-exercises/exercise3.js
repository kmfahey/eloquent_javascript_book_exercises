let tabSelected = null;
let tabsById = new Map();

function switchVisibleTab(event) {
    let buttonTabId = event.target.getAttribute("data-assoc-tab-id");
    for (let [tabId, tabNode] of tabsById.entries()) {
        if (tabId === buttonTabId) tabNode.style.display = "block";
        else tabNode.style.display = "none";
    }
}

function asTabs(tabsParentNode) {
    for (let tabNode of tabsParentNode.childNodes) {
        if (tabNode.nodeType !== Node.ELEMENT_NODE) continue;
        let tabId = tabNode.id;
        if (tabSelected == null) tabSelected = tabId;
        tabsById.set(tabId, tabNode);
        // The divs *have* style attributes but fsr I have to set this anyway.
        tabNode.style = document.createAttribute("style");
        if (tabId !== tabSelected) tabNode.style.display = "none";
    }
    let buttonNodes = [];
    for (let [tabId, tabNode] of tabsById.entries()) {
        let buttonNode = document.createElement("button");
        buttonNode.innerHTML = tabNode.getAttribute("data-tabname");
        buttonNode.setAttribute("data-assoc-tab-id", tabId);
        buttonNode.addEventListener("click", switchVisibleTab);
        buttonNodes.push(buttonNode);
    }
    let buttonRowDiv = document.createElement("div");
    for (let buttonNode of buttonNodes) {
        buttonRowDiv.appendChild(buttonNode);
    }
    tabsParentNode.insertBefore(buttonRowDiv, tabsParentNode.firstChild);
}
