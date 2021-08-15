let allFilters = document.querySelectorAll(".filter div");
let modalVisible = false;

let addBtn = document.querySelector(".add");
let body = document.querySelector("body");
let grid = document.querySelector(".grid");
let colors = {
  pink: "pink",
  blue: "#57c2e1",
  green: "#8cdcc8",
  black: "#312f31",

};
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
    modal.setAttribute("first-click",false);
  }
})

wa.addEventListener("keypress",function(e){
  if(e.key=="Enter"){
    let task = e.currentTarget.innerText
    let selectedModalFilter = document.querySelector(".active-modal-filter")
  }
})
})
for (let i = 0; i < allFilters.length; i++) {
  allFilters[i].addEventListener("click", function (e) {
    let color = (e.currentTarget.classList[0].split('-')[0]);
    grid.style.backgroundColor = colors[color];
  });
}