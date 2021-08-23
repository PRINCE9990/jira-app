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
if(!localStorage.getItem("tasks")){
  localStorage.setItem("tasks",JSON.stringify([]))
}



let colorClasses = ["pink","blue","green","black"]
deleteBtn.addEventListener("click",function(e){
  if(deleteState){
    deleteState = false;
    e.currentTarget.classList.remove("delete-state")

    
  }else{
    deleteState = true;
    e.currentTarget.classList.add("delete-state")
  }

})



addBtn.addEventListener("click", function () {
  if(modalVisible) return
  let modal = document.createElement("div");
  modal.setAttribute("first-click",true);
  modal.classList.add("modal-container");
  modal.innerHTML = `<div class="writing-area"contenteditable >Enter Your Task</div>
    <div class="filter-area">
      <div class="modal-filter pink"></div>
      <div class="modal-filter blue"></div>
      <div class="modal-filter green"></div>
      <div class="modal-filter black active-modal-filter"></div>
    </div>`

  let allModalFilter = modal.querySelectorAll(".modal-filter");
  for(let i=0;i<allModalFilter.length;i++){
    allModalFilter[i].addEventListener("click",function(e){
      for(let j=0;j<allModalFilter.length;j++){
        allModalFilter[j].classList.remove("active-modal-filter")}
      e.currentTarget.classList.add("active-modal-filter")   
    })
  }


body.appendChild(modal);
modalVisible = true;
let wa = modal.querySelector(".writing-area")
wa.addEventListener("click",function(e){
  if(modal.getAttribute("first-click")=="true"){
    wa.innerHTML = "";
    modal.getAttribute("first-click", false)
  }
})


// wa.addEventListener("click",function(e){
//   if(modal.getAttribute("first-click")=="true"){
//     wa.innerHTML = "";
//     modal.setAttribute("first-click",false);
//   }
// })

wa.addEventListener("keypress",function(e){
  if(e.key == "Enter"){
    let task = e.currentTarget.innerText
    let selectedModalFilter = document.querySelector(".active-modal-filter")
    let color = selectedModalFilter.classList[1]
    let div = document.createElement("div");
    let id = uid();
    div.classList.add("ticket")
    div.innerHTML = `<div class="ticket-color ${color}"></div>
    <div class="ticket-id">#${id}</div>
    <div class="ticket-box" contenteditable>
    ${task}
    </div>`
    saveTicketInLocalStorage(id,color,task);


    let ticketWritingArea = div.querySelector(".ticket-box")
    ticketWritingArea.addEventListener("input",function(e){
      let id = e.currentTarget.parentElement.querySelector(".ticket-id").innerText.split("#")[1]
      console.log(id);
      let taskArr = JSON.parse(localStorage.getItem("tasks"))
      let reqIndex = -1;
      for(let i = 0;i<taskArr.length;i++){
        if(taskArr[i].id == id){
          reqIndex = i
          break;
        }
      }
      taskArr[reqIndex].task = e.currentTarget.innerText
    localStorage.setItem("tasks",JSON.stringify(taskArr))

      
        
      
    })



    div.addEventListener("click",function(e){
      if(deleteState){
        div.remove()
      }

    })
addBtn.addEventListener("click",function(){
  deleteState = false;
  deleteBtn.classList.remove("delete-state")

})
    
    grid.appendChild(div);
    let ticketColorDiv = document.querySelector(".ticket-color");
    ticketColorDiv.addEventListener("click",function(e){
      let currColor = e.currentTarget.classList[1];
      let index = colorClasses.indexOf(currColor);
      index++;
      index = index % 4;
      e.currentTarget.classList.remove(currColor);
      e.currentTarget.classList.add(colorClasses[index]);



    })
    modal.remove();
    modalVisible = false;
  }
})
})
for (let i = 0; i < allFilters.length; i++) {
  allFilters[i].addEventListener("click", function (e) {
    let color = (e.currentTarget.classList[0].split('-')[0]);
    grid.style.backgroundColor = colors[color];
  });
}
function saveTicketInLocalStorage(id,color,task) {
  let reqObject = {id,color,task}
  let taskArr = JSON.parse(localStorage.getItem("tasks"))
  taskArr.push(reqObject)
  localStorage.setItem("tasks",JSON.stringify(taskArr))
}
