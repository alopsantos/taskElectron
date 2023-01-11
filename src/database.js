const Store = require("electron-store");
const mongoose = require("mongoose");

const store = new Store();

const url = store.get("database");

if (!url) {
  console.log("url");
} else {
  mongoose.set("strictQuery", false);

  mongoose
    .connect(url.split('"')[3], {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((db) => console.log("db is conected"))
    .catch((err) => console.log(err));
}
