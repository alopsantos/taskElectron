const { BrowserWindow, ipcMain } = require("electron");
const Task = require("./modules/Task");

function createWindow() {
  const win = new BrowserWindow({
    width: 650,
    maxWidth: 650,
    minWidth: 650,
    height: 750,
    maxHeight: 750,
    minHeight: 750,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
    autoHideMenuBar: true,
  });
  win.loadFile("src/index.html");
}

ipcMain.on("new-task", async (e, arg) => {
  const newTask = new Task(arg);
  const taskSaved = await newTask.save();
  console.log(taskSaved);
  e.reply("new-task-created", JSON.stringify(taskSaved));
});

ipcMain.on("get-tasks", async (e, args) => {
  const tasks = await Task.find();
  e.reply("get-tasks", JSON.stringify(tasks));
});

ipcMain.on("delete-task", async (e, args) => {
  const taskDeleted = await Task.findByIdAndDelete(args);
  e.reply("delete-task-success", JSON.stringify(taskDeleted));
});

ipcMain.on("update-task", async (e, args) => {
  const updateTask = await Task.findByIdAndUpdate(
    args.idTaskToUpdate,
    { name: args.name, description: args.description },
    { new: true }
  );
  e.reply("update-task-success", JSON.stringify(updateTask));
});

module.exports = { createWindow };
