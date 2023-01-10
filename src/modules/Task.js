const { model, Schema } = require("mongoose");

const newTaskSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, require: true },
});

module.exports = model("Task", newTaskSchema);
