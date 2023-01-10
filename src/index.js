const { app } = require("electron");
const { createWindow } = require("./main");

require("./database");

app.whenReady().then(createWindow);

try {
  require("electron-reloader")(module);
} catch (_) {}

app.allowRenderProcessReuse = false;
