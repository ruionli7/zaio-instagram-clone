//DOM functions 
const searchInput = document.querySelector(".search-inpupt");
const searchBtn = document.querySelector("#search-btn");
const postsDiv = document.querySelector(".posts");

const usernameInput = document.querySelector("#username");
const imageLinkInput = document.querySelector("#imagelink");
const captionInput = document.querySelector("#caption");
const createPostBtn = document.querySelector("#create-post-btn");
const editPostBtn = document.querySelector("#edit-post-btn");
const deletePostBtn = document.querySelector("#delete-post-btn");
const logoutBtn = document.querySelector("#logout-btn");
editPostBtn.style.display = "none";
deletePostBtn.style.display = "none";

// const myDropdown = document.getElementById('myDropdown')
// const dropdownElementList = document.querySelectorAll('.dropdown-toggle')
// const dropdownList = [...dropdownElementList].map(dropdownToggleEl => new bootstrap.Dropdown(dropdownToggleEl))

const editBtn = document.querySelector("#edit-btn");

const modal = new bootstrap.Modal(document.getElementById("modal"));
const showCreateModal = document.querySelector("#show-create-modal");
const showDeleteModal = document.querySelector("#show-delete-modal");

console.log("searchInput", searchInput, searchBtn);

//event listeners 
searchBtn.addEventListener("click", () => {
    console.log(searchInput.value);
    //searchInput.style.background = "red";
});
createPostBtn.addEventListener("click", () => {
    console.log("create post btn clicked");
    createPost(imageLinkInput.value, captionInput.value, usernameInput.value);
});
showCreateModal.addEventListener("click", () => {
    isEditMode = false;
    createPostBtn.style.display = "block";
    editPostBtn.style.display = "none";
    usernameInput.value = "";
    imageLinkInput.value = "";
    captionInput.value = "";
    modal.show();
});


editPostBtn.addEventListener("click", () => {
    console.log("edit post btn clicked");
    updatePost(postToEditId, imageLinkInput.value, captionInput.value);
    modal.hide();
});
deletePostBtn.addEventListener("click", () =>{
    console.log("delete post btn clicked");
    deletePost(id);
    modal.hide;
})

// showEditPostModal.addEventListener("click", () => {
//     isCreateMode = false;
//     isDeleteMode = false;
//     createPostBtn.style.display = "none";
//     editPostBtn.style.display = "block";
//     deletePostBtn.style.display = "none";  
// });
// deletePostBtn.addEventListener("click", () => {
//     console.log("delete post btn clicked");
//     isEditMode = false;
//     createPost = false;
//     usernameInput.value = "";
//     modal.show;
// });
logoutBtn.addEventListener("click", () => {
    handleLogout();
});


// myDropdown.addEventListener('show.bs.dropdown', (event) => {
//   console.log("clicked options");
//   show.bs.dropdown;
// })

//global variables
var feed = [];
//global property
var isCreateMode = false;
var isEditMode = false;
var postToEditId = null;
var isDeleteMode = false;


const uploadPostToFirebase = (post) => {
    db.collection("posts")
        .doc(post.id + "")
        .set(post)
        .then(() => {
            console.log("POST UPLOADED TO FIREBASE");
        })
        .catch((error) => {
            console.log("ERROR", error);
        });
};

const getPostsFromFirebase = () => {
    const postsRef = db.collection("posts")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.data());
                feed.push(doc.data());
                outputFeed();
            });
        });
};

//create post
const createPost = (imageLink, caption, username) => {
    const newPost = {
        id: feed.length,
        username: username,
        imageLink: imageLink,
        caption: caption,
        likes: 0,
        comments: [],
        shares: 0,
        isPublic: true,
        createdAt: new Date(),
    };
    console.log("Feed", feed);
    uploadPostToFirebase(newPost);
    feed.push(newPost);
    outputFeed();
    modal.hide();
    outputFeed(feed);
};
// read post
// array + anonyomous function: map
const outputFeed = () => {
    // return statuses of the posts
    // map function returns a new array of just the statuses
    const updatedFeed = feed.map((post) => {
        return `
        <div class="post">
        <div class="header">
            <div class="profile-area">
                <div class="post-pic">
                    <img alt="iamjerry's profile picture" class="_6q-tv" data-testied="user-avatar"
                        draggable="false" src="assets/tomandjerry.png">
                </div>
                <span class="profile-name">${post.username}</span>
            </div>
            <div class="margin-right">
            <button id="edit-post-btn" class="btn btn-sm btn-primary" type="button" margin-right onclick="showEditPostModal(${post.id})">Edit</button>
            <button id="delete-post-btn" class="btn btn-sm btn-primary" type="button" margin-right onclick="showDeletePostModal(${post.id})">Delete</button>
            </div>

            <!--<div class="dropdown">
                <button class="btn btn-sm btn-primary dropdown-toggle" type="button" color = data-bs-toggle="dropdown" aria-expanded="false">Options</button>
                <ul class="dropdown-menu">
                <li><button id="edit-post-btn" class="btn btn-sm btn-primary" type="button" id="edit-post-btn">Edit Post</button></li>
                <li><button id="delete-post-btn" class="btn btn-sm btn-primary" type="button"id="delete-post-btn">Delete Post</button></li>
            </ul>
         </div>-->



            <!--<div class="options">
                <div class="Igw0E rBNOH YBx95 _4EzTm" style="height: 24px; width: 24px">
                    <svg aria-label="More options" class="_8-yf5" fill="#262626" height="16"
                        viewBox="0 0 48 48" width="16">
                        <circle clip-rule="evenodd" cx="8" cy="24" fill-rule="evenodd" r="4.5"></circle>
                        <circle clip-rule="evenodd" cx="24" cy="24" fill-rule="evenodd" r="4.5">
                        </circle>
                        <circle clip-rule="evenodd" cx="40" cy="24" fill-rule="evenodd" r="4.5">
                        </circle>
                    </svg>
                </div>
            </div>-->
            
        </div>
        <div class="body">
            <img alt=" " src="${post.imageLink}"class="FFVAD" decoding="auto" width="600" 
            style="object-fit:cover">
        </div>
        <div class="footer">
            <div class="user-actions">
                <div class="like-comment-share">
                    <div>
                        <span class>
                            <svg aria-label="Like" class="_8-yf5" fill="#262626" height="24"
                                viewBox="0 0 48 48" width="24">
                                <path
                                    d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z">
                                </path>
                            </svg>
                        </span>
                    </div>
                    <div class="margin-left-small">
                        <svg aria-label="Comment" class="_8-yf5" fill="#262626" height="24"
                            viewBox="0 0 48 48" width="24">
                            <path clip-rule="evenodd"
                                d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z"
                                fill-rule="evenodd">
                            </path>
                        </svg>
                    </div>
                    <div class="margin-left-small">
                        <svg aria-label="Share Post" class="_8-yf5" fill="#262626" height="24"
                            viewBox="0 0 48 48" width="24">
                            <path
                                d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z">
                            </path>
                        </svg>
                    </div>
                </div>
                <div class="bookmark">
                    <div class="QBdPU rrUvL">
                        <svg aria-label="Save" class="_8-yf5" fill="#262626" height="24"
                            viewBox="0 0 48 48" width="24">
                            <path
                                d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z">
                            </path>
                        </svg>
                    </div>
                </div>
            </div>
            <span class="likes">Liked by <b>cheese</b> and <b>others</b></span>
            <span class="caption">
                <span class=" "><br><b>${post.username}</b></span>
                <span class=" ">${post.caption}</span>
            </span>
            <span class="comments">
                <span class="caption-username"><br><b>real_tom</b> </span>
                <span class="caption-text">Nice!</span>
                <span class="caption-username"><br><b>tom&jerry</b></span>
                <span class="caption-text">Sweet!</span>
                <span class="posted-time"><br>7 HOURS AGO</span>
        </div>
        <div class="add-comment">
            <input type="text" placeholder="Add a comment...">
            <a class="post-btn">Post</a>
        </div>
    </div>
      `;
    });
    postsDiv.innerHTML = updatedFeed.join(" ");
};

const updatePost = (id, newImageLink, newCaption) => {
    //update with specific id
    const updatedFeed = feed.map((post) => {
        if (post.id === id) {
            post.imageLink = newImageLink;
            post.caption = newCaption;
        }
        return post;
    });
    feed = updatedFeed;
    uploadPostToFirebase(feed[id]);
    outputFeed(feed);

}

//delete post
const deletePost = (id) => {
    //delete post with specific id
    const updatedFeed = feed.filter((post) => {
        if (post.id !== id) {
            return post;
        }
    });
    feed = updatedFeed;
    outputFeed(feed);
};

const outputPostStatus = (post) => {
    const output = `
        POST INFO: 
        ID: ${post.id}
        Username: ${post.username}
        Image Link: ${post.imageLink}
        Caption: ${post.caption}
        `;
    return output;
};

const showEditPostModal = (id) => {
    postToEditId = id;  
    isEditMode = true;
    createPostBtn.style.display = "none";
    deletePostBtn.style.display = "none";
    editPostBtn.style.display = "block";
    console.log("show modal", id);
    const postToEdit = feed[id];
    console.log("postToEdit", postToEdit);
    usernameInput.value = postToEditId.username;
    imageLinkInput.value = postToEditId.imageLink;
    captionInput.value = postToEditId.caption;
    modal.show();
};

const showDeletePostModal = (id) =>{
    isDeleteMode = true;
    isEditMode = false;
    isCreateMode = false;
    createPostBtn.style.display = "none";
    deletePostBtn.style.display = "block";
    editPostBtn.style.display = "none";
    console.log("show delete modal", id);
    usernameInput.value = id;
    deletePost(id);
}
  

outputFeed();
getPostsFromFirebase();



// spread operator
// array of objects - feed
/*const feed = [
    post,
    { ...post, username: "johndoe" },
    { ...post, username: "janedoe" },
    { ...post, username: "elonmusk" },
  ];*/

//outputFeed(feed);

//demo of creating post 
// createPost("http://127.0.0.1:5500/assets/post.png", "here is tom", "tomandjerry");

// updatePost(2, "imageLink", "csf");
