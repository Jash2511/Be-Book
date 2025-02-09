import {marktoList} from "./bookmarkList.js";

let idar = JSON.parse(localStorage.getItem("bkl")) || [];
const library = document.querySelector('.recomend-cont');

async function onTable(data){
    try {
        data.items.forEach(function (book) {
            let Id = book.id;
            let volInfo = book.volumeInfo;
            let Title = volInfo.title;
            let Author = "";
            if (volInfo.authors) {
                Author = volInfo.authors[0];
            }
            let Publisher = "";
            if (volInfo.publisher) {
                Publisher = volInfo.publisher;
            }
            let Img = Title;
            if (volInfo.imageLinks) {
                Img = volInfo.imageLinks.thumbnail;
            }
            let info = volInfo.infoLink;
            createBook(Title, Author, Publisher, info, Img,Id);
        })
    }
    catch(error){
        console.log(error);
    }
}
function createBook(title,author,publisher,infolink,img,Id){
    let book = document.createElement('div');
    book.classList.add('book');
    book.innerHTML = `<div class="title">${title}</div>
                <div class="author">${author}</div>
                <div class="publisher">${publisher}</div>
                <div class="markit ${Id}" >
                    <i class="fa-solid fa-bookmark"></i>
                </div>
                <div class="view" onclick="window.location.href='${infolink}';">
                    View
                </div>
                <div class="book-cover">
                    <img class="jpmorgan" src=${img}>
                </div>`;
    library.appendChild(book);
    if(checkIdIs(Id)){
        let temp = document.getElementsByClassName(Id)[0];
        temp.style.display="none";
    }
    marktoList(title,infolink,Id);
}

function checkIdIs(Id){
    if(idar.length != 0){
       return idar.some(function(item){
            return item.id == Id;
        });
    }
    else{
        return false;
    }
}

export {onTable};