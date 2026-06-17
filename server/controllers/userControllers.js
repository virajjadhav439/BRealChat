const User = require("../models/User")

const getAllUsers = async (req,res)=>{
    try {
        const users = await User.find()
            .select('username email profilePic')

        return res.status(200).json(users)

    } catch (error) {
        return res.status(500).json({
            error:error.message
        })
    }
}

const searchUsers = async (req,res)=>{
    try {

        const { username } = req.query

        const users = await User.find({
            username: {
                $regex: username,
                $options: "i"
            }
        }).select('username email profilePic')

        return res.status(200).json(users)

    } catch (error) {
        return res.status(500).json({
            error:error.message
        })
    }
}

module.exports = {
    getAllUsers,
    searchUsers,
}