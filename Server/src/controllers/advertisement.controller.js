import asyncHandler from '../utilities/asyncHandler.js'
import Advertisment from '../models/advertisement.model.js'
import uploadOnCloudinary from '../utilities/cloudinary.js'
import Payment from '../models/payment.model.js'


const handleCreateAdvertisement = asyncHandler(async (req, res, next) => {
    // here we will be having a seller who is creating a advertisement because we are injecting a middleware before htting this route and from req object we can get the seller

    const sellerId = req.seller._id
    const sellerUsername = req.seller.username
    const twentyEightDaysAgo = new Date();
twentyEightDaysAgo.setDate(twentyEightDaysAgo.getDate() - 28);

const payment = await Payment.find({
  sellerId: sellerId,
  createdAt: { $gte: twentyEightDaysAgo }  // filter records within last 28 days
});

if(! payment) {
    if(req.seller.freeTrails <= 0) {
    return res
    .status(407)
    .json({
        status : 407,
        message : 'subscription plan over',
    })
} else {
    req.seller.freeTrails = Number(req.seller.freeTrails -1)
}
} 

    console.log(sellerUsername , req.seller)
    const { serviceType, title, description, city, address, price , mobileNo } = req.body

    if (!serviceType || !title || !city || !price || !mobileNo) {
        return res
            .status(401)
            .json({
                status : 401,
                message : 'All Fields Are Required',
            })
    }


    // uploading files on cloudinary
    const images = req.files['images']
    if (!images || images.length == 0) {
        return res
            .status(401)
            .json({
                status : 401,
                message : 'Images Required'})
    }

    const imageFiles = []

    for (let i = 0; i < images.length; i++) {
        const imageOnCloudinary = await uploadOnCloudinary(images[i].path)
        imageFiles.push(imageOnCloudinary.url)
    }

    const createdAdvertisement = await Advertisment.create({
        sellerId,
        serviceType,
        title,
        description,
        city,
        address,
        price,
        images : imageFiles,
        mobileNo,
        sellerUsername,
    })


   
     if(! createdAdvertisement) {
         return res
            .status(500)
            .json({
                status : 500,
                message : 'somthing went wrong',
            })
    }
    console.log(createdAdvertisement)
    return res
        .status(201)
        .json({
            status: 201,
            message: 'Advertisement Created Successfully'
        })

})


const handleFetchLiveAds = asyncHandler(async (req, res, next) => {
    const liveAds = await Advertisment.find({ live: true })
    if (!liveAds) {
        return res
            .status(200)
            .json({
                status: 200,
                message: 'currently no live ads are running'
            })
    }

    return res
        .status(200)
        .json({
            status: 200,
            liveAds,
            message: "live Ads Fetched Succesfully"
        })
})


const handleSearchedAdvertisements = asyncHandler(async (req , res ,) => {
    const  searchedQuery  = String(req.params.searchedQuery || "").trim()
    const location = String(req.params.location || "").trim()
    console.log(location)
    console.log(searchedQuery)
    const ads = await Advertisment.find({
        serviceType : { $regex : `${searchedQuery.replace(/es$/i, "").replace(/s$/i,"")}.*`, $options : "i"},
        city : {
            $regex : location,
            $options : "i"
        }
    })
    
    return res
    .status(200)
    .json({
        status : 200,
        message : 'Ads Fetched Successfully',
        ads,
    })
})

const handleDeleteAdvertisement = asyncHandler(async (req, res, next) => {
    const advertisementId = req.params.advertisementId
    const deletedAdvertisement = await Advertisment.findByIdAndDelete(advertisementId)
    if (!deletedAdvertisement) {
        return res
            .status(500)
            .json({
                status: 500,
                message: 'something went wrong',
            })
    }

    return res
        .status(200)
        .json({
            status: 200,
            message: 'Advertisement Deleted Successfully'
        })

})


const handleFetchMyAdvertisements = asyncHandler(async (req , res) => {
    const sellerId = req.seller._id
    const myadvertisements = await Advertisment.find({
        sellerId : sellerId,
    })

    return res
    .status(200)
    .json({
        status : 200,
        message : 'advertisements fetched successfully',
        myadvertisements,
    })
})


export {
    handleCreateAdvertisement,
    handleFetchLiveAds,
    handleDeleteAdvertisement,
    handleSearchedAdvertisements,
    handleFetchMyAdvertisements,
}