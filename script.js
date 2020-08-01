const tagEls = document.getElementsByClassName("tag")
const filterSection = document.getElementById("filter")

const activeTags = [];

// TODO: rewrite so "activeTags" is the single src of truth for the app.
// TODO: when a tag is added, add it to activeTags & RERENDER based on contents of ActiveTags.
// TODO: if activeTags.length === 0, render all cards.
// TODO: if activetags.length > 0, render based on content of activeTags.

for (let i = 0; i < tagEls.length; i++) {
    tagEls[i].addEventListener("click", function () {
        // add tag choice to filter selection
        const tagType = tagEls[i].childNodes[1].innerHTML
        if (tagIsAlreadyPresent(tagType)) {
            // pass
            console.log("Skipping, tag already present...")
        } else {
            // if tag isn't there yet, load it up!
            filterSection.innerHTML += makeFilterTag(tagType)
            // grab the associated "x" and add a "removeTag" event listener
            const associatedXBtn = retrieveAssociatedXBtnFromFilterSection(tagType, filterSection.childNodes)
            associatedXBtn.addEventListener("click", function () {
                // prepare to remove the tag if the x is clicked
                console.log("CLICKED!")
                removeTagFromFilter(tagType)
            })
        }
    })
}

function makeFilterTag(type) {
    const tagHTML = `
        <div class="${type} filter-tag">
            <span>${type}</span><span class="x">X</span>
        </div>
    `
    return tagHTML
}

function tagIsAlreadyPresent(type) {
    // scans all the filter tags currently present, returns true if the input tag alraedy exists.
    if (typeof type !== "string") {
        // basic error handling
        console.log("ERROR INPUT:", type)
        throw "Wrong input type"
    }
    const currentTags = [];
    const tagEls = filterSection.childNodes
    for (const tag of tagEls) {
        if (tag.tagName == "DIV") {
            const tagType = tag.childNodes[1].innerHTML
            // console.log("was a div named", tagType)
            currentTags.push(tagType)
        }
    }
    if (currentTags.includes(type)) {
        return true
    } else {
        return false
    }
}

function retrieveAssociatedXBtnFromFilterSection(tagType, nodes) {
    // returns the node[2] from node sets where node[1].innerHTML == tagType
    for (const node of nodes) {
        // "if the node has more than 0 childNodes...""
        if (node.childNodes.length > 0) {
            // "...test if the node's 1th index contains the tagType we're searching for..."
            if (node.childNodes[1].innerHTML === tagType) {
                // "...and return the node's 2th index element, which is the x btn associated with the tag type"
                return node.childNodes[2]
                // the returned element will then receive an eventListener used to remove the tag from the filter list
            }
        }
    }
}

function removeTagFromFilter(tagType) {
    const filterDivChildren = document.getElementById("filter").children
    for (const tag of filterDivChildren) {
        console.log(tag)
        if (tag.childNodes) {
            if (tag.childNodes[1].innerHTML === tagType) {
                // delete the element from the filter
                tag.parentNode.removeChild(tag)
                return true
            }
        }
    }
    console.log(tagType)
    throw "Failed to remove tag from filter"
}

// TODO: Style the filter tags - IS THIS DONE? YES/no?
// TODO: Add a X box beside each filter tag
// TODO: as each X box is created, add an event listener allowing the X to remove its tag from the fitler list.
// TODO: make only cards matching filters show up.