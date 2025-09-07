const btm = document.getElementById("bottomSheet");

// dynamically add css here
btm.style.cssText =`   position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  background-color: rgb(255, 255, 255);
    padding: 20px;`;

    // add dynamically buttons
btm.innerHTML =`
<img src="../asset/image/home.png" alt="home" id="home" class="tab">
<img src="../asset/image/search.png" alt="search" id="search" class="tab">
<img src="../asset/image/add.png" alt="add" id="add" class="tab">
<img src="../asset/image/reels.png" alt="reels" id="reels" class="tab">
<img src="../asset/favicon.png" alt="profile" id="profile" class="tab">`;



// define buttons
let search = document.getElementById("search");
let home = document.getElementById("home");
let add = document.getElementById("add");
let reels = document.getElementById("reels");
let profile = document.getElementById("profile");

// home button click

home.addEventListener("click", function(){
 
    window.location.replace("../")

});
// search button click
search.addEventListener("click", function(){
     window.location.href = "../search/";
}); 
