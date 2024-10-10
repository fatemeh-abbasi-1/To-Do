"use strict";

const createTaskBtn = document.querySelector(".plus");
const taskTitleInput = document.querySelector(".input");
let taskList = document.querySelector(".works-list");
const delete_1task = document.querySelector(".trash");
// const trash_pencil = document.querySelector(".trash_pencil");
const titleTask = document.querySelector(".info-work");
const editTaskBtn = document.querySelector(".tick_edit");
const checkbox = document.querySelector(".checkbox");
const infoTask1 = document.querySelector(".works");
const task_2 = document.querySelector(".work_s");
const btnDarkMode = document.querySelector(".moon");
const btnLightMode = document.querySelector(".sun");
const main = document.querySelector(".main");
const parentAddAndEdit = document.querySelector(".icon");
const h1 = document.querySelector(".title-app");
const btnEditTask = document.querySelector(".tick");

const myWorks = [];

//refactoring
function showItems(data) {
  document.querySelector(".works-list").innerHTML = "";
  if (data.length) {
    data.forEach((t) => {
      const html = `
      <div class="works work_s">
               <div class='check_info'><input  onclick="handelcreateLine(event)" type="checkbox" id='checkbox'>
             <label for="checkbox" class="info-work" data-id=${t.id}>${t.title}</label>
              </div>
               <div class="trash_pencil">
                 <img  onclick="handelEditTask(event)"  src="icon/pencil-64.png" alt="pencil" class="pencil" />
                 <img  onclick="handelDeleteBtn(event)" src="icon/trash-can-48.png" alt="trash" class="trash" />
               </div>
             </div>
       `;
      document
        .querySelector(".works-list")
        .insertAdjacentHTML("afterbegin", html);
    });
  }
}

//add task
function renderAdd() {
  const numId = Math.random();
  let newValue = taskTitleInput.value;
  if (newValue === "") {
    alert("please enter a task");
    return;
  }
  let infoTask = {
    title: newValue,
    id: numId,
  };
  myWorks.push(infoTask);
  const html = `

   <div class="works work_s">
           <div class='check_info'><input onclick="handelcreateLine(event)" type="checkbox" id='checkbox'>
             <label for="checkbox" class="info-work" data-id=${infoTask.id}>${infoTask.title}</label>
              </div>
             <div class="trash_pencil">
              <img  onclick="handelEditTask(event)" src="icon/pencil-64.png" alt="pencil" class="pencil" />
              <img  onclick="handelDeleteBtn(event)" src="icon/trash-can-48.png" alt="trash" class="trash" />
            </div>
          </div>
    `;
  taskList.insertAdjacentHTML("afterbegin", html);

  taskTitleInput.value = "";
  if (myWorks.length === 5) taskList.classList.add("hidden1");
  console.log(myWorks);
}
createTaskBtn.addEventListener("click", renderAdd);
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") renderAdd();
});

//edit task
function handelEditTask(e) {
  editTaskBtn.classList.remove("hidden2");
  e = e || window.event;
  let target = e.target || e.srcElement;
  const titleItem =
    target.closest(`.works`).firstElementChild.children[1].innerHTML;

  taskTitleInput.value = titleItem;
  taskTitleInput.focus();
  editTaskBtn.addEventListener("click", function () {
    const find = myWorks.findIndex((t) => t.title === titleItem);
    myWorks[find].title = taskTitleInput.value;
    taskTitleInput.value = " ";
    showItems(myWorks);
    editTaskBtn.classList.add("hidden2");
  });
}

//complate task
function handelcreateLine(e) {
  e = e || window.event;
  let target = e.target || e.srcElement;
  const titleItem = target.closest(`.works`).firstElementChild.children[1];
  titleItem.classList.toggle("line");
}

//delete task
function handelDeleteBtn(e) {
  let target = e.target || e.srcElement;
  const titleItem =
    target.closest(`.works`).firstElementChild.children[1].innerHTML;
  const find = myWorks.findIndex((t) => t.title === titleItem);
  myWorks.splice(myWorks[find], 1);
  showItems(myWorks);
}
//light mede
function lightMode() {
  document.body.style.backgroundColor = "rgb(242, 204, 242)";
  main.style.backgroundColor = "rgb(242, 204, 242)";
  parentAddAndEdit.style.backgroundColor = "rgb(242, 204, 242)";
  h1.style.color = "rgb(16, 16, 16)";
}

//dark mode
function darkMode() {
  document.body.style.backgroundColor = "rgb(16, 16, 16)";
  main.style.backgroundColor = "rgb(16, 16, 16)";
  parentAddAndEdit.style.backgroundColor = "rgb(16, 16, 16)";
  h1.style.color = "rgb(250, 249, 247)";
}

btnLightMode.addEventListener("click", function () {
  lightMode();
});

btnDarkMode.addEventListener("click", function () {
  darkMode();
});
