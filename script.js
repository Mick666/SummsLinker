// const classes = {"firstLink":"firstSet", "secondLink":"secondSet", "thirdLink":"thirdSet"}
let options = document.getElementsByClassName("options");
let classes = ["firstLink", "secondLink", "thirdLink", "fourthLink", "fifthLink"];
let classValue = {"linkElems":0,"textElems": 1,};
const outputDiv = document.getElementsByClassName("output");
let outputParas = [null, null, null, null];
let linkData = [];
let textData = [];
let singleTextBoxData = "";
let outputField = [];

function createLinks(el) {
    const linkArea = document.getElementsByClassName(el.classList[0]);
    createLink(linkArea);
    createOutputField(outputParas);
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
    else bold == null;
    if (options[2].checked) var italic = document.createElement("i");
    else italic == null;
    
    if (options[0].value == "Standard" || options[0].value == "") {
        if (!options[3].checked && text.startsWith("The")) {
            text = text.slice(4);
            para.push(document.createTextNode("The "))
        }
        if (text.match(/^.*?(?= report)|(?= reports)/) == null) {
            alert("No match for the current input. Have you selected the correct summary style?")
            return;
        }
        let textMatch = text.match(/^.*?(?= report)|(?= reports)/)[0];
        let textSplit = textMatch.split(/ and |, /);
        if (textSplit.length > 1) {
            let links = link.value.split("\n");
            for (let i = 0; i < links.length; i++) {
                let newLink = document.createElement("a");
                newLink.href = links[i];
                newLink.text = textSplit[i];
                appendLinks(newLink, para, bold, italic);
                if (i < links.length-2 && links.length > 2) {
                    para.push(document.createTextNode(", "));
                } else if (i == links.length-2) {
                    para.push(document.createTextNode(" and "))
                }
            }
            appendText(text, para);
        } else {
            linkComb.text = textMatch;
            linkComb.href = link.value;
            appendLinks(linkComb, para, bold, italic);
            appendText(text, para);;
        }
    } else if (options[0].value == "Industry") {
        appendText(text, para);;
        linkComb.text = text.match(/( - )(.*)$/)[2];
        linkComb.href = link.value;
        appendLinks(newLink, para, bold, italic);
    }
    para.push(document.createElement("br"))
    outputParas[classes.indexOf(link.classList[0])] = (para);
}

function createOutputField(output) {
    if (outputDiv[0].children.length > 0) {
        while (outputDiv[0].children.length > 0) {
            outputDiv[0].removeChild(outputDiv[0].lastChild)
        }
        outputDiv[0].innerHTML = ""
    }
    
    let filteredParas = output.filter(x => x !== null);
    for (let i = 0; i < filteredParas.length; i++) {
        for (let j = 0; j < filteredParas[i].length; j++) {
            outputDiv[0].appendChild(filteredParas[i][j])
        }
    }
}

function createAllLinks() {
    if (options[5].value == "normal") {
        for (let i = 0; i < classes.length; i++) {
            const linkArea = document.getElementsByClassName(classes[i]);
            createLink(linkArea);
        }
        createOutputField(outputParas);
    } else if (options[5].value == "single" || options[5].value == "") {
        outputField = createLinksSingleField();
        createOutputField(outputField);
    }
    
}

function clearAllFields() {
    if (options[5].value == "normal") {
        for (let i = 0; i < classes.length; i++) {
            const linkArea = document.getElementsByClassName(classes[i]);
            linkData[i] = linkArea[0].value;
            linkArea[0].value = "";
            textData[i] = linkArea[1].value;
            linkArea[1].value = ""
        } 
    } else if (options[5].value == "single") {
        singleTextBoxData = document.getElementById("singularTextBox").value;
        document.getElementById("singularTextBox").value = ""
    }
    outputDiv[0].innerHTML = "";
}

function undoReset(){
    if (options[5].value == "normal") {
        for (let i = 0; i < classes.length; i++) {
            const linkArea = document.getElementsByClassName(classes[i]);
            linkArea[0].value = linkData[i] || ""
            linkArea[1].value  = textData[i]  || ""
        }
        createOutputField(outputParas);
    } else if (options[5].value == "single" || options[5].value == "") {
        document.getElementById("singularTextBox").value = singleTextBoxData
        createOutputField(outputField);
    }
    
}

function linkPasting(e) {
    if (options[5].value == "normal" && (options[4].checked || e.target.classList[2] == "textElems")) {
        e.preventDefault();
        let ind = classes.indexOf(e.target.classList[0].toString())
        let clipData = e.clipboardData.getData('Text').split("\n").filter(x => x.length > 0)
        for (let i = 0; i < clipData.length && i < classes.length; i++) {
            document.getElementsByClassName(classes[ind+i])[classValue[e.target.classList[2]]].value = clipData[i];
        }
    }
}

function changeInputStyle(){
    let butts = document.getElementsByClassName("indivLinkButt");
    if (options[5].value == "normal") {
        document.getElementById("linkTextBoxes").className = "row links"
        document.getElementById("textTextBoxes").className = "row text"
        document.getElementById("singleInput").className = "row hidden"
        document.getElementById("linkOverflowOption").style.display = "block"
        for (let i = 0; i < butts.length; i++) {
            butts[i].style.display = "block";
        }
        
    } else if (options[5].value == "single") {
        document.getElementById("linkTextBoxes").className = "row links hidden"
        document.getElementById("textTextBoxes").className = "row text hidden"
        document.getElementById("singleInput").className = "row visibleBox"
        document.getElementById("linkOverflowOption").style.display = "none"
        for (let i = 0; i < butts.length; i++) {
            butts[i].style.display = "none";
        }
    }
}

function createLinksSingleField() {
    let strippedInput = document.getElementById("singularTextBox").value
    .split("\n")
    .filter(x => x.replace(/\n| /, "").length > 0);
    let links = strippedInput.filter(x => x.startsWith("http"));
    let summs = strippedInput.filter(x => !x.startsWith("http") && x.length > 10);
    let combinedParas = [];

    for (let i = 0, j = 0; i < summs.length && j < links.length; i++, j++) {
        let text = summs[i].replace(/\n/g, "");
        let para = [];
        let link = document.createElement("a");
        if (options[1].checked) var bold = document.createElement("b");
        if (options[2].checked) var italic = document.createElement("i");
                
        if (options[0].value == "Standard" || options[0].value == ""){
            if (!options[3].checked && text.startsWith("The")) {
                text = text.slice(4);
                para.push(document.createTextNode("The "))
            }

            if (text.match(/^.*?(?= report)|(?= reports)/) == null) {
                continue;
            }
            let textMatch = text.match(/^.*?(?= report)|(?= reports)/)[0];
            let textSplit = textMatch.split(/ and |, /);
            if (textSplit.length > 1) {
                for (let x = 0; x < textSplit.length; x++) {
                    let newLink = document.createElement("a");
                    newLink.href = links[j];
                    newLink.text = textSplit[x];
                    if (bold) bold = document.createElement("b")
                    if (italic) italic = document.createElement("i")
                    appendLinks(newLink, para, bold, italic);
                    if (x < textSplit.length-2 && textSplit.length > 2) {
                        para.push(document.createTextNode(", "));
                    } else if (x == textSplit.length-2) {
                        para.push(document.createTextNode(" and "))
                    }
                    j++
                }
            } else {
                link.text = textMatch;
                link.href = links[j];
                appendLinks(link, para, bold, italic);
            }
            appendText(text, para)
            para.push(document.createElement("br"))
            combinedParas.push(para)
        } else if (options[0].value == "Industry") {
            appendText(text, para);
            link.text = text.match(/( - )(.*)$/)[2];
            link.href = link[j]
            appendLinks(link, para, bold, italic);
            para.push(document.createElement("br"))
            combinedParas.push(para)
        }
    }
    return combinedParas;
}

function appendLinks(link, para, bold, italic){
    if (bold) {
        if (italic) {
            italic.appendChild(link)
            bold.appendChild(italic)
        } else {bold.appendChild(link)};
        para.push(bold)
    } else if (italic) {
        italic.appendChild(link);
        para.push(italic)
    } else {
        para.push(link)
    }
}

function appendText(text, para) {
    if (options[0].value == "Standard" || options[0].value == "") {
        let textComb = text.split(/^.*?(?= report)|(?= reports)/)[1];
        para.push(document.createTextNode(textComb))
    } else if (options[0].value == "Industry") {
        var match = text.match(/( - )(.*)$/);
        textComb = text.slice(0, match.index + 3);
        para.push(document.createTextNode(textComb))
    }
}
