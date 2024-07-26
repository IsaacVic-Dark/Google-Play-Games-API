const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require('./Router/authRouter')
const connect = require('./Database/database')
const http = require('http')
const socketIo = require('socket.io')
require('dotenv').config()

const app = express();

app.use(express.json());
// Cookie Parser middleware
app.use(cookieParser(process.env.JWT_SECRET));

// Allow request from a server
app.use(cors({
    origin: 'http://localhost:5174',
    credentials: true
}));

// Connect to MongoDb
connect();

// Routes
app.use(authRouter);

const server = http.createServer(app)

const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:5174',
        method: ['GET', 'POST']
    }
})

io.on('connection', (socket) => {
    console.log('New client connected')

    socket.on('scoreUpdate', (score) => {
        console.log('Score received: ', score);
        socket.broadcast.emit('scoreUpdate', score) // .broadcast.emit - will send the data to all clients connected except the from the one who sent the data
    })

    socket.on('disconnected', () => {
        console.log('Client disconnected')
    })
})

// Start the server
const port = process.env.PORT || 3001;
server.listen(port, () => console.log(`server running on port: ${port}`));
