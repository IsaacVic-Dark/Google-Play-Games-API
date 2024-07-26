const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require('./Router/authRouter')
const achievRouter = require('./Router/achievRouter')
const leaderBoardRouter = require('./Router/leaderBoardRouter')
// const profileRouter = require('./Router/profileRouter')
const friendRouter = require('./Router/friendRouter')
const connectDB = require('./Database/database')
require('dotenv').config()

const app = express();

// Cookie Parser middleware
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.json());

// Allow request from a server
const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];

// CORS middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Connect to MongoDb
connectDB();

// Routes
app.use(authRouter);
app.use(achievRouter);
app.use(leaderBoardRouter);
// app.use(profileRouter);
app.use(friendRouter)

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server running on port: ${port}`));
