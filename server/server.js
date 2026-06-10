const express = require('express');
const cors = require('cors');
const connectDB = require('./configs/db');
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const conversationRoutes = require('./routes/conversationRoutes')
const messageRoutes = require('./routes/messageRoutes')

require('dotenv').config()

const app = express()
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
        app.listen(PORT,()=>{
        console.log(`The Server is Running on port ${PORT}`);
    })
    } catch (error) {
    console.error("Server startup failed:", error.message);
}
}

startServer()
