
let savedContent = document.querySelector("div.saved");

let savedPosts = window.localStorage.getItem("saved-boxes");


if(savedPosts){
    let data = JSON.parse(savedPosts);

    console.log(data)
    for(let i = 0; i < data.length; i++){

        let box = document.createElement("div");
        box.className = "box";
        box.id = data[i].id;
        box.innerHTML = data[i].content;

        savedContent.appendChild(box);
    }
}

        // deleteContent(arrSavedBoxes,e.target.parentElement,"saved-boxes");


        // function deleteContent(arr,del,item){
        //     for(let i = 0; i < arr.length; i++){
        
        //         if(arr[i].id == del.id){
        //             arr.splice(i,1);
        //             window.localStorage.setItem(item,JSON.stringify(arr));
        //         }
        //     }
        // }
        