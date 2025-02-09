import {key1,key2} from './api.js'

async function fetchBooks(userSearch){
    let url1 = `https://www.googleapis.com/books/v1/volumes?q=${userSearch}:keyes&key=${key2}`;
    let url2 = `https://www.googleapis.com/books/v1/volumes?q=${userSearch}:keyes&key=${key1}`;

    try {
        //fetching books data
        let response = await fetch(url1);
        if(!response.ok){
            if(response.status === 429){
                response = await fetch(url2);
            }
            else {
                throw new Error("HTTP error Status: " + response.status + " " + response.statusText);
            }
        }
        let data = await response.json();
        if(!data.items){
            return 632;
        }
        else{
            return data;
        }
    }
    catch(err){
        console.log(err.message);
        return [241,err.message];
    }
}

//exporting function
export  {fetchBooks}