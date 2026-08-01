let allFilters = document.querySelectorAll(".filter div");
let modalVisible = false;

let addBtn = document.querySelector(".add");
let body = document.querySelector("body");
let grid = document.querySelector(".grid");
let uid = new ShortUniqueId();
let deleteBtn = document.querySelector(".cross");
let deleteState = false;

let colors = {
  pink: "pink",
  blue: "#57c2e1",
  green: "#8cdcc8",
  black: "#312f31",
};
if (!localStorage.getItem("tasks")) {
  localStorage.setItem("tasks", JSON.stringify([]));
}

let colorClasses = ["pink", "blue", "green", "black"];
let ticketss = document.querySelectorAll(".ticket");
deleteBtn.addEventListener("click", function (e) {
  if (deleteState) {
    deleteState = false;
    e.currentTarget.classList.remove("delete-state");
  } else {
    deleteState = true;
    e.currentTarget.classList.add("delete-state");
  }
});

addBtn.addEventListener("click", function () {
  if (modalVisible) return;
  let modal = document.createElement("div");
  modal.classList.add("modal-container");
  modal.innerHTML = `<div class="writing-area"contenteditable >Enter Your Task</div>
    <div class="filter-area">
      <div class="modal-filter pink"></div>
      <div class="modal-filter blue"></div>
      <div class="modal-filter green"></div>
      <div class="modal-filter black "></div>
    </div>`;

  let allModalFilter = modal.querySelectorAll(".modal-filter");
  for (let i = 0; i < allModalFilter.length; i++) {
    allModalFilter[i].addEventListener("click", function (e) {
      if (document.querySelector(".active-modal-filter")) {
        document
          .querySelector(".active-modal-filter")
          ?.classList.remove("active-modal-filter");
      }
      e.currentTarget.classList.add("active-modal-filter");
    });
  }

  body.appendChild(modal);
  modalVisible = true;
  let aa = document.querySelector(".modal-container");
  let wa = modal.querySelector(".writing-area");
  wa.addEventListener("focus", function (e) {
    if (wa.innerText === "Enter Your Task") wa.innerText = "";
  });
  document.addEventListener("keypress", function (e) {
    if (e.key === "Enter" && e.shiftKey) return;
    if (e.key === "Enter") {
      let task = wa.innerText;
      let selectedModalFilter = document.querySelector(".active-modal-filter");
      let color = selectedModalFilter.classList[1];
      let div = document.createElement("div");
      let id = uid.rnd();
      div.classList.add("ticket");
      div.innerHTML = `<div class="ticket-color ${color}"></div>
    <div class="ticket-id">#${id}</div>
    <div class="ticket-box" contenteditable>
    ${task}
    </div>`;
      saveTicketInLocalStorage(id, color, task);

      let ticketWritingArea = div.querySelector(".ticket-box");
      ticketWritingArea.addEventListener("input", ticketWrite);

      grid.appendChild(div);
      div.addEventListener("click", function (e) {
        if (deleteState === true) {
          let deleteDiv = (e.currentTarget.style.display = "none");
          taskArr = JSON.parse(localStorage.getItem("tasks"));
          let id = e.currentTarget
            .querySelector(".ticket-id")
            .innerText.split("#")[1];
          let find = taskArr.filter(function (task) {
            return task.id !== id;
          });
          localStorage.setItem("tasks", JSON.stringify(find));
        }
      });

      let ticketColorDiv = document.querySelectorAll(".ticket-color");
      for (let i = 0; i < ticketColorDiv.length; i++) {
        ticketColorDiv[i].addEventListener("click", ticketColorHandler);
      }
      modal.remove();
      modalVisible = false;
    }
  });
});
for (let i = 0; i < allFilters.length; i++) {
  allFilters[i].addEventListener("click", function (e) {
    let color = e.currentTarget.classList[0].split("-")[0];
    let tickett = document.querySelectorAll(".ticket-color");
    // let thiss = tickett.classList[0].split(" ")[1]
    for (let i = 0; i < tickett.length; i++) {
      if (tickett[i].classList[1] == color) {
        // grid.append(tickett[i].parentElement)
        tickett[i].parentElement.style.display = "block";
      } else {
        tickett[i].parentElement.style.display = "none";
      }
    }
  });
}
function saveTicketInLocalStorage(id, color, task) {
  let reqObject = { id, color, task };
  let taskArr = JSON.parse(localStorage.getItem("tasks"));
  taskArr.push(reqObject);
  localStorage.setItem("tasks", JSON.stringify(taskArr));
}

function refresh(id, color, task) {
  taskArr = JSON.parse(localStorage.getItem("tasks"));
  grid.innerHTML = "";
  for (tasks of taskArr) {
    task = tasks.task;
    color = tasks.color;
    id = tasks.id;
    let div = document.createElement("div");
    div.classList.add("ticket");
    div.innerHTML = `<div class="ticket-color ${color}"></div>
   <div class="ticket-id">#${id}</div>
   <div class="ticket-box" contenteditable>
   ${task}
   </div>`;
    let ticketWritingArea = div.querySelector(".ticket-box");
    ticketWritingArea.addEventListener("input", ticketWrite);
    div.addEventListener("click", function (e) {
      if (deleteState === true) {
        let deleteDiv = (e.currentTarget.style.display = "none");
        taskArr = JSON.parse(localStorage.getItem("tasks"));
        let id = e.currentTarget
          .querySelector(".ticket-id")
          .innerText.split("#")[1];
        let find = taskArr.filter(function (task) {
          return task.id !== id;
        });
        localStorage.setItem("tasks", JSON.stringify(find));
      }
    });
    grid.appendChild(div);
  }
  localStorage.setItem("tasks", JSON.stringify(taskArr));
  let ticketColorDiv = document.querySelectorAll(".ticket-color");
  for (let i = 0; i < ticketColorDiv.length; i++) {
    ticketColorDiv[i].addEventListener("click", ticketColorHandler);
  }
}
refresh();

function ticketColorHandler(e) {
  let id = e.currentTarget.parentElement
    .querySelector(".ticket-id")
    .innerText.split("#")[1];
  let currColor = e.currentTarget.classList[1];
  let index = colorClasses.indexOf(currColor);
  index++;
  index = index % 4;
  e.currentTarget.classList.remove(currColor);
  e.currentTarget.classList.add(colorClasses[index]);
  taskArr = JSON.parse(localStorage.getItem("tasks"));
  for (let tasks of taskArr) {
    if (tasks.id == id) {
      tasks.color = colorClasses[index];
      localStorage.setItem("tasks", JSON.stringify(taskArr));
    }
  }
}
function ticketWrite(e) {
  let id = e.currentTarget.parentElement
    .querySelector(".ticket-id")
    .innerText.split("#")[1];
  // console.log(id);
  let taskArr = JSON.parse(localStorage.getItem("tasks"));
  for (let tasks of taskArr) {
    if (tasks.id == id) {
      tasks.task = e.currentTarget.innerText;
      localStorage.setItem("tasks", JSON.stringify(taskArr));
    }
  }
}
