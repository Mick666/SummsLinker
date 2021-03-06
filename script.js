const options = $('.options')
const outputDiv = $('.output').first()
let singleTextBoxData = ''
let outputField = []
const placeholderText = 'Make sure all links & summaries are on separate lines.\n\
Insert all your summaries and the associated links into this text box\
, then hit Create All Links to link them. \nThe placement of the links doesn\'t matter\
 (i.e., it doesn\'t matter if they\'re all at the top or the bottom, or so on.\
\nThe first link will be added to the first summary and so on.'

$(document).ready(() => {
    $('#singularTextBox').attr('placeholder', placeholderText)
})

function createOutputField(output) {
    if (outputDiv[0].children.length > 0) {
        while (outputDiv[0].children.length > 0) {
            outputDiv[0].removeChild(outputDiv[0].lastChild)
        }
        outputDiv[0].innerHTML = ''
    }

    let filteredParas = output.filter(x => x !== null)
    for (let i = 0; i < filteredParas.length; i++) {
        for (let j = 0; j < filteredParas[i].length; j++) {
            outputDiv[0].appendChild(filteredParas[i][j])
        }
    }
}
// eslint-disable-next-line
function createAllLinks() {
    outputField = createLinksSingleField()
    createOutputField(outputField)
    $('.output-parent').show()
}
// eslint-disable-next-line
function clearAllFields() {
    singleTextBoxData = $('#singularTextBox').val()
    console.log(singleTextBoxData)
    $('#singularTextBox').val(' ')
    outputDiv.html(' ')
    // $('.output-parent').hide()
}
// eslint-disable-next-line
function undoReset() {
    $('#singularTextBox').val(singleTextBoxData)
    createOutputField(outputField)
    $('.output-parent').show()

}

function createLinksSingleField() {
    let strippedInput = document.getElementById('singularTextBox').value
        .split('\n')
        .filter(x => x.replace(/\n| /g, '').length > 0)

    let links = strippedInput.filter(x => x.startsWith('http'))
    let summs = strippedInput.filter(x => !x.startsWith('http') && x.length > 10)
    let combinedParas = []

    for (let i = 0, j = 0; i < summs.length && j < links.length; i++) {
        let text = summs[i].replace(/–/g, '-')
        let para = []
        let link = document.createElement('a')
        if (options[1].checked) var bold = document.createElement('b')
        if (options[2].checked) var italic = document.createElement('i')

        if (options[0].value === 'Standard' || options[0].value === '') {
            if (!options[3].checked && text.startsWith('The')) {
                text = text.slice(4)
                para.push(document.createTextNode('The '))
            }

            if (text.match(/^.*?(?= report)|(?= reports)/) === null) {
                continue
            }
            let textMatch = text.match(/^.*?(?= report)|(?= reports)/)[0]
            let textSplit = textMatch.split(/ and |, /)
            if (textSplit.length > 1) {
                let separators = textMatch.match(/,(?:[^,])| and /g)
                for (let x = 0; x < textSplit.length; x++, j++) {
                    let newLink = document.createElement('a')
                    newLink.href = links[j]
                    newLink.text = textSplit[x]
                    if (bold) bold = document.createElement('b')
                    if (italic) italic = document.createElement('i')
                    appendLinks(newLink, para, bold, italic)
                    if (separators[x]) {
                        if (options[4].checked) separators[x] = separators[x].trim()
                        para.push(document.createTextNode(separators[x]))
                    }
                }
            } else {
                link.text = textMatch
                link.href = links[j]
                appendLinks(link, para, bold, italic)
                j++
            }
            appendText(text, para)
            para.push(document.createElement('br'))
            combinedParas.push(para)
        } else if (options[0].value === 'Industry') {
            appendText(text, para)
            link.text = text.match(/( - )(.*)$/)[2]
            link.href = links[j]
            appendLinks(link, para, bold, italic)
            para.push(document.createElement('br'))
            combinedParas.push(para)
            j++
        } else if (options[0].value === 'Coles') {
            let textMatch = text.match(/( - )(.*)$/)[2]
            let textSplit = textMatch.split(/ and |, /)
            appendText(text, para)
            if (textSplit.length > 1) {
                let separators = textMatch.match(/,(?:[^,])| and /g)
                for (let x = 0; x < textSplit.length; x++, j++) {
                    let newLink = document.createElement('a')
                    if (links[j]) newLink.href = links[j]
                    newLink.text = textSplit[x]
                    if (bold) bold = document.createElement('b')
                    if (italic) italic = document.createElement('i')
                    appendLinks(newLink, para, bold, italic)
                    if (separators[x]) {
                        console.log(separators[x])
                        if (options[4].checked) separators[x] = separators[x].trim()
                        para.push(document.createTextNode(separators[x]))
                    }
                }
            } else {
                link.text = textMatch
                link.href = links[j]
                appendLinks(link, para, bold, italic)
                j++
            }
            para.push(document.createElement('br'))
            combinedParas.push(para)
        }
    }
    return combinedParas
}

function appendLinks(link, para, bold, italic) {
    if (bold) {
        if (italic) {
            italic.appendChild(link)
            bold.appendChild(italic)
        } else { bold.appendChild(link) }
        para.push(bold)
    } else if (italic) {
        italic.appendChild(link)
        para.push(italic)
    } else {
        para.push(link)
    }
}

function appendText(text, para) {
    let textComb
    if (options[0].value === 'Standard' || options[0].value === '') {
        textComb = text.split(/^.*?(?= report)|(?= reports)/)[1]
        if (options[4].checked) textComb = textComb.trim()
        para.push(document.createTextNode(textComb))
    } else if (options[0].value === 'Industry' || options[0].value === 'Coles') {
        var match = text.match(/( - )(.*)$/)
        textComb = text.slice(0, match.index + 3)
        if (options[4].checked && options[0].value === 'Industry') textComb = textComb.trim()
        para.push(document.createTextNode(textComb))
    }
}
