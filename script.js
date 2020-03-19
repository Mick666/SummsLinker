// const classes = {"firstLink":"firstSet", "secondLink":"secondSet", "thirdLink":"thirdSet"}
const options = document.getElementsByClassName("options");
const classes = ["firstLink", "secondLink", "thirdLink", "fourthLink", "fifthLink"];
let regex = (/^.*(?= reports)/)

function createLinks(el) {
    const linkArea = document.getElementsByClassName(el.classList[0]);
    if (linkArea[3].children.length > 0) {
        let parent = linkArea[3].childNodes;
        while (parent.length > 0) {
            linkArea[3].removeChild(linkArea[3].lastChild)
        }
    }
    createLink(linkArea);
    appendText(linkArea);
}

function createLink(classElem) {
    console.log(classElem)
    const link = classElem[0];
    var text = classElem[1].value;
    var para = classElem[3];
    var linkComb = document.createElement("a");
    
    if (options[1].checked) var bold = document.createElement("b");
    if (options[2].checked) var italic = document.createElement("i");

    linkComb.text = text.match(/^.*(?= reports)/)[0];
    
    linkComb.href = link.value;
    if (bold) {
        if (italic) {
            italic.appendChild(linkComb)
            bold.appendChild(italic)
        } else bold.appendChild(linkComb);
        
        para.appendChild(bold)
    } else if (italic) {
        italic.appendChild(linkComb);
        para.appendChild(italic)
    } else {
        para.appendChild(linkComb)
    }
}

function appendText(classElem, para) {
    var text = classElem[1].value;
    var linkComb = text.split(/^.*(?= reports)/)[1];
    var para = classElem[3];
    para.appendChild(document.createTextNode(linkComb))
}

function createAllLinks() {
    for (let i = 0; i < classes.length; i++) {
        const linkArea = document.getElementsByClassName(classes[i]);
        if (linkArea[3].children.length > 0) {
            let parent = linkArea[3].childNodes;
            while (parent.length > 0) {
                linkArea[3].removeChild(linkArea[3].lastChild)
            }
        }
        createLink(linkArea);
        appendText(linkArea);
    }
    
}

function clearAllFields() {
    for (let i = 0; i < classes.length; i++) {
        const linkArea = document.getElementsByClassName(classes[i]);
        for (let i = 0; i < linkArea.length; i++) {
            if (i == 2) continue;
            linkArea[i].innerHTML = ""
            // console.log(linkArea[i])
            if (linkArea[i].type == "textarea") linkArea[i].value = ""
        }
    }
    
}