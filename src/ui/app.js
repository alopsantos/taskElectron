"use strict";
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
    <h4>Task id: ${task._id}</h4>
    
    <p>Task Name: ${task.name}</p>
    
    <p>Task Description: ${task.description}
    
    <button class="btn btn-danger" onclick="deleteTask('${task._id}')">🗑 Delete</button>
    <button class="btn btn-secondary" onclick="editTask('${task._id}')">✎ Edit</button>
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
  console.log(arg);
  const taskSaved = JSON.parse(arg);
  console.log(taskSaved);
  tasks.push(taskSaved);
  console.log(tasks);
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
