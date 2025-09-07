
// Constants for DOM elements and application state
const webName = "Instagram UI Clone ";
const scroll = document.getElementById("scroll"); // Container for story elements
const menu = document.getElementById("drop-down-c"); // Dropdown menu for logo
const storyView = document.getElementById("storyDialog"); // Dialog for displaying stories

const logo = document.getElementById("logo"); // Logo element in navbar
const feedMain = document.getElementById("feedMain"); // Main feed container
const loadMoreBtn = document.createElement("button"); // Button for loading more posts
var i = 0; // Counter for post IDs

// Set the logo text to the web name
logo.innerText = webName;

// add text to load more
loadMoreBtn.innerText = "Load More..";
loadMoreBtn.className = "loadMore";
// add  click event 


/* Click Event handler for menu dropdown toggle */
document.getElementById("logo").addEventListener("click", function(event){
   event.stopPropagation();
    menu.classList.toggle("show");
});

/* Window click event to close menu dropdown if open */
window.addEventListener("click",function(event){
    if(menu.classList.contains("show")){
     menu.classList.remove("show");   
    }

});

/* Loop to create and display user stories */
for(let i=1; i<=12; i++){
let usedStory = document.createElement("div");
usedStory.classList.add("profile");
usedStory.innerHTML = `<img src="https://picsum.photos/200/300?random=${i}" alt="profile" >
<p>Random ${i}</p>`;
usedStory.addEventListener("click",function(){
 let name = this.querySelector("p").textContent;
 let url = this.querySelector("img").src;

showStory(name,url);

});
scroll.appendChild(usedStory);


}


feedMain.addEventListener("scroll", function() {
    // Use a more lenient condition that works for both single column and grid layouts
    const isNearBottom = feedMain.scrollTop + feedMain.clientHeight >= feedMain.scrollHeight - 100;

    if (isNearBottom) {
        if (i >= 30) {
            // Show load more button when limit reached
            if (!feedMain.contains(loadMoreBtn)) {
                feedMain.appendChild(loadMoreBtn);
            }
        } else {
            // Auto-load more posts
            addFeed();
        }
    }
});

loadMoreBtn.addEventListener("click",function(){
feedMain.removeChild(loadMoreBtn);
addFeed();
feedMain.appendChild(loadMoreBtn);

});


function addFeed() {
    // for loop - for feed posts
for ( let j =1; j <= 4; j++) {
    i++;
    let postElement = document.createElement("div");
    postElement.classList.add("post");

    // Using a template literal for cleaner HTML structure
    postElement.innerHTML = `
        <div class="post-header">
            <img src="https://picsum.photos/50/50?random=${i + 10}" alt="user profile">
            <span class="username">user_${i}</span>
        </div>
        <div class="post-image">
        
            <img src="https://picsum.photos/400/400?random=${i + 20}" alt="post image" loading="lazy" >
             <span class="heart-icon">❤️</span>
        </div>
        <div class="post-actions" style="padding: 8px 12px;">
            <img src="../asset/image/love.png" alt="like" class="tab" style="width: 24px; height: 24px; margin-right: 12px;">
            <img src="../asset/image/comment.png" alt="comment" class="tab" style="width: 24px; height: 24px; margin-right: 12px;">
            <img src="../asset/image/message.png" alt="share" class="tab" style="width: 24px; height: 24px;">
        </div>
        <div class="post-description" style="padding: 0 12px 12px;">
            <p><strong>user_${i}</strong> Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum autem cum amet ? post #${i}</p>
        </div>
    `;
    postElement.querySelector(".post-image img").addEventListener("dblclick",function(){
  
    postElement.querySelector(".post-image .heart-icon").classList.add("addliked");
    setTimeout(function(){
    postElement.querySelector(".post-image .heart-icon").classList.remove("addliked");
    },500); // Changed to 500ms
    
});
    feedMain.appendChild(postElement);
}
}


/* Function to display a story dialog with video and comment input */
function showStory( name, url) {

    let sty = document.createElement("div");
    sty.className = "storyDialog";
    sty.id = "storyDialog";
    sty.innerHTML =  `
                <div class="post-header" style=" background-color: rgb(99, 92, 92);  ">
            <img src="${url}" alt="user profile">
                  <span class="username" style="color: whitesmoke; flex: 1;" id="name" >${name}</span><span  style="color: whitesmoke; cursor: pointer;" id="cnl"> X</span>
                   </div>
                    <video src="../asset/story/story.mp4" autoplay playinline class="videoView" style="
                    height: 80%;
                      width: 100%;
                      pointer-events: none;

                    "></video>
                       <div class="story-actions" >

            <input type="text" class="story-actions-input" placeholder="Add a comment...">
            <img src="../asset/image/love.png" alt="like" class="tab" style="width: 24px; height: 24px; margin-right: 12px;">
        </div>
      `;
     scroll.appendChild(sty);

     // Get video element
     let video = sty.querySelector('.videoView');

     // Handle auto-play
     let playPromise = video.play();
     if (playPromise !== undefined) {
         playPromise.then(() => {
             // Auto-play started
         }).catch(error => {
             // Auto-play was prevented, show play button or message
             let playButton = document.createElement('button');
             playButton.innerText = 'Tap to Play';
             playButton.className = 'play-button';
             playButton.style.position = 'absolute';
             playButton.style.top = '50%';
             playButton.style.left = '50%';
             playButton.style.transform = 'translate(-50%, -50%)';
             playButton.style.zIndex = '10000';
             playButton.style.padding = '10px 20px';
             playButton.style.backgroundColor = 'rgba(0,0,0,0.7)';
             playButton.style.color = 'white';
             playButton.style.border = 'none';
             playButton.style.borderRadius = '5px';
             playButton.style.cursor = 'pointer';
             sty.appendChild(playButton);

             playButton.addEventListener('click', () => {
                 video.play();
                 sty.removeChild(playButton);
             });
         });
     }

    document.getElementById("cnl").addEventListener("click",function () {
        scroll.removeChild(sty);
    });

}

document.getElementById("defaultPost").addEventListener("dblclick",function(){
    // Store a reference to the clicked element in a variable
    const xx= this;

    xx.querySelector(".post-image .heart-icon").classList.add("addliked");

    setTimeout(function(){
        // Use the saved variable to access the element
        xx.querySelector(".post-image .heart-icon").classList.remove("addliked");
    }, 500);
});
