import { inputEnabled, setDiv } from "./index.js";
import { showLogin } from "./loginUser.js";
import { showRegister } from "./registerUser.js";

let loginRegisterDiv = null;

export const handleLoginRegister = () => {
  loginRegisterDiv = document.getElementById("login-register");
  const login = document.getElementById("login");
  const register = document.getElementById("register");

  loginRegisterDiv.addEventListener("click", (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === login) {
        showLogin();
      } else if (e.target === register) {
        showRegister();
      }
    }
  });
};

export const showLoginRegister = () => {
  setDiv(loginRegisterDiv);
};
