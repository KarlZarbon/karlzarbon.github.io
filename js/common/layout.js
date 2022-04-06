function replaceTags(filePath, tagId){

    fetch(filePath)
    .then(res => res.text())
    .then(text => {
        let oldElement = document.querySelector(tagId);
        let newElement = document.createElement("div");
        newElement.innerHTML = text;
        oldElement.parentNode.replaceChild(newElement,oldElement);
    })

}


document.addEventListener("DOMContentLoaded", () => {

    replaceTags('/common/footer.html',"div#replace_with_footer")
    replaceTags('/common/nav.html',"div#replace_with_navbar")



});