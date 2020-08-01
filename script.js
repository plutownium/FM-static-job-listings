const tagEls = document.getElementsByClassName("tag")
const filterSection = document.getElementById("filter")

for (let i = 0; i < tagEls.length; i++) {
    tagEls[i].addEventListener("click", function () {
        // add tag choice to filter selection
        console.log(tagEls[i].childNodes[1].innerHTML)
        filterSection.innerHTML += makeFilterTag(tagEls[i].childNodes[1].innerHTML)
    })
}

function makeFilterTag(type) {
    const tagHTML = `
        <div class="${type} filter-tag">
            <span>${type}</span>
        </div>
    `
    return tagHTML
}

// TODO: make the filter div sit properly above the cards between margin and main area.
// TODO: Style the filter tags
// TODO: Add a X box beside each filter tag
// TODO: as each X box is created, add an event listener allowing the X to remove its tag from the fitler list.
// TODO: make only cards matching filters show up.