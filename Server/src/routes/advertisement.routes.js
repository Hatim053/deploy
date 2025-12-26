import upload from "../middlewares/multer.js"
import { authenticateSeller, authenticateUser } from "../middlewares/authentication.js"
import { Router } from "express"
import { handleCreateAdvertisement, handleFetchLiveAds, handleDeleteAdvertisement, handleSearchedAdvertisements , handleFetchMyAdvertisements } from '../controllers/advertisement.controller.js'

const advertisementRoutes = Router()

advertisementRoutes.post('/create' , authenticateSeller , upload.fields([{ name: 'images', maxCount: 6 }]), handleCreateAdvertisement) // middleware laga dena

advertisementRoutes.get('/query/:searchedQuery/:location' , handleSearchedAdvertisements)
advertisementRoutes.get('/liveAds', authenticateUser, handleFetchLiveAds)
advertisementRoutes.get('/my-ads' , authenticateSeller , handleFetchMyAdvertisements)
advertisementRoutes.get('/delete-ad/:advertisementId' , authenticateSeller , handleDeleteAdvertisement)

export default advertisementRoutes