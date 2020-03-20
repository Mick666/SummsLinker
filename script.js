// const classes = {"firstLink":"firstSet", "secondLink":"secondSet", "thirdLink":"thirdSet"}
let options, classes;
document.addEventListener("DOMContentLoaded", function(){
    options = document.getElementsByClassName("options");
    classes = ["firstLink", "secondLink", "thirdLink", "fourthLink", "fifthLink"];
});

function createLinks(el) {
    const linkArea = document.getElementsByClassName(el.classList[0]);
    if (linkArea[3].children.length > 0) {
        let parent = linkArea[3].childNodes;
        while (parent.length > 0) {
            linkArea[3].removeChild(linkArea[3].lastChild)
        }
    }
    createLink(linkArea);
}

function createLink(classElem) {
    const link = classElem[0];
    var text = classElem[1].value;
    var para = classElem[3];
    var linkComb = document.createElement("a");
    if (options[1].checked) var bold = document.createElement("b");
    if (options[2].checked) var italic = document.createElement("i");
    if (!options[3].checked && options[0].value == "Standard") {
        text = text.slice(4);
        para.appendChild(document.createTextNode("The "))
    }
    if (options[0].value == "Standard" || options[0].value == "") {
        let textMatch = text.match(/^.*?(?= report)|(?= reports)/)[0];
        let textSplit = textMatch.split(/ and |, /);
        if (textSplit.length > 1) {
            let links = link.value.split("\n");
            for (let i = 0; i < links.length; i++) {
                let newLink = document.createElement("a");
                newLink.href = links[i];
                newLink.text = textSplit[i];
                appendLinks(newLink);
                if (i < links.length-2 && links.length > 2) {
                    para.appendChild(document.createTextNode(", "));
                } else if (i == links.length-2) {
                    para.appendChild(document.createTextNode(" and "))
                }
            }
            appendText();
        } else {
            linkComb.text = textMatch;
            linkComb.href = link.value;
            appendLinks(linkComb);
            appendText();
        }
    } else if (options[0].value == "Industry") {
        appendText();
        linkComb.text = text.match(/( - )(.*)$/)[2];
        linkComb.href = link.value;
        appendLinks(linkComb);
    }
    function appendLinks(linkElem){
        if (bold) {
            if (italic) {
                italic.appendChild(linkElem)
                bold.appendChild(italic)
            } else bold.appendChild(linkElem);
            para.appendChild(bold)
        } else if (italic) {
            italic.appendChild(linkElem);
            para.appendChild(italic)
        } else {
            para.appendChild(linkElem)
        }
    }
    function appendText() {
        var text = classElem[1].value;
        var para = classElem[3];
        if (options[0].value == "Standard" || options[0].value == "") {
            let textComb = text.split(/^.*?(?= report)|(?= reports)/)[1];
            para.appendChild(document.createTextNode(textComb))
        } else if (options[0].value == "Industry") {
            var match = text.match(/( - )(.*)$/);
            textComb = text.slice(0, match.index + 3);
            para.appendChild(document.createTextNode(textComb))
        }
    }
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
    }
    
}

function clearAllFields() {
    for (let i = 0; i < classes.length; i++) {
        const linkArea = document.getElementsByClassName(classes[i]);
        for (let i = 0; i < linkArea.length; i++) {
            if (i == 2) continue;
            linkArea[i].innerHTML = ""
            if (linkArea[i].type == "textarea") linkArea[i].value = ""
        }
    }
    
}