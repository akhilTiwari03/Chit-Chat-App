const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const colors = require('colors')
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
const { notFound, errorHandler } = require('./MiddleWares/errorMiddleWare');
const path = require('path')

dotenv.config();
connectDB();

const app = express();
app.use(express.json()); // to accept the json data

app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/message', messageRoutes)

//----------------------------------Deployment------------------------------

const __dirName1 = path.resolve()

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirName1,"/frontend/build")));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirName1, "frontend", "build", "index.html"));
    });
}
else {
    app.get("/", (req, res)=> {
        res.send("Api is Running Successfully!");
    });
}


//----------------------------------Deployment------------------------------


app.use(notFound)  // These 2 are Error Handling Middlewares ie notFound and errorHandler
app.use(errorHandler)

const PORT = process.env.PORT;

const server = app.listen(PORT , console.log(`Sever Started on PORT ${PORT}`.yellow.bold));

const io = require('socket.io')(server, {
    
    pingTimeout: 6000,
    cors: {
        origin: "https://localhost:3000",
       // Credential:true,
    },
});

io.on("connection", (socket) => {
    console.log("Connected to Socket.Io");
    socket.on('setup', (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    });

    socket.on('join chat', (room) => {
        socket.join(room);
        console.log("User joined Room:" + room);
    });

    socket.on('typing',(room) => socket.in(room).emit("typing"));
    socket.on('stop typing',(room) => socket.in(room).emit("stop typing"));

    socket.on('new message' , (newMessageRecieved) => {
        var chat  = newMessageRecieved.chat;

        if(!chat.users) return console.log("chat.users not defined");

        chat.users.forEach(user => {
            if(user._id == newMessageRecieved.sender._id) return;

            socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
    });

    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
      });
});