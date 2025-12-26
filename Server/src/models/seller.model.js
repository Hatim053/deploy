import mongoose from "mongoose"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const sellerSchema = new mongoose.Schema({
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
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    mobileNo : {
        type : Number,
        required : true,
    },
    location : {
        type : String,
        required : true,
    },
    panCard : {
        type : String,
        default : null
    },
    profileImage : {
        type : String,
    },
    businessType : [{
  type: String,
  enum: ['furniture' , 'utensils' , 'properties' , 'electronics' , 'lighting' , 'catering' , 'tent' , 'decoration'],
  required : true,
}],
    accountType : {
        type : String,
        enum : ['seller' , 'user'],
        default : 'seller',
    },
    freeTrails : {
        type : Number,
        default : 3,
    },
    verified : {
        type : Boolean,
        default : false,
    },
    refreshToken : {
        type : String,
    }

} , {timestamps : true})


sellerSchema.pre('save' , async function(next) {
if(! this.isModified('password')) next()
this.password = await bcrypt.hash(this.password , 10)
next()
})


sellerSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password , this.password)
}


sellerSchema.methods.generateAccessToken = function() {
   return jwt.sign({
        _id : this._id,
        username : this.username,
    },
    process.env.ACCESSTOKENSECRET,
    {expiresIn : process.env.ACCESSTOKENEXPIRY})
}

sellerSchema.methods.generateRefreshToken = function() {
  return  jwt.sign({
    _id : this._id,
    },
    process.env.REFRESHTOKENSECRET,
    {
    expiresIn : process.env.REFRESHTOKENEXPIRY
    })
}

const Seller = mongoose.model('Seller' , sellerSchema)

export default Seller