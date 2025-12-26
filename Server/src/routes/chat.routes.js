import { Router } from "express"
import { handleLoadChats ,
         handleLoadSellerChatList , 
         handleLoadUserChatList,
         handleFindChat,
         } from '../controllers/chat.controller.js'

import { authenticateSeller , authenticateUser } from '../middlewares/authentication.js'         

const chatRoutes = Router()


chatRoutes.get('/chats/user/:userId' , authenticateUser ,  handleLoadUserChatList)
chatRoutes.get('/chats/seller/:sellerId' , authenticateSeller , handleLoadSellerChatList)
chatRoutes.get('/messages/:chatId' , handleLoadChats)
chatRoutes.get('/chat/find/:currentUserId/:receiverId' , handleFindChat)



export default chatRoutes