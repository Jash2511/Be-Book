import {fetchBooks} from "./fetchbook.js";
import {onTable} from "./genBooks.js";

//Handle Searching


//---------------------------------------------------------------------------------------------------------------------
// Variables
const searchbar = document.querySelector(".search-barinput");
const search = document.querySelector('.round');
const libr = document.querySelector('.recomend-cont')



//---------------------------------------------------------------------------------------------------------------------
// Functions
// --------------------------------------------------------------------------------------------------------------------


// Update SearchBar After Refresh Acording Last Search
let lastSearch = JSON.parse(localStorage.getItem("lastSearch")) || "Search";

if(JSON.parse(localStorage.getItem("lastSearch"))){
    (async function(){
        await Results(lastSearch);
    })();
}
else{
    updateplaceholder(lastSearch);
}


//----------------------------------------------------------------------------------------------------------------------
//clean recomend-cont at every new search
function cleanRC(){
    libr.innerHTML = ``;
}


// -------------------------------------------------------------------------------------------------------------------



//Handle Fetch error And Inform
async function DTE(data){
    if(data== 632){
        const result = document.createElement('div');
        result.innerHTML = `<span> No Results Found</span>`;
        result.classList.add('noresult');
        libr.appendChild(result);
        return false;
    }
    else if(data[0] == 241){
        const result = document.createElement('div');
        result.innerHTML = `<span>${data[1]}</span>`;
        result.classList.add('noresult');
        libr.appendChild(result);
        return false;
    }
    return true;
}


//----------------------------------------------------------------------------------------------------------------------
// Validate Input Field
function validInput(Searching){
    const regEx = /^[a-z0-9A-Z]{1,}.*$/g;
    if(!regEx.test(Searching)){
        if(Searching==' '){
            updateplaceholder("Search")
            searchbar.value = "";
        }
        else {
            updateplaceholder("Type Something Valid...")
            searchbar.value = "";
        }
        return false;
    }
    return true;
}


// -----------------------------------------------------------------------------------------------------------------
//Update search fied place holder
function updateplaceholder(word){
    searchbar.setAttribute("placeholder", word+"...");
}


// ------------------------------------------------------------------------------------------------------------------
// Show Results
async function Results(Searching){
    if(!validInput(Searching)){
        return;
    };
    updateplaceholder(Searching);
    searchbar.value = "";
    // fetch books;
    let Data = await fetchBooks(Searching);
    let nextPro = await DTE(Data);
    if(!nextPro){
        updatelastSearch("");
        return ;
    }
    else {
        await onTable(Data);
        updatelastSearch(Searching);
    }
}


//----------------------------------------------------------------------------------------------------------------------
//User Search

async function searchval(){
    document.querySelector('.round').style.backgroundColor="black";
    cleanRC();
    const searchvalue = searchbar.value;
    await Results(searchvalue);
}


// -------------------------------------------------------------------------------------------------------------------
// EventListeners
// -------------------------------------------------------------------------------------------------------------------


//Search Time
search.addEventListener('click', searchval);
searchbar.addEventListener('keydown',(e)=>{
    if(e.key === "Enter"){
        searchval();
    }
});


//InputTime
searchbar.addEventListener('input' , function(){
    let searchvalue = searchbar.value;
    let regEx = /^[a-z0-9A-Z]{1,}.*$/g;
    if(searchvalue.length==0){
        document.querySelector('.round').style.backgroundColor="black";
    }
    else if(!regEx.test(searchvalue)){
        document.querySelector('.round').style.backgroundColor="#D12332";
    }
    else{
        document.querySelector('.round').style.backgroundColor="#188C29";
    }
})




// -------------------------------------------------------------------------------------------------------------------
// LocalStorage
// -------------------------------------------------------------------------------------------------------------------


function updatelastSearch(value){
    setTimeout(()=> {
        localStorage.setItem('lastSearch', JSON.stringify(value));
    })
}



