const express = require("express");
var cors = require("cors");
const http = require('http');
const socketIo = require('socket.io');
require("dotenv").config();
const app = express();

var corsOptions = {
    origin: "*",
};
app.use(express.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Create an HTTP server using the Express app
const httpServer = http.createServer(app);

// Initialize Socket.IO on the HTTP server
const io = socketIo(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

// Listen for client connections
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle custom events from the client
    socket.on('message', (data) => {
        console.log('Message received:', data);

        // Broadcast the message to all connected clients
        io.emit('message', data);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});


//   Default route displays that
app.get('/', (req, res) => {
    res.send('<div style="width: 100%; height:100vh; display:flex; flex-direction:column;gap:1rem ; justify-content:center; place-items:center;"> <div style="width:100px; height:100px; background-color: orange; border-radius:50%"></div><h1 style="font-family:sans-serif;padding:0;margin:0;"> Server is running</h1> <p style="padding:0;margin:0;font-family:sans-serif;">Ready to take your requests</p></div>');
})

// Start the server and listen on the defined port
httpServer.listen(8080, () => {
    console.log(`Server running on port 8080`);
});

// Endpoint routes
const auth_route = require("./end-points/auth");
const blog_route = require("./end-points/blog");

app.use("/auth", auth_route);
app.use("/blog",blog_route)



