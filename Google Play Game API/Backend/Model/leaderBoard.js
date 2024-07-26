const mongoose = require("mongoose");

// Create an LeaderBoard schema
const leaderBoardSchema = new mongoose.Schema({
  userName: String,
  points: Number,
  game: String
});

// Create an achievement model
const LeaderBoard = mongoose.model("LeaderBoard", leaderBoardSchema);

module.exports = LeaderBoard;
