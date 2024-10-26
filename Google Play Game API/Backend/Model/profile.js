const mongoose = require("mongoose");

// Create an profile schema
const profileSchema = new mongoose.Schema({
  userId: String,
  profilePic: String,
  friend: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

// Create an achievement model
const Profile = mongoose.model("profile", profileSchema);

module.exports = Profile;
