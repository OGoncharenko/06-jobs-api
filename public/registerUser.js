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

let registerDiv = null;
let username = null;
let email = null;
let password1 = null;
let password2 = null;

export const handleRegisterUser = () => {
  registerDiv = document.getElementById("register-div");
  username = document.getElementById("username");
  email = document.getElementById("email1");
  password1 = document.getElementById("password1");
  password2 = document.getElementById("password2");

  registerDiv.addEventListener("click", async (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target.id === "register-button") {
        if (password1.value !== password2.value) {
          message.textContent = "Passwords do not match";
        } else {
          message.textContent = null;
          enableInput(false);

          try {
            const response = await fetch("/api/v1/auth/register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                username: username.value,
                email: email.value,
                password: password1.value
              }),
            });

            const data = await response.json();
            if (response.status === 201) {
              message.textContent = `Registered successfully`;
              setToken(data.token);

              username.value = null;
              email.value = null;
              password1.value = null;
              password2.value = null;

              showPosts();
            } else {
              message.textContent = data.message;
            }
          } catch (error) {
            console.error(error);
            message.textContent = "Error registering";
          }
              enableInput(true);
        }
      } else if (e.target.id === "register-cancel") {
        username.value = null;
        email.value = null;
        password1.value = null;
        password2.value = null;
        showLoginRegister();
      }
    }
  });
}

export const showRegister = () => {
  setDiv(registerDiv);
  email.value = null;
  password1.value = null;
  password2.value = null;
}
