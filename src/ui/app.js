"use strict";
const { ipcRenderer } = require("electron");

const taskForm = document.querySelector("#taskForm");
const taskName = document.querySelector("#taskName");
const taskDescription = document.querySelector("#taskDescription");

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const task = {
    name: taskName.value,
    description: taskDescription.value,
  };
  ipcRenderer.send("new-task", task);

  taskForm.request();
});
