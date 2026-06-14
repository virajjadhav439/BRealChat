const Conversation = require("../models/Conversation")

const createConversation = async (req,res)=>{
    try {

        const senderId = req.user.userId
        const { receiverId } = req.body
        
        if(senderId === receiverId){
    return res.status(400).json({
        message:"Cannot create conversation with yourself"
    })
}
        let conversation = await Conversation.findOne({
            participants:{
                $all:[senderId,receiverId]
            }
        })

        if(!conversation){

            conversation = await Conversation.create({
                participants:[
                    senderId,
                    receiverId
                ]
            })

            return res.status(201).json(conversation)
        }

        return res.status(200).json(conversation)

    } catch (error) {
        return res.status(500).json({
            message:"Conversation Creation Failed",
            error:error.message
        })
    }
}

const getConversation = async (req,res)=>{
    
    try {
        const conversations =  await Conversation.find({
            participants:req.user.userId
        })
        return res.status(200).json(conversations)
    } catch (error) {
        return res.status(500).json({
            message:'Get Conversation Failed',error:error.message
        })
    }
}

module.exports = {
    createConversation,
    getConversation,
}