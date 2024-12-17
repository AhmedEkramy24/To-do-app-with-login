let eye = document.querySelector(".eye");
eye.addEventListener("click", function (e) {
  if (eye.classList.contains("fa-eye-slash")) {
    eye.classList.replace("fa-eye-slash", "fa-eye");
    passInp.setAttribute("type", "text");
  } else if (eye.classList.contains("fa-eye")) {
    eye.classList.replace("fa-eye", "fa-eye-slash");
    passInp.setAttribute("type", "password");
  }
});

// App

let emailInp = document.querySelector("#email");
let passInp = document.querySelector("#pass");
let login = document.querySelector("#login");
let msg = document.querySelector("#msg");
let btn = document.querySelector("#btn");
let valid = false;

let users;
if (localStorage.getItem("users")) {
  users = JSON.parse(localStorage.getItem("users"));
} else {
  users = [];
}

login.addEventListener("click", function (e) {
  if (emailInp.value == "" || passInp.value == "") {
    e.preventDefault();
    msg.innerHTML = "All input is required";
  } else {
    validate(emailInp.value, passInp.value);
    if (!valid) {
      e.preventDefault();
      msg.innerHTML = "Wrong Email or Password";
    }
  }
});

function validate(email, pass) {
  if (users.length > 0) {
    for (let i = 0; i < users.length; i++) {
      if (users.length == 0) {
        valid = false;
        break;
      }
      if (email == users[i].email && pass == users[i].pass) {
        localStorage.setItem("user-name", users[i].name);
        localStorage.setItem("key" , users[i].key);
        valid = true;
        break;
      }
    }
  } else {
    valid = false;
  }
}
