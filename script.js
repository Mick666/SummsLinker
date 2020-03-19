// const classes = {"firstLink":"firstSet", "secondLink":"secondSet", "thirdLink":"thirdSet"}
const options = document.getElementsByClassName("options");
console.log(options)
function createLinks(el) {
    const linkArea = document.getElementsByClassName(el.classList[0]);
    createLink(linkArea);
    appendText(linkArea);
  }
  
  function createLink(classElem) {
    console.log(classElem)
    const link = classElem[0];
    var text = classElem[1].value;
    var para = classElem[3];
  
    var linkComb = document.createElement("a");
    linkComb.text = text.match(/^.*(?= reports)/)[0];
    if (options[1].checked) linkComb.style.fontWeight = "bold"
    if (options[2].checked) linkComb.style.fontStyle = "italic"
    linkComb.href = link.value;
    para.appendChild(linkComb)
  }
  
  function appendText(classElem, para) {
    var text = classElem[1].value;
    var linkComb = text.split(/^.*(?= reports)/)[1];
    var para = classElem[3];
    para.appendChild(document.createTextNode(linkComb))
  }