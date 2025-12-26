import { v2 as cloudinary } from "cloudinary"
import fs from 'fs'

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,

})

const uploadOnCloudinary = async(localFilePath) => {
if(! localFilePath) return null;
try {
    const response = await cloudinary.uploader.upload(localFilePath , {resource_type : 'auto'})
    // console.log(response)
    fs.unlinkSync(localFilePath) // remove file from our server
    return response
} catch (error) {
    fs.unlinkSync(localFilePath) // removing file because now will make user to re-upload the file from scratch using multer so it will make duplicate files if not removed here
    return null
}
}


export default uploadOnCloudinary