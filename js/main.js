const form = document.querySelector("#form");
const inp = document.querySelector("#inp");
const tasks = document.querySelector("#list");
const apiKey = localStorage.getItem("key");
const loader = document.querySelector("#loader");
const totalP = document.querySelector("#total");
const completedP = document.querySelector("#completed");
const innerP = document.querySelector(".inner");
let list = [];

getAllTodos();

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (inp.value.trim()) {
    addTodo(inp.value);
  } else {
    toastr.error("input should not be empty", "Error!");
  }
});

async function addTodo(term) {
  showLoading();
  let method = {
    method: "POST",
    body: JSON.stringify({
      title: term,
      apiKey,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  let response = await fetch(
    "https://todos.routemisr.com/api/v1/todos",
    method
  );
  if (response.ok) {
    let data = await response.json();
    if (data.message === "success") {
      await getAllTodos();
      hideLoading();
      toastr.success("Task added", "Success!");
      form.reset();
    }
  }
}

async function getAllTodos() {
  let response = await fetch(
    `https://todos.routemisr.com/api/v1/todos/${apiKey}`
  );
  if (response.ok) {
    let data = await response.json();
    if (data.message === "success") {
      list = data.todos;
      displayList(list);
    }
  }
}

function displayList() {
  let container = ``;
  for (let i = 0; i < list.length; i++) {
    container += `
    <li class="d-flex justify-content-between task pb-2 my-3">
          <span class="pointer title" ${
            list[i].completed ? `style="text-decoration: line-through;"` : ``
          } onclick="checkComplete('${list[i]._id}' , ${i})"> ${
      list[i].title
    } </span>
          <div>
            ${
              list[i].completed
                ? `<span
              ><i
                class="fa-regular fa-circle-check me-2"
                style="color: #63e6be"
              ></i
            ></span>`
                : ``
            }
            <span onclick="deleteTodo('${
              list[i]._id
            }')" class="pointer bg-danger text-white rounded trash">
              <i class="fa-solid fa-trash-can"></i
            ></span>
          </div>
        </li>
    `;
  }
  workProgress();
  tasks.innerHTML = container;
}

async function deleteTodo(id) {
  Swal.fire({
    title: "Are you sure?",
    text: "You wanna delete it",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      showLoading();
      let response = await fetch("https://todos.routemisr.com/api/v1/todos", {
        method: "DELETE",
        body: JSON.stringify({
          todoId: id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        let data = await response.json();
        if (data.message === "success") {
          getAllTodos();
          hideLoading();
        }
      }
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
  });
}

async function checkComplete(id, index) {
  if (!list[index].completed) {
    Swal.fire({
      title: "Are you sure?",
      text: "You complete it ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        showLoading();
        let response = await fetch("https://todos.routemisr.com/api/v1/todos", {
          method: "PUT",
          body: JSON.stringify({
            todoId: id,
          }),
          headers: {
            "content-type": "application/json",
          },
        });
        if (response.ok) {
          let data = await response.json();
          if (data.message === "success") {
            getAllTodos();
            hideLoading();
            Swal.fire({
              title: "Completed!",
              text: "Your todo is completed",
              icon: "success",
            });
          }
        }
      }
    });
  }
}

function showLoading() {
  loader.classList.replace("d-none", "d-flex");
}

function hideLoading() {
  loader.classList.replace("d-flex", "d-none");
}

function workProgress() {
  let completed = list.filter((ele) => ele.completed);
  totalP.innerHTML = list.length;
  completedP.innerHTML = completed.length;
  innerP.style.width = `calc(100% * (${completed.length} / ${list.length}))`;
}
