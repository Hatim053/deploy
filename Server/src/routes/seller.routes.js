import { verifyNumber , handleSellerLogin , handleSellerSignup , handlerSellerLogout , updateSeller } from '../controllers/seller.controller.js'
import { authenticateSeller } from "../middlewares/authentication.js"
import upload from '../middlewares/multer.js'

import { Router } from 'express'


const sellerRoutes = Router()


sellerRoutes.post('/login' , handleSellerLogin)
sellerRoutes.post('/signup' , handleSellerSignup)
sellerRoutes.post('/update' , authenticateSeller  , upload.single('profileImage') , updateSeller)
sellerRoutes.post("/send-otp", authenticateSeller , verifyNumber)
sellerRoutes.get('/logout' , authenticateSeller , handlerSellerLogout)



export default sellerRoutes