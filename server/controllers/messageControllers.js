const Conversation = require("../models/Conversation")
const Message = require("../models/Message")

const sendMessage = async (req,res)=>{
    try {

        const {conversationId,text} = req.body

        const message = await Message.create({
            conversationId,
            sender:req.user.userId,
            text
        })

        await Conversation.findByIdAndUpdate(conversationId,
    {
        lastMessage:text
    }
)

        return res.status(201).json(message)

    } catch (error) {
        return res.status(500).json({
            message:"Message Creation Failed",
            error:error.message
        })
    }
}

const getMessage = async (req,res)=>{
    try {

        const { conversationId } = req.params

        const messages = await Message.find({
            conversationId
        }).sort({
            createdAt:1
        })

        return res.status(200).json(messages)

    } catch (error) {
        return res.status(500).json({
            message:"Getting Messages Failed",
            error:error.message
        })
    }
}

const markMessageAsSeen = async (req,res)=>{
try {

    const conversationId =
    req.params.conversationId

    const result =
    await Message.updateMany(
    {
        conversationId,
        sender:{
            $ne:req.user.userId
        }
    },
    {
        seen:true
    })

    return res.status(200).json({
        message:"Messages Seen"
    })

    io.emit("messagesSeen",{
        conversationId
    })
} catch(error){

    return res.status(500).json({
        error:error.message
    })

}
}

module.exports = {
    sendMessage,
    getMessage,
    markMessageAsSeen,
}