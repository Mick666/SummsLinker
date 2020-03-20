// const classes = {"firstLink":"firstSet", "secondLink":"secondSet", "thirdLink":"thirdSet"}
let options = document.getElementsByClassName("options");
let classes = ["firstLink", "secondLink", "thirdLink", "fourthLink", "fifthLink"];
let classValue = {"linkElems":0,"textElems": 1,};
const outputDiv = document.getElementsByClassName("output");
let ouputParas = [null, null, null, null];

function createLinks(el) {
    const linkArea = document.getElementsByClassName(el.classList[0]);
    createLink(linkArea);
    console.log(ouputParas)
    createOutputField();
}

function createLink(classElem) {
    const link = classElem[0];
    var text = classElem[1].value.replace(/\n/, "");
    var para = [];

    if (link.value == "" || text == "") {
        return;
    }

    var linkComb = document.createElement("a");
    if (options[1].checked) var bold = document.createElement("b");
    if (options[2].checked) var italic = document.createElement("i");
    if (!options[3].checked && (options[0].value == "Standard" || options[0].value == "")) {
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
                    para.push(document.createTextNode(", "));
                } else if (i == links.length-2) {
                    para.push(document.createTextNode(" and "))
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
    para.push(document.createElement("br"))
    ouputParas[classes.indexOf(link.classList[0])] = (para);
    
    function appendLinks(linkElem){
        if (bold) {
            if (italic) {
                italic.appendChild(linkElem)
                bold.appendChild(italic)
            } else bold.appendChild(linkElem);
            para.push(bold)
        } else if (italic) {
            italic.appendChild(linkElem);
            para.push(italic)
        } else {
            para.push(linkElem)
        }
    }
    function appendText() {
        if (options[0].value == "Standard" || options[0].value == "") {
            let textComb = text.split(/^.*?(?= report)|(?= reports)/)[1];
            para.push(document.createTextNode(textComb))
        } else if (options[0].value == "Industry") {
            var match = text.match(/( - )(.*)$/);
            textComb = text.slice(0, match.index + 3);
            para.push(document.createTextNode(textComb))
        }
    }
}

function createOutputField() {
    if (outputDiv[0].children.length > 0) {
        while (outputDiv[0].children.length > 0) {
            outputDiv[0].removeChild(outputDiv[0].lastChild)
        }
        outputDiv[0].innerHTML = ""
    }

    let filteredParas = ouputParas.filter(x => x !== null);
    for (let i = 0; i < filteredParas.length; i++) {
        for (let j = 0; j < filteredParas[i].length; j++) {
            outputDiv[0].appendChild(filteredParas[i][j])
        }
    }
    console.log(outputDiv[0])
}

function createAllLinks() {
    for (let i = 0; i < classes.length; i++) {
        const linkArea = document.getElementsByClassName(classes[i]);
        createLink(linkArea);
    }
    createOutputField();
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