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
        filterSection.innerHTML = ""
        for (const card of cards) {
            // if the card has the "hidden" class, remove it
            if (card.classList.contains("card-hider")) {
                card.classList.remove("card-hider")
            }
        }
    }

    // if there are tags in the filter, display matching tags.
    if (filterTags.length > 0) {
        // make the tags appear in the Filter section
        filterSection.innerHTML = ""
        for (const tag of filterTags) {
            filterSection.innerHTML += makeFilterTag(tag)
            // const xBtn = retrieveAssociatedXBtnFromFilterSection(tag, filterSection.childNodes)
            // xBtn.addEventListener("click", function () {
            //     const unwantedTagIndex = filterTags.indexOf(tag)
            //     if (unwantedTagIndex > -1) {
            //         filterTags.splice(unwantedTagIndex, 1)
            //     }
            //     console.log(filterTags)  // FIXME: sometimes the final tag is removed from filter but the tag element stays
            //     rerenderDOM()
            // })
        }
        // now go thru each tag, pull out its associated X, and add an event listener allowing removal of the tag
        for (const tag of filterTags) {
            const xBtn = retrieveAssociatedXBtnFromFilterSection(tag, filterSection.childNodes);
            xBtn.addEventListener("click", function () {
                const unwantedTagIndex = filterTags.indexOf(tag)
                if (unwantedTagIndex > -1) {
                    filterTags.splice(unwantedTagIndex, 1)
                }
                rerenderDOM()
            })
        }

        // hide the cards that don't match
        for (const card of cards) {
            const getsFilteredOut = cardGetsFilteredOut(card) // returns true if none of the card's tags are in the filter list
            // if the card gets filtered, add the hidden class
            if (getsFilteredOut) {
                // console.log("HI", card.childNodes[1].childNodes[1])
                card.classList.add("card-hider")
            } else {
                // if the card *doesn't* get filtered, check if it's already hidden & remove the hider if it is hidden
                if (card.classList.contains("card-hider")) {
                    card.classList.remove("card-hider")
                }
            }
        }
    }
}

function cardGetsFilteredOut(card) {
    if (filterTags.length === 0) {
        return false // no cards are filtered out if there is no filterTags!
    }
    // assemble array of tags in the card
    const cardTagElements = card.getElementsByClassName("tag");
    const cardTags = [];
    for (const element of cardTagElements) {
        cardTags.push(element.childNodes[1].innerHTML)
    }

    const numOfMatchesRequiredToStay = filterTags.length;
    let totalMatches = 0;

    // a card gets filtered out if it has no tags in the filterTags
    for (let i = 0; i < cardTags.length; i++) {
        const currentTag = cardTags[i]
        if (filterTags.includes(currentTag)) {
            // console.log("card isnt filtered because:", filterTags, currentTag)
            totalMatches++;
            if (totalMatches == numOfMatchesRequiredToStay) {
                return false
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
