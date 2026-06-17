const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {OAuth2Client} = require('google-auth-library');

const signUpUser = async(req,res)=>{
    try {
        //fetch the Details
        const {username,email,password,profilePic,publicKey} = req.body
        //Check If Username and email already exists
        const existingUsername = await User.findOne({username})
        if (existingUsername) {
            return res.status(403).json({
                message:"Username Already Exists"
            })
        }
        const existingEmail = await User.findOne({email})
        if (existingEmail) {
            return res.status(403).json({
                message:"Email Already Exists"
            })
        }
        //Hashing the password before saving
        const hashedPassword = await bcrypt.hash(password,10)
        //Create User in the DB
        const user = await User.create({
            username,email,password:hashedPassword,profilePic,publicKey
        })
        return res.status(201).json({
            message:"SignUp Succesful"
        })
    } catch (error) {
        return res.status(500).json({
            message:"SignUp Failed",error:error.message
        })
    }
}

const loginUser = async(req,res)=>{
    try {
        const {identifier,password} = req.body
        //Check if it Exists or Not
        const user = await User.findOne({
   $or:[
      {email: identifier},
      {username: identifier}
   ]
})
        if (!user) {
            return res.status(404).json({
                message:"Email/username Not Found",
            })
        }
        
        //Compare password
        const result = await bcrypt.compare(password,user.password)
        //Show Result
        if (!result) {
            return res.status(401).json({
                message:"Wrong Password"
            })
        }
        // Create Token and Return it 
        const token = jwt.sign({
            userId:user._id
        },process.env.JWT_SECRET,{
            expiresIn:'7d'
        })

        return res.status(200).json({
                message:"Login Succesful",
                token,
                user:{
        _id:user._id,
        username:user.username,
        email:user.email,
        profilePic:user.profilePic,
        publicKey:user.publicKey
    }
            })
            

    } catch (error) {
        return res.status(500).json({
            message:"Something Went Wrong",error:error.message
        })
    }
}

const googleLogin = async (req,res)=>{
    try {
        const { token: googleToken } = req.body
        // Create Google Client
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
        // Create a Ticket from the client 
        const ticket = await client.verifyIdToken({
            idToken: googleToken,audience:process.env.GOOGLE_CLIENT_ID
        })
        // Create a Payload via the Ticket
        const payload = ticket.getPayload()
        // User Exists
        let user = await User.findOne({email: payload.email})
        // User Does not Exists
        if (!user) {
            user = await User.create({
                username:payload.name,
                email:payload.email,
                googleId:payload.sub,
            })
        }
        // Create Token and Return it 
        const token = jwt.sign({
            userId:user._id
        },process.env.JWT_SECRET,{
            expiresIn:'7d'
        })
        return res.status(200).json({
    token,
    user:{
        _id:user._id,
        username:user.username,
        email:user.email,
        profilePic:user.profilePic,
        publicKey:user.publicKey
    }
})
    } catch (error) {
        return res.status(500).json({
            error:error.message
        })
    }
}   


module.exports = {
    signUpUser,
    loginUser,
    googleLogin,
}