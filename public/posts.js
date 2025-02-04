import {
  inputEnabled,
  setDiv,
  message,
  token,
  enableInput,
  setToken
} from "./index.js";
import {showLoginRegister} from "./loginRegister.js";
import {showAddEditPost} from "./addEditPost.js";

let postsContainer = document.getElementById("posts-container");
let activePostDiv = null;

export const setPostDiv = (newDiv) => {
  if (!newDiv) {
    console.error("Error: Trying to show a non-existent div.");
    return;
  }

  if (newDiv != activePostDiv) {
    if (activePostDiv) {
      activePostDiv.style.display = "none";
    }
    newDiv.style.display = "block";
    activePostDiv = newDiv;
  }
};

export const handlePosts = () => {
  const logoutBtn = document.getElementById("logout");
  const addNewPostBtn = document.getElementById("new-post");

  postsContainer.addEventListener("click", (e) => {
    if (!inputEnabled) return;
    console.log('e.target.id', e.target.id)

    if (e.target.id === "edit-post") {
      const postId = e.target.dataset.id;
      showAddEditPost(postId);
    } else if (e.target.id === "delete-post") {
      const postId = e.target.dataset.postid;
      deletePost(postId);
      showPosts()
    }
  });

  logoutBtn.addEventListener("click", () => {
    setToken(null);
    message.textContent = "You've been logged out";
    showLoginRegister();
  });

  addNewPostBtn.addEventListener("click", () => {
    const newPostDiv = document.getElementById("edit-post-div");
    setPostDiv(newPostDiv);
    enableInput(true);
  });
}

const deletePost = async (postId) => {
  try {
    enableInput(false);

    const response = await fetch(`/api/v1/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    if (response.status === 200) {
      message.textContent = "Post deleted successfully";
      showPosts();
    } else {
      message.textContent = "Error deleting post";
    }
  } catch (error) {
    console.error(error);
    message.textContent = "Failed to delete post";
  }
  enableInput(true);
}

export const showPosts = async () => {
  try {
    postsContainer = document.getElementById("posts-container")
    enableInput(false);

    const response = await fetch("/api/v1/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })

    const data = await response.json();
    if (response.status !== 200) {
      message.textContent = data.message || "Error fetching posts";
      setDiv(postsContainer);
      return;
    }
    const postsList = document.getElementById("posts-list")
    postsList.innerHTML = "";
    if (data.posts.length === 0) {
      message.textContent = "No posts found";
      setDiv(postsContainer);
      return;
    }
    data.posts.forEach((post) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.content}</p>
        <button id="edit-post">Edit</button>
        <button data-postid="${post._id}" id="delete-post">Delete</button>
      `;
      postsList.appendChild(div);
    });
    setPostDiv(postsList);
  } catch (error) {
    console.error(error);
    message.textContent = "Error fetching posts";
  }
  enableInput(true);
  document.getElementById("new-post").style.display = "block";
  setDiv(postsContainer);
}
