import {
  enableInput,
  setDiv,
  message,
  token,
  inputEnabled
} from "./index.js";
import {showPosts} from "./posts.js";

let addEditPostDiv = null;
let title = null;
let content = null;
let saveButton = null;

export const handleAddEditPost = () => {
  addEditPostDiv = document.getElementById("edit-post-div");
  title = document.getElementById("title");
  content = document.getElementById("content");
  saveButton = document.getElementById("save-post");

  addEditPostDiv.addEventListener("click", async (e) => {

    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === saveButton) {
        enableInput(false);

        let method = "POST";
        let url = "/api/v1/posts";

        if (saveButton.textContent === "Update") {
          method = "PATCH";
          url = `/api/v1/posts/${addEditPostDiv.dataset.id}`;
        }

        try {
          const response = await fetch(url, {
            method: method,
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
              title: title.value,
              content: content.value
            }),
          });

          const data = await response.json();
          if (response.status === 200 || response.status === 201) {
            if (response.status === 200) {
              message.textContent = "Post updated successfully";
            } else {
              message.textContent = "Post created successfully";
            }

            title.value = "";
            content.value = "";
            showPosts();
          } else {
            message.textContent = data.message;
          }
        } catch (error) {
          console.error(error);
          message.textContent = "Error saving post";
        }
        enableInput(true);
      } else if (e.target.id === "cancel-edit-post") {
        message.textContent = "";
        showPosts();
      }
    }
  });
}

export const showAddEditPost = async (postId) => {
  addEditPostDiv = document.getElementById("edit-post-div");
  title = document.getElementById("title");
  content = document.getElementById("content");
  saveButton = document.getElementById("save-post");

  if (!postId) {
    title.value = "";
    content.value = "";
    delete addEditPostDiv.dataset.id;
    saveButton.textContent = "Save";
    message.textContent = "";
    setDiv(addEditPostDiv);
    return;
  }

  enableInput(false);

  try {
    const response = await fetch(`/api/v1/posts/${postId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (response.ok) {
      title.value = data.post.title;
      content.value = data.post.content;
      saveButton.textContent = "Update";
      message.textContent = "";
      addEditPostDiv.dataset.id = postId;

      setDiv(addEditPostDiv);
    } else {
      message.textContent = "Post not found";
      showPosts();
    }
  } catch (error) {
    console.error(error);
    message.textContent = "Error fetching post";
    showPosts();
  } finally {
    enableInput(true);
  }
};
