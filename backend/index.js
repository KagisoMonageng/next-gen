const express = require("express");
var cors = require("cors");
const http = require('http');
const socketIo = require('socket.io');
require("dotenv").config();
const app = express();
const passport = require('passport');

const session = require('express-session');


var corsOptions = {
    origin: "*",
    methods: ['GET', 'POST']
};
app.use(express.json());
// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });

app.use(cors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable cookies if needed
  }));

// Create an HTTP server using the Express app
const httpServer = http.createServer(app);
const io = socketIo(httpServer, {
    cors: corsOptions
});


// Make io accessible globally
app.set('socketio', io);

//   Default route displays that
app.get('/', (req, res) => {
    res.send('<div style="width: 100%; height:100vh; display:flex; flex-direction:column;gap:1rem ; justify-content:center; place-items:center;"> <div style="width:100px; height:100px; background-color: orange; border-radius:50%"></div><h1 style="font-family:sans-serif;padding:0;margin:0;"> Server is running</h1> <p style="padding:0;margin:0;font-family:sans-serif;">Ready to take your requests</p></div>');
})

// Start the server and listen on the defined port
httpServer.listen(process.env.PORT, () => {
    console.log(`Server running on port 8080`);
});

// Endpoint routes
const auth_route = require("./end-points/auth");
const blog_route = require("./end-points/blog");

app.use(session({
    secret: process.env.SECRET_KEY, // Replace with a secure key
    resave: false,            // Forces the session to be saved back to the session store
    saveUninitialized: true,  // Forces a session that is "uninitialized" to be saved to the store
    cookie: { secure: false } // Set secure: true if using HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", auth_route);
app.use("/blog", blog_route)



