import asyncHandler from '../utilities/asyncHandler.js'
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js' 
import Seller from '../models/seller.model.js'

const authenticateUser = asyncHandler(async(req , res , next) => {
const token = req.cookies?.accessToken
console.log(token)
if(! token) {
   return  res.redirect(`${process.env.CLIENT_SIDE_URL}/user/user-login`) // token not available so redirect user to login
}

const decodedToken = jwt.verify(token , process.env.ACCESSTOKENSECRET)
if(! decodedToken) {
   return res.redirect() // token error / expired so redirect user to re-generate the accessToken using refreshToken
}
const user = await User.findById({_id : decodedToken._id}).select("-password -refreshToken")
if(! user) {
    return res.redirect() // no user exist so redirect to signup route
}
req.user = user
next()
})

const authenticateSeller = asyncHandler(async(req , res , next) => {
    const token = req.cookies.accessToken
    
    if(! token) {
        return res
        .status(405)
        .json({
            status : 405,
            message : 'token not found',
            redirectUrl : '/seller-login',
        })// redirect for login route beacuse no token exist
    }
    const decodedToken = jwt.verify(token , process.env.ACCESSTOKENSECRET)

    if(! decodedToken) {
        return res.
        status(406).
        json({
            status : 406,
            message : 'token expired',
        }) // means token error / expire token so redirect to refreshAccess route
    }
    const seller = await Seller.findById({_id : decodedToken._id}).select("-password -refreshToken")

    if(! seller) {
        return res
        .status(405)
        .json({
            status : 405,
            message : 'seller with the token  not found',
            redirectUrl : '/seller-signup',
        }) // means no seller exist redirect to signup route
    }

    req.seller = seller
    next()
})




export { authenticateUser , authenticateSeller }