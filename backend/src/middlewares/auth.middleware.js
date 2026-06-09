const jwt = require('jsonwebtoken')
const tokenBlackListModel = require('../models/blacklist.model')


async function authUser(req,res,next){
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message: "TOken not provided"
        })
    }

    const isTokenBlacklisted = await tokenBlackListModel.findOne({
        token
    })

    if(isTokenBlacklisted){
        return res.status(401).json({
            message:"Token is invalid"
        })
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        req.user = decoded
        next()
    } catch (error) {
        return res.json({
            message:"Not valid token"
        })
    }


}


module.exports = {authUser}