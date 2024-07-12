const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require('./Router/authRouter')
const connect = require('./Database/database')
require('dotenv').config()

const app = express();

app.use(express.json());

// Allow request from a server
app.use(cors({
    origin: 'http://localhost:5174',
    
    credentials: true
}));

// Cookie Parser middleware
app.use(cookieParser());

// Connect to MongoDb
connect();

// Routes
app.use(authRouter);

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`server running on port: ${port}`));
