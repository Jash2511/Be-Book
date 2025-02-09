const list = document.querySelector(".markedList");

let markArray = JSON.parse(localStorage.getItem("bkl")) || [];

if(JSON.parse(localStorage.getItem("bkl"))){
    markArray.forEach(async function(book){
        let bt= book.title;
        let bi = book.infolink;
        let bd = book.id;
        await listToUi(bt,bi,bd);
    });
}

async function listToUi(title,infolink,Id){
    const book = document.createElement("div");
    book.classList.add("bok");
    book.innerHTML = `<div class="Bti" onclick="window.location.href='${infolink}';">${title}</div>\n` +
        `                <div class="remove"  id="${Id}">\n` +
        `                    <p>Remove</p>\n` +
        `                </div>`;
    list.appendChild(book);
    removefrom(book,Id)
}
function marktoList(title,infolink,Id){
    const markSign = document.getElementsByClassName(Id)[0];
    markSign.addEventListener("click" , function(){
        listToUi(title,infolink,Id);
        markArray.push({"title":title,"infolink":infolink,"id":Id});
        updatemarkList(markArray);
        markSign.style.display="none";
    });
}

function getId(Id){
    return markArray.findIndex(function(item){
        return Id===item.id
    })
}


function removefrom(book,Id){
    let rem = document.getElementById(Id);
    rem.addEventListener("click" , function(){
        let locIn = getId(Id)
        markArray.splice(locIn,1);
        book.remove();
        let markd = document.getElementsByClassName(Id)[0];
        markd.style.display="flex";
        updatemarkList(markArray);
    });
}




function updatemarkList(Array){
    localStorage.setItem("bkl", JSON.stringify(Array));
}

export {marktoList};