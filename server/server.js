const express = require('express');
const cors = require('cors');
const connectDB = require('./configs/db');
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const conversationRoutes = require('./routes/conversationRoutes')
const messageRoutes = require('./routes/messageRoutes')
const http = require('http');
const { Server } = require('socket.io');


require('dotenv').config()

const app = express()

// Create Http Server
const server = http.createServer(app)
// Create Socket.io Server
const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173"
    }
})
const onlineUsers =  new Map()

// Create Listener
io.on("connection",(socket)=>{
    // Add Listner
    socket.on("sendMessage",(message)=>{
        console.log("Realtime Message:",message);
        
        // Add Sender
        io.emit(
            "receiveMessage",message
        )
        
    })
    // Track online users
    socket.on("addUser",(userId)=>{
        onlineUsers.set(userId,socket.id)
    })
    // Register Users
    io.emit(
        "onlineUsers",
        Array.from(
            onlineUsers.keys()
        )
    )
    // Handle disconnect
    socket.on("disconnect",()=>{
        for(let [userId,socketId] of onlineUsers){
            if (socketId===socket.id) {
                onlineUsers.delete(userId)
                break
            }
        }
        io.emit("onlineUsers",Array.from(onlineUsers.keys()))
    })
})

app.use(cors())
app.use(express.json())


app.use('/api/auth',authRoutes)
app.use('/api/users',userRoutes)
app.use('/api/conversations',conversationRoutes)
app.use('/api/messages',messageRoutes)

const PORT = process.env.PORT || 3000;

const startServer = async ()=>{
    try {
        await connectDB()
        server.listen(PORT,()=>{
        console.log(`The Server is Running on port ${PORT}`);
    })
    } catch (error) {
    console.error("Server startup failed:", error.message);
}
}

startServer()
