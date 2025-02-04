import {
  inputEnabled,
  setDiv,
  message,
  token,
  enableInput,
  setToken
} from "./index.js";
import {showLoginRegister} from "./loginRegister.js";
import {showPosts} from "./posts.js";

let loginDiv = null;
let email = null;
let password = null;

export const handleLoginUser = () => {
  loginDiv = document.getElementById("login-div");
  email = document.getElementById("email");
  password = document.getElementById("password");
  const loginBtn = document.getElementById("login-button");
  const cancelLoginBtn = document.getElementById("cancel-login");

  loginDiv.addEventListener("click", async (e) => {
    console.log("loginDiv.addEventListener");
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target.id === "login-button") {
        enableInput(false);

        try {
          const response = await fetch ("/api/v1/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email: email.value,
              password: password.value,
            }),
          });

          const data = await response.json();
          if (response.status === 200) {
            message.textContent = `Login successfully. Welcome back ${data.username}`;
            setToken(data.token);

            email.value = null;
            password.value = null;

            showPosts();
          } else {
            message.textContent = data.message;
          }
        } catch (error) {
          console.error(error);
          message.textContent = "Error logging in";
        }

        enableInput(true);
      } else if (e.target.id === "cancel-login") {
        email.value = null;
        password.value = null;
        showLoginRegister();
      }
    }
  });
}

export const showLogin = () => {
  setDiv(loginDiv);
  email.value = null;
  password.value = null;
}