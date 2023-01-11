const { ipcRenderer } = require("electron");

const taskForm = document.querySelector("#taskForm");
const taskName = document.querySelector("#taskName");
const taskDescription = document.querySelector("#taskDescription");
const taskList = document.querySelector("#taskList");

let updateStaus = false;
let idTaskToUpdate = "";

function deleteTask(id) {
  const response = confirm("Você realmente deseja excluir essa tarefa?");

  if (response) {
    ipcRenderer.send("delete-task", id);
  }

  return;
}

function editTask(id) {
  updateStaus = true;
  idTaskToUpdate = id;

  const task = tasks.find((task) => task._id === id);
  taskName.value = task.name;
  taskDescription.value = task.description;
}

function renderTasks(tasks) {
  taskList.innerHTML = "";

  tasks.map((task) => {
    taskList.innerHTML += `
    <li class="card">
    <div>
      <h4>${task.name}</h4>
      <span>${task._id}</span>
      <p>${task.description}
    </div>
    
    <div>
      <button class="btn danger" onclick="deleteTask('${task._id}')">🗑</button>
      <button class="btn secundary" onclick="editTask('${task._id}')">✏️</button>
    </div>
    </li>
    `;
  });
}
let tasks = [];
ipcRenderer.send("get-tasks");

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const task = {
    name: taskName.value,
    description: taskDescription.value,
  };

  if (!updateStaus) {
    ipcRenderer.send("new-task", task);
  } else {
    ipcRenderer.send("update-task", { ...task, idTaskToUpdate });
  }

  taskForm.reset();
});

ipcRenderer.on("new-task-created", (e, arg) => {
  const taskSaved = JSON.parse(arg);
  tasks.push(taskSaved);
  renderTasks(tasks);

  alert("Tarefa criada com sucesso");

  taskName.focus();
});

ipcRenderer.on("get-tasks", (e, args) => {
  const receivedTasks = JSON.parse(args);
  tasks = receivedTasks;
  renderTasks(tasks);
});

ipcRenderer.on("delete-task-success", (e, args) => {
  const deleteTask = JSON.parse(args);
  const newTasks = tasks.filter((task) => {
    return task._id !== deleteTask._id;
  });

  tasks = newTasks;
  renderTasks(tasks);
});

ipcRenderer.on("update-task-success", (e, args) => {
  updateStaus = false;
  const updateTask = JSON.parse(args);
  tasks = tasks.map((task, i) => {
    if (task._id === updateTask._id) {
      task.name = updateTask.name;
      task.description = updateTask.description;
    }
    return task;
  });

  renderTasks(tasks);
});
