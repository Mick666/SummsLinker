function createLinks(el) {
    const linkArea = document.getElementsByClassName(el.className);
    let para = document.createElement("p")
    createLink(linkArea, para);
    appendText(linkArea, para)
    if (linkArea[3].childNodes.length > 0) {
        linkArea[3].removeChild(linkArea[3].firstChild)
    }
    linkArea[3].appendChild(para)
  }
  
  function createLink(classElem, para) {
    const link = classElem[0];
    var text = classElem[1].value;
  
    var linkComb = document.createElement("a");
    linkComb.text = text.match(/^.*(?= reports)/)[0];
    linkComb.href = link.value;
    para.appendChild(linkComb)
  }
  
  function appendText(classElem, para) {
    var text = classElem[1].value;
    var linkComb = text.split(/^.*(?= reports)/)[1];
    para.appendChild(document.createTextNode(linkComb))
  }