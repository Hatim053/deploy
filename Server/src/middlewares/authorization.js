import Seller from '../models/seller.model.js'
import asyncHandler from '../utilities/asyncHandler.js'

const AuthorizedSeller = function (req, res, next) {
    if (req.user) {
        return res.redirect(`${process.env.CLIENT_SIDE_URL}/seller-signup`) // redirect to create a seller account first
    }
    next()
}


const subscribedSeller = asyncHandler(async (req, res, next) => {
    const sellerId = req.seller._id
    const seller = await Seller.findById(sellerId)

    if (seller) {
        return res
            .status(500)
            .json({
                status: 500,
                message: 'something went wrong',
            })
    }

    const subscription = seller.lastPayment
    if(! subscription) {
        return res
            .status(404)
            .json({
                status: 404,
                message: `you don't have an active subscription`,
            })
    }

    const  millisecondsIn30Days = 30 * 24 * 60 * 60 * 1000;
    if(Date.now() - subscription <= millisecondsIn30Days) {
     next()
    } else {
         return res
            .status(404)
            .json({
                status: 404,
                message: `you don't have an active subscription`,
            })
    }

  

    next()

})

export {
    AuthorizedSeller,
    subscribedSeller,

}