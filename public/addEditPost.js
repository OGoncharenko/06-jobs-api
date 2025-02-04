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
let postId = null;

export const handleAddEditPost = () => {
  addEditPostDiv = document.getElementById("edit-post");
  title = document.getElementById("title");
  content = document.getElementById("content");
  const savePostBtn = document.getElementById("save-post");
  const cancelPostBtn = document.getElementById("cancel-edit");

  addEditPostDiv.addEventListener("click", async (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target.id === "save-post") {
        enableInput(false);

        let method = "POST";
        let url = "/api/v1/posts";
        try {
          if (postId) {
            method = "PUT";
            url += `/${postId}`;
          }

          const response = await fetch(url, {
            method,
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
          if (response.status === 201 || response.status === 200) {
            message.textContent = data.message;
            title.value = null;
            content.value = null;
            postId = null;
            showPosts();
          } else {
            message.textContent = data.message;
          }
        } catch (error) {
          console.error(error);
          message.textContent = "Error saving post";
        }
        enableInput(true);
      } else if (e.target.id === "cancel-edit") {
        message.textContent = "";
        showPosts();
      }
    }
  });
}

export const showAddEditPost = () => {
  message.textContent = null;
  setDiv(addEditPostDiv);
}
