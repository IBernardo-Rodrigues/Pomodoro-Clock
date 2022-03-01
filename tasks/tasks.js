// ============ [ GLOBAL VARIABLES ]

const $menuIcon = document.querySelector('.menu-icon');

const $allTasks = document.querySelector('.all-tasks');

const $btnNewTask = document.querySelector('.btn-new-task');

const $userText = document.querySelector('.user-text');


const $btnCancel = document.querySelector('.btn-nt-cancel');

const $btnAdd = document.querySelector('.btn-nt-add');


// ============== [ EVENT LISTENERS ]

$menuIcon.addEventListener('click', () => {
  const $navbar = document.querySelector('.navbar');
  
  $navbar.classList.toggle('navbar-active');
});

$btnNewTask.addEventListener('click', openModal);

$btnCancel.addEventListener('click', closeModal);

$btnAdd.addEventListener('click', () => {
  getData();
  closeModal();
})


// ================= [STORAGE]

const returnAllTask = () => JSON.parse(localStorage.getItem("tasks:alltask")) || [];

const setTask = (item) => {
  localStorage.setItem("tasks:alltask", JSON.stringify(item));
}

const tasks = returnAllTask();


// ==================== [MODAL]

const $modalNewTask = document.querySelector('.modal-new-task');

function openModal() {
  
 $modalNewTask.classList.add('modal-active');
};

function closeModal() {
  $modalNewTask.classList.remove('modal-active');
  
  $userText.value = "";
}


// ================== [MANIPULATE DATA]

function getData() {
  
  const userText = $userText.value;
  
  try {
    const text = verifyData(userText);
    const isChecked = false;
    
    add(text, isChecked);
    
  } catch(message) {
    alert(message);
  }
}

function verifyData(data) {
  if (data.trim() == "") 
    throw new Error('Seu texto é invalido');
    
  return data;
}


function add(text, isChecked) {
  const task = returnTask(text, isChecked);
  
  tasks.push(task);
  
  reload();
}


function updateCheck(index) {
  
  const isChecked = tasks[index].isChecked;

  tasks[index].isChecked = !(isChecked);
  
  reload();
}


function deleteTask(index) {
  tasks.splice(index, 1);
  
  reload();
}


function returnTask(text, isChecked) {
  return {
    taskText: text,
    isChecked: isChecked
  }
}


// ================ [RENDER DATA]

function renderTask(item, index) {
  
  const $newLi = createTaskItem();
  
  const html = returnHTML(index);
  
  $newLi.innerHTML = html;

  $allTasks.insertAdjacentElement("beforeend", $newLi);
}


function createTaskItem() {
  const $newLi = document.createElement('li');
  
  $newLi.classList.add('task-item');
  
  return $newLi;
}


function returnHTML(index) {
  
  const classCheck = tasks[index].isChecked ? 'checked-circle': 'uncheck-circle';
  
  const currentText = tasks[index].taskText;

  return `
          <i onclick="updateCheck(${index})" class="fa-solid fa-circle-check ${classCheck}"></i>
          <p class="task-text">${currentText}</p>
          <i onclick="deleteTask(${index})" class="fa-solid fa-circle-minus delete"></i> `;
}


// ===================== [ USEFUL ]

function init() {
  setTask(tasks);
  
  tasks.forEach((item, index) => {
    renderTask(item, index);
  })
}


function reload() {
  $allTasks.innerHTML = "";
  
  init()
}

init();
