import mongoose from "mongoose"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"


const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
    },
    email : {
     type : String,
     required : true,
     lowercase : true,
     unique : true,
    },
    fullName : {
        type : String,
        default : 'new user'
    },
    password : {
        type : String,
        required : true,
    },
    profileImage : {
        type : String,
        default : null,
    },
    accountType : {
        type : String,
        enum : ['seller' , 'user'],
        default : 'user',
    },
    refreshToken : {
        type : String,
    }
} , {timestamps : true})


// method to encrypt password before saving to DataBase
userSchema.pre('save' , async function(next) {
    if(! this.isModified('password')) next()
    this.password = await bcrypt.hash(this.password , 10)
    next()
})

// password encrypt hai to direclty check nhi hoga that's why using bcrypt for comparasion
userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password , this.password)
}


userSchema.methods.generateAccessToken = function() {
return jwt.sign({
    _id : this._id,
    username : this.username,
},
process.env.ACCESSTOKENSECRET,
{expiresIn : process.env.ACCESSTOKENEXPIRY})
}

userSchema.methods.generateRefreshToken = function() {
return jwt.sign({
_id : this._id,
},
process.env.REFRESHTOKENSECRET,
{
expiresIn : process.env.REFRESHTOKENEXPIRY
})
}



const User = mongoose.model('User' , userSchema)

export default User