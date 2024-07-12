const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require('./Router/authRouter')
const achievRouter = require('./Router/achievRouter')
const connectDB = require('./Database/database')
require('dotenv').config()

const app = express();
// Cookie Parser middleware
app.use(cookieParser("any"));

app.use(express.json());

// Allow request from a server
app.use(cors({
    origin: 'http://localhost:5173',
    origin: 'http://localhost:5174',
    credentials: true
}));


// Connect to MongoDb
connectDB();

// Routes
app.use(authRouter);
app.use(achievRouter);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server running on port: ${port}`));
