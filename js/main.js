/*---------------------start header----------------------*/

//select Elements
let inputSearch = document.querySelector("header .container .search input");
let searchIcon = document.querySelector("header .container .search i:first-child");
let deleteValue = document.querySelector("header .container .search i:last-child");

//focus on input when you click on search icon
searchIcon.onclick = function(){
    inputSearch.focus();
}

//delete input value when you click on x-mark
deleteValue.onclick = ()=>{

    inputSearch.value = "";
    inputSearch.focus();
};

/*---------------------end header----------------------*/

/*---------------------start section----------------------*/

/*---------------------start left----------------------*/

//select elements
let leftPart = document.querySelector("section .left");
let sideElements = document.querySelectorAll("section .left ul li");
let notificationPopup = document.querySelector("section .left ul .notifications-part");
let gear = document.querySelector("section .left aside > i");

//change active class when you click on li
sideElements.forEach(li=>{

    li.addEventListener("click",(e)=>{

        //remove active class
        sideElements.forEach(del => del.classList.remove("active"));

        //add active class on clickable li
        e.currentTarget.classList.add("active");

       //remove number of messages/notifications
       if(e.currentTarget.classList.contains("special")){
        
        if(e.currentTarget.children[1].tagName === "SPAN" && e.currentTarget.children[1].classList.length === 0){
            e.currentTarget.children[1].remove();
        }
       }

       //go to saved postes
       if(e.currentTarget.classList.contains("saved")){
        location.href = "saved_posts.html";
       }
    });
});

 //show/remove notification

 document.addEventListener("click",(e)=>{

    if(e.target.hasAttribute("data-notification")){
        notificationPopup.classList.toggle("show");
    }
 });


//show side bar
gear.onclick = function(){

    leftPart.classList.toggle("show");
};

/*--------------------- end left----------------------*/

/*--------------------- start main----------------------*/

//select elements
let contentOfMain = document.querySelector("section main .content");
let postBtn = document.querySelector("section main .post-profile > span");
let inputFile = document.querySelector(" section main .post-profile > input");
let inputText = document.querySelector("section main .post input");

//create poste

//array to save boxes data
let arrLocalStorage = [];

//create first in localStorage

let boxesLocalStorage = window.localStorage.getItem("boxes");

if(boxesLocalStorage){

    let data = JSON.parse(boxesLocalStorage);

    for(let i = 0; i < data.length; i++){

        //create box
        let box = document.createElement("div");
        box.className = "box";
        box.id = data[i].id;
        box.innerHTML = data[i].content;
        contentOfMain.prepend(box);

        
        //save new + old boxes
        let obj = {
            id: box.id,
            content: box.innerHTML
        }

        arrLocalStorage.push(obj);
    }
}


postBtn.onclick = ()=>{

    if(inputFile.value !== ""){

    //create box
    let box = document.createElement("div");
    box.className = "box";


    //create profile user
    let user = document.createElement("div");
    user.className = "user";

    //create post image
    let userPhoto = document.createElement("img");
    userPhoto.alt = "user";
    userPhoto.className = "img-border";
    userPhoto.src = "images/profile-1.jpg";

    user.appendChild(userPhoto);

    //complete user elements
    user.innerHTML += `<div class="user-infos">
    <div class="user-name">Dianna Ayl</div>
    <div class="time-ago">1 minutes ago</div>
</div>`;

box.appendChild(user);

//create image post
let postImage = document.createElement("img");
postImage.alt = "feed";
postImage.className = "feed";

if(inputFile.files[0]){
    postImage.src = URL.createObjectURL(inputFile.files[0]);
}

box.appendChild(postImage);

    //create post text
    let postText = document.createElement("p");
    postText.className = "post-text";
    postText.innerHTML = inputText.value;
    box.appendChild(postText);

//finish the rest

box.innerHTML += `<div class="reactions">
<i class="fa-regular fa-heart"></i>
<i class="fa-regular fa-comment-dots"></i>
<i class="fa-solid fa-share-nodes flex-g"></i>
<i class="fa-regular fa-bookmark c-pointer"></i>
</div>

<div class="liked">
<div class="profiles">

    <img src="images/profile-8.jpg" alt="profile" class="img-border">
    <img src="images/profile-11.jpg" alt="profile" class="img-border">
    <img src="images/profile-20.jpg" alt="profile" class="img-border">

</div>

<p>Liked by <span>Emest Achiever</span> and <span>2 others</span></p>

</div>

<div class="comment"><span>Dati Rose</span> Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>

<div class="info">View all 3 comments</div>`;

    //create box delete
    let deleteBox = document.createElement("i");
    deleteBox.className = "fa-solid fa-xmark delete";
    box.prepend(deleteBox);


//put the box in the start of the content
contentOfMain.prepend(box);
    
//set in the local storage added boxes

const obj = {

    id: Date.now(),

    content: box.innerHTML
}

box.id = obj.id;

arrLocalStorage.push(obj);

window.localStorage.setItem("boxes",JSON.stringify(arrLocalStorage));

//save box by clicking on bookmark
saveBoxes();
}

else{
    alert("Choose Image");
}

};

//array of saved boxes
let arrSavedBoxes = [];

//delete added boxes by clicking on x-mark from : page + localStorage
document.addEventListener("click",(e)=>{

    if(e.target.classList.contains("delete") & e.target.parentElement.className === "box"){


        for(let i = 0; i < arrLocalStorage.length; i++){

            if(arrLocalStorage[i].id == e.target.parentElement.id){
                arrLocalStorage.splice(i,1);
                window.localStorage.setItem("boxes",JSON.stringify(arrLocalStorage));
                e.target.parentElement.remove();

            }
        }

        //delete saved added boxes
       deleteContent(arrSavedBoxes,e.target.parentElement,"saved-boxes")
    }
});


//saved boxes in localStorage
let savedBoxesLocalStorage = window.localStorage.getItem("saved-boxes");

if(savedBoxesLocalStorage){

    let boxes = document.querySelectorAll("section main .content .box");
    let savedbookmarkrs = document.querySelectorAll("section main .content .box .fa-bookmark");

    let data = JSON.parse(savedBoxesLocalStorage);

   

        for(let i = 0; i < data.length; i++){

            boxes.forEach((box,index) =>{

            if(box.id === data[i].id){
                savedbookmarkrs[index].className = "fa-solid fa-bookmark c-pointer";

            }
            });

            let obj = {
                id: data[i].id,
                content: data[i].content
            }

            arrSavedBoxes.push(obj);
        }

    
}


//bookmarkrs function

function saveBoxes(){

//select all bookmarkrs
let bookmarkrs = document.querySelectorAll("main .content .box .fa-bookmark");
    
    bookmarkrs.forEach(mark =>{
        
//when you click on bookmark
mark.onclick = function(){
        
    //save the box in local storage and add full bookmark icon
    let box = this.parentElement.parentElement;

    if(this.classList.contains("fa-regular")){
        
    this.className = "fa-solid fa-bookmark c-pointer";

    let obj = {
        id: box.id,
        content: box.innerHTML
    }

    arrSavedBoxes.push(obj);

    window.localStorage.setItem("saved-boxes",JSON.stringify(arrSavedBoxes));

    }
    else{

        //delete box from saved boxes
    this.className = "fa-regular fa-bookmark c-pointer";

    
    deleteContent(arrSavedBoxes,box,"saved-boxes");

        
    }


    
                
};

});
}
saveBoxes();


//delete box from saved box
function deleteContent(arr,del,item){
    for(let i = 0; i < arr.length; i++){

        if(arr[i].id == del.id){
            arr.splice(i,1);
            window.localStorage.setItem(item,JSON.stringify(arr));
        }
    }
}

/*--------------------- end main----------------------*/

/*--------------------- start right part----------------------*/

//select elements



/*--------------------- end right part----------------------*/





/*--------------------- end section----------------------*/


