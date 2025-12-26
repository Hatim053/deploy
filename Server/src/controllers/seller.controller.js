import Seller from '../models/seller.model.js'
import jwt from 'jsonwebtoken'
import asyncHandler from '../utilities/asyncHandler.js'
import uploadOnCloudinary from '../utilities/cloudinary.js'
import { client, generateOTP } from '../utilities/otp.js'



const options = {
    httpOnly: true,
    secure: true,
}

const generateAccessAndRefreshToken = async function (seller) {
    const refreshToken = seller.generateRefreshToken()
    const accessToken = seller.generateAccessToken()

    seller.refreshToken = refreshToken
    await seller.save({ validateBeforeSave: false })

    return { refreshToken, accessToken }
}


const handleSellerLogin = asyncHandler(async (req, res, next) => {
    // steps for login
    // get the data from frontend
    // check if it is emppty or not
    // search for user with the given email
    // now match the password of the searched user with the given password
    // generate access and refresh token
    // add them to cookies
    // redirect to home page

    const { email, password } = req.body
    if (!email) {
        return res
            .status(401)
            .json({
                status: 401,
                message: 'Email required'
            })
    }
    const seller = await Seller.findOne({ email: email })
    if (!seller) {
        return res
            .status(404)
            .json({
                status: 404,
                message: 'no user exist with the email'
            })
    }
    const validatePassword = await seller.isPasswordCorrect(password)
    if (!validatePassword) {
        return res
            .status(401)
            .json({
                status: 401,
                message: 'wrong password entered'
            })
    }

    const { refreshToken, accessToken } = await generateAccessAndRefreshToken(seller)
    const updatedSeller = await Seller.findById({ _id: seller._id }).select("-password -refreshToken")
    if (!updatedSeller) {
        return res
            .status(500)
            .json({
                status: 500,
                message: 'something went wrong',
            })
    }

    return res
        .status(200)
        .cookie('refreshToken', refreshToken, options)
        .cookie('accessToken', accessToken, options)
        .json({
            status: 200,
            seller: updatedSeller,
            message: 'seller login successfully'
        })
})



const handleSellerSignup = asyncHandler(async (req, res, next) => {
    // steps for seller signup
    // get the data from frontend (email , fullName , username , password , mobileNo , location , businessType)
    // check given data is non empty
    // create a seller 
    // check seller created succesfully
    // redirect for login
    console.log(req.body)
    const { email, username, fullName, password, mobileNo, location, businessType } = req.body
    if (!email || !username || !fullName || !password || !mobileNo || !location || !businessType) {
        return res
            .status(404)
            .json({
                status: 404,
                message: 'All Details are required'
            })
    }
    const existedSeller = await Seller.findOne({
        $or: [{ email: email }, { username: username }]
    })

    if (existedSeller) {
        return res
            .status(401)
            .json({
                status: 401,
                message: 'seller already exist'
            })
    }

    const createdSeller = await Seller.create({
        email,
        username,
        fullName,
        password,
        mobileNo,
        location,
        businessType
    })

    const seller = await Seller.findById({ _id: createdSeller._id }).select("-password -refreshToken")

    if (!seller) {
        return res
            .status(500)
            .json({
                status: 500,
                message: 'something went wrong',
            })
    }

    return res
        .status(201)
        .json({
            status: 201,
            message: 'seller created successfully',
            seller: seller,
        })

})


const refreshAccessToken = asyncHandler(async (req, res, next) => {
    // step : 
    // first getthe refreshToken from cookies
    // decode it
    // find user associated with the token
    // validate both the tokens 
    // generate new ones and add them to cookies

    const incomingRefreshToken = req.cookies?.refreshToken
    if (!incomingRefreshToken) { // possibely we can redirect here for login
        return res
            .status(401)
            .json({
                status: 401,
                message: 'refresh token required'
            })
    }
    const decodedRefreshToken = jwt.verify(incomingRefreshToken, process.env.REFRESHTOKENSECRET)
    if (!decodedRefreshToken) { // possibely we can redirect here for login
        return res
            .status(404)
            .json({
                status: 404,
                message: 'invalid refresh token'
            })
    }

    const seller = await Seller.findById(decodedRefreshToken._id)

    if (incomingRefreshToken != seller.refreshToken) {
        return res
            .status(404)
            .json({
                status: 404,
                message: 'invalid refresh token'
            })
    }

    const { refreshToken, accessToken } = generateAccessAndRefreshToken(seller)
    return res
        .status(201)
        .cookie('refreshToken', refreshToken)
        .cookie('accessToken', accessToken)
        .json({
            status: 201,
            message: 'tokens refreshed successfully',
        })
})


const handlerSellerLogout = asyncHandler(async (req, res, next) => {
    const sellerId = req.seller?._id
    const seller = await Seller.findByIdAndUpdate(
        sellerId,
        { $set: { refreshToken: 1 } },
        { new: true }
    )

    return res
        .clearCookie('refreshToken')
        .clearCookie('accessToken')
        .status(200)
        .json({
            status: 200,
            message: 'seller logout succesfull'
        })
})


const updateSeller = asyncHandler(async (req, res, next) => {
    const profileImageLocalPath = req.file?.path
        let updated = {}
    if( profileImageLocalPath) {
    const profileImage = await uploadOnCloudinary(profileImageLocalPath)
    if (! profileImage) {
        return res.json({
            status: 500,
            message: 'upload on cloudinary failed',
        })
    }
    updated = {profileImage : profileImage.url}
    }
    const {fullName , email , username}  = req.body
    updated = {...updated , fullName , email , username}
    const seller = await Seller.findByIdAndUpdate(
        {_id : req.seller._id},
        {$set : updated},
        {new : true , runValidators : true}
    )
      
  console.log(seller)

    return res
        .status(200)
        .json({
            status: 200,
            message: 'profile updated successfully',
            user : seller,
        })
})




const verifyNumber = asyncHandler(async (req, res) => {
    const { phone } = req.body

    try {
        const code = generateOTP()

        const verification_check = await client.verify.v2
            .services(process.env.TWILIO_VERIFY_SERVICE_SID)
            .verificationChecks.create({ to: `+91${phone}`, code });

        if (verification_check.status === "approved") {
        // update seller as verified seller 
        const seller = await Seller.findByIdAndUpdate(
        { _id: req.seller._id },
        { $set: { verified : true } },
        { new: true }
             )

            res.json({ success: true, message: "OTP verified successfully" });
        } else {
            res.status(400).json({ success: false, message: "Invalid OTP" });
        }
    } catch (error) {
        console.log(error)
    }

})




export {
    verifyNumber,
    handleSellerLogin,
    handlerSellerLogout,
    handleSellerSignup,
    updateSeller,
}