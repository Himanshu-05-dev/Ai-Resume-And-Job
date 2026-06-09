const mongoose =require('mongoose')


const blacklistTokenSchema = new mongoose.Schema({
    token:{
        type: String,
        required: [true,"token is required to be added to blacklist"]
    }
},{
    timestamps:true
})

const blacklistModel = mongoose.model('blacklistTokens',blacklistTokenSchema)

module.exports = blacklistModel