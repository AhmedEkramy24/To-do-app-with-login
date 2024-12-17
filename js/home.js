let logOut = document.querySelector(".logOut");
let bars = document.querySelector(".bars");
let signOut = document.querySelector("#out");

bars.addEventListener("click", function () {
  if (logOut.classList.contains("scroll-to-up")) {
    logOut.classList.replace("scroll-to-up", "scroll-to-down");
    bars.classList.replace("fa-bars", "fa-xmark");
  } else if (logOut.classList.contains("scroll-to-down")) {
    logOut.classList.replace("scroll-to-down", "scroll-to-up");
    bars.classList.replace("fa-xmark", "fa-bars");
  }
});

signOut.addEventListener("click", function (e) {
  localStorage.setItem("user-name", "");
  localStorage.setItem("key", "");
});
