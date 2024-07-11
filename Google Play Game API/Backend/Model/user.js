const mongoose = require("mongoose");

// Create a schema
let userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

// Create model
const User = mongoose.model("users", userSchema);

module.exports = User;
