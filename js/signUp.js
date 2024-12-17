let eye = document.querySelector(".eye");
let passInp = document.querySelector("#pass");

eye.addEventListener("click", function (e) {
  if (eye.classList.contains("fa-eye-slash")) {
    eye.classList.replace("fa-eye-slash", "fa-eye");
    passInp.setAttribute("type", "text");
  } else if (eye.classList.contains("fa-eye")) {
    eye.classList.replace("fa-eye", "fa-eye-slash");
    passInp.setAttribute("type", "password");
  }
});

/// App

let nameInp = document.querySelector("#name");
let emailInp = document.querySelector("#email");
let save = document.querySelector("#save");
let msg = document.querySelector(".msg");
let inps = [nameInp, emailInp, passInp];
let validateEm = true;

let users;
if (localStorage.getItem("users")) {
  users = JSON.parse(localStorage.getItem("users"));
} else users = [];

// add data

save.addEventListener("click", async function (e) {
  let response = await fetch("https://todos.routemisr.com/api/v1/getApiKey");
  let data = await response.json();

  let user = {
    name: nameInp.value,
    email: emailInp.value,
    pass: passInp.value,
    key: data.apiKey,
  };

  validateEmail(user.email);

  if (
    user.name.length > 3 &&
    user.email.includes("@") &&
    user.pass.length > 7
  ) {
    if (validateEm) {
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      msg.innerHTML = "Success";
      msg.classList.remove("text-danger");
      msg.classList.add("text-success");
      clearForm();
      inps.forEach((inp) => {
        inp.classList.remove("is-valid");
      });
      setTimeout(() => {
        location.href = "../index.html";
      }, 1000);
    } else {
      msg.innerHTML = "Email already exits";
      msg.classList.remove("text-success");
      msg.classList.add("text-danger");
      validateEm = true;
    }
  }
});

// clear form after adding

function clearForm() {
  nameInp.value = null;
  emailInp.value = null;
  passInp.value = null;
}

// validate Email

function validateEmail(emailValue) {
  for (let i = 0; i < users.length; i++) {
    if (emailValue === users[i].email) {
      validateEm = false;
      break;
    }
  }
}

// validate style

let nameAlert = document.getElementById("nameAlert");
let emailAlert = document.getElementById("emailAlert");
let passAlert = document.getElementById("passAlert");

inps.forEach((input) => {
  input.addEventListener("blur", function (e) {
    if (e.target.id == "name") {
      if (e.target.value.length > 3) {
        e.target.classList.remove("is-invalid");
        e.target.classList.add("is-valid");
        nameAlert.classList.replace("d-block", "d-none");
      } else {
        e.target.classList.remove("is-valid");
        e.target.classList.add("is-invalid");
        nameAlert.classList.replace("d-none", "d-block");
      }
    }
    if (e.target.id == "email") {
      if (e.target.value.includes("@")) {
        e.target.classList.remove("is-invalid");
        e.target.classList.add("is-valid");
        emailAlert.classList.replace("d-block", "d-none");
      } else {
        e.target.classList.remove("is-valid");
        e.target.classList.add("is-invalid");
        emailAlert.classList.replace("d-none", "d-block");
      }
    }
    if (e.target.id == "pass") {
      if (e.target.value.length > 7) {
        e.target.classList.remove("is-invalid");
        e.target.classList.add("is-valid");
        passAlert.classList.replace("d-block", "d-none");
      } else {
        e.target.classList.remove("is-valid");
        e.target.classList.add("is-invalid");
        passAlert.classList.replace("d-none", "d-block");
      }
    }
  });
});
