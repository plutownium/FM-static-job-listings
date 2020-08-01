const cardTagEls = document.getElementsByClassName("tag")
const filterSection = document.getElementById("filter")

let filterTags = [];

// TODO: rewrite so "filterTags" is the single src of truth for the app.
// TODO: when a tag is added, add it to filterTags & RERENDER based on contents of filterTags.
// TODO: if filterTags.length === 0, render all cards.
// TODO: if filterTags.length > 0, render based on content of filterTags.

for (let i = 0; i < cardTagEls.length; i++) {
    cardTagEls[i].addEventListener("click", function () {
        // add tag choice to filter selection
        const tagType = cardTagEls[i].childNodes[1].innerHTML
        if (filterTags.includes(tagType)) {
            // pass
            console.log("Skipping, tag already present...")
        } else {
            filterTags.push(tagType)
            console.log(filterTags)
            rerenderDOM()
        }
    })
}

function rerenderDOM() {
    // display only cards & filterTags that match the filter
    const cards = document.getElementsByClassName("card")

    // if there are no tags in the filter, display all cards
    if (filterTags.length === 0) {
        for (const card of cards) {
            // if the card has the "hidden" class, remove it
            if (card.classList.contains("card-hider")) {
                card.classList.remove("card-hider")
            }
        }
    }

    // if there are tags in the filter, display matching tags.
    if (filterTags.length > 0) {
        for (const card of cards) {
            const getsFilteredOut = cardGetsFilteredOut(card)
            // if the card gets filtered, add the hidden class
            if (getsFilteredOut) {
                console.log("HI", card)
                card.classList.add("card-hider")
            }
        }
    }
}

function cardGetsFilteredOut(card) {
    if (filterTags.length === 0) {
        return false // no cards are filtered out if there is no filterTags!
    }
    // assemble array of tags in the card
    const cardTags = card.getElementsByClassName("tag");

    // a card gets filtered out if it has no tags in the filterTags
    for (let i = 0; i < cardTags.length; i++) {
        const currentTag = cardTags[i].childNodes[1].innerHTML
        console.log(currentTag)
        for (let j = 0; j < filterTags.length; j++) {
            if (currentTag === filterTags[j]) {
                throw "Success"

                return false // card is not filtered out because one of its tags matches the filter tags
            }
        }
    }
    return true // none of the tags matched, therefore the card is filtered out
}

function makeFilterTag(type) {
    // update the state
    // filterTags.push(type)

    const tagHTML = `
        <div class="${type} filter-tag">
            <span>${type}</span><span class="x">X</span>
        </div>
    `
    return tagHTML
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

// TODO: Style the filter tags - IS THIS DONE? YES/no?
// TODO: Add a X box beside each filter tag
// TODO: as each X box is created, add an event listener allowing the X to remove its tag from the fitler list.
// TODO: make only cards matching filters show up.