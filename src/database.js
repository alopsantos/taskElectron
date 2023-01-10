const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://plantaostiadmin:bZTqvHoasw5WndlI@lopscorp.hsvvq.mongodb.net/test?retryWrites=true&w=majorit",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((db) => console.log("db is conected"))
  .catch((err) => console.log(err));
