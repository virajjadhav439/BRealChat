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
