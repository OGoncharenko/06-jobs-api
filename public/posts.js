import {
  inputEnabled,
  setDiv,
  message,
  token,
  enableInput,
  setToken
} from "./index.js";
import {showLoginRegister} from "./loginRegister.js";
import {handleAddEditPost, showAddEditPost} from "./addEditPost.js";

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

    const postId = e.target.dataset.id || e.target.dataset.postid;

    if (e.target.classList.contains("saveButton")) {
      showAddEditPost(postId);
    } else if (e.target.classList.contains("deleteButton")) {
      deletePost(postId);
      showPosts()
    } else if (e.target.classList.contains("editButton")) {
      showAddEditPost(postId);
    }
  });

  logoutBtn.addEventListener("click", () => {
    setToken(null);
    message.textContent = "You've been logged out";
    showLoginRegister();
  });

  addNewPostBtn.addEventListener("click", () => {
    showAddEditPost();
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

    const data = await response.json();

    if (response.ok) {
      message.textContent = "Post deleted successfully";
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

    if (!response.ok) {
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
        <button class="editButton" id="edit-post" data-id="${post._id}">Edit</button>
        <button class="deleteButton" data-postid="${post._id}" id="delete-post">Delete</button>
      `;
      postsList.appendChild(div);
    });

    setPostDiv(postsList);
  } catch (error) {
    console.error(error);
    message.textContent = "Error fetching posts";
  }
  enableInput(true);
  setDiv(postsContainer);
}
