let tabSelected = null;
let tabsById = new Map();
let buttonRowDiv;
const ADD_STRONG = true, REMOVE_STRONG = false;

function buttonStrongTag(buttonNode, emph=null) {
    if (emph === true) {
        buttonNode.innerHTML = "<strong>" + buttonNode.getAttribute("data-tabname") + "</strong>";
    } else if (emph === false) {
        buttonNode.innerHTML = buttonNode.getAttribute("data-tabname");
    }
}

function switchVisibleTab(event) {
    let buttonTabId = event.target.getAttribute("data-assoc-tab-id");
    for (let [tabId, tabNode] of tabsById.entries()) {
        if (tabId === buttonTabId) {
            tabNode.style.display = "block";
        } else {
            tabNode.style.display = "none";
        }
    }
    for (let buttonNode of buttonRowDiv.childNodes) {
        if (buttonNode.nodeType !== Node.ELEMENT_NODE) continue;
        if (buttonNode === event.target) {
            buttonStrongTag(buttonNode, ADD_STRONG);
        } else {
            buttonStrongTag(buttonNode, REMOVE_STRONG);
        }
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

    let hrNode = document.createElement("hr");
    hrNode.width = "25%";
    tabsParentNode.insertBefore(hrNode, tabsParentNode.firstChild);

    let buttonNodes = [];
    for (let [tabId, tabNode] of tabsById.entries()) {
        let buttonNode = document.createElement("button");
        buttonNode.innerHTML = tabNode.getAttribute("data-tabname");
        buttonNode.setAttribute("data-tabname", tabNode.getAttribute("data-tabname"));
        buttonNode.setAttribute("data-assoc-tab-id", tabId);
        buttonNode.addEventListener("click", switchVisibleTab);
        buttonNodes.push(buttonNode);
    }

    buttonStrongTag(buttonNodes[0], ADD_STRONG);

    buttonRowDiv = document.createElement("div");
    buttonRowDiv.style = document.createElement("style");
    buttonRowDiv.style.textAlign = "center";
    for (i = 0; i < buttonNodes.length; i++) {
        buttonRowDiv.appendChild(buttonNodes[i]);
        if (i < buttonNodes.length - 1) {
            let bulletNode = document.createTextNode(" • ");
            buttonRowDiv.appendChild(bulletNode);
        }
    }

    tabsParentNode.insertBefore(buttonRowDiv, tabsParentNode.firstChild);
}
