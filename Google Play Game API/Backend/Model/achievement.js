const mongoose = require("mongoose");
const Schema = require('mongoose')

// Create an achievement schema
const achievementSchema = new mongoose.Schema({
  achievement: String,
  points: Number,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User" 
  },
  userName: String,
});

// Create an achievement model
const Achievement = mongoose.model("Achievement", achievementSchema);

module.exports = Achievement;
