const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const tokenBlackListModel = require('../models/blacklist.model')


/**
 *  @name registerUserController
 * @description register a new user, excpets username, email, ...
 * @access  Public
 */

async function registerUserController(req,res){
    const { username,email,password } = req.body;

    if(!username || !email || !password){
        return res.status(400).json({
            message:"All information required"
        })
    }

    const isUserAlreadyExists = await userModel.findOne({
        $or: [{username},{email}]
    })

    if(isUserAlreadyExists){
        return res.status(400).json({
            message:"Account already exists with this email address or username"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign(
        { id:user._id, username: user.username },
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.cookie('token', token)

    res.status(201).json({
        message:"User Successfully Registered",
        user:{
            id : user._id,
            username: user.username,
            email: user.email
        }
    })
}

async function loginUserController(req,res){
    const { email,password } = req.body

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password,user.password)

    if(!isPasswordValid){
        return res.staus(400).json({
            message:"Invalid email or password"
        })
    }

    const token = jwt.sign(
        { id:user._id, username: user.username },
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.cookie('token', token)

    res.status(201).json({
        message:"User Successfully Login",
        user:{
            id : user._id,
            username: user.username,
            email: user.email
        }
    })
}

async function logoutUserController(req,res){
    const token = req.cookies.token

    if(token){
        await tokenBlackListModel.create({token})

        res.clearCookie("token")

        res.json({
            message:"User logout successfully"
        })
    }
}

async function getMeController(req,res){
    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message: "User details fetched successfully",
        details :{id:user._id,
        username: user.username,
        email: user.email}
    })
}

module.exports = {registerUserController, loginUserController, logoutUserController, getMeController};