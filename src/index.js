const { app } = require("electron");
const { createWindow } = require("./main");

require("./database");

app.whenReady().then(createWindow);
app.allowRenderProcessReuse = false;
