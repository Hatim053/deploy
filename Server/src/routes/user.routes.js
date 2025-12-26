import { Router } from "express"
import { handleUserLogin , handleUserSignup , updateUser , handlerUserLogout } from "../controllers/user.controller.js"
import upload from '../middlewares/multer.js'
import { authenticateUser } from "../middlewares/authentication.js"

const userRoutes = Router()

userRoutes.post('/login' , handleUserLogin)
userRoutes.post('/signup' , handleUserSignup)
userRoutes.post('/update' , authenticateUser  , upload.single('profileImage') , updateUser)
userRoutes.get('/logout' , authenticateUser , handlerUserLogout)


export default userRoutes