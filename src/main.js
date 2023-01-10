const { BrowserWindow, ipcMain } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });
  win.loadFile("src/index.html");
}

ipcMain.on("new-task", (e, args) => {
  console.log(args);
});

module.exports = { createWindow };
