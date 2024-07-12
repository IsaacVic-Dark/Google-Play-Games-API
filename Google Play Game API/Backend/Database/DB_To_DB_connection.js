// Example of connecting to different databases
const mongoose = require("mongoose");

// Connect to main database
// mongoose.connect("mongodb://localhost:27017/main_database", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// Create connection to the other database
const otherDBConnection = mongoose.createConnection("mongodb://localhost:27017/GameStore");

// Define model using the connection to the other database
const Achievement = otherDBConnection.model("Achievement", achievementSchema);

module.exports = Achievement;
