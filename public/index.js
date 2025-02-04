let activeDiv = null;
export const setDiv = (newDiv) => {
  if (!newDiv) {
    console.error("Error: Trying to show a non-existent div.");
    return;
  }

  if (newDiv != activeDiv) {
    if (activeDiv) {
      activeDiv.style.display = "none";
    }
    newDiv.style.display = "block";
    activeDiv = newDiv;
  }
};

export let inputEnabled = true;
export const enableInput = (state) => {
  inputEnabled = state;
};

export let token = null;
export const setToken = (value) => {
  token = value;
  if (value) {
    localStorage.setItem("token", value);
  } else {
    localStorage.removeItem("token");
  }
};

export let message = null;

import {showPosts, handleNewPost, handlePosts} from "./posts.js";
import { showLoginRegister, handleLoginRegister } from "./loginRegister.js";
import { handleLoginUser } from "./loginUser.js";
import { handleAddEditPost } from "./addEditPost.js";
import { handleRegisterUser } from "./registerUser.js";

document.addEventListener("DOMContentLoaded", () => {
  token = localStorage.getItem("token");
  message = document.getElementById("message");

  handleLoginRegister();
  handleLoginUser();
  handleAddEditPost();
  handleRegisterUser();
  handleNewPost();
  handlePosts();

  if (token) {
    showPosts();
  } else {
    showLoginRegister();
  }
});